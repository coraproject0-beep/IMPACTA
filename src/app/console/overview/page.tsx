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
      <div className="flex flex-col sm:row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-950">
              Operational Overview
            </h1>
            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 text-slate-600 border border-slate-300 rounded">
              SYNTHETIC DATA
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Road-accident dossier intake, automated kinematics reconstruction, and CAI workspace review.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/console/review"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <AlertTriangleIcon size={14} />
            <span>Open Review Queue ({stats.manualReviewRequiredCount})</span>
          </Link>
          <Link
            href="/console/claims"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <LayersIcon size={14} />
            <span>All Claims ({stats.totalClaims})</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Open Claims */}
        <div className="bg-white border border-slate-200 rounded p-4">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            Open Claims
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono-num">
              {stats.openClaims}
            </span>
            <span className="text-xs text-slate-500">
              of {stats.totalClaims} total
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>{stats.reviewed} closed/reviewed</span>
          </div>
        </div>

        {/* Awaiting AI Review */}
        <div className="bg-white border border-slate-200 rounded p-4">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            Awaiting AI Review
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-amber-700 font-mono-num">
              {stats.awaitingReview}
            </span>
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              {stats.manualReviewRequiredCount} high priority
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Low confidence or conflicting inputs
          </div>
        </div>

        {/* CAI Drafts Ready */}
        <div className="bg-white border border-slate-200 rounded p-4">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            CAI Drafts Ready
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-blue-700 font-mono-num">
              {stats.caiReady}
            </span>
            <span className="text-xs text-slate-500">
              {stats.caiFieldCompletionPercent}% fields confirmed
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Awaiting final adjuster sign-off
          </div>
        </div>

        {/* Telemetry Coverage */}
        <div className="bg-white border border-slate-200 rounded p-4">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            Telemetry Coverage
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-emerald-700 font-mono-num">
              {stats.telemetryCoveragePercent}%
            </span>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              Black-box active
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Mean AI confidence: {stats.meanConfidence}%
          </div>
        </div>
      </div>

      {/* Operational Funnel & Claims Arrival Histogram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* AI Processing Funnel */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded p-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                AI Intake &amp; Reconstruction Funnel
              </h2>
              <p className="text-[11px] text-slate-500">
                Progression of dossiers through multimodal parsing and review
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-400">N = {stats.totalClaims}</span>
          </div>

          <div className="mt-4 space-y-3">
            {[
              { label: "1. Dossiers Ingested", count: stats.funnel.received, percent: 100, color: "bg-slate-700" },
              { label: "2. Multimodal Evidence Parsed", count: stats.funnel.evidenceParsed, percent: Math.round((stats.funnel.evidenceParsed / (stats.funnel.received || 1)) * 100), color: "bg-slate-600" },
              { label: "3. Kinematics & AI Reconstructed", count: stats.funnel.aiAnalysed, percent: Math.round((stats.funnel.aiAnalysed / (stats.funnel.received || 1)) * 100), color: "bg-blue-600" },
              { label: "4. CAI Field Workspace Ready", count: stats.funnel.caiReady, percent: Math.round((stats.funnel.caiReady / (stats.funnel.received || 1)) * 100), color: "bg-indigo-600" },
              { label: "5. Human Adjusted / Closed", count: stats.funnel.humanReviewed, percent: Math.round((stats.funnel.humanReviewed / (stats.funnel.received || 1)) * 100), color: "bg-emerald-600" },
            ].map((step) => (
              <div key={step.label} className="text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-slate-700">{step.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-900 font-semibold">{step.count}</span>
                    <span className="font-mono text-slate-400 text-[10px] w-8 text-right">
                      {step.percent}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-sm h-2 overflow-hidden">
                  <div
                    className={`${step.color} h-full transition-all duration-300`}
                    style={{ width: `${step.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Claims Volume SVG Histogram */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Incident Occurrence Timeline
                </h2>
                <p className="text-[11px] text-slate-500">
                  Daily distribution of incoming incidents (Sept 2026)
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400">14-day window</span>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="mt-6 h-36 w-full flex items-end justify-between gap-1 px-2 border-b border-slate-200 pb-1">
              {stats.volumeByDate.map((v) => {
                const heightPercent = v.count === 0 ? 4 : Math.round((v.count / maxVolumeCount) * 100);
                return (
                  <div key={v.date} className="flex-1 flex flex-col items-center group relative">
                    {/* Tooltip */}
                    <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-mono py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap z-10">
                      {v.label}: {v.count} claims
                    </div>
                    {/* Bar */}
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[18px] rounded-t-sm transition-all ${
                        v.count > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-slate-100"
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* X Axis Labels */}
            <div className="flex justify-between text-[9px] font-mono text-slate-400 px-1 pt-1.5">
              <span>{stats.volumeByDate[0]?.label}</span>
              <span>{stats.volumeByDate[Math.floor(stats.volumeByDate.length / 2)]?.label}</span>
              <span>{stats.volumeByDate[stats.volumeByDate.length - 1]?.label}</span>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Peak Day: 14 Sep (Roundabout &amp; Urban Shunt)</span>
            <span className="font-mono text-slate-700 font-medium">Avg: {(stats.totalClaims / 14).toFixed(1)} / day</span>
          </div>
        </div>
      </div>

      {/* Priority Review Queue Section */}
      <div className="bg-white border border-slate-200 rounded overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-amber-50/40">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <AlertTriangleIcon size={14} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-950">
                Priority Human Review Queue
              </h2>
              <p className="text-[11px] text-slate-500">
                Claims requiring adjuster triage due to low AI confidence, contradictory evidence, or missing counterparty data
              </p>
            </div>
          </div>
          <Link
            href="/console/review"
            className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1"
          >
            <span>View All ({stats.manualReviewRequiredCount})</span>
            <ChevronRightIcon size={13} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                <th className="py-2.5 px-4">Claim ID</th>
                <th className="py-2.5 px-4">Reason For Review</th>
                <th className="py-2.5 px-4">Location</th>
                <th className="py-2.5 px-4 text-center">AI Confidence</th>
                <th className="py-2.5 px-4">Assignee</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {priorityClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-slate-900">
                    <Link
                      href={`/console/claims/${claim.id}`}
                      className="hover:text-blue-600 hover:underline"
                    >
                      {claim.id}
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">
                      {claim.aiAnalysis.reviewCategory?.replace(/_/g, " ") || "Review Flagged"}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 max-w-sm">
                      {claim.aiAnalysis.reviewReason || claim.incident.summary}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {claim.incident.location.city} ({claim.incident.location.street})
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block font-mono text-[11px] px-2 py-0.5 rounded border font-semibold ${getConfidenceBadgeClass(
                        claim.aiAnalysis.overallConfidence
                      )}`}
                    >
                      {claim.aiAnalysis.overallConfidence}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {claim.assignee ? (
                      <span className="font-medium text-slate-800">{claim.assignee.name}</span>
                    ) : (
                      <span className="text-amber-700 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/console/claims/${claim.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
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
      <div className="bg-white border border-slate-200 rounded overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-950">Recent Claims Ingested</h2>
            <p className="text-[11px] text-slate-500">Latest accident dossiers received into the console</p>
          </div>
          <Link
            href="/console/claims"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>View Full Directory</span>
            <ChevronRightIcon size={13} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                <th className="py-2.5 px-4">Claim ID</th>
                <th className="py-2.5 px-4">Date / City</th>
                <th className="py-2.5 px-4">Policyholder</th>
                <th className="py-2.5 px-4">Vehicles Involved</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-center">Telemetry</th>
                <th className="py-2.5 px-4 text-right">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {recentClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-slate-900">
                    <Link
                      href={`/console/claims/${claim.id}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {claim.id}
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-800">{formatDate(claim.incidentDate)}</div>
                    <div className="text-[11px] text-slate-500">{claim.incident.location.city}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-800 font-medium">
                    {claim.policyholder.fullName}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-mono text-[11px] text-slate-900 font-medium">
                      {claim.vehicleA.plate} <span className="text-slate-400">vs</span> {claim.vehicleB?.plate || "N/A"}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {claim.vehicleA.make} {claim.vehicleA.model}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded border font-medium ${getStatusBadgeClass(
                        claim.status
                      )}`}
                    >
                      {getStatusLabel(claim.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {claim.telemetry.hasTelemetry ? (
                      <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        10-20Hz Box
                      </span>
                    ) : (
                      <span className="text-slate-400 font-mono text-[10px]">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`font-mono text-[11px] px-2 py-0.5 rounded border font-semibold ${getConfidenceBadgeClass(
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
