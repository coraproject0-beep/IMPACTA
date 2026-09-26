"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

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

  return (
    <section className="relative w-full py-14 sm:py-20 bg-[#F7F7F6] overflow-hidden border-y border-[#E5E5E3]">
      {/* Infinite Seamless Typographic + Vector Logo Rail */}
      <div className="relative w-full overflow-hidden select-none">
        {/* Soft edge masks for seamless entry and exit */}
        <div className="absolute left-0 inset-y-0 w-24 sm:w-48 bg-gradient-to-r from-[#F7F7F6] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-24 sm:w-48 bg-gradient-to-l from-[#F7F7F6] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee">
          {/* Loop A */}
          <div className="flex items-center gap-16 sm:gap-24 pr-16 sm:pr-24">
            {ENTITIES.map((entity, i) => (
              <div
                key={`a-${i}`}
                className="flex items-center gap-3.5 text-[#555555] transition-colors duration-300 hover:text-[#0E0F10] whitespace-nowrap cursor-default group"
              >
                <span className="transition-transform duration-300 group-hover:scale-105">
                  {entity.renderIcon()}
                </span>
                <span className={`uppercase ${entity.style}`}>
                  {entity.name}
                </span>
              </div>
            ))}
          </div>

          {/* Loop B (seamless duplicate) */}
          <div className="flex items-center gap-16 sm:gap-24 pr-16 sm:pr-24" aria-hidden="true">
            {ENTITIES.map((entity, i) => (
              <div
                key={`b-${i}`}
                className="flex items-center gap-3.5 text-[#555555] transition-colors duration-300 hover:text-[#0E0F10] whitespace-nowrap cursor-default group"
              >
                <span className="transition-transform duration-300 group-hover:scale-105">
                  {entity.renderIcon()}
                </span>
                <span className={`uppercase ${entity.style}`}>
                  {entity.name}
                </span>
              </div>
            ))}
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
