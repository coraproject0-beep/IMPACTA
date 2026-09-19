"use client";

import React, { useState, useRef } from "react";
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
      tag: "10–20Hz Sensor Fusion",
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
      tag: "CAI Box 12 Dossier",
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-slate-900 text-white relative overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Background radial gradient to give deep editorial dimension without AI glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,58,138,0.3),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-3 py-1 rounded border border-blue-800">
            {t.evidenceStory.sectionKicker}
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {t.evidenceStory.sectionTitle}
          </h2>
          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
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
                    className={`w-full text-left p-5 rounded-2xl transition-all border ${
                      isActive
                        ? "bg-slate-800/90 border-blue-500 shadow-lg shadow-blue-950/40"
                        : "bg-slate-950/50 border-slate-800 hover:bg-slate-800/40 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-blue-400">
                        {stage.num}
                      </span>
                      <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700">
                        {stage.tag}
                      </span>
                    </div>
                    <h3
                      className={`text-base sm:text-lg font-bold mb-1 ${
                        isActive ? "text-white" : "text-slate-300"
                      }`}
                    >
                      {stage.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {stage.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>{t.evidenceStory.interactiveNotice}</span>
            </div>
          </div>

          {/* Right Column: Dynamic Stage Visualizer */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            {/* STAGE 1: Roadside Scene */}
            {activeStage === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-xs text-blue-400 font-mono">
                    <CameraIcon size={16} />
                    <span>Raw Optical Evidence • 4 Angles</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    GPS: 43.7731° N, 11.2560° E (Florence)
                  </span>
                </div>

                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
                  <Image
                    src="/images/evidence-scene.jpg"
                    alt="Florence roundabout collision scene"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 700px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <div className="bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700">
                      <span>Vehicle A: Golf VIII (GF492XP)</span>
                    </div>
                    <div className="bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700">
                      <span>Vehicle B: Fiat 500 (EZ719TR)</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-500 block font-mono text-[10px] uppercase">
                      Scene Geometry
                    </span>
                    <span className="text-slate-200 font-semibold">
                      Dual-lane urban roundabout with radial entry
                    </span>
                  </div>
                  <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-500 block font-mono text-[10px] uppercase">
                      Integrity Hash
                    </span>
                    <span className="text-blue-400 font-mono text-[11px]">
                      sha256:8f4c...91b2 (IndexedDB Verified)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 2: Sensor Fusion */}
            {activeStage === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-xs text-blue-400 font-mono">
                    <ActivityIcon size={16} />
                    <span>Telemetry &amp; Deceleration Fusion</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400">
                    Confidence: 94% Impact Correlated
                  </span>
                </div>

                {/* Deceleration Curve Visualizer */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300">
                      Deceleration Pulse (10–20Hz OEM CAN-Bus)
                    </span>
                    <span className="font-mono text-rose-400 font-bold">
                      Peak: -4.2g @ 118ms
                    </span>
                  </div>

                  {/* SVG Kinematic Curve */}
                  <div className="h-32 w-full relative">
                    <svg
                      viewBox="0 0 500 120"
                      className="w-full h-full stroke-blue-500 fill-none"
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
                        stroke="#f43f5e"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                    </svg>
                    <div className="absolute top-2 left-[42%] text-[10px] font-mono text-rose-400 bg-slate-950 px-2 py-0.5 rounded border border-rose-900">
                      Contact: 08:42:15.118
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 bg-slate-950 rounded-lg">
                      <span className="text-slate-500 block text-[10px]">Pre-Impact Speed</span>
                      <span className="text-white font-mono font-bold">22.4 km/h</span>
                    </div>
                    <div className="p-2 bg-slate-950 rounded-lg">
                      <span className="text-slate-500 block text-[10px]">Delta-V</span>
                      <span className="text-white font-mono font-bold">14.1 km/h</span>
                    </div>
                    <div className="p-2 bg-slate-950 rounded-lg">
                      <span className="text-slate-500 block text-[10px]">Belt Pre-Tensioner</span>
                      <span className="text-emerald-400 font-mono font-bold">Fired (Driver)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Deceleration signature proves low-speed lateral impact without rollover hazard, correlating directly with the front bumper plastic deformation visible in roadside photo #2.
                </p>
              </div>
            )}

            {/* STAGE 3: Trajectory Reconstruction */}
            {activeStage === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-xs text-blue-400 font-mono">
                    <LayersIcon size={16} />
                    <span>Kinematic Trajectory Reconstruction</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Neutral Physics Model
                  </span>
                </div>

                {/* Schematic Roundabout Diagram */}
                <div className="relative aspect-[16/10] rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center p-6 overflow-hidden">
                  <svg viewBox="0 0 400 240" className="w-full h-full">
                    {/* Roundabout Island */}
                    <circle cx="180" cy="120" r="55" fill="#0f172a" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" />
                    <circle cx="180" cy="120" r="28" fill="#1e293b" stroke="#475569" strokeWidth="2" />

                    {/* Road lanes */}
                    <path d="M 0,120 L 125,120" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />
                    <path d="M 320,60 L 225,100" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />

                    {/* Trajectory Vehicle A (Golf VIII) */}
                    <path d="M 125,170 C 140,165 170,175 190,175" fill="none" stroke="#3b82f6" strokeWidth="3" />
                    <rect x="180" y="165" width="22" height="12" rx="3" fill="#2563eb" stroke="#93c5fd" />
                    <text x="175" y="195" fill="#93c5fd" fontSize="9" fontFamily="monospace">Vehicle A (Golf)</text>

                    {/* Trajectory Vehicle B (Fiat 500) */}
                    <path d="M 270,135 L 205,160" fill="none" stroke="#f59e0b" strokeWidth="3" />
                    <rect x="195" y="152" width="18" height="11" rx="3" fill="#d97706" stroke="#fcd34d" transform="rotate(25, 204, 157)" />
                    <text x="215" y="145" fill="#fcd34d" fontSize="9" fontFamily="monospace">Vehicle B (Fiat)</text>

                    {/* Point of Contact Star */}
                    <circle cx="196" cy="165" r="4" fill="#ef4444" />
                  </svg>
                  <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-400 bg-slate-950/80 px-2 py-1 rounded border border-slate-800">
                    Contact Vector: 45° Oblique Lateral
                  </div>
                </div>

                <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-white block mb-1">Neutral Factual Statement:</span>
                  &ldquo;Vehicle A was navigating inside the circulatory roadway. Vehicle B entered the roundabout from the right-hand ingress lane before physical contact occurred at the front-left wing.&rdquo;
                </div>
              </div>
            )}

            {/* STAGE 4: Claim Dossier */}
            {activeStage === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                    <CheckCircleIcon size={16} />
                    <span>European Claim Dossier Normalized</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Dossier: CLM-2026-0841
                  </span>
                </div>

                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">
                        Assigned Insurer
                      </span>
                      <span className="text-sm font-bold text-white">
                        Aura Mutua Assicurazioni
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">
                        Adjuster Status
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800">
                        Ready for Human Sign-Off
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[11px]">CAI Box 12 (Vehicle A)</span>
                      <span className="font-semibold text-slate-200">Circumstance 7</span>
                      <span className="text-slate-400 text-[11px] block">Circulating in roundabout</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">CAI Box 12 (Vehicle B)</span>
                      <span className="font-semibold text-slate-200">Circumstance 6</span>
                      <span className="text-slate-400 text-[11px] block">Entering from side road</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheckIcon size={16} className="text-blue-400" />
                      <span className="text-slate-300 font-medium">
                        Epistemic demarcation verified
                      </span>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px]">
                      Zero Automated Fault
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  The claim dossier is fully assembled with encrypted telemetry, tamper-evident photos, and objective kinematics. Adjusters settle in minutes with zero ambiguity.
                </p>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setActiveStage(s as 1 | 2 | 3 | 4)}
                    className={`w-7 h-7 rounded-lg font-mono text-xs font-bold transition-colors ${
                      activeStage === s
                        ? "bg-blue-600 text-white"
                        : "bg-slate-900 text-slate-500 hover:text-slate-300 hover:bg-slate-800"
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
                className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold"
              >
                <span>{activeStage < 4 ? "Next stage" : "Restart from stage 1"}</span>
                <ArrowRightIcon size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
