"use client";

import React from "react";
import { EvidenceItem } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { formatDateTime, getProvenanceBadge } from "@/lib/utils";
import { CameraIcon, CheckCircleIcon, FileTextIcon, ActivityIcon } from "@/components/icons/Icons";

interface EvidenceViewerModalProps {
  item: EvidenceItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EvidenceViewerModal({ item, isOpen, onClose }: EvidenceViewerModalProps) {
  if (!item) return null;

  const prov = getProvenanceBadge(item.provenance);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={item.title}
      subtitle={`Artifact ID: ${item.id} • Registered ${formatDateTime(item.timestamp)}`}
      maxWidth="2xl"
    >
      <div className="space-y-5">
        {/* Visual Deterministic Representation */}
        <div className="w-full bg-slate-900 rounded-lg p-6 flex flex-col items-center justify-center text-slate-100 relative overflow-hidden border border-slate-800 select-none">
          {/* Schematic SVG based on evidence type */}
          {item.type.includes("PHOTO") ? (
            <div className="w-full h-48 flex flex-col items-center justify-center relative">
              <svg className="w-full h-full" viewBox="0 0 400 180" fill="none">
                <rect x="10" y="10" width="380" height="160" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                {/* Vehicle Outline */}
                <path d="M70 120 L110 80 L290 80 L330 120 Z" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                <circle cx="120" cy="125" r="16" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                <circle cx="280" cy="125" r="16" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                {/* Target Damage Indicator */}
                <circle cx={item.id.includes("A") ? "105" : "295"} cy="100" r="14" fill="#ef4444" fillOpacity="0.25" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1={item.id.includes("A") ? "105" : "295"} y1="100" x2={item.id.includes("A") ? "105" : "295"} y2="60" stroke="#f87171" strokeWidth="1.5" />
                <text x={item.id.includes("A") ? "110" : "260"} y="55" fill="#fca5a5" fontSize="11" fontFamily="monospace">
                  POINT OF IMPACT
                </text>
              </svg>
              <div className="absolute bottom-3 left-4 text-[10px] font-mono text-slate-400">
                IMPACTA SYNTHETIC SENSOR RECONSTRUCTION • NOT A REAL PHOTO
              </div>
            </div>
          ) : item.type === "TELEMETRY_RECORD" ? (
            <div className="w-full h-48 flex flex-col items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 400 180" fill="none">
                <rect x="10" y="10" width="380" height="160" rx="6" fill="#0f172a" stroke="#1e293b" />
                <path d="M30 120 Q120 120 180 80 T280 40 L370 40" stroke="#3b82f6" strokeWidth="2.5" fill="none" />
                <circle cx="280" cy="40" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                <text x="290" y="38" fill="#f87171" fontSize="10" fontFamily="monospace">
                  IMPACT T=0
                </text>
              </svg>
              <div className="text-[10px] font-mono text-slate-400">
                TELEMETRY REPLAY STREAM • 10Hz SENSOR SAMPLING
              </div>
            </div>
          ) : (
            <div className="w-full h-48 flex flex-col items-center justify-center text-slate-400">
              <FileTextIcon size={40} className="mb-2 text-slate-400" />
              <div className="text-xs font-mono">SCANNED OFFICIAL INSURANCE RECORD</div>
              <div className="text-[10px] text-slate-500 mt-1">OCR Text Extracted Successfully</div>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-1">
            Description &amp; Analyst Findings
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded border border-slate-200">
            {item.description}
          </p>
        </div>

        {/* Metadata Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Provenance</div>
            <div className="mt-1 font-semibold text-xs text-slate-800">{prov.label}</div>
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Status</div>
            <div className="mt-1 font-semibold text-xs text-emerald-700 flex items-center gap-1">
              <CheckCircleIcon size={12} />
              <span>{item.extractionStatus}</span>
            </div>
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Extraction Confidence</div>
            <div className="mt-1 font-mono font-semibold text-xs text-slate-900">
              {item.metadata.confidence}%
            </div>
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Resolution / Sync</div>
            <div className="mt-1 font-mono text-xs text-slate-700">
              {item.metadata.resolution || "Direct Bus Feed"}
            </div>
          </div>
        </div>

        {/* Extracted Attributes Key/Value */}
        <div>
          <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
            Structured Extracted Attributes
          </h4>
          <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs font-mono space-y-1.5">
            {Object.entries(item.metadata.extractedAttributes).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between border-b border-slate-200/60 pb-1 last:border-none">
                <span className="text-slate-500">{key}:</span>
                <span className="font-semibold text-slate-900">{String(val)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
