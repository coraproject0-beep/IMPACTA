# IMPACTA — AI Road Accident Intelligence & Claims Intake

> **Unified Platform for Driver Roadside Intake & Insurer Claims Operations**  
> Developed by **Token Titans**

---

## Overview

**IMPACTA** transforms messy, fragmented road-accident evidence—smartphone damage photos, police records, driver statements, and connected-vehicle black-box telemetry—into structured, reviewable insurance claim dossiers and CAI-compatible workspaces.

The platform unites two interoperable, browser-local products:

1. **IMPACTA Driver (`/app`)**: A mobile-first, low-cognitive-load progressive web application for drivers at the crash scene. Guides physical safety, structured 6-view damage photography, counterparty exchange, instant simulated reconstruction, and plain-language CAI validation.
2. **Claims Operations Console (`/console/*`)**: A high-density enterprise workspace for insurance claims adjusters and SIU fraud triage specialists. Features automated kinematics reconstruction, 10–20Hz vehicle telemetry correlation, CAI workspace review, and human-in-the-loop triage queues.
3. **Prototype Gateway (`/`)**: A restrained landing page directing users to either experience with full academic prototype disclosures.

> [!NOTE]
> **Synthetic Demo Environment**: This application runs completely offline using browser-local storage (`localStorage` and `IndexedDB`) with a deterministic dataset of 14 synthetic Italian motor claims and a pre-configured policyholder profile for Matteo Bianchi (Volkswagen Golf VIII). No external backend servers or carrier APIs are invoked.

---

## Key Features

### 1. IMPACTA Driver (`/app`)
- **Mobile-First PWA**: PWA-ready (`/manifest.json`, `/sw.js`) with responsive mobile layout and home-screen install prompt.
- **Offline Resilience**: Automatically detects network status and reassures policyholders that all inputs and photos are safely stored locally on device.
- **9-Step Intake Wizard (`/app/report`)**:
  1. *Safety & Medical Check* (with 112 calling guidance)
  2. *Incident Basics* (date, time, location, vehicles, injuries, police)
  3. *Guided 6-Angle Photo Capture* (front, rear, profiles, suspension, scene)
  4. *Counterparty Details* (plates, insurer, policy)
  5. *Driver Statement* (guided narrative)
  6. *Multimodal Transformation* (demo simulation sequence vs transparent real-upload notice)
  7. *Kinematic Validation* (computed impact angles and speed validation)
  8. *CAI Circumstance Confirmation* (plain-language checks and completeness gauge)
  9. *Confirmation & Console Handoff* (instant claim ID and direct link to Console)
- **Deterministic Demo vs. Real Uploads**: Full 5-stage simulation sequence for the canonical Piazza San Giovanni roundabout demo incident; honest, transparent status message for arbitrary user uploads stating that live AI is disconnected in the prototype.

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
- **Pipeline Analytics (`/console/analytics`)**: Academic benchmarking of AI confidence distributions, dynamic EDR telemetry lift (`telemMeanConf - nonTelemMeanConf`), and escalation drivers.

### 3. Shared Browser-Local Architecture
- **Structured Storage**: Claims and active drafts are maintained in `localStorage` under keys `impacta_claims_v1` and `impacta_driver_draft_v1`.
- **Blob Storage via IndexedDB**: Heavy camera photos are safely stored in IndexedDB database `impacta_media_db` (`evidence_blobs`), preventing browser quota overflow errors.
- **Cross-Tab Reactivity**: Driver submissions trigger `storage` events that immediately update open Claims Console tabs in real-time.
- **Reset Demo Data**: A discrete trigger available in the Console sidebar and Driver home flushes local stores and restores initial fixtures cleanly.

---

## Information Architecture & Routes

| Route | View | Description |
| :--- | :--- | :--- |
| `/` | Prototype Gateway | Minimal launchpad with links to Driver and Claims Console |
| `/app` | Driver Home | Policyholder dashboard, profile overview, demo & real intake start |
| `/app/report` | Driver Intake Wizard | 9-step mobile reporting workflow with photo evidence capture |
| `/console` | Console Index | Redirects to `/console/overview` |
| `/console/overview` | Operations Dashboard | High-level metrics, funnel progression, and priority triage |
| `/console/claims` | Claims Ledger | Filterable and searchable table of all dossiers |
| `/console/claims/[id]`| Claim Workbench | 6-tab deep-dive investigation environment |
| `/console/review` | AI Intervention Queue | Filtered queue for claims requiring human adjuster triage |
| `/console/analytics` | Pipeline Evaluation | Empirical evaluation metrics and sensor lift benchmarks |

### Backward-Compatible Redirects
Existing bookmarks and links continue to function seamlessly:
- `/overview` ──► `/console/overview`
- `/claims` ──► `/console/claims`
- `/claims/[id]` ──► `/console/claims/[id]`
- `/review` ──► `/console/review`
- `/analytics` ──► `/console/analytics`

---

## Getting Started

### Prerequisites

- Node.js (v18.17+ recommended, v20+ supported)
- npm (v9+ recommended)

### Installation

```bash
# Clone or navigate to the repository
cd C:\Dev\ANTI\IMPACTA

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Launch either **IMPACTA Driver** (`/app`) or the **Claims Console** (`/console`).

### Testing Cross-Product Handoff
1. Open [http://localhost:3000/console/claims](http://localhost:3000/console/claims) in one browser window.
2. In a second window (or mobile device emulator), open [http://localhost:3000/app](http://localhost:3000/app).
3. Click **"Run Canonical Demo Incident"** in the Driver experience.
4. Step through the 9 steps and submit the dossier.
5. Watch the claim appear in the Claims Console in real time, or click the generated link to immediately inspect it.

### Production Build

```bash
# Build the production bundle
npm run build

# Start the production server
npm run start
```

---

## Architecture & Technology

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS (Enterprise Light Theme Only)
- **Client Persistence**: `localStorage` (claims, draft states) & `IndexedDB` (high-res media blobs)
- **PWA Capabilities**: Service Worker shell caching, Web App Manifest, Standalone display mode
- **Visuals & Charts**: Lightweight custom SVG charts (zero third-party chart library dependencies)
- **Documentation**:
  - Full Product Specification: [`docs/IMPACTA_V1_SPEC.md`](docs/IMPACTA_V1_SPEC.md)
  - Driver Experience Deep Dive: [`docs/DRIVER_EXPERIENCE_V1.md`](docs/DRIVER_EXPERIENCE_V1.md)

---

## License

Academic Prototype — Token Titans. All rights reserved.
