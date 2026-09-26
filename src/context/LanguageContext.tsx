"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Locale, Translations, translations } from "@/i18n/translations";

export type TranslationFunction = {
  (key: string): string;
} & Translations;

interface LanguageContextType {
  locale: Locale;
  language: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationFunction;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function createTranslationProxy(locale: Locale): TranslationFunction {
  const dict = translations[locale] || translations.en;
  const fn = (path: string): string => {
    const parts = path.split(".");
    let curr: any = dict;
    for (const part of parts) {
      if (curr && typeof curr === "object" && part in curr) {
        curr = curr[part];
      } else {
        return path;
      }
    }
    return typeof curr === "string" ? curr : path;
  };
  return Object.assign(fn, dict);
}

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

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem("impacta_language_preference", newLocale);
    } catch {
      // Ignore write errors
    }
  }, []);

  if (typeof window !== "undefined") {
    (window as any).__impactaSetLocale = setLocale;
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).__impactaSetLocale = setLocale;
    }
  }, [setLocale]);

  const t = createTranslationProxy(locale);

  const value: LanguageContextType = {
    locale,
    language: locale,
    setLocale,
    t,
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
      language: "en" as Locale,
      setLocale: () => {},
      t: createTranslationProxy("en"),
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
      className={`inline-flex items-center rounded-md border border-[#E5E5E3] bg-white p-0.5 text-xs font-mono select-none ${className}`}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={`px-2 py-1 transition-colors ${
          locale === "en"
            ? "bg-[#0E0F10] text-white font-bold rounded"
            : "text-[#555555] font-medium hover:text-[#0E0F10]"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("it")}
        aria-pressed={locale === "it"}
        className={`px-2 py-1 transition-colors ${
          locale === "it"
            ? "bg-[#0E0F10] text-white font-bold rounded"
            : "text-[#555555] font-medium hover:text-[#0E0F10]"
        }`}
      >
        IT
      </button>
    </div>
  );
}
