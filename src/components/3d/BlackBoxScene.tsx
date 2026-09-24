"use client";

import dynamic from "next/dynamic";
import React from "react";

// Client-only dynamic import with SSR disabled to prevent hydration mismatch and server WebGL errors
const BlackBoxHeroClient = dynamic(() => import("./BlackBoxHero"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-screen bg-[#090A0A] text-white flex items-center justify-center">
      <div className="max-w-4xl px-6 sm:px-12 w-full space-y-6">
        <div className="text-xs font-mono tracking-widest text-white/40 uppercase">
          IMPACTA • EVIDENCE FUSION
        </div>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight uppercase leading-[0.98]">
          Accident evidence.
          <br />
          Structured.
        </h1>
        <div className="w-12 h-px bg-white/30" />
      </div>
    </div>
  ),
});

export default function BlackBoxScene() {
  return <BlackBoxHeroClient />;
}
