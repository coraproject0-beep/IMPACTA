"use client";

import React, { useState } from "react";
import { DriverDraft } from "@/types/driver";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRightIcon, CheckCircleIcon, AlertTriangleIcon, InfoIcon } from "@/components/icons/Icons";

interface Phase4ReviewProps {
  draft: DriverDraft;
  onUpdate: (patch: Partial<DriverDraft>) => void;
  onSubmit: (overrides?: Partial<DriverDraft>) => Promise<void>;
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
    (isIt ? "Nessun danno evidente rilevato" : "No evident damage detected");

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

    const isCorrected = damageFieldValue.trim() !== defaultAiDamage.trim();
    const newCorrection = {
      fieldKey: "vehicle_a_damage",
      fieldLabel: isIt ? "Danno e Punto di Impatto Veicolo A" : "Vehicle A Damage & Impact Point",
      originalValue: defaultAiDamage,
      correctedValue: damageFieldValue.trim(),
      reviewType: (isCorrected ? "driver_correction" : "driver_confirmation") as
        | "driver_correction"
        | "driver_confirmation",
      actor: "John Miller (Driver)",
      reviewedAt: new Date().toISOString(),
    };

    const updatedCorrections = [
      ...(draft.humanCorrections || []).filter((c) => c.fieldKey !== "vehicle_a_damage"),
      newCorrection,
    ];

    const overrides: Partial<DriverDraft> = {
      statement: draft.statement || statement,
      additionalNotes: statement,
      humanCorrections: updatedCorrections,
      caiConfirmedFields: {
        ...draft.caiConfirmedFields,
        "10A": true,
      },
      caiManualOverrides: {
        ...draft.caiManualOverrides,
        "10A": damageFieldValue.trim(),
      },
    };

