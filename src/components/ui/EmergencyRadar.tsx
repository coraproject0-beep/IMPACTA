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
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="radarSweepGrad" x1="24" y1="24" x2="44" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E11D48" stopOpacity="0.45" />
            <stop offset="1" stopColor="#E11D48" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer boundary ring */}
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="#E11D48"
          strokeWidth="0.75"
          className="opacity-25"
        />

        {/* Concentric Breathing Wave Ring 1 */}
        <circle
          cx="24"
          cy="24"
          r="16"
          stroke="#E11D48"
          strokeWidth="1"
          className="radar-ring-1"
        />

        {/* Concentric Breathing Wave Ring 2 */}
        <circle
          cx="24"
          cy="24"
          r="10"
          stroke="#E11D48"
          strokeWidth="1"
          className="radar-ring-2"
        />

        {/* Optional Rotating Sweep Line & Beam */}
        {showSweep && (
          <g className="radar-sweep-beam origin-center">
            <line
              x1="24"
              y1="24"
              x2="46"
              y2="24"
              stroke="#E11D48"
              strokeWidth="1.25"
              strokeLinecap="round"
              className="opacity-75"
            />
            {/* Subtle beam sector */}
            <path
              d="M 24 24 L 46 24 A 22 22 0 0 0 39.5 8.5 Z"
              fill="url(#radarSweepGrad)"
              className="opacity-40"
            />
          </g>
        )}

        {/* Center Emergency Node */}
        <circle cx="24" cy="24" r="3.75" fill="#E11D48" className="radar-node-pulse" />
        <circle cx="24" cy="24" r="1.5" fill="#FFFFFF" />
      </svg>

      <style jsx>{`
        .radar-sweep-beam {
          transform-origin: 24px 24px;
          animation: radarSweep 3.2s linear infinite;
        }

        .radar-ring-1 {
          transform-origin: 24px 24px;
          animation: ringPulse 2.8s ease-out infinite;
        }

        .radar-ring-2 {
          transform-origin: 24px 24px;
          animation: ringPulse 2.8s ease-out infinite 0.7s;
        }

        .radar-node-pulse {
          animation: nodeGlow 2.4s ease-in-out infinite;
        }

        @keyframes radarSweep {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes ringPulse {
          0% {
            r: 8px;
            opacity: 0.7;
          }
          50% {
            opacity: 0.35;
          }
          100% {
            r: 21px;
            opacity: 0;
          }
        }

        @keyframes nodeGlow {
          0%, 100% {
            opacity: 0.9;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .radar-sweep-beam,
          .radar-ring-1,
          .radar-ring-2,
          .radar-node-pulse {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
