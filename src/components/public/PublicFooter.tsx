import React from "react";
import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Overview */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-white text-slate-950 flex items-center justify-center font-bold text-xs">
                IM
              </div>
              <span className="font-bold tracking-tight text-white text-sm">
                IMPACTA
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Transforming roadside accident evidence—photos, driver narratives, and vehicle telemetry—into structured, verifiable claim dossiers ready for human review.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Academic Prototype · Token Titans</span>
              </span>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/platform" className="hover:text-white transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/drivers" className="hover:text-white transition-colors">
                  For Drivers
                </Link>
              </li>
              <li>
                <Link href="/insurers" className="hover:text-white transition-colors">
                  For Insurers
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-white transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-white transition-colors">
                  Safety &amp; Ethics
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Interfaces & Company */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold">
              Surfaces
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/app" className="hover:text-white transition-colors">
                  Driver Intake (PWA)
                </Link>
              </li>
              <li>
                <Link href="/console" className="hover:text-white transition-colors">
                  Claims Operations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Governance */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold">
              Governance
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <span className="text-slate-500 block text-[11px]">
                  Fictional demo data
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 IMPACTA. Academic prototype developed for research and evaluation purposes.</p>
          <p>This prototype runs locally in your browser. Not connected to real emergency hotlines.</p>
        </div>
      </div>
    </footer>
  );
}
