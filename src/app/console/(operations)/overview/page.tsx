"use client";

import React from "react";
import Link from "next/link";
import { useClaims } from "@/context/ClaimsContext";
import { useLanguage } from "@/context/LanguageContext";
import { CountUpMetric } from "@/components/console/CountUpMetric";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  LayersIcon,
} from "@/components/icons/Icons";
import {
  formatDate,
  getStatusBadgeClass,
  getStatusLabel,
} from "@/lib/utils";

export default function ConsoleOverviewPage() {
  const { claims, stats, isLoading } = useClaims();
  const { language } = useLanguage();
  const isIt = language === "it";

  if (isLoading) {
    return (
      <div className="py-16 text-center text-xs font-semibold text-[#6F7375] uppercase tracking-wider">
        {isIt ? "CARICAMENTO OPERAZIONI SINISTRI..." : "LOADING CLAIMS OPERATIONS..."}
      </div>
    );
  }

  // Priority queue: claims requiring manual review
  const priorityClaims = claims
    .filter((c) => c.status !== "CLOSED" && (c.aiAnalysis.reviewCategory || c.aiAnalysis.overallConfidence < 85))
    .sort((a, b) => a.aiAnalysis.overallConfidence - b.aiAnalysis.overallConfidence);

  const nextClaimId = priorityClaims[0]?.id || claims[0]?.id || "CLM-2026-0842";

  // Recent claims: latest 6
  const recentClaims = [...claims]
    .sort((a, b) => new Date(b.incidentDate).getTime() - new Date(a.incidentDate).getTime())
    .slice(0, 6);

  // Derived counts
  const needsReviewCount = stats.awaitingReview || stats.manualReviewRequiredCount || 12;
  const newTodayCount = 3;
  const incompleteCount = claims.filter((c) => c.status === "NEW").length;
  const readyForReviewCount = stats.awaitingReview;
  const completedCount = stats.reviewed;

  return (
    <div className="space-y-10 selection:bg-[#090A0A] selection:text-white">
      {/* Top Operational Command */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#D7D9D8]">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#6F7375]">
            {isIt ? "GESTIONE OPERATIVA" : "DISPATCH & AUDIT"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase text-[#090A0A]">
            {isIt ? "Operazioni Sinistri" : "Claims Operations"}
          </h1>
          <p className="text-sm text-[#6F7375] font-light max-w-2xl">
            {isIt
              ? "Perizia dei sinistri stradali, revisione cinematica e convalida CAI Box 12 con audit trail immutabile."
              : "Roadside incident adjudication, kinematic reconstruction review, and European CAI Box 12 confirmation."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/console/claims"
            className="min-h-[44px] px-5 border border-[#D7D9D8] bg-white text-[#090A0A] text-xs font-bold uppercase tracking-wider hover:border-[#090A0A] transition-colors flex items-center gap-2"
          >
            <LayersIcon size={15} />
            <span>{isIt ? "Tutti i sinistri" : "All Claims"} ({stats.totalClaims})</span>
          </Link>
        </div>
      </div>

      {/* DOMINANT TASK-FIRST HERO STRIP */}
      <div className="bg-[#090A0A] text-white p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 border border-white/10">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/50 block">
            {isIt ? "ATTIVITÀ RICHIESTA" : "ACTION REQUIRED"}
          </span>
          <div className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            <span className="font-mono text-white">{needsReviewCount}</span> {isIt ? "sinistri richiedono revisione" : "claims need review"}
          </div>
          <p className="text-sm sm:text-base text-white/70 font-light pt-1">
            {isIt
              ? "Elementi probatori in attesa di convalida peritale umana prima della trasmissione all'assicuratore."
              : "Dossiers awaiting human expert confirmation before formal liability assignment and settlement."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <Link
            href={`/console/claims/${nextClaimId}`}
            className="min-h-[56px] px-8 bg-white text-[#090A0A] text-sm font-bold uppercase tracking-wider hover:bg-[#F4F5F3] transition-colors inline-flex items-center justify-center gap-3 shadow-lg"
          >
            <span>{isIt ? "Esamina prossimo sinistro" : "Review next claim"}</span>
            <ArrowRightIcon size={18} />
          </Link>
        </div>
      </div>

      {/* SMALL TYPOGRAPHIC COUNTERS STRIP */}
      <div className="bg-white border border-[#D7D9D8] grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#D7D9D8]">
        <div className="p-5 sm:p-6 space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6F7375] block">
            {isIt ? "Nuovi oggi" : "New today"}
          </span>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-[#090A0A]">
            <CountUpMetric value={newTodayCount} duration={600} />
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6F7375] block">
            {isIt ? "Incompleti" : "Incomplete"}
          </span>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-[#090A0A]">
            <CountUpMetric value={incompleteCount} duration={600} />
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6F7375] block">
            {isIt ? "Pronti per revisione" : "Ready for review"}
          </span>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-[#090A0A]">
            <CountUpMetric value={readyForReviewCount} duration={600} />
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6F7375] block">
            {isIt ? "Completati" : "Completed"}
          </span>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-700">
            <CountUpMetric value={completedCount} duration={600} />
          </div>
        </div>
      </div>

      {/* HIGH-SCAN RECENT CLAIMS TABLE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#090A0A]">
            {isIt ? "Sinistri Recenti" : "Recent Claims"}
          </h2>
          <Link
            href="/console/claims"
            className="text-xs font-semibold text-[#090A0A] hover:underline uppercase tracking-wider"
          >
            {isIt ? "Vedi archivio completo →" : "View full directory →"}
          </Link>
        </div>

        <div className="bg-white border border-[#D7D9D8] overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#D7D9D8] bg-[#F4F5F3] text-[#6F7375] uppercase font-semibold">
                <th className="py-3 px-4 tracking-wider">{isIt ? "Dossier ID" : "Claim ID"}</th>
                <th className="py-3 px-4 tracking-wider">{isIt ? "Assicurato & Veicolo" : "Insured & Vehicle"}</th>
                <th className="py-3 px-4 tracking-wider">{isIt ? "Luogo" : "Location"}</th>
                <th className="py-3 px-4 tracking-wider">{isIt ? "Data / Ora" : "Date / Time"}</th>
                <th className="py-3 px-4 tracking-wider">{isIt ? "Stato" : "Status"}</th>
                <th className="py-3 px-4 tracking-wider text-right">{isIt ? "Azione" : "Action"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D7D9D8]">
              {recentClaims.map((claim) => (
                <tr
                  key={claim.id}
                  className="hover:bg-[#F4F5F3]/60 transition-colors"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-[#090A0A]">
                    {claim.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-[#090A0A] block">{claim.policyholder.fullName}</span>
                    <span className="text-[#6F7375] font-mono text-[11px] block">{claim.vehicleA.make} {claim.vehicleA.model} ({claim.vehicleA.plate})</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#090A0A]">
                    {claim.incident.location.city} ({claim.incident.location.street})
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#6F7375]">
                    {formatDate(claim.incidentDate)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 border uppercase ${getStatusBadgeClass(
                        claim.status
                      )}`}
                    >
                      {getStatusLabel(claim.status)}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/console/claims/${claim.id}`}
                      className="font-bold text-[#090A0A] hover:underline uppercase tracking-wider inline-flex items-center gap-1"
                    >
                      <span>{isIt ? "Perizia" : "Review"}</span>
                      <ChevronRightIcon size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
