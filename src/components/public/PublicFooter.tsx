"use client";

import React from "react";
import Link from "next/link";
import { useLanguage, LanguageSelector } from "@/context/LanguageContext";

export function PublicFooter() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-100/80 text-slate-600 text-sm border-t border-slate-200 selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Tagline */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-flex" title="IMPACTA Home">
              <div className="w-8 h-8 rounded-lg bg-slate-950 text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:bg-blue-600 transition-colors">
                IM
              </div>
              <span className="font-extrabold tracking-tight text-slate-950 text-lg">
                IMPACTA
              </span>
            </Link>
            <p className="text-slate-600 text-base max-w-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="pt-2">
              <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                {t.footer.academicNotice}
              </p>
            </div>
          </div>

          {/* Column 1: Product */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">
              {t.footer.productHeading}
            </h4>
            <ul className="space-y-3 text-sm sm:text-base">
              <li>
                <Link href="/platform" className="text-slate-600 hover:text-slate-950 transition-colors">
                  {t.nav.platform}
                </Link>
              </li>
              <li>
                <Link href="/drivers" className="text-slate-600 hover:text-slate-950 transition-colors">
                  {t.nav.drivers}
                </Link>
              </li>
              <li>
                <Link href="/insurers" className="text-slate-600 hover:text-slate-950 transition-colors">
                  {t.nav.insurers}
                </Link>
              </li>
              <li>
                <Link href="/technology" className="text-slate-600 hover:text-slate-950 transition-colors">
                  {t.nav.technology}
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-slate-600 hover:text-slate-950 transition-colors">
                  {t.nav.safety}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Access & Company */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">
              {t.footer.companyHeading}
            </h4>
            <ul className="space-y-3 text-sm sm:text-base">
              <li>
                <Link href="/login" className="text-slate-600 hover:text-slate-950 transition-colors">
                  {t.nav.signIn} (Driver)
                </Link>
              </li>
              <li>
                <Link href="/console/login" className="text-slate-600 hover:text-slate-950 transition-colors">
                  {t.nav.insurerAccess}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-slate-950 transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Language */}
          <div className="space-y-5">
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">
                {t.footer.legalHeading}
              </h4>
              <ul className="space-y-3 text-sm sm:text-base">
                <li>
                  <Link href="/privacy" className="text-slate-600 hover:text-slate-950 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-slate-600 hover:text-slate-950 transition-colors">
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold block mb-2">
                {t.footer.languageHeading}
              </span>
              <LanguageSelector />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-500">
          <p>© 2026 IMPACTA Mobility. {t.footer.allRightsReserved}</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-slate-950 transition-colors font-medium">Public Home</Link>
            <span>•</span>
            <Link href="/app" className="hover:text-slate-950 transition-colors font-medium">Driver Area</Link>
            <span>•</span>
            <Link href="/console/overview" className="hover:text-slate-950 transition-colors font-medium">Claims Operations</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
