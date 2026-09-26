import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const { paths } = (await req.json()) as { paths: string[] };
    if (!paths || !Array.isArray(paths)) {
      return NextResponse.json({ error: "paths array required" }, { status: 400 });
    }

    const adminClient = getAdminClient();
    const results: Record<string, string> = {};

    for (const p of paths) {
      if (!p) continue;
      // If already a signed or full http url, pass through
      if (p.startsWith("http://") || p.startsWith("https://") || p.startsWith("blob:")) {
        results[p] = p;
        continue;
      }

      // Check if it's a storage path in claim-evidence
      const cleanPath = p.replace(/^\//, "").replace(/^claim-evidence\//, "");
      const { data, error } = await adminClient.storage
        .from("claim-evidence")
        .createSignedUrl(cleanPath, 86400);

      if (error || !data?.signedUrl) {
        // Fallback to local / public url if storage sign failed
        results[p] = p.startsWith("/") ? p : `/${p}`;
      } else {
        results[p] = data.signedUrl;
      }
    }

    return NextResponse.json({ success: true, urls: results });
  } catch (err: any) {
    console.error("Signed URL endpoint error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
