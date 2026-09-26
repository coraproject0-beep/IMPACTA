"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useClaims } from "@/context/ClaimsContext";
import { useLanguage } from "@/context/LanguageContext";
import { exportClaimAsJson } from "@/lib/exportUtils";
import { formatDateTime } from "@/lib/dateUtils";
import { ArrowRightIcon } from "@/components/icons/Icons";

// Import Tabs
import { OverviewTab } from "@/features/claims/tabs/OverviewTab";
import { EvidenceTab } from "@/features/claims/tabs/EvidenceTab";
import { AIReconstructionTab } from "@/features/claims/tabs/AIReconstructionTab";
import { CAIWorkspaceTab } from "@/features/claims/tabs/CAIWorkspaceTab";
import { AuditTrailTab } from "@/features/claims/tabs/AuditTrailTab";

type TabKey = "overview" | "evidence" | "reconstruction" | "cai" | "audit";

export default function ConsoleClaimDetailPage() {
  const params = useParams();
  const claimId = params?.id as string;
  const { getClaim, isLoading } = useClaims();
  const { language, t } = useLanguage();
  const isIt = language === "it";

  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [exportNotice, setExportNotice] = useState(false);
  const [requestInfoNotice, setRequestInfoNotice] = useState(false);
  const [fetchedClaim, setFetchedClaim] = useState<any>(null);
  const [isFetchingDirect, setIsFetchingDirect] = useState(false);

  const contextClaim = getClaim(claimId);
  const claim = contextClaim || fetchedClaim;

  React.useEffect(() => {
    if (!contextClaim && claimId) {
      setIsFetchingDirect(true);
      fetch(`/api/claims/${claimId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.claim) {
            setFetchedClaim(data.claim);
          }
        })
        .catch((e) => console.warn("Direct fetch error:", e))
        .finally(() => setIsFetchingDirect(false));
    }
  }, [contextClaim, claimId]);

  if (isLoading || isFetchingDirect) {
    return (
      <div className="py-20 text-center text-xs font-mono text-[#666666] uppercase tracking-wider">
        {isIt ? `Caricamento sinistro ${claimId}...` : `Loading claim ${claimId}...`}
      </div>
    );
  }

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
    <div className="space-y-8 selection:bg-[#0E0F10] selection:text-white">
      {/* 1. Back link matching console-claim-detail-reference.png */}
      <div>
        <Link
          href="/console/claims"
          className="text-xs font-medium text-[#666666] hover:text-[#0E0F10] transition-colors inline-flex items-center gap-1.5"
        >
          <span>← {t("consoleClaimDetail.backToClaims")}</span>
        </Link>
      </div>

      {/* 2. Claim Identity & Metadata matching reference */}
      <div className="space-y-1">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-[#0E0F10] tracking-tight">
          {claimId ? claimId.toUpperCase() : claim.id}
        </h1>
        <p className="text-xs sm:text-sm text-[#666666]">
          {formatDateTime(claim.incidentDate || "2026-09-25T08:42:00Z", language)} &nbsp;|&nbsp; {claim.incident?.location?.city || "Milano"}, {claim.incident?.location?.street || "Via Lorenteggio"}
        </p>
      </div>

      {/* 3. Attention Banner matching reference */}
      <div className="space-y-1">
        <div className="text-2xl sm:text-3xl font-bold text-amber-700 tracking-tight">
          {t("consoleClaimDetail.driverConfirmationRequired")}
        </div>
        <p className="text-xs sm:text-sm text-[#666666] font-normal leading-relaxed max-w-3xl">
          {t("consoleClaimDetail.driverConfirmationDesc")}
        </p>
      </div>

      {/* 4. Tab Navigation Strip with spatial motion indicator */}
      <div className="border-b border-[#E5E5E3]">
        <nav className="flex space-x-8 sm:space-x-10 overflow-x-auto" aria-label="Claim detail tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-3 text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? "text-[#0E0F10]"
                    : "text-[#666666] hover:text-[#0E0F10]"
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0E0F10] rounded-full transition-all duration-200" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 5. Two-Column Operational Layout matching console-claim-detail-reference.png */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Active Tab Content (lg:col-span-8) with smooth entrance */}
        <div key={activeTab} className="lg:col-span-8 transition-opacity duration-200 ease-out animate-fade-in">
          {activeTab === "overview" && <OverviewTab claim={claim} />}
          {activeTab === "evidence" && <EvidenceTab claim={claim} />}
          {activeTab === "reconstruction" && <AIReconstructionTab claim={claim} />}
          {activeTab === "cai" && <CAIWorkspaceTab claim={claim} />}
          {activeTab === "audit" && <AuditTrailTab claim={claim} />}
        </div>

        {/* Right Rail: Sparse, minimal review controls per Section 27 (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-8">
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

          {/* Review Status Section matching reference */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#0E0F10] tracking-tight">
              {t("consoleClaimDetail.reviewStatus")}
            </h3>

            <div className="space-y-3 text-xs divide-y divide-[#E5E5E3] border-t border-[#E5E5E3]">
              <div className="pt-3 flex items-center justify-between">
                <span className="text-[#666666]">{isIt ? "Stato" : "Status"}</span>
                <span className="font-medium text-amber-700">
                  {isIt ? "Conferma conducente richiesta" : "Driver confirmation required"}
                </span>
              </div>
              <div className="pt-3 flex items-center justify-between">
                <span className="text-[#666666]">{t("consoleOverview.evidence")}</span>
                <span className="font-medium text-[#0E0F10]">
                  {isIt ? "6 file" : "6 files"}
                </span>
              </div>
              <div className="pt-3 flex items-center justify-between">
                <span className="text-[#666666]">{isIt ? "Ultimo aggiornamento" : "Last updated"}</span>
                <span className="font-mono text-[#0E0F10]">
                  {isIt ? "8 min fa" : "8 min ago"}
                </span>
              </div>
              <div className="pt-3 flex items-center justify-between">
                <span className="text-[#666666]">{isIt ? "Perito assegnato" : "Assigned reviewer"}</span>
                <span className="font-medium text-[#0E0F10]">
                  {isIt ? "Non assegnato" : "Unassigned"}
                </span>
              </div>
            </div>

            {/* Solid Black Primary Action Button */}
            <div className="pt-4 space-y-3">
              <button
                type="button"
                onClick={() => setActiveTab("cai")}
                className="w-full py-4 px-6 bg-[#0E0F10] text-white hover:bg-[#1A1B1C] rounded-xl text-xs sm:text-sm font-semibold tracking-tight transition-colors flex items-center justify-between shadow-sm group"
              >
                <span>{t("consoleClaimDetail.reviewClaimCta")}</span>
                <ArrowRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handleRequestInfo}
                className="w-full text-left py-2 text-xs font-semibold text-[#0E0F10] hover:text-[#666666] transition-colors flex items-center justify-between"
              >
                <span>{t("consoleClaimDetail.requestInfoCta")}</span>
                <span className="text-xs">→</span>
              </button>

              <button
                type="button"
                onClick={handleExport}
                className="w-full text-left py-2 text-xs font-semibold text-[#0E0F10] hover:text-[#666666] transition-colors flex items-center justify-between"
              >
                <span>{t("consoleClaimDetail.exportReportCta")}</span>
                <span className="text-xs">→</span>
              </button>
            </div>
          </div>

          {/* Structured Report Section matching reference */}
          <div className="pt-6 border-t border-[#E5E5E3] space-y-3">
            <h3 className="text-base font-bold text-[#0E0F10] tracking-tight">
              {t("consoleClaimDetail.structuredReportTitle")}
            </h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              {t("consoleClaimDetail.structuredReportDesc")}
            </p>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[#666666]">{isIt ? "Stato" : "Status"}</span>
              <span className="font-medium text-[#0E0F10]">
                {isIt ? "Pronto per revisione" : "Ready for review"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab("cai")}
              className="text-xs font-semibold text-[#0E0F10] hover:underline flex items-center gap-1 pt-1"
            >
              <span>{t("consoleClaimDetail.openReportCta")}</span>
              <span>→</span>
            </button>
          </div>

          {/* Latest Activity Section matching reference */}
          <div className="pt-6 border-t border-[#E5E5E3] space-y-3">
            <h3 className="text-base font-bold text-[#0E0F10] tracking-tight">
              {t("consoleClaimDetail.latestActivity")}
            </h3>
            <div className="space-y-1 text-xs">
              <div className="text-[11px] font-mono text-[#666666]">
                {isIt ? "8 min fa" : "8 min ago"}
              </div>
              <div className="text-[#0E0F10]">
                {isIt
                  ? "Il conducente ha caricato 2 fotografie aggiuntive."
                  : "Driver uploaded 2 additional photos."}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab("audit")}
              className="text-xs font-semibold text-[#0E0F10] hover:underline flex items-center gap-1 pt-1"
            >
              <span>{t("consoleClaimDetail.viewFullHistory")}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
