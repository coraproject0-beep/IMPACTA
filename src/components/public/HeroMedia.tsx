"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface HeroMediaProps {
  videoSrc?: string;
  posterSrc: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export function HeroMedia({
  videoSrc,
  posterSrc,
  alt,
  priority = true,
  className = "",
}: HeroMediaProps) {
  const [videoAvailable, setVideoAvailable] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);

    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return (
    <div
      className={`relative w-full overflow-hidden bg-slate-100 ${className}`}
      role="region"
      aria-label={alt}
    >
      {/* Video layer if configured and user does not prefer reduced motion */}
      {videoSrc && !prefersReducedMotion && (
        <video
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoAvailable(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoAvailable ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Cinematic Daylight Photography */}
      <Image
        src={posterSrc}
        alt={alt}
        fill
        priority={priority}
        className={`object-cover transition-transform duration-[4000ms] ease-out ${
          !prefersReducedMotion ? "scale-105 hover:scale-100" : "scale-100"
        } ${videoAvailable ? "opacity-0" : "opacity-100"}`}
        sizes="(max-width: 1024px) 100vw, 1400px"
      />

      {/* Crisp daylight gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
