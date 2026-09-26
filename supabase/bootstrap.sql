-- ============================================================
-- IMPACTA — V6 GOLDEN DEMO SUPABASE BOOTSTRAP SCHEMA
-- Single canonical claim data model, Storage bucket & RLS policies
-- ============================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS & DOMAINS (OR STRICT CONSTRAINTS)
-- Roles: 'driver', 'adjuster'
-- Statuses: 'draft', 'evidence_uploaded', 'analyzed', 'reviewed', 'submitted', 'under_review', 'closed'

-- 3. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('driver', 'adjuster')),
  full_name TEXT,
  organization TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for profile lookups
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- 4. CLAIMS TABLE (ONE CANONICAL RECORD)
CREATE TABLE IF NOT EXISTS public.claims (
  id TEXT PRIMARY KEY,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'evidence_uploaded', 'analyzed', 'reviewed', 'submitted', 'under_review', 'closed')),
  
  -- Core parties and circumstances
  driver_name TEXT,
  counterparty_name TEXT,
  location_text TEXT,
  incident_datetime TIMESTAMPTZ,
  
  -- Statements
  driver_statement TEXT,
  
  -- Structured details
  vehicle_a JSONB NOT NULL DEFAULT '{}'::jsonb,
  vehicle_b JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Multimodal AI analysis output (epistemic separation: observed, inferred, missing)
  ai_analysis JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Human review & correction tracking
  reviewed_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  cai_fields JSONB NOT NULL DEFAULT '[]'::jsonb,
  audit_trail JSONB NOT NULL DEFAULT '[]'::jsonb,
  reviewer_notes TEXT NOT NULL DEFAULT '',
  
  -- Demo flag and timestamps
  is_demo BOOLEAN NOT NULL DEFAULT false,
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for claim filtering & searching
CREATE INDEX IF NOT EXISTS idx_claims_status ON public.claims(status);
CREATE INDEX IF NOT EXISTS idx_claims_created_by ON public.claims(created_by);
CREATE INDEX IF NOT EXISTS idx_claims_incident_datetime ON public.claims(incident_datetime DESC);
CREATE INDEX IF NOT EXISTS idx_claims_created_at ON public.claims(created_at DESC);

-- 5. CLAIM EVIDENCE TABLE (METADATA FOR PRIVATE STORAGE FILES)
CREATE TABLE IF NOT EXISTS public.claim_evidence (
  id TEXT PRIMARY KEY,
  claim_id TEXT NOT NULL REFERENCES public.claims(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes BIGINT NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  category_label TEXT,
  is_real_upload BOOLEAN NOT NULL DEFAULT false,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_claim_evidence_claim_id ON public.claim_evidence(claim_id);

-- 6. CLAIM REVIEWS TABLE (TRACKS SPECIFIC PROVENANCE & HUMAN EDITS)
CREATE TABLE IF NOT EXISTS public.claim_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id TEXT NOT NULL REFERENCES public.claims(id) ON DELETE CASCADE,
  field_key TEXT NOT NULL,
  original_ai_value TEXT,
  corrected_value TEXT NOT NULL,
  review_type TEXT NOT NULL CHECK (review_type IN ('driver_confirmation', 'driver_correction', 'adjuster_review')),
  reviewer_role TEXT NOT NULL CHECK (reviewer_role IN ('driver', 'adjuster')),
  reviewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_claim_reviews_claim_id ON public.claim_reviews(claim_id);

-- 7. AUTOMATIC PROFILE CREATION TRIGGER ON AUTH SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, full_name, organization)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'driver'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'organization', 'IMPACTA Demo')
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    role = EXCLUDED.role,
    updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. HELPER FUNCTION: GET CURRENT USER ROLE
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 9. STORAGE SETUP: PRIVATE BUCKET 'claim-evidence'
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'claim-evidence',
  'claim-evidence',
  false,
  20971520,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
ON CONFLICT (id) DO UPDATE
SET
  public = false,
  file_size_limit = 20971520,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

-- 10. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claim_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claim_reviews ENABLE ROW LEVEL SECURITY;

-- 11. RLS POLICIES FOR PROFILES
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR public.current_user_role() = 'adjuster');

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 12. RLS POLICIES FOR CLAIMS
-- Driver can select own claims or canonical demo claims
DROP POLICY IF EXISTS "claims_select_policy" ON public.claims;
CREATE POLICY "claims_select_policy" ON public.claims
  FOR SELECT USING (
    is_demo = true OR
    created_by = auth.uid() OR
    public.current_user_role() = 'adjuster'
  );

-- Driver can insert claims
DROP POLICY IF EXISTS "claims_insert_policy" ON public.claims;
CREATE POLICY "claims_insert_policy" ON public.claims
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND (created_by = auth.uid() OR created_by IS NULL) OR
    is_demo = true
  );

