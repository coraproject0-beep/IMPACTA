"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Claim } from "@/types";
import { useClaims } from "@/context/ClaimsContext";
import { useLanguage } from "@/context/LanguageContext";
import { CheckCircleIcon } from "@/components/icons/Icons";

interface OverviewTabProps {
  claim: Claim;
}

export function OverviewTab({ claim }: OverviewTabProps) {
  const { updateNotes } = useClaims();
  const { language, t } = useLanguage();
  const isIt = language === "it";

  const [notes, setNotes] = useState(claim.reviewerNotes);
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSavedNotice, setNotesSavedNotice] = useState(false);

  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    await updateNotes(claim.id, notes);
    setIsSavingNotes(false);
    setNotesSavedNotice(true);
    setTimeout(() => setNotesSavedNotice(false), 2500);
  };

  return (
    <div className="space-y-10">
      {/* 1. Incident Summary */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0E0F10]">
          {t("consoleClaimDetail.incidentSummary")}
        </h3>
        <p className="text-sm text-[#0E0F10] leading-relaxed">
          {claim.incident.summary}
        </p>

        {/* Open Key-Value Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-[#E5E5E3] text-xs">
          <div>
            <div className="text-[#666666] font-medium">{isIt ? "Meteo" : "Weather"}</div>
            <div className="font-semibold text-[#0E0F10] mt-1">{claim.incident.weatherCondition}</div>
          </div>
          <div>
            <div className="text-[#666666] font-medium">{isIt ? "Fondo stradale" : "Road Surface"}</div>
            <div className="font-semibold text-[#0E0F10] mt-1">{claim.incident.roadCondition}</div>
          </div>
          <div>
            <div className="text-[#666666] font-medium">{isIt ? "Polizia intervenuta" : "Police Attended"}</div>
            <div className="font-semibold text-[#0E0F10] mt-1">
              {claim.incident.policeIntervention ? (isIt ? "Sì (Verbale redatto)" : "Yes (Report Filed)") : (isIt ? "No" : "No")}
            </div>
          </div>
          <div>
            <div className="text-[#666666] font-medium">{isIt ? "Stato veicolo" : "Drivable State"}</div>
            <div className="font-semibold text-[#0E0F10] mt-1">
              {claim.vehicleA.drivable ? (isIt ? "Marciante" : "Drivable") : (isIt ? "Non marciante" : "Immobilized")}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Involved Vehicles (Dual side-by-side display with photo thumbnails) */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0E0F10]">
          {t("consoleClaimDetail.involvedVehicles")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vehicle A */}
          <div className="border border-[#E5E5E3] bg-white rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E3]">
              <div>
                <div className="text-xs font-semibold text-[#666666]">
                  {t("consoleClaimDetail.vehicleA")}
                </div>
                <div className="text-base font-bold text-[#0E0F10] mt-0.5">
                  {claim.vehicleA.make} {claim.vehicleA.model}
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-[#0E0F10] bg-[#F7F7F6] px-2.5 py-1 rounded border border-[#E5E5E3]">
                {claim.vehicleA.plate}
              </span>
            </div>

            <div className="relative h-36 w-full rounded-lg overflow-hidden bg-[#0E0F10]">
              <Image
                src="/images/hero-car.jpg"
                alt="Vehicle A photo"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 350px"
              />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#666666]">{isIt ? "Conducente" : "Driver"}</span>
                <span className="font-semibold text-[#0E0F10]">{claim.driverA.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">{isIt ? "Compagnia" : "Insurer"}</span>
                <span className="font-medium text-[#0E0F10]">{claim.policyA.insurerName}</span>
              </div>
              <div className="pt-2 border-t border-[#E5E5E3] text-[#666666]">
                <strong className="text-[#0E0F10]">{isIt ? "Danni:" : "Damages:"}</strong> {claim.vehicleA.damageDescription}
              </div>
            </div>
          </div>

          {/* Vehicle B */}
          <div className="border border-[#E5E5E3] bg-white rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E3]">
              <div>
                <div className="text-xs font-semibold text-[#666666]">
                  {t("consoleClaimDetail.vehicleB")}
                </div>
                <div className="text-base font-bold text-[#0E0F10] mt-0.5">
                  {claim.vehicleB ? `${claim.vehicleB.make} ${claim.vehicleB.model}` : "VW Golf"}
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-[#0E0F10] bg-[#F7F7F6] px-2.5 py-1 rounded border border-[#E5E5E3]">
                {claim.vehicleB?.plate || "EF 456 GH"}
              </span>
            </div>

            <div className="relative h-36 w-full rounded-lg overflow-hidden bg-[#0E0F10]">
              <Image
                src="/images/accident-front-corner.jpg"
                alt="Vehicle B photo"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 350px"
              />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#666666]">{isIt ? "Conducente" : "Driver"}</span>
                <span className="font-semibold text-[#0E0F10]">
                  {claim.driverB?.fullName || "Marco Rossi"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">{isIt ? "Compagnia" : "Insurer"}</span>
                <span className="font-medium text-[#0E0F10]">
                  {claim.policyB?.insurerName || "Allianz Italia"}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E5E5E3] text-[#666666]">
                <strong className="text-[#0E0F10]">{isIt ? "Danni:" : "Damages:"}</strong>{" "}
                {claim.vehicleB?.damageDescription || "Right rear fender abrasion, minor rim deformation."}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Evidence Thumbnails Row */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0E0F10]">
            {t("consoleClaimDetail.evidenceSection")}
          </h3>
          <span className="text-xs text-[#666666]">
            {claim.evidence.length || 4} {isIt ? "file acquisiti" : "items captured"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <div className="relative h-28 rounded-lg overflow-hidden border border-[#E5E5E3] bg-[#0E0F10]">
              <Image
                src="/images/hero-car.jpg"
                alt="Whole scene"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 200px"
              />
            </div>
            <div className="text-[11px] text-[#666666] truncate font-medium">
              {isIt ? "Panoramica scena" : "Whole scene overview"}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="relative h-28 rounded-lg overflow-hidden border border-[#E5E5E3] bg-[#0E0F10]">
              <Image
                src="/images/accident-front-corner.jpg"
                alt="Vehicle A damage"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 200px"
              />
            </div>
            <div className="text-[11px] text-[#666666] truncate font-medium">
              {isIt ? "Danno Veicolo A" : "Vehicle A contact"}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="relative h-28 rounded-lg overflow-hidden border border-[#E5E5E3] bg-[#0E0F10]">
              <Image
                src="/images/hero-car.jpg"
                alt="Vehicle B damage"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 200px"
              />
            </div>
            <div className="text-[11px] text-[#666666] truncate font-medium">
              {isIt ? "Danno Veicolo B" : "Vehicle B contact"}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="relative h-28 rounded-lg overflow-hidden border border-[#E5E5E3] bg-[#0E0F10] flex items-center justify-center p-3 text-center">
              <span className="font-mono text-xs text-emerald-400">
                ΔV {claim.telemetry.hasTelemetry ? claim.telemetry.deltaVKmh : 14.2} km/h<br />
                <span className="text-[10px] text-white/70">CAN-bus Sync</span>
              </span>
            </div>
            <div className="text-[11px] text-[#666666] truncate font-medium">
              {isIt ? "Telemetria EDR sincrona" : "Telemetry sync trace"}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Structured Facts & Reconstruction Summary */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0E0F10]">
          {t("consoleClaimDetail.structuredFacts")}
        </h3>

        <div className="border border-[#E5E5E3] bg-white rounded-xl p-5 divide-y divide-[#E5E5E3] text-xs">
          <div className="pb-3 flex items-center justify-between">
            <span className="text-[#666666]">{isIt ? "Velocità stimata impatto (Veicolo A)" : "Estimated Impact Speed (Vehicle A)"}</span>
            <span className="font-mono font-bold text-[#0E0F10]">
              {claim.telemetry.points?.[0]?.speedKmh || 42} km/h
            </span>
          </div>
          <div className="py-3 flex items-center justify-between">
            <span className="text-[#666666]">{isIt ? "Decelerazione cinematica (ΔV)" : "Kinematic Delta-V (ΔV)"}</span>
            <span className="font-mono font-bold text-[#0E0F10]">
              {claim.telemetry.deltaVKmh || 14.2} km/h
            </span>
          </div>
          <div className="py-3 flex items-center justify-between">
            <span className="text-[#666666]">{isIt ? "Angolo d'urto" : "Impact Angle"}</span>
            <span className="font-mono font-bold text-[#0E0F10]">
              {claim.telemetry.impactAngleDeg || 28}°
            </span>
          </div>
          <div className="py-3 flex items-center justify-between">
            <span className="text-[#666666]">{isIt ? "Confidenza forense automatica" : "Automated Forensic Confidence"}</span>
            <span className="font-mono font-bold text-[#0E0F10]">
              {claim.aiAnalysis.overallConfidence}% ({claim.aiAnalysis.confidenceBand})
            </span>
          </div>
          <div className="pt-3 flex items-center justify-between">
            <span className="text-[#666666]">{isIt ? "Stato clausola CAI Box 12" : "CAI Box 12 Assessment"}</span>
            <span className="font-medium text-amber-600">
              {isIt ? "Discrepanza corsia — revisione necessaria" : "Lane discrepancy — review required"}
            </span>
          </div>
        </div>
      </div>

      {/* 5. Reviewer Working Notes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0E0F10]">
            {t("consoleOverview.notes")}
          </h3>
          {notesSavedNotice && (
            <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
              <CheckCircleIcon size={12} /> {isIt ? "Note salvate" : "Notes saved"}
            </span>
          )}
        </div>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={isIt ? "Inserisci annotazioni tecniche o istruzioni peritali..." : "Record forensic review notes..."}
          className="w-full p-3.5 bg-white border border-[#E5E5E3] rounded-lg text-xs text-[#0E0F10] placeholder:text-[#666666] focus:border-[#0E0F10] focus:outline-none transition-colors"
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSaveNotes}
            disabled={isSavingNotes || notes === claim.reviewerNotes}
            className="px-4 py-2 bg-[#0E0F10] text-white text-xs font-semibold rounded-lg hover:bg-[#1A1B1C] transition-colors disabled:opacity-40"
          >
            {isSavingNotes ? (isIt ? "Salvataggio..." : "Saving...") : (isIt ? "Salva note" : "Save Notes")}
          </button>
        </div>
      </div>
    </div>
  );
}
