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
      <section className="py-24 sm:py-36 bg-white border-b border-[#D7D9D8]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-6">
          <TechnicalReveal className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#6F7375]">
            {isIt ? "OPERAZIONI SINISTRI & LIQUIDAZIONE" : "CLAIMS OPERATIONS & SIU"}
          </TechnicalReveal>
          <EditorialReveal
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#090A0A] leading-[1.04] uppercase max-w-5xl"
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
          <p className="text-lg sm:text-2xl text-[#6F7375] leading-relaxed max-w-3xl font-light">
            {isIt
              ? "Sostituisce i moduli CAI illeggibili e le dichiarazioni contraddittorie con rilievi metrici, curve di decelerazione e fascicoli strutturati secondo gli standard europei."
              : "Replace disputed handwritten CAI forms with high-frequency connected vehicle telemetry, calibrated roadway geometry, and immutable digital audit chains."}
          </p>

          <div className="pt-4">
            <Link
              href="/console/login"
              className="inline-flex items-center justify-center min-h-[52px] px-8 bg-[#090A0A] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#171819] transition-colors"
            >
              {isIt ? "Accedi alla Console Sinistri" : "Launch Claims Console"}
            </Link>
          </div>
        </div>
      </section>

      {/* Real Product UI Workbench Preview */}
      <section className="py-28 bg-[#F4F5F3] border-b border-[#D7D9D8]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold tracking-widest text-[#6F7375] uppercase">
              {isIt ? "INTERFACCIA PERITALE" : "WORKBENCH ARCHITECTURE"}
            </span>
            <h2 className="text-3xl font-bold uppercase text-[#090A0A]">
              {isIt ? "Il Fascicolo Sinistro Unificato" : "Unified Claim Dossier Inspection"}
            </h2>
          </div>

          <ProductReveal className="border border-[#D7D9D8] bg-white p-8 sm:p-12 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#D7D9D8] gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#6F7375] font-semibold">
                  CARRIER: AURA MUTUA ASSICURAZIONI • FIRENZE
                </span>
                <h3 className="text-2xl font-bold font-mono text-[#090A0A] mt-1">
                  CLAIM #CLM-2026-0891
                </h3>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-emerald-700 font-bold uppercase">{isIt ? "ACQUISIZIONE COMPLETA 100%" : "100% INGESTION COMPLETE"}</span>
                <span className="text-[#6F7375] uppercase font-semibold">{isIt ? "PRIORITÀ: MEDIA" : "PRIORITY: MEDIUM"}</span>
              </div>
            </div>

            {/* Technical Detail Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4 text-sm border-b border-[#D7D9D8]">
              <div className="space-y-1">
                <span className="text-xs text-[#6F7375] uppercase tracking-wider font-semibold block">{isIt ? "Assicurato" : "Policyholder"}</span>
                <span className="font-bold text-[#090A0A] text-base block">Matteo Bianchi</span>
                <span className="text-xs text-[#6F7375] font-mono">VW Golf VIII (GF492XP)</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-[#6F7375] uppercase tracking-wider font-semibold block">{isIt ? "Controparte" : "Counterparty"}</span>
                <span className="font-bold text-[#090A0A] text-base block">Marco Ferri</span>
                <span className="text-xs text-[#6F7375] font-mono">Fiat 500X (EB810PZ)</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-[#6F7375] uppercase tracking-wider font-semibold block">{isIt ? "Casella CAI 12" : "CAI Circumstance"}</span>
                <span className="font-bold text-[#090A0A] text-base block">Box 12 — Case 04 &amp; 08</span>
                <span className="text-xs text-[#6F7375]">{isIt ? "Immissione da area privata" : "Entering from private lot"}</span>
              </div>
            </div>

            {/* Metric Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-[#6F7375]">
              <div>
                <span className="block text-[#6F7375] uppercase tracking-wider font-semibold">{isIt ? "VELOCITÀ IMPATTO" : "IMPACT SPEED"}</span>
                <span className="text-xl font-bold font-mono text-[#090A0A]">48.2 KM/H</span>
              </div>
              <div>
                <span className="block text-[#6F7375] uppercase tracking-wider font-semibold">{isIt ? "DECELERAZIONE" : "DECELERATION"}</span>
                <span className="text-xl font-bold font-mono text-[#090A0A]">-0.82 G</span>
              </div>
              <div>
                <span className="block text-[#6F7375] uppercase tracking-wider font-semibold">{isIt ? "FOTOGRAFIE" : "PHOTOGRAPHS"}</span>
                <span className="text-xl font-bold font-mono text-[#090A0A]">4 GEOLOCATED</span>
              </div>
              <div>
                <span className="block text-[#6F7375] uppercase tracking-wider font-semibold">{isIt ? "AUDIT LOG" : "AUDIT LOG"}</span>
                <span className="text-xl font-bold font-mono text-emerald-700">SHA-256 SIGNED</span>
              </div>
            </div>
          </ProductReveal>
        </div>
      </section>

      {/* Epistemic Demarcation Section */}
      <section className="py-24 sm:py-36 bg-white border-b border-[#D7D9D8]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-baseline">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-semibold tracking-widest text-[#090A0A] uppercase">
              {isIt ? "RESPONSABILITÀ PERITALE" : "ADJUSTER AUTHORITY"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase text-[#090A0A]">
              {isIt ? "Gli algoritmi non emettono sentenze" : "Zero automated liability decrees"}
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#6F7375] font-light leading-relaxed">
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
