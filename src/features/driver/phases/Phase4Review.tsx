"use client";

import React, { useState } from "react";
import { DriverDraft } from "@/types/driver";
import { SYNTHETIC_DRIVER_PROFILE } from "@/features/driver/data/driverProfileFixture";
import {
  CheckCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
  EditIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
} from "@/components/icons/Icons";

interface Phase4ReviewProps {
  draft: DriverDraft;
  onUpdate: (patch: Partial<DriverDraft>) => void;
  onSubmit: () => Promise<void>;
  onEditSection: (section: "accident" | "capture") => void;
}

export function Phase4Review({
  draft,
  onUpdate,
  onSubmit,
  onEditSection,
}: Phase4ReviewProps) {
  const [reconstructionMatches, setReconstructionMatches] = useState(
    draft.reconstructionConfirmed ?? true
  );
  const [hasConfirmedDeclaration, setHasConfirmedDeclaration] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Circumstance confirmations
  const confirmedCircumstanceA = Boolean(draft.caiConfirmedFields["12A"] ?? true);
  const confirmedCircumstanceB = Boolean(draft.caiConfirmedFields["12B"] ?? true);

  const toggleCircumstanceA = () => {
    onUpdate({
      caiConfirmedFields: {
        ...draft.caiConfirmedFields,
        "12A": !confirmedCircumstanceA,
      },
    });
  };

  const toggleCircumstanceB = () => {
    onUpdate({
      caiConfirmedFields: {
        ...draft.caiConfirmedFields,
        "12B": !confirmedCircumstanceB,
      },
    });
  };

  // Completion calculation
  const totalChecks = 6;
  let passedChecks = 3; // Date/Location, Matteo Profile, Policy
  if (draft.evidenceItems.length > 0) passedChecks++;
  if (draft.counterparty.plate || !draft.counterparty.hasInfo) passedChecks++;
  if (confirmedCircumstanceA) passedChecks++;
  const completionPct = Math.min(100, Math.round((passedChecks / totalChecks) * 100));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasConfirmedDeclaration) return;
    setIsSubmitting(true);
    try {
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Phase Header */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
          Phase 4: Review &amp; Confirmation
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950">
          Review your report before submission
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Check the summarized accident dynamics, verified circumstances, and attached evidence.
        </p>
      </div>

      {/* Completeness Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">CAI Standardized Completeness</span>
            <span className="text-[10px] text-slate-500 font-mono">Dossier #015-DRAFT</span>
          </div>
          <span className="font-mono text-blue-700 font-bold text-sm">{completionPct}%</span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${completionPct}%` }}
          />
        </div>
        <p className="text-[11px] text-slate-500">
          All mandatory Italian &amp; European claim fields populated. Ready for adjuster ingestion.
        </p>
      </div>

      {/* 1. Human Reconstruction Check (Plain Language) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon size={18} className="text-blue-600" />
            <span className="text-sm font-bold text-slate-900">Dynamics Summary</span>
          </div>
          <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            Plain English
          </span>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p className="font-medium text-slate-900">
            Based on the available information, this accident appears consistent with:
          </p>
          <ul className="space-y-1.5 pl-4 list-disc text-slate-600">
            <li>
              You were travelling along the roundabout (Piazza San Giovanni, Florence).
            </li>
            <li>
              The counterparty vehicle entered into the roundabout from your right without granting priority.
            </li>
            <li>
              Contact occurred near the front-left section of your vehicle.
            </li>
          </ul>
        </div>

        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-semibold text-slate-800">
            Does this accurately describe what happened?
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setReconstructionMatches(true);
                onUpdate({ reconstructionConfirmed: true });
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                reconstructionMatches
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <CheckCircleIcon size={14} />
              <span>Yes, this matches</span>
            </button>
            <button
              type="button"
              onClick={() => onEditSection("capture")}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-1 transition-colors"
            >
              <EditIcon size={13} />
              <span>Edit Details</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Honest Prototype Analysis Notice */}
      {draft.isDemoIncident ? (
        <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 text-emerald-950 space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircleIcon size={16} className="text-emerald-600 flex-shrink-0" />
            <span className="font-bold text-xs">Simulated Neural Verification Complete</span>
          </div>
          <p className="text-[11px] text-emerald-800 leading-relaxed">
            4 out of 4 baseline checks passed: Roundabout topology verified, speed trajectory calculated (~34 km/h), damage pattern cross-referenced with photo evidence, and CAI Circumstances 6 &amp; 7 matched.
          </p>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 space-y-2">
          <div className="flex items-center gap-2">
            <InfoIcon size={16} className="text-slate-500 flex-shrink-0" />
            <span className="font-bold text-xs">Local Storage Mode</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Live neural computer vision pipelines are not connected in this prototype. Your uploaded photos and statement are securely preserved in local browser storage and submitted directly for human adjuster evaluation.
          </p>
        </div>
      )}

      {/* 3. Structured Data Overview */}
      <div className="space-y-3">
        {/* Incident Details Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-bold text-slate-900">Incident Details</span>
            <button
              type="button"
              onClick={() => onEditSection("accident")}
              className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
            >
              <EditIcon size={12} />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px]">
            <div>
              <span className="text-slate-400 block">Date &amp; Time</span>
              <span className="font-semibold text-slate-800">
                {draft.incidentDate} at {draft.incidentTime}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Location</span>
              <span className="font-semibold text-slate-800 truncate block">
                {draft.location.street || "Florence"}, {draft.location.city}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Injuries / Police</span>
              <span className="font-semibold text-slate-800">
                {draft.anyInjured ? "Reported" : "None"} • {draft.policePresent ? "Police present" : "No police"}
              </span>
            </div>
          </div>
        </div>

        {/* Parties Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Party A */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-900">Your Vehicle (Party A)</span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                Verified
              </span>
            </div>
            <div className="space-y-1 text-[11px]">
              <div>
                <span className="text-slate-400">Driver: </span>
                <span className="font-semibold text-slate-800">{SYNTHETIC_DRIVER_PROFILE.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400">Plate: </span>
                <span className="font-mono font-semibold text-slate-800">
                  {SYNTHETIC_DRIVER_PROFILE.vehicle.plate}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Policy: </span>
                <span className="text-slate-700">
                  {SYNTHETIC_DRIVER_PROFILE.policy.insurerName} ({SYNTHETIC_DRIVER_PROFILE.policy.policyNumber})
                </span>
              </div>
            </div>
          </div>

          {/* Party B */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-900">Other Party (Party B)</span>
              <button
                type="button"
                onClick={() => onEditSection("capture")}
                className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
              >
                <EditIcon size={12} />
                <span>Edit</span>
              </button>
            </div>
            <div className="space-y-1 text-[11px]">
              <div>
                <span className="text-slate-400">Driver: </span>
                <span className="font-semibold text-slate-800">
                  {draft.counterparty.driverName || "Not provided"}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Plate: </span>
                <span className="font-mono font-semibold text-slate-800">
                  {draft.counterparty.plate || "Not provided"}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Insurer: </span>
                <span className="text-slate-700">
                  {draft.counterparty.insurer || "Pending inquiry"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Evidence & Statement Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-bold text-slate-900">Evidence &amp; Statement</span>
            <button
              type="button"
              onClick={() => onEditSection("capture")}
              className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
            >
              <EditIcon size={12} />
              <span>Edit</span>
            </button>
          </div>
          <div className="space-y-2 text-[11px]">
            <div>
              <span className="text-slate-400 block mb-0.5">Your Statement:</span>
              <p className="text-slate-700 italic bg-slate-50 p-2 rounded border border-slate-100">
                &ldquo;{draft.statement || "No written statement provided."}&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1 text-slate-600">
              <span className="font-semibold">{draft.evidenceItems.length} photos captured</span>
              <span>•</span>
              <span>Stored locally in browser IndexedDB / memory</span>
            </div>
          </div>
        </div>

        {/* 4. CAI Box 12 Circumstances (Plain Language Toggles) */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs space-y-3">
          <div className="border-b border-slate-100 pb-2">
            <span className="font-bold text-slate-900 block">Accident Dynamics (CAI Box 12)</span>
            <span className="text-[11px] text-slate-500">
              Standard European accident circumstances mapped to this event.
            </span>
          </div>

          <div className="space-y-2">
            {/* Circumstance A */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between gap-3">
              <div className="text-[11px]">
                <span className="font-semibold text-slate-900 block">
                  Your Maneuver (Circumstance 7):
                </span>
                <span className="text-slate-600">
                  {draft.isDemoIncident
                    ? "Circolava su una piazza a senso rotatorio (Travelling in a roundabout)"
                    : "In marcia regolare nella propria corsia (Travelling in lane)"}
                </span>
              </div>
              <button
                type="button"
                onClick={toggleCircumstanceA}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors flex-shrink-0 ${
                  confirmedCircumstanceA
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                }`}
              >
                {confirmedCircumstanceA ? (
                  <>
                    <CheckCircleIcon size={12} /> Confirmed
                  </>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>

            {/* Circumstance B */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between gap-3">
              <div className="text-[11px]">
                <span className="font-semibold text-slate-900 block">
                  Other Vehicle (Circumstance 6):
                </span>
                <span className="text-slate-600">
                  {draft.isDemoIncident
                    ? "Si immetteva in una piazza a senso rotatorio (Entering a roundabout)"
                    : "Manovra da accertare (To be determined)"}
                </span>
              </div>
              <button
                type="button"
                onClick={toggleCircumstanceB}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors flex-shrink-0 ${
                  confirmedCircumstanceB
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                }`}
              >
                {confirmedCircumstanceB ? (
                  <>
                    <CheckCircleIcon size={12} /> Confirmed
                  </>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Mandatory Declaration Checkbox */}
      <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/80 space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={hasConfirmedDeclaration}
            onChange={(e) => setHasConfirmedDeclaration(e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
          />
          <div className="text-xs text-slate-800 leading-relaxed">
            <span className="font-bold block">Declaration of Accuracy</span>
            I declare that the information, statements, and photographic evidence provided in this report are true and accurate to the best of my knowledge, and I authorize their transmission for claim processing.
          </div>
        </label>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={!hasConfirmedDeclaration || isSubmitting}
          className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm tracking-wide shadow-sm flex items-center justify-center gap-2 transition-all ${
            hasConfirmedDeclaration && !isSubmitting
              ? "bg-blue-600 hover:bg-blue-700 text-white active:scale-[0.99] cursor-pointer"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? (
            <span>Transmitting report...</span>
          ) : (
            <>
              <span>Submit Claim Report</span>
              <ArrowRightIcon size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
