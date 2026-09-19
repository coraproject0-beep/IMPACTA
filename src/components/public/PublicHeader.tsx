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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md p-1"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-950 text-white flex items-center justify-center font-bold tracking-tight text-sm shadow-xs group-hover:bg-blue-600 transition-colors">
            IM
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-slate-950 leading-tight">
              IMPACTA
            </span>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider -mt-0.5">
              Accident Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-blue-600 font-semibold bg-blue-50/60"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Triggers */}
        <div className="hidden sm:flex items-center gap-2.5 lg:gap-3">
          {/* Language Selector */}
          <LanguageSelector />

          {/* Sign In Link */}
          <Link
            href="/login"
            className="text-xs font-semibold text-slate-600 hover:text-slate-950 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
          >
            {t.nav.signIn}
          </Link>

          {/* Quiet Insurer access */}
          <Link
            href="/console/login"
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2 py-1.5 rounded-lg transition-colors"
          >
            {t.nav.insurerAccess}
          </Link>

          {/* Primary Consumer Intake CTA */}
          <Link
            href={reportLink}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold tracking-tight bg-slate-950 hover:bg-blue-600 text-white shadow-xs transition-all active:scale-[0.98]"
          >
            <span>{t.nav.reportAccident}</span>
            <ArrowRightIcon size={14} />
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSelector />
          <Link
            href={reportLink}
            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-950 text-white"
          >
            {t.nav.reportAccident.split(" ")[0]}
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-5 py-4 space-y-4 animate-fade-in">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive
                      ? "text-blue-600 font-semibold bg-blue-50"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href={reportLink}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-950 hover:bg-blue-600 text-white text-center flex items-center justify-center gap-1.5"
            >
              <span>{t.nav.reportAccident}</span>
              <ArrowRightIcon size={14} />
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 text-center"
              >
                {t.nav.signIn}
              </Link>
              <Link
                href="/console/login"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 text-center"
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
