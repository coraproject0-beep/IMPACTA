"use client";

import React from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { TechnicalReveal } from "@/components/motion/TechnicalReveal";
import { ProductReveal } from "@/components/motion/ProductReveal";
import { useLanguage } from "@/context/LanguageContext";

export default function InsurersPage() {
  const { language } = useLanguage();
  const isIt = language === "it";

  return (
    <PublicShell>
      {/* Header Scene */}
      <section className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-6">
          <TechnicalReveal className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#666666]">
            {isIt ? "OPERAZIONI SINISTRI & LIQUIDAZIONE" : "CLAIMS OPERATIONS & SIU"}
          </TechnicalReveal>
          <EditorialReveal
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0E0F10] leading-[1.04] uppercase max-w-5xl"
          >
            {isIt ? (
              <>
                Dati oggettivi.
                <br />
                Liquidazione rapida ed equa.
              </>
            ) : (
              <>
                Objective kinematics.
                <br />
                Faster, equitable claims triage.
              </>
            )}
          </EditorialReveal>
          <p className="text-lg sm:text-2xl text-[#666666] leading-relaxed max-w-3xl font-light">
            {isIt
              ? "Sostituisce i moduli CAI illeggibili e le dichiarazioni contraddittorie con rilievi metrici, curve di decelerazione e fascicoli strutturati secondo gli standard europei."
              : "Replace disputed handwritten CAI forms with high-frequency connected vehicle telemetry, calibrated roadway geometry, and immutable digital audit chains."}
          </p>

          <div className="pt-4">
            <Link
              href="/console/login"
              className="inline-flex items-center justify-center min-h-[52px] px-8 bg-[#0E0F10] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#1A1B1C] transition-colors"
            >
              {isIt ? "Accedi alla Console Sinistri" : "Launch Claims Console"}
            </Link>
          </div>
        </div>
      </section>

      {/* Real Product UI Workbench Preview */}
      <section className="py-28 bg-[#F7F7F6] border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold text-[#555555]">
              {isIt ? "Area peritale" : "Claims operations"}
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#0E0F10]">
              {isIt ? "Il Fascicolo Sinistro Unificato" : "Unified Claim Dossier Inspection"}
            </h2>
          </div>

          <ProductReveal className="border border-[#E5E5E3] bg-white rounded-xl p-8 sm:p-12 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E5E5E3] gap-4">
              <div>
                <span className="text-xs text-[#555555] font-medium">
                  Aura Mutua Assicurazioni • Firenze
                </span>
                <h3 className="text-2xl font-bold font-mono text-[#0E0F10] mt-1">
                  CLM-2026-0891
                </h3>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-emerald-800 font-semibold">{isIt ? "Dossier completo" : "Complete file"}</span>
                <span className="text-[#555555] font-medium">{isIt ? "In attesa revisione" : "Ready for review"}</span>
              </div>
            </div>

            {/* Technical Detail Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4 text-sm border-b border-[#E5E5E3]">
              <div className="space-y-1">
                <span className="text-xs text-[#555555] font-medium block">{isIt ? "Assicurato" : "Policyholder"}</span>
                <span className="font-bold text-[#0E0F10] text-base block">Matteo Bianchi</span>
                <span className="text-xs text-[#666666] font-mono">VW Golf VIII (GF492XP)</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-[#555555] font-medium block">{isIt ? "Controparte" : "Counterparty"}</span>
                <span className="font-bold text-[#0E0F10] text-base block">Marco Ferri</span>
                <span className="text-xs text-[#666666] font-mono">Fiat 500X (EB810PZ)</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-[#555555] font-medium block">{isIt ? "Circostanza CAI" : "CAI circumstance"}</span>
                <span className="font-bold text-[#0E0F10] text-base block">Box 12 — Case 04 &amp; 08</span>
                <span className="text-xs text-[#666666]">{isIt ? "Immissione da area privata" : "Entering from private lot"}</span>
              </div>
            </div>

            {/* Metric Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-[#666666]">
              <div>
                <span className="block text-[#555555] font-medium">{isIt ? "Velocità rilevata" : "Impact speed"}</span>
                <span className="text-xl font-bold font-mono text-[#0E0F10]">48.2 km/h</span>
              </div>
              <div>
                <span className="block text-[#555555] font-medium">{isIt ? "Decelerazione" : "Deceleration"}</span>
                <span className="text-xl font-bold font-mono text-[#0E0F10]">-0.82 G</span>
              </div>
              <div>
                <span className="block text-[#555555] font-medium">{isIt ? "Fotografie" : "Photographs"}</span>
                <span className="text-xl font-bold text-[#0E0F10]">4 geolocalizzate</span>
              </div>
              <div>
                <span className="block text-[#555555] font-medium">{isIt ? "Integrità dati" : "Data integrity"}</span>
                <span className="text-xl font-bold text-emerald-800 font-semibold">{isIt ? "Certificata" : "Verified"}</span>
              </div>
            </div>
          </ProductReveal>
        </div>
      </section>

      {/* Epistemic Demarcation Section */}
      <section className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-baseline">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-semibold text-[#555555]">
              {isIt ? "Responsabilità peritale" : "Adjuster authority"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase text-[#0E0F10]">
              {isIt ? "Gli algoritmi non emettono sentenze" : "Zero automated liability decrees"}
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#666666] font-light leading-relaxed">
            <p>
              {isIt
                ? "L'ordinamento giuridico italiano ed europeo richiede che la determinazione della responsabilità sia sempre assunta da periti e liquidatori abilitati. IMPACTA fornisce dati oggettivi incontestabili ma rimette ogni decisione di concorso di colpa all'autorità umana."
                : "European insurance regulations require that legal liability determinations be made by licensed adjusters. IMPACTA provides indisputable objective facts while leaving fault assessment exclusively to human discretion."}
            </p>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
