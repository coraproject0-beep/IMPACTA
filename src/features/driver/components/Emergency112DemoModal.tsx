"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CloseIcon } from "@/components/icons/Icons";
import { EmergencyRadar } from "@/components/ui/EmergencyRadar";

interface Emergency112DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Emergency112DemoModal({
  isOpen,
  onClose,
}: Emergency112DemoModalProps) {
  const { language } = useLanguage();
  const isIt = language === "it";

  const [callState, setCallState] = useState<"connecting" | "connected">("connecting");
  const [seconds, setSeconds] = useState(0);

  // Reset and manage local simulation timers
  useEffect(() => {
    if (!isOpen) {
      setCallState("connecting");
      setSeconds(0);
      return;
    }

    // Connecting transition after 1.8 seconds
    const connectTimer = setTimeout(() => {
      setCallState("connected");
    }, 1800);

    // Call duration timer
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearTimeout(connectTimer);
      clearInterval(interval);
    };
  }, [isOpen]);

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isIt ? "Simulazione emergenza 112" : "112 Emergency Simulation"}
      className="fixed inset-0 z-50 bg-[#0A0A0C] text-white flex flex-col justify-between p-4 sm:p-8 lg:p-12 select-none overflow-y-auto"
    >
      {/* 1. TOP BAR: Crisp, small demo disclaimer + close button */}
      <div className="w-full max-w-3xl mx-auto flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <EmergencyRadar size={18} showSweep={false} />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium text-neutral-400">
            {isIt
              ? "DEMO — NESSUNA CHIAMATA DI EMERGENZA IN CORSO"
              : "DEMO — NO EMERGENCY CALL IS BEING PLACED"}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 text-neutral-400 hover:text-white rounded-lg transition-colors focus:outline-none"
          aria-label={isIt ? "Chiudi simulazione" : "Close simulation"}
        >
          <CloseIcon size={20} />
        </button>
      </div>

      {/* 2. CENTRAL STAGE: Radar Motif + 112 + Calm Status + Timer + Safety Guidance */}
      <div className="my-auto w-full max-w-md mx-auto flex flex-col items-center text-center px-4 py-6 sm:py-10 space-y-6">
        {/* Animated Emergency Radar (Calm urgency) */}
        <div className="relative flex items-center justify-center p-3">
          <EmergencyRadar size={56} showSweep={true} />
        </div>

        {/* 112 Numeral */}
        <div className="space-y-1">
          <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tight text-white leading-none">
            112
          </h1>
          <div className="text-xs uppercase tracking-[0.22em] text-neutral-400 font-mono">
            {isIt ? "NUMERO UNICO EUROPEO" : "EUROPEAN EMERGENCY NUMBER"}
          </div>
        </div>

        {/* Status & Timer */}
        <div className="space-y-2 pt-2" aria-live="polite">
          <div className="text-base sm:text-lg font-medium text-neutral-200">
            {callState === "connecting"
              ? isIt
                ? "Connessione in corso..."
                : "Connecting..."
              : isIt
              ? "Connessione demo attiva"
              : "Demo connection active"}
          </div>
          <div className="font-mono text-xl sm:text-2xl text-neutral-400 tracking-wider">
            {formatTimer(seconds)}
          </div>
        </div>

        {/* Safety Guidance */}
        <p className="text-xs sm:text-sm text-neutral-400 max-w-xs sm:max-w-sm font-light leading-relaxed">
          {isIt
            ? "Resta in linea. Parla con chiarezza e comunica la posizione solo su richiesta dell'operatore."
            : "Stay on the line. Speak clearly and provide your location when requested by dispatch."}
        </p>
      </div>

      {/* 3. BOTTOM ACTION: End Demo button (Guaranteed reachable, no clipping) */}
      <div className="w-full max-w-sm mx-auto pt-4 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={onClose}
          className="w-full py-4 px-6 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-sm tracking-wide transition-all shadow-md active:scale-[0.99] focus:outline-none"
        >
          {isIt ? "Termina demo" : "End demo"}
        </button>
        <span className="text-[11px] text-neutral-500 font-light">
          {isIt ? "Premi Esc o tocca Termina demo" : "Press Esc or tap End demo"}
        </span>
      </div>
    </div>
  );
}
