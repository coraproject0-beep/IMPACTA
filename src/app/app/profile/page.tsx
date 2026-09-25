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
  ShieldIcon,
  CarIcon,
  CheckCircleIcon,
  ChevronRightIcon,
} from "@/components/icons/Icons";

export default function DriverProfilePage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const isIt = language === "it";
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
    <div className="space-y-10 max-w-3xl mx-auto py-4 selection:bg-[#090A0A] selection:text-white">
      {/* Header with Navigation and Logout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D7D9D8] pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#6F7375]">
            {t.nav.profile}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase text-[#090A0A] mt-1">
            {driverUser?.name || SYNTHETIC_DRIVER_PROFILE.fullName}
          </h1>
          <p className="text-sm text-[#6F7375] font-light mt-1">
            {isIt
              ? "Credenziali dell'assicurato, preferenze lingua e utilità di perizia."
              : "Policyholder account credentials, language preferences, and evaluation utilities."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="min-h-[44px] px-5 py-2.5 bg-white border border-[#D7D9D8] hover:border-[#090A0A] text-[#090A0A] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <span>{t.nav.backToImpacta}</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="min-h-[44px] px-5 py-2.5 bg-rose-50 border border-rose-300 hover:bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            {t.nav.logout}
          </button>
        </div>
      </div>

      {/* Language Preference Section */}
      <section className="bg-white border border-[#D7D9D8] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#090A0A]">
            {isIt ? "Lingua Interfaccia" : "Interface Language"}
          </h2>
          <p className="text-xs text-[#6F7375] font-light mt-0.5">
            {isIt
              ? "Seleziona la lingua per le pagine pubbliche, l'area conducente e la console peritale."
              : "Select preferred language for public pages, driver screens, and claims console."}
          </p>
        </div>
        <LanguageSelector />
      </section>

      {/* Policyholder Credentials */}
      <section className="bg-white border border-[#D7D9D8] p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b border-[#D7D9D8]">
          <div className="w-12 h-12 bg-[#090A0A] text-white flex items-center justify-center font-bold text-sm">
            MB
          </div>
          <div>
            <div className="text-base font-bold uppercase tracking-tight text-[#090A0A]">
              {SYNTHETIC_DRIVER_PROFILE.fullName}
            </div>
            <div className="text-xs text-[#6F7375]">
              {isIt ? "Codice Fiscale:" : "Fiscal Code:"} <span className="font-mono text-[#090A0A] font-semibold">{SYNTHETIC_DRIVER_PROFILE.fiscalCode}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div>
            <span className="text-[#6F7375] block uppercase tracking-wider font-semibold">
              {isIt ? "Patente di guida" : "Driving License"}
            </span>
            <span className="font-mono font-semibold text-[#090A0A] text-sm block mt-0.5">
              {SYNTHETIC_DRIVER_PROFILE.licenseNumber} (Cat. B)
            </span>
          </div>
          <div>
            <span className="text-[#6F7375] block uppercase tracking-wider font-semibold">
              {isIt ? "Telefono" : "Telephone Number"}
            </span>
            <span className="font-mono font-semibold text-[#090A0A] text-sm block mt-0.5">
              {SYNTHETIC_DRIVER_PROFILE.phone}
            </span>
          </div>
          <div>
            <span className="text-[#6F7375] block uppercase tracking-wider font-semibold">
              Email
            </span>
            <span className="font-medium text-[#090A0A] text-sm block mt-0.5">
              {SYNTHETIC_DRIVER_PROFILE.email}
            </span>
          </div>
          <div>
            <span className="text-[#6F7375] block uppercase tracking-wider font-semibold">
              {isIt ? "Autorità emittente" : "Issuing Authority"}
            </span>
            <span className="font-medium text-[#090A0A] text-sm block mt-0.5">
              Repubblica Italiana (MCTC Roma)
            </span>
          </div>
        </div>
      </section>

      {/* Registered Destinations: Vehicle & Insurance */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/app/vehicle"
          className="bg-white border border-[#D7D9D8] hover:border-[#090A0A] p-5 flex items-center justify-between group transition-colors"
        >
          <div className="flex items-center gap-3">
            <CarIcon size={20} className="text-[#090A0A]" />
            <div>
              <span className="font-bold text-[#090A0A] text-sm block uppercase tracking-wider">Volkswagen Golf VIII</span>
              <span className="font-mono text-xs text-[#6F7375]">GF492XP • Rev. 2027</span>
            </div>
          </div>
          <ChevronRightIcon size={16} className="text-[#6F7375] group-hover:text-[#090A0A] transition-colors" />
        </Link>

        <Link
          href="/app/insurance"
          className="bg-white border border-[#D7D9D8] hover:border-[#090A0A] p-5 flex items-center justify-between group transition-colors"
        >
          <div className="flex items-center gap-3">
            <ShieldIcon size={20} className="text-[#090A0A]" />
            <div>
              <span className="font-bold text-[#090A0A] text-sm block uppercase tracking-wider">Aura Mutua Assicurazioni</span>
              <span className="font-mono text-xs text-[#6F7375]">AUR-8921-00412 • Attiva</span>
            </div>
          </div>
          <ChevronRightIcon size={16} className="text-[#6F7375] group-hover:text-[#090A0A] transition-colors" />
        </Link>
      </section>

      {/* Discrete Prototype / Demo Evaluation Tools */}
      <section className="pt-4 border-t border-[#D7D9D8] space-y-4">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#6F7375]">
            {isIt ? "Strumenti di Valutazione Prototipo" : "Prototype Evaluation & Utilities"}
          </h2>
          <p className="text-xs text-[#6F7375] mt-0.5 font-light">
            {isIt
              ? "Dati sintetici e ripristino per dimostrazioni accademiche e collaudo peritale."
              : "Synthetic fixtures and reset hooks for academic and assessor demonstration."}
          </p>
        </div>

        {resetSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 flex items-center gap-2">
            <CheckCircleIcon size={16} className="text-emerald-700 flex-shrink-0" />
            <span>{isIt ? "Dati di sinistro sintetici e archivio IndexedDB ripristinati con successo." : "Synthetic claims and local IndexedDB media reset successfully."}</span>
          </div>
        )}

        <div className="bg-[#F4F5F3] border border-[#D7D9D8] p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#090A0A]">
                {isIt ? "Sinistro Canonico di Firenze (Rotatoria)" : "Canonical Roundabout Incident Demo"}
              </div>
              <div className="text-xs text-[#6F7375] font-light mt-0.5">
                {isIt
                  ? "Carica il sinistro di Piazza San Giovanni pronto per la perizia."
                  : "Loads the Florence Piazza San Giovanni collision fixture ready for review."}
              </div>
            </div>
            <button
              type="button"
              onClick={handleStartDemo}
              className="px-4 py-2 bg-white border border-[#D7D9D8] hover:border-[#090A0A] text-[#090A0A] font-bold text-xs uppercase tracking-wider transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              {isIt ? "Carica Sinistro Demo" : "Load Demo Incident"}
            </button>
          </div>

          <div className="border-t border-[#D7D9D8] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#090A0A]">
                {isIt ? "Ripristina Dati Prototipo" : "Reset Prototype Data"}
              </div>
              <div className="text-xs text-[#6F7375] font-light mt-0.5">
                {isIt
                  ? "Ripristina i 14 sinistri sintetici originali e cancella le bozze locali."
                  : "Restores original 14 synthetic claims and clears local draft storage."}
              </div>
            </div>
            {confirmResetOpen ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleExecuteReset}
                  disabled={isResetting}
                  className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  {isResetting ? (isIt ? "Ripristino..." : "Resetting...") : (isIt ? "Conferma" : "Confirm Reset")}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmResetOpen(false)}
                  className="px-3 py-2 bg-white border border-[#D7D9D8] text-[#6F7375] text-xs font-semibold uppercase tracking-wider"
                >
                  {isIt ? "Annulla" : "Cancel"}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmResetOpen(true)}
                className="px-4 py-2 bg-white border border-[#D7D9D8] hover:border-[#090A0A] text-[#090A0A] text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap self-start sm:self-auto"
              >
                {isIt ? "Ripristina Dati" : "Reset Demo Data"}
              </button>
            )}
          </div>
        </div>

        <p className="text-[11px] text-[#6F7375] font-light">
          {isIt
            ? "Dimostratore Accademico • I dati persistono rigorosamente nel browser (localStorage e IndexedDB)."
            : "Academic Demonstrator • Data persists strictly in browser storage (localStorage and IndexedDB)."}
        </p>
      </section>
    </div>
  );
}
