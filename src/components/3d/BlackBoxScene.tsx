"use client";

import dynamic from "next/dynamic";
import React from "react";

// Client-only dynamic import with SSR disabled to prevent hydration mismatches
const BlackBoxVideoExperience = dynamic(
  () => import("@/components/public/BlackBoxVideoExperience"),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full h-screen bg-[#000000] text-white flex items-center justify-center">
        <div className="text-xs font-mono tracking-[0.25em] text-white/40 uppercase">
          SCATOLA NERA CANONICA
        </div>
      </div>
    ),
  }
);

export default function BlackBoxScene() {
  return <BlackBoxVideoExperience />;
}
