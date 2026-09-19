"use client";

import React from "react";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { TextReveal } from "@/components/motion/TextReveal";
import { CheckCircleIcon } from "@/components/icons/Icons";

export default function TechnologyPage() {
  return (
    <PublicShell>
      {/* Header */}
      <section className="py-20 sm:py-32 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <TextReveal delayMs={0}>
              <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-blue-700">
                Technical Architecture &amp; Roadmap
              </p>
            </TextReveal>
            <TextReveal delayMs={80} as="h1" className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 leading-tight">
              An honest, transparent view of how IMPACTA is built.
            </TextReveal>
            <TextReveal delayMs={160} as="p" className="text-lg sm:text-xl text-slate-600 leading-relaxed">
              We separate current working prototype capabilities from future enterprise carrier integrations. No exaggerated claims, no hidden cloud dependencies.
            </TextReveal>
          </div>
        </div>
      </section>

      {/* Current vs Future Architecture Comparison */}
      <section className="py-20 sm:py-32 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Current Prototype Foundation */}
            <div className="p-8 sm:p-10 bg-white rounded-2xl border border-slate-200 space-y-6 shadow-xs">
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold">
                  Phase Status: Operational Prototype
                </p>
                <h2 className="text-2xl font-bold text-slate-950">
                  Current Browser-Local Architecture
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">
                  Engineered to function entirely inside modern web browsers without external servers, enabling robust, zero-latency evaluation.
                </p>
              </div>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-950 text-base block">
                    Structured Claims Ledger (localStorage)
                  </span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Claims stored under `impacta_claims_v1` with complete TypeScript schema enforcement. Cross-tab reactivity triggers instantaneous updates between Driver and Console.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-950 text-base block">
                    Binary Media Store (IndexedDB)
                  </span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    High-resolution camera photo blobs stored in `impacta_media_db` (`evidence_blobs`), bypassing 5MB localStorage quota limits safely.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-950 text-base block">
                    Deterministic Demonstration Engine
                  </span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Canonical Florence roundabout collision scenario features deterministic 5-stage transformation sequence. Real user uploads are transparently flagged with disconnected AI disclaimers.
                  </p>
                </div>
              </div>
            </div>

            {/* Future Production Target */}
            <div className="p-8 sm:p-10 bg-white rounded-2xl border border-slate-200 space-y-6 shadow-xs">
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold">
                  Phase Status: Production Target
                </p>
                <h2 className="text-2xl font-bold text-slate-950">
                  Future Enterprise Integration
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">
                  The planned enterprise deployment roadmap for tier-1 European insurance carriers and connected mobility fleets.
                </p>
              </div>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-950 text-base block">
                    Edge &amp; Cloud Vision Pipelines
                  </span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    On-device damage segmentation models paired with secure sovereign cloud inference for optical character recognition, VIN cross-checks, and anti-fraud tamper detection.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-950 text-base block">
                    OEM &amp; EDR Telemetry Ingestion
                  </span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Secure APIs connecting connected-vehicle telematics (CAN-bus, EDR protocols, crash sensors) with sub-second sample rates directly into claims dossiers.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-950 text-base block">
                    Carrier Core System Integrations
                  </span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    RESTful API webhooks connecting directly into Guidewire, Duck Creek, and ANIA/IVASS regulatory compliance reporting structures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Integrity Standards */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-3">
            <TextReveal delayMs={0} as="h2" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Technical Integrity Standards
            </TextReveal>
            <TextReveal delayMs={60} as="p" className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We hold our technical architecture to strict academic and operational standards:
            </TextReveal>
          </div>

          <div className="space-y-5 text-sm text-slate-700">
            <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircleIcon size={22} className="text-emerald-700 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-slate-950 text-base block">Data Minimization Principle</span>
                <p className="text-slate-600 leading-relaxed">Only evidentiary items directly relevant to the crash (scene overview, vehicle contact damage, counterparty registration) are recorded. No background behavioral tracking or continuous GPS surveillance.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircleIcon size={22} className="text-emerald-700 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-slate-950 text-base block">Zero Cloud Leaks in Prototype</span>
                <p className="text-slate-600 leading-relaxed">Your camera uploads and driver inputs do not leave this device during this prototype run. All data resides strictly inside browser memory and can be flushed with one tap in Profile settings.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircleIcon size={22} className="text-emerald-700 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-slate-950 text-base block">Open Inspection</span>
                <p className="text-slate-600 leading-relaxed">All schemas, mappers, and repository files are standard TypeScript and open to inspection in the project repository.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
