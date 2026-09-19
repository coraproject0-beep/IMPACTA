"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useClaims } from "@/context/ClaimsContext";
import { useDriverDraft } from "@/context/DriverDraftContext";
import { SYNTHETIC_DRIVER_PROFILE } from "@/features/driver/data/driverProfileFixture";
import {
  UserIcon,
  ShieldIcon,
  CarIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  ChevronRightIcon,
} from "@/components/icons/Icons";

export default function DriverProfilePage() {
  const router = useRouter();
  const { resetDemoData } = useClaims();
  const { loadDemoIncident } = useDriverDraft();

  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const handleStartDemo = () => {
    loadDemoIncident();
    router.push("/app/report");
  };

  const handleExecuteReset = async () => {
    setIsResetting(true);
    try {
      await resetDemoData();
      setResetSuccess(true);
      setConfirmResetOpen(false);
      setTimeout(() => setResetSuccess(false), 3000);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto py-2">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-950">
          Profile &amp; Policy
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Policyholder credentials, registered vehicles, and prototype evaluation tools
        </p>
      </div>

      {/* Driver Identity */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Policyholder Information
        </h2>
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
              MB
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">
                {SYNTHETIC_DRIVER_PROFILE.fullName}
              </div>
              <div className="text-xs text-slate-500 font-mono">
                {SYNTHETIC_DRIVER_PROFILE.fiscalCode}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[11px] text-slate-400 block">Driving License</span>
              <span className="font-semibold text-slate-800 font-mono">
                {SYNTHETIC_DRIVER_PROFILE.licenseNumber} (Cat. B)
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Policy Valid Until</span>
              <span className="font-semibold text-slate-800 font-mono">
                {SYNTHETIC_DRIVER_PROFILE.policy.validUntil}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Phone</span>
              <span className="font-semibold text-slate-800">
                {SYNTHETIC_DRIVER_PROFILE.phone}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Email</span>
              <span className="font-semibold text-slate-800">
                {SYNTHETIC_DRIVER_PROFILE.email}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Vehicle & Policy */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Covered Vehicle &amp; Insurance
        </h2>
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <CarIcon size={18} className="text-slate-600" />
              <div>
                <div className="text-sm font-bold text-slate-900">
                  {SYNTHETIC_DRIVER_PROFILE.vehicle.make} {SYNTHETIC_DRIVER_PROFILE.vehicle.model} ({SYNTHETIC_DRIVER_PROFILE.vehicle.year})
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  Plate: <span className="font-semibold text-slate-800">{SYNTHETIC_DRIVER_PROFILE.vehicle.plate}</span>
                </div>
              </div>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
              Active Policy
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[11px] text-slate-400 block">Carrier</span>
              <span className="font-semibold text-slate-800">
                {SYNTHETIC_DRIVER_PROFILE.policy.insurerName}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Policy Number</span>
              <span className="font-semibold text-slate-800 font-mono">
                {SYNTHETIC_DRIVER_PROFILE.policy.policyNumber}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Coverage</span>
              <span className="font-semibold text-slate-800">
                {SYNTHETIC_DRIVER_PROFILE.policy.coverageType.replace("_", " ")}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Validity</span>
              <span className="font-semibold text-slate-800 font-mono">
                {SYNTHETIC_DRIVER_PROFILE.policy.validUntil}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Discrete Prototype / Demo Settings */}
      <section className="pt-4 border-t border-slate-200/80 space-y-4">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Prototype Evaluation &amp; Utilities
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Deterministic fixtures and reset controls for academic demonstration
          </p>
        </div>

        {resetSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-900 flex items-center gap-2">
            <CheckCircleIcon size={14} className="text-emerald-600 flex-shrink-0" />
            <span>Synthetic data restored and media storage reset successfully.</span>
          </div>
        )}

        <div className="bg-slate-100/70 border border-slate-200/80 rounded-lg p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold text-slate-900">
                Canonical Roundabout Incident Demo
              </div>
              <div className="text-[11px] text-slate-500">
                Pre-loads the Piazza San Giovanni collision between Matteo Bianchi &amp; Marco Rossi.
              </div>
            </div>
            <button
              type="button"
              onClick={handleStartDemo}
              className="px-3.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-medium text-xs rounded-md shadow-2xs transition-colors whitespace-nowrap"
            >
              Load Demo Incident
            </button>
          </div>

          <div className="border-t border-slate-200/70 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold text-slate-900">
                Reset All Demo Data
              </div>
              <div className="text-[11px] text-slate-500">
                Restores original 14 synthetic claims and clears locally uploaded photos.
              </div>
            </div>
            {confirmResetOpen ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleExecuteReset}
                  disabled={isResetting}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs rounded-md transition-colors"
                >
                  {isResetting ? "Resetting..." : "Confirm Reset"}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmResetOpen(false)}
                  className="px-2.5 py-1.5 bg-white border border-slate-300 text-slate-600 text-xs rounded-md"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmResetOpen(true)}
                className="px-3.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-md shadow-2xs transition-colors whitespace-nowrap"
              >
                Reset Demo Data
              </button>
            )}
          </div>
        </div>

        <p className="text-[11px] text-slate-400">
          Token Titans Academic Demonstrator • All data persists strictly in browser storage (`localStorage` and `IndexedDB`).
        </p>
      </section>
    </div>
  );
}
