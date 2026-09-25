"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useClaims } from "@/context/ClaimsContext";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronRightIcon, ArrowRightIcon } from "@/components/icons/Icons";
import { formatDateTime, formatRelativeTime, getStatusLabel } from "@/lib/dateUtils";

export default function ConsoleOverviewPage() {
  const { claims, stats, isLoading } = useClaims();
  const { language, t } = useLanguage();
  const isIt = language === "it";

  if (isLoading) {
    return (
      <div className="py-20 text-center text-xs font-mono text-[#666666] uppercase tracking-wider">
        {isIt ? "Caricamento operazioni sinistri..." : "Loading claims operations..."}
      </div>
    );
  }

  // Priority queue claims matching console-overview-reference.png with dynamic locale-aware dates
  const priorityQueueRows = [
    {
      id: "IMP-260925-014",
      incident: formatDateTime("2026-09-25T08:42:00Z", language),
      location: "Milano",
      evidence: isIt ? "6 file" : "6 files",
      attention: isIt ? "Richiesta conferma conducente" : "Missing driver confirmation",
      attentionClass: "text-rose-600 font-medium",
      updated: formatRelativeTime("2026-09-25T11:52:00Z", language),
      href: "/console/claims/IMP-260925-014",
    },
    {
      id: "IMP-260925-011",
      incident: formatDateTime("2026-09-25T07:58:00Z", language),
      location: "Torino",
      evidence: isIt ? "9 file" : "9 files",
      attention: isIt ? "Bassa corrispondenza veicolo" : "Low-confidence vehicle match",
      attentionClass: "text-amber-600 font-medium",
      updated: formatRelativeTime("2026-09-25T11:38:00Z", language),
      href: "/console/claims/IMP-260925-011",
    },
    {
      id: "IMP-260924-037",
      incident: formatDateTime("2026-09-24T18:21:00Z", language),
      location: "Bologna",
      evidence: isIt ? "4 file" : "4 files",
      attention: isIt ? "Fotografie mancanti" : "Missing photos",
      attentionClass: "text-amber-600 font-medium",
      updated: formatRelativeTime("2026-09-25T11:19:00Z", language),
      href: "/console/claims/IMP-260924-037",
    },
    {
      id: "IMP-260924-028",
      incident: formatDateTime("2026-09-24T16:05:00Z", language),
      location: "Firenze",
      evidence: isIt ? "7 file" : "7 files",
      attention: isIt ? "Conferma conducente necessaria" : "Driver confirmation required",
      attentionClass: "text-amber-600 font-medium",
      updated: formatRelativeTime("2026-09-25T11:00:00Z", language),
      href: "/console/claims/IMP-260924-028",
    },
    {
      id: "IMP-260924-021",
      incident: formatDateTime("2026-09-24T14:33:00Z", language),
      location: "Roma",
      evidence: isIt ? "5 file" : "5 files",
      attention: isIt ? "Dati veicolo discordanti" : "Inconsistent vehicle data",
      attentionClass: "text-amber-600 font-medium",
      updated: formatRelativeTime("2026-09-25T10:00:00Z", language),
      href: "/console/claims/IMP-260924-021",
    },
  ];

  // Recent claims matching console-overview-reference.png with dynamic locale-aware dates
  const recentClaimsRows = [
    {
      id: "IMP-260924-020",
      incident: formatDateTime("2026-09-24T12:11:00Z", language),
      driver: "Marco Bianchi",
      status: isIt ? "Pronto per perizia" : "Ready for review",
      updated: formatRelativeTime("2026-09-25T09:00:00Z", language),
      href: "/console/claims/IMP-260924-020",
    },
    {
      id: "IMP-260923-018",
      incident: formatDateTime("2026-09-23T19:04:00Z", language),
      driver: "Giulia Rossi",
      status: isIt ? "In revisione" : "Under review",
      updated: formatRelativeTime("2026-09-25T07:00:00Z", language),
      href: "/console/claims/IMP-260923-018",
    },
    {
      id: "IMP-260923-016",
      incident: formatDateTime("2026-09-23T15:22:00Z", language),
      driver: "Luca Ferrari",
      status: isIt ? "Prove complete" : "Evidence complete",
      updated: formatRelativeTime("2026-09-24T12:00:00Z", language),
      href: "/console/claims/IMP-260923-016",
    },
    {
      id: "IMP-260923-012",
      incident: formatDateTime("2026-09-23T11:17:00Z", language),
      driver: "Sara Conti",
      status: isIt ? "Chiuso" : "Closed",
      updated: formatRelativeTime("2026-09-23T12:00:00Z", language),
      href: "/console/claims/IMP-260923-012",
    },
    {
      id: "IMP-260922-009",
      incident: formatDateTime("2026-09-22T09:48:00Z", language),
      driver: "Davide Moretti",
      status: isIt ? "In revisione" : "Under review",
      updated: formatRelativeTime("2026-09-23T09:00:00Z", language),
      href: "/console/claims/IMP-260922-009",
    },
  ];

  const reviewCount = stats.manualReviewRequiredCount || 12;

  return (
    <div className="space-y-10 selection:bg-[#0E0F10] selection:text-white">
      {/* 1. Header Area matching console-overview-reference.png */}
      <div className="space-y-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#666666]">
          {t("consoleOverview.kicker")}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0E0F10]">
          {isIt
            ? `${reviewCount} sinistri richiedono revisione.`
            : `${reviewCount} claims need review.`}
        </h1>
        <p className="text-sm sm:text-base text-[#666666] font-normal">
          {t("consoleOverview.subtitle")}
        </p>
      </div>

      {/* 2. Open Operational Metric Strip (No cards, no boxes, hairline dividers) */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-y border-[#E5E5E3] divide-y sm:divide-y-0 sm:divide-x divide-[#E5E5E3] py-6 my-6">
        <div className="px-4 sm:px-6 py-2">
          <div className="text-3xl sm:text-4xl font-mono font-bold text-[#0E0F10] tracking-tight">
            {reviewCount}
          </div>
          <div className="text-xs text-[#666666] mt-1 font-medium">
            {t("consoleOverview.needsReview")}
          </div>
        </div>

        <div className="px-4 sm:px-6 py-2">
          <div className="text-3xl sm:text-4xl font-mono font-bold text-[#0E0F10] tracking-tight">
            3
          </div>
          <div className="text-xs text-[#666666] mt-1 font-medium">
            {t("consoleOverview.missingDriverConfirmation")}
          </div>
        </div>

        <div className="px-4 sm:px-6 py-2">
          <div className="text-3xl sm:text-4xl font-mono font-bold text-[#0E0F10] tracking-tight">
            2
          </div>
          <div className="text-xs text-[#666666] mt-1 font-medium">
            {t("consoleOverview.evidenceConflicts")}
          </div>
        </div>

        <div className="px-4 sm:px-6 py-2">
          <div className="text-3xl sm:text-4xl font-mono font-bold text-[#0E0F10] tracking-tight">
            7
          </div>
          <div className="text-xs text-[#666666] mt-1 font-medium">
            {t("consoleOverview.newToday")}
          </div>
        </div>
      </div>

      {/* 3. Main 2-Column Operational Grid matching console-overview-reference.png */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Priority queue & Recent claims tables (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Priority queue */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1">
              <h2 className="text-lg font-bold text-[#0E0F10] tracking-tight">
                {t("consoleOverview.priorityQueue")}
              </h2>
              <Link
                href="/console/claims"
                className="text-xs font-semibold text-[#0E0F10] hover:text-[#666666] flex items-center gap-1 transition-colors"
              >
                <span>{t("consoleOverview.viewAll")}</span>
                <ArrowRightIcon size={12} />
              </Link>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E5E3] text-[#666666] font-medium tracking-wider uppercase text-[11px]">
                    <th className="py-2.5 pr-4">{isIt ? "Sinistro" : "Claim"}</th>
                    <th className="py-2.5 px-4">{isIt ? "Incidente" : "Incident"}</th>
                    <th className="py-2.5 px-4">{isIt ? "Luogo" : "Location"}</th>
                    <th className="py-2.5 px-4">{isIt ? "Prove" : "Evidence"}</th>
                    <th className="py-2.5 px-4">{isIt ? "Attenzione" : "Attention"}</th>
                    <th className="py-2.5 px-4">{isIt ? "Aggiornato" : "Updated"}</th>
                    <th className="py-2.5 pl-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E3]">
                  {priorityQueueRows.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-white/80 transition-colors cursor-pointer group"
                      onClick={() => (window.location.href = row.href)}
                    >
                      <td className="py-3.5 pr-4 font-mono font-semibold text-[#0E0F10]">
                        <Link href={row.href} className="hover:underline">
                          {row.id}
                        </Link>
                      </td>
                      <td className="py-3.5 px-4 text-[#0E0F10] whitespace-nowrap">
                        {row.incident}
                      </td>
                      <td className="py-3.5 px-4 text-[#0E0F10]">
                        {row.location}
                      </td>
                      <td className="py-3.5 px-4 text-[#666666] whitespace-nowrap">
                        {row.evidence}
                      </td>
                      <td className={`py-3.5 px-4 ${row.attentionClass}`}>
                        {row.attention}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#666666] whitespace-nowrap">
                        {row.updated}
                      </td>
                      <td className="py-3.5 pl-2 text-right">
                        <ChevronRightIcon
                          size={14}
                          className="text-[#999999] group-hover:text-[#0E0F10] transition-colors inline"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent claims */}
          <div className="space-y-3 pt-4">
            <div className="flex items-center justify-between pb-1">
              <h2 className="text-lg font-bold text-[#0E0F10] tracking-tight">
                {t("consoleOverview.recentClaims")}
              </h2>
              <Link
                href="/console/claims"
                className="text-xs font-semibold text-[#0E0F10] hover:text-[#666666] flex items-center gap-1 transition-colors"
              >
                <span>{t("consoleOverview.viewAll")}</span>
                <ArrowRightIcon size={12} />
              </Link>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E5E3] text-[#666666] font-medium tracking-wider uppercase text-[11px]">
                    <th className="py-2.5 pr-4">{isIt ? "Sinistro" : "Claim"}</th>
                    <th className="py-2.5 px-4">{isIt ? "Incidente" : "Incident"}</th>
                    <th className="py-2.5 px-4">{isIt ? "Conducente" : "Driver"}</th>
                    <th className="py-2.5 px-4">{isIt ? "Stato" : "Status"}</th>
                    <th className="py-2.5 px-4">{isIt ? "Aggiornato" : "Updated"}</th>
                    <th className="py-2.5 pl-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E3]">
                  {recentClaimsRows.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-white/80 transition-colors cursor-pointer group"
                      onClick={() => (window.location.href = row.href)}
                    >
                      <td className="py-3.5 pr-4 font-mono font-semibold text-[#0E0F10]">
                        <Link href={row.href} className="hover:underline">
                          {row.id}
                        </Link>
                      </td>
                      <td className="py-3.5 px-4 text-[#0E0F10] whitespace-nowrap">
                        {row.incident}
                      </td>
                      <td className="py-3.5 px-4 text-[#0E0F10]">
                        {row.driver}
                      </td>
                      <td className="py-3.5 px-4 text-[#0E0F10] font-medium">
                        {row.status}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#666666] whitespace-nowrap">
                        {row.updated}
                      </td>
                      <td className="py-3.5 pl-2 text-right">
                        <ChevronRightIcon
                          size={14}
                          className="text-[#999999] group-hover:text-[#0E0F10] transition-colors inline"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Rail: Radically simplified per Section 25 (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Primary Action Button: Review next claim → */}
          <Link
            href="/console/claims/IMP-260925-014"
            className="w-full flex items-center justify-between py-4 px-6 bg-[#0E0F10] text-white hover:bg-[#1A1B1C] rounded-xl text-sm font-semibold tracking-tight transition-colors shadow-sm group"
          >
            <span>{t("consoleOverview.reviewNextClaim")}</span>
            <ArrowRightIcon size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Next Claim Minimal Summary (NO duplicate lists, pure operational clarity) */}
          <div className="border border-[#E5E5E3] bg-white rounded-2xl p-6 space-y-5 shadow-xs">
            {/* Incident Scene Photo Preview */}
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-neutral-200">
              <Image
                src="/images/hero-car.jpg"
                alt="Next claim incident context"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>

            {/* Next Claim Header & Direct Action */}
            <div className="space-y-1.5 pb-4 border-b border-[#E5E5E3]">
              <div className="text-xs font-medium text-[#555555]">
                {t("consoleOverview.nextClaimKicker")}
              </div>
              <div className="flex items-center justify-between">
                <div className="font-mono text-base font-bold text-[#0E0F10]">
                  IMP-260925-014
                </div>
                <Link
                  href="/console/claims/IMP-260925-014"
                  className="text-xs font-semibold text-[#0E0F10] hover:text-[#666666] flex items-center gap-1 transition-colors"
                >
                  <span>{t("consoleOverview.openClaim")}</span>
                  <ArrowRightIcon size={14} />
                </Link>
              </div>
            </div>

            {/* Operational Attention Badge */}
            <div className="space-y-1.5">
              <div className="text-xs font-medium text-[#555555]">
                {t("consoleOverview.attention")}
              </div>
              <div className="text-sm font-semibold text-rose-600">
                {isIt ? "Richiesta conferma conducente" : "Missing driver confirmation"}
              </div>
            </div>

            {/* Notes excerpt */}
            <div className="pt-3 border-t border-[#E5E5E3] text-xs text-[#666666] leading-relaxed">
              <p>
                {isIt
                  ? "Rapporto conducente ricevuto. In attesa di conferma finale e foto aggiuntive dell'impatto posteriore."
                  : "Driver report received. Waiting for driver confirmation and additional photos of the rear damage."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
