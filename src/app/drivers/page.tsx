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

  // Evidence Orbit Refs
  const orbitSectionRef = useRef<HTMLElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const photoSignalRef = useRef<HTMLDivElement>(null);
  const geoSignalRef = useRef<HTMLDivElement>(null);
  const timeSignalRef = useRef<HTMLDivElement>(null);
  const vehicleSilhouetteRef = useRef<HTMLDivElement>(null);

  // Sticky Guided Journey Refs
  const stickyJourneyRef = useRef<HTMLElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);

  // 1. Scene 1: Evidence Orbit Animation (Vehicle advances from Z, signals orbit and lock into structured record)
  useEffect(() => {
    const sec = orbitSectionRef.current;
    const l1 = headlineLine1Ref.current;
    const l2 = headlineLine2Ref.current;
    const photo = photoSignalRef.current;
    const geo = geoSignalRef.current;
    const time = timeSignalRef.current;
    const vehicle = vehicleSilhouetteRef.current;
    if (!sec || !photo || !geo || !time || !vehicle || !l1 || !l2) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(vehicle, { z: -140, opacity: 0.25, scale: 0.92 });
      gsap.set(photo, { x: -200, y: 30, z: 120, rotateY: 18, opacity: 0 });
      gsap.set(geo, { x: 200, y: -20, z: -140, rotateY: -22, opacity: 0 });
      gsap.set(time, { x: 60, y: -100, z: -80, opacity: 0 });
      gsap.set(l1, { x: -36, z: 50, opacity: 0 });
      gsap.set(l2, { x: 36, z: -30, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top 72%",
          end: "bottom 25%",
          scrub: 0.8,
        },
      });

      const isMobile = window.innerWidth < 640;

      // Headline enters with depth separation: line 1 closer/stronger, line 2 comes forward
      tl.to(l1, { x: 0, z: 0, opacity: 1, duration: 0.35, ease: "power2.out" }, 0)
        .to(l2, { x: 0, z: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, 0.08)
        // Vehicle comes forward from Z-depth
        .to(vehicle, { z: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" }, 0.1)
        // Three signals orbit in from disparate trajectories (responsive offsets to prevent mobile clipping)
        .to(photo, { x: isMobile ? -10 : -50, y: -10, z: 30, rotateY: isMobile ? 3 : 6, opacity: 1, duration: 0.45, ease: "power2.out" }, 0.2)
        .to(geo, { x: isMobile ? 10 : 50, y: 12, z: -20, rotateY: isMobile ? -4 : -8, opacity: 1, duration: 0.45, ease: "power2.out" }, 0.25)
        .to(time, { x: isMobile ? 8 : 30, y: -20, z: 0, opacity: 1, duration: 0.45, ease: "power2.out" }, 0.3)
        // Lock into balanced alignment around the vehicle contour
        .to([photo, geo, time], {
          x: 0,
          y: 0,
          z: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power3.out",
        }, 0.7);
    }, sec);

    return () => ctx.revert();
  }, []);

  // 2. Sticky Guided Journey Progression (One step dominant at a time)
  useEffect(() => {
    const container = stickyJourneyRef.current;
    const s1 = step1Ref.current;
    const s2 = step2Ref.current;
    const s3 = step3Ref.current;
    const s4 = step4Ref.current;
    if (!container || !s1 || !s2 || !s3 || !s4) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Initially step 1 is dominant; steps 2,3,4 are completely hidden with zero opacity and pointer-events disabled
      gsap.set([s2, s3, s4], { opacity: 0, y: 24, scale: 0.98, pointerEvents: "none" });
      gsap.set(s1, { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=240%",
          pin: true,
          scrub: 0.7,
        },
      });

      // 01 -> 02 transition
      tl.to(s1, { opacity: 0, y: -20, scale: 0.96, pointerEvents: "none", duration: 0.25 })
        .to(s2, { opacity: 1, y: 0, scale: 1, pointerEvents: "auto", duration: 0.25 }, "-=0.08")

        // 02 -> 03 transition
        .to(s2, { opacity: 0, y: -20, scale: 0.96, pointerEvents: "none", duration: 0.25 }, "+=0.2")
        .to(s3, { opacity: 1, y: 0, scale: 1, pointerEvents: "auto", duration: 0.25 }, "-=0.08")

        // 03 -> 04 transition
        .to(s3, { opacity: 0, y: -20, scale: 0.96, pointerEvents: "none", duration: 0.25 }, "+=0.2")
        .to(s4, { opacity: 1, y: 0, scale: 1, pointerEvents: "auto", duration: 0.25 }, "-=0.08");
    }, container);

    return () => ctx.revert();
  }, []);

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
              mode="word"
              variant="rotate-plane"
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

      {/* 3. SCENE 1: EVIDENCE ORBIT — ZERO CARDS, SPATIAL SIGNALS LOCKING AROUND VEHICLE OBJECT */}
      <section
        ref={orbitSectionRef}
        className="py-24 sm:py-36 bg-[#F7F7F6] border-b border-[#E5E5E3] overflow-hidden"
        style={{ perspective: "1400px" }}
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-[0.24em] text-[#777777] font-semibold block">
              {isIt ? "RILIEVO PROBATORIO" : "INCIDENT CAPTURE"}
            </span>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#0E0F10] leading-[0.98] [transform-style:preserve-3d]">
              <span ref={headlineLine1Ref} className="block will-change-transform">
                {isIt ? "CATTURA LA SCENA." : "CAPTURE THE SCENE."}
              </span>
              <span ref={headlineLine2Ref} className="block text-[#666666] will-change-transform">
                {isIt ? "CONSERVA IL CONTESTO." : "KEEP THE CONTEXT."}
              </span>
            </h2>
            <p className="text-base sm:text-xl text-[#555555] font-light leading-relaxed">
              {isIt
                ? "Foto, posizione e orario confluiscono in un unico record strutturato dell'incidente."
                : "Photos, location and time become one structured incident record."}
            </p>
          </div>

          {/* Central Spatial Stage: Vehicle Silhouette with Free-Floating 3D Signals (No Cards, No Box Frame) */}
          <div className="relative w-full min-h-[440px] sm:min-h-[520px] flex items-center justify-center [transform-style:preserve-3d]">
            {/* Center Vehicle Object: Stylized Automotive Vector Contour with Impact Zone */}
            <div
              ref={vehicleSilhouetteRef}
              className="relative w-full max-w-xl aspect-[16/9] flex items-center justify-center will-change-transform select-none [transform-style:preserve-3d]"
            >
              <svg
                viewBox="0 0 520 260"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-sm"
              >
                {/* Road vector track lines */}
                <line x1="20" y1="130" x2="500" y2="130" stroke="#E0E0DE" strokeWidth="1" strokeDasharray="6 6" />
                <line x1="40" y1="40" x2="480" y2="40" stroke="#EBEBEA" strokeWidth="1" />
                <line x1="40" y1="220" x2="480" y2="220" stroke="#EBEBEA" strokeWidth="1" />

                {/* Automotive Overhead Silhouette Contour */}
                <path
                  d="M100 85 C140 65, 380 65, 420 85 C450 100, 460 130, 460 130 C460 130, 450 160, 420 175 C380 195, 140 195, 100 175 C70 160, 60 130, 60 130 C60 130, 70 100, 100 85 Z"
                  stroke="#0E0F10"
                  strokeWidth="2.5"
                  fill="#FFFFFF"
                  fillOpacity="0.85"
                />

                {/* Windshield & Rear Window Geometry */}
                <path
                  d="M150 90 L180 100 L180 160 L150 170 Z"
                  stroke="#0E0F10"
                  strokeWidth="1.5"
                  strokeOpacity="0.7"
                />
                <path
                  d="M340 98 L370 92 L370 168 L340 162 Z"
                  stroke="#0E0F10"
                  strokeWidth="1.5"
                  strokeOpacity="0.7"
                />

                {/* Roof Ridge Lines */}
                <line x1="180" y1="100" x2="340" y2="98" stroke="#0E0F10" strokeWidth="1" strokeOpacity="0.4" />
                <line x1="180" y1="160" x2="340" y2="162" stroke="#0E0F10" strokeWidth="1" strokeOpacity="0.4" />

                {/* Wheels Left/Right */}
                <rect x="110" y="55" width="46" height="14" rx="3" fill="#0E0F10" />
                <rect x="360" y="55" width="46" height="14" rx="3" fill="#0E0F10" />
                <rect x="110" y="191" width="46" height="14" rx="3" fill="#0E0F10" />
                <rect x="360" y="191" width="46" height="14" rx="3" fill="#0E0F10" />

                {/* Impact Indicator Zone (Front Left) */}
                <circle cx="102" cy="85" r="14" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="102" cy="85" r="5" fill="#DC2626" />
                <line x1="102" y1="60" x2="102" y2="80" stroke="#DC2626" strokeWidth="1.5" />
                <text x="70" y="48" fill="#DC2626" fontSize="10" fontWeight="700" letterSpacing="0.1em">
                  {isIt ? "PUNTO D'URTO" : "IMPACT POINT"}
                </text>
              </svg>
            </div>

            {/* Spatial Signal 1: PHOTOS (Left Foreground, Viewfinder Marks, Direct Typography) */}
            <div
              ref={photoSignalRef}
              className="absolute left-2 sm:left-6 lg:left-12 top-2 sm:top-10 max-w-[230px] sm:max-w-[280px] pointer-events-none select-none will-change-transform space-y-1.5 [transform-style:preserve-3d]"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#0E0F10]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0E0F10]">
                  {isIt ? "FOTOGRAFIE" : "PHOTOS"}
                </span>
              </div>
              <div className="text-sm font-semibold text-[#0E0F10] uppercase tracking-tight">
                {isIt ? "4 inquadrature coerenti" : "4 essential viewpoints"}
              </div>
              <p className="text-xs text-[#666666] font-light leading-relaxed">
                {isIt ? "Panoramica, punto d'urto e controparte senza maschere cartacee." : "Overview, contact zone, and vehicle alignment without paper forms."}
              </p>
            </div>

            {/* Spatial Signal 2: LOCATION (Deep Right Orbit, Spatial Coordinates, No Card) */}
            <div
              ref={geoSignalRef}
              className="absolute right-2 sm:right-6 lg:right-12 bottom-2 sm:bottom-10 max-w-[230px] sm:max-w-[280px] pointer-events-none select-none will-change-transform space-y-1.5 [transform-style:preserve-3d]"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#0E0F10]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0E0F10]">
                  {isIt ? "POSIZIONE" : "LOCATION"}
                </span>
              </div>
              <div className="text-sm font-mono font-bold text-[#0E0F10]">
                45.4642° N • 9.1900° E
              </div>
              <p className="text-xs text-[#666666] font-light leading-relaxed">
                {isIt ? "Via Cristoforo Colombo, Milano • Orientamento carreggiata 142° SE." : "Via Cristoforo Colombo, Milan • Roadway heading 142° SE."}
              </p>
            </div>

            {/* Spatial Signal 3: TIME (Upper-Right Depth, Clean Timestamp, No Box) */}
            <div
              ref={timeSignalRef}
              className="absolute top-2 sm:top-6 right-2 sm:right-32 max-w-[190px] sm:max-w-[220px] pointer-events-none select-none will-change-transform space-y-1 [transform-style:preserve-3d]"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0E0F10]">
                  {isIt ? "ORARIO" : "TIME"}
                </span>
              </div>
              <div className="text-sm font-mono font-bold text-[#0E0F10]">
                14:22:08 UTC
              </div>
              <span className="text-[11px] text-[#777777] block font-light">
                {isIt ? "Marcatura temporale acquisizione" : "Capture sequence record"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STICKY KINETIC SEQUENCE: Only ONE Step Dominant at a Time */}
      <section
        ref={stickyJourneyRef}
        className="relative w-full h-[100vh] bg-white border-b border-[#E5E5E3] flex items-center overflow-hidden"
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Persistent Sticky Heading */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-[0.24em] text-[#777777] font-semibold block">
              {isIt ? "IL PERCORSO GUIDATO" : "GUIDED JOURNEY"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#0E0F10] leading-tight">
              {isIt ? (
                <>
                  Semplice, umano
                  <br />
                  e rassicurante.
                </>
              ) : (
                <>
                  Simple, calm,
                  <br />
                  and reassuring.
                </>
              )}
            </h2>
            <p className="text-base text-[#666666] font-light leading-relaxed">
              {isIt
                ? "Ogni fase viene affrontata singolarmente, senza affollamento visivo o ansia da compilazione."
                : "Each phase is addressed singularly, with zero visual crowding or cognitive strain."}
            </p>
          </div>

          {/* Right Column: Dynamic Stage Sequence (Only 1 dominant, distinct visual cues) */}
          <div className="lg:col-span-7 relative min-h-[300px]">
            {/* Step 01: Physical Safety / 112 with EmergencyRadar pulse */}
            <div
              ref={step1Ref}
              className="space-y-4 will-change-transform"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl sm:text-4xl font-mono font-bold text-[#0E0F10]">01</span>
                <EmergencyRadar size={28} showSweep={true} />
                <span className="text-xs uppercase font-semibold tracking-widest text-rose-600">
                  {isIt ? "PRIORITÀ SOCCORSO" : "EMERGENCY SAFETY"}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#0E0F10]">
                {isIt ? "Sicurezza e Chiamata 112" : "Physical Safety & 112 Access"}
              </h3>
              <p className="text-base sm:text-lg text-[#555555] font-light max-w-xl leading-relaxed">
                {isIt
                  ? "Verifica immediata dell'incolumità delle persone, chiamata d'emergenza con un tocco e indicazioni per la collocazione del triangolo."
                  : "Instant physical safety assessment, single-tap emergency connection, and safe roadway refuging before any documentation."}
              </p>
            </div>

            {/* Step 02: Four Photos with Viewfinder Assembly Cue */}
            <div
              ref={step2Ref}
              className="space-y-4 will-change-transform absolute top-0 inset-x-0"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl sm:text-4xl font-mono font-bold text-[#0E0F10]">02</span>
                <div className="w-7 h-7 border border-[#0E0F10] relative flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#0E0F10]" />
                </div>
                <span className="text-xs uppercase font-semibold tracking-widest text-[#777777]">
                  {isIt ? "ACQUISIZIONE FOTOGRAFICA" : "OPTICAL GUIDANCE"}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#0E0F10]">
                {isIt ? "Quattro Inquadrature Guidate" : "Four Guided Perspectives"}
              </h3>
              <p className="text-base sm:text-lg text-[#555555] font-light max-w-xl leading-relaxed">
                {isIt
                  ? "I mirini visivi a schermo guidano l'orientamento dello smartphone: panoramica, punto d'urto, controparte e contesto stradale."
                  : "On-screen framing brackets orient your camera cleanly: wide context, impact zone, registration plate, and road orientation."}
              </p>
            </div>

            {/* Step 03: Counterparty Info with Aligned Row Cue */}
            <div
              ref={step3Ref}
              className="space-y-4 will-change-transform absolute top-0 inset-x-0"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl sm:text-4xl font-mono font-bold text-[#0E0F10]">03</span>
                <div className="h-[2px] w-8 bg-[#0E0F10]" />
                <span className="text-xs uppercase font-semibold tracking-widest text-[#777777]">
                  {isIt ? "DATI CONTROPARTE" : "COUNTERPARTY"}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#0E0F10]">
                {isIt ? "Dati Controparte Semplificati" : "Streamlined Counterparty Info"}
              </h3>
              <p className="text-base sm:text-lg text-[#555555] font-light max-w-xl leading-relaxed">
                {isIt
                  ? "Inserimento o scansione rapida di targa, assicurazione e conducente senza dover compilare formulari cartacei indecifrabili."
                  : "Quick plate, insurance, and contact capture without deciphering weathered paper forms on the roadside."}
              </p>
            </div>

            {/* Step 04: Review Compression into Single Document */}
            <div
              ref={step4Ref}
              className="space-y-4 will-change-transform absolute top-0 inset-x-0"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl sm:text-4xl font-mono font-bold text-[#0E0F10]">04</span>
                <div className="w-5 h-6 border-2 border-[#0E0F10] border-t-4" />
                <span className="text-xs uppercase font-semibold tracking-widest text-emerald-800">
                  {isIt ? "FASCICOLO PRONTO" : "DOSSIER GENERATED"}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#0E0F10]">
                {isIt ? "Conferma e Fascicolo Pronto" : "Immediate Dossier Generation"}
              </h3>
              <p className="text-base sm:text-lg text-[#555555] font-light max-w-xl leading-relaxed">
                {isIt
                  ? "Tutti gli elementi vengono ordinati in un unico riepilogo verificabile, pronto per l'inoltro alla compagnia e per la perizia."
                  : "All recorded evidence compresses into one unified chronological file ready for adjuster review."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HUMAN SAFETY PROTOCOL: 112 CTA WITH EMERGENCY RADAR DIRECTLY NEXT TO TEXT */}
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
