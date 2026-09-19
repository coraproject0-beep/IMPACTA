import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { CheckCircleIcon, ArrowRightIcon } from "@/components/icons/Icons";

export const metadata = {
  title: "Platform Overview — IMPACTA",
  description:
    "End-to-end architecture of IMPACTA: converting roadside evidence into structured insurance claims dossiers.",
};

export default function PlatformPage() {
  const platformStages = [
    {
      step: "01",
      title: "Roadside Incident Capture",
      actor: "Policyholder / Driver",
      description:
        "Immediately post-collision, the driver opens the mobile PWA. The interface guides immediate physical safety (112 emergency assistance, hazard lights) and prompts standardized 4-angle evidence photography and narrative voice/text statements.",
      highlight: "Offline-first PWA · Native camera integration · EXIF timestamping",
    },
    {
      step: "02",
      title: "Multimodal Evidence Structuring",
      actor: "Computer Vision & Telemetry Ingestion",
      description:
        "Visual models segment contact damage patterns, license plate OCR extracts counterparty alphanumeric codes, and onboard connected-vehicle telemetry (10–20Hz CAN-bus deceleration) cross-references physical deceleration curves with impact times.",
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
        "The driver receives a plain-English, non-technical synthesis of what happened: 'You were travelling through the roundabout. The other vehicle entered from your right.' The driver confirms standard CAI circumstances (Box 12) and signs a truthfulness declaration.",
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
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              Architecture &amp; Workflow
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
              How IMPACTA turns chaos into structured insurance truth.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              A transparent, six-stage operational pipeline engineered to eliminate administrative delays, preserve evidentiary integrity, and maintain human oversight.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Visual Hero */}
      <section className="py-12 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden aspect-[21/9] bg-slate-200 border border-slate-200 shadow-sm">
            <Image
              src="/images/platform-evidence.jpg"
              alt="European road and vehicle mobility context"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
                End-to-End Operational Traceability
              </span>
              <div className="text-lg sm:text-2xl font-bold">
                From Roadside Smartphone to Enterprise Claim Workbench
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 6-Stage Narrative Walkthrough */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              The 6-Stage Intake &amp; Triage Lifecycle
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Every stage has a defined responsibility boundary and strict data provenance.
            </p>
          </div>

          <div className="space-y-12">
            {platformStages.map((stage) => (
              <div
                key={stage.step}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start pt-6 border-t border-slate-100 first:border-0 first:pt-0"
              >
                {/* Step indicator */}
                <div className="md:col-span-2">
                  <span className="font-mono text-3xl font-extrabold text-blue-600 block">
                    {stage.step}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mt-1">
                    Stage {stage.step}
                  </span>
                </div>

                {/* Content */}
                <div className="md:col-span-10 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-lg font-bold text-slate-950">
                      {stage.title}
                    </h3>
                    <span className="text-[11px] font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded self-start">
                      Actor: {stage.actor}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {stage.description}
                  </p>

                  <div className="pt-1 flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
                    <CheckCircleIcon size={14} className="text-emerald-600 flex-shrink-0" />
                    <span>{stage.highlight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
            Explore either side of the platform.
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Test the policyholder accident intake application or inspect the insurer claims operations console.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/app"
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
            >
              Report an accident (Driver App)
            </Link>
            <Link
              href="/console"
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-xs bg-white border border-slate-200 hover:bg-slate-50 text-slate-800"
            >
              Explore Claims Console →
            </Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
