"use client";

import React, { useState } from "react";
import { DriverDraft } from "@/types/driver";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRightIcon } from "@/components/icons/Icons";

interface Phase4ReviewProps {
  draft: DriverDraft;
  onUpdate: (patch: Partial<DriverDraft>) => void;
  onSubmit: () => Promise<void>;
  onEditSection: (section: "accident" | "capture") => void;
}

export function Phase4Review({
  draft,
  onUpdate,
  onSubmit,
  onEditSection,
}: Phase4ReviewProps) {
  const { t, language } = useLanguage();
  const isIt = language === "it";
  const [hasConfirmedDeclaration, setHasConfirmedDeclaration] = useState(false);
  const [statement, setStatement] = useState(draft.statement || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasConfirmedDeclaration) return;
    setIsSubmitting(true);
    onUpdate({ statement });
    try {
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md lg:max-w-4xl mx-auto py-2 selection:bg-[#0E0F10] selection:text-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Title & Incident Summary Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2 pt-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0E0F10] leading-[1.08]">
              {isIt ? "Riepilogo e conferma." : "Review & confirm."}
            </h1>
            <p className="text-base sm:text-lg text-[#666666] font-normal leading-relaxed">
              {isIt
                ? "Verifica le informazioni raccolte prima dell'invio finale."
                : "Review the gathered details before final submission."}
            </p>
          </div>

          {/* Incident Summary Card */}
          <div className="p-5 rounded-2xl border border-[#E5E5E3] bg-white space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#666666]">
                {isIt ? "Dettagli incidente" : "Incident details"}
              </span>
              <button
                type="button"
                onClick={() => onEditSection("accident")}
                className="text-xs text-[#0E0F10] font-medium hover:underline"
              >
                {isIt ? "Modifica" : "Edit"}
              </button>
            </div>

            <div className="space-y-2.5 text-sm text-[#0E0F10]">
              <div>
                <span className="text-[#666666] text-xs block">{isIt ? "Luogo e data:" : "Location & date:"}</span>
                <span className="font-semibold">{draft.location.city || "Milano"}, {draft.location.street || "Via Lorenteggio"}</span>
                <span className="text-[#666666] block font-mono text-xs">{draft.incidentDate || "2026-09-25"} · {draft.incidentTime || "08:42"}</span>
              </div>

              <div className="pt-2.5 border-t border-[#E5E5E3]">
                <span className="text-[#666666] text-xs block">{isIt ? "Veicolo assicurato:" : "Insured vehicle:"}</span>
                <span className="font-semibold">Audi A3</span>
                <span className="font-mono text-xs text-[#666666] block">AB 123 CD • Generali Italia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Statement, Truthfulness Checkbox, Submit Button */}
        <div className="lg:col-span-7 space-y-6">
          {/* Personal Statement Area */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#666666] block">
              {isIt ? "La tua dichiarazione sull'accaduto" : "Your statement"}
            </label>
            <textarea
              rows={4}
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              placeholder={isIt ? "Descrivi brevemente la dinamica (es. ero fermo al semaforo)..." : "Briefly describe what happened (e.g. stopped at red light)..."}
              className="w-full p-4 rounded-xl border border-[#E5E5E3] bg-white text-sm text-[#0E0F10] focus:border-[#0E0F10] focus:outline-none"
            />
          </div>

          {/* Truthfulness Declaration Checkbox */}
          <div className="p-4 rounded-xl border border-[#E5E5E3] bg-white space-y-3">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hasConfirmedDeclaration}
                onChange={(e) => setHasConfirmedDeclaration(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#0E0F10] focus:ring-black cursor-pointer"
              />
              <span className="text-xs text-[#666666] leading-relaxed">
                {isIt
                  ? "Dichiaro che le informazioni e le prove fotografiche fornite sono veritiere e accurate."
                  : "I declare that the information and photographs provided in this report are truthful and accurate."}
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!hasConfirmedDeclaration || isSubmitting}
              className={`w-full py-4 px-6 rounded-2xl text-base font-semibold flex items-center justify-between transition-colors group shadow-sm ${
                hasConfirmedDeclaration && !isSubmitting
                  ? "bg-[#0E0F10] text-white hover:bg-[#1A1B1C]"
                  : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              }`}
            >
              <span>{isSubmitting ? (isIt ? "Salvataggio in corso..." : "Saving report...") : (isIt ? "Invia rapporto incidente" : "Submit accident report")}</span>
              <ArrowRightIcon size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
