"use client";

import React, { useState, useRef } from "react";
import { DriverDraft, EvidenceDraftItem } from "@/types/driver";
import { CameraIcon, CloseIcon, ArrowRightIcon, CheckCircleIcon, UserIcon } from "@/components/icons/Icons";

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
  label: string;
  guide: string;
}

const PHOTO_SLOTS: PhotoSlot[] = [
  {
    key: "scene",
    category: "SCENE_OVERVIEW",
    label: "The Whole Scene",
    guide: "Step back 5–10 meters. Capture both vehicles, road markings, and roundabout entry.",
  },
  {
    key: "my_vehicle",
    category: "DAMAGE_A",
    label: "Your Vehicle Damage",
    guide: "Capture the contact area on your Golf VIII (bumper, wheel, or wing panel).",
  },
  {
    key: "other_vehicle",
    category: "DAMAGE_B",
    label: "Other Vehicle & Plate",
    guide: "Capture the other vehicle and its license plate clearly.",
  },
  {
    key: "detail_doc",
    category: "DOCUMENT",
    label: "Documents or Extra Detail",
    guide: "Green card, driving license, or a close-up of paint transfer/debris.",
  },
];

export function Phase3Capture({
  draft,
  onUpdate,
  onAddEvidence,
  onRemoveEvidence,
  onNext,
}: Phase3CaptureProps) {
  const [counterpartyPlate, setCounterpartyPlate] = useState(draft.counterparty.plate || "");
  const [counterpartyName, setCounterpartyName] = useState(draft.counterparty.driverName || "");
  const [counterpartyPhone, setCounterpartyPhone] = useState(draft.counterparty.phone || "");
  const [counterpartyInsurer, setCounterpartyInsurer] = useState(draft.counterparty.insurer || "");
  const [statement, setStatement] = useState(draft.statement || "");
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeSlotForInput, setActiveSlotForInput] = useState<PhotoSlot | null>(null);

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
        categoryLabel: activeSlotForInput.label,
        previewUrl,
        timestamp: new Date().toISOString(),
        isRealUpload: true,
        notes: `Uploaded by driver for: ${activeSlotForInput.label}`,
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
        hasInfo: true,
      },
      statement,
    });
    onNext();
  };

  // Helper to find uploaded item for a given slot
  const getItemForSlot = (slot: PhotoSlot) => {
    return draft.evidenceItems.find((item) => item.category === slot.category);
  };

  return (
    <div className="space-y-8">
      {/* Hidden file input supporting mobile camera capture */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      {/* Header */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
          Phase 3: Evidence &amp; Details
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950">
          Capture the scene, vehicle damage &amp; statements
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Clear daylight photos and other driver details provide factual evidence for your claim without technical complexity.
        </p>
      </div>

      {/* Section 1: Natural Visual Photo Capture */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            1. Accident Photography ({draft.evidenceItems.length} photos attached)
          </h3>
          <span className="text-[11px] text-slate-400">Tap to snap with camera or upload</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PHOTO_SLOTS.map((slot) => {
            const item = getItemForSlot(slot);
            const isUploading = uploadingSlot === slot.key;

            return (
              <div
                key={slot.key}
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-4 shadow-xs space-y-3 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">
                      {slot.label}
                    </span>
                    {item && (
                      <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <CheckCircleIcon size={10} />
                        <span>Saved</span>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {slot.guide}
                  </p>
                </div>

                {/* Photo Preview or Capture Area */}
                {item ? (
                  <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-100 border border-slate-200 group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.previewUrl}
                      alt={item.categoryLabel}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => onRemoveEvidence(item.id)}
                      className="absolute top-2 right-2 p-1.5 bg-slate-900/80 hover:bg-rose-600 text-white rounded-full transition-colors shadow-xs"
                      title="Remove photo"
                    >
                      <CloseIcon size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleTriggerUpload(slot)}
                    disabled={isUploading}
                    className="w-full aspect-video rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-400 bg-slate-50/60 hover:bg-blue-50/20 flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-blue-600 transition-all cursor-pointer p-4 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white shadow-2xs border border-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform text-slate-600 group-hover:text-blue-600">
                      <CameraIcon size={20} />
                    </div>
                    <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-700">
                      {isUploading ? "Uploading..." : "Take Photo or Upload"}
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 2: Other Driver Details */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            2. Other Driver &amp; Vehicle
          </h3>
          <span className="text-[11px] text-slate-400">From their insurance card or license</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Other Vehicle Plate *
              </label>
              <input
                type="text"
                value={counterpartyPlate}
                onChange={(e) => setCounterpartyPlate(e.target.value.toUpperCase())}
                placeholder="e.g. EK712MM"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Driver Full Name
              </label>
              <input
                type="text"
                value={counterpartyName}
                onChange={(e) => setCounterpartyName(e.target.value)}
                placeholder="e.g. Marco Rossi"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Contact Phone
              </label>
              <input
                type="tel"
                value={counterpartyPhone}
                onChange={(e) => setCounterpartyPhone(e.target.value)}
                placeholder="e.g. +39 347 889 0122"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Insurance Carrier (Compagnia)
              </label>
              <input
                type="text"
                value={counterpartyInsurer}
                onChange={(e) => setCounterpartyInsurer(e.target.value)}
                placeholder="e.g. Liguria Mutua, Generali"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Driver Statement */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            3. What Happened? (Your Statement)
          </h3>
          <span className="text-[11px] text-slate-400">In your own words</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <textarea
            rows={4}
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            placeholder="Describe the incident simply. For example: I was circulating inside the Piazza San Giovanni roundabout in the right lane when the other vehicle entered from the right side without yielding, making contact with my front-left wing."
            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
          />
          <p className="text-[11px] text-slate-500">
            Do not worry about legal liability or formal terminology. Plainly describe what you saw and heard.
          </p>
        </div>
      </section>

      {/* Forward Button */}
      <div className="pt-4 border-t border-slate-200/80">
        <button
          type="button"
          onClick={handleContinue}
          className="w-full py-3.5 px-5 bg-slate-950 hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
        >
          <span>Continue to Review &amp; Confirmation</span>
          <ArrowRightIcon size={14} />
        </button>
      </div>
    </div>
  );
}
