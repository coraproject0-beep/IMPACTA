"use client";

import React, { useState } from "react";
import { DriverDraft } from "@/types/driver";
import { MapPinIcon, ArrowRightIcon, CheckCircleIcon } from "@/components/icons/Icons";

interface Phase2AccidentProps {
  draft: DriverDraft;
  onUpdate: (patch: Partial<DriverDraft>) => void;
  onNext: () => void;
}

export function Phase2Accident({ draft, onUpdate, onNext }: Phase2AccidentProps) {
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
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
          Phase 2: Accident Details
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950">
          Where and when did the accident happen?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Provide the crash location and circumstance basics so your claim can be positioned on the road network.
        </p>
      </div>

      {/* Decision 1: Location */}
      <div className="space-y-3 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPinIcon size={16} className="text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Collision Location
            </span>
          </div>
          <button
            type="button"
            onClick={setDemoLocation}
            className="text-[11px] font-medium text-blue-600 hover:text-blue-800 underline"
          >
            Use Florence Roundabout
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              City / Comune
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Firenze, Roma, Milano"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              Street, Square or Road
            </label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="e.g. Piazza San Giovanni, Via Roma"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="pt-2">
          <label className="block text-[11px] font-medium text-slate-500 mb-1.5">
            Road Configuration
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {[
              { id: "ROUNDABOUT", label: "Roundabout" },
              { id: "INTERSECTION", label: "Intersection" },
              { id: "STRAIGHT_ROAD", label: "Straight Road" },
              { id: "PARKING_AREA", label: "Parking Area" },
            ].map((j) => (
              <button
                key={j.id}
                type="button"
                onClick={() => setJunctionType(j.id as any)}
                className={`py-2 px-2.5 rounded-lg border text-xs font-medium transition-all text-center ${
                  junctionType === j.id
                    ? "bg-slate-900 text-white border-slate-900 shadow-2xs font-semibold"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {j.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Decision 2: Date & Time */}
      <div className="space-y-3 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
          Date &amp; Time
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              Incident Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              Approximate Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Decision 3: Vehicles & Circumstances */}
      <div className="space-y-3 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs text-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
          Involved Parties
        </span>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-1 border-b border-slate-100">
            <span className="text-slate-700 font-medium">Number of vehicles involved</span>
            <div className="flex items-center gap-1.5">
              {[2, 1, 3].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setVehiclesCount(num)}
                  className={`w-8 h-8 rounded-md text-xs font-bold transition-colors ${
                    vehiclesCount === num
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-100">
            <div>
              <span className="text-slate-900 font-medium block">Were any persons injured?</span>
              <span className="text-[11px] text-slate-400">Drivers, passengers, or pedestrians</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setAnyInjured(false)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  !anyInjured
                    ? "bg-slate-900 text-white font-semibold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => setAnyInjured(true)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  anyInjured
                    ? "bg-rose-600 text-white font-semibold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Yes
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between py-1">
            <div>
              <span className="text-slate-900 font-medium block">Did Police or Carabinieri arrive?</span>
              <span className="text-[11px] text-slate-400">Formal traffic incident report drafted</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPolicePresent(false)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  !policePresent
                    ? "bg-slate-900 text-white font-semibold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => setPolicePresent(true)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  policePresent
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Forward Button */}
      <div className="pt-4 border-t border-slate-200/80">
        <button
          type="button"
          onClick={handleContinue}
          className="w-full py-3.5 px-5 bg-slate-950 hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
        >
          <span>Continue to Photo &amp; Evidence Capture</span>
          <ArrowRightIcon size={14} />
        </button>
      </div>
    </div>
  );
}
