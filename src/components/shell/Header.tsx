"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  SearchIcon,
  MenuIcon,
  CloseIcon,
} from "@/components/icons/Icons";
import { useClaims } from "@/context/ClaimsContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { getStatusBadgeClass, getStatusLabel } from "@/lib/utils";

interface HeaderProps {
  onOpenMobile: () => void;
}

export function Header({ onOpenMobile }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { claims, currentReviewer } = useClaims();
  const { insurerUser, logoutInsurer } = useAuth();
  const { language, setLocale } = useLanguage();
  const isIt = language === "it";

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);

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

  // Click outside search results or account menu to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchOpen(false);
      }
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(e.target as Node)
      ) {
        setAccountMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logoutInsurer();
    router.push("/console/login");
  };

  // Compute breadcrumbs
  const breadcrumbs = React.useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0 || (parts[0] === "console" && (parts.length === 1 || parts[1] === "overview"))) {
      return [{ label: isIt ? "Panoramica" : "Overview", href: "/console/overview" }];
    }
    if (parts[0] === "console" && parts[1] === "claims") {
      if (parts.length === 2) {
        return [{ label: isIt ? "Sinistri" : "Claims", href: "/console/claims" }];
      }
      return [
        { label: isIt ? "Sinistri" : "Claims", href: "/console/claims" },
        { label: parts[2], href: `/console/claims/${parts[2]}` },
      ];
    }
    if (parts[0] === "console" && parts[1] === "review") {
      return [{ label: isIt ? "Perizia" : "Review", href: "/console/review" }];
    }
    if (parts[0] === "console" && parts[1] === "analytics") {
      return [{ label: isIt ? "Statistiche" : "Analytics", href: "/console/analytics" }];
    }
    return parts.map((p, i) => ({ label: p, href: "/" + parts.slice(0, i + 1).join("/") }));
  }, [pathname, isIt]);

  return (
    <header className="h-20 bg-[#F7F7F6] border-b border-[#E5E5E3] px-6 md:px-10 flex items-center justify-between gap-4 select-none">
      {/* Left: Mobile trigger & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMobile}
          aria-label="Open menu"
          className="md:hidden p-2 rounded text-[#0E0F10] hover:bg-[#E5E5E3]/50 focus:outline-none"
        >
          <MenuIcon size={20} />
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center text-xs text-[#666666] truncate font-medium">
          <Link
            href="/"
            className="hover:text-[#0E0F10] transition-colors font-bold text-[#0E0F10]"
            title="IMPACTA Home"
          >
            IMPACTA
          </Link>
          <span className="mx-2 text-[#E5E5E3]">/</span>
          {breadcrumbs.map((bc, idx) => (
            <React.Fragment key={bc.href}>
              {idx > 0 && <span className="mx-2 text-[#E5E5E3]">/</span>}
              {idx === breadcrumbs.length - 1 ? (
                <span className="text-[#0E0F10] font-semibold truncate font-mono text-xs">
                  {bc.label}
                </span>
              ) : (
                <Link href={bc.href} className="hover:text-[#0E0F10] transition-colors truncate">
                  {bc.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right: Quick Search, Language Switcher & Insurer Account Menu */}
      <div className="flex items-center gap-4 flex-shrink-0">
        {/* Global Search Input */}
        <div ref={searchContainerRef} className="relative hidden md:block w-64 lg:w-72">
          <div className="relative">
            <SearchIcon
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666] pointer-events-none"
            />
            <input
              type="text"
              placeholder={isIt ? "Cerca sinistro, targa, città..." : "Search claim, plate, city..."}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full pl-8 pr-7 py-2 bg-white text-xs text-[#0E0F10] placeholder:text-[#666666] border border-[#E5E5E3] rounded-lg focus:outline-none focus:border-[#0E0F10] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#0E0F10]"
              >
                <CloseIcon size={12} />
              </button>
            )}
          </div>

          {/* Quick Search Dropdown */}
          {isSearchOpen && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 mt-1.5 bg-white border border-[#E5E5E3] rounded-xl shadow-lg z-50 overflow-hidden text-xs">
              <div className="px-3 py-2 bg-[#F7F7F6] border-b border-[#E5E5E3] font-semibold text-[#666666]">
                {isIt ? "Risultati (" : "Matching Claims ("}{filteredClaims.length})
              </div>
              {filteredClaims.length === 0 ? (
                <div className="p-4 text-center text-[#666666]">
                  {isIt ? "Nessun sinistro corrispondente" : "No claims found matching"} &quot;{searchQuery}&quot;
                </div>
              ) : (
                <div className="divide-y divide-[#E5E5E3] max-h-72 overflow-y-auto">
                  {filteredClaims.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                        router.push(`/console/claims/${c.id}`);
                      }}
                      className="w-full text-left px-3.5 py-2.5 hover:bg-[#F7F7F6] flex items-center justify-between gap-2 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="font-semibold text-[#0E0F10] flex items-center gap-2">
                          <span className="font-mono">{c.id}</span>
                          <span className="font-normal text-[#666666]">• {c.policyholder.fullName}</span>
                        </div>
                        <div className="text-[11px] text-[#666666] truncate font-mono">
                          {c.vehicleA.plate} • {c.incident.location.city}
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${getStatusBadgeClass(
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

        {/* Minimal Language Switcher */}
        <div className="flex items-center text-xs font-mono font-medium border border-[#E5E5E3] rounded-md overflow-hidden bg-white">
          <button
            type="button"
            onClick={() => setLocale("en")}
            className={`px-2 py-1 transition-colors ${
              language === "en" ? "bg-[#0E0F10] text-white" : "text-[#666666] hover:text-[#0E0F10]"
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLocale("it")}
            className={`px-2 py-1 transition-colors ${
              language === "it" ? "bg-[#0E0F10] text-white" : "text-[#666666] hover:text-[#0E0F10]"
            }`}
          >
            IT
          </button>
        </div>

        {/* Insurer Account Menu */}
        <div ref={accountMenuRef} className="relative">
          <button
            type="button"
            onClick={() => setAccountMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 pl-2 py-1 text-left rounded hover:bg-[#E5E5E3]/40 transition-colors focus:outline-none"
            aria-expanded={accountMenuOpen}
            aria-haspopup="true"
          >
            <div className="w-8 h-8 rounded-full bg-[#0E0F10] text-white flex items-center justify-center text-xs font-bold font-mono">
              {currentReviewer.avatarInitials}
            </div>
            <div className="hidden lg:block">
              <div className="text-xs font-bold text-[#0E0F10] leading-tight">
                {insurerUser?.name || currentReviewer.name}
              </div>
              <div className="text-[11px] text-[#666666] leading-tight">
                {insurerUser?.organization || "Aura Mutua"}
              </div>
            </div>
          </button>

          {accountMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#E5E5E3] py-2 z-50 text-xs">
              <div className="px-4 py-3 border-b border-[#E5E5E3]">
                <p className="font-bold text-[#0E0F10]">
                  {insurerUser?.name || currentReviewer.name}
                </p>
                <p className="text-[11px] text-[#666666] font-mono">
                  {insurerUser?.email || currentReviewer.email}
                </p>
                <p className="text-[11px] text-[#0E0F10] font-semibold mt-1">
                  {insurerUser?.organization || "Aura Mutua Assicurazioni"}
                </p>
              </div>

              <div className="py-1">
                <Link
                  href="/"
                  onClick={() => setAccountMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-2 text-[#666666] hover:bg-[#F7F7F6] hover:text-[#0E0F10] transition-colors"
                >
                  <span>{isIt ? "Torna al sito principale" : "Back to IMPACTA Website"}</span>
                  <span className="text-[10px]">↗</span>
                </Link>
                <Link
                  href="/console/overview"
                  onClick={() => setAccountMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-2 text-[#666666] hover:bg-[#F7F7F6] hover:text-[#0E0F10] transition-colors"
                >
                  <span>{isIt ? "Panoramica Operazioni" : "Operations Overview"}</span>
                </Link>
              </div>

              <div className="border-t border-[#E5E5E3] pt-1">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 font-medium transition-colors"
                >
                  {isIt ? "Disconnetti" : "Log out"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
