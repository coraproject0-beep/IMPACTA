"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type RevealVariant =
  | "depth"
  | "slide-lateral"
  | "rotate-plane"
  | "fragment"
  | "tracking-spread"
  | "vertical-mask";

export interface RevealTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  mode?: "char" | "word" | "line";
  variant?: RevealVariant;
  delay?: number;
  triggerOnScroll?: boolean;
}

export function RevealText({
  children,
  className = "",
  as = "h2",
  mode = "word",
  variant = "depth",
  delay = 0,
  triggerOnScroll = true,
}: RevealTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const targets = el.querySelectorAll(".reveal-unit");
    if (!targets.length) return;

    // Apply distinct motion configuration based on page-specific variant
    let initialProps: gsap.TweenVars = {};
    let animProps: gsap.TweenVars = {};

    switch (variant) {
      case "slide-lateral": // PLATFORM: lines slide laterally and lock into alignment
        initialProps = {
          x: -35,
          opacity: 0,
          skewX: -6,
        };
        animProps = {
          x: 0,
          opacity: 1,
          skewX: 0,
          duration: 0.85,
          stagger: mode === "char" ? 0.02 : 0.04,
          ease: "power2.out",
          delay,
        };
        break;

      case "rotate-plane": // DRIVERS: headline rotates slightly into camera plane
        initialProps = {
          rotateY: -18,
          rotateX: 12,
          z: -40,
          yPercent: 35,
          opacity: 0,
          transformOrigin: "0% 50% -30px",
        };
        animProps = {
          rotateY: 0,
          rotateX: 0,
          z: 0,
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          stagger: mode === "char" ? 0.022 : 0.04,
          ease: "power3.out",
          delay,
        };
        break;

      case "fragment": // INSURERS: words assemble from horizontal fragments
        initialProps = {
          x: 20,
          y: 12,
          opacity: 0,
        };
        animProps = {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: mode === "char" ? 0.018 : 0.038,
          ease: "power2.out",
          delay,
        };
        break;

      case "tracking-spread": // TECHNOLOGY: characters sharpen from slight spread
        initialProps = {
          opacity: 0,
          y: -8,
        };
        animProps = {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: mode === "char" ? 0.02 : 0.035,
          ease: "power3.out",
          delay,
        };
        break;

      case "vertical-mask": // SAFETY: slower vertical reveal with depth
        initialProps = {
          yPercent: 105,
          opacity: 0,
        };
        animProps = {
          yPercent: 0,
          opacity: 1,
          duration: 1.0,
          stagger: mode === "char" ? 0.025 : 0.05,
          ease: "power2.out",
          delay,
        };
        break;

      case "depth": // HOME: characters rise from deep Z-space
      default:
        initialProps = {
          yPercent: 110,
          opacity: 0,
          rotateX: 16,
          z: -50,
          transformOrigin: "50% 100% -30px",
        };
        animProps = {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          z: 0,
          duration: mode === "char" ? 0.8 : 0.9,
          stagger: mode === "char" ? 0.022 : 0.045,
          ease: "power3.out",
          delay,
        };
        break;
    }

    gsap.set(targets, initialProps);

    if (triggerOnScroll) {
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(targets, animProps);
        },
      });
      return () => st.kill();
    } else {
      const tween = gsap.to(targets, animProps);
      return () => {
        tween.kill();
      };
    }
  }, [delay, mode, triggerOnScroll, variant]);

  const Component = as as React.ElementType;

  const renderContent = () => {
    if (mode === "char") {
      const words = children.split(" ");
      return words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, cIdx) => (
            <span key={cIdx} className="inline-block overflow-hidden align-top">
              <span className="reveal-unit inline-block will-change-transform">
                {char}
              </span>
            </span>
          ))}
        </span>
      ));
    }

    if (mode === "word") {
      const words = children.split(" ");
      return words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden align-top mr-[0.25em]">
          <span className="reveal-unit inline-block will-change-transform">
            {word}
          </span>
        </span>
      ));
    }

    return (
      <span className="inline-block overflow-hidden align-top w-full">
        <span className="reveal-unit inline-block will-change-transform">
          {children}
        </span>
      </span>
    );
  };

  return (
    <Component
      ref={containerRef}
      className={`relative inline-block ${className}`}
      aria-label={children}
    >
      <span aria-hidden="true" className="inline-block">
        {renderContent()}
      </span>
    </Component>
  );
}
