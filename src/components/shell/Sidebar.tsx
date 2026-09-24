"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ActivityIcon,
  BarChartIcon,
  LayersIcon,
  AlertTriangleIcon,
} from "@/components/icons/Icons";
import { useClaims } from "@/context/ClaimsContext";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badgeCount?: number;
}

export function Sidebar({ onCloseMobile }: { onCloseMobile?: () => void }) {
  const pathname = usePathname();
  const { stats, resetDemoData } = useClaims();
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const navItems: NavItem[] = [
    {
      name: "Overview",
      href: "/console/overview",
      icon: ActivityIcon,
    },
    {
      name: "Claims",
      href: "/console/claims",
      icon: LayersIcon,
      badgeCount: stats.openClaims,
    },
    {
      name: "Review Queue",
      href: "/console/review",
      icon: AlertTriangleIcon,
      badgeCount: stats.manualReviewRequiredCount,
    },
    {
      name: "Pipeline Analytics",
      href: "/console/analytics",
      icon: BarChartIcon,
    },
  ];

  const handleReset = async () => {
    if (window.confirm("Reset demo data? This will restore original synthetic claims and clear locally uploaded media.")) {
      setIsResetting(true);
      try {
        await resetDemoData();
        setResetSuccess(true);
        setTimeout(() => setResetSuccess(false), 3000);
      } finally {
        setIsResetting(false);
      }
    }
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col h-full select-none">
      {/* Brand Header explicitly linking to PUBLIC HOME (/) */}
      <div className="h-16 flex items-center px-5 border-b border-slate-200">
        <Link
          href="/"
          onClick={onCloseMobile}
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
          title="Return to Public IMPACTA Corporate Website"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-950 text-white flex items-center justify-center font-bold tracking-wider text-sm shadow-xs group-hover:bg-blue-600 transition-colors">
            IM
          </div>
          <div>
            <div className="text-base font-extrabold tracking-tight text-slate-950">
              IMPACTA
            </div>
            <div className="text-xs text-slate-500 font-medium tracking-tight">
              Claims Operations
            </div>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-4 overflow-y-auto" aria-label="Main navigation">
        <div>
          <div className="px-3 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Operations Workspace
          </div>
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/console/overview" && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]",
                    isActive
                      ? "bg-slate-100 text-slate-950 font-bold border border-slate-200"
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-50 border border-transparent"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={18}
                      className={cn(
                        "transition-colors",
                        isActive ? "text-blue-700" : "text-slate-400 group-hover:text-slate-600"
                      )}
                    />
                    <span>{item.name}</span>
                  </div>
                  {item.badgeCount !== undefined && item.badgeCount > 0 && (
                    <span
                      className={cn(
                        "text-xs font-mono px-2 py-0.5 rounded-md font-semibold",
                        item.href === "/console/review"
                          ? "bg-amber-100 text-amber-900 border border-amber-300"
                          : "bg-slate-100 text-slate-800 border border-slate-200"
                      )}
                    >
                      {item.badgeCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Bottom Quiet Utility Area */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/70 space-y-3">
        <Link
          href="/"
          className="flex items-center justify-between text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors p-1"
        >
          <span>← Back to IMPACTA.eu</span>
          <span className="text-slate-400 font-mono">Public</span>
        </Link>

        {/* Reset Demo Data Trigger */}
        <button
          type="button"
          onClick={handleReset}
          disabled={isResetting}
          className="w-full text-center py-2 px-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors disabled:opacity-50 min-h-[38px]"
        >
          {isResetting ? "Resetting data..." : resetSuccess ? "✓ Demo data restored" : "Reset Demo Data"}
        </button>

        <div className="p-2.5 rounded-lg border border-slate-200 bg-white text-xs space-y-1 text-slate-600">
          <div className="font-bold text-slate-900">
            Aura Mutua Assicurazioni
          </div>
          <p className="leading-relaxed text-slate-500 text-[11px]">
            Academic claims console prototype. Shared local browser persistence active.
          </p>
        </div>
      </div>
    </aside>
  );
}
