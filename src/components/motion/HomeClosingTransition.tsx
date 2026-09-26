"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * HomeClosingTransition (V5.4 Final Cinematic Continuum):
 *
 * Implements:
 * - Hybrid sticky container architecture: 300vh scroll runway with CSS sticky top-0 h-screen stage (NO pin: true spacer bugs).
 * - Character-level typographic presence across the viewport edge.
 * - Single continuous 3D document slab smoothly transitioning across three evidentiary states:
 *     01: DRIVER INTAKE -> 02: STRUCTURED RECORD -> 03: ADJUSTER REVIEW
 * - Generous dwell intervals ensuring user can read each state at normal scroll velocity.
 * - Zero invented data: strictly canonical fixtures (CLM-IT-2026-001, Roma/Milano).
 */
export function HomeClosingTransition() {
  const { language } = useLanguage();
  const isIt = language === "it";

  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Headlines
  const headlineLeftRef = useRef<HTMLDivElement>(null);
  const headlineRightRef = useRef<HTMLDivElement>(null);

  // Three Spatial State Labels
  const labelIntakeRef = useRef<HTMLDivElement>(null);
  const labelRecordRef = useRef<HTMLDivElement>(null);
  const labelReviewRef = useRef<HTMLDivElement>(null);

  // Central 3D Document Slab & Content Layers
  const recordPlaneRef = useRef<HTMLDivElement>(null);
  const stateIntakeContentRef = useRef<HTMLDivElement>(null);
  const stateRecordContentRef = useRef<HTMLDivElement>(null);
  const stateReviewContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const hLeft = headlineLeftRef.current;
    const hRight = headlineRightRef.current;
    const lIntake = labelIntakeRef.current;
    const lRecord = labelRecordRef.current;
    const lReview = labelReviewRef.current;
    const plane = recordPlaneRef.current;
    const cIntake = stateIntakeContentRef.current;
    const cRecord = stateRecordContentRef.current;
    const cReview = stateReviewContentRef.current;

    if (!container || !stage || !hLeft || !hRight || !lIntake || !lRecord || !lReview || !plane || !cIntake || !cRecord || !cReview) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(cIntake, { display: "none" });
      gsap.set(cRecord, { display: "none" });
      gsap.set(cReview, { display: "block", opacity: 1 });
      gsap.set(lIntake, { opacity: 0.4 });
      gsap.set(lRecord, { opacity: 0.4 });
      gsap.set(lReview, { opacity: 1 });
      gsap.set(plane, { rotateY: 0, rotateX: 0, z: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Initial State Setup
      gsap.set(hLeft, { xPercent: -6, opacity: 0.85 });
      gsap.set(hRight, { xPercent: 6, opacity: 0.45 });

      // State labels: 01 active, 02 and 03 subdued
      gsap.set(lIntake, { opacity: 1, scale: 1, color: "#FFFFFF" });
      gsap.set([lRecord, lReview], { opacity: 0.35, scale: 0.95, color: "#888888" });

      // Document slab initially angled in State 1
      gsap.set(plane, {
        rotateY: 12,
        rotateX: 4,
        z: -20,
        transformPerspective: 1600,
        transformStyle: "preserve-3d",
      });

      gsap.set(cIntake, { opacity: 1, display: "block" });
      gsap.set(cRecord, { opacity: 0, display: "none" });
      gsap.set(cReview, { opacity: 0, display: "none" });

      // 2. Master ScrollTrigger Timeline across the 300vh runway
      // Uses CSS sticky holding stage in place; ScrollTrigger provides smooth progress mapping
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      // DWELL WINDOW 1 (0.00 -> 0.28): State 1 (Driver Intake) is stable and readable
      tl.to({}, { duration: 0.28 });

      // TRANSITION 1 -> 2 (0.28 -> 0.42): Smooth morph to Structured Record
      tl.to(
        hLeft,
        { xPercent: 0, opacity: 1, duration: 0.12, ease: "power2.inOut" },
        0.28
      )
        .to(
          hRight,
          { xPercent: 2, opacity: 0.75, duration: 0.12, ease: "power2.inOut" },
          0.28
        )
        // Shift label emphasis
        .to(
          lIntake,
          { opacity: 0.35, scale: 0.95, color: "#888888", duration: 0.1, ease: "power2.out" },
          0.28
        )
        .to(
          lRecord,
          { opacity: 1, scale: 1.04, color: "#FFFFFF", duration: 0.1, ease: "power2.out" },
          0.30
        )
        // Rotate slab to central frontal stance
        .to(
          plane,
          {
            rotateY: 0,
            rotateX: 0,
            z: 40,
            duration: 0.14,
            ease: "power2.inOut",
          },
          0.28
        )
        // Crossfade internal slab content
        .to(
          cIntake,
          {
            opacity: 0,
            duration: 0.06,
            onComplete: () => {
              gsap.set(cIntake, { display: "none" });
              gsap.set(cRecord, { display: "block" });
            },
          },
          0.28
        )
        .to(
          cRecord,
          {
            opacity: 1,
            duration: 0.08,
            ease: "power2.out",
          },
          0.34
        );

      // DWELL WINDOW 2 (0.42 -> 0.68): State 2 (Structured Record) is stable and readable
      tl.to({}, { duration: 0.26 });

      // TRANSITION 2 -> 3 (0.68 -> 0.82): Smooth morph to Adjuster Review
      tl.to(
        hRight,
        { xPercent: 0, opacity: 1, duration: 0.12, ease: "power2.out" },
        0.68
      )
        // Shift label emphasis
        .to(
          lRecord,
          { opacity: 0.35, scale: 0.95, color: "#888888", duration: 0.1, ease: "power2.out" },
          0.68
        )
        .to(
          lReview,
          { opacity: 1, scale: 1.04, color: "#FFFFFF", duration: 0.1, ease: "power2.out" },
          0.70
        )
        // Rotate slab to perital review perspective
        .to(
          plane,
          {
            rotateY: -10,
            rotateX: -3,
            z: 20,
            duration: 0.14,
            ease: "power2.inOut",
          },
          0.68
        )
        // Crossfade internal content
        .to(
          cRecord,
          {
            opacity: 0,
            duration: 0.06,
            onComplete: () => {
              gsap.set(cRecord, { display: "none" });
              gsap.set(cReview, { display: "block" });
            },
          },
          0.68
        )
        .to(
          cReview,
          {
            opacity: 1,
            duration: 0.08,
            ease: "power2.out",
          },
          0.74
        );

      // DWELL WINDOW 3 (0.82 -> 1.00): State 3 (Adjuster Review) rests cleanly
      tl.to({}, { duration: 0.18 });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[300vh] bg-black"
    >
      {/* Native CSS sticky stage: zero layout shifting or pin spacer jumps */}
      <div
        ref={stageRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between py-10 sm:py-14 px-6 sm:px-12 lg:px-20 select-none bg-black text-white"
        style={{ perspective: "1600px" }}
      >
        {/* 1. VIEWPORT-SPANNING EDITORIAL HEADLINE */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-4 pt-2 border-b border-white/10 pb-6 [transform-style:preserve-3d]">
          <div
            ref={headlineLeftRef}
            className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-white leading-none will-change-transform"
          >
            {isIt ? "UN INCIDENTE." : "ONE INCIDENT."}
          </div>
          <div
            ref={headlineRightRef}
            className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-[#888888] leading-none sm:text-right will-change-transform"
          >
            {isIt ? "UN UNICO RECORD CONDIVISO." : "ONE SHARED RECORD."}
          </div>
        </div>

        {/* 2. THREE SPATIAL STATE LABELS */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex justify-between items-center py-4 [transform-style:preserve-3d]">
          <div
            ref={labelIntakeRef}
            className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] will-change-transform select-none transition-colors"
          >
            01 / {isIt ? "RILIEVO CONDUCENTE" : "DRIVER INTAKE"}
          </div>
          <div
            ref={labelRecordRef}
            className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] will-change-transform select-none transition-colors"
          >
            02 / {isIt ? "RECORD STRUTTURATO" : "STRUCTURED RECORD"}
          </div>
          <div
            ref={labelReviewRef}
            className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] will-change-transform select-none transition-colors"
          >
            03 / {isIt ? "REVISIONE PERITALE" : "ADJUSTER REVIEW"}
          </div>
        </div>

        {/* 3. CENTRAL SHARED 3D DOCUMENT SLAB (ONE OBJECT, THREE STATES) */}
        <div className="relative z-20 my-auto w-full flex items-center justify-center py-4 [transform-style:preserve-3d]">
          <div
            ref={recordPlaneRef}
            className="w-full max-w-3xl border-t-2 border-b-2 border-white/30 bg-[#0E0F10] p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.95)] will-change-transform [transform-style:preserve-3d]"
          >
            {/* Header Bar of the Shared Object: Strictly Canonical Fixtures */}
            <div className="flex items-center justify-between border-b border-white/15 pb-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-mono font-bold text-white tracking-wider">CLM-IT-2026-001</span>
              </div>
              <span className="text-[11px] font-mono text-white/50 tracking-wide uppercase">
                {isIt ? "ROMA / MILANO • REGISTRAZIONE VERIFICATA" : "ROMA / MILANO • VERIFIED RECORD"}
              </span>
            </div>

            {/* STATE 1 CONTENT: DRIVER INTAKE */}
            <div ref={stateIntakeContentRef} className="py-6 space-y-4">
              <div className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                {isIt ? "Acquisizione Dati in Situ" : "Scene Intake & Signal Capture"}
              </div>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-xl">
                {isIt
                  ? "Il conducente documenta la scena sul posto: 4 fotografie guidate, geolocalizzazione automatica e verifica immediata delle condizioni di sicurezza."
                  : "The driver documents the incident at roadside: 4 guided photo viewpoints, automatic geolocalization, and immediate safety check."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs text-white/80">
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider block font-semibold">
                    {isIt ? "FOTOGRAFIE" : "PHOTOS"}
                  </span>
                  <span className="font-semibold">{isIt ? "4 prospetti acquisiti" : "4 angles captured"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider block font-semibold">
                    {isIt ? "POSIZIONE" : "LOCATION"}
                  </span>
                  <span className="font-mono">{isIt ? "Coordinate certificate" : "Certified coordinates"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider block font-semibold">
                    {isIt ? "SICUREZZA" : "SAFETY"}
                  </span>
                  <span className="text-emerald-400 font-semibold">{isIt ? "Persone al sicuro" : "Persons safe"}</span>
                </div>
              </div>
            </div>

            {/* STATE 2 CONTENT: STRUCTURED RECORD */}
            <div ref={stateRecordContentRef} className="py-6 space-y-4" style={{ display: "none" }}>
              <div className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                {isIt ? "Allineamento Oggettivo delle Evidenze" : "Objective Evidentiary Synthesis"}
              </div>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-xl">
                {isIt
                  ? "I segnali raccolti si collegano al modulo CAI standard: associazione tra deformazione lamierati e circostanza d'urto, senza interpretazioni arbitrarie."
                  : "Captured signals lock into standard Agreed Statement criteria: sheet-metal damage directly mapped to circumstance criteria."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs text-white/80">
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider block font-semibold">
                    {isIt ? "DANNO VISIBILE" : "VISIBLE DAMAGE"}
                  </span>
                  <span className="font-semibold">{isIt ? "Paraurti Anteriore Sx" : "Front-Left Fender"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider block font-semibold">
                    {isIt ? "MODULO CAI" : "CAI CLAUSE"}
                  </span>
                  <span className="font-semibold">{isIt ? "Allineamento Casella 12" : "Box 12 Alignment"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider block font-semibold">
                    {isIt ? "CONTRADDIZIONI" : "CONFLICTS"}
                  </span>
                  <span className="text-emerald-400 font-semibold">{isIt ? "Nessuna discordanza" : "Zero conflicts"}</span>
                </div>
              </div>
            </div>

            {/* STATE 3 CONTENT: ADJUSTER REVIEW */}
            <div ref={stateReviewContentRef} className="py-6 space-y-4" style={{ display: "none" }}>
              <div className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                {isIt ? "Delibera Riservata al Perito Liquidatore" : "Governed Exclusively by Human Adjuster"}
              </div>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-xl">
                {isIt
                  ? "La perizia finale appartiene al professionista umano. IMPACTA fornisce il fascicolo ordinato e verificabile per liquidare rapidamente e con piena trasparenza."
                  : "Final claim adjudication rests entirely with the human claims specialist. IMPACTA delivers a defensible, structured file for prompt settlement."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs text-white/80">
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider block font-semibold">
                    {isIt ? "STATO FASCICOLO" : "FILE STATUS"}
                  </span>
                  <span className="text-emerald-400 font-semibold">{isIt ? "Pronto per Delibera" : "Ready for Review"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider block font-semibold">
                    {isIt ? "SUPERVISIONE" : "SUPERVISION"}
                  </span>
                  <span className="font-semibold">{isIt ? "Perito Liquidatore" : "Claims Specialist"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider block font-semibold">
                    {isIt ? "TRASPARENZA" : "TRANSPARENCY"}
                  </span>
                  <span className="font-semibold">{isIt ? "Fatti separati da stime" : "Facts vs inferences"}</span>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] text-white/50 uppercase tracking-wider">
              <span>{isIt ? "UNICO RECORD SINISTRO" : "UNIFIED INCIDENT FILE"}</span>
              <span className="text-white font-semibold">
                {isIt ? "ARCHITETTURA IMPACTA" : "IMPACTA ARCHITECTURE"}
              </span>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM DUAL ENTRY NAVIGATION */}
        <div className="w-full flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-white/10 text-xs font-semibold uppercase tracking-wider">
          <Link
            href="/app/report"
            className="group inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <span>{isIt ? "Prova l'interfaccia conducente" : "Explore driver workflow"}</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </Link>

          <Link
            href="/insurers"
            className="group inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <span>{isIt ? "Esplora banco liquidatori" : "Explore claims desk"}</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
