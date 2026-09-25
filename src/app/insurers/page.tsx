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
          <TechnicalReveal className="text-xs sm:text-sm font-medium text-[#555555]">
            {isIt ? "Operazioni sinistri e liquidazione" : "Claims operations & triage"}
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

      {/* Real Product UI Workbench Preview (Open Composition escaping the grid per Section 28 & 29) */}
      <section className="py-24 sm:py-36 bg-[#F7F7F6] border-b border-[#E5E5E3] overflow-hidden">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-medium text-[#555555]">
              {isIt ? "Area liquidazione e perizia" : "Claims desk"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E0F10] leading-tight">
              {isIt ? "Esamina il sinistro, non i documenti cartacei." : "Review the claim, not the paperwork."}
            </h2>
            <p className="text-base sm:text-lg text-[#666666] font-light leading-relaxed">
              {isIt
                ? "Una visione unificata che integra curve telemetriche, fotografie certificate e dichiarazioni in un'interfaccia aperta. Nessuna scatola nera che decide la colpa."
                : "A unified workspace connecting vehicle kinematics, calibrated photographs, and driver statements in one open interface. Zero automated liability decrees."}
            </p>
          </div>

          {/* Asymmetric 12-Column Layout Escaping The Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Column: Key Principles (lg:col-span-5) */}
            <div className="lg:col-span-5 space-y-8 pt-2">
              <div className="space-y-2 border-l-2 border-[#0E0F10] pl-4">
                <span className="text-xs font-mono font-semibold text-[#0E0F10]">01 / TRIAGE</span>
                <h3 className="text-base font-bold text-[#0E0F10]">
                  {isIt ? "Fascicolo strutturato in tempo reale" : "Real-time structured dossier"}
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed">
                  {isIt
                    ? "Non appena il conducente completa l'invio sul posto, il sinistro appare nella coda operativa con tutti i metadati verificati."
                    : "The moment the driver completes roadside intake, the incident populates the operational queue with verified metadata."}
                </p>
              </div>

              <div className="space-y-2 border-l-2 border-[#E5E5E3] pl-4">
                <span className="text-xs font-mono font-semibold text-[#666666]">02 / CAI</span>
                <h3 className="text-base font-bold text-[#0E0F10]">
                  {isIt ? "Mappatura automatica Casella 12" : "Deterministic Box 12 mapping"}
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed">
                  {isIt
                    ? "I fatti osservati vengono ricondotti univocamente alle circostanze del Modulo Blu europeo senza interpretazioni arbitrarie."
                    : "Observed physical facts map deterministically to European standard circumstances without unverified speculation."}
                </p>
              </div>

              <div className="space-y-2 border-l-2 border-[#E5E5E3] pl-4">
                <span className="text-xs font-mono font-semibold text-[#666666]">03 / OVERSIGHT</span>
                <h3 className="text-base font-bold text-[#0E0F10]">
                  {isIt ? "Autorità decisionale umana" : "Sole human authority"}
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed">
                  {isIt
                    ? "La responsabilità giuridica e la liquidazione economica rimangono ad esclusivo appannaggio del perito abilitato."
                    : "Legal liability and economic settlement remain exclusively with licensed claims professionals."}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/console/login"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#0E0F10] hover:text-[#555555] transition-colors"
                >
                  <span>{isIt ? "Apri dimostratore Console →" : "Explore live Console workspace →"}</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Real Console UI Surface Escaping Grid with 3D Depth (lg:col-span-7) */}
            <div
              className="lg:col-span-7 bg-white border border-[#E5E5E3] rounded-2xl shadow-lg p-6 sm:p-8 space-y-6 lg:-mr-10 transition-transform duration-500 hover:rotate-0"
              style={{
                perspective: "1000px",
                transform: "rotateY(-2deg) rotateX(1deg)",
              }}
            >
              {/* Dossier Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#E5E5E3] gap-3">
                <div>
                  <span className="text-xs text-[#555555] font-medium">
                    Aura Mutua Assicurazioni / Portale Sinistri
                  </span>
                  <div className="font-mono text-2xl font-bold text-[#0E0F10] mt-0.5">
                    IMP-260925-014
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200">
                    {isIt ? "In attesa conducente" : "Action required"}
                  </span>
                  <span className="text-xs font-mono text-[#666666]">8 min fa</span>
                </div>
              </div>

              {/* Vehicle Comparison Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-[#F7F7F6] rounded-xl space-y-1">
                  <span className="text-[#555555] font-medium block">{isIt ? "Veicolo A (Assicurato)" : "Vehicle A (Insured)"}</span>
                  <span className="font-bold text-[#0E0F10] text-sm block">Audi A3 Sportback</span>
                  <span className="font-mono text-[#555555] text-[11px] block">AB 123 CD</span>
                </div>
                <div className="p-4 bg-[#F7F7F6] rounded-xl space-y-1">
                  <span className="text-[#555555] font-medium block">{isIt ? "Veicolo B (Controparte)" : "Vehicle B (Counterparty)"}</span>
                  <span className="font-bold text-[#0E0F10] text-sm block">Volkswagen Golf</span>
                  <span className="font-mono text-[#555555] text-[11px] block">EF 456 GH</span>
                </div>
              </div>

              {/* Fact Summary Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-[#E5E5E3] text-xs">
                <div>
                  <span className="text-[#555555] block">{isIt ? "Prove raccolte" : "Evidence"}</span>
                  <span className="font-semibold text-[#0E0F10] text-sm">{isIt ? "6 fotografie" : "6 photos"}</span>
                </div>
                <div>
                  <span className="text-[#555555] block">{isIt ? "Telemetria CAN" : "Telemetry"}</span>
                  <span className="font-semibold text-[#0E0F10] text-sm">10 Hz sincrono</span>
                </div>
                <div>
                  <span className="text-[#555555] block">{isIt ? "Stato revisione" : "Status"}</span>
                  <span className="font-semibold text-emerald-700 text-sm">{isIt ? "Pronto per perito" : "Ready for adjuster"}</span>
                </div>
              </div>
            </div>
          </div>
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
