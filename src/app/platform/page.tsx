"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { TextReveal } from "@/components/motion/TextReveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { ArrowRightIcon } from "@/components/icons/Icons";

export default function PlatformPage() {
  const platformStages = [
    {
      step: "01",
      title: "Roadside Incident Capture",
      actor: "Policyholder / Driver",
      description:
        "Immediately post-collision, the driver opens the mobile PWA. The interface guides immediate physical safety (112 emergency assistance, hazard lights) and prompts standardized 4-angle evidence photography and narrative statements.",
      highlight: "Offline-first PWA · Native camera integration · EXIF timestamping",
    },
    {
      step: "02",
      title: "Multimodal Evidence Structuring",
      actor: "Computer Vision & Telemetry Ingestion",
      description:
        "Visual models segment contact damage patterns, license plate OCR extracts counterparty alphanumeric codes, and onboard connected-vehicle telemetry (when CAN-bus available) cross-references physical deceleration curves with impact times.",
      highlight: "Deterministic pipeline · Delta-V calculation · Impact angle detection",
    },
    {
      step: "03",
      title: "Evidentiary Gap Surfacing",
      actor: "Epistemic Analysis Engine",
      description:
        "The system explicitly highlights what is known versus what is missing. Unobserved details—such as unconfirmed counterparty insurance policies, absent traffic signal phases, or missing rear angles—are surfaced rather than guessed.",
      highlight: "Strict Epistemic Isolation: Observed Facts vs Inferred Hypotheses",
    },
    {
      step: "04",
      title: "Driver Verification & Declaration",
      actor: "Driver / Policyholder",
      description:
        "The driver receives a plain-language, non-technical synthesis of what happened: 'You were travelling through the roundabout. The other vehicle entered from your right.' The driver confirms standard CAI circumstances (Box 12) and signs a solemn truthfulness declaration.",
      highlight: "Plain-language confirmation · Completeness gauge · CAI Box 12 mapping",
    },
    {
      step: "05",
      title: "Structured Claim Dossier Generation",
      actor: "Claims Repository",
      description:
        "A standardized claim dossier (`CLM-YYYY-XXXX`) is compiled in browser storage, complete with dual-party profiles, vehicle specs, optical extraction metadata, black-box graphs, and CAI draft forms.",
      highlight: "Standard European CAI schema · IndexedDB binary blob preservation",
    },
    {
      step: "06",
      title: "Human-in-the-Loop Claims Triage",
      actor: "Insurance Claims Specialist & SIU",
      description:
        "The insurance adjuster reviews the structured dossier in the Claims Operations Console. The system never determines legal liability or fault percentages. The adjuster validates or overrides facts, reviews telemetry curves, and finalizes processing.",
      highlight: "Human decision authority · Immutable audit log · Priority triage queue",
    },
  ];

  return (
    <PublicShell>
      {/* Platform Header */}
      <section className="py-20 sm:py-32 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <TextReveal delayMs={0}>
              <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-blue-700">
                Architecture &amp; Workflow
              </p>
            </TextReveal>
            <TextReveal delayMs={80} as="h1" className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 leading-tight">
              How IMPACTA turns chaos into structured insurance truth.
            </TextReveal>
            <TextReveal delayMs={160} as="p" className="text-lg sm:text-xl text-slate-600 leading-relaxed">
              A transparent, six-stage operational pipeline engineered to eliminate administrative delays, preserve evidentiary integrity, and maintain human oversight.
            </TextReveal>
          </div>
        </div>
      </section>

      {/* Editorial Visual Hero */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ImageReveal delayMs={100} className="relative rounded-2xl overflow-hidden aspect-[21/9] bg-slate-200 border border-slate-200 shadow-sm">
            <Image
              src="/images/platform-evidence.jpg"
              alt="European road and vehicle mobility context"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-12 text-white">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-medium">
                End-to-End Operational Traceability
              </span>
              <div className="text-xl sm:text-3xl font-bold mt-1">
                From Roadside Smartphone to Enterprise Claim Workbench
              </div>
            </div>
          </ImageReveal>
        </div>
      </section>

      {/* The 6-Stage Narrative Walkthrough */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="border-b border-slate-200 pb-6 space-y-2">
            <TextReveal delayMs={0} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              The 6-Stage Intake &amp; Triage Lifecycle
            </TextReveal>
            <TextReveal delayMs={60} as="p" className="text-base sm:text-lg text-slate-600">
              Every stage has a defined responsibility boundary and strict data provenance.
            </TextReveal>
          </div>

          <div className="space-y-14">
            {platformStages.map((stage) => (
              <div
                key={stage.step}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start pt-8 border-t border-slate-200 first:border-0 first:pt-0"
              >
                {/* Step indicator */}
                <div className="md:col-span-2">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-blue-700 block">
                    {stage.step}
                  </span>
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mt-1">
                    Stage {stage.step}
                  </span>
                </div>

                {/* Content */}
                <div className="md:col-span-10 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-950">
                      {stage.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-500 font-medium">
                      {stage.actor}
                    </span>
                  </div>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                    {stage.description}
                  </p>
                  <div className="pt-1 text-xs sm:text-sm font-mono text-blue-700 font-semibold">
                    {stage.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTAs */}
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/drivers"
              className="text-base font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-2"
            >
              <span>Explore the Driver Experience</span>
              <ArrowRightIcon size={18} />
            </Link>
            <Link
              href="/insurers"
              className="text-base font-bold text-slate-900 hover:text-blue-700 inline-flex items-center gap-2"
            >
              <span>Explore Claims Operations</span>
              <ArrowRightIcon size={18} />
            </Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
