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
      title: t.evidenceStory.stage1Title,
      desc: t.evidenceStory.stage1Desc,
      tag: "Roadside Ingestion",
    },
    {
      id: 2 as const,
      num: "02",
      title: t.evidenceStory.stage2Title,
      desc: t.evidenceStory.stage2Desc,
      tag: "Demo Telemetry Fusion",
    },
    {
      id: 3 as const,
      num: "03",
      title: t.evidenceStory.stage3Title,
      desc: t.evidenceStory.stage3Desc,
      tag: "Spatial Trajectory",
    },
    {
      id: 4 as const,
      num: "04",
      title: t.evidenceStory.stage4Title,
      desc: t.evidenceStory.stage4Desc,
      tag: "Structured Claim Package",
    },
  ];

  return (
    <section className="py-24 sm:py-36 bg-slate-50 border-y border-slate-200 text-slate-900 relative overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Typographic kicker without pill or border */}
        <div className="max-w-3xl mb-14 sm:mb-20 space-y-4">
          <p className="text-sm font-mono font-bold uppercase tracking-widest text-blue-700">
            {t.evidenceStory.sectionKicker}
          </p>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.08]">
            {t.evidenceStory.sectionTitle}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
            {t.evidenceStory.sectionSubtitle}
          </p>
        </div>

        {/* 4-Step Interactive Transformation Display */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Stages Navigator */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            <div className="space-y-3">
              {stages.map((stage) => {
                const isActive = activeStage === stage.id;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setActiveStage(stage.id)}
                    className={`w-full text-left p-6 rounded-2xl transition-all border ${
                      isActive
                        ? "bg-white border-blue-600 shadow-md ring-1 ring-blue-600/20"
                        : "bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300 text-slate-600"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-mono font-bold text-blue-700">
                        {stage.num}
                      </span>
                      <span className="text-xs font-mono text-slate-500 font-medium">
                        {stage.tag}
                      </span>
                    </div>
                    <h3
                      className={`text-lg sm:text-xl font-bold mb-1.5 ${
                        isActive ? "text-slate-950" : "text-slate-800"
                      }`}
                    >
                      {stage.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {stage.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 text-xs font-mono text-slate-500 flex items-center gap-2">
              <span className="text-blue-600 font-bold">→</span>
              <span>{t.evidenceStory.interactiveNotice}</span>
            </div>
          </div>

          {/* Right Column: Dynamic Stage Visualizer in Pristine Light Mode */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-sm">
            {/* STAGE 1: Roadside Scene */}
            {activeStage === 1 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2 text-sm text-blue-700 font-mono font-semibold">
                    <CameraIcon size={18} />
                    <span>Raw Optical Evidence • 4 Angles</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    GPS: 43.7731° N, 11.2560° E (Florence)
                  </span>
                </div>

                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <Image
                    src="/images/evidence-scene.jpg"
                    alt="Florence roundabout collision scene"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 700px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs sm:text-sm text-white font-medium">
                    <div className="bg-slate-950/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20">
                      <span>Vehicle A: Golf VIII (GF492XP)</span>
                    </div>
                    <div className="bg-slate-950/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20">
                      <span>Vehicle B: Fiat 500 (EZ719TR)</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-500 block font-mono text-xs uppercase font-medium">
                      Scene Geometry
                    </span>
                    <span className="text-slate-900 font-bold">
                      Dual-lane urban roundabout with radial entry
                    </span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-500 block font-mono text-xs uppercase font-medium">
                      Integrity Hash
                    </span>
                    <span className="text-blue-700 font-mono text-xs font-semibold">
                      sha256:8f4c...91b2 (IndexedDB Verified)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 2: Sensor Fusion */}
            {activeStage === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2 text-sm text-blue-700 font-mono font-semibold">
                    <ActivityIcon size={18} />
                    <span>Telemetry &amp; Deceleration Correlation</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    Synthetic Demo Telemetry
                  </span>
                </div>

                {/* Deceleration Curve Visualizer */}
                <div className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-900">
                      Deceleration Pulse (Example CAN-Bus Stream)
                    </span>
                    <span className="font-mono text-rose-600 font-bold text-xs">
                      Peak: -4.2g @ 118ms
                    </span>
                  </div>

                  {/* SVG Kinematic Curve */}
                  <div className="h-32 w-full relative">
                    <svg
                      viewBox="0 0 500 120"
                      className="w-full h-full stroke-blue-600 fill-none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M 0,60 L 150,60 L 180,62 L 200,105 L 215,115 L 230,85 L 250,60 L 500,60"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <line
                        x1="215"
                        y1="20"
                        x2="215"
                        y2="115"
                        stroke="#e11d48"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                    </svg>
                    <div className="absolute top-2 left-[42%] text-xs font-mono text-rose-700 bg-white px-2 py-0.5 rounded border border-rose-200 font-semibold shadow-xs">
                      Contact: 08:42:15.118
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                      <span className="text-slate-500 block text-xs">Pre-Impact Speed</span>
                      <span className="text-slate-950 font-mono font-bold">22.4 km/h</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                      <span className="text-slate-500 block text-xs">Principal Delta-V</span>
                      <span className="text-slate-950 font-mono font-bold">14.1 km/h</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                      <span className="text-slate-500 block text-xs">Pre-Tensioner</span>
                      <span className="text-emerald-700 font-mono font-bold">Fired (Driver)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Deceleration signature proves low-speed lateral impact without rollover hazard, correlating directly with the front bumper plastic deformation recorded in photographic capture.
                </p>
              </div>
            )}

            {/* STAGE 3: Trajectory Reconstruction */}
            {activeStage === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2 text-sm text-blue-700 font-mono font-semibold">
                    <LayersIcon size={18} />
                    <span>Kinematic Trajectory Reconstruction</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    Neutral Physics Model
                  </span>
                </div>

                {/* Schematic Roundabout Diagram */}
                <div className="relative aspect-[16/10] rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-6 overflow-hidden">
                  <svg viewBox="0 0 400 240" className="w-full h-full">
                    {/* Roundabout Island */}
                    <circle cx="180" cy="120" r="55" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" />
                    <circle cx="180" cy="120" r="28" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />

                    {/* Road lanes */}
                    <path d="M 0,120 L 125,120" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
                    <path d="M 320,60 L 225,100" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />

                    {/* Trajectory Vehicle A (Golf VIII) */}
                    <path d="M 125,170 C 140,165 170,175 190,175" fill="none" stroke="#2563eb" strokeWidth="3" />
                    <rect x="180" y="165" width="22" height="12" rx="3" fill="#2563eb" stroke="#1d4ed8" />
                    <text x="175" y="195" fill="#1e3a8a" fontSize="10" fontFamily="monospace" fontWeight="600">Vehicle A (Golf)</text>

                    {/* Trajectory Vehicle B (Fiat 500) */}
                    <path d="M 270,135 L 205,160" fill="none" stroke="#d97706" strokeWidth="3" />
                    <rect x="195" y="152" width="18" height="11" rx="3" fill="#d97706" stroke="#b45309" transform="rotate(25, 204, 157)" />
                    <text x="215" y="145" fill="#92400e" fontSize="10" fontFamily="monospace" fontWeight="600">Vehicle B (Fiat)</text>

                    {/* Point of Contact Star */}
                    <circle cx="196" cy="165" r="4" fill="#dc2626" />
                  </svg>
                  <div className="absolute bottom-3 right-3 text-xs font-mono text-slate-600 bg-white px-2 py-1 rounded border border-slate-200 shadow-xs">
                    Contact Vector: 45° Oblique Lateral
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <span className="font-bold text-slate-950 block mb-1">Neutral Factual Statement:</span>
                  &ldquo;Vehicle A was navigating inside the circulatory roadway. Vehicle B entered the roundabout from the right-hand ingress lane before physical contact occurred at the front-left wing.&rdquo;
                </div>
              </div>
            )}

            {/* STAGE 4: Claim Dossier Ready for Human Review */}
            {activeStage === 4 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2 text-sm text-emerald-700 font-mono font-semibold">
                    <CheckCircleIcon size={18} />
                    <span>European Claim Dossier Normalized</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    Dossier: CLM-2026-0841
                  </span>
                </div>

                <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-xs font-mono uppercase text-slate-500 block font-medium">
                        Assigned Insurer
                      </span>
                      <span className="text-base font-bold text-slate-950">
                        Aura Mutua Assicurazioni
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono uppercase text-slate-500 block font-medium">
                        Status
                      </span>
                      <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded">
                        Claim Ready for Human Review
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div>
                      <span className="text-slate-500 block text-xs font-medium">CAI Box 12 (Vehicle A)</span>
                      <span className="font-semibold text-slate-900">Circumstance 7</span>
                      <span className="text-slate-600 text-xs block">Circulating in roundabout</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs font-medium">CAI Box 12 (Vehicle B)</span>
                      <span className="font-semibold text-slate-900">Circumstance 6</span>
                      <span className="text-slate-600 text-xs block">Entering from side road</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <ShieldCheckIcon size={18} className="text-blue-700" />
                      <span className="text-slate-800 font-semibold">
                        Epistemic demarcation verified
                      </span>
                    </div>
                    <span className="text-slate-600 font-mono text-xs">
                      Zero Liability Automation
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  The claim dossier is fully assembled with encrypted telemetry, tamper-evident photos, and objective kinematics — structured for claims adjuster review with zero ambiguity.
                </p>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="pt-5 border-t border-slate-200 flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setActiveStage(s as 1 | 2 | 3 | 4)}
                    className={`min-h-[44px] min-w-[44px] rounded-lg font-mono text-sm font-bold transition-colors ${
                      activeStage === s
                        ? "bg-slate-950 text-white"
                        : "bg-slate-100 text-slate-600 hover:text-slate-950 hover:bg-slate-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  setActiveStage((prev) => (prev < 4 ? ((prev + 1) as 1 | 2 | 3 | 4) : 1))
                }
                className="min-h-[44px] inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-900 font-semibold px-2 py-1"
              >
                <span>{activeStage < 4 ? "Next stage" : "Restart from stage 1"}</span>
                <ArrowRightIcon size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
