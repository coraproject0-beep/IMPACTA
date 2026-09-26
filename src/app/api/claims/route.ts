import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { MOCK_CLAIMS } from "@/data/fixtures/claimsFixture";
import { Claim } from "@/types";

// Helper to convert DB claim row to Claim interface
function mapRowToClaim(row: any): Claim {
  return {
    id: row.id,
    incidentDate: row.incident_datetime || row.created_at || new Date().toISOString(),
    createdAt: row.created_at || new Date().toISOString(),
    status: (row.status?.toUpperCase() || "NEW") as any,
    severity: "MEDIUM",
    assignee: null,
    policyholder: {
      fullName: row.driver_name || "John Miller",
      fiscalCode: row.vehicle_a?.fiscalCode || "MLLJHN80A01F205Z",
      phone: row.vehicle_a?.phone || "+39 333 1234567",
    },
    incident: {
      timestamp: row.incident_datetime || new Date().toISOString(),
      location: {
        city: row.location_text ? row.location_text.split(",")[0].trim() : "Milan",
        street: row.location_text || "Milan metropolitan area, Italy",
        postalCode: "20100",
        latitude: 45.4642,
        longitude: 9.19,
        junctionType: "INTERSECTION",
      },
      weatherCondition: "CLEAR",
      roadCondition: "DRY",
      policeIntervention: false,
      summary: row.driver_statement || "Traffic accident at intersection",
    },
    driverA: {
      role: "DRIVER_A",
      fullName: row.driver_name || "John Miller",
      taxCode: "MLLJHN80A01F205Z",
      drivingLicenseNumber: "U19827364X",
      phone: "+39 333 1234567",
      statement: row.driver_statement || "",
      injured: false,
    },
    vehicleA: {
      role: "VEHICLE_A",
      plate: row.vehicle_a?.plate || "AB 123 CD",
      make: row.vehicle_a?.make || "Volkswagen",
      model: row.vehicle_a?.model || "Golf VII",
      year: 2021,
      color: row.vehicle_a?.color || "Dark Gray",
      damageDescription: row.vehicle_a?.damageDescription || "Front-right impact",
      impactZone: row.vehicle_a?.damageArea || "Front-Right",
      drivable: true,
    },
    policyA: {
      insurerName: "Generali Italia",
      policyNumber: "GEN-8839-1029",
      coverageType: "KASKO_FULL",
      validUntil: "2027-04-15",
      agencyCode: "MI-04",
      policyholderMatch: true,
    },
    driverB: row.counterparty_name
      ? {
          role: "DRIVER_B",
          fullName: row.counterparty_name,
          taxCode: "ND",
          drivingLicenseNumber: "ND",
          phone: "+39 347 9876543",
          statement: "Counterparty reported travelling across intersection",
          injured: false,
        }
      : undefined,
    vehicleB: row.vehicle_b
      ? {
          role: "VEHICLE_B",
          plate: row.vehicle_b.plate || "EF 456 GH",
          make: row.vehicle_b.make || "Volkswagen",
          model: row.vehicle_b.model || "Golf VII",
          year: 2020,
          color: row.vehicle_b.color || "Silver Metallic",
          damageDescription: row.vehicle_b.damageDescription || "Front-left impact",
          impactZone: row.vehicle_b.damageArea || "Front-Left",
          drivable: true,
        }
      : undefined,
    evidence: (row.evidence || []).map((e: any, idx: number) => ({
      id: e.id || `EVD-${row.id}-${idx + 1}`,
      title: e.category_label || e.title || "Accident Evidence",
      type: "VEHICLE_DAMAGE_PHOTO",
      timestamp: e.created_at || row.created_at || new Date().toISOString(),
      provenance: "MANUAL",
      extractionStatus: "EXTRACTED",
      thumbnailUrl: e.signedUrl || e.file_path || e.thumbnailUrl,
      description: e.file_name || e.description || "Evidence photograph",
      metadata: {
        confidence: 90,
        extractedAttributes: e.metadata || {},
      },
    })),
    telemetry: {
      hasTelemetry: true,
      samplingRateHz: 50,
      deltaVKmh: 14.5,
      impactAngleDeg: 45,
      impactVectorDescription: "Oblique front-lateral angle",
      points: [],
    },
    aiAnalysis: {
      overallConfidence: 85,
      confidenceBand: "HIGH",
      probableSequence: [
        {
          stepNumber: 1,
          timeOffset: "-2.0s",
          description: "Vehicles approaching intersection on perpendicular vectors",
          supportingEvidenceIds: ["01-overview.png"],
          confidence: 80,
        },
        {
          stepNumber: 2,
          timeOffset: "0.0s",
          description: "Front-right contact between Vehicle A and Vehicle B",
          supportingEvidenceIds: ["02-vehicle-a-damage.png", "03-vehicle-b-damage.png"],
          confidence: 90,
        },
      ],
      observations: (row.ai_analysis?.observedFacts || []).map((obs: any, idx: number) => ({
        id: `obs-${idx + 1}`,
        target: obs.source === "driver_statement" ? "Driver Statement" : "Intersection / Vehicle",
        statement: obs.statement,
        supportingEvidenceIds: obs.evidenceRefs || [],
        epistemicStatus: "OBSERVED",
        detectedAt: row.ai_analysis?.analyzedAt || row.created_at,
      })),
      inferences: (row.ai_analysis?.inferredDynamics || []).map((inf: any, idx: number) => ({
        id: `inf-${idx + 1}`,
        title: "Dynamic Reconstruction Hypothesis",
        inference: inf.statement,
        confidence: inf.confidenceLabel === "high" ? 90 : inf.confidenceLabel === "medium" ? 75 : 55,
        supportingEvidenceIds: [],
        requiresConfirmation: true,
        isConfirmedByReviewer: Boolean(row.reviewed_data?.confirmedByDriver),
        epistemicStatus: "INFERRED",
        alternativeHypothesis: inf.rationale,
      })),
      uncertaintiesAndLimitations: row.ai_analysis?.missingInformation || [],
      reviewReason: row.ai_analysis?.isBackup ? "BACKUP ANALYSIS / DEMO FALLBACK" : "LIVE GEMINI ANALYSIS",
      lastAnalyzedAt: row.ai_analysis?.analyzedAt || new Date().toISOString(),
    },
    caiFields: row.cai_fields || [],
    caiDraftGenerated: Boolean(row.submitted_at),
    caiDraftGeneratedAt: row.submitted_at,
    auditTrail: row.audit_trail || [],
    reviewerNotes: row.reviewer_notes || "",
    tags: [
      row.status?.toUpperCase() || "NEW",
      row.is_demo ? "CANONICAL_DEMO" : "LIVE_APP",
      row.ai_analysis?.mode === "LIVE_GEMINI" ? "AI_GEMINI" : "AI_BACKUP",
    ],
  };
}

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
      return NextResponse.json({ success: true, claims: MOCK_CLAIMS, source: "mock_fallback" });
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

    // Upsert into Supabase claims table
    const dbPayload = {
      id: claimData.id,
      status: claimData.status?.toLowerCase() || "submitted",
      driver_name: claimData.driver_name || claimData.driverA?.fullName || "Driver",
      counterparty_name: claimData.counterparty_name || claimData.driverB?.fullName || "Counterparty",
      location_text: claimData.location_text || (claimData.incident?.location ? `${claimData.incident.location.city}, ${claimData.incident.location.street}` : "Location"),
      incident_datetime: claimData.incident_datetime || claimData.incident?.timestamp || new Date().toISOString(),
      driver_statement: claimData.driver_statement || claimData.driverA?.statement || "",
      vehicle_a: claimData.vehicle_a || claimData.vehicleA || {},
      vehicle_b: claimData.vehicle_b || claimData.vehicleB || {},
      ai_analysis: claimData.ai_analysis || claimData.aiAnalysis || {},
      reviewed_data: claimData.reviewed_data || claimData.reviewedData || {},
      cai_fields: claimData.cai_fields || claimData.caiFields || [],
      audit_trail: claimData.audit_trail || claimData.auditTrail || [],
      reviewer_notes: claimData.reviewer_notes || claimData.reviewerNotes || "",
      is_demo: Boolean(claimData.is_demo || claimData.isDemo),
      submitted_at: claimData.submitted_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await admin
      .from("claims")
      .upsert(dbPayload, { onConflict: "id" })
      .select()
      .single();

    if (error) {
      console.error("Supabase claim upsert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, claim: data });
  } catch (err: any) {
    console.error("POST /api/claims error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
