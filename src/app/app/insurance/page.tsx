"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CheckCircleIcon } from "@/components/icons/Icons";

export default function DriverInsurancePage() {
  const { t, language } = useLanguage();
  const isIt = language === "it";

  return (
    <div className="space-y-7 max-w-md mx-auto py-2 selection:bg-[#0E0F10] selection:text-white">
      {/* Header */}
      <div className="space-y-1.5 pb-4 border-b border-[#E5E5E3]">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#0E0F10]">
          Generali Italia
        </h1>
        <p className="text-sm text-[#666666]">
          {isIt
            ? "Copertura assicurativa attiva per il tuo veicolo."
            : "Active insurance policy coverage for your vehicle."}
        </p>
      </div>

      {/* Main Policy Card */}
      <div className="bg-white rounded-2xl border border-[#E5E5E3] p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E3]">
          <div>
            <span className="text-xs text-[#666666] block">
              {isIt ? "Numero polizza" : "Policy number"}
            </span>
            <span className="text-xl font-mono font-bold text-[#0E0F10]">
              GEN-2026-9812
            </span>
          </div>
          <span className="font-medium text-xs text-emerald-700 flex items-center gap-1.5">
            <CheckCircleIcon size={16} />
            <span>{isIt ? "Polizza attiva" : "Policy active"}</span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[#666666] block">{isIt ? "Compagnia" : "Insurer"}</span>
            <span className="font-semibold text-sm text-[#0E0F10] block mt-0.5">Generali Italia</span>
          </div>

          <div>
            <span className="text-[#666666] block">{isIt ? "Tipo copertura" : "Coverage"}</span>
            <span className="font-semibold text-sm text-[#0E0F10] block mt-0.5">Kasko Full + RCA</span>
          </div>

          <div>
            <span className="text-[#666666] block">{isIt ? "Validità" : "Valid until"}</span>
            <span className="font-mono text-sm text-[#0E0F10] block mt-0.5">31 Mar 2027</span>
          </div>

          <div>
            <span className="text-[#666666] block">{isIt ? "Soccorso stradale" : "Assistance"}</span>
            <span className="font-medium text-sm text-emerald-700 block mt-0.5">{isIt ? "Incluso 24/7" : "Included 24/7"}</span>
          </div>
        </div>

        {/* Guarantees List */}
        <div className="pt-3 border-t border-[#E5E5E3] space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] block">
            {isIt ? "Garanzie incluse" : "Included coverage"}
          </span>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-[#F7F7F6] rounded-xl">
              <span className="font-semibold text-[#0E0F10] block">RCA Obbligatoria</span>
              <span className="text-[#666666]">Massimale € 6.450.000 per sinistro stradale.</span>
            </div>
            <div className="p-3 bg-[#F7F7F6] rounded-xl">
              <span className="font-semibold text-[#0E0F10] block">Kasko Completa</span>
              <span className="text-[#666666]">Copertura danni da collisione con veicoli terzi.</span>
            </div>
          </div>
        </div>

        {/* Assistance Hotline */}
        <div className="pt-3 border-t border-[#E5E5E3]">
          <a
            href="tel:112"
            className="w-full py-3 px-4 rounded-xl bg-[#0E0F10] hover:bg-[#1A1B1C] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <span>{isIt ? "Chiama soccorso stradale (112)" : "Emergency Roadside (112)"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
