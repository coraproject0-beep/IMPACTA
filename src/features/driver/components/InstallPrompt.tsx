"use client";

import React, { useState, useEffect } from "react";
import { DownloadIcon, CloseIcon } from "@/components/icons/Icons";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!deferredPrompt || dismissed) return null;

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded p-3 flex items-center justify-between gap-3 text-xs mb-4">
      <div className="flex items-center gap-2">
        <DownloadIcon size={16} className="text-blue-600 flex-shrink-0" />
        <span className="text-slate-800 font-medium">
          Install IMPACTA for quick offline access
        </span>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button
          type="button"
          onClick={handleInstall}
          className="px-2.5 py-1 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700 transition-colors"
        >
          Install
        </button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="p-1 text-slate-400 hover:text-slate-600 rounded"
          aria-label="Dismiss install prompt"
        >
          <CloseIcon size={14} />
        </button>
      </div>
    </div>
  );
}
