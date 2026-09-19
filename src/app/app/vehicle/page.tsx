"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SYNTHETIC_DRIVER_PROFILE } from "@/features/driver/data/driverProfileFixture";
import { CarIcon, CheckCircleIcon, ArrowRightIcon } from "@/components/icons/Icons";

export default function DriverVehiclePage() {
  const vehicle = SYNTHETIC_DRIVER_PROFILE.vehicle;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
          Registered Vehicle
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
          {vehicle.make} {vehicle.model}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Vehicle details registered with your insurance policy for automated roadside claims intake.
        </p>
      </div>

      {/* Hero Vehicle Image */}
      <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-slate-100 border border-slate-200 shadow-xs">
        <Image
          src="/images/hero-car.jpg"
          alt={`${vehicle.make} ${vehicle.model} context`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 900px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300">
                License Plate
              </span>
              <div className="text-xl font-mono font-bold tracking-tight">
                {vehicle.plate}
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/80 backdrop-blur-xs font-semibold text-xs text-white flex items-center gap-1.5">
              <CheckCircleIcon size={14} />
              <span>Active Coverage</span>
            </span>
          </div>
        </div>
      </div>

      {/* Vehicle Specification Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <CarIcon size={18} className="text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">Vehicle Specifications</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">VIN verified</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Manufacturer &amp; Model</span>
            <span className="font-semibold text-slate-900 text-sm">{vehicle.make} {vehicle.model}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Registration Plate</span>
            <span className="font-mono font-bold text-slate-900 text-sm">{vehicle.plate}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Vehicle Identification Number (VIN)</span>
            <span className="font-mono text-slate-800 text-xs">{vehicle.vin}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Model Year</span>
            <span className="font-semibold text-slate-900 text-sm">{vehicle.year}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Color &amp; Finish</span>
            <span className="font-semibold text-slate-900 text-sm">{vehicle.color}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Drivability Baseline</span>
            <span className="font-semibold text-emerald-700 text-sm">Roadworthy / Drivable</span>
          </div>
        </div>
      </div>

      {/* Insurance Linkage Card */}
      <div className="p-5 rounded-2xl bg-slate-100/70 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="space-y-0.5">
          <span className="font-bold text-slate-900 block">Covered by Aura Mutua Assicurazioni</span>
          <span className="text-slate-600">Policy Number: {SYNTHETIC_DRIVER_PROFILE.policy.policyNumber} · Kasko Full</span>
        </div>
        <Link
          href="/app/insurance"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-xs bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 whitespace-nowrap"
        >
          <span>View Insurance Details</span>
          <ArrowRightIcon size={12} />
        </Link>
      </div>
    </div>
  );
}
