"use client";

import React from "react";
import Link from "next/link";
import { useLanguage, LanguageSelector } from "@/context/LanguageContext";

export function PublicFooter() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 selection:bg-blue-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Tagline */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group inline-flex">
              <div className="w-7 h-7 rounded-lg bg-white text-slate-950 flex items-center justify-center font-bold text-xs shadow-xs">
                IM
              </div>
              <span className="font-extrabold tracking-tight text-white text-base">
                IMPACTA
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="pt-2">
              <div className="text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800 p-2.5 rounded-xl inline-block">
                {t.footer.academicNotice}
              </div>
            </div>
          </div>

          {/* Column 1: Product */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-bold">
              {t.footer.productHeading}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/platform" className="hover:text-white transition-colors">
                  {t.nav.platform}
                </Link>
              </li>
              <li>
                <Link href="/drivers" className="hover:text-white transition-colors">
                  {t.nav.drivers}
                </Link>
              </li>
              <li>
                <Link href="/insurers" className="hover:text-white transition-colors">
                  {t.nav.insurers}
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-white transition-colors">
                  {t.nav.technology}
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-white transition-colors">
                  {t.nav.safety}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Access & Company */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-bold">
              {t.footer.companyHeading}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  {t.nav.signIn} (Driver)
                </Link>
              </li>
              <li>
                <Link href="/console/login" className="hover:text-white transition-colors">
                  {t.nav.insurerAccess}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Language */}
          <div className="space-y-4">
            <div className="space-y-3">
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-bold">
                {t.footer.legalHeading}
              </h4>
              <ul className="space-y-2.5 text-sm">
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
              </ul>
            </div>

            <div className="pt-2">
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                {t.footer.languageHeading}
              </h4>
              <LanguageSelector />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 {t.footer.allRightsReserved}</p>
          <p>IMPACTA Labs • Via della Mobilità 24, 20121 Milano (Demo Prototype)</p>
        </div>
      </div>
    </footer>
  );
}
