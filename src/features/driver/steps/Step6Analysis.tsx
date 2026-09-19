"use client";

import React from "react";
import { DriverDraft } from "@/types/driver";
import { DemoSimulation } from "../components/DemoSimulation";
import { InfoIcon, CheckCircleIcon, CameraIcon } from "@/components/icons/Icons";

interface Step6AnalysisProps {
  draft: DriverDraft;
  onProceedToReconstruction: () => void;
  onProceedToCAI: () => void;
}

export function Step6Analysis({
  draft,
  onProceedToReconstruction,
  onProceedToCAI,
}: Step6AnalysisProps) {
  // If this is the canonical demo incident, run the deterministic transformation sequence
  if (draft.isDemoIncident) {
    return <DemoSimulation onComplete={onProceedToReconstruction} />;
  }

  // Honest Real Upload Path: Transparently explain that live AI is disconnected
  return (
    <div className="space-y-6 py-4">
      <div className="text-center space-y-1">
        <h3 className="text-base font-bold text-slate-900">
          Evidence Saved Locally
        </h3>
        <p className="text-xs text-slate-500">
          Your accident records are securely stored on this device.
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3 text-xs">
        <div className="flex items-start gap-2.5 text-slate-700">
          <InfoIcon size={16} className="text-slate-500 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-slate-900 block">
              Live Multimodal AI Disconnected
            </span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              In this prototype environment, automated computer vision models are not connected to external servers. Your uploaded evidence has been saved on this device, and the claim will be reviewed manually by an adjuster.
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-200/60 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-1.5">
              <CameraIcon size={14} className="text-slate-400" />
              <span>Evidence photos stored:</span>
            </span>
            <span className="font-mono font-semibold text-slate-900">
              {draft.evidenceItems.length} files
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-1.5">
              <CheckCircleIcon size={14} className="text-emerald-600" />
              <span>Driver statement:</span>
            </span>
            <span className="font-semibold text-slate-900">Recorded</span>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onProceedToCAI}
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Continue to Manual CAI Review →
        </button>
      </div>
    </div>
  );
}
