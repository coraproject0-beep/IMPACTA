"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface EvidenceDiscoveryRevealProps {
  baseImageSrc: string;
  revealedImageSrc?: string;
  alt: string;
  radius?: number;
  className?: string;
  overlayText?: string;
}

/**
 * Reusable high-performance spotlight reveal mechanic driven by CSS radial-gradient.
 * Smooth 60fps tracking using requestAnimationFrame without layout thrashing or canvas re-encoding.
 */
export function EvidenceDiscoveryReveal({
  baseImageSrc,
  revealedImageSrc,
  alt,
  radius = 180,
  className = "",
  overlayText,
}: EvidenceDiscoveryRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    // Smooth lerp loop
    const updatePosition = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.18;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.18;

      container.style.setProperty("--pointer-x", `${currentPos.current.x.toFixed(1)}px`);
      container.style.setProperty("--pointer-y", `${currentPos.current.y.toFixed(1)}px`);

      rafId.current = requestAnimationFrame(updatePosition);
    };

    rafId.current = requestAnimationFrame(updatePosition);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-crosshair select-none ${className}`}
      style={{
        // Default center position until cursor moves
        ["--pointer-x" as any]: "50%",
        ["--pointer-y" as any]: "50%",
      }}
    >
      {/* Base Layer */}
      <div className="relative w-full h-full min-h-[360px]">
        <Image
          src={baseImageSrc}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 ease-out"
          sizes="(max-width: 1024px) 100vw, 800px"
        />
        <div className="absolute inset-0 bg-[#0E0F10]/40 backdrop-grayscale" />
      </div>

      {/* Spotlight Revealer Layer with CSS radial-mask */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          maskImage: `radial-gradient(circle ${radius}px at var(--pointer-x) var(--pointer-y), black 25%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle ${radius}px at var(--pointer-x) var(--pointer-y), black 25%, transparent 100%)`,
        }}
      >
        <Image
          src={revealedImageSrc || baseImageSrc}
          alt={`${alt} revealed`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 800px"
        />
        {overlayText && (
          <div className="absolute bottom-6 left-6 bg-[#0E0F10]/80 backdrop-blur-sm text-white px-3.5 py-1.5 rounded text-xs font-mono">
            {overlayText}
          </div>
        )}
      </div>

      {/* Crosshair coordinates display */}
      {isHovered && (
        <div
          className="absolute pointer-events-none text-[10px] font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded"
          style={{
            left: "calc(var(--pointer-x) + 12px)",
            top: "calc(var(--pointer-y) + 12px)",
          }}
        >
          INSPECT
        </div>
      )}
    </div>
  );
}
