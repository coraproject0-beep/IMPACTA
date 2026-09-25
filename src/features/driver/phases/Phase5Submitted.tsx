"use client";

import React from "react";
import Link from "next/link";
import { DriverDraft } from "@/types/driver";
import { useLanguage } from "@/context/LanguageContext";
import { SYNTHETIC_DRIVER_PROFILE } from "@/features/driver/data/driverProfileFixture";
import {
  CheckCircleIcon,
  HomeIcon,
  BookmarkIcon,
  ShieldCheckIcon,
} from "@/components/icons/Icons";

interface Phase5SubmittedProps {
  draft: DriverDraft;
  onReturnHome: () => void;
}

export function Phase5Submitted({ draft, onReturnHome }: Phase5SubmittedProps) {
  const { t, language } = useLanguage();
  const isIt = language === "it";
  const claimId = draft.submittedClaimId || "CLM-2026-0842";
  const nowFormatted = draft.submittedAt
    ? new Date(draft.submittedAt).toLocaleString(isIt ? "it-IT" : "en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleString(isIt ? "it-IT" : "en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

  return (
    <div className="space-y-10 py-4 max-w-xl mx-auto text-left selection:bg-[#090A0A] selection:text-white">
      {/* Big Calm Success Indicator */}
      <div className="space-y-3 pb-8 border-b border-[#D7D9D8]">
        <div className="flex items-center gap-2.5 text-emerald-700">
          <CheckCircleIcon size={20} />
          <span className="text-xs font-semibold uppercase tracking-widest">
            {t("wizard.phase5Subheader")}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#090A0A] uppercase">
          {t("wizard.phase5Title")}
        </h1>
        <p className="text-base sm:text-lg text-[#6F7375] font-normal leading-relaxed pt-1">
          {isIt
            ? "La segnalazione del sinistro e i rilievi fotografici sono stati registrati e archiviati in sicurezza nella memoria locale."
            : "Your accident report and photographic evidence have been securely compiled and preserved in local browser storage."}
        </p>
      </div>

      {/* Official Receipt Document (Strict Monochrome Hairline Style) */}
      <div className="bg-white border border-[#090A0A] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#D7D9D8] pb-4 gap-2">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#6F7375] block font-semibold">
              {t("wizard.phase5Reference")}
            </span>
            <span className="font-mono font-bold text-2xl text-[#090A0A] mt-0.5 block">
              {claimId}
            </span>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs uppercase tracking-widest text-[#6F7375] block font-semibold">
              {t("wizard.phase5FiledTimestamp")}
            </span>
            <span className="text-xs font-mono text-[#090A0A] mt-0.5 block">
              {nowFormatted}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="space-y-1">
            <span className="text-[#6F7375] uppercase tracking-wider block font-semibold">{t("wizard.phase5InsuredVehicle")}</span>
            <span className="font-bold text-[#090A0A] text-sm block">
              {SYNTHETIC_DRIVER_PROFILE.vehicle.make} {SYNTHETIC_DRIVER_PROFILE.vehicle.model}
            </span>
            <span className="text-[#6F7375] font-mono block">
              {SYNTHETIC_DRIVER_PROFILE.vehicle.plate}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[#6F7375] uppercase tracking-wider block font-semibold">{t("wizard.phase5PolicyNumber")}</span>
            <span className="font-bold text-[#090A0A] text-sm block font-mono">
              {SYNTHETIC_DRIVER_PROFILE.policy.policyNumber}
            </span>
            <span className="text-[#6F7375] block">
              {SYNTHETIC_DRIVER_PROFILE.policy.insurerName}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[#6F7375] uppercase tracking-wider block font-semibold">{t("wizard.phase5Counterparty")}</span>
            <span className="font-bold text-[#090A0A] text-sm block">
              {draft.counterparty.driverName || (isIt ? "In fase di identificazione" : "Pending identification")}
            </span>
            <span className="text-[#6F7375] font-mono block">
              {draft.counterparty.plate || (isIt ? "Targa assente" : "Unknown plate")}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[#6F7375] uppercase tracking-wider block font-semibold">{t("wizard.phase5EvidencePreserved")}</span>
            <span className="font-bold text-emerald-700 text-sm block">
              {draft.evidenceItems.length} {isIt ? "fotografie conservate" : "photos preserved"}
            </span>
            <span className="text-[#6F7375] block">
              IndexedDB local storage
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-[#D7D9D8] flex items-center justify-between text-xs">
          <span className="text-[#6F7375] uppercase tracking-wider font-semibold">{isIt ? "Luogo" : "Location"}</span>
          <span className="font-medium text-[#090A0A]">
            {draft.location.street || "Piazza San Giovanni"}, {draft.location.city}
          </span>
        </div>
      </div>

      {/* Local Storage Notice */}
      <div className="p-6 bg-[#F4F5F3] border border-[#D7D9D8] space-y-2 text-xs">
        <div className="flex items-center gap-2 font-bold text-[#090A0A] uppercase tracking-wider">
          <ShieldCheckIcon size={16} />
          <span>{t("wizard.phase5PersistenceTitle")}</span>
        </div>
        <p className="text-[#6F7375] leading-relaxed font-light">
          {t("wizard.phase5PersistenceDesc")}
        </p>
      </div>

      {/* Primary Actions: Return to Driver Home or View in Reports (ZERO links to /console!) */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[#D7D9D8]">
        <button
          type="button"
          onClick={onReturnHome}
          className="min-h-[52px] flex-1 inline-flex items-center justify-center gap-2 px-8 bg-[#090A0A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#171819] transition-colors"
        >
          <HomeIcon size={16} />
          <span>{t("wizard.phase5ReturnHome")}</span>
        </button>

        <Link
          href="/app/reports"
          className="min-h-[52px] flex-1 inline-flex items-center justify-center gap-2 px-8 border border-[#D7D9D8] bg-white text-[#090A0A] text-xs font-bold uppercase tracking-wider hover:bg-[#F4F5F3] transition-colors"
        >
          <BookmarkIcon size={16} />
          <span>{t("wizard.phase5ViewInReports")}</span>
        </Link>
      </div>
    </div>
  );
}
