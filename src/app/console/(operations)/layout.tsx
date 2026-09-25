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
      <div className="min-h-screen bg-[#F7F7F6] flex items-center justify-center">
        <span className="text-xs text-[#555555]">
          Caricamento...
        </span>
      </div>
    );
  }

  if (!isInsurerAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0E0F10] flex items-center justify-center">
        <span className="text-xs text-white/60">
          Accesso in corso...
        </span>
      </div>
    );
  }

  return <GlobalShell>{children}</GlobalShell>;
}
