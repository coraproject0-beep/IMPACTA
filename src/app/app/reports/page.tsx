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
  ArrowRightIcon,
} from "@/components/icons/Icons";
import { formatDate, getStatusLabel } from "@/lib/utils";

export default function DriverReportsPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const isIt = language === "it";
  const { claims } = useClaims();
  const { startNewReport } = useDriverDraft();
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);

  // Filter claims associated with Luca / Matteo
  const driverClaims = claims.filter(
    (c) =>
      c.driverA?.fullName === SYNTHETIC_DRIVER_PROFILE.fullName ||
      c.id.includes("CLM-APP") ||
      c.id.includes("CLM-DEMO")
  );

  const displayClaims = driverClaims.length > 0 ? driverClaims : claims.slice(0, 4);

  const handleStartNewReport = () => {
    startNewReport();
    router.push("/app/report");
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-2 sm:py-4 space-y-8 selection:bg-[#0E0F10] selection:text-white">
      {/* 1. Header with Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 border-b border-[#E5E5E3] gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0E0F10]">
            {isIt ? "I tuoi sinistri" : "Your reports"}
          </h1>
          <p className="text-sm text-[#555555] font-normal mt-1">
            {isIt
              ? "Tutti i rapporti di incidente archiviati sul tuo dispositivo e sincronizzati."
              : "All incident reports recorded on your device and synchronized."}
          </p>
        </div>

        <button
          type="button"
          onClick={handleStartNewReport}
          className="self-start sm:self-auto px-5 py-2.5 bg-[#0E0F10] hover:bg-[#1A1B1C] text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <span>{isIt ? "Segnala un sinistro" : "Report an accident"}</span>
          <ArrowRightIcon size={14} />
        </button>
      </div>

      {/* 2. Wide Editorial Table / List */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#0E0F10] tracking-tight">
          {isIt ? "Archivio segnalazioni" : "Incident dossier archive"}
        </h2>

        <div className="w-full overflow-x-auto border border-[#E5E5E3] rounded-xl bg-white">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E5E5E3] bg-[#F7F7F6] text-[#555555] font-semibold text-[11px]">
                <th className="py-3 px-4 sm:px-6">{isIt ? "Identificativo" : "Claim ID"}</th>
                <th className="py-3 px-4">{isIt ? "Data incidente" : "Incident date"}</th>
                <th className="py-3 px-4">{isIt ? "Luogo" : "Location"}</th>
                <th className="py-3 px-4">{isIt ? "Veicolo" : "Vehicle"}</th>
                <th className="py-3 px-4">{isIt ? "Stato revisione" : "Status"}</th>
                <th className="py-3 pr-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E3]">
              {displayClaims.map((claim) => (
                <tr
                  key={claim.id}
                  onClick={() => setSelectedClaim(claim)}
                  className="hover:bg-[#F7F7F6]/60 transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-4 sm:px-6 font-mono font-bold text-[#0E0F10]">
                    {claim.id}
                  </td>
                  <td className="py-4 px-4 font-mono text-[#0E0F10] whitespace-nowrap">
                    {formatDate(claim.incidentDate, language)}
                  </td>
                  <td className="py-4 px-4 text-[#0E0F10]">
                    {claim.incident?.location?.city || "Milano"}
                  </td>
                  <td className="py-4 px-4 text-[#555555]">
                    {claim.vehicleA?.make} {claim.vehicleA?.model}
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-[#0E0F10]">
                      {getStatusLabel(claim.status, language)}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-right">
                    <ChevronRightIcon
                      size={16}
                      className="text-[#888888] group-hover:text-[#0E0F10] transition-colors inline"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Detail Drawer / Modal */}
      {selectedClaim && (
        <div className="fixed inset-0 z-50 bg-[#0E0F10]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E5E5E3] pb-3">
              <div>
                <span className="text-xs text-[#555555] block">
                  {isIt ? "Fascicolo sinistro" : "Claim reference"}
                </span>
                <h3 className="text-xl font-bold font-mono text-[#0E0F10] mt-0.5">
                  {selectedClaim.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedClaim(null)}
                className="p-2 text-[#555555] hover:text-[#0E0F10] transition-colors"
                aria-label="Close"
              >
                <CloseIcon size={20} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="border border-[#E5E5E3] rounded-xl p-4 bg-[#F7F7F6] divide-y divide-[#E5E5E3] text-xs">
                <div className="pb-2.5 flex justify-between">
                  <span className="text-[#555555]">{isIt ? "Stato:" : "Status:"}</span>
                  <span className="font-semibold text-[#0E0F10]">{getStatusLabel(selectedClaim.status, language)}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-[#555555]">{isIt ? "Data rilevamento:" : "Recorded date:"}</span>
                  <span className="font-mono text-[#0E0F10]">{formatDate(selectedClaim.incidentDate, language)}</span>
                </div>
                <div className="pt-2.5 flex justify-between">
                  <span className="text-[#555555]">{isIt ? "Targa veicolo:" : "License plate:"}</span>
                  <span className="font-mono text-[#0E0F10]">{selectedClaim.vehicleA?.plate || "AB 123 CD"}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[#555555] font-medium">{isIt ? "Sintesi dinamica dell'urto:" : "Collision summary:"}</span>
                <p className="text-xs text-[#0E0F10] p-3 rounded-xl border border-[#E5E5E3] bg-white leading-relaxed">
                  {selectedClaim.incident?.summary || "Rapporto generato con prove fotografiche e dichiarazione registrata."}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSelectedClaim(null)}
                className="w-full py-3 rounded-lg bg-[#0E0F10] text-white text-xs font-semibold hover:bg-[#1A1B1C] transition-colors"
              >
                {isIt ? "Chiudi dettaglio" : "Close details"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
