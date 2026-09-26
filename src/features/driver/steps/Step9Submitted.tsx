"use client";

import React from "react";
import Link from "next/link";
import { DriverDraft } from "@/types/driver";
import { CheckCircleIcon, LayersIcon, ArrowLeftIcon } from "@/components/icons/Icons";

interface Step9SubmittedProps {
  draft: DriverDraft;
  onReturnHome: () => void;
}

export function Step9Submitted({ draft, onReturnHome }: Step9SubmittedProps) {
  const claimId = draft.submittedClaimId || "CLM-DEMO-015";

  return (
    <div className="space-y-6 py-4 text-center">
      <div className="w-14 h-14 mx-auto rounded-xl bg-[#0E0F10] text-white flex items-center justify-center">
        <CheckCircleIcon size={28} />
      </div>

      <div className="space-y-1">
        <h2 className="text-lg font-bold text-slate-950 tracking-tight">
          Report Received
        </h2>
        <p className="text-xs text-slate-500">
          Your accident report has been processed and saved locally.
        </p>
      </div>

      {/* Claim Identification Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-left space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200/70 pb-2">
          <span className="text-xs text-slate-500 font-medium">Claim Identifier</span>
          <span className="font-mono font-bold text-sm text-blue-700">{claimId}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Submission Time</span>
            <span className="font-semibold text-slate-800">
              {draft.submittedAt
                ? new Date(draft.submittedAt).toLocaleTimeString("it-IT", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Just now"}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Evidence Uploaded</span>
            <span className="font-semibold text-slate-800">
              {draft.evidenceItems.length} photos / docs
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Workflow Status</span>
            <span className="font-semibold text-emerald-700">
              {draft.isDemoIncident ? "CAI Draft Ready" : "New Intake"}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Assigned Adjuster</span>
            <span className="text-slate-500 italic">Pending triage</span>
          </div>
        </div>
      </div>

      {/* Local Prototype Reassurance */}
      <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded text-[11px] text-amber-900 text-left">
        <strong>Demo claim created locally:</strong> This dossier is currently persisted in your browser&apos;s local storage. No data has been transmitted to an external carrier or cloud server.
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-2">
        <Link
          href={`/console/claims/${claimId}`}
          className="w-full py-3 px-4 bg-slate-900 hover:bg-blue-600 text-white rounded-md text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2"
        >
          <LayersIcon size={16} />
          <span>Open in Claims Console Demo →</span>
        </Link>

        <button
          type="button"
          onClick={onReturnHome}
          className="w-full py-2.5 px-4 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-md text-xs font-semibold transition-colors"
        >
          Return to Driver Home
        </button>
      </div>
    </div>
  );
}
