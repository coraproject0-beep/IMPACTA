"use client";

import React from "react";
import Link from "next/link";
import { SYNTHETIC_DRIVER_PROFILE } from "@/features/driver/data/driverProfileFixture";
import { ShieldIcon, CheckCircleIcon, ArrowRightIcon } from "@/components/icons/Icons";

export default function DriverInsurancePage() {
  const policy = SYNTHETIC_DRIVER_PROFILE.policy;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
          Insurance Coverage
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
          {policy.insurerName}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Active motor insurance policy connected to your Volkswagen Golf VIII for direct claims processing.
        </p>
      </div>

      {/* Main Policy Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Policy Certificate Number
            </span>
            <span className="text-xl sm:text-2xl font-mono font-bold text-slate-900">
              {policy.policyNumber}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-xs self-start sm:self-auto">
            <CheckCircleIcon size={14} />
            <span>Active &amp; In Force</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Insurance Carrier</span>
            <span className="font-semibold text-slate-900 text-sm">{policy.insurerName}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Coverage Tier</span>
            <span className="font-semibold text-slate-900 text-sm">Kasko Full + RCA</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Policy Expiry / Renewal</span>
            <span className="font-mono font-semibold text-slate-900 text-sm">{policy.validUntil}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Issuing Agency</span>
            <span className="font-mono text-slate-800 text-xs">Roma Centro ({policy.agencyCode})</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Policyholder Verification</span>
            <span className="font-semibold text-emerald-700 text-xs">Direct Match (Matteo Bianchi)</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Roadside Towing Hotline</span>
            <a href="tel:+390684921102" className="font-mono font-bold text-blue-600 hover:underline text-xs">
              +39 06 8492 1102
            </a>
          </div>
        </div>
      </div>

      {/* Coverage Breakdown */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-base font-bold text-slate-900">Included Protection Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="flex items-start gap-2.5">
            <CheckCircleIcon size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Direct Compensation (CARD Accord)</span>
              <span>Enabled for 2-vehicle collisions in Italy with Italian registration plates.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircleIcon size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Collision Damage (Kasko)</span>
              <span>Full vehicle repair coverage with standard zero-deductible partner garage network.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircleIcon size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">24/7 Roadside Towing</span>
              <span>Free immediate towing from the accident scene to the nearest authorized workshop.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircleIcon size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Legal Protection</span>
              <span>Coverage for contentious counterparty claims up to €25,000.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
        <Link href="/app/vehicle" className="text-blue-600 hover:underline">
          ← View Registered Vehicle
        </Link>
        <Link
          href="/app/report"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
        >
          <span>Report an accident</span>
          <ArrowRightIcon size={12} />
        </Link>
      </div>
    </div>
  );
}
