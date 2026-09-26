"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface RotatingStatementProps {
  prefix?: string;
  words: string[];
  suffix?: string;
  intervalMs?: number;
  className?: string;
  wordClassName?: string;
  accessibleLabel?: string;
  layout?: "inline" | "stacked";
}

/**
 * Authored Kinetic Rotating Statement System.
 * - Single source of truth canonical word list.
 * - Deterministic sequential rotation: nextIndex = (currentIndex + 1) % words.length.
 * - Strict duplicate guard: advances index if adjacent words are identical.
 * - Single scheduling mechanism via scoped GSAP context & delayedCall (zero setInterval/setTimeout overlap).
 * - React Strict Mode safe with full ctx.revert() cleanup.
 * - Transition identities with dynamic keys to prevent DOM node reuse.
 * - Desktop: Controlled 3D rotateX perspective entry/exit with subtle kinetic blur.
 * - Mobile (< 640px): Crisp masked vertical slide without perspective warping.
 * - Full accessibility with screen-reader text and prefers-reduced-motion support.
 */
export function RotatingStatement({
  prefix,
  words,
  suffix = "",
  intervalMs = 2800,
  className = "",
  wordClassName = "",
  accessibleLabel,
  layout = "stacked",
}: RotatingStatementProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  // Single source of truth guard
  const wordsSignature = words ? words.join("|") : "IMPACTA";
  const canonicalWords = React.useMemo(
    () => (words && words.length > 0 ? words : ["IMPACTA"]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wordsSignature]
  );

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionMq.matches) {
      setReducedMotion(true);
      return;
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });

    // Reset index whenever words signature changes (e.g. locale switch)
    setActiveWordIndex(0);

    const mobile = window.innerWidth < 640;
    let currentIndex = 0;
    let isKilled = false;

    // Scoped GSAP Context guarantees 100% clean teardown
    const ctx = gsap.context(() => {
      // 1. Initial State: position word 0 resting, all other words primed below
      wordRefs.current.forEach((el, idx) => {
        if (!el) return;
        if (idx === 0) {
          gsap.set(el, {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            filter: "blur(0px)",
            visibility: "visible",
          });
        } else {
          gsap.set(el, {
            yPercent: 110,
            opacity: 0,
            rotateX: mobile ? 0 : -35,
            filter: mobile ? "none" : "blur(2px)",
            visibility: "hidden",
          });
        }
      });

      // 2. Deterministic sequential rotation function
      function advanceWord() {
        if (isKilled || canonicalWords.length <= 1) return;

        // Next index calculation
        let nextIndex = (currentIndex + 1) % canonicalWords.length;

        // Guard against identical adjacent words
        while (
          canonicalWords[nextIndex] === canonicalWords[currentIndex] &&
          canonicalWords.length > 1
        ) {
          nextIndex = (nextIndex + 1) % canonicalWords.length;
        }

        const currEl = wordRefs.current[currentIndex];
        const nextEl = wordRefs.current[nextIndex];

        if (!currEl || !nextEl) return;

        // Make nextEl visible right before animating
        gsap.set(nextEl, { visibility: "visible" });

        const tl = gsap.timeline({
          onComplete: () => {
            // Instantly prime exiting element offscreen below for its next cycle
            gsap.set(currEl, {
              yPercent: 110,
              opacity: 0,
              rotateX: mobile ? 0 : -35,
              filter: mobile ? "none" : "blur(2px)",
              visibility: "hidden",
            });
            currentIndex = nextIndex;
            setActiveWordIndex(nextIndex);

            // Schedule next rotation after readable pause (~2.2s)
            if (!isKilled) {
              gsap.delayedCall(2.2, advanceWord);
            }
          },
        });

        // Current word exits upwards
        tl.to(
          currEl,
          {
            yPercent: -110,
            opacity: 0,
            rotateX: mobile ? 0 : 35,
            filter: mobile ? "none" : "blur(2px)",
            duration: 0.65,
            ease: "power2.inOut",
          },
          0
        );

        // Next word enters from below
        tl.fromTo(
          nextEl,
          {
            yPercent: 110,
            opacity: 0,
            rotateX: mobile ? 0 : -35,
            filter: mobile ? "none" : "blur(2px)",
          },
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            filter: "none",
            duration: 0.65,
            ease: "power2.inOut",
          },
          0
        );
      }

      // Schedule first rotation after readable pause
      gsap.delayedCall(2.2, advanceWord);
    }, containerRef);

    return () => {
      isKilled = true;
      ctx.revert();
      window.removeEventListener("resize", checkMobile);
    };
  }, [canonicalWords, wordsSignature]);

  // Compute full phrase for screen-reader accessibility
  const srText =
    accessibleLabel ||
    `${prefix ? prefix + " " : ""}${canonicalWords.join(", ")}. ${suffix}`.trim();

  if (reducedMotion) {
    return (
      <div className={className}>
        {prefix && <span>{prefix} </span>}
        <span className={wordClassName}>{canonicalWords[0]}</span>
        {suffix && <span> {suffix}</span>}
      </div>
    );
  }

  // Stacked layout (preferred for large editorial headlines)
  if (layout === "stacked") {
    return (
      <div ref={containerRef} className={`space-y-2 ${className}`} aria-label={srText}>
        <span className="sr-only">{srText}</span>

        {prefix && (
          <div className="block font-light text-[#555555] tracking-tight">
            {prefix}
          </div>
        )}

        {/* Dedicated Rotating Word Viewport: 1.32em height with ascender clearance */}
        <div
          aria-hidden="true"
          className="relative block w-full overflow-hidden select-none py-1"
          style={{
            height: "1.32em",
            perspective: isMobile ? "none" : "1000px",
          }}
        >
          {canonicalWords.map((word, i) => (
            <span
              key={`${wordsSignature}-${i}-${word}`}
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              className={`block absolute inset-0 leading-none ${wordClassName}`}
              style={{
                opacity: i === 0 ? 1 : 0,
                visibility: i === 0 ? "visible" : "hidden",
                transformOrigin: "top center",
                pointerEvents: "none",
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {suffix && (
          <div className="block font-normal text-[#0E0F10] pt-1">
            {suffix}
          </div>
        )}
      </div>
    );
  }

  // Inline layout (when explicitly requested)
  return (
    <div ref={containerRef} className={`relative inline-block ${className}`} aria-label={srText}>
      <span className="sr-only">{srText}</span>
      <span aria-hidden="true" className="inline-flex flex-wrap items-baseline gap-x-3">
        {prefix && <span>{prefix}</span>}
        <span
          className="relative inline-block overflow-hidden align-baseline py-1"
          style={{
            perspective: isMobile ? "none" : "1000px",
            minWidth: isMobile ? "180px" : "320px",
            height: "1.32em",
          }}
        >
          {canonicalWords.map((word, i) => (
            <span
              key={`${wordsSignature}-${i}-${word}`}
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              className={`block absolute inset-0 whitespace-nowrap leading-none ${wordClassName}`}
              style={{
                opacity: i === 0 ? 1 : 0,
                visibility: i === 0 ? "visible" : "hidden",
                transformOrigin: "top center",
                pointerEvents: "none",
              }}
            >
              {word}
            </span>
          ))}
        </span>
        {suffix && <span>{suffix}</span>}
      </span>
    </div>
  );
}
