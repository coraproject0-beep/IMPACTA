import React from "react";
import Link from "next/link";
import { ArrowRightIcon, ShieldIcon, ActivityIcon, CheckCircleIcon, CpuIcon } from "@/components/icons/Icons";

export default function GatewayPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-900">
      {/* Top Navbar */}
      <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center font-bold tracking-wider text-sm shadow-sm">
            IM
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-slate-950 flex items-center gap-1.5">
              IMPACTA
              <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 bg-blue-50 text-blue-700 border border-blue-200 rounded">
                v2.0
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium tracking-tight">
              Road Accident Intelligence Platform
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Local Engine Active
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-12 md:py-16 flex flex-col justify-center">
        {/* Hero Introduction */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
            <span>Token Titans Academic Prototype</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight">
            Accident Intelligence &amp; Multi-Party Intake Platform
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Unified platform bridging low-stress mobile roadside intake for drivers with automated kinematic reconstruction and human-in-the-loop review for insurance adjusters.
          </p>
        </div>

        {/* Product Gateway Portals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {/* Card 1: IMPACTA Driver */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-blue-300 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Consumer Mobile Web
                </span>
                <span className="text-xs text-slate-400 font-mono">/app</span>
              </div>
              <h2 className="text-xl font-bold text-slate-950">
                IMPACTA Driver Experience
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mobile-first, low-cognitive-load accident reporting wizard for policyholders at the crash scene. Features guided 6-view photographic evidence, counterparty details, instant simulated kinematic validation, and CAI review.
              </p>
              <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon size={14} className="text-blue-600 flex-shrink-0" />
                  <span>Offline-reassuring intake &amp; device photo capture</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon size={14} className="text-blue-600 flex-shrink-0" />
                  <span>Pre-filled Matteo Bianchi demo profile &amp; canonical incident</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon size={14} className="text-blue-600 flex-shrink-0" />
                  <span>Transparent handling: deterministic demo vs real uploads</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100">
              <Link
                href="/app"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wide shadow-sm transition-colors"
              >
                <span>Launch Driver Experience</span>
                <ArrowRightIcon size={14} />
              </Link>
            </div>
          </div>

          {/* Card 2: Claims Console */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-400 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Operations Console
                </span>
                <span className="text-xs text-slate-400 font-mono">/console</span>
              </div>
              <h2 className="text-xl font-bold text-slate-950">
                Claims Adjuster Console
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full-featured operations interface for insurance claims adjusters and SIU fraud triage. Includes 14 multimodal claims, physics-informed kinematics, 10–20Hz vehicle telemetry sync, and priority human review queue.
              </p>
              <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon size={14} className="text-slate-800 flex-shrink-0" />
                  <span>Synchronous telemetry lift &amp; delta-V kinematics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon size={14} className="text-slate-800 flex-shrink-0" />
                  <span>CAI form field extraction &amp; human triage queue</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon size={14} className="text-slate-800 flex-shrink-0" />
                  <span>Cross-tab reactive sync with Driver submissions</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100">
              <Link
                href="/console"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wide shadow-sm transition-colors"
              >
                <span>Open Claims Console</span>
                <ArrowRightIcon size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Persistence Notice Strip */}
        <div className="p-4 rounded-md border border-slate-200 bg-white text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CpuIcon size={16} className="text-slate-400 flex-shrink-0" />
            <span>
              <strong>Shared Browser-Local Architecture:</strong> Structured dossiers persist in <code className="font-mono text-slate-800">localStorage</code>, while high-resolution media blobs persist in <code className="font-mono text-slate-800">IndexedDB</code>. Submitting in Driver reflects immediately in the Console.
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap">
            Zero External Servers
          </span>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-6 text-center text-xs text-slate-500">
        <p>
          Token Titans Academic Prototype • IMPACTA v2.0 • Synthetic evaluation environment for demonstration purposes only.
        </p>
      </footer>
    </div>
  );
}
