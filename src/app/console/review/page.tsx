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

export default function ConsoleReviewQueuePage() {
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Intervention &amp; Review Queue
            </h1>
            <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider">
              {reviewClaims.length} requiring attention
            </span>
          </div>
          <p className="mt-2 text-base text-slate-600">
            Dossiers escalated due to automated confidence thresholds, conflicting driver statements, or missing documentary evidence.
          </p>
        </div>
      </div>

      {/* Action Notice */}
      {actionNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm text-emerald-900 flex items-center justify-between animate-in fade-in duration-150 shadow-2xs">
          <span className="flex items-center gap-2 font-semibold">
            <CheckCircleIcon size={16} className="text-emerald-600" />
            <span>{actionNotice}</span>
          </span>
        </div>
      )}

      {/* Category Tabs */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2.5 overflow-x-auto">
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
              className={`min-h-[44px] px-4 py-2.5 text-sm rounded-xl transition-colors whitespace-nowrap flex items-center gap-2 ${
                categoryFilter === cat.id
                  ? "bg-slate-950 text-white font-bold shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                  categoryFilter === cat.id
                    ? "bg-slate-800 text-slate-200"
                    : "bg-slate-200 text-slate-700 font-bold"
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Escalated Claims Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        {reviewClaims.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircleIcon size={28} />
            </div>
            <h3 className="text-base font-bold text-slate-950">Review Queue Clear</h3>
            <p className="mt-1 text-sm text-slate-500">
              No claims are currently flagged under category &quot;{categoryFilter}&quot;.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-xs uppercase font-mono font-bold text-slate-500 tracking-wider">
                  <th className="py-3.5 px-6">Severity</th>
                  <th className="py-3.5 px-6">Claim ID</th>
                  <th className="py-3.5 px-6">Category &amp; Reason</th>
                  <th className="py-3.5 px-6 text-center">AI Confidence</th>
                  <th className="py-3.5 px-6">Age</th>
                  <th className="py-3.5 px-6">Assignee</th>
                  <th className="py-3.5 px-6 text-right">Triage Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal">
                {reviewClaims.map((claim) => (
                  <tr
                    key={claim.id}
                    onClick={() => router.push(`/console/claims/${claim.id}`)}
                    className="hover:bg-amber-50/30 cursor-pointer transition-colors"
                  >
                    {/* Severity */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded-lg border ${
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
                    <td className="py-4 px-6 font-mono font-bold text-blue-700 whitespace-nowrap">
                      {claim.id}
                    </td>

                    {/* Reason */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-950 flex items-center gap-1.5">
                        <AlertTriangleIcon size={15} className="text-amber-600 flex-shrink-0" />
                        <span>{claim.aiAnalysis.reviewCategory?.replace(/_/g, " ") || "Under Evaluation"}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 max-w-md line-clamp-2">
                        {claim.aiAnalysis.reviewReason || claim.incident.summary}
                      </div>
                    </td>

                    {/* Confidence */}
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <span
                        className={`font-mono text-xs px-2.5 py-1 rounded-lg border font-bold ${getConfidenceBadgeClass(
                          claim.aiAnalysis.overallConfidence
                        )}`}
                      >
                        {claim.aiAnalysis.overallConfidence}%
                      </span>
                    </td>

                    {/* Age */}
                    <td className="py-4 px-6 font-mono text-slate-500 text-xs whitespace-nowrap">
                      {formatRelativeTime(claim.createdAt)}
                    </td>

                    {/* Assignee */}
                    <td className="py-4 px-6 text-slate-700 whitespace-nowrap">
                      {claim.assignee ? (
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold">
                            {claim.assignee.avatarInitials}
                          </span>
                          <span className="font-medium text-slate-900">{claim.assignee.name}</span>
                        </div>
                      ) : (
                        <span className="text-amber-800 text-xs italic font-medium">Unassigned</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {claim.assignee?.id !== currentReviewer.id && (
                          <button
                            type="button"
                            onClick={(e) => handleAssignToMe(claim.id, e)}
                            className="min-h-[36px] px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
                          >
                            Assign to me
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={(e) => handleMarkReviewed(claim.id, e)}
                          className="min-h-[36px] px-3 py-1.5 text-xs font-bold rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors"
                        >
                          Mark Reviewed
                        </button>
                        <Link
                          href={`/console/claims/${claim.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="min-h-[36px] px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-950 hover:bg-blue-600 text-white transition-colors flex items-center gap-1"
                        >
                          <span>Open</span>
                          <ChevronRightIcon size={12} />
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
