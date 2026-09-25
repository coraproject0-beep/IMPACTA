"use client";

import React from "react";
import Image from "next/image";
import { Claim } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface OverviewTabProps {
  claim: Claim;
}

export function OverviewTab({ claim }: OverviewTabProps) {
  const { language, t } = useLanguage();
  const isIt = language === "it";

  return (
    <div className="space-y-12 selection:bg-[#0E0F10] selection:text-white">
      {/* 1. Incident Summary (Table-like alignment with hairlines matching console-claim-detail-reference.png) */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#0E0F10] tracking-tight">
          {t("consoleClaimDetail.incidentSummary")}
        </h3>

        <div className="border-t border-[#E5E5E3] divide-y divide-[#E5E5E3] text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 py-3 gap-4">
            <div className="flex items-center justify-between sm:pr-8">
              <span className="text-[#666666]">{isIt ? "Data" : "Date"}</span>
              <span className="font-mono font-medium text-[#0E0F10]">
                25 Sep 2026 · 08:42
              </span>
            </div>
            <div className="flex items-center justify-between sm:pl-8 sm:border-l sm:border-[#E5E5E3]">
              <span className="text-[#666666]">{isIt ? "Feriti segnalati" : "Reported injuries"}</span>
              <span className="font-medium text-[#0E0F10]">
                {isIt ? "Nessun ferito" : "None reported"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 py-3 gap-4">
            <div className="flex items-center justify-between sm:pr-8">
              <span className="text-[#666666]">{isIt ? "Luogo" : "Location"}</span>
              <span className="font-medium text-[#0E0F10]">
                {claim.incident?.location?.city || "Milano"}, {claim.incident?.location?.street || "Via Lorenteggio"}
              </span>
            </div>
            <div className="flex items-center justify-between sm:pl-8 sm:border-l sm:border-[#E5E5E3]">
              <span className="text-[#666666]">{isIt ? "Meteo" : "Weather"}</span>
              <span className="font-medium text-[#0E0F10]">
                {isIt ? "Asciutto" : "Dry"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 py-3 gap-4">
            <div className="flex items-center justify-between sm:pr-8">
              <span className="text-[#666666]">{isIt ? "Veicoli" : "Vehicles"}</span>
              <span className="font-medium text-[#0E0F10]">2</span>
            </div>
            <div className="flex items-center justify-between sm:pl-8 sm:border-l sm:border-[#E5E5E3]">
              <span className="text-[#666666]">{isIt ? "Fondo stradale" : "Road"}</span>
              <span className="font-medium text-[#0E0F10]">
                {isIt ? "Urbano asfaltato" : "Urban road"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Involved Vehicles matching console-claim-detail-reference.png */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#0E0F10] tracking-tight">
          {t("consoleClaimDetail.involvedVehicles")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {/* Vehicle A */}
          <div className="flex items-center justify-between p-4 border border-[#E5E5E3] rounded-xl bg-white gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#555555]">
                {t("consoleClaimDetail.vehicleA")}
              </span>
              <div className="text-base font-bold text-[#0E0F10]">
                Audi A3
              </div>
              <div className="font-mono text-xs text-[#666666]">
                AB 123 CD
              </div>
            </div>
            <div className="relative w-36 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-100">
              <Image
                src="/images/hero-car.jpg"
                alt="Audi A3"
                fill
                className="object-cover"
                sizes="150px"
              />
            </div>
          </div>

          {/* Vehicle B */}
          <div className="flex items-center justify-between p-4 border border-[#E5E5E3] rounded-xl bg-white gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#555555]">
                {t("consoleClaimDetail.vehicleB")}
              </span>
              <div className="text-base font-bold text-[#0E0F10]">
                Volkswagen Golf
              </div>
              <div className="font-mono text-xs text-[#666666]">
                EF 456 GH
              </div>
            </div>
            <div className="relative w-36 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-100">
              <Image
                src="/images/hero-car.jpg"
                alt="Volkswagen Golf"
                fill
                className="object-cover"
                sizes="150px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Evidence Section matching console-claim-detail-reference.png */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#0E0F10] tracking-tight">
          {t("consoleClaimDetail.evidenceSection")}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-neutral-200 border border-[#E5E5E3]">
            <Image
              src="/images/hero-car.jpg"
              alt="Accident overview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-neutral-200 border border-[#E5E5E3]">
            <Image
              src="/images/hero-car.jpg"
              alt="Rear contact detail"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-neutral-200 border border-[#E5E5E3]">
            <Image
              src="/images/hero-car.jpg"
              alt="Road lane layout"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
        </div>

        <p className="text-xs text-[#666666] pt-1">
          {isIt
            ? "6 fotografie • Dichiarazione conducente • Dati veicolo • Coordinate GNSS"
            : "6 photos | Driver statement | Vehicle information | Location data"}
        </p>
      </div>

      {/* 4. Structured facts & Reconstruction summary side-by-side matching console-claim-detail-reference.png */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4 border-t border-[#E5E5E3]">
        {/* Structured facts (Epistemic separation: Observed, Driver confirmed, Missing) */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-[#0E0F10] tracking-tight">
            {t("consoleClaimDetail.structuredFacts")}
          </h3>

          <div className="border-t border-[#E5E5E3] divide-y divide-[#E5E5E3] text-xs">
            <div className="py-3 flex items-center justify-between">
              <span className="text-[#666666] font-medium">{t("consoleClaimDetail.observed")}</span>
              <span className="text-[#0E0F10] font-medium text-right">
                {isIt ? "Impatto posteriore visibile sul Veicolo A" : "Rear impact visible on Vehicle A"}
              </span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <span className="text-[#666666] font-medium">{t("consoleClaimDetail.driverConfirmed")}</span>
              <span className="text-[#0E0F10] font-medium text-right">
                {isIt ? "Veicolo A era fermo in corsia" : "Vehicle A was stationary"}
              </span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <span className="text-rose-600 font-medium">{t("consoleClaimDetail.missing")}</span>
              <span className="text-rose-600 font-medium text-right">
                {isIt ? "Conferma finale del conducente" : "Final driver confirmation"}
              </span>
            </div>
          </div>
        </div>

        {/* Reconstruction summary (Supportive, no liability determination) */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-[#0E0F10] tracking-tight">
            {t("consoleClaimDetail.reconstructionSummary")}
          </h3>

          <div className="border-t border-[#E5E5E3] pt-3 space-y-3 text-xs leading-relaxed">
            <p className="text-[#0E0F10]">
              {isIt
                ? "Le evidenze raccolte sono coerenti con un tamponamento a bassa velocità tra due veicoli all'interno della corsia di marcia."
                : "Available evidence is consistent with a low-speed rear collision involving two vehicles."}
            </p>
            <p className="text-[#666666] italic">
              {isIt
                ? "Supporto alla ricostruzione cinematica. Nessuna determinazione automatica di responsabilità legale. Fascicolo per la valutazione del perito umano."
                : "Reconstruction support only. No liability determination. For human review."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
