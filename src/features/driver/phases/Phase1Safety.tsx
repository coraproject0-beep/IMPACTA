"use client";

import React, { useState } from "react";
import { DriverDraft } from "@/types/driver";
import { useLanguage } from "@/context/LanguageContext";
import { AlertTriangleIcon, ArrowRightIcon, CheckCircleIcon } from "@/components/icons/Icons";

interface Phase1SafetyProps {
  draft: DriverDraft;
  onUpdate: (patch: Partial<DriverDraft>) => void;
  onNext: () => void;
}

export function Phase1Safety({ draft, onUpdate, onNext }: Phase1SafetyProps) {
  const { t, language } = useLanguage();
  const isIt = language === "it";
  const [showGuidance, setShowGuidance] = useState(false);
  const [emergencyActive, setEmergencyActive] = useState(false);

  const handleContinue = () => {
    onUpdate({
      safetyConfirmed: true,
      anyInjured: false,
    });
    onNext();
  };

  return (
    <div className="space-y-10 py-2 max-w-xl mx-auto selection:bg-[#090A0A] selection:text-white">
      {/* Primary Question: Large, Calm, Clear */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-rose-600">
          {t.wizard.phase1Title}
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#090A0A] leading-[1.05]">
          {t.wizard.phase1Question}
        </h1>
        <p className="text-base sm:text-lg text-[#6F7375] font-normal leading-relaxed pt-1">
          {isIt
            ? "Fai un respiro calmo. Prima di raccogliere fotografie o dettagli, assicurati che tutte le persone siano al sicuro e lontane dalla carreggiata."
            : "Take a calm breath. Before capturing damage photos or writing statements, ensure you and your passengers are out of traffic and away from danger."}
        </p>
      </div>

      {/* Two Clear Choice Actions */}
      <div className="space-y-4 pt-2">
        <button
          type="button"
          onClick={handleContinue}
          className="min-h-[56px] w-full py-4 px-6 font-bold text-sm sm:text-base uppercase tracking-wider bg-[#090A0A] hover:bg-[#171819] text-white flex items-center justify-between transition-colors"
        >
          <span>{t.wizard.phase1SafetyYes}</span>
          <ArrowRightIcon size={18} />
        </button>

        <button
          type="button"
          onClick={() => setEmergencyActive(!emergencyActive)}
          className="min-h-[56px] w-full py-4 px-6 font-semibold text-sm sm:text-base uppercase tracking-wider bg-white hover:bg-rose-50/50 text-rose-700 border border-rose-300 flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <AlertTriangleIcon size={18} className="text-rose-600" />
            <span>
              {emergencyActive
                ? (isIt ? "Nascondi richiesta soccorsi" : "Hide emergency assistance")
                : (isIt ? "Qualcuno ha bisogno di aiuto — Chiama il 112" : "Someone needs help — Call 112")}
            </span>
          </div>
          <span className="text-xs font-mono">{emergencyActive ? "↑" : "↓"}</span>
        </button>
      </div>

      {/* Immediate Emergency Hotline Action */}
      {emergencyActive && (
        <div className="p-6 bg-rose-50 border border-rose-300 text-rose-950 flex flex-col sm:flex-row sm:items-center justify-between gap-5 animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertTriangleIcon size={22} className="text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-base block">{t.wizard.phase1EmergencyHelp}</span>
              <span className="text-sm text-rose-800 leading-relaxed block font-light">
                {t.wizard.phase1EmergencyDesc}
              </span>
            </div>
          </div>
          <a
            href="tel:112"
            className="min-h-[48px] inline-flex items-center justify-center px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            {t.wizard.phase1Call112}
          </a>
        </div>
      )}

      {/* Roadside Precautions Checklist Accordion */}
      <div className="pt-4 border-t border-[#D7D9D8]">
        <button
          type="button"
          onClick={() => setShowGuidance(!showGuidance)}
          className="min-h-[44px] w-full text-left text-xs font-semibold text-[#6F7375] hover:text-[#090A0A] uppercase tracking-wider transition-colors flex items-center justify-between"
        >
          <span>
            {showGuidance
              ? (isIt ? "Nascondi precauzioni di sicurezza" : "Hide safety precautions")
              : (t.wizard.phase1ChecklistToggle)}
          </span>
          <span>{showGuidance ? "↑" : "↓"}</span>
        </button>

        {showGuidance && (
          <div className="mt-4 p-6 bg-[#F4F5F3] border border-[#D7D9D8] space-y-3 text-sm text-[#090A0A] animate-fade-in">
            <span className="font-bold uppercase tracking-wider text-xs block text-[#090A0A]">
              {t.wizard.phase1ChecklistTitle}
            </span>
            <ul className="space-y-2.5 pt-1 text-sm text-[#6F7375]">
              <li className="flex items-center gap-3">
                <CheckCircleIcon size={16} className="text-emerald-700 flex-shrink-0" />
                <span>{t.wizard.phase1ChecklistHazards}</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircleIcon size={16} className="text-emerald-700 flex-shrink-0" />
                <span>{t.wizard.phase1ChecklistVest}</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircleIcon size={16} className="text-emerald-700 flex-shrink-0" />
                <span>{t.wizard.phase1ChecklistTriangle}</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
