"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ActivityIcon,
  BarChartIcon,
  CheckCircleIcon,
  CpuIcon,
  LayersIcon,
  ShieldIcon,
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
      name: "AI Review Queue",
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
      {/* Brand Header */}
      <div className="h-16 flex items-center px-5 border-b border-slate-200">
        <Link
          href="/console/overview"
          onClick={onCloseMobile}
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
        >
          <div className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center font-bold tracking-wider text-sm shadow-sm group-hover:bg-blue-600 transition-colors">
            IM
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-slate-950 flex items-center gap-1.5">
              IMPACTA
              <span className="text-[10px] font-mono font-medium px-1 py-0.2 bg-blue-50 text-blue-700 border border-blue-200 rounded">
                v1.0
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium tracking-tight">
              Claims Intelligence
            </div>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto" aria-label="Main navigation">
        <div>
          <div className="px-2 pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Operations Console
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
                    "flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                    isActive
                      ? "bg-slate-100 text-slate-950 font-semibold border border-slate-200"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      size={16}
                      className={cn(
                        "transition-colors",
                        isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                      )}
                    />
                    <span>{item.name}</span>
                  </div>
                  {item.badgeCount !== undefined && item.badgeCount > 0 && (
                    <span
                      className={cn(
                        "text-[10px] font-mono px-1.5 py-0.2 rounded-full border",
                        item.href === "/console/review"
                          ? "bg-amber-50 text-amber-800 border-amber-300 font-bold"
                          : "bg-slate-100 text-slate-700 border-slate-200"
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
      <div className="p-3 border-t border-slate-200 bg-slate-50/70 space-y-2">
        <div className="flex items-center justify-between px-2 text-[11px] text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Local Engine Active</span>
          </div>
        </div>

        {/* Discrete Reset Demo Data Trigger */}
        <button
          type="button"
          onClick={handleReset}
          disabled={isResetting}
          className="w-full text-center py-1 px-2 rounded border border-slate-300 bg-white hover:bg-slate-100 text-[11px] font-medium text-slate-700 transition-colors disabled:opacity-50"
        >
          {isResetting ? "Resetting data..." : resetSuccess ? "✓ Demo data restored" : "Reset Demo Data"}
        </button>

        <div className="p-2 rounded border border-slate-200 bg-white text-[10px] space-y-1 text-slate-500">
          <div className="font-semibold text-slate-800 flex items-center justify-between">
            <span>DEMO ENVIRONMENT</span>
            <span className="text-[9px] uppercase px-1 py-0.2 bg-slate-100 border border-slate-200 text-slate-600 rounded">
              Synthetic
            </span>
          </div>
          <p className="leading-tight text-[10px] text-slate-500">
            Token Titans academic prototype. Shared browser persistence active.
          </p>
        </div>
      </div>
    </aside>
  );
}
