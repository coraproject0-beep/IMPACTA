"use client";

import React, { useState } from "react";
import { DriverDraft } from "@/types/driver";
import { CheckCircleIcon, AlertTriangleIcon, ArrowRightIcon } from "@/components/icons/Icons";

interface Phase1SafetyProps {
  draft: DriverDraft;
  onUpdate: (patch: Partial<DriverDraft>) => void;
  onNext: () => void;
}

export function Phase1Safety({ draft, onUpdate, onNext }: Phase1SafetyProps) {
  const [hazardsOn, setHazardsOn] = useState(true);
  const [vestOn, setVestOn] = useState(true);
  const [trianglePlaced, setTrianglePlaced] = useState(true);
  const [noInjuries, setNoInjuries] = useState(!draft.anyInjured);

  const handleContinue = () => {
    onUpdate({
      safetyConfirmed: true,
      anyInjured: !noInjuries,
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Header & Reassurance */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
          Safety Check
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950">
          Are you and your passengers in a safe location?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Accidents are stressful. Please ensure your physical safety and make the vehicle visible before beginning your report.
        </p>
      </div>

      {/* Emergency Hotline Alert */}
      <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 text-rose-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <AlertTriangleIcon size={18} className="text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold block">Need immediate medical or police assistance?</span>
            <span className="text-rose-800">Dial the Single European Emergency Number. Operators speak Italian and English.</span>
          </div>
        </div>
        <a
          href="tel:112"
          className="inline-flex items-center justify-center gap-1.5 py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors whitespace-nowrap"
        >
          <span>Call 112</span>
        </a>
      </div>

      {/* Reassuring Safety Checklist */}
      <div className="space-y-3 pt-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Safety Checklist
        </div>

        <div className="space-y-2.5 text-xs text-slate-800">
          <label className="flex items-start gap-3 p-3.5 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 transition-colors">
            <input
              type="checkbox"
              checked={noInjuries}
              onChange={(e) => setNoInjuries(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="font-semibold block text-slate-900">No severe or critical injuries</span>
              <span className="text-[11px] text-slate-500">Everyone involved is conscious, uninjured, and out of immediate traffic danger.</span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3.5 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 transition-colors">
            <input
              type="checkbox"
              checked={hazardsOn}
              onChange={(e) => setHazardsOn(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="font-semibold block text-slate-900">Hazard warning lights activated</span>
              <span className="text-[11px] text-slate-500">Vehicle flashers are blinking to alert approaching traffic.</span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3.5 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 transition-colors">
            <input
              type="checkbox"
              checked={vestOn}
              onChange={(e) => setVestOn(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="font-semibold block text-slate-900">Reflective high-visibility vest worn</span>
              <span className="text-[11px] text-slate-500">Mandatory on Italian extra-urban and highway roads.</span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3.5 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 transition-colors">
            <input
              type="checkbox"
              checked={trianglePlaced}
              onChange={(e) => setTrianglePlaced(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="font-semibold block text-slate-900">Warning triangle placed (if applicable)</span>
              <span className="text-[11px] text-slate-500">Positioned at least 50m behind the vehicle on open roads.</span>
            </div>
          </label>
        </div>
      </div>

      {/* Forward Button */}
      <div className="pt-4 border-t border-slate-200/80">
        <button
          type="button"
          onClick={handleContinue}
          className="w-full py-3.5 px-5 bg-slate-950 hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
        >
          <span>All Safe — Continue to Accident Details</span>
          <ArrowRightIcon size={14} />
        </button>
      </div>
    </div>
  );
}
