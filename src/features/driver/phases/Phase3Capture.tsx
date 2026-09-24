"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { DriverDraft, EvidenceDraftItem } from "@/types/driver";
import { useLanguage } from "@/context/LanguageContext";
import { CameraIcon, CloseIcon, ArrowRightIcon, CheckCircleIcon } from "@/components/icons/Icons";

interface Phase3CaptureProps {
  draft: DriverDraft;
  onUpdate: (patch: Partial<DriverDraft>) => void;
  onAddEvidence: (item: EvidenceDraftItem, blob?: Blob) => Promise<void>;
  onRemoveEvidence: (id: string) => Promise<void>;
  onNext: () => void;
}

interface PhotoSlot {
  key: string;
  category: EvidenceDraftItem["category"];
  titleKey: string;
  descKey: string;
}

export function Phase3Capture({
  draft,
  onUpdate,
  onAddEvidence,
  onRemoveEvidence,
  onNext,
}: Phase3CaptureProps) {
  const { t } = useLanguage();
  const [counterpartyPlate, setCounterpartyPlate] = useState(draft.counterparty.plate || "");
  const [counterpartyName, setCounterpartyName] = useState(draft.counterparty.driverName || "");
  const [counterpartyPhone, setCounterpartyPhone] = useState(draft.counterparty.phone || "");
  const [counterpartyInsurer, setCounterpartyInsurer] = useState(draft.counterparty.insurer || "");
  const [statement, setStatement] = useState(draft.statement || "");
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeSlotForInput, setActiveSlotForInput] = useState<PhotoSlot | null>(null);

  const photoSlots: PhotoSlot[] = [
    {
      key: "scene",
      category: "SCENE_OVERVIEW",
      titleKey: t.wizard.phase3SceneOverview,
      descKey: t.wizard.phase3SceneOverviewDesc,
    },
    {
      key: "my_vehicle",
      category: "DAMAGE_A",
      titleKey: t.wizard.phase3YourVehicle,
      descKey: t.wizard.phase3YourVehicleDesc,
    },
    {
      key: "other_vehicle",
      category: "DAMAGE_B",
      titleKey: t.wizard.phase3OtherVehicle,
      descKey: t.wizard.phase3OtherVehicleDesc,
    },
    {
      key: "detail_doc",
      category: "DOCUMENT",
      titleKey: t.wizard.phase3Documents,
      descKey: t.wizard.phase3DocumentsDesc,
    },
  ];

  const handleTriggerUpload = (slot: PhotoSlot) => {
    setActiveSlotForInput(slot);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeSlotForInput) return;

    setUploadingSlot(activeSlotForInput.key);
    try {
      const previewUrl = URL.createObjectURL(file);
      const newItem: EvidenceDraftItem = {
        id: `evd-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        category: activeSlotForInput.category,
        categoryLabel: activeSlotForInput.titleKey,
        previewUrl,
        timestamp: new Date().toISOString(),
        isRealUpload: true,
        notes: `Uploaded by driver for: ${activeSlotForInput.titleKey}`,
      };

      await onAddEvidence(newItem, file);
    } finally {
      setUploadingSlot(null);
      setActiveSlotForInput(null);
    }
  };

  const handleContinue = () => {
    onUpdate({
      counterparty: {
        ...draft.counterparty,
        plate: counterpartyPlate.toUpperCase(),
        driverName: counterpartyName,
        phone: counterpartyPhone,
        insurer: counterpartyInsurer,
      },
      statement,
    });
    onNext();
  };

  return (
    <div className="space-y-8 py-2 max-w-2xl selection:bg-blue-100 selection:text-blue-900">
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

      {/* Step Header */}
      <div className="space-y-4">
        <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-blue-700">
          {t.wizard.phase3Title}
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
          Capture photos &amp; incident details
        </h1>
        <p className="text-base sm:text-xl text-slate-600 leading-relaxed">
          Follow the 4-angle guidance to document the road scene, bumper contact points, and counterparty credentials.
        </p>
      </div>

      {/* 4-Slot Photo Guide */}
      <div className="space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 flex items-center gap-2.5">
            <CameraIcon size={22} className="text-blue-600" />
            <span>{t.wizard.phase3PhotoGuide}</span>
          </h2>
          <span className="text-xs sm:text-sm font-mono font-semibold text-slate-500">
            {draft.evidenceItems.length} photos saved
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {photoSlots.map((slot) => {
            const existingItem = draft.evidenceItems.find((i) => i.category === slot.category);
            const isUploading = uploadingSlot === slot.key;

            return (
              <div
                key={slot.key}
                className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-base font-bold text-slate-950 block">
                      {slot.titleKey}
                    </span>
                    {existingItem && (
                      <span className="text-xs font-mono font-bold text-emerald-600 flex items-center gap-1.5">
                        <CheckCircleIcon size={14} />
                        <span>Saved</span>
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {slot.descKey}
                  </p>
                </div>

                {existingItem ? (
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 group">
                    <Image
                      src={existingItem.previewUrl}
                      alt={existingItem.categoryLabel}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                    <button
                      type="button"
                      onClick={() => onRemoveEvidence(existingItem.id)}
                      className="absolute top-2 right-2 p-2 rounded-full bg-black/70 hover:bg-rose-600 text-white transition-colors"
                      title="Delete and retake"
                    >
                      <CloseIcon size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleTriggerUpload(slot)}
                    disabled={isUploading}
                    className="min-h-[52px] w-full py-3.5 px-4 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/40 text-slate-700 font-bold text-sm transition-colors flex items-center justify-center gap-2.5"
                  >
                    <CameraIcon size={20} className="text-blue-600" />
                    <span>{isUploading ? "Uploading..." : t.wizard.phase3TakeOrUpload}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Counterparty Information */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
        <h2 className="text-lg sm:text-xl font-bold text-slate-950 block">
          {t.wizard.phase3CounterpartyDetails}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <span className="text-slate-700 font-semibold text-sm sm:text-base">{t.wizard.phase3CounterpartyPlate}</span>
            <input
              type="text"
              value={counterpartyPlate}
              onChange={(e) => setCounterpartyPlate(e.target.value)}
              placeholder="e.g. EZ719TR"
              className="w-full min-h-[52px] px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 font-mono uppercase text-base"
            />
          </div>
          <div className="space-y-1.5">
            <span className="text-slate-700 font-semibold text-sm sm:text-base">{t.wizard.phase3CounterpartyName}</span>
            <input
              type="text"
              value={counterpartyName}
              onChange={(e) => setCounterpartyName(e.target.value)}
              placeholder="e.g. Marco Rossi"
              className="w-full min-h-[52px] px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 text-base"
            />
          </div>
          <div className="space-y-1.5">
            <span className="text-slate-700 font-semibold text-sm sm:text-base">{t.wizard.phase3CounterpartyPhone}</span>
            <input
              type="tel"
              value={counterpartyPhone}
              onChange={(e) => setCounterpartyPhone(e.target.value)}
              placeholder="+39 340 123 4567"
              className="w-full min-h-[52px] px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 text-base"
            />
          </div>
          <div className="space-y-1.5">
            <span className="text-slate-700 font-semibold text-sm sm:text-base">{t.wizard.phase3CounterpartyInsurer}</span>
            <input
              type="text"
              value={counterpartyInsurer}
              onChange={(e) => setCounterpartyInsurer(e.target.value)}
              placeholder="e.g. Generali Italia"
              className="w-full min-h-[52px] px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 text-base"
            />
          </div>
        </div>
      </div>

      {/* Driver Statement Narrative */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <label className="text-lg sm:text-xl font-bold text-slate-950 block">
          {t.wizard.phase3StatementTitle}
        </label>
        <textarea
          rows={4}
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
          placeholder={t.wizard.phase3StatementPlaceholder}
          className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-base text-slate-900 resize-y leading-relaxed"
        />
      </div>

      {/* Primary Action Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleContinue}
          className="min-h-[56px] w-full py-4 px-6 rounded-2xl font-bold text-base sm:text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
        >
          <span>{t.wizard.phase3Next}</span>
          <ArrowRightIcon size={20} />
        </button>
      </div>
    </div>
  );
}
