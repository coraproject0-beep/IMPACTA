"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeftIcon } from "@/components/icons/Icons";

interface ReportHeaderProps {
  phaseNumber: number;
  totalPhases?: number;
  phaseTitle?: string;
  onBack: () => void;
  onSaveAndExit: () => void;
  showBack?: boolean;
  showSaveAndExit?: boolean;
}

export function ReportHeader({
  phaseNumber,
  totalPhases = 4,
  onBack,
  onSaveAndExit,
  showBack = true,
  showSaveAndExit = true,
}: ReportHeaderProps) {
  const { language } = useLanguage();
  const isIt = language === "it";

  const progressPercent = Math.min(100, Math.max(10, (phaseNumber / totalPhases) * 100));

  return (
    <header className="sticky top-0 z-30 bg-[#F7F7F6]/95 backdrop-blur-md border-b border-[#E5E5E3] select-none">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Left: Back Action matching driver-report-step-reference.png */}
        <div className="flex items-center min-w-[80px]">
          {showBack ? (
            <button
              type="button"
              onClick={onBack}
              className="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-normal text-[#0E0F10] hover:text-[#666666] transition-colors focus:outline-none"
              aria-label={isIt ? "Torna indietro" : "Back"}
            >
              <ArrowLeftIcon size={16} />
              <span>{isIt ? "Indietro" : "Back"}</span>
            </button>
          ) : (
            <Link
              href="/app"
              className="text-sm font-bold tracking-tight text-[#0E0F10] uppercase"
            >
              IMPACTA
            </Link>
          )}
        </div>

        {/* Center: Clean Centered Title matching driver-report-step-reference.png */}
        <div className="text-center min-w-0 flex-1">
          <div className="text-base font-medium text-[#0E0F10] truncate">
            {isIt ? "Rapporto incidente" : "Accident report"}
          </div>
        </div>

        {/* Right: Save & Exit matching driver-report-step-reference.png */}
        <div className="flex items-center justify-end min-w-[80px]">
          {showSaveAndExit && (
            <button
              type="button"
              onClick={onSaveAndExit}
              className="min-h-[44px] inline-flex items-center text-sm font-normal text-[#0E0F10] hover:text-[#666666] transition-colors focus:outline-none"
              title={isIt ? "Salva ed esci" : "Save & exit"}
            >
              <span>{isIt ? "Salva ed esci" : "Save & exit"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Thin Minimal Progress Line */}
      <div className="w-full h-[1.5px] bg-[#E5E5E3] overflow-hidden">
        <div
          className="h-full bg-[#0E0F10] transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
}
