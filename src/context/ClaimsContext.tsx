"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { Claim, ClaimStatus, Reviewer } from "@/types";
import { DriverDraft } from "@/types/driver";
import { claimsRepository } from "@/lib/repositories/claimsRepository";

interface ComputedStats {
  totalClaims: number;
  openClaims: number;
  awaitingReview: number;
  caiReady: number;
  reviewed: number;
  closed: number;
  telemetryCoveragePercent: number;
  meanConfidence: number;
  manualReviewRequiredCount: number;
  manualReviewRequiredPercent: number;
  totalCaiFields: number;
  confirmedCaiFields: number;
  caiFieldCompletionPercent: number;
  funnel: {
    received: number;
    evidenceParsed: number;
    aiAnalysed: number;
    humanReviewed: number;
    caiReady: number;
  };
  volumeByDate: { date: string; label: string; count: number }[];
  reviewCategories: { category: string; label: string; count: number }[];
}

interface ClaimsContextType {
  claims: Claim[];
  reviewers: Reviewer[];
  currentReviewer: Reviewer;
  isLoading: boolean;
  stats: ComputedStats;
  getClaim: (id: string) => Claim | undefined;
  updateStatus: (id: string, status: ClaimStatus) => Promise<void>;
  assignReviewer: (id: string, reviewerId: string | null) => Promise<void>;
  updateNotes: (id: string, notes: string) => Promise<void>;
  confirmCAIField: (id: string, fieldId: string, confirmed: boolean) => Promise<void>;
  updateCAIField: (id: string, fieldId: string, value: string) => Promise<void>;
  generateCAIDraft: (id: string) => Promise<void>;
  confirmInference: (id: string, inferenceId: string, confirmed: boolean) => Promise<void>;
  createClaimFromDriverDraft: (draft: DriverDraft) => Promise<Claim>;
  resetDemoData: () => Promise<void>;
  refreshClaims: () => Promise<void>;
}

const ClaimsContext = createContext<ClaimsContextType | undefined>(undefined);

