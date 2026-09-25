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
    <div className="space-y-8 max-w-md mx-auto py-2 selection:bg-[#0E0F10] selection:text-white">
      {/* Header with Navigation and Logout */}
      <div className="flex items-center justify-between border-b border-[#E5E5E3] pb-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#0E0F10]">
            Luca Rossi
          </h1>
          <p className="text-xs text-[#666666] font-normal mt-0.5">
            {isIt ? "Profilo assicurato attivo" : "Active policyholder"}
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="px-4 py-2 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-800 text-xs font-semibold rounded-xl transition-colors"
        >
          {t("nav.logout")}
        </button>
      </div>

      {/* Language Preference Section */}
      <section className="bg-white rounded-2xl border border-[#E5E5E3] p-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-[#0E0F10]">
            {isIt ? "Lingua" : "Language"}
          </h2>
          <p className="text-xs text-[#666666]">
            {isIt ? "Italiano / English" : "English / Italiano"}
          </p>
        </div>
        <LanguageSelector />
      </section>

      {/* Policyholder Credentials */}
      <section className="bg-white rounded-2xl border border-[#E5E5E3] p-5 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-[#E5E5E3]">
          <div className="w-10 h-10 rounded-full bg-[#0E0F10] text-white flex items-center justify-center font-bold text-sm">
            LR
          </div>
          <div>
            <div className="text-sm font-bold text-[#0E0F10]">
              Luca Rossi
            </div>
            <div className="text-xs text-[#666666]">
              {isIt ? "Codice Fiscale:" : "Fiscal Code:"} <span className="font-mono text-[#0E0F10]">RSSLUC86M12F205Z</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[#666666] block">
              {isIt ? "Patente" : "License"}
            </span>
            <span className="font-mono font-semibold text-[#0E0F10] text-xs block mt-0.5">
              MI9482014L
            </span>
          </div>
          <div>
            <span className="text-[#666666] block">
              {isIt ? "Telefono" : "Phone"}
            </span>
            <span className="font-mono font-semibold text-[#0E0F10] text-xs block mt-0.5">
              +39 02 8921 4410
            </span>
          </div>
        </div>
      </section>

      {/* Registered Destinations: Vehicle & Insurance */}
      <section className="space-y-3">
        <Link
          href="/app/vehicle"
          className="bg-white rounded-2xl border border-[#E5E5E3] hover:border-[#0E0F10] p-4 flex items-center justify-between group transition-colors"
        >
          <div className="flex items-center gap-3">
            <CarIcon size={20} className="text-[#0E0F10]" />
            <div>
              <span className="font-semibold text-[#0E0F10] text-sm block">Audi A3</span>
              <span className="font-mono text-xs text-[#666666]">AB 123 CD • Rev. 2027</span>
            </div>
          </div>
          <ChevronRightIcon size={16} className="text-[#666666] group-hover:text-[#0E0F10] transition-colors" />
        </Link>

        <Link
          href="/app/insurance"
          className="bg-white rounded-2xl border border-[#E5E5E3] hover:border-[#0E0F10] p-4 flex items-center justify-between group transition-colors"
        >
          <div className="flex items-center gap-3">
            <ShieldIcon size={20} className="text-[#0E0F10]" />
            <div>
              <span className="font-semibold text-[#0E0F10] text-sm block">Generali Italia</span>
              <span className="font-mono text-xs text-[#666666]">GEN-2026-9812 • Polizza attiva</span>
            </div>
          </div>
          <ChevronRightIcon size={16} className="text-[#666666] group-hover:text-[#0E0F10] transition-colors" />
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
