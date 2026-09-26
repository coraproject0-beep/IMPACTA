"use client";

import React from "react";
import Link from "next/link";
import { DriverDraft } from "@/types/driver";
import { useLanguage } from "@/context/LanguageContext";
import { CheckCircleIcon, ArrowRightIcon } from "@/components/icons/Icons";

interface Phase5SubmittedProps {
  draft: DriverDraft;
  onReturnHome: () => void;
}

export function Phase5Submitted({ draft, onReturnHome }: Phase5SubmittedProps) {
  const { t, language } = useLanguage();
  const isIt = language === "it";
  const claimId = draft.submittedClaimId || "IMP-260925-014";
  const nowFormatted = draft.submittedAt
    ? new Date(draft.submittedAt).toLocaleString(isIt ? "it-IT" : "en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleString(isIt ? "it-IT" : "en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

  return (
    <div className="max-w-md mx-auto py-4 space-y-7 selection:bg-[#0E0F10] selection:text-white">
      {/* Big Calm Success Indicator */}
      <div className="space-y-2 pt-2">
        <div className="w-12 h-12 rounded-xl bg-[#0E0F10] text-white flex items-center justify-center mb-3">
          <CheckCircleIcon size={24} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#0E0F10]">
          {isIt ? "Rapporto inviato con successo." : "Report submitted."}
        </h1>
        <p className="text-base text-[#666666] font-normal leading-snug">
          {isIt
            ? "La tua segnalazione e le prove fotografiche sono state registrate e sono pronte per la revisione."
            : "Your accident report and evidence photos have been preserved and are ready for review."}
        </p>
      </div>

      {/* Official Receipt Card */}
      <div className="p-6 rounded-2xl border border-[#E5E5E3] bg-white space-y-5">
        <div className="flex items-baseline justify-between border-b border-[#E5E5E3] pb-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#666666] block">
              {isIt ? "Codice sinistro" : "Claim reference"}
            </span>
            <span className="font-mono font-bold text-xl text-[#0E0F10] mt-0.5 block">
              {claimId}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs uppercase tracking-wider text-[#666666] block">
              {isIt ? "Data invio" : "Filed at"}
            </span>
            <span className="text-xs font-mono text-[#0E0F10] mt-0.5 block">
              {nowFormatted}
            </span>
          </div>
        </div>

        <div className="space-y-3 text-xs text-[#0E0F10]">
          <div>
            <span className="text-[#666666] block">{isIt ? "Veicolo:" : "Vehicle:"}</span>
            <span className="font-bold text-sm">Audi A3</span>
            <span className="font-mono text-[#666666] block">AB 123 CD</span>
          </div>

          <div className="pt-2 border-t border-[#E5E5E3]">
            <span className="text-[#666666] block">{isIt ? "Compagnia:" : "Insurer:"}</span>
            <span className="font-medium text-sm">Generali Italia</span>
          </div>
        </div>
      </div>

      {/* Navigation Actions */}
      <div className="space-y-3 pt-2">
        <Link
          href={`/console/claims/${claimId}`}
          className="w-full py-4 px-6 rounded-2xl bg-[#0E0F10] hover:bg-[#1A1B1C] text-white text-base font-semibold flex items-center justify-between transition-colors group"
        >
          <span>{isIt ? "Apri nella Console Liquidatore" : "Inspect in Insurer Console"}</span>
          <span className="font-mono text-xs bg-white/20 px-2 py-0.5 rounded text-white">{claimId} →</span>
        </Link>

        <button
          type="button"
          onClick={onReturnHome}
          className="w-full py-3.5 px-6 rounded-2xl bg-white border border-[#E5E5E3] hover:border-[#0E0F10] text-[#0E0F10] text-sm font-medium flex items-center justify-center transition-colors block text-center"
        >
          <span>{isIt ? "Torna all'area conducente" : "Back to Driver Home"}</span>
        </button>

        <Link
          href="/app/reports"
          className="w-full py-2.5 text-[#666666] hover:text-[#0E0F10] text-xs font-medium flex items-center justify-center transition-colors block text-center"
        >
          {isIt ? "Visualizza lo storico sinistri" : "View claims history"}
        </Link>
      </div>
    </div>
  );
}
