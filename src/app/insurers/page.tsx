"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PublicShell } from "@/components/public/PublicShell";
import { useLanguage } from "@/context/LanguageContext";
import {
  CameraIcon,
  CheckCircleIcon,
  ShieldIcon,
  ChevronRightIcon,
  FileTextIcon,
  CarIcon,
  ClockIcon,
} from "@/components/icons/Icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type SpatialFlowStep = "queue" | "open" | "planes" | "review";

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

  const [activeStep, setActiveStep] = useState<SpatialFlowStep>("planes");
  const [inferredElevated, setInferredElevated] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const heroUiRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  // 1. Hero Cinematic Entry (Fragmented lateral lock + 3D perspective dossier entry)
  useEffect(() => {
    const hero = heroRef.current;
    const heroUi = heroUiRef.current;
    const headline = headlineRef.current;
    if (!hero || !heroUi || !headline) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Custom fragmented typography entrance
      const words = headline.querySelectorAll(".hero-word");
      gsap.fromTo(
        words,
        {
          opacity: 0,
          x: (i) => (i % 2 === 0 ? -36 : 36),
          z: -80,
          scale: 0.94,
          letterSpacing: "0.06em",
        },
        {
          opacity: 1,
          x: 0,
          z: 0,
          scale: 1,
          letterSpacing: "-0.03em",
          duration: 1.1,
          stagger: 0.08,
          ease: "power3.out",
        }
      );

      // Deep perspective dossier entry (enters from deep Z with rotateY 12deg, rotateX 6deg)
      gsap.fromTo(
        heroUi,
        {
          opacity: 0,
          z: -180,
          rotateY: 14,
          rotateX: 7,
          scale: 0.92,
        },
        {
          opacity: 1,
          z: 0,
          rotateY: -4,
          rotateX: 3,
          scale: 1,
          duration: 1.3,
          ease: "power3.out",
          delay: 0.15,
        }
      );
    }, hero);

    // Mouse-driven 3D camera parallax tilt
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xNorm = (e.clientX / innerWidth - 0.5) * 2;
      const yNorm = (e.clientY / innerHeight - 0.5) * 2;

      gsap.to(heroUi, {
        rotateY: -4 + xNorm * 5,
        rotateX: 3 - yNorm * 4,
        duration: 0.7,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="w-full bg-[#FFFFFF] selection:bg-[#0E0F10] selection:text-white">
      {/* 1. HERO SCENE: Spatial Integration of Typography & Multi-Plane Operational Dossier */}
      <section
        ref={heroRef}
        className="relative py-20 sm:py-32 lg:py-36 px-6 sm:px-12 lg:px-20 border-b border-[#E5E5E3] overflow-hidden bg-gradient-to-b from-[#FFFFFF] to-[#FBFBFA]"
        style={{ perspective: "1400px" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authoritative Editorial Statement */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.24em] font-medium text-[#777777] block">
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
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0E0F10] text-white text-xs font-bold tracking-wider uppercase hover:bg-black transition-all rounded-xl shadow-sm active:scale-[0.99]"
              >
                <span>{t("insurersPage.heroCta")}</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                  →
                </span>
              </Link>
              <a
                href="#operational-continuum"
                className="text-xs font-medium text-[#555555] hover:text-[#0E0F10] transition-colors uppercase tracking-wider"
              >
                {isIt ? "Guarda il flusso operativo ↓" : "Explore operational flow ↓"}
              </a>
            </div>
          </div>

          {/* Right Column: Multi-Plane Spatial Operational Dossier (DOM 3D with true Z-depth layering) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div
              ref={heroUiRef}
              className="w-full max-w-lg bg-white border border-[#E5E5E3] rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.06)] space-y-6"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              {/* Layer 0: Dossier Header Bar (translateZ: 0px) */}
              <div
                className="flex items-center justify-between pb-4 border-b border-[#E5E5E3]"
                style={{ transform: "translateZ(0px)" }}
              >
                <div>
                  <span className="text-[10px] font-mono text-[#888888] uppercase tracking-widest block">
                    OPERATIONAL CLAIMS DOSSIER
                  </span>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-[#0E0F10] mt-0.5">
                    IMP-260925-014
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-emerald-800 block">
                    {isIt ? "Pronto per revisione" : "Ready for review"}
                  </span>
                  <span className="text-[11px] font-mono text-[#777777]">14:22 UTC</span>
                </div>
              </div>

              {/* Layer 1: Vehicle Profiles with subtle forward float (translateZ: 18px) */}
              <div
                className="grid grid-cols-2 gap-3 text-xs"
                style={{
                  transform: "translateZ(18px)",
                  transition: "transform 0.4s ease",
                }}
              >
                <div className="p-3.5 bg-[#F7F7F6] rounded-xl border border-[#EBEBEA] space-y-0.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#777777] block">
                    {t("insurersPage.previewVehicleA")}
                  </span>
                  <div className="font-semibold text-[#0E0F10]">Audi A3 Sportback</div>
                  <div className="font-mono text-[11px] text-[#555555]">AB 123 CD</div>
                </div>
                <div className="p-3.5 bg-[#F7F7F6] rounded-xl border border-[#EBEBEA] space-y-0.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#777777] block">
                    {t("insurersPage.previewVehicleB")}
                  </span>
                  <div className="font-semibold text-[#0E0F10]">Volkswagen Golf</div>
                  <div className="font-mono text-[11px] text-[#555555]">EF 456 GH</div>
                </div>
              </div>

              {/* Layer 2: Verified Empirical Facts (translateZ: 34px) */}
              <div
                className="space-y-2 text-xs border-t border-[#E5E5E3] pt-4"
                style={{
                  transform: "translateZ(34px)",
                  transition: "transform 0.4s ease",
                }}
              >
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#555555]">{isIt ? "Danni visibili" : "Visible damage"}</span>
                  <span className="font-semibold text-[#0E0F10]">{isIt ? "Paraurti e parafango ant. sx" : "Front-left bumper & fender"}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#555555]">{isIt ? "Modulo CAI" : "CAI Circumstance"}</span>
                  <span className="font-semibold text-[#0E0F10]">{isIt ? "Casella 12 • Stesso senso" : "Box 12 • Same direction"}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#555555]">{isIt ? "Documentazione foto" : "Photographs"}</span>
                  <span className="font-mono font-medium text-[#0E0F10]">{isIt ? "4 prospetti coerenti" : "4 aligned perspectives"}</span>
                </div>
              </div>

              {/* Layer 3: Truthful Human Review Callout (translateZ: 50px) */}
              <div
                className="pt-2 flex items-center justify-between text-xs border-t border-[#E5E5E3]"
                style={{
                  transform: "translateZ(50px)",
                  transition: "transform 0.4s ease",
                }}
              >
                <span className="text-[#777777]">{isIt ? "Revisione finale perito umano" : "Final review with human adjuster"}</span>
                <Link
                  href="/console/login"
                  className="font-semibold text-[#0E0F10] flex items-center gap-1.5 hover:underline"
                >
                  <span>{isIt ? "Apri fascicolo" : "Inspect claim"}</span>
                  <ChevronRightIcon size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPATIAL OPERATIONAL CONTINUUM (Queue -> Selected -> Evidence Planes -> Human Payoff) */}
      <section
        id="operational-continuum"
        className="py-24 sm:py-36 px-6 sm:px-12 lg:px-20 bg-[#F7F7F6] border-b border-[#E5E5E3] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Section Heading */}
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.24em] font-medium text-[#777777] block">
              {isIt ? "CONTINUUM OPERATIVO" : "OPERATIONAL CONTINUUM"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E0F10] leading-tight uppercase">
              {t("insurersPage.workbenchTitle")}
            </h2>
            <p className="text-base sm:text-lg text-[#555555] font-light leading-relaxed">
              {t("insurersPage.workbenchSubtitle")}
            </p>
          </div>

          {/* 4-Stage Operational Narrative Controller */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 border-b border-[#E5E5E3] pb-6">
            {[
              { id: "queue" as SpatialFlowStep, num: "01", label: isIt ? "Coda Triage" : "Claims Queue" },
              { id: "open" as SpatialFlowStep, num: "02", label: isIt ? "Apertura Fascicolo" : "Claim Ingestion" },
              { id: "planes" as SpatialFlowStep, num: "03", label: isIt ? "Separazione Piani" : "Evidence Planes" },
              { id: "review" as SpatialFlowStep, num: "04", label: isIt ? "Revisione e Firma" : "Human Sign-off" },
            ].map((step) => {
              const isActive = activeStep === step.id;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => {
                    setActiveStep(step.id);
                    if (step.id !== "planes") setInferredElevated(false);
                  }}
                  className={`text-left p-4 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-white border border-[#E5E5E3] shadow-xs"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <span className="font-mono text-xs font-bold text-[#888888] block mb-1">
                    {step.num}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#0E0F10] block">
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Spatial Stage Surface: Transforms based on the selected narrative state */}
          <div
            className="relative w-full min-h-[480px] sm:min-h-[540px] rounded-3xl bg-white border border-[#E5E5E3] p-6 sm:p-10 flex flex-col justify-between overflow-hidden shadow-xs"
            style={{ perspective: "1400px" }}
          >
            {/* Top Operational Context Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E5E5E3] text-xs">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-[#0E0F10] text-sm sm:text-base">
                  CASE-CLM-2026-0881
                </span>
                <span className="text-[11px] text-[#777777] font-mono">
                  MILANO • VIALE MONZA // 14:22:04 UTC
                </span>
              </div>
              <div className="text-[11px] font-mono text-[#555555]">
                {activeStep === "queue" && (isIt ? "FASE 1: CODA DI TRIAGE" : "STAGE 1: TRIAGE QUEUE")}
                {activeStep === "open" && (isIt ? "FASE 2: APERTURA FASCICOLO" : "STAGE 2: DOSSIER INGESTION")}
                {activeStep === "planes" && (isIt ? "FASE 3: SEPARAZIONE PROVE OGGETTIVE VS IPOTESI" : "STAGE 3: OBSERVED VS INFERRED PLANES")}
                {activeStep === "review" && (isIt ? "FASE 4: DECISIONE PERITALE" : "STAGE 4: ADJUSTER DECISION")}
              </div>
            </div>

            {/* STAGE 1: QUEUE PERSPECTIVE */}
            {activeStep === "queue" && (
              <div className="my-auto py-6 space-y-4" style={{ transformStyle: "preserve-3d" }}>
                <p className="text-xs uppercase tracking-wider text-[#777777] font-mono mb-2">
                  {isIt ? "Seleziona un sinistro per aprire la visuale spaziale" : "Select a claim to expand its spatial dossier"}
                </p>

                {/* Row 1: Selected forward claim */}
                <div
                  className="p-5 rounded-2xl border border-[#0E0F10] bg-[#FAFAFA] shadow-md flex items-center justify-between transition-transform duration-500 cursor-pointer"
                  style={{ transform: "translateZ(30px)" }}
                  onClick={() => setActiveStep("open")}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-bold text-sm text-[#0E0F10]">IMP-260925-014</span>
                    <span className="text-xs text-[#555555]">Milano • Viale Monza</span>
                    <span className="text-xs font-semibold text-emerald-800">4 photos</span>
                  </div>
                  <span className="text-xs font-bold text-[#0E0F10] flex items-center gap-1">
                    {isIt ? "Apri dettaglio →" : "Expand claim →"}
                  </span>
                </div>

                {/* Row 2: Receded claim */}
                <div
                  className="p-5 rounded-2xl border border-[#E5E5E3] bg-white opacity-50 flex items-center justify-between transition-all duration-500 hover:opacity-80"
                  style={{ transform: "translateZ(-15px)" }}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-medium text-sm text-[#888888]">IMP-260925-009</span>
                    <span className="text-xs text-[#777777]">Torino • Corso Francia</span>
                    <span className="text-xs text-[#888888]">Rear-end</span>
                  </div>
                  <span className="text-xs font-mono text-[#888888]">12:45 UTC</span>
                </div>

                {/* Row 3: Deeper receded claim */}
                <div
                  className="p-5 rounded-2xl border border-[#E5E5E3] bg-white opacity-35 flex items-center justify-between transition-all duration-500"
                  style={{ transform: "translateZ(-30px)" }}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-medium text-sm text-[#888888]">IMP-260924-082</span>
                    <span className="text-xs text-[#777777]">Bologna • Via Emilia</span>
                    <span className="text-xs text-[#888888]">Side contact</span>
                  </div>
                  <span className="text-xs font-mono text-[#888888]">Yesterday</span>
                </div>
              </div>
            )}

            {/* STAGE 2: CLAIM INGESTION */}
            {activeStep === "open" && (
              <div className="my-auto py-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center" style={{ transformStyle: "preserve-3d" }}>
                <div className="space-y-4" style={{ transform: "translateZ(20px)" }}>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#777777]">
                    {isIt ? "INGESTIONE FASCICOLO STRUTTURATO" : "STRUCTURED DOSSIER INGESTION"}
                  </span>
                  <h3 className="text-2xl font-bold text-[#0E0F10]">
                    {isIt ? "Fatti oggettivi estratti senza interpretazioni arbitrarie." : "Empirical facts extracted without arbitrary bias."}
                  </h3>
                  <p className="text-sm text-[#555555] font-light leading-relaxed">
                    {isIt
                      ? "Il veicolo A (Audi A3) e il veicolo B (Volkswagen Golf) hanno registrato le fotografie guidate su 4 prospetti concordati. I punti di deformazione coincidono geometricamente."
                      : "Vehicle A (Audi A3) and Vehicle B (Volkswagen Golf) captured 4 aligned perspectives at roadside. Geometric deformation contact points match exactly."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveStep("planes")}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0E0F10] border-b border-[#0E0F10] pb-0.5 hover:text-black"
                  >
                    <span>{isIt ? "Separa i piani probatori →" : "Separate evidence planes →"}</span>
                  </button>
                </div>

                <div className="p-6 bg-[#FAFAFA] rounded-2xl border border-[#E5E5E3] space-y-4 shadow-sm" style={{ transform: "translateZ(40px)" }}>
                  <div className="flex justify-between items-center text-xs pb-3 border-b border-[#E5E5E3]">
                    <span className="font-mono text-[#777777]">Audi A3 (AB 123 CD)</span>
                    <span className="font-mono text-[#777777]">VW Golf (EF 456 GH)</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#EBEBEA]">
                      <span className="text-[#555555]">{isIt ? "Punto impatto A" : "Impact Point A"}</span>
                      <span className="font-semibold text-[#0E0F10]">{isIt ? "Paraurti ant. sx" : "Front-left bumper"}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#EBEBEA]">
                      <span className="text-[#555555]">{isIt ? "Punto impatto B" : "Impact Point B"}</span>
                      <span className="font-semibold text-[#0E0F10]">{isIt ? "Fiancata posteriore dx" : "Rear-right side"}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#555555]">{isIt ? "Dichiarazione CAI" : "CAI Statement"}</span>
                      <span className="font-semibold text-[#0E0F10]">{isIt ? "Stesso senso di marcia" : "Same direction of travel"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 3: EVIDENCE PLANES & CONFIRMED VS INFERRED VISUAL SEPARATION */}
            {activeStep === "planes" && (
              <div className="my-auto py-6 grid grid-cols-1 md:grid-cols-2 gap-8 relative" style={{ transformStyle: "preserve-3d" }}>
                {/* Plane A: OBSERVED / CONFIRMED (Front Plane: high contrast, translateZ: 36px) */}
                <div
                  className="p-6 rounded-2xl border border-[#0E0F10] bg-white shadow-lg space-y-4 transition-transform duration-500"
                  style={{ transform: "translateZ(36px)" }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-800">
                      <CheckCircleIcon size={16} />
                      <span className="text-[10px] uppercase tracking-wider font-bold">
                        {isIt ? "EVIDENZE RISCONTRATE" : "OBSERVED EVIDENCE"}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#888888]">EMPIRICAL</span>
                  </div>

                  <h3 className="text-base font-bold text-[#0E0F10]">
                    {isIt ? "Danni Visibili e Posizione Stradale" : "Visible Damage & Roadway Fix"}
                  </h3>
                  <p className="text-xs text-[#555555] font-light leading-relaxed">
                    {isIt
                      ? "4 fotografie georeferenziate scattate sul posto con marcatura oraria. Orientamento carreggiata allineato a Viale Monza."
                      : "4 georeferenced roadside photographs with accurate timestamps. Trajectory aligned to Viale Monza roadway grid."}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-[#E5E5E3] text-xs font-mono text-[#555555]">
                    <div className="flex justify-between">
                      <span>{isIt ? "FOTO SCENA" : "SCENE PHOTOS"}:</span>
                      <span className="font-bold text-[#0E0F10]">4 ALIGNED</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GPS:</span>
                      <span className="font-bold text-[#0E0F10]">45.4642° N, 9.1900° E</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isIt ? "DEFORMAZIONE" : "DEFORMATION"}:</span>
                      <span className="font-bold text-[#0E0F10]">MATCH CONFIRMED</span>
                    </div>
                  </div>
                </div>

                {/* Plane B: INFERRED / REQUIRES REVIEW (Recessed Plane: translateZ: -15px or 50px if elevated) */}
                <div
                  className={`p-6 rounded-2xl border transition-all duration-500 space-y-4 ${
                    inferredElevated
                      ? "border-[#0E0F10] bg-white shadow-xl"
                      : "border-[#D5D5D3] bg-[#F7F7F6] opacity-75"
                  }`}
                  style={{
                    transform: inferredElevated ? "translateZ(50px)" : "translateZ(-15px)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#777777]">
                      <FileTextIcon size={16} />
                      <span className="text-[10px] uppercase tracking-wider font-bold">
                        {isIt ? "CIRCOSTANZA DEDOTTA" : "INFERRED CIRCUMSTANCE"}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#888888]">REQUIRES REVIEW</span>
                  </div>

                  <h3 className="text-base font-bold text-[#0E0F10]">
                    {isIt ? "Modulo CAI Standard: Casella 12" : "European CAI Box 12"}
                  </h3>
                  <p className="text-xs text-[#555555] font-light leading-relaxed">
                    {isIt
                      ? "Cambio di corsia nello stesso senso di marcia dedotto dalla combinazione tra graffio laterale e dichiarazione Blue Form."
                      : "Changing lanes in same direction inferred from lateral scrape pattern combined with driver statement."}
                  </p>

                  <div className="pt-3 border-t border-[#E5E5E3] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setInferredElevated(!inferredElevated)}
                      className="text-xs font-bold text-[#0E0F10] hover:underline"
                    >
                      {inferredElevated
                        ? isIt ? "← Rimetti in piano" : "← Recede plane"
                        : isIt ? "Porta avanti per perizia →" : "Elevate for adjuster review →"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep("review")}
                      className="text-xs font-semibold text-emerald-800 hover:underline"
                    >
                      {isIt ? "Convalida peritale →" : "Proceed to review →"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 4: HUMAN REVIEW PAYOFF (Motion settles, planes align, ultimate statement) */}
            {activeStep === "review" && (
              <div className="my-auto py-8 text-center space-y-6 max-w-3xl mx-auto" style={{ transformStyle: "preserve-3d" }}>
                <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#777777] block">
                  {isIt ? "STATO FINALE DEL FASCICOLO" : "FINAL REVIEW DECISION"}
                </span>

                <h3 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0E0F10] uppercase leading-[1.05]">
                  {t("insurersPage.finalReviewStatement")}
                </h3>

                <p className="text-base sm:text-xl text-[#555555] font-light max-w-xl mx-auto">
                  {t("insurersPage.finalReviewSub")}
                </p>

                <div className="pt-4 flex justify-center gap-4">
                  <Link
                    href="/console/login"
                    className="px-8 py-4 bg-[#0E0F10] text-white text-xs font-bold tracking-wider uppercase hover:bg-black rounded-xl shadow-md transition-all active:scale-[0.99]"
                  >
                    <span>{t("insurersPage.workbenchCta")}</span>
                    <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Bottom Surface Footer */}
            <div className="pt-4 border-t border-[#E5E5E3] flex flex-wrap items-center justify-between text-xs text-[#666666]">
              <span>
                {isIt
                  ? "Standard peritali europei • Revisione finale riservata al perito abilitato"
                  : "European claims standard • Final review reserved for human adjuster"}
              </span>
              <Link
                href="/console/login"
                className="font-semibold text-[#0E0F10] hover:underline flex items-center gap-1"
              >
                <span>{t("insurersPage.workbenchCta")}</span>
                <ChevronRightIcon size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ADJUSTER AUTHORITY & ETHICAL DEMARCATION */}
      <section className="py-24 sm:py-36 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-b border-[#E5E5E3]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-baseline">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-[#777777]">
              {t("insurersPage.authorityTag")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase text-[#0E0F10] leading-tight">
              {t("insurersPage.authorityTitle")}
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#555555] font-light leading-relaxed">
            <p>{t("insurersPage.authorityBody")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