    onUpdate(overrides);
    try {
      await onSubmit(overrides);
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
                <span className="font-semibold">Volkswagen Polo</span>
                <span className="font-mono text-xs text-[#666666] block">AB 123 CD • Aura Mutua Assicurazioni</span>
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
                  {isIt ? "Analisi Multimodale Assistita da AI" : "AI-Assisted Multimodal Analysis"}
                </span>
                <span className="text-sm font-semibold text-[#0E0F10]">
                  {isIt ? "Revisione strutturata delle prove" : "Structured evidence review"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-neutral-100 text-[#0E0F10] border border-[#E5E5E3]">
                  {isIt ? "Revisione assistita da AI" : "AI-assisted review"}
                </span>
              </div>
            </div>

            {/* 1. OBSERVED FACTS */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#0E0F10]">
                <span>{isIt ? "1. Fatti osservati direttamente" : "1. Direct visual observations"}</span>
                <span className="text-[11px] font-medium text-[#555555] bg-neutral-100 px-2 py-0.5 rounded">
                  {isIt ? "Evidenza diretta" : "Direct evidence"}
                </span>
              </div>
              <div className="space-y-2 text-xs">
                {(!ai?.observedFacts || ai.observedFacts.length === 0) ? (
                  <div className="p-3.5 rounded-xl bg-[#F7F7F6] border border-[#E5E5E3] text-xs text-[#666666]">
                    {isIt
                      ? "Nessun danno evidente da impatto rilevato nelle prove fornite."
                      : "No evident collision damage detected in the provided evidence."}
                  </div>
                ) : (
                  ai.observedFacts.map((fact, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#F7F7F6] border border-[#E5E5E3] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-[#666666]">
                          {isIt ? "Rilievo fotografico" : "Visual inspection"}
                        </span>
                        {fact.evidenceRefs?.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {fact.evidenceRefs.map((ref, rIdx) => {
                              const lower = ref.toLowerCase();
                              const label =
                                lower.includes("01") || lower.includes("overview")
                                  ? isIt ? "Foto 1 (Panoramica)" : "Photo 1 (Overview)"
                                  : lower.includes("02") || lower.includes("vehicle-a")
                                  ? isIt ? "Foto 2 (Danno Polo)" : "Photo 2 (Polo Damage)"
                                  : lower.includes("03") || lower.includes("vehicle-b")
                                  ? isIt ? "Foto 3 (Danno Golf)" : "Photo 3 (Golf Damage)"
                                  : lower.includes("04") || lower.includes("road")
                                  ? isIt ? "Foto 4 (Contesto stradale)" : "Photo 4 (Road Context)"
                                  : ref.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

                              return (
                                <span key={rIdx} className="text-[10px] px-2 py-0.5 bg-white border border-[#E5E5E3] rounded-md text-[#0E0F10]">
                                  {label}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-[#0E0F10] leading-relaxed">{fact.statement}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 2. INFERRED DYNAMICS */}
            <div className="space-y-2 pt-2 border-t border-[#E5E5E3]">
              <div className="flex items-center justify-between text-xs font-semibold text-[#0E0F10]">
                <span>{isIt ? "2. Dinamica dedotta" : "2. Inferred dynamics"}</span>
                <span className="text-[11px] font-medium text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {isIt ? "Deduzione dinamica" : "Dynamic inference"}
                </span>
              </div>
              <div className="space-y-2 text-xs">
                {(!ai?.inferredDynamics || ai.inferredDynamics.length === 0) ? (
                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-[#E5E5E3] text-xs text-[#666666]">
                    {isIt
                      ? "Nessuna dinamica di collisione dedotta dalle prove visive fornite."
                      : "No collision dynamics inferred from the supplied visual evidence."}
                  </div>
                ) : (
                  ai.inferredDynamics.map((inf, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-amber-50/40 border border-amber-200/60 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#0E0F10]">{inf.statement}</span>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                          {inf.confidenceLabel === "high"
                            ? isIt ? "Alta confidenza" : "High confidence"
                            : inf.confidenceLabel === "medium"
                            ? isIt ? "Media confidenza" : "Medium confidence"
                            : isIt ? "Bassa confidenza" : "Low confidence"}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#666666] leading-relaxed">
                        <em>{isIt ? "Motivazione:" : "Rationale:"}</em> {inf.rationale}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 3. MISSING INFORMATION */}
            <div className="space-y-2 pt-2 border-t border-[#E5E5E3]">
              <div className="flex items-center justify-between text-xs font-semibold text-[#0E0F10]">
                <span>{isIt ? "3. Informazioni mancanti o da verificare" : "3. Missing or unverified information"}</span>
                <span className="text-[11px] font-medium text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
                  {isIt ? "Da integrare" : "To be confirmed"}
                </span>
              </div>
              <ul className="list-disc list-inside text-xs text-[#666666] space-y-1 bg-[#F7F7F6] p-3.5 rounded-xl border border-[#E5E5E3]">
                {(!ai?.missingInformation || ai.missingInformation.length === 0) ? (
                  <li className="text-[11px] leading-relaxed list-none text-[#888888]">
                    {isIt ? "Nessuna informazione critica mancante segnalata." : "No critical missing information noted."}
                  </li>
                ) : (
                  ai.missingInformation.map((m, idx) => (
                    <li key={idx} className="text-[11px] leading-relaxed">{m}</li>
                  ))
                )}
              </ul>
            </div>
          </div>

          {/* MEANINGFUL HUMAN REVIEW & CORRECTION BOX */}
          <div className="p-5 rounded-2xl border-2 border-[#0E0F10] bg-white space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0E0F10] block">
                  {isIt ? "Revisione e Conferma del Conducente" : "Driver Human Review & Confirmation"}
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
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-900 border border-blue-200">
                      {isIt ? "Corretto dal conducente" : "Driver-corrected"}
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200">
                      {isIt ? "Confermato dal conducente" : "Driver-confirmed"}
                    </span>
                  )
                ) : (
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                    {isIt ? "Da verificare" : "Pending review"}
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
                    <span className="text-[11px] text-blue-700 block mt-0.5">
                      ✓ {isIt ? "Corretto manualmente da John Miller (Conducente)" : "Manually corrected by John Miller (Driver)"}
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
              {isIt ? "Dichiarazione e note del conducente (Note per l'assicuratore)" : "Driver Statement & Additional Notes (For Insurer Review)"}
            </label>
            <textarea
              rows={3}
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              placeholder={isIt ? "Aggiungi eventuali osservazioni o note integrative sulla dinamica del sinistro..." : "Add any additional driver remarks, comments, or notes on the incident dynamics..."}
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
                    ? "Inoltro in corso..."
                    : "Submitting report..."
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
