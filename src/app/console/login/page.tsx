"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSelector } from "@/context/LanguageContext";
import { ArrowRightIcon, LayersIcon } from "@/components/icons/Icons";

export default function ConsoleLoginPage() {
  const router = useRouter();
  const { loginInsurer } = useAuth();
  const { t } = useLanguage();

  const handleInsurerSignIn = () => {
    loginInsurer();
    router.push("/console/overview");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-blue-100 selection:text-blue-900">
      {/* Top Bar */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 group" title="Return to Public IMPACTA corporate website">
          <div className="w-8 h-8 rounded-lg bg-slate-950 text-white flex items-center justify-center font-bold tracking-wider text-xs shadow-xs group-hover:bg-blue-600 transition-colors">
            IM
          </div>
          <div>
            <span className="text-base font-extrabold tracking-tight text-slate-950">
              IMPACTA
            </span>
            <span className="text-xs text-slate-500 font-medium ml-2">
              Claims Operations
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <Link
            href="/"
            className="text-sm font-semibold text-slate-600 hover:text-slate-950 transition-colors"
          >
            {t.nav.backToImpacta}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="max-w-lg w-full bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <LayersIcon size={24} />
            </div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
              {t.auth.insurerOrg}
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight">
              {t.auth.insurerLoginTitle}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {t.auth.insurerLoginSubtitle}
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-sm space-y-3">
            <div className="flex items-center justify-between text-slate-600 font-medium">
              <span>Authorized Adjuster</span>
              <span className="font-bold text-slate-900">Elena Rostagno</span>
            </div>
            <div className="flex items-center justify-between text-slate-600 font-medium">
              <span>Department</span>
              <span className="text-slate-900 font-medium">Claims Operations</span>
            </div>
            <div className="flex items-center justify-between text-slate-600 font-medium pt-2 border-t border-slate-200">
              <span>Jurisdiction</span>
              <span className="text-slate-900 font-mono">Florence / Tuscany (IT)</span>
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="button"
              onClick={handleInsurerSignIn}
              className="w-full py-4 px-6 bg-slate-950 hover:bg-blue-600 text-white rounded-xl text-base font-bold shadow-xs transition-colors flex items-center justify-center gap-2 min-h-[52px]"
            >
              <span>{t.auth.insurerDemoButton}</span>
              <ArrowRightIcon size={18} />
            </button>
            <p className="text-xs text-slate-500 text-center leading-relaxed">
              {t.auth.demoSessionNotice}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-5 text-center border-t border-slate-200/80 text-xs sm:text-sm text-slate-500">
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="hover:text-slate-950 font-medium">IMPACTA Home</Link>
          <span>•</span>
          <Link href="/privacy" className="hover:text-slate-950 font-medium">Privacy Policy</Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-slate-950 font-medium">Terms of Use</Link>
        </div>
      </footer>
    </div>
  );
}
