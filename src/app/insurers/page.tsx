"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PublicShell } from "@/components/public/PublicShell";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InsurersPage() {
  return (
    <PublicShell>
      <InsurersContent />
    </PublicShell>
  );
}

function InsurersContent() {
  const { t, language } = useLanguage();
  const isIt = language === "it";

  // SCENE 3: Hero Collision Field Refs
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const vehicleARef = useRef<HTMLDivElement>(null);
  const vehicleBRef = useRef<HTMLDivElement>(null);
  const trajectorySvgRef = useRef<SVGSVGElement>(null);
  const impactPulseRef = useRef<SVGCircleElement>(null);
  const heroConceptsRef = useRef<HTMLDivElement>(null);

  // SCENE 2: Queue Extrusion Refs
  const queueSectionRef = useRef<HTMLElement>(null);
  const queueContainerRef = useRef<HTMLDivElement>(null);
  const row0Ref = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null); // Selected claim
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const row4Ref = useRef<HTMLDivElement>(null);
  const claimColumnsRef = useRef<HTMLDivElement>(null);

  // SCENE 4: 3D Evidence Fan Refs (3 Visual Planes, Zero Cards)
  const fanSectionRef = useRef<HTMLElement>(null);
  const planeRoadRef = useRef<HTMLDivElement>(null);
  const planeDamageRef = useRef<HTMLDivElement>(null);
  const planeCaiRef = useRef<HTMLDivElement>(null);
  const unifiedRailRef = useRef<HTMLDivElement>(null);

  // SCENE 5: Observed vs Inferred Depth Swap Refs
  const depthSectionRef = useRef<HTMLElement>(null);
  const observedBlockRef = useRef<HTMLDivElement>(null);
  const inferredBlockRef = useRef<HTMLDivElement>(null);
  const humanReviewBaselineRef = useRef<HTMLDivElement>(null);

  // Section 5: Payoff Refs
  const payoffSectionRef = useRef<HTMLElement>(null);
  const payoffHeadlineRef = useRef<HTMLHeadingElement>(null);
  const payoffTextRef = useRef<HTMLDivElement>(null);
  const horizonLineRef = useRef<HTMLDivElement>(null);

  // -------------------------------------------------------------
  // 1. SCENE 3: HERO COLLISION FIELD ANIMATION
  // -------------------------------------------------------------
  useEffect(() => {
    const hero = heroRef.current;
    const headline = headlineRef.current;
    const vehA = vehicleARef.current;
    const vehB = vehicleBRef.current;
    const traj = trajectorySvgRef.current;
    const pulse = impactPulseRef.current;
    const concepts = heroConceptsRef.current;
    if (!hero || !headline || !vehA || !vehB || !traj || !pulse || !concepts) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Word-by-word headline entrance with vertical mask
      const words = headline.querySelectorAll(".hero-word");
      gsap.fromTo(
        words,
        { y: 60, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          stagger: 0.09,
          ease: "power3.out",
        }
      );

      // Vehicles converge from depth
      gsap.fromTo(
        vehA,
        { x: -90, y: 40, z: -140, rotateY: 18, opacity: 0 },
        { x: 0, y: 0, z: 20, rotateY: -4, opacity: 1, duration: 1.3, ease: "power3.out", delay: 0.15 }
      );

      gsap.fromTo(
        vehB,
        { x: 90, y: -40, z: -180, rotateY: -18, opacity: 0 },
        { x: 0, y: 0, z: -15, rotateY: 4, opacity: 1, duration: 1.3, ease: "power3.out", delay: 0.25 }
      );

      // Trajectory lines draw
      const pathA = traj.querySelector(".traj-a");
      const pathB = traj.querySelector(".traj-b");
      if (pathA && pathB) {
        gsap.fromTo(
          [pathA, pathB],
          { strokeDashoffset: 400, opacity: 0 },
          { strokeDashoffset: 0, opacity: 1, duration: 1.2, ease: "power2.inOut", delay: 0.4 }
        );
      }

      // Contact pulse
      gsap.fromTo(
        pulse,
        { scale: 0, opacity: 0 },
        { scale: 1.8, opacity: 0.9, duration: 0.8, ease: "back.out(2)", delay: 0.8 }
      );

      // Product concept labels emerge
      gsap.fromTo(
        concepts.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power2.out", delay: 0.9 }
      );
    }, hero);

    return () => ctx.revert();
  }, []);

  // -------------------------------------------------------------
  // 2. SCENE 2: QUEUE EXTRUSION (Full-viewport ledger strips, 3D scroll extrusion)
  // -------------------------------------------------------------
  useEffect(() => {
    const sec = queueSectionRef.current;
    const r0 = row0Ref.current;
    const r1 = row1Ref.current;
    const r2 = row2Ref.current;
    const r3 = row3Ref.current;
    const r4 = row4Ref.current;
    const cols = claimColumnsRef.current;
    if (!sec || !r0 || !r1 || !r2 || !r3 || !r4 || !cols) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(cols, { opacity: 0, y: 30, height: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: "+=190%",
          pin: true,
          scrub: 0.7,
        },
      });

      // 1. Non-selected rows recede in Z and separate vertically
      tl.to([r0, r2, r3, r4], {
        z: -180,
        opacity: 0.12,
        y: (i) => (i === 0 ? -60 : (i + 1) * 35),
        duration: 0.4,
        ease: "power2.inOut",
      }, 0)
      // 2. Selected row steps forward in Z and expands
      .to(r1, {
        z: 80,
        scale: 1.04,
        duration: 0.4,
        ease: "power2.inOut",
      }, 0)
      // 3. Selected row reveals expanded structured claim columns
      .to(cols, {
        opacity: 1,
        y: 0,
        height: "auto",
        duration: 0.5,
        ease: "power3.out",
      }, 0.35);

      // Scroll velocity tilt response: 1-3 degrees tilt on fast scrolling
      ScrollTrigger.create({
        trigger: sec,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const vel = self.getVelocity();
          const tilt = Math.max(-3, Math.min(3, vel * 0.002));
          gsap.to([r0, r1, r2, r3, r4], {
            rotateX: tilt,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
      });
    }, sec);

    return () => ctx.revert();
  }, []);

  // -------------------------------------------------------------
  // 3. SCENE 4: 3D EVIDENCE FAN (3 Visual Planes, Clip reveals, Collapse into 1 Record)
  // -------------------------------------------------------------
  useEffect(() => {
    const sec = fanSectionRef.current;
    const road = planeRoadRef.current;
    const damage = planeDamageRef.current;
    const cai = planeCaiRef.current;
    const unified = unifiedRailRef.current;
    if (!sec || !road || !damage || !cai || !unified) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Initial state: close together
      gsap.set(road, { x: 0, rotateY: 0, z: 0, opacity: 0.7 });
      gsap.set(damage, { z: 15, scale: 0.95, opacity: 0.9 });
      gsap.set(cai, { x: 0, rotateY: 0, z: 0, opacity: 0.7 });
      gsap.set(unified, { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top 65%",
          end: "bottom 30%",
          scrub: 0.8,
        },
      });

      const isMobile = window.innerWidth < 768;
      const fanSpread = isMobile ? 35 : 300;
      const fanRotate = isMobile ? 6 : 22;

      // Step 1: Unfold in wide 3D perspective
      tl.to(road, {
        x: -fanSpread,
        rotateY: fanRotate,
        z: isMobile ? -30 : -60,
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
      }, 0)
      .to(damage, {
        z: isMobile ? 40 : 70,
        scale: isMobile ? 1.01 : 1.03,
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
      }, 0)
      .to(cai, {
        x: fanSpread,
        rotateY: -fanRotate,
        z: isMobile ? -30 : -60,
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
      }, 0)
      // Step 2: Peak hold, then rotate towards 0 and collapse toward center line
      .to([road, cai], {
        x: 0,
        rotateY: 0,
        z: 0,
        opacity: 0.4,
        duration: 0.35,
        ease: "power3.inOut",
      }, 0.55)
      .to(damage, {
        z: 0,
        scale: 1,
        opacity: 0.4,
        duration: 0.35,
        ease: "power3.inOut",
      }, 0.55)
      // Step 3: Collapse into unified structured line system
      .to(unified, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power2.out",
      }, 0.75);
    }, sec);

    return () => ctx.revert();
  }, []);

  // -------------------------------------------------------------
  // 4. SCENE 5: OBSERVED VS INFERRED DEPTH SWAP (Zero Button, Scroll-driven 3D Swap)
  // -------------------------------------------------------------
  useEffect(() => {
    const sec = depthSectionRef.current;
    const obs = observedBlockRef.current;
    const inf = inferredBlockRef.current;
    const review = humanReviewBaselineRef.current;
    if (!sec || !obs || !inf || !review) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Start: OBSERVED foreground, INFERRED in deep background
      gsap.set(obs, { z: 40, x: 0, opacity: 1 });
      gsap.set(inf, { z: -260, x: 40, opacity: 0.35 });
      gsap.set(review, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top 68%",
          end: "bottom 32%",
          scrub: 0.8,
        },
      });

      // 1. OBSERVED shifts aside and recedes slightly
      tl.to(obs, {
        x: -50,
        z: -140,
        opacity: 0.45,
        duration: 0.45,
        ease: "power2.inOut",
      }, 0)
      // 2. INFERRED surges forward into dominant focus
      .to(inf, {
        x: 0,
        z: 40,
        opacity: 1,
        duration: 0.45,
        ease: "power2.inOut",
      }, 0)
      // 3. HUMAN REVIEW baseline enters connecting both layers
      .to(review, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      }, 0.55);
    }, sec);

    return () => ctx.revert();
  }, []);

  // -------------------------------------------------------------
  // 5. FINAL PAYOFF SECTION ANIMATION
  // -------------------------------------------------------------
  useEffect(() => {
    const sec = payoffSectionRef.current;
    const headline = payoffHeadlineRef.current;
    const text = payoffTextRef.current;
    const line = horizonLineRef.current;
    if (!sec || !headline || !text || !line) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const lines = headline.querySelectorAll(".payoff-line");
      gsap.set(lines, { x: -80, opacity: 0 });
      gsap.set(text, { opacity: 0, y: 30 });
      gsap.set(line, { scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top 70%",
          end: "bottom 40%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(lines, {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.14,
        ease: "power3.out",
      })
      .to(text, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.5")
      .to(line, {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.inOut",
      }, "-=0.6");
    }, sec);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-[#FFFFFF] selection:bg-[#0E0F10] selection:text-white">
      {/* ----------------------------------------------------------- */}
      {/* 1. SCENE 3: HERO COLLISION FIELD (No White Card, Spatial 3D Convergence) */}
      {/* ----------------------------------------------------------- */}
      <section
        ref={heroRef}
        className="relative py-20 sm:py-32 lg:py-36 px-6 sm:px-12 lg:px-20 border-b border-[#E5E5E3] overflow-hidden bg-gradient-to-b from-[#FFFFFF] to-[#FBFBFA]"
        style={{ perspective: "1400px" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authoritative Editorial Statement */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.24em] font-semibold text-[#777777] block">
              {isIt ? "OPERAZIONI SINISTRI E LIQUIDAZIONE" : "CLAIMS OPERATIONS & SETTLEMENT"}
            </span>

            <h1
              ref={headlineRef}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0E0F10] leading-[1.02] uppercase overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="hero-word inline-block mr-3">
                {isIt ? "DATI" : "STRUCTURED"}
              </span>
              <span className="hero-word inline-block text-[#0E0F10]">
                {isIt ? "OGGETTIVI." : "EVIDENCE."}
              </span>
              <br />
              <span className="hero-word inline-block mr-3 text-[#555555]">
                {isIt ? "PRONTI PER" : "READY FOR"}
              </span>
              <span className="hero-word inline-block text-[#555555]">
                {isIt ? "LA REVISIONE." : "REVIEW."}
              </span>
            </h1>

            <p className="text-base sm:text-xl text-[#555555] font-light leading-relaxed max-w-xl">
              {isIt
                ? "Sostituisce i moduli CAI illeggibili e le dichiarazioni contraddittorie con fotografie georeferenziate, contesto stradale e fascicoli strutturati per il perito liquidatore."
                : "Replaces illegible paper forms and contradictory statements with georeferenced photos, roadway context, and structured claim records ready for adjuster review."}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <Link
                href="/console/login"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0E0F10] text-white text-xs font-bold tracking-wider uppercase hover:bg-black transition-all shadow-sm active:scale-[0.99]"
              >
                <span>{isIt ? "Accedi alla console sinistri" : "Open Claims Console"}</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                  →
                </span>
              </Link>
              <a
                href="#claims-queue"
                className="text-xs font-medium text-[#555555] hover:text-[#0E0F10] transition-colors uppercase tracking-wider"
              >
                {isIt ? "Guarda la trasformazione spaziale ↓" : "Explore spatial transformation ↓"}
              </a>
            </div>
          </div>

          {/* Right Column: SPATIAL COLLISION FIELD (No Rectangles, SVG Silhouettes + Converging Vectors) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end [transform-style:preserve-3d]">
            <div className="relative w-full max-w-lg min-h-[440px] flex items-center justify-center [transform-style:preserve-3d] select-none py-2">
              {/* Converging Trajectory SVG Overlay */}
              <svg
                ref={trajectorySvgRef}
                viewBox="0 0 460 380"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                {/* Vehicle A Trajectory (From lower-left to collision center) */}
                <path
                  className="traj-a"
                  d="M 60 330 C 120 300, 180 230, 225 185"
                  stroke="#0E0F10"
                  strokeWidth="2"
                  strokeDasharray="400"
                  strokeDashoffset="0"
                />
                {/* Vehicle B Trajectory (From upper-right to collision center) */}
                <path
                  className="traj-b"
                  d="M 400 50 C 350 90, 280 145, 225 185"
                  stroke="#888888"
                  strokeWidth="2"
                  strokeDasharray="400"
                  strokeDashoffset="0"
                />
                {/* Central Collision Focal Point Pulse */}
                <circle
                  ref={impactPulseRef}
                  cx="225"
                  cy="185"
                  r="18"
                  stroke="#DC2626"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <circle cx="225" cy="185" r="5" fill="#DC2626" />
              </svg>

              {/* Vehicle A Silhouette Marker (Lower Left Depth) */}
              <div
                ref={vehicleARef}
                className="absolute left-2 bottom-20 sm:bottom-24 max-w-[200px] border-l-2 border-[#0E0F10] pl-3 py-1 space-y-1 will-change-transform [transform-style:preserve-3d]"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0E0F10] block">
                  {isIt ? "VEICOLO A (ASSICURATO)" : "VEHICLE A (INSURED)"}
                </span>
                <div className="text-base font-bold uppercase text-[#0E0F10]">
                  {isIt ? "Berlina • Corsia Diretta" : "Sedan • Straight Lane"}
                </div>
                <div className="text-[11px] text-[#555555] font-light">
                  {isIt ? "Traiettoria rettilinea confermata" : "Confirmed linear heading"}
                </div>
              </div>

              {/* Vehicle B Silhouette Marker (Upper Right Depth) */}
              <div
                ref={vehicleBRef}
                className="absolute right-2 top-6 max-w-[200px] border-l-2 border-[#888888] pl-3 py-1 space-y-1 will-change-transform [transform-style:preserve-3d]"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#777777] block">
                  {isIt ? "VEICOLO B (CONTROPARTE)" : "VEHICLE B (COUNTERPARTY)"}
                </span>
                <div className="text-base font-bold uppercase text-[#0E0F10]">
                  {isIt ? "Compatta • Punto di Contatto" : "Compact • Contact Zone"}
                </div>
                <div className="text-[11px] text-[#555555] font-light">
                  {isIt ? "Deformazione paraurti anteriore sx" : "Front-left bumper deformation"}
                </div>
              </div>

              {/* Spatial Product Concept Badges (No Precision Theatre) */}
              <div
                ref={heroConceptsRef}
                className="absolute inset-x-4 bottom-0 border-t border-[#E5E5E3] pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left [transform-style:preserve-3d]"
              >
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#888888] font-bold block">
                    {isIt ? "DANNI VISIBILI" : "VISIBLE DAMAGE"}
                  </span>
                  <span className="text-xs font-semibold text-[#0E0F10]">
                    {isIt ? "Deformazione Concorde" : "Consistent Impact"}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#888888] font-bold block">
                    {isIt ? "CONTESTO INCIDENTE" : "INCIDENT CONTEXT"}
                  </span>
                  <span className="text-xs font-semibold text-[#0E0F10]">
                    {isIt ? "Corsia Ordinaria" : "Standard Roadway"}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#888888] font-bold block">
                    {isIt ? "CIRCOSTANZA CAI" : "CAI CIRCUMSTANCE"}
                  </span>
                  <span className="text-xs font-semibold text-[#0E0F10]">
                    {isIt ? "Casella 12 Allineata" : "Box 12 Aligned"}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#888888] font-bold block">
                    {isIt ? "REVISIONE UMANA" : "HUMAN REVIEW"}
                  </span>
                  <span className="text-xs font-semibold text-emerald-800">
                    {isIt ? "Pronto per Delibera" : "Ready for Decision"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- */}
      {/* 2. SCENE 2: QUEUE EXTRUSION (Full-Viewport Ledger Rails across 70-85vw) */}
      {/* ----------------------------------------------------------- */}
      <section
        id="claims-queue"
        ref={queueSectionRef}
        className="relative w-full h-[100vh] bg-[#F7F7F6] border-b border-[#E5E5E3] flex items-center justify-center overflow-hidden"
        style={{ perspective: "1600px" }}
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto flex flex-col items-center">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs uppercase tracking-[0.24em] text-[#777777] font-semibold block">
              {isIt ? "FLUSSO OPERATIVO" : "OPERATIONAL WORKFLOW"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0E0F10]">
              {isIt ? "DALLA CODA ALLA REVISIONE." : "FROM QUEUE TO REVIEW."}
            </h2>
            <p className="text-sm sm:text-base text-[#666666] font-light max-w-xl mx-auto">
              {isIt
                ? "Ogni sinistro evolve da riga operativa a fascicolo strutturato per la delibera peritale."
                : "Every claim evolves from operational ledger row to a structured record ready for human adjuster sign-off."}
            </p>
          </div>

          {/* Perspective Queue Ledger Stage (70-85vw wide lines, Zero floating cards) */}
          <div
            ref={queueContainerRef}
            className="relative w-full max-w-4xl min-h-[380px] flex flex-col justify-center [transform-style:preserve-3d]"
          >
            {/* Row 0: Top ambient row */}
            <div
              ref={row0Ref}
              className="w-full border-b border-[#E5E5E3] py-3 flex items-center justify-between text-xs text-[#888888] will-change-transform"
            >
              <span className="font-mono">IMP-260925-018</span>
              <span className="uppercase font-medium">Veicolo A vs Veicolo B • Milano</span>
              <span className="font-mono">16:05 UTC</span>
              <span className="text-[10px] uppercase tracking-wider">{isIt ? "RILIEVO COMPLETATO" : "INTAKE COMPLETE"}</span>
            </div>

            {/* Row 1: SELECTED CLAIM — Extrudes Forward in Z-space */}
            <div
              ref={row1Ref}
              className="w-full bg-[#0E0F10] text-white p-5 sm:p-6 my-2 shadow-2xl border-l-4 border-emerald-400 will-change-transform z-20 [transform-style:preserve-3d]"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-emerald-400">IMP-260925-014</span>
                    <span className="text-[10px] uppercase tracking-widest text-white/60">
                      {isIt ? "IN ATTESA DI REVISIONE PERITALE" : "PENDING ADJUSTER REVIEW"}
                    </span>
                  </div>
                  <div className="text-base sm:text-lg font-bold uppercase tracking-tight">
                    {isIt ? "Veicolo A vs Veicolo B • Collisione Laterale-Anteriore" : "Vehicle A vs Vehicle B • Lateral-Frontal Contact"}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-white/50 block">14:22:08 UTC</span>
                  <span className="text-xs uppercase font-semibold text-white tracking-wider underline">
                    {isIt ? "Fascicolo Selezionato" : "Selected Claim"}
                  </span>
                </div>
              </div>

              {/* Extruded Columns (Revealed as row steps forward) */}
              <div ref={claimColumnsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-5 text-xs overflow-hidden">
                <div className="border-l border-white/20 pl-4 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-white/50 font-bold block">
                    {isIt ? "RILIEVI FOTOGRAFICI" : "PHOTO EVIDENCE"}
                  </span>
                  <div className="text-sm font-bold text-white">{isIt ? "4 prospetti acquisiti" : "4 viewpoints aligned"}</div>
                  <div className="text-[11px] text-white/70 font-light">
                    {isIt ? "Danni visivi coerenti" : "Damage zones consistent"}
                  </div>
                </div>

                <div className="border-l border-white/20 pl-4 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-white/50 font-bold block">
                    {isIt ? "CONTESTO STRADALE" : "ROADWAY CONTEXT"}
                  </span>
                  <div className="text-sm font-bold text-white">{isIt ? "Corsia a senso unico" : "Single-direction lane"}</div>
                  <div className="text-[11px] text-white/70 font-light">
                    {isIt ? "Coordinate GNSS verificate" : "GNSS coordinates aligned"}
                  </div>
                </div>

                <div className="border-l border-white/20 pl-4 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-white/50 font-bold block">
                    {isIt ? "CIRCOSTANZA CAI" : "CAI CIRCUMSTANCE"}
                  </span>
                  <div className="text-sm font-bold text-white">{isIt ? "Casella 12 Concorde" : "Box 12 Concordance"}</div>
                  <div className="text-[11px] text-white/70 font-light">
                    {isIt ? "Stesso senso di marcia" : "Same travel direction"}
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Recedes into depth */}
            <div
              ref={row2Ref}
              className="w-full border-b border-[#E5E5E3] py-3 flex items-center justify-between text-xs text-[#888888] will-change-transform"
            >
              <span className="font-mono">IMP-260925-011</span>
              <span className="uppercase font-medium">Veicolo C vs Veicolo D • Roma</span>
              <span className="font-mono">12:40 UTC</span>
              <span className="text-[10px] uppercase tracking-wider">{isIt ? "ARCHIVIATO" : "ARCHIVED"}</span>
            </div>

            {/* Row 3: Recedes further */}
            <div
              ref={row3Ref}
              className="w-full border-b border-[#E5E5E3] py-3 flex items-center justify-between text-xs text-[#888888] will-change-transform"
            >
              <span className="font-mono">IMP-260925-008</span>
              <span className="uppercase font-medium">Veicolo E vs Veicolo F • Torino</span>
              <span className="font-mono">09:15 UTC</span>
              <span className="text-[10px] uppercase tracking-wider">{isIt ? "IN ELABORAZIONE" : "PROCESSING"}</span>
            </div>

            {/* Row 4: Deepest background row */}
            <div
              ref={row4Ref}
              className="w-full border-b border-[#E5E5E3] py-3 flex items-center justify-between text-xs text-[#888888] will-change-transform"
            >
              <span className="font-mono">IMP-260925-003</span>
              <span className="uppercase font-medium">Veicolo G vs Veicolo H • Bologna</span>
              <span className="font-mono">08:30 UTC</span>
              <span className="text-[10px] uppercase tracking-wider">{isIt ? "ARCHIVIATO" : "ARCHIVED"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- */}
      {/* 3. SCENE 4: 3D EVIDENCE FAN (Three Actual Visual Planes, Zero Cards) */}
      {/* ----------------------------------------------------------- */}
      <section
        ref={fanSectionRef}
        className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3] overflow-hidden"
        style={{ perspective: "1400px" }}
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-[0.24em] text-[#777777] font-semibold block">
              {isIt ? "STRUTTURAZIONE MULTILIVELLO" : "MULTI-SOURCE SYNTHESIS"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0E0F10] leading-tight">
              {isIt ? "TRE PIANI PROBATORI. UN UNICO RECORD." : "THREE EVIDENCE PLANES. ONE CLAIM RECORD."}
            </h2>
            <p className="text-base sm:text-xl text-[#555555] font-light leading-relaxed">
              {isIt
                ? "Contesto stradale, danni visibili e circostanze CAI si aprono nello spazio prima di ricomporsi in un'unica perizia."
                : "Roadway context, visible damage, and CAI circumstances unfold spatially before collapsing into a single reviewable file."}
            </p>
          </div>

          {/* Three Visual Planes Stage in Perspective (Direct on page, Zero Box Cards) */}
          <div className="relative w-full min-h-[440px] flex items-center justify-center [transform-style:preserve-3d]">
            {/* Visual Plane 1: ROAD CONTEXT (Vector roadway geometry, clip reveal) */}
            <div
              ref={planeRoadRef}
              className="absolute w-[290px] sm:w-[340px] border-t-2 border-l-2 border-[#0E0F10] p-6 bg-white/95 select-none will-change-transform space-y-3"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#0E0F10]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0E0F10]">
                  {isIt ? "CONTESTO STRADALE" : "ROAD CONTEXT"}
                </span>
              </div>
              <div className="text-lg font-bold uppercase text-[#0E0F10]">
                Via Cristoforo Colombo
              </div>
              <p className="text-xs text-[#555555] font-light leading-relaxed">
                {isIt ? "Carreggiata a doppio senso con corsia di marcia ordinata. Nessuna anomalia geometrica riscontrata." : "Standard roadway. No abnormal pavement obstructions documented."}
              </p>
              <div className="text-[10px] font-mono text-[#777777] border-t border-[#E5E5E3] pt-2">
                45.4642° N • 9.1900° E
              </div>
            </div>

            {/* Visual Plane 2: VISIBLE DAMAGE (Automotive damage wireframe, forward Z) */}
            <div
              ref={planeDamageRef}
              className="absolute w-[300px] sm:w-[360px] border-2 border-[#0E0F10] p-6 bg-[#FFFFFF] shadow-xl select-none will-change-transform z-10 space-y-3"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0E0F10]">
                  {isIt ? "DANNO VISIBILE" : "VISIBLE DAMAGE"}
                </span>
                <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">
                  {isIt ? "PUNTO D'URTO" : "IMPACT ZONE"}
                </span>
              </div>
              <div className="text-lg font-bold uppercase text-[#0E0F10]">
                {isIt ? "Paraurti Anteriore Sx" : "Front-Left Fender"}
              </div>
              <p className="text-xs text-[#555555] font-light leading-relaxed">
                {isIt ? "Deformazione lamierati coerente con decelerazione progressiva e contatto ad angolo acuto." : "Sheet-metal deformation consistent with progressive deceleration and acute angle contact."}
              </p>
              <div className="text-[10px] font-semibold text-[#0E0F10] uppercase tracking-wider border-t border-[#E5E5E3] pt-2">
                {isIt ? "4 prospetti fotografici allineati" : "4 photo viewpoints aligned"}
              </div>
            </div>

            {/* Visual Plane 3: CAI CIRCUMSTANCE (Agreed statement schematic, opposite rotation) */}
            <div
              ref={planeCaiRef}
              className="absolute w-[290px] sm:w-[340px] border-t-2 border-r-2 border-[#0E0F10] p-6 bg-white/95 select-none will-change-transform space-y-3"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-600" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0E0F10]">
                  {isIt ? "CIRCOSTANZA CAI" : "CAI CIRCUMSTANCE"}
                </span>
              </div>
              <div className="text-lg font-bold uppercase text-[#0E0F10]">
                {isIt ? "Casella 12 Concorde" : "Box 12 Concordance"}
              </div>
              <p className="text-xs text-[#555555] font-light leading-relaxed">
                {isIt ? "I veicoli circolavano nello stesso senso di marcia. Nessun conflitto dichiarato tra le parti." : "Vehicles were traveling in the same direction. No conflict reported between drivers."}
              </p>
              <div className="text-[10px] font-semibold text-emerald-800 uppercase tracking-wider border-t border-[#E5E5E3] pt-2">
                {isIt ? "Nessuna discordanza" : "Zero statement conflicts"}
              </div>
            </div>

            {/* Unified Collapsed Rail (Appears when all 3 planes dock together) */}
            <div
              ref={unifiedRailRef}
              className="absolute bottom-2 inset-x-4 max-w-3xl mx-auto border-t-2 border-b-2 border-[#0E0F10] py-3 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold uppercase tracking-wider text-[#0E0F10] [transform-style:preserve-3d]"
            >
              <span>{isIt ? "FASCICOLO SINISTRO STRUTTURATO" : "STRUCTURED INCIDENT RECORD"}</span>
              <span className="text-[#666666] font-normal">{isIt ? "Tutti i segnali allineati su un unico asse" : "All signals aligned on single operational axis"}</span>
              <span className="text-emerald-800 font-bold">{isIt ? "PRONTO PER IL PERITO" : "READY FOR ADJUSTER"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- */}
      {/* 4. SCENE 5: OBSERVED VS INFERRED DEPTH SWAP (Zero Button, Scroll 3D Shift) */}
      {/* ----------------------------------------------------------- */}
      <section
        ref={depthSectionRef}
        className="py-24 sm:py-36 bg-[#F7F7F6] border-b border-[#E5E5E3] overflow-hidden"
        style={{ perspective: "1600px" }}
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.24em] text-[#777777] font-semibold block">
              {isIt ? "SEPARAZIONE DEI LIVELLI" : "SEPARATION OF SIGNALS"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0E0F10]">
              {isIt ? "CIÒ CHE OSSERVIAMO. CIÒ CHE INFERIAMO." : "WHAT WE SEE. WHAT WE INFER."}
            </h2>
            <p className="text-base sm:text-xl text-[#555555] font-light leading-relaxed">
              {isIt
                ? "I fatti fisici riscontrati restano rigidamente distinti dalle ricostruzioni probabilistiche. Nessun calcolo automatico sostituisce il giudizio peritale."
                : "Physical evidence remains strictly distinguished from probabilistic inference. No automated computation overrides human adjuster deliberation."}
            </p>
          </div>

          {/* 3D Depth-Swap Stage: Observed in front, Inferred behind, Scroll swaps focus */}
          <div className="relative w-full min-h-[400px] flex items-center justify-center [transform-style:preserve-3d]">
            {/* Plane 1: OBSERVED (Direct factual evidence) */}
            <div
              ref={observedBlockRef}
              className="absolute left-0 sm:left-8 top-4 max-w-lg border-l-4 border-[#0E0F10] pl-6 py-4 space-y-4 will-change-transform [transform-style:preserve-3d]"
            >
              <div className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0E0F10]">
                {isIt ? "OSSERVATO" : "OBSERVED"}
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0E0F10] block">
                {isIt ? "EVIDENZE DIRETTE RISCONTRATE" : "DIRECT FACTUAL EVIDENCE"}
              </span>
              <ul className="text-sm sm:text-base text-[#555555] font-light space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E0F10] mt-2 flex-shrink-0" />
                  <span>{isIt ? "Danno visibile frontale sinistro documentato da 4 prospetti" : "Visible front-left damage documented across 4 photos"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E0F10] mt-2 flex-shrink-0" />
                  <span>{isIt ? "Posizione dei veicoli nelle fotografie scattate in situ" : "Vehicle positions captured in scene photography"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E0F10] mt-2 flex-shrink-0" />
                  <span>{isIt ? "Orario e coordinate rilevati all'acquisizione" : "Reported capture time and location coordinates"}</span>
                </li>
              </ul>
            </div>

            {/* Plane 2: INFERRED (Probabilistic reconstruction, requires confirmation) */}
            <div
              ref={inferredBlockRef}
              className="absolute right-0 sm:right-8 bottom-4 max-w-lg border-l-4 border-dashed border-[#888888] pl-6 py-4 space-y-4 will-change-transform [transform-style:preserve-3d]"
            >
              <div className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#777777]">
                {isIt ? "INFERITO" : "INFERRED"}
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#777777] block">
                {isIt ? "RICOSTRUZIONI SOGGETTE A VERIFICA" : "ITEMS REQUIRING HUMAN REVIEW"}
              </span>
              <ul className="text-sm sm:text-base text-[#666666] font-light space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#888888] mt-2 flex-shrink-0" />
                  <span>{isIt ? "Traiettoria d'impatto probabile prima del contatto" : "Probable vehicle approach trajectory before impact"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#888888] mt-2 flex-shrink-0" />
                  <span>{isIt ? "Sequenza verosimile di decelerazione dei veicoli" : "Plausible vehicle deceleration sequence"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#888888] mt-2 flex-shrink-0" />
                  <span>{isIt ? "Elementi da convalidare con la controparte" : "Items requiring adjuster cross-verification"}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Plane 3: HUMAN REVIEW BASELINE (Connects the two layers) */}
          <div
            ref={humanReviewBaselineRef}
            className="pt-10 border-t border-[#0E0F10] space-y-3 text-center sm:text-left will-change-transform"
          >
            <div className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0E0F10]">
              {isIt ? "IL GIUDIZIO UMANO CONNETTE I DUE LIVELLI." : "HUMAN REVIEW CONNECTS THE TWO."}
            </div>
            <p className="text-sm sm:text-base text-[#666666] font-light max-w-2xl">
              {isIt
                ? "La tecnologia organizza i fatti. La decisione appartiene al perito liquidatore."
                : "Technology structures the evidence. The final determination belongs to the human adjuster."}
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- */}
      {/* 5. FINAL PAYOFF SECTION */}
      {/* ----------------------------------------------------------- */}
      <section
        ref={payoffSectionRef}
        className="py-28 sm:py-40 bg-white overflow-hidden relative"
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-baseline">
            {/* Left Headline: Enters Extremely Large Outside Viewport */}
            <div className="lg:col-span-8">
              <h2
                ref={payoffHeadlineRef}
                className="text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-[#0E0F10] leading-[1.02]"
              >
                <span className="payoff-line block">
                  {isIt ? "EVIDENZE PER LA" : "EVIDENCE FOR"}
                </span>
                <span className="payoff-line block">
                  {isIt ? "DECISIONE UMANA." : "HUMAN REVIEW."}
                </span>
                <span className="payoff-line block text-[#777777]">
                  {isIt ? "MAI SENTENZE" : "NEVER AUTOMATED"}
                </span>
                <span className="payoff-line block text-[#777777]">
                  {isIt ? "AUTOMATICHE." : "FAULT DECREES."}
                </span>
              </h2>
            </div>

            {/* Right Explanatory Text: Staggered Depth Entry */}
            <div ref={payoffTextRef} className="lg:col-span-4 space-y-6">
              <p className="text-base sm:text-lg text-[#555555] font-light leading-relaxed">
                {isIt
                  ? "IMPACTA non assegna percentuali di colpa, non emette sentenze algoritmiche e non sostituisce il ruolo del perito. Organizza i frammenti della realtà in un fascicolo trasparente, consentendo decisioni peritali difendibili in minuti."
                  : "IMPACTA does not assign liability percentages, output algorithmic verdicts, or replace claims specialists. It organizes evidentiary fragments into a transparent dossier, enabling defensible adjuster decisions in minutes."}
              </p>

              <div className="pt-2">
                <Link
                  href="/console/claims"
                  className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0E0F10] border-b-2 border-[#0E0F10] pb-1 hover:text-black transition-colors"
                >
                  <span>{isIt ? "Esamina i fascicoli nella Console" : "Inspect claims in Claims Console"}</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Thin Horizon Line: Previous Claim Layers Flatten into Single Horizon */}
          <div
            ref={horizonLineRef}
            className="w-full h-[1.5px] bg-[#0E0F10] origin-left will-change-transform mt-12"
          />
        </div>
      </section>
    </div>
  );
}
