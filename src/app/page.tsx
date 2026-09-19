"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import {
  ShieldIcon,
  CarIcon,
  FileTextIcon,
  ActivityIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  CameraIcon,
  ShieldCheckIcon,
} from "@/components/icons/Icons";

export default function HomePage() {
  const [activeStoryStep, setActiveStoryStep] = useState<number>(0);

  const transformationSteps = [
    {
      id: "capture",
      badge: "Step 01 · Scene Ingestion",
      title: "Raw Accident Evidence",
      description:
        "The driver captures 4 guided photos at the roadside: wide scene overview, contact point on vehicle A, other vehicle plate, and road signs.",
      visualBadge: "4 Daylight Photos · EXIF Stamped",
      visualContent: (
        <div className="space-y-3">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-200 border border-slate-200">
            <Image
              src="/images/evidence-scene.jpg"
              alt="Roadside accident scene photo"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white font-mono text-[10px] backdrop-blur-xs">
              Piazza San Giovanni, Florence · 11:42 AM
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="flex items-center gap-1.5 font-medium">
              <CameraIcon size={14} className="text-blue-600" />
              <span>Camera Sensor: 12MP Wide</span>
            </span>
            <span className="font-mono text-emerald-700 font-semibold">Verified Daylight</span>
          </div>
        </div>
      ),
    },
    {
      id: "structuring",
      badge: "Step 02 · Feature Extraction",
      title: "Structured Observations & Telemetry",
      description:
        "Computer vision parses damage contours, optical character recognition validates plates, and black-box EDR sensor curves verify sudden deceleration.",
      visualBadge: "Optical Extraction · 10Hz CAN Telemetry",
      visualContent: (
        <div className="space-y-2.5">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-800 font-bold border-b border-slate-200 pb-1.5">
              <span>Vehicle A (VW Golf VIII)</span>
              <span className="font-mono text-blue-700">GF492XP</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
              <div>
                <span className="text-slate-400 block">Impact Zone</span>
                <span className="font-medium text-slate-900">Front-Right Bumper</span>
              </div>
              <div>
                <span className="text-slate-400 block">Peak Decel</span>
                <span className="font-mono font-medium text-slate-900">0.82 G (Braking)</span>
              </div>
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-800 font-bold border-b border-slate-200 pb-1.5">
              <span>Vehicle B (Fiat 500X)</span>
              <span className="font-mono text-slate-700">EJ891KL</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
              <div>
                <span className="text-slate-400 block">Impact Zone</span>
                <span className="font-medium text-slate-900">Front-Left Fender</span>
              </div>
              <div>
                <span className="text-slate-400 block">Delta-V Estimate</span>
                <span className="font-mono font-medium text-slate-900">12.4 km/h</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "reconstruction",
      badge: "Step 03 · Dynamic Alignment",
      title: "Neutral Kinematics Reconstruction",
      description:
        "Factual dynamics describe the spatial interaction without asserting legal liability. Verified against standard Italian CAI circumstances 6 & 7.",
      visualBadge: "Box 12 Circumstances Verified",
      visualContent: (
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="font-bold text-slate-900">Dynamics Summary</span>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Factual Synthesis
            </span>
          </div>
          <p className="text-slate-700 text-xs leading-relaxed italic">
            &ldquo;Vehicle A was circulating along the outer ring of Piazza San Giovanni roundabout. Vehicle B entered from the right inlet before contact occurred at the front corners.&rdquo;
          </p>
          <div className="space-y-1.5 pt-1 text-[11px]">
            <div className="flex items-center justify-between text-slate-700">
              <span>CAI Circumstance 7 (Vehicle A):</span>
              <span className="font-semibold text-emerald-700">Circolava in rotatoria</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span>CAI Circumstance 6 (Vehicle B):</span>
              <span className="font-semibold text-emerald-700">Si immetteva in rotatoria</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "claim",
      badge: "Step 04 · Insurer Triage",
      title: "Structured Claim Ready for Adjuster",
      description:
        "The completed dossier is transmitted to the insurer operations console with optical provenance, field confirmations, and full audit trails.",
      visualBadge: "Claim Dossier CLM-2026-0842",
      visualContent: (
        <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3 text-xs shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Reference</span>
              <span className="font-mono font-bold text-blue-700 text-sm">CLM-2026-0842</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[10px] font-semibold">
              CAI Ready
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
            <div>
              <span className="text-slate-400 block">Policyholder</span>
              <span className="font-semibold text-slate-900">Matteo Bianchi</span>
            </div>
            <div>
              <span className="text-slate-400 block">Insurer</span>
              <span className="font-semibold text-slate-900">Aura Mutua Assicurazioni</span>
            </div>
            <div>
              <span className="text-slate-400 block">Evidence Assets</span>
              <span className="font-semibold text-slate-900">4 photos · 1 statement</span>
            </div>
            <div>
              <span className="text-slate-400 block">Adjuster Status</span>
              <span className="text-amber-700 font-semibold">Awaiting Intake Review</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <PublicShell>
      {/* 1. HERO SECTION: Daylight, high-contrast, editorial typography, max 2 lines */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy Block: 7 cols on desktop */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>Road Accident Intelligence Platform</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.08]">
                When an accident happens, evidence should move faster than paperwork.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                IMPACTA bridges the gap between chaotic crash scenes and insurer claims triage—converting smartphone damage photos, driver statements, and black-box telemetry into structured, verifiable claim dossiers.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  href="/app"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all active:scale-[0.98]"
                >
                  <span>Report an accident</span>
                  <ArrowRightIcon size={16} />
                </Link>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                >
                  <span>See how IMPACTA works</span>
                </a>
              </div>

              {/* Subtle Credibility Bar */}
              <div className="pt-6 border-t border-slate-100 flex items-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircleIcon size={14} className="text-emerald-600" />
                  <span>Standard European CAI Compatible</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheckIcon size={14} className="text-blue-600" />
                  <span>Human-in-the-Loop Governance</span>
                </div>
              </div>
            </div>

            {/* Right Visual Block: Daylight European car photography in 5 cols */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-slate-100 border border-slate-200 shadow-md">
                <Image
                  src="/images/hero-car.jpg"
                  alt="Modern European vehicle in urban daylight"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 550px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300">
                    Insured Policyholder Context
                  </span>
                  <div className="text-sm sm:text-base font-bold">
                    Volkswagen Golf VIII · Matteo Bianchi
                  </div>
                  <div className="text-xs text-slate-200">
                    Florence Urban District · Aura Mutua Assicurazioni
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SIGNATURE STORYTELLING SEQUENCE: Evidence ➔ Claim Transformation */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              The IMPACTA Pipeline
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              From roadside photos to verified claim in four transparent stages.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every step isolates observed physical evidence from probabilistic inferences, preserving human review and legal integrity.
            </p>
          </div>

          {/* Interactive transformation viewer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Step Selection Accordion: 5 cols */}
            <div className="lg:col-span-5 space-y-3">
              {transformationSteps.map((step, idx) => {
                const isActive = activeStoryStep === idx;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStoryStep(idx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all ${
                      isActive
                        ? "bg-white border-blue-600 shadow-sm ring-1 ring-blue-600"
                        : "bg-white/60 hover:bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-700 font-semibold block mb-1">
                      {step.badge}
                    </span>
                    <h3 className="text-base font-bold text-slate-950 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {step.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Step Visual Preview: 7 cols */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs min-h-[380px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
                  <span className="text-xs font-bold text-slate-900">
                    Live Transformation Output
                  </span>
                  <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {transformationSteps[activeStoryStep].visualBadge}
                  </span>
                </div>

                {transformationSteps[activeStoryStep].visualContent}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Phase {activeStoryStep + 1} of 4</span>
                <button
                  type="button"
                  onClick={() => setActiveStoryStep((activeStoryStep + 1) % transformationSteps.length)}
                  className="font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>Next stage</span>
                  <ArrowRightIcon size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TWO DEDICATED SURFACES: Driver vs Insurer */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              Purpose-Built Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Two dedicated surfaces. One shared truth.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Drivers require low cognitive load and clear safety guidance at the roadside. Insurers require audit trails, telemetry curves, and high-density triage workbenches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Driver Surface Card */}
            <div className="p-7 sm:p-9 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <CarIcon size={22} />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-blue-700 font-semibold block">
                    Consumer Experience · Mobile PWA
                  </span>
                  <h3 className="text-xl font-bold text-slate-950 mt-1">
                    IMPACTA Driver
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  A calm, stepwise progressive web app designed for policyholders under stress. Directs physical safety, guides 4-angle damage capture, exchanges counterparty details, and enables plain-language CAI confirmation.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon size={14} className="text-emerald-600" />
                    <span>Emergency 112 calling guidance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon size={14} className="text-emerald-600" />
                    <span>Native camera capture (`capture=&quot;environment&quot;`)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon size={14} className="text-emerald-600" />
                    <span>Local device persistence (IndexedDB + localStorage)</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <Link
                  href="/app"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-xs"
                >
                  <span>Launch Driver App</span>
                  <ArrowRightIcon size={14} />
                </Link>
                <Link href="/drivers" className="text-xs font-semibold text-slate-600 hover:underline">
                  Read Driver Specs →
                </Link>
              </div>
            </div>

            {/* Insurer Operations Card */}
            <div className="p-7 sm:p-9 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center">
                  <ShieldIcon size={22} />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                    Enterprise Workspace · Adjusters &amp; SIU
                  </span>
                  <h3 className="text-xl font-bold text-slate-950 mt-1">
                    Claims Operations Console
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  A high-density operational workbench for claim adjusters and fraud triage specialists. Features automated kinematics reconstruction, 10–20Hz black-box EDR telemetry, and field-level CAI workspaces.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon size={14} className="text-emerald-600" />
                    <span>Epistemic demarcation: Observed vs Inferred facts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon size={14} className="text-emerald-600" />
                    <span>10–20Hz deceleration curves and 360° impact angle</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircleIcon size={14} className="text-emerald-600" />
                    <span>Box-mapped CAI review workspace with audit trail</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <Link
                  href="/console"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-xs"
                >
                  <span>Explore Claims Console</span>
                  <ArrowRightIcon size={14} />
                </Link>
                <Link href="/insurers" className="text-xs font-semibold text-slate-600 hover:underline">
                  Read Insurer Specs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OPERATIONAL PRINCIPLES: Epistemic separation & safety */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                Principle 01
              </span>
              <h3 className="text-base font-bold text-slate-950">
                No Automated Liability Determination
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                IMPACTA explicitly rejects assigning fault percentages or liability. The system acts strictly as an evidentiary decision-support engine for licensed human adjusters.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                Principle 02
              </span>
              <h3 className="text-base font-bold text-slate-950">
                Epistemic Demarcation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Physical facts directly observed in photos are kept strictly separate from probabilistic kinematic inferences and human confirmations.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                Principle 03
              </span>
              <h3 className="text-base font-bold text-slate-950">
                Local-First Prototype Architecture
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                In this academic prototype, all photos and dossiers reside exclusively in your browser&apos;s localStorage and IndexedDB. No external servers or carrier APIs are contacted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION SECTION */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Experience the future of road accident intelligence.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Test the guided roadside intake wizard as a driver, or explore the claims operations console as an insurance adjuster.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/app"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all active:scale-[0.98]"
            >
              <span>Launch Driver Report (PWA)</span>
              <ArrowRightIcon size={16} />
            </Link>
            <Link
              href="/console"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
            >
              <span>Explore Claims Console →</span>
            </Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
