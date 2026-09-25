"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage, LanguageSelector } from "@/context/LanguageContext";
import { ArrowRightIcon } from "@/components/icons/Icons";

export default function ConsoleLoginPage() {
  const router = useRouter();
  const { loginInsurer } = useAuth();
  const { language, t } = useLanguage();
  const isIt = language === "it";

  const handleInsurerSignIn = () => {
    loginInsurer();
    router.push("/console/overview");
  };

  return (
    <div className="min-h-screen bg-[#F7F7F6] text-[#0E0F10] flex flex-col justify-between selection:bg-[#0E0F10] selection:text-white">
      {/* Top Bar with Escape Route */}
      <header className="px-6 sm:px-12 py-6 flex items-center justify-between border-b border-[#E5E5E3] bg-[#F7F7F6]">
        <Link href="/" className="flex items-center gap-3 group" title="Return to Public IMPACTA">
          <span className="text-xl font-black tracking-tight text-[#0E0F10]">IMPACTA</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] pl-3 border-l border-[#E5E5E3] hidden sm:inline">
            {isIt ? "Area Operazioni Sinistri" : "Claims Operations Gate"}
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <LanguageSelector />
          <Link
            href="/"
            className="text-xs font-medium text-[#666666] hover:text-[#0E0F10] transition-colors"
          >
            ← {t("nav.backToImpacta")}
          </Link>
        </div>
      </header>

      {/* Main Integrated Institutional Workspace */}
      <main className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-2xl w-full bg-white border border-[#E5E5E3] rounded-2xl p-8 sm:p-14 space-y-8">
          <div className="space-y-2 pb-6 border-b border-[#E5E5E3]">
            <span className="text-xs font-medium text-[#555555]">
              {isIt ? "Aura Mutua Assicurazioni / Portale Sinistri" : "Aura Mutua Assicurazioni / Claims Portal"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0F10]">
              {t("auth.insurerLoginTitle")}
            </h1>
            <p className="text-sm text-[#666666] leading-relaxed">
              {t("auth.insurerLoginDesc")}
            </p>
          </div>

          {/* Operator Demo Sign-In Card */}
          <div className="p-6 border border-[#E5E5E3] bg-[#F7F7F6] rounded-xl space-y-4">
            <div className="flex items-center justify-between text-xs text-[#666666]">
              <span className="font-medium text-[#555555]">{isIt ? "Sessione dimostrativa" : "Demo Session"}</span>
              <span className="text-emerald-700 font-semibold">{isIt ? "Attiva" : "Active"}</span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="text-[#0E0F10] font-bold">
                {isIt ? "Elena Rostagno — Liquidatore Sinistri" : "Elena Rostagno — Claims Adjuster"}
              </div>
              <div className="text-xs text-[#666666]">
                {isIt ? "Aura Mutua Assicurazioni / Gestione Sinistri" : "Aura Mutua Assicurazioni / Claims Desk"}
              </div>
            </div>
            <button
              type="button"
              onClick={handleInsurerSignIn}
              className="w-full py-3.5 bg-[#0E0F10] text-white text-xs font-semibold rounded-lg hover:bg-[#1A1B1C] transition-colors flex items-center justify-center gap-2"
            >
              <span>{t("auth.loginAsElena")}</span>
              <ArrowRightIcon size={14} />
            </button>
          </div>

          <div className="space-y-3 pt-2 text-xs text-[#555555]">
            <div className="flex justify-between border-b border-[#E5E5E3] pb-2">
              <span>{isIt ? "Ambiente operativo" : "Environment"}</span>
              <span className="text-[#0E0F10] font-medium">{isIt ? "Console liquidazione sinistri" : "Claims desk"}</span>
            </div>
            <div className="flex justify-between border-b border-[#E5E5E3] pb-2">
              <span>{isIt ? "Archivio locale" : "Local storage"}</span>
              <span className="text-[#0E0F10] font-medium">{isIt ? "Attivo nel browser" : "Active in browser"}</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-[#666666]">
            <span>{isIt ? "Sei un assicurato su strada?" : "Roadside policyholder?"}</span>
            <Link href="/login" className="font-semibold text-[#0E0F10] hover:underline">
              {isIt ? "Area Conducente →" : "Driver Workspace Gate →"}
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 sm:px-12 py-4 border-t border-[#E5E5E3] bg-white text-xs text-[#666666] flex items-center justify-between">
        <span>AURA MUTUA ASSICURAZIONI SPA</span>
        <span>CERTIFIED CLAIMS GATE</span>
      </footer>
    </div>
  );
}
