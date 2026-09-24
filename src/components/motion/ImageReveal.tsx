"use client";

import React, { useEffect, useRef, useState } from "react";

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  durationMs?: number;
}

export function ImageReveal({
  children,
  className = "",
  delayMs = 100,
  durationMs = 900,
}: ImageRevealProps) {
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
      style={{
        transform: isVisible ? "scale(1) translateY(0)" : "scale(1.04) translateY(12px)",
        opacity: isVisible ? 1 : 0,
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${delayMs}ms`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
