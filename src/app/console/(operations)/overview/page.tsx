"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useClaims } from "@/context/ClaimsContext";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronRightIcon, ArrowRightIcon } from "@/components/icons/Icons";

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

  // Priority queue claims matching console-overview-reference.png
  const priorityQueueRows = [
    {
      id: "IMP-260925-014",
      incident: "25 Sep 2026 · 08:42",
      location: "Milano",
      evidence: isIt ? "6 file" : "6 files",
      attention: isIt ? "Richiesta conferma conducente" : "Missing driver confirmation",
      attentionClass: "text-rose-600 font-medium",
      updated: isIt ? "8 min fa" : "8 min ago",
      href: "/console/claims/IMP-260925-014",
    },
    {
      id: "IMP-260925-011",
      incident: "25 Sep 2026 · 07:58",
      location: "Torino",
      evidence: isIt ? "9 file" : "9 files",
      attention: isIt ? "Bassa corrispondenza veicolo" : "Low-confidence vehicle match",
      attentionClass: "text-amber-600 font-medium",
      updated: isIt ? "22 min fa" : "22 min ago",
      href: "/console/claims/IMP-260925-011",
    },
    {
      id: "IMP-260924-037",
      incident: "24 Sep 2026 · 18:21",
      location: "Bologna",
      evidence: isIt ? "4 file" : "4 files",
      attention: isIt ? "Fotografie mancanti" : "Missing photos",
      attentionClass: "text-amber-600 font-medium",
      updated: isIt ? "41 min fa" : "41 min ago",
      href: "/console/claims/IMP-260924-037",
    },
    {
      id: "IMP-260924-028",
      incident: "24 Sep 2026 · 16:05",
      location: "Firenze",
      evidence: isIt ? "7 file" : "7 files",
      attention: isIt ? "Conferma conducente necessaria" : "Driver confirmation required",
      attentionClass: "text-amber-600 font-medium",
      updated: isIt ? "1 ora fa" : "1 hour ago",
      href: "/console/claims/IMP-260924-028",
    },
    {
      id: "IMP-260924-021",
      incident: "24 Sep 2026 · 14:33",
      location: "Roma",
      evidence: isIt ? "5 file" : "5 files",
      attention: isIt ? "Dati veicolo discordanti" : "Inconsistent vehicle data",
      attentionClass: "text-amber-600 font-medium",
      updated: isIt ? "2 ore fa" : "2 hours ago",
      href: "/console/claims/IMP-260924-021",
    },
  ];

  // Recent claims matching console-overview-reference.png
  const recentClaimsRows = [
    {
      id: "IMP-260924-020",
      incident: "24 Sep 2026 · 12:11",
      driver: "Marco Bianchi",
      status: isIt ? "Pronto per perizia" : "Ready for review",
      updated: isIt ? "3 ore fa" : "3 hours ago",
      href: "/console/claims/IMP-260924-020",
    },
    {
      id: "IMP-260923-018",
      incident: "23 Sep 2026 · 19:04",
      driver: "Giulia Rossi",
      status: isIt ? "In revisione" : "Under review",
      updated: isIt ? "5 ore fa" : "5 hours ago",
      href: "/console/claims/IMP-260923-018",
    },
    {
      id: "IMP-260923-016",
      incident: "23 Sep 2026 · 15:22",
      driver: "Luca Ferrari",
      status: isIt ? "Prove complete" : "Evidence complete",
      updated: isIt ? "1 giorno fa" : "1 day ago",
      href: "/console/claims/IMP-260923-016",
    },
    {
      id: "IMP-260923-012",
      incident: "23 Sep 2026 · 11:17",
      driver: "Sara Conti",
      status: isIt ? "Chiuso" : "Closed",
      updated: isIt ? "2 giorni fa" : "2 days ago",
      href: "/console/claims/IMP-260923-012",
    },
    {
      id: "IMP-260922-009",
      incident: "22 Sep 2026 · 09:48",
      driver: "Davide Moretti",
      status: isIt ? "In revisione" : "Under review",
      updated: isIt ? "2 giorni fa" : "2 days ago",
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
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#666666]">
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
              <div className="text-[11px] uppercase tracking-wider text-[#666666]">
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
