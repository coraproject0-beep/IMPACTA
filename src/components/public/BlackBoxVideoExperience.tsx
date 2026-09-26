"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Math helpers
function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export default function BlackBoxVideoExperience() {
  const { t, language } = useLanguage();
  const isIt = language === "it";

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);

  const targetTimeRef = useRef(0);
  const isReadyRef = useRef(false);
  const durationRef = useRef(10.0);

  useEffect(() => {
    // 1. Reduced Motion Detection
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setReducedMotion(true);
      return;
    }

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Ensure video is paused so scroll is the sole master of currentTime
    video.pause();

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        durationRef.current = video.duration;
      }
      isReadyRef.current = true;
      setIsVideoReady(true);
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    // 2. Performant Scroll-Scrub Render Loop (Damped Interpolation)
    let rafId: number;
    const tick = () => {
      if (isReadyRef.current && video) {
        const target = targetTimeRef.current;
        const current = video.currentTime;
        const delta = target - current;

        // Smooth damping without visible lag
        if (Math.abs(delta) > 0.003) {
          video.currentTime = clamp(current + delta * 0.45, 0, durationRef.current);
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // 3. GSAP ScrollTrigger Pinned Scrub (Desktop ~380vh, Mobile ~280vh)
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.35,
      onUpdate: (self) => {
        const p = self.progress;
        setCurrentProgress(p);
        targetTimeRef.current = p * durationRef.current;
      },
    });

    // 4. Programmatic Dev / QA Capture Hook
    (window as unknown as { __setBlackBoxProgress?: (p: number) => void }).__setBlackBoxProgress = (
      p: number
    ) => {
      const clampedP = clamp(p, 0, 1);
      setCurrentProgress(clampedP);
      targetTimeRef.current = clampedP * durationRef.current;
      if (video) {
        video.currentTime = clampedP * durationRef.current;
      }
    };

    return () => {
      cancelAnimationFrame(rafId);
      trigger.kill();
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      if (typeof window !== "undefined") {
        delete (window as unknown as { __setBlackBoxProgress?: unknown }).__setBlackBoxProgress;
      }
    };
  }, []);

  // Compute restrained editorial statement opacities
  // Entry statement: visible p ∈ [0.04, 0.20], peaks at p = 0.10
  const entryOpacity =
    currentProgress >= 0.03 && currentProgress <= 0.22
      ? smoothstep(0.03, 0.09, currentProgress) * (1 - smoothstep(0.15, 0.22, currentProgress))
      : 0;

  // Exit statement: visible p ∈ [0.80, 0.98], peaks at p = 0.88
  const exitOpacity =
    currentProgress >= 0.78 && currentProgress <= 0.98
      ? smoothstep(0.78, 0.85, currentProgress) * (1 - smoothstep(0.92, 0.98, currentProgress))
      : 0;

  return (
    <section
      id="black-box"
      ref={containerRef}
      className="relative w-full bg-[#000000] text-white selection:bg-white/20 selection:text-white"
      style={{ height: reducedMotion ? "100vh" : "380vh" }}
      aria-label={isIt ? "Scatola Nera Canonica" : "Canonical Black Box"}
    >
      {/* Sticky Full-Viewport Cinematic Stage */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#000000] flex flex-col items-center justify-center">
        {/* Subtle Top & Bottom Vignette / Screen Melts (Eliminates any rectangular edge) */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.6) 75%, #000000 100%)",
          }}
        />

        {/* Video Stage Container: Centered, 65-75% Viewport Width */}
        <div className="relative z-0 w-full max-w-[1240px] px-4 sm:px-8 flex items-center justify-center">
          {!reducedMotion ? (
            <div className="relative w-full aspect-video flex items-center justify-center">
              <video
                ref={videoRef}
                src="/media/blackbox-motion-study.mp4"
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                disableRemotePlayback
                className="w-full h-full object-contain pointer-events-none select-none transition-opacity duration-700"
                style={{
                  opacity: isVideoReady ? 1 : 0.01,
                  // Seamless edge feathering so video edges never appear as a box
                  maskImage: "radial-gradient(ellipse 96% 92% at 50% 50%, black 75%, transparent 100%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 96% 92% at 50% 50%, black 75%, transparent 100%)",
                }}
              />
            </div>
          ) : (
            /* Reduced Motion Fallback Card */
            <div className="relative max-w-lg border border-white/10 bg-[#0A0B0D] p-8 sm:p-10 text-center space-y-4">
              <div className="text-[11px] font-mono tracking-[0.25em] text-white/50 uppercase">
                {isIt ? "SCATOLA NERA CANONICA" : "CANONICAL BLACK BOX"}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                {isIt ? "MODELLO COERENTE DELL'INCIDENTE" : "COHERENT ACCIDENT MODEL"}
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                {isIt
                  ? "Dalle prove frammentate alla ricostruzione forense, fino all'ispezione peritale umana."
                  : "From fragmented evidence to physical reconstruction, structured for human expert review."}
              </p>
            </div>
          )}
        </div>

        {/* Minimalist Editorial Statements in Intentional Negative Space (Section 13) */}
        {!reducedMotion && (
          <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between py-12 sm:py-16 px-6 sm:px-12 max-w-7xl mx-auto w-full">
            {/* Top Kicker Indicator */}
            <div className="flex items-center justify-center pt-4">
              <div className="flex items-center gap-2.5 opacity-60">
                <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-white/70 uppercase">
                  {isIt ? "SCATOLA NERA CANONICA" : "CANONICAL BLACK BOX"}
                </span>
              </div>
            </div>

            {/* Bottom Statement Area (Transforms with Scroll) */}
            <div className="relative h-16 flex items-center justify-center pb-2">
              {/* Entry Statement */}
              <div
                className="absolute inset-0 flex items-center justify-center text-center transition-opacity duration-300"
                style={{ opacity: entryOpacity }}
              >
                <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-white/80 uppercase">
                  {isIt ? "Le prove iniziano frammentate." : "Evidence enters fragmented."}
                </span>
              </div>

              {/* Exit Statement */}
              <div
                className="absolute inset-0 flex items-center justify-center text-center transition-opacity duration-300"
                style={{ opacity: exitOpacity }}
              >
                <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-white/80 uppercase">
                  {isIt ? "Strutturato per la revisione umana." : "Structured for human review."}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
