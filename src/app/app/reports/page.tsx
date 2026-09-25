"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useClaims } from "@/context/ClaimsContext";
import { useDriverDraft } from "@/context/DriverDraftContext";
import { SYNTHETIC_DRIVER_PROFILE } from "@/features/driver/data/driverProfileFixture";
import { Claim } from "@/types";
import {
  FileTextIcon,
  ChevronRightIcon,
  CloseIcon,
} from "@/components/icons/Icons";
import { formatDate, getStatusBadgeClass, getStatusLabel } from "@/lib/utils";

export default function DriverReportsPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const isIt = language === "it";
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
    <div className="space-y-8 max-w-md mx-auto py-2">
      {/* Header */}
      <div className="space-y-1.5 pb-4 border-b border-[#E5E5E3]">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#0E0F10]">
          {isIt ? "I tuoi sinistri" : "Your reports"}
        </h1>
        <p className="text-sm text-[#666666]">
          {isIt
            ? "Tutti i rapporti di incidente archiviati sul tuo dispositivo."
            : "All incident reports stored on your device."}
        </p>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {driverClaims.length === 0 ? (
          <div className="bg-white border border-[#E5E5E3] rounded-2xl p-8 text-center space-y-3">
            <h2 className="text-base font-semibold text-[#0E0F10]">
              {isIt ? "Nessun sinistro registrato" : "No incident reports"}
            </h2>
            <p className="text-xs text-[#666666]">
              {isIt
                ? "Quando invii una segnalazione, sarà archiviata qui."
                : "When you file a report, it will appear here."}
            </p>
          </div>
        ) : (
          driverClaims.map((claim) => (
            <div
              key={claim.id}
              onClick={() => setSelectedClaim(claim)}
              className="bg-white border border-[#E5E5E3] hover:border-[#0E0F10] rounded-2xl p-5 transition-colors cursor-pointer flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-[#0E0F10]">
                    {claim.id}
                  </span>
                  <span className="text-xs text-[#666666]">
                    {getStatusLabel(claim.status)}
                  </span>
                </div>
                <div className="text-sm font-medium text-[#0E0F10]">
                  {claim.incident.location.city}
                </div>
                <div className="text-xs text-[#666666]">
                  {formatDate(claim.incidentDate)} • {claim.vehicleA.make} {claim.vehicleA.model}
                </div>
              </div>

              <ChevronRightIcon size={18} className="text-[#666666]" />
            </div>
          ))
        )}
      </div>

      {/* New report button */}
      <button
        type="button"
        onClick={handleStartNewReport}
        className="w-full py-4 px-6 rounded-2xl bg-[#0E0F10] hover:bg-[#1A1B1C] text-white text-base font-semibold flex items-center justify-center gap-2 transition-colors"
      >
        <span>+ {isIt ? "Segnala un incidente" : "Report an accident"}</span>
      </button>

      {/* Claim Detail Modal */}
      {selectedClaim && (
        <div className="fixed inset-0 z-50 bg-[#0E0F10]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E5E5E3] pb-3">
              <div>
                <span className="text-xs text-[#666666] block">
                  {isIt ? "Codice sinistro" : "Claim reference"}
                </span>
                <h3 className="text-xl font-bold font-mono text-[#0E0F10] mt-0.5">
                  {selectedClaim.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedClaim(null)}
                className="p-2 text-[#666666] hover:text-[#0E0F10] transition-colors"
              >
                <CloseIcon size={20} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 bg-[#F7F7F6] rounded-xl space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#666666]">{isIt ? "Stato:" : "Status:"}</span>
                  <span className="font-semibold text-[#0E0F10]">{getStatusLabel(selectedClaim.status)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">{isIt ? "Data:" : "Date:"}</span>
                  <span className="font-mono text-[#0E0F10]">{formatDate(selectedClaim.incidentDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">{isIt ? "Veicolo:" : "Vehicle:"}</span>
                  <span className="font-mono text-[#0E0F10]">{selectedClaim.vehicleA.plate}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[#666666] font-medium">{isIt ? "Sintesi dinamica:" : "Summary:"}</span>
                <p className="text-xs text-[#0E0F10] p-3 rounded-xl border border-[#E5E5E3] bg-white leading-relaxed">
                  {selectedClaim.incident.summary}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSelectedClaim(null)}
                className="w-full py-3 rounded-xl bg-[#0E0F10] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#1A1B1C] transition-colors"
              >
                {isIt ? "Chiudi" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
