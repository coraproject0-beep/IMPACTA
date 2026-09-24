"use client";

import React, { useState } from "react";
import { DriverDraft } from "@/types/driver";
import { CheckCircleIcon, EditIcon, InfoIcon } from "@/components/icons/Icons";

interface Step7ReconstructionProps {
  draft: DriverDraft;
  onConfirm: () => void;
  onEditStatement: () => void;
}

export function Step7Reconstruction({
  draft,
  onConfirm,
  onEditStatement,
}: Step7ReconstructionProps) {
  const [isConfirmed, setIsConfirmed] = useState(draft.reconstructionConfirmed || true);

  return (
    <div className="space-y-5 py-2">
      <div className="space-y-1">
        <h2 className="text-base font-bold text-slate-950">
          Accident Reconstruction
        </h2>
        <p className="text-xs text-slate-500">
          Based on the available evidence, the incident appears consistent with:
        </p>
      </div>

      {/* Reconstruction Steps Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
        <div className="space-y-3 text-xs">
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold font-mono text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
              1
            </span>
            <p className="text-slate-700 leading-relaxed">
              Your vehicle (Volkswagen Golf) was circulating along the outer lane of the roundabout at approximately 34 km/h.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold font-mono text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
              2
            </span>
            <p className="text-slate-700 leading-relaxed">
              The counterparty vehicle (Fiat 500X) approached the roundabout inlet from Via Merulana across the yield line.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold font-mono text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
              3
            </span>
            <p className="text-slate-700 leading-relaxed">
              Oblique contact occurred between your front-right bumper and the counterparty&apos;s front-left wing at ~22 km/h following braking.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 italic">
          Some details may still require confirmation by your claims adjuster.
        </div>
      </div>

      {/* Verification Prompt */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2 text-xs">
        <div className="font-semibold text-slate-800">
          Does this match what happened?
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsConfirmed(true)}
            className={`flex-1 py-2 px-3 rounded text-xs font-semibold flex items-center justify-center gap-1.5 border transition-colors ${
              isConfirmed
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-700 border-slate-300"
            }`}
          >
            <CheckCircleIcon size={14} />
            <span>Yes, this matches</span>
          </button>

          <button
            type="button"
            onClick={onEditStatement}
            className="py-2 px-3 rounded text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 flex items-center gap-1 transition-colors"
          >
            <EditIcon size={13} />
            <span>Edit</span>
          </button>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onConfirm}
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Continue to CAI Report →
        </button>
      </div>

      <p className="text-[10px] text-center text-slate-400">
        IMPACTA does not determine legal liability or financial fault.
      </p>
    </div>
  );
}
