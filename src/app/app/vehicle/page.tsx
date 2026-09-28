"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { CheckCircleIcon, ChevronRightIcon } from "@/components/icons/Icons";
import { formatMonthYear } from "@/lib/dateUtils";

export default function DriverVehiclePage() {
  const { t, language } = useLanguage();
  const isIt = language === "it";
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto py-2 sm:py-4 space-y-8 selection:bg-[#0E0F10] selection:text-white">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 border-b border-[#E5E5E3] gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0E0F10]">
            Volkswagen Polo
          </h1>
          <p className="text-sm text-[#555555] font-normal mt-1">
            {isIt
              ? "Veicolo assicurato registrato nel tuo profilo IMPACTA."
              : "Insured vehicle registered under your active IMPACTA profile."}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <CheckCircleIcon size={16} className="text-emerald-700" />
          <span>{isIt ? "Copertura regolare" : "Active coverage"}</span>
        </div>
      </div>

      {/* 2. Responsive 12-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* LEFT COLUMN: Large Cinematic Vehicle Photo (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-200 border border-[#E5E5E3]">
            <Image
              src="/images/hero-car.jpg"
              alt="Volkswagen Polo context"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 750px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F10]/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-xs text-white/70 block font-medium">
                    {isIt ? "Targa di immatricolazione" : "License plate"}
                  </span>
                  <div className="text-2xl sm:text-3xl font-mono font-bold tracking-wider mt-0.5">
                    AB 123 CD
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-white/70 block font-medium">
                    {isIt ? "Scadenza revisione" : "Inspection due"}
                  </span>
                  <div className="text-sm font-mono font-semibold mt-0.5">
                    {formatMonthYear("2027-10-01", language)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border border-[#E5E5E3] rounded-xl bg-white flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-[#0E0F10]">
                {isIt ? "Polizza assicurativa collegata" : "Linked insurance policy"}
              </div>
              <div className="text-[11px] text-[#555555]">
                Generali Italia • GEN-2026-9812
              </div>
            </div>
            <Link
              href="/app/insurance"
              className="text-xs font-semibold text-[#0E0F10] hover:text-[#555555] inline-flex items-center gap-1 transition-colors"
            >
              <span>{isIt ? "Visualizza polizza" : "View policy"}</span>
              <ChevronRightIcon size={14} />
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: Technical Specs & Identification (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Specifications */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-[#0E0F10] tracking-tight">
              {isIt ? "Specifiche del veicolo" : "Vehicle specifications"}
            </h2>

            <div className="border-t border-[#E5E5E3] divide-y divide-[#E5E5E3] text-xs">
              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[#555555] font-medium">{isIt ? "Marca e modello" : "Make & model"}</span>
                <span className="font-semibold text-[#0E0F10]">Volkswagen Polo</span>
              </div>

              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[#555555] font-medium">{isIt ? "Targa" : "Plate"}</span>
                <span className="font-mono font-semibold text-[#0E0F10]">AB 123 CD</span>
              </div>

              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[#555555] font-medium">{isIt ? "Anno immatricolazione" : "Registration year"}</span>
                <span className="text-[#0E0F10]">2023</span>
              </div>

              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[#555555] font-medium">{isIt ? "Colore carrozzeria" : "Exterior color"}</span>
                <span className="text-[#0E0F10]">Deep Black Pearl</span>
              </div>

              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[#555555] font-medium">{isIt ? "Stato circolazione" : "Road status"}</span>
                <span className="text-emerald-800 font-semibold">{isIt ? "Attivo e circolante" : "Active & roadworthy"}</span>
              </div>
            </div>
          </div>

          {/* Identification & Chassis */}
          <div className="space-y-4 pt-2">
            <h2 className="text-base font-bold text-[#0E0F10] tracking-tight">
              {isIt ? "Dati di identificazione tecnica" : "Technical identification"}
            </h2>

            <div className="border border-[#E5E5E3] rounded-xl bg-white p-5 space-y-4 text-xs">
              <div>
                <span className="text-[#555555] block font-medium">
                  {isIt ? "Numero di telaio (VIN)" : "Chassis number (VIN)"}
                </span>
                <span className="font-mono font-bold text-[#0E0F10] text-sm block mt-0.5">
                  WVWZZZAWZPW082914
                </span>
              </div>

              <div className="border-t border-[#E5E5E3] pt-3">
                <span className="text-[#555555] block font-medium">
                  {isIt ? "Motorizzazione" : "Powertrain"}
                </span>
                <span className="text-[#0E0F10] font-medium block mt-0.5">
                  1.0 TSI (70 kW / 95 CV)
                </span>
              </div>

              <div className="border-t border-[#E5E5E3] pt-3">
                <span className="text-[#555555] block font-medium">{isIt ? "Dispositivi di bordo" : "On-board devices"}</span>
                <span className="text-[#0E0F10] block mt-0.5">
                  {isIt
                    ? "Sensori telemetrici e accelerometro certificati IMPACTA"
                    : "IMPACTA certified telemetry sensors and accelerometer"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
