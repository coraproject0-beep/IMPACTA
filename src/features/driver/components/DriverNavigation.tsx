"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import {
  HomeIcon,
  FileTextIcon,
  CarIcon,
  ShieldIcon,
  UserIcon,
} from "@/components/icons/Icons";

interface DriverNavigationProps {
  variant?: "all" | "desktop" | "mobile";
}

export function DriverNavigation({ variant = "all" }: DriverNavigationProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  // Hide navigation entirely during an active report
  if (pathname === "/app/report") {
    return null;
  }

  // Desktop navigation maintains all 5 core surfaces
  const desktopNavItems = [
    { label: t.nav.driverHome, href: "/app", icon: HomeIcon },
    { label: t.nav.reports, href: "/app/reports", icon: FileTextIcon },
    { label: t.nav.vehicle, href: "/app/vehicle", icon: CarIcon },
    { label: t.nav.insurance, href: "/app/insurance", icon: ShieldIcon },
    { label: t.nav.profile, href: "/app/profile", icon: UserIcon },
  ];

  // Mobile bottom bar focuses on the 3 essential destinations (minimized clutter)
  const mobileNavItems = [
    { label: t.nav.driverHome, href: "/app", icon: HomeIcon },
    { label: t.nav.reports, href: "/app/reports", icon: FileTextIcon },
    { label: t.nav.profile, href: "/app/profile", icon: UserIcon },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar (3 Items, comfortable touch target >= 44px) */}
      {(variant === "all" || variant === "mobile") && (
        <nav
          aria-label="Consumer Mobile Navigation"
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2 flex items-center justify-around select-none shadow-sm"
        >
          {mobileNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`min-h-[44px] min-w-[64px] flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl transition-colors ${
                  isActive
                    ? "text-blue-700 font-bold bg-blue-50/60"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Icon size={20} className={isActive ? "text-blue-600" : "text-slate-400"} />
                <span className="text-[11px] tracking-tight">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      )}

      {/* Desktop Navigation Tabs in Header */}
      {(variant === "all" || variant === "desktop") && (
        <nav
          aria-label="Consumer Desktop Navigation"
          className="hidden md:flex items-center gap-1"
        >
          {desktopNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-slate-100 text-slate-950 font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon size={15} className={isActive ? "text-blue-600" : "text-slate-400"} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
}
