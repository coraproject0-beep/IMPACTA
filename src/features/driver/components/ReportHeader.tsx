"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeftIcon } from "@/components/icons/Icons";

interface ReportHeaderProps {
  phaseNumber: number;
  totalPhases?: number;
  phaseTitle: string;
  onBack: () => void;
  onSaveAndExit: () => void;
  showBack?: boolean;
  showSaveAndExit?: boolean;
}

export function ReportHeader({
  phaseNumber,
  totalPhases = 4,
  phaseTitle,
  onBack,
  onSaveAndExit,
  showBack = true,
  showSaveAndExit = true,
}: ReportHeaderProps) {
  const { language } = useLanguage();
  const isIt = language === "it";

  const progressPercent = Math.min(100, Math.max(5, (phaseNumber / totalPhases) * 100));

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#D7D9D8] select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-4">
        {/* Left: Back Action */}
        <div className="flex items-center min-w-[100px]">
          {showBack ? (
            <button
              type="button"
              onClick={onBack}
              className="min-h-[44px] inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#090A0A] hover:text-[#6F7375] transition-colors focus:outline-none"
              aria-label={isIt ? "Fase precedente" : "Previous step"}
            >
              <ArrowLeftIcon size={16} />
              <span>{isIt ? "Indietro" : "Back"}</span>
            </button>
          ) : (
            <Link
              href="/app"
              className="text-xs sm:text-sm font-bold tracking-tight text-[#090A0A] flex items-center gap-2"
            >
              <span className="w-6 h-6 bg-[#090A0A] text-white flex items-center justify-center text-[10px] font-bold">
                IM
              </span>
              <span className="uppercase">IMPACTA</span>
            </Link>
          )}
        </div>

        {/* Center: Title & Current Phase */}
        <div className="text-center min-w-0 px-2 flex-1">
          <div className="text-xs uppercase font-medium text-[#6F7375] tracking-wider">
            {isIt ? `Fase ${phaseNumber} di ${totalPhases}` : `Phase ${phaseNumber} of ${totalPhases}`}
          </div>
          <div className="text-sm sm:text-base font-bold text-[#090A0A] truncate">
            {phaseTitle}
          </div>
        </div>

        {/* Right: Save & Exit */}
        <div className="flex items-center justify-end min-w-[100px]">
          {showSaveAndExit && (
            <button
              type="button"
              onClick={onSaveAndExit}
              className="min-h-[44px] inline-flex items-center text-xs sm:text-sm font-semibold text-[#6F7375] hover:text-[#090A0A] transition-colors focus:outline-none"
              title={isIt ? "Salva la bozza ed esci" : "Save your progress and return to home"}
            >
              <span>{isIt ? "Salva ed esci" : "Save & exit"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Thin Minimal Progress Line */}
      <div className="w-full h-[2px] bg-[#E5E7EB] overflow-hidden">
        <div
          className="h-full bg-[#090A0A] transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
}
