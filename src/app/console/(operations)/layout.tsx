"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { GlobalShell } from "@/components/shell/GlobalShell";

export default function OperationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isInsurerAuthenticated } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isInsurerAuthenticated) {
      router.push("/console/login");
    }
  }, [mounted, isInsurerAuthenticated, router]);

  // Wait for initial mount before checking auth to avoid hydration flicker
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F4F5F3] flex items-center justify-center">
        <span className="text-xs font-mono uppercase tracking-widest text-[#6F7375]">
          INITIALIZING WORKBENCH...
        </span>
      </div>
    );
  }

  if (!isInsurerAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090A0A] flex items-center justify-center">
        <span className="text-xs font-mono uppercase tracking-widest text-white/60">
          REDIRECTING TO CARRIER GATE...
        </span>
      </div>
    );
  }

  return <GlobalShell>{children}</GlobalShell>;
}
