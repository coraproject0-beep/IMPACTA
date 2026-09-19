"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  // Hide navigation entirely during an active report
  if (pathname === "/app/report") {
    return null;
  }

  const navItems = [
    { label: "Home", href: "/app", icon: HomeIcon },
    { label: "Reports", href: "/app/reports", icon: FileTextIcon },
    { label: "Vehicle", href: "/app/vehicle", icon: CarIcon },
    { label: "Insurance", href: "/app/insurance", icon: ShieldIcon },
    { label: "Profile", href: "/app/profile", icon: UserIcon },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar (5 Items) */}
      {(variant === "all" || variant === "mobile") && (
        <nav
          aria-label="Consumer Navigation"
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 flex items-center justify-around select-none shadow-xs"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "text-blue-700 font-semibold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Icon size={18} className={isActive ? "text-blue-600" : "text-slate-400"} />
                <span className="text-[10px] tracking-tight">{item.label}</span>
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
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-slate-100 text-slate-950 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon size={14} className={isActive ? "text-blue-600" : "text-slate-400"} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
}
