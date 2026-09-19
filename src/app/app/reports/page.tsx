"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useClaims } from "@/context/ClaimsContext";
import { useDriverDraft } from "@/context/DriverDraftContext";
import { SYNTHETIC_DRIVER_PROFILE } from "@/features/driver/data/driverProfileFixture";
import { Claim } from "@/types";
import {
  FileTextIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  CameraIcon,
  CloseIcon,
  CarIcon,
  ArrowRightIcon,
} from "@/components/icons/Icons";
import { formatDate, getStatusBadgeClass, getStatusLabel } from "@/lib/utils";

export default function DriverReportsPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { claims } = useClaims();
  const { startNewReport } = useDriverDraft();
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);

  // Filter claims associated with Matteo Bianchi
  const driverClaims = claims.filter(
    (c) =>
      c.driverA.fullName === SYNTHETIC_DRIVER_PROFILE.fullName ||
      c.policyholder.fiscalCode === SYNTHETIC_DRIVER_PROFILE.fiscalCode
  );

  const handleStartNewReport = () => {
    startNewReport();
    router.push("/app/report");
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-2 selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
            {t.nav.reports}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 mt-1">
            {t.driverHome.recentReports}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Submitted accident dossiers and documentation records preserved on this device.
          </p>
        </div>

        <button
          type="button"
          onClick={handleStartNewReport}
          className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-950 hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs transition-colors self-start sm:self-auto active:scale-[0.98]"
        >
          <span>+ {t.nav.reportAccident}</span>
        </button>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {driverClaims.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <FileTextIcon size={24} />
            </div>
            <h2 className="text-base font-bold text-slate-950">No Reports Filed</h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              You have not submitted any accident reports yet. When you complete a roadside report, it will be cataloged here.
            </p>
          </div>
        ) : (
          driverClaims.map((claim) => (
            <div
              key={claim.id}
              onClick={() => setSelectedClaim(claim)}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-5 sm:p-6 transition-all shadow-xs cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-sm font-bold text-blue-700">
                    {claim.id}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-0.5 rounded border ${getStatusBadgeClass(
                      claim.status
                    )}`}
                  >
                    {getStatusLabel(claim.status)}
                  </span>
                </div>
                <div className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {claim.incident.location.city} ({claim.incident.location.street})
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  {formatDate(claim.incidentDate)} • {claim.vehicleA.make} {claim.vehicleA.model} ({claim.vehicleA.plate})
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-xs font-mono font-semibold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                  {claim.evidence.length} photos
                </span>
                <ChevronRightIcon size={18} className="text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Claim Detail Inspector Modal */}
      {selectedClaim && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-xl animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                  Incident Dossier
                </span>
                <h3 className="text-xl font-extrabold text-slate-950 font-mono">
                  {selectedClaim.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedClaim(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-950 hover:bg-slate-100 transition-colors"
              >
                <CloseIcon size={20} />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[11px]">Location</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {selectedClaim.incident.location.city}
                  </span>
                  <span className="text-slate-500 block text-xs">
                    {selectedClaim.incident.location.street}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Date &amp; Time</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {formatDate(selectedClaim.incidentDate)}
                  </span>
                  <span className="text-slate-500 block text-xs">
                    {selectedClaim.incident?.timestamp
                      ? selectedClaim.incident.timestamp.split("T")[1]?.substring(0, 5) || "11:42"
                      : "11:42"}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px] mb-1 font-mono uppercase">
                  Statement
                </span>
                <p className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 leading-relaxed text-xs">
                  {selectedClaim.driverA.statement || "Standard European roundabout ingress collision recorded."}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px] mb-1 font-mono uppercase">
                  Evidence Preserved
                </span>
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <CameraIcon size={16} className="text-blue-600" />
                  <span className="font-semibold text-slate-800">
                    {selectedClaim.evidence.length} optical items cataloged in IndexedDB
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSelectedClaim(null)}
                className="w-full py-3 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
