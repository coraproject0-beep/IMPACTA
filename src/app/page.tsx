"use client";

import React from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { HeroMedia } from "@/components/public/HeroMedia";
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

  const reportLink = isDriverAuthenticated ? "/app/report" : "/login?redirect=/app/report";

  return (
    <>
      {/* 1. MEDIA-FIRST SIGNATURE HERO (100svh Cover matching public-brand-reference.png) */}
      <section className="relative w-full min-h-[100svh] flex flex-col justify-start text-white bg-[#0E0F10] overflow-hidden pt-32 sm:pt-36 lg:pt-40 xl:pt-44 pb-16">
        {/* Full-Viewport Native Video Element */}
        <HeroMedia videoSrc="/media/impacta-hero.mp4" />

        {/* Directional contrast vignette: covers the text area behind text, leaving the car on the right 100% visible and vivid */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[65%] lg:w-[55%] bg-gradient-to-r from-[#0E0F10]/95 via-[#0E0F10]/60 to-transparent pointer-events-none z-0" />

        {/* Hero Content Container positioned in negative space */}
        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 my-auto">
          <div className={`space-y-6 sm:space-y-8 ${isIt ? "max-w-xl sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl" : "max-w-xl lg:max-w-2xl"}`}>
            <h1
              className={`font-bold tracking-[-0.03em] uppercase leading-[0.93] text-white ${
                isIt
                  ? "text-[2.65rem] sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5.5rem] 2xl:text-[6.25rem]"
                  : "text-5xl sm:text-7xl lg:text-8xl xl:text-[6.5rem]"
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

      {/* 2. POST-HERO TRANSITION SCENE (Unboxed, pure typography on large off-white surface) */}
      <section
        id="fragments"
        className="py-32 sm:py-48 px-8 sm:px-12 lg:px-20 bg-[#F7F7F6] text-[#0E0F10] border-t border-[#E5E5E3]"
      >
        <div className="max-w-4xl space-y-12">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0E0F10] uppercase leading-[1.04]">
            {isIt ? "Un incidente crea frammenti." : "An accident creates fragments."}
          </h2>

          <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#666666] space-y-2 leading-relaxed">
            <p>{isIt ? "Foto." : "Photos."}</p>
            <p>{isIt ? "Dichiarazioni." : "Statements."}</p>
            <p>{isIt ? "Dati del veicolo." : "Vehicle information."}</p>
            <p>{isIt ? "Contesto." : "Context."}</p>
          </div>

          <p className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#0E0F10] uppercase pt-4">
            {isIt ? "IMPACTA li unisce." : "IMPACTA brings them together."}
          </p>
        </div>
      </section>
    </>
  );
}
