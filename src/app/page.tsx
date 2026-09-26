"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { HeroMedia } from "@/components/public/HeroMedia";
import { RotatingStatement } from "@/components/motion/RotatingStatement";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  return (
    <PublicShell>
      <HomeContent />
    </PublicShell>
  );
}

function HomeContent() {
  const { locale } = useLanguage();
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
                  <span className="block">DALL&apos;IMPATTO</span>
                  <span className="block whitespace-nowrap">ALLA CHIAREZZA.</span>
                </>
              ) : (
                <>
                  <span className="block">FROM IMPACT</span>
                  <span className="block whitespace-nowrap">TO CLARITY.</span>
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
                className="text-sm sm:text-base font-medium text-white hover:text-white/80 border-b border-white pb-1 transition-colors tracking-normal"
              >
                {isIt ? "Segnala un sinistro" : "Report an accident"}
              </Link>
              <a
                href="#fragments"
                className="text-sm sm:text-base font-normal text-white/70 hover:text-white transition-colors tracking-normal"
              >
                {isIt ? "Scopri come funziona IMPACTA" : "See how IMPACTA works"}
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
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0E0F10] tracking-tight leading-tight">
                {isIt
                  ? "I rilievi sul campo diventano elementi probatori verificabili."
                  : "Field evidence transformed into verifiable proof."}
              </h3>
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
    </>
  );
}
