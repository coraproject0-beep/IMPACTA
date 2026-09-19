"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
} from "@/components/icons/Icons";
import { formatDate, getStatusBadgeClass, getStatusLabel } from "@/lib/utils";

export default function DriverReportsPage() {
  const router = useRouter();
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
    <div className="space-y-8 max-w-2xl mx-auto py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            Incident Reports
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Submitted accident dossiers and documentation records
          </p>
        </div>

        <button
          type="button"
          onClick={handleStartNewReport}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
        >
          <span>+ Report Incident</span>
        </button>
      </div>

      {/* Reports List */}
      {driverClaims.length === 0 ? (
        <div className="py-16 text-center bg-white border border-slate-200 rounded-lg p-8">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
            <CheckCircleIcon size={22} />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">No active reports on file</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            You do not currently have any open accident claims associated with your policy. Drive safely.
          </p>
          <div className="mt-5">
            <button
              type="button"
              onClick={handleStartNewReport}
              className="px-4 py-2 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md transition-colors"
            >
              Start New Report
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {driverClaims.map((claim) => (
            <div
              key={claim.id}
              onClick={() => setSelectedClaim(claim)}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-lg p-4 cursor-pointer transition-all shadow-2xs hover:shadow-xs flex items-center justify-between gap-4 group"
            >
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-blue-700">
                    {claim.id}
                  </span>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded border ${getStatusBadgeClass(
                      claim.status
                    )}`}
                  >
                    {getStatusLabel(claim.status)}
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-900">
                  {claim.incident.location.city} ({claim.incident.location.street})
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-mono">
                  <span>{formatDate(claim.incidentDate)}</span>
                  <span>•</span>
                  <span>{claim.vehicleA.plate} vs {claim.vehicleB?.plate || "None"}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-sans">
                    <CameraIcon size={12} className="text-slate-400" />
                    {claim.evidence.length} photos
                  </span>
                </div>
              </div>

              <div className="flex items-center text-slate-400 group-hover:text-slate-700 transition-colors">
                <ChevronRightIcon size={16} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Claim Detail Modal for Driver */}
      {selectedClaim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[85vh] overflow-y-auto border border-slate-200 shadow-xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-blue-700">
                  {selectedClaim.id}
                </span>
                <h3 className="text-base font-bold text-slate-950 mt-0.5">
                  Accident Dossier Summary
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedClaim(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100"
              >
                <CloseIcon size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Incident Date:</span>
                  <span className="font-semibold text-slate-800">{formatDate(selectedClaim.incidentDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-slate-800">{selectedClaim.incident.location.city}, {selectedClaim.incident.location.street}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Vehicles Involved:</span>
                  <span className="font-mono font-medium text-slate-800">
                    {selectedClaim.vehicleA.plate} vs {selectedClaim.vehicleB?.plate || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Processing Status:</span>
                  <span className={`text-[10px] font-medium px-2 py-0.2 rounded border ${getStatusBadgeClass(selectedClaim.status)}`}>
                    {getStatusLabel(selectedClaim.status)}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-900 block mb-1">Driver Statement:</span>
                <p className="text-slate-600 leading-relaxed bg-white border border-slate-200 p-3 rounded-md text-xs">
                  {selectedClaim.driverA.statement || selectedClaim.incident.summary}
                </p>
              </div>

              <div>
                <span className="font-semibold text-slate-900 block mb-1.5">
                  Photographic Evidence ({selectedClaim.evidence.length} files):
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {selectedClaim.evidence.slice(0, 6).map((ev, idx) => (
                    <div key={ev.id} className="aspect-video bg-slate-100 rounded border border-slate-200 flex flex-col items-center justify-center text-center p-2">
                      <CameraIcon size={14} className="text-slate-400 mb-1" />
                      <span className="text-[10px] text-slate-600 truncate max-w-full font-medium">
                        {ev.title || `Photo ${idx + 1}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-blue-50/60 border border-blue-200/80 rounded-md text-[11px] text-blue-900">
                This dossier is stored locally on this device. Your insurance claims team can inspect the full evidentiary timeline.
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedClaim(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-md transition-colors"
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
