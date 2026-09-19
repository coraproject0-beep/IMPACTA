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
  const { locale } = useLanguage();
  const isIt = locale === "it";

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3.5 select-none">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Left: Back Action */}
        <div className="flex items-center gap-2 min-w-[90px]">
          {showBack ? (
            <button
              type="button"
              onClick={onBack}
              className="min-h-[44px] inline-flex items-center gap-1.5 py-1.5 px-2.5 -ml-2 text-xs font-bold text-slate-700 hover:text-slate-950 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Previous step"
            >
              <ArrowLeftIcon size={16} />
              <span>{isIt ? "Indietro" : "Back"}</span>
            </button>
          ) : (
            <Link
              href="/app"
              className="text-xs font-extrabold tracking-tight text-slate-950 flex items-center gap-1.5"
            >
              <span className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
                IM
              </span>
              <span>IMPACTA</span>
            </Link>
          )}
        </div>

        {/* Center: Phase Title & Step Indicator */}
        <div className="text-center min-w-0 px-2">
          <div className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider">
            {isIt ? `Fase ${phaseNumber} di ${totalPhases}` : `Phase ${phaseNumber} of ${totalPhases}`}
          </div>
          <div className="text-xs sm:text-sm font-bold text-slate-950 truncate">
            {phaseTitle}
          </div>
        </div>

        {/* Right: Explicit Save & Exit Button */}
        <div className="flex items-center justify-end min-w-[90px]">
          {showSaveAndExit && (
            <button
              type="button"
              onClick={onSaveAndExit}
              className="min-h-[44px] inline-flex items-center gap-1 py-1.5 px-3 text-xs font-bold text-slate-600 hover:text-slate-950 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Save your progress and return to home"
            >
              <span>{isIt ? "Salva ed esci" : "Save & exit"}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
