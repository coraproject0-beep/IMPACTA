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

  const [email, setEmail] = useState("matteo.bianchi@impacta-demo.eu");
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
    <div className="min-h-screen bg-[#F4F5F3] text-[#090A0A] flex flex-col justify-between">
      {/* Top Bar with Escape Route */}
      <header className="px-6 sm:px-12 py-6 flex items-center justify-between border-b border-[#D7D9D8] bg-[#F4F5F3]">
        <Link href="/" className="flex items-center gap-3 group" title="Return to Public IMPACTA">
          <span className="text-xl font-black tracking-tight uppercase">IMPACTA</span>
          <span className="text-xs font-mono uppercase tracking-widest text-[#6F7375] pl-3 border-l border-[#D7D9D8] hidden sm:inline">
            DRIVER PORTAL
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

      {/* Full-Viewport Integrated Split (NO centered floating card) */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 w-full">
        {/* Left Column: Full-Height Photographic Field */}
        <div className="hidden lg:block lg:col-span-6 relative bg-[#090A0A] text-white overflow-hidden">
          <Image
            src="/images/hero-car.jpg"
            alt="Driver vehicle environment"
            fill
            priority
            className="object-cover opacity-60"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090A0A] via-[#090A0A]/40 to-transparent p-12 sm:p-16 flex flex-col justify-between">
            <div className="text-xs font-mono uppercase tracking-widest text-white/50">
              POLICYHOLDER ACCESS GATE
            </div>
            <div className="space-y-4 max-w-lg">
              <h2 className="text-4xl font-bold uppercase tracking-tight text-white leading-tight">
                {language === "it"
                  ? "La tua sicurezza, prima e dopo l'impatto."
                  : "Your roadside safety, secured and verified."}
              </h2>
              <p className="text-sm font-mono text-white/70">
                Matteo Bianchi • Volkswagen Golf VIII (GF492XP)
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Directly Integrated Form Field */}
        <div className="lg:col-span-6 flex items-center justify-center p-8 sm:p-16 lg:p-24 bg-white border-l border-[#D7D9D8]">
          <div className="max-w-md w-full space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#6F7375]">
                AUTHENTICATION
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#090A0A]">
                {t("login.driverTitle")}
              </h1>
              <p className="text-sm text-[#6F7375] leading-relaxed">
                {t("login.driverSubtitle")}
              </p>
            </div>

            {/* 1-Tap Demo Instant Sign-in */}
            <div className="p-6 border border-[#090A0A] bg-[#F4F5F3] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#6F7375]">
                <span>DEMO CREDENTIALS</span>
                <span className="text-emerald-700 font-bold uppercase">READY</span>
              </div>
              <p className="text-xs font-mono text-[#090A0A]">
                Sign in instantly as policyholder <strong>Matteo Bianchi</strong>.
              </p>
              <button
                type="button"
                onClick={handleDemoSignIn}
                className="w-full min-h-[48px] bg-[#090A0A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#171819] transition-colors flex items-center justify-center gap-2"
              >
                <span>{t("login.driverDemoAction")}</span>
                <ArrowRightIcon size={14} />
              </button>
            </div>

            {/* Standard Form */}
            <form onSubmit={handleSubmit} className="space-y-5 pt-2">
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#6F7375]">
                  {t("login.emailLabel")}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full min-h-[50px] px-4 border border-[#D7D9D8] bg-white text-[#090A0A] text-sm focus:outline-none focus:border-[#090A0A] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#6F7375]">
                    {t("login.passwordLabel")}
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotNotice(true)}
                    className="text-xs font-mono uppercase text-[#6F7375] hover:text-[#090A0A] underline"
                  >
                    {t("login.forgotPassword")}
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full min-h-[50px] px-4 border border-[#D7D9D8] bg-white text-[#090A0A] text-sm focus:outline-none focus:border-[#090A0A] transition-colors"
                />
              </div>

              {forgotNotice && (
                <div className="p-3 border border-[#D7D9D8] bg-[#F4F5F3] text-xs font-mono text-[#6F7375]">
                  Demo mode: Use the 1-Tap Demo button above.
                </div>
              )}

              <button
                type="submit"
                className="w-full min-h-[52px] border border-[#090A0A] bg-white text-[#090A0A] text-xs font-bold uppercase tracking-wider hover:bg-[#F4F5F3] transition-colors"
              >
                {t("login.submitDriver")}
              </button>
            </form>

            <div className="pt-4 border-t border-[#D7D9D8] flex items-center justify-between text-xs font-mono text-[#6F7375]">
              <span>INSURANCE ADJUSTER?</span>
              <Link href="/console/login" className="font-bold text-[#090A0A] hover:underline uppercase">
                Claims Console Gate →
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Legal Footer */}
      <footer className="px-6 sm:px-12 py-4 border-t border-[#D7D9D8] bg-white text-xs font-mono text-[#6F7375] flex items-center justify-between">
        <span>IMPACTA LABS MILANO</span>
        <span>BROWSER LOCAL PERSISTENCE</span>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F4F5F3]" />}>
      <LoginForm />
    </Suspense>
  );
}
