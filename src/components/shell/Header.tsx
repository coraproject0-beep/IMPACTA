"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  SearchIcon,
  MenuIcon,
  ChevronRightIcon,
  UserIcon,
  CloseIcon,
  ActivityIcon,
} from "@/components/icons/Icons";
import { useClaims } from "@/context/ClaimsContext";
import { getStatusBadgeClass, getStatusLabel } from "@/lib/utils";

interface HeaderProps {
  onOpenMobile: () => void;
}

export function Header({ onOpenMobile }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { claims, currentReviewer } = useClaims();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Filter claims based on quick search query
  const filteredClaims = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return claims
      .filter(
        (c) =>
          c.id.toLowerCase().includes(q) ||
          c.policyholder.fullName.toLowerCase().includes(q) ||
          c.vehicleA.plate.toLowerCase().includes(q) ||
          (c.vehicleB?.plate && c.vehicleB.plate.toLowerCase().includes(q)) ||
          c.incident.location.city.toLowerCase().includes(q)
      )
      .slice(0, 5);
  }, [claims, searchQuery]);

  // Click outside search results to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Compute breadcrumbs
  const breadcrumbs = React.useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0 || (parts[0] === "console" && (parts.length === 1 || parts[1] === "overview"))) {
      return [{ label: "Console Overview", href: "/console/overview" }];
    }
    if (parts[0] === "console" && parts[1] === "claims") {
      if (parts.length === 2) {
        return [{ label: "Claims Ledger", href: "/console/claims" }];
      }
      return [
        { label: "Claims", href: "/console/claims" },
        { label: parts[2], href: `/console/claims/${parts[2]}` },
      ];
    }
    if (parts[0] === "console" && parts[1] === "review") {
      return [{ label: "AI Review Queue", href: "/console/review" }];
    }
    if (parts[0] === "console" && parts[1] === "analytics") {
      return [{ label: "Pipeline Analytics", href: "/console/analytics" }];
    }
    if (parts[0] === "claims") {
      return [{ label: "Claims", href: "/console/claims" }];
    }
    return parts.map((p, i) => ({ label: p, href: "/" + parts.slice(0, i + 1).join("/") }));
  }, [pathname]);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between gap-4 select-none">
      {/* Left: Mobile trigger & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMobile}
          aria-label="Open menu"
          className="md:hidden p-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <MenuIcon size={20} />
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center text-xs font-medium text-slate-500 truncate">
          <Link href="/console/overview" className="hover:text-slate-900 transition-colors">
            IMPACTA
          </Link>
          {breadcrumbs.map((bc, idx) => (
            <React.Fragment key={bc.href}>
              <ChevronRightIcon size={14} className="mx-1.5 text-slate-400 flex-shrink-0" />
              {idx === breadcrumbs.length - 1 ? (
                <span className="text-slate-900 font-semibold truncate">
                  {bc.label}
                </span>
              ) : (
                <Link href={bc.href} className="hover:text-slate-900 transition-colors truncate">
                  {bc.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right: Quick Search & Reviewer identity */}
      <div className="flex items-center gap-3 flex-shrink-0">

        {/* Global Search Input */}
        <div ref={searchContainerRef} className="relative hidden sm:block w-64 md:w-80">
          <div className="relative">
            <SearchIcon
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search ID, plate, policyholder..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full pl-9 pr-8 py-1.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs text-slate-900 placeholder:text-slate-400 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <CloseIcon size={13} />
              </button>
            )}
          </div>

          {/* Quick Search Dropdown */}
          {isSearchOpen && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-md shadow-lg z-50 overflow-hidden text-xs">
              <div className="px-3 py-1.5 bg-slate-50 border-b border-slate-200 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Matching Claims ({filteredClaims.length})
              </div>
              {filteredClaims.length === 0 ? (
                <div className="p-4 text-center text-slate-500 text-xs">
                  No claims found matching &quot;{searchQuery}&quot;
                </div>
              ) : (
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {filteredClaims.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                        router.push(`/console/claims/${c.id}`);
                      }}
                      className="w-full text-left px-3 py-2.5 hover:bg-slate-50 flex items-center justify-between gap-2 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 flex items-center gap-2">
                          <span>{c.id}</span>
                          <span className="font-normal text-slate-500">• {c.policyholder.fullName}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {c.vehicleA.plate} ({c.vehicleA.make} {c.vehicleA.model}) • {c.incident.location.city}
                        </div>
                      </div>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${getStatusBadgeClass(
                          c.status
                        )}`}
                      >
                        {getStatusLabel(c.status)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Reviewer Profile Badge */}
        <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
          <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-semibold">
            {currentReviewer.avatarInitials}
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-semibold text-slate-900 leading-tight">
              {currentReviewer.name}
            </div>
            <div className="text-[10px] text-slate-500 leading-tight">
              {currentReviewer.role}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
