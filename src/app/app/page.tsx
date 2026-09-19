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
  CheckCircleIcon,
  ArrowRightIcon,
  ChevronRightIcon,
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
    <div className="space-y-10 py-4 max-w-5xl mx-auto">
      {/* 1. Greeting & Vehicle Context */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Good morning, Matteo
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            Volkswagen Golf VIII · Plate <span className="font-semibold text-slate-900 font-mono">GF492XP</span> · Policy In Force
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Assistance Ready</span>
          </span>
        </div>
      </div>

      {/* 2. Dominant Primary Intake CTA Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="max-w-2xl space-y-2.5">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
            Roadside Assistance
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
            Need to report an accident?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Step-by-step guidance to ensure physical safety, capture damage photos, exchange counterparty details, and compile a structured report for your insurer.
          </p>
        </div>

        {hasInProgressDraft ? (
          <div className="space-y-4 pt-1">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs sm:text-sm text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-medium">
                You have an unfinished accident report saved on this device.
              </span>
              <button
                type="button"
                onClick={resetDraft}
                className="text-xs font-semibold text-amber-800 hover:text-amber-950 underline self-start sm:self-auto"
              >
                Discard draft
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleResumeReport}
                className="flex-1 py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>Resume Accident Report</span>
                <ArrowRightIcon size={16} />
              </button>
              <button
                type="button"
                onClick={handleStartReport}
                className="py-4 px-6 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-2xl text-sm font-semibold transition-colors"
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 py-4 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm sm:text-base font-bold shadow-xs transition-all active:scale-[0.98]"
            >
              <span>Report an accident</span>
              <ArrowRightIcon size={16} />
            </button>
          </div>
        )}
      </div>

      {/* 3. Progressive Navigation Cards: Vehicle, Insurance, Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Your Vehicle Card */}
        <Link
          href="/app/vehicle"
          className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-6 transition-all shadow-2xs group flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base">
              <CarIcon size={20} className="text-blue-600" />
              <span>Registered Vehicle</span>
            </div>
            <ChevronRightIcon size={16} className="text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
            <Image
              src="/images/hero-car.jpg"
              alt="Volkswagen Golf vehicle context"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
            <div className="absolute bottom-2 left-2 right-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-xs text-white flex items-center justify-between">
              <span className="font-bold text-xs">{SYNTHETIC_DRIVER_PROFILE.vehicle.make} {SYNTHETIC_DRIVER_PROFILE.vehicle.model}</span>
              <span className="font-mono text-xs font-semibold">{SYNTHETIC_DRIVER_PROFILE.vehicle.plate}</span>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Inspect vehicle identification, VIN specifications, and damage inspection history.
          </p>
        </Link>

        {/* Insurance Coverage Card */}
        <Link
          href="/app/insurance"
          className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-6 transition-all shadow-2xs group flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base">
              <ShieldIcon size={20} className="text-blue-600" />
              <span>Active Policy</span>
            </div>
            <ChevronRightIcon size={16} className="text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all" />
          </div>

          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-900 text-sm">
              <span>{SYNTHETIC_DRIVER_PROFILE.policy.insurerName}</span>
              <span className="text-emerald-700 text-xs font-mono">In Force</span>
            </div>
            <div className="text-slate-600">
              Policy Certificate: <span className="font-mono font-semibold text-slate-800">{SYNTHETIC_DRIVER_PROFILE.policy.policyNumber}</span>
            </div>
            <div className="text-slate-500 text-[11px] pt-1">
              Coverage: Kasko Full + RCA · Valid through {SYNTHETIC_DRIVER_PROFILE.policy.validUntil}
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Review coverage guarantees, roadside towing numbers, and policyholder documents.
          </p>
        </Link>
      </div>

      {/* 4. Recent Reports Summary */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-950">
            Recent Accident Reports
          </h2>
          <Link
            href="/app/reports"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>View all reports ({driverClaims.length})</span>
            <ChevronRightIcon size={14} />
          </Link>
        </div>

        {latestClaim ? (
          <Link
            href="/app/reports"
            className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-xs font-bold text-blue-700">
                {latestClaim.id}
              </span>
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded border ${getStatusBadgeClass(
                  latestClaim.status
                )}`}
              >
                {getStatusLabel(latestClaim.status)}
              </span>
            </div>
            <div className="text-sm font-semibold text-slate-900">
              {latestClaim.incident.location.city} ({latestClaim.incident.location.street})
            </div>
            <div className="text-xs text-slate-500 font-mono mt-1">
              {formatDate(latestClaim.incidentDate)} · {latestClaim.vehicleA.plate} vs {latestClaim.vehicleB?.plate || "N/A"}
            </div>
          </Link>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 text-xs text-slate-500 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircleIcon size={16} className="text-emerald-600" />
              <span>No open claims on file. Drive safely.</span>
            </div>
            <Link href="/app/reports" className="font-semibold text-slate-700 hover:underline">
              History →
            </Link>
          </div>
        )}
      </div>

      {/* Emergency Assistance Footnote */}
      <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-rose-950">
        <div>
          <span className="font-bold block">Need immediate emergency or medical help?</span>
          <span className="text-rose-800 text-[11px]">Dial the Single European Emergency Number 112 directly. Operators speak Italian and English.</span>
        </div>
        <a
          href="tel:112"
          className="inline-flex items-center justify-center px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          Call 112
        </a>
      </div>
    </div>
  );
}
