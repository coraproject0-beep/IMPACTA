"use client";

import React from "react";
import { CarIcon } from "@/components/icons/Icons";

interface ImpactaAnalysisLoaderProps {
  isIt?: boolean;
}

export function ImpactaAnalysisLoader({ isIt = false }: ImpactaAnalysisLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="absolute inset-0 z-20 bg-[#0E0F10]/90 backdrop-blur-md flex flex-col items-center justify-center text-white p-6 text-center select-none"
    >
      {/* Automotive Orbital Composition */}
      <div className="relative w-36 h-36 flex items-center justify-center mb-6">
        {/* Subtle Outer Orbital Ring */}
        <div className="absolute inset-0 rounded-full border border-white/15" />
        <div className="absolute inset-2 rounded-full border border-dashed border-white/10" />

        {/* Center IMPACTA Mark */}
        <div className="flex flex-col items-center justify-center z-10">
          <span className="font-black text-sm tracking-[0.25em] text-white">IMPACTA</span>
          <span className="text-[9px] uppercase tracking-widest text-neutral-400 mt-0.5">Automotive AI</span>
        </div>

        {/* Orbiting Car Silhouette */}
        <div className="absolute inset-0 animate-impacta-orbit pointer-events-none motion-reduce:animate-none">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0E0F10] p-1 rounded-full border border-white/30 text-white shadow-sm">
            <CarIcon size={18} className="text-white" />
          </div>
        </div>
      </div>

      {/* Primary & Secondary Copy */}
      <div className="space-y-1.5 max-w-sm">
        <h3 className="text-base sm:text-lg font-medium tracking-tight text-white">
          {isIt ? "L'AI sta verificando le informazioni" : "AI is reviewing the evidence"}
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
          {isIt
            ? "Stiamo organizzando le informazioni per la tua revisione."
            : "We are organizing the information for your review."}
        </p>
      </div>

      {/* Calibrated Pulse Indicator */}
      <div className="flex items-center gap-1.5 mt-5">
        <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse [animation-delay:200ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse [animation-delay:400ms]" />
      </div>

      <style jsx>{`
        @keyframes impacta-orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-impacta-orbit {
          animation: impacta-orbit 6s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-impacta-orbit {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
