"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { PhoneIcon, CloseIcon } from "@/components/icons/Icons";

interface Emergency112DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Emergency112DemoModal({
  isOpen,
  onClose,
}: Emergency112DemoModalProps) {
  const { locale } = useLanguage();
  const isIt = locale === "it";

  const [callState, setCallState] = useState<"connecting" | "connected">("connecting");
  const [seconds, setSeconds] = useState(0);

  // Reset and manage local simulation timers
  useEffect(() => {
    if (!isOpen) {
      setCallState("connecting");
      setSeconds(0);
      return;
    }

    // Connecting transition after 2 seconds
    const connectTimer = setTimeout(() => {
      setCallState("connected");
    }, 2000);

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
      return () => window.removeEventListener("keydown", handleKeyDown);
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
      aria-label={isIt ? "Simulazione chiamata emergenza 112" : "112 Emergency Call Simulation"}
      className="fixed inset-0 z-50 bg-[#0E0F10] text-white flex flex-col justify-between p-6 sm:p-12 lg:p-16 select-none overflow-hidden animate-fade-in"
    >
      {/* Top Header: Explicit Mandatory Demo Notice + Safe Close */}
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
          <div className="text-xs sm:text-sm font-mono tracking-wider uppercase text-neutral-300">
            {isIt
              ? "Simulazione demo • Nessuna chiamata reale"
              : "Demo simulation • No emergency call placed"}
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 text-white/60 hover:text-white rounded-lg transition-colors focus:outline-none"
          aria-label={isIt ? "Chiudi simulazione" : "Close simulation"}
        >
          <CloseIcon size={20} />
        </button>
      </div>

      {/* Central Calling Stage: Restrained Red Pulse + 112 Typography */}
      <div className="relative my-auto flex flex-col items-center justify-center text-center max-w-xl mx-auto px-4 py-8">
        {/* Subtle, Serious Concentric Pulse Rings (Reduced motion safe) */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-rose-600/10 motion-safe:animate-ping opacity-60 pointer-events-none" />
          <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-rose-600/15 motion-safe:animate-pulse pointer-events-none" />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-[0_0_40px_rgba(225,29,72,0.35)]">
            <PhoneIcon size={40} className="text-white" />
          </div>
        </div>

        {/* Prominent Number */}
        <h1 className="text-7xl sm:text-9xl font-bold tracking-tight text-white mb-3">
          112
        </h1>

        {/* Call State & Live Timer */}
        <div className="space-y-2 mb-6" aria-live="polite">
          <p className="text-lg sm:text-xl font-medium tracking-normal text-white/90">
            {callState === "connecting"
              ? isIt
                ? "Connessione in corso..."
                : "Connecting..."
              : isIt
              ? "Linea di emergenza connessa"
              : "Emergency line connected"}
          </p>
          <p className="font-mono text-sm sm:text-base text-white/60 tracking-wider">
            {formatTimer(seconds)}
          </p>
        </div>

        {/* Calm Emergency Guidance */}
        <p className="text-sm sm:text-base text-neutral-300 max-w-md font-light leading-relaxed mb-4">
          {isIt
            ? "Resta in linea. Condividi la tua posizione e le circostanze se richiesto dall'operatore."
            : "Stay on the line. Share your location and circumstances when requested by dispatch."}
        </p>

        {/* Explicit Demo Disclaimer Box */}
        <div className="mt-4 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm text-neutral-400 font-normal max-w-sm">
          {isIt
            ? "Questa è una simulazione per test accademico e dimostrativo. I servizi di emergenza reali non vengono allertati."
            : "This is a prototype demonstration. Real-world emergency dispatch services are not alerted."}
        </div>
      </div>

      {/* Bottom Safe Exit Action: End Demo Call */}
      <div className="w-full max-w-md mx-auto pt-6 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={onClose}
          className="w-full py-4 px-8 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-base sm:text-lg tracking-wide transition-all shadow-lg hover:shadow-rose-600/30 active:scale-[0.99] focus:outline-none"
        >
          {isIt ? "Termina simulazione chiamata" : "End demo call"}
        </button>

        <p className="text-xs text-white/40 font-mono">
          {isIt ? "Premi ESC per tornare al flusso" : "Press ESC to return to workflow"}
        </p>
      </div>
    </div>
  );
}
