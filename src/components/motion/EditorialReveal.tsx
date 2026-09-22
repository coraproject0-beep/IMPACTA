"use client";

import React, { useEffect, useRef, useState } from "react";

interface EditorialRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delayMs?: number;
  durationMs?: number;
}

/**
 * EDITORIAL_REVEAL: Precision masked line entrance for major headings and titles.
 * Uses overflow containment with a smooth high-mass cubic bezier.
 */
export function EditorialReveal({
  children,
  className = "",
  as: Component = "div",
  delayMs = 0,
  durationMs = 850,
}: EditorialRevealProps) {
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
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
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
    <div ref={containerRef} className="overflow-hidden">
      <Component
        className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(108%)",
          opacity: isVisible ? 1 : 0,
          transitionDuration: `${durationMs}ms`,
          transitionDelay: `${delayMs}ms`,
          willChange: "transform, opacity",
        }}
      >
        {children}
      </Component>
    </div>
  );
}
