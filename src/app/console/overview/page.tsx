"use client";

import React from "react";
import Link from "next/link";
import { useClaims } from "@/context/ClaimsContext";
import {
  ActivityIcon,
  AlertTriangleIcon,
  ChevronRightIcon,
  LayersIcon,
  FileTextIcon,
  CheckCircleIcon,
} from "@/components/icons/Icons";
import {
  formatDate,
  formatRelativeTime,
  getStatusBadgeClass,
  getStatusLabel,
  getConfidenceBadgeClass,
} from "@/lib/utils";

export default function ConsoleOverviewPage() {
  const { claims, stats, isLoading } = useClaims();

  if (isLoading) {
    return (
      <div className="py-12 text-center text-xs text-slate-500">
        Loading claims telemetry data...
      </div>
    );
  }

  // Priority queue: claims with reviewCategory or low confidence, sorted by confidence asc
  const priorityClaims = claims
    .filter((c) => c.status !== "CLOSED" && (c.aiAnalysis.reviewCategory || c.aiAnalysis.overallConfidence < 85))
    .sort((a, b) => a.aiAnalysis.overallConfidence - b.aiAnalysis.overallConfidence)
    .slice(0, 5);

  // Recent claims: latest 6
  const recentClaims = [...claims]
    .sort((a, b) => new Date(b.incidentDate).getTime() - new Date(a.incidentDate).getTime())
    .slice(0, 6);

  // Volume chart max for SVG scaling
  const maxVolumeCount = Math.max(...stats.volumeByDate.map((v) => v.count), 3);

  return (
    <div className="space-y-8">
      {/* Top Header & Context Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Operational Overview
            </h1>
            <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">
              Demo Telemetry
            </span>
          </div>
          <p className="mt-2 text-base text-slate-600">
            Road-accident dossier intake, automated kinematics reconstruction, and CAI workspace review.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/console/review"
            className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <AlertTriangleIcon size={16} />
            <span>Open Review Queue ({stats.manualReviewRequiredCount})</span>
          </Link>
          <Link
            href="/console/claims"
            className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <LayersIcon size={16} />
            <span>All Claims ({stats.totalClaims})</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Metrics Strip (Unified Open Surface with Dividers) */}
      <div className="bg-white border border-[#D7D9D8] grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#D7D9D8]">
        {/* Open Claims */}
        <div className="p-6 space-y-2">
          <div className="text-xs font-mono font-bold text-[#6F7375] uppercase tracking-wider">
            Open Claims
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#090A0A] font-mono">
              {stats.openClaims}
            </span>
            <span className="text-xs text-[#6F7375] font-mono">
              of {stats.totalClaims} total
            </span>
          </div>
          <div className="text-xs text-[#6F7375] font-mono">
            {stats.reviewed} closed/reviewed
          </div>
        </div>

        {/* Awaiting Review */}
        <div className="p-6 space-y-2">
          <div className="text-xs font-mono font-bold text-[#6F7375] uppercase tracking-wider">
            Awaiting Review
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#090A0A] font-mono">
              {stats.awaitingReview}
            </span>
            <span className="text-xs font-mono text-[#DC2626] font-semibold">
              {stats.manualReviewRequiredCount} high priority
            </span>
          </div>
          <div className="text-xs text-[#6F7375] font-mono">
            Requires adjuster determination
          </div>
        </div>

        {/* CAI Drafts Ready */}
        <div className="p-6 space-y-2">
          <div className="text-xs font-mono font-bold text-[#6F7375] uppercase tracking-wider">
            CAI Drafts Ready
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#090A0A] font-mono">
              {stats.caiReady}
            </span>
            <span className="text-xs text-[#6F7375] font-mono">
              {stats.caiFieldCompletionPercent}% confirmed
            </span>
          </div>
          <div className="text-xs text-[#6F7375] font-mono">
            Ready for human sign-off
          </div>
        </div>

        {/* Telemetry Coverage */}
        <div className="p-6 space-y-2">
          <div className="text-xs font-mono font-bold text-[#6F7375] uppercase tracking-wider">
            Telemetry Coverage
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#090A0A] font-mono">
              {stats.telemetryCoveragePercent}%
            </span>
            <span className="text-xs font-mono text-emerald-700 font-semibold">
              Active EDR
            </span>
          </div>
          <div className="text-xs text-[#6F7375] font-mono">
            Mean confidence: {stats.meanConfidence}%
          </div>
        </div>
      </div>

      {/* Operational Funnel & Claims Arrival Histogram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* AI Processing Funnel */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-950">
                AI Intake &amp; Reconstruction Funnel
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Progression of dossiers through multimodal parsing and review
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400 font-semibold">N = {stats.totalClaims}</span>
          </div>

          <div className="mt-5 space-y-4">
            {[
              { label: "1. Dossiers Ingested", count: stats.funnel.received, percent: 100, color: "bg-slate-700" },
              { label: "2. Multimodal Evidence Parsed", count: stats.funnel.evidenceParsed, percent: Math.round((stats.funnel.evidenceParsed / (stats.funnel.received || 1)) * 100), color: "bg-slate-600" },
              { label: "3. Kinematics & AI Reconstructed", count: stats.funnel.aiAnalysed, percent: Math.round((stats.funnel.aiAnalysed / (stats.funnel.received || 1)) * 100), color: "bg-blue-600" },
              { label: "4. CAI Field Workspace Ready", count: stats.funnel.caiReady, percent: Math.round((stats.funnel.caiReady / (stats.funnel.received || 1)) * 100), color: "bg-indigo-600" },
              { label: "5. Human Adjusted / Closed", count: stats.funnel.humanReviewed, percent: Math.round((stats.funnel.humanReviewed / (stats.funnel.received || 1)) * 100), color: "bg-emerald-600" },
            ].map((step) => (
              <div key={step.label} className="text-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-slate-800">{step.label}</span>
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-slate-950 font-bold">{step.count}</span>
                    <span className="font-mono text-slate-400 text-xs w-9 text-right font-medium">
                      {step.percent}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`${step.color} h-full transition-all duration-300 rounded-full`}
                    style={{ width: `${step.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Claims Volume SVG Histogram */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  Incident Occurrence Timeline
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Daily distribution of incoming incidents (Sept 2026)
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400 font-semibold">14-day window</span>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="mt-8 h-40 w-full flex items-end justify-between gap-1.5 px-2 border-b border-slate-200 pb-2">
              {stats.volumeByDate.map((v) => {
                const heightPercent = v.count === 0 ? 4 : Math.round((v.count / maxVolumeCount) * 100);
                return (
                  <div key={v.date} className="flex-1 flex flex-col items-center group relative">
                    {/* Tooltip */}
                    <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs font-mono py-1 px-2 rounded-lg pointer-events-none whitespace-nowrap z-10">
                      {v.label}: {v.count} claims
                    </div>
                    {/* Bar */}
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[20px] rounded-t-md transition-all ${
                        v.count > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-slate-100"
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* X Axis Labels */}
            <div className="flex justify-between text-xs font-mono text-slate-400 px-1 pt-2">
              <span>{stats.volumeByDate[0]?.label}</span>
              <span>{stats.volumeByDate[Math.floor(stats.volumeByDate.length / 2)]?.label}</span>
              <span>{stats.volumeByDate[stats.volumeByDate.length - 1]?.label}</span>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Peak Day: 14 Sep (Roundabout &amp; Urban Shunt)</span>
            <span className="font-mono text-slate-700 font-semibold">Avg: {(stats.totalClaims / 14).toFixed(1)} / day</span>
          </div>
        </div>
      </div>

      {/* Priority Review Queue Section */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-amber-50/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <AlertTriangleIcon size={18} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-950">
                Priority Human Review Queue
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Claims requiring adjuster triage due to low AI confidence, contradictory evidence, or missing counterparty data
              </p>
            </div>
          </div>
          <Link
            href="/console/review"
            className="text-xs sm:text-sm font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1.5"
          >
            <span>View All ({stats.manualReviewRequiredCount})</span>
            <ChevronRightIcon size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-xs uppercase font-mono font-bold text-slate-500 tracking-wider">
                <th className="py-3.5 px-6">Claim ID</th>
                <th className="py-3.5 px-6">Reason For Review</th>
                <th className="py-3.5 px-6">Location</th>
                <th className="py-3.5 px-6 text-center">AI Confidence</th>
                <th className="py-3.5 px-6">Assignee</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {priorityClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-slate-950">
                    <Link
                      href={`/console/claims/${claim.id}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {claim.id}
                    </Link>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-950">
                      {claim.aiAnalysis.reviewCategory?.replace(/_/g, " ") || "Review Flagged"}
                    </div>
                    <div className="text-xs text-slate-500 line-clamp-1 max-w-sm mt-0.5">
                      {claim.aiAnalysis.reviewReason || claim.incident.summary}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-700">
                    {claim.incident.location.city} ({claim.incident.location.street})
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-block font-mono text-xs px-2.5 py-1 rounded-lg border font-bold ${getConfidenceBadgeClass(
                        claim.aiAnalysis.overallConfidence
                      )}`}
                    >
                      {claim.aiAnalysis.overallConfidence}%
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-700">
                    {claim.assignee ? (
                      <span className="font-semibold text-slate-900">{claim.assignee.name}</span>
                    ) : (
                      <span className="text-amber-700 italic font-medium">Unassigned</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/console/claims/${claim.id}`}
                      className="min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-700 hover:bg-blue-50"
                    >
                      <span>Review</span>
                      <ChevronRightIcon size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Claims Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-950">Recent Claims Ingested</h2>
            <p className="text-xs text-slate-500 mt-0.5">Latest accident dossiers received into the console</p>
          </div>
          <Link
            href="/console/claims"
            className="text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5"
          >
            <span>View Full Directory</span>
            <ChevronRightIcon size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-xs uppercase font-mono font-bold text-slate-500 tracking-wider">
                <th className="py-3.5 px-6">Claim ID</th>
                <th className="py-3.5 px-6">Date / City</th>
                <th className="py-3.5 px-6">Policyholder</th>
                <th className="py-3.5 px-6">Vehicles Involved</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-center">Telemetry</th>
                <th className="py-3.5 px-6 text-right">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {recentClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-slate-950">
                    <Link
                      href={`/console/claims/${claim.id}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {claim.id}
                    </Link>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-slate-900">{formatDate(claim.incidentDate)}</div>
                    <div className="text-xs text-slate-500">{claim.incident.location.city}</div>
                  </td>
                  <td className="py-4 px-6 text-slate-900 font-medium">
                    {claim.policyholder.fullName}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-mono text-xs text-slate-900 font-semibold">
                      {claim.vehicleA.plate} <span className="text-slate-400">vs</span> {claim.vehicleB?.plate || "N/A"}
                    </div>
                    <div className="text-xs text-slate-500">
                      {claim.vehicleA.make} {claim.vehicleA.model}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-lg border font-semibold ${getStatusBadgeClass(
                        claim.status
                      )}`}
                    >
                      {getStatusLabel(claim.status)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    {claim.telemetry.hasTelemetry ? (
                      <span className="inline-flex items-center px-2 py-0.5 text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 rounded-md border border-emerald-200">
                        10-20Hz Box
                      </span>
                    ) : (
                      <span className="text-slate-400 font-mono text-xs">—</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span
                      className={`font-mono text-xs px-2.5 py-1 rounded-lg border font-bold ${getConfidenceBadgeClass(
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
