"use client";

import React, { useEffect, useState, useRef } from "react";

interface RotatingStatementProps {
  prefix: string;
  words: string[];
  suffix?: string;
  intervalMs?: number;
  className?: string;
  wordClassName?: string;
  accessibleLabel?: string;
}

/**
 * Premium 3D Rotating Statement System.
 * Cycles vertically using perspective and rotateX transforms.
 * Fully accessible with screen-reader text and prefers-reduced-motion respect.
 */
export function RotatingStatement({
  prefix,
  words,
  suffix = "",
  intervalMs = 2800,
  className = "",
  wordClassName = "",
  accessibleLabel,
}: RotatingStatementProps) {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReducedMotion(true);
      return;
    }

    const cycle = () => {
      setIsTransitioning(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setIsTransitioning(false);
      }, 500); // 500ms transition duration
    };

    timerRef.current = setInterval(cycle, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [words.length, intervalMs]);

  // Compute full phrase for screen-reader accessibility
  const srText = accessibleLabel || `${prefix} ${words.join(", ")}. ${suffix}`.trim();

  if (reducedMotion) {
    return (
      <div className={className}>
        <span>{prefix} </span>
        <span className={wordClassName}>{words[0]}</span>
        {suffix && <span> {suffix}</span>}
      </div>
    );
  }

  const currentWord = words[index];
  const nextWord = words[(index + 1) % words.length];

  return (
    <div className={`relative inline-block ${className}`} aria-label={srText}>
      {/* Screen Reader only accessible text */}
      <span className="sr-only">{srText}</span>

      {/* Visual Render Container */}
      <span aria-hidden="true" className="inline-flex flex-wrap items-baseline gap-x-3">
        <span>{prefix}</span>
        <span
          className="relative inline-block overflow-hidden align-baseline"
          style={{ perspective: "1000px", minWidth: "220px", height: "1.15em" }}
        >
          {/* Current Word (Exiting up with 3D rotation) */}
          <span
            className={`block absolute inset-0 whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${wordClassName}`}
            style={{
              transform: isTransitioning
                ? "translateY(-100%) rotateX(55deg)"
                : "translateY(0%) rotateX(0deg)",
              opacity: isTransitioning ? 0 : 1,
              filter: isTransitioning ? "blur(3px)" : "blur(0px)",
              transformOrigin: "bottom center",
            }}
          >
            {currentWord}
          </span>

          {/* Next Word (Entering from below with 3D rotation) */}
          <span
            className={`block absolute inset-0 whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${wordClassName}`}
            style={{
              transform: isTransitioning
                ? "translateY(0%) rotateX(0deg)"
                : "translateY(100%) rotateX(-55deg)",
              opacity: isTransitioning ? 1 : 0,
              filter: isTransitioning ? "blur(0px)" : "blur(3px)",
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
