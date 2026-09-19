"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage, LanguageSelector } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { MenuIcon, CloseIcon, ArrowRightIcon } from "@/components/icons/Icons";

export function PublicHeader() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { isDriverAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t.nav.platform, href: "/platform" },
    { label: t.nav.drivers, href: "/drivers" },
    { label: t.nav.insurers, href: "/insurers" },
    { label: t.nav.technology, href: "/technology" },
    { label: t.nav.safety, href: "/safety" },
  ];

  const reportLink = isDriverAuthenticated ? "/app/report" : "/login?redirect=/app/report";

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 select-none transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md p-1"
          title="IMPACTA Home"
        >
          <div className="w-9 h-9 rounded-lg bg-slate-950 text-white flex items-center justify-center font-bold tracking-tight text-sm shadow-xs group-hover:bg-blue-600 transition-colors">
            IM
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-slate-950 leading-tight">
              IMPACTA
            </span>
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider -mt-0.5 font-medium">
              Accident Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links: 16–18px target */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-xl text-base font-medium transition-colors min-h-[44px] inline-flex items-center ${
                  isActive
                    ? "text-blue-700 font-bold bg-blue-50/80"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/70"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Triggers */}
        <div className="hidden sm:flex items-center gap-3 lg:gap-4">
          {/* Language Selector */}
          <LanguageSelector />

          {/* Sign In Link */}
          <Link
            href="/login"
            className="text-sm sm:text-base font-semibold text-slate-600 hover:text-slate-950 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors min-h-[44px] inline-flex items-center"
          >
            {t.nav.signIn}
          </Link>

          {/* Quiet Insurer access */}
          <Link
            href="/console/login"
            className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 px-2.5 py-2 rounded-xl transition-colors min-h-[44px] inline-flex items-center"
          >
            {t.nav.insurerAccess}
          </Link>

          {/* Primary Consumer Intake CTA */}
          <Link
            href={reportLink}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm sm:text-base font-bold tracking-tight bg-slate-950 hover:bg-blue-600 text-white shadow-xs transition-all active:scale-[0.98] min-h-[44px]"
          >
            <span>{t.nav.reportAccident}</span>
            <ArrowRightIcon size={16} />
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSelector />
          <Link
            href={reportLink}
            className="inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-950 text-white min-h-[40px]"
          >
            {t.nav.reportAccident.split(" ")[0]}
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-5 animate-fade-in shadow-xl">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-lg font-medium min-h-[48px] flex items-center ${
                    isActive
                      ? "text-blue-700 font-bold bg-blue-50"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <Link
              href={reportLink}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 px-5 rounded-xl text-base font-bold bg-slate-950 hover:bg-blue-600 text-white text-center flex items-center justify-center gap-2 min-h-[48px]"
            >
              <span>{t.nav.reportAccident}</span>
              <ArrowRightIcon size={16} />
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-4 rounded-xl text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 text-center min-h-[44px] flex items-center justify-center"
              >
                {t.nav.signIn}
              </Link>
              <Link
                href="/console/login"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-4 rounded-xl text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 text-center min-h-[44px] flex items-center justify-center"
              >
                {t.nav.insurerAccess}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
