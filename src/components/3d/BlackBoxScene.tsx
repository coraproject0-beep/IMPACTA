"use client";

import dynamic from "next/dynamic";
import React from "react";

// Client-only dynamic import with SSR disabled to prevent hydration mismatches
const BlackBoxVideoExperience = dynamic(
  () => import("@/components/public/BlackBoxVideoExperience"),
  {
    ssr: false,
    loading: () => <div className="relative w-full h-screen bg-[#000000]" />,
  }
);

export default function BlackBoxScene() {
  return <BlackBoxVideoExperience />;
}
