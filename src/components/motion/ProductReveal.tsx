"use client";

import React, { useEffect, useRef, useState } from "react";

interface ProductRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

/**
 * PRODUCT_REVEAL: UI screenshot and workbench interface reveal.
 * Sits in real 3D depth and smoothly settles into the screen plane.
 */
export function ProductReveal({
  children,
  className = "",
  delayMs = 150,
}: ProductRevealProps) {
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
      { threshold: 0.15 }
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
      className={`perspective-1000 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
      style={{
        transform: isVisible
          ? "perspective(1200px) rotateX(0deg) translateY(0) scale(1)"
          : "perspective(1200px) rotateX(4deg) translateY(32px) scale(0.975)",
        opacity: isVisible ? 1 : 0,
        transitionDelay: `${delayMs}ms`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
