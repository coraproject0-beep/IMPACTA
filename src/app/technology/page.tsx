"use client";

import React from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { TechnicalReveal } from "@/components/motion/TechnicalReveal";
import { useLanguage } from "@/context/LanguageContext";

export default function TechnologyPage() {
  const { language } = useLanguage();
  const isIt = language === "it";

  return (
    <PublicShell>
      {/* Header */}
      <section className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-6">
          <TechnicalReveal className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#666666]">
            {isIt ? "ARCHITETTURA TECNOLOGICA" : "TECHNICAL ARCHITECTURE & SPECIFICATION"}
          </TechnicalReveal>
          <EditorialReveal
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0E0F10] leading-[1.04] uppercase max-w-5xl"
          >
            {isIt ? (
              <>
                Un&apos;architettura trasparente.
                <br />
                Nessuna scatola nera opaca.
              </>
            ) : (
              <>
                Transparent architecture.
                <br />
                Zero unverified claims.
              </>
            )}
          </EditorialReveal>
          <p className="text-lg sm:text-2xl text-[#666666] leading-relaxed max-w-3xl font-light">
            {isIt
              ? "Separiamo con rigore la fondazione tecnica funzionante in locale dalle future integrazioni cloud e OEM. Nessuna falsa promessa di intelligenza artificiale onnisciente."
              : "We rigorously distinguish working local-first client architecture from future enterprise cloud and OEM telemetry integrations."}
          </p>
        </div>
      </section>

      {/* MANDATORY HARDWARE DISCLOSURE STATEMENT */}
      <section className="py-12 bg-[#0E0F10] text-white border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-white/50 font-semibold">
              DISCLOSURE PRODOTTO / PRODUCT DISCLOSURE
            </span>
            <p className="text-sm sm:text-base text-white/80 font-normal leading-relaxed max-w-3xl">
              {isIt
                ? "L'oggetto 3D «Black Box» è una metafora visiva concettuale per la fusione di prove e telemetria. IMPACTA non produce attualmente dispositivi hardware fisici."
                : "The 3D Black Box hero is a conceptual visualization of multi-modal evidence fusion and optional telemetry. IMPACTA does not currently manufacture physical hardware devices."}
            </p>
          </div>
          <div className="text-xs uppercase font-semibold text-white/40 tracking-wider whitespace-nowrap">
            EVIDENTIARY AUDIT PROVENANCE
          </div>
        </div>
      </section>

      {/* Current vs Future Architecture (Editorial Open Comparison) */}
      <section className="py-24 sm:py-36 bg-[#F7F7F6] border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Current Architecture */}
            <div className="space-y-8">
              <div className="pb-6 border-b border-[#E5E5E3] space-y-2">
                <span className="text-xs font-semibold tracking-wider text-[#0E0F10] uppercase">
                  {isIt ? "FONDAZIONE ATTUALE" : "OPERATIONAL FOUNDATION"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold uppercase text-[#0E0F10]">
                  {isIt ? "Architettura Browser-Local" : "Browser-Local Architecture"}
                </h2>
              </div>

              <div className="space-y-6 text-sm text-[#666666]">
                <div className="space-y-2 pb-6 border-b border-[#E5E5E3]">
                  <h3 className="text-base font-bold text-[#0E0F10] uppercase">
                    Cross-Context Reactive State
                  </h3>
                  <p className="leading-relaxed font-light">
                    Claims repository running directly in browser storage (`localStorage` and `IndexedDB`). State synchronized instantly between the Consumer Driver workspace and the Insurance Claims Console without cloud latency.
                  </p>
                </div>

                <div className="space-y-2 pb-6 border-b border-[#E5E5E3]">
                  <h3 className="text-base font-bold text-[#0E0F10] uppercase">
                    Photographic &amp; GPS Ingestion
                  </h3>
                  <p className="leading-relaxed font-light">
                    Camera captures compressed and indexed in IndexedDB blobs with embedded GNSS coordinates, timestamp verification, and multi-angle orientation flags.
                  </p>
                </div>

                <div className="space-y-2 pb-6 border-b border-[#E5E5E3]">
                  <h3 className="text-base font-bold text-[#0E0F10] uppercase">
                    CAI Standard Box 12 Rule Engine
                  </h3>
                  <p className="leading-relaxed font-light">
                    Deterministic mapping from selected accident dynamics directly into European Accident Statement (Constat Amiable) circumstances without probabilistic AI hallucination.
                  </p>
                </div>
              </div>
            </div>

            {/* Target Enterprise Cloud Architecture */}
            <div className="space-y-8">
              <div className="pb-6 border-b border-[#E5E5E3] space-y-2">
                <span className="text-xs font-semibold tracking-wider text-[#666666] uppercase">
                  {isIt ? "ROADMAP AZIENDALE" : "ENTERPRISE ROADMAP"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold uppercase text-[#0E0F10]">
                  {isIt ? "Integrazione Carrier &amp; OEM" : "Carrier &amp; OEM Telemetry Target"}
                </h2>
              </div>

              <div className="space-y-6 text-sm text-[#666666]">
                <div className="space-y-2 pb-6 border-b border-[#E5E5E3]">
                  <h3 className="text-base font-bold text-[#0E0F10] uppercase">
                    OEM Connected Vehicle Feeds
                  </h3>
                  <p className="leading-relaxed font-light">
                    Secure ingest of 10–20Hz CAN-bus telemetry (longitudinal/lateral deceleration vectors, brake pedal pressure, ABS engagement, steering angle) directly from automotive telematics APIs.
                  </p>
                </div>

                <div className="space-y-2 pb-6 border-b border-[#E5E5E3]">
                  <h3 className="text-base font-bold text-[#0E0F10] uppercase">
                    Core Carrier Core Claims Sync
                  </h3>
                  <p className="leading-relaxed font-light">
                    Bi-directional integration with Guidewire, Duck Creek, and SAP Insurance platforms via authenticated webhook streams and signed JSON dossiers.
                  </p>
                </div>

                <div className="space-y-2 pb-6 border-b border-[#E5E5E3]">
                  <h3 className="text-base font-bold text-[#0E0F10] uppercase">
                    Cryptographic Chain of Custody
                  </h3>
                  <p className="leading-relaxed font-light">
                    Digital signature timestamping on raw evidence packets to guarantee tamper-proof admissibility in Italian and European legal jurisdictions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-20 bg-white">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold uppercase text-[#0E0F10]">
              {isIt ? "Esamina il fascicolo sinistro" : "Inspect structured claims data"}
            </h3>
            <p className="text-sm text-[#666666] mt-1 font-light">
              {isIt ? "Accedi al banco di lavoro peritale con i dati dimostrativi caricati." : "Access the operational claims workbench with pre-loaded forensic fixtures."}
            </p>
          </div>
          <Link
            href="/console/claims"
            className="inline-flex items-center justify-center min-h-[52px] px-8 bg-[#0E0F10] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#1A1B1C] transition-colors"
          >
            {isIt ? "Accedi alla Console" : "Open Claims Console"}
          </Link>
        </div>
      </section>
    </PublicShell>
  );
}
