"use client";

import React, { useState, useRef, useEffect } from "react";
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

  const [inferredElevated, setInferredElevated] = useState(false);

  // Refs for 3D motion systems
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const planeARef = useRef<HTMLDivElement>(null);
  const planeBRef = useRef<HTMLDivElement>(null);
  const planeTelemetryRef = useRef<HTMLDivElement>(null);

  // Queue -> Claim Transformation Refs
  const continuumSectionRef = useRef<HTMLElement>(null);
  const queueRow1Ref = useRef<HTMLDivElement>(null);
  const queueRow2Ref = useRef<HTMLDivElement>(null);
  const queueRow3Ref = useRef<HTMLDivElement>(null);
  const expandedClaimRef = useRef<HTMLDivElement>(null);

  // Evidence Fan Refs
  const fanSectionRef = useRef<HTMLElement>(null);
  const fanLeftRef = useRef<HTMLDivElement>(null);
  const fanCenterRef = useRef<HTMLDivElement>(null);
  const fanRightRef = useRef<HTMLDivElement>(null);

  // Observed vs Inferred Refs
  const observedSectionRef = useRef<HTMLElement>(null);
  const observedPlaneRef = useRef<HTMLDivElement>(null);
  const inferredPlaneRef = useRef<HTMLDivElement>(null);

  // Final Payoff Refs
  const payoffSectionRef = useRef<HTMLElement>(null);
  const payoffHeadlineRef = useRef<HTMLHeadingElement>(null);
  const payoffTextRef = useRef<HTMLDivElement>(null);
  const horizonLineRef = useRef<HTMLDivElement>(null);

  // 1. Hero Fragmented Headline + Open Spatial 3D Multi-Plane Composition (NO CARD, ZERO SLOP)
  useEffect(() => {
    const hero = heroRef.current;
    const headline = headlineRef.current;
    const planeA = planeARef.current;
    const planeB = planeBRef.current;
    const planeTel = planeTelemetryRef.current;
    if (!hero || !headline || !planeA || !planeB || !planeTel) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Headline entrance
      const words = headline.querySelectorAll(".hero-word");
      gsap.fromTo(
        words,
        {
          opacity: 0,
          x: (i) => (i % 2 === 0 ? -36 : 36),
          z: -60,
          scale: 0.94,
        },
        {
          opacity: 1,
          x: 0,
          z: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.08,
          ease: "power3.out",
        }
      );

      // Independent Spatial 3D Planes Entrance directly on page canvas
      gsap.fromTo(
        planeA,
        { opacity: 0, x: 40, z: -80, rotateY: 10, rotateX: 6 },
        { opacity: 1, x: 0, z: 25, rotateY: -3, rotateX: 2, duration: 1.2, ease: "power3.out", delay: 0.1 }
      );

      gsap.fromTo(
        planeB,
        { opacity: 0, x: -30, z: -120, rotateY: -8, rotateX: 5 },
        { opacity: 1, x: 0, z: -15, rotateY: 4, rotateX: -1, duration: 1.2, ease: "power3.out", delay: 0.2 }
      );

      gsap.fromTo(
        planeTel,
        { opacity: 0, y: 35, z: -60 },
        { opacity: 1, y: 0, z: 10, duration: 1.1, ease: "power3.out", delay: 0.3 }
      );

      // Scroll-Velocity 3D Parallax Depth for each plane
      ScrollTrigger.create({
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const vel = self.getVelocity();
          const tiltA = Math.max(-10, Math.min(10, -3 + vel * 0.003));
          const tiltB = Math.max(-8, Math.min(8, 4 - vel * 0.0025));
          gsap.to(planeA, {
            rotateY: tiltA,
            z: 25 + vel * 0.015,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(planeB, {
            rotateY: tiltB,
            z: -15 - vel * 0.01,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  // 2. Queue Row -> Selected Claim Continuous Transformation (No crossfading, physical expansion)
  useEffect(() => {
    const sec = continuumSectionRef.current;
    const r1 = queueRow1Ref.current;
    const r2 = queueRow2Ref.current;
    const r3 = queueRow3Ref.current;
    const expanded = expandedClaimRef.current;
    if (!sec || !r1 || !r2 || !r3 || !expanded) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(expanded, { opacity: 0, scale: 0.92, z: -40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 0.7,
        },
      });

      // Row 1 steps forward, rows 2 & 3 recede into depth
      tl.to([r2, r3], {
        z: -140,
        opacity: 0.15,
        y: (i) => (i === 0 ? 30 : 60),
        duration: 0.35,
        ease: "power2.inOut",
      }, 0)
      .to(r1, {
        z: 60,
        scale: 1.06,
        duration: 0.35,
        ease: "power2.inOut",
      }, 0)
      // Row 1 morphs/expands into full multi-plane claim stack
      .to(r1, {
        opacity: 0,
        scale: 1.15,
        duration: 0.25,
      }, 0.35)
      .to(expanded, {
        opacity: 1,
        scale: 1,
        z: 0,
        duration: 0.35,
        ease: "power2.out",
      }, 0.35);
    }, sec);

    return () => ctx.revert();
  }, []);

  // 3. Evidence Fan: 3 Physical Document Surfaces Fan Out in Z and Y
  useEffect(() => {
    const sec = fanSectionRef.current;
    const left = fanLeftRef.current;
    const center = fanCenterRef.current;
    const right = fanRightRef.current;
    if (!sec || !left || !center || !right) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Initially compact stack
      gsap.set(left, { x: 0, rotateY: 0, z: 0 });
      gsap.set(center, { z: 15, scale: 1 });
      gsap.set(right, { x: 0, rotateY: 0, z: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.7,
        },
      });

      // Fans out like physical paper planes on a desk
      tl.to(left, {
        x: -90,
        rotateY: 14,
        z: -20,
        ease: "power2.out",
        duration: 1,
      }, 0)
      .to(center, {
        z: 50,
        scale: 1.04,
        ease: "power2.out",
        duration: 1,
      }, 0)
      .to(right, {
        x: 90,
        rotateY: -14,
        z: -20,
        ease: "power2.out",
        duration: 1,
      }, 0);
    }, sec);

    return () => ctx.revert();
  }, []);

  // 4. Observed vs Inferred Spatial Separation
  useEffect(() => {
    const sec = observedSectionRef.current;
    const obs = observedPlaneRef.current;
    const inf = inferredPlaneRef.current;
    if (!sec || !obs || !inf) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(obs, { z: 45, opacity: 1 });
      gsap.set(inf, { z: -40, opacity: 0.55 });

      ScrollTrigger.create({
        trigger: sec,
        start: "top 75%",
        end: "bottom 40%",
        scrub: 0.8,
        onUpdate: (self) => {
          if (!inferredElevated) {
            const p = self.progress;
            gsap.set(obs, { z: 45 + p * 15 });
            gsap.set(inf, { z: -40 + p * 20, opacity: 0.55 + p * 0.25 });
          }
        },
      });
    }, sec);

    return () => ctx.revert();
  }, [inferredElevated]);

  // When user toggles Inferred plane elevation
  useEffect(() => {
    const inf = inferredPlaneRef.current;
    if (!inf) return;
    if (inferredElevated) {
      gsap.to(inf, {
        z: 70,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      });
    } else {
      gsap.to(inf, {
        z: -20,
        opacity: 0.65,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  }, [inferredElevated]);

  // 5. Final Payoff: Headline Enters Large Outside Viewport, Line-by-Line Alignment, Visual Calm
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
      {/* 1. HERO SCENE: Fragmented Typography + Graphite Physical Claim Object (NO WHITE CARD) */}
      <section
        ref={heroRef}
        className="relative py-20 sm:py-32 lg:py-36 px-6 sm:px-12 lg:px-20 border-b border-[#E5E5E3] overflow-hidden bg-gradient-to-b from-[#FFFFFF] to-[#FBFBFA]"
        style={{ perspective: "1400px" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authoritative Editorial Statement */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.24em] font-semibold text-[#777777] block">
              {t("insurersPage.heroTag")}
            </span>

            <h1
              ref={headlineRef}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0E0F10] leading-[1.02] uppercase"
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
                {isIt ? "LIQUIDAZIONE" : "FASTER,"}
              </span>
              <span className="hero-word inline-block text-[#555555]">
                {isIt ? "RAPIDA ED EQUA." : "EQUITABLE CLAIMS."}
              </span>
            </h1>

            <p className="text-base sm:text-xl text-[#555555] font-light leading-relaxed max-w-xl">
              {t("insurersPage.heroSubtitle")}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <Link
                href="/console/login"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0E0F10] text-white text-xs font-bold tracking-wider uppercase hover:bg-black transition-all shadow-sm active:scale-[0.99]"
              >
                <span>{t("insurersPage.heroCta")}</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                  →
                </span>
              </Link>
              <a
                href="#claims-continuum"
                className="text-xs font-medium text-[#555555] hover:text-[#0E0F10] transition-colors uppercase tracking-wider"
              >
                {isIt ? "Guarda la trasformazione spaziale ↓" : "Explore spatial transformation ↓"}
              </a>
            </div>
          </div>

          {/* Right Column: OPEN SPATIAL 3D COMPOSITION (Direct on Canvas, Zero Card Container) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end [transform-style:preserve-3d]">
            <div className="w-full max-w-lg space-y-6 [transform-style:preserve-3d] select-none py-2">
              {/* Spatial Plane A: Vehicle Profile A & Deceleration */}
              <div
                ref={planeARef}
                className="border-l-2 border-[#0E0F10] pl-5 py-2 space-y-1.5 will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0E0F10]">
                    {t("insurersPage.previewVehicleA")}
                  </span>
                  <span className="text-[11px] font-mono text-[#666666]">
                    AB 123 CD
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0E0F10]">
                  Audi A3 Sportback
                </div>
                <div className="text-xs text-[#555555] font-light">
                  {isIt
                    ? "Traiettoria rettilinea • Decelerazione misurata: 38 km/h → 0"
                    : "Straight trajectory • Measured deceleration: 38 km/h → 0"}
                </div>
              </div>

              {/* Spatial Plane B: Vehicle Profile B & Impact Zone (Offset in depth) */}
              <div
                ref={planeBRef}
                className="border-l-2 border-[#888888] pl-5 py-2 space-y-1.5 will-change-transform sm:translate-x-6"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#777777]">
                    {t("insurersPage.previewVehicleB")}
                  </span>
                  <span className="text-[11px] font-mono text-[#777777]">
                    EF 456 GH
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0E0F10]">
                  Volkswagen Golf
                </div>
                <div className="text-xs text-[#555555] font-light">
                  {isIt
                    ? "Punto d'impatto ant. sx • Corrispondenza visiva con deformazione lamierati"
                    : "Front-left impact point • Optical match with sheet-metal deformation"}
                </div>
              </div>

              {/* Spatial Plane C: Telemetry & CAI Circumstance */}
              <div
                ref={planeTelemetryRef}
                className="border-t border-[#E5E5E3] pt-5 space-y-3 will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#777777] font-semibold block">
                      {isIt ? "ACCELERAZIONE PICCO" : "PEAK DECELERATION"}
                    </span>
                    <span className="font-mono text-base font-bold text-[#0E0F10]">
                      3.4 G
                    </span>
                    <span className="text-[11px] text-[#777777] block font-light">
                      {isIt ? "Vettore d'urto 42°" : "42° impact vector"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#777777] font-semibold block">
                      {isIt ? "CONVENZIONE CAI" : "CAI CIRCUMSTANCE"}
                    </span>
                    <span className="text-base font-bold text-[#0E0F10] uppercase">
                      {isIt ? "Casella 12" : "Box 12"}
                    </span>
                    <span className="text-[11px] text-[#777777] block font-light">
                      {isIt ? "Stesso senso di marcia" : "Same travel direction"}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E5E5E3] flex items-center justify-between text-xs">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#0E0F10]">
                    {isIt ? "SUPERVISIONE PERITALE DIRETTA" : "DIRECT ADJUSTER ADJUDICATION"}
                  </span>
                  <span className="text-[11px] text-[#555555] font-medium">
                    {isIt ? "Decisione umana sovrana" : "Sovereign human review"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTINUOUS OPERATIONAL QUEUE -> CLAIM EXPANSION */}
      <section
        id="claims-continuum"
        ref={continuumSectionRef}
        className="relative w-full h-[100vh] bg-[#F7F7F6] border-b border-[#E5E5E3] flex items-center justify-center overflow-hidden"
        style={{ perspective: "1400px" }}
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs uppercase tracking-[0.24em] text-[#777777] font-semibold block">
              {isIt ? "CONTINUUM OPERATIVO" : "OPERATIONAL CONTINUUM"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#0E0F10]">
              {isIt ? "Dalla Coda al Fascicolo Strutturato" : "From Queue Row to Physical Claim"}
            </h2>
          </div>

          {/* Perspective Stage with Queue Rows and Expanding Claim Stack */}
          <div className="relative w-full max-w-2xl min-h-[340px] flex items-center justify-center [transform-style:preserve-3d]">
            {/* Queue Row 1 (The selected row that advances & expands) */}
            <div
              ref={queueRow1Ref}
              className="absolute inset-x-0 bg-[#0E0F10] text-white p-5 flex items-center justify-between border border-white/20 shadow-lg will-change-transform z-20"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block">
                  ACTIVE QUEUE • READY
                </span>
                <div className="font-mono text-base font-bold">IMP-260925-014</div>
                <div className="text-xs text-white/70">Audi A3 Sportback vs Volkswagen Golf</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-white/50">14:22 UTC</div>
                <span className="text-[11px] text-white underline tracking-wider uppercase font-semibold">
                  {isIt ? "Espandi fascicolo →" : "Expand claim →"}
                </span>
              </div>
            </div>

            {/* Queue Row 2 (Recedes into depth) */}
            <div
              ref={queueRow2Ref}
              className="absolute inset-x-0 translate-y-24 bg-white border border-[#E5E5E3] text-[#0E0F10] p-4 flex items-center justify-between opacity-50 will-change-transform z-10"
            >
              <div>
                <span className="text-[10px] font-mono text-[#888888] uppercase">IMP-260925-011</span>
                <div className="text-sm font-bold">BMW 320d vs Fiat 500</div>
              </div>
              <div className="text-xs font-mono text-[#888888]">12:40 UTC</div>
            </div>

            {/* Queue Row 3 (Recedes further into depth) */}
            <div
              ref={queueRow3Ref}
              className="absolute inset-x-0 translate-y-44 bg-white border border-[#E5E5E3] text-[#0E0F10] p-4 flex items-center justify-between opacity-25 will-change-transform z-0"
            >
              <div>
                <span className="text-[10px] font-mono text-[#888888] uppercase">IMP-260925-008</span>
                <div className="text-sm font-bold">Mercedes A-Class vs Toyota Yaris</div>
              </div>
              <div className="text-xs font-mono text-[#888888]">09:15 UTC</div>
            </div>

            {/* Expanded Claim Stack (Revealed when Row 1 expands) */}
            <div
              ref={expandedClaimRef}
              className="absolute inset-0 bg-[#0E0F10] text-white p-6 sm:p-8 border border-white/20 shadow-2xl flex flex-col justify-between will-change-transform z-30"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs uppercase tracking-widest text-[#CCCCCC] font-semibold">
                  {isIt ? "FASCICOLO STRUTTURATO" : "STRUCTURED CLAIM DOSSIER"}
                </span>
                <span className="font-mono text-sm font-bold text-white">IMP-260925-014</span>
              </div>

              <div className="grid grid-cols-3 gap-6 py-6 text-xs">
                <div className="border-l border-white/20 pl-4 space-y-1">
                  <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold block">TELEMETRY</span>
                  <div className="font-bold text-sm text-white">3.4 G Peak</div>
                  <div className="text-[11px] text-white/70">42° Vector</div>
                </div>
                <div className="border-l border-white/20 pl-4 space-y-1">
                  <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold block">OPTICS</span>
                  <div className="font-bold text-sm text-white">{isIt ? "4 Rilievi" : "4 Verified"}</div>
                  <div className="text-[11px] text-white/70">{isIt ? "Danni concordi" : "Damage Match"}</div>
                </div>
                <div className="border-l border-white/20 pl-4 space-y-1">
                  <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold block">CAI BOX 12</span>
                  <div className="font-bold text-sm text-white">{isIt ? "Casella 12" : "Clause 08"}</div>
                  <div className="text-[11px] text-white/70">{isIt ? "Stesso senso" : "Same Direction"}</div>
                </div>
              </div>

              <div className="text-[11px] text-white/60 font-light flex items-center justify-between pt-3 border-t border-white/10">
                <span>{isIt ? "Ricomposizione multilivello per il perito liquidatore" : "Multilevel reconstruction ready for claims adjuster review"}</span>
                <span className="text-[11px] font-semibold text-white uppercase tracking-wider">
                  {isIt ? "PERIZIA ABILITATA" : "READY FOR AUDIT"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EVIDENCE FAN: 3 PHYSICAL DOCUMENT SURFACES FANNING IN 3D SPACE */}
      <section
        ref={fanSectionRef}
        className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3] overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-[0.24em] text-[#777777] font-semibold block">
              {isIt ? "VENTAGLIO DELLE PROVE" : "EVIDENTIARY DECOMPOSITION"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#0E0F10] leading-tight">
              {isIt ? "Tre piani probatori fisici." : "Three physical evidence surfaces."}
            </h2>
            <p className="text-base sm:text-xl text-[#555555] font-light leading-relaxed">
              {isIt
                ? "Contesto stradale, deformazione lamierati e circostanza CAI si aprono a ventaglio per consentire un confronto immediato."
                : "Road context, sheet-metal deformation, and CAI circumstances fan outward for instantaneous comparative inspection."}
            </p>
          </div>

          {/* Physical Document Planes Fanning in 3D */}
          <div className="relative w-full min-h-[380px] sm:min-h-[420px] flex items-center justify-center [transform-style:preserve-3d]">
            {/* Plane 1: ROAD CONTEXT (Left: translateX negative + rotateY) */}
            <div
              ref={fanLeftRef}
              className="absolute w-[280px] sm:w-[320px] bg-[#0E0F10] text-white p-6 border border-white/20 shadow-xl space-y-3 select-none will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="text-[10px] font-semibold text-white/60 uppercase tracking-widest block">
                01 / {isIt ? "CONTESTO STRADALE" : "ROAD CONTEXT"}
              </span>
              <div className="text-lg font-bold uppercase">Via Colombo • Milan</div>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                {isIt ? "Corsia a senso unico. Nessun ostacolo imprevisto registrato dal rilievo." : "Single-direction lane. Zero unexpected road obstacles documented on scene."}
              </p>
              <div className="text-[10px] font-mono text-emerald-400">GNSS 45.464° N • 9.190° E</div>
            </div>

            {/* Plane 2: VISIBLE DAMAGE (Center: translateZ forward) */}
            <div
              ref={fanCenterRef}
              className="absolute w-[290px] sm:w-[340px] bg-[#16171B] text-white p-6 border-2 border-white/30 shadow-2xl space-y-3 select-none will-change-transform z-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="text-[10px] font-semibold text-white/80 uppercase tracking-widest block">
                02 / {isIt ? "DANNO VISIBILE" : "VISIBLE DAMAGE"}
              </span>
              <div className="text-lg font-bold uppercase">{isIt ? "Impatto Paraurti Anteriore Sx" : "Front-Left Fender Contact"}</div>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                {isIt ? "Punto d'urto ad altezza paraurti, coerente con decelerazione da 38 km/h." : "Bumper-height deformation zone consistent with 38 km/h deceleration vector."}
              </p>
              <div className="text-[10px] font-semibold text-white/70 tracking-wider uppercase">
                {isIt ? "4 Rilievi Ottici Allineati" : "4 Photo Matches Aligned"}
              </div>
            </div>

            {/* Plane 3: CAI CIRCUMSTANCE (Right: translateX positive + rotateY opposite) */}
            <div
              ref={fanRightRef}
              className="absolute w-[280px] sm:w-[320px] bg-[#0E0F10] text-white p-6 border border-white/20 shadow-xl space-y-3 select-none will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="text-[10px] font-semibold text-white/60 uppercase tracking-widest block">
                03 / {isIt ? "CIRCOSTANZA CAI" : "CAI CIRCUMSTANCE"}
              </span>
              <div className="text-lg font-bold uppercase">{isIt ? "Concordanza Casella 12" : "Clause 08 Concordance"}</div>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                {isIt ? "I veicoli procedevano nella medesima direzione senza sorpasso in corso." : "Vehicles were traveling in the same direction without ongoing overtake maneuvers."}
              </p>
              <div className="text-[10px] font-semibold text-emerald-400 tracking-wider uppercase">
                {isIt ? "Nessun Conflitto Rilevato" : "No Conflict Detected"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OBSERVED VS INFERRED: VISUAL COMPARISON WITHOUT CARDS (True Spatial Separation) */}
      <section
        ref={observedSectionRef}
        className="py-24 sm:py-36 bg-[#F7F7F6] border-b border-[#E5E5E3] overflow-hidden"
        style={{ perspective: "1400px" }}
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.24em] text-[#777777] font-semibold block">
                {isIt ? "SEPARAZIONE ONTOLOGICA" : "EVIDENTIARY RIGOR"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#0E0F10]">
                {isIt ? "Osservato vs. Inferito" : "Observed vs. Inferred"}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setInferredElevated(!inferredElevated)}
              className="px-6 py-3 border border-[#0E0F10] text-xs font-bold uppercase tracking-wider text-[#0E0F10] hover:bg-[#0E0F10] hover:text-white transition-colors cursor-pointer self-start"
            >
              {inferredElevated
                ? (isIt ? "Ripristina separazione di profondità" : "Restore depth separation")
                : (isIt ? "Porta in primo piano per revisione umana ↑" : "Elevate for adjuster review ↑")}
            </button>
          </div>

          {/* Spatial Planes Direct on Canvas (Zero Generic White Boxes) */}
          <div className="relative w-full min-h-[380px] grid grid-cols-1 md:grid-cols-2 gap-8 items-center [transform-style:preserve-3d]">
            {/* Plane 1: OBSERVED (Closer, High Contrast, Hard Facts) */}
            <div
              ref={observedPlaneRef}
              className="border-l-4 border-[#0E0F10] pl-6 py-4 space-y-4 will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#0E0F10]">
                {isIt ? "OSSERVATO" : "OBSERVED"}
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#0E0F10] block">
                {isIt ? "PROVENIENZA OTTICA E SENSORISTICA STRUMENTALE" : "EMPIRICAL SENSOR & OPTIC PROVENANCE"}
              </span>
              <p className="text-sm sm:text-base text-[#555555] font-light leading-relaxed max-w-md">
                {isIt
                  ? "Dati metrologici certi: picco 3.4G, 4 scatti fotografici georeferenziati, coordinate GNSS fisse e orientamento carreggiata."
                  : "Certified metrological facts: 3.4G impact spike, 4 georeferenced camera angles, fixed GNSS coordinates, and roadway vector."}
              </p>
              <div className="text-xs uppercase tracking-wider font-semibold text-[#0E0F10] border-t border-[#E5E5E3] pt-2">
                {isIt ? "TELEMETRIA STRUMENTALE DIRETTA • RILIEVO DETERMINISTICO" : "DIRECT INSTRUMENT TELEMETRY • DETERMINISTIC MEASUREMENT"}
              </div>
            </div>

            {/* Plane 2: INFERRED (Recessed in Depth, Dotted Spatial Line, Narrative Declarations) */}
            <div
              ref={inferredPlaneRef}
              className="border-l-4 border-dashed border-[#888888] pl-6 py-4 space-y-4 will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#777777]">
                {isIt ? "INFERITO" : "INFERRED"}
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#777777] block">
                {isIt ? "NARRAZIONE DEI CONDUCENTI E CIRCOSTANZE CAI" : "DRIVER NARRATIVE & CAI CIRCUMSTANCES"}
              </span>
              <p className="text-sm sm:text-base text-[#666666] font-light leading-relaxed max-w-md">
                {isIt
                  ? "Dichiarazioni dei conducenti e stima dinamica CAI. Richiedono validazione e conferma da parte del perito assicurativo."
                  : "Bilateral driver declarations and preliminary CAI mapping. Subject to final review and human adjuster validation."}
              </p>
              <div className="text-xs uppercase tracking-wider font-semibold text-[#777777] border-t border-[#E5E5E3] pt-2">
                {isIt ? "SOGGETTO A CONFERMA DEL PERITO LIQUIDATORE" : "SUBJECT TO CERTIFIED ADJUSTER CONFIRMATION"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL PAYOFF: Headline Enters Large Outside Viewport, Line-by-Line Alignment, Visual Calm */}
      <section
        ref={payoffSectionRef}
        className="py-28 sm:py-40 bg-white overflow-hidden relative"
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-baseline">
            {/* Left Headline: Enters Extremely Large Outside Viewport, Lines Align */}
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
