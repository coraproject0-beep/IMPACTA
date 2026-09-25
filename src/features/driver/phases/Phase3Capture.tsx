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
  const { t, language } = useLanguage();
  const isIt = language === "it";
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
    <div className="space-y-10 py-2 max-w-xl mx-auto selection:bg-[#090A0A] selection:text-white">
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
      <div className="space-y-3 pb-6 border-b border-[#D7D9D8]">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#6F7375]">
          {t.wizard.phase3Title}
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#090A0A] leading-[1.05]">
          {isIt ? "Rilievi e Controparte" : "Capture photos & details"}
        </h1>
        <p className="text-base sm:text-lg text-[#6F7375] font-normal leading-relaxed pt-1">
          {isIt
            ? "Segui la guida a 4 inquadrature per documentare la carreggiata, i punti di collisione e le generalità dell'altro veicolo."
            : "Follow the 4-angle guidance to document the road scene, bumper contact points, and counterparty credentials."}
        </p>
      </div>

      {/* 1. 4-Slot Photo Guide */}
      <div className="space-y-4 pb-8 border-b border-[#D7D9D8]">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#090A0A] flex items-center gap-2">
            <CameraIcon size={16} />
            <span>{t.wizard.phase3PhotoGuide}</span>
          </h2>
          <span className="text-xs font-mono font-semibold text-[#6F7375]">
            {draft.evidenceItems.length} / 4 {isIt ? "foto salvate" : "photos saved"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {photoSlots.map((slot) => {
            const existingItem = draft.evidenceItems.find((i) => i.category === slot.category);
            const isUploading = uploadingSlot === slot.key;

            return (
              <div
                key={slot.key}
                className="border border-[#D7D9D8] bg-white p-4 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#090A0A] block">
                      {slot.titleKey}
                    </span>
                    {existingItem && (
                      <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1 uppercase">
                        <CheckCircleIcon size={12} />
                        <span>{isIt ? "Salvata" : "Saved"}</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#6F7375] leading-relaxed">
                    {slot.descKey}
                  </p>
                </div>

                {existingItem ? (
                  <div className="relative aspect-video overflow-hidden bg-[#090A0A] border border-[#D7D9D8] group">
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
                      className="absolute top-2 right-2 p-1.5 bg-[#090A0A]/80 hover:bg-rose-600 text-white transition-colors"
                      title={isIt ? "Rimuovi e riscatta" : "Delete and retake"}
                    >
                      <CloseIcon size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleTriggerUpload(slot)}
                    disabled={isUploading}
                    className="min-h-[46px] w-full py-2.5 px-3 border border-dashed border-[#D7D9D8] hover:border-[#090A0A] hover:bg-[#F4F5F3] text-[#090A0A] font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <CameraIcon size={16} />
                    <span>{isUploading ? (isIt ? "Caricamento..." : "Uploading...") : t.wizard.phase3TakeOrUpload}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Counterparty Information */}
      <div className="space-y-4 pb-8 border-b border-[#D7D9D8]">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#090A0A] block">
          {t.wizard.phase3CounterpartyDetails}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-xs text-[#6F7375] uppercase tracking-wider">{t.wizard.phase3CounterpartyPlate}</span>
            <input
              type="text"
              value={counterpartyPlate}
              onChange={(e) => setCounterpartyPlate(e.target.value)}
              placeholder="e.g. EZ719TR"
              className="w-full min-h-[50px] px-4 py-3 border border-[#D7D9D8] bg-white focus:border-[#090A0A] focus:outline-none text-[#090A0A] font-mono uppercase text-sm"
            />
          </div>
          <div className="space-y-1">
            <span className="text-xs text-[#6F7375] uppercase tracking-wider">{t.wizard.phase3CounterpartyName}</span>
            <input
              type="text"
              value={counterpartyName}
              onChange={(e) => setCounterpartyName(e.target.value)}
              placeholder="e.g. Marco Rossi"
              className="w-full min-h-[50px] px-4 py-3 border border-[#D7D9D8] bg-white focus:border-[#090A0A] focus:outline-none text-[#090A0A] font-medium text-sm"
            />
          </div>
          <div className="space-y-1">
            <span className="text-xs text-[#6F7375] uppercase tracking-wider">{t.wizard.phase3CounterpartyPhone}</span>
            <input
              type="tel"
              value={counterpartyPhone}
              onChange={(e) => setCounterpartyPhone(e.target.value)}
              placeholder="+39 340 123 4567"
              className="w-full min-h-[50px] px-4 py-3 border border-[#D7D9D8] bg-white focus:border-[#090A0A] focus:outline-none text-[#090A0A] font-mono text-sm"
            />
          </div>
          <div className="space-y-1">
            <span className="text-xs text-[#6F7375] uppercase tracking-wider">{t.wizard.phase3CounterpartyInsurer}</span>
            <input
              type="text"
              value={counterpartyInsurer}
              onChange={(e) => setCounterpartyInsurer(e.target.value)}
              placeholder="e.g. Generali Italia"
              className="w-full min-h-[50px] px-4 py-3 border border-[#D7D9D8] bg-white focus:border-[#090A0A] focus:outline-none text-[#090A0A] font-medium text-sm"
            />
          </div>
        </div>
      </div>

      {/* 3. Driver Statement Narrative */}
      <div className="space-y-3 pb-8">
        <label className="text-sm font-bold uppercase tracking-wider text-[#090A0A] block">
          {t.wizard.phase3StatementTitle}
        </label>
        <textarea
          rows={4}
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
          placeholder={t.wizard.phase3StatementPlaceholder}
          className="w-full p-4 border border-[#D7D9D8] bg-white focus:border-[#090A0A] focus:outline-none text-sm text-[#090A0A] resize-y leading-relaxed font-sans"
        />
      </div>

      {/* Primary Action Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleContinue}
          className="min-h-[56px] w-full py-4 px-6 font-bold text-sm uppercase tracking-wider bg-[#090A0A] hover:bg-[#171819] text-white flex items-center justify-between transition-colors"
        >
          <span>{t.wizard.phase3Next}</span>
          <ArrowRightIcon size={18} />
        </button>
      </div>
    </div>
  );
}
