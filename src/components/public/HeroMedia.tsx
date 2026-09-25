"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface HeroMediaProps {
  videoSrc?: string;
  posterSrc?: string;
  fallbackImageSrc: string;
  alt: string;
  className?: string;
}

export function HeroMedia({
  videoSrc = "/media/impacta-hero.mp4",
  posterSrc = "/images/road-context.jpg",
  fallbackImageSrc = "/images/road-context.jpg",
  alt,
  className = "",
}: HeroMediaProps) {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    // Check if video exists and can be played
    if (videoSrc && !mediaQuery.matches) {
      const testVideo = document.createElement("video");
      testVideo.src = videoSrc;
      testVideo.oncanplay = () => setVideoAvailable(true);
      testVideo.onerror = () => setVideoAvailable(false);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, [videoSrc]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {videoAvailable && !prefersReducedMotion ? (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <Image
          src={fallbackImageSrc}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* Cinematic subtle contrast gradient for flawless typography legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090A0A] via-[#090A0A]/60 to-transparent" />
      <div className="absolute inset-0 bg-[#090A0A]/30" />
    </div>
  );
}
