"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage, LanguageSelector } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useClaims } from "@/context/ClaimsContext";
import { useDriverDraft } from "@/context/DriverDraftContext";
import {
  ShieldIcon,
  CarIcon,
  CheckCircleIcon,
  ChevronRightIcon,
} from "@/components/icons/Icons";

export default function DriverProfilePage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const isIt = language === "it";
  const { logoutDriver } = useAuth();
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
    <div className="w-full max-w-7xl mx-auto py-2 sm:py-4 space-y-8 selection:bg-[#0E0F10] selection:text-white">
      {/* 1. Header Area with Editorial Scale */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 border-b border-[#E5E5E3] gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0E0F10]">
            Luca Rossi
          </h1>
          <p className="text-sm text-[#555555] font-normal mt-1">
            {isIt ? "Profilo assicurato attivo / Generali Italia" : "Active policyholder / Generali Italia"}
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="self-start sm:self-auto px-4 py-2 text-xs font-semibold text-rose-700 hover:text-rose-900 border border-rose-200 hover:border-rose-300 rounded-lg transition-colors"
        >
          {t("nav.logout")}
        </button>
      </div>

      {/* 2. Responsive 12-Column Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* LEFT COLUMN: Identity, Personal Data & Language (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Identity & Personal Details */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-[#0E0F10] tracking-tight">
              {isIt ? "Dati anagrafici" : "Personal details"}
            </h2>

            <div className="border-t border-[#E5E5E3] divide-y divide-[#E5E5E3] text-xs">
              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[#555555] font-medium">{isIt ? "Nome e cognome" : "Full name"}</span>
                <span className="font-semibold text-[#0E0F10]">Luca Rossi</span>
              </div>

              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[#555555] font-medium">{isIt ? "Codice Fiscale" : "Fiscal Code"}</span>
                <span className="font-mono font-medium text-[#0E0F10]">RSSLUC86M12F205Z</span>
              </div>

              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[#555555] font-medium">{isIt ? "Numero patente" : "Driver license"}</span>
                <span className="font-mono text-[#0E0F10]">MI9482014L</span>
              </div>

              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[#555555] font-medium">{isIt ? "Telefono" : "Phone"}</span>
                <span className="font-mono text-[#0E0F10]">+39 02 8921 4410</span>
              </div>

              <div className="py-3.5 flex items-center justify-between">
                <span className="text-[#555555] font-medium">{isIt ? "Email" : "Email"}</span>
                <span className="text-[#0E0F10]">luca.rossi@example.com</span>
              </div>
            </div>
          </div>

          {/* Language Preference */}
          <div className="space-y-3 pt-2">
            <h2 className="text-base font-bold text-[#0E0F10] tracking-tight">
              {isIt ? "Lingua interfaccia" : "Interface language"}
            </h2>
            <div className="flex items-center justify-between p-4 border border-[#E5E5E3] rounded-xl bg-white">
              <div>
                <div className="text-xs font-semibold text-[#0E0F10]">
                  {isIt ? "Italiano selezionato" : "English selected"}
                </div>
                <div className="text-[11px] text-[#555555]">
                  {isIt ? "Passa a English in qualsiasi momento" : "Switch to Italiano anytime"}
                </div>
              </div>
              <LanguageSelector />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Vehicle, Insurance & Demo Actions (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Associated Vehicle & Insurance Cards */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-[#0E0F10] tracking-tight">
              {isIt ? "Coperture e veicoli attivi" : "Active coverages and vehicles"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/app/vehicle"
                className="p-5 border border-[#E5E5E3] hover:border-[#0E0F10] rounded-xl bg-white transition-colors group flex flex-col justify-between h-36"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs text-[#555555] font-medium">
                    {isIt ? "Veicolo registrato" : "Registered vehicle"}
                  </span>
                  <ChevronRightIcon size={16} className="text-[#888888] group-hover:text-[#0E0F10] transition-colors" />
                </div>
                <div>
                  <div className="text-lg font-bold text-[#0E0F10]">Audi A3</div>
                  <div className="font-mono text-xs text-[#555555] mt-0.5">AB 123 CD (2024)</div>
                </div>
              </Link>

              <Link
                href="/app/insurance"
                className="p-5 border border-[#E5E5E3] hover:border-[#0E0F10] rounded-xl bg-white transition-colors group flex flex-col justify-between h-36"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs text-[#555555] font-medium">
                    {isIt ? "Polizza assicurativa" : "Insurance policy"}
                  </span>
                  <ChevronRightIcon size={16} className="text-[#888888] group-hover:text-[#0E0F10] transition-colors" />
                </div>
                <div>
                  <div className="text-lg font-bold text-[#0E0F10]">Generali Italia</div>
                  <div className="font-mono text-xs text-emerald-700 font-medium mt-0.5">
                    GEN-2026-9812 / {isIt ? "Attiva" : "Active"}
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Prototype Evaluation & Demonstration Section */}
          <div className="space-y-4 pt-4 border-t border-[#E5E5E3]">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-[#0E0F10] tracking-tight">
                {isIt ? "Strumenti di valutazione peritale" : "Demonstration and test utilities"}
              </h2>
              <p className="text-xs text-[#555555]">
                {isIt
                  ? "Dati sintetici e ripristino per test del flusso Driver → Console."
                  : "Synthetic data and test actions for the Driver → Console workflow."}
              </p>
            </div>

            {resetSuccess && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 rounded-lg flex items-center gap-2">
                <CheckCircleIcon size={16} className="text-emerald-700 flex-shrink-0" />
                <span>
                  {isIt
                    ? "Dati del dimostratore ripristinati allo stato iniziale."
                    : "Demo claims and local fixtures reset successfully."}
                </span>
              </div>
            )}

            <div className="border border-[#E5E5E3] rounded-xl bg-white divide-y divide-[#E5E5E3]">
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-[#0E0F10]">
                    {isIt ? "Sinistro canonico di Firenze" : "Canonical Florence incident"}
                  </div>
                  <div className="text-xs text-[#555555] mt-0.5">
                    {isIt
                      ? "Carica il sinistro demo compilato per verificare la perizia."
                      : "Load pre-configured accident data ready for review."}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleStartDemo}
                  className="px-4 py-2 bg-[#0E0F10] text-white hover:bg-[#1A1B1C] rounded-lg text-xs font-semibold transition-colors whitespace-nowrap self-start sm:self-auto"
                >
                  {isIt ? "Carica sinistro demo" : "Load demo incident"}
                </button>
              </div>

              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-[#0E0F10]">
                    {isIt ? "Ripristina dati dimostrativi" : "Reset demo claims"}
                  </div>
                  <div className="text-xs text-[#555555] mt-0.5">
                    {isIt
                      ? "Ripristina i 14 sinistri originali e cancella le bozze locali."
                      : "Restore the original 14 mock claims and clear local drafts."}
                  </div>
                </div>

                {confirmResetOpen ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleExecuteReset}
                      disabled={isResetting}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-semibold transition-colors"
                    >
                      {isResetting ? (isIt ? "Ripristino..." : "Resetting...") : (isIt ? "Conferma" : "Confirm")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmResetOpen(false)}
                      className="px-3 py-1.5 border border-[#E5E5E3] text-[#555555] hover:text-[#0E0F10] rounded text-xs transition-colors"
                    >
                      {isIt ? "Annulla" : "Cancel"}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmResetOpen(true)}
                    className="px-4 py-2 border border-[#E5E5E3] hover:border-[#0E0F10] text-[#0E0F10] rounded-lg text-xs font-semibold transition-colors whitespace-nowrap self-start sm:self-auto"
                  >
                    {isIt ? "Ripristina dati" : "Reset data"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
