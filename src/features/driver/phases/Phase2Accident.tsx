"use client";

import React, { useState } from "react";
import { DriverDraft } from "@/types/driver";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRightIcon, MapPinIcon } from "@/components/icons/Icons";

interface Phase2AccidentProps {
  draft: DriverDraft;
  onUpdate: (patch: Partial<DriverDraft>) => void;
  onNext: () => void;
}

export function Phase2Accident({ draft, onUpdate, onNext }: Phase2AccidentProps) {
  const { t } = useLanguage();
  const [city, setCity] = useState(draft.location.city || "Firenze");
  const [street, setStreet] = useState(draft.location.street || "Piazza San Giovanni");
  const [junctionType, setJunctionType] = useState(draft.location.junctionType || "ROUNDABOUT");
  const [date, setDate] = useState(draft.incidentDate || "2026-09-14");
  const [time, setTime] = useState(draft.incidentTime || "11:42");
  const [vehiclesCount, setVehiclesCount] = useState(draft.vehiclesCount || 2);
  const [anyInjured, setAnyInjured] = useState(draft.anyInjured || false);
  const [policePresent, setPolicePresent] = useState(draft.policePresent || false);

  const handleContinue = () => {
    onUpdate({
      incidentDate: date,
      incidentTime: time,
      location: {
        ...draft.location,
        city,
        street,
        junctionType,
      },
      vehiclesCount,
      anyInjured,
      policePresent,
    });
    onNext();
  };

  const setDemoLocation = () => {
    setCity("Firenze");
    setStreet("Piazza San Giovanni");
    setJunctionType("ROUNDABOUT");
  };

  return (
    <div className="space-y-8 py-2 max-w-2xl selection:bg-blue-100 selection:text-blue-900">
      {/* Step Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
          {t.wizard.phase2Title}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight">
          {t.wizard.phase2WhereWhen}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Provide the location and basic circumstances to position the event accurately for insurer review.
        </p>
      </div>

      {/* 1. Location Question */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-bold text-slate-950 text-base flex items-center gap-2">
            <MapPinIcon size={18} className="text-blue-600" />
            <span>Where did the collision occur?</span>
          </label>
          <button
            type="button"
            onClick={setDemoLocation}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 underline"
          >
            {t.wizard.phase2DemoRoundabout}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <span className="text-slate-600 font-medium">{t.wizard.phase2City}</span>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Firenze"
              className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 font-medium"
            />
          </div>
          <div className="space-y-1">
            <span className="text-slate-600 font-medium">{t.wizard.phase2Street}</span>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="e.g. Piazza San Giovanni"
              className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 font-medium"
            />
          </div>
        </div>

        {/* Junction Type Selector */}
        <div className="space-y-2 pt-2 text-sm">
          <span className="text-slate-600 font-medium block">{t.wizard.phase2JunctionType}</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: "ROUNDABOUT", label: "Roundabout" },
              { id: "INTERSECTION", label: "Crossroads" },
              { id: "STRAIGHT_ROAD", label: "Straight Road" },
              { id: "PARKING", label: "Parking / Lot" },
            ].map((j) => (
              <button
                key={j.id}
                type="button"
                onClick={() => setJunctionType(j.id as typeof junctionType)}
                className={`min-h-[44px] py-2.5 px-3 rounded-xl font-semibold text-xs border transition-colors text-center ${
                  junctionType === j.id
                    ? "bg-blue-600 text-white border-blue-600 shadow-2xs font-bold"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {j.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Date and Time Question */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-4">
        <label className="font-bold text-slate-950 text-base block">
          {t.wizard.phase2DateTime}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <span className="text-slate-600 font-medium">{t.wizard.phase2Date}</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 font-mono"
            />
          </div>
          <div className="space-y-1">
            <span className="text-slate-600 font-medium">{t.wizard.phase2Time}</span>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 font-mono"
            />
          </div>
        </div>
      </div>

      {/* 3. Circumstances & Emergency Inquiries */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-4">
        <label className="font-bold text-slate-950 text-base block">
          Circumstances &amp; Conditions
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          {/* Vehicles count */}
          <div className="space-y-1.5">
            <span className="text-slate-600 font-medium block">{t.wizard.phase2VehiclesInvolved}</span>
            <div className="flex items-center gap-2">
              {[2, 3, 1].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setVehiclesCount(n)}
                  className={`min-h-[44px] flex-1 py-2.5 rounded-xl font-bold text-xs border text-center transition-colors ${
                    vehiclesCount === n
                      ? "bg-slate-950 text-white border-slate-950"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {n === 1 ? "Single" : `${n}`}
                </button>
              ))}
            </div>
          </div>

          {/* Injuries */}
          <div className="space-y-1.5">
            <span className="text-slate-600 font-medium block">{t.wizard.phase2Injuries}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAnyInjured(false)}
                className={`min-h-[44px] flex-1 py-2.5 rounded-xl font-bold text-xs border text-center transition-colors ${
                  !anyInjured
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => setAnyInjured(true)}
                className={`min-h-[44px] flex-1 py-2.5 rounded-xl font-bold text-xs border text-center transition-colors ${
                  anyInjured
                    ? "bg-rose-600 text-white border-rose-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Yes
              </button>
            </div>
          </div>

          {/* Police */}
          <div className="space-y-1.5">
            <span className="text-slate-600 font-medium block">{t.wizard.phase2PolicePresent}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPolicePresent(false)}
                className={`min-h-[44px] flex-1 py-2.5 rounded-xl font-bold text-xs border text-center transition-colors ${
                  !policePresent
                    ? "bg-slate-950 text-white border-slate-950"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => setPolicePresent(true)}
                className={`min-h-[44px] flex-1 py-2.5 rounded-xl font-bold text-xs border text-center transition-colors ${
                  policePresent
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleContinue}
          className="min-h-[52px] w-full py-4 px-6 rounded-2xl font-bold text-base bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center justify-center gap-2.5 transition-all active:scale-[0.98]"
        >
          <span>{t.wizard.phase2Next}</span>
          <ArrowRightIcon size={18} />
        </button>
      </div>
    </div>
  );
}
