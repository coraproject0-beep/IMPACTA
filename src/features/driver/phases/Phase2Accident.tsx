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
  const { t, language } = useLanguage();
  const isIt = language === "it";
  const [city, setCity] = useState(draft.location.city || "Milano");
  const [street, setStreet] = useState(draft.location.street || "Via Lorenteggio");
  const [junctionType, setJunctionType] = useState(draft.location.junctionType || "ROUNDABOUT");
  const [date, setDate] = useState(draft.incidentDate || "2026-09-25");
  const [time, setTime] = useState(draft.incidentTime || "08:42");
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
    setCity("Milano");
    setStreet("Via Lorenteggio");
    setJunctionType("ROUNDABOUT");
  };

  return (
    <div className="max-w-md mx-auto py-2 space-y-7 selection:bg-[#0E0F10] selection:text-white">
      {/* Title & Description */}
      <div className="space-y-2 pt-1">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#0E0F10]">
          {isIt ? "Dove e quando è successo?" : "Where and when?"}
        </h1>
        <p className="text-base sm:text-lg text-[#666666] font-normal leading-snug">
          {isIt
            ? "Indica la posizione e l'orario dell'incidente per la documentazione."
            : "Set the location and time of the incident to anchor your report."}
        </p>
      </div>

      {/* 1. Location Inputs */}
      <div className="space-y-4 pt-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#666666] flex items-center gap-1.5">
            <MapPinIcon size={14} />
            <span>{isIt ? "Luogo dell'impatto" : "Collision location"}</span>
          </label>
          <button
            type="button"
            onClick={setDemoLocation}
            className="text-xs font-medium text-[#0E0F10] hover:underline"
          >
            {t("wizard.phase2DemoRoundabout")}
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={isIt ? "Città (es. Milano)" : "City (e.g. Milano)"}
              className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-[#E5E5E3] bg-white focus:border-[#0E0F10] focus:outline-none text-[#0E0F10] text-sm"
            />
          </div>
          <div>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder={isIt ? "Via o piazza" : "Street or junction"}
              className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-[#E5E5E3] bg-white focus:border-[#0E0F10] focus:outline-none text-[#0E0F10] text-sm"
            />
          </div>
        </div>
      </div>

      {/* 2. Date and Time */}
      <div className="space-y-3 pt-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] block">
          {t("wizard.phase2DateTime")}
        </span>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border border-[#E5E5E3] bg-white focus:border-[#0E0F10] focus:outline-none text-[#0E0F10] font-mono text-sm"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border border-[#E5E5E3] bg-white focus:border-[#0E0F10] focus:outline-none text-[#0E0F10] font-mono text-sm"
          />
        </div>
      </div>

      {/* 3. Vehicles Count */}
      <div className="space-y-3 pt-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] block">
          {t("wizard.phase2VehiclesInvolved")}
        </span>
        <div className="grid grid-cols-3 gap-3">
          {[2, 3, 4].map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => setVehiclesCount(count)}
              className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all border ${
                vehiclesCount === count
                  ? "bg-[#0E0F10] text-white border-[#0E0F10]"
                  : "bg-white text-[#0E0F10] border-[#E5E5E3] hover:border-[#0E0F10]"
              }`}
            >
              {count} {isIt ? "veicoli" : "vehicles"}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Injury Check */}
      <div className="space-y-3 pt-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#666666] block">
          {t("wizard.phase2Injuries")}
        </span>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setAnyInjured(false)}
            className={`py-3 px-4 rounded-xl text-sm font-medium transition-all border ${
              !anyInjured
                ? "bg-[#0E0F10] text-white border-[#0E0F10]"
                : "bg-white text-[#0E0F10] border-[#E5E5E3]"
            }`}
          >
            {t("wizard.phase2InjuriesNo")}
          </button>
          <button
            type="button"
            onClick={() => setAnyInjured(true)}
            className={`py-3 px-4 rounded-xl text-sm font-medium transition-all border ${
              anyInjured
                ? "bg-rose-600 text-white border-rose-600"
                : "bg-white text-[#0E0F10] border-[#E5E5E3]"
            }`}
          >
            {t("wizard.phase2InjuriesYes")}
          </button>
        </div>
      </div>

      {/* Hairline Divider & Continue */}
      <div className="pt-4 border-t border-[#E5E5E3]">
        <button
          type="button"
          onClick={handleContinue}
          className="w-full py-4 px-6 rounded-2xl bg-[#0E0F10] hover:bg-[#1A1B1C] text-white text-base font-medium flex items-center justify-between transition-colors group"
        >
          <span>{isIt ? "Continua con le foto" : "Continue to photos"}</span>
          <ArrowRightIcon size={20} className="text-white group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
