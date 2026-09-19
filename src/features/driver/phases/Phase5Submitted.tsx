"use client";

import React from "react";
import Link from "next/link";
import { DriverDraft } from "@/types/driver";
import { SYNTHETIC_DRIVER_PROFILE } from "@/features/driver/data/driverProfileFixture";
import {
  CheckCircleIcon,
  LayersIcon,
  HomeIcon,
  BookmarkIcon,
  ShieldCheckIcon,
} from "@/components/icons/Icons";

interface Phase5SubmittedProps {
  draft: DriverDraft;
  onReturnHome: () => void;
}

export function Phase5Submitted({ draft, onReturnHome }: Phase5SubmittedProps) {
  const claimId = draft.submittedClaimId || "CLM-2026-0842";
  const nowFormatted = draft.submittedAt
    ? new Date(draft.submittedAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

  return (
    <div className="space-y-6 py-2 text-center">
      {/* Big Calm Success Indicator */}
      <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
        <CheckCircleIcon size={32} />
      </div>

      <div className="space-y-1.5">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
          Report Received
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950">
          Your accident report is saved
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          Your incident dossier has been assembled and stored locally on this device. You can review or export your report at any time.
        </p>
      </div>

      {/* Official Receipt Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 text-left space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Report Reference
            </span>
            <span className="font-mono font-bold text-base sm:text-lg text-blue-700">
              {claimId}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Filed Timestamp
            </span>
            <span className="text-xs font-semibold text-slate-700">
              {nowFormatted}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Insured Vehicle</span>
            <span className="font-semibold text-slate-800">
              {SYNTHETIC_DRIVER_PROFILE.vehicle.make} {SYNTHETIC_DRIVER_PROFILE.vehicle.model}
            </span>
            <span className="text-slate-500 font-mono text-[11px] block">
              {SYNTHETIC_DRIVER_PROFILE.vehicle.plate}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px]">Policy Number</span>
            <span className="font-semibold text-slate-800">
              {SYNTHETIC_DRIVER_PROFILE.policy.policyNumber}
            </span>
            <span className="text-slate-500 text-[11px] block">
              {SYNTHETIC_DRIVER_PROFILE.policy.insurerName}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px]">Counterparty</span>
            <span className="font-semibold text-slate-800">
              {draft.counterparty.driverName || "Pending identification"}
            </span>
            <span className="text-slate-500 font-mono text-[11px] block">
              {draft.counterparty.plate || "Unknown plate"}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px]">Evidence Preserved</span>
            <span className="font-semibold text-emerald-700">
              {draft.evidenceItems.length} photos / documents
            </span>
            <span className="text-slate-500 text-[11px] block">
              IndexedDB local storage
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span className="font-medium">Incident Location</span>
          <span className="font-semibold text-slate-800">
            {draft.location.street || "Florence"}, {draft.location.city}
          </span>
        </div>
      </div>

      {/* Persistence Disclosure */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-600 space-y-1">
        <div className="flex items-center gap-1.5 font-semibold text-slate-800">
          <ShieldCheckIcon size={14} className="text-blue-600" />
          <span>Local Storage Persistence</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Stored locally in this browser for the prototype. No external servers or real insurers were notified. You can inspect, review, or reopen this dossier at any time from your Reports tab.
        </p>
      </div>

      {/* Action Buttons: ZERO links to /console! */}
      <div className="space-y-2.5 pt-2">
        <Link
          href="/app/reports"
          className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
        >
          <BookmarkIcon size={16} />
          <span>View Report in Reports</span>
        </Link>

        <button
          type="button"
          onClick={onReturnHome}
          className="w-full py-3 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <HomeIcon size={16} />
          <span>Return to Driver Home</span>
        </button>
      </div>
    </div>
  );
}
