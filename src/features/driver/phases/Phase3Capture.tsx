"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { DriverDraft, EvidenceDraftItem } from "@/types/driver";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRightIcon } from "@/components/icons/Icons";

interface Phase3CaptureProps {
  draft: DriverDraft;
  onUpdate: (patch: Partial<DriverDraft>) => void;
  onAddEvidence: (item: EvidenceDraftItem, blob?: Blob) => Promise<void>;
  onRemoveEvidence: (id: string) => Promise<void>;
  onNext: () => void;
}

export function Phase3Capture({
  draft,
  onUpdate,
  onAddEvidence,
  onRemoveEvidence,
  onNext,
}: Phase3CaptureProps) {
  const { t, language } = useLanguage();
  const isIt = language === "it";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const evidenceItems = draft.evidenceItems || [];
  const evidenceCount = evidenceItems.length > 0 ? evidenceItems.length : 1;
  const latestPhotoUrl = evidenceItems.length > 0
    ? evidenceItems[evidenceItems.length - 1].previewUrl
    : "/images/hero-car.jpg";

  const handleTriggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const previewUrl = URL.createObjectURL(file);
      const newItem: EvidenceDraftItem = {
        id: `evd-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        category: "SCENE_OVERVIEW",
        categoryLabel: isIt ? "Scena incidente" : "Incident scene",
        previewUrl,
        timestamp: new Date().toISOString(),
        isRealUpload: true,
        notes: "Uploaded by driver at scene",
      };

      await onAddEvidence(newItem, file);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-2 space-y-7 selection:bg-[#0E0F10] selection:text-white">
      {/* Hidden File Input for Native Camera and File Upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload evidence photo"
      />

      {/* Title & Description matching driver-report-step-reference.png */}
      <div className="space-y-2 pt-1">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#0E0F10]">
          {isIt ? "Documenta la scena." : "Document the scene."}
        </h1>
        <p className="text-base sm:text-lg text-[#666666] font-normal leading-snug">
          {isIt
            ? "Scatta alcune foto chiare prima che qualsiasi cosa venga spostata, se è sicuro farlo."
            : "Take a few clear photos before anything is moved, if it is safe to do so."}
        </p>
      </div>

      {/* Large Dominant Photo Area matching driver-report-step-reference.png */}
      <div className="space-y-2">
        <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-neutral-200 border border-[#E5E5E3]">
          <Image
            src={latestPhotoUrl}
            alt="Collision scene documentation"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 448px"
          />
          {isUploading && (
            <div className="absolute inset-0 bg-[#0E0F10]/60 flex items-center justify-center text-white text-xs font-medium">
              {isIt ? "Elaborazione immagine..." : "Processing image..."}
            </div>
          )}
        </div>

        <p className="text-sm text-[#666666] pt-1">
          {evidenceCount}{" "}
          {isIt
            ? evidenceCount === 1 ? "foto aggiunta" : "foto aggiunte"
            : evidenceCount === 1 ? "photo added" : "photos added"}
        </p>
      </div>

      {/* Action Rows matching driver-report-step-reference.png */}
      <div className="space-y-4 pt-2">
        <button
          type="button"
          onClick={handleTriggerUpload}
          className="w-full text-left py-3 flex items-center justify-between text-base font-normal text-[#0E0F10] hover:text-[#666666] transition-colors border-b border-[#E5E5E3]"
        >
          <span>{isIt ? "Scatta un'altra foto" : "Take another photo"}</span>
          <ArrowRightIcon size={18} className="text-[#0E0F10]" />
        </button>

        <button
          type="button"
          onClick={handleTriggerUpload}
          className="w-full text-left py-2 text-base font-normal text-[#0E0F10] hover:text-[#666666] transition-colors"
        >
          {isIt ? "Scegli dalla galleria" : "Choose from library"}
        </button>

        {/* Guidance Breadcrumbs matching driver-report-step-reference.png */}
        <div className="pt-3 pb-2 text-xs sm:text-sm text-[#666666] flex items-center flex-wrap gap-2">
          <span>{isIt ? "Scena completa" : "Whole scene"}</span>
          <span className="text-[#999999]">→</span>
          <span>{isIt ? "Veicoli" : "Vehicles"}</span>
          <span className="text-[#999999]">→</span>
          <span>{isIt ? "Danni" : "Damage"}</span>
          <span className="text-[#999999]">→</span>
          <span>{isIt ? "Strada" : "Road"}</span>
        </div>

        <div className="border-t border-[#E5E5E3] pt-6" />

        {/* Primary Continue Action matching driver-report-step-reference.png */}
        <button
          type="button"
          onClick={onNext}
          className="w-full text-left py-2 flex items-center justify-between text-lg font-semibold text-[#0E0F10] hover:text-[#666666] transition-colors group"
        >
          <span>{isIt ? "Continua" : "Continue"}</span>
          <ArrowRightIcon size={20} className="text-[#0E0F10] group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          type="button"
          onClick={onNext}
          className="text-sm text-[#666666] hover:text-[#0E0F10] transition-colors block"
        >
          {isIt ? "Non posso scattare foto in sicurezza" : "I can't take photos safely"}
        </button>
      </div>
    </div>
  );
}
