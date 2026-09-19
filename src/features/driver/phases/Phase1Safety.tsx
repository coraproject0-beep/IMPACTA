"use client";

import React, { useState } from "react";
import { DriverDraft } from "@/types/driver";
import { AlertTriangleIcon, ArrowRightIcon, CheckCircleIcon } from "@/components/icons/Icons";

interface Phase1SafetyProps {
  draft: DriverDraft;
  onUpdate: (patch: Partial<DriverDraft>) => void;
  onNext: () => void;
}

export function Phase1Safety({ draft, onUpdate, onNext }: Phase1SafetyProps) {
  const [showGuidance, setShowGuidance] = useState(false);

  const handleContinue = () => {
    onUpdate({
      safetyConfirmed: true,
      anyInjured: false,
    });
    onNext();
  };

  return (
    <div className="space-y-8 py-2 max-w-2xl">
      {/* Primary Question: Large, Calm, Clear */}
      <div className="space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
          Step 1 · Safety Check
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight">
          Are you and everyone around you safe?
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Take a slow breath. Before capturing damage photos or writing statements, ensure you and your passengers are out of traffic and away from danger.
        </p>
      </div>

      {/* Immediate Emergency Hotline Action */}
      <div className="p-5 sm:p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <AlertTriangleIcon size={22} className="text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-sm block">Need immediate medical, fire, or police assistance?</span>
            <span className="text-xs text-rose-800">Dial the Single European Emergency Number. Operators speak Italian and English.</span>
          </div>
        </div>
        <a
          href="tel:112"
          className="inline-flex items-center justify-center px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors whitespace-nowrap self-start sm:self-auto active:scale-[0.98]"
        >
          Call 112
        </a>
      </div>

      {/* Primary Affirmation CTA */}
      <div className="space-y-4 pt-2">
        <button
          type="button"
          onClick={handleContinue}
          className="w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center justify-center gap-2.5 transition-all active:scale-[0.98]"
        >
          <span>Yes, everyone is safe — Continue</span>
          <ArrowRightIcon size={16} />
        </button>

        <button
          type="button"
          onClick={() => setShowGuidance(!showGuidance)}
          className="w-full text-center text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          {showGuidance ? "Hide safety precautions ↑" : "Review roadside safety precautions ↓"}
        </button>
      </div>

      {/* Secondary Roadside Guidance (Revealed on click) */}
      {showGuidance && (
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs text-slate-700 animate-fade-in">
          <span className="font-bold text-slate-900 block">Recommended Roadside Checklist</span>
          <ul className="space-y-2 text-slate-600 pl-1">
            <li className="flex items-center gap-2">
              <CheckCircleIcon size={14} className="text-emerald-600 flex-shrink-0" />
              <span>Turn on vehicle hazard warning lights</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon size={14} className="text-emerald-600 flex-shrink-0" />
              <span>Put on high-visibility reflective vests before exiting the vehicle</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon size={14} className="text-emerald-600 flex-shrink-0" />
              <span>Place the warning reflective triangle at least 50 meters behind the vehicle</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon size={14} className="text-emerald-600 flex-shrink-0" />
              <span>Move behind the road guardrail or sidewalk if possible</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
