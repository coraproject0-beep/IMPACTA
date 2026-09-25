"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useClaims } from "@/context/ClaimsContext";
import { useDriverDraft } from "@/context/DriverDraftContext";
import { ArrowRightIcon } from "@/components/icons/Icons";

export default function DriverHomePage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const isIt = language === "it";
  const { claims } = useClaims();
  const { draft, resetDraft, startNewReport } = useDriverDraft();

  // Check if an in-progress unsubmitted draft exists
  const hasInProgressDraft = draft.step !== "SAFETY" && draft.step !== "SUBMITTED";

  const handleStartReport = () => {
    startNewReport();
    router.push("/app/report");
  };

  const handleResumeReport = () => {
    router.push("/app/report");
  };

  return (
    <div className="w-full selection:bg-[#0E0F10] selection:text-white">
      {/* 
        Responsive Grid:
        - Mobile (< lg): single column max-w-md mx-auto preserving driver-home-reference.png exactly.
        - Desktop (lg+): 12-column editorial composition using full workspace width.
      */}
      <div className="max-w-md mx-auto lg:max-w-none lg:grid lg:grid-cols-12 lg:gap-14 xl:gap-20 lg:items-start py-4 sm:py-8">
        {/* LEFT / PRIMARY COLUMN (Desktop: 5 or 6 cols) */}
        <div className="space-y-8 lg:col-span-6 xl:col-span-5">
          {/* 1. Calm Human Greeting matching driver-home-reference.png */}
          <div className="space-y-2 pt-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0E0F10] leading-[1.08]">
              {isIt ? "Buongiorno, Luca." : "Good morning, Luca."}
            </h1>
            <p className="text-base sm:text-lg text-[#666666] font-normal leading-relaxed max-w-md">
              {isIt
                ? "Se succede qualcosa, ti aiutiamo a documentarlo chiaramente."
                : "If something happens, we'll help you document it clearly."}
            </p>
          </div>

          {/* 2. Dominant Primary Action Card matching driver-home-reference.png */}
          <div>
            {hasInProgressDraft ? (
              <div className="bg-[#0E0F10] text-white p-6 sm:p-7 rounded-2xl space-y-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-medium tracking-tight">
                      {isIt ? "Riprendi segnalazione" : "Resume accident report"}
                    </h2>
                    <p className="text-sm text-neutral-400 mt-1">
                      {isIt ? "Bozza salvata su questo dispositivo." : "Unfinished report saved on this device."}
                    </p>
                  </div>
                  <ArrowRightIcon size={24} className="text-white flex-shrink-0 ml-4" />
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-white/15">
                  <button
                    type="button"
                    onClick={handleResumeReport}
                    className="flex-1 py-3 px-5 bg-white text-[#0E0F10] text-sm font-semibold rounded-xl hover:bg-neutral-100 transition-colors"
                  >
                    {isIt ? "Continua bozza" : "Resume report"}
                  </button>
                  <button
                    type="button"
                    onClick={resetDraft}
                    className="py-3 px-4 text-xs text-neutral-400 hover:text-white underline transition-colors"
                  >
                    {isIt ? "Elimina" : "Discard"}
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleStartReport}
                className="w-full text-left bg-[#0E0F10] text-white p-6 sm:p-7 rounded-2xl flex items-center justify-between hover:bg-[#1A1B1C] transition-all group shadow-sm active:scale-[0.99]"
              >
                <div className="space-y-1.5 pr-4">
                  <h2 className="text-xl sm:text-2xl lg:text-[1.65rem] font-medium tracking-tight">
                    {isIt ? "Segnala un incidente" : "Report an accident"}
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-400 font-normal">
                    {isIt
                      ? "Registra l'accaduto e crea il tuo rapporto."
                      : "Capture what happened and build your report."}
                  </p>
                </div>
                <ArrowRightIcon size={26} className="text-white flex-shrink-0 group-hover:translate-x-1.5 transition-transform" />
              </button>
            )}
          </div>

          {/* Desktop-only: Recent Report placed in left column under CTA */}
          <div className="hidden lg:block pt-4 space-y-4">
            <div className="border-t border-[#E5E5E3]" />
            <div className="space-y-2">
              <span className="text-xs text-[#555555] font-medium block">
                {isIt ? "Rapporto recente" : "Recent report"}
              </span>
              <div className="text-xl font-bold text-[#0E0F10]">
                24 Sep 2026
              </div>
              <div className="text-sm text-[#666666]">
                Milano, Via della Moscova
              </div>
              <div className="font-mono text-xs text-[#666666]">
                IMP-260924-001
              </div>
              <div className="text-sm font-medium text-[#0E0F10] pt-1">
                {isIt ? "Pronto per la revisione" : "Ready for review"}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT / SECONDARY COLUMN (Desktop: 6 or 7 cols) */}
        <div className="mt-8 lg:mt-0 space-y-8 lg:col-span-6 xl:col-span-7">
          {/* 3. Vehicle Section matching driver-home-reference.png */}
          <section className="space-y-4">
            <div className="relative aspect-[16/9] lg:aspect-[16/10] w-full overflow-hidden rounded-2xl bg-neutral-200 border border-[#E5E5E3]">
              <Image
                src="/images/hero-car.jpg"
                alt="Audi A3 vehicle context"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 650px"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs text-[#555555] font-medium block">
                {isIt ? "Il tuo veicolo" : "Your vehicle"}
              </span>
              <div className="text-lg sm:text-xl font-bold text-[#0E0F10]">
                Audi A3
              </div>
              <div className="font-mono text-sm tracking-wider text-[#666666]">
                AB 123 CD
              </div>
            </div>
          </section>

          {/* Hairline Divider */}
          <div className="border-t border-[#E5E5E3]" />

          {/* 4. Insurance Section matching driver-home-reference.png */}
          <section className="space-y-1">
            <span className="text-xs text-[#555555] font-medium block">
              {isIt ? "Assicurazione" : "Insurance"}
            </span>
            <div className="text-lg sm:text-xl font-bold text-[#0E0F10]">
              Generali Italia
            </div>
            <div className="text-sm text-[#666666]">
              {isIt ? "Polizza attiva" : "Policy active"}
            </div>
          </section>

          {/* Mobile-only: Recent Report rendered in original vertical position */}
          <div className="lg:hidden">
            <div className="border-t border-[#E5E5E3] my-8" />
            <section className="space-y-1 pb-6">
              <span className="text-xs text-[#555555] font-medium block">
                {isIt ? "Rapporto recente" : "Recent report"}
              </span>
              <div className="text-lg sm:text-xl font-bold text-[#0E0F10]">
                24 Sep 2026
              </div>
              <div className="text-sm text-[#666666]">
                Milano, Via della Moscova
              </div>
              <div className="font-mono text-xs text-[#666666]">
                IMP-260924-001
              </div>
              <div className="text-sm font-medium text-[#0E0F10] pt-1">
                {isIt ? "Pronto per la revisione" : "Ready for review"}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
