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
      <div className="space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
          {t.wizard.phase1Title}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
          {t.wizard.phase1Question}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Take a slow breath. Before capturing damage photos or writing statements, ensure you and your passengers are out of traffic and away from danger.
        </p>
      </div>

      {/* Immediate Emergency Hotline Action */}
      <div className="p-6 rounded-3xl bg-rose-50/80 border border-rose-200 text-rose-950 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-start gap-3.5">
          <AlertTriangleIcon size={24} className="text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-base block">{t.wizard.phase1EmergencyHelp}</span>
            <span className="text-xs text-rose-800 leading-relaxed block">
              {t.wizard.phase1EmergencyDesc}
            </span>
          </div>
        </div>
        <a
          href="tel:112"
          className="min-h-[48px] inline-flex items-center justify-center px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors whitespace-nowrap self-start sm:self-auto active:scale-[0.98]"
        >
          {t.wizard.phase1Call112}
        </a>
      </div>

      {/* Primary Affirmation CTA */}
      <div className="space-y-4 pt-2">
        <button
          type="button"
          onClick={handleContinue}
          className="min-h-[52px] w-full py-4 px-6 rounded-2xl font-bold text-base bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center justify-center gap-2.5 transition-all active:scale-[0.98]"
        >
          <span>{t.wizard.phase1SafetyYes}</span>
          <ArrowRightIcon size={18} />
        </button>

        <button
          type="button"
          onClick={() => setShowGuidance(!showGuidance)}
          className="min-h-[44px] w-full text-center text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors py-2"
        >
          {showGuidance ? "Hide safety precautions ↑" : t.wizard.phase1ChecklistToggle + " ↓"}
        </button>
      </div>

      {/* Secondary Roadside Guidance (Revealed on click) */}
      {showGuidance && (
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 text-xs text-slate-700 animate-fade-in">
          <span className="font-bold text-slate-900 block text-sm">
            {t.wizard.phase1ChecklistTitle}
          </span>
          <ul className="space-y-2.5 text-slate-600 pl-1">
            <li className="flex items-center gap-2.5">
              <CheckCircleIcon size={16} className="text-emerald-600 flex-shrink-0" />
              <span>{t.wizard.phase1ChecklistHazards}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircleIcon size={16} className="text-emerald-600 flex-shrink-0" />
              <span>{t.wizard.phase1ChecklistVest}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircleIcon size={16} className="text-emerald-600 flex-shrink-0" />
              <span>{t.wizard.phase1ChecklistTriangle}</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
