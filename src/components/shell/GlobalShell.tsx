"use client";

import React, { useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { ClaimsProvider } from "@/context/ClaimsContext";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { CloseIcon } from "@/components/icons/Icons";

export function GlobalShell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <AuthProvider>
      <ClaimsProvider>
        <div className="flex h-screen w-screen overflow-hidden bg-[#F7F7F6] text-[#0E0F10] font-sans">
          {/* Desktop Left Sidebar */}
          <div className="hidden md:flex h-full flex-shrink-0">
            <Sidebar />
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileNavOpen && (
            <div className="fixed inset-0 z-50 md:hidden flex">
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-[#0E0F10]/50 backdrop-blur-[2px]"
                onClick={() => setMobileNavOpen(false)}
                aria-hidden="true"
              />
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#F7F7F6] z-10 shadow-2xl">
                <div className="absolute top-4 right-4 z-20">
                  <button
                    type="button"
                    onClick={() => setMobileNavOpen(false)}
                    aria-label="Close navigation"
                    className="p-1.5 rounded text-[#666666] hover:text-[#0E0F10]"
                  >
                    <CloseIcon size={18} />
                  </button>
                </div>
                <Sidebar onCloseMobile={() => setMobileNavOpen(false)} />
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
            <Header onOpenMobile={() => setMobileNavOpen(true)} />
            <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8 lg:p-10">
              <div className="max-w-7xl mx-auto w-full">
                {children}
              </div>
            </main>
          </div>
        </div>
      </ClaimsProvider>
    </AuthProvider>
  );
}
