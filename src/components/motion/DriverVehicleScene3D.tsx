"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * DriverVehicleScene3D (V5.4 Final Cinematic Spatial Accident Reconstruction):
 *
 * Implements Rule 13 & Rule 7:
 * - Abstract premium accident reconstruction in genuine 3D space (perspective, preserve-3d, translateZ).
 * - Refined technical blueprint contours, trajectory vector, impact zone, and spatial viewfinder brackets.
 * - HYBRID MOTION ARCHITECTURE: Triggered on scroll into view, runs as an authored time-based timeline (~1.3s).
 * - Objects rotate, translate, cross Z-space, and resolve cleanly into a balanced resting state.
 * - Zero invented telemetry; strictly canonical indicators.
 */
export function DriverVehicleScene3D() {
  const { locale } = useLanguage();
  const isIt = locale === "it";

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const blueprintRef = useRef<SVGGElement>(null);
  const trajectoryRef = useRef<SVGPathElement>(null);
  const impactZoneRef = useRef<SVGGElement>(null);
  const bracketGroupRef = useRef<SVGGElement>(null);
  const statusRailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    const blueprint = blueprintRef.current;
    const trajectory = trajectoryRef.current;
    const impact = impactZoneRef.current;
    const brackets = bracketGroupRef.current;
    const status = statusRailRef.current;

    if (!container || !card) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(card, { rotateY: -3, rotateX: 2, z: 0 });
      if (blueprint) gsap.set(blueprint, { opacity: 1, z: 0 });
      if (trajectory) gsap.set(trajectory, { opacity: 1, strokeDashoffset: 0 });
      if (impact) gsap.set(impact, { opacity: 1, scale: 1 });
      if (brackets) gsap.set(brackets, { opacity: 1, scale: 1 });
      if (status) gsap.set(status, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Initial Spatial Stance: angled in 3D perspective
      gsap.set(card, {
        rotateY: -14,
        rotateX: 8,
        z: -30,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      });

      if (blueprint) {
        gsap.set(blueprint, { y: 20, opacity: 0 });
      }
      if (trajectory) {
        gsap.set(trajectory, { strokeDashoffset: 120, opacity: 0 });
      }
      if (impact) {
        gsap.set(impact, { scale: 0.6, opacity: 0 });
      }
      if (brackets) {
        gsap.set(brackets, { scale: 1.2, opacity: 0 });
      }
      if (status) {
        gsap.set(status, { y: 12, opacity: 0 });
      }

      // 2. Hybrid Timeline: Triggered by viewport entry, executes time-based choreography
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 78%",
          once: true,
        },
      });

      // Step A: Spatial card turns smoothly toward the viewer
      tl.to(
        card,
        {
          rotateY: -4,
          rotateX: 2,
          z: 0,
          duration: 1.1,
          ease: "power3.out",
        },
        0
      )
        // Step B: Technical automotive blueprint arrives from depth
        .to(
          blueprint,
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power2.out",
          },
          0.2
        )
        // Step C: Trajectory vector draws into contact point
        .to(
          trajectory,
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.inOut",
          },
          0.5
        )
        // Step D: Impact focal zone illuminates
        .to(
          impact,
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.6)",
          },
          0.7
        )
        // Step E: Four spatial camera brackets converge and lock into place
        .to(
          brackets,
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          0.8
        )
        // Step F: Verification status rail confirms alignment
        .to(
          status,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          0.95
        );
      // Resolves into a crisp, stable resting state!
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex justify-center [perspective:1200px] select-none py-4"
    >
      <div
        ref={cardRef}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full max-w-sm sm:max-w-md bg-[#0F1013] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] text-white space-y-6"
      >
        {/* Layer 1: Header */}
        <div
          className="pb-4 border-b border-white/10 space-y-1"
          style={{ transform: "translateZ(16px)" }}
        >
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/50 block">
            {isIt ? "RILIEVO SPAZIALE" : "SPATIAL RECONSTRUCTION"}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
            {isIt ? "Inquadra l'area dell'impatto." : "Capture the impact area."}
          </h3>
        </div>

        {/* Layer 2: 3D Technical Blueprint Stage */}
        <div
          className="py-2 flex flex-col items-center justify-center"
          style={{ transform: "translateZ(32px)" }}
        >
          <div className="relative w-full aspect-[4/3] max-w-[320px] rounded-xl bg-[#08090B] border border-white/15 flex items-center justify-center overflow-hidden p-3">
            {/* Ambient Technical Watermarks */}
            <div className="absolute top-3 left-3 text-[10px] font-mono text-white/40 tracking-wider">
              {isIt ? "ORIENTAMENTO ASSE" : "ROADWAY HEADING"}
            </div>
            <div className="absolute top-3 right-3 text-[10px] font-mono text-emerald-400 font-semibold tracking-wider">
              {isIt ? "CALIBRATO" : "ALIGNED"}
            </div>

            {/* Architectural Automotive SVG Blueprint */}
            <svg
              viewBox="0 0 280 200"
              className="w-full h-full overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Roadway reference grid */}
              <line x1="20" y1="100" x2="260" y2="100" stroke="#1D2026" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="140" y1="20" x2="140" y2="180" stroke="#1D2026" strokeWidth="1" strokeDasharray="4 4" />

              {/* Blueprint Group */}
              <g ref={blueprintRef}>
                {/* Vehicle Chassis Outline (Architectural Blueprint) */}
                <path
                  d="M 70,100 C 70,72 82,64 115,64 L 175,64 C 208,64 220,74 220,100 C 220,126 208,136 175,136 L 115,136 C 82,136 70,128 70,100 Z"
                  stroke="#3E424C"
                  strokeWidth="1.5"
                  fill="#111317"
                />

                {/* Windshield & Cabin Glass Geometry */}
                <path
                  d="M 108,74 L 165,74 C 174,74 182,80 182,100 C 182,120 174,126 165,126 L 108,126 C 104,114 104,86 108,74 Z"
                  stroke="#292D35"
                  strokeWidth="1.2"
                  fill="#0B0C0E"
                />

                {/* Structural Longitudinal Center Line */}
                <line x1="112" y1="100" x2="190" y2="100" stroke="#2D313A" strokeWidth="1" strokeDasharray="3 3" />

                {/* Front Left Fender Contact Highlight Panel */}
                <path
                  d="M 70,100 C 70,82 78,68 98,66"
                  stroke="#7A8090"
                  strokeWidth="2"
                />
              </g>

              {/* Trajectory Approach Vector */}
              <path
                ref={trajectoryRef}
                d="M 42,42 C 55,54 68,68 85,82"
                stroke="#DC2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="120"
                strokeDashoffset="0"
              />

              {/* Impact Zone Pulse Ring */}
              <g ref={impactZoneRef}>
                <circle cx="85" cy="82" r="14" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="85" cy="82" r="5" fill="#DC2626" />
              </g>

              {/* Four Viewfinder Brackets Converging in Spatial Assembly */}
              <g ref={bracketGroupRef} style={{ transformOrigin: "85px 82px" }}>
                {/* Top-left bracket */}
                <path d="M 58,62 L 58,52 L 68,52" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
                {/* Top-right bracket */}
                <path d="M 108,52 L 118,52 L 118,62" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
                {/* Bottom-left bracket */}
                <path d="M 58,102 L 58,112 L 68,112" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
                {/* Bottom-right bracket */}
                <path d="M 118,102 L 118,112 L 108,112" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
              </g>
            </svg>

            {/* Bottom Status Pill */}
            <div className="absolute bottom-3 text-center">
              <span className="text-[10px] font-mono text-white/80 bg-black/70 backdrop-blur px-3 py-1 rounded border border-white/10 uppercase tracking-wider">
                {isIt ? "Punto d'urto localizzato" : "Contact zone aligned"}
              </span>
            </div>
          </div>
        </div>

        {/* Layer 3: Authoritative Bottom Action Rail */}
        <div
          ref={statusRailRef}
          className="pt-2 border-t border-white/10 flex items-center justify-between text-xs"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-medium text-white">
              {isIt ? "4 prospetti verificati" : "4 perspectives calibrated"}
            </span>
          </div>
          <span className="text-white/50 text-[11px] font-mono">
            {isIt ? "Pronto per l'inoltro" : "Dossier ready"}
          </span>
        </div>
      </div>
    </div>
  );
}
