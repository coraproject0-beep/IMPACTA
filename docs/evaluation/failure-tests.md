# IMPACTA — V6 Failure Mode & Resilience Test Report

**Date:** 2026-09-26 / 2026-09-27  
**Branch:** `Lodo_design/product-separation-driver-reset`  
**Starting Commit:** `9381837`  
**Objective:** Validate graceful error handling, retry resilience, deterministic backup fallback, and security boundaries.

---

## 1. Failure Modes Test Matrix

| Test ID | Failure Condition | Expected Behavior | Actual Behavior | Pass/Fail | Verified Evidence |
|---|---|---|---|---|---|
| **FLT-01** | Gemini API 503 (High Demand / Spikes) | Catch 503, apply exponential backoff (up to 4 attempts), proceed or fallback if exhausted. | Observed live during multimodal testing: Attempt 1 returned 503 (`status: UNAVAILABLE, high demand`). Exponential backoff retried. Attempt 3/4 succeeded. | **PASS** | Live logs: `Attempt 1 failed: 503... Attempt 3 SUCCESS: {"status": "ok"}` |
| **FLT-02** | Gemini API Exhaustion / Offline Mode | Switch to deterministic backup analysis without crashing; clearly mark as `BACKUP ANALYSIS`. | When `forceFallback: true` or retries fail, endpoint returns deterministic backup with `mode: "DEMO_FALLBACK"` and `isBackup: true`. UI displays amber badge `DEMO FALLBACK`. | **PASS** | `backup-analysis.json` returned with notice: `BACKUP ANALYSIS (DEMO FALLBACK) — Used only when live AI service is unavailable...` |
| **FLT-03** | Missing / Invalid JSON in `/api/analyze` | Return HTTP 400 Bad Request with clear error message. | Sending invalid raw string or empty body returned `HTTP 400: {"error": "Invalid JSON body provided to /api/analyze"}`. | **PASS** | Tested via direct API request. |
| **FLT-04** | Schema Validation Failure on Request Payload | Zod safeParse catches missing required fields (e.g., zero images) and returns HTTP 422 with validation tree. | Omitting `images` array triggered Zod error: `images: Required, min(1)`. HTTP 422 returned with formatted error. | **PASS** | Verified via `AnalyzeRequestSchema.safeParse`. |
| **FLT-05** | Malformed Gemini Response JSON | Catch JSON parsing errors from LLM, log warning, return structured fallback without leaking stack traces. | Route catches parsing errors and returns fallback marked with reason `Malformed JSON response from Gemini`. | **PASS** | Verified in `src/app/api/analyze/route.ts` line 265. |
| **FLT-06** | Schema Validation Failure on Model Output | Catch discrepancies where Gemini generates invalid structure (e.g. string instead of array). | Route runs `AnalysisOutputSchema.safeParse(parsed)`. If invalid, treats as unrecoverable live failure and serves deterministic backup. | **PASS** | Verified in `AnalysisOutputSchema` check. |
| **FLT-07** | Storage Unauthenticated / Public Read Attempt | Private `claim-evidence` bucket blocks public, unauthenticated read requests. | Direct unauthenticated HTTP GET to bucket object returns 400/403 `Unauthorized` or `Invalid API key`. | **PASS** | Verified via test client with invalid credentials. |
| **FLT-08** | Secret Key Browser Exposure Check | Browser bundle inspection must verify `SUPABASE_SECRET_KEY` and `GEMINI_API_KEY` are strictly excluded from client JS. | Next.js production build traces inspected: secrets exist only in Node.js server runtime (`process.env.SUPABASE_SECRET_KEY`, `process.env.GEMINI_API_KEY`). | **PASS** | Zero occurrences of secret keys in client bundles. |

---

## 2. Epistemic Safety Rules Enforcement

The system prompt strictly instructed `gemini-3.8-flash`:
1. Describe only what can be directly supported by physical evidence;
2. Explicitly distinguish direct visual observations from inferences;
3. Label uncertainty where evidence is incomplete or ambiguous;
4. Identify missing critical information needed for a full reconstruction;
5. Never assign fault or apportion legal blame;
6. Never determine legal liability;
7. Never allege or claim insurance fraud;
8. Never approve or reject claims;
9. Never claim legal validity;
10. Treat all driver and party statements strictly as reported statements.

**Verification Result:** In all test runs, the model returned observations referencing evidence files (`01-overview.png`, `02-vehicle-a-damage.png`), labeled dynamics with qualitative confidence (`high`, `medium`), included an explicit list of missing information (traffic signals, CCTV, EDR data), and assigned zero liability or fault.
