"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { DriverDraft } from "@/types/driver";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRightIcon } from "@/components/icons/Icons";
import { Emergency112DemoModal } from "@/features/driver/components/Emergency112DemoModal";
import { EmergencyRadar } from "@/components/ui/EmergencyRadar";

interface Phase1SafetyProps {
  draft: DriverDraft;
  onUpdate: (patch: Partial<DriverDraft>) => void;
  onNext: () => void;
}

export function Phase1Safety({ onUpdate, onNext }: Phase1SafetyProps) {
  const { language } = useLanguage();
  const isIt = language === "it";
  const [show112Modal, setShow112Modal] = useState(false);

  // Desktop spatial roadside scene ref
  const spatialSceneRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const checklistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = spatialSceneRef.current;
    const headline = headlineRef.current;
    const checklist = checklistRef.current;
    if (!scene || !headline || !checklist) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Gentle, calm entrance for safety screen
      gsap.fromTo(
        headline,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
      );

      gsap.fromTo(
        checklist.children,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.15 }
      );

      // Subtle spatial roadside scene moves 15-25px in depth on entry, then rests completely
      const svgElements = scene.querySelectorAll(".roadside-elem");
      gsap.fromTo(
        svgElements,
        { opacity: 0, y: 25, z: -30 },
        { opacity: 1, y: 0, z: 0, duration: 1, stagger: 0.12, ease: "power2.out", delay: 0.2 }
      );
    }, scene);

    return () => ctx.revert();
  }, []);

  const handleContinue = () => {
    onUpdate({
      safetyConfirmed: true,
      anyInjured: false,
    });
    onNext();
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-4 sm:py-6 selection:bg-[#0E0F10] selection:text-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Direct Safety Information & Action */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#777777] block">
              {isIt ? "FASE 01 • SICUREZZA PERSONE" : "STAGE 01 • HUMAN SAFETY CHECK"}
            </span>
            <h1
              ref={headlineRef}
              className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0E0F10] leading-[1.04]"
            >
              {isIt ? "PRIMA LA SICUREZZA." : "SAFETY FIRST."}
            </h1>
            <p className="text-base sm:text-lg text-[#555555] font-light leading-relaxed max-w-xl">
              {isIt
                ? "Assicurati che tutti siano fuori pericolo prima di documentare l'incidente. Raggiungi un punto protetto fuori dalla traiettoria del traffico."
                : "Make sure everyone is out of danger before documenting the incident. Move to a protected area away from active roadway traffic."}
            </p>
          </div>

          {/* Roadside Precautions: Direct 3 Rows with Thin Separators (ZERO WHITE CARD) */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0E0F10] block">
              {isIt ? "Misure immediate di sicurezza sul posto:" : "Immediate roadside safety precautions:"}
            </span>

            <div ref={checklistRef} className="border-t border-[#E5E5E3]">
              {/* Row 01 */}
              <div className="py-4 border-b border-[#E5E5E3] flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs font-bold text-[#0E0F10] tracking-widest">01</span>
                  <span className="text-sm sm:text-base text-[#0E0F10] font-medium">
                    {isIt ? "Indossa il giubbotto catarifrangente" : "Put on high-visibility vest"}
                  </span>
                </div>
                <span className="text-[11px] text-[#777777] uppercase font-light">
                  {isIt ? "Prima di scendere" : "Before exiting"}
                </span>
              </div>

              {/* Row 02 */}
              <div className="py-4 border-b border-[#E5E5E3] flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs font-bold text-[#0E0F10] tracking-widest">02</span>
                  <span className="text-sm sm:text-base text-[#0E0F10] font-medium">
                    {isIt ? "Aziona le 4 frecce di emergenza" : "Activate hazard warning lights"}
                  </span>
                </div>
                <span className="text-[11px] text-[#777777] uppercase font-light">
                  {isIt ? "Segnala il veicolo" : "Signal vehicle"}
                </span>
              </div>

              {/* Row 03 */}
              <div className="py-4 border-b border-[#E5E5E3] flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs font-bold text-[#0E0F10] tracking-widest">03</span>
                  <span className="text-sm sm:text-base text-[#0E0F10] font-medium">
                    {isIt ? "Posiziona il triangolo di emergenza" : "Place warning triangle"}
                  </span>
                </div>
                <span className="text-[11px] text-[#777777] uppercase font-light">
                  {isIt ? "50m a monte" : "50m behind"}
                </span>
              </div>
            </div>
          </div>

          {/* Action Area: Primary Safe Progression + High-Vis 112 Demo Trigger */}
          <div className="space-y-4 pt-2">
            {/* Primary Action Button: Clean Inversion, Directional Arrow Response */}
            <button
              type="button"
              onClick={handleContinue}
              className="w-full py-4 px-6 bg-[#0E0F10] text-white hover:bg-black transition-colors duration-200 flex items-center justify-between group active:scale-[0.99] select-none shadow-sm"
            >
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                {isIt ? "SÌ, SIAMO AL SICURO — PROCEDI AL REPORT" : "YES, WE ARE SAFE — PROCEED TO REPORT"}
              </span>
              <ArrowRightIcon
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </button>

            {/* Distinctive Emergency 112 Action with Expanding Canvas Radar */}
            <button
              type="button"
              onClick={() => setShow112Modal(true)}
              className="w-full py-3.5 px-5 bg-white border border-[#E5E5E3] hover:border-rose-400 text-[#0E0F10] transition-colors flex items-center justify-between group select-none"
            >
              <div className="flex items-center gap-3.5">
                {/* Emergency Radar: Red core + 3 expanding rings */}
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <EmergencyRadar size={28} showSweep={true} />
                </div>
                <div className="text-left">
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-tight text-[#0E0F10] block group-hover:text-rose-700 transition-colors">
                    {isIt ? "Qualcuno ha bisogno di aiuto — Simulazione 112" : "Someone needs help — 112 Demo"}
                  </span>
                  <span className="text-[11px] text-[#777777] font-light block">
                    {isIt ? "Simulatore di chiamata di emergenza e geolocalizzazione" : "Emergency call simulation and coordinate broadcast"}
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                {isIt ? "Avvia →" : "Start →"}
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Subtle Spatial Roadside Safety Scene (Desktop Only, Graphite Lines) */}
        <div
          ref={spatialSceneRef}
          className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center pt-8 [perspective:1200px]"
        >
          <div className="w-full aspect-[4/3] border border-[#E5E5E3] bg-[#FAFAFA] p-6 flex flex-col justify-between select-none [transform-style:preserve-3d]">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#888888]">
              <span>ROAD_SAFETY_MONITOR</span>
              <span>STANDBY_CALM</span>
            </div>

            {/* Roadside Spatial Wireframe Graphic */}
            <svg
              viewBox="0 0 360 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto my-auto"
            >
              {/* Perspective Road lines */}
              <line className="roadside-elem" x1="20" y1="200" x2="160" y2="40" stroke="#CCCCCC" strokeWidth="1" />
              <line className="roadside-elem" x1="340" y1="200" x2="200" y2="40" stroke="#CCCCCC" strokeWidth="1" />
              <line className="roadside-elem" x1="180" y1="200" x2="180" y2="40" stroke="#E0E0DE" strokeWidth="1" strokeDasharray="6 6" />

              {/* Road Shoulder Zone */}
              <line className="roadside-elem" x1="5" y1="200" x2="145" y2="40" stroke="#0E0F10" strokeWidth="1.5" />

              {/* Minimal Graphite Vehicle Silhouette on Shoulder */}
              <g className="roadside-elem" transform="translate(60, 110)">
                <rect x="0" y="10" width="70" height="28" rx="2" stroke="#555555" strokeWidth="1.5" fill="#FFFFFF" />
                <path d="M12 10 L22 0 L52 0 L60 10 Z" stroke="#555555" strokeWidth="1.2" fill="#F4F4F3" />
                <circle cx="16" cy="38" r="6" fill="#0E0F10" />
                <circle cx="56" cy="38" r="6" fill="#0E0F10" />
                {/* Hazard lights subtle pulse indicator */}
                <circle cx="6" cy="18" r="2" fill="#EAB308" />
                <circle cx="64" cy="18" r="2" fill="#EAB308" />
              </g>

              {/* Warning Triangle Placement 50m behind */}
              <g className="roadside-elem" transform="translate(42, 175)">
                <polygon points="12,0 24,20 0,20" stroke="#DC2626" strokeWidth="2" fill="#FEF2F2" />
                <polygon points="12,4 20,17 4,17" stroke="#DC2626" strokeWidth="1" fill="#DC2626" fillOpacity="0.2" />
              </g>

              {/* Safe Pedestrian Zone Marker */}
              <g className="roadside-elem" transform="translate(25, 80)">
                <circle cx="8" cy="8" r="4" fill="#0E0F10" />
                <line x1="8" y1="12" x2="8" y2="24" stroke="#0E0F10" strokeWidth="1.5" />
                <line x1="4" y1="16" x2="12" y2="16" stroke="#0E0F10" strokeWidth="1.5" />
                <line x1="8" y1="24" x2="4" y2="34" stroke="#0E0F10" strokeWidth="1.5" />
                <line x1="8" y1="24" x2="12" y2="34" stroke="#0E0F10" strokeWidth="1.5" />
              </g>
            </svg>

            <div className="pt-2 border-t border-[#E5E5E3] flex items-center justify-between text-[11px] text-[#666666]">
              <span>{isIt ? "Veicolo in sicurezza su banchina" : "Vehicle secured on shoulder"}</span>
              <span className="font-semibold text-[#0E0F10]">{isIt ? "Presidi attivi" : "Safety protocol ready"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 112 Demo Modal */}
      <Emergency112DemoModal
        isOpen={show112Modal}
        onClose={() => setShow112Modal(false)}
      />
    </div>
  );
}
