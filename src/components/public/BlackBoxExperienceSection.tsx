"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { StatementReveal } from "@/components/motion/StatementReveal";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { TechnicalReveal } from "@/components/motion/TechnicalReveal";

export function BlackBoxExperienceSection() {
  const { t, language } = useLanguage();
  const isIt = language === "it";

  return (
    <section
      id="black-box-core"
      className="relative w-full bg-[#0E0F10] text-white py-28 sm:py-36 border-t border-b border-white/10 overflow-hidden"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl space-y-5">
          <TechnicalReveal className="text-xs sm:text-sm font-semibold tracking-widest text-white/50 uppercase">
            {t("blackBoxSection.kicker")}
          </TechnicalReveal>

          <StatementReveal
            as="h2"
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] uppercase"
          >
            {t("blackBoxSection.title")}
          </StatementReveal>

          <p className="text-base sm:text-xl text-white/70 font-light max-w-3xl leading-relaxed">
            {t("blackBoxSection.subtitle")}
          </p>
        </div>

        {/* Minimal Forensic Architecture Viewport (Dedicated clean insertion stage) */}
        <div className="w-full border border-white/15 bg-[#141517] p-8 sm:p-14 lg:p-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {/* Feature 1 */}
            <div className="space-y-4 border-l border-white/20 pl-6">
              <span className="font-mono text-xs text-white/40 tracking-widest uppercase block">
                [ 01 // EVIDENCE ]
              </span>
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white">
                {t("blackBoxSection.feature1Title")}
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                {t("blackBoxSection.feature1Desc")}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-4 border-l border-white/20 pl-6">
              <span className="font-mono text-xs text-white/40 tracking-widest uppercase block">
                [ 02 // SENSORS ]
              </span>
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white">
                {t("blackBoxSection.feature2Title")}
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                {t("blackBoxSection.feature2Desc")}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-4 border-l border-white/20 pl-6">
              <span className="font-mono text-xs text-white/40 tracking-widest uppercase block">
                [ 03 // CAI_BOX_12 ]
              </span>
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white">
                {t("blackBoxSection.feature3Title")}
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                {t("blackBoxSection.feature3Desc")}
              </p>
            </div>
          </div>

          {/* Architecture Status Strip */}
          <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-white/50">
            <div className="flex items-center gap-3">
              <span className="font-mono uppercase tracking-wider text-white/70">
                FORENSIC ENGINE STATE: ACTIVE • CAI PROTOCOL COMPLIANT
              </span>
            </div>
            <div className="font-mono text-[11px] text-white/40">
              SHA-256 INTEGRITY CHAIN • NO BLACK-BOX LIABILITY DECISION
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
