"use client";

import React, { useRef } from "react";
import { EvidenceDraftItem } from "@/types/driver";
import { CameraIcon, CloseIcon, CheckCircleIcon } from "@/components/icons/Icons";

interface CategoryDefinition {
  id: EvidenceDraftItem["category"];
  label: string;
  hint: string;
}

const CATEGORIES: CategoryDefinition[] = [
  { id: "SCENE_OVERVIEW", label: "Scene Overview", hint: "Wide angle showing both vehicles and road context" },
  { id: "VEHICLE_A", label: "Your Vehicle", hint: "Full view including registration plate" },
  { id: "VEHICLE_B", label: "Other Vehicle", hint: "Counterparty vehicle and plate if visible" },
  { id: "DAMAGE_A", label: "Your Visible Damage", hint: "Close-up of scratches, dents, or broken lights" },
  { id: "ROAD_SIGNS", label: "Road Signs / Markings", hint: "Traffic lights, stop lines, or roundabout yields" },
  { id: "DOCUMENT", label: "Insurance / Documents", hint: "Counterparty green card, CAI, or license slip" },
];

interface EvidenceUploaderProps {
  items: EvidenceDraftItem[];
  onAdd: (item: EvidenceDraftItem, blob?: Blob) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
}

export function EvidenceUploader({ items, onAdd, onRemove }: EvidenceUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeCategoryRef = useRef<CategoryDefinition>(CATEGORIES[0]);

  const capturedCount = CATEGORIES.filter((cat) =>
    items.some((item) => item.category === cat.id)
  ).length;

  const progressPercent = Math.round((capturedCount / CATEGORIES.length) * 100);

  const handleTriggerUpload = (cat: CategoryDefinition) => {
    activeCategoryRef.current = cat;
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cat = activeCategoryRef.current;
    const previewUrl = URL.createObjectURL(file);
    const newItem: EvidenceDraftItem = {
      id: `draft-evd-${Date.now()}`,
      category: cat.id,
      categoryLabel: cat.label,
      file,
      previewUrl,
      timestamp: new Date().toISOString(),
      isRealUpload: true,
      notes: `${cat.label} captured from device camera`,
    };

    await onAdd(newItem, file);
  };

  return (
    <div className="space-y-4">
      {/* Hidden file input supporting camera capture on mobile */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload evidence image"
      />

      {/* Restrained Progress Header */}
      <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-semibold text-slate-800">
            Recommended Evidence
          </span>
          <span className="font-mono text-slate-500 font-medium">
            {capturedCount} of {CATEGORIES.length} views captured
          </span>
        </div>
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Guided Category Cards */}
      <div className="space-y-3">
        {CATEGORIES.map((cat) => {
          const matchedItems = items.filter((item) => item.category === cat.id);
          const hasPhoto = matchedItems.length > 0;

          return (
            <div
              key={cat.id}
              className={`p-3.5 rounded-lg border transition-all ${
                hasPhoto
                  ? "bg-white border-slate-300"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {cat.label}
                    </h4>
                    {hasPhoto && (
                      <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-0.5">
                        <CheckCircleIcon size={12} />
                        <span>Captured</span>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    {cat.hint}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleTriggerUpload(cat)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs font-semibold flex items-center gap-1.5 flex-shrink-0 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <CameraIcon size={14} />
                  <span>{hasPhoto ? "Add More" : "Take Photo"}</span>
                </button>
              </div>

              {/* Previews for this category */}
              {hasPhoto && (
                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                  {matchedItems.map((item) => (
                    <div
                      key={item.id}
                      className="relative w-20 h-20 rounded border border-slate-200 overflow-hidden group bg-slate-900"
                    >
                      {item.isRealUpload ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={item.previewUrl}
                          alt={item.categoryLabel}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-1 text-[9px] text-slate-400 font-mono text-center">
                          <CameraIcon size={16} className="text-slate-500 mb-0.5" />
                          <span>Demo View</span>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-rose-600 transition-colors"
                        aria-label="Remove photo"
                      >
                        <CloseIcon size={11} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
