"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ClaimsProvider } from "@/context/ClaimsContext";
import { DriverDraftProvider } from "@/context/DriverDraftContext";
import { useLanguage, LanguageSelector } from "@/context/LanguageContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { OfflineNotice } from "@/features/driver/components/OfflineNotice";
import { InstallPrompt } from "@/features/driver/components/InstallPrompt";
import { DriverNavigation } from "@/features/driver/components/DriverNavigation";

function DriverLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();
  const { isDriverAuthenticated, logoutDriver, driverUser } = useAuth();
  const isReporting = pathname === "/app/report";

  useEffect(() => {
    // Register Service Worker in browser
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch((err) => {
        console.warn("Service worker registration failed", err);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F7F6] text-[#0E0F10] flex flex-col font-sans antialiased selection:bg-[#0E0F10] selection:text-white">
      <OfflineNotice />

      {/* Top Brand & Navigation Header (hidden during report) */}
      {!isReporting && (
        <header className="sticky top-0 z-30 bg-[#F7F7F6]/95 backdrop-blur-md border-b border-[#E5E5E3] px-6 py-2.5 sm:py-3 select-none">
          <div className="max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Left: Brand Logo explicitly linking to PUBLIC HOME (/) */}
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 group focus:outline-none"
                title="Return to Public IMPACTA website"
              >
                <span className="text-lg font-black tracking-tight uppercase text-[#0E0F10]">
                  IMPACTA
                </span>
              </Link>

              {/* Explicit Back to Public action */}
              <Link
                href="/"
                className="hidden lg:inline-flex items-center gap-1.5 text-xs font-medium text-[#666666] hover:text-[#0E0F10] transition-colors"
              >
                <span>←</span>
                <span>{t("nav.backToImpacta")}</span>
              </Link>
            </div>

            {/* Center: Desktop Navigation Tabs */}
            <DriverNavigation variant="desktop" />

            {/* Right: Language Selector & Quick Profile/Logout */}
            <div className="flex items-center gap-3">
              <LanguageSelector />
              <Link
                href="/app/profile"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#E5E5E3] bg-white text-[#0E0F10] hover:border-[#0E0F10] transition-colors"
                title="Account and settings"
              >
                <span className="text-xs font-semibold">L</span>
              </Link>
            </div>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main
        className={`flex-1 w-full max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-10 flex flex-col ${
          !isReporting ? "pb-24 md:pb-12" : ""
        }`}
      >
        <InstallPrompt />
        {children}
      </main>

      {/* Mobile Bottom Navigation (3 items) */}
      <DriverNavigation variant="mobile" />
    </div>
  );
}

export default function DriverLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ClaimsProvider>
        <DriverDraftProvider>
          <DriverLayoutContent>{children}</DriverLayoutContent>
        </DriverDraftProvider>
      </ClaimsProvider>
    </AuthProvider>
  );
}
