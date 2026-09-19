# IMPACTA Driver Experience Specification — v2.0

**Product:** IMPACTA Driver (Consumer Accident Intake & Claims PWA)  
**Team:** Token Titans  
**Document Version:** 2.0.0  
**Status:** Implemented (Phase 3 Design & Product Separation Reset)  

---

## 1. Overview & Purpose

**IMPACTA Driver** (`/app`) is a low-cognitive-load, mobile-first progressive web application designed for policyholders immediately following a motor vehicle collision.

In roadside emergency conditions, drivers experience acute psychological stress, disorientation, and time pressure. Traditional insurance portals and paper CAI forms fail by overwhelming users with technical insurance questionnaires, multi-level menus, and complex data schemas.

Phase 3 established a **complete product separation and visual reset**:
- **Strict Product Separation:** Root `/` redirects directly to `/app`. Zero links to `/console` exist within the driver experience. Evaluators open separate tabs to inspect adjuster workflows.
- **Warm, Human Home Screen:** Welcomes Matteo Bianchi with daylight vehicle context, policy status, a dominant single CTA `[ Report an accident ]`, and summary of recent reports.
- **4 Macro Phases:** Replaced fragmented 9-step forms with 4 human-centered macro phases:
  1. *Safety Check*
  2. *Accident Details*
  3. *Capture Evidence & Statement*
  4. *Review & Confirmation*
  5. *Confirmed Receipt*
- **Explicit Save & Exit:** Header includes `← Back`, Phase title, and `Save & exit` with draft persistence.
- **Desktop Split-Screen:** Replaced cramped mobile containers with spacious responsive two-column layouts pairing editorial photography with progress roadmaps.
- **High-Quality Photography:** Clean daylight European road and vehicle photography stored locally in `public/images/`.
- **Honest AI Disclosure:** Deterministic simulation for demo incidents, and transparent local storage notice for real uploads.

---

## 2. Information Architecture & Navigation

The Driver product features dedicated top-level navigation:
- **Home (`/app`)**: Policyholder dashboard with vehicle card, primary CTA, and filed reports summary.
- **Reports (`/app/reports`)**: Archive of submitted claims and drafts with receipt inspector modal.
- **Profile (`/app/profile`)**: Policy details, vehicle specs, and discrete **Prototype Evaluation & Utilities** ("Load Demo Incident" and "Reset Demo Data").

> **Active Report Suppression:** When a driver enters `/app/report`, top and bottom global navigation bars are automatically hidden to maintain focus. The header transforms into an active report header with `← Back`, Phase title, and `Save & exit`.

---

## 3. Macro Phase Breakdown

```
[Phase 1: Safety] ──► [Phase 2: Accident] ──► [Phase 3: Capture & Statement] ──► [Phase 4: Review]
                                                                                       │
                                                                                       ▼
                                                                             [Phase 5: Confirmed]
```

### Phase 1: Safety
- **Goal:** Ensure physical safety before evidentiary intake.
- **Features:** Emergency hazards, safety vests, reflective triangle placement, and physical well-being verification.
- **Emergency Integration:** Actionable 112 hotline button with clear note that operators speak Italian and English. Non-automated (does not auto-dial without user action).

### Phase 2: Accident Details
- **Goal:** Position the accident on the road network with minimal typing.
- **Features:** Progressive disclosure for location (street, city, junction type), crash date/time, vehicle count, injuries, and police presence.
- **One-Click Pre-fill:** "Use Florence Piazza San Giovanni Roundabout" helper button for quick demonstration.

### Phase 3: Capture Evidence & Statement
- **Goal:** Capture high-utility photographic evidence, counterparty details, and statement in one coherent phase.
- **Features:**
  - 4-slot visual photo guide:
    1. *The Whole Scene* (5–10m wide overview showing both vehicles and road markings)
    2. *Your Vehicle Damage* (Golf VIII contact area)
    3. *Other Vehicle & Plate* (Counterparty plate and damage)
    4. *Documents or Extra Detail* (Green card, license, debris)
  - Native camera capture: `<input type="file" accept="image/*" capture="environment" />`
  - Counterparty exchange fields (name, phone, plate, insurer)
  - Narrative statement prompt with helpful hints

### Phase 4: Review & Confirmation
- **Goal:** Build confidence, explain accident dynamics in plain English, and secure legal declaration.
- **Features:**
  - Plain-English reconstruction check:
    *"Based on the available information, this appears consistent with: You were travelling through the roundabout. The other vehicle entered from your right. Contact occurred near the front-left area of your vehicle. Does this match what happened? [ Yes, this matches ] [ Edit Details ]"*
  - Honest analysis status: 4-check simulation indicator for demo incident; transparent local-storage disclaimer for real uploads.
  - CAI Box 12 circumstance toggles in natural terminology (Circumstance 7 and Circumstance 6).
  - Mandatory confirmation checkbox: *"I declare that the information, statements, and photographic evidence provided in this report are true and accurate to the best of my knowledge..."*
  - Primary CTA: `[ Submit Claim Report ]`

### Phase 5: Confirmed Receipt
- **Goal:** Provide reassurance, official reference number, and clear next steps.
- **Features:**
  - Claim ID (`CLM-YYYY-XXXX`)
  - Official submission timestamp
  - Preserved evidence count (stored in browser IndexedDB)
  - Local persistence notice
  - Action buttons: `[ View Report in Reports ]` (`/app/reports`) and `[ Return to Driver Home ]` (`/app`).
  - **Zero links to `/console`**.

---

## 4. Technical & Local Storage Architecture

- **State Management:** Managed by `DriverDraftContext` (`src/context/DriverDraftContext.tsx`).
- **Autosave:** All draft modifications are debounced and serialized to `localStorage` key `impacta_driver_draft_v1`. Large file objects are stripped before serialization.
- **IndexedDB Photo Storage:** Heavy photos are safely stored in IndexedDB database `impacta_media_db` (`evidence_blobs`), preventing quota overflow.
- **Cross-Tab Sync:** Submission maps the draft to a full `Claim` object via `driverToClaimMapper`, triggering a window storage event that immediately syncs open Claims Console tabs.
- **Prototype Utilities:** Discrete buttons in `/app/profile` allow loading the canonical Florence demo incident or resetting all local state back to initial fixtures.
