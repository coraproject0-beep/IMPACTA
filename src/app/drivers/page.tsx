"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PublicShell } from "@/components/public/PublicShell";
import { RevealText } from "@/components/motion/RevealText";
import { MotionDivider } from "@/components/motion/MotionDivider";
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

  // Section 2: Dark Environment Transition Refs (Section 7B: Pacing Bug Fix)
  const darkEnvSectionRef = useRef<HTMLElement>(null);
  const darkBgOverlayRef = useRef<HTMLDivElement>(null);
  const darkEnvContentRef = useRef<HTMLDivElement>(null);

  // Section 3: Scene 1 Spatial Evidence Sources Refs (Section 7A: Zero Cards)
  const captureSectionRef = useRef<HTMLElement>(null);
  const centralAxisRef = useRef<HTMLDivElement>(null);
  const planePhotoRef = useRef<HTMLDivElement>(null);
  const planeRoadRef = useRef<HTMLDivElement>(null);
  const planeTimeRef = useRef<HTMLDivElement>(null);
  const convergenceRingRef = useRef<SVGSVGElement>(null);

  // Section 4: Continuous Single Object Transformation Refs (Section 7C & 7D)
  const transformationSectionRef = useRef<HTMLElement>(null);
  const evolvingObjectRef = useRef<HTMLDivElement>(null);
  const stageHeadlineRef = useRef<HTMLDivElement>(null);
  const stageMetaRef = useRef<HTMLDivElement>(null);
  const progressTrackRef = useRef<HTMLDivElement>(null);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  // -------------------------------------------------------------
  // 1. SECTION 7B: DRIVER MID-PAGE COLOR STRIP PACING FIX
  // -------------------------------------------------------------
  // MANDATORY ORDER:
  // 1. Section approaches viewport
  // 2. Background transformation begins EARLY (0-15%)
  // 3. Background reaches intended dark state BEFORE text animation (15-25%)
  // 4. Dark state HOLDS
  // 5. Headline animates (25-35%)
  // 6. Supporting copy animates (35-50%)
  // 7. Resolved composition remains readable
  useEffect(() => {
    const sec = darkEnvSectionRef.current;
    const bg = darkBgOverlayRef.current;
    const content = darkEnvContentRef.current;
    if (!sec || !bg || !content) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(bg, { opacity: 1 });
      gsap.set(content, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(bg, { opacity: 0 });
      gsap.set(content, { opacity: 0, y: 30 });

      // EARLY BACKGROUND COLOR TRANSITION:
      // Starts as section enters lower screen and reaches solid pitch dark (#0E0F10)
      // WELL BEFORE the headline and text can be seen or scrolled into focus!
      ScrollTrigger.create({
        trigger: sec,
        start: "top 95%",
        end: "top 60%",
        scrub: true,
        onUpdate: (self) => {
          // Accelerates to solid dark in the first 50% of the entry trigger
          const darkProgress = Math.min(1, self.progress * 1.6);
          gsap.set(bg, { opacity: darkProgress });
        },
      });

      // TIME-BASED TEXT AND FOREGROUND ENTRANCE:
      // Only fires once the dark background is fully established!
      ScrollTrigger.create({
        trigger: sec,
        start: "top 62%",
        once: true,
        onEnter: () => {
          gsap.to(content, {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
          });
        },
      });
    }, sec);

    return () => ctx.revert();
  }, []);

  // -------------------------------------------------------------
  // 2. SECTION 7A: INCIDENT CAPTURE — THREE SPATIAL EVIDENCE SOURCES
  // -------------------------------------------------------------
  // Zero cards. Three genuine spatial evidence planes entering from
  // disparate trajectories and converging around a central incident axis.
  useEffect(() => {
    const sec = captureSectionRef.current;
    const axis = centralAxisRef.current;
    const photo = planePhotoRef.current;
    const road = planeRoadRef.current;
    const time = planeTimeRef.current;
    const ring = convergenceRingRef.current;
    if (!sec || !axis || !photo || !road || !time || !ring) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([photo, road, time], { opacity: 1, x: 0, y: 0, z: 0, rotateY: 0, rotateX: 0 });
      gsap.set([axis, ring], { opacity: 1, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Starting positions: START OUTSIDE THE RESTING COMPOSITION
      gsap.set(axis, { scale: 0, opacity: 0 });
      gsap.set(ring, { scale: 0.4, opacity: 0, rotateZ: -45 });

      // Source 1 (Photo Evidence): Enters from upper-left with camera viewfinder tilt
      gsap.set(photo, {
        x: -90,
        y: -40,
        z: 80,
        rotateY: 24,
        rotateX: -12,
        opacity: 0,
      });

      // Source 2 (Roadway Geometry): Enters from deep Z-space along the roadway heading
      gsap.set(road, {
        x: 0,
        y: 60,
        z: -140,
        rotateX: 28,
        opacity: 0,
      });

      // Source 3 (Chronological Ribbon): Enters laterally from right foreground
      gsap.set(time, {
        x: 90,
        y: 20,
        z: 60,
        rotateY: -22,
        opacity: 0,
      });

      // Master viewport-triggered time-based choreography (~1.3s total)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top 72%",
          once: true,
        },
      });

      // Step A: Axis constructs and convergence ring expands
      tl.to(
        axis,
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        0
      )
        .to(
          ring,
          {
            scale: 1,
            opacity: 0.85,
            rotateZ: 0,
            duration: 1.1,
            ease: "power3.out",
          },
          0.1
        )
        // Step B: Three spatial sources converge toward the incident axis
        .to(
          photo,
          {
            x: 0,
            y: 0,
            z: 20,
            rotateY: 4,
            rotateX: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          0.15
        )
        .to(
          road,
          {
            x: 0,
            y: 0,
            z: -20,
            rotateX: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          0.22
        )
        .to(
          time,
          {
            x: 0,
            y: 0,
            z: 10,
            rotateY: -4,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          0.3
        );
    }, sec);

    return () => ctx.revert();
  }, []);

  // -------------------------------------------------------------
  // 3. SECTION 7C & 7D: CONTINUOUS SINGLE OBJECT TRANSFORMATION
  // -------------------------------------------------------------
  // The viewer perceives ONE OBJECT EVOLVING:
  // Raw roadside fragment -> Highlight isolates semantic region ->
  // Text/data detaches from source -> Becomes structured field ->
  // Locks into normalized record.
  const transformationSteps = [
    {
      stageId: "RAW_FRAGMENT",
      stageLabel: isIt ? "01 / FRAMMENTO SORGENTE" : "01 / SOURCE FRAGMENT",
      title: isIt ? "Acquisizione Grezza sul Posto" : "Raw On-Scene Fragment",
      desc: isIt
        ? "Fotografie dirette del danno e orientamento del veicolo acquisiti sul posto. Nessun modulo cartaceo da compilare sotto stress."
        : "Direct photographic proof and roadside orientation captured at scene. Zero paper paperwork required under stress.",
      objectStance: { rotateY: 18, rotateX: 8, z: -30, scale: 0.98 },
      tag: isIt ? "DATO GREZZO" : "RAW PAYLOAD",
      tagColor: "text-amber-700 bg-amber-100/60 border-amber-300",
      accentBorder: "border-amber-400",
      indicator: isIt ? "Mirino ottico attivo • Fotogramma originale" : "Optical viewfinder active • Raw frame",
    },
    {
      stageId: "SEMANTIC_FIELD",
      stageLabel: isIt ? "02 / CAMPO SEMANTICO" : "02 / SEMANTIC FIELD",
      title: isIt ? "Isolamento dell'Entità e del Contatto" : "Entity & Contact Isolation",
      desc: isIt
        ? "Il sistema isola visivamente i contorni del veicolo, la targa e la specifica zona di deformazione lamierati."
        : "Automated optical extraction isolates vehicle silhouettes, license plate characters, and the specific impact sector.",
      objectStance: { rotateY: 8, rotateX: 3, z: 10, scale: 1.01 },
      tag: isIt ? "SEPARAZIONE" : "SEMANTIC REGION",
      tagColor: "text-sky-700 bg-sky-100/60 border-sky-300",
      accentBorder: "border-sky-500",
      indicator: isIt ? "Contorno veicolo identificato • Quadrante Anteriore Sx" : "Vehicle contour identified • Front-Left Zone",
    },
    {
      stageId: "STRUCTURED_FIELD",
      stageLabel: isIt ? "03 / ESTRAZIONE STRUTTURATA" : "03 / STRUCTURED FIELD",
      title: isIt ? "Allineamento Fatti e Circostanze" : "Fact & Circumstance Correlation",
      desc: isIt
        ? "I dati estratti si collegano alle circostanze standard della constatazione amichevole, eliminando ogni ricostruzione arbitraria."
        : "Extracted evidence correlates with standard Agreed Statement criteria, eliminating ambiguous driver disputes.",
      objectStance: { rotateY: -6, rotateX: -2, z: 30, scale: 1.02 },
      tag: isIt ? "CORRELAZIONE" : "STRUCTURED",
      tagColor: "text-indigo-700 bg-indigo-100/60 border-indigo-300",
      accentBorder: "border-indigo-500",
      indicator: isIt ? "Corrispondenza CAI • Dinamica concordata" : "Agreed criteria aligned • Mutual statement",
    },
    {
      stageId: "NORMALIZED_RECORD",
      stageLabel: isIt ? "04 / RECORD NORMALIZZATO" : "04 / NORMALIZED RECORD",
      title: isIt ? "Fascicolo Verificabile per la Perizia" : "Normalized Evidentiary File",
      desc: isIt
        ? "Tutti gli elementi convergono in un unico documento probatorio cronologico pronto per la valutazione del perito liquidatore."
        : "All evidentiary streams fuse into a single immutable file ready for professional human adjuster review.",
      objectStance: { rotateY: 0, rotateX: 0, z: 45, scale: 1.03 },
      tag: isIt ? "RECORD PRONTO" : "NORMALIZED",
      tagColor: "text-emerald-700 bg-emerald-100/60 border-emerald-300",
      accentBorder: "border-emerald-500",
      indicator: isIt ? "Fascicolo completo • Pronto per Delibera" : "Complete file • Ready for Review",
    },
  ];

  // Animate the single evolving object when stage changes
  const handleStageChange = (idx: number) => {
    setCurrentStageIdx(idx);
    const obj = evolvingObjectRef.current;
    if (!obj) return;

    const targetStance = transformationSteps[idx].objectStance;
    gsap.to(obj, {
      rotateY: targetStance.rotateY,
      rotateX: targetStance.rotateX,
      z: targetStance.z,
      scale: targetStance.scale,
      duration: 0.85,
      ease: "power3.out",
    });
  };

  return (
    <>
      {/* 1. HERO HEADER */}
      <section className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3] overflow-hidden">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-6">
          <div className="overflow-hidden">
            <RevealText
              as="span"
              mode="char"
              variant="micro-track"
              className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#666666] block"
            >
              {isIt ? "ASSISTENZA PER IL CONDUCENTE" : "DRIVER ROADSIDE SUPPORT"}
            </RevealText>
          </div>

          {/* Display Headline with Character-Level Depth Convergence */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0E0F10] leading-[1.03] uppercase max-w-5xl">
            <span className="block">
              <RevealText as="span" mode="char" variant="depth-convergence" delay={0.05} triggerOnScroll={false}>
                {isIt ? "NESSUNA CONFUSIONE." : "ZERO CONFUSION."}
              </RevealText>
            </span>
            <span className="block text-[#555555]">
              <RevealText as="span" mode="char" variant="depth-convergence" delay={0.25} triggerOnScroll={false}>
                {isIt ? "SOLO GUIDA CALMA SUL POSTO." : "CALM GUIDANCE AT ROADSIDE."}
              </RevealText>
            </span>
          </h1>

          <div className="overflow-hidden">
            <RevealText
              as="p"
              mode="word"
              variant="mask-vertical"
              delay={0.5}
              triggerOnScroll={false}
              className="text-lg sm:text-2xl text-[#666666] leading-relaxed max-w-3xl font-light"
            >
              {isIt
                ? "Un incidente è un momento di forte tensione. IMPACTA ti guida passo dopo passo: verifica la tua sicurezza fisica, ti assiste nelle fotografie e ordina i fatti prima che subentri l'incertezza."
                : "Collisions are disorienting and stressful. IMPACTA provides gentle, step-by-step guidance: safeguarding your physical well-being first, guiding your photos, and organizing the facts before memory fades."}
            </RevealText>
          </div>

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

      {/* 2. SECTION 7B: ATMOSPHERIC CONTEXT SCENE (EARLY BACKGROUND DARKENING PACING FIX) */}
      <section
        ref={darkEnvSectionRef}
        className="relative w-full min-h-[90svh] lg:min-h-[100svh] overflow-hidden flex items-end"
      >
        {/* Full-bleed photography */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-car.jpg"
            alt="Driver vehicle inspection"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* EARLY DARK COLOR SCRIM OVERLAY (Reaches solid black well before text animates) */}
        <div
          ref={darkBgOverlayRef}
          className="absolute inset-0 bg-[#0E0F10] pointer-events-none transition-opacity duration-300"
          style={{ willChange: "opacity" }}
        />

        {/* Subtle dark gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F10] via-[#0E0F10]/60 to-transparent pointer-events-none" />

        {/* Foreground Content: Guaranteed pitch dark background ensures 100% legibility */}
        <div
          ref={darkEnvContentRef}
          className="relative z-10 w-full px-6 sm:px-12 lg:px-20 py-16 sm:py-24 max-w-7xl text-white space-y-6 will-change-transform"
        >
          <RevealText
            as="span"
            mode="char"
            variant="micro-track"
            className="text-xs uppercase tracking-[0.2em] font-medium text-white/60 block"
          >
            {isIt ? "RILIEVO FOTOGRAFICO ASSISTITO" : "GUIDED PHOTOGRAPHIC CAPTURE"}
          </RevealText>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-tight max-w-3xl">
            <RevealText as="span" mode="char" variant="rotate-plane" delay={0.1}>
              {isIt ? "Quattro inquadrature semplici e chiare." : "Four Simple, Reassuring Steps."}
            </RevealText>
          </h2>

          <RevealText
            as="p"
            mode="word"
            variant="mask-vertical"
            delay={0.3}
            className="text-base sm:text-xl text-white/70 font-light leading-relaxed max-w-2xl"
          >
            {isIt
              ? "Senza formulari incomprensibili sul ciglio della strada: lo schermo ti mostra esattamente come posizionare la fotocamera per documentare la scena in pochi minuti."
              : "No complex legal paperwork on the shoulder of the road. Your phone indicates exactly how to frame the vehicles and roadway in just a few minutes."}
          </RevealText>
        </div>
      </section>

      {/* 3. SECTION 7A: SCENE 1: THREE SPATIAL EVIDENCE SOURCES (ZERO CARDS, SPATIAL AXIS) */}
      <section
        ref={captureSectionRef}
        className="py-24 sm:py-36 bg-[#F7F7F6] border-b border-[#E5E5E3] overflow-hidden"
        style={{ perspective: "1400px" }}
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-4">
            <RevealText
              as="span"
              mode="char"
              variant="micro-track"
              className="text-xs uppercase tracking-[0.24em] text-[#777777] font-semibold block"
            >
              {isIt ? "RILIEVO PROBATORIO" : "INCIDENT CAPTURE"}
            </RevealText>

            {/* Display Headline with Lateral Assembly Reveal */}
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#0E0F10] leading-[0.98]">
              <span className="block">
                <RevealText as="span" mode="char" variant="lateral-assembly">
                  {isIt ? "CATTURA LA SCENA." : "CAPTURE THE SCENE."}
                </RevealText>
              </span>
              <span className="block text-[#666666]">
                <RevealText as="span" mode="char" variant="lateral-assembly" delay={0.2}>
                  {isIt ? "CONSERVA IL CONTESTO." : "KEEP THE CONTEXT."}
                </RevealText>
              </span>
            </h2>

            <RevealText
              as="p"
              mode="word"
              variant="mask-vertical"
              delay={0.4}
              className="text-base sm:text-xl text-[#555555] font-light leading-relaxed"
            >
              {isIt
                ? "Foto, posizione e orario confluiscono in un unico record strutturato dell'incidente."
                : "Photos, location and time become one structured incident record."}
            </RevealText>
          </div>

          <MotionDivider className="w-full h-[1px] bg-[#0E0F10]/15" origin="left" />

          {/* SPATIAL INCIDENT AXIS STAGE: ZERO RECTANGULAR CARDS */}
          <div className="relative w-full min-h-[460px] sm:min-h-[520px] flex items-center justify-center [transform-style:preserve-3d]">
            {/* Central Coordinate Crosshair & Convergence Rings */}
            <div
              ref={centralAxisRef}
              className="absolute z-0 flex items-center justify-center pointer-events-none will-change-transform"
            >
              <div className="w-16 h-16 rounded-full border border-[#0E0F10]/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#0E0F10]" />
              </div>
            </div>

            <svg
              ref={convergenceRingRef}
              viewBox="0 0 500 500"
              fill="none"
              className="absolute w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] pointer-events-none will-change-transform opacity-40"
            >
              <circle cx="250" cy="250" r="160" stroke="#0E0F10" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="250" cy="250" r="230" stroke="#0E0F10" strokeWidth="0.75" strokeDasharray="2 4" />
              <line x1="250" y1="20" x2="250" y2="480" stroke="#0E0F10" strokeWidth="0.75" strokeDasharray="8 8" />
              <line x1="20" y1="250" x2="480" y2="250" stroke="#0E0F10" strokeWidth="0.75" strokeDasharray="8 8" />
            </svg>

            {/* SOURCE 1: PHOTO EVIDENCE PLANE (Optical Viewfinder Bracket Surface, Left) */}
            <div
              ref={planePhotoRef}
              className="absolute left-0 sm:left-4 lg:left-8 top-6 sm:top-10 max-w-[280px] sm:max-w-[320px] p-5 select-none will-change-transform space-y-3 [transform-style:preserve-3d]"
            >
              {/* Corner Viewfinder Optical Brackets */}
              <div className="relative border-l-2 border-t-2 border-[#0E0F10] pl-3 pt-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0E0F10] block">
                  {isIt ? "01 / FOTOGRAFIE" : "01 / PHOTO EVIDENCE"}
                </span>
                <div className="text-base font-bold uppercase text-[#0E0F10] tracking-tight">
                  {isIt ? "4 Inquadrature Guidate" : "4 Guided Perspectives"}
                </div>
              </div>

              <p className="text-xs text-[#555555] font-light leading-relaxed pl-3">
                {isIt
                  ? "Panoramica, punto d'urto, controparte e contesto stradale senza moduli cartacei."
                  : "Overview, contact zone, registration plate, and road orientation without paper forms."}
              </p>

              <div className="text-[10px] font-mono text-[#777777] pl-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>{isIt ? "Metadati d'immagine integrati" : "Image metadata embedded"}</span>
              </div>
            </div>

            {/* SOURCE 2: ROADWAY GEOMETRY PLANE (Top-Center Depth Surface) */}
            <div
              ref={planeRoadRef}
              className="absolute top-2 max-w-[290px] sm:max-w-[340px] p-5 select-none will-change-transform space-y-3 [transform-style:preserve-3d] text-center"
            >
              <div className="inline-block border-b-2 border-[#0E0F10] pb-1 px-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0E0F10] block">
                  {isIt ? "02 / CONTESTO STRADALE" : "02 / ROADWAY CONTEXT"}
                </span>
                <div className="text-base font-bold uppercase text-[#0E0F10] tracking-tight">
                  {isIt ? "Orientamento Carreggiata" : "Roadway Alignment"}
                </div>
              </div>

              <p className="text-xs text-[#555555] font-light leading-relaxed max-w-xs mx-auto">
                {isIt
                  ? "Rilevamento della corsia e direzione di marcia coerenti con le prove fotografiche."
                  : "Lane geometry and travel heading matched with scene photographic evidence."}
              </p>

              <div className="text-[10px] font-mono text-[#888888]">
                {isIt ? "Geolocalizzazione registrata" : "Incident location logged"}
              </div>
            </div>

            {/* SOURCE 3: CHRONOLOGICAL TYPOGRAPHIC RIBBON (Right Surface) */}
            <div
              ref={planeTimeRef}
              className="absolute right-0 sm:right-4 lg:right-8 bottom-6 sm:bottom-10 max-w-[280px] sm:max-w-[320px] p-5 select-none will-change-transform space-y-3 [transform-style:preserve-3d] text-right"
            >
              <div className="relative border-r-2 border-b-2 border-[#0E0F10] pr-3 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0E0F10] block">
                  {isIt ? "03 / MARCATURA TEMPORALE" : "03 / SEQUENCE TIMELINE"}
                </span>
                <div className="text-base font-bold uppercase text-[#0E0F10] tracking-tight">
                  {isIt ? "Sequenza Cronologica" : "Chronological Intake"}
                </div>
              </div>

              <p className="text-xs text-[#555555] font-light leading-relaxed pr-3">
                {isIt
                  ? "Marcatura oraria associata a ciascuna prova. Eliminazione delle contraddizioni temporali."
                  : "Timestamp aligned to each piece of proof, preventing post-accident timeline disputes."}
              </p>

              <div className="text-[10px] font-mono text-[#777777] pr-3">
                {isIt ? "Sequenza verificabile" : "Audit timeline ready"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 7C & 7D: CONTINUOUS SINGLE OBJECT TRANSFORMATION (ONE OBJECT EVOLVING) */}
      <section
        ref={transformationSectionRef}
        className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3] overflow-hidden"
        style={{ perspective: "1600px" }}
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-4">
            <RevealText
              as="span"
              mode="char"
              variant="micro-track"
              className="text-xs uppercase tracking-[0.24em] text-[#777777] font-semibold block"
            >
              {isIt ? "LA TRASFORMAZIONE" : "CONTINUOUS TRANSFORMATION"}
            </RevealText>

            <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#0E0F10] leading-tight">
              <span className="block">
                <RevealText as="span" mode="char" variant="mask-vertical">
                  {isIt ? "UN UNICO ELEMENTO" : "ONE SINGLE OBJECT"}
                </RevealText>
              </span>
              <span className="block text-[#555555]">
                <RevealText as="span" mode="char" variant="mask-vertical" delay={0.2}>
                  {isIt ? "CHE EVOLVE NEL TEMPO." : "EVOLVING OVER TIME."}
                </RevealText>
              </span>
            </h2>

            <p className="text-base text-[#666666] font-light leading-relaxed">
              {isIt
                ? "Il frammento grezzo acquisisce struttura, isola il campo semantico e si normalizza in un fascicolo difendibile."
                : "The raw roadside fragment gains structure, isolates semantic meaning, and normalizes into a defensible record."}
            </p>
          </div>

          {/* TRANSFORMATION WORKBENCH: SINGLE OBJECT STAGE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Continuous Stage Progression Selector */}
            <div className="lg:col-span-5 space-y-3">
              {transformationSteps.map((step, idx) => {
                const isActive = currentStageIdx === idx;
                return (
                  <button
                    key={step.stageId}
                    type="button"
                    onClick={() => handleStageChange(idx)}
                    className={`w-full text-left p-4 sm:p-5 border transition-all duration-300 flex items-start justify-between gap-4 cursor-pointer ${
                      isActive
                        ? "bg-[#0E0F10] text-white border-[#0E0F10] shadow-lg"
                        : "bg-transparent text-[#555555] border-[#E5E5E3] hover:border-[#0E0F10]/50 hover:bg-[#FBFBFA]"
                    }`}
                  >
                    <div className="space-y-1">
                      <span className={`text-[10px] font-mono uppercase tracking-widest block ${isActive ? "text-white/60" : "text-[#888888]"}`}>
                        {step.stageLabel}
                      </span>
                      <div className={`text-base font-bold uppercase tracking-tight ${isActive ? "text-white" : "text-[#0E0F10]"}`}>
                        {step.title}
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 border ${isActive ? "border-white/30 text-white" : "border-[#E5E5E3] text-[#777777]"}`}>
                      {step.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right: THE SINGLE EVOLVING OBJECT IN 3D PERSPECTIVE */}
            <div className="lg:col-span-7 flex justify-center [transform-style:preserve-3d]">
              <div
                ref={evolvingObjectRef}
                className={`w-full max-w-xl bg-[#FAFAFA] border-2 ${transformationSteps[currentStageIdx].accentBorder} p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] will-change-transform transition-colors duration-500 [transform-style:preserve-3d]`}
                style={{
                  transform: `rotateY(${transformationSteps[currentStageIdx].objectStance.rotateY}deg) rotateX(${transformationSteps[currentStageIdx].objectStance.rotateX}deg) translateZ(${transformationSteps[currentStageIdx].objectStance.z}px) scale(${transformationSteps[currentStageIdx].objectStance.scale})`,
                }}
              >
                {/* Header Strip of the Evolving Object */}
                <div className="flex items-center justify-between border-b border-[#E5E5E3] pb-4 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0E0F10]" />
                    <span className="font-mono font-bold text-[#0E0F10]">
                      {transformationSteps[currentStageIdx].stageLabel}
                    </span>
                  </div>
                  <span className={`text-[11px] font-mono px-2 py-0.5 border font-semibold ${transformationSteps[currentStageIdx].tagColor}`}>
                    {transformationSteps[currentStageIdx].tag}
                  </span>
                </div>

                {/* Dynamic Content of the Evolving Object */}
                <div className="py-6 space-y-4">
                  <div className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0E0F10]">
                    {transformationSteps[currentStageIdx].title}
                  </div>
                  <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed">
                    {transformationSteps[currentStageIdx].desc}
                  </p>
                </div>

                {/* Footer Indicator */}
                <div className="pt-4 border-t border-[#E5E5E3] flex items-center justify-between text-xs text-[#777777]">
                  <span className="font-mono text-[11px]">
                    {transformationSteps[currentStageIdx].indicator}
                  </span>
                  <span className="font-bold text-[#0E0F10] uppercase tracking-wider">
                    {currentStageIdx + 1} / 4
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HUMAN SAFETY PROTOCOL: 112 CTA WITH EMERGENCY RADAR DIRECTLY NEXT TO TEXT */}
      <section id="emergency-112-cta" className="py-20 sm:py-28 bg-[#F7F7F6] border-b border-[#E5E5E3] overflow-hidden">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-4">
            <RevealText
              as="span"
              mode="char"
              variant="micro-track"
              className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-600 block"
            >
              {isIt ? "NUMERO UNICO EUROPEO 112" : "EUROPEAN EMERGENCY 112"}
            </RevealText>

            <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#0E0F10]">
              <RevealText as="span" mode="char" variant="mask-vertical">
                {isIt ? "La salute prima di ogni dato." : "Human safety precedes data."}
              </RevealText>
            </h2>

            <RevealText
              as="p"
              mode="word"
              variant="mask-vertical"
              delay={0.2}
              className="text-base sm:text-lg text-[#666666] font-light leading-relaxed"
            >
              {isIt
                ? "Il primo passo del sistema verifica immediatamente se ci sono persone ferite. In caso di necessità, un pulsante diretto consente di contattare subito il 112 senza costringerti a compilare schermate o moduli."
                : "The first step of our protocol evaluates whether anyone requires medical attention. If necessary, a direct one-tap button connects with European Emergency 112 without forcing any form completion."}
            </RevealText>

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
