# IMPACTA V4 — Premium Experiential Art Direction, 3D Black Box & SpaceX-Level Minimalism — Walkthrough

**Phase Name:** IMPACTA V4 — Premium Experiential Art Direction, 3D Black Box & SpaceX-Level Minimalism  
**Branch:** `design/product-separation-driver-reset`  
**Git Integrity:** 0 commits, 0 pushes, 0 branch switches.  
**Build Status:** `npm.cmd run build` passed with exit code 0 (29/29 static and dynamic routes compiled).

---

## 1. Executive Summary & Art Direction Reset

This milestone elevates IMPACTA into a world-class automotive / aerospace / mobility digital platform. Conventional AI-typical cards, floating rounded navbar notches, pill badges, and repetitive component boxes have been eradicated in favor of **SpaceX-inspired media-first discipline**:

> **MEDIA FIRST. ONE SCENE. ONE IDEA. ONE ACTION. REMOVE EVERYTHING ELSE.**

### Key Architectural & Design Feats
1. **The 3D Black Box Hero Experience:**
   - Hyper-premium 3D object floating in a monochrome volumetric studio environment (`src/components/3d/BlackBoxHero.tsx` & `src/components/3d/BlackBoxScene.tsx`).
   - 100% procedural geometry (satin/matte anodized metal plates, titanium fasteners, engraved hairline accents, and internal floating evidence planes).
   - Scrubbed across a 320vh pinned scroll track via native document scroll and GSAP ScrollTrigger:
     - **Scene 0 (Arrival):** Intact floating box, subtle breathing drift.
     - **Scene 1 (Impact):** Camera moves closer, box pitches, hairline seams illuminate.
     - **Scene 2 (Decomposition):** Precision exploded view as outer plates separate along X/Y axes.
     - **Scene 3 (Evidence):** Internal evidence planes fan out (Photo, Location, Driver/Vehicle, Telemetry, CAI).
     - **Scene 4 (Structure):** White trajectory vectors draw in to link the evidence into an aligned geometry.
     - **Scene 5 (Claim):** Structure resolves into a standardized CAI package ready for human adjuster review.
     - **Scene 6 (Recomposition):** Plates smoothly compress and lock back into the intact Black Box.
     - Upward scroll naturally reverses the choreography.
   - **Hardware Disclosure:** Clearly documented in `/technology` and `docs/ASSET_SOURCES.md` that the Black Box is a conceptual metaphor for evidence fusion, not a physical hardware device manufactured by IMPACTA.
   - **Fallbacks:** Architectural monochrome SVG/CSS composite for non-WebGL environments and `prefers-reduced-motion`.

2. **Precision Monochrome Brand Palette:**
   - `IMPACTA BLACK`: `#090A0A`
   - `GRAPHITE`: `#171819`
   - `TITANIUM`: `#6F7375`
   - `HAIRLINE`: `#D7D9D8`
   - `OFF-WHITE`: `#F4F5F3`
   - `PURE WHITE`: `#FFFFFF`
   - `EMERGENCY RED`: `#DC2626` (functional safety use only)
   - `SUCCESS GREEN`: `#16A34A` (functional confirmation only)
   - Decorative cobalt/blue eradicated from the public brand. Richness comes from light, material, typography, and motion.

3. **Open Industrial-Geometric Typography:**
   - Adopted **Archivo** (Omnibus-Type, SIL Open Font License) via `next/font/google` for technical display and engineered headings, offering native Italian diacritics support.
   - Adopted **JetBrains Mono** (SIL OFL) for telemetry timestamps, coordinates, and tabular metrics.

4. **Spacious Public Navigation & Full-Screen Mobile Takeover:**
   - Full-width header (80–96px height) with generous horizontal padding (48–80px) and wide gaps.
   - Transparent over the Black Box hero with crisp white text; transitions seamlessly to off-white and hairline border when scrolling into daylight sections.
   - Floating navbar notch and card shell eradicated.
   - Full-screen mobile takeover menu with large editorial typography, smooth entrance, and zero nested cards.

5. **Purposeful Motion Families:**
   - `EDITORIAL_REVEAL`: Masked line entrance for section headings.
   - `TECHNICAL_REVEAL`: Controlled tracking settle and opacity for telemetry kickers.
   - `STATEMENT_REVEAL`: Slow, commanding emergence for major thematic declarations.
   - `FULL_BLEED_CROP`: Edge-to-edge full-viewport photographic chapters.
   - `PRODUCT_REVEAL`: Real 3D perspective settle for UI workbench previews.

6. **Full-Viewport Storytelling Across All Public Routes:**
   - Overhauled `/`, `/platform`, `/drivers`, `/insurers`, `/technology`, `/safety`, `/contact`, `/privacy`, `/terms`.
   - Every major section approaches `min-h-[90-100svh]` with one scene, one idea, one action.
   - Architectural black footer (`bg-[#090A0A]`) with crisp white typography.

7. **Driver Personal Area & Intake Workflow Simplification:**
   - Quiet, fast, unboxed layout (`/app`).
   - Large greeting, large Report Accident action, full-width vehicle identity, thin hairline dividers.
   - Zero marketing spectacle or 3D gimmicks in the driver workspace; pure clarity and touch accessibility.

8. **Authentication Screens Rebuild:**
   - Driver Login (`/login`) rebuilt as an integrated full-viewport split with large vehicle photography.
   - Insurer Login (`/console/login`) rebuilt with restrained institutional layout.
   - Prominent `← Back to IMPACTA` navigation links on both.

9. **Claims Console Simplification:**
   - Replaced heavy `rounded-3xl` card containers with a unified open typographic KPI strip divided by hairlines on `/console/overview`.

---

## 2. Production Build Verification Ledger

Executing `npm.cmd run build` compiled with exit code `0` across all 29 routes:

```text
Route (app)                              Size     First Load JS
┌ ○ /                                    7.33 kB         123 kB
├ ○ /_not-found                          876 B          88.3 kB
├ ○ /analytics                           161 B          87.6 kB
├ ○ /app                                 4.77 kB         143 kB
├ ○ /app/insurance                       1.57 kB        99.8 kB
├ ○ /app/profile                         4.55 kB         137 kB
├ ○ /app/report                          9.69 kB         148 kB
├ ○ /app/reports                         4.61 kB         129 kB
├ ○ /app/vehicle                         1.95 kB         105 kB
├ ○ /claims                              161 B          87.6 kB
├ ƒ /claims/[id]                         161 B          87.6 kB
├ ○ /console                             161 B          87.6 kB
├ ○ /console/analytics                   2.47 kB         116 kB
├ ○ /console/claims                      3.75 kB         119 kB
├ ƒ /console/claims/[id]                 14.7 kB         138 kB
├ ○ /console/login                       2.11 kB         109 kB
├ ○ /console/overview                    4.27 kB         128 kB
├ ○ /console/review                      3.31 kB         127 kB
├ ○ /contact                             2.17 kB         113 kB
├ ○ /drivers                             2.79 kB         119 kB
├ ○ /insurers                            2.72 kB         113 kB
├ ○ /login                               2.69 kB         115 kB
├ ○ /overview                            161 B          87.6 kB
├ ○ /platform                            2.83 kB         113 kB
├ ○ /privacy                             1.4 kB          112 kB
├ ○ /review                              161 B          87.6 kB
├ ○ /safety                              1.78 kB         112 kB
├ ○ /technology                          2.49 kB         113 kB
└ ○ /terms                               1.22 kB         112 kB
+ First Load JS shared by all            87.4 kB
```
