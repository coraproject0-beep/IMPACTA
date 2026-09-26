"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function PublicFooter() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0E0F10] text-white selection:bg-white selection:text-[#0E0F10] border-t border-white/10">
      <div className="w-full px-6 sm:px-12 lg:px-20 py-20 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          {/* Brand & Mission Column */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="inline-block focus:outline-none" title="IMPACTA Home">
              <span className="text-2xl font-black tracking-[-0.03em] uppercase text-white">
                IMPACTA
              </span>
            </Link>
            <p className="text-white/70 text-base lg:text-lg max-w-md leading-relaxed font-light">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Column 1: System */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              {t("footer.productHeading")}
            </h4>
            <ul className="space-y-3 text-sm font-medium tracking-wide">
              <li>
                <Link href="/platform" className="text-white/70 hover:text-white transition-colors">
                  {t("nav.platform")}
                </Link>
              </li>
              <li>
                <Link href="/drivers" className="text-white/70 hover:text-white transition-colors">
                  {t("nav.drivers")}
                </Link>
              </li>
              <li>
                <Link href="/insurers" className="text-white/70 hover:text-white transition-colors">
                  {t("nav.insurers")}
                </Link>
              </li>
              <li>
                <Link href="/technology" className="text-white/70 hover:text-white transition-colors">
                  {t("nav.technology")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Governance & Safety */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              {t("footer.governanceHeading")}
            </h4>
            <ul className="space-y-3 text-sm font-medium tracking-wide">
              <li>
                <Link href="/safety" className="text-white/70 hover:text-white transition-colors">
                  {t("nav.safety")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/70 hover:text-white transition-colors">
                  {t("footer.terms")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Access Portals */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              {t("footer.surfacesHeading")}
            </h4>
            <ul className="space-y-3 text-sm font-medium tracking-wide">
              <li>
                <Link href="/login" className="text-white/70 hover:text-white transition-colors">
                  {t("footer.driverAreaLink")}
                </Link>
              </li>
              <li>
                <Link href="/console/login" className="text-white/70 hover:text-white transition-colors">
                  {t("footer.claimsOperationsLink")}
                </Link>
              </li>
              <li>
                <Link href="/app/report" className="text-white hover:text-white/80 underline underline-offset-4 transition-colors">
                  {t("nav.reportAccident")} ↗
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Standards */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-medium tracking-wider text-white/40 uppercase">
          <div>
            &copy; {new Date().getFullYear()} IMPACTA MOBILITY INTELLIGENCE. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>EUROPEAN CAI STANDARD</span>
            <span>LOCAL BROWSER PERSISTENCE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