-- Driver can update own un-closed claims, Adjuster can update submitted claims
DROP POLICY IF EXISTS "claims_update_policy" ON public.claims;
CREATE POLICY "claims_update_policy" ON public.claims
  FOR UPDATE USING (
    is_demo = true OR
    (created_by = auth.uid() AND status IN ('draft', 'evidence_uploaded', 'analyzed', 'reviewed', 'submitted')) OR
    public.current_user_role() = 'adjuster'
  );

-- 13. RLS POLICIES FOR CLAIM EVIDENCE
DROP POLICY IF EXISTS "claim_evidence_select_policy" ON public.claim_evidence;
CREATE POLICY "claim_evidence_select_policy" ON public.claim_evidence
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.claims c
      WHERE c.id = claim_evidence.claim_id
      AND (c.is_demo = true OR c.created_by = auth.uid() OR public.current_user_role() = 'adjuster')
    )
  );

DROP POLICY IF EXISTS "claim_evidence_insert_policy" ON public.claim_evidence;
CREATE POLICY "claim_evidence_insert_policy" ON public.claim_evidence
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.claims c
      WHERE c.id = claim_evidence.claim_id
      AND (c.is_demo = true OR c.created_by = auth.uid() OR public.current_user_role() = 'adjuster')
    )
  );

-- 14. RLS POLICIES FOR CLAIM REVIEWS
DROP POLICY IF EXISTS "claim_reviews_select_policy" ON public.claim_reviews;
CREATE POLICY "claim_reviews_select_policy" ON public.claim_reviews
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.claims c
      WHERE c.id = claim_reviews.claim_id
      AND (c.is_demo = true OR c.created_by = auth.uid() OR public.current_user_role() = 'adjuster')
    )
  );

DROP POLICY IF EXISTS "claim_reviews_insert_policy" ON public.claim_reviews;
CREATE POLICY "claim_reviews_insert_policy" ON public.claim_reviews
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.claims c
      WHERE c.id = claim_reviews.claim_id
      AND (c.is_demo = true OR c.created_by = auth.uid() OR public.current_user_role() = 'adjuster')
    )
  );

-- 15. STORAGE POLICIES (claim-evidence BUCKET)
DROP POLICY IF EXISTS "storage_claim_evidence_select" ON storage.objects;
CREATE POLICY "storage_claim_evidence_select" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'claim-evidence' AND
    (
      auth.role() = 'authenticated' OR
      (storage.foldername(name))[1] = 'demo' OR
      (storage.foldername(name))[1] = 'CLM-DEMO-001'
    )
  );

DROP POLICY IF EXISTS "storage_claim_evidence_insert" ON storage.objects;
CREATE POLICY "storage_claim_evidence_insert" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'claim-evidence' AND
    auth.role() = 'authenticated'
  );

