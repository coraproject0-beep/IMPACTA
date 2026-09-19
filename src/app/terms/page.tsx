"use client";

import React from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { TextReveal } from "@/components/motion/TextReveal";

export default function TermsPage() {
  return (
    <PublicShell>
      <section className="py-20 sm:py-32 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <TextReveal delayMs={0}>
            <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-slate-500">
              Terms of Use · Academic Prototype
            </p>
          </TextReveal>
          <TextReveal delayMs={80} as="h1" className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950">
            Terms of Use &amp; Evaluation Conditions
          </TextReveal>
          <TextReveal delayMs={140} as="p" className="text-sm sm:text-base text-slate-500 font-mono">
            Version 2.0 (Prototype) · September 2026
          </TextReveal>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-14 rounded-2xl border border-slate-200 shadow-xs space-y-10 text-base sm:text-lg text-slate-700 leading-relaxed">
          <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 text-sm sm:text-base leading-relaxed space-y-2">
            <span className="font-bold text-base sm:text-lg block">Important Notice Regarding Real Emergencies</span>
            <p>This web application is an experimental, non-commercial software prototype. If you or anyone around you has been involved in a real motor vehicle accident requiring medical attention, fire rescue, or law enforcement, please stop immediately and dial the Single European Emergency Number (112) or your local emergency dispatcher directly from your telephone keypad.</p>
          </div>

          {/* Section 1 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
              1. Acceptance &amp; Academic Scope
            </h2>
            <p>
              By accessing or interacting with IMPACTA (the &ldquo;Prototype&rdquo;), you acknowledge and agree that this software is provided strictly for technical evaluation, academic design benchmarking, and user-experience research by Token Titans. The prototype does not constitute an insurance policy, a broker intermediary service, or a legally regulated claims handler.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
              2. No Legal Advice or Liability Determination
            </h2>
            <p>
              Nothing contained within the prototype—including visual reconstructions, damage segmentation boundaries, or CAI circumstance suggestions—constitutes formal legal advice or an authoritative determination of civil liability. Under Article 2054 of the Italian Civil Code and reciprocal European traffic laws, liability is determined exclusively by competent judicial authorities and licensed insurance adjusters.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
              3. Synthetic Outputs &amp; Demonstrations
            </h2>
            <p>
              Any simulated kinematics, deceleration curves, Delta-V figures, and optical extraction tags displayed in the prototype are algorithmic demonstrations. They are generated from client-side heuristic models and static mock fixtures for the canonical Piazza San Giovanni roundabout accident. They must not be relied upon as forensic evidence in actual legal proceedings.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
              4. Absence of Carrier Transmission
            </h2>
            <p>
              Completing the reporting wizard does not transmit a formal claim notice (denuncia di sinistro) to any insurance carrier. Users must independently file actual claims directly with their respective insurance carriers through officially recognized channels within statutory timeframes (e.g. within 3 days pursuant to Art. 1913 of the Italian Civil Code).
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
              5. Intellectual Property &amp; Open Inspection
            </h2>
            <p>
              The code, documentation, and interface designs comprising IMPACTA are academic research outputs developed by Token Titans. Third-party brand references (such as Volkswagen, Fiat, or Allianz) are utilized strictly in an illustrative, descriptive capacity within synthetic sample data.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
              6. Limitation of Liability
            </h2>
            <p>
              The prototype is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied. In no event shall the authors, developers, or researchers be held liable for any claim, damages, data loss, or other liability arising from the use of or inability to use this prototype.
            </p>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
