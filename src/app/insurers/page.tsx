import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import {
  ShieldIcon,
  ActivityIcon,
  FileTextIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
} from "@/components/icons/Icons";

export const metadata = {
  title: "For Insurers — IMPACTA",
  description:
    "Enterprise claims operations workbench featuring automated kinematics reconstruction, telemetry correlation, and human-in-the-loop triage.",
};

export default function InsurersPage() {
  return (
    <PublicShell>
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                Enterprise Claims Operations
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
                High-density decision support for claims adjusters and SIU.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                IMPACTA provides insurance carriers with structured, audit-ready accident intelligence. We eliminate weeks of manual evidence gathering while maintaining strict human-in-the-loop oversight and epistemic demarcation.
              </p>
              <div className="pt-2">
                <Link
                  href="/console"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-950 hover:bg-slate-800 text-white shadow-xs transition-all active:scale-[0.98]"
                >
                  <span>Explore Claims Console</span>
                  <ArrowRightIcon size={16} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 shadow-md">
                <Image
                  src="/images/platform-evidence.jpg"
                  alt="Claims operations workbench and vehicle analytics"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300">
                    Claims Operations Console Demo
                  </span>
                  <span className="text-base font-bold">14 Synthetic Italian Claims Ledgers</span>
                  <span className="text-xs text-slate-300">CAN-Bus Deceleration · 360° Impact Angle</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              Enterprise tools engineered for evidentiary rigor.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every feature is built around the fundamental requirement that AI must assist human adjusters, never replace them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Epistemic separation */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <ShieldCheckIcon size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-950">
                Epistemic Demarcation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct physical observations (scratches, dents, debris) are strictly separated from probabilistic kinematic inferences and human adjuster overrides. No model claims ground truth.
              </p>
            </div>

            {/* Feature 2: Telematics & Deceleration */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <ActivityIcon size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-950">
                10–20Hz Telemetry Correlation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Where connected-vehicle black-box data exists, IMPACTA aligns longitudinal and lateral deceleration curves, Delta-V metrics, and brake pressure curves with reported impact timestamps.
              </p>
            </div>

            {/* Feature 3: Standard CAI Form Workspace */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <FileTextIcon size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-950">
                Box-Mapped CAI Workspace
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Evidence automatically populates standard European accident statement fields (Boxes 1 through 15). Every extracted item features field-level provenance tags and manual override controls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Governance & Liability Disclaimer */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold">
            <span>Governance Standard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
            No automated liability determination. Ever.
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Legal liability and fault apportionment under the Italian Civil Code (Art. 2054) and European conventions remain the exclusive domain of qualified insurance adjusters and legal authorities. IMPACTA is strictly an evidentiary decision-support engine.
          </p>
          <div className="pt-2">
            <Link
              href="/console"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-slate-950 hover:bg-slate-800 text-white shadow-xs"
            >
              <span>Access Claims Operations Console</span>
              <ArrowRightIcon size={14} />
            </Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
