"use client";

import React, { useEffect, useState, useRef } from "react";

interface RotatingStatementProps {
  prefix?: string;
  words: string[];
  suffix?: string;
  intervalMs?: number;
  className?: string;
  wordClassName?: string;
  accessibleLabel?: string;
  layout?: "inline" | "stacked";
}

/**
 * Authored Kinetic Rotating Statement System.
 * - Derived display-typography viewport (1.28em height, ascender/descender clearance).
 * - Desktop: Controlled 3D rotateX perspective entry/exit with subtle kinetic blur.
 * - Mobile (< 640px): Crisp masked vertical slide without perspective warping.
 * - Zero font clipping, zero width truncation on long terms (e.g. DICHIARAZIONI).
 * - Full accessibility with screen-reader text and prefers-reduced-motion support.
 */
export function RotatingStatement({
  prefix,
  words,
  suffix = "",
  intervalMs = 3000,
  className = "",
  wordClassName = "",
  accessibleLabel,
  layout = "stacked",
}: RotatingStatementProps) {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionMq.matches) {
      setReducedMotion(true);
      return;
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });

    const cycle = () => {
      setIsTransitioning(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setIsTransitioning(false);
      }, 480);
    };

    timerRef.current = setInterval(cycle, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      window.removeEventListener("resize", checkMobile);
    };
  }, [words.length, intervalMs]);

  // Compute full phrase for screen-reader accessibility
  const srText =
    accessibleLabel ||
    `${prefix ? prefix + " " : ""}${words.join(", ")}. ${suffix}`.trim();

  if (reducedMotion) {
    return (
      <div className={className}>
        {prefix && <span>{prefix} </span>}
        <span className={wordClassName}>{words[0]}</span>
        {suffix && <span> {suffix}</span>}
      </div>
    );
  }

  const currentWord = words[index];
  const nextWord = words[(index + 1) % words.length];

  // Stacked layout (preferred for large editorial headlines to prevent wrapping collisions)
  if (layout === "stacked") {
    return (
      <div className={`space-y-2 ${className}`} aria-label={srText}>
        <span className="sr-only">{srText}</span>

        {prefix && (
          <div className="block font-light text-[#555555] tracking-tight">
            {prefix}
          </div>
        )}

        {/* Dedicated Rotating Word Viewport: exact 1.28em height with ascender clearance */}
        <div
          aria-hidden="true"
          className="relative block w-full overflow-hidden select-none py-1"
          style={{
            height: "1.32em",
            perspective: isMobile ? "none" : "1000px",
          }}
        >
          {/* Exiting Word */}
          <span
            className={`block absolute inset-0 leading-none transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${wordClassName}`}
            style={{
              transform: isTransitioning
                ? isMobile
                  ? "translateY(-110%)"
                  : "translateY(-105%) rotateX(35deg)"
                : "translateY(0%) rotateX(0deg)",
              opacity: isTransitioning ? 0 : 1,
              filter: isTransitioning && !isMobile ? "blur(2px)" : "blur(0px)",
              transformOrigin: "bottom center",
            }}
          >
            {currentWord}
          </span>

          {/* Entering Word */}
          <span
            className={`block absolute inset-0 leading-none transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${wordClassName}`}
            style={{
              transform: isTransitioning
                ? "translateY(0%) rotateX(0deg)"
                : isMobile
                ? "translateY(110%)"
                : "translateY(105%) rotateX(-35deg)",
              opacity: isTransitioning ? 1 : 0,
              filter: isTransitioning || isMobile ? "blur(0px)" : "blur(2px)",
              transformOrigin: "top center",
            }}
          >
            {nextWord}
          </span>
        </div>

        {suffix && (
          <div className="block font-normal text-[#0E0F10] pt-1">
            {suffix}
          </div>
        )}
      </div>
    );
  }

  // Inline layout (when explicitly requested)
  return (
    <div className={`relative inline-block ${className}`} aria-label={srText}>
      <span className="sr-only">{srText}</span>
      <span aria-hidden="true" className="inline-flex flex-wrap items-baseline gap-x-3">
        {prefix && <span>{prefix}</span>}
        <span
          className="relative inline-block overflow-hidden align-baseline py-1"
          style={{
            perspective: isMobile ? "none" : "1000px",
            minWidth: isMobile ? "180px" : "320px",
            height: "1.32em",
          }}
        >
          <span
            className={`block absolute inset-0 whitespace-nowrap leading-none transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${wordClassName}`}
            style={{
              transform: isTransitioning
                ? isMobile
                  ? "translateY(-110%)"
                  : "translateY(-105%) rotateX(35deg)"
                : "translateY(0%) rotateX(0deg)",
              opacity: isTransitioning ? 0 : 1,
              filter: isTransitioning && !isMobile ? "blur(2px)" : "blur(0px)",
              transformOrigin: "bottom center",
            }}
          >
            {currentWord}
          </span>

          <span
            className={`block absolute inset-0 whitespace-nowrap leading-none transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${wordClassName}`}
            style={{
              transform: isTransitioning
                ? "translateY(0%) rotateX(0deg)"
                : isMobile
                ? "translateY(110%)"
                : "translateY(105%) rotateX(-35deg)",
              opacity: isTransitioning ? 1 : 0,
              filter: isTransitioning || isMobile ? "blur(0px)" : "blur(2px)",
              transformOrigin: "top center",
            }}
          >
            {nextWord}
          </span>
        </span>
        {suffix && <span>{suffix}</span>}
      </span>
    </div>
  );
}
