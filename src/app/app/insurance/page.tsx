"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { SYNTHETIC_DRIVER_PROFILE } from "@/features/driver/data/driverProfileFixture";
import { ShieldIcon, CheckCircleIcon, ArrowRightIcon } from "@/components/icons/Icons";

export default function DriverInsurancePage() {
  const { t } = useLanguage();
  const policy = SYNTHETIC_DRIVER_PROFILE.policy;

  return (
    <div className="space-y-8 max-w-4xl mx-auto selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
          {t.nav.insurance}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
          {policy.insurerName}
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          {t.insurance.subtitle}
        </p>
      </div>

      {/* Main Policy Overview */}
      <div className="bg-white rounded-3xl border border-slate-200 p-7 sm:p-9 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
              {t.insurance.policyNumber}
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-bold text-slate-950">
              {policy.policyNumber}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs self-start sm:self-auto">
            <CheckCircleIcon size={16} />
            <span>{t.insurance.statusActive}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
          <div>
            <span className="text-slate-400 block text-xs uppercase tracking-wider mb-1 font-mono">
              {t.insurance.insurer}
            </span>
            <span className="font-bold text-slate-950 text-base">{policy.insurerName}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-xs uppercase tracking-wider mb-1 font-mono">
              Coverage Tier
            </span>
            <span className="font-semibold text-slate-900 text-base">Kasko Full + RCA</span>
          </div>

          <div>
            <span className="text-slate-400 block text-xs uppercase tracking-wider mb-1 font-mono">
              {t.insurance.validity}
            </span>
            <span className="font-mono font-bold text-slate-950 text-base">{policy.validUntil}</span>
          </div>
        </div>
      </div>

      {/* Coverage Features Breakdown */}
      <div className="bg-white rounded-3xl border border-slate-200 p-7 sm:p-9 space-y-6 shadow-xs">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <ShieldIcon size={22} className="text-blue-600" />
          <h2 className="text-lg font-bold text-slate-950">{t.insurance.coverageTitle}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-slate-600">
          <div className="space-y-1">
            <span className="font-bold text-slate-900 block text-base">
              {t.insurance.coverageRCA}
            </span>
            <p className="leading-relaxed">{t.insurance.coverageRCADesc}</p>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-slate-900 block text-base">
              {t.insurance.coverageKasko}
            </span>
            <p className="leading-relaxed">{t.insurance.coverageKaskoDesc}</p>
          </div>

          <div className="space-y-1 sm:col-span-2 pt-2 border-t border-slate-100">
            <span className="font-bold text-slate-900 block text-base">
              {t.insurance.coverageAssistance}
            </span>
            <p className="leading-relaxed">{t.insurance.coverageAssistanceDesc}</p>
          </div>
        </div>
      </div>

      {/* 24/7 Roadside Assistance Card */}
      <div className="p-7 rounded-3xl bg-blue-50/60 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-5 text-sm">
        <div className="space-y-1">
          <span className="font-bold text-blue-950 block text-lg">
            {t.insurance.assistanceHotline}
          </span>
          <span className="text-blue-900">
            {t.insurance.assistanceHotlineDesc}
          </span>
        </div>
        <a
          href="tel:800123456"
          className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs whitespace-nowrap self-start sm:self-auto transition-colors"
        >
          <span>{t.insurance.callAssistance}</span>
          <ArrowRightIcon size={16} />
        </a>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between text-sm text-slate-600 pt-2">
        <Link href="/app/vehicle" className="font-semibold text-blue-700 hover:underline">
          ← {t.nav.vehicle}
        </Link>
        <Link
          href="/app/report"
          className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-950 hover:bg-blue-600 text-white transition-colors"
        >
          <span>{t.nav.reportAccident}</span>
          <ArrowRightIcon size={14} />
        </Link>
      </div>
    </div>
  );
}
