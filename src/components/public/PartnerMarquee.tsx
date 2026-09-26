"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FictionalEntity {
  name: string;
  style: string;
  renderIcon: () => React.ReactNode;
}

const ENTITIES: FictionalEntity[] = [
  {
    name: "ORBITA CLAIMS",
    style: "tracking-[0.22em] font-semibold text-xs sm:text-[13px]",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" aria-hidden="true">
        <circle cx="10" cy="12" r="7" strokeDasharray="32 10" />
        <ellipse cx="14" cy="12" rx="7" ry="5" />
        <circle cx="10" cy="5" r="1.5" className="fill-current" />
      </svg>
    ),
  },
  {
    name: "KINORA RISK",
    style: "tracking-[0.24em] font-semibold text-xs sm:text-[13px]",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3L4 7v6c0 5 8 8 8 8s8-3 8-8V7l-8-4z" />
        <path d="M12 3v18M4 7l8 5 8-5" />
      </svg>
    ),
  },
  {
    name: "TERRAVAULT AUTO",
    style: "tracking-[0.18em] font-bold text-xs sm:text-[13px]",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 17l10-5 10 5-10 5-10-5z" />
        <path d="M2 12l10-5 10 5" />
        <path d="M2 7l10-5 10 5" />
      </svg>
    ),
  },
  {
    name: "AXIONA MUTUAL",
    style: "tracking-[0.22em] font-medium text-xs sm:text-[13px]",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
        <polygon points="5,3 19,3 15,21 1,21" />
        <line x1="9" y1="3" x2="23" y2="21" />
      </svg>
    ),
  },
  {
    name: "NEXUS SURETY",
    style: "tracking-[0.2em] font-bold text-xs sm:text-[13px]",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" aria-hidden="true">
        <circle cx="6" cy="6" r="2" className="fill-current" />
        <circle cx="18" cy="6" r="2" className="fill-current" />
        <circle cx="12" cy="18" r="2" className="fill-current" />
        <line x1="6" y1="6" x2="18" y2="6" />
        <line x1="18" y1="6" x2="12" y2="18" />
        <line x1="12" y1="18" x2="6" y2="6" />
      </svg>
    ),
  },
  {
    name: "VERITAS RE",
    style: "tracking-[0.24em] font-semibold text-xs sm:text-[13px]",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 4l9 16L21 4" />
        <path d="M8 4l4 8 4-8" />
        <line x1="12" y1="12" x2="12" y2="20" />
      </svg>
    ),
  },
  {
    name: "ALTAIR UNDERWRITING",
    style: "tracking-[0.2em] font-medium text-xs sm:text-[13px]",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z" />
        <circle cx="12" cy="12" r="1.5" className="fill-current" />
      </svg>
    ),
  },
  {
    name: "VELTRIX MOBILITY",
    style: "tracking-[0.22em] font-semibold text-xs sm:text-[13px]",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 18L12 6L20 18" />
        <path d="M8 18L12 11L16 18" />
      </svg>
    ),
  },
];

export function PartnerMarquee() {
  const { language } = useLanguage();
  const isIt = language === "it";
  const railContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = railContainerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Velocity-linked subtle skew & depth response
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const vel = self.getVelocity();
        // subtle perspective skew clamped between -2.5 and +2.5 deg
        const skew = Math.max(-2.5, Math.min(2.5, vel * 0.0015));
        gsap.to(el, {
          skewX: skew,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section id="partner-marquee" className="relative w-full py-16 sm:py-24 bg-[#F7F7F6] overflow-hidden border-y border-[#E5E5E3]">
      {/* Editorial Heading: Premium Sans with discreet asterisk link */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#0E0F10] leading-none">
          {isIt ? "I NOSTRI PARTNER" : "OUR PARTNERS"}
          <Link
            href="/terms"
            title={isIt ? "Entità dimostrative fittizie — consulta i Termini" : "Fictional demonstration entities — see Terms"}
            className="inline-block text-xl sm:text-2xl font-light text-[#888888] hover:text-[#0E0F10] transition-colors ml-1 align-top cursor-pointer"
          >
            *
          </Link>
        </h2>
      </div>

      {/* Infinite Seamless Typographic + Vector Logo Rail with Scroll Velocity */}
      <div ref={railContainerRef} className="relative w-full overflow-hidden select-none will-change-transform">
        {/* Soft edge masks for seamless entry and exit */}
        <div className="absolute left-0 inset-y-0 w-24 sm:w-48 bg-gradient-to-r from-[#F7F7F6] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-24 sm:w-48 bg-gradient-to-l from-[#F7F7F6] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee">
          {/* Loop A */}
          <div className="flex items-center gap-16 sm:gap-24 pr-16 sm:pr-24">
            {ENTITIES.map((entity, i) => {
              const yShift = (i % 3 === 0 ? "translate-y-[-2px]" : i % 3 === 1 ? "translate-y-[2px]" : "");
              const scaleVariant = (i % 2 === 0 ? "scale-100" : "scale-[0.98]");
              return (
                <div
                  key={`a-${i}`}
                  className={`flex items-center gap-3.5 text-[#555555] transition-all duration-300 hover:text-[#0E0F10] whitespace-nowrap cursor-default group relative ${yShift} ${scaleVariant}`}
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {entity.renderIcon()}
                  </span>
                  <span className={`uppercase ${entity.style} relative`}>
                    {entity.name}
                    <span className="absolute bottom-[-3px] left-0 w-0 h-[1.5px] bg-[#0E0F10] transition-all duration-300 group-hover:w-full" />
                  </span>
                </div>
              );
            })}
          </div>

          {/* Loop B (seamless duplicate) */}
          <div className="flex items-center gap-16 sm:gap-24 pr-16 sm:pr-24" aria-hidden="true">
            {ENTITIES.map((entity, i) => {
              const yShift = (i % 3 === 0 ? "translate-y-[-2px]" : i % 3 === 1 ? "translate-y-[2px]" : "");
              const scaleVariant = (i % 2 === 0 ? "scale-100" : "scale-[0.98]");
              return (
                <div
                  key={`b-${i}`}
                  className={`flex items-center gap-3.5 text-[#555555] transition-all duration-300 hover:text-[#0E0F10] whitespace-nowrap cursor-default group relative ${yShift} ${scaleVariant}`}
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {entity.renderIcon()}
                  </span>
                  <span className={`uppercase ${entity.style} relative`}>
                    {entity.name}
                    <span className="absolute bottom-[-3px] left-0 w-0 h-[1.5px] bg-[#0E0F10] transition-all duration-300 group-hover:w-full" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 38s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
