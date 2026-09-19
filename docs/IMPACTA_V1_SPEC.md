# IMPACTA Architectural Specification — v3.0

**Product:** IMPACTA (Road Accident Intelligence & Claims Operations Platform)  
**Team:** Token Titans  
**Document Version:** 3.0.0  
**Status:** Implemented (Phase 3 Product Separation & Driver UX Reset)  

---

## 1. Product Separation & System Topology

**IMPACTA** unites two specialized, strictly separated user surfaces connected by a shared browser-local persistence architecture:

```
┌──────────────────────────────────────┐          ┌──────────────────────────────────────┐
│            IMPACTA Driver            │          │        Claims Operations Console     │
│                 /app                 │          │               /console/*             │
│   (Consumer Accident Reporting PWA)  │          │   (Enterprise Adjuster Workbench)    │
└──────────────────┬───────────────────┘          └──────────────────▲───────────────────┘
                   │                                                 │
                   │ Creates Claim Dossier                           │ Cross-Tab Sync via Storage Event
                   ▼                                                 │
          ┌─────────────────┐                               ┌────────┴────────┐
          │  Driver Mapper  ├──────────────────────────────►│  ClaimsContext  │
          └────────┬────────┘                               └────────┬────────┘
                   │                                                 │
                   ▼                                                 ▼
      ┌───────────────────────────┐                     ┌─────────────────────────┐
      │         IndexedDB         │                     │      localStorage       │
      │    `impacta_media_db`     │                     │   `impacta_claims_v1`   │
      │   (Binary Photo Blobs)    │                     │  (14 Synthetic Claims)  │
      └───────────────────────────┘                     └─────────────────────────┘
```

### Strict Non-Negotiable Boundaries
- **Direct Entry:** Route `/` redirects directly to `/app`. The developer dual-product card launcher has been removed.
- **Zero Cross-Navigation:** 
  - Driver (`/app`, `/app/report`, `/app/reports`, `/app/profile`) contains **zero** links to `/console`.
  - Claims Console (`/console/*`) contains **zero** links to `/app`.
  - Evaluators switch between roles by opening separate tabs or navigating to `/console` directly.
- **Epistemic Demarcation:** Isolates Observed Physical Facts, Probabilistic Inferences, Adjuster Confirmations, and Missing Data. Never determines legal liability or fault percentages.

---

## 2. Shared Browser-Local Architecture

- **Structured Dossiers (`localStorage`):** Claims are persisted in `localStorage` key `impacta_claims_v1`. Active driver intake drafts persist in `impacta_driver_draft_v1`.
- **Binary Media Storage (`IndexedDB`):** High-resolution camera photos are saved in IndexedDB (`impacta_media_db`, store `evidence_blobs`), eliminating 5MB localStorage quota limits.
- **Cross-Tab Reactivity:** When a driver completes Phase 4 and submits a claim, the claims mapper records the dossier in `localStorage`, triggering a native browser storage event that instantly updates open Claims Console tabs.
- **Deterministic Reset Hook:** `resetDemoData()` resets both `localStorage` and `IndexedDB`, restoring the canonical 14 claims and Matteo Bianchi profile.

---

## 3. IMPACTA Driver Design System

- **Visual Tone:** Light theme only (`bg-slate-50`, `bg-white`, `border-slate-200`). Warm, calm, human, and restrained. Anti-slop subtraction principles applied: no unnecessary cards-inside-cards, no neon pills, no generic gradients.
- **Photography:** Clean European daylight road and vehicle imagery stored locally in `public/images/`:
  - `hero-car.jpg` (European hatchback vehicle context)
  - `road-context.jpg` (European daylight urban road context)
  - `evidence-scene.jpg` (European road junction and roundabout scene)
- **Navigation:**
  - Mobile bottom navigation bar + desktop header tabs (`Home`, `Reports`, `Profile`).
  - Automatically hidden during active report wizard to prevent accidental exit and cognitive overload.
- **Wizard Architecture (4 Macro Phases):**
  - **Phase 1: Safety:** Physical checks, hazard visibility, actionable 112 calling guidance.
  - **Phase 2: Accident Details:** Location, date/time, vehicle count, injuries, police presence with Florence roundabout pre-fill.
  - **Phase 3: Capture Evidence & Statement:** 4-slot visual capture guide with native camera integration (`capture="environment"`), counterparty exchange, and driver narrative.
  - **Phase 4: Review & Confirmation:** Plain-English reconstruction check, honest demo vs. real-upload status, CAI Box 12 circumstance confirmations, accuracy declaration checkbox, and submission CTA.
  - **Phase 5: Confirmed Receipt:** Claim ID (`CLM-YYYY-XXXX`), submission timestamp, local persistence notice, and direct links to `/app/reports` and `/app`.
- **Desktop Responsiveness:** 2-column split-screen layout pairing context photography and progress roadmaps with the active intake form.

---

## 4. Claims Console Enterprise Workbench

- **Overview (`/console/overview`):** High-density KPIs, intake-to-resolution funnel, 14-day histogram, priority triage list.
- **Claims Ledger (`/console/claims`):** Real-time text search across IDs, plates, policyholders, and cities, with status, confidence, and telemetry filters.
- **Workbench (`/console/claims/[id]`):**
  - Dual-party vehicle comparisons and policy validation.
  - Evidence Gallery with optical extraction attributes.
  - AI Kinematics Reconstruction tab with direct physical observations and confidence bands.
  - CAI Box Workspace with field-level provenance badges.
  - Black-Box Telemetry with high-frequency deceleration curves, Delta-V, and 360° impact angle compass.
  - Chronological Audit Trail tracking all reviewer overrides.
- **Review Queue (`/console/review`):** Focused triage queue for low-confidence or conflicting dossiers.
- **Pipeline Analytics (`/console/analytics`):** Confidence distributions and empirical sensor lift benchmarks.
