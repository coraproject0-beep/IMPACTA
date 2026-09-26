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

export default function PlatformPage() {
  return (
    <PublicShell>
      <PlatformContent />
    </PublicShell>
  );
}

function PlatformContent() {
  const { locale } = useLanguage();
  const isIt = locale === "it";

  // Section Refs for exotic GSAP choreography
  const heroRef = useRef<HTMLElement>(null);
  const scatterHeadlineRef = useRef<HTMLHeadingElement>(null);
  const corridorRef = useRef<HTMLElement>(null);
  const dataLine1Ref = useRef<HTMLDivElement>(null);
  const dataLine2Ref = useRef<HTMLDivElement>(null);
  const dataLine3Ref = useRef<HTMLDivElement>(null);

  const curtainSectionRef = useRef<HTMLElement>(null);
  const curtainOverlayRef = useRef<HTMLDivElement>(null);

  const horizontalGalleryRef = useRef<HTMLElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

  // 1. Text Scatter -> Resolve (Used ONCE on the Platform hero headline)
  useEffect(() => {
    const headline = scatterHeadlineRef.current;
    if (!headline) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const words = headline.querySelectorAll(".scatter-word");
    const ctx = gsap.context(() => {
      // Words begin 25-45px misaligned across X/Y in a controlled scattered state
      gsap.fromTo(
        words,
        {
          x: (i) => (i === 0 ? -32 : i === 1 ? 24 : i === 2 ? -18 : 36),
          y: (i) => (i % 2 === 0 ? 30 : -22),
          opacity: 0,
          scale: 0.96,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headline,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, headline);

    return () => ctx.revert();
  }, []);

  // 2. Section 1: Three Free-Floating Data Lines Snap to Grid Alignment (Unstructured -> Structured)
  useEffect(() => {
    const corridor = corridorRef.current;
    const l1 = dataLine1Ref.current;
    const l2 = dataLine2Ref.current;
    const l3 = dataLine3Ref.current;
    if (!corridor || !l1 || !l2 || !l3) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Line 1: Enters from Z-depth
      // Line 2: Enters diagonally from right-bottom
      // Line 3: Enters with rotational misalignment
      gsap.set(l1, { z: -160, opacity: 0, scale: 0.88 });
      gsap.set(l2, { x: 70, y: 35, opacity: 0 });
      gsap.set(l3, { rotateX: 25, rotateZ: -4, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: corridor,
          start: "top 72%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Individual entrance followed by SNAPPING together onto the baseline
      tl.to(l1, { z: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" })
        .to(l2, { x: 0, y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, "-=0.4")
        .to(l3, { rotateX: 0, rotateZ: 0, opacity: 1, duration: 0.8, ease: "back.out(1.2)" }, "-=0.4");
    }, corridor);

    return () => ctx.revert();
  }, []);

  // 3. Clip-Path Curtain Wipe (Used ONCE between evidence corridor and horizontal mapping)
  useEffect(() => {
    const section = curtainSectionRef.current;
    const curtain = curtainOverlayRef.current;
    if (!section || !curtain) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Curtain opens through center using polygon clip-path as user scrolls
      gsap.fromTo(
        curtain,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 30%",
            scrub: 0.8,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // 4. Section 2: Oversized Horizontal Data Plane (Vertical Scroll drives Horizontal Movement)
  useEffect(() => {
    const container = horizontalGalleryRef.current;
    const track = horizontalTrackRef.current;
    if (!container || !track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const scrollWidth = track.scrollWidth - window.innerWidth;
      if (scrollWidth <= 0) return;

      gsap.to(track, {
        x: -scrollWidth - 100,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollWidth + 400}`,
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* 1. HERO SECTION: Strong Editorial Stance + Text Scatter -> Resolve */}
      <section ref={heroRef} className="py-24 sm:py-36 bg-white border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-6">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#666666] block">
            {isIt ? "IL CICLO OPERATIVO DEL SINISTRO" : "THE CLAIM LIFECYCLE"}
          </span>

          <h1
            ref={scatterHeadlineRef}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0E0F10] leading-[1.04] uppercase max-w-5xl"
          >
            {isIt ? (
              <>
                <span className="scatter-word inline-block mr-3">DALLA</span>
                <span className="scatter-word inline-block mr-3">COLLISIONE</span>
                <span className="scatter-word inline-block">ALLA PERIZIA.</span>
                <br />
                <span className="scatter-word inline-block mr-3 text-[#555555]">UN PROCESSO</span>
                <span className="scatter-word inline-block mr-3 text-[#555555]">CONTINUO E</span>
                <span className="scatter-word inline-block text-[#555555]">VERIFICABILE.</span>
              </>
            ) : (
              <>
                <span className="scatter-word inline-block mr-3">FROM</span>
                <span className="scatter-word inline-block mr-3">ROADSIDE</span>
                <span className="scatter-word inline-block">IMPACT.</span>
                <br />
                <span className="scatter-word inline-block mr-3 text-[#555555]">A CONTINUOUS,</span>
                <span className="scatter-word inline-block text-[#555555]">STRUCTURED RECORD.</span>
              </>
            )}
          </h1>

          <p className="text-lg sm:text-2xl text-[#666666] leading-relaxed max-w-3xl font-light">
            {isIt
              ? "Nessuna modulistica confusa, nessun contenzioso prolungato. Un flusso armonico e strutturato progettato per proteggere automobilisti e facilitare i periti."
              : "Zero paperwork confusion, zero protracted dispute delays. A continuous spatial workflow engineered to support drivers and empower claims specialists."}
          </p>
        </div>
      </section>

      {/* 2. EVIDENCE CORRIDOR (SECTION 1): ZERO WHITE CARDS. Three Free-Floating Data Lines Snap into Baseline Grid */}
      <section
        ref={corridorRef}
        className="py-24 sm:py-36 bg-[#F7F7F6] border-b border-[#E5E5E3] overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Authoritative Editorial Statement */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#777777] block">
              {isIt ? "ALLINEAMENTO CONTESTUALE" : "CONTEXTUAL ALIGNMENT"}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#0E0F10] leading-[1.08]">
              {isIt ? (
                <>
                  Sintesi coerente
                  <br />
                  delle evidenze.
                </>
              ) : (
                <>
                  Coherent
                  <br />
                  evidence synthesis.
                </>
              )}
            </h2>
            <p className="text-base sm:text-xl text-[#555555] font-light leading-relaxed max-w-xl">
              {isIt
                ? "Le fotografie identificano le deformazioni della carrozzeria e la targa del veicolo antagonista. I dati di movimento registrati sul dispositivo vengono correlati con la dinamica dell'impatto, eliminando incongruenze tra dichiarazioni e danni visibili."
                : "Visual analysis isolates vehicle deformation zones and verifies counterparty registration. Motion signals recorded on the device correlate with the impact moment, resolving contradictions between driver recollections and physical damage."}
            </p>
          </div>

          {/* Right Column: Three Free-Floating Data Lines (NO background card, NO rounded borders, direct on canvas) */}
          <div className="lg:col-span-6 space-y-8 [transform-style:preserve-3d]">
            {/* Data Line 1: Counterparty Verification (Z-depth entrance) */}
            <div
              ref={dataLine1Ref}
              className="border-b border-[#E0E0DE] pb-6 space-y-1.5 will-change-transform"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold tracking-[0.2em] text-[#0E0F10] uppercase">
                  01 / {isIt ? "IDENTIFICAZIONE CONTROPARTE" : "COUNTERPARTY IDENTIFICATION"}
                </span>
                <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-widest">
                  {isIt ? "ALLINEATO" : "MATCHED"}
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-[#0E0F10] tracking-tight">
                {isIt ? "Targa e modello veicolo coerenti" : "Vehicle registration & model confirmed"}
              </div>
              <p className="text-xs sm:text-sm text-[#777777] font-light">
                {isIt ? "Verifica incrociata archivio sinistri e rilievo fotografico targa." : "Cross-referenced database check with optical plate telemetry."}
              </p>
            </div>

            {/* Data Line 2: Contact Vectors (Diagonal slide) */}
            <div
              ref={dataLine2Ref}
              className="border-b border-[#E0E0DE] pb-6 space-y-1.5 will-change-transform"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold tracking-[0.2em] text-[#0E0F10] uppercase">
                  02 / {isIt ? "VETTORI DI CONTATTO" : "CONTACT VECTORS"}
                </span>
                <span className="text-[11px] font-mono text-[#555555] uppercase tracking-widest">
                  42° IMPACT ANG
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-[#0E0F10] tracking-tight">
                {isIt ? "Area e direzione di impatto concordi" : "Consistent angle & kinetic contact zone"}
              </div>
              <p className="text-xs sm:text-sm text-[#777777] font-light">
                {isIt ? "Correlazione tra deformazione lamierati e vettore d'accelerazione." : "Correlation between physical metal deformation and accelerometer spike."}
              </p>
            </div>

            {/* Data Line 3: Metadata & Timestamps (Rotational snap to grid) */}
            <div
              ref={dataLine3Ref}
              className="border-b border-[#0E0F10] pb-6 space-y-1.5 will-change-transform"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold tracking-[0.2em] text-[#0E0F10] uppercase">
                  03 / {isIt ? "METADATI E TIMESTAMP" : "METADATA & TIMESTAMPS"}
                </span>
                <span className="text-[11px] font-mono text-[#555555] uppercase tracking-widest">
                  45.464° N • 9.190° E
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-[#0E0F10] tracking-tight">
                {isIt ? "Posizione e sequenza cronologica certificate" : "Geographic fix & verified temporal sequence"}
              </div>
              <p className="text-xs sm:text-sm text-[#777777] font-light">
                {isIt ? "Coordinate GNSS con orientamento asse stradale e orario dispositivo." : "GNSS positioning with roadway heading and device local timestamps."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CLIP-PATH CURTAIN TRANSITION: Physical Curtain Partition */}
      <section
        ref={curtainSectionRef}
        className="relative w-full bg-[#0E0F10] text-white py-20 overflow-hidden"
      >
        <div
          ref={curtainOverlayRef}
          className="absolute inset-0 bg-[#F7F7F6] z-10 pointer-events-none"
        />
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto flex flex-col md:flex-row items-baseline justify-between gap-6 relative z-20">
          <div>
            <span className="text-xs uppercase tracking-[0.24em] text-white/50 font-medium block">
              {isIt ? "TRANSIZIONE STRUTTURATA" : "STRUCTURED TRANSITION"}
            </span>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-white mt-1">
              {isIt ? "Dalle osservazioni alla mappatura CAI." : "From raw observations to CAI Box 12 mapping."}
            </div>
          </div>
          <div className="text-xs sm:text-sm text-white/60 font-light max-w-md">
            {isIt
              ? "Ogni frammento empirico si posiziona automaticamente nelle caselle standard previste dalla convenzione europea."
              : "Every empirical fragment automatically aligns with the standard boxes of the European Agreed Statement."}
          </div>
        </div>
      </section>

      {/* 4. OVERSIZED HORIZONTAL TYPOGRAPHIC/DATA PLANE (SECTION 2): Vertical Scroll Drives Horizontal Gallery */}
      <section
        ref={horizontalGalleryRef}
        className="relative w-full h-[100vh] bg-white overflow-hidden border-b border-[#E5E5E3] flex flex-col justify-center"
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto mb-6">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#777777] block">
            {isIt ? "MAPPATURA STANDARD EUROPEA" : "EUROPEAN STANDARD MAPPING"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#0E0F10]">
            {isIt ? "Modulo CAI — Casella 12 Dinamica" : "Agreed Statement — CAI Box 12"}
          </h2>
        </div>

        {/* Horizontal Moving Track */}
        <div className="w-full overflow-hidden">
          <div
            ref={horizontalTrackRef}
            className="flex items-stretch gap-8 sm:gap-12 pl-6 sm:pl-12 lg:pl-20 w-max will-change-transform py-4"
          >
            {/* Plane 1: CAI Box 12 Main Anchor */}
            <div className="w-[340px] sm:w-[420px] shrink-0 border-l-2 border-[#0E0F10] pl-6 space-y-4">
              <span className="text-[11px] font-semibold text-[#888888] uppercase tracking-widest block">
                PLANE 01 / STANDARD CLAUSE
              </span>
              <div className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#0E0F10] leading-none">
                CAI BOX 12
              </div>
              <p className="text-sm text-[#555555] font-light leading-relaxed">
                {isIt
                  ? "Circostanze dell'incidente mappate formalmente secondo le 17 opzioni standard della Constatazione Amichevole europea."
                  : "Accident circumstances formally cataloged against the 17 standardized European Agreed Statement clauses."}
              </p>
            </div>

            {/* Plane 2: Vehicle A Alignment */}
            <div className="w-[340px] sm:w-[420px] shrink-0 border-l border-[#E5E5E3] pl-6 space-y-4">
              <span className="text-[11px] font-semibold text-[#888888] uppercase tracking-widest block">
                PLANE 02 / VEHICLE A
              </span>
              <div className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#0E0F10] leading-tight">
                {isIt ? "Circolava nello stesso senso" : "Circulating in same direction"}
              </div>
              <p className="text-sm text-[#555555] font-light leading-relaxed">
                {isIt
                  ? "Orientamento corsia e marcatura a terra confermano la traiettoria rettilinea senza invasione di corsia opposta."
                  : "Lane markings and vehicle orientation confirm straight-line heading without opposite-lane intrusion."}
              </p>
            </div>

            {/* Plane 3: Contact Vector Alignment */}
            <div className="w-[340px] sm:w-[420px] shrink-0 border-l border-[#E5E5E3] pl-6 space-y-4">
              <span className="text-[11px] font-semibold text-[#888888] uppercase tracking-widest block">
                PLANE 03 / CONTACT POINT
              </span>
              <div className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#0E0F10] leading-tight">
                {isIt ? "Tamponamento posteriore sx" : "Rear-left corner impact"}
              </div>
              <p className="text-sm text-[#555555] font-light leading-relaxed">
                {isIt
                  ? "Il punto di collisione rilevato fotograficamente combacia con il rallentamento progressivo documentato dal sensore."
                  : "Photographically verified contact zone aligns with documented deceleration profile."}
              </p>
            </div>

            {/* Plane 4: Factual Separation */}
            <div className="w-[340px] sm:w-[420px] shrink-0 border-l border-[#E5E5E3] pl-6 space-y-4 pr-12">
              <span className="text-[11px] font-semibold text-[#888888] uppercase tracking-widest block">
                PLANE 04 / RESOLUTION
              </span>
              <div className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#0E0F10] leading-tight">
                {isIt ? "Separazione fatti e narrazioni" : "Facts vs subjective statements"}
              </div>
              <p className="text-sm text-[#555555] font-light leading-relaxed">
                {isIt
                  ? "I parametri oggettivi restano isolati da ricostruzioni soggettive per garantire una base probatoria inattaccabile."
                  : "Empirical sensor data remains completely distinct from subjective recollections for defensible review."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ADJUSTER DELIBERATION: Clean Architectural Canvas (Zero Cards) */}
      <section className="py-24 sm:py-36 bg-[#F7F7F6] border-b border-[#E5E5E3]">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#777777] block">
              {isIt ? "DELIBERA E PERIZIA" : "ADJUSTER DELIBERATION"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#0E0F10] leading-tight">
              {isIt ? "Supervisione peritale abilitata." : "Governed by human adjuster review."}
            </h2>
            <p className="text-base sm:text-xl text-[#555555] font-light leading-relaxed">
              {isIt
                ? "Il liquidatore riceve nella Console Sinistri un fascicolo ordinato, trasparente e immediatamente valutabile. Nessun algoritmo impone decisioni di colpa: la responsabilità civile e la perizia economica restano affidate esclusivamente al giudizio umano."
                : "Claims adjusters receive an organized, transparent dossier inside the Claims Console. No opaque algorithm decrees fault: civil liability and monetary settlement remain exclusively governed by human adjuster judgment."}
            </p>
          </div>

          <div className="lg:col-span-6 space-y-6 pt-2">
            <div className="flex gap-6 items-baseline border-b border-[#E5E5E3] pb-6">
              <span className="text-2xl font-bold font-mono text-[#0E0F10]">01</span>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-tight text-[#0E0F10]">
                  {isIt ? "Fascicolo strutturato per la perizia" : "Structured claim dossier"}
                </h3>
                <p className="text-sm text-[#666666] font-light mt-1">
                  {isIt ? "Evidenze visive, telemetria e posizionamento ordinati cronologicamente." : "Visual proof, telemetry, and spatial headings ordered chronologically."}
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-baseline border-b border-[#E5E5E3] pb-6">
              <span className="text-2xl font-bold font-mono text-[#0E0F10]">02</span>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-tight text-[#0E0F10]">
                  {isIt ? "Tracciabilità e integrità del dato" : "Verifiable audit trail"}
                </h3>
                <p className="text-sm text-[#666666] font-light mt-1">
                  {isIt ? "Cronologia completa con metadati e firme di conformità." : "Unbroken chronological logging with device metadata and validation flags."}
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-baseline border-b border-[#0E0F10] pb-6">
              <span className="text-2xl font-bold font-mono text-[#0E0F10]">03</span>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-tight text-[#0E0F10]">
                  {isIt ? "Decisione finale peritale" : "Final human authority"}
                </h3>
                <p className="text-sm text-[#666666] font-light mt-1">
                  {isIt ? "La quantificazione del danno e la decisione di colpa spettano al perito." : "Settlement quantum and liability allocation remain strictly with certified human professionals."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CLOSING CTA STRIP */}
      <section className="py-20 bg-white">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold uppercase text-[#0E0F10]">
              {isIt ? "Inizia la segnalazione" : "Begin roadside report"}
            </h3>
            <p className="text-sm text-[#666666] mt-1 font-light">
              {isIt ? "Sperimenta il flusso di segnalazione per automobilisti." : "Experience the consumer driver workflow."}
            </p>
          </div>
          <Link
            href="/app/report"
            className="group inline-flex items-center justify-center gap-2 min-h-[52px] px-8 bg-[#0E0F10] text-white text-xs font-bold tracking-wider uppercase hover:bg-black transition-colors"
          >
            <span>{isIt ? "Segnala un sinistro" : "Report an accident"}</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
