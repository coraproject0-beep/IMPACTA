"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, CloseIcon, ArrowRightIcon } from "@/components/icons/Icons";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Platform", href: "/platform" },
  { label: "Drivers", href: "/drivers" },
  { label: "Insurers", href: "/insurers" },
  { label: "Technology", href: "/technology" },
  { label: "Safety", href: "/safety" },
];

export function PublicHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md p-1"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-950 text-white flex items-center justify-center font-bold tracking-tight text-sm shadow-xs group-hover:bg-blue-600 transition-colors">
            IM
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-slate-950 leading-tight">
              IMPACTA
            </span>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider -mt-0.5">
              Accident Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_ITEMS.map((item) => {
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
        <div className="hidden sm:flex items-center gap-3">
          {/* Professional access route (quiet) */}
          <Link
            href="/console"
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <span>Insurer access</span>
            <span className="text-slate-400 ml-1">→</span>
          </Link>

          {/* Primary Consumer Intake CTA */}
          <Link
            href="/app"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold tracking-tight bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all active:scale-[0.98]"
          >
            <span>Report an accident</span>
            <ArrowRightIcon size={14} />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/app"
            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white"
          >
            Report
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
        <div className="md:hidden bg-white border-b border-slate-200 px-5 py-4 space-y-3 animate-fade-in">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
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
              href="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white text-center flex items-center justify-center gap-1.5"
            >
              <span>Report an accident</span>
              <ArrowRightIcon size={14} />
            </Link>
            <Link
              href="/console"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 text-center"
            >
              Insurer access →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
