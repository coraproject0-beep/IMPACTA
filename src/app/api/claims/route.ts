import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { MOCK_CLAIMS } from "@/data/fixtures/claimsFixture";
import { Claim } from "@/types";
import { mapRowToClaim } from "@/lib/mappers/claimDbMapper";

export async function GET() {
  try {
    const admin = getAdminClient();
    const { data: dbClaims, error } = await admin
      .from("claims")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Could not query claims table from Supabase:", error.message);
      // Fallback to MOCK_CLAIMS if database table not yet created
      return NextResponse.json({ success: true, claims: MOCK_CLAIMS, source: "mock_fallback" });
    }

    if (!dbClaims || dbClaims.length === 0) {
      return NextResponse.json({ success: true, claims: [], source: "supabase" });
    }

    // For each claim, fetch attached evidence and generate signed URLs
    const mappedClaims: Claim[] = [];
    for (const row of dbClaims) {
      const { data: evidenceRows } = await admin
        .from("claim_evidence")
        .select("*")
        .eq("claim_id", row.id);

      const evidenceWithUrls = [];
      if (evidenceRows && evidenceRows.length > 0) {
        for (const ev of evidenceRows) {
          let signedUrl = ev.file_path;
          if (!ev.file_path.startsWith("http")) {
            const { data: sData } = await admin.storage
              .from("claim-evidence")
              .createSignedUrl(ev.file_path.replace(/^claim-evidence\//, ""), 86400);
            if (sData?.signedUrl) signedUrl = sData.signedUrl;
          }
          evidenceWithUrls.push({ ...ev, signedUrl });
        }
      }

      mappedClaims.push(mapRowToClaim({ ...row, evidence: evidenceWithUrls }));
    }

    return NextResponse.json({ success: true, claims: mappedClaims, source: "supabase" });
  } catch (err: any) {
    console.error("GET /api/claims error:", err);
    return NextResponse.json({ success: true, claims: MOCK_CLAIMS, source: "mock_fallback" });
  }
}

export async function POST(req: NextRequest) {
  try {
    const claimData = await req.json();
    if (!claimData || !claimData.id) {
      return NextResponse.json({ error: "claim data with id required" }, { status: 400 });
    }

    const admin = getAdminClient();

    const rawStatus = (claimData.status || "").toLowerCase();
    let dbStatus = "submitted";
    if (["draft", "evidence_uploaded", "analyzed", "reviewed", "submitted", "under_review", "closed"].includes(rawStatus)) {
      dbStatus = rawStatus;
    } else if (rawStatus === "new") {
      dbStatus = "draft";
    } else if (rawStatus === "in_review") {
      dbStatus = "under_review";
    } else if (rawStatus === "cai_ready") {
      dbStatus = "submitted";
    }

    // Cleanly format location without duplicating city name
    const locObj = claimData.incident?.location;
    const isDemo = Boolean(
      claimData.is_demo ||
      claimData.isDemo ||
      claimData.tags?.includes("Demo Incident") ||
      claimData.tags?.includes("CANONICAL_DEMO") ||
      (typeof claimData.id === "string" && claimData.id.includes("CLM-2026-0925-01"))
    );

    const formatLoc = (loc?: { city?: string; street?: string }) => {
      if (!loc) return isDemo ? "Milano, Via Lorenteggio" : "Posizione non specificata";
      const city = (loc.city || "").trim();
      const street = (loc.street || "").trim();
      if (!city && !street) return isDemo ? "Milano, Via Lorenteggio" : "Posizione non specificata";
      if (!city) return street;
      if (!street) return city;
      if (street.toLowerCase().includes(city.toLowerCase())) return street;
      return `${city}, ${street}`;
    };

    const locationText = claimData.location_text || formatLoc(locObj);

    // Upsert into Supabase claims table
    const dbPayload = {
      id: claimData.id,
      status: dbStatus,
      driver_name: claimData.driver_name || claimData.driverA?.fullName || (isDemo ? "John Miller" : "Driver"),
      counterparty_name: claimData.counterparty_name || claimData.driverB?.fullName || (isDemo ? "Claire Anderson" : null),
      location_text: locationText,
      incident_datetime: claimData.incident_datetime || claimData.incident?.timestamp || claimData.incidentDate || new Date().toISOString(),
      driver_statement: claimData.driver_statement || claimData.driverA?.statement || claimData.incident?.summary || "",
      vehicle_a: claimData.vehicle_a || claimData.vehicleA || (isDemo ? {
        make: "Volkswagen",
        model: "Polo",
        plate: "AB 123 CD",
        year: 2023,
        color: "Deep Black Pearl",
        damageDescription: "Front-right bumper and headlight deformation",
        damageArea: "Front-Right",
      } : {
        make: "Vehicle details not provided",
        model: "",
        plate: "—",
        year: new Date().getFullYear(),
        color: "—",
        damageDescription: "Damage under inspection",
        damageArea: "Under inspection",
      }),
      vehicle_b: claimData.vehicle_b || claimData.vehicleB || (isDemo ? {
        make: "Volkswagen",
        model: "Golf VII",
        plate: "EF 456 GH",
        year: 2020,
        color: "Silver Metallic",
        damageDescription: "Front-left impact",
        damageArea: "Front-Left",
      } : {}),
      ai_analysis: claimData.ai_analysis || claimData.aiAnalysis || {},
      reviewed_data: {
        confirmedByDriver: true,
        location: locObj,
        humanCorrections: claimData.humanCorrections || (claimData as any).reviewed_data?.humanCorrections || [],
        additionalNotes: claimData.reviewer_notes || claimData.reviewerNotes || "",
        ...(claimData.reviewed_data || claimData.reviewedData || {}),
      },
      cai_fields: claimData.cai_fields || claimData.caiFields || [],
      audit_trail: claimData.audit_trail || claimData.auditTrail || [],
      reviewer_notes: claimData.reviewer_notes || claimData.reviewerNotes || claimData.driverA?.statement || "",
      is_demo: isDemo,
      submitted_at: claimData.submitted_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: savedClaimRow, error } = await admin
      .from("claims")
      .upsert(dbPayload, { onConflict: "id" })
      .select()
      .single();

    if (error) {
      console.error("Supabase claim upsert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Also persist evidence items into claim_evidence if provided (with strict deduplication)
    const rawEvidenceItems = Array.isArray(claimData.evidence) ? claimData.evidence : [];
    const seenPaths = new Set<string>();
    const evidenceItems = [];
    for (const ev of rawEvidenceItems) {
      const p = (ev.thumbnailUrl || ev.file_path || ev.filePath || "").trim();
      if (!p || !seenPaths.has(p)) {
        if (p) seenPaths.add(p);
        evidenceItems.push(ev);
      }
    }

    const evidenceWithUrls = [];

    if (evidenceItems.length > 0) {
      // Fetch existing evidence for this claim to reuse canonical IDs and avoid duplicates
      const { data: existingEvs } = await admin
        .from("claim_evidence")
        .select("id, file_path")
        .eq("claim_id", savedClaimRow.id);

      const savedIds = new Set<string>();

      for (let idx = 0; idx < evidenceItems.length; idx++) {
        const ev = evidenceItems[idx];
        const filePath = ev.thumbnailUrl || ev.file_path || ev.filePath || `evidence/${savedClaimRow.id}/${idx + 1}.png`;

        // Match existing row with same file path if present
        const matchedExisting = existingEvs?.find(
          (ex) => ex.file_path === filePath || (ex.file_path && filePath.endsWith(ex.file_path))
        );
        const evId = matchedExisting ? matchedExisting.id : (ev.id || `EVD-${savedClaimRow.id}-${idx + 1}`);
        savedIds.add(evId);

        const evPayload = {
          id: evId,
          claim_id: savedClaimRow.id,
          file_path: filePath,
          category: ev.metadata?.extractedAttributes?.category || ev.category || "accident_evidence",
          category_label: ev.title || ev.category_label || "Evidence Photo",
          file_name: ev.description || ev.file_name || `evidence-${idx + 1}.png`,
          mime_type: ev.mime_type || "image/png",
          size_bytes: ev.size_bytes || ev.file_size_bytes || 102400,
          metadata: ev.metadata || {},
          created_at: ev.timestamp || new Date().toISOString(),
        };

        const { data: savedEv } = await admin
          .from("claim_evidence")
          .upsert(evPayload, { onConflict: "id" })
          .select()
          .single();

        evidenceWithUrls.push({
          ...(savedEv || evPayload),
          signedUrl: filePath,
        });
      }

      // Delete any obsolete evidence rows for this claim not in incoming set
      if (existingEvs && existingEvs.length > 0) {
        const obsoleteIds = existingEvs
          .filter((ex) => !savedIds.has(ex.id))
          .map((ex) => ex.id);
        if (obsoleteIds.length > 0) {
          await admin.from("claim_evidence").delete().in("id", obsoleteIds);
        }
      }
    }

    const mapped = mapRowToClaim({ ...savedClaimRow, evidence: evidenceWithUrls });
    return NextResponse.json({ success: true, claim: mapped });
  } catch (err: any) {
    console.error("POST /api/claims error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

