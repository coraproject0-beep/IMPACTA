"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDriverDraft } from "@/context/DriverDraftContext";
import { useClaims } from "@/context/ClaimsContext";
import { SYNTHETIC_DRIVER_PROFILE } from "@/features/driver/data/driverProfileFixture";
import {
  CarIcon,
  ShieldIcon,
  AlertTriangleIcon,
  ChevronRightIcon,
  FileTextIcon,
  CheckCircleIcon,
  ActivityIcon,
} from "@/components/icons/Icons";

export default function DriverHomePage() {
  const router = useRouter();
  const { startNewReport, loadDemoIncident } = useDriverDraft();
  const { claims, resetDemoData } = useClaims();
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Find existing claims filed by or involving Matteo Bianchi
  const driverClaims = claims.filter(
    (c) =>
      c.driverA.fullName === SYNTHETIC_DRIVER_PROFILE.fullName ||
      c.policyholder.fiscalCode === SYNTHETIC_DRIVER_PROFILE.fiscalCode
  );

  const handleStartRealReport = () => {
    startNewReport();
    router.push("/app/report");
  };

  const handleStartDemoIncident = () => {
    loadDemoIncident();
    router.push("/app/report");
  };

  const handleExecuteReset = async () => {
    await resetDemoData();
    setResetConfirmOpen(false);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 flex-1 flex flex-col justify-between select-none">
      <div className="space-y-6">
        {/* Top Profile Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              MB
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                {SYNTHETIC_DRIVER_PROFILE.fullName}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                {SYNTHETIC_DRIVER_PROFILE.fiscalCode}
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600">
              Demo Profile
            </span>
          </div>
        </div>

        {/* Reset Success Notice */}
        {resetSuccess && (
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 flex items-center gap-1.5 animate-in fade-in duration-150">
            <CheckCircleIcon size={14} className="text-emerald-600" />
            <span>Demo data reset to initial baseline fixtures.</span>
          </div>
        )}

        {/* Primary Call-to-Action: Report an Accident */}
        <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-400">
              Emergency Assistance &amp; Intake
            </span>
            <h2 className="text-lg font-bold tracking-tight">
              Involved in an accident?
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Step-by-step guidance to capture evidence, verify counterparties, and generate a standardized CAI report.
            </p>
          </div>

          <button
            type="button"
            onClick={handleStartRealReport}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <AlertTriangleIcon size={16} />
            <span>Report an Accident</span>
          </button>
        </div>

        {/* Secondary Demo Scenario Access */}
        <div className="bg-blue-50/60 border border-blue-200 rounded-lg p-3.5 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-slate-900">
              Classroom Presentation
            </div>
            <div className="text-[11px] text-slate-600">
              Pre-load deterministic roundabout demo incident
            </div>
          </div>
          <button
            type="button"
            onClick={handleStartDemoIncident}
            className="px-3 py-1.5 bg-white border border-blue-300 hover:bg-blue-50 text-blue-800 text-xs font-semibold rounded transition-colors flex-shrink-0"
          >
            Use Demo Incident →
          </button>
        </div>

        {/* Known Vehicle & Policy Cards (Demonstrating Pre-filled Value) */}
        <div className="space-y-3">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Registered Vehicle &amp; Coverage
          </h3>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-700">
                <CarIcon size={18} />
              </div>
              <div>
                <div className="font-semibold text-slate-900">
                  {SYNTHETIC_DRIVER_PROFILE.vehicle.make} {SYNTHETIC_DRIVER_PROFILE.vehicle.model}
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  Plate: {SYNTHETIC_DRIVER_PROFILE.vehicle.plate} ({SYNTHETIC_DRIVER_PROFILE.vehicle.color})
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-semibold">
              ACTIVE
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-700">
                <ShieldIcon size={18} />
              </div>
              <div>
                <div className="font-semibold text-slate-900">
                  {SYNTHETIC_DRIVER_PROFILE.policy.insurerName}
                </div>
                <div className="text-[11px] text-slate-500">
                  Pol. {SYNTHETIC_DRIVER_PROFILE.policy.policyNumber} • {SYNTHETIC_DRIVER_PROFILE.policy.coverageType}
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              Valid: 2027
            </span>
          </div>
        </div>

        {/* Existing Reports History */}
        {driverClaims.length > 0 && (
          <div className="space-y-2 pt-2">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Active Claims Dossiers ({driverClaims.length})
            </h3>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden bg-white">
              {driverClaims.map((claim) => (
                <Link
                  key={claim.id}
                  href={`/console/claims/${claim.id}`}
                  className="p-3 hover:bg-slate-50 flex items-center justify-between text-xs transition-colors"
                >
                  <div>
                    <div className="font-mono font-bold text-slate-900">{claim.id}</div>
                    <div className="text-[11px] text-slate-500">
                      {claim.incident.location.city} • {claim.evidence.length} photos
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                      {claim.status}
                    </span>
                    <ChevronRightIcon size={14} className="text-slate-400" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Quiet Utility Area & Reset Demo Control */}
      <div className="pt-6 border-t border-slate-200 text-center space-y-2">
        <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500">
          <Link href="/console" className="hover:text-slate-900 font-medium transition-colors">
            Open Claims Console →
          </Link>
          <span>•</span>
          <button
            type="button"
            onClick={() => setResetConfirmOpen(true)}
            className="text-slate-400 hover:text-rose-600 transition-colors"
          >
            Reset Demo Data
          </button>
        </div>
        <p className="text-[10px] text-slate-400">
          IMPACTA Driver Prototype • Token Titans Academic Demo
        </p>
      </div>

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg border border-slate-300 p-5 max-w-sm w-full space-y-3 shadow-xl">
            <h4 className="text-sm font-bold text-slate-950">Reset Demo Environment?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              This will clear newly created Driver claims, restore the original 14 baseline fixtures, and reset in-memory media storage.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setResetConfirmOpen(false)}
                className="px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteReset}
                className="px-3 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded transition-colors"
              >
                Reset All Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
