"use client";

import React from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { TechnicalReveal } from "@/components/motion/TechnicalReveal";
import { RevealText } from "@/components/motion/RevealText";
import { PerspectiveCard } from "@/components/motion/PerspectiveCard";
import { FullBleedImage } from "@/components/motion/FullBleedImage";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function DriversPage() {
  const { language, t } = useLanguage();
  const { isDriverAuthenticated } = useAuth();
  const isIt = language === "it";
  const reportLink = isDriverAuthenticated ? "/app/report" : "/login?redirect=/app/report";

  const opticalAngles = [
    {
      num: "01",
      title: isIt ? "Panoramica della Scena" : "Scene Context & Overview",
      distance: isIt ? "5–10 metri di distanza" : "5–10m broad field",
      desc: isIt
        ? "Inquadra entrambi i veicoli fermi, la segnaletica stradale e la linea di mezzeria per chiarire l'orientamento della carreggiata."
        : "Captures both stationary vehicles, road signage, and lane markings to establish physical heading and roadway geometry.",
    },
    {
      num: "02",
      title: isIt ? "Punto di Contatto Veicolo A" : "Vehicle Contact Point",
      distance: isIt ? "1–2 metri di distanza" : "1–2m perpendicular",
      desc: isIt
        ? "Inquadratura ortogonale del danno superficiale e strutturale sulla Golf VIII, evidenziando il trasferimento di vernice."
        : "Orthogonal framing on vehicle body damage and deformation depth, recording paint transfer and crease lines.",
    },
    {
      num: "03",
      title: isIt ? "Controparte e Targa" : "Counterparty & Plate",
      distance: isIt ? "2–3 metri con OCR" : "2–3m optical lock",
      desc: isIt
        ? "Riconoscimento automatico della targa e inquadratura della posizione relativa della controparte al momento del contatto."
        : "Automated OCR license plate recognition and counterparty position relative to the primary collision axis.",
    },
    {
      num: "04",
      title: isIt ? "Segnaletica e Dettagli" : "Road Markings & Detritus",
      distance: isIt ? "Dettaglio ravvicinato" : "Close evidentiary framing",
      desc: isIt
        ? "Fotografia del certificato di assicurazione, detriti a terra o tracce di frenata prima di sgomberare la corsia."
        : "European Green Card documentation, roadway debris dispersion, or tire scrub marks before clearing traffic lanes.",
    },
  ];

  return (
    <PublicShell>
      {/* Hero Header */}
      <section className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-6">
          <TechnicalReveal className="text-xs sm:text-sm font-medium text-[#555555]">
            {isIt ? "Protocollo per il conducente" : "Driver roadside protocol"}
          </TechnicalReveal>
          <EditorialReveal
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0E0F10] leading-[1.04] uppercase max-w-5xl"
          >
            {isIt ? (
              <>
                Nessuna burocrazia.
                <br />
                Solo chiarezza sul ciglio della strada.
              </>
            ) : (
              <>
                Zero paperwork panic.
                <br />
                Calm guidance at the roadside.
              </>
            )}
          </EditorialReveal>
          <p className="text-lg sm:text-2xl text-[#666666] leading-relaxed max-w-3xl font-light">
            {isIt
              ? "Gli incidenti provocano disorientamento. IMPACTA sostituisce i moduli CAI cartacei e i call center con una sequenza guidata che protegge prima la vostra incolumità fisica e poi le vostre ragioni assicurative."
              : "Road accidents are traumatic and disorienting. IMPACTA replaces paper forms with an empathetic intake assistant that secures your safety first, then captures your photographic evidence."}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              href={reportLink}
              className="group inline-flex items-center justify-center gap-2 min-h-[52px] px-8 bg-[#0E0F10] text-white text-xs font-bold tracking-wider uppercase hover:bg-black transition-colors"
            >
              <span>{t("nav.reportAccident")}</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                →
              </span>
            </Link>
            <Link
              href="/app"
              className="inline-flex items-center justify-center min-h-[52px] px-8 border border-[#E5E5E3] text-[#0E0F10] text-xs font-semibold tracking-wider uppercase hover:border-[#0E0F10] transition-colors"
            >
              {isIt ? "Accedi all'Area Personale" : "Open Driver Personal Area"}
            </Link>
          </div>
        </div>
      </section>

      {/* Photography Section: Roadside Guidance (Full Bleed) */}
      <section className="relative w-full bg-[#0E0F10] text-white">
        <FullBleedImage
          src="/images/hero-car.jpg"
          alt="Driver vehicle inspection"
          overlayClassName="bg-gradient-to-t from-[#0E0F10] via-[#0E0F10]/50 to-transparent"
        >
          <div className="max-w-4xl space-y-6">
            <span className="text-xs font-medium text-white/60">
              {isIt ? "Rilevamento ottico guidato" : "Calibrated optical capture"}
            </span>
            <RevealText
              as="h2"
              mode="word"
              className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-tight"
            >
              {isIt ? "4 scatti guidati dal mirino" : "4 Guided Framing Angles"}
            </RevealText>
            <p className="text-base sm:text-xl text-white/70 font-light leading-relaxed max-w-2xl">
              {isIt
                ? "Il mirino a schermo guida la distanza e l'inclinazione per inquadrare entrambi i veicoli, la targa della controparte e la segnaletica stradale circostante."
                : "Dynamic on-screen framing guides distance and perspective to capture contact zones, counterparty license plates, and surrounding roadway markings."}
            </p>
          </div>
        </FullBleedImage>
      </section>

      {/* 4 Optical Angles Bento Detail Grid */}
      <section className="py-20 sm:py-28 bg-white border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#777777]">
              {isIt ? "SPECIFICA INGESTION OTTICA" : "OPTICAL INGESTION SPECIFICATION"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#0E0F10]">
              {isIt ? "Geometria di Rilievo Obbligatoria" : "Required Evidentiary Geometry"}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {opticalAngles.map((angle) => (
              <PerspectiveCard key={angle.num} maxTilt={4} className="h-full">
                <div className="h-full bg-[#F7F7F6] border border-[#E5E5E3] rounded-xl p-6 flex flex-col justify-between space-y-4 hover:border-[#0E0F10] transition-colors">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-mono font-bold text-[#0E0F10]">
                        {angle.num}
                      </span>
                      <span className="text-[11px] font-mono text-[#777777]">
                        {angle.distance}
                      </span>
                    </div>
                    <h4 className="text-base font-bold uppercase text-[#0E0F10]">
                      {angle.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-light">
                      {angle.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#E5E5E3] text-[11px] font-mono text-[#555555] flex items-center justify-between">
                    <span>STATUS</span>
                    <span className="text-emerald-700 font-semibold">CALIBRATED</span>
                  </div>
                </div>
              </PerspectiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Section: Human Safety First */}
      <section className="py-24 sm:py-36 bg-[#F7F7F6] border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-medium text-[#DC2626]">
                {isIt ? "Protocollo di sicurezza 112" : "European emergency 112"}
              </span>
              <RevealText
                as="h2"
                mode="word"
                className="text-3xl sm:text-4xl font-bold uppercase text-[#0E0F10]"
              >
                {isIt ? "La salute prima delle perizie" : "Human safety precedes data intake"}
              </RevealText>
            </div>

            {/* Emergency Protocol Indicator Card */}
            <PerspectiveCard maxTilt={5}>
              <div className="bg-white border-2 border-red-200 rounded-xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-red-100">
                  <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider">
                    {isIt ? "ESCALATION EMERGENZA" : "EMERGENCY ESCALATION"}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-red-100 text-red-700 rounded">
                    112 DIRECT
                  </span>
                </div>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {isIt
                    ? "In caso di feriti o pericolo immediato, l'interfaccia interseca istantaneamente la rete di soccorso europea prima di qualsiasi richiesta documentale."
                    : "In the event of injuries or active roadway danger, intake locks to provide instant one-tap dialing to European emergency services."}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-medium text-red-600">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  <span>{isIt ? "Chiamata Rapida 112 attiva" : "112 Instant dialer standby"}</span>
                </div>
              </div>
            </PerspectiveCard>
          </div>

          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#666666] font-light leading-relaxed pt-2">
            <p>
              {isIt
                ? "Il primo passo del sistema verifica immediatamente se ci sono feriti o se qualcuno è intrappolato. In caso di pericolo, il tasto rosso mette istantaneamente in comunicazione con il Numero Unico Europeo 112 senza costringere a compilare moduli."
                : "The first step of our protocol explicitly evaluates physical distress. In the event of injuries, a dedicated 1-tap dialer escalates directly to European Emergency 112 without forcing any questionnaire completion."}
            </p>
            <p>
              {isIt
                ? "Solo una volta che tutti gli occupanti si trovano in un luogo sicuro fuori dalla carreggiata, l'interfaccia sblocca la registrazione dei dati."
                : "Only once all vehicle occupants are confirmed safe in a secure refuge area does the interface unlock photographic intake."}
            </p>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
