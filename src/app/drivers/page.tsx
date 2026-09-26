"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PublicShell } from "@/components/public/PublicShell";
import { EditorialReveal } from "@/components/motion/EditorialReveal";
import { TechnicalReveal } from "@/components/motion/TechnicalReveal";
import { RevealText } from "@/components/motion/RevealText";
import { FullBleedImage } from "@/components/motion/FullBleedImage";
import { EmergencyRadar } from "@/components/ui/EmergencyRadar";
import { Emergency112DemoModal } from "@/features/driver/components/Emergency112DemoModal";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DriversPage() {
  return (
    <PublicShell>
      <DriversContent />
    </PublicShell>
  );
}

function DriversContent() {
  const { language, t } = useLanguage();
  const { isDriverAuthenticated } = useAuth();
  const isIt = language === "it";
  const reportLink = isDriverAuthenticated ? "/app/report" : "/login?redirect=/app/report";

  const [show112Modal, setShow112Modal] = useState(false);
  const [activeStage, setActiveStage] = useState<number>(0);

  // Scene 1: Spatial Evidence Planes Refs
  const captureSectionRef = useRef<HTMLElement>(null);
  const planePhotoRef = useRef<HTMLDivElement>(null);
  const planeRoadRef = useRef<HTMLDivElement>(null);
  const planeTimeRef = useRef<HTMLDivElement>(null);
  const centralAxisRef = useRef<HTMLDivElement>(null);

  // Guided Journey Transformation Stage Ref
  const journeySectionRef = useRef<HTMLElement>(null);

  // -------------------------------------------------------------
  // 1. Scene 1: 3 Spatial Evidence Planes with Time-Based GSAP Timeline
  // -------------------------------------------------------------
  useEffect(() => {
    const sec = captureSectionRef.current;
    const photo = planePhotoRef.current;
    const road = planeRoadRef.current;
    const time = planeTimeRef.current;
    const axis = centralAxisRef.current;
    if (!sec || !photo || !road || !time || !axis) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([photo, road, time], { opacity: 1, x: 0, y: 0, z: 0, rotateY: 0 });
      gsap.set(axis, { opacity: 1, scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Initial 3D Spatial Stance
      gsap.set(photo, { x: -60, y: 20, z: 40, rotateY: 10, opacity: 0 });
      gsap.set(road, { y: 30, z: -30, opacity: 0 });
      gsap.set(time, { x: 60, y: -20, z: 20, rotateY: -10, opacity: 0 });
      gsap.set(axis, { scaleX: 0, opacity: 0 });

      // Authored time-based timeline triggered once when section enters viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top 75%",
          once: true,
        },
      });

      // Three evidence planes converge smoothly in 3D perspective (~1.2s total)
      tl.to(
        axis,
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        0
      )
        .to(
          photo,
          {
            x: 0,
            y: 0,
            z: 0,
            rotateY: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
          },
          0.1
        )
        .to(
          road,
          {
            y: 0,
            z: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
          },
          0.2
        )
        .to(
          time,
          {
            x: 0,
            y: 0,
            z: 0,
            rotateY: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
          },
          0.25
        );
    }, sec);

    return () => ctx.revert();
  }, []);

  // Guided Journey Stages Data: source form fragment -> semantic field -> extracted structured field -> normalized record
  const journeyStages = [
    {
      num: "01",
      badge: isIt ? "ACQUISIZIONE" : "INTAKE",
      title: isIt ? "Frammento Sorgente" : "Source Form Fragment",
      subtitle: isIt ? "Input non strutturato sul ciglio della strada" : "Raw roadside capture & input",
      desc: isIt
        ? "Fotografie dirette del danno, coordinate grezze del dispositivo e dichiarazione sul posto. Nessun modulo cartaceo da compilare sotto stress."
        : "Direct photographic proof, raw device telemetry, and immediate on-scene notes without deciphering paper forms under acute stress.",
      metaTitle: isIt ? "STATO INIZIALE" : "INITIAL PAYLOAD",
      metaValue: isIt ? "Dati grezzi acquisiti in situ" : "Raw in-situ payload",
      tag: isIt ? "Frammentazione" : "Raw Fragment",
      tagColor: "text-amber-600 bg-amber-500/10 border-amber-500/20",
    },
    {
      num: "02",
      badge: isIt ? "INTERPRETAZIONE" : "PARSING",
      title: isIt ? "Campo Semantico" : "Semantic Field",
      subtitle: isIt ? "Riconoscimento e isolamento degli elementi" : "Entity recognition & isolation",
      desc: isIt
        ? "Il sistema identifica e isola automaticamente le entità: veicolo assicurato, controparte, targa e zona di contatto preliminare."
        : "Automated entity separation isolating the insured vehicle, counterparty identifier, plate metadata, and primary impact zone.",
      metaTitle: isIt ? "ENTITÀ ISOLATE" : "IDENTIFIED ENTITIES",
      metaValue: isIt ? "2 Veicoli • Coordinate Localizzate" : "2 Vehicles • Localized Coordinates",
      tag: isIt ? "Semantica" : "Semantic Entities",
      tagColor: "text-sky-600 bg-sky-500/10 border-sky-500/20",
    },
    {
      num: "03",
      badge: isIt ? "CORRELAZIONE" : "ALIGNMENT",
      title: isIt ? "Estrazione Strutturata" : "Extracted Structured Field",
      subtitle: isIt ? "Allineamento alle clausole convenzionali CAI" : "Mapping to Agreed Statement clauses",
      desc: isIt
        ? "Associazione rigorosa tra la deformazione fotografata e le caselle standard di constatazione amichevole. Zero ricostruzioni arbitrarie."
        : "Rigorous matching between photographed contact damage and standard European circumstance criteria. Zero arbitrary guesswork.",
      metaTitle: isIt ? "CLAUSOLA APPLICATA" : "APPLIED CLAUSE",
      metaValue: isIt ? "Allineamento Casella 12" : "Box 12 Circumstance Alignment",
      tag: isIt ? "Allineamento" : "Structured Match",
      tagColor: "text-indigo-600 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      num: "04",
      badge: isIt ? "VALIDAZIONE" : "COMPLETION",
      title: isIt ? "Record Normalizzato" : "Normalized Record",
      subtitle: isIt ? "Fascicolo probatorio pronto per il perito" : "Verified file ready for human adjuster",
      desc: isIt
        ? "Un unico fascicolo cronologico, immutabile e verificabile, contenente fotografie, metadati e circostanze pronto per la delibera del liquidatore."
        : "A single immutable chronological file containing photos, calibrated context, and objective circumstances ready for prompt adjuster review.",
      metaTitle: isIt ? "FASCICOLO GENERATO" : "GENERATED DOSSIER",
      metaValue: "CLM-IT-2026-001 • Pronto per Delibera",
      tag: isIt ? "Verificabile" : "Normalized File",
      tagColor: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  return (
    <>
      {/* 1. HERO HEADER */}
      <section className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-6">
          <TechnicalReveal className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#666666]">
            {isIt ? "ASSISTENZA PER IL CONDUCENTE" : "DRIVER ROADSIDE SUPPORT"}
          </TechnicalReveal>
          <EditorialReveal
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0E0F10] leading-[1.04] uppercase max-w-5xl"
          >
            {isIt ? (
              <>
                Nessuna confusione.
                <br />
                Solo guida calma sul posto.
              </>
            ) : (
              <>
                Zero confusion.
                <br />
                Calm guidance at the roadside.
              </>
            )}
          </EditorialReveal>
          <p className="text-lg sm:text-2xl text-[#666666] leading-relaxed max-w-3xl font-light">
            {isIt
              ? "Un incidente è un momento di forte tensione. IMPACTA ti guida passo dopo passo: verifica la tua sicurezza fisica, ti assiste nelle fotografie e ordina i fatti prima che subentri l'incertezza."
              : "Collisions are disorienting and stressful. IMPACTA provides gentle, step-by-step guidance: safeguarding your physical well-being first, guiding your photos, and organizing the facts before memory fades."}
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

      {/* 2. ATMOSPHERIC CONTEXT SCENE */}
      <section className="relative w-full bg-[#0E0F10] text-white">
        <FullBleedImage
          src="/images/hero-car.jpg"
          alt="Driver vehicle inspection"
          overlayClassName="bg-gradient-to-t from-[#0E0F10] via-[#0E0F10]/50 to-transparent"
        >
          <div className="max-w-4xl space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-white/60">
              {isIt ? "RILIEVO FOTOGRAFICO ASSISTITO" : "GUIDED PHOTOGRAPHIC CAPTURE"}
            </span>
            <RevealText
              as="h2"
              mode="char"
              variant="depth"
              className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-tight"
            >
              {isIt ? "Quattro inquadrature semplici e chiare" : "Four Simple, Reassuring Steps"}
            </RevealText>
            <p className="text-base sm:text-xl text-white/70 font-light leading-relaxed max-w-2xl">
              {isIt
                ? "Senza formulari incomprensibili sul ciglio della strada: lo schermo ti mostra esattamente come posizionare la fotocamera per documentare la scena in pochi minuti."
                : "No complex legal paperwork on the shoulder of the road. Your phone indicates exactly how to frame the vehicles and roadway in just a few minutes."}
            </p>
          </div>
        </FullBleedImage>
      </section>

      {/* 3. SCENE 1: INCIDENT CAPTURE — CHARACTER REVEAL & 3 SPATIAL EVIDENCE PLANES (TIME-BASED GSAP) */}
      <section
        ref={captureSectionRef}
        className="py-24 sm:py-36 bg-[#F7F7F6] border-b border-[#E5E5E3] overflow-hidden"
        style={{ perspective: "1400px" }}
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-[0.24em] text-[#777777] font-semibold block">
              {isIt ? "RILIEVO PROBATORIO" : "INCIDENT CAPTURE"}
            </span>

            {/* Display Headline with Character-Level Reveal */}
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#0E0F10] leading-[0.98]">
              <span className="block">
                <RevealText as="span" mode="char" variant="depth">
                  {isIt ? "CATTURA LA SCENA." : "CAPTURE THE SCENE."}
                </RevealText>
              </span>
              <span className="block text-[#666666]">
                <RevealText as="span" mode="char" variant="depth" delay={0.25}>
                  {isIt ? "CONSERVA IL CONTESTO." : "KEEP THE CONTEXT."}
                </RevealText>
              </span>
            </h2>

            <p className="text-base sm:text-xl text-[#555555] font-light leading-relaxed">
              {isIt
                ? "Foto, posizione e orario confluiscono in un unico record strutturato dell'incidente."
                : "Photos, location and time become one structured incident record."}
            </p>
          </div>

          {/* Central Spatial Stage: 3 Evidentiary Planes with Time-Based GSAP Entrance */}
          <div className="relative w-full min-h-[420px] sm:min-h-[480px] flex items-center justify-center [transform-style:preserve-3d]">
            {/* Horizontal Alignment Rail Axis */}
            <div
              ref={centralAxisRef}
              className="absolute inset-x-8 h-[1px] bg-[#0E0F10]/20 pointer-events-none origin-center will-change-transform"
            />

            {/* Evidence Plane 1: PHOTOS (Left 3D Plane) */}
            <div
              ref={planePhotoRef}
              className="absolute left-2 sm:left-6 lg:left-10 w-[270px] sm:w-[320px] bg-white border border-[#0E0F10] p-6 shadow-lg will-change-transform space-y-3 [transform-style:preserve-3d]"
            >
              <div className="flex items-center justify-between border-b border-[#E5E5E3] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#0E0F10]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#0E0F10]">
                    {isIt ? "PROVE FOTOGRAFICHE" : "PHOTO EVIDENCE"}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#777777]">01 / 03</span>
              </div>
              <div className="text-base font-bold uppercase text-[#0E0F10] tracking-tight">
                {isIt ? "4 Prospetti Guidati" : "4 Guided Angles"}
              </div>
              <p className="text-xs text-[#555555] font-light leading-relaxed">
                {isIt
                  ? "Panoramica, punto d'urto, controparte e segnaletica acquisiti con mirini visivi a schermo."
                  : "Wide overview, contact point, counterparty, and road signs framed with on-screen viewfinders."}
              </p>
              <div className="pt-2 border-t border-[#E5E5E3] text-[10px] font-semibold text-[#0E0F10] uppercase tracking-wider">
                {isIt ? "Coordinate e metadati integrati" : "Metadata & coordinates embedded"}
              </div>
            </div>

            {/* Evidence Plane 2: ROADWAY (Center 3D Plane) */}
            <div
              ref={planeRoadRef}
              className="w-[280px] sm:w-[340px] bg-[#0E0F10] text-white p-6 shadow-2xl z-10 will-change-transform space-y-3 [transform-style:preserve-3d]"
            >
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                    {isIt ? "CONTESTO STRADALE" : "ROADWAY CONTEXT"}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/50">02 / 03</span>
              </div>
              <div className="text-base font-bold uppercase text-white tracking-tight">
                {isIt ? "Allineamento Carreggiata" : "Roadway Alignment"}
              </div>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                {isIt
                  ? "Geolocalizzazione verificata, direzione di marcia e conformazione della corsia documentate con certezza."
                  : "Verified GNSS localization, travel direction, and roadway geometry documented without ambiguity."}
              </p>
              <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[10px] font-mono text-white/60 uppercase">
                <span>{isIt ? "ROMA / MILANO" : "ROMA / MILANO"}</span>
                <span className="text-emerald-400">{isIt ? "CERTIFICATO" : "CERTIFIED"}</span>
              </div>
            </div>

            {/* Evidence Plane 3: TIME & SEQUENCE (Right 3D Plane) */}
            <div
              ref={planeTimeRef}
              className="absolute right-2 sm:right-6 lg:right-10 w-[270px] sm:w-[320px] bg-white border border-[#0E0F10] p-6 shadow-lg will-change-transform space-y-3 [transform-style:preserve-3d]"
            >
              <div className="flex items-center justify-between border-b border-[#E5E5E3] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#0E0F10]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#0E0F10]">
                    {isIt ? "MARCATURA TEMPORALE" : "TIME & SEQUENCE"}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#777777]">03 / 03</span>
              </div>
              <div className="text-base font-bold uppercase text-[#0E0F10] tracking-tight">
                {isIt ? "Sequenza Cronologica" : "Chronological Sequence"}
              </div>
              <p className="text-xs text-[#555555] font-light leading-relaxed">
                {isIt
                  ? "Marcatura oraria certificata per ciascun elemento probatorio. Eliminazione delle contraddizioni temporali."
                  : "Certified timestamp anchoring each evidentiary element, preventing contradictory timeline disputes."}
              </p>
              <div className="pt-2 border-t border-[#E5E5E3] text-[10px] font-mono text-[#0E0F10] font-semibold tracking-wider">
                09:41:20 • SECURE PROTOCOL
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GUIDED JOURNEY: VISUAL TRANSFORMATION STAGE (WITHOUT PIN: TRUE / RUNWAY BUGS) */}
      <section
        ref={journeySectionRef}
        className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3] overflow-hidden"
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-[0.24em] text-[#777777] font-semibold block">
              {isIt ? "IL PERCORSO GUIDATO" : "GUIDED JOURNEY"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#0E0F10] leading-tight">
              {isIt ? (
                <>
                  Dalla frammentazione
                  <br />
                  al record normalizzato.
                </>
              ) : (
                <>
                  From raw fragments
                  <br />
                  to normalized record.
                </>
              )}
            </h2>
            <p className="text-base text-[#666666] font-light leading-relaxed">
              {isIt
                ? "Ogni fase trasforma l'informazione grezza in dato probatorio difendibile, senza ambiguità e senza costrizioni."
                : "Each phase transforms raw input into defensible evidentiary proof, without ambiguity or friction."}
            </p>
          </div>

          {/* Four Interactive Transformation Steps (No Pin Spacers, Clean Step Architecture) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Step Controls Column */}
            <div className="lg:col-span-4 space-y-2">
              {journeyStages.map((stage, idx) => {
                const isActive = activeStage === idx;
                return (
                  <button
                    key={stage.num}
                    type="button"
                    onClick={() => setActiveStage(idx)}
                    className={`w-full text-left p-4 sm:p-5 border transition-all duration-300 flex items-start gap-4 cursor-pointer ${
                      isActive
                        ? "bg-[#0E0F10] text-white border-[#0E0F10] shadow-md"
                        : "bg-[#FAFAFA] text-[#555555] border-[#EBEBEB] hover:border-[#0E0F10]/40 hover:bg-white"
                    }`}
                  >
                    <span className={`text-base font-mono font-bold ${isActive ? "text-white" : "text-[#888888]"}`}>
                      {stage.num}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? "text-white/70" : "text-[#777777]"}`}>
                          {stage.badge}
                        </span>
                      </div>
                      <div className={`text-sm sm:text-base font-bold uppercase tracking-tight ${isActive ? "text-white" : "text-[#0E0F10]"}`}>
                        {stage.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Transformation Workbench */}
            <div className="lg:col-span-8 bg-[#F7F7F6] border border-[#E5E5E3] p-6 sm:p-10 shadow-sm min-h-[380px] flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E5E3] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl font-mono font-bold text-[#0E0F10]">
                      {journeyStages[activeStage].num}
                    </span>
                    <span className="text-xs uppercase font-semibold tracking-widest text-[#777777]">
                      {journeyStages[activeStage].badge}
                    </span>
                  </div>
                  <span className={`text-xs px-2.5 py-1 border font-semibold uppercase tracking-wider ${journeyStages[activeStage].tagColor}`}>
                    {journeyStages[activeStage].tag}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#0E0F10]">
                    {journeyStages[activeStage].title}
                  </h3>
                  <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#666666]">
                    {journeyStages[activeStage].subtitle}
                  </div>
                  <p className="text-base sm:text-lg text-[#555555] font-light leading-relaxed max-w-2xl">
                    {journeyStages[activeStage].desc}
                  </p>
                </div>
              </div>

              {/* Transformation Status Card */}
              <div className="pt-6 border-t border-[#E5E5E3] flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-[#777777] uppercase tracking-wider block font-semibold">
                    {journeyStages[activeStage].metaTitle}
                  </span>
                  <span className="font-semibold text-[#0E0F10]">
                    {journeyStages[activeStage].metaValue}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {journeyStages.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveStage(i)}
                      className={`h-1.5 transition-all duration-300 ${
                        activeStage === i ? "w-8 bg-[#0E0F10]" : "w-3 bg-[#D4D4D2] hover:bg-[#888888]"
                      }`}
                      aria-label={`Go to stage ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HUMAN SAFETY PROTOCOL: MANDATORY 112 CTA WITH EMERGENCY RADAR */}
      <section id="emergency-112-cta" className="py-20 sm:py-28 bg-[#F7F7F6] border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-600 block">
              {isIt ? "NUMERO UNICO EUROPEO 112" : "EUROPEAN EMERGENCY 112"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#0E0F10]">
              {isIt ? "La salute prima di ogni dato." : "Human safety precedes data."}
            </h2>
            <p className="text-base sm:text-lg text-[#666666] font-light leading-relaxed">
              {isIt
                ? "Il primo passo del sistema verifica immediatamente se ci sono persone ferite. In caso di necessità, un pulsante diretto consente di contattare subito il 112 senza costringerti a compilare schermate o moduli."
                : "The first step of our protocol evaluates whether anyone requires medical attention. If necessary, a direct one-tap button connects with European Emergency 112 without forcing any form completion."}
            </p>

            {/* MANDATORY 112 PUBLIC CTA: [ RADAR ] CHIAMA 112 */}
            <div className="pt-4">
              <button
                type="button"
                data-testid="driver-page-112-cta"
                onClick={() => setShow112Modal(true)}
                className="group inline-flex items-center gap-3.5 px-7 py-4 bg-[#0E0F10] hover:bg-rose-600 text-white text-xs font-bold tracking-wider uppercase transition-colors rounded-none shadow-sm cursor-pointer"
              >
                <EmergencyRadar size={24} showSweep={true} />
                <span>{isIt ? "CHIAMA 112" : "CALL 112"}</span>
                <span className="text-white/50 text-[11px] font-normal lowercase tracking-normal pl-1">
                  ({isIt ? "simulazione demo" : "demo simulation"})
                </span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 text-base sm:text-lg text-[#666666] font-light leading-relaxed border-l border-[#E5E5E3] pl-6 lg:pl-10">
            <p>
              {isIt
                ? "Solo una volta accertata la sicurezza di tutti gli occupanti l'applicazione sblocca il rilievo fotografico e i passaggi documentali."
                : "Only once the physical safety of all vehicle occupants is verified does the interface unlock photographic intake."}
            </p>
            <p className="text-xs text-[#888888] font-mono uppercase tracking-wider">
              {isIt
                ? "PROTOCOLLO EUROPEO CONFORME AL NUMERO UNICO DI EMERGENZA"
                : "EUROPEAN SINGLE EMERGENCY NUMBER ALIGNED PROTOCOL"}
            </p>
          </div>
        </div>
      </section>

      {/* Emergency 112 Demo Modal */}
      <Emergency112DemoModal
        isOpen={show112Modal}
        onClose={() => setShow112Modal(false)}
      />
    </>
  );
}
