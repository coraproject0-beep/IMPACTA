"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { SYNTHETIC_DRIVER_PROFILE } from "@/features/driver/data/driverProfileFixture";
import { CarIcon, CheckCircleIcon, ChevronRightIcon } from "@/components/icons/Icons";

export default function DriverVehiclePage() {
  const { t } = useLanguage();
  const vehicle = SYNTHETIC_DRIVER_PROFILE.vehicle;
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  return (
    <div className="space-y-10 max-w-4xl mx-auto selection:bg-blue-100 selection:text-blue-900 py-4">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-blue-700">
          {t.nav.vehicle}
        </p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950">
          {vehicle.make} {vehicle.model}
        </h1>
        <p className="text-base sm:text-lg text-slate-600">
          {t.vehicle.subtitle}
        </p>
      </div>

      {/* Hero Vehicle Image with Identity Bar */}
      <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-slate-100 border border-slate-200 shadow-xs">
        <Image
          src="/images/hero-car.jpg"
          alt={`${vehicle.make} ${vehicle.model} context`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 900px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 block font-medium">
                {t.vehicle.plate}
              </span>
              <div className="text-2xl sm:text-4xl font-mono font-bold tracking-tight">
                {vehicle.plate}
              </div>
            </div>
            <span className="font-semibold text-sm text-emerald-300 flex items-center gap-1.5">
              <CheckCircleIcon size={18} />
              <span>{t.vehicle.statusActive}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Primary Vehicle Identity (Clean & Uncluttered) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <CarIcon size={24} className="text-blue-700" />
            <h2 className="text-xl font-bold text-slate-950">{t.vehicle.primarySpecs}</h2>
          </div>
          <span className="text-sm font-semibold text-emerald-800">
            Revisione Regolare
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-base">
          <div>
            <span className="text-slate-500 block text-sm uppercase tracking-wider mb-1 font-mono">
              {t.vehicle.plate}
            </span>
            <span className="font-mono font-bold text-slate-950 text-lg">{vehicle.plate}</span>
          </div>

          <div>
            <span className="text-slate-500 block text-sm uppercase tracking-wider mb-1 font-mono">
              {t.vehicle.year}
            </span>
            <span className="font-semibold text-slate-900 text-lg">{vehicle.year}</span>
          </div>

          <div>
            <span className="text-slate-500 block text-sm uppercase tracking-wider mb-1 font-mono">
              Color &amp; Finish
            </span>
            <span className="font-semibold text-slate-900 text-lg">{vehicle.color}</span>
          </div>
        </div>

        {/* Expandable Technical Details (VIN, Inspection) */}
        <div className="pt-5 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="w-full flex items-center justify-between py-2 text-sm font-bold text-blue-700 hover:text-blue-900 min-h-[44px]"
          >
            <span>{t.vehicle.technicalDetails}</span>
            <ChevronRightIcon
              size={18}
              className={`transform transition-transform ${
                showTechnicalDetails ? "rotate-90" : ""
              }`}
            />
          </button>

          {showTechnicalDetails && (
            <div className="mt-4 p-6 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-slate-700 animate-fade-in">
              <div>
                <span className="font-mono text-xs uppercase text-slate-500 block">{t.vehicle.vin}</span>
                <span className="font-mono font-semibold text-slate-950 text-base">{vehicle.vin}</span>
              </div>
              <div>
                <span className="font-mono text-xs uppercase text-slate-500 block">{t.vehicle.inspection}</span>
                <span className="font-semibold text-emerald-800 text-base">{t.vehicle.inspectionValid}</span>
              </div>
              <div>
                <span className="font-mono text-xs uppercase text-slate-500 block">{t.vehicle.engine}</span>
                <span className="text-slate-900 text-base">1.5 eTSI Mild Hybrid (110 kW / 150 CV)</span>
              </div>
              <div>
                <span className="font-mono text-xs uppercase text-slate-500 block">{t.vehicle.transmission}</span>
                <span className="text-slate-900 text-base">7-speed DSG Automatic</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
