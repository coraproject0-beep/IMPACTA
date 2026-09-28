import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { MOCK_CLAIMS } from "@/data/fixtures/claimsFixture";
import { mapRowToClaim } from "@/lib/mappers/claimDbMapper";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const claimId = params.id;
    const admin = getAdminClient();

    const { data: row, error } = await admin
      .from("claims")
      .select("*")
      .eq("id", claimId)
      .maybeSingle();

    if (error) {
      console.warn(`Error fetching claim ${claimId}:`, error.message);
    }

    if (!row) {
      // Check MOCK_CLAIMS fallback
      const foundMock = MOCK_CLAIMS.find((c) => c.id.toLowerCase() === claimId.toLowerCase());
      if (foundMock) {
        return NextResponse.json({ success: true, claim: foundMock, source: "mock" });
      }
      return NextResponse.json({ error: "Claim not found" }, { status: 404 });
    }

    // Fetch attached evidence with signed URLs
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

    return NextResponse.json({
      success: true,
      claim: mapRowToClaim({ ...row, evidence: evidenceWithUrls }),
      source: "supabase",
    });
  } catch (err: any) {
    console.error("GET /api/claims/[id] error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const claimId = params.id;
    const updates = await req.json();
    const admin = getAdminClient();

    // Map incoming patch properties to DB columns
    const patchPayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (updates.status) patchPayload.status = updates.status.toLowerCase();
    if (updates.reviewed_data) patchPayload.reviewed_data = updates.reviewed_data;
    if (updates.cai_fields) patchPayload.cai_fields = updates.cai_fields;
    if (updates.reviewer_notes !== undefined) patchPayload.reviewer_notes = updates.reviewer_notes;
    if (updates.audit_trail) patchPayload.audit_trail = updates.audit_trail;

    const { data, error } = await admin
      .from("claims")
      .update(patchPayload)
      .eq("id", claimId)
      .select()
      .single();

    if (error) {
      console.error("Supabase claim update error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // If review edit recorded, log to claim_reviews table
    if (updates.reviewEvent) {
      try {
        await admin.from("claim_reviews").insert({
          claim_id: claimId,
          field_key: updates.reviewEvent.fieldKey || "unknown",
          original_ai_value: updates.reviewEvent.originalValue || null,
          corrected_value: updates.reviewEvent.correctedValue || "",
          review_type: updates.reviewEvent.reviewType || "driver_correction",
          reviewer_role: updates.reviewEvent.reviewerRole || "driver",
        });
      } catch (rErr) {
        console.warn("Could not insert claim_reviews record:", rErr);
      }
    }

    const { data: evidenceRows } = await admin
      .from("claim_evidence")
      .select("*")
      .eq("claim_id", data.id);

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

    return NextResponse.json({ success: true, claim: mapRowToClaim({ ...data, evidence: evidenceWithUrls }) });
  } catch (err: any) {
    console.error("PATCH /api/claims/[id] error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