export function ClaimsProvider({ children }: { children: React.ReactNode }) {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Active reviewer identity (synthetic logged-in reviewer)
  const currentReviewer: Reviewer = useMemo(() => {
    return (
      reviewers.find((r) => r.id === "REV-CURRENT") || {
        id: "REV-CURRENT",
        name: "Lodovico V.",
        email: "l.v@impacta-claims.internal",
        role: "Lead Claims Adjuster (Token Titans)",
        avatarInitials: "LV",
      }
    );
  }, [reviewers]);

  const loadData = useCallback(async () => {
    try {
      const [fetchedClaims, fetchedReviewers] = await Promise.all([
        claimsRepository.getAll(),
        claimsRepository.getReviewers(),
      ]);
      setClaims(fetchedClaims);
      setReviewers(fetchedReviewers);
    } catch (err) {
      console.error("Failed to load claims repository data", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();

    // Listen to localStorage changes across browser tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "impacta_claims_v1") {
        loadData();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [loadData]);

  const getClaim = useCallback(
    (id: string) => {
      return claims.find((c) => c.id.toLowerCase() === id.toLowerCase());
    },
    [claims]
  );

  const updateStatus = useCallback(
    async (id: string, status: ClaimStatus) => {
      const updated = await claimsRepository.updateStatus(id, status, currentReviewer.name);
      setClaims((prev) => prev.map((c) => (c.id.toLowerCase() === id.toLowerCase() ? updated : c)));
    },
    [currentReviewer.name]
  );

  const assignReviewer = useCallback(
    async (id: string, reviewerId: string | null) => {
      const updated = await claimsRepository.assignReviewer(id, reviewerId, currentReviewer.name);
      setClaims((prev) => prev.map((c) => (c.id.toLowerCase() === id.toLowerCase() ? updated : c)));
    },
    [currentReviewer.name]
  );

  const updateNotes = useCallback(async (id: string, notes: string) => {
    const updated = await claimsRepository.updateNotes(id, notes);
    setClaims((prev) => prev.map((c) => (c.id.toLowerCase() === id.toLowerCase() ? updated : c)));
  }, []);

  const confirmCAIField = useCallback(
    async (id: string, fieldId: string, confirmed: boolean) => {
      const updated = await claimsRepository.confirmCAIField(id, fieldId, confirmed, currentReviewer.name);
      setClaims((prev) => prev.map((c) => (c.id.toLowerCase() === id.toLowerCase() ? updated : c)));
    },
    [currentReviewer.name]
  );

  const updateCAIField = useCallback(
    async (id: string, fieldId: string, value: string) => {
      const updated = await claimsRepository.updateCAIField(id, fieldId, value, currentReviewer.name);
      setClaims((prev) => prev.map((c) => (c.id.toLowerCase() === id.toLowerCase() ? updated : c)));
    },
    [currentReviewer.name]
  );

  const generateCAIDraft = useCallback(
    async (id: string) => {
      const updated = await claimsRepository.generateCAIDraft(id, currentReviewer.name);
      setClaims((prev) => prev.map((c) => (c.id.toLowerCase() === id.toLowerCase() ? updated : c)));
    },
    [currentReviewer.name]
  );

  const confirmInference = useCallback(
    async (id: string, inferenceId: string, confirmed: boolean) => {
      const updated = await claimsRepository.confirmInference(id, inferenceId, confirmed, currentReviewer.name);
      setClaims((prev) => prev.map((c) => (c.id.toLowerCase() === id.toLowerCase() ? updated : c)));
    },
    [currentReviewer.name]
  );

  const createClaimFromDriverDraft = useCallback(
    async (draft: DriverDraft): Promise<Claim> => {
      const newClaim = await claimsRepository.createFromDriverDraft(draft);
      setClaims((prev) => [newClaim, ...prev.filter((c) => c.id !== newClaim.id)]);
      return newClaim;
    },
    []
  );

  const resetDemoData = useCallback(async () => {
    setIsLoading(true);
    await claimsRepository.resetToDefaults();
    await loadData();
    setIsLoading(false);
  }, [loadData]);

  // Compute all KPI stats directly from the claims dataset
  const stats: ComputedStats = useMemo(() => {
    const totalClaims = claims.length;
    if (totalClaims === 0) {
      return {
        totalClaims: 0,
        openClaims: 0,
        awaitingReview: 0,
        caiReady: 0,
        reviewed: 0,
        closed: 0,
        telemetryCoveragePercent: 0,
        meanConfidence: 0,
        manualReviewRequiredCount: 0,
        manualReviewRequiredPercent: 0,
        totalCaiFields: 0,
        confirmedCaiFields: 0,
        caiFieldCompletionPercent: 0,
        funnel: { received: 0, evidenceParsed: 0, aiAnalysed: 0, humanReviewed: 0, caiReady: 0 },
        volumeByDate: [],
        reviewCategories: [],
      };
    }

    const openClaims = claims.filter((c) => c.status !== "CLOSED").length;
    const awaitingReview = claims.filter((c) => c.status === "IN_REVIEW" || c.status === "NEW").length;
    const caiReady = claims.filter((c) => c.status === "CAI_READY").length;
    const reviewed = claims.filter((c) => c.status === "REVIEWED").length;
    const closed = claims.filter((c) => c.status === "CLOSED").length;

    const withTelemetry = claims.filter((c) => c.telemetry?.hasTelemetry).length;
    const telemetryCoveragePercent = Math.round((withTelemetry / totalClaims) * 100);

    const confidenceSum = claims.reduce((acc, c) => acc + (c.aiAnalysis?.overallConfidence || 70), 0);
    const meanConfidence = Math.round(confidenceSum / totalClaims);

    const requiringReviewClaims = claims.filter(
      (c) => c.aiAnalysis?.reviewCategory !== undefined || (c.aiAnalysis?.overallConfidence || 70) < 85
    );
    const manualReviewRequiredCount = requiringReviewClaims.length;
    const manualReviewRequiredPercent = Math.round((manualReviewRequiredCount / totalClaims) * 100);

    let totalCai = 0;
    let confirmedCai = 0;
    claims.forEach((c) => {
      if (c.caiFields) {
        totalCai += c.caiFields.length;
        confirmedCai += c.caiFields.filter((f) => f.isConfirmed).length;
      }
    });
    const caiFieldCompletionPercent = totalCai > 0 ? Math.round((confirmedCai / totalCai) * 100) : 0;

    // AI Funnel counts
    const funnel = {
      received: totalClaims,
      evidenceParsed: claims.filter((c) => (c.evidence && c.evidence.length > 0) || c.telemetry?.hasTelemetry).length,
      aiAnalysed: claims.filter((c) => c.aiAnalysis && c.aiAnalysis.overallConfidence > 0).length,
      humanReviewed: claims.filter((c) => c.status === "REVIEWED" || c.status === "CLOSED").length,
      caiReady: claims.filter((c) => c.status === "CAI_READY" || c.caiDraftGenerated).length,
    };

    // Claims Volume grouped by Date (sorted chronologically)
    const dateMap: Record<string, { label: string; count: number }> = {};
    for (let d = 2; d <= 19; d++) {
      const dayStr = d < 10 ? `0${d}` : `${d}`;
      const key = `2026-09-${dayStr}`;
      dateMap[key] = { label: `${d} Sep`, count: 0 };
    }
    claims.forEach((c) => {
      const dateKey = (c.incidentDate || "").substring(0, 10);
      if (dateMap[dateKey]) {
        dateMap[dateKey].count += 1;
      } else if (dateKey) {
        const dNum = new Date(c.incidentDate).getDate();
        dateMap[dateKey] = { label: `${dNum} Sep`, count: 1 };
      }
    });

    const volumeByDate = Object.entries(dateMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, val]) => ({ date, label: val.label, count: val.count }));

    // Review categories breakdown
    const catMap: Record<string, number> = {
      LOW_CONFIDENCE: 0,
      CONFLICTING_EVIDENCE: 0,
      MISSING_DATA: 0,
      STATEMENT_MISMATCH: 0,
    };
    claims.forEach((c) => {
      if (c.aiAnalysis?.reviewCategory) {
        catMap[c.aiAnalysis.reviewCategory] = (catMap[c.aiAnalysis.reviewCategory] || 0) + 1;
      }
    });

    const reviewCategories = [
      { category: "LOW_CONFIDENCE", label: "Low Confidence", count: catMap.LOW_CONFIDENCE },
      { category: "CONFLICTING_EVIDENCE", label: "Conflicting Evidence", count: catMap.CONFLICTING_EVIDENCE },
      { category: "MISSING_DATA", label: "Missing Data", count: catMap.MISSING_DATA },
      { category: "STATEMENT_MISMATCH", label: "Statement Mismatch", count: catMap.STATEMENT_MISMATCH },
    ];

    return {
      totalClaims,
      openClaims,
      awaitingReview,
      caiReady,
      reviewed,
      closed,
      telemetryCoveragePercent,
      meanConfidence,
      manualReviewRequiredCount,
      manualReviewRequiredPercent,
      totalCaiFields: totalCai,
      confirmedCaiFields: confirmedCai,
      caiFieldCompletionPercent,
      funnel,
      volumeByDate,
      reviewCategories,
    };
  }, [claims]);

  return (
    <ClaimsContext.Provider
      value={{
        claims,
        reviewers,
        currentReviewer,
        isLoading,
        stats,
        getClaim,
        updateStatus,
        assignReviewer,
        updateNotes,
        confirmCAIField,
        updateCAIField,
        generateCAIDraft,
        confirmInference,
        createClaimFromDriverDraft,
        resetDemoData,
        refreshClaims: loadData,
      }}
    >
      {children}
    </ClaimsContext.Provider>
  );
}

export function useClaims() {
  const context = useContext(ClaimsContext);
  if (!context) {
    throw new Error("useClaims must be used within a ClaimsProvider");
  }
  return context;
}
