"use client";

import React from "react";

interface EmergencyRadarProps {
  size?: number;
  className?: string;
  showSweep?: boolean;
}

export function EmergencyRadar({
  size = 24,
  className = "",
  showSweep = true,
}: EmergencyRadarProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="radarSweepGradV5" x1="24" y1="24" x2="44" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E11D48" stopOpacity="0.35" />
            <stop offset="1" stopColor="#E11D48" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer boundary perimeter (stable reference ring) */}
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="#E11D48"
          strokeWidth="0.8"
          strokeOpacity="0.25"
        />

        {/* Expanding Ring 1 (Wave 1: T = 0ms) */}
        <circle
          cx="24"
          cy="24"
          r="21"
          stroke="#E11D48"
          strokeWidth="1.2"
          className="radar-ring-wave-1"
        />

        {/* Expanding Ring 2 (Wave 2: T = +350ms) */}
        <circle
          cx="24"
          cy="24"
          r="21"
          stroke="#E11D48"
          strokeWidth="1.2"
          className="radar-ring-wave-2"
        />

        {/* Expanding Ring 3 (Wave 3: T = +700ms) */}
        <circle
          cx="24"
          cy="24"
          r="21"
          stroke="#E11D48"
          strokeWidth="1.2"
          className="radar-ring-wave-3"
        />

        {/* Optional Faint Rotating Sweep Line & Beam */}
        {showSweep && (
          <g className="radar-sweep-beam">
            <line
              x1="24"
              y1="24"
              x2="45"
              y2="24"
              stroke="#E11D48"
              strokeWidth="1"
              strokeLinecap="round"
              strokeOpacity="0.6"
            />
            {/* Subtle beam sector */}
            <path
              d="M 24 24 L 45 24 A 21 21 0 0 0 38.8 9.1 Z"
              fill="url(#radarSweepGradV5)"
              className="opacity-30"
            />
          </g>
        )}

        {/* Solid Small Red Core + Crisp Center Specular */}
        <circle cx="24" cy="24" r="4" fill="#E11D48" className="radar-core-pulse" />
        <circle cx="24" cy="24" r="1.6" fill="#FFFFFF" />
      </svg>

      <style jsx>{`
        .radar-sweep-beam {
          transform-origin: 24px 24px;
          animation: radarSweepAnim 2.8s linear infinite;
        }

        .radar-ring-wave-1 {
          transform-origin: 24px 24px;
          animation: radarPulsePam 1.6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }

        .radar-ring-wave-2 {
          transform-origin: 24px 24px;
          animation: radarPulsePam 1.6s cubic-bezier(0.16, 1, 0.3, 1) infinite 0.35s;
        }

        .radar-ring-wave-3 {
          transform-origin: 24px 24px;
          animation: radarPulsePam 1.6s cubic-bezier(0.16, 1, 0.3, 1) infinite 0.7s;
        }

        .radar-core-pulse {
          transform-origin: 24px 24px;
          animation: radarCorePam 1.6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }

        @keyframes radarPulsePam {
          0% {
            transform: scale(0.25);
            opacity: 0.95;
            stroke-width: 2px;
          }
          45% {
            opacity: 0.55;
            stroke-width: 1.2px;
          }
          100% {
            transform: scale(1.05);
            opacity: 0;
            stroke-width: 0.6px;
          }
        }

        @keyframes radarCorePam {
          0%, 100% {
            transform: scale(1);
            opacity: 0.92;
          }
          20% {
            transform: scale(1.15);
            opacity: 1;
          }
          40% {
            transform: scale(1);
            opacity: 0.92;
          }
        }

        @keyframes radarSweepAnim {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .radar-sweep-beam,
          .radar-ring-wave-1,
          .radar-ring-wave-2,
          .radar-ring-wave-3,
          .radar-core-pulse {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
