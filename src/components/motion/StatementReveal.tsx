"use client";

import React, { useEffect, useRef, useState } from "react";

interface StatementRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  delayMs?: number;
  durationMs?: number;
}

/**
 * STATEMENT_REVEAL: Slow, commanding emergence for major thematic claims and full-viewport declarations.
 */
export function StatementReveal({
  children,
  className = "",
  as: Component = "h2",
  delayMs = 0,
  durationMs = 950,
}: StatementRevealProps) {
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
    <div ref={containerRef} className="w-full">
      <Component
        className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
        style={{
          transform: isVisible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.985)",
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
