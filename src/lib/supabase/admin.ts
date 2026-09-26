import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function getAdminClient() {
  if (typeof window !== "undefined") {
    throw new Error("CRITICAL SECURITY ERROR: Supabase admin client cannot be instantiated in the browser.");
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !secretKey) {
    throw new Error(
      "Missing Supabase admin environment variables: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY"
    );
  }

  return createSupabaseClient(supabaseUrl, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
