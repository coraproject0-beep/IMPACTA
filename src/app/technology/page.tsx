"use client";

import React from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { TechnicalReveal } from "@/components/motion/TechnicalReveal";
import { CheckCircleIcon } from "@/components/icons/Icons";
import { useLanguage } from "@/context/LanguageContext";

export default function TechnologyPage() {
  const { language } = useLanguage();

  return (
    <PublicShell>
      {/* Header */}
      <section className="py-24 sm:py-36 bg-white border-b border-[#D7D9D8]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-6">
          <TechnicalReveal className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-[#6F7375]">
            {language === "it" ? "ARCHITETTURA TECNOLOGICA" : "TECHNICAL ARCHITECTURE & SPECIFICATION"}
          </TechnicalReveal>
          <EditorialReveal
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#090A0A] leading-[1.04] uppercase max-w-5xl"
          >
            {language === "it" ? (
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
          <p className="text-lg sm:text-2xl text-[#6F7375] leading-relaxed max-w-3xl font-light">
            {language === "it"
              ? "Separiamo con rigore la fondazione tecnica funzionante in locale dalle future integrazioni cloud e OEM. Nessuna falsa promessa di intelligenza artificiale onnisciente."
              : "We rigorously distinguish working local-first client architecture from future enterprise cloud and OEM telemetry integrations."}
          </p>
        </div>
      </section>

      {/* MANDATORY HARDWARE DISCLOSURE STATEMENT */}
      <section className="py-12 bg-[#090A0A] text-white border-b border-[#D7D9D8]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-white/50">
              DISCLOSURE PRODOTTO / PRODUCT DISCLOSURE
            </span>
            <p className="text-sm sm:text-base text-white/80 font-mono leading-relaxed max-w-3xl">
              {language === "it"
                ? "L'oggetto 3D «Black Box» è una metafora visiva concettuale per la fusione di prove e telemetria. IMPACTA non produce attualmente dispositivi hardware fisici."
                : "The 3D Black Box hero is a conceptual visualization of multi-modal evidence fusion and optional telemetry. IMPACTA does not currently manufacture physical hardware devices."}
            </p>
          </div>
          <div className="text-xs font-mono text-white/40 tracking-wider whitespace-nowrap">
            EVIDENTIARY AUDIT PROVENANCE
          </div>
        </div>
      </section>

      {/* Current vs Future Architecture (Editorial Open Comparison) */}
      <section className="py-24 sm:py-36 bg-[#F4F5F3] border-b border-[#D7D9D8]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Current Architecture */}
            <div className="space-y-8">
              <div className="pb-6 border-b border-[#D7D9D8] space-y-2">
                <span className="text-xs font-mono font-bold tracking-widest text-[#090A0A] uppercase">
                  {language === "it" ? "FONDAZIONE ATTUALE" : "OPERATIONAL FOUNDATION"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold uppercase text-[#090A0A]">
                  {language === "it" ? "Architettura Browser-Local" : "Browser-Local Architecture"}
                </h2>
              </div>

              <div className="space-y-6 text-sm text-[#6F7375]">
                <div className="space-y-2 pb-6 border-b border-[#D7D9D8]">
                  <h3 className="text-base font-bold text-[#090A0A] uppercase">
                    Cross-Context Reactive State
                  </h3>
                  <p className="leading-relaxed">
                    Claims repository running directly in browser storage (`localStorage` and `IndexedDB`). State synchronized instantly between the Consumer Driver workspace and the Insurance Claims Console without cloud latency.
                  </p>
                </div>

                <div className="space-y-2 pb-6 border-b border-[#D7D9D8]">
                  <h3 className="text-base font-bold text-[#090A0A] uppercase">
                    Photographic &amp; GPS Ingestion
                  </h3>
                  <p className="leading-relaxed">
                    Camera captures compressed and indexed in IndexedDB blobs with embedded GNSS coordinates, timestamp verification, and multi-angle orientation flags.
                  </p>
                </div>

                <div className="space-y-2 pb-6 border-b border-[#D7D9D8]">
                  <h3 className="text-base font-bold text-[#090A0A] uppercase">
                    CAI Standard Box 12 Rule Engine
                  </h3>
                  <p className="leading-relaxed">
                    Deterministic mapping from selected accident dynamics directly into European Accident Statement (Constat Amiable) circumstances without probabilistic AI hallucination.
                  </p>
                </div>
              </div>
            </div>

            {/* Target Enterprise Cloud Architecture */}
            <div className="space-y-8">
              <div className="pb-6 border-b border-[#D7D9D8] space-y-2">
                <span className="text-xs font-mono font-bold tracking-widest text-[#6F7375] uppercase">
                  {language === "it" ? "ROADMAP AZIENDALE" : "ENTERPRISE ROADMAP"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold uppercase text-[#090A0A]">
                  {language === "it" ? "Integrazione Carrier &amp; OEM" : "Carrier &amp; OEM Telemetry Target"}
                </h2>
              </div>

              <div className="space-y-6 text-sm text-[#6F7375]">
                <div className="space-y-2 pb-6 border-b border-[#D7D9D8]">
                  <h3 className="text-base font-bold text-[#090A0A] uppercase">
                    OEM Connected Vehicle Feeds
                  </h3>
                  <p className="leading-relaxed">
                    Secure ingest of 10–20Hz CAN-bus telemetry (longitudinal/lateral deceleration vectors, brake pedal pressure, ABS engagement, steering angle) directly from automotive telematics APIs.
                  </p>
                </div>

                <div className="space-y-2 pb-6 border-b border-[#D7D9D8]">
                  <h3 className="text-base font-bold text-[#090A0A] uppercase">
                    Core Carrier Core Claims Sync
                  </h3>
                  <p className="leading-relaxed">
                    Bi-directional integration with Guidewire, Duck Creek, and SAP Insurance platforms via authenticated webhook streams and signed JSON dossiers.
                  </p>
                </div>

                <div className="space-y-2 pb-6 border-b border-[#D7D9D8]">
                  <h3 className="text-base font-bold text-[#090A0A] uppercase">
                    Cryptographic Chain of Custody
                  </h3>
                  <p className="leading-relaxed">
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
            <h3 className="text-2xl font-bold uppercase text-[#090A0A]">
              {language === "it" ? "Esamina il fascicolo sinistro" : "Inspect structured claims data"}
            </h3>
            <p className="text-sm text-[#6F7375] mt-1 font-mono">
              Access the operational claims workbench with pre-loaded forensic fixtures.
            </p>
          </div>
          <Link
            href="/console/claims"
            className="inline-flex items-center justify-center min-h-[52px] px-8 bg-[#090A0A] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#171819] transition-colors"
          >
            {language === "it" ? "Accedi alla Console" : "Open Claims Console"}
          </Link>
        </div>
      </section>
    </PublicShell>
  );
}
