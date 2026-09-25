"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { MenuIcon, CloseIcon } from "@/components/icons/Icons";

export function PublicHeader() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLanguage();
  const { isDriverAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const isDarkHero = isHome && !isScrolled;

  const reportLink = isDriverAuthenticated ? "/app/report" : "/login?redirect=/app/report";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 select-none transition-colors duration-300 ${
          isDarkHero
            ? "bg-transparent text-white"
            : "bg-[#F7F7F6]/95 backdrop-blur-md text-[#0E0F10] border-b border-[#E5E5E3]"
        }`}
      >
        <div className="w-full px-8 sm:px-12 lg:px-20 h-20 lg:h-[76px] flex items-center justify-between">
          {/* Left: Brand Wordmark */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-lg lg:text-xl font-bold tracking-[0.08em] uppercase focus:outline-none"
              title="IMPACTA Home"
            >
              IMPACTA
            </Link>
          </div>

          {/* Center-Left: Quiet, spacious text-only navigation matching public-brand-reference.png */}
          <nav className="hidden md:flex items-center gap-10 lg:gap-14">
            <Link
              href="/platform"
              className={`text-sm lg:text-[15px] font-normal tracking-normal transition-colors ${
                isDarkHero ? "text-white/90 hover:text-white" : "text-[#666666] hover:text-[#0E0F10]"
              }`}
            >
              {t("nav.platform")}
            </Link>
            <Link
              href="/drivers"
              className={`text-sm lg:text-[15px] font-normal tracking-normal transition-colors ${
                isDarkHero ? "text-white/90 hover:text-white" : "text-[#666666] hover:text-[#0E0F10]"
              }`}
            >
              {t("nav.drivers")}
            </Link>
            <Link
              href="/insurers"
              className={`text-sm lg:text-[15px] font-normal tracking-normal transition-colors ${
                isDarkHero ? "text-white/90 hover:text-white" : "text-[#666666] hover:text-[#0E0F10]"
              }`}
            >
              {t("nav.insurers")}
            </Link>
          </nav>

          {/* Right: EN / IT, Sign in, Report accident matching public-brand-reference.png */}
          <div className="hidden sm:flex items-center gap-8 lg:gap-12">
            {/* Plain text EN / IT switcher */}
            <button
              type="button"
              onClick={() => setLocale(locale === "en" ? "it" : "en")}
              className={`text-xs sm:text-sm tracking-wider font-mono uppercase transition-colors ${
                isDarkHero ? "text-white/80 hover:text-white" : "text-[#444444] hover:text-[#0E0F10]"
              }`}
              title="Toggle language English / Italiano"
            >
              <span
                className={
                  locale === "en"
                    ? isDarkHero
                      ? "font-bold text-white"
                      : "font-bold text-[#0E0F10]"
                    : isDarkHero
                    ? "opacity-50 text-white"
                    : "opacity-50 text-[#555555]"
                }
              >
                EN
              </span>
              <span className={`mx-1 ${isDarkHero ? "opacity-40 text-white" : "opacity-40 text-[#0E0F10]"}`}>
                /
              </span>
              <span
                className={
                  locale === "it"
                    ? isDarkHero
                      ? "font-bold text-white"
                      : "font-bold text-[#0E0F10]"
                    : isDarkHero
                    ? "opacity-50 text-white"
                    : "opacity-50 text-[#555555]"
                }
              >
                IT
              </span>
            </button>

            {/* Sign in */}
            <Link
              href="/login"
              className={`text-xs sm:text-sm font-normal tracking-normal transition-colors ${
                isDarkHero ? "text-white/90 hover:text-white" : "text-[#555555] hover:text-[#0E0F10]"
              }`}
            >
              {t("nav.signIn")}
            </Link>

            {/* Report accident - plain text link matching reference */}
            <Link
              href={reportLink}
              className={`text-xs sm:text-sm font-medium tracking-normal transition-colors ${
                isDarkHero ? "text-white hover:text-white/80" : "text-[#0E0F10] hover:text-[#555555]"
              }`}
            >
              {t("nav.reportAccident")}
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-4">
            <button
              type="button"
              onClick={() => setLocale(locale === "en" ? "it" : "en")}
              className={`text-xs font-mono tracking-wider uppercase ${
                isDarkHero ? "text-white" : "text-[#0E0F10]"
              }`}
            >
              <span
                className={
                  locale === "en"
                    ? isDarkHero
                      ? "font-bold text-white"
                      : "font-bold text-[#0E0F10]"
                    : isDarkHero
                    ? "opacity-50 text-white"
                    : "opacity-50 text-[#555555]"
                }
              >
                EN
              </span>
              <span className={`mx-0.5 ${isDarkHero ? "opacity-40 text-white" : "opacity-40 text-[#0E0F10]"}`}>
                /
              </span>
              <span
                className={
                  locale === "it"
                    ? isDarkHero
                      ? "font-bold text-white"
                      : "font-bold text-[#0E0F10]"
                    : isDarkHero
                    ? "opacity-50 text-white"
                    : "opacity-50 text-[#555555]"
                }
              >
                IT
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 transition-colors focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              <MenuIcon size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0E0F10] text-white flex flex-col justify-between p-8 sm:p-12 animate-in fade-in duration-200">
          <div className="flex items-center justify-between w-full border-b border-white/10 pb-6">
            <span className="text-xl font-bold tracking-[0.06em] uppercase">IMPACTA</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white/70 hover:text-white"
              aria-label="Close menu"
            >
              <CloseIcon size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-6 my-auto">
            <Link
              href="/platform"
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-bold tracking-tight text-white hover:text-white/70 transition-colors"
            >
              {t("nav.platform")}
            </Link>
            <Link
              href="/drivers"
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-bold tracking-tight text-white hover:text-white/70 transition-colors"
            >
              {t("nav.drivers")}
            </Link>
            <Link
              href="/insurers"
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-bold tracking-tight text-white hover:text-white/70 transition-colors"
            >
              {t("nav.insurers")}
            </Link>
            <Link
              href={reportLink}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-medium text-white/90 hover:text-white pt-4 border-t border-white/10"
            >
              {t("nav.reportAccident")}
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-normal text-white/60 hover:text-white"
            >
              {t("nav.signIn")}
            </Link>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
            <span>IMPACTA MOBILITY INTELLIGENCE</span>
            <span className="font-mono">EN / IT</span>
          </div>
        </div>
      )}
    </>
  );
}
