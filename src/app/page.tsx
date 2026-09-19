"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { HeroMedia } from "@/components/public/HeroMedia";
import { EvidenceClaimStory } from "@/components/public/EvidenceClaimStory";
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
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[90vh] lg:min-h-[95vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden selection:bg-blue-600 selection:text-white">
        {/* Full-Bleed Video/Photo Media with Ken Burns Motion */}
        <HeroMedia
          posterSrc="/images/hero-car.jpg"
          alt="European vehicle on scenic highway"
          priority
          className="absolute inset-0 h-full"
        />

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 w-full">
          <div className="max-w-4xl space-y-6 sm:space-y-8">
            {/* Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 text-xs font-mono uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>{t.hero.kicker}</span>
            </div>

            {/* Massive Display Heading (72–104px desktop) */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05]">
              <span className="block">{t.hero.titleLine1}</span>
              <span className="block text-slate-200">{t.hero.titleLine2}</span>
              <span className="block text-blue-400">{t.hero.titleLine3}</span>
            </h1>

            {/* Editorial Body Text (18–20px) */}
            <p className="text-base sm:text-xl lg:text-2xl text-slate-200 font-normal leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>

            {/* Dual Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href={reportLink}
                className="px-7 py-4 rounded-xl text-sm sm:text-base font-bold tracking-tight bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>{t.hero.reportCta}</span>
                <ArrowRightIcon size={18} />
              </Link>

              <Link
                href="/console/login"
                className="px-6 py-4 rounded-xl text-sm sm:text-base font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <span>{t.hero.insurerCta}</span>
              </Link>
            </div>

            {/* Telemetry Proof Baseline */}
            <div className="pt-6 border-t border-white/15 text-xs font-mono text-slate-400">
              <p>{t.hero.telemetryProof}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONCRETE VALUE STATEMENT (NO 3-CARDS) */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-baseline">
            <div className="lg:col-span-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                The Friction Problem
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 mt-4 leading-tight">
                European accident claims take 42 days on average.
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-6 text-base sm:text-lg text-slate-600 leading-relaxed">
              <p>
                When a collision occurs, drivers face immediate trauma followed by an antiquated bureaucratic ritual: handwritten Blue Statements (CAI), conflicting verbal narratives, and months of contentious legal friction between insurance adjusters.
              </p>
              <p>
                IMPACTA changes this paradigm. By pairing an empathetic, safety-first driver mobile intake with calibrated 10–20Hz vehicle kinematics, every incident is reconstructed objectively within minutes of occurrence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE EVIDENCE ➔ CLAIM SCROLL EXPERIENCE */}
      <EvidenceClaimStory />

      {/* 4. DRIVER EXPERIENCE SECTION (EDITORIAL ASYMMETRIC) */}
      <section className="py-24 sm:py-32 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Large Editorial Image */}
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-md">
              <Image
                src="/images/platform-evidence.jpg"
                alt="Driver guided evidence capture on road"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 block font-bold">
                  Roadside Clarity
                </span>
                <p className="text-base font-bold">
                  Guided 4-angle framing guarantees admissibility without stress.
                </p>
              </div>
            </div>

            {/* Right: Editorial Narrative & Divided Points */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-100/60 px-2.5 py-1 rounded border border-blue-200">
                  {t.publicSections.driverExperienceKicker}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
                  {t.publicSections.driverExperienceTitle}
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  {t.publicSections.driverExperienceDesc}
                </p>
              </div>

              {/* Divided Editorial Points (NOT CARDS) */}
              <div className="space-y-6 border-t border-slate-200 pt-6">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
                    <ShieldCheckIcon size={18} className="text-blue-600" />
                    <span>{t.publicSections.driverExperiencePoint1Title}</span>
                  </h3>
                  <p className="text-sm text-slate-600 pl-6 leading-relaxed">
                    {t.publicSections.driverExperiencePoint1Desc}
                  </p>
                </div>

                <div className="space-y-1 pt-4 border-t border-slate-200/80">
                  <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
                    <CameraIcon size={18} className="text-blue-600" />
                    <span>{t.publicSections.driverExperiencePoint2Title}</span>
                  </h3>
                  <p className="text-sm text-slate-600 pl-6 leading-relaxed">
                    {t.publicSections.driverExperiencePoint2Desc}
                  </p>
                </div>

                <div className="space-y-1 pt-4 border-t border-slate-200/80">
                  <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
                    <ActivityIcon size={18} className="text-blue-600" />
                    <span>{t.publicSections.driverExperiencePoint3Title}</span>
                  </h3>
                  <p className="text-sm text-slate-600 pl-6 leading-relaxed">
                    {t.publicSections.driverExperiencePoint3Desc}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/drivers"
                  className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800"
                >
                  <span>Explore the Driver experience in detail</span>
                  <ArrowRightIcon size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INSURER OPERATIONS WORKBENCH (REVERSE ASYMMETRIC) */}
      <section className="py-24 sm:py-32 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Editorial Narrative */}
            <div className="lg:col-span-6 space-y-8 order-2 lg:order-1">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                  {t.publicSections.insurerOpsKicker}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
                  {t.publicSections.insurerOpsTitle}
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  {t.publicSections.insurerOpsDesc}
                </p>
              </div>

              {/* Divided Editorial Points */}
              <div className="space-y-6 border-t border-slate-200 pt-6">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
                    <ActivityIcon size={18} className="text-blue-600" />
                    <span>{t.publicSections.insurerOpsPoint1Title}</span>
                  </h3>
                  <p className="text-sm text-slate-600 pl-6 leading-relaxed">
                    {t.publicSections.insurerOpsPoint1Desc}
                  </p>
                </div>

                <div className="space-y-1 pt-4 border-t border-slate-200/80">
                  <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
                    <LayersIcon size={18} className="text-blue-600" />
                    <span>{t.publicSections.insurerOpsPoint2Title}</span>
                  </h3>
                  <p className="text-sm text-slate-600 pl-6 leading-relaxed">
                    {t.publicSections.insurerOpsPoint2Desc}
                  </p>
                </div>

                <div className="space-y-1 pt-4 border-t border-slate-200/80">
                  <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
                    <ShieldCheckIcon size={18} className="text-blue-600" />
                    <span>{t.publicSections.insurerOpsPoint3Title}</span>
                  </h3>
                  <p className="text-sm text-slate-600 pl-6 leading-relaxed">
                    {t.publicSections.insurerOpsPoint3Desc}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/insurers"
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-blue-700"
                >
                  <span>Discover claims operations architecture</span>
                  <ArrowRightIcon size={16} />
                </Link>
              </div>
            </div>

            {/* Right: Large Editorial Image */}
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-md order-1 lg:order-2">
              <Image
                src="/images/safety-road.jpg"
                alt="European road and junction context"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                  Epistemic Demarcation
                </span>
                <p className="text-base font-bold">
                  Physical facts are mathematically calibrated. Liability remains human.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ETHICAL SAFETY & HUMAN ADJUSTER SIGN-OFF */}
      <section className="py-20 sm:py-28 bg-slate-950 text-white selection:bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-6">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 bg-blue-950 px-3 py-1 rounded border border-blue-800">
            {t.publicSections.safetyKicker}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {t.publicSections.safetyTitle}
          </h2>
          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
            {t.publicSections.safetyDesc}
          </p>
          <div className="pt-4 flex items-center justify-center gap-6">
            <Link
              href="/safety"
              className="text-sm font-bold text-blue-400 hover:text-blue-300 underline underline-offset-4"
            >
              Read the Safety &amp; Ethics Charter →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FINAL INVITATION CTA */}
      <section className="py-24 sm:py-32 bg-white text-slate-950 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-tight">
            {t.publicSections.finalCtaTitle}
          </h2>
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.publicSections.finalCtaDesc}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={reportLink}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm sm:text-base font-bold bg-slate-950 hover:bg-blue-600 text-white shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <span>{t.publicSections.finalCtaReportButton}</span>
              <ArrowRightIcon size={18} />
            </Link>

            <Link
              href="/console/login"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm sm:text-base font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center justify-center"
            >
              <span>{t.publicSections.finalCtaInsurerButton}</span>
            </Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
