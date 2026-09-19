"use client";

import React from "react";
import { useClaims } from "@/context/ClaimsContext";
import { BarChartIcon, CpuIcon, CheckCircleIcon, AlertTriangleIcon, ActivityIcon } from "@/components/icons/Icons";

export default function ConsoleAnalyticsPage() {
  const { claims, stats, isLoading } = useClaims();

  if (isLoading) {
    return <div className="py-12 text-center text-xs text-slate-500">Evaluating pipeline metrics...</div>;
  }

  // Telemetry vs Non-telemetry breakdown
  const telemCount = claims.filter((c) => c.telemetry.hasTelemetry).length;
  const nonTelemCount = claims.length - telemCount;

  // Mean confidence by telemetry availability
  const telemClaims = claims.filter((c) => c.telemetry.hasTelemetry);
  const nonTelemClaims = claims.filter((c) => !c.telemetry.hasTelemetry);
  const telemMeanConf = telemClaims.length > 0
    ? Math.round(telemClaims.reduce((acc, c) => acc + c.aiAnalysis.overallConfidence, 0) / telemClaims.length)
    : 0;
  const nonTelemMeanConf = nonTelemClaims.length > 0
    ? Math.round(nonTelemClaims.reduce((acc, c) => acc + c.aiAnalysis.overallConfidence, 0) / nonTelemClaims.length)
    : 0;

  // Acceptance rate (claims reviewed or closed / total requiring review)
  const totalReviewedOrClosed = claims.filter((c) => c.status === "REVIEWED" || c.status === "CLOSED").length;
  const reviewAcceptanceRate = Math.round((totalReviewedOrClosed / (claims.length || 1)) * 100);

  // Confidence distribution brackets (<70, 70-84, 85-100)
  const confBrackets = [
    { label: "High (85 - 100%)", count: claims.filter((c) => c.aiAnalysis.overallConfidence >= 85).length, color: "bg-emerald-600" },
    { label: "Medium (70 - 84%)", count: claims.filter((c) => c.aiAnalysis.overallConfidence >= 70 && c.aiAnalysis.overallConfidence < 85).length, color: "bg-amber-500" },
    { label: "Low (< 70%)", count: claims.filter((c) => c.aiAnalysis.overallConfidence < 70).length, color: "bg-rose-500" },
  ];

  // Synthetic processing latency distribution (simulated inference latency brackets in seconds)
  const latencyBrackets = [
    { label: "< 2.0s (Photo OCR)", count: 5, pct: 36 },
    { label: "2.0 - 4.0s (Vision Segmentation)", count: 6, pct: 43 },
    { label: "4.0 - 8.0s (Kinematic Solvers)", count: 3, pct: 21 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Pipeline Evaluation &amp; Metrics
            </h1>
            <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider">
              Synthetic Benchmarking
            </span>
          </div>
          <p className="mt-2 text-base text-slate-600">
            Empirical benchmarking of multimodal AI accuracy, human review escalation, and sensor telemetry lift for academic evaluation.
          </p>
        </div>

        <div className="text-right">
          <div className="text-xs font-mono text-slate-400 font-semibold">Token Titans Research Prototype</div>
          <div className="text-sm font-bold text-slate-900 font-mono mt-0.5">Sample: N = {claims.length} Dossiers</div>
        </div>
      </div>

      {/* Core Academic Metric Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Mean AI Confidence
          </div>
          <div className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-950 font-mono">
            {stats.meanConfidence}%
          </div>
          <div className="mt-2 text-xs text-slate-600">
            Telemetry Lift: +{telemMeanConf - nonTelemMeanConf}% with EDR
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Human Review Escalation
          </div>
          <div className="mt-3 text-3xl sm:text-4xl font-extrabold text-amber-700 font-mono">
            {stats.manualReviewRequiredPercent}%
          </div>
          <div className="mt-2 text-xs text-slate-600">
            {stats.manualReviewRequiredCount} flagged of {claims.length} claims
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            CAI Extraction Accuracy
          </div>
          <div className="mt-3 text-3xl sm:text-4xl font-extrabold text-blue-700 font-mono">
            {stats.caiFieldCompletionPercent}%
          </div>
          <div className="mt-2 text-xs text-slate-600">
            {stats.confirmedCaiFields} confirmed of {stats.totalCaiFields} fields
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Review Clearance Rate
          </div>
          <div className="mt-3 text-3xl sm:text-4xl font-extrabold text-emerald-700 font-mono">
            {reviewAcceptanceRate}%
          </div>
          <div className="mt-2 text-xs text-slate-600">
            {totalReviewedOrClosed} reviewed / closed dossiers
          </div>
        </div>
      </div>

      {/* Analytical Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Telemetry vs Non-Telemetry Comparative Performance */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-950">
                Telemetry Lift: Connected Black-Box vs Baseline
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Comparative certainty with synchronous vehicle kinematics vs optical-only
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400 font-bold">Δ = +{telemMeanConf - nonTelemMeanConf}%</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-medium mb-1.5">
                <span className="text-slate-800 font-bold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  Telemetry-Equipped Vehicles ({telemCount} claims)
                </span>
                <span className="font-mono text-emerald-800 font-bold">{telemMeanConf}% Mean Conf</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${telemMeanConf}%` }} />
              </div>
              <div className="text-xs text-slate-500 mt-1.5">
                Direct CAN bus deceleration, Delta-V calculation, sub-second impact angle.
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium mb-1.5">
                <span className="text-slate-800 font-bold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
                  Non-Telemetry Baseline ({nonTelemCount} claims)
                </span>
                <span className="font-mono text-slate-700 font-bold">{nonTelemMeanConf}% Mean Conf</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-slate-500 h-full rounded-full" style={{ width: `${nonTelemMeanConf}%` }} />
              </div>
              <div className="text-xs text-slate-500 mt-1.5">
                Requires manual adjuster review for disputed traffic light or lane-crossing priorities.
              </div>
            </div>
          </div>
        </div>

        {/* 2. AI Confidence Band Distribution */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-950">
                Confidence Band Distribution
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Categorization by automated validation threshold
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400 font-semibold">Total N={claims.length}</span>
          </div>

          <div className="space-y-4">
            {confBrackets.map((bracket) => {
              const pct = Math.round((bracket.count / (claims.length || 1)) * 100);
              return (
                <div key={bracket.label} className="text-sm">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-slate-800">{bracket.label}</span>
                    <div className="font-mono text-slate-600">
                      <span>{bracket.count} dossiers</span>
                      <span className="text-slate-400 text-xs ml-2">({pct}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className={`${bracket.color} h-full rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
            Claims with &lt;85% confidence automatically route to the Priority Human Review queue.
          </div>
        </div>
      </div>

      {/* Lower Row: Escalation Drivers + Pipeline Latency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Escalation Drivers */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xs">
          <h3 className="text-base font-bold text-slate-950 border-b border-slate-100 pb-3">
            Escalation Root-Cause Breakdown
          </h3>
          <div className="space-y-3">
            {stats.reviewCategories.map((cat) => (
              <div key={cat.category} className="flex items-center justify-between text-sm p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200">
                <span className="font-medium text-slate-800">{cat.label}</span>
                <span className="font-mono font-bold text-amber-900 bg-amber-100/60 px-2.5 py-1 rounded-lg">
                  {cat.count} cases
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Synthetic Processing Latency Distribution */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xs">
          <h3 className="text-base font-bold text-slate-950 border-b border-slate-100 pb-3">
            Multimodal Pipeline Latency Distribution (Synthetic)
          </h3>
          <p className="text-xs text-slate-500">
            Model inference, OCR extraction, and kinematic solver execution time per claim
          </p>

          <div className="space-y-4 pt-1">
            {latencyBrackets.map((lat) => (
              <div key={lat.label} className="text-sm">
                <div className="flex justify-between font-medium mb-1.5">
                  <span className="text-slate-800">{lat.label}</span>
                  <span className="font-mono text-slate-950 font-bold">{lat.pct}% ({lat.count} claims)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${lat.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-3 text-xs text-slate-400 italic">
            Synthetic benchmark based on lightweight containerized vision transformer and numerical physics kernel.
          </div>
        </div>
      </div>
    </div>
  );
}
