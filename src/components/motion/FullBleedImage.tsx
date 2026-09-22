"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface FullBleedImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  overlayClassName?: string;
  children?: React.ReactNode;
}

/**
 * FULL_BLEED_CROP: Full-viewport photographic chapter component with high-discipline
 * crop expansion, subtle scale down, and edge-to-edge presence.
 */
export function FullBleedImage({
  src,
  alt,
  priority = false,
  className = "",
  overlayClassName = "bg-gradient-to-t from-[#090A0A] via-black/40 to-transparent",
  children,
}: FullBleedImageProps) {
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
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden min-h-[90svh] lg:min-h-[100svh] flex items-end ${className}`}
    >
      <div
        className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          reducedMotion || isVisible ? "scale-100 opacity-100" : "scale-105 opacity-0"
        }`}
        style={{ willChange: "transform, opacity" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Cinematic Gradient / Scrim */}
      <div className={`absolute inset-0 pointer-events-none ${overlayClassName}`} />

      {/* Foreground Content */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 py-16 sm:py-24 max-w-7xl">
        {children}
      </div>
    </div>
  );
}
