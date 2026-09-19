"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, Translations, translations } from "@/i18n/translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("impacta_language_preference");
      if (saved === "en" || saved === "it") {
        setLocaleState(saved);
      } else {
        // Auto-detect browser language
        const browserLang = navigator.language.slice(0, 2);
        if (browserLang === "it") {
          setLocaleState("it");
        }
      }
    } catch {
      // Ignore localStorage read errors in restricted contexts
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem("impacta_language_preference", newLocale);
    } catch {
      // Ignore write errors
    }
  };

  const value: LanguageContextType = {
    locale,
    setLocale,
    t: translations[locale],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Graceful fallback for SSR or components rendered outside provider
    return {
      locale: "en" as Locale,
      setLocale: () => {},
      t: translations.en,
    };
  }
  return context;
}

export function LanguageSelector({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language selector"
      className={`inline-flex items-center rounded-lg border border-slate-200 bg-slate-50/80 p-0.5 text-xs font-semibold select-none ${className}`}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`px-2 py-1 rounded-md transition-all ${
          locale === "en"
            ? "bg-white text-slate-950 shadow-xs font-bold"
            : "text-slate-500 hover:text-slate-900"
        }`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("it")}
        className={`px-2 py-1 rounded-md transition-all ${
          locale === "it"
            ? "bg-white text-slate-950 shadow-xs font-bold"
            : "text-slate-500 hover:text-slate-900"
        }`}
        aria-pressed={locale === "it"}
      >
        IT
      </button>
    </div>
  );
}
