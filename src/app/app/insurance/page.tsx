"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { CheckCircleIcon, ChevronRightIcon, PhoneIcon } from "@/components/icons/Icons";
import { Emergency112DemoModal } from "@/features/driver/components/Emergency112DemoModal";

export default function DriverInsurancePage() {
  const { t, language } = useLanguage();
  const isIt = language === "it";
  const [show112Demo, setShow112Demo] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto py-2 sm:py-4 space-y-8 selection:bg-[#0E0F10] selection:text-white">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 border-b border-[#E5E5E3] gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0E0F10]">
            Generali Italia
          </h1>
          <p className="text-sm text-[#555555] font-normal mt-1">
            {isIt
              ? "Copertura assicurativa attiva per il tuo veicolo Audi A3."
              : "Active insurance policy coverage for your vehicle Audi A3."}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <CheckCircleIcon size={16} className="text-emerald-700" />
          <span>{isIt ? "Polizza attiva e valida" : "Policy active & valid"}</span>
        </div>
      </div>

      {/* 2. Responsive 12-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* LEFT COLUMN: Policy Details & Coverage Guarantees (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Policy Overview Table */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-[#0E0F10] tracking-tight">
              {isIt ? "Dettagli del contratto" : "Contract details"}
            </h2>

            <div className="border-t border-[#E5E5E3] divide-y divide-[#E5E5E3] text-xs">
              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[#555555] font-medium">{isIt ? "Numero polizza" : "Policy number"}</span>
                <span className="font-mono font-bold text-[#0E0F10]">GEN-2026-9812</span>
              </div>

              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[#555555] font-medium">{isIt ? "Compagnia assicuratrice" : "Insurance carrier"}</span>
                <span className="font-semibold text-[#0E0F10]">Generali Italia S.p.A.</span>
              </div>

              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[#555555] font-medium">{isIt ? "Tipologia formula" : "Coverage type"}</span>
                <span className="text-[#0E0F10] font-medium">Kasko Completa + RCA Standard</span>
              </div>

              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[#555555] font-medium">{isIt ? "Periodo di validità" : "Validity term"}</span>
                <span className="font-mono text-[#0E0F10]">01 Apr 2026 — 31 Mar 2027</span>
              </div>

              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[#555555] font-medium">{isIt ? "Frazionamento" : "Payment schedule"}</span>
                <span className="text-[#0E0F10]">{isIt ? "Annuale con quietanza regolare" : "Annual, paid in full"}</span>
              </div>
            </div>
          </div>

          {/* Guarantees List */}
          <div className="space-y-4 pt-2">
            <h2 className="text-base font-bold text-[#0E0F10] tracking-tight">
              {isIt ? "Garanzie e massimali inclusi" : "Included coverage and limits"}
            </h2>

            <div className="border border-[#E5E5E3] rounded-xl bg-white divide-y divide-[#E5E5E3] text-xs">
              <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-bold text-[#0E0F10]">RCA Obbligatoria (Responsabilità Civile Auto)</div>
                  <div className="text-[#555555]">
                    {isIt
                      ? "Copertura danni a persone e cose terze per sinistri da circolazione."
                      : "Third-party liability for bodily injury and property damage."}
                  </div>
                </div>
                <div className="font-mono font-semibold text-[#0E0F10] text-right whitespace-nowrap">
                  € 6.450.000
                </div>
              </div>

              <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-bold text-[#0E0F10]">Kasko Completa</div>
                  <div className="text-[#555555]">
                    {isIt
                      ? "Indennizzo danni al veicolo da urto, ribaltamento e uscita di strada."
                      : "Comprehensive collision and vehicle damage coverage."}
                  </div>
                </div>
                <div className="font-semibold text-emerald-800 text-right whitespace-nowrap">
                  {isIt ? "Inclusa" : "Included"}
                </div>
              </div>

              <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-bold text-[#0E0F10]">Soccorso Stradale e Traino</div>
                  <div className="text-[#555555]">
                    {isIt
                      ? "Assistenza 24 ore su 24 con carro attrezzi in Italia e nei Paesi UE."
                      : "24/7 roadside breakdown and recovery assistance across Italy and EU."}
                  </div>
                </div>
                <div className="font-semibold text-emerald-800 text-right whitespace-nowrap">
                  24/7
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Emergency Assistance & Quick Actions (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Emergency / Assistance Action Card */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-[#0E0F10] tracking-tight">
              {isIt ? "Assistenza immediata" : "Immediate assistance"}
            </h2>

            <div className="p-5 border border-[#E5E5E3] rounded-xl bg-white space-y-4 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-[#0E0F10]">
                  {isIt ? "Hai avuto un incidente adesso?" : "Involved in an accident now?"}
                </div>
                <p className="text-[#555555] leading-relaxed">
                  {isIt
                    ? "Verifica prima che tutti siano al sicuro. Se necessario, attiva i soccorsi di emergenza."
                    : "Ensure safety first. If anyone is injured, summon emergency services immediately."}
                </p>
              </div>

              {/* Safe 112 Demo Modal Trigger */}
              <button
                type="button"
                onClick={() => setShow112Demo(true)}
                className="w-full py-3.5 px-4 rounded-lg bg-[#0E0F10] hover:bg-[#1A1B1C] text-white font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <PhoneIcon size={16} />
                <span>{isIt ? "Simulazione emergenza (112)" : "Emergency demo call (112)"}</span>
              </button>

              <div className="pt-2 border-t border-[#E5E5E3] flex items-center justify-between text-[#555555]">
                <span>{isIt ? "Centrale operativa Generali" : "Generali claims hotline"}</span>
                <span className="font-mono font-medium text-[#0E0F10]">800 880 880</span>
              </div>
            </div>
          </div>

          {/* Linked Vehicle Reference */}
          <div className="space-y-3 pt-2">
            <h2 className="text-base font-bold text-[#0E0F10] tracking-tight">
              {isIt ? "Veicolo associato" : "Associated vehicle"}
            </h2>

            <Link
              href="/app/vehicle"
              className="p-5 border border-[#E5E5E3] hover:border-[#0E0F10] rounded-xl bg-white transition-colors group flex items-center justify-between"
            >
              <div>
                <div className="text-base font-bold text-[#0E0F10]">Audi A3</div>
                <div className="font-mono text-xs text-[#555555] mt-0.5">AB 123 CD • Sportback</div>
              </div>
              <ChevronRightIcon size={16} className="text-[#888888] group-hover:text-[#0E0F10] transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      <Emergency112DemoModal
        isOpen={show112Demo}
        onClose={() => setShow112Demo(false)}
      />
    </div>
  );
}
