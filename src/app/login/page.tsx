"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage, LanguageSelector } from "@/context/LanguageContext";
import { ArrowRightIcon } from "@/components/icons/Icons";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/app";

  const { loginDriver } = useAuth();
  const { language, t } = useLanguage();
  const isIt = language === "it";

  const [email, setEmail] = useState("john.miller@impacta-demo.eu");
  const [password, setPassword] = useState("••••••••••••");
  const [forgotNotice, setForgotNotice] = useState(false);

  const handleDemoSignIn = () => {
    loginDriver();
    router.push(redirectTarget);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginDriver({ email });
    router.push(redirectTarget);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F6] text-[#0E0F10] flex flex-col justify-between selection:bg-[#0E0F10] selection:text-white">
      {/* Top Bar */}
      <header className="px-6 sm:px-12 py-6 flex items-center justify-between border-b border-[#E5E5E3] bg-[#F7F7F6]">
        <Link href="/" className="flex items-center gap-3 group" title="Return to Public IMPACTA">
          <span className="text-xl font-black tracking-tight text-[#0E0F10]">IMPACTA</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] pl-3 border-l border-[#E5E5E3] hidden sm:inline">
            {isIt ? "Area Conducenti" : "Driver Portal"}
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

      {/* Main Integrated Split */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 w-full">
        {/* Left Column: Full-Height Photographic Field */}
        <div className="hidden lg:block lg:col-span-6 relative bg-[#0E0F10] text-white overflow-hidden">
          <Image
            src="/images/hero-car.jpg"
            alt="Driver vehicle environment"
            fill
            priority
            className="object-cover opacity-70"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F10] via-[#0E0F10]/30 to-transparent p-12 sm:p-16 flex flex-col justify-between">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
              POLICYHOLDER ACCESS GATE
            </div>
            <div className="space-y-4 max-w-lg">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                {isIt
                  ? "La tua sicurezza, prima e dopo l'impatto."
                  : "Your roadside safety, secured and verified."}
              </h2>
              <p className="text-sm text-white/80 font-normal">
                John Miller · Volkswagen Polo (<span className="font-mono">AB 123 CD</span>)
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Directly Integrated Form Field */}
        <div className="lg:col-span-6 flex items-center justify-center p-8 sm:p-16 lg:p-20 bg-white border-l border-[#E5E5E3]">
          <div className="max-w-md w-full space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#666666]">
                {isIt ? "ACCESSO ASSICURATO" : "POLICYHOLDER LOGIN"}
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-[#0E0F10]">
                {t("login.driverTitle")}
              </h1>
              <p className="text-sm text-[#666666] leading-relaxed">
                {t("login.driverSubtitle")}
              </p>
            </div>

            {/* 1-Tap Demo Instant Sign-in */}
            <div className="p-6 border border-[#E5E5E3] bg-[#F7F7F6] rounded-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-[#666666]">
                <span>{isIt ? "Credenziali demo preconfigurate" : "Demo credentials ready"}</span>
                <span className="text-emerald-700 font-bold uppercase">{isIt ? "Attivo" : "Ready"}</span>
              </div>
              <p className="text-xs text-[#0E0F10]">
                {isIt
                  ? "Accedi istantaneamente come assicurato"
                  : "Sign in instantly as policyholder"}{" "}
                <strong>John Miller</strong> (Volkswagen Polo).
              </p>
              <button
                type="button"
                onClick={handleDemoSignIn}
                className="w-full py-3.5 bg-[#0E0F10] text-white text-xs font-semibold rounded-lg hover:bg-[#1A1B1C] transition-colors flex items-center justify-center gap-2"
              >
                <span>{t("login.driverDemoAction")}</span>
                <ArrowRightIcon size={14} />
              </button>
            </div>

            {/* Standard Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#666666]">
                  {t("login.emailLabel")}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-[#E5E5E3] rounded-lg bg-white text-[#0E0F10] text-xs focus:outline-none focus:border-[#0E0F10] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-medium text-[#666666]">
                    {t("login.passwordLabel")}
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotNotice(true)}
                    className="text-xs text-[#666666] hover:text-[#0E0F10] underline"
                  >
                    {t("login.forgotPassword")}
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-[#E5E5E3] rounded-lg bg-white text-[#0E0F10] text-xs focus:outline-none focus:border-[#0E0F10] transition-colors font-mono"
                />
              </div>

              {forgotNotice && (
                <div className="p-3 border border-[#E5E5E3] bg-[#F7F7F6] rounded-lg text-xs text-[#666666]">
                  {isIt ? "Modalità demo: Usa il pulsante di accesso rapido sopra." : "Demo mode: Use the 1-Tap Demo button above."}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 border border-[#E5E5E3] bg-white text-[#0E0F10] hover:bg-[#F7F7F6] text-xs font-semibold rounded-lg transition-colors"
              >
                {t("login.submitDriver")}
              </button>
            </form>

            <div className="pt-4 border-t border-[#E5E5E3] flex items-center justify-between text-xs text-[#666666]">
              <span>{isIt ? "Sei un perito assicurativo?" : "Insurance adjuster?"}</span>
              <Link href="/console/login" className="font-semibold text-[#0E0F10] hover:underline">
                {isIt ? "Accedi alla Console →" : "Claims Console Gate →"}
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="px-6 sm:px-12 py-4 border-t border-[#E5E5E3] bg-white text-xs font-medium text-[#666666] flex items-center justify-between">
        <span>IMPACTA LABS MILANO</span>
        <span>BROWSER LOCAL PERSISTENCE</span>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F7F6]" />}>
      <LoginForm />
    </Suspense>
  );
}
