"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClaimsProvider } from "@/context/ClaimsContext";
import { DriverDraftProvider } from "@/context/DriverDraftContext";
import { OfflineNotice } from "@/features/driver/components/OfflineNotice";
import { InstallPrompt } from "@/features/driver/components/InstallPrompt";
import { DriverNavigation } from "@/features/driver/components/DriverNavigation";

export default function DriverLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
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
    <ClaimsProvider>
      <DriverDraftProvider>
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
          <OfflineNotice />

          {/* Top Brand & Navigation Header (hidden during report) */}
          {!isReporting && (
            <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 md:px-8 py-3 select-none">
              <div className="max-w-5xl mx-auto flex items-center justify-between">
                <Link
                  href="/app"
                  className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                >
                  <div className="w-7 h-7 rounded bg-slate-900 text-white flex items-center justify-center font-bold tracking-wider text-xs shadow-xs group-hover:bg-blue-600 transition-colors">
                    IM
                  </div>
                  <div>
                    <span className="text-sm font-bold tracking-tight text-slate-950">
                      IMPACTA
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal ml-1.5 hidden sm:inline">
                      Driver
                    </span>
                  </div>
                </Link>

                <DriverNavigation />
              </div>
            </header>
          )}

          {/* Main Content Area */}
          <main className={`flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 flex flex-col ${!isReporting ? "pb-20 md:pb-8" : ""}`}>
            <InstallPrompt />
            {children}
          </main>

          {/* Mobile Bottom Navigation */}
          <DriverNavigation />
        </div>
      </DriverDraftProvider>
    </ClaimsProvider>
  );
}
