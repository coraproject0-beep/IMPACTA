# IMPACTA Asset Licensing, Typography & 3D Attribution Ledger

All photographic assets utilized across the **IMPACTA Public Website** and **Driver Experience** are stored locally in `public/images/`. No hotlinking of third-party imagery is performed at runtime.

---

## 1. Typography Registry

| Typeface | Source / Provider | License | Rationale for IMPACTA Art Direction |
| :--- | :--- | :--- | :--- |
| **Archivo** | Omnibus-Type / Google Fonts | SIL Open Font License 1.1 | Open industrial-geometric neo-grotesk engineered for technical display and high-legibility automotive text. Excellent native support for Italian diacritics (`à`, `è`, `é`, `ì`, `ò`, `ù`) and wide display tracking without letter crowding. |
| **JetBrains Mono** | JetBrains / Google Fonts | SIL Open Font License 1.1 | High-precision monospace font designed for technical telemetry, CAN-bus logs, sensor timestamps, and tabular claims metadata. |

---

## 2. 3D Procedural Assets & Hardware Disclosure

| Asset Component | Implementation Type | Provenance & Tech | Conceptual Rationale & Disclosure |
| :--- | :--- | :--- | :--- |
| **The Black Box (Hero 3D)** | Client-side Procedural Mesh (`three.js`) | Three.js (MIT License, mrdoob) | **Conceptual Metaphor Disclosure:** The Black Box is a conceptual visual metaphor for the fusion of roadside photos, documents, incident context, and optional telemetry into a structured claim dossier. **IMPACTA does not manufacture physical hardware devices.** Geometry is generated 100% procedurally (chamfered box, anodized satin plates, hex fasteners, floating evidence planes) with zero external 3D model downloads or third-party proprietary geometry. |

---

## 3. Photographic Asset Registry

| File Name | Source URL | Provider / Source | Author / Photographer | License & Terms | Date Accessed | Where Used in IMPACTA |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `hero-car.jpg` | `https://images.unsplash.com/photo-1541899481282-d53bffe3c35d` | Unsplash | Campbell | Unsplash Free License (Commercial and non-commercial use, no attribution required) | 2026-09-19 | Homepage Hero, Driver Home (`/app`), Driver Vehicle Page (`/app/vehicle`), Wizard Review (`Phase4Review.tsx`) |
| `road-context.jpg` | `https://images.unsplash.com/photo-1502877338535-766e1452684a` | Unsplash | Sven D | Unsplash Free License | 2026-09-19 | Homepage Platform Story, Wizard Phase 1 & 2 Desktop Context, Public Technology Page (`/technology`) |
| `evidence-scene.jpg` | `https://images.unsplash.com/photo-1449965408869-eaa3f722e40d` | Unsplash | Dan Gold | Unsplash Free License | 2026-09-19 | Wizard Phase 3 Desktop Context, Signature Evidence ➔ Claim Transformation, Public Drivers Page (`/drivers`) |
| `safety-road.jpg` | `https://images.unsplash.com/photo-1549399542-7e3f8b79c341` | Unsplash | Karsten Würth | Unsplash Free License | 2026-09-19 | Public Safety Page (`/safety`), Safety Check Guidance (`Phase1Safety.tsx`) |
| `platform-evidence.jpg` | `https://images.unsplash.com/photo-1503376780353-7e6692767b70` | Unsplash | Martin Katler | Unsplash Free License | 2026-09-19 | Public Platform Overview (`/platform`), Public Insurers Page (`/insurers`) |
| `mobility-cockpit.jpg` | `https://images.unsplash.com/photo-1541899481282-d53bffe3c35d` | Unsplash | Campbell | Unsplash Free License | 2026-09-19 | Public Technology Page (`/technology`), Driver Insurance Page (`/app/insurance`) |

---

## 4. License Terms Summary

All images are covered by the **Unsplash License**:
- Free to download and use for both commercial and non-commercial purposes.
- Modification and adaptation permitted.
- No permission or attribution required (though documented here for audit rigor and legal compliance).
- Does not include the right to compile photos to replicate a similar or competing service.
