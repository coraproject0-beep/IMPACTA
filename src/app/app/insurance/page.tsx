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
    <div className="space-y-10 max-w-4xl mx-auto selection:bg-blue-100 selection:text-blue-900 py-4">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-blue-700">
          {t.nav.insurance}
        </p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950">
          {policy.insurerName}
        </h1>
        <p className="text-base sm:text-lg text-slate-600">
          {t.insurance.subtitle}
        </p>
      </div>

      {/* Main Policy Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-1">
              {t.insurance.policyNumber}
            </span>
            <span className="text-2xl sm:text-4xl font-mono font-bold text-slate-950">
              {policy.policyNumber}
            </span>
          </div>
          <span className="font-semibold text-base text-emerald-800 flex items-center gap-1.5 self-start sm:self-auto">
            <CheckCircleIcon size={20} />
            <span>{t.insurance.statusActive}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-base">
          <div>
            <span className="text-slate-500 block text-xs uppercase tracking-wider mb-1 font-mono">
              {t.insurance.insurer}
            </span>
            <span className="font-bold text-slate-950 text-lg">{policy.insurerName}</span>
          </div>

          <div>
            <span className="text-slate-500 block text-xs uppercase tracking-wider mb-1 font-mono">
              Coverage Tier
            </span>
            <span className="font-semibold text-slate-900 text-lg">Kasko Full + RCA</span>
          </div>

          <div>
            <span className="text-slate-500 block text-xs uppercase tracking-wider mb-1 font-mono">
              {t.insurance.validUntil}
            </span>
            <span className="font-semibold text-slate-900 text-lg">{policy.validUntil}</span>
          </div>
        </div>

        {/* Coverage Guarantees */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <h2 className="text-lg font-bold text-slate-950">
            {t.insurance.coverageTitle}
          </h2>

          <div className="space-y-4 text-sm text-slate-700">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 text-base block">{t.insurance.coverageRCA}</span>
              <p className="text-slate-600 mt-0.5 text-sm">{t.insurance.coverageRCADesc}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 text-base block">{t.insurance.coverageKasko}</span>
              <p className="text-slate-600 mt-0.5 text-sm">{t.insurance.coverageKaskoDesc}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 text-base block">{t.insurance.coverageAssistance}</span>
              <p className="text-slate-600 mt-0.5 text-sm">{t.insurance.coverageAssistanceDesc}</p>
            </div>
          </div>
        </div>

        {/* 24/7 Roadside Assistance Strip */}
        <div className="p-6 bg-blue-50/70 border border-blue-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-blue-950 text-base">{t.insurance.assistanceHotline}</h3>
            <p className="text-xs sm:text-sm text-blue-800/80">{t.insurance.assistanceHotlineDesc}</p>
          </div>
          <a
            href="tel:+390684921102"
            className="min-h-[48px] px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-xs transition-colors flex items-center justify-center gap-2 self-start sm:self-auto whitespace-nowrap"
          >
            <span>{t.insurance.callAssistance}</span>
            <ArrowRightIcon size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
