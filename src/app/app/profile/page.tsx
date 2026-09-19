"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage, LanguageSelector } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useClaims } from "@/context/ClaimsContext";
import { useDriverDraft } from "@/context/DriverDraftContext";
import { SYNTHETIC_DRIVER_PROFILE } from "@/features/driver/data/driverProfileFixture";
import {
  UserIcon,
  ShieldIcon,
  CarIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from "@/components/icons/Icons";

export default function DriverProfilePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { logoutDriver, driverUser } = useAuth();
  const { resetDemoData } = useClaims();
  const { loadDemoIncident } = useDriverDraft();

  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const handleStartDemo = () => {
    loadDemoIncident();
    router.push("/app/report");
  };

  const handleExecuteReset = async () => {
    setIsResetting(true);
    try {
      await resetDemoData();
      setResetSuccess(true);
      setConfirmResetOpen(false);
      setTimeout(() => setResetSuccess(false), 3000);
    } finally {
      setIsResetting(false);
    }
  };

  const handleLogout = () => {
    logoutDriver();
    router.push("/");
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-2 selection:bg-blue-100 selection:text-blue-900">
      {/* Header with Navigation and Logout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
            {t.nav.profile}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 mt-1">
            {driverUser?.name || SYNTHETIC_DRIVER_PROFILE.fullName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Policyholder account credentials, language preferences, and evaluation utilities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="min-h-[44px] px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <span>{t.nav.backToImpacta}</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="min-h-[44px] px-4 py-2 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-800 rounded-xl text-xs font-bold transition-colors"
          >
            {t.nav.logout}
          </button>
        </div>
      </div>

      {/* Language Preference Section */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-950">Interface Language</h2>
          <p className="text-xs text-slate-500">
            Select preferred language for public pages, driver screens, and report wizard.
          </p>
        </div>
        <LanguageSelector />
      </section>

      {/* Policyholder Credentials */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-base shadow-xs">
            MB
          </div>
          <div>
            <div className="text-base font-bold text-slate-900">
              {SYNTHETIC_DRIVER_PROFILE.fullName}
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Fiscal Code: {SYNTHETIC_DRIVER_PROFILE.fiscalCode}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[11px] text-slate-400 block uppercase font-mono">Driving License</span>
            <span className="font-semibold text-slate-900 font-mono text-sm">
              {SYNTHETIC_DRIVER_PROFILE.licenseNumber} (Category B)
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block uppercase font-mono">Telephone Number</span>
            <span className="font-semibold text-slate-900 text-sm">
              {SYNTHETIC_DRIVER_PROFILE.phone}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block uppercase font-mono">Email Address</span>
            <span className="font-semibold text-slate-900 text-sm">
              {SYNTHETIC_DRIVER_PROFILE.email}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block uppercase font-mono">Issuing State</span>
            <span className="font-semibold text-slate-900 text-sm">
              Republic of Italy (MCTC Roma)
            </span>
          </div>
        </div>
      </section>

      {/* Registered Destinations: Vehicle & Insurance */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/app/vehicle"
          className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-5 flex items-center justify-between group transition-all shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <CarIcon size={20} className="text-blue-600" />
            <div>
              <span className="font-bold text-slate-900 text-sm block">Volkswagen Golf VIII</span>
              <span className="font-mono text-xs text-slate-500">GF492XP • Revisione 2027</span>
            </div>
          </div>
          <ChevronRightIcon size={16} className="text-slate-400 group-hover:text-slate-800 transition-colors" />
        </Link>

        <Link
          href="/app/insurance"
          className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-5 flex items-center justify-between group transition-all shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <ShieldIcon size={20} className="text-blue-600" />
            <div>
              <span className="font-bold text-slate-900 text-sm block">Aura Mutua Assicurazioni</span>
              <span className="font-mono text-xs text-slate-500">AUR-8921-00412 • In Force</span>
            </div>
          </div>
          <ChevronRightIcon size={16} className="text-slate-400 group-hover:text-slate-800 transition-colors" />
        </Link>
      </section>

      {/* Discrete Prototype / Demo Evaluation Tools */}
      <section className="pt-4 border-t border-slate-200 space-y-4">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            Prototype Evaluation &amp; Utilities
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Synthetic fixtures and reset hooks for academic and assessor demonstration
          </p>
        </div>

        {resetSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
            <CheckCircleIcon size={16} className="text-emerald-600 flex-shrink-0" />
            <span>Synthetic claims and local IndexedDB media reset successfully.</span>
          </div>
        )}

        <div className="bg-slate-100/80 border border-slate-200 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-slate-900">
                Canonical Roundabout Incident Demo
              </div>
              <div className="text-xs text-slate-500">
                Loads the Florence Piazza San Giovanni collision fixture ready for review.
              </div>
            </div>
            <button
              type="button"
              onClick={handleStartDemo}
              className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-xs rounded-xl shadow-2xs transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              Load Demo Incident
            </button>
          </div>

          <div className="border-t border-slate-200/80 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-slate-900">
                Reset Prototype Data
              </div>
              <div className="text-xs text-slate-500">
                Restores original 14 synthetic claims and clears local draft storage.
              </div>
            </div>
            {confirmResetOpen ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleExecuteReset}
                  disabled={isResetting}
                  className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-colors"
                >
                  {isResetting ? "Resetting..." : "Confirm Reset"}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmResetOpen(false)}
                  className="px-3 py-2 bg-white border border-slate-300 text-slate-600 text-xs rounded-xl"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmResetOpen(true)}
                className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl shadow-2xs transition-colors whitespace-nowrap self-start sm:self-auto"
              >
                Reset Demo Data
              </button>
            )}
          </div>
        </div>

        <p className="text-[11px] text-slate-400">
          Academic Demonstrator • Data persists strictly in browser storage (`localStorage` and `IndexedDB`).
        </p>
      </section>
    </div>
  );
}
