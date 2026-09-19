"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useClaims } from "@/context/ClaimsContext";
import {
  ArrowLeftIcon,
  DownloadIcon,
  CheckCircleIcon,
  ActivityIcon,
  AlertTriangleIcon,
  LayersIcon,
  FileTextIcon,
  CameraIcon,
  CpuIcon,
} from "@/components/icons/Icons";
import {
  formatDate,
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

  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [exportNotice, setExportNotice] = useState(false);

  if (isLoading) {
    return <div className="py-12 text-center text-xs text-slate-500">Loading claim {claimId}...</div>;
  }

  const claim = getClaim(claimId);

  if (!claim) {
    return (
      <div className="bg-white border border-slate-200 rounded p-12 text-center space-y-4">
        <h2 className="text-base font-bold text-slate-900">Claim Dossier Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested identifier <code>{claimId}</code> does not exist in the local synthetic registry.
        </p>
        <Link
          href="/console/claims"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded bg-slate-900 text-white"
        >
          <ArrowLeftIcon size={14} />
          <span>Back to Claims Directory</span>
        </Link>
      </div>
    );
  }

  const handleExport = () => {
    exportClaimAsJson(claim);
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  const tabs: { id: TabKey; label: string; count?: number }[] = [
    { id: "overview", label: "Overview" },
    { id: "evidence", label: "Evidence", count: claim.evidence.length },
    { id: "reconstruction", label: "AI Reconstruction" },
    { id: "cai", label: "CAI Workspace", count: claim.caiFields.filter((f) => f.requiresConfirmation).length },
    { id: "telemetry", label: "Telemetry", count: claim.telemetry.hasTelemetry ? 1 : undefined },
    { id: "audit", label: "Audit Trail", count: claim.auditTrail.length },
  ];

  return (
    <div className="space-y-6">
      {/* Back navigation & Action strip */}
      <div className="flex items-center justify-between">
        <Link
          href="/console/claims"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeftIcon size={14} />
          <span>Back to Claims Ledger</span>
        </Link>

        <div className="flex items-center gap-2">
          {exportNotice && (
            <span className="text-[11px] text-emerald-700 font-medium">
              Downloaded {claim.id}_IMPACTA_DOSSIER.json
            </span>
          )}
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white hover:bg-slate-50 border border-slate-300 rounded text-slate-700 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <DownloadIcon size={14} />
            <span>Export Claim (JSON)</span>
          </button>
        </div>
      </div>

      {/* Claim Header Bar */}
      <div className="bg-white border border-slate-200 rounded p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold font-mono text-slate-950">
                {claim.id}
              </h1>
              <span
                className={`text-[11px] font-medium px-2.5 py-0.5 rounded border ${getStatusBadgeClass(
                  claim.status
                )}`}
              >
                {getStatusLabel(claim.status)}
              </span>
              <span
                className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
                  claim.severity === "HIGH"
                    ? "bg-rose-50 text-rose-800 border-rose-200"
                    : claim.severity === "MEDIUM"
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                {claim.severity} SEVERITY
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              {claim.policyholder.fullName} • {claim.vehicleA.make} {claim.vehicleA.model} (
              <span className="font-mono">{claim.vehicleA.plate}</span>)
            </p>
          </div>

          {/* Quick Assignee & Status Changers */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Status:</span>
              <select
                value={claim.status}
                onChange={(e) => updateStatus(claim.id, e.target.value as ClaimStatus)}
                className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="NEW">New</option>
                <option value="IN_REVIEW">In Review</option>
                <option value="CAI_READY">CAI Ready</option>
                <option value="REVIEWED">Reviewed</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Assignee:</span>
              <select
                value={claim.assignee?.id || ""}
                onChange={(e) => assignReviewer(claim.id, e.target.value || null)}
                className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Unassigned</option>
                {reviewers.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Header Metadata Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400">Incident Timestamp</div>
            <div className="font-medium text-slate-900 mt-0.5">{formatDateTime(claim.incidentDate)}</div>
          </div>

          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400">Location</div>
            <div className="font-medium text-slate-900 mt-0.5 truncate">
              {claim.incident.location.city}, {claim.incident.location.street}
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400">AI Confidence</div>
            <div className="font-medium text-slate-900 mt-0.5 flex items-center gap-1.5">
              <span
                className={`font-mono text-[11px] font-bold px-1.5 py-0.2 rounded border ${getConfidenceBadgeClass(
                  claim.aiAnalysis.overallConfidence
                )}`}
              >
                {claim.aiAnalysis.overallConfidence}%
              </span>
              <span className="text-[11px] text-slate-500">
                {claim.aiAnalysis.confidenceBand}
              </span>
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400">Black-Box Telemetry</div>
            <div className="font-medium mt-0.5">
              {claim.telemetry.hasTelemetry ? (
                <span className="font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[11px]">
                  Synchronized (ΔV {claim.telemetry.deltaVKmh} km/h)
                </span>
              ) : (
                <span className="text-slate-400 text-[11px]">Unavailable</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto" aria-label="Claim detail tabs">
          {tabs.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`py-3 px-3 border-b-2 text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
                }`}
              >
                <span>{t.label}</span>
                {t.count !== undefined && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full border ${
                      isActive
                        ? "bg-blue-50 text-blue-800 border-blue-200"
                        : "bg-slate-100 text-slate-600 border-slate-200"
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
