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

  // Desktop navigation maintains core surfaces
  const desktopNavItems = [
    { label: t("nav.driverHome"), href: "/app", icon: HomeIcon },
    { label: t("nav.reports"), href: "/app/reports", icon: FileTextIcon },
    { label: t("nav.vehicle"), href: "/app/vehicle", icon: CarIcon },
    { label: t("nav.insurance"), href: "/app/insurance", icon: ShieldIcon },
    { label: t("nav.profile"), href: "/app/profile", icon: UserIcon },
  ];

  // Mobile bottom bar matches driver-home-reference.png (Home, Reports, Profile)
  const mobileNavItems = [
    { label: t("nav.driverHome"), href: "/app", icon: HomeIcon },
    { label: t("nav.reports"), href: "/app/reports", icon: FileTextIcon },
    { label: t("nav.profile"), href: "/app/profile", icon: UserIcon },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar matching driver-home-reference.png */}
      {(variant === "all" || variant === "mobile") && (
        <nav
          aria-label="Consumer Mobile Navigation"
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F7F7F6]/95 backdrop-blur-md border-t border-[#E5E5E3] px-6 py-2.5 flex items-center justify-around select-none"
        >
          {mobileNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`min-h-[48px] min-w-[72px] flex flex-col items-center justify-center gap-1 transition-colors ${
                  isActive
                    ? "text-[#0E0F10] font-semibold"
                    : "text-[#666666] hover:text-[#0E0F10]"
                }`}
              >
                <Icon size={22} className={isActive ? "text-[#0E0F10]" : "text-[#666666]"} />
                <span className="text-xs tracking-normal">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      )}

      {/* Desktop Navigation Tabs */}
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
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? "text-[#0E0F10] font-bold border-b-2 border-[#0E0F10]"
                    : "text-[#666666] hover:text-[#0E0F10]"
                }`}
              >
                <Icon size={16} className={isActive ? "text-[#0E0F10]" : "text-[#666666]"} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
}
