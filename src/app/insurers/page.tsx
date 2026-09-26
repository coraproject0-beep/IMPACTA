"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { TechnicalReveal } from "@/components/motion/TechnicalReveal";
import { RevealText } from "@/components/motion/RevealText";
import { PerspectiveCard } from "@/components/motion/PerspectiveCard";
import { useLanguage } from "@/context/LanguageContext";

export default function InsurersPage() {
  return (
    <PublicShell>
      <InsurersContent />
    </PublicShell>
  );
}

function InsurersContent() {
  const { t } = useLanguage();
  const [activeStatement, setActiveStatement] = useState<number>(0);

  const statements = [
    {
      category: t("insurersPage.statement1Category"),
      title: t("insurersPage.statement1Title"),
      desc: t("insurersPage.statement1Desc"),
    },
    {
      category: t("insurersPage.statement2Category"),
      title: t("insurersPage.statement2Title"),
      desc: t("insurersPage.statement2Desc"),
    },
    {
      category: t("insurersPage.statement3Category"),
      title: t("insurersPage.statement3Title"),
      desc: t("insurersPage.statement3Desc"),
    },
  ];

  return (
    <>
      {/* Header Scene */}
      <section className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-6">
          <TechnicalReveal className="text-xs sm:text-sm font-medium text-[#555555]">
            {t("insurersPage.heroTag")}
          </TechnicalReveal>
          <EditorialReveal
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0E0F10] leading-[1.04] uppercase max-w-5xl"
          >
            {t("insurersPage.heroTitleLine1")}
            <br />
            {t("insurersPage.heroTitleLine2")}
          </EditorialReveal>
          <p className="text-lg sm:text-2xl text-[#666666] leading-relaxed max-w-3xl font-light">
            {t("insurersPage.heroSubtitle")}
          </p>

          <div className="pt-4">
            <Link
              href="/console/login"
              className="group inline-flex items-center gap-2 min-h-[52px] px-8 bg-[#0E0F10] text-white text-xs font-bold tracking-wider uppercase hover:bg-black transition-colors"
            >
              <span>{t("insurersPage.heroCta")}</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Real Product UI Workbench Preview */}
      <section className="py-24 sm:py-36 bg-[#F7F7F6] border-b border-[#E5E5E3] overflow-hidden">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-medium text-[#555555]">
              {t("insurersPage.workbenchTag")}
            </span>
            <RevealText
              as="h2"
              mode="word"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E0F10] leading-tight"
            >
              {t("insurersPage.workbenchTitle")}
            </RevealText>
            <p className="text-base sm:text-lg text-[#666666] font-light leading-relaxed">
              {t("insurersPage.workbenchSubtitle")}
            </p>
          </div>

          {/* Asymmetric 12-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Column: Authored Editorial Narrative with Purposeful Motion Treatment (lg:col-span-5) */}
            <div
              className="lg:col-span-5 space-y-6 pt-2"
              style={{ perspective: "1000px" }}
            >
              {statements.map((stmt, idx) => {
                const isActive = activeStatement === idx;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveStatement(idx)}
                    onClick={() => setActiveStatement(idx)}
                    className={`cursor-pointer pl-5 py-4 border-l-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive
                        ? "border-[#0E0F10] opacity-100 scale-100"
                        : "border-[#E5E5E3] opacity-60 hover:opacity-85 scale-[0.985]"
                    }`}
                    style={{
                      transform: isActive ? "translateZ(0)" : "translateZ(-16px)",
                      transformOrigin: "left center",
                    }}
                  >
                    <div className="text-xs font-medium text-[#777777] mb-1">
                      {stmt.category}
                    </div>
                    <h3
                      className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-300 ${
                        isActive ? "text-[#0E0F10]" : "text-[#444444]"
                      }`}
                    >
                      {stmt.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-light mt-1.5">
                      {stmt.desc}
                    </p>
                  </div>
                );
              })}

              <div className="pt-4 pl-5">
                <Link
                  href="/console/login"
                  className="group inline-flex items-center gap-2 text-xs font-semibold text-[#0E0F10] hover:text-[#555555] transition-colors"
                >
                  <span className="border-b border-transparent group-hover:border-[#0E0F10] transition-colors">
                    {t("insurersPage.workbenchCta")}
                  </span>
                  <span
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Column: Real Console UI Surface with Restrained Styling (lg:col-span-7) */}
            <div className="lg:col-span-7 lg:-mr-10">
              <PerspectiveCard maxTilt={4}>
                <div className="bg-white border border-[#E5E5E3] rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
                  {/* Dossier Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#E5E5E3] gap-3">
                    <div>
                      <span className="text-xs text-[#555555] font-medium">
                        {t("insurersPage.previewOrg")}
                      </span>
                      <div className="font-mono text-2xl font-bold text-[#0E0F10] mt-0.5">
                        IMP-260925-014
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-amber-900 bg-amber-50/80 px-2.5 py-1 rounded border border-amber-200/60">
                        {t("insurersPage.previewStatus")}
                      </span>
                      <span className="text-xs text-[#666666]">
                        {t("insurersPage.previewTime")}
                      </span>
                    </div>
                  </div>

                  {/* Vehicle Comparison Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-[#F7F7F6] rounded-xl space-y-1">
                      <span className="text-[#555555] font-medium block">
                        {t("insurersPage.previewVehicleA")}
                      </span>
                      <span className="font-bold text-[#0E0F10] text-sm block">Audi A3 Sportback</span>
                      <span className="font-mono text-[#555555] text-[11px] block">AB 123 CD</span>
                    </div>
                    <div className="p-4 bg-[#F7F7F6] rounded-xl space-y-1">
                      <span className="text-[#555555] font-medium block">
                        {t("insurersPage.previewVehicleB")}
                      </span>
                      <span className="font-bold text-[#0E0F10] text-sm block">Volkswagen Golf</span>
                      <span className="font-mono text-[#555555] text-[11px] block">EF 456 GH</span>
                    </div>
                  </div>

                  {/* Fact Summary Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-[#E5E5E3] text-xs">
                    <div>
                      <span className="text-[#555555] block">
                        {t("insurersPage.previewEvidenceLabel")}
                      </span>
                      <span className="font-semibold text-[#0E0F10] text-sm">
                        {t("insurersPage.previewEvidenceVal")}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#555555] block">
                        {t("insurersPage.previewTelemetryLabel")}
                      </span>
                      <span className="font-semibold text-[#0E0F10] text-sm">
                        {t("insurersPage.previewTelemetryVal")}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#555555] block">
                        {t("insurersPage.previewReviewLabel")}
                      </span>
                      <span className="font-semibold text-emerald-800 text-sm">
                        {t("insurersPage.previewReviewVal")}
                      </span>
                    </div>
                  </div>
                </div>
              </PerspectiveCard>
            </div>
          </div>
        </div>
      </section>

      {/* Epistemic Demarcation Section */}
      <section className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-baseline">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-semibold text-[#555555]">
              {t("insurersPage.authorityTag")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase text-[#0E0F10]">
              {t("insurersPage.authorityTitle")}
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#666666] font-light leading-relaxed">
            <p>{t("insurersPage.authorityBody")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
