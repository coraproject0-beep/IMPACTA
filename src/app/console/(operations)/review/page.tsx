"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClaims } from "@/context/ClaimsContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  ChevronRightIcon,
} from "@/components/icons/Icons";
import {
  formatRelativeTime,
  getConfidenceBadgeClass,
} from "@/lib/utils";

export default function ConsoleReviewQueuePage() {
  const router = useRouter();
  const { claims, currentReviewer, assignReviewer, updateStatus, isLoading } = useClaims();
  const { language } = useLanguage();
  const isIt = language === "it";

  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Filter claims that strictly require human review and are not yet closed
  const reviewClaims = useMemo(() => {
    return claims.filter((c) => {
      if (c.status === "CLOSED" || c.status === "REVIEWED") return false;
      const hasReviewFlag =
        c.aiAnalysis.reviewCategory !== undefined ||
        c.aiAnalysis.overallConfidence < 85 ||
        c.status === "IN_REVIEW";
      if (!hasReviewFlag) return false;

      if (categoryFilter !== "ALL") {
        if (categoryFilter === "LOW_CONFIDENCE") {
          return c.aiAnalysis.reviewCategory === "LOW_CONFIDENCE" || c.aiAnalysis.overallConfidence < 70;
        }
        return c.aiAnalysis.reviewCategory === categoryFilter;
      }
      return true;
    });
  }, [claims, categoryFilter]);

  const handleAssignToMe = async (claimId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await assignReviewer(claimId, currentReviewer.id);
    setActionNotice(
      isIt
        ? `Sinistro ${claimId} assegnato a te (${currentReviewer.name})`
        : `Claim ${claimId} assigned to you (${currentReviewer.name})`
    );
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleMarkReviewed = async (claimId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await updateStatus(claimId, "REVIEWED");
    setActionNotice(
      isIt
        ? `Sinistro ${claimId} segnato come PERIZIATO`
        : `Claim ${claimId} marked as REVIEWED`
    );
    setTimeout(() => setActionNotice(null), 3000);
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center text-xs font-mono text-[#666666] uppercase tracking-wider">
        {isIt ? "Caricamento coda peritale..." : "Loading review queue..."}
      </div>
    );
  }

  const categoryCounts = {
    ALL: claims.filter((c) => c.status !== "CLOSED" && c.status !== "REVIEWED" && (c.aiAnalysis.reviewCategory || c.aiAnalysis.overallConfidence < 85)).length,
    LOW_CONFIDENCE: claims.filter((c) => c.status !== "CLOSED" && (c.aiAnalysis.reviewCategory === "LOW_CONFIDENCE" || c.aiAnalysis.overallConfidence < 70)).length,
    CONFLICTING_EVIDENCE: claims.filter((c) => c.status !== "CLOSED" && c.aiAnalysis.reviewCategory === "CONFLICTING_EVIDENCE").length,
    MISSING_DATA: claims.filter((c) => c.status !== "CLOSED" && c.aiAnalysis.reviewCategory === "MISSING_DATA").length,
    STATEMENT_MISMATCH: claims.filter((c) => c.status !== "CLOSED" && c.aiAnalysis.reviewCategory === "STATEMENT_MISMATCH").length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0F10]">
            {isIt ? "Coda di Perizia & Intervento" : "Review & Intervention Queue"}
          </h1>
          <span className="text-xs font-mono font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            {reviewClaims.length} {isIt ? "richiedono attenzione" : "requiring attention"}
          </span>
        </div>
        <p className="text-sm text-[#666666]">
          {isIt
            ? "Fascicoli inoltrati per soglia di confidenza ridotta, dichiarazioni contrastanti o discrepanze CAI."
            : "Dossiers escalated due to automated confidence thresholds, conflicting driver statements, or missing evidence."}
        </p>
      </div>

      {/* Action Notice */}
      {actionNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-900 flex items-center justify-between">
          <span className="flex items-center gap-2 font-medium">
            <CheckCircleIcon size={14} className="text-emerald-700" />
            <span>{actionNotice}</span>
          </span>
        </div>
      )}

      {/* Category Tabs */}
      <div className="border border-[#E5E5E3] bg-white rounded-xl p-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { id: "ALL", label: isIt ? "Tutti i casi" : "All Escalations", count: categoryCounts.ALL },
            { id: "LOW_CONFIDENCE", label: isIt ? "Bassa confidenza" : "Low Confidence", count: categoryCounts.LOW_CONFIDENCE },
            { id: "CONFLICTING_EVIDENCE", label: isIt ? "Prove contrastanti" : "Conflicting Evidence", count: categoryCounts.CONFLICTING_EVIDENCE },
            { id: "MISSING_DATA", label: isIt ? "Dati mancanti" : "Missing Data", count: categoryCounts.MISSING_DATA },
            { id: "STATEMENT_MISMATCH", label: isIt ? "Discrepanza Box 12" : "Statement Mismatch", count: categoryCounts.STATEMENT_MISMATCH },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
                categoryFilter === cat.id
                  ? "bg-[#0E0F10] text-white font-semibold"
                  : "bg-[#F7F7F6] text-[#666666] hover:text-[#0E0F10]"
              }`}
            >
              <span>{cat.label}</span>
              <span className="font-mono text-[11px] opacity-80">
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Escalated Claims Table */}
      <div className="border border-[#E5E5E3] bg-white rounded-xl overflow-hidden">
        {reviewClaims.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <CheckCircleIcon size={24} />
            </div>
            <h3 className="text-sm font-bold text-[#0E0F10]">
              {isIt ? "Nessun sinistro in attesa di perizia" : "Review Queue Clear"}
            </h3>
            <p className="mt-1 text-xs text-[#666666]">
              {isIt ? "Tutti i sinistri di questa categoria sono stati gestiti." : "No claims currently require manual escalation in this filter."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E5E5E3] bg-[#F7F7F6] text-[11px] font-mono font-medium text-[#666666] uppercase">
                  <th className="py-3 px-5">Severity</th>
                  <th className="py-3 px-5">Claim ID</th>
                  <th className="py-3 px-5">{isIt ? "Motivo Escalation" : "Category & Reason"}</th>
                  <th className="py-3 px-5 text-center">{isIt ? "Confidenza" : "Certainty"}</th>
                  <th className="py-3 px-5">{isIt ? "Tempo" : "Age"}</th>
                  <th className="py-3 px-5 text-right">{isIt ? "Azioni" : "Actions"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E3]">
                {reviewClaims.map((claim) => (
                  <tr
                    key={claim.id}
                    onClick={() => router.push(`/console/claims/${claim.id}`)}
                    className="hover:bg-[#F7F7F6] cursor-pointer transition-colors"
                  >
                    {/* Severity */}
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <span
                        className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded ${
                          claim.severity === "HIGH"
                            ? "bg-rose-50 text-rose-800 border border-rose-200"
                            : claim.severity === "MEDIUM"
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : "bg-[#F7F7F6] text-[#666666]"
                        }`}
                      >
                        {claim.severity}
                      </span>
                    </td>

                    {/* Claim ID */}
                    <td className="py-3.5 px-5 font-mono font-bold text-[#0E0F10] whitespace-nowrap">
                      {claim.id}
                    </td>

                    {/* Reason */}
                    <td className="py-3.5 px-5">
                      <div className="font-semibold text-[#0E0F10] flex items-center gap-1.5">
                        <AlertTriangleIcon size={13} className="text-amber-600 flex-shrink-0" />
                        <span>{claim.aiAnalysis.reviewCategory?.replace(/_/g, " ") || "Under Evaluation"}</span>
                      </div>
                      <div className="text-[11px] text-[#666666] mt-0.5 max-w-md line-clamp-1">
                        {claim.aiAnalysis.reviewReason || claim.incident.summary}
                      </div>
                    </td>

                    {/* Confidence */}
                    <td className="py-3.5 px-5 text-center whitespace-nowrap">
                      <span
                        className={`font-mono text-xs px-2 py-0.5 rounded font-bold ${getConfidenceBadgeClass(
                          claim.aiAnalysis.overallConfidence
                        )}`}
                      >
                        {claim.aiAnalysis.overallConfidence}%
                      </span>
                    </td>

                    {/* Age */}
                    <td className="py-3.5 px-5 font-mono text-[#666666] text-xs whitespace-nowrap">
                      {formatRelativeTime(claim.createdAt)}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {claim.assignee?.id !== currentReviewer.id && (
                          <button
                            type="button"
                            onClick={(e) => handleAssignToMe(claim.id, e)}
                            className="px-2.5 py-1 text-xs font-semibold rounded border border-[#E5E5E3] bg-white hover:bg-[#F7F7F6] text-[#0E0F10] transition-colors"
                          >
                            {isIt ? "Assegna a me" : "Assign"}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={(e) => handleMarkReviewed(claim.id, e)}
                          className="px-2.5 py-1 text-xs font-semibold rounded border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors"
                        >
                          {isIt ? "Valida" : "Review"}
                        </button>
                        <Link
                          href={`/console/claims/${claim.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="px-2.5 py-1 text-xs font-semibold rounded bg-[#0E0F10] hover:bg-[#1A1B1C] text-white transition-colors inline-flex items-center gap-1"
                        >
                          <span>{isIt ? "Apri" : "Open"}</span>
                          <ChevronRightIcon size={11} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
