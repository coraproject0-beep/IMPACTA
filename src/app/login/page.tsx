"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSelector } from "@/context/LanguageContext";
import { CheckCircleIcon, ArrowRightIcon, ShieldCheckIcon } from "@/components/icons/Icons";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/app";

  const { loginDriver } = useAuth();
  const { t } = useLanguage();

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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-blue-100 selection:text-blue-900">
      {/* Top Bar */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded bg-slate-900 text-white flex items-center justify-center font-bold tracking-wider text-xs group-hover:bg-blue-600 transition-colors">
            IM
          </div>
          <span className="text-sm font-bold tracking-tight text-slate-950">
            IMPACTA
          </span>
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

      {/* Main Split Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="max-w-4xl w-full grid md:grid-cols-12 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Left Column: Visual & Context */}
          <div className="md:col-span-5 relative hidden md:block bg-slate-900 text-white p-8">
            <Image
              src="/images/hero-car.jpg"
              alt="Volkswagen Golf VIII on road"
              fill
              priority
              className="object-cover opacity-60 mix-blend-luminosity"
              sizes="(max-width: 768px) 0vw, 400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold block mb-2">
                  Consumer Driver Area
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-white leading-snug">
                  Precision roadside assistance &amp; evidence intake.
                </h3>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon size={16} className="text-blue-400 shrink-0" />
                  <span>Volkswagen Golf VIII • GF492XP</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Policy: Aura Mutua Assicurazioni (AUR-8921-00412)
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sign In Form */}
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            <div className="space-y-2 mb-6">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                Driver Authentication
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                {t.auth.driverLoginTitle}
              </h1>
              <p className="text-sm text-slate-600">
                {t.auth.driverLoginSubtitle}
              </p>
            </div>

            {/* Instant Demo Account Button */}
            <div className="mb-6">
              <button
                type="button"
                onClick={handleDemoSignIn}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>{t.auth.demoDriverButton}</span>
                <ArrowRightIcon size={16} />
              </button>
              <span className="text-[11px] text-slate-400 text-center block mt-2">
                {t.auth.demoSessionNotice}
              </span>
            </div>

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                {t.auth.orSignInWithEmail}
              </span>
            </div>

            {/* Standard Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="driver-email"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  {t.auth.emailLabel}
                </label>
                <input
                  id="driver-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="driver-password"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    {t.auth.passwordLabel}
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotNotice(!forgotNotice)}
                    className="text-[11px] text-blue-600 hover:underline"
                  >
                    {t.auth.forgotPasswordText}
                  </button>
                </div>
                <input
                  id="driver-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {forgotNotice && (
                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-1">
                  <p className="font-semibold">{t.auth.forgotPasswordNotice}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
              >
                {t.auth.signInButton}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 text-center border-t border-slate-200/60 text-xs text-slate-400">
        <p>© 2026 IMPACTA Mobility • {t.footer.academicNotice}</p>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs text-slate-400">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
