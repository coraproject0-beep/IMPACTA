"use client";

import React, { useEffect } from "react";
import { ClaimsProvider } from "@/context/ClaimsContext";
import { DriverDraftProvider } from "@/context/DriverDraftContext";
import { OfflineNotice } from "@/features/driver/components/OfflineNotice";
import { InstallPrompt } from "@/features/driver/components/InstallPrompt";

export default function DriverLayout({ children }: { children: React.ReactNode }) {
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
        <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans antialiased">
          <OfflineNotice />
          <div className="flex-1 w-full max-w-lg mx-auto bg-white min-h-screen sm:min-h-[92vh] sm:my-4 sm:rounded-xl sm:border sm:border-slate-200 sm:shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 sm:p-6 flex-1 flex flex-col">
              <InstallPrompt />
              {children}
            </div>
          </div>
        </div>
      </DriverDraftProvider>
    </ClaimsProvider>
  );
}
