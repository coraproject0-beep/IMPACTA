"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ClaimsProvider } from "@/context/ClaimsContext";
import { DriverDraftProvider } from "@/context/DriverDraftContext";
import { LanguageProvider, useLanguage, LanguageSelector } from "@/context/LanguageContext";
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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      <OfflineNotice />

      {/* Top Brand & Navigation Header (hidden during report) */}
      {!isReporting && (
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 md:px-8 py-3 select-none">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
            {/* Left: Brand Logo explicitly linking to PUBLIC HOME (/) */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                title="Return to Public IMPACTA website"
              >
                <div className="w-7 h-7 rounded bg-slate-900 text-white flex items-center justify-center font-bold tracking-wider text-xs shadow-xs group-hover:bg-blue-600 transition-colors">
                  IM
                </div>
                <div>
                  <span className="text-sm font-extrabold tracking-tight text-slate-950">
                    IMPACTA
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal ml-1.5 hidden sm:inline">
                    Driver
                  </span>
                </div>
              </Link>

              {/* Explicit Back to Public action */}
              <Link
                href="/"
                className="hidden lg:inline-flex text-xs font-semibold text-slate-500 hover:text-slate-900 px-2 py-1 rounded hover:bg-slate-100 transition-colors"
              >
                {t.nav.backToImpacta}
              </Link>
            </div>

            {/* Center: Desktop Navigation Tabs (5 Items) */}
            <DriverNavigation variant="desktop" />

            {/* Right: Language Selector & Quick Profile/Logout */}
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <Link
                href="/app/profile"
                className="hidden sm:inline-flex items-center gap-1.5 py-1 px-2 text-xs font-semibold text-slate-700 hover:text-slate-950 rounded-lg hover:bg-slate-100 transition-colors"
                title="Account and settings"
              >
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">
                  MB
                </div>
                <span className="max-w-[100px] truncate">{driverUser?.name || "Matteo"}</span>
              </Link>
            </div>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main
        className={`flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 flex flex-col ${
          !isReporting ? "pb-20 md:pb-8" : ""
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
    <LanguageProvider>
      <AuthProvider>
        <ClaimsProvider>
          <DriverDraftProvider>
            <DriverLayoutContent>{children}</DriverLayoutContent>
          </DriverDraftProvider>
        </ClaimsProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
