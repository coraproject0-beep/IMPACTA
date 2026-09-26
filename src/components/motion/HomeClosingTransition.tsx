"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HomeClosingTransition() {
  const { language } = useLanguage();
  const isIt = language === "it";

  const stageSectionRef = useRef<HTMLElement>(null);
  const headlineLeftRef = useRef<HTMLDivElement>(null);
  const headlineRightRef = useRef<HTMLDivElement>(null);

  // Three Spatial State Labels
  const labelIntakeRef = useRef<HTMLDivElement>(null);
  const labelRecordRef = useRef<HTMLDivElement>(null);
  const labelReviewRef = useRef<HTMLDivElement>(null);

  // Single 3D Document Slab / Plane
  const recordPlaneRef = useRef<HTMLDivElement>(null);
  const stateIntakeContentRef = useRef<HTMLDivElement>(null);
  const stateRecordContentRef = useRef<HTMLDivElement>(null);
  const stateReviewContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = stageSectionRef.current;
    const hLeft = headlineLeftRef.current;
    const hRight = headlineRightRef.current;
    const lIntake = labelIntakeRef.current;
    const lRecord = labelRecordRef.current;
    const lReview = labelReviewRef.current;
    const plane = recordPlaneRef.current;
    const cIntake = stateIntakeContentRef.current;
    const cRecord = stateRecordContentRef.current;
    const cReview = stateReviewContentRef.current;

    if (!sec || !hLeft || !hRight || !lIntake || !lRecord || !lReview || !plane || !cIntake || !cRecord || !cReview) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Setup initial positions
      gsap.set(hLeft, { xPercent: -15, opacity: 0.8 });
      gsap.set(hRight, { xPercent: 15, z: -100, opacity: 0.3 });

      // State 1 active initially
      gsap.set(lIntake, { opacity: 1, scale: 1, z: 0 });
      gsap.set([lRecord, lReview], { opacity: 0.25, scale: 0.9, z: -80 });

      // Document slab initially tilted in State 1
      gsap.set(plane, { rotateY: 18, rotateX: 6, z: -30 });
      gsap.set(cIntake, { opacity: 1, display: "block" });
      gsap.set(cRecord, { opacity: 0, display: "none" });
      gsap.set(cReview, { opacity: 0, display: "none" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 0.8,
        },
      });

      // -----------------------------------------------------------
      // PHASE 1 -> PHASE 2: Morph to STRUCTURED RECORD
      // -----------------------------------------------------------
      tl.to(hLeft, { xPercent: -5, opacity: 1, duration: 0.35, ease: "power2.inOut" }, 0)
        .to(hRight, { xPercent: 5, z: 0, opacity: 0.7, duration: 0.35, ease: "power2.inOut" }, 0)
        // Switch state labels
        .to(lIntake, { opacity: 0.25, scale: 0.9, z: -80, duration: 0.3 }, 0.2)
        .to(lRecord, { opacity: 1, scale: 1.05, z: 0, duration: 0.3 }, 0.2)
        // Plane rotates to center and compresses
        .to(plane, {
          rotateY: 0,
          rotateX: 0,
          z: 60,
          scale: 1.04,
          duration: 0.35,
          ease: "power2.inOut",
        }, 0.2)
        // Crossfade internal content on the same plane
        .to(cIntake, {
          opacity: 0,
          duration: 0.15,
          onComplete: () => {
            gsap.set(cIntake, { display: "none" });
            gsap.set(cRecord, { display: "block" });
          },
        }, 0.2)
        .to(cRecord, { opacity: 1, duration: 0.2 }, 0.35);

      // -----------------------------------------------------------
      // PHASE 2 -> PHASE 3: Morph to ADJUSTER REVIEW
      // -----------------------------------------------------------
      tl.to(hRight, { xPercent: 0, z: 20, opacity: 1, duration: 0.35, ease: "power2.out" }, 0.6)
        // Switch state labels
        .to(lRecord, { opacity: 0.25, scale: 0.9, z: -80, duration: 0.3 }, 0.6)
        .to(lReview, { opacity: 1, scale: 1.05, z: 0, duration: 0.3 }, 0.6)
        // Plane rotates open to perital inspection angle
        .to(plane, {
          rotateY: -14,
          rotateX: -4,
          z: 30,
          scale: 1,
          duration: 0.35,
          ease: "power2.inOut",
        }, 0.6)
        // Crossfade internal content to Review
        .to(cRecord, {
          opacity: 0,
          duration: 0.15,
          onComplete: () => {
            gsap.set(cRecord, { display: "none" });
            gsap.set(cReview, { display: "block" });
          },
        }, 0.6)
        .to(cReview, { opacity: 1, duration: 0.2 }, 0.75);
    }, sec);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={stageSectionRef}
      className="relative w-full min-h-[100vh] bg-[#000000] text-white pt-24 pb-16 sm:py-24 px-6 sm:px-12 lg:px-20 overflow-hidden select-none flex flex-col justify-between"
      style={{ perspective: "1600px" }}
    >
      {/* 1. HUGE TYPOGRAPHIC HEADLINE AT VIEWPORT EDGES */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-4 pt-4 border-b border-white/10 pb-6 [transform-style:preserve-3d]">
        <div
          ref={headlineLeftRef}
          className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-white leading-none will-change-transform"
        >
          {isIt ? "UN INCIDENTE." : "ONE INCIDENT."}
        </div>
        <div
          ref={headlineRightRef}
          className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-[#888888] leading-none sm:text-right will-change-transform"
        >
          {isIt ? "UN UNICO RECORD CONDIVISO." : "ONE SHARED RECORD."}
        </div>
      </div>

      {/* 2. THREE SPATIAL STATE LABELS (NO PILLS, NO TABS — BIG WORDS IN 3D SPACE) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex justify-between items-center py-6 [transform-style:preserve-3d]">
        <div
          ref={labelIntakeRef}
          className="text-xs sm:text-base font-bold uppercase tracking-[0.2em] text-white will-change-transform select-none"
        >
          01 / {isIt ? "RILIEVO CONDUCENTE" : "DRIVER INTAKE"}
        </div>
        <div
          ref={labelRecordRef}
          className="text-xs sm:text-base font-bold uppercase tracking-[0.2em] text-white will-change-transform select-none"
        >
          02 / {isIt ? "RECORD STRUTTURATO" : "STRUCTURED RECORD"}
        </div>
        <div
          ref={labelReviewRef}
          className="text-xs sm:text-base font-bold uppercase tracking-[0.2em] text-white will-change-transform select-none"
        >
          03 / {isIt ? "REVISIONE PERITALE" : "ADJUSTER REVIEW"}
        </div>
      </div>

      {/* 3. CENTRAL SHARED 3D DOCUMENT SLAB (ONE OBJECT, THREE STATES, ZERO CARDS) */}
      <div className="relative z-20 my-auto w-full flex items-center justify-center py-8 [transform-style:preserve-3d]">
        <div
          ref={recordPlaneRef}
          className="w-full max-w-3xl border-t-2 border-b-2 border-white/30 bg-[#0E0F10] p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.9)] will-change-transform [transform-style:preserve-3d]"
        >
          {/* Header Bar of the Shared Object */}
          <div className="flex items-center justify-between border-b border-white/15 pb-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-mono font-bold text-white tracking-wider">IMP-260925-014</span>
            </div>
            <span className="text-[11px] font-mono text-white/50">14:22:08 UTC • VIA COLOMBO, MILANO</span>
          </div>

          {/* STATE 1 CONTENT: DRIVER INTAKE (Raw Fragments) */}
          <div ref={stateIntakeContentRef} className="py-6 space-y-4">
            <div className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
              {isIt ? "Acquisizione Dati in Situ" : "Scene Intake & Signal Capture"}
            </div>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-xl">
              {isIt
                ? "Il conducente documenta la scena sul posto: 4 fotografie guidate, geolocalizzazione automatica e verifica immediata delle condizioni di sicurezza."
                : "The driver documents the incident at roadside: 4 guided photo viewpoints, automatic geolocalization, and immediate safety check."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-white/10 text-xs text-white/80">
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
                <span className="font-mono">45.4642° N • 9.1900° E</span>
              </div>
              <div>
                <span className="text-[10px] text-white/40 uppercase tracking-wider block font-semibold">
                  {isIt ? "SICUREZZA" : "SAFETY"}
                </span>
                <span className="text-emerald-400 font-semibold">{isIt ? "Persone al sicuro" : "Persons safe"}</span>
              </div>
            </div>
          </div>

          {/* STATE 2 CONTENT: STRUCTURED RECORD (Aligned Ledger) */}
          <div ref={stateRecordContentRef} className="py-6 space-y-4" style={{ display: "none" }}>
            <div className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
              {isIt ? "Allineamento Oggettivo delle Evidenze" : "Objective Evidentiary Synthesis"}
            </div>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-xl">
              {isIt
                ? "I segnali raccolti si collegano al modulo CAI standard: associazione tra deformazione lamierati e casella 12, senza interpretazioni arbitrarie."
                : "Captured signals lock into standard European Agreed Statement criteria: sheet-metal damage directly mapped to circumstance box 12."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-white/10 text-xs text-white/80">
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
                <span className="font-semibold">{isIt ? "Casella 12 • Concorde" : "Box 12 • Concordant"}</span>
              </div>
              <div>
                <span className="text-[10px] text-white/40 uppercase tracking-wider block font-semibold">
                  {isIt ? "CONTRADDIZIONI" : "CONFLICTS"}
                </span>
                <span className="text-emerald-400 font-semibold">{isIt ? "Nessuna discordanza" : "Zero conflicts"}</span>
              </div>
            </div>
          </div>

          {/* STATE 3 CONTENT: ADJUSTER REVIEW (Ready for Decision) */}
          <div ref={stateReviewContentRef} className="py-6 space-y-4" style={{ display: "none" }}>
            <div className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
              {isIt ? "Delibera Riservata al Perito Liquidatore" : "Governed Exclusively by Human Adjuster"}
            </div>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-xl">
              {isIt
                ? "La perizia finale appartiene al professionista umano. IMPACTA fornisce il fascicolo ordinato e verificabile per liquidare rapidamente e con piena trasparenza."
                : "Final claim adjudication rests entirely with the human claims specialist. IMPACTA delivers a defensible, structured file for prompt settlement."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-white/10 text-xs text-white/80">
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
              {isIt ? "IMPACTA ARCHITECTURE" : "IMPACTA ARCHITECTURE"}
            </span>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM DUAL ENTRY NAVIGATION (NO PILL BUTTONS, CLEAN EDITORIAL ANCHORS) */}
      <div className="w-full flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-white/10 text-xs font-semibold uppercase tracking-wider">
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
    </section>
  );
}
