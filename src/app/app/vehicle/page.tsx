"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { SYNTHETIC_DRIVER_PROFILE } from "@/features/driver/data/driverProfileFixture";
import { CarIcon, CheckCircleIcon, ArrowRightIcon, ChevronRightIcon } from "@/components/icons/Icons";

export default function DriverVehiclePage() {
  const { t } = useLanguage();
  const vehicle = SYNTHETIC_DRIVER_PROFILE.vehicle;
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  return (
    <div className="space-y-8 max-w-4xl mx-auto selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
          {t.nav.vehicle}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
          {vehicle.make} {vehicle.model}
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          {t.vehicle.subtitle}
        </p>
      </div>

      {/* Hero Vehicle Image with Identity Bar */}
      <div className="relative rounded-3xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-slate-900 border border-slate-200 shadow-xs">
        <Image
          src="/images/hero-car.jpg"
          alt={`${vehicle.make} ${vehicle.model} context`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 900px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 block">
                {t.vehicle.plate}
              </span>
              <div className="text-2xl sm:text-3xl font-mono font-bold tracking-tight">
                {vehicle.plate}
              </div>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/90 backdrop-blur-md font-bold text-xs text-white flex items-center gap-1.5">
              <CheckCircleIcon size={16} />
              <span>{t.vehicle.statusActive}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Primary Vehicle Identity (Clean & Uncluttered) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-7 sm:p-9 space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <CarIcon size={22} className="text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">{t.vehicle.primarySpecs}</h2>
          </div>
          <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
            Revisione Regolare
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
          <div>
            <span className="text-slate-400 block text-xs uppercase tracking-wider mb-1 font-mono">
              {t.vehicle.plate}
            </span>
            <span className="font-mono font-bold text-slate-950 text-base">{vehicle.plate}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-xs uppercase tracking-wider mb-1 font-mono">
              {t.vehicle.year}
            </span>
            <span className="font-semibold text-slate-900 text-base">{vehicle.year}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-xs uppercase tracking-wider mb-1 font-mono">
              Color &amp; Finish
            </span>
            <span className="font-semibold text-slate-900 text-base">{vehicle.color}</span>
          </div>
        </div>

        {/* Expandable Technical Details (VIN, Inspection) */}
        <div className="pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="w-full flex items-center justify-between py-2 text-xs font-bold text-blue-700 hover:text-blue-900"
          >
            <span>{t.vehicle.technicalDetails}</span>
            <ChevronRightIcon
              size={16}
              className={`transform transition-transform ${showTechnicalDetails ? "rotate-90" : ""}`}
            />
          </button>

          {showTechnicalDetails && (
            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs animate-fade-in">
              <div>
                <span className="text-slate-400 block font-mono text-[11px] uppercase">
                  {t.vehicle.vin}
                </span>
                <span className="font-mono font-bold text-slate-800 text-xs">{vehicle.vin}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-mono text-[11px] uppercase">
                  {t.vehicle.inspection}
                </span>
                <span className="font-semibold text-slate-800">{t.vehicle.inspectionValid}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-mono text-[11px] uppercase">
                  {t.vehicle.engine}
                </span>
                <span className="font-semibold text-slate-800">2.0 TDI (150 CV) Clean Diesel</span>
              </div>
              <div>
                <span className="text-slate-400 block font-mono text-[11px] uppercase">
                  {t.vehicle.chassis}
                </span>
                <span className="font-semibold text-slate-800">5-Door European Hatchback</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Insurance Linkage Bar */}
      <div className="p-6 rounded-3xl bg-slate-100/80 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm">
        <div className="space-y-1">
          <span className="font-bold text-slate-950 block text-base">
            Insured by Aura Mutua Assicurazioni
          </span>
          <span className="text-slate-600">
            Policy Number: <span className="font-mono font-semibold">{SYNTHETIC_DRIVER_PROFILE.policy.policyNumber}</span> • Kasko Full
          </span>
        </div>
        <Link
          href="/app/insurance"
          className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 whitespace-nowrap shadow-2xs"
        >
          <span>{t.nav.insurance}</span>
          <ArrowRightIcon size={14} />
        </Link>
      </div>
    </div>
  );
}
