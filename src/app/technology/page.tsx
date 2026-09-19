import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/public/PublicShell";
import { CheckCircleIcon, ArrowRightIcon } from "@/components/icons/Icons";

export const metadata = {
  title: "Technology Architecture — IMPACTA",
  description:
    "Transparent technical architecture: client-side prototype foundation, deterministic simulation models, and future enterprise roadmap.",
};

export default function TechnologyPage() {
  return (
    <PublicShell>
      {/* Header */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              Technical Architecture &amp; Roadmap
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
              An honest, transparent view of how IMPACTA is built.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We separate current working prototype capabilities from future enterprise carrier integrations. No exaggerated claims, no hidden cloud dependencies.
            </p>
          </div>
        </div>
      </section>

      {/* Current vs Future Architecture Comparison */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current Prototype Foundation */}
            <div className="p-7 sm:p-9 bg-white rounded-2xl border border-slate-200 space-y-6 shadow-xs">
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-semibold inline-block">
                  Phase Status: Operational Prototype
                </span>
                <h2 className="text-xl font-bold text-slate-950">
                  Current Browser-Local Architecture
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Engineered to function entirely inside modern web browsers without external servers, enabling robust, zero-latency evaluation.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">
                    Structured Claims Ledger (localStorage)
                  </span>
                  <p className="text-[11px] text-slate-600">
                    Claims stored under `impacta_claims_v1` with complete TypeScript schema enforcement. Cross-tab reactivity triggers instantaneous updates between Driver and Console.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">
                    Binary Media Store (IndexedDB)
                  </span>
                  <p className="text-[11px] text-slate-600">
                    High-resolution camera photo blobs stored in `impacta_media_db` (`evidence_blobs`), bypassing 5MB localStorage quota limits safely.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">
                    Deterministic Demonstration Engine
                  </span>
                  <p className="text-[11px] text-slate-600">
                    Canonical Florence roundabout collision scenario features deterministic 5-stage transformation sequence. Real user uploads are transparently flagged with disconnected AI disclaimers.
                  </p>
                </div>
              </div>
            </div>

            {/* Future Production Target */}
            <div className="p-7 sm:p-9 bg-white rounded-2xl border border-slate-200 space-y-6 shadow-xs">
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded border border-slate-200 font-semibold inline-block">
                  Phase Status: Production Target
                </span>
                <h2 className="text-xl font-bold text-slate-950">
                  Future Enterprise Integration
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The planned enterprise deployment roadmap for tier-1 European insurance carriers and connected mobility fleets.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">
                    Edge &amp; Cloud Multimodal Vision Pipelines
                  </span>
                  <p className="text-[11px] text-slate-600">
                    On-device damage segmentation models paired with secure sovereign cloud inference for optical character recognition, VIN cross-checks, and anti-fraud tamper detection.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">
                    OEM &amp; EDR Telemetry Ingestion
                  </span>
                  <p className="text-[11px] text-slate-600">
                    Secure APIs connecting connected-vehicle telematics (CAN-bus, EDR protocols, crash sensors) with sub-second sample rates directly into claims dossiers.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">
                    Carrier Core System Integrations
                  </span>
                  <p className="text-[11px] text-slate-600">
                    RESTful API webhooks connecting directly into Guidewire, Duck Creek, and ANIA/IVASS regulatory compliance reporting structures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Roadmap & Technical Ethics */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              Technical Integrity Standards
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We hold our technical architecture to strict academic and operational standards:
            </p>
          </div>

          <div className="space-y-4 text-xs text-slate-700">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircleIcon size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Data Minimization Principle</span>
                <span>Only evidentiary items directly relevant to the crash (scene overview, vehicle contact damage, counterparty registration) are recorded. No background behavioral tracking or continuous GPS surveillance.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircleIcon size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Zero Cloud Leaks in Prototype</span>
                <span>Your camera uploads and driver inputs do not leave this device during this prototype run. All data resides strictly inside browser memory and can be flushed with one tap in Profile settings.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircleIcon size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Open Inspection</span>
                <span>All schemas, mappers, and repository files are standard TypeScript and open to inspection in the project repository.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
