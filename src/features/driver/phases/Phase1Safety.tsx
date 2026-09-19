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
  const { t } = useLanguage();
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
    <div className="space-y-8 py-2 max-w-2xl selection:bg-blue-100 selection:text-blue-900">
      {/* Primary Question: Large, Calm, Clear */}
      <div className="space-y-4">
        <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-rose-600">
          {t.wizard.phase1Title}
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
          {t.wizard.phase1Question}
        </h1>
        <p className="text-base sm:text-xl text-slate-600 leading-relaxed">
          Take a slow breath. Before capturing damage photos or writing statements, ensure you and your passengers are out of traffic and away from danger.
        </p>
      </div>

      {/* Two Clear Choice Actions */}
      <div className="space-y-4 pt-2">
        <button
          type="button"
          onClick={handleContinue}
          className="min-h-[56px] w-full py-4 px-6 rounded-2xl font-bold text-base sm:text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
        >
          <span>{t.wizard.phase1SafetyYes}</span>
          <ArrowRightIcon size={20} />
        </button>

        <button
          type="button"
          onClick={() => setEmergencyActive(!emergencyActive)}
          className="min-h-[56px] w-full py-4 px-6 rounded-2xl font-bold text-base sm:text-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 shadow-2xs flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
        >
          <AlertTriangleIcon size={20} className="text-rose-600" />
          <span>{emergencyActive ? "Hide emergency assistance" : "Someone needs help — Call 112"}</span>
        </button>
      </div>

      {/* Immediate Emergency Hotline Action (Shown if user clicks emergency assistance) */}
      {emergencyActive && (
        <div className="p-6 sm:p-7 rounded-3xl bg-rose-50 border border-rose-200 text-rose-950 flex flex-col sm:flex-row sm:items-center justify-between gap-5 animate-fade-in">
          <div className="flex items-start gap-3.5">
            <AlertTriangleIcon size={24} className="text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-base sm:text-lg block">{t.wizard.phase1EmergencyHelp}</span>
              <span className="text-sm sm:text-base text-rose-800 leading-relaxed block">
                {t.wizard.phase1EmergencyDesc}
              </span>
            </div>
          </div>
          <a
            href="tel:112"
            className="min-h-[48px] inline-flex items-center justify-center px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-bold shadow-xs transition-colors whitespace-nowrap self-start sm:self-auto active:scale-[0.98]"
          >
            {t.wizard.phase1Call112}
          </a>
        </div>
      )}

      {/* Secondary Roadside Precautions Toggle */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setShowGuidance(!showGuidance)}
          className="min-h-[44px] w-full text-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors py-2"
        >
          {showGuidance ? "Hide safety precautions ↑" : t.wizard.phase1ChecklistToggle + " ↓"}
        </button>

        {showGuidance && (
          <div className="mt-4 p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 text-sm text-slate-700 animate-fade-in">
            <span className="font-bold text-slate-900 block text-base">
              {t.wizard.phase1ChecklistTitle}
            </span>
            <ul className="space-y-3 text-slate-600 pl-1 text-sm sm:text-base">
              <li className="flex items-center gap-3">
                <CheckCircleIcon size={18} className="text-emerald-600 flex-shrink-0" />
                <span>{t.wizard.phase1ChecklistHazards}</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircleIcon size={18} className="text-emerald-600 flex-shrink-0" />
                <span>{t.wizard.phase1ChecklistVest}</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircleIcon size={18} className="text-emerald-600 flex-shrink-0" />
                <span>{t.wizard.phase1ChecklistTriangle}</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
