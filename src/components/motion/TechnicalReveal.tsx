"use client";

import React, { useEffect, useRef, useState } from "react";

interface TechnicalRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "div" | "p";
  delayMs?: number;
  durationMs?: number;
}

/**
 * TECHNICAL_REVEAL: Controlled tracking settle, vertical nudge and opacity for telemetry,
 * timestamps, and engineered architectural metadata.
 */
export function TechnicalReveal({
  children,
  className = "",
  as: Component = "span",
  delayMs = 0,
  durationMs = 600,
}: TechnicalRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setReducedMotion(true);
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (reducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <div ref={containerRef} className="inline-block">
      <Component
        className={`inline-block transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(8px)",
          opacity: isVisible ? 1 : 0,
          letterSpacing: isVisible ? "inherit" : "0.12em",
          transitionDuration: `${durationMs}ms`,
          transitionDelay: `${delayMs}ms`,
          willChange: "transform, opacity, letter-spacing",
        }}
      >
        {children}
      </Component>
    </div>
  );
}
