"use client";

import React, { useState } from "react";
import { DriverDraft } from "@/types/driver";
import { SYNTHETIC_DRIVER_PROFILE } from "@/features/driver/data/driverProfileFixture";
import { CheckCircleIcon, AlertTriangleIcon } from "@/components/icons/Icons";

interface Step8CAIReviewProps {
  draft: DriverDraft;
  onUpdate: (patch: Partial<DriverDraft>) => void;
  onSubmit: () => Promise<void>;
}

export function Step8CAIReview({ draft, onUpdate, onSubmit }: Step8CAIReviewProps) {
  const [hasConfirmedAgreement, setHasConfirmedAgreement] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Uncertain circumstance confirmations
  const confirmed12A = Boolean(draft.caiConfirmedFields["12A"]);
  const confirmed12B = Boolean(draft.caiConfirmedFields["12B"]);

  const toggle12A = () => {
    onUpdate({
      caiConfirmedFields: {
        ...draft.caiConfirmedFields,
        "12A": !confirmed12A,
      },
    });
  };

  const toggle12B = () => {
    onUpdate({
      caiConfirmedFields: {
        ...draft.caiConfirmedFields,
        "12B": !confirmed12B,
      },
    });
  };

  // Compute real completion percentage
  const totalChecks = 8;
  let passedChecks = 5; // Profile A, Vehicle A, Policy A, Date, Location
  if (draft.evidenceItems.length > 0) passedChecks++;
  if (draft.counterparty.plate) passedChecks++;
  if (confirmed12A) passedChecks++;

  const completionPct = Math.min(100, Math.round((passedChecks / totalChecks) * 100));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasConfirmedAgreement) return;
    setIsSubmitting(true);
    try {
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 py-2">
      <div className="space-y-1">
        <h2 className="text-base font-bold text-slate-950">
          Standardized CAI Review
        </h2>
        <p className="text-xs text-slate-500">
          Review the structured information prepared for your insurance claim.
        </p>
      </div>

      {/* Progress & Automation Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-800">
            Report Completeness
          </span>
          <span className="font-mono text-blue-700 font-bold">
            {completionPct}%
          </span>
        </div>
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full" style={{ width: `${completionPct}%` }} />
        </div>
        <div className="text-[11px] text-slate-500">
          {!confirmed12A
            ? "1 circumstance item requires your confirmation before submission."
            : "All core items reviewed and ready."}
        </div>
      </div>

      {/* Structured Sections */}
      <div className="space-y-3">
        {/* Section 1: Accident Details */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 text-xs space-y-2">
          <div className="font-bold text-slate-900 border-b border-slate-100 pb-1.5 flex items-center justify-between">
            <span>Accident Time &amp; Place</span>
            <span className="text-[10px] font-mono text-emerald-700">Verified</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-slate-400 block">Date &amp; Time</span>
              <span className="font-semibold text-slate-800">
                {draft.incidentDate} at {draft.incidentTime}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Location</span>
              <span className="font-semibold text-slate-800 truncate block">
                {draft.location.city}, {draft.location.street}
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Your Vehicle (Party A) */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 text-xs space-y-2">
          <div className="font-bold text-slate-900 border-b border-slate-100 pb-1.5 flex items-center justify-between">
            <span>Your Details (Vehicle A)</span>
            <span className="text-[10px] font-mono text-slate-500">Policy Profile</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-slate-400 block">Driver</span>
              <span className="font-semibold text-slate-800">
                {SYNTHETIC_DRIVER_PROFILE.fullName}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">License Plate</span>
              <span className="font-mono font-semibold text-slate-800">
                {SYNTHETIC_DRIVER_PROFILE.vehicle.plate}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Vehicle</span>
              <span className="text-slate-700">
                {SYNTHETIC_DRIVER_PROFILE.vehicle.make} {SYNTHETIC_DRIVER_PROFILE.vehicle.model}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Insurer</span>
              <span className="text-slate-700">
                {SYNTHETIC_DRIVER_PROFILE.policy.insurerName}
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Counterparty (Party B) */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 text-xs space-y-2">
          <div className="font-bold text-slate-900 border-b border-slate-100 pb-1.5 flex items-center justify-between">
            <span>Other Party (Vehicle B)</span>
            <span className="text-[10px] font-mono text-slate-500">
              {draft.counterparty.hasInfo ? "Identified" : "Unilateral"}
            </span>
          </div>
          {draft.counterparty.hasInfo ? (
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-400 block">Driver</span>
                <span className="font-semibold text-slate-800">
                  {draft.counterparty.driverName || "Pending inquiry"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Plate</span>
                <span className="font-mono font-semibold text-slate-800">
                  {draft.counterparty.plate || "Unknown"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Insurer</span>
                <span className="text-slate-700">
                  {draft.counterparty.insurer || "Pending"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Vehicle</span>
                <span className="text-slate-700 truncate block">
                  {draft.counterparty.makeModel || "Unknown"}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-[11px] text-slate-500">
              No counterparty information recorded for this report.
            </p>
          )}
        </div>

        {/* Section 4: Circumstances with Confirmation Toggles */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 text-xs space-y-2.5">
          <div className="font-bold text-slate-900 border-b border-slate-100 pb-1.5 flex items-center justify-between">
            <span>Accident Dynamics (CAI Box 12)</span>
            <span className="text-[10px] font-mono text-amber-700 font-semibold">
              Confirmation Required
            </span>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 bg-slate-50 rounded border border-slate-200 flex items-center justify-between gap-2">
              <div className="text-[11px]">
                <span className="font-semibold text-slate-800 block">
                  Your Maneuver (Circumstance 12A):
                </span>
                <span className="text-slate-600">
                  {draft.isDemoIncident
                    ? "Circolava su una piazza a senso rotatorio"
                    : "In marcia regolare nella propria corsia"}
                </span>
              </div>
              <button
                type="button"
                onClick={toggle12A}
                className={`px-2 py-1 rounded text-[10px] font-semibold flex items-center gap-1 transition-colors ${
                  confirmed12A
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                    : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                }`}
              >
                {confirmed12A ? (
                  <>
                    <CheckCircleIcon size={12} /> Confirmed
                  </>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>

            {draft.isDemoIncident && (
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200 flex items-center justify-between gap-2">
                <div className="text-[11px]">
                  <span className="font-semibold text-slate-800 block">
                    Other Vehicle (Circumstance 12B):
                  </span>
                  <span className="text-slate-600">
                    Si immetteva in una piazza a senso rotatorio
                  </span>
                </div>
                <button
                  type="button"
                  onClick={toggle12B}
                  className={`px-2 py-1 rounded text-[10px] font-semibold flex items-center gap-1 transition-colors ${
                    confirmed12B
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                      : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {confirmed12B ? (
                    <>
                      <CheckCircleIcon size={12} /> Confirmed
                    </>
                  ) : (
                    "Confirm"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Explicit User Confirmation Checkbox */}
      <div className="pt-2 border-t border-slate-200">
        <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={hasConfirmedAgreement}
            onChange={(e) => setHasConfirmedAgreement(e.target.checked)}
            className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="leading-relaxed text-[11px]">
            I have reviewed the information above and confirm that it reflects the circumstances of the collision to the best of my knowledge.
          </span>
        </label>
        <p className="text-[10px] text-slate-400 mt-1 pl-6">
          This is an operational demonstration submission. It does not constitute a legally binding electronic signature.
        </p>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={!hasConfirmedAgreement || isSubmitting}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-md text-xs font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isSubmitting ? "Generating Claim Dossier..." : "Submit Demo Report"}
        </button>
      </div>
    </form>
  );
}
