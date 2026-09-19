"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSelector } from "@/context/LanguageContext";
import { ArrowRightIcon, ShieldCheckIcon } from "@/components/icons/Icons";

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
        <Link href="/" className="flex items-center gap-2 group" title="Return to Public IMPACTA corporate website">
          <div className="w-8 h-8 rounded-lg bg-slate-950 text-white flex items-center justify-center font-bold tracking-wider text-xs group-hover:bg-blue-600 transition-colors">
            IM
          </div>
          <span className="text-base font-extrabold tracking-tight text-slate-950">
            IMPACTA
          </span>
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

      {/* Main Split Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-10 sm:py-16">
        <div className="max-w-4xl w-full grid md:grid-cols-12 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Left Column: Visual & Context in Light Aesthetic */}
          <div className="md:col-span-5 relative hidden md:flex flex-col justify-between bg-slate-100 p-8 border-r border-slate-200">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 shadow-xs mb-6">
              <Image
                src="/images/hero-car.jpg"
                alt="Volkswagen Golf VIII on European roadway"
                fill
                priority
                className="object-cover"
                sizes="380px"
              />
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-blue-700 font-bold mb-1.5">
                  Consumer Driver Experience
                </p>
                <h3 className="text-2xl font-bold tracking-tight text-slate-950 leading-snug">
                  Precision roadside assistance &amp; evidence intake.
                </h3>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-200 text-sm text-slate-600">
                <div className="flex items-center gap-2 font-medium text-slate-900">
                  <ShieldCheckIcon size={18} className="text-blue-700 shrink-0" />
                  <span>Volkswagen Golf VIII • GF492XP</span>
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  Policy: Aura Mutua Assicurazioni (AUR-8921-00412)
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sign In Form */}
          <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
            <div className="space-y-3 mb-8">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
                Driver Authentication
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight">
                {t.auth.driverLoginTitle}
              </h1>
              <p className="text-base text-slate-600 leading-relaxed">
                {t.auth.driverLoginSubtitle}
              </p>
            </div>

            {/* Instant Demo Account Button */}
            <div className="mb-8">
              <button
                type="button"
                onClick={handleDemoSignIn}
                className="w-full py-4 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-base font-bold shadow-xs transition-colors flex items-center justify-center gap-2 min-h-[52px]"
              >
                <span>{t.auth.demoDriverButton}</span>
                <ArrowRightIcon size={18} />
              </button>
              <span className="text-xs text-slate-500 text-center block mt-2.5">
                {t.auth.demoSessionNotice}
              </span>
            </div>

            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-xs uppercase tracking-wider text-slate-400 font-mono">
                {t.auth.orSignInWithEmail}
              </span>
            </div>

            {/* Standard Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="driver-email"
                  className="block text-sm font-semibold text-slate-800 mb-1.5"
                >
                  {t.auth.emailLabel}
                </label>
                <input
                  id="driver-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[46px]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="driver-password"
                    className="block text-sm font-semibold text-slate-800"
                  >
                    {t.auth.passwordLabel}
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotNotice(!forgotNotice)}
                    className="text-xs text-blue-700 hover:underline font-medium"
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
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[46px]"
                />
              </div>

              {forgotNotice && (
                <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs sm:text-sm text-blue-950 space-y-1">
                  <p className="font-semibold">{t.auth.forgotPasswordNotice}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-base font-bold transition-colors min-h-[48px]"
              >
                {t.auth.signInButton}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-5 text-center border-t border-slate-200/80 text-xs sm:text-sm text-slate-500">
        <p>© 2026 IMPACTA Mobility • {t.footer.academicNotice}</p>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-sm text-slate-500">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
