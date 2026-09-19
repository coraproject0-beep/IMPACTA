"use client";

import React, { useState, useEffect } from "react";
import { InfoIcon, CheckCircleIcon } from "@/components/icons/Icons";

export function OfflineNotice() {
  const [isOffline, setIsOffline] = useState(false);
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOffline = () => {
      setIsOffline(true);
      setShowRestored(false);
    };

    const handleOnline = () => {
      setIsOffline(false);
      setShowRestored(true);
      const timer = setTimeout(() => setShowRestored(false), 3500);
      return () => clearTimeout(timer);
    };

    setIsOffline(!navigator.onLine);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (showRestored) {
    return (
      <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 text-center text-xs text-emerald-800 font-medium flex items-center justify-center gap-1.5 transition-all">
        <CheckCircleIcon size={14} className="text-emerald-600" />
        <span>Connection restored.</span>
      </div>
    );
  }

  if (!isOffline) return null;

  return (
    <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 text-center text-xs text-slate-700 font-medium flex items-center justify-center gap-1.5 transition-all">
      <InfoIcon size={14} className="text-slate-500" />
      <span>You&apos;re offline. Your report is saved locally on this device.</span>
    </div>
  );
}
