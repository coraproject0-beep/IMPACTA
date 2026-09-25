"use client";

import React, { useState } from "react";
import { DriverDraft } from "@/types/driver";
import { useLanguage } from "@/context/LanguageContext";
import { AlertTriangleIcon, ArrowRightIcon } from "@/components/icons/Icons";

interface Phase1SafetyProps {
  draft: DriverDraft;
  onUpdate: (patch: Partial<DriverDraft>) => void;
  onNext: () => void;
}

export function Phase1Safety({ onUpdate, onNext }: Phase1SafetyProps) {
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
    <div className="max-w-md mx-auto py-2 space-y-7 selection:bg-[#0E0F10] selection:text-white">
      {/* Primary Question: Large, Calm, Clear */}
      <div className="space-y-2 pt-1">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#0E0F10]">
          {t("wizard.phase1Question")}
        </h1>
        <p className="text-base sm:text-lg text-[#666666] font-normal leading-snug">
          {isIt
            ? "Fai un respiro calmo. Prima di raccogliere fotografie, assicurati che tutte le persone siano al sicuro."
            : "Take a calm breath. Before capturing damage photos, ensure everyone is out of danger."}
        </p>
      </div>

      {/* Two Clear Choice Actions */}
      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={handleContinue}
          className="w-full py-4 px-6 text-left font-medium text-base rounded-2xl bg-[#0E0F10] hover:bg-[#1A1B1C] text-white flex items-center justify-between transition-colors group"
        >
          <span>{t("wizard.phase1SafetyYes")}</span>
          <ArrowRightIcon size={20} className="text-white group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          type="button"
          onClick={() => setEmergencyActive(!emergencyActive)}
          className="w-full py-4 px-6 text-left font-normal text-sm rounded-2xl bg-white hover:bg-neutral-50 text-[#0E0F10] border border-[#E5E5E3] flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <AlertTriangleIcon size={18} className="text-rose-600" />
            <span>
              {emergencyActive
                ? (isIt ? "Nascondi richiesta soccorsi" : "Hide emergency assistance")
                : (isIt ? "Qualcuno ha bisogno di aiuto — Chiama il 112" : "Someone needs help — Call 112")}
            </span>
          </div>
          <span className="text-xs text-[#666666]">{emergencyActive ? "↑" : "↓"}</span>
        </button>
      </div>

      {/* Immediate Emergency Hotline Action */}
      {emergencyActive && (
        <div className="p-5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-950 space-y-3 animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertTriangleIcon size={20} className="text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-sm block">{t("wizard.phase1EmergencyHelp")}</span>
              <span className="text-xs text-rose-800 leading-relaxed block font-light">
                {t("wizard.phase1EmergencyDesc")}
              </span>
            </div>
          </div>
          <a
            href="tel:112"
            className="w-full inline-flex items-center justify-center py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
          >
            {t("wizard.phase1Call112")}
          </a>
        </div>
      )}

      {/* Roadside Precautions Checklist Accordion */}
      <div className="pt-4 border-t border-[#E5E5E3]">
        <button
          type="button"
          onClick={() => setShowGuidance(!showGuidance)}
          className="w-full text-left text-xs font-medium text-[#666666] hover:text-[#0E0F10] transition-colors flex items-center justify-between"
        >
          <span>{t("wizard.phase1ChecklistToggle")}</span>
          <span>{showGuidance ? "−" : "+"}</span>
        </button>

        {showGuidance && (
          <div className="mt-4 p-4 rounded-xl border border-[#E5E5E3] bg-white space-y-2.5 text-xs text-[#666666] animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E0F10]" />
              <span>{t("wizard.phase1ChecklistVest")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E0F10]" />
              <span>{t("wizard.phase1ChecklistHazards")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E0F10]" />
              <span>{t("wizard.phase1ChecklistTriangle")}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
