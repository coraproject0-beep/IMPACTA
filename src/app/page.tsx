"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { HeroMedia } from "@/components/public/HeroMedia";
import { EvidenceClaimStory } from "@/components/public/EvidenceClaimStory";
import { TextReveal } from "@/components/motion/TextReveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  ActivityIcon,
  CameraIcon,
  LayersIcon,
} from "@/components/icons/Icons";

export default function HomePage() {
  const { t } = useLanguage();
  const { isDriverAuthenticated } = useAuth();

  const reportLink = isDriverAuthenticated ? "/app/report" : "/login?redirect=/app/report";

  return (
    <PublicShell>
      {/* 1. CINEMATIC LIGHT-THEME HERO SECTION */}
      <section className="relative bg-white text-slate-950 pt-12 sm:pt-20 pb-20 sm:pb-32 overflow-hidden selection:bg-blue-100 selection:text-blue-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl space-y-6 sm:space-y-8">
            {/* Plain Typographic Kicker (NO pill, NO dot, NO border) */}
            <TextReveal delayMs={0}>
              <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-blue-700">
                {t.hero.kicker}
              </p>
            </TextReveal>

            {/* Massive Display Heading (72–104px desktop) */}
            <TextReveal delayMs={80} as="h1" className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-slate-950 leading-[1.02]">
              <span>{t.hero.titleLine1}</span>{" "}
              <span className="text-slate-600">{t.hero.titleLine2}</span>{" "}
              <span className="text-blue-700 block sm:inline">{t.hero.titleLine3}</span>
            </TextReveal>

            {/* Editorial Body Text (18–20px) */}
            <TextReveal delayMs={160} as="p" className="text-lg sm:text-2xl text-slate-600 font-normal leading-relaxed max-w-3xl">
              {t.hero.subtitle}
            </TextReveal>

            {/* Dual Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href={reportLink}
                className="px-8 py-4 rounded-xl text-base sm:text-lg font-bold tracking-tight bg-slate-950 hover:bg-blue-600 text-white shadow-md transition-all flex items-center justify-center gap-2.5 active:scale-[0.98] min-h-[52px]"
              >
                <span>{t.hero.reportCta}</span>
                <ArrowRightIcon size={20} />
              </Link>

              <Link
                href="/console/login"
                className="px-7 py-4 rounded-xl text-base sm:text-lg font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 transition-all flex items-center justify-center gap-2 border border-slate-200 min-h-[52px]"
              >
                <span>{t.hero.insurerCta}</span>
              </Link>
            </div>

            {/* Telemetry Proof Baseline */}
            <div className="pt-6 border-t border-slate-200 text-xs sm:text-sm font-mono text-slate-500">
              <p>{t.hero.telemetryProof}</p>
            </div>
          </div>

          {/* Cinematic Daylight Automotive Media Viewport */}
          <ImageReveal delayMs={240} className="mt-12 sm:mt-16 w-full rounded-2xl sm:rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
            <HeroMedia
              posterSrc="/images/hero-car.jpg"
              alt="Volkswagen Golf VIII in daylight roadway scenario"
              priority
              className="aspect-[16/9] sm:aspect-[21/9] w-full"
            />
          </ImageReveal>
        </div>
      </section>

      {/* 2. CONCRETE VALUE STATEMENT (NO 3-CARDS) */}
      <section className="py-24 sm:py-32 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-baseline">
            <div className="lg:col-span-5 space-y-4">
              <TextReveal delayMs={50}>
                <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-blue-700">
                  The Friction Problem
                </p>
              </TextReveal>
              <TextReveal delayMs={100} as="h2" className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
                European accident claims take 42 days on average.
              </TextReveal>
            </div>

            <div className="lg:col-span-7 space-y-6 text-lg sm:text-xl text-slate-600 leading-relaxed">
              <TextReveal delayMs={150} as="p">
                When a collision occurs, drivers face immediate trauma followed by an antiquated bureaucratic ritual: handwritten Blue Statements (CAI), conflicting verbal narratives, and months of contentious legal friction between insurance adjusters.
              </TextReveal>
              <TextReveal delayMs={200} as="p">
                IMPACTA changes this paradigm. By pairing an empathetic, safety-first driver mobile intake with calibrated vehicle kinematics and structured photo evidence, every incident is packaged objectively within minutes of occurrence.
              </TextReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE EVIDENCE ➔ CLAIM SCROLL EXPERIENCE */}
      <EvidenceClaimStory />

      {/* 4. DRIVER EXPERIENCE SECTION (EDITORIAL ASYMMETRIC) */}
      <section className="py-24 sm:py-36 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Large Editorial Image with Reveal */}
            <ImageReveal delayMs={100} className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
              <Image
                src="/images/platform-evidence.jpg"
                alt="Driver guided evidence capture on road"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-blue-300 block font-bold">
                  Roadside Clarity
                </span>
                <p className="text-base sm:text-lg font-bold">
                  Guided 4-angle framing guarantees admissibility without stress.
                </p>
              </div>
            </ImageReveal>

            {/* Right: Editorial Narrative & Divided Points */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <TextReveal delayMs={50}>
                  <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-blue-700">
                    {t.publicSections.driverExperienceKicker}
                  </p>
                </TextReveal>
                <TextReveal delayMs={100} as="h2" className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
                  {t.publicSections.driverExperienceTitle}
                </TextReveal>
                <TextReveal delayMs={150} as="p" className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  {t.publicSections.driverExperienceDesc}
                </TextReveal>
              </div>

              {/* Divided Editorial Points (NOT CARDS) */}
              <div className="space-y-6 border-t border-slate-200 pt-6">
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2.5">
                    <ShieldCheckIcon size={20} className="text-blue-700" />
                    <span>{t.publicSections.driverExperiencePoint1Title}</span>
                  </h3>
                  <p className="text-base text-slate-600 pl-7 leading-relaxed">
                    {t.publicSections.driverExperiencePoint1Desc}
                  </p>
                </div>

                <div className="space-y-1.5 pt-5 border-t border-slate-200">
                  <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2.5">
                    <CameraIcon size={20} className="text-blue-700" />
                    <span>{t.publicSections.driverExperiencePoint2Title}</span>
                  </h3>
                  <p className="text-base text-slate-600 pl-7 leading-relaxed">
                    {t.publicSections.driverExperiencePoint2Desc}
                  </p>
                </div>

                <div className="space-y-1.5 pt-5 border-t border-slate-200">
                  <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2.5">
                    <ActivityIcon size={20} className="text-blue-700" />
                    <span>{t.publicSections.driverExperiencePoint3Title}</span>
                  </h3>
                  <p className="text-base text-slate-600 pl-7 leading-relaxed">
                    {t.publicSections.driverExperiencePoint3Desc}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/drivers"
                  className="inline-flex items-center gap-2 text-base font-bold text-blue-700 hover:text-blue-900"
                >
                  <span>Explore the Driver experience in detail</span>
                  <ArrowRightIcon size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INSURER OPERATIONS WORKBENCH (REVERSE ASYMMETRIC) */}
      <section className="py-24 sm:py-36 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Editorial Narrative */}
            <div className="lg:col-span-6 space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <TextReveal delayMs={50}>
                  <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-slate-800">
                    {t.publicSections.insurerOpsKicker}
                  </p>
                </TextReveal>
                <TextReveal delayMs={100} as="h2" className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
                  {t.publicSections.insurerOpsTitle}
                </TextReveal>
                <TextReveal delayMs={150} as="p" className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  {t.publicSections.insurerOpsDesc}
                </TextReveal>
              </div>

              {/* Divided Editorial Points */}
              <div className="space-y-6 border-t border-slate-200 pt-6">
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2.5">
                    <ActivityIcon size={20} className="text-blue-700" />
                    <span>{t.publicSections.insurerOpsPoint1Title}</span>
                  </h3>
                  <p className="text-base text-slate-600 pl-7 leading-relaxed">
                    {t.publicSections.insurerOpsPoint1Desc}
                  </p>
                </div>

                <div className="space-y-1.5 pt-5 border-t border-slate-200">
                  <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2.5">
                    <LayersIcon size={20} className="text-blue-700" />
                    <span>{t.publicSections.insurerOpsPoint2Title}</span>
                  </h3>
                  <p className="text-base text-slate-600 pl-7 leading-relaxed">
                    {t.publicSections.insurerOpsPoint2Desc}
                  </p>
                </div>

                <div className="space-y-1.5 pt-5 border-t border-slate-200">
                  <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2.5">
                    <ShieldCheckIcon size={20} className="text-blue-700" />
                    <span>{t.publicSections.insurerOpsPoint3Title}</span>
                  </h3>
                  <p className="text-base text-slate-600 pl-7 leading-relaxed">
                    {t.publicSections.insurerOpsPoint3Desc}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/insurers"
                  className="inline-flex items-center gap-2 text-base font-bold text-slate-950 hover:text-blue-700"
                >
                  <span>Discover claims operations architecture</span>
                  <ArrowRightIcon size={18} />
                </Link>
              </div>
            </div>

            {/* Right: Large Editorial Image with Reveal */}
            <ImageReveal delayMs={100} className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm order-1 lg:order-2">
              <Image
                src="/images/safety-road.jpg"
                alt="European road and junction context"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 block font-bold">
                  Epistemic Demarcation
                </span>
                <p className="text-base sm:text-lg font-bold">
                  Physical facts are mathematically calibrated. Liability remains human.
                </p>
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* 6. ETHICAL SAFETY IN STRICT LIGHT MODE */}
      <section className="py-24 sm:py-32 bg-white border-b border-slate-200 text-slate-950 selection:bg-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <TextReveal delayMs={50}>
            <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-blue-700">
              {t.publicSections.safetyKicker}
            </p>
          </TextReveal>
          <TextReveal delayMs={100} as="h2" className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
            {t.publicSections.safetyTitle}
          </TextReveal>
          <TextReveal delayMs={150} as="p" className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto">
            {t.publicSections.safetyDesc}
          </TextReveal>
          <div className="pt-4 flex items-center justify-center gap-6">
            <Link
              href="/safety"
              className="text-base font-bold text-blue-700 hover:text-blue-900 underline underline-offset-4"
            >
              Read the Safety &amp; Ethics Charter →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FINAL INVITATION CTA */}
      <section className="py-24 sm:py-36 bg-slate-50 text-slate-950 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <TextReveal delayMs={50} as="h2" className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 leading-tight">
            {t.publicSections.finalCtaTitle}
          </TextReveal>
          <TextReveal delayMs={100} as="p" className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.publicSections.finalCtaDesc}
          </TextReveal>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={reportLink}
              className="w-full sm:w-auto px-9 py-4 rounded-xl text-base sm:text-lg font-bold bg-slate-950 hover:bg-blue-600 text-white shadow-md transition-all flex items-center justify-center gap-2.5 active:scale-[0.98] min-h-[52px]"
            >
              <span>{t.publicSections.finalCtaReportButton}</span>
              <ArrowRightIcon size={20} />
            </Link>

            <Link
              href="/console/login"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base sm:text-lg font-semibold bg-white hover:bg-slate-100 text-slate-800 transition-colors flex items-center justify-center border border-slate-200 min-h-[52px]"
            >
              <span>{t.publicSections.finalCtaInsurerButton}</span>
            </Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
