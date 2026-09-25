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
  const { t, language } = useLanguage();
  const isIt = language === "it";
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
    <form onSubmit={handleSubmit} className="space-y-10 py-2 max-w-xl mx-auto selection:bg-[#090A0A] selection:text-white">
      {/* Phase Header */}
      <div className="space-y-3 pb-6 border-b border-[#D7D9D8]">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#6F7375]">
          {t.wizard.phase4Title}
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#090A0A] leading-[1.05]">
          {isIt ? "Riepilogo e Dichiarazione" : "Review & Declaration"}
        </h1>
        <p className="text-base sm:text-lg text-[#6F7375] font-normal leading-relaxed pt-1">
          {isIt
            ? "Verifica la sintesi dei fatti e le circostanze accertate prima di confermare e salvare il fascicolo."
            : "Review the factual summary and verified accident circumstances before saving your report."}
        </p>
      </div>

      {/* 1. Neutral Reconstruction Summary */}
      <div className="space-y-4 pb-8 border-b border-[#D7D9D8]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon size={18} className="text-[#090A0A]" />
            <span className="text-sm font-bold uppercase tracking-wider text-[#090A0A]">
              {t.wizard.phase4ReconstructionTitle}
            </span>
          </div>
          <span className="text-xs text-[#6F7375] uppercase tracking-wider">
            {isIt ? "Rilievo Fisico" : "Physical Record"}
          </span>
        </div>

        <div className="p-4 bg-[#F4F5F3] border border-[#D7D9D8] text-sm text-[#090A0A] leading-relaxed">
          <p className="font-normal italic">
            &ldquo;{t.wizard.phase4ReconstructionNeutral}&rdquo;
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <button
            type="button"
            onClick={() => {
              setReconstructionMatches(true);
              onUpdate({ reconstructionConfirmed: true });
            }}
            className={`min-h-[46px] flex-1 py-2 px-4 text-xs font-semibold uppercase tracking-wider border transition-colors flex items-center justify-center gap-2 ${
              reconstructionMatches
                ? "bg-[#090A0A] text-white border-[#090A0A]"
                : "bg-white text-[#6F7375] border-[#D7D9D8] hover:border-[#090A0A] hover:text-[#090A0A]"
            }`}
          >
            <CheckCircleIcon size={15} />
            <span>{t.wizard.phase4ReconstructionMatches}</span>
          </button>
          <button
            type="button"
            onClick={() => onEditSection("accident")}
            className="min-h-[46px] py-2 px-4 text-xs font-semibold uppercase tracking-wider bg-white border border-[#D7D9D8] hover:border-[#090A0A] text-[#090A0A] transition-colors flex items-center justify-center gap-2"
          >
            <EditIcon size={15} />
            <span>{t.wizard.phase4ReconstructionEdit}</span>
          </button>
        </div>
      </div>

      {/* 2. Vehicles & Evidence Summary */}
      <div className="space-y-4 pb-8 border-b border-[#D7D9D8]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold uppercase tracking-wider text-[#090A0A]">
            {isIt ? "Veicoli e Prove" : "Parties & Evidence"}
          </span>
          <button
            type="button"
            onClick={() => onEditSection("capture")}
            className="text-xs font-semibold text-[#090A0A] hover:underline uppercase tracking-wider flex items-center gap-1"
          >
            <EditIcon size={14} />
            <span>{isIt ? "Modifica" : "Edit Details"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-[#6F7375] uppercase tracking-wider block">
              {isIt ? "Il tuo veicolo" : "Your Vehicle"}
            </span>
            <span className="font-bold text-[#090A0A] text-sm block">
              {SYNTHETIC_DRIVER_PROFILE.vehicle.make} {SYNTHETIC_DRIVER_PROFILE.vehicle.model}
            </span>
            <span className="font-mono text-[#6F7375] block">
              {SYNTHETIC_DRIVER_PROFILE.vehicle.plate} • {SYNTHETIC_DRIVER_PROFILE.fullName}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[#6F7375] uppercase tracking-wider block">
              {isIt ? "Controparte" : "Counterparty"}
            </span>
            <span className="font-bold text-[#090A0A] text-sm block">
              {draft.counterparty.driverName || (isIt ? "Controparte" : "Counterparty")}
            </span>
            <span className="font-mono text-[#6F7375] block">
              {draft.counterparty.plate || (isIt ? "Targa assente" : "Pending Plate")} • {draft.counterparty.insurer || (isIt ? "Compagnia assente" : "Pending Carrier")}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[#6F7375] uppercase tracking-wider block">
              {isIt ? "Luogo sinistro" : "Incident Location"}
            </span>
            <span className="font-medium text-[#090A0A] block">
              {draft.location.street || "Piazza San Giovanni"}, {draft.location.city || "Firenze"}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[#6F7375] uppercase tracking-wider block">
              {isIt ? "Prove fotografiche" : "Preserved Evidence"}
            </span>
            <span className="font-medium text-emerald-700 block">
              {draft.evidenceItems.length} {isIt ? "foto archiviate" : "photos / documents"}
            </span>
          </div>
        </div>
      </div>

      {/* 3. CAI Box 12 European Circumstances */}
      <div className="space-y-3 pb-8 border-b border-[#D7D9D8]">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#090A0A] block">
          {t.wizard.phase4CircumstancesTitle}
        </h2>
        <div className="space-y-2">
          <label className="flex items-start gap-3 p-3.5 border border-[#D7D9D8] hover:border-[#090A0A] bg-white cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={confirmedCircumstanceA}
              onChange={toggleCircumstanceA}
              className="mt-0.5 h-4 w-4 accent-[#090A0A]"
            />
            <div className="text-xs text-[#090A0A] leading-relaxed">
              <span className="font-bold block uppercase tracking-wider mb-0.5">
                {isIt ? "Veicolo A (Golf VIII):" : "Your Vehicle (Golf VIII):"}
              </span>
              {t.wizard.phase4Circumstance7}
            </div>
          </label>

          <label className="flex items-start gap-3 p-3.5 border border-[#D7D9D8] hover:border-[#090A0A] bg-white cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={confirmedCircumstanceB}
              onChange={toggleCircumstanceB}
              className="mt-0.5 h-4 w-4 accent-[#090A0A]"
            />
            <div className="text-xs text-[#090A0A] leading-relaxed">
              <span className="font-bold block uppercase tracking-wider mb-0.5">
                {isIt ? "Veicolo B (Controparte):" : "Counterparty Vehicle:"}
              </span>
              {t.wizard.phase4Circumstance6}
            </div>
          </label>
        </div>
      </div>

      {/* 4. Solemn Truthfulness Declaration */}
      <div className="p-4 bg-[#F4F5F3] border border-[#D7D9D8] space-y-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={hasConfirmedDeclaration}
            onChange={(e) => setHasConfirmedDeclaration(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#090A0A]"
          />
          <div className="text-xs text-[#090A0A] leading-relaxed">
            <span className="font-bold uppercase tracking-wider block mb-1">
              {t.wizard.phase4DeclarationTitle}
            </span>
            <p className="text-[#6F7375] font-normal">{t.wizard.phase4DeclarationText}</p>
          </div>
        </label>
      </div>

      {/* 5. Submit Primary Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={!hasConfirmedDeclaration || isSubmitting}
          className={`min-h-[56px] w-full py-4 px-6 font-bold text-sm uppercase tracking-wider flex items-center justify-between transition-colors ${
            hasConfirmedDeclaration && !isSubmitting
              ? "bg-[#090A0A] hover:bg-[#171819] text-white"
              : "bg-[#D7D9D8] text-[#6F7375] cursor-not-allowed"
          }`}
        >
          <span>{isSubmitting ? (isIt ? "Generazione Dossier..." : "Generating Dossier...") : t.wizard.phase4SubmitReport}</span>
          <ArrowRightIcon size={18} />
        </button>
      </div>
    </form>
  );
}
