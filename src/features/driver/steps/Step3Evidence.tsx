"use client";

import React from "react";
import { DriverDraft, EvidenceDraftItem } from "@/types/driver";
import { EvidenceUploader } from "../components/EvidenceUploader";

interface Step3EvidenceProps {
  draft: DriverDraft;
  onAddEvidence: (item: EvidenceDraftItem, blob?: Blob) => Promise<void>;
  onRemoveEvidence: (id: string) => Promise<void>;
  onNext: () => void;
}

export function Step3Evidence({
  draft,
  onAddEvidence,
  onRemoveEvidence,
  onNext,
}: Step3EvidenceProps) {
  return (
    <div className="space-y-5 py-2">
      <div className="space-y-1">
        <h2 className="text-base font-bold text-slate-950">
          Capture Accident Evidence
        </h2>
        <p className="text-xs text-slate-500">
          Photographs help establish collision context and vehicle positions.
        </p>
      </div>

      <EvidenceUploader
        items={draft.evidenceItems}
        onAdd={onAddEvidence}
        onRemove={onRemoveEvidence}
      />

      <div className="pt-2">
        <button
          type="button"
          onClick={onNext}
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Continue to Counterparty →
        </button>
      </div>
    </div>
  );
}
