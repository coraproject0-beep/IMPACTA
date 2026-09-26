"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { HeroMedia } from "@/components/public/HeroMedia";
import { RotatingStatement } from "@/components/motion/RotatingStatement";
import { RevealText } from "@/components/motion/RevealText";
import { DriverVehicleScene3D } from "@/components/motion/DriverVehicleScene3D";
import { HomeClosingTransition } from "@/components/motion/HomeClosingTransition";
import { PartnerMarquee } from "@/components/public/PartnerMarquee";
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
                  <span className="block">
                    <RevealText as="span" mode="char" variant="depth" delay={0.05} triggerOnScroll={false}>
                      DALL&apos;IMPATTO
                    </RevealText>
                  </span>
                  <span className="block whitespace-nowrap">
                    <RevealText as="span" mode="char" variant="depth" delay={0.35} triggerOnScroll={false}>
                      ALLA CHIAREZZA.
                    </RevealText>
                  </span>
                </>
              ) : (
                <>
                  <span className="block">
                    <RevealText as="span" mode="char" variant="depth" delay={0.05} triggerOnScroll={false}>
                      FROM IMPACT
                    </RevealText>
                  </span>
                  <span className="block whitespace-nowrap">
                    <RevealText as="span" mode="char" variant="depth" delay={0.35} triggerOnScroll={false}>
                      TO CLARITY.
                    </RevealText>
                  </span>
                </>
              )}
            </h1>

            <div className="overflow-hidden">
              <RevealText as="p" mode="word" variant="depth" delay={0.75} triggerOnScroll={false} className="text-base sm:text-lg lg:text-xl text-white/85 max-w-lg font-normal leading-relaxed">
                {isIt
                  ? "Trasforma le prove dell'incidente in informazioni strutturate per la revisione umana."
                  : "Turn accident evidence into structured information ready for human review."}
              </RevealText>
            </div>

            {/* Restrained Action Row */}
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

          {/* Spatial Editorial Bridge */}
          <div className="pt-12 sm:pt-16 border-t border-[#E5E5E3] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs sm:text-sm font-medium text-[#555555]">
                {isIt ? "Dalla frammentazione alla certezza" : "From fragmentation to certainty"}
              </span>
              <RevealText
                as="h3"
                mode="char"
                variant="depth"
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
                  ? "Fotografie georeferenziate, dichiarazioni concordate e orientamento della carreggiata vengono ricomposte in una sequenza temporale continua, eliminando le contraddizioni dei moduli cartacei."
                  : "Georeferenced photography, aligned driver statements, and roadway orientation are synthesized into an unbroken evidentiary timeline, eliminating the ambiguities of manual paper reports."}
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

      {/* 3. CINEMATIC GRADIENT TRANSITION INTO THE BLACK BOX VOID (Progressive Dark Volume Corridor) */}
      <div className="w-full h-56 sm:h-80 lg:h-[420px] bg-gradient-to-b from-[#F7F7F6] via-[#2A2B2E] via-[#101114] via-[#050506] to-[#000000] pointer-events-none -mb-px" />

      {/* 4. CANONICAL BLACK BOX SIGNATURE EXPERIENCE (Continuous Autoplaying Cinematic Video) */}
      <BlackBoxScene />

      {/* 5. CINEMATIC TRANSITION OUT: INTO PRODUCT CHAPTERS */}
      <div className="w-full h-48 sm:h-72 lg:h-80 bg-gradient-to-b from-[#000000] via-[#050506] via-[#08090B] to-[#0E0F12] pointer-events-none -mt-px" />

      {/* 6. CHAPTER ONE — DRIVER ROADSIDE INTAKE */}
      <section
        id="driver-chapter"
        className="w-full bg-[#0E0F12] text-white py-24 sm:py-36 px-6 sm:px-12 lg:px-20 overflow-hidden relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Editorial Narrative */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                  {isIt ? "RILIEVO CONDUCENTE" : "DRIVER INTAKE"}
                </span>
                <RevealText
                  as="h2"
                  mode="char"
                  variant="depth"
                  className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.05]"
                >
                  {isIt
                    ? "Guida calma e chiara nei momenti critici."
                    : "Calm, guided clarity when accidents happen."}
                </RevealText>
              </div>

              <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-xl">
                {isIt
                  ? "Un incidente provoca ansia immediata. IMPACTA sostituisce la confusione con un flusso ordinato e protetto: prima la sicurezza fisica delle persone e la chiamata d'emergenza, poi l'acquisizione ordinata di veicoli, targhe e contesto."
                  : "Accidents trigger acute sensory overload. IMPACTA replaces panic with an authored, protective workflow: verifying human physical safety and emergency access first, then methodically capturing vehicle contact, plates, and road context."}
              </p>

              {/* Structural Editorial Points */}
              <div className="space-y-6 pt-4 border-t border-white/10">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                    {isIt ? "Prima di tutto la Sicurezza" : "Immediate Safety Protocol"}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                    {isIt
                      ? "Chiamata 112 con un tocco e indicazioni per posizionare il triangolo prima di ogni rilievo fotografico."
                      : "Direct 112 emergency dialing and hazard positioning check before photo capture begins."}
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                    {isIt ? "Rilievo a 4 Inquadrature Guidate" : "Four-Angle Scene Alignment"}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                    {isIt
                      ? "Guide visive a schermo garantiscono l'inquadratura di panoramica, targhe, documenti e punti d'urto."
                      : "On-screen guides calibrate framing for wide scene, license plates, documents, and vehicle contact points."}
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                    {isIt ? "Salvataggio Locale nel Browser" : "Local Browser Buffering"}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                    {isIt
                      ? "Memorizzazione automatica lato client: nessuna perdita di dati anche in zone prive di segnale."
                      : "Client-side storage preserves inputs during capture, preventing accidental data loss."}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href={reportLink}
                  className="group inline-flex items-center gap-3 text-sm sm:text-base font-semibold text-white border-b border-white pb-1 hover:text-white/80 transition-colors"
                >
                  <span>{isIt ? "Avvia rilievo sul posto" : "Begin roadside report"}</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Right: Bespoke 3D Driver Scene with Stylized Vehicle Damage Animation */}
            <div className="lg:col-span-6 flex justify-center">
              <DriverVehicleScene3D />
            </div>
          </div>
        </div>
      </section>

      {/* 7. CHAPTER TWO — INSURER & ADJUSTER CLAIMS SYNTHESIS */}
      <section
        id="insurer-chapter"
        className="w-full bg-[#F7F7F6] text-[#0E0F10] py-24 sm:py-36 px-6 sm:px-12 lg:px-20 overflow-hidden relative border-t border-[#E5E5E3]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Asymmetric Workbench Ledger Plane with 3D Spatial Angle */}
            <div className="lg:col-span-7 order-2 lg:order-1 flex justify-center [perspective:1200px]">
              <div className="w-full rounded-2xl bg-white border border-[#E5E5E3] p-6 sm:p-8 shadow-xl transition-transform duration-500 hover:[transform:rotateY(3deg)_rotateX(-2deg)_scale(1.01)] [transform:rotateY(6deg)_rotateX(-3deg)]">
                {/* Console Dossier Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#E5E5E3]">
                  <div className="space-y-0.5">
                    <span className="text-xs text-[#777777] uppercase tracking-wider block">
                      {isIt ? "FASCICOLO SINISTRO #2026-01" : "INCIDENT FILE #2026-01"}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-[#0E0F10] uppercase tracking-tight">
                      {isIt ? "Riepilogo Fatti & Ricostruzione Dinamica" : "Accident Summary & Facts"}
                    </h4>
                  </div>
                  <span className="text-xs text-[#777777] uppercase tracking-wider font-medium">
                    {isIt ? "Perizia da convalidare" : "Review pending"}
                  </span>
                </div>

                {/* Evidence Ledger Rows */}
                <div className="py-6 space-y-4 text-xs sm:text-sm">
                  {/* Telemetry Correlation */}
                  <div className="p-3.5 rounded-lg bg-[#FAFAFA] border border-[#EBEBEB] flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-[11px] text-[#777777] uppercase block">
                        {isIt ? "Dinamica d'Impatto" : "Impact Dynamics"}
                      </span>
                      <span className="font-semibold text-[#0E0F10]">
                        {isIt ? "Vettore decelerazione registrato • Contatto Anteriore Sx" : "Deceleration registered • Front-Left Contact"}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#555555]">
                      {isIt ? "Rilievo registrato" : "Intake logged"}
                    </span>
                  </div>

                  {/* Photography Verification */}
                  <div className="p-3.5 rounded-lg bg-[#FAFAFA] border border-[#EBEBEB] flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-[11px] text-[#777777] uppercase block">
                        {isIt ? "Evidenze Fotografiche" : "Photographic Proof"}
                      </span>
                      <span className="font-semibold text-[#0E0F10]">
                        {isIt ? "4 prospetti acquisiti • Metadati e coordinate coerenti" : "4 angles captured • Metadata localized"}
                      </span>
                    </div>
                    <span className="text-xs text-[#555555] font-medium">
                      {isIt ? "Conforme" : "Aligned"}
                    </span>
                  </div>

                  {/* Standard CAI Mapping */}
                  <div className="p-3.5 rounded-lg bg-[#FAFAFA] border border-[#EBEBEB] flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-[11px] text-[#777777] uppercase block">
                        {isIt ? "Modulo CAI" : "Agreed Statement Criteria"}
                      </span>
                      <span className="font-semibold text-[#0E0F10]">
                        {isIt ? "Circolava nello stesso senso e su fila diversa" : "Circumstance 12 - Changing lanes in same direction"}
                      </span>
                    </div>
                    <span className="text-xs text-[#555555]">
                      {isIt ? "Oggettivo" : "Objective"}
                    </span>
                  </div>
                </div>

                {/* Workbench Footer Action */}
                <div className="pt-4 border-t border-[#E5E5E3] flex items-center justify-between text-xs text-[#666666]">
                  <span>{isIt ? "2 Veicoli Coinvolti" : "2 Vehicles Aligned"}</span>
                  <span className="font-semibold text-[#0E0F10]">{isIt ? "Valida circostanze peritali →" : "Validate circumstances →"}</span>
                </div>
              </div>
            </div>

            {/* Right: Editorial Narrative */}
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#777777]">
                  {isIt ? "AREA LIQUIDAZIONE" : "CLAIMS DESK"}
                </span>
                <RevealText
                  as="h2"
                  mode="char"
                  variant="depth"
                  className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#0E0F10] leading-[1.05]"
                >
                  {isIt
                    ? "Dati oggettivi per la perizia umana."
                    : "Structured facts ready for human review."}
                </RevealText>
              </div>

              <p className="text-base sm:text-lg text-[#555555] font-light leading-relaxed">
                {isIt
                  ? "I sinistri complessi richiedono settimane di chiarimenti e versioni contrastanti. IMPACTA ricompone fotografie geolocalizzate, contesto dei veicoli e circostanze CAI standard in una linea temporale trasparente pronta per la convalida del perito."
                  : "Complex claims lose weeks to conflicting handwritten statements. IMPACTA structures geolocalized photos, vehicle context, and standard European CAI circumstances into an objective evidence record ready for prompt adjuster sign-off."}
              </p>

              {/* Structural Highlights */}
              <div className="space-y-6 pt-4 border-t border-[#E5E5E3]">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#0E0F10]">
                    {isIt ? "Danni Visibili al Veicolo" : "Visible Vehicle Damage"}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-light">
                    {isIt
                      ? "Correlazione diretta tra le zone di contatto dichiarate e le evidenze fotografiche riscontrate."
                      : "Correlates reported contact zones with visual damage documentation and physical evidence."}
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#0E0F10]">
                    {isIt ? "Separazione tra Fatti e Dichiarazioni" : "Fact & Statement Separation"}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-light">
                    {isIt
                      ? "Rigida separazione visiva tra dati fisici riscontrati e narrazioni soggettive dei conducenti."
                      : "Strict visual separation between verified physical evidence and subjective driver narratives."}
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#0E0F10]">
                    {isIt ? "Modulo CAI / Constatazione Amichevole" : "Standard Agreed Statement Criteria"}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-light">
                    {isIt
                      ? "Strutturazione immediata delle circostanze standard del Modulo di Constatazione Amichevole."
                      : "Direct circumstance mapping to standard European Agreed Statement criteria."}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/insurers"
                  className="group inline-flex items-center gap-3 text-sm sm:text-base font-semibold text-[#0E0F10] border-b border-[#0E0F10] pb-1 hover:text-black transition-colors"
                >
                  <span>{isIt ? "Esplora console liquidatori" : "Explore adjuster workbench"}</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CLOSING CONTINUUM: ONE INCIDENT, ONE SHARED RECORD */}
      <HomeClosingTransition />

      {/* 9. FICTIONAL DEMO COMPANY MARQUEE */}
      <PartnerMarquee />
    </>
  );
}
