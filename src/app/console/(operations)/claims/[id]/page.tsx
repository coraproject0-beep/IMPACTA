"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useClaims } from "@/context/ClaimsContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  formatDateTime,
  getStatusBadgeClass,
  getStatusLabel,
} from "@/lib/utils";
import { exportClaimAsJson } from "@/lib/exportUtils";
import { ClaimStatus } from "@/types";

// Import Tabs
import { OverviewTab } from "@/features/claims/tabs/OverviewTab";
import { EvidenceTab } from "@/features/claims/tabs/EvidenceTab";
import { AIReconstructionTab } from "@/features/claims/tabs/AIReconstructionTab";
import { CAIWorkspaceTab } from "@/features/claims/tabs/CAIWorkspaceTab";
import { AuditTrailTab } from "@/features/claims/tabs/AuditTrailTab";

type TabKey = "overview" | "evidence" | "reconstruction" | "cai" | "audit";

export default function ConsoleClaimDetailPage() {
  const params = useParams();
  const router = useRouter();
  const claimId = params?.id as string;
  const { getClaim, updateStatus, assignReviewer, reviewers, isLoading } = useClaims();
  const { language, t } = useLanguage();
  const isIt = language === "it";

  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [exportNotice, setExportNotice] = useState(false);
  const [requestInfoNotice, setRequestInfoNotice] = useState(false);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-xs font-mono text-[#666666] uppercase tracking-wider">
        {isIt ? `Caricamento sinistro ${claimId}...` : `Loading claim ${claimId}...`}
      </div>
    );
  }

  const claim = getClaim(claimId);

  if (!claim) {
    return (
      <div className="bg-white border border-[#E5E5E3] rounded-xl p-12 text-center space-y-4">
        <h2 className="text-base font-bold text-[#0E0F10]">
          {isIt ? "Fascicolo Sinistro Non Trovato" : "Claim Dossier Not Found"}
        </h2>
        <p className="text-xs text-[#666666]">
          {isIt ? "L'identificativo" : "The requested identifier"}{" "}
          <code className="font-mono text-[#0E0F10] font-bold">{claimId}</code>{" "}
          {isIt ? "non è presente nel registro locale." : "does not exist in the local registry."}
        </p>
        <Link
          href="/console/claims"
          className="inline-block px-5 py-2.5 text-xs font-semibold rounded-lg bg-[#0E0F10] text-white hover:bg-[#1A1B1C] transition-colors"
        >
          {isIt ? "Torna all'archivio sinistri" : "Back to Claims Directory"}
        </Link>
      </div>
    );
  }

  const handleExport = () => {
    exportClaimAsJson(claim);
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  const handleRequestInfo = () => {
    setRequestInfoNotice(true);
    setTimeout(() => setRequestInfoNotice(false), 3500);
  };

  const tabs: { id: TabKey; label: string }[] = [
    { id: "overview", label: t("consoleClaimDetail.tabSummary") },
    { id: "evidence", label: t("consoleClaimDetail.tabEvidence") },
    { id: "reconstruction", label: t("consoleClaimDetail.tabReconstruction") },
    { id: "cai", label: t("consoleClaimDetail.tabReport") },
    { id: "audit", label: t("consoleClaimDetail.tabHistory") },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Back link */}
      <div>
        <Link
          href="/console/claims"
          className="text-xs font-semibold text-[#666666] hover:text-[#0E0F10] transition-colors inline-flex items-center gap-1.5"
        >
          <span>{t("consoleClaimDetail.backToClaims")}</span>
        </Link>
      </div>

      {/* 2. Claim Title & Subtitle */}
      <div className="space-y-1">
        <h1 className="text-3xl sm:text-4xl font-mono font-bold text-[#0E0F10] tracking-tight">
          {claim.id}
        </h1>
        <p className="text-xs sm:text-sm text-[#666666] font-mono">
          {formatDateTime(claim.incidentDate)} · {claim.incident.location.city}, {claim.incident.location.street}
        </p>
      </div>

      {/* 3. Status Alert Callout Banner */}
      <div className="border border-amber-300 bg-amber-50/80 rounded-xl p-4 sm:p-5">
        <div className="text-xs sm:text-sm font-bold text-amber-950">
          {t("consoleClaimDetail.driverConfirmationRequired")}
        </div>
        <p className="text-xs text-amber-900 mt-1 leading-relaxed">
          {t("consoleClaimDetail.driverConfirmationDesc")}
        </p>
      </div>

      {/* 4. Tab Navigation Strip */}
      <div className="border-b border-[#E5E5E3]">
        <nav className="flex space-x-6 sm:space-x-8 overflow-x-auto" aria-label="Claim detail tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
                  isActive
                    ? "border-[#0E0F10] text-[#0E0F10]"
                    : "border-transparent text-[#666666] hover:text-[#0E0F10]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 5. Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Active Tab Content */}
        <div className="lg:col-span-8">
          {activeTab === "overview" && <OverviewTab claim={claim} />}
          {activeTab === "evidence" && <EvidenceTab claim={claim} />}
          {activeTab === "reconstruction" && <AIReconstructionTab claim={claim} />}
          {activeTab === "cai" && <CAIWorkspaceTab claim={claim} />}
          {activeTab === "audit" && <AuditTrailTab claim={claim} />}
        </div>

        {/* Right Rail: Review status, actions, structured report & audit trail */}
        <div className="lg:col-span-4 space-y-6">
          {/* Action Notices */}
          {exportNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-900 font-mono">
              ✓ Exported {claim.id}_REPORT.json
            </div>
          )}
          {requestInfoNotice && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
              {isIt
                ? "Notifica di richiesta chiarimenti inviata al conducente."
                : "Clarification request dispatched to policyholder."}
            </div>
          )}

          {/* Action Box */}
          <div className="border border-[#E5E5E3] bg-white rounded-xl p-5 space-y-4">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-[#666666]">
                {t("consoleClaimDetail.reviewStatus")}
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${getStatusBadgeClass(claim.status)}`}>
                  {getStatusLabel(claim.status)}
                </span>
                <select
                  value={claim.status}
                  onChange={(e) => updateStatus(claim.id, e.target.value as ClaimStatus)}
                  className="bg-[#F7F7F6] border border-[#E5E5E3] rounded px-2 py-1 text-xs text-[#0E0F10] focus:outline-none"
                >
                  <option value="NEW">New</option>
                  <option value="IN_REVIEW">In Review</option>
                  <option value="CAI_READY">CAI Ready</option>
                  <option value="REVIEWED">Reviewed</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-[#E5E5E3]">
              <div className="text-xs font-semibold text-[#666666]">
                {isIt ? "Perito Assegnato" : "Assigned Adjuster"}
              </div>
              <select
                value={claim.assignee?.id || ""}
                onChange={(e) => assignReviewer(claim.id, e.target.value || null)}
                className="w-full bg-[#F7F7F6] border border-[#E5E5E3] rounded p-2 text-xs text-[#0E0F10] focus:outline-none"
              >
                <option value="">{isIt ? "Non assegnato" : "Unassigned"}</option>
                {reviewers.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Solid Black Primary Action Button */}
            <div className="pt-2 space-y-2.5">
              <button
                type="button"
                onClick={() => setActiveTab("cai")}
                className="w-full py-3 px-4 bg-[#0E0F10] text-white hover:bg-[#1A1B1C] rounded-lg text-xs font-semibold tracking-tight transition-colors text-center"
              >
                {t("consoleClaimDetail.reviewClaimCta")}
              </button>

              <button
                type="button"
                onClick={handleRequestInfo}
                className="w-full py-2.5 px-4 border border-[#E5E5E3] bg-white text-[#0E0F10] hover:bg-[#F7F7F6] rounded-lg text-xs font-semibold transition-colors text-center"
              >
                {t("consoleClaimDetail.requestInfoCta")}
              </button>

              <button
                type="button"
                onClick={handleExport}
                className="w-full py-2.5 px-4 border border-[#E5E5E3] bg-white text-[#0E0F10] hover:bg-[#F7F7F6] rounded-lg text-xs font-semibold transition-colors text-center"
              >
                {t("consoleClaimDetail.exportReportCta")}
              </button>
            </div>
          </div>

          {/* Structured Report Status Container */}
          <div className="border border-[#E5E5E3] bg-white rounded-xl p-5 space-y-3">
            <div className="text-xs font-bold text-[#0E0F10]">
              {t("consoleClaimDetail.structuredReportTitle")}
            </div>
            <div className="text-xs text-emerald-700 font-medium">
              {isIt ? "Generato · In attesa di convalida" : "Generated · Awaiting sign-off"}
            </div>
            <p className="text-xs text-[#666666] leading-relaxed">
              {t("consoleClaimDetail.structuredReportDesc")}
            </p>
            <button
              type="button"
              onClick={() => setActiveTab("cai")}
              className="text-xs font-semibold text-[#0E0F10] hover:underline block pt-1"
            >
              {t("consoleClaimDetail.openReportCta")}
            </button>
          </div>

          {/* Latest Activity Container */}
          <div className="border border-[#E5E5E3] bg-white rounded-xl p-5 space-y-3">
            <div className="text-xs font-bold text-[#0E0F10]">
              {t("consoleClaimDetail.latestActivity")}
            </div>

            <div className="space-y-3 text-xs divide-y divide-[#E5E5E3]">
              <div className="pt-1">
                <div className="text-[#0E0F10] font-medium">
                  {isIt ? "Segnalazione inviata dal conducente" : "Driver submitted report"}
                </div>
                <div className="text-[11px] font-mono text-[#666666]">12m ago · Mobile App</div>
              </div>
              <div className="pt-2">
                <div className="text-[#0E0F10] font-medium">
                  {isIt ? "Telemetria EDR sincronizzata" : "Sensors ingested & verified"}
                </div>
                <div className="text-[11px] font-mono text-[#666666]">11m ago · CAN-bus EDR</div>
              </div>
              <div className="pt-2">
                <div className="text-[#0E0F10] font-medium">
                  {isIt ? "Bozza CAI Box 12 generata" : "CAI Box 12 draft compiled"}
                </div>
                <div className="text-[11px] font-mono text-[#666666]">10m ago · Forensic Engine</div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E5E5E3]">
              <button
                type="button"
                onClick={() => setActiveTab("audit")}
                className="text-xs font-semibold text-[#0E0F10] hover:underline"
              >
                {t("consoleClaimDetail.viewFullHistory")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
