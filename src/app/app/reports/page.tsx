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
    <div className="space-y-10 max-w-4xl mx-auto py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#D7D9D8]">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#6F7375]">
            {isIt ? "REGISTRO SINISTRI PERSONALE" : "PERSONAL CLAIMS LEDGER"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase text-[#090A0A]">
            {t("driverHome.recentReports")}
          </h1>
          <p className="text-sm text-[#6F7375] font-light max-w-xl">
            {isIt
              ? "Dossier di sinistro inviati, prove fotografiche e circostanze conservate nella memoria locale."
              : "Submitted incident dossiers, photos, and circumstances preserved in local device storage."}
          </p>
        </div>

        <button
          type="button"
          onClick={handleStartNewReport}
          className="min-h-[48px] inline-flex items-center justify-center px-6 py-3 bg-[#090A0A] hover:bg-[#171819] text-white text-xs font-bold uppercase tracking-wider transition-colors self-start sm:self-auto"
        >
          <span>+ {t("nav.reportAccident")}</span>
        </button>
      </div>

      {/* Reports List (Unboxed Document Style) */}
      <div className="space-y-4">
        {driverClaims.length === 0 ? (
          <div className="bg-white border border-[#D7D9D8] p-12 text-center space-y-3">
            <div className="w-12 h-12 border border-[#D7D9D8] text-[#6F7375] mx-auto flex items-center justify-center">
              <FileTextIcon size={22} />
            </div>
            <h2 className="text-base font-bold uppercase tracking-tight text-[#090A0A]">
              {isIt ? "Nessun sinistro registrato" : "No Incident Reports Filed"}
            </h2>
            <p className="text-xs text-[#6F7375] max-w-sm mx-auto">
              {isIt
                ? "Quando invii una segnalazione guidata sul posto, i fatti verificati e le fotografie saranno archiviati qui."
                : "When you submit a guided roadside report, its verified facts and photos will be preserved here."}
            </p>
          </div>
        ) : (
          driverClaims.map((claim) => (
            <div
              key={claim.id}
              onClick={() => setSelectedClaim(claim)}
              className="bg-white border border-[#D7D9D8] hover:border-[#090A0A] p-6 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-[#090A0A]">
                    {claim.id}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 border uppercase ${getStatusBadgeClass(
                      claim.status
                    )}`}
                  >
                    {getStatusLabel(claim.status)}
                  </span>
                </div>
                <div className="text-base font-bold uppercase tracking-tight text-[#090A0A]">
                  {claim.incident.location.city} ({claim.incident.location.street})
                </div>
                <div className="text-xs text-[#6F7375]">
                  <span className="font-mono">{formatDate(claim.incidentDate)}</span> • {claim.vehicleA.make} {claim.vehicleA.model} (<span className="font-mono">{claim.vehicleA.plate}</span>)
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <span className="text-xs text-[#6F7375] px-2.5 py-1 border border-[#D7D9D8] bg-[#F4F5F3]">
                  <span className="font-mono font-bold">{claim.evidence.length}</span> {isIt ? "foto" : "photos"}
                </span>
                <ChevronRightIcon size={16} className="text-[#6F7375]" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Claim Detail Modal (Monochrome Document Modal) */}
      {selectedClaim && (
        <div className="fixed inset-0 z-50 bg-[#090A0A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#090A0A] max-w-xl w-full p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#D7D9D8] pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#6F7375] block font-semibold">
                  {isIt ? "FASCICOLO SINISTRO" : "DOSSIER RECORD"}
                </span>
                <h3 className="text-2xl font-bold font-mono text-[#090A0A] mt-0.5">
                  {selectedClaim.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedClaim(null)}
                className="p-2 text-[#6F7375] hover:text-[#090A0A] transition-colors"
                title={isIt ? "Chiudi" : "Close modal"}
              >
                <CloseIcon size={20} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 bg-[#F4F5F3] border border-[#D7D9D8]">
                <div>
                  <span className="text-[#6F7375] block uppercase font-semibold">{isIt ? "STATO" : "STATUS"}</span>
                  <span className="font-bold text-[#090A0A]">{getStatusLabel(selectedClaim.status)}</span>
                </div>
                <div>
                  <span className="text-[#6F7375] block uppercase font-semibold">{isIt ? "DATA / ORA" : "DATE / TIME"}</span>
                  <span className="font-mono font-bold text-[#090A0A]">{formatDate(selectedClaim.incidentDate)}</span>
                </div>
                <div>
                  <span className="text-[#6F7375] block uppercase font-semibold">{isIt ? "ASSICURATO" : "POLICYHOLDER"}</span>
                  <span className="font-bold text-[#090A0A]">{selectedClaim.policyholder.fullName}</span>
                </div>
                <div>
                  <span className="text-[#6F7375] block uppercase font-semibold">{isIt ? "TARGA" : "VEHICLE PLATE"}</span>
                  <span className="font-mono font-bold text-[#090A0A]">{selectedClaim.vehicleA.plate}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[#6F7375] block uppercase font-semibold">{isIt ? "SINTESI SINISTRO" : "INCIDENT SUMMARY"}</span>
                <p className="text-sm font-sans text-[#090A0A] p-4 border border-[#D7D9D8] leading-relaxed">
                  {selectedClaim.incident.summary}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[#6F7375] block uppercase font-semibold">
                  {isIt ? "ELEMENTI PROBATORI" : "EVIDENCE ASSETS"} (<span className="font-mono font-bold">{selectedClaim.evidence.length}</span>)
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {selectedClaim.evidence.map((ev, i) => (
                    <div key={ev.id || i} className="p-2 border border-[#D7D9D8] bg-[#F4F5F3]">
                      <span className="font-bold text-[#090A0A] block">{ev.type}</span>
                      <span className="text-[#6F7375]">{ev.title || (isIt ? "Archiviato in IDB" : "Preserved in IDB")}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D7D9D8] flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedClaim(null)}
                className="min-h-[44px] px-6 bg-[#090A0A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#171819] transition-colors"
              >
                {isIt ? "Chiudi Fascicolo" : "Close Dossier"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
