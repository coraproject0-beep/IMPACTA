"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSelector } from "@/context/LanguageContext";
import { ShieldCheckIcon, ArrowRightIcon, LayersIcon } from "@/components/icons/Icons";

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
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded bg-blue-700 text-white flex items-center justify-center font-bold tracking-wider text-xs shadow-xs">
            IM
          </div>
          <div>
            <span className="text-sm font-bold tracking-tight text-slate-950">
              IMPACTA
            </span>
            <span className="text-[11px] text-slate-400 font-normal ml-1.5">
              Console
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <Link
            href="/"
            className="text-xs font-semibold text-slate-600 hover:text-slate-950 transition-colors"
          >
            {t.nav.backToImpacta}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center mb-2">
              <LayersIcon size={24} />
            </div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
              {t.auth.insurerOrg}
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              {t.auth.insurerLoginTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.auth.insurerLoginSubtitle}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 font-medium">
              <span>Authorized Adjuster</span>
              <span className="font-semibold text-slate-800">Elena Rostagno</span>
            </div>
            <div className="flex items-center justify-between text-slate-500 font-medium">
              <span>Department</span>
              <span className="text-slate-800 font-medium">Claims Operations</span>
            </div>
            <div className="flex items-center justify-between text-slate-500 font-medium pt-1 border-t border-slate-200/80">
              <span>Jurisdiction</span>
              <span className="text-slate-800 font-mono">Florence / Tuscany (IT)</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleInsurerSignIn}
              className="w-full py-3.5 px-4 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>{t.auth.insurerDemoButton}</span>
              <ArrowRightIcon size={16} />
            </button>
            <span className="text-[11px] text-slate-400 text-center block">
              {t.auth.demoSessionNotice}
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 text-center border-t border-slate-200/60 text-xs text-slate-400">
        <p>© 2026 IMPACTA Claims Operations • {t.footer.academicNotice}</p>
      </footer>
    </div>
  );
}
