"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useClaims } from "@/context/ClaimsContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  ArrowLeftIcon,
  DownloadIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
} from "@/components/icons/Icons";
import {
  formatDateTime,
  getStatusBadgeClass,
  getStatusLabel,
  getConfidenceBadgeClass,
} from "@/lib/utils";
import { exportClaimAsJson } from "@/lib/exportUtils";
import { ClaimStatus } from "@/types";

// Import Tabs
import { OverviewTab } from "@/features/claims/tabs/OverviewTab";
import { EvidenceTab } from "@/features/claims/tabs/EvidenceTab";
import { AIReconstructionTab } from "@/features/claims/tabs/AIReconstructionTab";
import { CAIWorkspaceTab } from "@/features/claims/tabs/CAIWorkspaceTab";
import { TelemetryTab } from "@/features/claims/tabs/TelemetryTab";
import { AuditTrailTab } from "@/features/claims/tabs/AuditTrailTab";

type TabKey = "overview" | "evidence" | "reconstruction" | "cai" | "telemetry" | "audit";

export default function ConsoleClaimDetailPage() {
  const params = useParams();
  const router = useRouter();
  const claimId = params?.id as string;
  const { getClaim, updateStatus, assignReviewer, reviewers, isLoading } = useClaims();
  const { language } = useLanguage();
  const isIt = language === "it";

  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [exportNotice, setExportNotice] = useState(false);

  if (isLoading) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-[#6F7375] uppercase tracking-wider">
        {isIt ? `Caricamento sinistro ${claimId}...` : `Loading claim ${claimId}...`}
      </div>
    );
  }

  const claim = getClaim(claimId);

  if (!claim) {
    return (
      <div className="bg-white border border-[#D7D9D8] p-12 text-center space-y-4">
        <h2 className="text-base font-bold uppercase tracking-tight text-[#090A0A]">
          {isIt ? "Fascicolo Sinistro Non Trovato" : "Claim Dossier Not Found"}
        </h2>
        <p className="text-xs text-[#6F7375]">
          {isIt ? "L'identificativo" : "The requested identifier"}{" "}
          <code className="font-mono text-[#090A0A] font-bold">{claimId}</code>{" "}
          {isIt ? "non è presente nel registro locale." : "does not exist in the local registry."}
        </p>
        <Link
          href="/console/claims"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#090A0A] text-white hover:bg-[#171819] transition-colors"
        >
          <ArrowLeftIcon size={14} />
          <span>{isIt ? "Torna all'archivio sinistri" : "Back to Claims Directory"}</span>
        </Link>
      </div>
    );
  }

  const handleExport = () => {
    exportClaimAsJson(claim);
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  const pendingConfirmationCount = claim.caiFields.filter((f) => f.requiresConfirmation).length;

  const tabs: { id: TabKey; label: string; count?: number }[] = [
    { id: "overview", label: isIt ? "Riepilogo" : "Summary" },
    { id: "evidence", label: isIt ? "Prove" : "Evidence", count: claim.evidence.length },
    { id: "reconstruction", label: isIt ? "Ricostruzione" : "Reconstruction" },
    { id: "cai", label: isIt ? "Modulo CAI" : "CAI Report", count: pendingConfirmationCount > 0 ? pendingConfirmationCount : undefined },
    { id: "telemetry", label: isIt ? "Telemetria" : "Telemetry", count: claim.telemetry.hasTelemetry ? 1 : undefined },
    { id: "audit", label: isIt ? "Cronologia Audit" : "Audit History", count: claim.auditTrail.length },
  ];

  return (
    <div className="space-y-8 selection:bg-[#090A0A] selection:text-white">
      {/* Back navigation & Action strip */}
      <div className="flex items-center justify-between">
        <Link
          href="/console/claims"
          className="min-h-[44px] inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#6F7375] hover:text-[#090A0A] uppercase tracking-wider transition-colors"
        >
          <ArrowLeftIcon size={15} />
          <span>{isIt ? "Registro Sinistri" : "Back to Claims Ledger"}</span>
        </Link>

        <div className="flex items-center gap-3">
          {exportNotice && (
            <span className="text-xs text-emerald-700 font-semibold font-mono">
              Downloaded {claim.id}_DOSSIER.json
            </span>
          )}
          <button
            type="button"
            onClick={handleExport}
            className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-white hover:bg-[#F4F5F3] border border-[#D7D9D8] hover:border-[#090A0A] text-[#090A0A] transition-colors"
          >
            <DownloadIcon size={15} />
            <span>{isIt ? "Esporta Dossier (JSON)" : "Export Claim (JSON)"}</span>
          </button>
        </div>
      </div>

      {/* TOP CALLOUT: REVIEW STATUS */}
      {pendingConfirmationCount > 0 ? (
        <div className="bg-amber-50 border border-amber-300 p-4 sm:p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangleIcon size={18} className="text-amber-800 flex-shrink-0" />
            <div className="text-xs sm:text-sm text-amber-950 font-medium">
              <span className="font-bold uppercase tracking-wider block sm:inline">
                {isIt ? "Revisione richiesta:" : "Needs review:"}{" "}
              </span>
              <span>
                {isIt
                  ? `${pendingConfirmationCount} elementi richiedono conferma peritale per validare il CAI Box 12.`
                  : `${pendingConfirmationCount} items require adjuster confirmation before CAI Box 12 sign-off.`}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab("cai")}
            className="text-xs font-bold text-amber-950 underline uppercase tracking-wider whitespace-nowrap"
          >
            {isIt ? "Apri Box 12 →" : "Open Box 12 →"}
          </button>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-300 p-4 sm:p-5 flex items-center gap-3">
          <CheckCircleIcon size={18} className="text-emerald-700 flex-shrink-0" />
          <div className="text-xs sm:text-sm text-emerald-950 font-medium">
            <span className="font-bold uppercase tracking-wider">
              {isIt ? "Stato Perizia: " : "Review Status: "}
            </span>
            <span>
              {isIt
                ? "Tutti gli elementi probatori e le circostanze CAI sono stati verificati e convalidati."
                : "All forensic evidence items and CAI circumstances verified and confirmed."}
            </span>
          </div>
        </div>
      )}

      {/* Claim Header Bar */}
      <div className="bg-white border border-[#D7D9D8] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-[#D7D9D8] pb-5">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black font-mono text-[#090A0A]">
                {claim.id}
              </h1>
              <span
                className={`text-[11px] font-semibold px-2.5 py-0.5 border uppercase ${getStatusBadgeClass(
                  claim.status
                )}`}
              >
                {getStatusLabel(claim.status)}
              </span>
              <span
                className={`text-[11px] font-semibold px-2.5 py-0.5 border uppercase ${
                  claim.severity === "HIGH"
                    ? "bg-rose-50 text-rose-800 border-rose-200"
                    : claim.severity === "MEDIUM"
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-[#F4F5F3] text-[#6F7375] border-[#D7D9D8]"
                }`}
              >
                {claim.severity} SEVERITY
              </span>
            </div>
            <p className="text-sm text-[#6F7375] mt-1.5 font-normal">
              {claim.policyholder.fullName} • {claim.vehicleA.make} {claim.vehicleA.model} (
              <span className="font-mono font-semibold text-[#090A0A]">{claim.vehicleA.plate}</span>)
            </p>
          </div>

          {/* Quick Assignee & Status Changers */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#6F7375] font-semibold uppercase tracking-wider">{isIt ? "Stato:" : "Status:"}</span>
              <select
                value={claim.status}
                onChange={(e) => updateStatus(claim.id, e.target.value as ClaimStatus)}
                className="bg-white border border-[#D7D9D8] px-3 py-1.5 text-xs text-[#090A0A] font-semibold focus:outline-none focus:border-[#090A0A] min-h-[38px]"
              >
                <option value="NEW">New</option>
                <option value="IN_REVIEW">In Review</option>
                <option value="CAI_READY">CAI Ready</option>
                <option value="REVIEWED">Reviewed</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#6F7375] font-semibold uppercase tracking-wider">{isIt ? "Perito:" : "Assignee:"}</span>
              <select
                value={claim.assignee?.id || ""}
                onChange={(e) => assignReviewer(claim.id, e.target.value || null)}
                className="bg-white border border-[#D7D9D8] px-3 py-1.5 text-xs text-[#090A0A] font-semibold focus:outline-none focus:border-[#090A0A] min-h-[38px]"
              >
                <option value="">{isIt ? "Non assegnato" : "Unassigned"}</option>
                {reviewers.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Header Metadata Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="text-[11px] uppercase font-semibold text-[#6F7375] tracking-wider">{isIt ? "Data / Ora Sinistro" : "Incident Timestamp"}</div>
            <div className="font-mono font-semibold text-[#090A0A] mt-1">{formatDateTime(claim.incidentDate)}</div>
          </div>

          <div>
            <div className="text-[11px] uppercase font-semibold text-[#6F7375] tracking-wider">{isIt ? "Luogo" : "Location"}</div>
            <div className="font-medium text-[#090A0A] mt-1 truncate">
              {claim.incident.location.city}, {claim.incident.location.street}
            </div>
          </div>

          <div>
            <div className="text-[11px] uppercase font-semibold text-[#6F7375] tracking-wider">{isIt ? "Confidenza Forense" : "Forensic Confidence"}</div>
            <div className="font-semibold text-[#090A0A] mt-1 flex items-center gap-2">
              <span
                className={`font-mono text-xs font-bold px-2 py-0.5 border ${getConfidenceBadgeClass(
                  claim.aiAnalysis.overallConfidence
                )}`}
              >
                {claim.aiAnalysis.overallConfidence}%
              </span>
              <span className="text-xs text-[#6F7375]">
                {claim.aiAnalysis.confidenceBand}
              </span>
            </div>
          </div>

          <div>
            <div className="text-[11px] uppercase font-semibold text-[#6F7375] tracking-wider">{isIt ? "Telemetria EDR" : "Black-Box Telemetry"}</div>
            <div className="mt-1">
              {claim.telemetry.hasTelemetry ? (
                <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 text-xs">
                  ΔV {claim.telemetry.deltaVKmh} km/h
                </span>
              ) : (
                <span className="text-[#6F7375] text-xs">{isIt ? "Non disponibile" : "Unavailable"}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation (Plain section tabs, no '01' prefixes) */}
      <div className="border-b border-[#D7D9D8]">
        <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto" aria-label="Claim detail tabs">
          {tabs.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`py-3 px-3 sm:px-4 border-b-2 text-xs sm:text-sm font-semibold uppercase tracking-wider whitespace-nowrap transition-colors flex items-center gap-2 ${
                  isActive
                    ? "border-[#090A0A] text-[#090A0A] font-bold"
                    : "border-transparent text-[#6F7375] hover:text-[#090A0A] hover:border-[#D7D9D8]"
                }`}
              >
                <span>{t.label}</span>
                {t.count !== undefined && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 border ${
                      isActive
                        ? "bg-[#090A0A] text-white border-[#090A0A] font-bold"
                        : "bg-[#F4F5F3] text-[#6F7375] border-[#D7D9D8]"
                    }`}
                  >
                    {t.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Contents */}
      <div>
        {activeTab === "overview" && <OverviewTab claim={claim} />}
        {activeTab === "evidence" && <EvidenceTab claim={claim} />}
        {activeTab === "reconstruction" && <AIReconstructionTab claim={claim} />}
        {activeTab === "cai" && <CAIWorkspaceTab claim={claim} />}
        {activeTab === "telemetry" && <TelemetryTab claim={claim} />}
        {activeTab === "audit" && <AuditTrailTab claim={claim} />}
      </div>
    </div>
  );
}
