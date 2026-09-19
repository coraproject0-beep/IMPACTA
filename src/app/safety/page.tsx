"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { TextReveal } from "@/components/motion/TextReveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import {
  AlertTriangleIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@/components/icons/Icons";

export default function SafetyPage() {
  return (
    <PublicShell>
      {/* Header */}
      <section className="py-20 sm:py-32 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <TextReveal delayMs={0}>
              <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-rose-700">
                Safety, Ethics &amp; Governance
              </p>
            </TextReveal>
            <TextReveal delayMs={80} as="h1" className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 leading-tight">
              Safety precedes evidence. Human judgment governs claims.
            </TextReveal>
            <TextReveal delayMs={160} as="p" className="text-lg sm:text-xl text-slate-600 leading-relaxed">
              At roadside collisions, physical safety is paramount. In insurance claims processing, evidentiary rigor and legal governance must not be abdicated to automated black boxes.
            </TextReveal>
          </div>
        </div>
      </section>

      {/* Safety Visual Hero */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ImageReveal delayMs={100} className="relative rounded-2xl overflow-hidden aspect-[21/9] bg-slate-200 border border-slate-200 shadow-sm">
            <Image
              src="/images/safety-road.jpg"
              alt="Calm European road and junction safety"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-12 text-white">
              <span className="text-xs font-mono uppercase tracking-wider text-rose-300 font-medium">
                Roadside Emergency Protocol
              </span>
              <div className="text-xl sm:text-3xl font-bold mt-1">
                Physical Wellbeing Before Evidentiary Intake
              </div>
            </div>
          </ImageReveal>
        </div>
      </section>

      {/* Core Safety Commitments */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-3">
            <TextReveal delayMs={0} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Our Non-Negotiable Safety Commitments
            </TextReveal>
            <TextReveal delayMs={60} as="p" className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Specific, operational guardrails engineered into every layer of IMPACTA.
            </TextReveal>
          </div>

          <div className="space-y-8">
            {/* 1. Emergency first */}
            <div className="p-8 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
              <div className="flex items-center gap-3 text-rose-950">
                <AlertTriangleIcon size={24} className="text-rose-600 flex-shrink-0" />
                <h3 className="text-xl font-bold">
                  1. Emergency First: Non-Automated 112 Dialing
                </h3>
              </div>
              <p className="text-base text-rose-950/80 leading-relaxed">
                The driver reporting flow begins with an immediate safety verification: confirming personal safety, hazard light activation, and reflective vest placement. If anyone is injured, direct access to the Single European Emergency Number (112) is provided immediately. The app never delays medical help to gather claim data.
              </p>
            </div>

            {/* 2. Epistemic separation */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-3 text-slate-950">
                <ShieldCheckIcon size={24} className="text-blue-700 flex-shrink-0" />
                <h3 className="text-xl font-bold">
                  2. Epistemic Demarcation: Facts vs. Inferences
                </h3>
              </div>
              <p className="text-base text-slate-600 leading-relaxed">
                Computer models output hypotheses, not legal verdicts. We strictly isolate directly observed physical evidence (photo pixels, damage deformation, registered plates) from probabilistic kinematic reconstructions (estimated approach velocity, deceleration vectors). Adjusters always see the distinction clearly tagged.
              </p>
            </div>

            {/* 3. No Automated Settlement */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-3 text-slate-950">
                <CheckCircleIcon size={24} className="text-emerald-700 flex-shrink-0" />
                <h3 className="text-xl font-bold">
                  3. Zero Automated Settlement: Human Adjuster Sovereignty
                </h3>
              </div>
              <p className="text-base text-slate-600 leading-relaxed">
                IMPACTA does not settle claims, pronounce legal fault, or execute financial disbursements autonomously. It structures verified evidence into standard European formats so human claims professionals can make fair, swift, and accountable decisions.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex justify-between items-center">
            <Link
              href="/app/report"
              className="text-base font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-2"
            >
              <span>Test Driver Roadside Safety Protocol</span>
              <ArrowRightIcon size={18} />
            </Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
