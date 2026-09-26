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

  // Evidence Constellation Refs
  const constellationSectionRef = useRef<HTMLElement>(null);
  const photoFragmentRef = useRef<HTMLDivElement>(null);
  const geoFragmentRef = useRef<HTMLDivElement>(null);
  const timeFragmentRef = useRef<HTMLDivElement>(null);
  const vehicleTargetRef = useRef<HTMLDivElement>(null);

  // Sticky Guided Journey Refs
  const stickyJourneyRef = useRef<HTMLElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);

  // 1. Evidence Capture Constellation Animation (photo, geo, timestamp orbit & align)
  useEffect(() => {
    const sec = constellationSectionRef.current;
    const photo = photoFragmentRef.current;
    const geo = geoFragmentRef.current;
    const time = timeFragmentRef.current;
    const vehicle = vehicleTargetRef.current;
    if (!sec || !photo || !geo || !time || !vehicle) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Photo arrives from left foreground, location from deep right, timestamp drops from above
      gsap.set(photo, { x: -140, y: -20, z: 60, scale: 1.12, opacity: 0 });
      gsap.set(geo, { x: 160, y: 30, z: -80, opacity: 0 });
      gsap.set(time, { y: -90, z: -40, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top 75%",
          end: "bottom 30%",
          scrub: 0.8,
        },
      });

      // Orbit subtly around the vehicle scene then align into ordered output rail
      tl.to(photo, { x: -40, y: 0, z: 20, scale: 1, opacity: 1, duration: 0.4 })
        .to(geo, { x: 40, y: 0, z: 0, opacity: 1, duration: 0.4 }, "-=0.3")
        .to(time, { y: 0, z: 0, opacity: 1, duration: 0.4 }, "-=0.3")
        // Convergence into unified ordered line
        .to([photo, geo, time], {
          x: 0,
          y: 0,
          z: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.inOut",
        });
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

      {/* 3. EVIDENCE CAPTURE CONSTELLATION: ZERO CARDS. Free-Floating Fragments Orbiting & Aligning */}
      <section
        ref={constellationSectionRef}
        className="py-24 sm:py-36 bg-[#F7F7F6] border-b border-[#E5E5E3] overflow-hidden"
        style={{ perspective: "1400px" }}
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-[0.24em] text-[#777777] font-semibold block">
              {isIt ? "COSTELLAZIONE PROBATORIA" : "EVIDENCE CONSTELLATION"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#0E0F10] leading-tight">
              {isIt ? "Elementi acquisiti in situ." : "Evidence captured on scene."}
            </h2>
            <p className="text-base sm:text-xl text-[#555555] font-light leading-relaxed">
              {isIt
                ? "Fotografia, coordinate GNSS e marcatura temporale si fondono direttamente nello spazio probatorio, senza maschere o moduli cartacei."
                : "Optics, GNSS fixes, and temporal continuity fuse directly into the evidential space, eliminating disconnected forms."}
            </p>
          </div>

          {/* Central Spatial Constellation Stage (No Background Cards) */}
          <div className="relative w-full min-h-[380px] sm:min-h-[440px] flex items-center justify-center [transform-style:preserve-3d]">
            {/* Ambient Center Anchor: Vehicle Outline Motif */}
            <div
              ref={vehicleTargetRef}
              className="relative w-full max-w-md aspect-[16/10] border border-[#D5D7D6] flex items-center justify-center p-6 text-center select-none"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#888888] block">
                  VEHICLE CONTEXT A
                </span>
                <div className="font-bold text-lg sm:text-xl uppercase text-[#0E0F10] tracking-tight">
                  AUDI A3 SPORTBACK
                </div>
                <div className="text-xs font-mono text-[#666666]">AB 123 CD • IMPACT ANGLE 42°</div>
              </div>

              {/* Viewfinder crosshairs at 4 corners of the vehicle outline */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#0E0F10]" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#0E0F10]" />
              <div className="absolute bottom-2 left-2 w-3 h-2 border-b-2 border-l-2 border-[#0E0F10]" />
              <div className="absolute bottom-2 right-2 w-3 h-2 border-b-2 border-r-2 border-[#0E0F10]" />
            </div>

            {/* Fragment 1: INQUADRATURE ESSENZIALI (Photo Frame Outline arriving from left foreground) */}
            <div
              ref={photoFragmentRef}
              className="absolute left-2 sm:left-12 lg:left-24 top-6 max-w-[260px] border border-[#0E0F10] p-4 bg-white/90 backdrop-blur-sm pointer-events-none select-none will-change-transform space-y-1 shadow-sm"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="text-[10px] font-semibold tracking-widest text-[#0E0F10] uppercase block">
                01 / {isIt ? "INQUADRATURE ESSENZIALI" : "ESSENTIAL FRAMES"}
              </span>
              <div className="text-xs font-semibold text-[#0E0F10]">
                {isIt ? "Panoramica, punto d'urto, controparte" : "Overview, impact zone, counterparty"}
              </div>
              <div className="text-[11px] text-[#777777] font-mono">4 PERSPECTIVES SAVED</div>
            </div>

            {/* Fragment 2: GEOLOCALIZZAZIONE (Location Line arriving from deep right) */}
            <div
              ref={geoFragmentRef}
              className="absolute right-2 sm:right-12 lg:right-24 bottom-8 max-w-[260px] border-b-2 border-[#0E0F10] pb-3 bg-white/90 backdrop-blur-sm pointer-events-none select-none will-change-transform space-y-1 shadow-sm px-3 pt-2"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="text-[10px] font-semibold tracking-widest text-[#0E0F10] uppercase block">
                02 / {isIt ? "GEOLOCALIZZAZIONE" : "GEOLOCATION FIX"}
              </span>
              <div className="text-xs font-semibold text-[#0E0F10]">
                45.4642° N • 9.1900° E
              </div>
              <div className="text-[11px] text-[#777777] font-mono">ROADWAY HEADING 142° SE</div>
            </div>

            {/* Fragment 3: TIMESTAMP (Time/Data Strip dropping from above) */}
            <div
              ref={timeFragmentRef}
              className="absolute top-2 sm:top-4 right-8 sm:right-36 border-t-2 border-[#0E0F10] pt-2 px-3 bg-white/90 backdrop-blur-sm pointer-events-none select-none will-change-transform space-y-0.5 shadow-sm"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="text-[10px] font-semibold tracking-widest text-[#0E0F10] uppercase block">
                03 / TIMESTAMP
              </span>
              <div className="text-xs font-semibold text-[#0E0F10] font-mono">
                2026-09-26 14:22:08 UTC
              </div>
              <div className="text-[10px] text-emerald-800 font-mono">HARDWARE CLOCK SYNC</div>
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
