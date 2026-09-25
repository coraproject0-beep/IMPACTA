"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useClaims } from "@/context/ClaimsContext";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronRightIcon } from "@/components/icons/Icons";

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

  // Identify next priority claim
  const priorityClaimsList = claims
    .filter((c) => c.status !== "CLOSED" && (c.aiAnalysis.reviewCategory || c.aiAnalysis.overallConfidence < 85 || c.status === "IN_REVIEW"))
    .sort((a, b) => a.aiAnalysis.overallConfidence - b.aiAnalysis.overallConfidence);

  const nextClaim = priorityClaimsList[0] || claims[0];
  const nextClaimId = nextClaim?.id || "IMP-260925-014";

  // Build 4 priority items matching reference
  const priorityQueueItems = [
    {
      id: priorityClaimsList[0]?.id || "IMP-260925-014",
      attention: isIt ? "Conferma conducente richiesta" : "Driver confirmation required",
      time: "12m ago",
      href: `/console/claims/${priorityClaimsList[0]?.id || nextClaimId}`,
    },
    {
      id: priorityClaimsList[1]?.id || "IMP-260925-011",
      attention: isIt ? "Bassa confidenza sensori" : "Low sensor confidence",
      time: "34m ago",
      href: `/console/claims/${priorityClaimsList[1]?.id || nextClaimId}`,
    },
    {
      id: priorityClaimsList[2]?.id || "IMP-260925-009",
      attention: isIt ? "Discrepanza Box 12" : "Box 12 discrepancy",
      time: "1h ago",
      href: `/console/claims/${priorityClaimsList[2]?.id || nextClaimId}`,
    },
    {
      id: priorityClaimsList[3]?.id || "IMP-260925-007",
      attention: isIt ? "Foto controparte mancanti" : "Missing third-party photos",
      time: "2h ago",
      href: `/console/claims/${priorityClaimsList[3]?.id || nextClaimId}`,
    },
  ];

  // Build recent claims matching reference
  const recentClaimsList = [
    {
      id: claims[1]?.id || "IMP-260925-013",
      insured: claims[1]?.policyholder?.fullName || "Marco Rossi",
      status: isIt ? "Pronto per perizia" : "Ready for review",
      statusColor: "text-emerald-700",
      time: "18m ago",
      href: `/console/claims/${claims[1]?.id || nextClaimId}`,
    },
    {
      id: claims[2]?.id || "IMP-260925-012",
      insured: claims[2]?.policyholder?.fullName || "Giulia Bianchi",
      status: isIt ? "Invio conducente in corso" : "Driver submitting",
      statusColor: "text-[#666666]",
      time: "29m ago",
      href: `/console/claims/${claims[2]?.id || nextClaimId}`,
    },
    {
      id: claims[3]?.id || "IMP-260925-010",
      insured: claims[3]?.policyholder?.fullName || "Paolo Verdi",
      status: isIt ? "Completato" : "Completed",
      statusColor: "text-[#0E0F10]",
      time: "1h ago",
      href: `/console/claims/${claims[3]?.id || nextClaimId}`,
    },
    {
      id: claims[4]?.id || "IMP-260925-008",
      insured: claims[4]?.policyholder?.fullName || "Elena Moretti",
      status: isIt ? "Completato" : "Completed",
      statusColor: "text-[#0E0F10]",
      time: "2h ago",
      href: `/console/claims/${claims[4]?.id || nextClaimId}`,
    },
  ];

  const reviewCount = stats.manualReviewRequiredCount || 12;

  return (
    <div className="space-y-12">
      {/* 1. Header Area (Kicker, Title, Subtitle) */}
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

      {/* 2. Open Metric Strip (Separated by vertical hairlines, no boxes/cards) */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-y border-[#E5E5E3] divide-y sm:divide-y-0 sm:divide-x divide-[#E5E5E3] py-6 my-8">
        {/* Metric 1 */}
        <div className="px-4 sm:px-6 py-2">
          <div className="text-3xl sm:text-4xl font-mono font-bold text-[#0E0F10] tracking-tight">
            {reviewCount}
          </div>
          <div className="text-xs text-[#666666] mt-1 font-medium">
            {t("consoleOverview.needsReview")}
          </div>
        </div>

        {/* Metric 2 */}
        <div className="px-4 sm:px-6 py-2">
          <div className="text-3xl sm:text-4xl font-mono font-bold text-[#0E0F10] tracking-tight">
            7
          </div>
          <div className="text-xs text-[#666666] mt-1 font-medium">
            {t("consoleOverview.newToday")}
          </div>
        </div>

        {/* Metric 3 */}
        <div className="px-4 sm:px-6 py-2">
          <div className="text-3xl sm:text-4xl font-mono font-bold text-[#0E0F10] tracking-tight">
            18
          </div>
          <div className="text-xs text-[#666666] mt-1 font-medium">
            {t("consoleOverview.readyForInsurerReview")}
          </div>
        </div>

        {/* Metric 4 */}
        <div className="px-4 sm:px-6 py-2">
          <div className="text-3xl sm:text-4xl font-mono font-bold text-[#0E0F10] tracking-tight">
            4m 32s
          </div>
          <div className="text-xs text-[#666666] mt-1 font-medium">
            {t("consoleOverview.medianReviewTime")}
          </div>
        </div>
      </div>

      {/* 3. Main 2-Column Operational Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Priority queue & Recent claims */}
        <div className="lg:col-span-7 space-y-10">
          {/* Priority queue table */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-[#0E0F10] tracking-tight">
              {t("consoleOverview.priorityQueue")}
            </h2>

            <div className="border border-[#E5E5E3] bg-white rounded-xl overflow-hidden divide-y divide-[#E5E5E3]">
              {priorityQueueItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center justify-between p-4 hover:bg-[#F7F7F6] transition-colors group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="font-mono text-xs font-semibold text-[#0E0F10]">
                      {item.id}
                    </span>
                    <span className="text-xs font-medium text-amber-600 truncate">
                      {item.attention}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs font-mono text-[#666666]">
                      {item.time}
                    </span>
                    <ChevronRightIcon
                      size={14}
                      className="text-[#666666] group-hover:text-[#0E0F10] transition-colors"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent claims table */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-[#0E0F10] tracking-tight">
              {t("consoleOverview.recentClaims")}
            </h2>

            <div className="border border-[#E5E5E3] bg-white rounded-xl overflow-hidden divide-y divide-[#E5E5E3]">
              {recentClaimsList.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center justify-between p-4 hover:bg-[#F7F7F6] transition-colors group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="font-mono text-xs font-semibold text-[#0E0F10]">
                      {item.id}
                    </span>
                    <span className="text-xs font-medium text-[#0E0F10] truncate">
                      {item.insured}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className={`text-xs font-medium ${item.statusColor}`}>
                      {item.status}
                    </span>
                    <span className="text-xs font-mono text-[#666666]">
                      {item.time}
                    </span>
                    <ChevronRightIcon
                      size={14}
                      className="text-[#666666] group-hover:text-[#0E0F10] transition-colors"
                    />
                  </div>
                </Link>
              ))}
            </div>

            <div className="pt-1">
              <Link
                href="/console/claims"
                className="text-xs font-semibold text-[#0E0F10] hover:underline"
              >
                {t("consoleOverview.viewAll")}
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Review next claim action & preview card */}
        <div className="lg:col-span-5 space-y-6">
          {/* Primary Action Button: Review next claim → */}
          <Link
            href={`/console/claims/${nextClaimId}`}
            className="w-full block text-center py-3.5 px-6 bg-[#0E0F10] text-white hover:bg-[#1A1B1C] rounded-lg text-sm font-semibold tracking-tight transition-colors"
          >
            {t("consoleOverview.reviewNextClaim")}
          </Link>

          {/* Next Claim Preview Container */}
          <div className="border border-[#E5E5E3] bg-white rounded-xl p-5 space-y-5">
            {/* Incident Scene Photo Preview */}
            <div className="relative h-44 w-full rounded-lg overflow-hidden bg-[#0E0F10]">
              <Image
                src="/images/hero-car.jpg"
                alt="Accident scene preview"
                fill
                className="object-cover opacity-90"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>

            {/* Header row: NEXT CLAIM: IMP-260925-014 [ Open → ] */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E3]">
              <div className="font-mono text-xs font-bold text-[#0E0F10] tracking-tight">
                {t("consoleOverview.nextClaimKicker")}: {nextClaimId}
              </div>
              <Link
                href={`/console/claims/${nextClaimId}`}
                className="text-xs font-medium text-[#0E0F10] hover:underline"
              >
                {t("consoleOverview.openClaim")}
              </Link>
            </div>

            {/* Key-Value open list */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#666666]">{t("consoleOverview.incident")}</span>
                <span className="font-medium text-[#0E0F10]">
                  {nextClaim?.incident?.summary?.slice(0, 30) || "Multi-vehicle lane change"}...
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#666666]">{t("consoleOverview.location")}</span>
                <span className="font-medium text-[#0E0F10]">
                  {nextClaim?.incident?.location?.city || "Milano"}, {nextClaim?.incident?.location?.street || "Via Lorenteggio"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#666666]">{t("consoleOverview.vehicles")}</span>
                <span className="font-medium text-[#0E0F10]">
                  {nextClaim?.vehicleA?.model || "Audi A3"} · {nextClaim?.vehicleB?.model || "VW Golf"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#666666]">{t("consoleOverview.evidence")}</span>
                <span className="font-medium text-[#0E0F10]">
                  {nextClaim?.evidence?.length || 4} {isIt ? "foto" : "photos"} · {isIt ? "Telemetria verificata" : "Telemetry verified"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#666666]">{t("consoleOverview.attention")}</span>
                <span className="font-medium text-amber-600">
                  {isIt ? "Conferma conducente richiesta" : "Driver confirmation required"}
                </span>
              </div>
            </div>

            {/* Reviewer Note */}
            <div className="bg-[#F7F7F6] border border-[#E5E5E3] rounded-lg p-3.5 text-xs text-[#666666] leading-relaxed">
              <div className="font-semibold text-[#0E0F10] mb-1">
                {t("consoleOverview.notes")}
              </div>
              <p className="italic">
                {nextClaim?.reviewerNotes ||
                  (isIt
                    ? "\"Box 12 contrassegnato come 'cambio corsia', ma il tracciato dei sensori suggerisce il mantenimento della corsia prima dell'impatto. Richiede revisione.\""
                    : "\"Box 12 marked 'changing lanes' but sensor trace suggests pre-impact lane keeping. Requires review.\"")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
