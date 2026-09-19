"use client";

import React from "react";
import Link from "next/link";
import { DriverDraft } from "@/types/driver";
import { useLanguage } from "@/context/LanguageContext";
import { SYNTHETIC_DRIVER_PROFILE } from "@/features/driver/data/driverProfileFixture";
import {
  CheckCircleIcon,
  HomeIcon,
  BookmarkIcon,
  ShieldCheckIcon,
} from "@/components/icons/Icons";

interface Phase5SubmittedProps {
  draft: DriverDraft;
  onReturnHome: () => void;
}

export function Phase5Submitted({ draft, onReturnHome }: Phase5SubmittedProps) {
  const { t } = useLanguage();
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
    <div className="space-y-6 py-2 text-center selection:bg-blue-100 selection:text-blue-900">
      {/* Big Calm Success Indicator */}
      <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
        <CheckCircleIcon size={36} />
      </div>

      <div className="space-y-1.5">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
          {t.wizard.phase5Subheader}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
          {t.wizard.phase5Title}
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Your incident dossier has been assembled and stored locally on this device. You can review or export your report at any time.
        </p>
      </div>

      {/* Official Receipt Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 text-left space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
              {t.wizard.phase5Reference}
            </span>
            <span className="font-mono font-bold text-lg sm:text-xl text-blue-700">
              {claimId}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
              {t.wizard.phase5FiledTimestamp}
            </span>
            <span className="text-xs font-semibold text-slate-700">
              {nowFormatted}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">{t.wizard.phase5InsuredVehicle}</span>
            <span className="font-bold text-slate-900 text-sm">
              {SYNTHETIC_DRIVER_PROFILE.vehicle.make} {SYNTHETIC_DRIVER_PROFILE.vehicle.model}
            </span>
            <span className="text-slate-500 font-mono text-xs block">
              {SYNTHETIC_DRIVER_PROFILE.vehicle.plate}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px]">{t.wizard.phase5PolicyNumber}</span>
            <span className="font-mono font-bold text-slate-900 text-sm">
              {SYNTHETIC_DRIVER_PROFILE.policy.policyNumber}
            </span>
            <span className="text-slate-500 text-xs block">
              {SYNTHETIC_DRIVER_PROFILE.policy.insurerName}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px]">{t.wizard.phase5Counterparty}</span>
            <span className="font-semibold text-slate-900 text-sm">
              {draft.counterparty.driverName || "Pending identification"}
            </span>
            <span className="text-slate-500 font-mono text-xs block">
              {draft.counterparty.plate || "Unknown plate"}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px]">{t.wizard.phase5EvidencePreserved}</span>
            <span className="font-bold text-emerald-700 text-sm">
              {draft.evidenceItems.length} photos preserved
            </span>
            <span className="text-slate-500 text-xs block">
              IndexedDB local storage
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span className="font-medium">Incident Location</span>
          <span className="font-bold text-slate-900">
            {draft.location.street || "Florence"}, {draft.location.city}
          </span>
        </div>
      </div>

      {/* Persistence Disclosure */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-600 space-y-1.5">
        <div className="flex items-center gap-1.5 font-bold text-slate-900">
          <ShieldCheckIcon size={16} className="text-blue-600" />
          <span>{t.wizard.phase5PersistenceTitle}</span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          {t.wizard.phase5PersistenceDesc}
        </p>
      </div>

      {/* Action Buttons: ZERO links to /console! */}
      <div className="space-y-3 pt-2">
        <Link
          href="/app/reports"
          className="min-h-[48px] w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-bold shadow-xs transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <BookmarkIcon size={18} />
          <span>{t.wizard.phase5ViewInReports}</span>
        </Link>

        <button
          type="button"
          onClick={onReturnHome}
          className="min-h-[48px] w-full py-3 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-2xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <HomeIcon size={18} />
          <span>{t.wizard.phase5ReturnHome}</span>
        </button>
      </div>
    </div>
  );
}
