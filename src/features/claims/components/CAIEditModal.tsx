"use client";

import React, { useState, useEffect } from "react";
import { CAIField } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { getProvenanceBadge } from "@/lib/utils";

interface CAIEditModalProps {
  field: CAIField | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (fieldId: string, newValue: string) => Promise<void>;
}

export function CAIEditModal({ field, isOpen, onClose, onSave }: CAIEditModalProps) {
  const [val, setVal] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (field) {
      setVal(field.value);
    }
  }, [field]);

  if (!field) return null;

  const prov = getProvenanceBadge(field.provenance);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!val.trim()) return;
    setIsSubmitting(true);
    try {
      await onSave(field.id, val.trim());
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit CAI Field [Box ${field.code}]`}
      subtitle={field.label}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Original Provenance:</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded border font-medium ${prov.className}`}>
              {prov.label}
            </span>
          </div>
          {field.originalExtractedValue && (
            <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-200 mb-2">
              <span className="font-semibold text-slate-700">Originally Extracted: </span>
              {field.originalExtractedValue}
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">
            Standardized CAI Value
          </label>
          <textarea
            rows={3}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full p-2.5 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter confirmed field value..."
            required
          />
          <p className="mt-1 text-[11px] text-slate-500">
            Saving this modification will transition field provenance to <strong>MANUAL</strong> and mark it as confirmed.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save & Confirm"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
