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

  const handleInsurerSignIn = () => {
    loginInsurer();
    router.push("/console/overview");
  };

  return (
    <div className="min-h-screen bg-[#F4F5F3] text-[#090A0A] flex flex-col justify-between">
      {/* Top Bar with Escape Route */}
      <header className="px-6 sm:px-12 py-6 flex items-center justify-between border-b border-[#D7D9D8] bg-[#F4F5F3]">
        <Link href="/" className="flex items-center gap-3 group" title="Return to Public IMPACTA">
          <span className="text-xl font-black tracking-tight uppercase">IMPACTA</span>
          <span className="text-xs font-mono uppercase tracking-widest text-[#6F7375] pl-3 border-l border-[#D7D9D8] hidden sm:inline">
            CLAIMS OPERATIONS GATE
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <LanguageSelector />
          <Link
            href="/"
            className="text-xs font-mono font-bold uppercase tracking-wider text-[#6F7375] hover:text-[#090A0A] transition-colors"
          >
            ← {t("nav.backToImpacta")}
          </Link>
        </div>
      </header>

      {/* Main Integrated Institutional Workspace */}
      <main className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-2xl w-full bg-white border border-[#D7D9D8] p-8 sm:p-16 space-y-8">
          <div className="space-y-2 pb-6 border-b border-[#D7D9D8]">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6F7375]">
              CARRIER FORENSIC PORTAL • AURA MUTUA
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#090A0A]">
              {t("auth.insurerLoginTitle")}
            </h1>
            <p className="text-sm text-[#6F7375] leading-relaxed font-light">
              {t("auth.insurerLoginDesc")}
            </p>
          </div>

          {/* Operator Demo Sign-In Card */}
          <div className="p-6 border border-[#090A0A] bg-[#F4F5F3] space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#6F7375]">
              <span>ACTIVE SESSION DEMO</span>
              <span className="text-emerald-700 font-bold uppercase">AUTHORIZED</span>
            </div>
            <div className="space-y-1 text-sm font-mono">
              <div className="text-[#090A0A] font-bold">Elena Rostagno — Senior Forensic Adjuster</div>
              <div className="text-xs text-[#6F7375]">Aura Mutua Assicurazioni • Divisione Sinistri Complessi</div>
            </div>
            <button
              type="button"
              onClick={handleInsurerSignIn}
              className="w-full min-h-[52px] bg-[#090A0A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#171819] transition-colors flex items-center justify-center gap-2"
            >
              <span>{t("auth.loginAsElena")}</span>
              <ArrowRightIcon size={16} />
            </button>
          </div>

          <div className="space-y-3 pt-2 text-xs font-mono text-[#6F7375]">
            <div className="flex justify-between border-b border-[#D7D9D8] pb-2">
              <span>SECURITY PROTOCOL</span>
              <span className="text-[#090A0A]">SAML 2.0 / EN-1022 SIGNED</span>
            </div>
            <div className="flex justify-between border-b border-[#D7D9D8] pb-2">
              <span>LOCAL AUDIT TRAIL</span>
              <span className="text-[#090A0A]">ENABLED (IndexedDB)</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#6F7375]">
            <span>ROADSIDE POLICYHOLDER?</span>
            <Link href="/login" className="font-bold text-[#090A0A] hover:underline uppercase">
              Driver Workspace Gate →
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 sm:px-12 py-4 border-t border-[#D7D9D8] bg-white text-xs font-mono text-[#6F7375] flex items-center justify-between">
        <span>AURA MUTUA ASSICURAZIONI SPA</span>
        <span>CERTIFIED CLAIMS GATE</span>
      </footer>
    </div>
  );
}
