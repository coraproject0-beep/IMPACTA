"use client";

import React, { useState, useEffect } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll for header background transitions
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  // On homepage over dark hero, use dark theme header. When scrolled or on subpages, transition to daylight theme
  const isTransparentDark = isHome && !isScrolled;

  const navItems = [
    { label: t("nav.platform"), href: "/platform" },
    { label: t("nav.drivers"), href: "/drivers" },
    { label: t("nav.insurers"), href: "/insurers" },
    { label: t("nav.technology"), href: "/technology" },
  ];

  const reportLink = isDriverAuthenticated ? "/app/report" : "/login?redirect=/app/report";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 select-none transition-all duration-500 ${
          isTransparentDark
            ? "bg-transparent text-white border-b border-transparent"
            : "bg-[#F4F5F3]/95 backdrop-blur-md text-[#090A0A] border-b border-[#D7D9D8]"
        }`}
      >
        <div className="w-full px-6 sm:px-12 lg:px-20 h-20 lg:h-24 flex items-center justify-between">
          {/* Left: Engineered Wordmark */}
          <div className="w-1/4 flex items-center">
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none"
              title="IMPACTA Home"
            >
              <span className="text-xl lg:text-2xl font-black tracking-[-0.03em] uppercase">
                IMPACTA
              </span>
              <span
                className={`hidden xl:inline text-xs font-mono tracking-widest uppercase pl-3 border-l ${
                  isTransparentDark ? "border-white/30 text-white/50" : "border-[#D7D9D8] text-[#6F7375]"
                }`}
              >
                Accident Intelligence
              </span>
            </Link>
          </div>

          {/* Center: Spacious Navigation with Wide Gaps */}
          <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-12 flex-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm lg:text-[15px] font-medium tracking-wider uppercase transition-colors min-h-[44px] inline-flex items-center ${
                    isActive
                      ? isTransparentDark
                        ? "text-white font-semibold"
                        : "text-[#090A0A] font-semibold"
                      : isTransparentDark
                      ? "text-white/70 hover:text-white"
                      : "text-[#6F7375] hover:text-[#090A0A]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Language, Access, and Primary CTA */}
          <div className="hidden sm:flex items-center justify-end gap-6 lg:gap-8 w-1/3">
            {/* Language Selector */}
            <div className={isTransparentDark ? "text-white" : "text-[#090A0A]"}>
              <LanguageSelector />
            </div>

            {/* Sign In Trigger */}
            <Link
              href="/login"
              className={`text-sm font-medium tracking-wider uppercase transition-colors min-h-[44px] inline-flex items-center ${
                isTransparentDark
                  ? "text-white/70 hover:text-white"
                  : "text-[#6F7375] hover:text-[#090A0A]"
              }`}
            >
              {t("nav.signIn")}
            </Link>

            {/* Primary Action Button (Ghost on Dark, Solid on Light) */}
            <Link
              href={reportLink}
              className={`inline-flex items-center gap-2 px-6 py-2.5 text-xs lg:text-sm font-semibold tracking-wider uppercase transition-all min-h-[44px] ${
                isTransparentDark
                  ? "bg-white text-[#090A0A] hover:bg-[#F4F5F3]"
                  : "bg-[#090A0A] text-white hover:bg-[#171819]"
              }`}
            >
              <span>{t("nav.reportAccident")}</span>
              <ArrowRightIcon size={15} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <LanguageSelector />
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`p-2 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                isTransparentDark ? "text-white hover:text-white/75" : "text-[#090A0A] hover:text-[#6F7375]"
              }`}
              aria-label="Open Navigation Menu"
            >
              <MenuIcon size={26} />
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN MOBILE TAKEOVER MENU (No nested cards, clean list) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#090A0A] text-white flex flex-col justify-between px-8 py-10 animate-in fade-in duration-300">
          {/* Header row in takeover */}
          <div className="flex items-center justify-between w-full border-b border-white/15 pb-6">
            <span className="text-2xl font-black tracking-tight uppercase">IMPACTA</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white/70 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close menu"
            >
              <CloseIcon size={28} />
            </button>
          </div>

          {/* Nav items list with large typography */}
          <div className="flex flex-col gap-6 my-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl sm:text-4xl font-bold tracking-tight uppercase text-white hover:text-white/70 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/safety"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-semibold tracking-tight uppercase text-white/60 hover:text-white transition-colors"
            >
              {t("nav.safety")}
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-semibold tracking-tight uppercase text-white/60 hover:text-white transition-colors"
            >
              {t("footer.contact")}
            </Link>
          </div>

          {/* Action Row at Bottom of Mobile Menu */}
          <div className="space-y-4 pt-6 border-t border-white/15">
            <Link
              href={reportLink}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full min-h-[56px] flex items-center justify-center bg-white text-[#090A0A] font-bold text-sm tracking-wider uppercase"
            >
              {t("nav.reportAccident")}
            </Link>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[48px] flex items-center justify-center border border-white/30 text-white font-medium text-xs tracking-wider uppercase hover:border-white"
              >
                {t("nav.signIn")}
              </Link>
              <Link
                href="/console/login"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[48px] flex items-center justify-center border border-white/30 text-white/70 font-medium text-xs tracking-wider uppercase hover:border-white"
              >
                {t("nav.insurerAccess")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
