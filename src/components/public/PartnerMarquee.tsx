"use client";

import React from "react";

const FICTIONAL_ENTITIES = [
  { name: "AURELION MOTOR", style: "tracking-[0.24em] font-semibold text-xs sm:text-sm" },
  { name: "NEXORA INSURE", style: "tracking-[0.18em] font-bold text-xs sm:text-[13px]" },
  { name: "VELTRIX MOBILITY", style: "tracking-[0.22em] font-medium text-xs sm:text-sm" },
  { name: "ORBITA CLAIMS", style: "tracking-[0.2em] font-bold text-xs sm:text-sm" },
  { name: "KINORA RISK", style: "tracking-[0.26em] font-semibold text-xs sm:text-[13px]" },
  { name: "TERRAVAULT AUTO", style: "tracking-[0.16em] font-bold text-xs sm:text-sm" },
  { name: "AXIONA MUTUAL", style: "tracking-[0.22em] font-medium text-xs sm:text-sm" },
  { name: "NOVELIS ROAD SYSTEMS", style: "tracking-[0.18em] font-semibold text-xs sm:text-[13px]" },
];

export function PartnerMarquee() {
  return (
    <section className="relative w-full py-14 sm:py-20 bg-[#F7F7F6] overflow-hidden border-y border-[#E5E5E3]">
      {/* Infinite Seamless Typographic Marquee Rail (No prototype/disclaimer headings) */}
      <div className="relative w-full overflow-hidden select-none">
        {/* Soft edge masking for seamless entry and exit */}
        <div className="absolute left-0 inset-y-0 w-20 sm:w-40 bg-gradient-to-r from-[#F7F7F6] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-20 sm:w-40 bg-gradient-to-l from-[#F7F7F6] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee">
          {/* First loop */}
          <div className="flex items-center gap-16 sm:gap-24 pr-16 sm:pr-24">
            {FICTIONAL_ENTITIES.map((entity, i) => (
              <span
                key={`a-${i}`}
                className={`uppercase text-[#666666] transition-colors duration-300 hover:text-[#0E0F10] whitespace-nowrap cursor-default ${entity.style}`}
              >
                {entity.name}
              </span>
            ))}
          </div>

          {/* Duplicate loop for seamless infinite loop */}
          <div className="flex items-center gap-16 sm:gap-24 pr-16 sm:pr-24" aria-hidden="true">
            {FICTIONAL_ENTITIES.map((entity, i) => (
              <span
                key={`b-${i}`}
                className={`uppercase text-[#666666] transition-colors duration-300 hover:text-[#0E0F10] whitespace-nowrap cursor-default ${entity.style}`}
              >
                {entity.name}
              </span>
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
          animation: marquee 42s linear infinite;
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