-- 16. DEMO SEED CLAIM (CANONICAL SCENARIO 01)
INSERT INTO public.claims (
  id,
  status,
  driver_name,
  counterparty_name,
  location_text,
  incident_datetime,
  driver_statement,
  vehicle_a,
  vehicle_b,
  ai_analysis,
  reviewed_data,
  cai_fields,
  audit_trail,
  reviewer_notes,
  is_demo,
  submitted_at,
  created_at
) VALUES (
  'CLM-DEMO-001',
  'submitted',
  'John Miller',
  'Claire Anderson',
  'Milan metropolitan area, Italy',
  '2026-09-26 14:22:00+02',
  'I was travelling straight through the intersection when the other vehicle entered my path.',
  '{"make": "Volkswagen", "model": "Golf VII", "plate": "AB 123 CD", "color": "Dark Gray", "damageArea": "Front-right corner / bumper", "damageDescription": "Deformation on front bumper, headlight assembly, and right fender"}'::jsonb,
  '{"make": "Volkswagen", "model": "Golf VII", "plate": "EF 456 GH", "color": "Silver Metallic", "damageArea": "Front-left fender / front door", "damageDescription": "Impact crease on left front wing, scratches on front wheel arch and driver door"}'::jsonb,
  '{"model": "gemini-3.8-flash", "analyzedAt": "2026-09-26T14:25:00Z", "observedFacts": [{"statement": "Two passenger vehicles collided at a signalized/marked urban intersection.", "source": "image", "evidenceRefs": ["01-overview.png", "04-road-context.png"]}, {"statement": "Dark gray vehicle (Vehicle A) shows contact deformation on its front-right bumper and headlight.", "source": "image", "evidenceRefs": ["02-vehicle-a-damage.png"]}, {"statement": "Silver vehicle (Vehicle B) shows lateral contact damage on front-left fender and wheel arch.", "source": "image", "evidenceRefs": ["03-vehicle-b-damage.png"]}], "inferredDynamics": [{"statement": "Trajectories are consistent with intersecting paths at an intersection collision.", "rationale": "Debris field and relative vehicle rest positions match oblique frontal-lateral contact angle.", "confidenceLabel": "medium"}], "visibleDamage": [{"vehicle": "A", "area": "Front-right corner", "description": "Bumper shell crushed, right headlight lens shattered, fender displaced.", "evidenceRefs": ["02-vehicle-a-damage.png"]}, {"vehicle": "B", "area": "Front-left wing & door", "description": "Wing panel crumpled inwards, scratch marks extending toward front door seam.", "evidenceRefs": ["03-vehicle-b-damage.png"]}], "missingInformation": ["Traffic light signal state at the exact moment of entry into intersection", "Statements from independent eyewitnesses", "Post-impact braking distance traces"], "epistemicNotice": "AI generated analysis. Observations separated from inferences. No liability assigned."}'::jsonb,
  '{"confirmedByDriver": true, "confirmationDate": "2026-09-26T14:28:00Z", "corrections": []}'::jsonb,
  '[{"code": "1", "label": "Data e Ora Incidente", "value": "2026-09-26 14:22", "provenance": "MANUAL", "isConfirmed": true}, {"code": "2", "label": "Località", "value": "Milan metropolitan area, Italy", "provenance": "MANUAL", "isConfirmed": true}, {"code": "3", "label": "Feriti", "value": "No (0 feriti)", "provenance": "MANUAL", "isConfirmed": true}, {"code": "7A", "label": "Targa Veicolo A", "value": "AB 123 CD", "provenance": "MANUAL", "isConfirmed": true}, {"code": "7B", "label": "Targa Veicolo B", "value": "EF 456 GH", "provenance": "MANUAL", "isConfirmed": true}]'::jsonb,
  '[{"id": "aud-1", "timestamp": "2026-09-26T14:23:00Z", "actor": "SYSTEM_INGEST", "actorName": "IMPACTA Driver Portal", "action": "CREATE_CLAIM", "objectAffected": "CLM-DEMO-001"}, {"id": "aud-2", "timestamp": "2026-09-26T14:25:00Z", "actor": "AI_ENGINE", "actorName": "Gemini 3.8 Flash Multimodal", "action": "ANALYSIS_COMPLETE", "objectAffected": "ai_analysis"}, {"id": "aud-3", "timestamp": "2026-09-26T14:28:00Z", "actor": "REVIEWER", "actorName": "John Miller (Driver)", "action": "CONFIRM_DECLARATION", "objectAffected": "reviewed_data"}, {"id": "aud-4", "timestamp": "2026-09-26T14:29:00Z", "actor": "REVIEWER", "actorName": "John Miller (Driver)", "action": "SUBMIT_CLAIM", "objectAffected": "status: submitted"}]'::jsonb,
  'Automated AI analysis completed. Driver confirmed declaration and submitted claim.',
  true,
  '2026-09-26T14:29:00Z',
  '2026-09-26T14:23:00Z'
)
ON CONFLICT (id) DO UPDATE
SET
  status = EXCLUDED.status,
  driver_name = EXCLUDED.driver_name,
  counterparty_name = EXCLUDED.counterparty_name,
  location_text = EXCLUDED.location_text,
  incident_datetime = EXCLUDED.incident_datetime,
  driver_statement = EXCLUDED.driver_statement,
  vehicle_a = EXCLUDED.vehicle_a,
  vehicle_b = EXCLUDED.vehicle_b,
  ai_analysis = EXCLUDED.ai_analysis,
  reviewed_data = EXCLUDED.reviewed_data,
  cai_fields = EXCLUDED.cai_fields,
  audit_trail = EXCLUDED.audit_trail,
  reviewer_notes = EXCLUDED.reviewer_notes,
  submitted_at = EXCLUDED.submitted_at,
  updated_at = now();

-- 17. DEMO SEED EVIDENCE RECORDS
INSERT INTO public.claim_evidence (id, claim_id, file_path, file_name, mime_type, size_bytes, category, category_label, is_real_upload, metadata)
VALUES
  ('EVD-DEMO-001', 'CLM-DEMO-001', 'demo/01-overview.png', '01-overview.png', 'image/png', 3768912, 'SCENE_OVERVIEW', 'Scene Overview', false, '{"scenario": "scenario-01"}'::jsonb),
  ('EVD-DEMO-002', 'CLM-DEMO-001', 'demo/02-vehicle-a-damage.png', '02-vehicle-a-damage.png', 'image/png', 2760572, 'DAMAGE_A', 'Vehicle A Damage', false, '{"scenario": "scenario-01"}'::jsonb),
  ('EVD-DEMO-003', 'CLM-DEMO-001', 'demo/03-vehicle-b-damage.png', '03-vehicle-b-damage.png', 'image/png', 2893029, 'DAMAGE_B', 'Vehicle B Damage', false, '{"scenario": "scenario-01"}'::jsonb),
  ('EVD-DEMO-004', 'CLM-DEMO-001', 'demo/04-road-context.png', '04-road-context.png', 'image/png', 3276797, 'ROAD_SIGNS', 'Road & Traffic Signs', false, '{"scenario": "scenario-01"}'::jsonb)
ON CONFLICT (id) DO NOTHING;
