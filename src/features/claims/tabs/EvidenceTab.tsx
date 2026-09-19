"use client";

import React, { useState } from "react";
import { Claim, EvidenceItem } from "@/types";
import { EvidenceViewerModal } from "../components/EvidenceViewerModal";
import {
  CameraIcon,
  CheckCircleIcon,
  FileTextIcon,
  ActivityIcon,
  AlertTriangleIcon,
} from "@/components/icons/Icons";
import { formatDateTime, getProvenanceBadge } from "@/lib/utils";

interface EvidenceTabProps {
  claim: Claim;
}

export function EvidenceTab({ claim }: EvidenceTabProps) {
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);
  const [filterType, setFilterType] = useState<string>("ALL");

  const filteredEvidence = claim.evidence.filter((item) => {
    if (filterType === "ALL") return true;
    return item.type === filterType;
  });

  return (
    <div className="space-y-6">
      {/* Evidence Controls & Filters */}
      <div className="bg-white border border-slate-200 rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Filter Artifacts:
          </span>
          <div className="flex flex-wrap items-center gap-1">
            {[
              { id: "ALL", label: `All (${claim.evidence.length})` },
              { id: "VEHICLE_DAMAGE_PHOTO", label: "Damage Photos" },
              { id: "SCENE_PHOTO", label: "Scene Photos" },
              { id: "DOCUMENT", label: "Documents" },
              { id: "TELEMETRY_RECORD", label: "Telemetry Records" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilterType(f.id)}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  filterType === f.id
                    ? "bg-slate-900 text-white font-medium"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          {claim.evidence.length} evidentiary artifacts registered
        </div>
      </div>

      {/* Empty State */}
      {filteredEvidence.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded p-12 text-center">
          <div className="w-10 h-10 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-2">
            <CameraIcon size={20} />
          </div>
          <h4 className="text-xs font-bold text-slate-800">No Evidence Found</h4>
          <p className="text-xs text-slate-500 mt-1">
            No items match the selected category. Driver or investigator upload pending.
          </p>
        </div>
      ) : (
        /* Evidence Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvidence.map((item) => {
            const prov = getProvenanceBadge(item.provenance);

            return (
              <div
                key={item.id}
                onClick={() => setSelectedEvidence(item)}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer flex flex-col group"
              >
                {/* Visual Thumbnail Representation */}
                <div className="h-40 bg-slate-900 relative flex items-center justify-center text-slate-300 overflow-hidden border-b border-slate-200">
                  {item.type.includes("PHOTO") ? (
                    <svg className="w-full h-full p-4" viewBox="0 0 300 150" fill="none">
                      <rect width="300" height="150" fill="#1e293b" rx="4" />
                      {/* Stylized road & car wireframe */}
                      <line x1="0" y1="120" x2="300" y2="120" stroke="#334155" strokeWidth="2" strokeDasharray="6 4" />
                      <path d="M50 110 L80 75 L220 75 L250 110 Z" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
                      <circle cx="90" cy="115" r="14" fill="#334155" stroke="#94a3b8" />
                      <circle cx="210" cy="115" r="14" fill="#334155" stroke="#94a3b8" />
                      {/* Damage radar spot */}
                      <circle cx="100" cy="90" r="12" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="1.5" />
                    </svg>
                  ) : item.type === "TELEMETRY_RECORD" ? (
                    <svg className="w-full h-full p-4" viewBox="0 0 300 150" fill="none">
                      <rect width="300" height="150" fill="#0f172a" rx="4" />
                      <path d="M20 100 Q80 100 130 60 T220 30 L280 30" stroke="#38bdf8" strokeWidth="2" fill="none" />
                      <circle cx="220" cy="30" r="4" fill="#ef4444" />
                      <text x="30" y="30" fill="#94a3b8" fontSize="10" fontFamily="monospace">10Hz Black-Box Stream</text>
                    </svg>
                  ) : (
                    <div className="flex flex-col items-center">
                      <FileTextIcon size={36} className="text-slate-500 mb-1" />
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        Official Scanned Document
                      </span>
                    </div>
                  )}

                  {/* Type badge overlay */}
                  <div className="absolute top-2 left-2">
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-900/80 text-white border border-slate-700 backdrop-blur-xs">
                      {item.type.replace(/_/g, " ")}
                    </span>
                  </div>

                  {/* Confidence overlay */}
                  <div className="absolute top-2 right-2">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900/80 text-emerald-400 border border-slate-700">
                      {item.metadata.confidence}% OCR/Vision
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
                      <span>{item.id}</span>
                      <span>{formatDateTime(item.timestamp)}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className={`text-[9px] font-medium px-1.5 py-0.2 rounded border ${prov.className}`}>
                      {prov.label}
                    </span>
                    <span className="text-[10px] text-slate-400 group-hover:text-blue-600 font-semibold flex items-center gap-0.5">
                      Inspect Artifact →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      <EvidenceViewerModal
        isOpen={Boolean(selectedEvidence)}
        onClose={() => setSelectedEvidence(null)}
        item={selectedEvidence}
      />
    </div>
  );
}
