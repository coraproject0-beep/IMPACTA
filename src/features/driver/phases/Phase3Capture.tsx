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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStatusText, setAnalysisStatusText] = useState<string>("");

  const evidenceItems = draft.evidenceItems || [];
  const evidenceCount = evidenceItems.length > 0 ? evidenceItems.length : 1;
  const latestPhotoUrl =
    evidenceItems.length > 0
      ? evidenceItems[evidenceItems.length - 1].previewUrl
      : "/demo/scenario-01/01-overview.png";

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
      formData.append("claimId", draft.isDemoIncident ? "CLM-DEMO-001" : "CLM-APP-DRAFT");
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
          categoryLabel: isIt ? "Danno Veicolo A (Golf scura)" : "Vehicle A Damage Detail",
          previewUrl: "/demo/scenario-01/02-vehicle-a-damage.png",
          timestamp: "2026-09-26T14:23:45Z",
          isRealUpload: true,
          notes: "Danno parafango e paraurti anteriore destro su VW Golf scura",
        },
        {
          id: "EVD-DEMO-003",
          category: "DAMAGE_B",
          categoryLabel: isIt ? "Danno Veicolo B (Golf argento)" : "Vehicle B Damage Detail",
          previewUrl: "/demo/scenario-01/03-vehicle-b-damage.png",
          timestamp: "2026-09-26T14:24:20Z",
          isRealUpload: true,
          notes: "Danno parafango e fiancata anteriore sinistra su VW Golf argento",
        },
        {
          id: "EVD-DEMO-004",
          category: "ROAD_SIGNS",
          categoryLabel: isIt ? "Segnaletica e contesto stradale" : "Road Signs & Context",
          previewUrl: "/demo/scenario-01/04-road-context.png",
          timestamp: "2026-09-26T14:25:00Z",
          isRealUpload: true,
          notes: "Segnaletica verticale e orizzontale incrocio",
        },
      ];

      for (const item of canonicalItems) {
        await onAddEvidence(item);
      }
      onUpdate({
        isDemoIncident: true,
        incidentDate: "2026-09-26",
        incidentTime: "14:22",
        location: {
          city: "Milano",
          street: "Milan metropolitan area, Italy (Intersection)",
          postalCode: "20100",
          latitude: 45.4642,
          longitude: 9.19,
          junctionType: "INTERSECTION",
        },
        counterparty: {
          driverName: "Claire Anderson",
          phone: "+39 347 9876 543",
          plate: "EF 456 GH",
          makeModel: "Volkswagen Golf VII (Silver)",
          insurer: "Allianz Italia",
          policyNumber: "ALZ-9912-38410",
          hasInfo: true,
        },
        statement:
          "I was travelling straight through the intersection when the other vehicle entered my path.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleContinue = async () => {
    setIsAnalyzing(true);
    setAnalysisStatusText(
      isIt
        ? "Invocazione server-side Gemini 3.8 Flash..."
        : "Invoking Gemini 3.8 Flash multimodal analysis server-side..."
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
          vehicleA: { make: "Volkswagen", model: "Golf VII", plate: "AB 123 CD" },
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

          {/* Canonical Scenario 01 Quick Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleLoadCanonicalScenario}
              className="w-full text-left p-3.5 rounded-xl border border-[#0E0F10]/20 bg-[#0E0F10]/5 hover:bg-[#0E0F10]/10 transition-colors flex items-center justify-between text-xs font-semibold text-[#0E0F10]"
            >
              <span>
                {isIt
                  ? "⚡ Carica prove canoniche Scenario 01 (4 foto)"
                  : "⚡ Load Scenario 01 Canonical Evidence (4 photos)"}
              </span>
              <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-[#0E0F10] text-white">
                Golden Demo
              </span>
            </button>
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
              onClick={handleTriggerUpload}
              className="w-full text-left py-2 text-base font-normal text-[#0E0F10] hover:text-[#666666] transition-colors"
            >
              {isIt ? "Scegli dalla galleria" : "Choose from library"}
            </button>

            <div className="border-t border-[#E5E5E3] pt-6" />

            {/* Primary Continue Action with Analysis invocation */}
            <button
              type="button"
              onClick={handleContinue}
              disabled={isAnalyzing}
              className="w-full text-left py-2 flex items-center justify-between text-lg font-semibold text-[#0E0F10] hover:text-[#666666] transition-colors group disabled:opacity-50"
            >
              <span>
                {isAnalyzing
                  ? isIt
                    ? "Analisi Gemini in corso..."
                    : "Analyzing with Gemini..."
                  : isIt
                  ? "Continua all'analisi"
                  : "Continue to Analysis"}
              </span>
              <ArrowRightIcon
                size={20}
                className="text-[#0E0F10] group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Evidence Viewport */}
        <div className="lg:col-span-7 space-y-3 order-first lg:order-last">
          <div className="relative aspect-[16/11] lg:aspect-[16/10] w-full overflow-hidden rounded-2xl bg-neutral-200 border border-[#E5E5E3] shadow-xs">
            <Image
              src={latestPhotoUrl}
              alt="Collision scene documentation"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 700px"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-[#0E0F10]/60 flex items-center justify-center text-white text-xs font-medium backdrop-blur-xs">
                {isIt ? "Caricamento archivio privato..." : "Uploading to private storage..."}
              </div>
            )}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-[#0E0F10]/80 flex flex-col items-center justify-center text-white text-xs space-y-2 p-6 text-center backdrop-blur-sm">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="font-semibold text-sm">
                  {isIt ? "Analisi Multimodale Gemini 3.8 Flash" : "Gemini 3.8 Flash Multimodal Analysis"}
                </span>
                <span className="text-neutral-300 text-xs font-mono">{analysisStatusText}</span>
              </div>
            )}
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
            </span>
            <span className="font-mono text-xs text-neutral-500">
              Supabase Storage: <strong className="text-emerald-700">claim-evidence (private)</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
