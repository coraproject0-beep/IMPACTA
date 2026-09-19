"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import {
  CarIcon,
  CameraIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  AlertTriangleIcon,
  ActivityIcon,
} from "@/components/icons/Icons";

export default function DriversPage() {
  const { t } = useLanguage();
  const { isDriverAuthenticated } = useAuth();
  const reportLink = isDriverAuthenticated ? "/app/report" : "/login?redirect=/app/report";

  return (
    <PublicShell>
      {/* 1. Hero Section */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
                Driver PWA Experience
              </span>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 leading-tight">
                Calm guidance at the roadside when you need it most.
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl">
                Accidents are disorienting and stressful. IMPACTA Driver replaces intimidating paper CAI forms and bureaucratic portals with an intuitive assistant that prioritizes your physical safety, guides clear photo capture, and files your claim locally.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href={reportLink}
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all active:scale-[0.98]"
                >
                  <span>{t.nav.reportAccident}</span>
                  <ArrowRightIcon size={16} />
                </Link>
                <Link
                  href="/app"
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                >
                  <span>Open Driver Personal Area</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-md">
                <Image
                  src="/images/hero-car.jpg"
                  alt="Insured European hatchback vehicle"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 550px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold block mb-1">
                    Insured Driver Context
                  </span>
                  <span className="text-lg font-bold">Matteo Bianchi • Volkswagen Golf VIII</span>
                  <span className="text-xs text-slate-300 font-mono">Plate GF492XP • Aura Mutua Assicurazioni</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Editorial Narrative Points (Banned 3-card layout) */}
      <section className="py-24 sm:py-32 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 bg-slate-200 px-2.5 py-1 rounded">
              Human-First Design
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
              Engineered specifically for post-collision stress.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Traditional insurance apps overwhelm policyholders with 40 complex questions all at once. IMPACTA Driver breaks down the roadside task into four calm, progressive phases.
            </p>
          </div>

          <div className="space-y-12">
            {/* Stage 1 */}
            <div className="grid lg:grid-cols-12 gap-8 items-start pt-8 border-t border-slate-200">
              <div className="lg:col-span-4">
                <span className="text-3xl font-black font-mono text-blue-600 block mb-1">01</span>
                <h3 className="text-2xl font-bold text-slate-950">Safety &amp; Emergency First</h3>
              </div>
              <div className="lg:col-span-8 text-base text-slate-600 leading-relaxed space-y-3">
                <p>
                  Before collecting any damage photos or vehicle details, the app confirms you and your passengers are safe, verifies reflective vest and hazard visibility, and provides a 1-tap dialer for the Single European Emergency Number 112.
                </p>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="grid lg:grid-cols-12 gap-8 items-start pt-8 border-t border-slate-200">
              <div className="lg:col-span-4">
                <span className="text-3xl font-black font-mono text-blue-600 block mb-1">02</span>
                <h3 className="text-2xl font-bold text-slate-950">Visual 4-Angle Photo Guide</h3>
              </div>
              <div className="lg:col-span-8 text-base text-slate-600 leading-relaxed space-y-3">
                <p>
                  Clear framing guidelines show you exactly where to stand: wide scene overview, contact damage on your vehicle, other driver&apos;s plate, and road signage. Native camera integration uses your phone&apos;s high-res optics with zero compression artifacts.
                </p>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="grid lg:grid-cols-12 gap-8 items-start pt-8 border-t border-slate-200">
              <div className="lg:col-span-4">
                <span className="text-3xl font-black font-mono text-blue-600 block mb-1">03</span>
                <h3 className="text-2xl font-bold text-slate-950">Plain-Language Review</h3>
              </div>
              <div className="lg:col-span-8 text-base text-slate-600 leading-relaxed space-y-3">
                <p>
                  No legal jargon or technical kinematic vectors. You see a clear, neutral summary of what happened (&ldquo;You were traveling inside the roundabout. The other vehicle entered from your right&rdquo;) before signing your truthfulness declaration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Full-Width Offline-First Assurance */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded border border-emerald-200">
            Resilient Edge Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
            Never worry about cellular dead zones.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            All incident details and high-resolution camera photos are preserved locally in your browser&apos;s IndexedDB and localStorage. Even with zero reception on a rural highway, your inputs and draft remain completely safe.
          </p>
          <div className="pt-4">
            <Link
              href={reportLink}
              className="min-h-[48px] inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-slate-950 hover:bg-blue-600 text-white shadow-sm transition-all"
            >
              <span>{t.nav.reportAccident}</span>
              <ArrowRightIcon size={16} />
            </Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
