"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { CarIcon, CheckCircleIcon } from "@/components/icons/Icons";

export default function DriverVehiclePage() {
  const { t, language } = useLanguage();
  const isIt = language === "it";
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  return (
    <div className="space-y-7 max-w-md mx-auto py-2 selection:bg-[#0E0F10] selection:text-white">
      {/* Header */}
      <div className="space-y-1.5 pb-4 border-b border-[#E5E5E3]">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#0E0F10]">
          Audi A3
        </h1>
        <p className="text-sm text-[#666666]">
          {isIt
            ? "Veicolo assicurato registrato nel tuo profilo IMPACTA."
            : "Insured vehicle registered under your active IMPACTA profile."}
        </p>
      </div>

      {/* Hero Vehicle Image */}
      <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-neutral-200 border border-[#E5E5E3]">
        <Image
          src="/images/hero-car.jpg"
          alt="Audi A3 context"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 448px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F10]/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-white/70 block">
                {isIt ? "Targa" : "Plate"}
              </span>
              <div className="text-2xl font-mono font-bold tracking-wider">
                AB 123 CD
              </div>
            </div>
            <span className="font-medium text-xs text-emerald-300 flex items-center gap-1.5">
              <CheckCircleIcon size={16} />
              <span>{isIt ? "Assicurata" : "Insured"}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Primary Vehicle Specs */}
      <div className="bg-white rounded-2xl border border-[#E5E5E3] p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E3]">
          <div className="flex items-center gap-2.5">
            <CarIcon size={20} className="text-[#0E0F10]" />
            <h2 className="text-sm font-semibold text-[#0E0F10]">
              {isIt ? "Specifiche veicolo" : "Vehicle specifications"}
            </h2>
          </div>
          <span className="text-xs text-emerald-700 font-medium">
            {isIt ? "Revisione regolare" : "Inspection valid"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[#666666] block">{isIt ? "Targa" : "Plate"}</span>
            <span className="font-mono font-bold text-sm text-[#0E0F10] block mt-0.5">AB 123 CD</span>
          </div>

          <div>
            <span className="text-[#666666] block">{isIt ? "Anno" : "Year"}</span>
            <span className="font-semibold text-sm text-[#0E0F10] block mt-0.5">2023</span>
          </div>

          <div>
            <span className="text-[#666666] block">{isIt ? "Colore" : "Color"}</span>
            <span className="font-medium text-sm text-[#0E0F10] block mt-0.5">Manhattan Gray Metallic</span>
          </div>

          <div>
            <span className="text-[#666666] block">{isIt ? "Stato" : "Status"}</span>
            <span className="font-medium text-sm text-[#0E0F10] block mt-0.5">{isIt ? "Attivo e circolante" : "Active & roadworthy"}</span>
          </div>
        </div>

        {/* Technical Details */}
        <div className="pt-3 border-t border-[#E5E5E3]">
          <button
            type="button"
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="w-full flex items-center justify-between py-1 text-xs font-medium text-[#0E0F10] hover:text-[#666666]"
          >
            <span>{isIt ? "Dettagli telaio e identificazione" : "Technical identification"}</span>
            <span>{showTechnicalDetails ? "−" : "+"}</span>
          </button>

          {showTechnicalDetails && (
            <div className="mt-3 p-3 rounded-xl bg-[#F7F7F6] space-y-2 text-xs">
              <div>
                <span className="text-[#666666] block">Numero di telaio (VIN)</span>
                <span className="font-mono font-bold text-[#0E0F10] text-[11px]">WAUZZZGY5PA089214</span>
              </div>
              <div>
                <span className="text-[#666666] block">Motorizzazione</span>
                <span className="font-medium text-[#0E0F10]">35 TFSI 1.5 l Mild Hybrid (110 kW / 150 CV)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
