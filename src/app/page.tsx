"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { HeroMedia } from "@/components/public/HeroMedia";
import { RotatingStatement } from "@/components/motion/RotatingStatement";
import { RevealText } from "@/components/motion/RevealText";
import { PerspectiveCard } from "@/components/motion/PerspectiveCard";
import { MediaReveal } from "@/components/motion/MediaReveal";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import BlackBoxScene from "@/components/3d/BlackBoxScene";

export default function HomePage() {
  return (
    <PublicShell>
      <HomeContent />
    </PublicShell>
  );
}

function HomeContent() {
  const { locale, t } = useLanguage();
  const { isDriverAuthenticated } = useAuth();
  const isIt = locale === "it";
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const reportLink = isDriverAuthenticated ? "/app/report" : "/login?redirect=/app/report";

  return (
    <>
      {/* 1. MEDIA-FIRST SIGNATURE HERO (Clear breathing space under public header) */}
      <section className="relative w-full min-h-[100svh] flex flex-col justify-start text-white bg-[#0E0F10] overflow-hidden pt-[calc(var(--public-header-height,76px)+2.5rem)] sm:pt-[calc(var(--public-header-height,76px)+3.5rem)] lg:pt-[calc(var(--public-header-height,76px)+4.5rem)] pb-12 sm:pb-16">
        {/* Full-Viewport Native Video Element */}
        <HeroMedia videoSrc="/media/impacta-hero.mp4" />

        {/* Directional contrast vignette: covers the text area behind text, leaving the car on the right 100% visible and vivid */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[65%] lg:w-[55%] bg-gradient-to-r from-[#0E0F10]/95 via-[#0E0F10]/60 to-transparent pointer-events-none z-0" />

        {/* Hero Content Container positioned in negative space with guaranteed clearance */}
        <div
          className="relative z-10 w-full px-6 sm:px-12 lg:px-20 transition-transform duration-100 ease-out"
          style={{
            transform: `translateY(${Math.min(scrollY * 0.08, 24)}px)`,
            opacity: Math.max(1 - scrollY * 0.0012, 0.75),
          }}
        >
          <div className={`space-y-6 sm:space-y-8 ${isIt ? "max-w-xl sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl" : "max-w-xl lg:max-w-2xl"}`}>
            <h1
              className={`font-bold tracking-[-0.03em] uppercase leading-[0.93] text-white ${
                isIt
                  ? "text-4xl sm:text-6xl md:text-7xl lg:text-[4.25rem] xl:text-[5.25rem] 2xl:text-[6rem]"
                  : "text-4xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5.5rem] 2xl:text-[6.25rem]"
              }`}
            >
              {isIt ? (
                <>
                  <span className="block">
                    <RevealText as="span" mode="word" triggerOnScroll={false}>
                      DALL&apos;IMPATTO
                    </RevealText>
                  </span>
                  <span className="block whitespace-nowrap">
                    <RevealText as="span" mode="word" delay={0.15} triggerOnScroll={false}>
                      ALLA CHIAREZZA.
                    </RevealText>
                  </span>
                </>
              ) : (
                <>
                  <span className="block">
                    <RevealText as="span" mode="word" triggerOnScroll={false}>
                      FROM IMPACT
                    </RevealText>
                  </span>
                  <span className="block whitespace-nowrap">
                    <RevealText as="span" mode="word" delay={0.15} triggerOnScroll={false}>
                      TO CLARITY.
                    </RevealText>
                  </span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-white/85 max-w-lg font-normal leading-relaxed">
              {isIt
                ? "Trasforma le prove dell'incidente in informazioni strutturate per la revisione umana."
                : "Turn accident evidence into structured information ready for human review."}
            </p>

            {/* Restrained Action Row matching public-brand-reference.png */}
            <div className="flex flex-wrap items-center gap-8 sm:gap-10 pt-2 sm:pt-4">
              <Link
                href={reportLink}
                className="group inline-flex items-center gap-2 text-sm sm:text-base font-medium text-white hover:text-white/80 border-b border-white pb-1 transition-colors tracking-normal"
              >
                <span>{isIt ? "Segnala un sinistro" : "Report an accident"}</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                  →
                </span>
              </Link>
              <a
                href="#fragments"
                className="group inline-flex items-center gap-2 text-sm sm:text-base font-normal text-white/70 hover:text-white transition-colors tracking-normal"
              >
                <span>{isIt ? "Scopri come funziona IMPACTA" : "See how IMPACTA works"}</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true">
                  ↓
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POST-HERO TRANSITION SCENE (Authored Kinetic Motion Typography & Spatial Pacing) */}
      <section
        id="fragments"
        className="py-24 sm:py-36 lg:py-44 px-8 sm:px-12 lg:px-20 bg-[#F7F7F6] text-[#0E0F10] border-t border-[#E5E5E3] overflow-hidden"
      >
        <div className="max-w-6xl mx-auto space-y-16 lg:space-y-24">
          {/* Kinetic Statement */}
          <div className="max-w-5xl">
            <RotatingStatement
              prefix={isIt ? "Un incidente lascia" : "An accident leaves"}
              words={
                isIt
                  ? ["FOTOGRAFIE.", "DICHIARAZIONI.", "DANNI FISICI.", "TELEMETRIA.", "POSIZIONE."]
                  : ["PHOTOS.", "STATEMENTS.", "DAMAGE.", "TELEMETRY.", "LOCATION."]
              }
              suffix={
                isIt
                  ? "IMPACTA ricompone i singoli elementi in prove strutturate."
                  : "IMPACTA brings the evidence together into structured facts."
              }
              wordClassName="text-[#0E0F10] tracking-[-0.03em]"
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold"
              layout="stacked"
            />
          </div>

          {/* Spatial Editorial Bridge (Preparing for the Black Box) */}
          <div className="pt-12 sm:pt-16 border-t border-[#E5E5E3] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs sm:text-sm font-medium text-[#555555]">
                {isIt ? "Dalla frammentazione alla certezza" : "From fragmentation to certainty"}
              </span>
              <RevealText
                as="h3"
                mode="word"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0E0F10] tracking-tight leading-tight"
              >
                {isIt
                  ? "I rilievi sul campo diventano elementi probatori verificabili."
                  : "Field evidence transformed into verifiable proof."}
              </RevealText>
            </div>

            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#555555] font-light leading-relaxed">
              <p>
                {isIt
                  ? "Fotografie georeferenziate, dichiarazioni concordate e telemetria di bordo vengono ricomposte in una sequenza temporale continua, eliminando le contraddizioni dei moduli cartacei."
                  : "Georeferenced photography, aligned driver statements, and connected vehicle telemetry are synthesized into an unbroken evidentiary timeline, eliminating the ambiguities of manual paper reports."}
              </p>
              <p>
                {isIt
                  ? "Nessuna scatola nera opaca, nessuna sentenza automatica: il sistema struttura i fatti oggettivi per la valutazione dei periti umani abilitati."
                  : "Zero opaque decrees, zero automated fault verdicts: our pipeline structures empirical facts to empower licensed human adjusters."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EDITORIAL TONAL TRANSITION INTO THE BLACK BOX */}
      <div className="w-full bg-gradient-to-b from-[#F7F7F6] via-[#0E0F12] to-[#000000] pt-28 pb-16 px-8 flex flex-col items-center justify-center text-center">
        <div className="w-px h-16 bg-gradient-to-b from-[#0E0F10]/20 via-white/30 to-white/60 mb-6" />
        <span className="text-xs uppercase tracking-[0.25em] text-white/50 font-mono">
          {isIt ? "RICOSTRUZIONE FORENSE IN TEMPO REALE" : "REAL-TIME FORENSIC RECONSTRUCTION"}
        </span>
      </div>

      {/* 4. CANONICAL BLACK BOX SIGNATURE EXPERIENCE (Scroll-Scrubbed Omni Motion Study) */}
      <BlackBoxScene />

      {/* 5. EDITORIAL TRANSITION OUT: INTO PRODUCT PLATFORMS */}
      <section
        id="platforms"
        className="w-full bg-gradient-to-b from-[#000000] via-[#0E0F12] to-[#F7F7F6] py-24 sm:py-32 px-8 sm:px-12 lg:px-20 border-b border-[#E5E5E3]"
      >
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/50 font-mono">
              {isIt ? "DALL'EVIDENZA ALL'AZIONE" : "FROM EVIDENCE TO ACTION"}
            </span>
            <RevealText
              as="h3"
              mode="word"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight"
            >
              {isIt
                ? "Una piattaforma unificata per conducenti e periti assicurativi."
                : "A unified platform for drivers and claims specialists."}
            </RevealText>
            <p className="text-base sm:text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
              {isIt
                ? "Dalla raccolta guidata delle prove sul luogo del sinistro fino all'analisi peritale in tempo reale."
                : "From guided roadside evidence capture to real-time adjuster forensic review."}
            </p>
          </div>

          {/* Dual Product Platform Bento Cards with Tactile 3D Depth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Card 1: Driver Roadside Intake */}
            <PerspectiveCard className="h-full" maxTilt={4}>
              <div className="h-full bg-white border border-[#E5E5E3] rounded-2xl p-8 sm:p-10 flex flex-col justify-between shadow-sm hover:border-[#0E0F10] transition-colors group">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E3]">
                    <span className="text-xs font-mono tracking-wider uppercase text-[#777777]">
                      01 / {isIt ? "RILIEVO CONDUCENTE" : "DRIVER INTAKE"}
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                      {isIt ? "Attivo sul campo" : "Roadside active"}
                    </span>
                  </div>

                  <h4 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#0E0F10]">
                    {isIt ? "Esperienza Conducente" : "Driver Experience"}
                  </h4>

                  <p className="text-sm sm:text-base text-[#666666] font-light leading-relaxed">
                    {t("publicSections.driverExperienceDesc")}
                  </p>

                  <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-[#444444]">
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0E0F10]" />
                      <span>{t("publicSections.driverExperiencePoint1Title")}</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0E0F10]" />
                      <span>{t("publicSections.driverExperiencePoint2Title")}</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0E0F10]" />
                      <span>{t("publicSections.driverExperiencePoint3Title")}</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <Link
                    href={reportLink}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0E0F10] group-hover:text-black transition-colors"
                  >
                    <span className="border-b border-[#0E0F10] pb-0.5">
                      {isIt ? "Avvia segnalazione sinistro" : "Begin roadside report"}
                    </span>
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </PerspectiveCard>

            {/* Card 2: Insurer Claims Console */}
            <PerspectiveCard className="h-full" maxTilt={4}>
              <div className="h-full bg-white border border-[#E5E5E3] rounded-2xl p-8 sm:p-10 flex flex-col justify-between shadow-sm hover:border-[#0E0F10] transition-colors group">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E3]">
                    <span className="text-xs font-mono tracking-wider uppercase text-[#777777]">
                      02 / {isIt ? "CONSOLE PERITI" : "ADJUSTER CONSOLE"}
                    </span>
                    <span className="text-xs font-semibold text-amber-900 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                      {isIt ? "Controllo forense" : "Forensic intake"}
                    </span>
                  </div>

                  <h4 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#0E0F10]">
                    {isIt ? "Portale Periti & Assicuratori" : "Insurer & Adjuster Portal"}
                  </h4>

                  <p className="text-sm sm:text-base text-[#666666] font-light leading-relaxed">
                    {t("publicSections.insurerOpsDesc")}
                  </p>

                  <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-[#444444]">
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0E0F10]" />
                      <span>{t("publicSections.insurerOpsPoint1Title")}</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0E0F10]" />
                      <span>{t("publicSections.insurerOpsPoint2Title")}</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0E0F10]" />
                      <span>{t("publicSections.insurerOpsPoint3Title")}</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <Link
                    href="/insurers"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0E0F10] group-hover:text-black transition-colors"
                  >
                    <span className="border-b border-[#0E0F10] pb-0.5">
                      {isIt ? "Esplora console liquidatori" : "Explore adjuster workbench"}
                    </span>
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </PerspectiveCard>
          </div>
        </div>
      </section>
    </>
  );
}
