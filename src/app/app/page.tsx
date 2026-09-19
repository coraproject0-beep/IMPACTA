"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDriverDraft } from "@/context/DriverDraftContext";
import { useClaims } from "@/context/ClaimsContext";
import { SYNTHETIC_DRIVER_PROFILE } from "@/features/driver/data/driverProfileFixture";
import {
  CarIcon,
  ShieldIcon,
  AlertTriangleIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  CameraIcon,
} from "@/components/icons/Icons";
import { formatDate, getStatusBadgeClass, getStatusLabel } from "@/lib/utils";

export default function DriverHomePage() {
  const router = useRouter();
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
    <div className="space-y-8 py-2">
      {/* Top Greeting & Status */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
            Good morning, Matteo
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Volkswagen Golf VIII · Plate <span className="font-semibold text-slate-800 font-mono">GF492XP</span> · Policy Active
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>Assistance Ready</span>
          </span>
        </div>
      </div>

      {/* Main Responsive Grid: Desktop Split, Mobile Stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Desktop 6 cols): Editorial Vehicle & Road Context */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 shadow-sm">
            <Image
              src="/images/hero-car.jpg"
              alt="Volkswagen Golf vehicle context"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 500px"
              className="object-cover"
            />
            {/* Soft gradient overlay for readable badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-slate-300">
                    Insured Vehicle
                  </div>
                  <div className="text-base font-bold tracking-tight">
                    {SYNTHETIC_DRIVER_PROFILE.vehicle.make} {SYNTHETIC_DRIVER_PROFILE.vehicle.model}
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded bg-white/20 backdrop-blur-md font-mono font-bold text-xs border border-white/30">
                  {SYNTHETIC_DRIVER_PROFILE.vehicle.plate}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Coverage Reassurance Strip */}
          <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200/80 text-xs text-slate-600 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <ShieldIcon size={16} className="text-blue-600 flex-shrink-0" />
              <span>Aura Mutua Assicurazioni · Kasko &amp; RCA</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              POL-2024-8891
            </span>
          </div>
        </div>

        {/* Right Column (Desktop 6 cols): Primary Actions & Recent Reports */}
        <div className="lg:col-span-6 space-y-6">
          {/* Primary Action Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/80">
                Roadside Incident
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950">
                Need to report an accident?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Step-by-step guidance to ensure your physical safety, capture damage photos, exchange details with the other driver, and compile an accurate report.
              </p>
            </div>

            {hasInProgressDraft ? (
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center justify-between">
                  <span className="font-medium">You have an unfinished report saved on this device.</span>
                  <button
                    type="button"
                    onClick={resetDraft}
                    className="text-[11px] text-amber-800 hover:text-amber-950 underline ml-2"
                  >
                    Discard
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={handleResumeReport}
                    className="flex-1 py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    <span>Resume Accident Report</span>
                    <ArrowRightIcon size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={handleStartReport}
                    className="py-3 px-4 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                  >
                    Start New
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleStartReport}
                  className="w-full py-3.5 px-5 bg-slate-950 hover:bg-blue-600 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-xs transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <span>Report an Accident</span>
                  <ArrowRightIcon size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Recent Reports Summary */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Recent Reports
              </h3>
              {driverClaims.length > 0 && (
                <Link
                  href="/app/reports"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <span>View all ({driverClaims.length})</span>
                  <ChevronRightIcon size={13} />
                </Link>
              )}
            </div>

            {latestClaim ? (
              <Link
                href="/app/reports"
                className="block bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 transition-all shadow-2xs group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold text-blue-700">
                    {latestClaim.id}
                  </span>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.2 rounded border ${getStatusBadgeClass(
                      latestClaim.status
                    )}`}
                  >
                    {getStatusLabel(latestClaim.status)}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-900">
                  {latestClaim.incident.location.city} ({latestClaim.incident.location.street})
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-1">
                  {formatDate(latestClaim.incidentDate)} • {latestClaim.vehicleA.plate} vs {latestClaim.vehicleB?.plate || "N/A"}
                </div>
              </Link>
            ) : (
              <div className="bg-white border border-slate-200/80 rounded-xl p-4 text-xs text-slate-500 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon size={15} className="text-slate-400" />
                  <span>No open claims on file. Drive safely.</span>
                </div>
                <Link
                  href="/app/reports"
                  className="text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  History →
                </Link>
              </div>
            )}
          </div>

          {/* Calm Emergency Assistance Footer Note */}
          <div className="p-3.5 bg-slate-100/70 border border-slate-200/70 rounded-xl flex items-center justify-between text-xs text-slate-500">
            <span className="text-[11px]">In case of injury or emergency, always call <strong>112</strong> immediately.</span>
            <a
              href="tel:112"
              className="text-[11px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 px-2 py-1 rounded border border-rose-200 transition-colors whitespace-nowrap ml-2"
            >
              Call 112
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
