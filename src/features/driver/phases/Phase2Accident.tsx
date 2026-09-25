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
    <div className="space-y-10 py-2 max-w-xl mx-auto selection:bg-[#090A0A] selection:text-white">
      {/* Step Header */}
      <div className="space-y-3 pb-6 border-b border-[#D7D9D8]">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#6F7375]">
          {t.wizard.phase2Title}
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#090A0A] leading-[1.05]">
          {t.wizard.phase2WhereWhen}
        </h1>
        <p className="text-base sm:text-lg text-[#6F7375] font-normal leading-relaxed pt-1">
          {isIt
            ? "Indica la posizione e le circostanze per collocare con precisione l'evento per la perizia assicurativa."
            : "Provide the location and basic circumstances to position the event accurately for insurer review."}
        </p>
      </div>

      {/* 1. Location Decision */}
      <div className="space-y-4 pb-8 border-b border-[#D7D9D8]">
        <div className="flex items-center justify-between">
          <label className="font-bold text-[#090A0A] text-sm uppercase tracking-wider flex items-center gap-2">
            <MapPinIcon size={16} />
            <span>{isIt ? "Luogo dell'impatto" : "Collision location"}</span>
          </label>
          <button
            type="button"
            onClick={setDemoLocation}
            className="text-xs font-semibold text-[#090A0A] hover:underline uppercase tracking-wider"
          >
            {t.wizard.phase2DemoRoundabout}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-xs text-[#6F7375] uppercase tracking-wider">{t.wizard.phase2City}</span>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Firenze"
              className="w-full min-h-[50px] px-4 py-3 border border-[#D7D9D8] bg-white focus:border-[#090A0A] focus:outline-none text-[#090A0A] font-medium text-sm"
            />
          </div>
          <div className="space-y-1">
            <span className="text-xs text-[#6F7375] uppercase tracking-wider">{t.wizard.phase2Street}</span>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="e.g. Piazza San Giovanni"
              className="w-full min-h-[50px] px-4 py-3 border border-[#D7D9D8] bg-white focus:border-[#090A0A] focus:outline-none text-[#090A0A] font-medium text-sm"
            />
          </div>
        </div>

        {/* Junction Type Selector */}
        <div className="space-y-2 pt-2">
          <span className="text-xs text-[#6F7375] uppercase tracking-wider block">{t.wizard.phase2JunctionType}</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: "ROUNDABOUT", label: isIt ? "Rotatoria" : "Roundabout" },
              { id: "INTERSECTION", label: isIt ? "Incrocio" : "Crossroads" },
              { id: "STRAIGHT_ROAD", label: isIt ? "Rettilineo" : "Straight Road" },
              { id: "PARKING", label: isIt ? "Parcheggio" : "Parking Lot" },
            ].map((j) => (
              <button
                key={j.id}
                type="button"
                onClick={() => setJunctionType(j.id as typeof junctionType)}
                className={`min-h-[46px] py-2 px-3 text-xs font-semibold uppercase tracking-wider border transition-colors text-center ${
                  junctionType === j.id
                    ? "bg-[#090A0A] text-white border-[#090A0A]"
                    : "bg-white text-[#6F7375] border-[#D7D9D8] hover:border-[#090A0A] hover:text-[#090A0A]"
                }`}
              >
                {j.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Date and Time */}
      <div className="space-y-4 pb-8 border-b border-[#D7D9D8]">
        <label className="font-bold text-[#090A0A] text-sm uppercase tracking-wider block">
          {t.wizard.phase2DateTime}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-xs text-[#6F7375] uppercase tracking-wider">{t.wizard.phase2Date}</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full min-h-[50px] px-4 py-3 border border-[#D7D9D8] bg-white focus:border-[#090A0A] focus:outline-none text-[#090A0A] font-mono text-sm"
            />
          </div>
          <div className="space-y-1">
            <span className="text-xs text-[#6F7375] uppercase tracking-wider">{t.wizard.phase2Time}</span>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full min-h-[50px] px-4 py-3 border border-[#D7D9D8] bg-white focus:border-[#090A0A] focus:outline-none text-[#090A0A] font-mono text-sm"
            />
          </div>
        </div>
      </div>

      {/* 3. Circumstances & Conditions */}
      <div className="space-y-4 pb-8">
        <label className="font-bold text-[#090A0A] text-sm uppercase tracking-wider block">
          {isIt ? "Circostanze e condizioni" : "Circumstances & conditions"}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Vehicles count */}
          <div className="space-y-1.5">
            <span className="text-xs text-[#6F7375] uppercase tracking-wider block">{t.wizard.phase2VehiclesInvolved}</span>
            <div className="flex items-center gap-1.5">
              {[2, 3, 1].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setVehiclesCount(n)}
                  className={`min-h-[46px] flex-1 py-2 text-xs font-semibold uppercase tracking-wider border text-center transition-colors ${
                    vehiclesCount === n
                      ? "bg-[#090A0A] text-white border-[#090A0A]"
                      : "bg-white text-[#6F7375] border-[#D7D9D8] hover:border-[#090A0A] hover:text-[#090A0A]"
                  }`}
                >
                  {n === 1 ? (isIt ? "Solo io" : "Single") : `${n}`}
                </button>
              ))}
            </div>
          </div>

          {/* Injuries */}
          <div className="space-y-1.5">
            <span className="text-xs text-[#6F7375] uppercase tracking-wider block">{t.wizard.phase2Injuries}</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setAnyInjured(false)}
                className={`min-h-[46px] flex-1 py-2 text-xs font-semibold uppercase tracking-wider border text-center transition-colors ${
                  !anyInjured
                    ? "bg-[#090A0A] text-white border-[#090A0A]"
                    : "bg-white text-[#6F7375] border-[#D7D9D8] hover:border-[#090A0A] hover:text-[#090A0A]"
                }`}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => setAnyInjured(true)}
                className={`min-h-[46px] flex-1 py-2 text-xs font-semibold uppercase tracking-wider border text-center transition-colors ${
                  anyInjured
                    ? "bg-rose-600 text-white border-rose-600"
                    : "bg-white text-[#6F7375] border-[#D7D9D8] hover:border-[#090A0A] hover:text-[#090A0A]"
                }`}
              >
                {isIt ? "Sì" : "Yes"}
              </button>
            </div>
          </div>

          {/* Police */}
          <div className="space-y-1.5">
            <span className="text-xs text-[#6F7375] uppercase tracking-wider block">{t.wizard.phase2PolicePresent}</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setPolicePresent(false)}
                className={`min-h-[46px] flex-1 py-2 text-xs font-semibold uppercase tracking-wider border text-center transition-colors ${
                  !policePresent
                    ? "bg-[#090A0A] text-white border-[#090A0A]"
                    : "bg-white text-[#6F7375] border-[#D7D9D8] hover:border-[#090A0A] hover:text-[#090A0A]"
                }`}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => setPolicePresent(true)}
                className={`min-h-[46px] flex-1 py-2 text-xs font-semibold uppercase tracking-wider border text-center transition-colors ${
                  policePresent
                    ? "bg-[#090A0A] text-white border-[#090A0A]"
                    : "bg-white text-[#6F7375] border-[#D7D9D8] hover:border-[#090A0A] hover:text-[#090A0A]"
                }`}
              >
                {isIt ? "Sì" : "Yes"}
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
          className="min-h-[56px] w-full py-4 px-6 font-bold text-sm uppercase tracking-wider bg-[#090A0A] hover:bg-[#171819] text-white flex items-center justify-between transition-colors"
        >
          <span>{t.wizard.phase2Next}</span>
          <ArrowRightIcon size={18} />
        </button>
      </div>
    </div>
  );
}
