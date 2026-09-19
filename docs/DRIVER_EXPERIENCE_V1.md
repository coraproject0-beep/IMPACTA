# IMPACTA Driver Experience Specification — v1.0

**Product:** IMPACTA Driver (Mobile Consumer Accident Intake)  
**Team:** Token Titans  
**Document Version:** 1.0.0  
**Status:** Implemented (Mobile PWA Operational Prototype)  

---

## 1. Overview & Purpose

**IMPACTA Driver** (`/app`) is a mobile-first, low-cognitive-load progressive web application designed for policyholders immediately following a motor vehicle collision. 

At the crash scene, drivers experience acute psychological stress, elevated adrenaline, and reduced working memory. Traditional insurance claims apps and paper CAI (*Constatazione Amichevole d'Incidente*) forms fail in this environment by presenting overwhelming questionnaires, intimidating legal jargon, and rigid input requirements.

IMPACTA Driver solves this by providing:
- **Calm, stepwise guidance:** Broken into focused, sequential checkpoints with reassuring status indicators.
- **Physical safety prioritization:** Explicit emergency triage and checklist before evidentiary intake.
- **Structured damage photography:** Visual 6-angle capture guide ensuring adjuster-quality evidence collection.
- **Offline resilience:** Absolute reassurance that reports and photo blobs remain safely stored on the device even without cellular connectivity.
- **Transparent AI boundary:** Deterministic simulated analysis for the canonical demo scenario, contrasted with an honest, transparent status message for arbitrary user uploads.
- **Driver-friendly CAI confirmation:** Clear circumstance confirmations and completeness auditing prior to submission.
- **Direct console handoff:** Instant creation of a canonical claim dossier accessible to adjusters in the Claims Console.

---

## 2. Information Architecture & Multi-Step Flow

The reporting wizard is organized into 9 discrete lifecycle steps:

```
[1. Safety] ──► [2. Incident Basics] ──► [3. 6-View Evidence] ──► [4. Counterparty]
                                                                        │
                                                                        ▼
[8. CAI Review] ◄── [7. Reconstruction] ◄── [6. AI Analysis] ◄── [5. Statement]
       │
       ▼
[9. Dossier Submitted & Console Handoff]
```

### Step Breakdown

| Step ID | Route/State | Name | User Goal & Actions |
| :--- | :--- | :--- | :--- |
| **Step 1** | `SAFETY` | Safety & Medical Check | Verify physical safety, hazard lights, vests. Actionable 112 emergency calling assistance. |
| **Step 2** | `BASICS` | Date, Time & Location | Select incident date/time, street location (Piazza San Giovanni pre-fill), vehicle count, injuries flag, police presence. |
| **Step 3** | `EVIDENCE` | Guided Photo Capture | 6-view structured damage gallery (Front, Rear, Left/Right profiles, Wheel/Suspension, Scene overview). |
| **Step 4** | `COUNTERPARTY`| Other Driver Details | Counterparty license plate, driver name, phone, insurance company, policy number. |
| **Step 5** | `STATEMENT` | Your Statement | Calm narrative text area with guidance prompts ("What speed?", "Which lane?", "Weather?"). |
| **Step 6** | `ANALYSIS` | AI Transformation | Multi-stage simulation for demo incident, or transparent disconnection disclaimer for real user uploads. |
| **Step 7** | `RECONSTRUCTION`| Kinematic Validation| Driver review of computed impact angles, collision speeds, and initial priority inferences. |
| **Step 8** | `CAI_REVIEW` | Friendly CAI Review | Review of extracted CAI fields, circumstance confirmations, and required driver confirmation checkbox. |
| **Step 9** | `SUBMITTED` | Confirmation & Handoff | Receipt with generated Claim ID (`CLM-YYYY-XXXX`), local prototype notice, and direct link to Claims Console. |

---

## 3. Architecture & State Management

### 3.1 `DriverDraftContext`
The intake lifecycle is managed through `DriverDraftContext` (`src/context/DriverDraftContext.tsx`).
- **Autosave & Persistence:** Draft state is continuously debounced and synchronized to browser `localStorage` under the key `impacta_driver_draft_v1`.
- **Session Recovery:** When a driver reloads the page or returns after an interruption, the active step and filled fields are automatically rehydrated.
- **Fixtures & Reset:** One-click loading of the canonical demo scenario (Matteo Bianchi profile and roundabout collision) or creation of a clean blank report.

### 3.2 Media Blob Storage via IndexedDB
High-resolution photos captured via device cameras can easily exceed the 5MB browser `localStorage` quota. To ensure bulletproof local persistence without quota exceptions:
- **`mediaStorage.ts`:** Lightweight promise-based IndexedDB wrapper (`impacta_media_db`, store `evidence_blobs`).
- **Blob Storage:** When a photo is uploaded or taken, the raw `Blob` is stored in IndexedDB keyed by item ID, while a lightweight object URL or thumbnail reference is stored in the draft state.
- **Cleanup & Reset:** Integrated with the global `resetDemoData()` hook to safely flush media stores during demo resets.

---

## 4. PWA & Offline Experience

### 4.1 Progressive Web App Configuration
- **Web App Manifest:** Configured in `public/manifest.json` with standalone display mode, theme colors (`#2563eb`), and responsive icons.
- **Service Worker:** Registered via `public/sw.js` to cache static application shells and ensure offline availability.
- **Install Prompt Banner:** Non-intrusive banner (`InstallPrompt.tsx`) offering one-tap home screen installation.

### 4.2 Offline Reassurance
At crash scenes with poor cellular coverage, drivers must not fear losing their inputs:
- **`OfflineNotice.tsx`:** Real-time connectivity monitor listening to `window.online` and `window.offline` events.
- **Reassuring Copy:** Explicitly informs the user: *"You are currently offline. All incident details and photos are safely stored on your device and will synchronize when connection is restored."*

---

## 5. Guided 6-View Evidence Capture

Inexperienced drivers frequently take unhelpful close-up photos of scratch marks without context. IMPACTA Driver implements a standardized 6-view damage template:

1. **Front View (Vehicle A):** Captures bumper alignment, headlights, radiator grille, and license plate.
2. **Rear View (Vehicle A):** Captures rear bumper, tailgate, and tail lamps.
3. **Left Side / Impact Profile:** Captures side panels, doors, and pillar deformation.
4. **Right Side Profile:** Baseline comparison for non-impact side.
5. **Wheel & Suspension Close-up:** Captures rim scrapes, tire deflection, and axle displacement.
6. **Overall Scene & Junction:** Wide contextual shot of road markings, roundabout yield signs, and traffic lanes.

Photos can be captured via direct camera trigger (`accept="image/*"`, `capture="environment"`) or chosen from the device photo library.

---

## 6. Deterministic Demo vs. Real Upload Dual Path

A cornerstone of IMPACTA's architectural integrity is avoiding misleading "fake AI" claims. The platform clearly bifurcates demo simulations from real uploads:

### 6.1 Canonical Demo Incident
- **Scenario:** Collision in Piazza San Giovanni roundabout, Florence.
- **Vehicle A:** Volkswagen Golf VIII (Plate `GF492XP`, Policyholder Matteo Bianchi).
- **Vehicle B:** BMW 320d (Plate `EK712MM`, Counterparty Marco Rossi).
- **Transformation Sequence:** A peaceful, 5-stage progress indicator simulates:
  1. *Optical OCR & Plate Verification*
  2. *Damage Zone Segmentation*
  3. *Kinematic Physics Trajectory Solver*
  4. *CAI Circumstance Alignment*
  5. *Dossier Assembly*
- **Outcome:** Populates full simulated kinematics, 360° impact vectors, and high-confidence CAI extraction.

### 6.2 Transparent Real-Upload Path
- **Honest Disconnection Notice:** When a user uploads their own photos or enters an arbitrary narrative, IMPACTA Driver explicitly states:
  > *"Live Multimodal AI Disconnected: In this prototype environment, neural vision and kinematic solvers are not connected to external cloud servers. Your uploaded photos have been stored safely in local IndexedDB. Baseline incident fields are forwarded to the Claims Console for manual adjuster review."*
- **No Hallucinated Data:** The system does not pretend to compute false impact telemetry from arbitrary images, maintaining total scientific credibility.

---

## 7. Driver-Facing CAI Review & Circunstance Validation

European insurance claims heavily depend on the 17 standardized CAI circumstances (Box 12 of the form). 

IMPACTA translates these dense legal clauses into plain-language questions:
- *"Was your vehicle circulating inside a roundabout?"*
- *"Were you driving in the same direction in a different lane?"*
- *"Were you changing lanes?"*
- *"Were you slowing down or stopping in traffic?"*

### Completeness & Confirmation
- **Completeness Gauge:** Dynamically calculates the percentage of required CAI fields populated.
- **Driver Verification Checkbox:** An explicit review declaration (*"I confirm that the incident details, counterparty information, and damage summary above accurately reflect the collision to the best of my recollection."*) must be checked before final submission.

---

## 8. Handoff to Claims Console

When the driver taps **"Submit Incident Dossier"**:
1. `driverToClaimMapper.ts` transforms the `DriverDraft` into a canonical `Claim` entity.
2. The claim is written to `localStorage` under `impacta_claims_v1`.
3. A cross-tab `storage` event triggers all open Claims Console windows to immediately re-query `ClaimsRepository`.
4. The confirmation screen presents the generated Claim ID and provides an instant link to `/console/claims/[id]`.
5. Claims adjusters can immediately open the dossier, inspect the uploaded photos, review the CAI workspace, and triage the claim.
