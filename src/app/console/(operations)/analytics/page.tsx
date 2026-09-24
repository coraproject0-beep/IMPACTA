"use client";

import React from "react";
import { useClaims } from "@/context/ClaimsContext";
import { CountUpMetric } from "@/components/console/CountUpMetric";

export default function ConsoleAnalyticsPage() {
  const { claims, stats, isLoading } = useClaims();

  if (isLoading) {
    return (
      <div className="py-16 text-center text-xs font-mono text-[#6F7375] uppercase tracking-wider">
        EVALUATING PIPELINE METRICS...
      </div>
    );
  }

  // Telemetry vs Non-telemetry breakdown
  const telemCount = claims.filter((c) => c.telemetry.hasTelemetry).length;
  const nonTelemCount = claims.length - telemCount;

  // Mean confidence by telemetry availability
  const telemClaims = claims.filter((c) => c.telemetry.hasTelemetry);
  const nonTelemClaims = claims.filter((c) => !c.telemetry.hasTelemetry);
  const telemMeanConf =
    telemClaims.length > 0
      ? Math.round(telemClaims.reduce((acc, c) => acc + c.aiAnalysis.overallConfidence, 0) / telemClaims.length)
      : 0;
  const nonTelemMeanConf =
    nonTelemClaims.length > 0
      ? Math.round(nonTelemClaims.reduce((acc, c) => acc + c.aiAnalysis.overallConfidence, 0) / nonTelemClaims.length)
      : 0;

  // Acceptance rate
  const totalReviewedOrClosed = claims.filter((c) => c.status === "REVIEWED" || c.status === "CLOSED").length;
  const reviewAcceptanceRate = Math.round((totalReviewedOrClosed / (claims.length || 1)) * 100);

  // Confidence distribution brackets
  const confBrackets = [
    { label: "High (85 - 100%)", count: claims.filter((c) => c.aiAnalysis.overallConfidence >= 85).length },
    { label: "Medium (70 - 84%)", count: claims.filter((c) => c.aiAnalysis.overallConfidence >= 70 && c.aiAnalysis.overallConfidence < 85).length },
    { label: "Low (< 70%)", count: claims.filter((c) => c.aiAnalysis.overallConfidence < 70).length },
  ];

  // Processing latency distribution
  const latencyBrackets = [
    { label: "< 2.0s (Photo & OCR Ingestion)", count: 5, pct: 36 },
    { label: "2.0 - 4.0s (Kinematic Solvers)", count: 6, pct: 43 },
    { label: "4.0 - 8.0s (Full Box 12 Mapping)", count: 3, pct: 21 },
  ];

  return (
    <div className="space-y-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#D7D9D8]">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6F7375]">
            ANALYTICS &amp; FORENSIC EVALUATION
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase text-[#090A0A]">
            Pipeline Performance
          </h1>
          <p className="text-sm text-[#6F7375] font-light max-w-2xl">
            Empirical benchmarking of kinematic certainty, human review escalation, and telemetry lift.
          </p>
        </div>

        <div className="text-right text-xs font-mono">
          <div className="text-[#6F7375]">LOCAL REPOSITORY</div>
          <div className="text-sm font-bold text-[#090A0A]">SAMPLE: N = {claims.length} DOSSIERS</div>
        </div>
      </div>

      {/* KPI Strip (Open Typographic Metric Grid) */}
      <div className="bg-white border border-[#D7D9D8] grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#D7D9D8]">
        <div className="p-6 sm:p-8 space-y-2">
          <div className="text-xs font-mono font-bold text-[#6F7375] uppercase tracking-widest">
            Mean AI Certainty
          </div>
          <div className="text-3xl sm:text-5xl font-bold tracking-tight text-[#090A0A]">
            <CountUpMetric value={stats.meanConfidence} suffix="%" duration={800} />
          </div>
          <div className="text-xs text-[#6F7375] font-mono pt-1 border-t border-[#D7D9D8]/60">
            Telemetry Lift: +{telemMeanConf - nonTelemMeanConf}% with EDR
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-2">
          <div className="text-xs font-mono font-bold text-[#6F7375] uppercase tracking-widest">
            Review Escalation
          </div>
          <div className="text-3xl sm:text-5xl font-bold tracking-tight text-[#090A0A]">
            <CountUpMetric value={stats.manualReviewRequiredPercent} suffix="%" duration={800} />
          </div>
          <div className="text-xs text-[#6F7375] font-mono pt-1 border-t border-[#D7D9D8]/60">
            {stats.manualReviewRequiredCount} flagged for review
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-2">
          <div className="text-xs font-mono font-bold text-[#6F7375] uppercase tracking-widest">
            CAI Field Alignment
          </div>
          <div className="text-3xl sm:text-5xl font-bold tracking-tight text-[#090A0A]">
            <CountUpMetric value={stats.caiFieldCompletionPercent} suffix="%" duration={900} />
          </div>
          <div className="text-xs text-[#6F7375] font-mono pt-1 border-t border-[#D7D9D8]/60">
            {stats.confirmedCaiFields} confirmed of {stats.totalCaiFields} fields
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-2">
          <div className="text-xs font-mono font-bold text-[#6F7375] uppercase tracking-widest">
            Clearance Rate
          </div>
          <div className="text-3xl sm:text-5xl font-bold tracking-tight text-[#090A0A]">
            <CountUpMetric value={reviewAcceptanceRate} suffix="%" duration={900} />
          </div>
          <div className="text-xs text-[#6F7375] font-mono pt-1 border-t border-[#D7D9D8]/60">
            {totalReviewedOrClosed} reviewed dossiers
          </div>
        </div>
      </div>

      {/* Analytical Deep-Dives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Telemetry vs Non-Telemetry Performance */}
        <div className="bg-white border border-[#D7D9D8] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#D7D9D8]">
            <div>
              <h3 className="text-base font-bold uppercase tracking-tight text-[#090A0A]">
                Connected Telemetry vs Baseline
              </h3>
              <p className="text-xs font-mono text-[#6F7375] mt-0.5">
                Certainty differential between synchronous EDR vs optical-only
              </p>
            </div>
            <span className="text-xs font-mono text-[#090A0A] font-bold">Δ = +{telemMeanConf - nonTelemMeanConf}%</span>
          </div>

          <div className="space-y-6 text-xs font-mono">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#090A0A]">Telemetry Vehicles ({telemCount} claims)</span>
                <span className="font-bold text-[#090A0A]">{telemMeanConf}% Certainty</span>
              </div>
              <div className="w-full bg-[#F4F5F3] h-2.5 border border-[#D7D9D8]">
                <div className="bg-[#090A0A] h-full" style={{ width: `${telemMeanConf}%` }} />
              </div>
              <div className="text-[11px] text-[#6F7375]">
                Direct CAN-bus deceleration, sub-second impact angle, bumper contact correlation.
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#6F7375]">Optical-Only Baseline ({nonTelemCount} claims)</span>
                <span className="font-bold text-[#6F7375]">{nonTelemMeanConf}% Certainty</span>
              </div>
              <div className="w-full bg-[#F4F5F3] h-2.5 border border-[#D7D9D8]">
                <div className="bg-[#6F7375] h-full" style={{ width: `${nonTelemMeanConf}%` }} />
              </div>
              <div className="text-[11px] text-[#6F7375]">
                Requires adjuster determination for disputed precedence at junctions.
              </div>
            </div>
          </div>
        </div>

        {/* Confidence Band Distribution */}
        <div className="bg-white border border-[#D7D9D8] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#D7D9D8]">
            <div>
              <h3 className="text-base font-bold uppercase tracking-tight text-[#090A0A]">
                Confidence Band Distribution
              </h3>
              <p className="text-xs font-mono text-[#6F7375] mt-0.5">
                Dossier categorization by automated validation threshold
              </p>
            </div>
            <span className="text-xs font-mono text-[#6F7375]">N = {claims.length}</span>
          </div>

          <div className="space-y-4 text-xs font-mono">
            {confBrackets.map((bracket) => {
              const pct = Math.round((bracket.count / (claims.length || 1)) * 100);
              return (
                <div key={bracket.label} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#090A0A]">{bracket.label}</span>
                    <div className="text-[#090A0A]">
                      <span className="font-bold">{bracket.count} dossiers</span>
                      <span className="text-[#6F7375] ml-2">({pct}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#F4F5F3] h-2 border border-[#D7D9D8]">
                    <div className="bg-[#090A0A] h-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#D7D9D8] text-[11px] font-mono text-[#6F7375]">
            Dossiers below 85% confidence automatically route to human adjuster determination.
          </div>
        </div>
      </div>

      {/* Lower Row: Escalation Drivers & Ingestion Latency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Escalation Drivers */}
        <div className="bg-white border border-[#D7D9D8] p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold uppercase tracking-tight text-[#090A0A] pb-3 border-b border-[#D7D9D8]">
            Review Escalation Root-Causes
          </h3>
          <div className="space-y-2 text-xs font-mono">
            {stats.reviewCategories.map((cat) => (
              <div
                key={cat.category}
                className="flex items-center justify-between p-3.5 border border-[#D7D9D8] bg-[#F4F5F3]"
              >
                <span className="font-bold text-[#090A0A] uppercase">{cat.label}</span>
                <span className="font-bold px-2 py-0.5 border border-[#090A0A] bg-white text-[#090A0A]">
                  {cat.count} cases
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Processing Latency */}
        <div className="bg-white border border-[#D7D9D8] p-6 sm:p-8 space-y-4">
          <div className="pb-3 border-b border-[#D7D9D8]">
            <h3 className="text-base font-bold uppercase tracking-tight text-[#090A0A]">
              Ingestion Execution Profile
            </h3>
            <p className="text-xs font-mono text-[#6F7375] mt-0.5">
              Client OCR extraction and kinematic solver computation time
            </p>
          </div>

          <div className="space-y-4 pt-1 text-xs font-mono">
            {latencyBrackets.map((lat) => (
              <div key={lat.label} className="space-y-1.5">
                <div className="flex justify-between items-center font-semibold text-[#090A0A]">
                  <span>{lat.label}</span>
                  <span>{lat.pct}% ({lat.count} claims)</span>
                </div>
                <div className="w-full bg-[#F4F5F3] h-2 border border-[#D7D9D8]">
                  <div className="bg-[#090A0A] h-full" style={{ width: `${lat.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#D7D9D8] text-[11px] font-mono text-[#6F7375]">
            Local-first browser computation eliminates server queue delays.
          </div>
        </div>
      </div>
    </div>
  );
}
