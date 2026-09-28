"use client";

import React, { useState } from "react";
import { Claim, CAIField } from "@/types";
import { useClaims } from "@/context/ClaimsContext";
import { useLanguage } from "@/context/LanguageContext";
import { CAIEditModal } from "../components/CAIEditModal";
import { Button } from "@/components/ui/Button";
import {
  CheckCircleIcon,
  AlertTriangleIcon,
  FileTextIcon,
  EditIcon,
  DownloadIcon,
} from "@/components/icons/Icons";
import { getProvenanceBadge } from "@/lib/utils";

interface CAIWorkspaceTabProps {
  claim: Claim;
}

export function CAIWorkspaceTab({ claim }: CAIWorkspaceTabProps) {
  const { language } = useLanguage();
  const isIt = language === "it";
  const { confirmCAIField, updateCAIField, generateCAIDraft, updateStatus } = useClaims();
  const [editingField, setEditingField] = useState<CAIField | null>(null);
  const [draftGeneratedNotice, setDraftGeneratedNotice] = useState(false);
  const [markedReviewedNotice, setMarkedReviewedNotice] = useState(false);

  // Group fields by CAI section
  const sections: { key: CAIField["section"]; label: string }[] = [
    { key: "CIRCUMSTANCES", label: "Circostanze dell'Incidente (Boxes 1-5, 12, 14)" },
    { key: "VEHICLE_A", label: "Veicolo A • Assicurato / Conducente (Boxes 6-9)" },
    { key: "VEHICLE_B", label: "Veicolo B • Controparte (Boxes 6-9)" },
    { key: "DAMAGE", label: "Punti d'Urto e Danni Visibili (Box 10)" },
    { key: "ADMIN", label: "Dati Amministrativi / Polizze" },
  ];

  // Calculated metrics
  const totalFields = claim.caiFields.length;
  const confirmedFields = claim.caiFields.filter((f) => f.isConfirmed).length;
  const requiringConfirmFields = claim.caiFields.filter((f) => f.requiresConfirmation).length;
  const missingFields = claim.caiFields.filter((f) => f.value.includes("MANCANTE") || f.value.includes("Non documentato")).length;
  const completionPct = totalFields > 0 ? Math.round((confirmedFields / totalFields) * 100) : 0;

  const handleToggleConfirm = async (field: CAIField) => {
    await confirmCAIField(claim.id, field.id, !field.isConfirmed);
  };

  const handleGenerateDraft = async () => {
    await generateCAIDraft(claim.id);
    setDraftGeneratedNotice(true);
    setTimeout(() => setDraftGeneratedNotice(false), 3500);
  };

  const handleMarkAsReviewed = async () => {
    await updateStatus(claim.id, "REVIEWED");
    setMarkedReviewedNotice(true);
    setTimeout(() => setMarkedReviewedNotice(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Workspace Metric Header */}
      <div className="bg-white border border-slate-200 rounded p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>Modulo CAI (Constatazione Amichevole d&apos;Incidente) Workspace</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-blue-50 text-blue-700 border border-blue-200 rounded">
                CAI-COMPATIBLE
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Structured inspection workspace mapping evidence provenance to standardized CAI declaration boxes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleGenerateDraft}
              className="text-xs"
            >
              <FileTextIcon size={14} />
              <span>{isIt ? "Genera bozza CAI" : "Generate CAI Draft"}</span>
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={handleMarkAsReviewed}
              disabled={claim.status === "REVIEWED" || claim.status === "CLOSED"}
              className="text-xs"
            >
              <CheckCircleIcon size={14} />
              <span>{claim.status === "REVIEWED" ? (isIt ? "Già esaminato" : "Already Reviewed") : (isIt ? "Segna come esaminato" : "Mark as Reviewed")}</span>
            </Button>
          </div>
        </div>

        {/* Notices */}
        {draftGeneratedNotice && (
          <div className="mt-3 p-2.5 bg-blue-50 border border-blue-200 rounded text-xs text-blue-900 flex items-center justify-between animate-in fade-in duration-150">
            <span>
              <strong>{isIt ? "Bozza fascicolo CAI generata:" : "CAI Draft Dossier Generated:"}</strong> {isIt ? "Stato aggiornato a " : "Status updated to "}<code>CAI_READY</code>. {isIt ? "Evento registrato nel registro audit." : "Audit event appended to claim log."}
            </span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-blue-100 rounded text-blue-800">
              {isIt ? "Fascicolo CAI" : "CAI Dossier"}
            </span>
          </div>
        )}

        {markedReviewedNotice && (
          <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900 flex items-center justify-between animate-in fade-in duration-150">
            <span>
              <strong>{isIt ? "Sinistro validato:" : "Claim Validated:"}</strong> {isIt ? "Stato passato a " : "Claim status transitioned to "}<code>REVIEWED</code>. {isIt ? "Approvazione del perito registrata." : "Reviewer sign-off logged."}
            </span>
          </div>
        )}

        {/* Four Status Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="text-[10px] font-semibold text-slate-400 uppercase">Completion Rate</div>
            <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">{completionPct}%</div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-blue-600 h-full" style={{ width: `${completionPct}%` }} />
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="text-[10px] font-semibold text-slate-400 uppercase">Confirmed Fields</div>
            <div className="text-xl font-bold font-mono text-emerald-700 mt-0.5">
              {confirmedFields} <span className="text-xs text-slate-400 font-normal">/ {totalFields}</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Adjuster or verified document</div>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="text-[10px] font-semibold text-slate-400 uppercase">Requiring Confirmation</div>
            <div className="text-xl font-bold font-mono text-amber-700 mt-0.5">
              {requiringConfirmFields}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">AI Inferences needing check</div>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="text-[10px] font-semibold text-slate-400 uppercase">Missing Evidentiary Fields</div>
            <div className="text-xl font-bold font-mono text-rose-700 mt-0.5">
              {missingFields}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Requires user or SITA lookup</div>
          </div>
        </div>
      </div>

      {/* Sections & Field Rows */}
      <div className="space-y-4">
        {sections.map((sec) => {
          const secFields = claim.caiFields.filter((f) => f.section === sec.key);
          if (secFields.length === 0) return null;

          return (
            <div key={sec.key} className="bg-white border border-slate-200 rounded overflow-hidden">
              <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  {sec.label}
                </h4>
                <span className="text-[10px] font-mono text-slate-400">
                  {secFields.filter((f) => f.isConfirmed).length}/{secFields.length} confirmed
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {secFields.map((field) => {
                  const prov = getProvenanceBadge(field.provenance);

                  return (
                    <div
                      key={field.id}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors"
                    >
                      {/* Left: Box Code & Label */}
                      <div className="sm:w-1/3 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-slate-700">
                            Box {field.code}
                          </span>
                          <span className="text-xs font-semibold text-slate-900 truncate">
                            {field.label}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <span className={`text-[9px] font-medium px-1.5 py-0.2 rounded border ${prov.className}`}>
                            {prov.label}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            Conf: {field.confidence}%
                          </span>
                        </div>
                      </div>

                      {/* Center: Value */}
                      <div className="sm:w-5/12 min-w-0">
                        <div className={`text-xs p-2 rounded border font-mono ${
                          field.value.includes("MANCANTE")
                            ? "bg-rose-50 text-rose-800 border-rose-200 font-bold"
                            : "bg-slate-50 text-slate-900 border-slate-200"
                        }`}>
                          {field.value}
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="sm:w-1/4 flex items-center justify-end gap-2">
                        {field.isConfirmed ? (
                          <button
                            type="button"
                            onClick={() => handleToggleConfirm(field)}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-2 py-1 rounded transition-colors"
                            title="Click to toggle unconfirmed"
                          >
                            <CheckCircleIcon size={12} />
                            <span>Confirmed</span>
                          </button>
                        ) : field.requiresConfirmation ? (
                          <button
                            type="button"
                            onClick={() => handleToggleConfirm(field)}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-2 py-1 rounded transition-colors"
                          >
                            <AlertTriangleIcon size={12} />
                            <span>Confirm</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleToggleConfirm(field)}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-2 py-1 rounded transition-colors"
                          >
                            <span>Validate</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setEditingField(field)}
                          aria-label={`Edit ${field.label}`}
                          className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded border border-transparent hover:border-slate-300 transition-colors"
                        >
                          <EditIcon size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      <CAIEditModal
        field={editingField}
        isOpen={Boolean(editingField)}
        onClose={() => setEditingField(null)}
        onSave={async (fieldId, val) => {
          await updateCAIField(claim.id, fieldId, val);
        }}
      />
    </div>
  );
}
