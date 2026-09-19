"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeftIcon, CloseIcon } from "@/components/icons/Icons";

interface DriverHeaderProps {
  stepNumber?: number;
  totalSteps?: number;
  title?: string;
  onBack?: () => void;
  showBack?: boolean;
}

export function DriverHeader({
  stepNumber,
  totalSteps = 7,
  title,
  onBack,
  showBack = true,
}: DriverHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-4 py-3 select-none">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Left: Back or Brand */}
        <div className="flex items-center gap-2 min-w-[70px]">
          {showBack && onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="p-1.5 -ml-1 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-label="Previous step"
            >
              <ArrowLeftIcon size={18} />
            </button>
          ) : (
            <Link
              href="/app"
              className="font-bold text-xs tracking-tight text-slate-950 flex items-center gap-1.5"
            >
              <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center text-[10px]">
                IM
              </span>
              <span>IMPACTA</span>
            </Link>
          )}
        </div>

        {/* Center: Title / Step Indicator */}
        <div className="text-center">
          {stepNumber !== undefined && (
            <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              Step {stepNumber} of {totalSteps}
            </div>
          )}
          {title && (
            <div className="text-xs font-bold text-slate-900 truncate max-w-[180px]">
              {title}
            </div>
          )}
        </div>

        {/* Right: Exit / Home */}
        <div className="flex items-center justify-end min-w-[70px]">
          <Link
            href="/app"
            className="text-[11px] font-medium text-slate-500 hover:text-slate-800 px-2 py-1 rounded hover:bg-slate-100 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </div>
    </header>
  );
}
