"use client";

import React, { useState } from "react";
import { DriverDraft } from "@/types/driver";
import { useLanguage } from "@/context/LanguageContext";
import { SYNTHETIC_DRIVER_PROFILE } from "@/features/driver/data/driverProfileFixture";
import {
  CheckCircleIcon,
  EditIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
} from "@/components/icons/Icons";

interface Phase4ReviewProps {
  draft: DriverDraft;
  onUpdate: (patch: Partial<DriverDraft>) => void;
  onSubmit: () => Promise<void>;
  onEditSection: (section: "accident" | "capture") => void;
}

export function Phase4Review({
  draft,
  onUpdate,
  onSubmit,
  onEditSection,
}: Phase4ReviewProps) {
  const { t } = useLanguage();
  const [reconstructionMatches, setReconstructionMatches] = useState(
    draft.reconstructionConfirmed ?? true
  );
  const [hasConfirmedDeclaration, setHasConfirmedDeclaration] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const confirmedCircumstanceA = Boolean(draft.caiConfirmedFields["12A"] ?? true);
  const confirmedCircumstanceB = Boolean(draft.caiConfirmedFields["12B"] ?? true);

  const toggleCircumstanceA = () => {
    onUpdate({
      caiConfirmedFields: {
        ...draft.caiConfirmedFields,
        "12A": !confirmedCircumstanceA,
      },
    });
  };

  const toggleCircumstanceB = () => {
    onUpdate({
      caiConfirmedFields: {
        ...draft.caiConfirmedFields,
        "12B": !confirmedCircumstanceB,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasConfirmedDeclaration) return;
    setIsSubmitting(true);
    try {
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 py-2 max-w-2xl selection:bg-blue-100 selection:text-blue-900">
      {/* Phase Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
          {t.wizard.phase4Title}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight">
          Does this report look accurate?
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Review the factual summary and verified accident circumstances before saving your report.
        </p>
      </div>

      {/* 1. Neutral Reconstruction Summary */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon size={20} className="text-blue-600" />
            <span className="text-base font-bold text-slate-950">
              {t.wizard.phase4ReconstructionTitle}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
            Neutral Physical Record
          </span>
        </div>

        <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-100 text-sm text-slate-800 leading-relaxed">
          <p className="font-medium">
            &ldquo;{t.wizard.phase4ReconstructionNeutral}&rdquo;
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <button
            type="button"
            onClick={() => {
              setReconstructionMatches(true);
              onUpdate({ reconstructionConfirmed: true });
            }}
            className={`min-h-[44px] flex-1 py-3 px-4 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-2 ${
              reconstructionMatches
                ? "bg-slate-950 text-white border-slate-950"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <CheckCircleIcon size={16} />
            <span>{t.wizard.phase4ReconstructionMatches}</span>
          </button>
          <button
            type="button"
            onClick={() => onEditSection("accident")}
            className="min-h-[44px] py-3 px-4 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors flex items-center justify-center gap-1.5"
          >
            <EditIcon size={14} />
            <span>{t.wizard.phase4ReconstructionEdit}</span>
          </button>
        </div>
      </div>

      {/* 2. Vehicles & Evidence Summary */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <span className="text-sm font-bold text-slate-950">Parties &amp; Evidence</span>
          <button
            type="button"
            onClick={() => onEditSection("capture")}
            className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
          >
            <EditIcon size={13} />
            <span>Edit Details</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-400 block text-xs uppercase font-mono">Your Vehicle</span>
            <span className="font-bold text-slate-900">
              {SYNTHETIC_DRIVER_PROFILE.vehicle.make} {SYNTHETIC_DRIVER_PROFILE.vehicle.model}
            </span>
            <span className="text-slate-500 font-mono text-xs block">
              {SYNTHETIC_DRIVER_PROFILE.vehicle.plate} • Matteo Bianchi
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-xs uppercase font-mono">Counterparty</span>
            <span className="font-bold text-slate-900">
              {draft.counterparty.driverName || "Counterparty"}
            </span>
            <span className="text-slate-500 font-mono text-xs block">
              {draft.counterparty.plate || "Pending Plate"} • {draft.counterparty.insurer || "Pending Carrier"}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-xs uppercase font-mono">Incident Location</span>
            <span className="font-semibold text-slate-900">
              {draft.location.street || "Piazza San Giovanni"}, {draft.location.city || "Firenze"}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-xs uppercase font-mono">Preserved Evidence</span>
            <span className="font-semibold text-emerald-700">
              {draft.evidenceItems.length} photos / documents
            </span>
          </div>
        </div>
      </div>

      {/* 3. CAI Box 12 European Circumstances */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xs">
        <h2 className="text-sm font-bold text-slate-950 block">
          {t.wizard.phase4CircumstancesTitle}
        </h2>
        <div className="space-y-3">
          <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-blue-50/30 transition-colors">
            <input
              type="checkbox"
              checked={confirmedCircumstanceA}
              onChange={toggleCircumstanceA}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <div className="text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-900 block mb-0.5">Your Vehicle (Golf VIII):</span>
              {t.wizard.phase4Circumstance7}
            </div>
          </label>

          <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-blue-50/30 transition-colors">
            <input
              type="checkbox"
              checked={confirmedCircumstanceB}
              onChange={toggleCircumstanceB}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <div className="text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-900 block mb-0.5">Counterparty Vehicle:</span>
              {t.wizard.phase4Circumstance6}
            </div>
          </label>
        </div>
      </div>

      {/* 4. Solemn Truthfulness Declaration */}
      <div className="p-6 rounded-3xl bg-slate-100/90 border border-slate-200 space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={hasConfirmedDeclaration}
            onChange={(e) => setHasConfirmedDeclaration(e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            <span className="font-bold text-slate-950 block mb-1">
              {t.wizard.phase4DeclarationTitle}
            </span>
            <p className="text-slate-600">{t.wizard.phase4DeclarationText}</p>
          </div>
        </label>
      </div>

      {/* 5. Submit Primary Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={!hasConfirmedDeclaration || isSubmitting}
          className={`min-h-[52px] w-full py-4 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-xs active:scale-[0.98] ${
            hasConfirmedDeclaration && !isSubmitting
              ? "bg-slate-950 hover:bg-blue-600 text-white"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          <span>{isSubmitting ? "Generating Dossier..." : t.wizard.phase4SubmitReport}</span>
          <ArrowRightIcon size={18} />
        </button>
      </div>
    </form>
  );
}
