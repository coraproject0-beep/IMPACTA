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
    <div className="max-w-md mx-auto py-4 sm:py-8 space-y-7 selection:bg-[#0E0F10] selection:text-white">
      {/* 1. Calm Human Greeting matching driver-home-reference.png */}
      <div className="space-y-1.5 pt-2">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#0E0F10]">
          {isIt ? "Buongiorno, Luca." : "Good morning, Luca."}
        </h1>
        <p className="text-base sm:text-lg text-[#666666] font-normal leading-snug">
          {isIt
            ? "Se succede qualcosa, ti aiutiamo a documentarlo chiaramente."
            : "If something happens, we'll help you document it clearly."}
        </p>
      </div>

      {/* 2. Dominant Primary Action Card matching driver-home-reference.png */}
      <div className="space-y-3">
        {hasInProgressDraft ? (
          <div className="bg-[#0E0F10] text-white p-6 rounded-2xl space-y-4">
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
            <div className="flex items-center gap-3 pt-2 border-t border-white/15">
              <button
                type="button"
                onClick={handleResumeReport}
                className="flex-1 py-2.5 px-4 bg-white text-[#0E0F10] text-sm font-semibold rounded-xl hover:bg-neutral-100 transition-colors"
              >
                {isIt ? "Continua bozza" : "Resume report"}
              </button>
              <button
                type="button"
                onClick={resetDraft}
                className="py-2.5 px-3 text-xs text-neutral-400 hover:text-white underline transition-colors"
              >
                {isIt ? "Elimina" : "Discard"}
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleStartReport}
            className="w-full text-left bg-[#0E0F10] text-white p-6 rounded-2xl flex items-center justify-between hover:bg-[#1A1B1C] transition-all group"
          >
            <div className="space-y-1 pr-4">
              <h2 className="text-xl sm:text-2xl font-medium tracking-tight">
                {isIt ? "Segnala un incidente" : "Report an accident"}
              </h2>
              <p className="text-sm text-neutral-400 font-normal">
                {isIt
                  ? "Registra l'accaduto e crea il tuo rapporto."
                  : "Capture what happened and build your report."}
              </p>
            </div>
            <ArrowRightIcon size={24} className="text-white flex-shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* 3. Vehicle Section matching driver-home-reference.png */}
      <section className="space-y-4">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-200 border border-[#E5E5E3]">
          <Image
            src="/images/hero-car.jpg"
            alt="Audi A3 vehicle context"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 448px"
          />
        </div>

        <div className="space-y-1">
          <span className="text-xs text-[#666666] font-normal block">
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
        <span className="text-xs text-[#666666] font-normal block">
          {isIt ? "Assicurazione" : "Insurance"}
        </span>
        <div className="text-lg sm:text-xl font-bold text-[#0E0F10]">
          Generali Italia
        </div>
        <div className="text-sm text-[#666666]">
          {isIt ? "Polizza attiva" : "Policy active"}
        </div>
      </section>

      {/* Hairline Divider */}
      <div className="border-t border-[#E5E5E3]" />

      {/* 5. Recent Report Section matching driver-home-reference.png */}
      <section className="space-y-1 pb-6">
        <span className="text-xs text-[#666666] font-normal block">
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
  );
}
