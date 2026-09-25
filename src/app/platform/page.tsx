"use client";

import React from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { TechnicalReveal } from "@/components/motion/TechnicalReveal";
import { useLanguage } from "@/context/LanguageContext";

export default function PlatformPage() {
  const { language } = useLanguage();
  const isIt = language === "it";

  const platformStages = [
    {
      step: "01",
      title: isIt ? "Rilievo sul ciglio della strada" : "Roadside incident capture",
      actor: isIt ? "Conducente sul posto" : "Roadside driver",
      description: isIt
        ? "Subito dopo la collisione, l'applicazione guida prima l'incolumità personale (chiamata di emergenza 112, giubbotto catarifrangente) e poi 4 fotografie guidate con coordinate GNSS e orientamento della carreggiata."
        : "Immediately post-collision, the web client prioritizes physical safety (direct 112 dialer, safe refuge guidance) followed by 4 calibrated evidence photos with GNSS coordinates and road heading.",
      spec: isIt ? "Foto e orientamento spaziale" : "Photographs & spatial heading",
    },
    {
      step: "02",
      title: isIt ? "Strutturazione dei dati metrici" : "Metric data structuring",
      actor: isIt ? "Pipeline di calibrazione" : "Calibration pipeline",
      description: isIt
        ? "Le fotografie isolano la zona di contatto e leggono la targa della controparte. Quando disponibile, la telemetria di bordo CAN-bus a 10Hz correla i profili di decelerazione con il millisecondo esatto del contatto."
        : "Visual analysis isolates contact zones and validates counterparty registration. Where CAN-bus telemetry exists, 10Hz deceleration curves synchronize with the exact contact timestamp.",
      spec: isIt ? "Telemetria 10Hz & OCR" : "10Hz telemetry & OCR",
    },
    {
      step: "03",
      title: isIt ? "Mappatura standard Modulo CAI" : "CAI standard mapping",
      actor: isIt ? "Regole CAI Casella 12" : "CAI Box 12 Standard",
      description: isIt
        ? "Il sistema separa rigorosamente i fatti osservati dalle ipotesi. I rilievi vengono mappati fedelmente nelle caselle della Constatazione Amichevole Europea senza inventare dinamiche arbitrarie."
        : "Observed facts are strictly separated from hypotheses. Recorded dynamics map deterministically into European Accident Statement circumstances (Box 12) without unverified guesswork.",
      spec: isIt ? "Modulo Blu europeo" : "European Blue Form",
    },
    {
      step: "04",
      title: isIt ? "Revisione e delibera peritale" : "Adjuster review and settlement",
      actor: isIt ? "Liquidatore e perito" : "Claims adjuster",
      description: isIt
        ? "Il liquidatore riceve nella Console Sinistri un fascicolo completo e ordinato. Nessun algoritmo stabilisce la colpa: la valutazione legale e la liquidazione economica rimangono interamente umane."
        : "Insurance adjusters receive a complete, calibrated dossier inside the Claims Console. The system never decrees legal fault: liability and settlement remain exclusively human.",
      spec: isIt ? "Supervisione umana" : "Human authority",
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
        </div>
      </section>

      {/* Visual Process Film: Large Vertically Sequenced Scenes */}
      <div className="w-full bg-[#F7F7F6]">
        {platformStages.map((stage) => (
          <section
            key={stage.step}
            className="w-full border-b border-[#E5E5E3] py-24 lg:py-32"
          >
            <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-baseline">
              {/* Left Column: Giant Step Identifier */}
              <div className="lg:col-span-4 space-y-3">
                <span className="text-7xl sm:text-8xl lg:text-9xl font-black font-mono tracking-tighter text-[#0E0F10] block leading-none">
                  {stage.step}
                </span>
                <span className="text-xs font-mono font-medium text-[#555555] block">
                  {stage.actor}
                </span>
              </div>

              {/* Right Column: Stage Description & Standards */}
              <div className="lg:col-span-8 space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#0E0F10] leading-tight">
                  {stage.title}
                </h2>
                <p className="text-lg sm:text-xl text-[#666666] font-light leading-relaxed max-w-3xl">
                  {stage.description}
                </p>
                <div className="pt-4 border-t border-[#E5E5E3] flex items-center justify-between text-xs text-[#555555]">
                  <span>{isIt ? "Specifica tecnica" : "Technical specification"}</span>
                  <span className="font-mono font-semibold text-[#0E0F10]">{stage.spec}</span>
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
            className="inline-flex items-center justify-center min-h-[52px] px-8 bg-[#0E0F10] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#1A1B1C] transition-colors"
          >
            {isIt ? "Segnala un sinistro" : "Report an accident"}
          </Link>
        </div>
      </section>
    </PublicShell>
  );
}
