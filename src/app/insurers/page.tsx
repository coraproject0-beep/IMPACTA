"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PublicShell } from "@/components/public/PublicShell";
import { RevealText } from "@/components/motion/RevealText";
import { useLanguage } from "@/context/LanguageContext";
import {
  CameraIcon,
  CheckCircleIcon,
  ShieldIcon,
  ChevronRightIcon,
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
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const heroUiRef = useRef<HTMLDivElement>(null);
  const planesRef = useRef<HTMLDivElement>(null);

  // Hero UI spatial entrance and gentle mouse parallax
  useEffect(() => {
    const hero = heroRef.current;
    const heroUi = heroUiRef.current;
    if (!hero || !heroUi) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroUi,
        {
          opacity: 0,
          z: -120,
          rotateY: -12,
          rotateX: 8,
          scale: 0.94,
        },
        {
          opacity: 1,
          z: 0,
          rotateY: -4,
          rotateX: 2,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }, hero);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xNorm = (e.clientX / innerWidth - 0.5) * 2;
      const yNorm = (e.clientY / innerHeight - 0.5) * 2;

      gsap.to(heroUi, {
        rotateY: -4 + xNorm * 4,
        rotateX: 2 - yNorm * 3,
        duration: 0.8,
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
      {/* 1. HERO SCENE: Spatial Integration of Typography & Operational Claim Plane */}
      <section
        ref={heroRef}
        className="relative py-20 sm:py-32 lg:py-40 px-6 sm:px-12 lg:px-20 border-b border-[#E5E5E3] overflow-hidden bg-gradient-to-b from-[#FFFFFF] to-[#FBFBFA]"
        style={{ perspective: "1400px" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authoritative Editorial Statement */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.24em] font-medium text-[#777777] block">
              {t("insurersPage.heroTag")}
            </span>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0E0F10] leading-[1.02] uppercase">
              <RevealText as="span" mode="word" variant="fragment" delay={0.05} triggerOnScroll={false}>
                {t("insurersPage.heroTitleLine1")}
              </RevealText>
              <br />
              <RevealText as="span" mode="word" variant="fragment" delay={0.25} triggerOnScroll={false} className="text-[#555555]">
                {t("insurersPage.heroTitleLine2")}
              </RevealText>
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
                href="#operational-flow"
                className="text-xs font-medium text-[#555555] hover:text-[#0E0F10] transition-colors uppercase tracking-wider"
              >
                {isIt ? "Guarda il flusso operativo ↓" : "Explore operational flow ↓"}
              </a>
            </div>
          </div>

          {/* Right Column: Spatial Operational Claim Plane (DOM/CSS 3D) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div
              ref={heroUiRef}
              className="w-full max-w-lg bg-white border border-[#E5E5E3] rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.06)] space-y-6"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              {/* Dossier Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E3]">
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

              {/* Vehicle Comparison Cards */}
              <div className="grid grid-cols-2 gap-3 text-xs">
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

              {/* Verified Facts Breakdown */}
              <div className="space-y-2 text-xs border-t border-[#E5E5E3] pt-4">
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

              {/* Bottom Operational Action */}
              <div className="pt-2 flex items-center justify-between text-xs border-t border-[#E5E5E3]">
                <span className="text-[#777777]">{isIt ? "Perizia umana esclusiva" : "Human review authority"}</span>
                <span className="font-semibold text-[#0E0F10] flex items-center gap-1.5 cursor-pointer hover:underline">
                  <span>{isIt ? "Apri fascicolo" : "Inspect claim"}</span>
                  <ChevronRightIcon size={14} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPATIAL CHOREOGRAPHY: THE 4-STAGE OPERATIONAL FLOW (Section 27) */}
      <section
        id="operational-flow"
        className="py-24 sm:py-36 px-6 sm:px-12 lg:px-20 bg-[#F7F7F6] border-b border-[#E5E5E3] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Section Heading */}
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.24em] font-medium text-[#777777] block">
              {t("insurersPage.workbenchTag")}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E0F10] leading-tight uppercase">
              {t("insurersPage.workbenchTitle")}
            </h2>
            <p className="text-base sm:text-lg text-[#555555] font-light leading-relaxed">
              {t("insurersPage.workbenchSubtitle")}
            </p>
          </div>

          {/* Interactive Step Track (queue -> open -> planes -> review) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 border-b border-[#E5E5E3] pb-6">
            {[
              { id: "queue" as SpatialFlowStep, num: "01", label: isIt ? "Coda Operativa" : "Claims Queue" },
              { id: "open" as SpatialFlowStep, num: "02", label: isIt ? "Apertura Fascicolo" : "Dossier Ingestion" },
              { id: "planes" as SpatialFlowStep, num: "03", label: isIt ? "Separazione Piani" : "Evidence Planes" },
              { id: "review" as SpatialFlowStep, num: "04", label: isIt ? "Revisione Peritale" : "Human Sign-off" },
            ].map((step) => {
              const isActive = activeStep === step.id;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(step.id)}
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

          {/* Spatial Layer Stage: Real Operational Surface with DOM 3D Planes */}
          <div
            ref={planesRef}
            className="relative w-full min-h-[460px] sm:min-h-[520px] rounded-3xl bg-white border border-[#E5E5E3] p-6 sm:p-10 flex flex-col justify-between overflow-hidden shadow-xs"
            style={{ perspective: "1200px" }}
          >
            {/* Top Operational Context Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E5E5E3] text-xs">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-[#0E0F10] text-sm sm:text-base">
                  CASE-CLM-2026-0881
                </span>
                <span className="text-[11px] text-[#777777] font-mono">
                  MILANO • VIALE MONZA // 14:22:04
                </span>
              </div>
              <div className="text-[11px] text-[#555555]">
                {isIt ? "Modalità di visualizzazione: Piani Probatori Paralleli" : "View mode: Parallel Evidence Planes"}
              </div>
            </div>

            {/* Central Layered 3D Planes */}
            <div className="my-auto py-8 grid grid-cols-1 md:grid-cols-3 gap-6 relative" style={{ transformStyle: "preserve-3d" }}>
              {/* Plane 1: Roadway Context & Location */}
              <div
                onMouseEnter={() => setHoveredRow(1)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`p-6 rounded-2xl border transition-all duration-500 bg-[#FAFAFA] space-y-3 cursor-default ${
                  activeStep === "planes" || hoveredRow === 1
                    ? "border-[#0E0F10] shadow-md -translate-y-1"
                    : "border-[#E5E5E3]"
                }`}
                style={{
                  transform:
                    activeStep === "planes"
                      ? "translateZ(15px)"
                      : "translateZ(0)",
                }}
              >
                <div className="flex items-center gap-2 text-[#777777]">
                  <CameraIcon size={16} />
                  <span className="text-[10px] uppercase tracking-wider font-semibold">
                    {isIt ? "1. Contesto Stradale" : "1. Roadway Context"}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#0E0F10]">
                  {isIt ? "Carreggiata e Tracciato" : "Roadway & Alignment"}
                </h3>
                <p className="text-xs text-[#666666] font-light leading-relaxed">
                  {isIt
                    ? "Inquadratura panoramica e coordinate GPS allineano la direzione dei veicoli senza supposizioni soggettive."
                    : "Wide perspective and localized coordinates establish vehicle trajectory without speculation."}
                </p>
                <div className="text-[11px] font-mono text-[#888888] pt-2 border-t border-[#E5E5E3]">
                  GPS: 45.4642° N, 9.1900° E
                </div>
              </div>

              {/* Plane 2: Visible Damage & Contact Points */}
              <div
                onMouseEnter={() => setHoveredRow(2)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`p-6 rounded-2xl border transition-all duration-500 bg-[#FAFAFA] space-y-3 cursor-default ${
                  activeStep === "planes" || hoveredRow === 2
                    ? "border-[#0E0F10] shadow-md -translate-y-1"
                    : "border-[#E5E5E3]"
                }`}
                style={{
                  transform:
                    activeStep === "planes"
                      ? "translateZ(30px)"
                      : "translateZ(0)",
                }}
              >
                <div className="flex items-center gap-2 text-[#777777]">
                  <ShieldIcon size={16} />
                  <span className="text-[10px] uppercase tracking-wider font-semibold">
                    {isIt ? "2. Danni Visibili" : "2. Visible Damage"}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#0E0F10]">
                  {isIt ? "Area di Contatto Veicoli" : "Vehicle Contact Zone"}
                </h3>
                <p className="text-xs text-[#666666] font-light leading-relaxed">
                  {isIt
                    ? "Correlazione diretta tra le deformazioni riscontrate sul paraurti anteriore sx e la fiancata della controparte."
                    : "Direct alignment between front-left bumper deformation and counterparty side panel scrape."}
                </p>
                <div className="text-[11px] font-mono text-[#888888] pt-2 border-t border-[#E5E5E3]">
                  {isIt ? "4 prospetti conformi" : "4 photos aligned"}
                </div>
              </div>

              {/* Plane 3: Agreed Circumstances & Review State */}
              <div
                onMouseEnter={() => setHoveredRow(3)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`p-6 rounded-2xl border transition-all duration-500 bg-[#FAFAFA] space-y-3 cursor-default ${
                  activeStep === "planes" || hoveredRow === 3
                    ? "border-[#0E0F10] shadow-md -translate-y-1"
                    : "border-[#E5E5E3]"
                }`}
                style={{
                  transform:
                    activeStep === "planes"
                      ? "translateZ(45px)"
                      : "translateZ(0)",
                }}
              >
                <div className="flex items-center gap-2 text-[#777777]">
                  <CheckCircleIcon size={16} />
                  <span className="text-[10px] uppercase tracking-wider font-semibold">
                    {isIt ? "3. Standard CAI" : "3. Standard CAI"}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#0E0F10]">
                  {isIt ? "Casella 12 Modulo Blu" : "European Box 12"}
                </h3>
                <p className="text-xs text-[#666666] font-light leading-relaxed">
                  {isIt
                    ? "Circolava nello stesso senso e su fila diversa. Fatti strutturati pronti per la firma del perito abilitato."
                    : "Circumstance 12: Changing lanes in same direction. Structured for licensed adjuster sign-off."}
                </p>
                <div className="text-[11px] font-mono text-emerald-800 font-semibold pt-2 border-t border-[#E5E5E3]">
                  {isIt ? "Convalida perito in attesa" : "Awaiting adjuster validation"}
                </div>
              </div>
            </div>

            {/* Bottom Surface Footer */}
            <div className="pt-4 border-t border-[#E5E5E3] flex flex-wrap items-center justify-between text-xs text-[#666666]">
              <span>
                {isIt
                  ? "Dati conservati localmente • Conformità agli standard peritali europei"
                  : "Locally buffered evidence • Aligned with European claims standards"}
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
