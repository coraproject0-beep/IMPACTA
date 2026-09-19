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
import { formatDate, getStatusBadgeClass, getStatusLabel } from "@/lib/utils";

export default function DriverHomePage() {
  const router = useRouter();
  const { t } = useLanguage();
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
    <div className="space-y-10 py-4 max-w-5xl mx-auto selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Greeting & Vehicle Context */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950">
            {t.driverHome.greeting}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-1">
            {t.driverHome.subtitle} • <span className="font-semibold text-slate-900 font-mono">GF492XP</span>
          </p>
        </div>

        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
            {t.driverHome.activePolicy}
          </span>
        </div>
      </div>

      {/* 2. Dominant Primary Intake CTA Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-10 shadow-xs space-y-6">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
            {t.nav.reportAccident}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-950">
            {t.driverHome.reportAccidentCta}?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.driverHome.reportAccidentDesc}
          </p>
        </div>

        {hasInProgressDraft ? (
          <div className="space-y-4 pt-2">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="font-medium">
                {t.driverHome.draftFoundNotice}
              </span>
              <button
                type="button"
                onClick={resetDraft}
                className="text-xs font-bold text-amber-800 hover:text-amber-950 underline self-start sm:self-auto"
              >
                {t.driverHome.discardDraftCta}
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleResumeReport}
                className="min-h-[48px] flex-1 py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm sm:text-base font-bold shadow-xs transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>{t.driverHome.resumeDraftCta}</span>
                <ArrowRightIcon size={18} />
              </button>
              <button
                type="button"
                onClick={handleStartReport}
                className="min-h-[48px] py-4 px-6 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-2xl text-sm sm:text-base font-semibold transition-colors"
              >
                Start New Report
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-2">
            <button
              type="button"
              onClick={handleStartReport}
              className="min-h-[52px] w-full sm:w-auto inline-flex items-center justify-center gap-2.5 py-4 px-8 bg-slate-950 hover:bg-blue-600 text-white rounded-2xl text-base font-bold shadow-xs transition-all active:scale-[0.98]"
            >
              <span>{t.driverHome.reportAccidentCta}</span>
              <ArrowRightIcon size={18} />
            </button>
          </div>
        )}
      </div>

      {/* 3. Progressive Navigation Sections: Vehicle & Insurance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Your Vehicle Section */}
        <Link
          href="/app/vehicle"
          className="bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-7 transition-all shadow-xs group flex flex-col justify-between space-y-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
              <CarIcon size={22} className="text-blue-600" />
              <span>{t.driverHome.yourVehicle}</span>
            </div>
            <ChevronRightIcon size={18} className="text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <Image
              src="/images/hero-car.jpg"
              alt="Volkswagen Golf vehicle context"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 450px"
            />
            <div className="absolute bottom-3 left-3 right-3 px-3.5 py-2 rounded-xl bg-slate-950/80 backdrop-blur-md text-white flex items-center justify-between">
              <span className="font-bold text-sm">
                {SYNTHETIC_DRIVER_PROFILE.vehicle.make} {SYNTHETIC_DRIVER_PROFILE.vehicle.model}
              </span>
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-white/20">
                {SYNTHETIC_DRIVER_PROFILE.vehicle.plate}
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Inspect vehicle credentials, engine specifications, and mandatory inspection dates.
          </p>
        </Link>

        {/* Insurance Coverage Section */}
        <Link
          href="/app/insurance"
          className="bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-7 transition-all shadow-xs group flex flex-col justify-between space-y-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
              <ShieldIcon size={22} className="text-blue-600" />
              <span>{t.driverHome.insuranceCoverage}</span>
            </div>
            <ChevronRightIcon size={18} className="text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-sm">
            <div className="flex items-center justify-between font-bold text-slate-900 text-base">
              <span>{SYNTHETIC_DRIVER_PROFILE.policy.insurerName}</span>
              <span className="text-emerald-700 text-xs font-mono font-semibold">
                {t.driverHome.activePolicy}
              </span>
            </div>
            <div className="text-slate-600">
              Policy Certificate:{" "}
              <span className="font-mono font-semibold text-slate-900">
                {SYNTHETIC_DRIVER_PROFILE.policy.policyNumber}
              </span>
            </div>
            <div className="text-slate-500 text-xs pt-1 border-t border-slate-200/80">
              Coverage: Kasko Full + RCA • Valid through {SYNTHETIC_DRIVER_PROFILE.policy.validUntil}
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Review your policy guarantees, deductible limits, and 24/7 European assistance contacts.
          </p>
        </Link>
      </div>

      {/* 4. Recent Reports Summary */}
      <div className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-slate-950">
            {t.driverHome.recentReports}
          </h2>
          <Link
            href="/app/reports"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>{t.driverHome.viewAllReports} ({driverClaims.length})</span>
            <ChevronRightIcon size={14} />
          </Link>
        </div>

        {latestClaim ? (
          <Link
            href="/app/reports"
            className="block p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-blue-700">
                {latestClaim.id}
              </span>
              <span
                className={`text-[10px] font-semibold px-2.5 py-0.5 rounded border ${getStatusBadgeClass(
                  latestClaim.status
                )}`}
              >
                {getStatusLabel(latestClaim.status)}
              </span>
            </div>
            <div className="text-base font-bold text-slate-900">
              {latestClaim.incident.location.city} ({latestClaim.incident.location.street})
            </div>
            <div className="text-xs text-slate-500 font-mono mt-1">
              {formatDate(latestClaim.incidentDate)} • {latestClaim.vehicleA.plate} vs {latestClaim.vehicleB?.plate || "N/A"}
            </div>
          </Link>
        ) : (
          <div className="p-5 rounded-2xl bg-slate-50 text-sm text-slate-500 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircleIcon size={18} className="text-emerald-600" />
              <span>{t.driverHome.noReportsYet}</span>
            </div>
            <Link href="/app/reports" className="font-semibold text-slate-700 hover:underline text-xs">
              History →
            </Link>
          </div>
        )}
      </div>

      {/* Emergency Assistance Callout */}
      <div className="p-5 bg-rose-50/70 border border-rose-200 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-rose-950">
        <div>
          <span className="font-bold block text-base">Need immediate emergency or medical help?</span>
          <span className="text-rose-800 text-xs">Dial the Single European Emergency Number 112 directly. Operators speak Italian and English.</span>
        </div>
        <a
          href="tel:112"
          className="min-h-[44px] inline-flex items-center justify-center px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          Call 112
        </a>
      </div>
    </div>
  );
}
