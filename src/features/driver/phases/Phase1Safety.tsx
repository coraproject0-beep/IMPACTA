"use client";

import React, { useState } from "react";
import { DriverDraft } from "@/types/driver";
import { useLanguage } from "@/context/LanguageContext";
import { AlertTriangleIcon, ArrowRightIcon } from "@/components/icons/Icons";
import { Emergency112DemoModal } from "@/features/driver/components/Emergency112DemoModal";
import { EmergencyRadar } from "@/components/ui/EmergencyRadar";

interface Phase1SafetyProps {
  draft: DriverDraft;
  onUpdate: (patch: Partial<DriverDraft>) => void;
  onNext: () => void;
}

export function Phase1Safety({ onUpdate, onNext }: Phase1SafetyProps) {
  const { t, language } = useLanguage();
  const isIt = language === "it";
  const [showGuidance, setShowGuidance] = useState(false);
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [show112Modal, setShow112Modal] = useState(false);

  const handleContinue = () => {
    onUpdate({
      safetyConfirmed: true,
      anyInjured: false,
    });
    onNext();
  };

  return (
    <div className="w-full max-w-md lg:max-w-4xl mx-auto py-2 selection:bg-[#0E0F10] selection:text-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Primary Question, Supportive Guidance & Precautions Checklist */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3 pt-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0E0F10] leading-[1.08]">
              {t("wizard.phase1Question")}
            </h1>
            <p className="text-base sm:text-lg text-[#666666] font-normal leading-relaxed">
              {isIt
                ? "Fai un respiro calmo. Prima di raccogliere fotografie o dettagli, assicurati che tutte le persone siano al sicuro fuori dalla traiettoria del traffico."
                : "Take a calm breath. Before capturing damage photos, ensure everyone is out of danger and away from moving traffic."}
            </p>
          </div>

          {/* Roadside Precautions Checklist Accordion */}
          <div className="pt-4 border-t border-[#E5E5E3]">
            <button
              type="button"
              onClick={() => setShowGuidance(!showGuidance)}
              className="w-full text-left text-xs sm:text-sm font-medium text-[#666666] hover:text-[#0E0F10] transition-colors flex items-center justify-between"
            >
              <span>{t("wizard.phase1ChecklistToggle")}</span>
              <span className="text-base font-mono">{showGuidance ? "−" : "+"}</span>
            </button>

            {showGuidance && (
              <div className="mt-4 p-5 rounded-2xl border border-[#E5E5E3] bg-white space-y-3 text-xs sm:text-sm text-[#666666] animate-fade-in">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E0F10] flex-shrink-0" />
                  <span>{t("wizard.phase1ChecklistVest")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E0F10] flex-shrink-0" />
                  <span>{t("wizard.phase1ChecklistHazards")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E0F10] flex-shrink-0" />
                  <span>{t("wizard.phase1ChecklistTriangle")}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Decisions & Safe Emergency Simulation Trigger */}
        <div className="lg:col-span-5 space-y-4 pt-2">
          {/* Dominant Affirmative Action */}
          <button
            type="button"
            onClick={handleContinue}
            className="w-full py-4 px-6 text-left font-medium text-base rounded-2xl bg-[#0E0F10] hover:bg-[#1A1B1C] text-white flex items-center justify-between transition-colors group shadow-sm"
          >
            <span>{t("wizard.phase1SafetyYes")}</span>
            <ArrowRightIcon size={20} className="text-white group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Emergency Assistance Toggle */}
          <button
            type="button"
            onClick={() => setEmergencyActive(!emergencyActive)}
            className="w-full py-4 px-6 text-left font-normal text-sm rounded-2xl bg-white hover:bg-neutral-50 text-[#0E0F10] border border-[#E5E5E3] flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <AlertTriangleIcon size={18} className="text-rose-600 flex-shrink-0" />
              <span>
                {emergencyActive
                  ? (isIt ? "Nascondi richiesta soccorsi" : "Hide emergency assistance")
                  : (isIt ? "Qualcuno ha bisogno di aiuto — Simulazione 112" : "Someone needs help — 112 Demo")}
              </span>
            </div>
            <span className="text-xs text-[#666666]">{emergencyActive ? "↑" : "↓"}</span>
          </button>

          {/* Safe Emergency Hotline Action (Explicit Demo, Zero Dialer) */}
          {emergencyActive && (
            <div className="p-5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-950 space-y-3.5 animate-fade-in">
              <div className="flex items-start gap-3">
                <AlertTriangleIcon size={20} className="text-rose-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold text-sm block">{t("wizard.phase1EmergencyHelp")}</span>
                  <span className="text-xs text-rose-800 leading-relaxed block font-light">
                    {t("wizard.phase1EmergencyDesc")}
                  </span>
                </div>
              </div>

              {/* Explicit Demo Trigger - NEVER calls real phone */}
              <button
                type="button"
                onClick={() => setShow112Modal(true)}
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm focus:outline-none flex items-center justify-center gap-2.5"
              >
                <EmergencyRadar size={16} showSweep={true} />
                <span>{isIt ? "Avvia simulazione 112" : "Start 112 Demo Simulation"}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Explicit Safe Emergency Call Simulation Overlay */}
      <Emergency112DemoModal
        isOpen={show112Modal}
        onClose={() => setShow112Modal(false)}
      />
    </div>
  );
}
