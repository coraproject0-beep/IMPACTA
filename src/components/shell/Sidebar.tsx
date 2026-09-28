"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClaims } from "@/context/ClaimsContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  nameIt: string;
  href: string;
  badgeCount?: number;
}

export function Sidebar({ onCloseMobile }: { onCloseMobile?: () => void }) {
  const pathname = usePathname();
  const { claims, stats, resetDemoData } = useClaims();
  const { logoutInsurer } = useAuth();
  const { language } = useLanguage();
  const isIt = language === "it";
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const navItems: NavItem[] = [
    {
      name: "Overview",
      nameIt: "Panoramica",
      href: "/console/overview",
    },
    {
      name: "Claims",
      nameIt: "Sinistri",
      href: "/console/claims",
      badgeCount: claims.length,
    },
    {
      name: "Review",
      nameIt: "Perizia",
      href: "/console/review",
      badgeCount: stats.manualReviewRequiredCount,
    },
    {
      name: "Analytics",
      nameIt: "Statistiche",
      href: "/console/analytics",
    },
  ];

  const handleReset = async () => {
    if (
      window.confirm(
        isIt
          ? "Ripristinare i dati dimostrativi? Questo ripristinerà i sinistri sintetici originali."
          : "Reset demo data? This will restore original synthetic claims and clear locally uploaded media."
      )
    ) {
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
    <aside className="w-60 flex-shrink-0 bg-[#F7F7F6] border-r border-[#E5E5E3] flex flex-col h-full select-none text-[#0E0F10]">
      {/* Brand Header */}
      <div className="h-20 flex flex-col justify-center px-6 border-b border-[#E5E5E3]">
        <Link
          href="/"
          onClick={onCloseMobile}
          className="group block focus:outline-none"
          title="Return to Public IMPACTA Corporate Website"
        >
          <div className="text-lg font-black tracking-tight text-[#0E0F10]">
            IMPACTA
          </div>
          <div className="text-[11px] text-[#666666] font-medium tracking-tight">
            {isIt ? "Operazioni Sinistri" : "Claims Operations"}
          </div>
        </Link>
      </div>

      {/* Main Navigation (Reference: Text-only, left black line for active) */}
      <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto" aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/console/overview" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={cn(
                "flex items-center justify-between py-2.5 px-3 text-sm transition-colors",
                isActive
                  ? "border-l-2 border-[#0E0F10] text-[#0E0F10] font-bold pl-3"
                  : "border-l-2 border-transparent text-[#666666] hover:text-[#0E0F10] font-medium pl-3"
              )}
            >
              <span>{isIt ? item.nameIt : item.name}</span>
              {item.badgeCount !== undefined && item.badgeCount > 0 && (
                <span className="text-xs font-mono text-[#666666]">
                  {item.badgeCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Quiet Utility Area */}
      <div className="p-5 border-t border-[#E5E5E3] space-y-4">
        <Link
          href="/"
          className="flex items-center justify-between text-xs text-[#666666] hover:text-[#0E0F10] transition-colors"
        >
          <span>{isIt ? "Torna a IMPACTA" : "Back to IMPACTA"}</span>
          <span className="text-[11px]">↗</span>
        </Link>

        {/* Reset Demo Data Trigger */}
        <button
          type="button"
          onClick={handleReset}
          disabled={isResetting}
          className="w-full text-left py-1 text-xs text-[#666666] hover:text-[#0E0F10] transition-colors disabled:opacity-50"
        >
          {isResetting
            ? (isIt ? "Ripristino dati..." : "Resetting data...")
            : resetSuccess
            ? (isIt ? "✓ Dati ripristinati" : "✓ Demo data restored")
            : (isIt ? "Ripristina dati demo" : "Reset demo data")}
        </button>

        <button
          type="button"
          onClick={() => {
            logoutInsurer();
            window.location.href = "/console/login";
          }}
          className="w-full text-left py-1 text-xs text-[#666666] hover:text-rose-600 transition-colors"
        >
          {isIt ? "Esci dal portale" : "Logout"}
        </button>

        <div className="pt-2 border-t border-[#E5E5E3] text-[11px] text-[#666666] leading-tight">
          <div className="font-semibold text-[#0E0F10]">
            Aura Mutua Assicurazioni
          </div>
          <div className="mt-0.5">Milan Claims Desk</div>
        </div>
      </div>
    </aside>
  );
}
