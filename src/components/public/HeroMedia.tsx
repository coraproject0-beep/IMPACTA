"use client";

import React, { useEffect, useRef } from "react";

interface HeroMediaProps {
  videoSrc?: string;
  className?: string;
}

export function HeroMedia({
  videoSrc = "/media/impacta-hero.mp4",
  className = "",
}: HeroMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("AutoPlay preview deferred:", err);
        });
      }
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className={`absolute inset-0 w-full h-full object-cover pointer-events-none z-0 ${className}`}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
}
