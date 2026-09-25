"use client";

import React from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { TechnicalReveal } from "@/components/motion/TechnicalReveal";
import { FullBleedImage } from "@/components/motion/FullBleedImage";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function DriversPage() {
  const { language, t } = useLanguage();
  const { isDriverAuthenticated } = useAuth();
  const isIt = language === "it";
  const reportLink = isDriverAuthenticated ? "/app/report" : "/login?redirect=/app/report";

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
              className="inline-flex items-center justify-center min-h-[52px] px-8 bg-[#0E0F10] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#1A1B1C] transition-colors"
            >
              {t("nav.reportAccident")}
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
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-tight">
              {isIt ? "4 scatti guidati dal mirino" : "4 Guided Framing Angles"}
            </h2>
            <p className="text-base sm:text-xl text-white/70 font-light leading-relaxed max-w-2xl">
              {isIt
                ? "Il mirino a schermo guida la distanza e l'inclinazione per inquadrare entrambi i veicoli, la targa della controparte e la segnaletica stradale circostante."
                : "Dynamic on-screen framing guides distance and perspective to capture contact zones, counterparty license plates, and surrounding roadway markings."}
            </p>
          </div>
        </FullBleedImage>
      </section>

      {/* Narrative Section: Human Safety First */}
      <section className="py-24 sm:py-36 bg-[#F7F7F6] border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-baseline">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-medium text-[#DC2626]">
              {isIt ? "Protocollo di sicurezza 112" : "European emergency 112"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase text-[#0E0F10]">
              {isIt ? "La salute prima delle perizie" : "Human safety precedes data intake"}
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#666666] font-light leading-relaxed">
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
