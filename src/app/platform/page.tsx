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
      title: isIt ? "Rilievo Immediato Sul Posto" : "Roadside Incident Capture",
      actor: isIt ? "Conducente / Assicurato" : "Driver / Policyholder",
      description: isIt
        ? "Subito dopo la collisione, la web app guida l'incolumità personale (chiamata rapida 112, giubbotto catarifrangente) e impone 4 rilievi fotografici ortogonali con metadati GNSS ed EXIF non modificabili."
        : "Immediately post-collision, the web client prioritizes human safety (direct 112 dialer, hazard triangle) and guides the driver through 4 calibrated orthogonal evidence photos with immutable GNSS timestamps.",
      tag: "CAPTURE • FORENSIC FUSION",
    },
    {
      step: "02",
      title: isIt ? "Strutturazione Multimodale" : "Multimodal Evidence Structuring",
      actor: isIt ? "Ingegneria di Estrazione Dati" : "Ingestion & Kinematics Engine",
      description: isIt
        ? "Le fotografie isolano la zona d'urto e l'OCR legge la targa della controparte. Quando disponibile, la telemetria di bordo CAN-bus a 10Hz correla le curve di decelerazione con il millisecondo esatto del contatto."
        : "Visual analysis isolates contact damage zones while license plate OCR validates counterparty registration. Where CAN-bus telemetry exists, 10Hz deceleration vectors cross-reference physical impact timestamps.",
      tag: "STRUCTURE • SENSOR FUSION",
    },
    {
      step: "03",
      title: isIt ? "Demarcazione Epistemica & CAI" : "Evidentiary Demarcation & CAI",
      actor: isIt ? "Regole Deterministiche CAI" : "Epistemic Analysis & Box 12",
      description: isIt
        ? "Il sistema separa i fatti provati dalle ipotesi. I rilievi vengono mappati fedelmente nelle caselle della Constatazione Amichevole Europea (CAI Modulo Blu, Casella 12) senza inventare dinamiche non verificate."
        : "Observed facts are strictly separated from hypotheses. Recorded dynamics are deterministically mapped into European Accident Statement circumstances (CAI Box 12) without unverified guesswork.",
      tag: "DEMARCATION • CAI PROTOCOL",
    },
    {
      step: "04",
      title: isIt ? "Perizia Umana e Convalida" : "Human-in-the-Loop Claims Triage",
      actor: isIt ? "Perito / Liquidatore Assicurativo" : "Forensic Adjuster / SIU",
      description: isIt
        ? "Il liquidatore riceve nella Console Sinistri un fascicolo pre-organizzato, completo di schema grafico d'urto, vettori e audit trail crittografico. Nessun algoritmo stabilisce la colpa: la decisione finale rimane esclusivamente umana."
        : "Insurance adjusters receive a complete, calibrated dossier inside the Claims Console. The system never decrees legal fault or percentage liability. Human professionals retain sole decision authority.",
      tag: "REVIEW • HUMAN AUTHORITY",
    },
  ];

  return (
    <PublicShell>
      {/* Header Scene */}
      <section className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-6">
          <TechnicalReveal className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#666666]">
            {isIt ? "IL CICLO DEL SINISTRO" : "THE INTAKE & TRIAGE LIFECYCLE"}
          </TechnicalReveal>
          <EditorialReveal
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0E0F10] leading-[1.04] uppercase max-w-5xl"
          >
            {isIt ? (
              <>
                Dalla collisione alla perizia.
                <br />
                Un processo cinematografico continuo.
              </>
            ) : (
              <>
                From impact to adjuster intake.
                <br />
                A continuous forensic progression.
              </>
            )}
          </EditorialReveal>
          <p className="text-lg sm:text-2xl text-[#666666] leading-relaxed max-w-3xl font-light">
            {isIt
              ? "Nessuna confusione cartacea, nessun ritardo di 40 giorni. Una sequenza a 4 tappe progettata con disciplina ingegneristica per automobilisti e compagnie."
              : "Zero paper confusion, zero 42-day claim latency. A 4-stage progression engineered for roadside drivers and insurance claims teams."}
          </p>
        </div>
      </section>

      {/* Visual Process Film: Large Vertically Sequenced Scenes */}
      <div className="w-full bg-[#F7F7F6]">
        {platformStages.map((stage) => (
          <section
            key={stage.step}
            className="w-full border-b border-[#E5E5E3] py-28 lg:py-36"
          >
            <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-baseline">
              {/* Left Column: Giant Step Identifier */}
              <div className="lg:col-span-4 space-y-3">
                <span className="text-6xl sm:text-8xl lg:text-9xl font-black font-mono tracking-tighter text-[#0E0F10] block leading-none">
                  {stage.step}
                </span>
                <span className="text-xs uppercase tracking-wider text-[#666666] font-semibold block">
                  {stage.tag}
                </span>
                <span className="text-xs font-semibold tracking-wider uppercase text-[#0E0F10] block pt-2">
                  ACTOR: {stage.actor}
                </span>
              </div>

              {/* Right Column: Stage Description & Standards */}
              <div className="lg:col-span-8 space-y-6">
                <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#0E0F10] leading-tight">
                  {stage.title}
                </h2>
                <p className="text-lg sm:text-xl text-[#666666] font-light leading-relaxed max-w-3xl">
                  {stage.description}
                </p>
                <div className="pt-4 border-t border-[#E5E5E3] flex items-center justify-between text-xs text-[#666666] font-medium uppercase tracking-wider">
                  <span>STANDARD AUDIT CHECKPOINT</span>
                  <span className="font-mono">EVIDENCE INTEGRITY SHA-256</span>
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
