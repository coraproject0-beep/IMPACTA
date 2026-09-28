"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { DriverDraft, EvidenceDraftItem, ReportingStep } from "@/types/driver";
import { SYNTHETIC_DRIVER_PROFILE } from "@/features/driver/data/driverProfileFixture";
import { CANONICAL_DEMO_DRAFT } from "@/features/driver/data/demoIncidentFixture";
import { storeMediaBlob, deleteMediaBlob } from "@/lib/repositories/mediaStorage";
import { useClaims } from "./ClaimsContext";

const DRAFT_STORAGE_KEY = "impacta_driver_draft_v1";

function createInitialBlankDraft(): DriverDraft {
  const now = new Date();
  const dateStr = now.toISOString().substring(0, 10);
  const timeStr = now.toTimeString().substring(0, 5);

  return {
    isDemoIncident: false,
    step: "SAFETY",
    safetyConfirmed: false,
    incidentDate: dateStr,
    incidentTime: timeStr,
    location: {
      city: "Roma",
      street: "",
      postalCode: "",
      latitude: 41.9028,
      longitude: 12.4964,
      junctionType: "STRAIGHT_ROAD",
    },
    vehiclesCount: 2,
    anyInjured: false,
    policePresent: false,
    evidenceItems: [],
    counterparty: {
      driverName: "",
      phone: "",
      plate: "",
      makeModel: "",
      insurer: "",
      policyNumber: "",
      hasInfo: true,
    },
    statement: "",
    additionalNotes: "",
    reconstructionConfirmed: false,
    caiConfirmedFields: {
      "1": true,
      "2": true,
      "3": true,
      "6A": true,
      "7A": true,
      "8A": true,
    },
    caiManualOverrides: {},
  };
}

interface DriverDraftContextType {
  draft: DriverDraft;
  updateDraft: (patch: Partial<DriverDraft>) => void;
  startNewReport: () => void;
  loadDemoIncident: () => void;
  addEvidenceItem: (item: EvidenceDraftItem, blob?: Blob) => Promise<void>;
  removeEvidenceItem: (id: string) => Promise<void>;
  goToStep: (step: ReportingStep) => void;
  submitReport: (overrides?: Partial<DriverDraft>) => Promise<string>;
  resetDraft: () => void;
}

const DriverDraftContext = createContext<DriverDraftContextType | undefined>(undefined);

export function DriverDraftProvider({ children }: { children: React.ReactNode }) {
  const { createClaimFromDriverDraft } = useClaims();
  const [draft, setDraft] = useState<DriverDraft>(createInitialBlankDraft);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(DRAFT_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setDraft(parsed);
        }
      } catch (err) {
        console.warn("Could not load driver draft from storage", err);
      }
      setIsLoaded(true);
    }
  }, []);

  // Autosave to localStorage on changes
  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") return;
    try {
      // Don't store large file instances in localStorage JSON
      const serializableDraft = {
        ...draft,
        evidenceItems: draft.evidenceItems.map((e) => ({
          ...e,
          file: undefined, // File object isn't JSON-serializable
        })),
      };
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(serializableDraft));
    } catch (err) {
      console.error("Failed to autosave driver draft", err);
    }
  }, [draft, isLoaded]);

  const updateDraft = useCallback((patch: Partial<DriverDraft>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  const startNewReport = useCallback(() => {
    const blank = createInitialBlankDraft();
    setDraft(blank);
  }, []);

  const loadDemoIncident = useCallback(() => {
    setDraft(JSON.parse(JSON.stringify(CANONICAL_DEMO_DRAFT)));
  }, []);

  const addEvidenceItem = useCallback(async (item: EvidenceDraftItem, blob?: Blob) => {
    if (blob) {
      await storeMediaBlob(item.id, blob);
    }
    setDraft((prev) => ({
      ...prev,
      evidenceItems: [...prev.evidenceItems.filter((e) => e.id !== item.id), item],
    }));
  }, []);

  const removeEvidenceItem = useCallback(async (id: string) => {
    await deleteMediaBlob(id);
    setDraft((prev) => ({
      ...prev,
      evidenceItems: prev.evidenceItems.filter((e) => e.id !== id),
    }));
  }, []);

  const goToStep = useCallback((step: ReportingStep) => {
    setDraft((prev) => ({ ...prev, step }));
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const submitReport = useCallback(
    async (overrides?: Partial<DriverDraft>): Promise<string> => {
      const finalDraft = overrides ? { ...draft, ...overrides } : draft;
      const createdClaim = await createClaimFromDriverDraft(finalDraft);
      setDraft((prev) => ({
        ...prev,
        ...(overrides || {}),
        step: "SUBMITTED",
        submittedClaimId: createdClaim.id,
        submittedAt: new Date().toISOString(),
      }));
      return createdClaim.id;
    },
    [createClaimFromDriverDraft, draft]
  );

  const resetDraft = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    }
    setDraft(createInitialBlankDraft());
  }, []);

  return (
    <DriverDraftContext.Provider
      value={{
        draft,
        updateDraft,
        startNewReport,
        loadDemoIncident,
        addEvidenceItem,
        removeEvidenceItem,
        goToStep,
        submitReport,
        resetDraft,
      }}
    >
      {children}
    </DriverDraftContext.Provider>
  );
}

export function useDriverDraft() {
  const context = useContext(DriverDraftContext);
  if (!context) {
    throw new Error("useDriverDraft must be used within a DriverDraftProvider");
  }
  return context;
}
