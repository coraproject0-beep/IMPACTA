"use client";

import React, { useState } from "react";
import { DriverDraft } from "@/types/driver";
import { MapPinIcon } from "@/components/icons/Icons";

interface Step2IncidentBasicsProps {
  draft: DriverDraft;
  onUpdate: (patch: Partial<DriverDraft>) => void;
  onNext: () => void;
}

export function Step2IncidentBasics({ draft, onUpdate, onNext }: Step2IncidentBasicsProps) {
  const [isLocating, setIsLocating] = useState(false);

  const handleUseCurrentLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        onUpdate({
          location: {
            ...draft.location,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            city: draft.location.city || "Current Location",
          },
        });
      },
      () => {
        setIsLocating(false);
      },
      { timeout: 5000 }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 py-2">
      <div className="space-y-1">
        <h2 className="text-base font-bold text-slate-950">
          Incident Basics
        </h2>
        <p className="text-xs text-slate-500">
          When and where did the collision occur?
        </p>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Date
          </label>
          <input
            type="date"
            required
            value={draft.incidentDate}
            onChange={(e) => onUpdate({ incidentDate: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Time
          </label>
          <input
            type="time"
            required
            value={draft.incidentTime}
            onChange={(e) => onUpdate({ incidentTime: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-slate-700">
            Location
          </label>
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={isLocating}
            className="text-[11px] text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            <MapPinIcon size={12} />
            <span>{isLocating ? "Locating..." : "Use device GPS"}</span>
          </button>
        </div>

        <input
          type="text"
          required
          placeholder="City (e.g. Roma, Milano)"
          value={draft.location.city}
          onChange={(e) =>
            onUpdate({ location: { ...draft.location, city: e.target.value } })
          }
          className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Street address or intersection (e.g. Piazza San Giovanni)"
          value={draft.location.street}
          onChange={(e) =>
            onUpdate({ location: { ...draft.location, street: e.target.value } })
          }
          className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Number of Vehicles */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Vehicles involved
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { count: 2, label: "2 vehicles" },
            { count: 3, label: "3+ vehicles" },
            { count: 1, label: "Only mine" },
          ].map((item) => (
            <button
              key={item.count}
              type="button"
              onClick={() => onUpdate({ vehiclesCount: item.count })}
              className={`py-2 px-2 text-xs rounded border text-center transition-colors font-medium ${
                draft.vehiclesCount === item.count
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles: Injuries and Police */}
      <div className="space-y-3 pt-2 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-900">Anyone injured?</div>
            <div className="text-[11px] text-slate-500">Even slight discomfort or bruises</div>
          </div>
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded border border-slate-200">
            <button
              type="button"
              onClick={() => onUpdate({ anyInjured: false })}
              className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                !draft.anyInjured ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
              }`}
            >
              No
            </button>
            <button
              type="button"
              onClick={() => onUpdate({ anyInjured: true })}
              className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                draft.anyInjured ? "bg-rose-600 text-white shadow-xs" : "text-slate-500"
              }`}
            >
              Yes
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-900">Police attending?</div>
            <div className="text-[11px] text-slate-500">Polizia Locale / Carabinieri on scene</div>
          </div>
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded border border-slate-200">
            <button
              type="button"
              onClick={() => onUpdate({ policePresent: false })}
              className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                !draft.policePresent ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
              }`}
            >
              No
            </button>
            <button
              type="button"
              onClick={() => onUpdate({ policePresent: true })}
              className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                draft.policePresent ? "bg-blue-600 text-white shadow-xs" : "text-slate-500"
              }`}
            >
              Yes
            </button>
          </div>
        </div>
      </div>

      <div className="pt-3">
        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Continue to Evidence →
        </button>
      </div>
    </form>
  );
}
