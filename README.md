# IMPACTA — Claims Intelligence Console

> **AI-Native Road-Accident Intelligence and Insurance Claims-Intake Platform**  
> Developed by **Token Titans**

---

## Overview

**IMPACTA** transforms fragmented road-accident evidence—smartphones photos, police records, driver statements, and connected-vehicle black-box telemetry—into structured, reviewable insurance claim dossiers and CAI-compatible workspaces.

This repository contains the insurer-facing operational application: **IMPACTA Claims Console**.

> [!NOTE]
> **Synthetic Demo Environment**: This application runs completely offline using a deterministic dataset of 14 synthetic Italian motor claims. No real insurer connections, customer data, or external AI APIs are invoked in this version.

---

## Key Features

- **Epistemic AI Separation**: Explicitly isolates *Observed Physical Facts*, *Machine Inferences*, *Adjuster Confirmations*, and *Missing Data*. Never claims to determine legal liability.
- **Operational Overview**: Dynamic KPIs, AI intake-to-resolution funnel, 14-day occurrence histogram, and priority review queue.
- **Claims Management Ledger**: Free-text search across IDs, plates, policyholders, and cities, with multi-criteria status, confidence, and telemetry filters.
- **Claim Detail Workbench (`/claims/[id]`)**:
  - **Overview**: Dual-party vehicle comparison, policy validation, editable notes, and status controllers.
  - **Evidence Gallery**: Visual artifact inspection with optical extraction metadata and confidence scores.
  - **AI Reconstruction**: Direct physical observations, probabilistic kinematics sequence, and uncertainty boundaries.
  - **CAI Workspace**: Box-mapped CAI review workspace with field-level provenance tags, inline validation, and demo draft generation.
  - **Black-Box Telemetry**: High-frequency deceleration curves, Delta-V calculation, CAN-bus logs, and 360° impact angle compass.
  - **Audit Trail**: Chronological event log tracking automated actions and human overrides.
- **AI Review Queue (`/review`)**: Triage workflow for low-confidence models, contradictory statements, or missing evidence.
- **Pipeline Analytics (`/analytics`)**: Academic benchmarking of AI confidence distributions, EDR telemetry lift, and escalation drivers.
- **One-Click JSON Export**: Download complete structured claim dossiers locally.

---

## Information Architecture & Routes

| Route | View | Description |
| :--- | :--- | :--- |
| `/overview` | Operational Dashboard | High-level metrics, funnel progression, and priority triage |
| `/claims` | Claims Ledger | Filterable and searchable table of all claims |
| `/claims/[id]` | Claim Workbench | 6-tab deep-dive investigation environment |
| `/review` | AI Intervention Queue | Filtered queue for claims requiring human adjuster intervention |
| `/analytics` | Pipeline Evaluation | Empirical evaluation metrics and sensor lift benchmarks |

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

Open [http://localhost:3000](http://localhost:3000) in your browser. The root path automatically redirects to `/overview`.

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
- **Styling**: Tailwind CSS (Enterprise Light Theme)
- **Visuals & Charts**: Lightweight custom SVG charts (zero third-party chart library dependencies)
- **Icons**: Custom inline SVG icon system with consistent 1.75px stroke
- **Documentation**: Detailed domain specification available in [`docs/IMPACTA_V1_SPEC.md`](docs/IMPACTA_V1_SPEC.md)

---

## License

Academic Prototype — Token Titans. All rights reserved.
