"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { DriverDraft, EvidenceDraftItem } from "@/types/driver";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRightIcon, CameraIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/icons/Icons";
import { ImpactaAnalysisLoader } from "@/components/ui/ImpactaAnalysisLoader";

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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStatusText, setAnalysisStatusText] = useState<string>("");
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const evidenceItems = draft.evidenceItems || [];
  const evidenceCount = evidenceItems.length;

  // Safe clamped index guaranteeing valid bounds
  const currentIndex =
    evidenceCount > 0 ? Math.min(Math.max(0, activePhotoIndex), evidenceCount - 1) : 0;
  const currentPhoto = evidenceCount > 0 ? evidenceItems[currentIndex] : null;
  const currentPhotoUrl = currentPhoto?.previewUrl || null;

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (evidenceCount <= 1) return;
    setActivePhotoIndex((prev) => (prev === 0 ? evidenceCount - 1 : prev - 1));
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (evidenceCount <= 1) return;
    setActivePhotoIndex((prev) => (prev >= evidenceCount - 1 ? 0 : prev + 1));
  };

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
      const formData = new FormData();
      formData.append("file", file);
      formData.append("claimId", draft.submittedClaimId || "CLM-APP-DRAFT");
      formData.append("category", "SCENE_OVERVIEW");
      formData.append("categoryLabel", isIt ? "Scena incidente" : "Incident scene");
      formData.append("notes", "Uploaded by driver at scene");

      let previewUrl = URL.createObjectURL(file);
      let realId = `evd-${Date.now()}`;

      try {
        const uploadRes = await fetch("/api/evidence/upload", {
          method: "POST",
          body: formData,
        });
        if (uploadRes.ok) {
          const upData = await uploadRes.json();
          if (upData.signedUrl) previewUrl = upData.signedUrl;
          if (upData.id) realId = upData.id;
        }
      } catch (err) {
        console.warn("Evidence upload to Supabase storage fallback to local preview", err);
      }

      const newItem: EvidenceDraftItem = {
        id: realId,
        category: "SCENE_OVERVIEW",
        categoryLabel: isIt ? "Scena incidente" : "Incident scene",
        previewUrl,
        timestamp: new Date().toISOString(),
        isRealUpload: true,
        notes: "Uploaded by driver at scene",
      };

      await onAddEvidence(newItem, file);
      setActivePhotoIndex(evidenceCount);
    } finally {
      setIsUploading(false);
    }
  };

  // One-click loader for Canonical Scenario 01 evidence
  const handleLoadCanonicalScenario = async () => {
    setIsUploading(true);
    try {
      const canonicalItems: EvidenceDraftItem[] = [
        {
          id: "EVD-DEMO-001",
          category: "SCENE_OVERVIEW",
          categoryLabel: isIt ? "Panoramica intersezione" : "Intersection Overview",
          previewUrl: "/demo/scenario-01/01-overview.png",
          timestamp: "2026-09-26T14:23:00Z",
          isRealUpload: true,
          notes: "Posizione di quiete finale all'intersezione (01-overview.png)",
        },
        {
          id: "EVD-DEMO-002",
          category: "DAMAGE_A",
          categoryLabel: isIt ? "Danno Veicolo A (Polo)" : "Vehicle A Damage Detail",
          previewUrl: "/demo/scenario-01/02-vehicle-a-damage.png",
          timestamp: "2026-09-26T14:23:45Z",
          isRealUpload: true,
          notes: isIt
            ? "Danno parafango e paraurti anteriore destro su VW Polo"
            : "Front right wing and bumper damage on VW Polo",
        },
        {
          id: "EVD-DEMO-003",
          category: "DAMAGE_B",
          categoryLabel: isIt ? "Danno Veicolo B (Golf)" : "Vehicle B Damage Detail",
          previewUrl: "/demo/scenario-01/03-vehicle-b-damage.png",
          timestamp: "2026-09-26T14:24:20Z",
          isRealUpload: true,
          notes: isIt
            ? "Danno parafango e fiancata anteriore sinistra su VW Golf argento"
            : "Front left wing and side panel damage on VW Golf",
        },
        {
          id: "EVD-DEMO-004",
          category: "ROAD_SIGNS",
          categoryLabel: isIt ? "Segnaletica e contesto stradale" : "Road Signs & Context",
          previewUrl: "/demo/scenario-01/04-road-context.png",
          timestamp: "2026-09-26T14:25:00Z",
          isRealUpload: true,
          notes: isIt ? "Segnaletica verticale e orizzontale incrocio" : "Vertical and horizontal intersection signs",
        },
      ];

      for (const item of canonicalItems) {
        await onAddEvidence(item);
      }
      setActivePhotoIndex(0);

      const hasCustomLocation = Boolean(
        draft.location &&
          (draft.location.street ||
            (draft.location.city && draft.location.city !== "Roma" && draft.location.city !== "Milano"))
      );
      const hasCustomDate = Boolean(draft.incidentDate);
      const hasCustomTime = Boolean(draft.incidentTime);
      const hasCustomCounterparty = Boolean(draft.counterparty?.plate || draft.counterparty?.driverName);
      const hasCustomStatement = Boolean(draft.statement && draft.statement.trim().length > 0);

      const patch: Partial<DriverDraft> = {
        isDemoIncident: false,
      };

      if (!hasCustomDate) patch.incidentDate = "2026-09-26";
      if (!hasCustomTime) patch.incidentTime = "14:22";
      if (!hasCustomLocation) {
        patch.location = {
          city: "Milano",
          street: "Milan metropolitan area, Italy (Intersection)",
          postalCode: "20100",
          latitude: 45.4642,
          longitude: 9.19,
          junctionType: "INTERSECTION",
        };
      }
      if (!hasCustomCounterparty) {
        patch.counterparty = {
          driverName: "Claire Anderson",
          phone: "+39 347 9876 543",
          plate: "EF 456 GH",
          makeModel: "Volkswagen Golf VII (Silver)",
          insurer: "Allianz Italia",
          policyNumber: "ALZ-9912-38410",
          hasInfo: true,
        };
      }
      if (!hasCustomStatement) {
        patch.statement =
          "I was travelling straight through the intersection when the other vehicle entered my path.";
      }

      onUpdate(patch);
    } finally {
      setIsUploading(false);
    }
  };

  const handleContinue = async () => {
    setIsAnalyzing(true);
    setAnalysisStatusText(
      isIt
        ? "Analisi multimodale assistita da AI in corso..."
        : "AI-assisted multimodal analysis in progress..."
    );

    try {
      const imagesToAnalyze =
        evidenceItems.length > 0
          ? evidenceItems.map((e, idx) => ({
              name: e.previewUrl.split("/").pop() || `evidence-${idx + 1}.png`,
              mimeType: "image/png",
              url: e.previewUrl,
            }))
          : [
              {
                name: "01-overview.png",
                mimeType: "image/png",
                url: "/demo/scenario-01/01-overview.png",
              },
              {
                name: "02-vehicle-a-damage.png",
                mimeType: "image/png",
                url: "/demo/scenario-01/02-vehicle-a-damage.png",
              },
            ];

      const analyzePayload = {
        images: imagesToAnalyze,
        driverStatement:
          draft.statement ||
          "I was travelling straight through the intersection when the other vehicle entered my path.",
        scenarioMetadata: {
          locationText: `${draft.location.city || "Milan"}, ${draft.location.street || "Milan metropolitan area, Italy"}`,
          incidentDatetime: `${draft.incidentDate || "2026-09-26"}T${draft.incidentTime || "14:22"}:00Z`,
          vehicleA: { make: "Volkswagen", model: "Polo", plate: "AB 123 CD" },
          vehicleB: {
            make: "Volkswagen",
            model: "Golf VII",
            plate: draft.counterparty.plate || "EF 456 GH",
          },
        },
      };

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(analyzePayload),
      });

      const data = await res.json();
      if (data.analysis) {
        onUpdate({ aiAnalysisOutput: data.analysis });
        onNext();
      } else {
        throw new Error(data.error || "Analysis failed");
      }
    } catch (err: any) {
      console.warn("AI analysis request encountered issue, using deterministic fallback:", err);
      try {
        const fallbackRes = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            images: [
              {
                name: "01-overview.png",
                mimeType: "image/png",
                url: "/demo/scenario-01/01-overview.png",
              },
            ],
            forceFallback: true,
          }),
        });
        const fallbackData = await fallbackRes.json();
        if (fallbackData.analysis) {
          onUpdate({ aiAnalysisOutput: fallbackData.analysis });
          onNext();
          return;
        }
      } catch (fErr) {
        console.error("Fallback error:", fErr);
      }
      onNext();
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-md lg:max-w-5xl mx-auto py-2 selection:bg-[#0E0F10] selection:text-white">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* LEFT COLUMN: Title, Guidance, Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2 pt-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0E0F10] leading-[1.08]">
              {isIt ? "Documenta la scena." : "Document the scene."}
            </h1>
            <p className="text-base sm:text-lg text-[#666666] font-normal leading-relaxed">
              {isIt
                ? "Scatta o carica le foto dei veicoli e della strada per l'analisi forense multimodale."
                : "Capture or upload photos of the vehicles and road context for multimodal forensic analysis."}
            </p>
          </div>

          {/* Action Rows */}
          <div className="space-y-4 pt-2 border-t border-[#E5E5E3]">
            <button
              type="button"
              onClick={handleTriggerUpload}
              className="w-full text-left py-3 flex items-center justify-between text-base font-normal text-[#0E0F10] hover:text-[#666666] transition-colors border-b border-[#E5E5E3]"
            >
              <span>{isIt ? "Scatta una foto" : "Take a photo"}</span>
              <ArrowRightIcon size={18} className="text-[#0E0F10]" />
            </button>

            <button
              type="button"
              onClick={handleLoadCanonicalScenario}
              disabled={isUploading || isAnalyzing}
              className="w-full text-left py-2 text-base font-normal text-[#0E0F10] hover:text-[#666666] transition-colors disabled:opacity-50"
            >
              {isIt ? "Scegli dalla galleria" : "Choose from library"}
            </button>

            <div className="border-t border-[#E5E5E3] pt-6" />

            {/* Primary Continue Action with Analysis invocation */}
            <button
              type="button"
              onClick={handleContinue}
              disabled={isAnalyzing || evidenceCount === 0}
              className={`w-full text-left py-2 flex items-center justify-between text-lg font-semibold transition-colors group ${
                evidenceCount === 0 || isAnalyzing
                  ? "opacity-40 cursor-not-allowed text-[#888888]"
                  : "text-[#0E0F10] hover:text-[#666666] cursor-pointer"
              }`}
            >
              <span>
                {isAnalyzing
                  ? isIt
                    ? "Verifica in corso..."
                    : "Reviewing evidence..."
                  : isIt
                  ? "Continua all'analisi"
                  : "Continue to Analysis"}
              </span>
              <ArrowRightIcon
                size={20}
                className={`text-[#0E0F10] ${evidenceCount > 0 && !isAnalyzing ? "group-hover:translate-x-1" : ""} transition-transform`}
              />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Evidence Viewport */}
        <div className="lg:col-span-7 space-y-3 order-first lg:order-last">
          <div className="relative aspect-[16/11] lg:aspect-[16/10] w-full overflow-hidden rounded-2xl bg-neutral-100 border border-[#E5E5E3] shadow-xs">
            {currentPhotoUrl ? (
              <>
                <Image
                  key={currentPhoto?.id || currentIndex}
                  src={currentPhotoUrl}
                  alt={currentPhoto?.categoryLabel || "Collision scene documentation"}
                  fill
                  priority
                  className="object-cover transition-opacity duration-200"
                  sizes="(max-width: 1024px) 100vw, 700px"
                />

                {/* Subtle Position Indicator (e.g. 1 / 4) */}
                {evidenceCount > 1 && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-mono font-medium z-10 select-none">
                    {currentIndex + 1} / {evidenceCount}
                  </div>
                )}

                {/* Photo Category overlay */}
                {currentPhoto?.categoryLabel && (
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-xs text-white text-xs font-medium z-10 max-w-[70%] truncate select-none">
                    {currentPhoto.categoryLabel}
                  </div>
                )}

                {/* Lateral Navigation Arrows */}
                {evidenceCount > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevPhoto}
                      aria-label={isIt ? "Foto precedente" : "Previous photo"}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-colors focus:outline-none focus:ring-2 focus:ring-white z-10 cursor-pointer"
                    >
                      <ChevronLeftIcon size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextPhoto}
                      aria-label={isIt ? "Foto successiva" : "Next photo"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-colors focus:outline-none focus:ring-2 focus:ring-white z-10 cursor-pointer"
                    >
                      <ChevronRightIcon size={18} />
                    </button>
                  </>
                )}

                {/* Small Dots Indicator */}
                {evidenceCount > 1 && (
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-10">
                    {evidenceItems.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePhotoIndex(dotIdx);
                        }}
                        aria-label={`${isIt ? "Vai alla foto" : "Go to photo"} ${dotIdx + 1}`}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          dotIdx === currentIndex
                            ? "bg-white w-3"
                            : "bg-white/50 hover:bg-white/80 w-1.5"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#F9F9F8]">
                <div className="w-12 h-12 rounded-full bg-white border border-[#E5E5E3] flex items-center justify-center text-[#666666] mb-3 shadow-2xs">
                  <CameraIcon size={22} className="text-[#666666]" />
                </div>
                <p className="text-sm font-medium text-[#0E0F10]">
                  {isIt ? "Nessuna foto registrata" : "No photos registered"}
                </p>
                <p className="text-xs text-[#888888] mt-1 max-w-xs leading-relaxed">
                  {isIt
                    ? "Scatta una foto o scegli dalla galleria per iniziare l'analisi forense."
                    : "Take a photo or choose from library to begin forensic analysis."}
                </p>
              </div>
            )}
            {isUploading && (
              <div className="absolute inset-0 bg-[#0E0F10]/60 flex items-center justify-center text-white text-xs font-medium backdrop-blur-xs z-20">
                {isIt ? "Caricamento archivio protetto..." : "Uploading to secure storage..."}
              </div>
            )}
            {isAnalyzing && <ImpactaAnalysisLoader isIt={isIt} />}
          </div>

          <div className="flex items-center justify-between text-sm text-[#666666] pt-1">
            <span>
              {evidenceCount}{" "}
              {isIt
                ? evidenceCount === 1
                  ? "foto registrata"
                  : "foto registrate"
                : evidenceCount === 1
                ? "photo registered"
                : "photos registered"}
              {evidenceCount > 1 && (
                <span className="font-mono text-xs text-[#888888] ml-2">
                  ({currentIndex + 1} / {evidenceCount})
                </span>
              )}
            </span>
            <span className="text-xs text-neutral-400">
              {isIt ? "Archiviazione sicura" : "Secure storage"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
