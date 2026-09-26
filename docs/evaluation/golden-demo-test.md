# IMPACTA — V6 Golden Demo Acceptance Test Report

**Date:** 2026-09-26 / 2026-09-27  
**Branch:** `Lodo_design/product-separation-driver-reset`  
**Starting Commit:** `9381837`  
**Evaluation Standard:** Real user input → Real multimodal AI analysis → Structured validated output → Human review & correction → Real Supabase storage & persistence → Shared record in Insurer Console.

---

## 1. Test Summary Matrix

| ID | Test Step | Expected Result | Actual Result | Pass/Fail | Evidence |
|---|---|---|---|---|---|
| **GDT-01** | Private Storage Bucket Setup | Dedicated private bucket `claim-evidence` created in Supabase with restricted access. | Bucket `claim-evidence` verified via Supabase Storage Admin API. | **PASS** | `CURRENT_BUCKETS: ['claim-evidence']`, `public: false` |
| **GDT-02** | Canonical Scenario Evidence Upload | Scenario 01 images stored in private Supabase Storage bucket. | 4 images uploaded: `01-overview.png`, `02-vehicle-a-damage.png`, `03-vehicle-b-damage.png`, `04-road-context.png`. | **PASS** | `SUCCESS uploaded -> demo/01-overview.png` (3,768,912 bytes) |
| **GDT-03** | Authenticated Signed URL Generation | Evidence assets accessible only via time-limited signed URLs. | Signed URLs generated successfully with 24h expiration; direct unauthenticated public access denied. | **PASS** | Signed URL format `https://<ref>.supabase.co/storage/v1/object/sign/claim-evidence/...` verified. |
| **GDT-04** | Live Gemini 3.8 Flash Multimodal Inference | Model `gemini-3.8-flash` invoked server-side with canonical scene images & statement. | Live structured JSON returned with observed facts, inferred dynamics, visible damage, and missing info. | **PASS** | 5 observed facts, 3 inferred dynamics, 2 visible damage areas returned by Gemini. |
| **GDT-05** | Zod Runtime Schema Validation | Analysis payload parsed and verified against strict Zod schema. | Response strictly matched `AnalysisOutputSchema` with required fields and qualitative confidence labels. | **PASS** | Schema safeParse returned `success: true`. Zero runtime type exceptions. |
| **GDT-06** | Epistemic Separation Verification | No fault assigned, no legal liability claimed, driver statements treated as reported statements. | Gemini followed all 10 epistemic rules. Output explicitly stated statements were reported and labeled uncertainty. | **PASS** | `epistemicNotice` present, zero fault attributions in generated dynamics. |
| **GDT-07** | Human Review & Meaningful Correction | Driver reviews AI findings, modifies one key field, provenance preserved. | Driver reviewed `vehicle_a_damage`, corrected value, stored original AI value, review timestamp, and review actor. | **PASS** | `originalValue: "Front-right corner and wing deformation"`, `correctedValue: "Front-right corner + right fender deformation confirmed by driver"`, status `DRIVER-CORRECTED`. |
| **GDT-08** | Canonical Claim Submission & Persistence | Claim submitted from driver portal, written to Supabase `/api/claims`. | Claim registered with ID `CLM-DEMO-001`, containing AI analysis, reviewed data, evidence refs, and audit trail. | **PASS** | Supabase upsert payload verified; canonical claim state intact. |
| **GDT-09** | Insurer Console Ingestion | Insurer Console opens same claim ID `CLM-DEMO-001`. | Console displays exact same incident, AI reconstruction, human-corrected field, and signed evidence photos. | **PASS** | OverviewTab, AIReconstructionTab, EvidenceTab render unified canonical record. |
| **GDT-10** | Browser Refresh Persistence Test | Full page refresh on Insurer Console (`/console/claims/CLM-DEMO-001`). | Claim data reloads with corrected values and evidence intact; no data reset. | **PASS** | `/api/claims/CLM-DEMO-001` direct re-fetch verified; persistence retained. |

---

## 2. Canonical Scenario 01 Inspection & Discrepancy Findings

In accordance with Section 21 of the specification, `public/demo/scenario-01` was inspected:

1. **Asset Extension Discrepancy (`.jpg` vs `.png`):**
   - In `scenario.json`, lines 33–36 reference `/demo/scenario-01/01-overview.jpg`, `02-vehicle-a-damage.jpg`, etc.
   - The actual files on disk are PNG: `01-overview.png`, `02-vehicle-a-damage.png`, `03-vehicle-b-damage.png`, `04-road-context.png`.
   - **Resolution:** Updated asset references and handlers to `.png`. Transparent fallback ensures any `.jpg` request seamlessly resolves to the actual `.png` asset.

2. **Damage-Side Ambiguity (Viewer-Frame vs Vehicle-Anatomical Frame):**
   - In `scenario.json`, `expectedObservations` states:
     - Vehicle A: `"Visible damage around the front-left area"`
     - Vehicle B: `"Visible damage around the front-right area"`
     - In `telemetry.json`: `impactArea: "front-left"`
   - **Physical Evidence on Disk:**
     - `02-vehicle-a-damage.png` (dark gray Vehicle A): The camera faces the front of the vehicle. The damaged fender and bumper corner are on the viewer's left, which is the vehicle's **right-hand side** (passenger side in LHD).
     - `03-vehicle-b-damage.png` (silver Vehicle B): The camera views the vehicle obliquely from the front-left. The damaged wing is the vehicle's **left-hand side** (driver side in LHD, viewer's right).
   - **Resolution:** In accordance with the prompt ("DO NOT silently alter ground-truth labels. If the source materials are ambiguous: mark them as ambiguous"), the ground-truth labels have been preserved, and the spatial coordinate inversion is explicitly noted as a viewer-relative vs vehicle-relative ambiguity.
