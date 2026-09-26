"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PublicShell } from "@/components/public/PublicShell";
import { RevealText } from "@/components/motion/RevealText";
import { MotionDivider } from "@/components/motion/MotionDivider";
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
  const { language } = useLanguage();
  const isIt = language === "it";

  // SCENE 3: Hero Collision Field Refs
  const heroRef = useRef<HTMLElement>(null);
  const vehicleARef = useRef<HTMLDivElement>(null);
  const vehicleBRef = useRef<HTMLDivElement>(null);
  const trajectorySvgRef = useRef<SVGSVGElement>(null);
  const impactPulseRef = useRef<SVGCircleElement>(null);
  const heroConceptsRef = useRef<HTMLDivElement>(null);

  // SCENE 6A: Queue -> Review (Spatial Record Planes Extraction)
  const queueSectionRef = useRef<HTMLElement>(null);
  const queueStackRef = useRef<HTMLDivElement>(null);
  const ambientRowsRef = useRef<HTMLDivElement[]>([]);
  const extractedClaimRef = useRef<HTMLDivElement>(null);
  const claimFieldsRef = useRef<HTMLDivElement>(null);

  // SCENE 6B: 3D Evidence Fan (True Layered Media/Evidence Planes -> Collapsing into ONE Record)
  const fanSectionRef = useRef<HTMLElement>(null);
  const planeRoadRef = useRef<HTMLDivElement>(null);
  const planeDamageRef = useRef<HTMLDivElement>(null);
  const planeSeqRef = useRef<HTMLDivElement>(null);
  const unifiedRecordRef = useRef<HTMLDivElement>(null);

  // SCENE 6C: Observed vs Inferred Depth Separation Refs
  const depthSectionRef = useRef<HTMLElement>(null);
  const observedPlaneRef = useRef<HTMLDivElement>(null);
  const inferredPlaneRef = useRef<HTMLDivElement>(null);
  const humanReviewBaselineRef = useRef<HTMLDivElement>(null);

  // SCENE 6D: Human Adjuster Review (Rebuilt: No 01/02/03 List)
  const humanReviewSectionRef = useRef<HTMLElement>(null);
  const claimObjectDepthRef = useRef<HTMLDivElement>(null);
  const wordGovernedRef = useRef<HTMLSpanElement>(null);
  const wordHumanRef = useRef<HTMLSpanElement>(null);
  const wordAdjusterRef = useRef<HTMLSpanElement>(null);
  const wordReviewRef = useRef<HTMLSpanElement>(null);
  const satelliteDossierRef = useRef<HTMLDivElement>(null);
  const satelliteAuditRef = useRef<HTMLDivElement>(null);
  const satelliteAuthorityRef = useRef<HTMLDivElement>(null);

  // SCENE 7: Payoff Section Refs
  const payoffSectionRef = useRef<HTMLElement>(null);
  const payoffHeadlineRef = useRef<HTMLHeadingElement>(null);
  const payoffTextRef = useRef<HTMLDivElement>(null);
  const horizonLineRef = useRef<HTMLDivElement>(null);

  // -------------------------------------------------------------
  // 1. SCENE 3: HERO COLLISION FIELD (Time-based GSAP)
  // -------------------------------------------------------------
  useEffect(() => {
    const hero = heroRef.current;
    const vehA = vehicleARef.current;
    const vehB = vehicleBRef.current;
    const traj = trajectorySvgRef.current;
    const pulse = impactPulseRef.current;
    const concepts = heroConceptsRef.current;
    if (!hero || !vehA || !vehB || !traj || !pulse || !concepts) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([vehA, vehB, pulse, concepts.children], { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Vehicles converge from depth
      gsap.fromTo(
        vehA,
        { x: -80, y: 35, z: -120, rotateY: 16, opacity: 0 },
        { x: 0, y: 0, z: 25, rotateY: -3, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.1 }
      );

      gsap.fromTo(
        vehB,
        { x: 80, y: -35, z: -140, rotateY: -16, opacity: 0 },
        { x: 0, y: 0, z: -12, rotateY: 3, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
      );

      // Trajectory lines draw
      const pathA = traj.querySelector(".traj-a");
      const pathB = traj.querySelector(".traj-b");
      if (pathA && pathB) {
        gsap.fromTo(
          [pathA, pathB],
          { strokeDashoffset: 400, opacity: 0 },
          { strokeDashoffset: 0, opacity: 1, duration: 1.1, ease: "power2.inOut", delay: 0.3 }
        );
      }

      // Contact pulse
      gsap.fromTo(
        pulse,
        { scale: 0, opacity: 0 },
        { scale: 1.7, opacity: 0.9, duration: 0.8, ease: "back.out(2)", delay: 0.7 }
      );

      // Concept badges emerge sequentially
      gsap.fromTo(
        concepts.children,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power2.out", delay: 0.8 }
      );
    }, hero);

    return () => ctx.revert();
  }, []);

  // -------------------------------------------------------------
  // 2. SCENE 6A: QUEUE -> REVIEW (RECORD EXTRACTION FROM SPATIAL SYSTEM)
  // -------------------------------------------------------------
  // Motion Sequence:
  // 1. Queue rows emerge from depth
  // 2. Selected claim begins moving toward viewer (extracted from ledger)
  // 3. Surrounding claims physically recede in Z
  // 4. Selected record expands spatially
  // 5. Internal evidence fields unfold from the record
  // 6. Claim rotates subtly to a review angle
  useEffect(() => {
    const sec = queueSectionRef.current;
    const rows = ambientRowsRef.current.filter(Boolean);
    const selected = extractedClaimRef.current;
    const fields = claimFieldsRef.current;
    if (!sec || !selected || !fields) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(selected, { z: 40, opacity: 1, rotateY: -3 });
      gsap.set(fields, { opacity: 1, height: "auto" });
      return;
    }

    const ctx = gsap.context(() => {
      // Starting positions: queue rows layered in depth
      gsap.set(rows, { z: 0, opacity: 0.8, y: 0 });
      gsap.set(selected, { z: 0, scale: 1, rotateY: 0, rotateX: 0 });
      gsap.set(fields, { opacity: 0, height: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top 72%",
          once: true,
        },
      });

      // Step 1: Ambient queue rows physically recede into deeper Z
      tl.to(
        rows,
        {
          z: -160,
          opacity: 0.22,
          y: (i) => (i === 0 ? -36 : (i + 1) * 22),
          duration: 1.0,
          ease: "power2.inOut",
        },
        0
      )
        // Step 2: Selected claim moves toward viewer (extracted from system)
        .to(
          selected,
          {
            z: 70,
            scale: 1.03,
            rotateY: -4,
            rotateX: 2,
            duration: 1.1,
            ease: "power3.out",
          },
          0
        )
        // Step 3: Internal evidence fields unfold from inside the record
        .to(
          fields,
          {
            opacity: 1,
            height: "auto",
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          0.35
        );
    }, sec);

    return () => ctx.revert();
  }, []);

  // -------------------------------------------------------------
  // 3. SCENE 6B: 3D EVIDENCE FAN (THREE SOURCES BECOME ONE RECORD)
  // -------------------------------------------------------------
  // Zero cards. Three spatial document fragments (Road Context,
  // Vehicle Damage, Incident Sequence) start off-axis in depth,
  // rotate, translate, occlude, and COLLAPSE into ONE unified structured record.
  useEffect(() => {
    const sec = fanSectionRef.current;
    const road = planeRoadRef.current;
    const damage = planeDamageRef.current;
    const seq = planeSeqRef.current;
    const unified = unifiedRecordRef.current;
    if (!sec || !road || !damage || !seq || !unified) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([road, damage, seq], { display: "none" });
      gsap.set(unified, { opacity: 1, y: 0, z: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const fanSpread = isMobile ? 30 : 240;

      // Start: off-axis, different Z-depth, different rotations
      gsap.set(road, {
        x: -fanSpread,
        y: -20,
        z: -50,
        rotateY: 26,
        rotateX: 8,
        opacity: 0,
      });

      gsap.set(damage, {
        x: 0,
        y: 0,
        z: 60,
        rotateY: 0,
        scale: 1.05,
        opacity: 0,
      });

      gsap.set(seq, {
        x: fanSpread,
        y: 20,
        z: -50,
        rotateY: -26,
        rotateX: -8,
        opacity: 0,
      });

      gsap.set(unified, { opacity: 0, y: 30, scale: 0.95 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top 70%",
          once: true,
        },
      });

      // Phase 1: Three layered evidence planes enter and fan out in perspective
      tl.to(
        damage,
        {
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
        },
        0
      )
        .to(
          road,
          {
            opacity: 0.9,
            duration: 0.7,
            ease: "power2.out",
          },
          0.1
        )
        .to(
          seq,
          {
            opacity: 0.9,
            duration: 0.7,
            ease: "power2.out",
          },
          0.1
        )
        // Phase 2: Dwell hold for reading the 3 sources
        .to({}, { duration: 0.4 })
        // Phase 3: THE COLLAPSE — Three sources rotate, pass one another, and fuse
        .to(
          [road, seq],
          {
            x: 0,
            y: 0,
            z: 0,
            rotateY: 0,
            rotateX: 0,
            opacity: 0,
            duration: 0.65,
            ease: "power3.inOut",
          },
          1.1
        )
        .to(
          damage,
          {
            z: 0,
            scale: 1,
            opacity: 0,
            duration: 0.65,
            ease: "power3.inOut",
          },
          1.1
        )
        // Phase 4: ONE STRUCTURED INCIDENT RECORD locks into place!
        .to(
          unified,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: "power3.out",
          },
          1.5
        );
    }, sec);

    return () => ctx.revert();
  }, []);

  // -------------------------------------------------------------
  // 4. SCENE 6C: OBSERVED VS INFERRED (SPATIAL DEPTH SEPARATION)
  // -------------------------------------------------------------
  // Observed on sharp front plane (z: 50). Inferred on deeper Z-space (z: -140).
  // Observed locks first -> Inferred pivots forward -> Human review connects both.
  useEffect(() => {
    const sec = depthSectionRef.current;
    const obs = observedPlaneRef.current;
    const inf = inferredPlaneRef.current;
    const baseline = humanReviewBaselineRef.current;
    if (!sec || !obs || !inf || !baseline) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(obs, { z: 40, opacity: 1 });
      gsap.set(inf, { z: -40, opacity: 0.85 });
      gsap.set(baseline, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Spatial Z-depth separation
      gsap.set(obs, { z: 60, x: -30, opacity: 0 });
      gsap.set(inf, { z: -160, x: 30, rotateY: -10, opacity: 0 });
      gsap.set(baseline, { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top 72%",
          once: true,
        },
      });

      // 1. Observed evidence enters into crisp foreground focus
      tl.to(
        obs,
        {
          x: 0,
          z: 50,
          opacity: 1,
          duration: 0.95,
          ease: "power3.out",
        },
        0
      )
        // 2. Inferred layer enters from deeper Z-space, visually conditional
        .to(
          inf,
          {
            x: 0,
            z: -100,
            rotateY: -4,
            opacity: 0.8,
            duration: 1.0,
            ease: "power3.out",
          },
          0.2
        )
        // 3. Human Review baseline draws and connects both evidentiary layers
        .to(
          baseline,
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
          },
          0.65
        );
    }, sec);

    return () => ctx.revert();
  }, []);

  // -------------------------------------------------------------
  // 5. SCENE 6D: HUMAN ADJUSTER REVIEW (REBUILT: NO 01/02/03 LIST)
  // -------------------------------------------------------------
  // Concept: HUMAN AUTHORITY IS THE FINAL LAYER OF THE SYSTEM.
  // 1. Monumental phrase fragmented: GOVERNED BY HUMAN ADJUSTER REVIEW
  // 2. Structured claim object sits in depth behind it
  // 3. Evidence layers converge toward a single review axis
  // 4. Satellite labels appear sequentially around core record
  // 5. Final word HUMAN locks visually to the foreground
  useEffect(() => {
    const sec = humanReviewSectionRef.current;
    const claimDepth = claimObjectDepthRef.current;
    const wGov = wordGovernedRef.current;
    const wHum = wordHumanRef.current;
    const wAdj = wordAdjusterRef.current;
    const wRev = wordReviewRef.current;
    const sDos = satelliteDossierRef.current;
    const sAud = satelliteAuditRef.current;
    const sAut = satelliteAuthorityRef.current;
    if (!sec || !claimDepth || !wGov || !wHum || !wAdj || !wRev || !sDos || !sAud || !sAut) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([claimDepth, wGov, wHum, wAdj, wRev, sDos, sAud, sAut], { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Initial stance: words fragmented, claim in deep Z-space
      gsap.set(claimDepth, { z: -180, scale: 0.9, opacity: 0 });
      gsap.set(wGov, { y: 40, opacity: 0 });
      gsap.set(wHum, { z: 80, scale: 1.25, opacity: 0, color: "#0E0F10" });
      gsap.set(wAdj, { y: 40, opacity: 0 });
      gsap.set(wRev, { y: 40, opacity: 0 });
      gsap.set([sDos, sAud, sAut], { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top 72%",
          once: true,
        },
      });

      // 1. Structured claim object emerges in depth
      tl.to(
        claimDepth,
        {
          z: -40,
          scale: 1,
          opacity: 0.35,
          duration: 1.1,
          ease: "power3.out",
        },
        0
      )
        // 2. Words enter sequentially
        .to(wGov, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.1)
        .to(wAdj, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.2)
        .to(wRev, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.3)
        // 3. The word HUMAN locks aggressively to the foreground
        .to(
          wHum,
          {
            z: 0,
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: "back.out(2)",
          },
          0.35
        )
        // 4. Satellite system labels appear sequentially around core axis
        .to(sDos, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.5)
        .to(sAud, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.65)
        .to(sAut, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.8);
    }, sec);

    return () => ctx.revert();
  }, []);

  // -------------------------------------------------------------
  // 6. SCENE 7: FINAL PAYOFF SECTION ANIMATION
  // -------------------------------------------------------------
  useEffect(() => {
    const sec = payoffSectionRef.current;
    const headline = payoffHeadlineRef.current;
    const text = payoffTextRef.current;
    const line = horizonLineRef.current;
    if (!sec || !headline || !text || !line) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(headline.querySelectorAll(".payoff-line"), { opacity: 1, x: 0 });
      gsap.set(text, { opacity: 1, y: 0 });
      gsap.set(line, { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const lines = headline.querySelectorAll(".payoff-line");
      gsap.set(lines, { x: -40, opacity: 0 });
      gsap.set(text, { opacity: 0, y: 20 });
      gsap.set(line, { scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top 72%",
          once: true,
        },
      });

      tl.to(lines, {
        x: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      })
        .to(
          text,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          line,
          {
            scaleX: 1,
            duration: 1.0,
            ease: "power3.inOut",
          },
          "-=0.4"
        );
    }, sec);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-[#FFFFFF] selection:bg-[#0E0F10] selection:text-white">
      {/* ----------------------------------------------------------- */}
      {/* 1. SCENE 3: HERO COLLISION FIELD (Character Reveal, Spatial 3D Convergence) */}
      {/* ----------------------------------------------------------- */}
      <section
        ref={heroRef}
        className="relative py-20 sm:py-32 lg:py-36 px-6 sm:px-12 lg:px-20 border-b border-[#E5E5E3] overflow-hidden bg-gradient-to-b from-[#FFFFFF] to-[#FBFBFA]"
        style={{ perspective: "1400px" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authoritative Editorial Statement */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <RevealText
              as="span"
              mode="char"
              variant="micro-track"
              className="text-[11px] sm:text-xs uppercase tracking-[0.24em] font-semibold text-[#777777] block"
            >
              {isIt ? "OPERAZIONI SINISTRI E LIQUIDAZIONE" : "CLAIMS OPERATIONS & SETTLEMENT"}
            </RevealText>

            {/* Headline with Character-Level Depth Convergence */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0E0F10] leading-[1.02] uppercase">
              <span className="block">
                <RevealText as="span" mode="char" variant="depth-convergence" delay={0.05} triggerOnScroll={false}>
                  {isIt ? "DATI OGGETTIVI." : "STRUCTURED EVIDENCE."}
                </RevealText>
              </span>
              <span className="block text-[#555555]">
                <RevealText as="span" mode="char" variant="depth-convergence" delay={0.25} triggerOnScroll={false}>
                  {isIt ? "PRONTI PER LA REVISIONE." : "READY FOR REVIEW."}
                </RevealText>
              </span>
            </h1>

            <RevealText
              as="p"
              mode="word"
              variant="mask-vertical"
              delay={0.45}
              triggerOnScroll={false}
              className="text-base sm:text-xl text-[#555555] font-light leading-relaxed max-w-xl"
            >
              {isIt
                ? "Sostituisce i moduli cartacei e le dichiarazioni contraddittorie con fotografie documentate, contesto stradale e fascicoli strutturati per il perito liquidatore."
                : "Replaces manual paper forms and contradictory statements with documented photos, roadway context, and structured claim records ready for adjuster review."}
            </RevealText>

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

          {/* Right Column: SPATIAL COLLISION FIELD */}
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
                {/* Vehicle A Trajectory */}
                <path
                  className="traj-a"
                  d="M 60 330 C 120 300, 180 230, 225 185"
                  stroke="#0E0F10"
                  strokeWidth="2"
                  strokeDasharray="400"
                  strokeDashoffset="0"
                />
                {/* Vehicle B Trajectory */}
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

              {/* Vehicle A Marker */}
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

              {/* Vehicle B Marker */}
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

              {/* Spatial Product Concept Badges */}
              <div
                ref={heroConceptsRef}
                className="absolute inset-x-4 bottom-0 border-t border-[#E5E5E3] pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left [transform-style:preserve-3d]"
              >
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#888888] font-bold block">
                    {isIt ? "DANNI VISIBILI" : "VISIBLE DAMAGE"}
                  </span>
                  <span className="text-xs font-semibold text-[#0E0F10]">
                    {isIt ? "Deformazione Rilevata" : "Documented Impact"}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#888888] font-bold block">
                    {isIt ? "CONTESTO STRADALE" : "ROADWAY CONTEXT"}
                  </span>
                  <span className="text-xs font-semibold text-[#0E0F10]">
                    {isIt ? "Corsia Ordinaria" : "Standard Roadway"}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#888888] font-bold block">
                    {isIt ? "MODULO CAI" : "AGREED STATEMENT"}
                  </span>
                  <span className="text-xs font-semibold text-[#0E0F10]">
                    {isIt ? "Circostanza Correlata" : "Correlated Clause"}
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
      {/* 2. SCENE 6A: QUEUE -> REVIEW (RECORD EXTRACTION FROM SPATIAL SYSTEM) */}
      {/* ----------------------------------------------------------- */}
      {/* Concept: CLAIMS EXIST AS SPATIAL RECORD PLANES. */}
      {/* Surrounding rows physically recede; selected record extracts toward viewer. */}
      <section
        id="claims-queue"
        ref={queueSectionRef}
        className="py-24 sm:py-36 bg-[#F7F7F6] border-b border-[#E5E5E3] flex items-center justify-center overflow-hidden"
        style={{ perspective: "1600px" }}
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto flex flex-col items-center">
          <div className="text-center space-y-3 mb-12">
            <RevealText
              as="span"
              mode="char"
              variant="micro-track"
              className="text-xs uppercase tracking-[0.24em] text-[#777777] font-semibold block"
            >
              {isIt ? "FLUSSO OPERATIVO" : "OPERATIONAL WORKFLOW"}
            </RevealText>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0E0F10]">
              <RevealText as="span" mode="char" variant="mask-vertical">
                {isIt ? "DALLA CODA ALLA REVISIONE." : "FROM QUEUE TO REVIEW."}
              </RevealText>
            </h2>
            <p className="text-sm sm:text-base text-[#666666] font-light max-w-xl mx-auto">
              {isIt
                ? "Il fascicolo sinistro si estrae dalla sequenza operativa e si espande per la valutazione peritale."
                : "The claim record extracts from the operational ledger and expands into an analytical review stance."}
            </p>
          </div>

          {/* SPATIAL RECORD PLANES STAGE */}
          <div
            ref={queueStackRef}
            className="relative w-full max-w-4xl flex flex-col justify-center [transform-style:preserve-3d]"
          >
            {/* Ambient Ledger Plane 0 (Top) */}
            <div
              ref={(el) => {
                if (el) ambientRowsRef.current[0] = el;
              }}
              className="w-full border-b border-[#E5E5E3] py-3.5 flex items-center justify-between text-xs text-[#888888] will-change-transform"
            >
              <span className="font-mono text-[11px]">#2026-04</span>
              <span className="uppercase font-medium">Veicolo A vs Veicolo B</span>
              <span className="text-[10px] uppercase tracking-wider">{isIt ? "RILIEVO COMPLETATO" : "INTAKE COMPLETE"}</span>
            </div>

            {/* EXTRACTED SELECTED CLAIM PLANE (Moves forward in Z, rotates, unfolds) */}
            <div
              ref={extractedClaimRef}
              className="w-full bg-[#0E0F10] text-white p-6 sm:p-8 my-4 shadow-[0_24px_70px_rgba(0,0,0,0.4)] border-l-4 border-emerald-400 will-change-transform z-20 [transform-style:preserve-3d]"
            >
              {/* Header Bar of the Extracted Record */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider">
                      {isIt ? "FASCICOLO SELEZIONATO #2026-01" : "SELECTED CLAIM FILE #2026-01"}
                    </span>
                  </div>
                  <div className="text-base sm:text-lg font-bold uppercase tracking-tight text-white">
                    {isIt ? "Veicolo A vs Veicolo B • Contatto Laterale-Anteriore" : "Vehicle A vs Vehicle B • Lateral-Frontal Contact"}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono text-white/50 block">
                    {isIt ? "Sequenza d'acquisizione completata" : "Intake sequence verified"}
                  </span>
                  <span className="text-xs uppercase font-semibold text-emerald-400 tracking-wider">
                    {isIt ? "In Attesa di Delibera" : "Pending Adjuster Review"}
                  </span>
                </div>
              </div>

              {/* Unfolding Internal Evidence Fields */}
              <div
                ref={claimFieldsRef}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-5 text-xs overflow-hidden will-change-transform"
              >
                <div className="border-l border-white/20 pl-4 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-white/50 font-bold block">
                    {isIt ? "EVIDENZE FOTOGRAFICHE" : "PHOTO EVIDENCE"}
                  </span>
                  <div className="text-sm font-bold text-white">{isIt ? "4 Inquadrature Guidate" : "4 Guided Perspectives"}</div>
                  <div className="text-[11px] text-white/70 font-light">
                    {isIt ? "Punti di contatto visibili" : "Contact zones documented"}
                  </div>
                </div>

                <div className="border-l border-white/20 pl-4 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-white/50 font-bold block">
                    {isIt ? "CONTESTO STRADALE" : "ROADWAY CONTEXT"}
                  </span>
                  <div className="text-sm font-bold text-white">{isIt ? "Corsia Ordinaria di Marcia" : "Standard Travel Lane"}</div>
                  <div className="text-[11px] text-white/70 font-light">
                    {isIt ? "Geolocalizzazione registrata" : "Location logged"}
                  </div>
                </div>

                <div className="border-l border-white/20 pl-4 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-white/50 font-bold block">
                    {isIt ? "MODULO CAI" : "AGREED STATEMENT"}
                  </span>
                  <div className="text-sm font-bold text-white">{isIt ? "Circostanza Correlata" : "Correlated Clause"}</div>
                  <div className="text-[11px] text-white/70 font-light">
                    {isIt ? "Nessun conflitto dichiarato" : "Zero statement conflicts"}
                  </div>
                </div>
              </div>
            </div>

            {/* Ambient Ledger Plane 1 */}
            <div
              ref={(el) => {
                if (el) ambientRowsRef.current[1] = el;
              }}
              className="w-full border-b border-[#E5E5E3] py-3.5 flex items-center justify-between text-xs text-[#888888] will-change-transform"
            >
              <span className="font-mono text-[11px]">#2026-02</span>
              <span className="uppercase font-medium">Veicolo C vs Veicolo D</span>
              <span className="text-[10px] uppercase tracking-wider">{isIt ? "ARCHIVIATO" : "ARCHIVED"}</span>
            </div>

            {/* Ambient Ledger Plane 2 */}
            <div
              ref={(el) => {
                if (el) ambientRowsRef.current[2] = el;
              }}
              className="w-full border-b border-[#E5E5E3] py-3.5 flex items-center justify-between text-xs text-[#888888] will-change-transform"
            >
              <span className="font-mono text-[11px]">#2026-03</span>
              <span className="uppercase font-medium">Veicolo E vs Veicolo F</span>
              <span className="text-[10px] uppercase tracking-wider">{isIt ? "IN ELABORAZIONE" : "PROCESSING"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- */}
      {/* 3. SCENE 6B: 3D EVIDENCE FAN (THREE SOURCES BECOME ONE RECORD) */}
      {/* ----------------------------------------------------------- */}
      {/* Zero 3-card resting state. Three off-axis planes rotate, pass, and COLLAPSE into ONE unified record. */}
      <section
        ref={fanSectionRef}
        className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3] overflow-hidden"
        style={{ perspective: "1400px" }}
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-3">
            <RevealText
              as="span"
              mode="char"
              variant="micro-track"
              className="text-xs uppercase tracking-[0.24em] text-[#777777] font-semibold block"
            >
              {isIt ? "STRUTTURAZIONE MULTILIVELLO" : "MULTI-SOURCE SYNTHESIS"}
            </RevealText>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0E0F10] leading-tight">
              <RevealText as="span" mode="char" variant="lateral-assembly">
                {isIt ? "TRE FONTI PROBATORIE. UN UNICO RECORD." : "THREE EVIDENCE SOURCES. ONE RECORD."}
              </RevealText>
            </h2>
            <p className="text-base sm:text-xl text-[#555555] font-light leading-relaxed">
              {isIt
                ? "Contesto stradale, danno visibile e circostanze dichiarate convergono e collassano in un unico fascicolo strutturato."
                : "Roadway context, visible damage, and statement circumstances converge and collapse into one structured file."}
            </p>
          </div>

          {/* SPATIAL COLLAPSING STAGE: THREE LAYERS FUSE INTO ONE */}
          <div className="relative w-full min-h-[440px] flex items-center justify-center [transform-style:preserve-3d]">
            {/* SOURCE 1: ROAD CONTEXT (Off-axis left plane) */}
            <div
              ref={planeRoadRef}
              className="absolute w-[280px] sm:w-[330px] border-l-2 border-t-2 border-[#0E0F10] p-6 bg-white/95 select-none will-change-transform space-y-3 shadow-md [transform-style:preserve-3d]"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0E0F10] block">
                {isIt ? "01 / CONTESTO STRADALE" : "01 / ROADWAY CONTEXT"}
              </span>
              <div className="text-base font-bold uppercase text-[#0E0F10]">
                {isIt ? "Corsia Ordinaria" : "Standard Roadway"}
              </div>
              <p className="text-xs text-[#555555] font-light leading-relaxed">
                {isIt ? "Rilevamento della corsia e direzione di marcia coerenti." : "Lane geometry and travel direction logged."}
              </p>
            </div>

            {/* SOURCE 2: VEHICLE DAMAGE (Center foreground plane) */}
            <div
              ref={planeDamageRef}
              className="absolute w-[290px] sm:w-[340px] border-2 border-[#0E0F10] p-6 bg-[#FFFFFF] shadow-xl select-none will-change-transform z-10 space-y-3 [transform-style:preserve-3d]"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0E0F10] block">
                {isIt ? "02 / DANNO VISIBILE" : "02 / VISIBLE DAMAGE"}
              </span>
              <div className="text-base font-bold uppercase text-[#0E0F10]">
                {isIt ? "Paraurti Anteriore Sx" : "Front-Left Fender"}
              </div>
              <p className="text-xs text-[#555555] font-light leading-relaxed">
                {isIt ? "Deformazione lamierati riscontrata da 4 prospetti." : "Sheet-metal deformation documented across 4 photos."}
              </p>
            </div>

            {/* SOURCE 3: INCIDENT SEQUENCE (Off-axis right plane) */}
            <div
              ref={planeSeqRef}
              className="absolute w-[280px] sm:w-[330px] border-r-2 border-b-2 border-[#0E0F10] p-6 bg-white/95 select-none will-change-transform space-y-3 shadow-md [transform-style:preserve-3d]"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0E0F10] block">
                {isIt ? "03 / CIRCOSTANZE CAI" : "03 / CAI CIRCUMSTANCES"}
              </span>
              <div className="text-base font-bold uppercase text-[#0E0F10]">
                {isIt ? "Modulo Constatazione" : "Agreed Statement"}
              </div>
              <p className="text-xs text-[#555555] font-light leading-relaxed">
                {isIt ? "Dinamica concordata tra le parti senza discrepanze." : "Correlated statement criteria with zero driver conflict."}
              </p>
            </div>

            {/* THE PAYOFF: ONE UNIFIED STRUCTURED INCIDENT RECORD (COLLAPSED RESULT) */}
            <div
              ref={unifiedRecordRef}
              className="relative w-full max-w-2xl bg-[#0E0F10] text-white p-6 sm:p-8 shadow-2xl border-t-2 border-b-2 border-white/30 will-change-transform [transform-style:preserve-3d]"
            >
              <div className="flex items-center justify-between border-b border-white/15 pb-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-mono font-bold tracking-wider text-white">
                    {isIt ? "UNICO RECORD SINISTRO STRUTTURATO" : "ONE UNIFIED INCIDENT RECORD"}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase">
                  {isIt ? "Tre Fonti Sincronizzate" : "Three Sources Fused"}
                </span>
              </div>

              <div className="py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-white/80">
                <div>
                  <span className="text-[10px] text-white/50 uppercase tracking-wider block font-semibold">
                    {isIt ? "STRADA" : "ROAD"}
                  </span>
                  <span className="font-semibold text-white">{isIt ? "Corsia Ordinaria" : "Standard Lane"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/50 uppercase tracking-wider block font-semibold">
                    {isIt ? "DANNO" : "DAMAGE"}
                  </span>
                  <span className="font-semibold text-white">{isIt ? "Anteriore Sx" : "Front-Left"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/50 uppercase tracking-wider block font-semibold">
                    {isIt ? "DICHIARAZIONE" : "STATEMENT"}
                  </span>
                  <span className="font-semibold text-emerald-400">{isIt ? "Concorde" : "Aligned"}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-white/60">
                <span>{isIt ? "Tutti i segnali allineati su un asse difendibile" : "All signals aligned on single operational axis"}</span>
                <span className="font-bold text-white uppercase">{isIt ? "Pronto per Delibera" : "Ready for Adjuster"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- */}
      {/* 4. SCENE 6C: OBSERVED VS INFERRED (SPATIAL DEPTH SEPARATION) */}
      {/* ----------------------------------------------------------- */}
      {/* Headline: WHAT WE SEE. WHAT WE INFER. (Character-level). */}
      {/* Observed on sharp front plane (z: 50). Inferred on deeper plane (z: -100). */}
      <section
        ref={depthSectionRef}
        className="py-24 sm:py-36 bg-[#F7F7F6] border-b border-[#E5E5E3] overflow-hidden"
        style={{ perspective: "1600px" }}
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          <div className="space-y-4 max-w-3xl">
            <RevealText
              as="span"
              mode="char"
              variant="micro-track"
              className="text-xs uppercase tracking-[0.24em] text-[#777777] font-semibold block"
            >
              {isIt ? "SEPARAZIONE DEI LIVELLI" : "SEPARATION OF SIGNALS"}
            </RevealText>

            {/* Display Headline with Character-Level Lock-In */}
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0E0F10] leading-tight">
              <span className="block">
                <RevealText as="span" mode="char" variant="lock-in">
                  {isIt ? "CIÒ CHE OSSERVIAMO." : "WHAT WE SEE."}
                </RevealText>
              </span>
              <span className="block text-[#777777]">
                <RevealText as="span" mode="char" variant="lock-in" delay={0.25}>
                  {isIt ? "CIÒ CHE INFERIAMO." : "WHAT WE INFER."}
                </RevealText>
              </span>
            </h2>

            <p className="text-base sm:text-xl text-[#555555] font-light leading-relaxed">
              {isIt
                ? "I fatti fisici riscontrati restano rigidamente distinti dalle ricostruzioni probabilistiche. Nessun calcolo automatico sostituisce il giudizio peritale."
                : "Physical evidence remains strictly distinguished from probabilistic inference. No automated computation overrides human adjuster deliberation."}
            </p>
          </div>

          {/* SPATIAL DEPTH SEPARATION STAGE */}
          <div className="relative w-full min-h-[420px] flex items-center justify-center [transform-style:preserve-3d]">
            {/* Plane 1: OBSERVED (Sharp Front Plane, z: 50) */}
            <div
              ref={observedPlaneRef}
              className="absolute left-0 sm:left-6 top-4 max-w-lg border-l-4 border-[#0E0F10] pl-6 py-4 space-y-4 will-change-transform [transform-style:preserve-3d]"
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
                  <span>{isIt ? "Orario e geolocalizzazione registrati all'acquisizione" : "Reported capture time and location coordinates"}</span>
                </li>
              </ul>
            </div>

            {/* Plane 2: INFERRED (Deeper Z-Space, z: -100) */}
            <div
              ref={inferredPlaneRef}
              className="absolute right-0 sm:right-6 bottom-4 max-w-lg border-l-4 border-dashed border-[#888888] pl-6 py-4 space-y-4 will-change-transform [transform-style:preserve-3d]"
            >
              <div className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#777777]">
                {isIt ? "INFERITO" : "INFERRED"}
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#777777] block">
                {isIt ? "ELEMENTI SOGGETTI A VERIFICA PERITALE" : "ITEMS REQUIRING HUMAN REVIEW"}
              </span>
              <ul className="text-sm sm:text-base text-[#666666] font-light space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#888888] mt-2 flex-shrink-0" />
                  <span>{isIt ? "Traiettoria d'impatto probabile prima del contatto" : "Probable vehicle approach trajectory before impact"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#888888] mt-2 flex-shrink-0" />
                  <span>{isIt ? "Sequenza plausibile di decelerazione dei veicoli" : "Plausible vehicle deceleration sequence"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#888888] mt-2 flex-shrink-0" />
                  <span>{isIt ? "Dettagli da convalidare con le parti coinvolte" : "Items requiring adjuster cross-verification"}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Baseline Plane: Human Review connects both */}
          <div
            ref={humanReviewBaselineRef}
            className="pt-10 border-t border-[#0E0F10] space-y-3 text-center sm:text-left will-change-transform"
          >
            <div className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0E0F10]">
              {isIt ? "IL GIUDIZIO UMANO CONNETTE I DUE LIVELLI." : "HUMAN REVIEW CONNECTS THE TWO."}
            </div>
            <p className="text-sm sm:text-base text-[#666666] font-light max-w-2xl">
              {isIt
                ? "La tecnologia organizza i fatti. La decisione finale appartiene al perito liquidatore abilitato."
                : "Technology structures empirical evidence. The final determination belongs to the licensed human claims adjuster."}
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- */}
      {/* 5. SCENE 6D: HUMAN ADJUSTER REVIEW (REBUILT: NO 01/02/03 LIST) */}
      {/* ----------------------------------------------------------- */}
      {/* Concept: HUMAN AUTHORITY IS THE FINAL LAYER OF THE SYSTEM. */}
      {/* Fragmented monumental phrase + Structured claim in depth + Satellite labels */}
      <section
        ref={humanReviewSectionRef}
        className="py-28 sm:py-40 bg-[#FFFFFF] border-b border-[#E5E5E3] overflow-hidden"
        style={{ perspective: "1600px" }}
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          {/* Monumental Fragmented Headline: The word HUMAN locks aggressively */}
          <div className="space-y-2 [transform-style:preserve-3d]">
            <span
              ref={wordGovernedRef}
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-[#888888] block leading-none will-change-transform"
            >
              {isIt ? "GOVERNATO DALLA" : "GOVERNED BY"}
            </span>

            <span
              ref={wordHumanRef}
              className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tight text-[#0E0F10] block leading-none will-change-transform"
            >
              {isIt ? "REVISIONE UMANA." : "HUMAN REVIEW."}
            </span>

            <div className="flex flex-wrap items-baseline gap-4 pt-2">
              <span
                ref={wordAdjusterRef}
                className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#888888] leading-none will-change-transform"
              >
                {isIt ? "IL PERITO LIQUIDATORE" : "THE CLAIMS SPECIALIST"}
              </span>
              <span
                ref={wordReviewRef}
                className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#0E0F10] leading-none will-change-transform"
              >
                {isIt ? "HA L'ULTIMA PAROLA." : "DECIDES."}
              </span>
            </div>
          </div>

          <MotionDivider className="w-full h-[1.5px] bg-[#0E0F10]" origin="left" />

          {/* SPATIAL STAGE: CLAIM OBJECT IN DEPTH + SATELLITE SYSTEM LABELS (NO LIST!) */}
          <div className="relative w-full min-h-[380px] flex items-center justify-center [transform-style:preserve-3d]">
            {/* Structured Claim Object in Depth */}
            <div
              ref={claimObjectDepthRef}
              className="w-full max-w-2xl bg-[#F7F7F6] border border-[#E5E5E3] p-8 shadow-xl will-change-transform [transform-style:preserve-3d]"
            >
              <div className="flex items-center justify-between border-b border-[#E5E5E3] pb-4 text-xs font-mono text-[#777777]">
                <span>FASCICOLO SINISTRO DISPONIBILE</span>
                <span>AUDIT TRAIL COMPLETO</span>
              </div>
              <div className="py-6 space-y-3">
                <div className="text-xl sm:text-2xl font-bold uppercase text-[#0E0F10]">
                  {isIt ? "Fascicolo Pronto per Convalida" : "Dossier Ready for Adjuster Sign-Off"}
                </div>
                <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed">
                  {isIt
                    ? "Tutti gli elementi raccolti — fotografie, rilievo del contesto e circostanze dichiarate — sono verificabili singolarmente senza decisioni algoritmiche arbitrarie."
                    : "Every captured component — photos, roadway context, and reported circumstances — remains individually inspectable with zero black-box liability decrees."}
                </p>
              </div>
            </div>

            {/* Satellite System Label 1: Top-Left */}
            <div
              ref={satelliteDossierRef}
              className="absolute left-0 sm:left-4 top-2 max-w-[200px] border-t-2 border-[#0E0F10] pt-2 space-y-1 will-change-transform"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0E0F10] block">
                {isIt ? "FASCICOLO STRUTTURATO" : "STRUCTURED DOSSIER"}
              </span>
              <p className="text-[11px] text-[#666666] font-light leading-relaxed">
                {isIt ? "Ordinato e difendibile fin dal primo minuto." : "Defensible file assembled from minute one."}
              </p>
            </div>

            {/* Satellite System Label 2: Bottom-Right */}
            <div
              ref={satelliteAuditRef}
              className="absolute right-0 sm:right-4 bottom-2 max-w-[200px] border-b-2 border-[#0E0F10] pb-2 space-y-1 will-change-transform text-right"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0E0F10] block">
                {isIt ? "TRACCIABILITÀ TOTALE" : "COMPLETE AUDIT TRAIL"}
              </span>
              <p className="text-[11px] text-[#666666] font-light leading-relaxed">
                {isIt ? "Origine immutabile per ogni singola prova." : "Immutable provenance for every evidence piece."}
              </p>
            </div>

            {/* Satellite System Label 3: Bottom-Left */}
            <div
              ref={satelliteAuthorityRef}
              className="absolute left-0 sm:left-4 bottom-2 max-w-[200px] border-l-2 border-emerald-600 pl-3 space-y-1 will-change-transform"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 block">
                {isIt ? "AUTORITÀ FINALE UMANA" : "FINAL HUMAN AUTHORITY"}
              </span>
              <p className="text-[11px] text-[#666666] font-light leading-relaxed">
                {isIt ? "Nessuna attribuzione di colpa automatica." : "Zero automated liability percentages."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- */}
      {/* 6. SCENE 7: FINAL PAYOFF SECTION */}
      {/* ----------------------------------------------------------- */}
      <section
        ref={payoffSectionRef}
        className="py-28 sm:py-40 bg-white overflow-hidden relative"
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-baseline">
            {/* Left Headline: Large Outside Viewport */}
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

            {/* Right Explanatory Text */}
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

          {/* Thin Horizon Line */}
          <div
            ref={horizonLineRef}
            className="w-full h-[1.5px] bg-[#0E0F10] origin-left will-change-transform mt-12"
          />
        </div>
      </section>
    </div>
  );
}
