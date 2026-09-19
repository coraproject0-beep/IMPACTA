import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import {
  ShieldIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
} from "@/components/icons/Icons";

export const metadata = {
  title: "Safety & Ethics — IMPACTA",
  description:
    "Safety-first engineering: emergency triage, human confirmation, and strict epistemic demarcation.",
};

export default function SafetyPage() {
  return (
    <PublicShell>
      {/* Header */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
              Safety, Ethics &amp; Governance
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
              Safety precedes evidence. Human judgment governs claims.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              At roadside collisions, physical safety is paramount. In insurance claims processing, evidentiary rigor and legal governance must not be abdicated to automated black boxes.
            </p>
          </div>
        </div>
      </section>

      {/* Safety Visual Hero */}
      <section className="py-12 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden aspect-[21/9] bg-slate-200 border border-slate-200 shadow-sm">
            <Image
              src="/images/safety-road.jpg"
              alt="Calm European road and junction safety"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
              <span className="text-xs font-mono uppercase tracking-wider text-rose-300">
                Roadside Emergency Protocol
              </span>
              <div className="text-lg sm:text-2xl font-bold">
                Physical Wellbeing Before Evidentiary Intake
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Safety Commitments */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              Our Non-Negotiable Safety Commitments
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Specific, operational guardrails engineered into every layer of IMPACTA.
            </p>
          </div>

          <div className="space-y-6">
            {/* 1. Emergency first */}
            <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-3">
              <div className="flex items-center gap-2.5 text-rose-950">
                <AlertTriangleIcon size={20} className="text-rose-600 flex-shrink-0" />
                <h3 className="text-base font-bold">
                  1. Emergency First: Non-Automated 112 Dialing
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-rose-900/80 leading-relaxed">
                The driver reporting flow begins with an immediate safety verification: confirming personal safety, hazard light activation, and reflective vest placement. If anyone is injured, direct access to the Single European Emergency Number (112) is provided immediately. The app never delays medical help to gather claim data.
              </p>
            </div>

            {/* 2. Epistemic separation */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2.5 text-slate-950">
                <ShieldCheckIcon size={20} className="text-blue-600 flex-shrink-0" />
                <h3 className="text-base font-bold">
                  2. Epistemic Demarcation: Facts vs. Inferences
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Computer models output hypotheses, not legal verdicts. We strictly isolate directly observed physical evidence (photo pixels, damage deformation, registered plates) from probabilistic kinematic reconstructions (estimated approach velocity, deceleration vectors). Adjusters always see the distinction clearly tagged.
              </p>
            </div>

            {/* 3. No liability */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2.5 text-slate-950">
                <CheckCircleIcon size={20} className="text-emerald-600 flex-shrink-0" />
                <h3 className="text-base font-bold">
                  3. Absolute Prohibition of Automated Liability
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Under Article 2054 of the Italian Civil Code and European insurance directives, legal liability and fault apportionment require human legal competence. IMPACTA never outputs &ldquo;Vehicle A was 100% at fault.&rdquo; It acts exclusively as an evidentiary decision-support assistant for human claims professionals.
              </p>
            </div>

            {/* 4. Data minimization */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2.5 text-slate-950">
                <ShieldIcon size={20} className="text-slate-700 flex-shrink-0" />
                <h3 className="text-base font-bold">
                  4. Data Minimization &amp; Sovereign Storage
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We collect only what is strictly necessary to compile a standardized CAI report. In this academic prototype, all information resides locally on your device. In future production systems, end-to-end cryptographic hashing and sovereign European cloud storage will protect sensitive personal data against unauthorized exploitation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
            See our safety-first flow in action.
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Experience the calm, step-by-step Driver accident reporting wizard.
          </p>
          <div className="pt-2">
            <Link
              href="/app"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
            >
              <span>Launch Driver App</span>
              <ArrowRightIcon size={14} />
            </Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
