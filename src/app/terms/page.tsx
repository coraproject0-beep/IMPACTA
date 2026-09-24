"use client";

import React from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { TechnicalReveal } from "@/components/motion/TechnicalReveal";

export default function TermsPage() {
  return (
    <PublicShell>
      <section className="py-24 sm:py-36 bg-white border-b border-[#D7D9D8]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-4xl mx-auto space-y-4">
          <TechnicalReveal className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-[#6F7375]">
            LEGAL DISCLAIMERS &amp; PROTOCOL
          </TechnicalReveal>
          <EditorialReveal
            as="h1"
            className="text-4xl sm:text-6xl font-bold tracking-tight text-[#090A0A] uppercase"
          >
            Terms of Use &amp; Disclaimers
          </EditorialReveal>
          <p className="text-sm font-mono text-[#6F7375]">
            Version 2.0 • Academic &amp; Demonstration Prototype
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-32 bg-[#F4F5F3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-4xl mx-auto bg-white border border-[#D7D9D8] p-8 sm:p-16 space-y-12 text-base sm:text-lg text-[#171819] leading-relaxed font-light">
          <div className="space-y-3 pb-8 border-b border-[#D7D9D8]">
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-[#090A0A]">
              1. Non-Commercial Demonstration
            </h2>
            <p>
              IMPACTA is an academic and product design proof of concept. It is not licensed as an insurance company, mutual fund, law firm, or dispatch emergency service. In the event of real-world emergencies, always dial <strong>112</strong> immediately.
            </p>
          </div>

          <div className="space-y-3 pb-8 border-b border-[#D7D9D8]">
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-[#090A0A]">
              2. Epistemic Demarcation &amp; Zero Liability Automation
            </h2>
            <p>
              Under no circumstances does this software determine legal civil liability, penal guilt, or binding financial compensation amounts. All data, collision angles, and CAI Box 12 mapping outputs are advisory technical structuring aids created for qualified human review.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-[#090A0A]">
              3. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this demonstration environment, you acknowledge that simulated data and local browser storage are utilized without warranty of commercial fitness.
            </p>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
