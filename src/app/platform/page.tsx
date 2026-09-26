"use client";

import React from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { TechnicalReveal } from "@/components/motion/TechnicalReveal";
import { RevealText } from "@/components/motion/RevealText";
import { PerspectiveCard } from "@/components/motion/PerspectiveCard";
import { useLanguage } from "@/context/LanguageContext";

export default function PlatformPage() {
  const { language } = useLanguage();
  const isIt = language === "it";

  const platformStages = [
    {
      step: "01",
      phase: "CAPTURE",
      phaseLabel: isIt ? "ACQUISIZIONE" : "CAPTURE",
      title: isIt ? "Rilievo sul ciglio della strada" : "Roadside incident capture",
      actor: isIt ? "Conducente sul posto • Sensori nativi" : "Roadside driver • Native sensors",
      description: isIt
        ? "Subito dopo la collisione, l'applicazione guida prima l'incolumità personale (chiamata di emergenza 112, giubbotto catarifrangente) e poi 4 fotografie guidate con coordinate GNSS e orientamento della carreggiata."
        : "Immediately post-collision, the web client prioritizes physical safety (direct 112 dialer, safe refuge guidance) followed by 4 calibrated evidence photos with GNSS coordinates and road heading.",
      spec: isIt ? "Foto georeferenziate & Orientamento GNSS" : "Georeferenced Photos & GNSS Heading",
      cardBadge: isIt ? "STATO INGESTION" : "INGESTION STATUS",
      cardTitle: isIt ? "Pacchetto Rilievi Iniziale" : "Initial Evidence Payload",
      metrics: [
        { label: isIt ? "Scatti guidati" : "Framed shots", val: "4 / 4 COMPLETE" },
        { label: isIt ? "Geolocalizzazione" : "GNSS Position", val: "43.7696° N, 11.2558° E" },
        { label: isIt ? "Timestamp locale" : "Local timestamp", val: "14:28:42 CET" },
      ],
    },
    {
      step: "02",
      phase: "INTERPRET",
      phaseLabel: isIt ? "INTERPRETAZIONE" : "INTERPRET",
      title: isIt ? "Strutturazione dei dati metrici" : "Metric data structuring",
      actor: isIt ? "Pipeline di calibrazione • Telemetria CAN-bus" : "Calibration pipeline • CAN-bus telemetry",
      description: isIt
        ? "Le fotografie isolano la zona di contatto e leggono la targa della controparte. Quando disponibile, la telemetria di bordo CAN-bus a 10Hz correla i profili di decelerazione con il millisecondo esatto del contatto."
        : "Visual analysis isolates contact zones and validates counterparty registration. Where CAN-bus telemetry exists, 10Hz deceleration curves synchronize with the exact contact timestamp.",
      spec: isIt ? "Telemetria 10Hz & OCR Targa" : "10Hz Telemetry & Plate OCR",
      cardBadge: isIt ? "CORRELAZIONE METRICA" : "METRIC CORRELATION",
      cardTitle: isIt ? "Profilo Dinamico Sinistro" : "Dynamic Collision Profile",
      metrics: [
        { label: isIt ? "Picco decelerazione" : "Peak deceleration", val: "-4.8 m/s² (t=0.18s)" },
        { label: isIt ? "Targa controparte" : "Counterparty plate", val: "EF 456 GH (100% OCR)" },
        { label: isIt ? "Vettore impatto" : "Impact vector", val: "Front-right 35°" },
      ],
    },
    {
      step: "03",
      phase: "STRUCTURE",
      phaseLabel: isIt ? "STRUTTURAZIONE" : "STRUCTURE",
      title: isIt ? "Mappatura standard Modulo CAI" : "CAI standard mapping",
      actor: isIt ? "Regole deterministiche • Casella 12 Modulo Blu" : "Deterministic rules • Box 12 European Form",
      description: isIt
        ? "Il sistema separa rigorosamente i fatti osservati dalle ipotesi. I rilievi vengono mappati fedelmente nelle caselle della Constatazione Amichevole Europea senza inventare dinamiche arbitrarie."
        : "Observed facts are strictly separated from hypotheses. Recorded dynamics map deterministically into European Accident Statement circumstances (Box 12) without unverified guesswork.",
      spec: isIt ? "Modulo Blu Europeo Casella 12" : "European Blue Form Box 12",
      cardBadge: isIt ? "MAPPATURA REGOLATORIA" : "REGULATORY MAPPING",
      cardTitle: isIt ? "Allineamento Caselle CAI" : "CAI Circumstance Matrix",
      metrics: [
        { label: isIt ? "Veicolo A" : "Vehicle A", val: "Circostanza 7 (Rotatoria)" },
        { label: isIt ? "Veicolo B" : "Vehicle B", val: "Circostanza 6 (Immissione)" },
        { label: isIt ? "Ambiguità risolta" : "Ambiguity resolution", val: "0% allucinazione" },
      ],
    },
    {
      step: "04",
      phase: "REVIEW",
      phaseLabel: isIt ? "REVISIONE" : "REVIEW",
      title: isIt ? "Revisione e delibera peritale" : "Adjuster review and settlement",
      actor: isIt ? "Liquidatore umano abilitato • Ufficio Sinistri" : "Licensed human adjuster • Claims desk",
      description: isIt
        ? "Il liquidatore riceve nella Console Sinistri un fascicolo completo e ordinato. Nessun algoritmo stabilisce la colpa: la valutazione legale e la liquidazione economica rimangono interamente umane."
        : "Insurance adjusters receive a complete, calibrated dossier inside the Claims Console. The system never decrees legal fault: liability and settlement remain exclusively human.",
      spec: isIt ? "Supervisione & Delibera Umana" : "Human Authority & Adjudication",
      cardBadge: isIt ? "DELIBERA PERITALE" : "ADJUSTER VERDICT",
      cardTitle: isIt ? "Fascicolo Validato per Liquidazione" : "Validated Claim Dossier",
      metrics: [
        { label: isIt ? "Stato dossier" : "Dossier status", val: "Calibrated & Signed" },
        { label: isIt ? "Impronta crittografica" : "Cryptographic hash", val: "SHA-256 Verified" },
        { label: isIt ? "Autorità deliberante" : "Adjudication authority", val: "Liquidatore Umano" },
      ],
    },
  ];

  return (
    <PublicShell>
      {/* Header Scene */}
      <section className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-6">
          <TechnicalReveal className="text-xs sm:text-sm font-medium text-[#555555]">
            {isIt ? "Il ciclo operativo del sinistro" : "The claim lifecycle"}
          </TechnicalReveal>
          <EditorialReveal
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0E0F10] leading-[1.04] uppercase max-w-5xl"
          >
            {isIt ? (
              <>
                Dalla collisione alla perizia.
                <br />
                Un processo continuo e verificabile.
              </>
            ) : (
              <>
                From impact to adjuster intake.
                <br />
                A continuous, verifiable progression.
              </>
            )}
          </EditorialReveal>
          <p className="text-lg sm:text-2xl text-[#666666] leading-relaxed max-w-3xl font-light">
            {isIt
              ? "Nessuna confusione cartacea, nessun ritardo di quaranta giorni. Una sequenza a quattro tappe progettata con disciplina per automobilisti e periti."
              : "Zero paper confusion, zero 40-day claim latency. A 4-stage progression engineered with discipline for drivers and claims teams."}
          </p>

          {/* Spatial Pipeline Continuity Rail */}
          <div className="pt-8 border-t border-[#E5E5E3]">
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#666666]">
              <span className="font-bold text-[#0E0F10]">01 CAPTURE</span>
              <span className="text-[#999999]">→</span>
              <span className="font-bold text-[#0E0F10]">02 INTERPRET</span>
              <span className="text-[#999999]">→</span>
              <span className="font-bold text-[#0E0F10]">03 STRUCTURE</span>
              <span className="text-[#999999]">→</span>
              <span className="font-bold text-[#0E0F10]">04 REVIEW</span>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Process Film: Large Vertically Sequenced Scenes */}
      <div className="w-full bg-[#F7F7F6]">
        {platformStages.map((stage) => (
          <section
            key={stage.step}
            className="w-full border-b border-[#E5E5E3] py-24 lg:py-32"
          >
            <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Left Column: Stage Identifier & Role */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0E0F10] block leading-none">
                    {stage.step}
                  </span>
                  <span className="text-xs font-mono tracking-widest text-[#777777] uppercase">
                    / {stage.phaseLabel}
                  </span>
                </div>
                <span className="text-xs font-medium text-[#666666] block">
                  {stage.actor}
                </span>

                {/* Tactile Data Preview Card */}
                <PerspectiveCard className="pt-4" maxTilt={5}>
                  <div className="bg-white border border-[#E5E5E3] rounded-xl p-5 sm:p-6 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E3]">
                      <span className="text-[11px] font-mono tracking-wider text-[#777777] uppercase">
                        {stage.cardBadge}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="text-sm font-bold text-[#0E0F10]">
                      {stage.cardTitle}
                    </div>
                    <div className="space-y-2 pt-1 text-xs">
                      {stage.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="flex justify-between items-center text-[#555555]">
                          <span>{m.label}</span>
                          <span className="font-mono font-medium text-[#0E0F10]">{m.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </PerspectiveCard>
              </div>

              {/* Right Column: Stage Description & Standards */}
              <div className="lg:col-span-7 space-y-6 pt-2">
                <RevealText
                  as="h2"
                  mode="word"
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#0E0F10] leading-tight"
                >
                  {stage.title}
                </RevealText>
                <p className="text-lg sm:text-xl text-[#666666] font-light leading-relaxed max-w-2xl">
                  {stage.description}
                </p>
                <div className="pt-6 border-t border-[#E5E5E3] flex items-center justify-between text-xs text-[#555555]">
                  <span>{isIt ? "Riferimento normativo" : "Standard specification"}</span>
                  <span className="font-medium text-[#0E0F10] font-mono">{stage.spec}</span>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Closing CTA */}
      <section className="py-20 bg-white">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold uppercase text-[#0E0F10]">
              {isIt ? "Inizia la segnalazione" : "Begin roadside report"}
            </h3>
            <p className="text-sm text-[#666666] mt-1 font-light">
              {isIt ? "Sperimenta il flusso di segnalazione per automobilisti." : "Experience the consumer driver workflow."}
            </p>
          </div>
          <Link
            href="/app/report"
            className="group inline-flex items-center justify-center gap-2 min-h-[52px] px-8 bg-[#0E0F10] text-white text-xs font-bold tracking-wider uppercase hover:bg-black transition-colors"
          >
            <span>{isIt ? "Segnala un sinistro" : "Report an accident"}</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </section>
    </PublicShell>
  );
}
