"use client";

import React, { useMemo } from "react";
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

  // Derive priority queue exclusively from authoritative claims in Supabase
  const priorityQueueRows = useMemo(() => {
    return [...claims]
      .filter((c) => c.status !== "CLOSED")
      .sort((a, b) => {
        const confA = a.aiAnalysis?.overallConfidence ?? 100;
        const confB = b.aiAnalysis?.overallConfidence ?? 100;
        if (confA !== confB) return confA - confB;
        return new Date(b.incidentDate).getTime() - new Date(a.incidentDate).getTime();
      })
      .slice(0, 5)
      .map((c) => {
        const isConfirmed = c.reviewed_data?.confirmedByDriver ?? c.reviewedData?.confirmedByDriver;
        const isMissingDriver = !isConfirmed;
        const isLowConf = (c.aiAnalysis?.overallConfidence ?? 100) < 80;
        let attention = isIt ? "Revisione documentale" : "Document review";
        let attentionClass = "text-[#666666] font-medium";

        if (isMissingDriver) {
          attention = isIt ? "Richiesta conferma conducente" : "Missing driver confirmation";
          attentionClass = "text-rose-600 font-medium";
        } else if (isLowConf) {
          attention = isIt ? "Bassa accuratezza AI" : "Low AI confidence";
          attentionClass = "text-amber-600 font-medium";
        }

        return {
          id: c.id,
          incident: formatDateTime(c.incidentDate, language),
          location: c.incident?.location?.city || c.incident?.location?.street || "—",
          evidence: `${c.evidence?.length || 0} ${isIt ? "file" : "files"}`,
          attention,
          attentionClass,
          updated: formatRelativeTime(c.updatedAt || c.createdAt || c.incidentDate, language),
          href: `/console/claims/${c.id}`,
        };
      });
  }, [claims, language, isIt]);

  // Derive recent claims strictly from authoritative claims
  const recentClaimsRows = useMemo(() => {
    return [...claims]
      .sort((a, b) => new Date(b.incidentDate).getTime() - new Date(a.incidentDate).getTime())
      .slice(0, 5)
      .map((c) => ({
        id: c.id,
        incident: formatDateTime(c.incidentDate, language),
        driver: c.policyholder?.fullName || c.driverA?.fullName || "—",
        status: getStatusLabel(c.status, language),
        updated: formatRelativeTime(c.updatedAt || c.createdAt || c.incidentDate, language),
        href: `/console/claims/${c.id}`,
      }));
  }, [claims, language]);

  // Derive genuine KPIs from real ledger
  const reviewCount = claims.filter((c) => c.status !== "CLOSED").length;
  const missingDriverConfCount = claims.filter(
    (c) => !(c.reviewed_data?.confirmedByDriver ?? c.reviewedData?.confirmedByDriver) && c.status !== "CLOSED"
  ).length;
  const evidenceConflictsCount = claims.filter(
    (c) =>
      c.aiAnalysis?.reviewCategory === "CONFLICTING_EVIDENCE" ||
      c.aiAnalysis?.reviewCategory === "LOW_CONFIDENCE" ||
      (c.aiAnalysis?.overallConfidence ?? 100) < 70
  ).length;
  const newTodayCount = claims.filter((c) => {
    try {
      const d = new Date(c.incidentDate);
      const today = new Date();
      return d.toDateString() === today.toDateString();
    } catch {
      return false;
    }
  }).length;

  // Derive next claim card from real queue
  const nextClaim = useMemo(() => {
    return (
      claims.find((c) => !(c.reviewed_data?.confirmedByDriver ?? c.reviewedData?.confirmedByDriver) && c.status !== "CLOSED") ||
      claims.find((c) => c.status !== "CLOSED") ||
      claims[0] ||
      null
    );
  }, [claims]);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-xs font-mono text-[#666666] uppercase tracking-wider">
        {isIt ? "Caricamento operazioni sinistri..." : "Loading claims operations..."}
      </div>
    );
  }

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

      {/* 2. Open Operational Metric Strip derived from real dataset */}
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
            {missingDriverConfCount}
          </div>
          <div className="text-xs text-[#666666] mt-1 font-medium">
            {t("consoleOverview.missingDriverConfirmation")}
          </div>
        </div>

        <div className="px-4 sm:px-6 py-2">
          <div className="text-3xl sm:text-4xl font-mono font-bold text-[#0E0F10] tracking-tight">
            {evidenceConflictsCount}
          </div>
          <div className="text-xs text-[#666666] mt-1 font-medium">
            {t("consoleOverview.evidenceConflicts")}
          </div>
        </div>

        <div className="px-4 sm:px-6 py-2">
          <div className="text-3xl sm:text-4xl font-mono font-bold text-[#0E0F10] tracking-tight">
            {newTodayCount}
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
                  {priorityQueueRows.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-10 text-center text-xs text-[#888888]">
                        {isIt
                          ? "Nessun sinistro attivo in coda prioritaria."
                          : "No active claims in priority queue."}
                      </td>
                    </tr>
                  ) : (
                    priorityQueueRows.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-white/80 transition-colors cursor-pointer group"
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
                        <td className="py-3.5 px-4 text-[#0E0F10] font-mono text-[11px]">
                          {row.evidence}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-block text-[11px] ${row.attentionClass}`}>
                            {row.attention}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[#666666] whitespace-nowrap">
                          {row.updated}
                        </td>
                        <td className="py-3.5 pl-2 text-right">
                          <Link href={row.href} className="inline-block p-1 text-[#999999] group-hover:text-[#0E0F10] transition-colors">
                            <ChevronRightIcon size={14} />
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
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
                  {recentClaimsRows.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-xs text-[#888888]">
                        {isIt
                          ? "Nessun sinistro registrato di recente."
                          : "No recent claims registered."}
                      </td>
                    </tr>
                  ) : (
                    recentClaimsRows.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-white/80 transition-colors cursor-pointer group"
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
                          <Link href={row.href} className="inline-block p-1 text-[#999999] group-hover:text-[#0E0F10] transition-colors">
                            <ChevronRightIcon size={14} />
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Rail: Radically simplified per Section 25 (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          {nextClaim ? (
            <>
              {/* Primary Action Button: Review next claim → */}
              <Link
                href={`/console/claims/${nextClaim.id}`}
                className="w-full flex items-center justify-between py-4 px-6 bg-[#0E0F10] text-white hover:bg-[#1A1B1C] rounded-xl text-sm font-semibold tracking-tight transition-colors shadow-sm group"
              >
                <span>{t("consoleOverview.reviewNextClaim")}</span>
                <ArrowRightIcon size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Next Claim Minimal Summary */}
              <div className="border border-[#E5E5E3] bg-white rounded-2xl p-6 space-y-5 shadow-xs">
                {/* Incident Scene Photo Preview */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-neutral-200">
                  <Image
                    src={
                      nextClaim.evidence?.[0]?.signedUrl ||
                      nextClaim.evidence?.[0]?.thumbnailUrl ||
                      "/images/hero-car.jpg"
                    }
                    alt={nextClaim.id}
                    fill
                    unoptimized={Boolean(nextClaim.evidence?.[0]?.signedUrl?.startsWith("http"))}
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
                      {nextClaim.id}
                    </div>
                    <Link
                      href={`/console/claims/${nextClaim.id}`}
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
                    {!(nextClaim.reviewed_data?.confirmedByDriver ?? nextClaim.reviewedData?.confirmedByDriver)
                      ? isIt
                        ? "Richiesta conferma conducente"
                        : "Missing driver confirmation"
                      : isIt
                      ? "Pronto per revisione perito"
                      : "Ready for adjuster review"}
                  </div>
                </div>

                {/* Notes excerpt */}
                <div className="pt-3 border-t border-[#E5E5E3] text-xs text-[#666666] leading-relaxed">
                  <p>
                    {nextClaim.reviewerNotes ||
                      nextClaim.driverA?.statement ||
                      nextClaim.incident?.summary ||
                      (isIt
                        ? "Rapporto conducente registrato nel sistema."
                        : "Driver incident report registered in system.")}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="border border-[#E5E5E3] bg-white rounded-2xl p-8 text-center space-y-3 shadow-xs">
              <div className="text-sm font-bold text-[#0E0F10]">
                {isIt ? "Nessun sinistro in coda" : "No claims in queue"}
              </div>
              <p className="text-xs text-[#666666]">
                {isIt
                  ? "Tutti i sinistri nel registro sono stati completati o non ci sono pratiche attive."
                  : "All claims in the ledger have been completed or no active dossiers exist."}
              </p>
              <Link
                href="/console/claims"
                className="inline-block mt-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#0E0F10] text-white hover:bg-[#1A1B1C] transition-colors"
              >
                {isIt ? "Vai all'archivio sinistri" : "View Claims Directory"}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
