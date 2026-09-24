"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useDriverDraft } from "@/context/DriverDraftContext";
import { useClaims } from "@/context/ClaimsContext";
import { SYNTHETIC_DRIVER_PROFILE } from "@/features/driver/data/driverProfileFixture";
import {
  CarIcon,
  ShieldIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ChevronRightIcon,
} from "@/components/icons/Icons";
import { formatDate } from "@/lib/utils";

export default function DriverHomePage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const { draft, startNewReport, resetDraft } = useDriverDraft();
  const { claims } = useClaims();

  // Find claims filed by Matteo Bianchi
  const driverClaims = claims.filter(
    (c) =>
      c.driverA.fullName === SYNTHETIC_DRIVER_PROFILE.fullName ||
      c.policyholder.fiscalCode === SYNTHETIC_DRIVER_PROFILE.fiscalCode
  );
  const latestClaim = driverClaims[0];

  // Check if an in-progress draft exists
  const hasInProgressDraft = draft.step !== "SAFETY" && draft.step !== "SUBMITTED";

  const handleStartReport = () => {
    startNewReport();
    router.push("/app/report");
  };

  const handleResumeReport = () => {
    router.push("/app/report");
  };

  return (
    <div className="space-y-16 py-8 max-w-4xl mx-auto">
      {/* 1. Large Calm Greeting */}
      <div className="space-y-3 pb-8 border-b border-[#D7D9D8]">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6F7375]">
          {language === "it" ? "AREA PERSONALE CONDUCENTE" : "DRIVER WORKSPACE"}
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#090A0A] uppercase leading-tight">
          {t("driverHome.greeting")}
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-base text-[#6F7375] font-mono">
          <p>
            {SYNTHETIC_DRIVER_PROFILE.fullName} • <span className="font-bold text-[#090A0A]">{SYNTHETIC_DRIVER_PROFILE.vehicle.plate}</span>
          </p>
          <p className="text-xs uppercase tracking-wider text-emerald-700 font-bold">
            ACTIVE • {SYNTHETIC_DRIVER_PROFILE.policy.coverageType} • {SYNTHETIC_DRIVER_PROFILE.policy.insurerName}
          </p>
        </div>
      </div>

      {/* 2. Dominant Primary Action (Large, Unboxed Command) */}
      <div className="bg-white border border-[#090A0A] p-8 sm:p-12 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6F7375]">
            {language === "it" ? "INTERVENTO IMMEDIATO" : "RAPID INGESTION"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold uppercase text-[#090A0A]">
            {t("driverHome.reportAccidentCta")}?
          </h2>
          <p className="text-base sm:text-lg text-[#6F7375] font-light leading-relaxed max-w-2xl">
            {t("driverHome.reportAccidentDesc")}
          </p>
        </div>

        {hasInProgressDraft ? (
          <div className="space-y-4 pt-2">
            <div className="p-4 border border-[#D7D9D8] bg-[#F4F5F3] text-sm text-[#090A0A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
              <span>{t("driverHome.draftFoundNotice")}</span>
              <button
                type="button"
                onClick={resetDraft}
                className="text-xs font-bold uppercase tracking-wider text-[#DC2626] underline self-start sm:self-auto"
              >
                {t("driverHome.discardDraftCta")}
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={handleResumeReport}
                className="min-h-[56px] flex-1 py-4 px-8 bg-[#090A0A] hover:bg-[#171819] text-white text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-3"
              >
                <span>{t("driverHome.resumeDraftCta")}</span>
                <ArrowRightIcon size={18} />
              </button>
              <button
                type="button"
                onClick={handleStartReport}
                className="min-h-[56px] py-4 px-8 border border-[#D7D9D8] hover:border-[#090A0A] text-[#090A0A] text-sm font-semibold uppercase tracking-wider transition-colors"
              >
                {language === "it" ? "Inizia Nuovo" : "Start New"}
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-2">
            <button
              type="button"
              onClick={handleStartReport}
              className="min-h-[56px] w-full sm:w-auto inline-flex items-center justify-center gap-3 py-4 px-10 bg-[#090A0A] hover:bg-[#171819] text-white text-sm font-bold uppercase tracking-wider transition-colors"
            >
              <span>{t("driverHome.reportAccidentCta")}</span>
              <ArrowRightIcon size={18} />
            </button>
          </div>
        )}
      </div>

      {/* 3. Full-Width Vehicle Identity */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#D7D9D8]">
          <span className="text-xs font-mono font-bold tracking-widest text-[#090A0A] uppercase">
            {t("driverHome.yourVehicle")}
          </span>
          <Link
            href="/app/vehicle"
            className="text-xs font-mono uppercase tracking-wider text-[#6F7375] hover:text-[#090A0A] underline"
          >
            {language === "it" ? "Dettagli completi →" : "View specs →"}
          </Link>
        </div>

        <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden bg-[#171819] border border-[#D7D9D8]">
          <Image
            src="/images/hero-car.jpg"
            alt="Volkswagen Golf vehicle context"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-[#090A0A]/90 backdrop-blur-sm text-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
            <div>
              <span className="font-bold text-sm text-white uppercase block">
                {SYNTHETIC_DRIVER_PROFILE.vehicle.make} {SYNTHETIC_DRIVER_PROFILE.vehicle.model}
              </span>
              <span className="text-white/60">
                TARGA: {SYNTHETIC_DRIVER_PROFILE.vehicle.plate} • ANNO: {SYNTHETIC_DRIVER_PROFILE.vehicle.year}
              </span>
            </div>
            <span className="text-emerald-400 font-bold uppercase">REVISIONE REGOLARE</span>
          </div>
        </div>
      </section>

      {/* 4. Thin Hairline Divider & Policy Summary */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between pb-4 border-b border-[#D7D9D8]">
          <span className="text-xs font-mono font-bold tracking-widest text-[#090A0A] uppercase">
            {t("driverHome.insurancePolicy")}
          </span>
          <Link
            href="/app/insurance"
            className="text-xs font-mono uppercase tracking-wider text-[#6F7375] hover:text-[#090A0A] underline"
          >
            {language === "it" ? "Fascicolo Polizza →" : "Policy details →"}
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-mono text-[#6F7375]">
          <div>
            <span className="block uppercase text-[#6F7375]">COMPAGNIA</span>
            <span className="font-bold text-[#090A0A] text-sm">{SYNTHETIC_DRIVER_PROFILE.policy.insurerName}</span>
          </div>
          <div>
            <span className="block uppercase text-[#6F7375]">POLIZZA N.</span>
            <span className="font-bold text-[#090A0A] text-sm">{SYNTHETIC_DRIVER_PROFILE.policy.policyNumber}</span>
          </div>
          <div>
            <span className="block uppercase text-[#6F7375]">SCADENZA</span>
            <span className="font-bold text-[#090A0A] text-sm">{SYNTHETIC_DRIVER_PROFILE.policy.validUntil}</span>
          </div>
          <div>
            <span className="block uppercase text-[#6F7375]">ASSISTENZA 24/7</span>
            <span className="font-bold text-[#090A0A] text-sm">800 892 100</span>
          </div>
        </div>
      </section>

      {/* 5. Recent Report / Dossier Archive */}
      {latestClaim && (
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#D7D9D8]">
            <span className="text-xs font-mono font-bold tracking-widest text-[#090A0A] uppercase">
              {language === "it" ? "ULTIMO SINISTRO SEGNALATO" : "RECENT FILED REPORT"}
            </span>
            <Link
              href="/app/reports"
              className="text-xs font-mono uppercase tracking-wider text-[#6F7375] hover:text-[#090A0A] underline"
            >
              {language === "it" ? "Tutti i report →" : "All reports →"}
            </Link>
          </div>
          <div className="p-6 border border-[#D7D9D8] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#6F7375]">DOSSIER: {latestClaim.id}</span>
              <h4 className="text-lg font-bold uppercase text-[#090A0A]">
                {latestClaim.incident.location.street}, {latestClaim.incident.location.city}
              </h4>
              <p className="text-xs font-mono text-[#6F7375]">
                {formatDate(latestClaim.incidentDate)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono font-bold px-3 py-1.5 border border-[#090A0A] text-[#090A0A] uppercase">
                {latestClaim.status}
              </span>
              <Link
                href="/app/reports"
                className="text-xs font-mono font-bold uppercase text-[#090A0A] hover:underline"
              >
                {language === "it" ? "Ispeziona →" : "Inspect →"}
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
