"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClaims } from "@/context/ClaimsContext";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  UserIcon,
  ChevronRightIcon,
  FilterIcon,
} from "@/components/icons/Icons";
import {
  formatDate,
  formatRelativeTime,
  getConfidenceBadgeClass,
  getStatusBadgeClass,
  getStatusLabel,
} from "@/lib/utils";
import { ReviewCategory } from "@/types";

export default function ReviewQueuePage() {
  const router = useRouter();
  const { claims, currentReviewer, assignReviewer, updateStatus, isLoading } = useClaims();

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
    setActionNotice(`Claim ${claimId} assigned to you (${currentReviewer.name})`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleMarkReviewed = async (claimId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await updateStatus(claimId, "REVIEWED");
    setActionNotice(`Claim ${claimId} marked as REVIEWED and moved out of triage`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  if (isLoading) {
    return <div className="py-12 text-center text-xs text-slate-500">Loading review queue...</div>;
  }

  const categoryCounts = {
    ALL: claims.filter((c) => c.status !== "CLOSED" && c.status !== "REVIEWED" && (c.aiAnalysis.reviewCategory || c.aiAnalysis.overallConfidence < 85)).length,
    LOW_CONFIDENCE: claims.filter((c) => c.status !== "CLOSED" && (c.aiAnalysis.reviewCategory === "LOW_CONFIDENCE" || c.aiAnalysis.overallConfidence < 70)).length,
    CONFLICTING_EVIDENCE: claims.filter((c) => c.status !== "CLOSED" && c.aiAnalysis.reviewCategory === "CONFLICTING_EVIDENCE").length,
    MISSING_DATA: claims.filter((c) => c.status !== "CLOSED" && c.aiAnalysis.reviewCategory === "MISSING_DATA").length,
    STATEMENT_MISMATCH: claims.filter((c) => c.status !== "CLOSED" && c.aiAnalysis.reviewCategory === "STATEMENT_MISMATCH").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-950">
              AI Intervention &amp; Review Queue
            </h1>
            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded font-bold">
              {reviewClaims.length} REQUIRING ATTENTION
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Dossiers escalated due to automated confidence thresholds, conflicting driver statements, or missing documentary evidence.
          </p>
        </div>
      </div>

      {/* Action Notice */}
      {actionNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900 flex items-center justify-between animate-in fade-in duration-150">
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircleIcon size={14} className="text-emerald-600" />
            <span>{actionNotice}</span>
          </span>
        </div>
      )}

      {/* Category Tabs */}
      <div className="bg-white border border-slate-200 rounded p-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { id: "ALL", label: "All Escalations", count: categoryCounts.ALL },
            { id: "LOW_CONFIDENCE", label: "Low Confidence", count: categoryCounts.LOW_CONFIDENCE },
            { id: "CONFLICTING_EVIDENCE", label: "Conflicting Evidence", count: categoryCounts.CONFLICTING_EVIDENCE },
            { id: "MISSING_DATA", label: "Missing Data", count: categoryCounts.MISSING_DATA },
            { id: "STATEMENT_MISMATCH", label: "Statement Mismatch", count: categoryCounts.STATEMENT_MISMATCH },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 text-xs rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                categoryFilter === cat.id
                  ? "bg-slate-900 text-white font-medium"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  categoryFilter === cat.id
                    ? "bg-slate-800 text-slate-200"
                    : "bg-slate-200 text-slate-700 font-semibold"
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Escalated Claims Table */}
      <div className="bg-white border border-slate-200 rounded overflow-hidden">
        {reviewClaims.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircleIcon size={24} />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Review Queue Clear</h3>
            <p className="mt-1 text-xs text-slate-500">
              No claims are currently flagged under category &quot;{categoryFilter}&quot;.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                  <th className="py-3 px-4">Severity</th>
                  <th className="py-3 px-4">Claim ID</th>
                  <th className="py-3 px-4">Category &amp; Reason</th>
                  <th className="py-3 px-4 text-center">AI Confidence</th>
                  <th className="py-3 px-4">Age</th>
                  <th className="py-3 px-4">Assignee</th>
                  <th className="py-3 px-4 text-right">Triage Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal">
                {reviewClaims.map((claim) => (
                  <tr
                    key={claim.id}
                    onClick={() => router.push(`/claims/${claim.id}`)}
                    className="hover:bg-amber-50/30 cursor-pointer transition-colors"
                  >
                    {/* Severity */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                          claim.severity === "HIGH"
                            ? "bg-rose-50 text-rose-800 border-rose-200"
                            : claim.severity === "MEDIUM"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {claim.severity}
                      </span>
                    </td>

                    {/* Claim ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-700 whitespace-nowrap">
                      {claim.id}
                    </td>

                    {/* Reason */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                        <AlertTriangleIcon size={13} className="text-amber-600 flex-shrink-0" />
                        <span>{claim.aiAnalysis.reviewCategory?.replace(/_/g, " ") || "Under Evaluation"}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 max-w-md line-clamp-2">
                        {claim.aiAnalysis.reviewReason || claim.incident.summary}
                      </div>
                    </td>

                    {/* Confidence */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span
                        className={`font-mono text-[11px] px-2 py-0.5 rounded border font-semibold ${getConfidenceBadgeClass(
                          claim.aiAnalysis.overallConfidence
                        )}`}
                      >
                        {claim.aiAnalysis.overallConfidence}%
                      </span>
                    </td>

                    {/* Age */}
                    <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                      {formatRelativeTime(claim.createdAt)}
                    </td>

                    {/* Assignee */}
                    <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap">
                      {claim.assignee ? (
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold">
                            {claim.assignee.avatarInitials}
                          </span>
                          <span className="font-medium text-slate-800">{claim.assignee.name}</span>
                        </div>
                      ) : (
                        <span className="text-amber-800 text-[11px] italic font-medium">Unassigned</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {claim.assignee?.id !== currentReviewer.id && (
                          <button
                            type="button"
                            onClick={(e) => handleAssignToMe(claim.id, e)}
                            className="px-2 py-1 text-[11px] font-medium rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
                          >
                            Assign to me
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={(e) => handleMarkReviewed(claim.id, e)}
                          className="px-2 py-1 text-[11px] font-medium rounded border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors"
                        >
                          Mark Reviewed
                        </button>
                        <Link
                          href={`/claims/${claim.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="px-2 py-1 text-[11px] font-semibold rounded bg-slate-900 hover:bg-blue-600 text-white transition-colors flex items-center gap-0.5"
                        >
                          <span>Open</span>
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
