"use client";

import React from "react";
import { useClaims } from "@/context/ClaimsContext";
import { useLanguage } from "@/context/LanguageContext";
import { CountUpMetric } from "@/components/console/CountUpMetric";

export default function ConsoleAnalyticsPage() {
  const { claims, stats, isLoading } = useClaims();
  const { language } = useLanguage();
  const isIt = language === "it";

  if (isLoading) {
    return (
      <div className="py-20 text-center text-xs font-mono text-[#666666] uppercase tracking-wider">
        {isIt ? "Valutazione metriche forensi..." : "Evaluating pipeline metrics..."}
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

  // Confidence distribution brackets
  const confBrackets = [
    { label: isIt ? "Alta confidenza (85 - 100%)" : "High Certainty (85 - 100%)", count: claims.filter((c) => c.aiAnalysis.overallConfidence >= 85).length },
    { label: isIt ? "Media confidenza (70 - 84%)" : "Medium Certainty (70 - 84%)", count: claims.filter((c) => c.aiAnalysis.overallConfidence >= 70 && c.aiAnalysis.overallConfidence < 85).length },
    { label: isIt ? "Bassa confidenza (< 70%)" : "Low Certainty (< 70%)", count: claims.filter((c) => c.aiAnalysis.overallConfidence < 70).length },
  ];

  return (
    <div className="space-y-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#E5E5E3]">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#666666]">
            {isIt ? "ANALISI & PRESTAZIONI" : "ANALYTICS & OPERATIONAL BENCHMARK"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0F10]">
            {isIt ? "Prestazioni del Sistema" : "Pipeline Performance"}
          </h1>
          <p className="text-sm text-[#666666]">
            {isIt
              ? "Monitoraggio empirico della certezza delle evidenze, escalation peritale e copertura sensori."
              : "Empirical benchmarking of evidence certainty, adjuster escalation, and sensor coverage."}
          </p>
        </div>

        <div className="text-left sm:text-right text-xs">
          <div className="text-[#666666] uppercase font-semibold">{isIt ? "Campione locale" : "Local Repository"}</div>
          <div className="text-sm font-bold text-[#0E0F10]">
            N = <span className="font-mono">{claims.length}</span> {isIt ? "fascicoli" : "dossiers"}
          </div>
        </div>
      </div>

      {/* Metric Strip (Open layout) */}
      <div className="border border-[#E5E5E3] bg-white rounded-xl grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E5E5E3]">
        <div className="p-5 sm:p-6 space-y-1">
          <span className="text-xs font-medium text-[#666666] block">
            {isIt ? "Confidenza Media" : "Mean AI Certainty"}
          </span>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-[#0E0F10]">
            <CountUpMetric value={stats.meanConfidence} suffix="%" duration={800} />
          </div>
          <span className="text-[11px] text-[#666666] block">
            {isIt ? "Precisione modelli forensi" : "Forensic algorithm precision"}
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-1">
          <span className="text-xs font-medium text-[#666666] block">
            {isIt ? "Tasso Revisione Umana" : "Review Escalation"}
          </span>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-[#0E0F10]">
            <CountUpMetric value={stats.manualReviewRequiredPercent} suffix="%" duration={800} />
          </div>
          <span className="text-[11px] text-[#666666] block">
            <span className="font-mono">{stats.manualReviewRequiredCount}</span> {isIt ? "casi segnalati" : "flagged cases"}
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-1">
          <span className="text-xs font-medium text-[#666666] block">
            {isIt ? "Conformità CAI Box 12" : "CAI Field Alignment"}
          </span>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-[#0E0F10]">
            <CountUpMetric value={stats.caiFieldCompletionPercent} suffix="%" duration={900} />
          </div>
          <span className="text-[11px] text-[#666666] block">
            <span className="font-mono">{stats.confirmedCaiFields}</span> / <span className="font-mono">{stats.totalCaiFields}</span> {isIt ? "campi" : "fields"}
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-1">
          <span className="text-xs font-medium text-[#666666] block">
            {isIt ? "Copertura Telemetrica" : "Telemetry Coverage"}
          </span>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-700">
            <CountUpMetric value={Math.round((telemCount / (claims.length || 1)) * 100)} suffix="%" duration={900} />
          </div>
          <span className="text-[11px] text-[#666666] block">
            <span className="font-mono">{telemCount}</span> {isIt ? "veicoli connessi" : "connected vehicles"}
          </span>
        </div>
      </div>

      {/* Two Analytical Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Panel 1 */}
        <div className="border border-[#E5E5E3] bg-white rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E3]">
            <div>
              <h2 className="text-sm font-bold text-[#0E0F10]">
                {isIt ? "Distribuzione Confidenza Forense" : "Certainty Band Distribution"}
              </h2>
              <p className="text-xs text-[#666666] mt-0.5">
                {isIt ? "Classificazione fascicoli in base alla soglia di validazione" : "Dossier breakdown by automated threshold"}
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#666666]">N = {claims.length}</span>
          </div>

          <div className="space-y-5 text-xs">
            {confBrackets.map((bracket) => {
              const pct = Math.round((bracket.count / (claims.length || 1)) * 100);
              return (
                <div key={bracket.label} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[#0E0F10] font-medium">{bracket.label}</span>
                    <div className="text-[#0E0F10]">
                      <span className="font-mono font-bold">{bracket.count}</span> {isIt ? "fascicoli" : "dossiers"}
                      <span className="text-[#666666] ml-2 font-mono">({pct}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#F7F7F6] h-2 rounded-full overflow-hidden border border-[#E5E5E3]">
                    <div className="bg-[#0E0F10] h-full transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E5E5E3] text-xs text-[#666666]">
            {isIt
              ? "I fascicoli con confidenza inferiore all'85% vengono inviati automaticamente alla perizia umana."
              : "Dossiers below 85% confidence automatically route to human adjuster determination."}
          </div>
        </div>

        {/* Panel 2 */}
        <div className="border border-[#E5E5E3] bg-white rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E3]">
            <div>
              <h2 className="text-sm font-bold text-[#0E0F10]">
                {isIt ? "Telemetria EDR vs Ottico" : "Connected Telemetry vs Optical Baseline"}
              </h2>
              <p className="text-xs text-[#666666] mt-0.5">
                {isIt ? "Incremento di certezza grazie ai sensori inerziali di bordo" : "Certainty differential between synchronous EDR vs optical-only"}
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700">
              Δ = +{telemMeanConf - nonTelemMeanConf}%
            </span>
          </div>

          <div className="space-y-6 text-xs">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[#0E0F10] font-medium">
                  {isIt ? "Veicoli con Telemetria EDR" : "Telemetry Connected"} (<span className="font-mono">{telemCount}</span> {isIt ? "sinistri" : "claims"})
                </span>
                <span className="font-mono font-bold text-[#0E0F10]">{telemMeanConf}%</span>
              </div>
              <div className="w-full bg-[#F7F7F6] h-2 rounded-full overflow-hidden border border-[#E5E5E3]">
                <div className="bg-[#0E0F10] h-full" style={{ width: `${telemMeanConf}%` }} />
              </div>
              <div className="text-[11px] text-[#666666]">
                {isIt
                  ? "Decelerazione CAN-bus diretta, vettore d'urto millisecondo, correlazione urti."
                  : "Direct CAN-bus deceleration, sub-second impact angle, bumper contact correlation."}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[#666666]">
                  {isIt ? "Rilievo Solo Fotografico" : "Optical-Only Baseline"} (<span className="font-mono">{nonTelemCount}</span> {isIt ? "sinistri" : "claims"})
                </span>
                <span className="font-mono font-bold text-[#666666]">{nonTelemMeanConf}%</span>
              </div>
              <div className="w-full bg-[#F7F7F6] h-2 rounded-full overflow-hidden border border-[#E5E5E3]">
                <div className="bg-[#666666] h-full" style={{ width: `${nonTelemMeanConf}%` }} />
              </div>
              <div className="text-[11px] text-[#666666]">
                {isIt
                  ? "Richiede perizia umana per risolvere precedenze controverse alle intersezioni."
                  : "Requires adjuster determination for disputed precedence at junctions."}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E5E5E3] text-xs text-[#666666]">
            {isIt
              ? "I dati telemetrici convalidati riducono i tempi di liquidazione del sinistro del 72%."
              : "Validated telemetry inputs reduce claim adjudication cycle times by 72%."}
          </div>
        </div>
      </div>
    </div>
  );
}
