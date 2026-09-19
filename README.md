# IMPACTA — AI Road Accident Intelligence & Claims Intake

> **Unified Platform for Driver Roadside Intake & Insurer Claims Operations**  
> Developed by **Token Titans**

---

## Overview

**IMPACTA** transforms messy, fragmented road-accident evidence—smartphone damage photos, police records, driver statements, and connected-vehicle black-box telemetry—into structured, reviewable insurance claim dossiers and CAI-compatible workspaces.

The platform is strictly architected into two separate, dedicated products sharing a browser-local persistence foundation:

1. **IMPACTA Driver (`/app`)**: A calm, human, mobile-first progressive web application for drivers at the crash scene or post-accident. Features warm personal context for policyholder Matteo Bianchi (Volkswagen Golf VIII), low cognitive load, a 4-macro-phase reporting workflow, high-quality photography, and clear local persistence.
2. **Claims Operations Console (`/console/*`)**: A high-density enterprise workspace for insurance claims adjusters and SIU fraud triage specialists. Features automated kinematics reconstruction, 10–20Hz vehicle telemetry correlation, CAI workspace review, and human-in-the-loop triage queues.

> [!NOTE]
> **Strict Product Separation**: The root URL (`/`) routes directly to `/app`. Driver and Claims Console operate as completely separated interfaces with zero cross-linking. In evaluation and classroom environments, adjusters and evaluators access the console directly via `/console` or open separate browser tabs.

---

## Key Features

### 1. IMPACTA Driver (`/app`)
- **Product Separation & Dedicated Navigation**: Primary driver navigation across **Home** (`/app`), **Reports** (`/app/reports`), and **Profile** (`/app/profile`). Navigation is automatically suppressed during an active report to preserve focus.
- **Warm & Calm Driver Home (`/app`)**:
  - Personal greeting ("Good morning, Matteo")
  - Insured vehicle badge with clean European daylight photography (VW Golf VIII, plate `GF492XP`)
  - Dominant single CTA: `[ Report an accident ]`
  - In-progress report detection with `[ Resume Accident Report ]`
  - Summary of filed claims
- **Streamlined 4-Macro-Phase Wizard (`/app/report`)**:
  - Top header with `← Back`, Phase title, and explicit `Save & exit` with draft persistence.
  - Responsive two-column desktop split screen with context photography and intake roadmap.
  - **Phase 1: Safety**: Physical safety checklist, hazard visibility, and non-automated European Emergency 112 assistance.
  - **Phase 2: Accident Details**: Progressive disclosure for crash location, date/time, vehicle count, injuries, and police presence with Florence Piazza San Giovanni pre-fill option.
  - **Phase 3: Capture Evidence & Statement**: Visual 4-slot photo guide (Whole Scene, Vehicle A Damage, Other Vehicle & Plate, Documents/Detail) with device camera integration (`capture="environment"`), counterparty driver details, and calm guided narrative statement.
  - **Phase 4: Review & Confirmation**: Plain-English reconstruction check ("Does this match what happened?"), honest demo simulation vs. real-upload local storage disclosure, CAI Box 12 circumstance toggles, accuracy declaration checkbox, and claim submission.
  - **Phase 5: Confirmed Receipt**: Official Claim ID (`CLM-YYYY-XXXX`), submission timestamp, local persistence disclosure, and direct links to `/app/reports` and `/app` (zero console cross-navigation).
- **Reports Directory (`/app/reports`)**: Clean driver archive showing status badges and modal dossier receipts.
- **Profile & Prototype Settings (`/app/profile`)**: Policyholder credentials, policy status, and discreet **Prototype Evaluation & Utilities** ("Load Demo Incident" and "Reset Demo Data").

### 2. Claims Operations Console (`/console/*`)
- **Epistemic AI Separation**: Rigorously isolates *Observed Physical Facts*, *Machine Inferences*, *Adjuster Confirmations*, and *Missing Data*. Never claims to determine legal liability.
- **Operational Overview (`/console/overview`)**: Dynamic KPIs, AI intake-to-resolution funnel, 14-day occurrence histogram, and priority review queue.
- **Claims Management Ledger (`/console/claims`)**: Free-text search across IDs, plates, policyholders, and cities, with multi-criteria status, confidence, and telemetry filters.
- **Claim Detail Workbench (`/console/claims/[id]`)**:
  - **Overview**: Dual-party vehicle comparison, policy validation, editable reviewer notes, and status controllers.
  - **Evidence Gallery**: Visual artifact inspection with optical extraction metadata and confidence scores.
  - **AI Reconstruction (`AIReconstructionTab`)**: Direct physical observations, probabilistic kinematics sequence, and uncertainty boundaries.
  - **CAI Workspace**: Box-mapped CAI review workspace with field-level provenance tags, inline validation, and demo draft generation.
  - **Black-Box Telemetry**: High-frequency deceleration curves, Delta-V calculation, CAN-bus logs, and 360° impact angle compass.
  - **Audit Trail**: Chronological event log tracking automated actions and human overrides without exaggerated security claims.
- **AI Review Queue (`/console/review`)**: Triage workflow for low-confidence models, contradictory statements, or missing evidence.
- **Pipeline Analytics (`/console/analytics`)**: Academic benchmarking of AI confidence distributions, dynamic EDR telemetry lift, and escalation drivers.

### 3. Shared Browser-Local Architecture
- **Structured Storage**: Claims and active drafts are maintained in `localStorage` under keys `impacta_claims_v1` and `impacta_driver_draft_v1`.
- **Blob Storage via IndexedDB**: Heavy camera photos are safely stored in IndexedDB database `impacta_media_db` (`evidence_blobs`), preventing browser quota overflow errors.
- **Cross-Tab Reactivity**: Driver submissions trigger `storage` events that immediately update open Claims Console tabs in real-time.
- **Reset Demo Data**: A discrete trigger available in the Console sidebar and Driver profile flushes local stores and restores initial fixtures cleanly.

---

## Information Architecture & Routes

| Route | View | Description |
| :--- | :--- | :--- |
| `/` | Root Redirect | Automatically redirects to `/app` (Driver experience) |
| `/app` | Driver Home | Personal policyholder greeting, vehicle context, dominant intake CTA |
| `/app/report` | Driver Intake Wizard | 4-macro-phase report wizard with desktop split-screen and native camera capture |
| `/app/reports` | Driver Reports | Policyholder filed claims archive and dossier receipts |
| `/app/profile` | Driver Profile | Policy information, vehicle specs, and prototype evaluation controls |
| `/console` | Console Index | Redirects to `/console/overview` |
| `/console/overview` | Operations Dashboard | High-level metrics, funnel progression, and priority triage |
| `/console/claims` | Claims Ledger | Filterable and searchable table of all dossiers |
| `/console/claims/[id]`| Claim Workbench | 6-tab deep-dive investigation environment |
| `/console/review` | AI Intervention Queue | Filtered queue for claims requiring human adjuster triage |
| `/console/analytics` | Pipeline Evaluation | Empirical evaluation metrics and sensor lift benchmarks |

### Backward-Compatible Redirects
- `/overview` ──► `/console/overview`
- `/claims` ──► `/console/claims`
- `/claims/[id]` ──► `/console/claims/[id]`

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS (Light Theme only, anti-slop restrained palette)
- **Storage:** Browser `localStorage` (Structured claims and drafts) & `IndexedDB` (Binary photo blobs)
- **Deployment Target:** Vercel / Static Node.js

---

## Development & Verification

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Production build verification
npm run build
```
