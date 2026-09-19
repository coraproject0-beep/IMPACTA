"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { useLanguage } from "@/context/LanguageContext";
import {
  ShieldCheckIcon,
  ActivityIcon,
  LayersIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  FileTextIcon,
} from "@/components/icons/Icons";

export default function InsurersPage() {
  const { t } = useLanguage();

  return (
    <PublicShell>
      {/* 1. Hero Section */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
                Claims Operations &amp; SIU
              </span>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 leading-tight">
                Triage collision claims in minutes with verified kinematics.
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl">
                Replace disputed paper CAI forms and contradictory statements with high-frequency connected vehicle telemetry, objective road geometry, and standard European accident circumstances.
              </p>
              <div className="pt-2">
                <Link
                  href="/console/login"
                  className="min-h-[48px] inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-slate-950 hover:bg-blue-600 text-white shadow-xs transition-all active:scale-[0.98]"
                >
                  <span>Launch Claims Operations Console</span>
                  <ArrowRightIcon size={16} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-md">
                <Image
                  src="/images/safety-road.jpg"
                  alt="Connected vehicle telemetry and road analysis"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 550px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                    Verified Calibration
                  </span>
                  <span className="text-lg font-bold">Aura Mutua Assicurazioni • Florence</span>
                  <span className="text-xs text-slate-300 font-mono">10–20Hz Deceleration Fused • Zero Automated Fault</span>
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
              Evidentiary Rigor
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
              Enterprise tools built to empower human adjusters.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Every feature is built around the fundamental requirement that AI must assist human adjusters with verified physical records, never replace their legal decision authority.
            </p>
          </div>

          <div className="space-y-12">
            {/* Capability 1 */}
            <div className="grid lg:grid-cols-12 gap-8 items-start pt-8 border-t border-slate-200">
              <div className="lg:col-span-4">
                <span className="text-3xl font-black font-mono text-blue-600 block mb-1">01</span>
                <h3 className="text-2xl font-bold text-slate-950">Epistemic Demarcation</h3>
              </div>
              <div className="lg:col-span-8 text-base text-slate-600 leading-relaxed space-y-3">
                <p>
                  Direct physical observations (contact dents, tire marks, debris fields) are strictly demarcated from probabilistic kinematic models and subjective driver narratives. The console never blurs what is physically verified with what is inferred.
                </p>
              </div>
            </div>

            {/* Capability 2 */}
            <div className="grid lg:grid-cols-12 gap-8 items-start pt-8 border-t border-slate-200">
              <div className="lg:col-span-4">
                <span className="text-3xl font-black font-mono text-blue-600 block mb-1">02</span>
                <h3 className="text-2xl font-bold text-slate-950">10–20Hz Telemetry Fusion</h3>
              </div>
              <div className="lg:col-span-8 text-base text-slate-600 leading-relaxed space-y-3">
                <p>
                  Where connected-vehicle black-box or smartphone sensor streams exist, IMPACTA synchronizes longitudinal and lateral deceleration spikes, Delta-V estimates, and brake pedal inputs with reported contact timestamps.
                </p>
              </div>
            </div>

            {/* Capability 3 */}
            <div className="grid lg:grid-cols-12 gap-8 items-start pt-8 border-t border-slate-200">
              <div className="lg:col-span-4">
                <span className="text-3xl font-black font-mono text-blue-600 block mb-1">03</span>
                <h3 className="text-2xl font-bold text-slate-950">Box-Mapped CAI Workspace</h3>
              </div>
              <div className="lg:col-span-8 text-base text-slate-600 leading-relaxed space-y-3">
                <p>
                  Evidence automatically populates standard European Agreed Statement fields (Boxes 1 through 15). Adjusters can inspect field-level provenance hashes, compare witness statements, and apply manual overrides with full audit logging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Final Call to Action */}
      <section className="py-20 sm:py-28 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded border border-blue-200">
            Professional Demonstration
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
            Test the Claims Operations Console.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            Experience the 6-tab deep claim inspection workbench, 3D kinematic trajectory review, and immutable adjuster audit trails.
          </p>
          <div className="pt-4">
            <Link
              href="/console/login"
              className="min-h-[48px] inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-slate-950 hover:bg-blue-600 text-white shadow-sm transition-all"
            >
              <span>{t.nav.insurerAccess}</span>
              <ArrowRightIcon size={16} />
            </Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
