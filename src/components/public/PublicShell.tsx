"use client";

import React from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { PublicHeader } from "./PublicHeader";
import { PublicFooter } from "./PublicFooter";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen bg-[#F7F7F6] text-[#0E0F10] flex flex-col font-sans antialiased selection:bg-[#0E0F10] selection:text-white">
          <PublicHeader />
          <main className="flex-1 w-full">{children}</main>
          <PublicFooter />
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}
