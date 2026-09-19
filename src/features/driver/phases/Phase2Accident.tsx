"use client";

import React, { useState } from "react";
import { DriverDraft } from "@/types/driver";
import { ArrowRightIcon, CheckCircleIcon, MapPinIcon } from "@/components/icons/Icons";

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
    <div className="space-y-8 py-2 max-w-2xl">
      {/* Step Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
          Step 2 · Accident Context
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight">
          Where and when did the accident happen?
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Provide the location and basic circumstances to position the event accurately for insurer review.
        </p>
      </div>

      {/* 1. Location Question */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <MapPinIcon size={16} className="text-blue-600" />
            <span>Where did the collision occur?</span>
          </label>
          <button
            type="button"
            onClick={setDemoLocation}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            Use Florence Roundabout
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <span className="text-slate-500 font-medium">City / Municipality</span>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Firenze"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
            />
          </div>
          <div className="space-y-1">
            <span className="text-slate-500 font-medium">Street or Junction</span>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="e.g. Piazza San Giovanni"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
            />
          </div>
        </div>

        {/* Junction Type Selector */}
        <div className="space-y-1.5 pt-1 text-xs">
          <span className="text-slate-500 font-medium block">Road Geometry</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                className={`py-2 px-3 rounded-xl font-medium text-xs border transition-colors text-center ${
                  junctionType === j.id
                    ? "bg-blue-600 text-white border-blue-600 shadow-2xs font-semibold"
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
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
        <label className="font-bold text-slate-900 text-sm block">
          When did it occur?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <span className="text-slate-500 font-medium">Date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 font-mono"
            />
          </div>
          <div className="space-y-1">
            <span className="text-slate-500 font-medium">Approximate Time</span>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 font-mono"
            />
          </div>
        </div>
      </div>

      {/* 3. Circumstances & Emergency Inquiries */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
        <label className="font-bold text-slate-900 text-sm block">
          Vehicles &amp; Circumstances
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Vehicles count */}
          <div className="space-y-1.5">
            <span className="text-slate-500 font-medium block">Vehicles Involved</span>
            <div className="flex items-center gap-2">
              {[2, 3, 1].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setVehiclesCount(n)}
                  className={`flex-1 py-2 rounded-xl font-medium border text-center ${
                    vehiclesCount === n
                      ? "bg-slate-950 text-white border-slate-950"
                      : "bg-white text-slate-700 border-slate-200"
                  }`}
                >
                  {n === 1 ? "Single" : `${n}`}
                </button>
              ))}
            </div>
          </div>

          {/* Injuries */}
          <div className="space-y-1.5">
            <span className="text-slate-500 font-medium block">Anyone Injured?</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAnyInjured(false)}
                className={`flex-1 py-2 rounded-xl font-medium border text-center ${
                  !anyInjured
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white text-slate-700 border-slate-200"
                }`}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => setAnyInjured(true)}
                className={`flex-1 py-2 rounded-xl font-medium border text-center ${
                  anyInjured
                    ? "bg-rose-600 text-white border-rose-600"
                    : "bg-white text-slate-700 border-slate-200"
                }`}
              >
                Yes
              </button>
            </div>
          </div>

          {/* Police */}
          <div className="space-y-1.5">
            <span className="text-slate-500 font-medium block">Police Called?</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPolicePresent(false)}
                className={`flex-1 py-2 rounded-xl font-medium border text-center ${
                  !policePresent
                    ? "bg-slate-950 text-white border-slate-950"
                    : "bg-white text-slate-700 border-slate-200"
                }`}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => setPolicePresent(true)}
                className={`flex-1 py-2 rounded-xl font-medium border text-center ${
                  policePresent
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-700 border-slate-200"
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
          className="w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center justify-center gap-2.5 transition-all active:scale-[0.98]"
        >
          <span>Continue to Evidence Capture</span>
          <ArrowRightIcon size={16} />
        </button>
      </div>
    </div>
  );
}
