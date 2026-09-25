"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { HeroMedia } from "@/components/public/HeroMedia";
import { RotatingStatement } from "@/components/motion/RotatingStatement";
import { EvidenceDiscoveryReveal } from "@/components/motion/EvidenceDiscoveryReveal";
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
      {/* 1. MEDIA-FIRST SIGNATURE HERO (100svh Cover matching public-brand-reference.png) */}
      <section className="relative w-full min-h-[100svh] flex flex-col justify-start text-white bg-[#0E0F10] overflow-hidden pt-28 sm:pt-32 lg:pt-36 xl:pt-40 pb-16">
        {/* Full-Viewport Native Video Element */}
        <HeroMedia videoSrc="/media/impacta-hero.mp4" />

        {/* Directional contrast vignette: covers the text area behind text, leaving the car on the right 100% visible and vivid */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[65%] lg:w-[55%] bg-gradient-to-r from-[#0E0F10]/95 via-[#0E0F10]/60 to-transparent pointer-events-none z-0" />

        {/* Hero Content Container positioned in negative space with subtle scroll-linked depth */}
        <div
          className="relative z-10 w-full px-6 sm:px-12 lg:px-20 my-auto transition-transform duration-100 ease-out"
          style={{
            transform: `translateY(${Math.min(scrollY * 0.1, 40)}px)`,
            opacity: Math.max(1 - scrollY * 0.0012, 0.75),
          }}
        >
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

      {/* 2. POST-HERO TRANSITION SCENE (Authored 3D Motion Typography & Evidence Discovery) */}
      <section
        id="fragments"
        className="py-28 sm:py-36 px-8 sm:px-12 lg:px-20 bg-[#F7F7F6] text-[#0E0F10] border-t border-[#E5E5E3] overflow-hidden"
      >
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Motion Statement */}
          <div className="max-w-4xl space-y-6">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0E0F10] uppercase leading-[1.06]">
              <RotatingStatement
                prefix={isIt ? "Un incidente lascia" : "An accident leaves"}
                words={
                  isIt
                    ? ["FOTOGRAFIE.", "DICHIARAZIONI.", "DANNI FISICI.", "TELEMETRIA.", "POSIZIONE."]
                    : ["PHOTOS.", "STATEMENTS.", "DAMAGE.", "TELEMETRY.", "LOCATION."]
                }
                wordClassName="text-[#0E0F10] underline decoration-[#0E0F10]/20 decoration-2 underline-offset-8"
              />
            </h2>

            <p className="text-xl sm:text-3xl lg:text-4xl font-light text-[#555555] leading-snug pt-2">
              {isIt ? (
                <>
                  IMPACTA ricompone i singoli elementi in{" "}
                  <span className="font-bold text-[#0E0F10]">prove strutturate</span> per la revisione peritale.
                </>
              ) : (
                <>
                  IMPACTA brings the evidence together into{" "}
                  <span className="font-bold text-[#0E0F10]">structured facts</span> ready for human review.
                </>
              )}
            </p>
          </div>

          {/* Interactive Evidence Discovery Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center pt-8 border-t border-[#E5E5E3]">
            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#E5E5E3] bg-[#0E0F10]">
              <EvidenceDiscoveryReveal
                baseImageSrc="/images/evidence-scene.jpg"
                revealedImageSrc="/images/evidence-scene.jpg"
                alt="Accident scene photographic inspection"
                overlayText={isIt ? "RILIEVO PROBATORIO • ISO 21434" : "EVIDENTIARY CAPTURE • CALIBRATED"}
              />
            </div>
            <div className="lg:col-span-5 space-y-5 text-sm text-[#555555]">
              <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[#0E0F10]">
                {isIt ? "01 / Dalla frammentazione alla certezza" : "01 / From fragments to certainty"}
              </div>
              <h3 className="text-2xl font-bold text-[#0E0F10] tracking-tight">
                {isIt
                  ? "Dettagli invisibili a occhio nudo, registrati con rigore metrico."
                  : "Invisible details captured with metric rigor."}
              </h3>
              <p className="leading-relaxed">
                {isIt
                  ? "Ogni rilievo fotografico viene correlato con coordinate satellitari, orientamento della carreggiata e curve dinamiche del veicolo, eliminando le incertezze dei moduli cartacei."
                  : "Every photograph is synchronized with satellite positioning, road heading, and vehicle kinematics to eliminate the ambiguity of manual roadside forms."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
