"use client";

import React from "react";
import Link from "next/link";
import { useClaims } from "@/context/ClaimsContext";
import { CountUpMetric } from "@/components/console/CountUpMetric";
import {
  AlertTriangleIcon,
  ChevronRightIcon,
  LayersIcon,
} from "@/components/icons/Icons";
import {
  formatDate,
  getStatusBadgeClass,
  getStatusLabel,
  getConfidenceBadgeClass,
} from "@/lib/utils";

export default function ConsoleOverviewPage() {
  const { claims, stats, isLoading } = useClaims();

  if (isLoading) {
    return (
      <div className="py-16 text-center text-xs font-mono text-[#6F7375] uppercase tracking-wider">
        INITIALIZING OPERATIONAL TELEMETRY...
      </div>
    );
  }

  // Priority queue: claims requiring manual determination or with low confidence
  const priorityClaims = claims
    .filter((c) => c.status !== "CLOSED" && (c.aiAnalysis.reviewCategory || c.aiAnalysis.overallConfidence < 85))
    .sort((a, b) => a.aiAnalysis.overallConfidence - b.aiAnalysis.overallConfidence)
    .slice(0, 5);

  // Recent claims: latest 6
  const recentClaims = [...claims]
    .sort((a, b) => new Date(b.incidentDate).getTime() - new Date(a.incidentDate).getTime())
    .slice(0, 6);

  // Volume chart max for scaling
  const maxVolumeCount = Math.max(...stats.volumeByDate.map((v) => v.count), 3);

  return (
    <div className="space-y-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#D7D9D8]">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6F7375]">
              CARRIER DISPATCH • AURA MUTUA
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase text-[#090A0A]">
            Claims Workbench
          </h1>
          <p className="text-sm text-[#6F7375] font-light max-w-2xl">
            Roadside incident intake, synchronized kinematic reconstruction, and European CAI Box 12 review.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/console/review"
            className="min-h-[48px] px-5 bg-[#090A0A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#171819] transition-colors flex items-center gap-2"
          >
            <AlertTriangleIcon size={16} />
            <span>Review Queue ({stats.manualReviewRequiredCount})</span>
          </Link>
          <Link
            href="/console/claims"
            className="min-h-[48px] px-5 border border-[#D7D9D8] bg-white text-[#090A0A] text-xs font-bold uppercase tracking-wider hover:bg-[#F4F5F3] transition-colors flex items-center gap-2"
          >
            <LayersIcon size={16} />
            <span>All Claims ({stats.totalClaims})</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Metrics Strip (De-Slopped Open Typographic Grid with CountUp) */}
      <div className="bg-white border border-[#D7D9D8] grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#D7D9D8]">
        {/* Open Claims */}
        <div className="p-6 sm:p-8 space-y-2">
          <div className="text-xs font-mono font-bold text-[#6F7375] uppercase tracking-widest">
            Open Claims
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl sm:text-5xl font-bold tracking-tight text-[#090A0A]">
              <CountUpMetric value={stats.openClaims} duration={800} />
            </span>
            <span className="text-xs font-mono text-[#6F7375]">
              of {stats.totalClaims} total
            </span>
          </div>
          <div className="text-xs text-[#6F7375] font-mono pt-1 border-t border-[#D7D9D8]/60">
            {stats.reviewed} closed or reviewed
          </div>
        </div>

        {/* Awaiting Review */}
        <div className="p-6 sm:p-8 space-y-2">
          <div className="text-xs font-mono font-bold text-[#6F7375] uppercase tracking-widest">
            Awaiting Review
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl sm:text-5xl font-bold tracking-tight text-[#090A0A]">
              <CountUpMetric value={stats.awaitingReview} duration={800} />
            </span>
            <span className="text-xs font-mono text-[#DC2626] font-bold">
              {stats.manualReviewRequiredCount} high priority
            </span>
          </div>
          <div className="text-xs text-[#6F7375] font-mono pt-1 border-t border-[#D7D9D8]/60">
            Requires human determination
          </div>
        </div>

        {/* CAI Drafts Ready */}
        <div className="p-6 sm:p-8 space-y-2">
          <div className="text-xs font-mono font-bold text-[#6F7375] uppercase tracking-widest">
            CAI Drafts Ready
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl sm:text-5xl font-bold tracking-tight text-[#090A0A]">
              <CountUpMetric value={stats.caiReady} duration={800} />
            </span>
            <span className="text-xs font-mono text-emerald-700 font-bold">
              <CountUpMetric value={stats.caiFieldCompletionPercent} suffix="%" duration={900} />
            </span>
          </div>
          <div className="text-xs text-[#6F7375] font-mono pt-1 border-t border-[#D7D9D8]/60">
            Box 12 circumstances matched
          </div>
        </div>

        {/* Telemetry Coverage */}
        <div className="p-6 sm:p-8 space-y-2">
          <div className="text-xs font-mono font-bold text-[#6F7375] uppercase tracking-widest">
            Telemetry Coverage
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl sm:text-5xl font-bold tracking-tight text-[#090A0A]">
              <CountUpMetric value={stats.telemetryCoveragePercent} suffix="%" duration={1000} />
            </span>
            <span className="text-xs font-mono text-[#090A0A] font-bold uppercase">
              10–20Hz EDR
            </span>
          </div>
          <div className="text-xs text-[#6F7375] font-mono pt-1 border-t border-[#D7D9D8]/60">
            Mean certainty: {stats.meanConfidence}%
          </div>
        </div>
      </div>

      {/* Operational Funnel & Claims Arrival Timeline (Unboxed, Structured Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Multimodal Intake Funnel */}
        <div className="lg:col-span-6 bg-white border border-[#D7D9D8] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#D7D9D8]">
            <div>
              <h2 className="text-base font-bold uppercase tracking-tight text-[#090A0A]">
                Multimodal Intake Progression
              </h2>
              <p className="text-xs font-mono text-[#6F7375] mt-0.5">
                Conversion through roadside capture, sensor fusion &amp; review
              </p>
            </div>
            <span className="text-xs font-mono text-[#6F7375]">N = {stats.totalClaims}</span>
          </div>

          <div className="space-y-4">
            {[
              { label: "1. Dossiers Ingested", count: stats.funnel.received, percent: 100 },
              { label: "2. Optical Evidence Parsed", count: stats.funnel.evidenceParsed, percent: Math.round((stats.funnel.evidenceParsed / (stats.funnel.received || 1)) * 100) },
              { label: "3. Kinematics Reconstructed", count: stats.funnel.aiAnalysed, percent: Math.round((stats.funnel.aiAnalysed / (stats.funnel.received || 1)) * 100) },
              { label: "4. CAI Box 12 Aligned", count: stats.funnel.caiReady, percent: Math.round((stats.funnel.caiReady / (stats.funnel.received || 1)) * 100) },
              { label: "5. Human Adjusted / Closed", count: stats.funnel.humanReviewed, percent: Math.round((stats.funnel.humanReviewed / (stats.funnel.received || 1)) * 100) },
            ].map((step) => (
              <div key={step.label} className="text-xs font-mono space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#090A0A]">{step.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#090A0A]">{step.count}</span>
                    <span className="text-[#6F7375] w-8 text-right">{step.percent}%</span>
                  </div>
                </div>
                <div className="w-full bg-[#F4F5F3] h-2 border border-[#D7D9D8] overflow-hidden">
                  <div
                    className="bg-[#090A0A] h-full transition-all duration-500"
                    style={{ width: `${step.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incident Occurrence Timeline */}
        <div className="lg:col-span-6 bg-white border border-[#D7D9D8] p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#D7D9D8]">
              <div>
                <h2 className="text-base font-bold uppercase tracking-tight text-[#090A0A]">
                  Incident Arrival Timeline
                </h2>
                <p className="text-xs font-mono text-[#6F7375] mt-0.5">
                  Chronological intake distribution (September 2026)
                </p>
              </div>
              <span className="text-xs font-mono text-[#6F7375]">14-Day Window</span>
            </div>

            {/* Custom Monochrome Vector Bar Chart */}
            <div className="mt-8 h-36 w-full flex items-end justify-between gap-2 px-1 border-b border-[#D7D9D8] pb-2">
              {stats.volumeByDate.map((v) => {
                const heightPercent = v.count === 0 ? 4 : Math.round((v.count / maxVolumeCount) * 100);
                return (
                  <div key={v.date} className="flex-1 flex flex-col items-center group relative">
                    <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-[#090A0A] text-white text-[10px] font-mono py-1 px-1.5 pointer-events-none whitespace-nowrap z-10">
                      {v.label}: {v.count}
                    </div>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full transition-all ${
                        v.count > 0 ? "bg-[#090A0A] hover:bg-[#6F7375]" : "bg-[#F4F5F3] border border-[#D7D9D8]"
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* X Axis Labels */}
            <div className="flex justify-between text-xs font-mono text-[#6F7375] px-1 pt-2">
              <span>{stats.volumeByDate[0]?.label}</span>
              <span>{stats.volumeByDate[Math.floor(stats.volumeByDate.length / 2)]?.label}</span>
              <span>{stats.volumeByDate[stats.volumeByDate.length - 1]?.label}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#D7D9D8] text-xs font-mono text-[#6F7375] flex items-center justify-between">
            <span>PEAK: 14 SEP (ROUNDABOUT SHUNT)</span>
            <span className="font-bold text-[#090A0A]">AVG: {(stats.totalClaims / 14).toFixed(1)} / DAY</span>
          </div>
        </div>
      </div>

      {/* Priority Human Review Queue (Clean High-Speed Table) */}
      <div className="bg-white border border-[#D7D9D8]">
        <div className="px-6 py-4 border-b border-[#D7D9D8] flex items-center justify-between bg-[#F4F5F3]">
          <div className="flex items-center gap-3">
            <AlertTriangleIcon size={18} className="text-[#090A0A]" />
            <div>
              <h2 className="text-sm font-bold uppercase tracking-tight text-[#090A0A]">
                Priority Adjuster Queue
              </h2>
              <p className="text-xs font-mono text-[#6F7375]">
                Dossiers requiring human adjudication due to low confidence or conflicting statements
              </p>
            </div>
          </div>
          <Link
            href="/console/review"
            className="text-xs font-mono font-bold text-[#090A0A] hover:underline uppercase flex items-center gap-1"
          >
            <span>Inspect All ({stats.manualReviewRequiredCount})</span>
            <ChevronRightIcon size={12} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-[#D7D9D8] bg-white uppercase text-[#6F7375] tracking-wider">
                <th className="py-3 px-6">Claim ID</th>
                <th className="py-3 px-6">Review Reason</th>
                <th className="py-3 px-6">Location</th>
                <th className="py-3 px-6 text-center">Confidence</th>
                <th className="py-3 px-6">Assignee</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D7D9D8]">
              {priorityClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-[#F4F5F3]/60 transition-colors">
                  <td className="py-4 px-6 font-bold text-[#090A0A]">
                    <Link
                      href={`/console/claims/${claim.id}`}
                      className="hover:underline"
                    >
                      {claim.id}
                    </Link>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-[#090A0A] uppercase">
                      {claim.aiAnalysis.reviewCategory?.replace(/_/g, " ") || "REVIEW FLAGGED"}
                    </div>
                    <div className="text-[11px] text-[#6F7375] line-clamp-1 max-w-sm mt-0.5">
                      {claim.aiAnalysis.reviewReason || claim.incident.summary}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#090A0A]">
                    {claim.incident.location.city} ({claim.incident.location.street})
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 border font-bold ${getConfidenceBadgeClass(
                        claim.aiAnalysis.overallConfidence
                      )}`}
                    >
                      {claim.aiAnalysis.overallConfidence}%
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[#090A0A]">
                    {claim.assignee ? (
                      <span className="font-semibold">{claim.assignee.name}</span>
                    ) : (
                      <span className="text-[#DC2626] font-semibold uppercase">UNASSIGNED</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/console/claims/${claim.id}`}
                      className="min-h-[32px] inline-flex items-center gap-1 px-3 py-1 bg-[#090A0A] text-white text-xs font-bold uppercase hover:bg-[#171819] transition-colors"
                    >
                      <span>Review</span>
                      <ChevronRightIcon size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Claims Table */}
      <div className="bg-white border border-[#D7D9D8]">
        <div className="px-6 py-4 border-b border-[#D7D9D8] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-tight text-[#090A0A]">
              Recent Collision Dossiers
            </h2>
            <p className="text-xs font-mono text-[#6F7375]">
              Latest incident submissions ingested into the carrier ledger
            </p>
          </div>
          <Link
            href="/console/claims"
            className="text-xs font-mono font-bold text-[#090A0A] hover:underline uppercase flex items-center gap-1"
          >
            <span>Full Directory</span>
            <ChevronRightIcon size={12} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-[#D7D9D8] bg-[#F4F5F3] uppercase text-[#6F7375] tracking-wider">
                <th className="py-3 px-6">Claim ID</th>
                <th className="py-3 px-6">Date / City</th>
                <th className="py-3 px-6">Policyholder</th>
                <th className="py-3 px-6">Vehicles</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-center">Telemetry</th>
                <th className="py-3 px-6 text-right">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D7D9D8]">
              {recentClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-[#F4F5F3]/60 transition-colors">
                  <td className="py-4 px-6 font-bold text-[#090A0A]">
                    <Link
                      href={`/console/claims/${claim.id}`}
                      className="hover:underline"
                    >
                      {claim.id}
                    </Link>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-[#090A0A]">{formatDate(claim.incidentDate)}</div>
                    <div className="text-[11px] text-[#6F7375]">{claim.incident.location.city}</div>
                  </td>
                  <td className="py-4 px-6 text-[#090A0A] font-medium">
                    {claim.policyholder.fullName}
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-[#090A0A] font-semibold">
                      {claim.vehicleA.plate} vs {claim.vehicleB?.plate || "N/A"}
                    </div>
                    <div className="text-[11px] text-[#6F7375]">
                      {claim.vehicleA.make} {claim.vehicleA.model}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`text-[11px] px-2 py-0.5 border font-semibold uppercase ${getStatusBadgeClass(
                        claim.status
                      )}`}
                    >
                      {getStatusLabel(claim.status)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    {claim.telemetry.hasTelemetry ? (
                      <span className="inline-block px-2 py-0.5 text-[11px] border border-[#090A0A] bg-[#F4F5F3] font-bold text-[#090A0A]">
                        10–20Hz EDR
                      </span>
                    ) : (
                      <span className="text-[#6F7375]">—</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span
                      className={`inline-block px-2 py-0.5 border font-bold ${getConfidenceBadgeClass(
                        claim.aiAnalysis.overallConfidence
                      )}`}
                    >
                      {claim.aiAnalysis.overallConfidence}%
                    </span>
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
