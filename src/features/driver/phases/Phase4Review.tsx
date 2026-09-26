"use client";

import React, { useState } from "react";
import { DriverDraft } from "@/types/driver";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRightIcon, CheckCircleIcon, AlertTriangleIcon, InfoIcon } from "@/components/icons/Icons";

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

  const ai = draft.aiAnalysisOutput;
  const isBackup = Boolean(ai?.isBackup);
  const modelName = ai?.model || "gemini-3.8-flash";

  // Meaningful field correction state
  const defaultAiDamage =
    ai?.caiFields?.apparentDamageA ||
    ai?.visibleDamage?.find((d) => d.vehicle === "A")?.description ||
    "Front-right corner and wing deformation";

  const existingCorrection = draft.humanCorrections?.find(
    (c) => c.fieldKey === "vehicle_a_damage"
  );

  const [damageFieldValue, setDamageFieldValue] = useState<string>(
    existingCorrection?.correctedValue || defaultAiDamage
  );
  const [isEditingDamage, setIsEditingDamage] = useState(false);
  const [isDamageConfirmed, setIsDamageConfirmed] = useState(
    Boolean(existingCorrection || draft.caiConfirmedFields?.["10A"])
  );
  const [hasConfirmedDeclaration, setHasConfirmedDeclaration] = useState(false);
  const [statement, setStatement] = useState(draft.statement || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle saving the meaningful field confirmation or correction
  const handleSaveFieldCorrection = () => {
    const isCorrected = damageFieldValue.trim() !== defaultAiDamage.trim();
    const newCorrection = {
      fieldKey: "vehicle_a_damage",
      fieldLabel: isIt ? "Danno e Punto di Impatto Veicolo A" : "Vehicle A Damage & Impact Point",
      originalValue: defaultAiDamage,
      correctedValue: damageFieldValue.trim(),
      reviewType: (isCorrected ? "driver_correction" : "driver_confirmation") as any,
      actor: "John Miller (Driver)",
      reviewedAt: new Date().toISOString(),
    };

    const updatedCorrections = [
      ...(draft.humanCorrections || []).filter((c) => c.fieldKey !== "vehicle_a_damage"),
      newCorrection,
    ];

    onUpdate({
      humanCorrections: updatedCorrections,
      caiConfirmedFields: {
        ...draft.caiConfirmedFields,
        "10A": true,
      },
      caiManualOverrides: {
        ...draft.caiManualOverrides,
        "10A": damageFieldValue.trim(),
      },
    });

    setIsDamageConfirmed(true);
    setIsEditingDamage(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasConfirmedDeclaration) return;
    setIsSubmitting(true);
    onUpdate({ statement });
    try {
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md lg:max-w-5xl mx-auto py-2 selection:bg-[#0E0F10] selection:text-white"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* LEFT COLUMN: Title & Incident Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2 pt-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0E0F10] leading-[1.08]">
              {isIt ? "Riepilogo e revisione." : "Review & confirm."}
            </h1>
            <p className="text-base sm:text-lg text-[#666666] font-normal leading-relaxed">
              {isIt
                ? "Ispeziona i rilievi dell'intelligenza artificiale e conferma o correggi i dettagli prima dell'inoltro."
                : "Inspect the multimodal AI analysis, review observed vs inferred facts, and confirm or correct fields before filing."}
            </p>
          </div>

          {/* Incident Details Card */}
          <div className="p-5 rounded-2xl border border-[#E5E5E3] bg-white space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#555555] uppercase tracking-wider">
                {isIt ? "Dati Sinistro" : "Incident Details"}
              </span>
              <button
                type="button"
                onClick={() => onEditSection("accident")}
                className="text-xs text-[#0E0F10] font-medium hover:underline"
              >
                {isIt ? "Modifica" : "Edit"}
              </button>
            </div>

            <div className="space-y-2.5 text-sm text-[#0E0F10]">
              <div>
                <span className="text-[#666666] text-xs block">{isIt ? "Luogo e data:" : "Location & date:"}</span>
                <span className="font-semibold block">{draft.location.street || "Milan metropolitan area, Italy"}</span>
                <span className="text-[#666666] block font-mono text-xs">
                  {draft.incidentDate || "2026-09-26"} · {draft.incidentTime || "14:22"}
                </span>
              </div>

              <div className="pt-2.5 border-t border-[#E5E5E3]">
                <span className="text-[#666666] text-xs block">{isIt ? "Veicolo Assicurato:" : "Your Vehicle:"}</span>
                <span className="font-semibold">Volkswagen Golf VII</span>
                <span className="font-mono text-xs text-[#666666] block">AB 123 CD • Generali Italia</span>
              </div>

              <div className="pt-2.5 border-t border-[#E5E5E3]">
                <span className="text-[#666666] text-xs block">{isIt ? "Controparte:" : "Counterparty:"}</span>
                <span className="font-semibold">{draft.counterparty.driverName || "Claire Anderson"}</span>
                <span className="font-mono text-xs text-[#666666] block">
                  {draft.counterparty.plate || "EF 456 GH"} • {draft.counterparty.makeModel || "Volkswagen Golf VII"}
                </span>
              </div>
            </div>
          </div>

          {/* Epistemic Safety Notice */}
          <div className="p-4 rounded-xl bg-neutral-100 border border-[#E5E5E3] text-xs space-y-1.5 text-[#555555]">
            <div className="font-semibold text-[#0E0F10] flex items-center gap-1.5">
              <InfoIcon size={14} className="text-[#0E0F10]" />
              <span>{isIt ? "Garanzia di Separazione Epistemica" : "Epistemic Safety Standard"}</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              {isIt
                ? "L'intelligenza artificiale separa rigidamente i fatti osservati direttamente dalle deduzioni dinamiche. Le dichiarazioni delle parti sono trattate come dichiarazioni riportate e non come fatti oggettivi. IMPACTA non determina responsabilità legali."
                : "Direct visual observations are strictly segregated from inferred dynamics. Driver statements are handled as reported claims, not physical fact. No legal liability or fault is assigned."}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: AI Analysis Inspector, Human Correction & Submission */}
        <div className="lg:col-span-7 space-y-6">
          {/* AI ANALYSIS RESULTS INSPECTOR */}
          <div className="p-5 rounded-2xl border border-[#E5E5E3] bg-white space-y-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E5E5E3] pb-3">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#555555] block">
                  {isIt ? "Analisi Multimodale Forense" : "Multimodal Forensic Analysis"}
                </span>
                <span className="text-sm font-semibold text-[#0E0F10]">
                  {isBackup ? "Backup Analysis" : "Live Gemini Multimodal"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${
                    isBackup
                      ? "bg-amber-50 text-amber-800 border-amber-300"
                      : "bg-emerald-50 text-emerald-800 border-emerald-300"
                  }`}
                >
                  {isBackup ? "DEMO FALLBACK" : modelName}
                </span>
              </div>
            </div>

            {/* 1. OBSERVED FACTS */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#0E0F10]">
                <span>1. {isIt ? "FATTI OSSERVATI (AI Observation)" : "OBSERVED FACTS (AI Observation)"}</span>
                <span className="text-[10px] font-mono text-[#666666] bg-neutral-100 px-1.5 py-0.5 rounded">
                  EVIDENZA DIRETTA
                </span>
              </div>
              <div className="space-y-2 text-xs">
                {(ai?.observedFacts || [
                  {
                    statement: "Due veicoli a contatto all'intersezione stradale.",
                    source: "image" as const,
                    evidenceRefs: ["01-overview.png"],
                  },
                  {
                    statement: "Veicolo A presenta deformazione al parafango anteriore destro.",
                    source: "image" as const,
                    evidenceRefs: ["02-vehicle-a-damage.png"],
                  },
                ]).map((fact, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#F7F7F6] border border-[#E5E5E3] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#666666] uppercase">
                        Origine: {fact.source}
                      </span>
                      {fact.evidenceRefs?.length > 0 && (
                        <div className="flex gap-1">
                          {fact.evidenceRefs.map((ref, rIdx) => (
                            <span key={rIdx} className="text-[9px] font-mono px-1 bg-white border border-[#E5E5E3] rounded text-[#0E0F10]">
                              {ref}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-[#0E0F10]">{fact.statement}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. INFERRED DYNAMICS */}
            <div className="space-y-2 pt-2 border-t border-[#E5E5E3]">
              <div className="flex items-center justify-between text-xs font-bold text-[#0E0F10]">
                <span>2. {isIt ? "DINAMICA DEDOTTA (AI Inference)" : "INFERRED DYNAMICS (AI Inference)"}</span>
                <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                  DEDUZIONE DINAMICA
                </span>
              </div>
              <div className="space-y-2 text-xs">
                {(ai?.inferredDynamics || [
                  {
                    statement: "Dinamica compatibile con traiettorie perpendicolari all'intersezione.",
                    rationale: "Disposizione dei detriti e altezze di contatto concordanti.",
                    confidenceLabel: "medium" as const,
                  },
                ]).map((inf, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-amber-50/40 border border-amber-200/60 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#0E0F10]">{inf.statement}</span>
                      <span className="text-[10px] font-mono font-semibold uppercase px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                        {inf.confidenceLabel} conf.
                      </span>
                    </div>
                    <p className="text-[11px] text-[#666666]">
                      <em>{isIt ? "Motivazione:" : "Rationale:"}</em> {inf.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. MISSING INFORMATION */}
            <div className="space-y-2 pt-2 border-t border-[#E5E5E3]">
              <div className="text-xs font-bold text-[#0E0F10]">
                3. {isIt ? "INFORMAZIONI MANCANTI (Missing Information)" : "MISSING INFORMATION"}
              </div>
              <ul className="list-disc list-inside text-xs text-[#666666] space-y-1 bg-[#F7F7F6] p-3 rounded-xl border border-[#E5E5E3]">
                {(ai?.missingInformation || [
                  "Stato delle lanterne semaforiche al momento dell'ingresso",
                  "Dichiarazioni di testimoni terzi indipendenti",
                ]).map((m, idx) => (
                  <li key={idx} className="text-[11px]">{m}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* MEANINGFUL HUMAN REVIEW & CORRECTION BOX */}
          <div className="p-5 rounded-2xl border-2 border-[#0E0F10] bg-white space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0E0F10] block">
                  {isIt ? "Revisione Umana del Conducente" : "Driver Human Review & Verification"}
                </span>
                <span className="text-xs text-[#666666]">
                  {isIt
                    ? "Campo chiave: Punto di impatto / Descrizione danno Veicolo A"
                    : "Key field: Point of Impact / Vehicle A Damage Description"}
                </span>
              </div>

              {/* Provenance review badge */}
              <div>
                {isDamageConfirmed ? (
                  damageFieldValue.trim() !== defaultAiDamage.trim() ? (
                    <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-full bg-blue-100 text-blue-900 border border-blue-300">
                      DRIVER-CORRECTED
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                      DRIVER-CONFIRMED
                    </span>
                  )
                ) : (
                  <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    PENDING REVIEW
                  </span>
                )}
              </div>
            </div>

            {/* AI Extracted Original Value */}
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-1">
              <span className="text-[10px] font-mono text-[#666666] uppercase block">
                {isIt ? "Valore estratto originariamente dall'IA:" : "Original AI Extracted Value:"}
              </span>
              <p className="font-medium text-[#0E0F10]">{defaultAiDamage}</p>
            </div>

            {/* Editable Correction Field */}
            {isEditingDamage ? (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#0E0F10] block">
                  {isIt ? "Inserisci il valore corretto / precisazione:" : "Input corrected / refined value:"}
                </label>
                <textarea
                  rows={2}
                  value={damageFieldValue}
                  onChange={(e) => setDamageFieldValue(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#0E0F10] bg-white text-xs text-[#0E0F10] focus:outline-none"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleSaveFieldCorrection}
                    className="px-4 py-2 bg-[#0E0F10] text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    {isIt ? "Salva correzione" : "Save correction"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDamageFieldValue(existingCorrection?.correctedValue || defaultAiDamage);
                      setIsEditingDamage(false);
                    }}
                    className="px-3 py-2 text-xs text-[#666666] hover:underline"
                  >
                    {isIt ? "Annulla" : "Cancel"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#E5E5E3] bg-[#F7F7F6]">
                <div>
                  <span className="text-[10px] font-mono text-[#666666] uppercase block">
                    {isIt ? "Valore confermato nel fascicolo:" : "Current Confirmed Value in Dossier:"}
                  </span>
                  <span className="text-xs font-bold text-[#0E0F10]">{damageFieldValue}</span>
                  {damageFieldValue.trim() !== defaultAiDamage.trim() && (
                    <span className="text-[10px] text-blue-700 block font-mono mt-0.5">
                      ✓ Corretto manualmente da John Miller (Conducente)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingDamage(true)}
                    className="px-3 py-1.5 rounded-lg border border-[#0E0F10] text-[#0E0F10] text-xs font-semibold hover:bg-white transition-colors"
                  >
                    {isIt ? "Modifica / Correggi" : "Edit / Correct"}
                  </button>
                  {!isDamageConfirmed && (
                    <button
                      type="button"
                      onClick={handleSaveFieldCorrection}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                    >
                      {isIt ? "Conferma" : "Confirm"}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Statement Textarea */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#555555] block">
              {isIt ? "Dichiarazione del conducente (Reported Statement)" : "Driver Reported Statement"}
            </label>
            <textarea
              rows={3}
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              placeholder={isIt ? "Dichiarazione..." : "Driver statement..."}
              className="w-full p-4 rounded-xl border border-[#E5E5E3] bg-white text-sm text-[#0E0F10] focus:border-[#0E0F10] focus:outline-none"
            />
          </div>

          {/* Truthfulness Declaration Checkbox */}
          <div className="p-4 rounded-xl border border-[#E5E5E3] bg-white space-y-3">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hasConfirmedDeclaration}
                onChange={(e) => setHasConfirmedDeclaration(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#0E0F10] focus:ring-black cursor-pointer"
              />
              <span className="text-xs text-[#666666] leading-relaxed">
                {isIt
                  ? "Dichiaro che le informazioni fornite, le prove fotografiche e le correzioni registrate sono veritiere e accurate."
                  : "I declare that the information provided, evidence photographs, and recorded corrections are truthful and accurate."}
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!hasConfirmedDeclaration || isSubmitting}
              className={`w-full py-4 px-6 rounded-2xl text-base font-semibold flex items-center justify-between transition-colors group shadow-sm ${
                hasConfirmedDeclaration && !isSubmitting
                  ? "bg-[#0E0F10] text-white hover:bg-[#1A1B1C]"
                  : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              }`}
            >
              <span>
                {isSubmitting
                  ? isIt
                    ? "Salvataggio e trasmissione su Supabase..."
                    : "Submitting to Supabase..."
                  : isIt
                  ? "Invia rapporto incidente"
                  : "Submit accident report"}
              </span>
              <ArrowRightIcon size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
