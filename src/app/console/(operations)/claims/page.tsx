"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useClaims } from "@/context/ClaimsContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  SearchIcon,
  FilterIcon,
  CloseIcon,
  CameraIcon,
} from "@/components/icons/Icons";
import {
  formatDate,
  formatTime,
  getStatusBadgeClass,
  getStatusLabel,
  getConfidenceBadgeClass,
} from "@/lib/utils";

type SortField = "incidentDate" | "confidence" | "id";
type SortOrder = "asc" | "desc";

export default function ConsoleClaimsPage() {
  const router = useRouter();
  const { claims, isLoading } = useClaims();
  const { language } = useLanguage();
  const isIt = language === "it";

  // Filter and search states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [confidenceFilter, setConfidenceFilter] = useState<string>("ALL");
  const [telemetryFilter, setTelemetryFilter] = useState<string>("ALL");
  const [sortField, setSortField] = useState<SortField>("incidentDate");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Check if any filter is active
  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    statusFilter !== "ALL" ||
    confidenceFilter !== "ALL" ||
    telemetryFilter !== "ALL";

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("ALL");
    setConfidenceFilter("ALL");
    setTelemetryFilter("ALL");
  };

  // Filtered and sorted claims
  const filteredClaims = useMemo(() => {
    return claims
      .filter((c) => {
        // Free text search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matches =
            c.id.toLowerCase().includes(q) ||
            c.policyholder.fullName.toLowerCase().includes(q) ||
            c.policyholder.fiscalCode.toLowerCase().includes(q) ||
            c.vehicleA.plate.toLowerCase().includes(q) ||
            (c.vehicleB?.plate && c.vehicleB.plate.toLowerCase().includes(q)) ||
            c.incident.location.city.toLowerCase().includes(q) ||
            c.incident.location.street.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Status filter
        if (statusFilter !== "ALL" && c.status !== statusFilter) {
          return false;
        }

        // Confidence filter
        if (confidenceFilter !== "ALL") {
          const conf = c.aiAnalysis.overallConfidence;
          if (confidenceFilter === "HIGH" && conf < 85) return false;
          if (confidenceFilter === "MEDIUM" && (conf < 70 || conf >= 85)) return false;
          if (confidenceFilter === "LOW" && conf >= 70) return false;
        }

        // Telemetry filter
        if (telemetryFilter !== "ALL") {
          const hasTelem = c.telemetry.hasTelemetry;
          if (telemetryFilter === "YES" && !hasTelem) return false;
          if (telemetryFilter === "NO" && hasTelem) return false;
        }

        return true;
      })
      .sort((a, b) => {
        let cmp = 0;
        if (sortField === "incidentDate") {
          cmp = new Date(a.incidentDate).getTime() - new Date(b.incidentDate).getTime();
        } else if (sortField === "confidence") {
          cmp = a.aiAnalysis.overallConfidence - b.aiAnalysis.overallConfidence;
        } else if (sortField === "id") {
          cmp = a.id.localeCompare(b.id);
        }
        return sortOrder === "asc" ? cmp : -cmp;
      });
  }, [claims, searchQuery, statusFilter, confidenceFilter, telemetryFilter, sortField, sortOrder]);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-xs font-mono text-[#666666] uppercase tracking-wider">
        {isIt ? "Caricamento archivio sinistri..." : "Loading claims directory..."}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E0F10]">
          {isIt ? "Archivio Sinistri" : "Claims Directory"}
        </h1>
        <p className="text-sm text-[#666666]">
          {isIt
            ? `Registro completo dei sinistri stradali (${filteredClaims.length} di ${claims.length} visibili)`
            : `Comprehensive ledger of active and archived motor accident dossiers (${filteredClaims.length} of ${claims.length} showing)`}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="border border-[#E5E5E3] bg-white rounded-xl p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Free-text Search */}
          <div className="lg:col-span-2 relative">
            <SearchIcon
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666] pointer-events-none"
            />
            <input
              type="text"
              placeholder={isIt ? "Cerca per ID, targa, assicurato, città..." : "Search by ID, plate, policyholder, city..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-7 py-2 bg-white border border-[#E5E5E3] rounded-lg text-xs text-[#0E0F10] placeholder:text-[#666666] focus:border-[#0E0F10] focus:outline-none transition-colors"
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

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#E5E5E3] rounded-lg text-xs text-[#0E0F10] focus:border-[#0E0F10] focus:outline-none"
            >
              <option value="ALL">{isIt ? "Stato: Tutti" : "Status: All"}</option>
              <option value="NEW">New</option>
              <option value="IN_REVIEW">In Review</option>
              <option value="CAI_READY">CAI Ready</option>
              <option value="REVIEWED">Reviewed</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          {/* AI Confidence Filter */}
          <div>
            <select
              value={confidenceFilter}
              onChange={(e) => setConfidenceFilter(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#E5E5E3] rounded-lg text-xs text-[#0E0F10] focus:border-[#0E0F10] focus:outline-none"
            >
              <option value="ALL">{isIt ? "Confidenza: Tutte" : "Certainty: All"}</option>
              <option value="HIGH">{isIt ? "Alta (≥ 85%)" : "High (≥ 85%)"}</option>
              <option value="MEDIUM">{isIt ? "Media (70% - 84%)" : "Medium (70% - 84%)"}</option>
              <option value="LOW">{isIt ? "Bassa (< 70%)" : "Low (< 70%)"}</option>
            </select>
          </div>

          {/* Telemetry Filter */}
          <div>
            <select
              value={telemetryFilter}
              onChange={(e) => setTelemetryFilter(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#E5E5E3] rounded-lg text-xs text-[#0E0F10] focus:border-[#0E0F10] focus:outline-none"
            >
              <option value="ALL">{isIt ? "Telemetria: Tutte" : "Telemetry: All"}</option>
              <option value="YES">{isIt ? "Presente" : "Present"}</option>
              <option value="NO">{isIt ? "Assente" : "None"}</option>
            </select>
          </div>
        </div>

        {/* Sorting & Clear row */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E5E5E3] text-xs text-[#666666]">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#0E0F10]">
              {isIt ? "Ordina per:" : "Sort by:"}
            </span>
            <div className="flex items-center gap-2">
              {[
                { id: "incidentDate", label: isIt ? "Data" : "Date" },
                { id: "confidence", label: isIt ? "Confidenza" : "Certainty" },
                { id: "id", label: "Claim ID" },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    if (sortField === s.id) {
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    } else {
                      setSortField(s.id as SortField);
                      setSortOrder("desc");
                    }
                  }}
                  className={`px-2.5 py-1 rounded text-xs transition-colors ${
                    sortField === s.id
                      ? "bg-[#0E0F10] text-white font-semibold"
                      : "bg-[#F7F7F6] text-[#666666] hover:text-[#0E0F10]"
                  }`}
                >
                  {s.label} {sortField === s.id ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </button>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="font-medium text-rose-600 hover:text-rose-800 flex items-center gap-1"
            >
              <CloseIcon size={12} />
              <span>{isIt ? "Azzera filtri" : "Clear filters"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Claims Table */}
      <div className="border border-[#E5E5E3] bg-white rounded-xl overflow-hidden">
        {filteredClaims.length === 0 ? (
          /* Empty State */
          <div className="py-16 px-6 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#F7F7F6] flex items-center justify-center text-[#666666] mb-3">
              <FilterIcon size={20} />
            </div>
            <h3 className="text-sm font-bold text-[#0E0F10]">
              {claims.length === 0
                ? isIt ? "Nessun sinistro registrato" : "No claims registered"
                : isIt ? "Nessun sinistro corrispondente" : "No matching claims found"}
            </h3>
            <p className="mt-1 text-xs text-[#666666] max-w-sm mx-auto">
              {claims.length === 0
                ? isIt ? "Il registro sinistri è attualmente vuoto." : "The claims directory is currently empty."
                : isIt
                ? "Nessun sinistro corrisponde ai filtri selezionati. Prova a modificare la ricerca."
                : "No claims match your active search filters. Try adjusting your query."}
            </p>
            {hasActiveFilters && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="px-3.5 py-1.5 text-xs font-semibold bg-[#0E0F10] text-white rounded-lg hover:bg-[#1A1B1C] transition-colors"
                >
                  {isIt ? "Azzera filtri" : "Reset All Filters"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E5E5E3] bg-[#F7F7F6] text-[11px] font-medium text-[#555555]">
                  <th className="py-3 px-5">{isIt ? "Identificativo" : "Claim ID"}</th>
                  <th className="py-3 px-5">{isIt ? "Data / Ora" : "Incident Date"}</th>
                  <th className="py-3 px-5">{isIt ? "Assicurato" : "Policyholder"}</th>
                  <th className="py-3 px-5">{isIt ? "Luogo" : "Location"}</th>
                  <th className="py-3 px-5">{isIt ? "Veicoli" : "Vehicles"}</th>
                  <th className="py-3 px-5">{isIt ? "Stato" : "Status"}</th>
                  <th className="py-3 px-5 text-center">{isIt ? "Accuratezza" : "Certainty"}</th>
                  <th className="py-3 px-5 text-center">{isIt ? "Prove" : "Evidence"}</th>
                  <th className="py-3 px-5 text-center">{isIt ? "Telemetria" : "Telemetry"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E3]">
                {filteredClaims.map((claim) => (
                  <tr
                    key={claim.id}
                    onClick={() => router.push(`/console/claims/${claim.id}`)}
                    className="hover:bg-[#F7F7F6] cursor-pointer transition-colors"
                  >
                    {/* ID */}
                    <td className="py-3.5 px-5 font-mono font-bold text-[#0E0F10] whitespace-nowrap">
                      {claim.id}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-5 text-[#0E0F10] whitespace-nowrap">
                      <div className="font-medium">{formatDate(claim.incidentDate, language)}</div>
                      <div className="text-[11px] text-[#666666] font-mono">
                        {formatTime(claim.incidentDate, language)}
                      </div>
                    </td>

                    {/* Policyholder */}
                    <td className="py-3.5 px-5 font-medium text-[#0E0F10] whitespace-nowrap">
                      {claim.policyholder.fullName}
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-5 text-[#0E0F10] whitespace-nowrap">
                      <div className="font-medium">{claim.incident.location.city}</div>
                      <div className="text-[11px] text-[#666666] truncate max-w-[140px]">
                        {claim.incident.location.street}
                      </div>
                    </td>

                    {/* Vehicles */}
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <div className="font-mono text-[11px] text-[#0E0F10] font-medium">
                        {claim.vehicleA.plate} vs {claim.vehicleB?.plate || "N/A"}
                      </div>
                      <div className="text-[11px] text-[#666666]">
                        {claim.vehicleA.make} {claim.vehicleA.model}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <span
                        className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded ${getStatusBadgeClass(
                          claim.status
                        )}`}
                      >
                        {getStatusLabel(claim.status, language)}
                      </span>
                    </td>

                    {/* AI Confidence */}
                    <td className="py-3.5 px-5 text-center whitespace-nowrap">
                      <span
                        className={`inline-block font-mono text-xs px-2 py-0.5 rounded font-bold ${getConfidenceBadgeClass(
                          claim.aiAnalysis.overallConfidence
                        )}`}
                      >
                        {claim.aiAnalysis.overallConfidence}%
                      </span>
                    </td>

                    {/* Evidence count */}
                    <td className="py-3.5 px-5 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-xs text-[#666666] font-mono">
                        <CameraIcon size={12} className="text-[#666666]" />
                        <span>{claim.evidence.length}</span>
                      </span>
                    </td>

                    {/* Telemetry */}
                    <td className="py-3.5 px-5 text-center whitespace-nowrap font-mono text-xs">
                      {claim.telemetry.hasTelemetry ? (
                        <span className="text-emerald-700 font-semibold">
                          ΔV {claim.telemetry.deltaVKmh}
                        </span>
                      ) : (
                        <span className="text-[#666666]">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
