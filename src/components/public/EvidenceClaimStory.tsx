"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import {
  CameraIcon,
  ActivityIcon,
  LayersIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
} from "@/components/icons/Icons";

export function EvidenceClaimStory() {
  const { t } = useLanguage();
  const [activeStage, setActiveStage] = useState<1 | 2 | 3 | 4>(1);

  const stages = [
    {
      id: 1 as const,
      num: "01",
      title: t("evidenceStory.stage1Title"),
      desc: t("evidenceStory.stage1Desc"),
      tag: "Roadside Ingestion",
    },
    {
      id: 2 as const,
      num: "02",
      title: t("evidenceStory.stage2Title"),
      desc: t("evidenceStory.stage2Desc"),
      tag: "Demo Telemetry Fusion",
    },
    {
      id: 3 as const,
      num: "03",
      title: t("evidenceStory.stage3Title"),
      desc: t("evidenceStory.stage3Desc"),
      tag: "Spatial Trajectory",
    },
    {
      id: 4 as const,
      num: "04",
      title: t("evidenceStory.stage4Title"),
      desc: t("evidenceStory.stage4Desc"),
      tag: "Structured Claim Package",
    },
  ];

  return (
    <section className="py-24 sm:py-36 bg-[#F4F5F3] border-y border-[#D7D9D8] text-[#090A0A] relative overflow-hidden">
      <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24 space-y-4">
          <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-[#6F7375]">
            {t("evidenceStory.sectionKicker")}
          </p>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#090A0A] leading-[1.04] uppercase">
            {t("evidenceStory.sectionTitle")}
          </h2>
          <p className="text-lg sm:text-xl text-[#6F7375] font-normal leading-relaxed">
            {t("evidenceStory.sectionSubtitle")}
          </p>
        </div>

        {/* 4 Interactive Transformation Stages (Open Asymmetric Architecture) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Stage Selector Tabs */}
          <div className="lg:col-span-5 space-y-4">
            {stages.map((stage) => {
              const isActive = activeStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  className={`w-full text-left p-6 sm:p-8 transition-all border text-[#090A0A] ${
                    isActive
                      ? "bg-white border-[#090A0A] shadow-sm"
                      : "bg-transparent border-[#D7D9D8] hover:border-[#6F7375] opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#6F7375]">
                      {stage.num} / 04
                    </span>
                    <span className="text-xs font-mono tracking-wider text-[#6F7375] uppercase">
                      {stage.tag}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#6F7375] leading-relaxed font-normal">
                    {stage.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Visual Transformation Stage Canvas */}
          <div className="lg:col-span-7 bg-white border border-[#D7D9D8] p-6 sm:p-10 min-h-[560px] flex flex-col justify-between">
            {/* Stage 1: Roadside Ingestion */}
            {activeStage === 1 && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex justify-between items-center text-xs font-mono tracking-wider text-[#6F7375] pb-4 border-b border-[#D7D9D8]">
                  <span>CAMERA INGESTION &amp; GNSS FIX</span>
                  <span>4 PHOTOS CONFIRMED</span>
                </div>
                <div className="relative aspect-[16/9] w-full bg-[#171819] overflow-hidden">
                  <Image
                    src="/images/evidence-scene.jpg"
                    alt="Roadside evidence capture"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-[#090A0A]/85 backdrop-blur-sm text-white p-4 text-xs font-mono flex justify-between items-center">
                    <span>LAT 45.4642° N, LON 9.1900° E</span>
                    <span>TIMESTAMP: 14:32:08 UTC</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono text-[#6F7375]">
                  <div className="p-3 border border-[#D7D9D8]">
                    <span className="block text-[#090A0A] font-bold">FRONT IMPACT ZONE</span>
                    45° angle confirmed
                  </div>
                  <div className="p-3 border border-[#D7D9D8]">
                    <span className="block text-[#090A0A] font-bold">COUNTERPARTY PLATE</span>
                    Captured &amp; OCR verified
                  </div>
                </div>
              </div>
            )}

            {/* Stage 2: Demo Telemetry Fusion */}
            {activeStage === 2 && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex justify-between items-center text-xs font-mono tracking-wider text-[#6F7375] pb-4 border-b border-[#D7D9D8]">
                  <span>10Hz CAN-BUS DEACCELERATION CURVE</span>
                  <span className="text-[#090A0A] font-bold">DEMO TELEMETRY</span>
                </div>
                <div className="p-6 bg-[#F4F5F3] border border-[#D7D9D8] space-y-4">
                  <div className="flex justify-between text-xs font-mono text-[#6F7375]">
                    <span>BRAKING VECTOR (G-FORCE)</span>
                    <span className="text-[#090A0A] font-bold">-0.82 G PEAK</span>
                  </div>
                  <div className="h-28 w-full flex items-end gap-1.5 pt-4">
                    {[12, 18, 22, 35, 78, 92, 85, 45, 20, 10, 5, 0].map((val, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-[#090A0A] transition-all duration-300"
                        style={{ height: `${val}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs font-mono text-[#6F7375] pt-2 border-t border-[#D7D9D8]">
                    <span>T - 2.5s</span>
                    <span>IMPACT T = 0</span>
                    <span>T + 1.0s</span>
                  </div>
                </div>
                <p className="text-xs text-[#6F7375] font-mono leading-relaxed">
                  * Telemetry displayed from synthetic simulation fixture for technical validation.
                </p>
              </div>
            )}

            {/* Stage 3: Spatial Trajectory Overhead */}
            {activeStage === 3 && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex justify-between items-center text-xs font-mono tracking-wider text-[#6F7375] pb-4 border-b border-[#D7D9D8]">
                  <span>OVERHEAD KINEMATIC RECONSTRUCTION</span>
                  <span>ROADWAY CALIBRATED</span>
                </div>
                <div className="relative aspect-[16/9] w-full bg-[#171819] flex items-center justify-center p-8 overflow-hidden">
                  <div className="w-full h-full border border-white/20 relative flex items-center justify-center">
                    {/* Roadway lines */}
                    <div className="w-full h-0.5 bg-white/40 absolute" />
                    <div className="w-0.5 h-full bg-white/40 absolute" />
                    {/* Vehicle A */}
                    <div className="absolute top-1/3 left-1/3 p-2 bg-white text-[#090A0A] text-xs font-mono font-bold">
                      VEHICLE A (GOLF VIII)
                    </div>
                    {/* Vehicle B */}
                    <div className="absolute bottom-1/3 right-1/3 p-2 border border-white text-white text-xs font-mono">
                      VEHICLE B
                    </div>
                  </div>
                </div>
                <div className="text-xs font-mono text-[#6F7375]">
                  Calculated conflict angle: 84° • Relative speed differential: 14 km/h
                </div>
              </div>
            )}

            {/* Stage 4: Structured Claim Package (Ready for Human Review) */}
            {activeStage === 4 && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex justify-between items-center text-xs font-mono tracking-wider text-[#6F7375] pb-4 border-b border-[#D7D9D8]">
                  <span>EUROPEAN ACCIDENT STATEMENT (CAI BOX 12)</span>
                  <span className="text-emerald-700 font-bold">STRUCTURED PACKAGE</span>
                </div>
                <div className="p-6 border border-[#090A0A] bg-[#F4F5F3] space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon size={20} className="text-[#090A0A]" />
                    <span className="text-base font-bold uppercase tracking-tight text-[#090A0A]">
                      Claim Ready for Human Adjuster Review
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono text-[#6F7375] pt-2 border-t border-[#D7D9D8]">
                    <div>
                      <span className="block text-[#090A0A] font-semibold">CAI CIRCUMSTANCES</span>
                      Box 12 Circumstance 04 &amp; 08 flagged
                    </div>
                    <div>
                      <span className="block text-[#090A0A] font-semibold">LEGAL SAFEGUARD</span>
                      Zero automated liability decrees
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#6F7375] font-mono leading-relaxed">
                  Final claim dossier package ready for expert sign-off and insurance claims system handoff.
                </p>
              </div>
            )}

            {/* Bottom Proof Bar */}
            <div className="pt-6 border-t border-[#D7D9D8] flex items-center justify-between text-xs font-mono tracking-widest text-[#6F7375]">
              <span>ISO 27037 PROVENANCE</span>
              <span>VERIFIED EVIDENCE CHAIN</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
