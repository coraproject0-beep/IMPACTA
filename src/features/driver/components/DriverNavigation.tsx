"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, FileTextIcon, UserIcon } from "@/components/icons/Icons";

export function DriverNavigation() {
  const pathname = usePathname();

  // Hide navigation entirely during an active report
  if (pathname === "/app/report") {
    return null;
  }

  const navItems = [
    { label: "Home", href: "/app", icon: HomeIcon },
    { label: "Reports", href: "/app/reports", icon: FileTextIcon },
    { label: "Profile", href: "/app/profile", icon: UserIcon },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav
        aria-label="Consumer Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-6 py-2 flex items-center justify-around select-none shadow-xs"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-1 px-4 rounded-md transition-colors ${
                isActive
                  ? "text-slate-950 font-semibold"
                  : "text-slate-600 hover:text-slate-700"
              }`}
            >
              <Icon size={20} className={isActive ? "text-blue-600" : "text-slate-500"} />
              <span className="text-[11px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Desktop Navigation Tabs in Header */}
      <nav
        aria-label="Consumer Desktop Navigation"
        className="hidden md:flex items-center gap-1.5"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                isActive
                  ? "bg-slate-100 text-slate-950 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Icon size={15} className={isActive ? "text-blue-600" : "text-slate-400"} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
