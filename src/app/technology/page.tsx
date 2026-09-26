"use client";

import React from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { TechnicalReveal } from "@/components/motion/TechnicalReveal";
import { RevealText } from "@/components/motion/RevealText";
import { useLanguage } from "@/context/LanguageContext";

export default function TechnologyPage() {
  return (
    <PublicShell>
      <TechnologyContent />
    </PublicShell>
  );
}

function TechnologyContent() {
  const { language } = useLanguage();
  const isIt = language === "it";

  return (
    <>
      {/* Header */}
      <section className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-6">
          <TechnicalReveal className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#666666]">
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

      {/* Current vs Future Architecture (OPEN ARCHITECTURAL PLANES - ZERO WHITE CARDS) */}
      <section className="py-24 sm:py-36 bg-[#F7F7F6] border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Plane 1: Current Architecture (Solid Top Border on Canvas) */}
            <div className="border-t-2 border-[#0E0F10] pt-8 space-y-8 select-none">
              <div className="pb-4 border-b border-[#E0E0DE] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#0E0F10] uppercase">
                    {isIt ? "FONDAZIONE ATTUALE" : "OPERATIONAL FOUNDATION"}
                  </span>
                  <span className="text-[11px] font-mono text-[#555555] uppercase tracking-widest">
                    LOCAL BROWSER
                  </span>
                </div>
                <RevealText
                  as="h2"
                  mode="word"
                  variant="tracking-spread"
                  className="text-2xl sm:text-4xl font-bold uppercase text-[#0E0F10] tracking-tight"
                >
                  {isIt ? "Architettura Browser-Local" : "Browser-Local Architecture"}
                </RevealText>
              </div>

              <div className="space-y-6 text-sm text-[#555555]">
                <div className="space-y-1.5 pb-6 border-b border-[#E0E0DE]">
                  <h3 className="text-base font-bold text-[#0E0F10] uppercase tracking-tight">
                    Cross-Context Reactive State
                  </h3>
                  <p className="leading-relaxed font-light">
                    Claims repository running directly in browser storage (`localStorage` and `IndexedDB`). State synchronized instantly between the Consumer Driver workspace and the Insurance Claims Console without cloud latency.
                  </p>
                </div>

                <div className="space-y-1.5 pb-6 border-b border-[#E0E0DE]">
                  <h3 className="text-base font-bold text-[#0E0F10] uppercase tracking-tight">
                    Photographic &amp; GPS Ingestion
                  </h3>
                  <p className="leading-relaxed font-light">
                    Camera captures compressed and indexed in IndexedDB blobs with embedded GNSS coordinates, timestamp verification, and multi-angle orientation flags.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-[#0E0F10] uppercase tracking-tight">
                    CAI Standard Box 12 Rule Engine
                  </h3>
                  <p className="leading-relaxed font-light">
                    Deterministic mapping from selected accident dynamics directly into European Accident Statement (Constat Amiable) circumstances without probabilistic AI hallucination.
                  </p>
                </div>
              </div>
            </div>

            {/* Plane 2: Target Enterprise Cloud Architecture (Muted Top Border on Canvas) */}
            <div className="border-t-2 border-[#888888] pt-8 space-y-8 select-none">
              <div className="pb-4 border-b border-[#E0E0DE] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#777777] uppercase">
                    {isIt ? "ROADMAP AZIENDALE" : "ENTERPRISE ROADMAP"}
                  </span>
                  <span className="text-[11px] font-mono text-[#777777] uppercase tracking-widest">
                    FUTURE TARGET
                  </span>
                </div>
                <RevealText
                  as="h2"
                  mode="word"
                  variant="tracking-spread"
                  className="text-2xl sm:text-4xl font-bold uppercase text-[#0E0F10] tracking-tight"
                >
                  {isIt ? "Integrazione Carrier & OEM" : "Carrier & OEM Telemetry Target"}
                </RevealText>
              </div>

              <div className="space-y-6 text-sm text-[#555555]">
                <div className="space-y-1.5 pb-6 border-b border-[#E0E0DE]">
                  <h3 className="text-base font-bold text-[#0E0F10] uppercase tracking-tight">
                    OEM Connected Vehicle Feeds
                  </h3>
                  <p className="leading-relaxed font-light">
                    Secure ingest of 10–20Hz CAN-bus telemetry (longitudinal/lateral deceleration vectors, brake pedal pressure, ABS engagement, steering angle) directly from automotive telematics APIs.
                  </p>
                </div>

                <div className="space-y-1.5 pb-6 border-b border-[#E0E0DE]">
                  <h3 className="text-base font-bold text-[#0E0F10] uppercase tracking-tight">
                    Carrier Core Claims Sync
                  </h3>
                  <p className="leading-relaxed font-light">
                    Bi-directional integration with Guidewire, Duck Creek, and SAP Insurance platforms via authenticated webhook streams and signed JSON dossiers.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-[#0E0F10] uppercase tracking-tight">
                    {isIt ? "Tracciabilità e Integrità del Rilievo" : "Auditable Evidence Provenance"}
                  </h3>
                  <p className="leading-relaxed font-light">
                    {isIt
                      ? "Marcatura temporale e registrazione metadati per ogni rilievo fotografico, garantendo una sequenza cronologica trasparente per la perizia."
                      : "Structured timestamping and metadata logging on captured evidence files to ensure a transparent, verifiable timeline for claims assessment."}
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
              {isIt ? "Accedi al banco di lavoro peritale con i dati dimostrativi caricati." : "Access the claims workbench with demonstration incident data."}
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
    </>
  );
}
