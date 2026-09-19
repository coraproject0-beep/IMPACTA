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
    <div className="space-y-12 py-6 max-w-4xl mx-auto selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Calm Personal Greeting */}
      <div className="space-y-2 border-b border-slate-200 pb-8">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950 leading-tight">
          {t.driverHome.greeting}
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-lg text-slate-600">
          <p>
            {t.driverHome.subtitle} • <span className="font-semibold text-slate-900 font-mono">GF492XP</span>
          </p>
          <p className="text-sm font-semibold text-emerald-800">
            {t.driverHome.activePolicy} • {SYNTHETIC_DRIVER_PROFILE.policy.insurerName}
          </p>
        </div>
      </div>

      {/* 2. Dominant Primary Intake CTA */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-sm space-y-6">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-blue-700">
            {t.nav.reportAccident}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight">
            {t.driverHome.reportAccidentCta}?
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t.driverHome.reportAccidentDesc}
          </p>
        </div>

        {hasInProgressDraft ? (
          <div className="space-y-4 pt-2">
            <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl text-base text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="font-medium">
                {t.driverHome.draftFoundNotice}
              </span>
              <button
                type="button"
                onClick={resetDraft}
                className="text-sm font-bold text-amber-800 hover:text-amber-950 underline self-start sm:self-auto"
              >
                {t.driverHome.discardDraftCta}
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={handleResumeReport}
                className="min-h-[56px] flex-1 py-4 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-bold shadow-xs transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>{t.driverHome.resumeDraftCta}</span>
                <ArrowRightIcon size={20} />
              </button>
              <button
                type="button"
                onClick={handleStartReport}
                className="min-h-[56px] py-4 px-6 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-base font-semibold transition-colors"
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
              className="min-h-[56px] w-full sm:w-auto inline-flex items-center justify-center gap-3 py-4 px-10 bg-slate-950 hover:bg-blue-600 text-white rounded-xl text-lg font-bold shadow-md transition-all active:scale-[0.98]"
            >
              <span>{t.driverHome.reportAccidentCta}</span>
              <ArrowRightIcon size={20} />
            </button>
          </div>
        )}
      </div>

      {/* 3. Your Vehicle Section (Editorial, Separated by Spacing) */}
      <section className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-950 font-bold text-xl">
            <CarIcon size={24} className="text-blue-700" />
            <span>{t.driverHome.yourVehicle}</span>
          </div>
          <Link
            href="/app/vehicle"
            className="text-sm font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1"
          >
            <span>Inspect specifications</span>
            <ChevronRightIcon size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
            <Image
              src="/images/hero-car.jpg"
              alt="Volkswagen Golf vehicle context"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
          <div className="md:col-span-7 space-y-3">
            <div>
              <h3 className="text-2xl font-bold text-slate-950">
                {SYNTHETIC_DRIVER_PROFILE.vehicle.make} {SYNTHETIC_DRIVER_PROFILE.vehicle.model}
              </h3>
              <p className="text-sm font-mono text-slate-500 mt-0.5">
                License Plate: <span className="font-bold text-slate-900">{SYNTHETIC_DRIVER_PROFILE.vehicle.plate}</span> • Year: {SYNTHETIC_DRIVER_PROFILE.vehicle.year}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-sm text-slate-600">
              <span>VIN: <span className="font-mono text-xs text-slate-800">{SYNTHETIC_DRIVER_PROFILE.vehicle.vin}</span></span>
              <span className="text-emerald-700 font-semibold text-xs">Revisione Regolare</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Recent Reports Section */}
      <section className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-950">
            {t.driverHome.recentReports}
          </h2>
          <Link
            href="/app/reports"
            className="text-sm font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1"
          >
            <span>{t.driverHome.viewAllReports} ({driverClaims.length})</span>
            <ChevronRightIcon size={16} />
          </Link>
        </div>

        {latestClaim ? (
          <Link
            href="/app/reports"
            className="block p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-sm font-bold text-blue-700">
                {latestClaim.id}
              </span>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded ${getStatusBadgeClass(
                  latestClaim.status
                )}`}
              >
                {getStatusLabel(latestClaim.status)}
              </span>
            </div>
            <div className="text-lg font-bold text-slate-900">
              {latestClaim.incident.location.city} ({latestClaim.incident.location.street})
            </div>
            <div className="text-sm text-slate-500 font-mono mt-1">
              {formatDate(latestClaim.incidentDate)} • {latestClaim.vehicleA.plate} vs {latestClaim.vehicleB?.plate || "N/A"}
            </div>
          </Link>
        ) : (
          <div className="p-6 rounded-xl bg-slate-50 text-base text-slate-500 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircleIcon size={20} className="text-emerald-700" />
              <span>{t.driverHome.noReportsYet}</span>
            </div>
            <Link href="/app/reports" className="font-semibold text-slate-800 hover:underline text-sm">
              History →
            </Link>
          </div>
        )}
      </section>

      {/* 5. Policy Coverage Section */}
      <section className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-950 font-bold text-xl">
            <ShieldIcon size={24} className="text-blue-700" />
            <span>{t.driverHome.insuranceCoverage}</span>
          </div>
          <Link
            href="/app/insurance"
            className="text-sm font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1"
          >
            <span>Coverage breakdown</span>
            <ChevronRightIcon size={16} />
          </Link>
        </div>

        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-sm sm:text-base">
          <div className="flex items-center justify-between font-bold text-slate-950 text-lg">
            <span>{SYNTHETIC_DRIVER_PROFILE.policy.insurerName}</span>
            <span className="text-emerald-800 text-sm font-semibold">
              {t.driverHome.activePolicy}
            </span>
          </div>
          <div className="text-slate-600">
            Policy Certificate:{" "}
            <span className="font-mono font-bold text-slate-900">
              {SYNTHETIC_DRIVER_PROFILE.policy.policyNumber}
            </span>
          </div>
          <div className="text-slate-500 text-xs sm:text-sm pt-2 border-t border-slate-200">
            Coverage: Kasko Full + RCA • Valid through {SYNTHETIC_DRIVER_PROFILE.policy.validUntil}
          </div>
        </div>
      </section>

      {/* 6. Emergency 112 Strip */}
      <div className="p-6 bg-rose-50/70 border border-rose-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-base text-rose-950">
        <div>
          <span className="font-bold block text-lg">Need immediate emergency or medical help?</span>
          <span className="text-rose-900 text-sm">Dial the Single European Emergency Number 112 directly. Operators speak Italian and English.</span>
        </div>
        <a
          href="tel:112"
          className="min-h-[48px] inline-flex items-center justify-center px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-base shadow-xs transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          Call 112
        </a>
      </div>
    </div>
  );
}
