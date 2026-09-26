import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const claimId = (formData.get("claimId") as string) || "draft";
    const category = (formData.get("category") as string) || "SCENE_OVERVIEW";
    const categoryLabel = (formData.get("categoryLabel") as string) || "Evidence photo";
    const notes = (formData.get("notes") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const adminClient = getAdminClient();
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const storagePath = `${claimId}/${timestamp}-${cleanFileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to private bucket
    const { data: uploadData, error: uploadError } = await adminClient.storage
      .from("claim-evidence")
      .upload(storagePath, buffer, {
        contentType: file.type || "image/png",
        upsert: true,
      });

    if (uploadError) {
      console.error("Supabase storage upload error:", uploadError);
      return NextResponse.json(
        { error: `Upload failed: ${uploadError.message}` },
        { status: 500 }
      );
    }

    // Generate signed URL (expires in 24 hours)
    const { data: signedData, error: signedError } = await adminClient.storage
      .from("claim-evidence")
      .createSignedUrl(storagePath, 86400);

    const signedUrl = signedData?.signedUrl || "";

    const evidenceId = `evd-${timestamp}-${Math.random().toString(36).substring(2, 7)}`;

    // Try inserting into claim_evidence table if it exists
    try {
      await adminClient.from("claim_evidence").insert({
        id: evidenceId,
        claim_id: claimId,
        file_path: storagePath,
        file_name: file.name,
        mime_type: file.type || "image/png",
        size_bytes: file.size,
        category,
        category_label: categoryLabel,
        is_real_upload: true,
        metadata: { notes, uploadedAt: new Date().toISOString() },
      });
    } catch (dbErr) {
      console.warn("Could not insert claim_evidence row (table might not exist yet):", dbErr);
    }

    return NextResponse.json({
      success: true,
      id: evidenceId,
      filePath: storagePath,
      signedUrl,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type || "image/png",
    });
  } catch (err: any) {
    console.error("Evidence upload endpoint error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to process evidence upload" },
      { status: 500 }
    );
  }
}
