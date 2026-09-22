"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClaims } from "@/context/ClaimsContext";
import {
  SearchIcon,
  FilterIcon,
  CloseIcon,
  DownloadIcon,
  ChevronDownIcon,
  CameraIcon,
  ActivityIcon,
} from "@/components/icons/Icons";
import {
  formatDate,
  formatDateTime,
  getStatusBadgeClass,
  getStatusLabel,
  getConfidenceBadgeClass,
} from "@/lib/utils";
import { ClaimStatus } from "@/types";

type SortField = "incidentDate" | "confidence" | "id";
type SortOrder = "asc" | "desc";

export default function ConsoleClaimsPage() {
  const router = useRouter();
  const { claims, isLoading } = useClaims();

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
    return <div className="py-12 text-center text-xs text-slate-500">Loading claims...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Claims Management
          </h1>
          <p className="mt-2 text-base text-slate-600">
            Comprehensive ledger of active and archived motor accident dossiers ({filteredClaims.length} of {claims.length} claims showing)
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Free-text Search */}
          <div className="lg:col-span-2 relative">
            <SearchIcon
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search by ID, plate, policyholder, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <CloseIcon size={14} />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
            >
              <option value="ALL">Status: All</option>
              <option value="NEW">New Ingest</option>
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
              className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
            >
              <option value="ALL">AI Confidence: All</option>
              <option value="HIGH">High (≥ 85%)</option>
              <option value="MEDIUM">Medium (70% - 84%)</option>
              <option value="LOW">Low (&lt; 70%)</option>
            </select>
          </div>

          {/* Telemetry Filter */}
          <div>
            <select
              value={telemetryFilter}
              onChange={(e) => setTelemetryFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
            >
              <option value="ALL">Telemetry: All</option>
              <option value="YES">Telemetry Present</option>
              <option value="NO">No Telemetry</option>
            </select>
          </div>
        </div>

        {/* Sorting & Clear row */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-sm text-slate-500">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Sort by:
            </span>
            <div className="flex items-center gap-2">
              {[
                { id: "incidentDate", label: "Date" },
                { id: "confidence", label: "AI Confidence" },
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    sortField === s.id
                      ? "bg-slate-100 text-slate-900 border border-slate-300 font-bold"
                      : "text-slate-600 hover:bg-slate-50"
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
              className="text-xs sm:text-sm font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1"
            >
              <CloseIcon size={14} />
              <span>Clear filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Claims Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        {filteredClaims.length === 0 ? (
          /* Empty State */
          <div className="py-20 px-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
              <FilterIcon size={24} />
            </div>
            <h3 className="text-base font-bold text-slate-900">No matching claims found</h3>
            <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
              No claims match your active search filters. Try adjusting the query, status, or confidence criteria.
            </p>
            <div className="mt-5">
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-4 py-2 text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-xs uppercase font-mono font-bold text-slate-500 tracking-wider">
                  <th className="py-3.5 px-6">Claim ID</th>
                  <th className="py-3.5 px-6">Incident Date</th>
                  <th className="py-3.5 px-6">Policyholder</th>
                  <th className="py-3.5 px-6">Location</th>
                  <th className="py-3.5 px-6">Vehicles</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-center">AI Confidence</th>
                  <th className="py-3.5 px-6 text-center">Evidence</th>
                  <th className="py-3.5 px-6 text-center">Telemetry</th>
                  <th className="py-3.5 px-6">Assignee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal">
                {filteredClaims.map((claim) => (
                  <tr
                    key={claim.id}
                    onClick={() => router.push(`/console/claims/${claim.id}`)}
                    className="hover:bg-blue-50/40 cursor-pointer transition-colors"
                  >
                    {/* ID */}
                    <td className="py-4 px-6 font-mono font-bold text-blue-700 whitespace-nowrap">
                      {claim.id}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-slate-700 whitespace-nowrap">
                      <div className="font-semibold text-slate-900">{formatDate(claim.incidentDate)}</div>
                      <div className="text-xs text-slate-400 font-mono">
                        {new Date(claim.incidentDate).toLocaleTimeString("it-IT", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>

                    {/* Policyholder */}
                    <td className="py-4 px-6 font-semibold text-slate-900 whitespace-nowrap">
                      {claim.policyholder.fullName}
                    </td>

                    {/* Location */}
                    <td className="py-4 px-6 text-slate-600 whitespace-nowrap">
                      <div className="font-semibold text-slate-800">{claim.incident.location.city}</div>
                      <div className="text-xs text-slate-400 truncate max-w-[150px]">
                        {claim.incident.location.street}
                      </div>
                    </td>

                    {/* Vehicles */}
                    <td className="py-4 px-6">
                      <div className="font-mono text-xs text-slate-900 font-semibold whitespace-nowrap">
                        {claim.vehicleA.plate}{" "}
                        <span className="text-slate-400 font-sans text-xs">vs</span>{" "}
                        {claim.vehicleB?.plate || "N/A"}
                      </div>
                      <div className="text-xs text-slate-500 whitespace-nowrap">
                        {claim.vehicleA.make} {claim.vehicleA.model}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span
                        className={`inline-block text-xs px-2.5 py-1 rounded-lg border font-semibold ${getStatusBadgeClass(
                          claim.status
                        )}`}
                      >
                        {getStatusLabel(claim.status)}
                      </span>
                    </td>

                    {/* AI Confidence */}
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <span
                        className={`inline-block font-mono text-xs px-2.5 py-1 rounded-lg border font-bold ${getConfidenceBadgeClass(
                          claim.aiAnalysis.overallConfidence
                        )}`}
                      >
                        {claim.aiAnalysis.overallConfidence}%
                      </span>
                    </td>

                    {/* Evidence count */}
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 font-mono font-medium">
                        <CameraIcon size={14} className="text-slate-400" />
                        <span>{claim.evidence.length}</span>
                      </span>
                    </td>

                    {/* Telemetry */}
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      {claim.telemetry.hasTelemetry ? (
                        <span className="inline-block text-xs font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                          Active
                        </span>
                      ) : (
                        <span className="text-slate-300 font-mono text-xs">—</span>
                      )}
                    </td>

                    {/* Assignee */}
                    <td className="py-4 px-6 text-slate-700 whitespace-nowrap">
                      {claim.assignee ? (
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold">
                            {claim.assignee.avatarInitials}
                          </span>
                          <span className="font-medium text-slate-900">{claim.assignee.name}</span>
                        </div>
                      ) : (
                        <span className="text-amber-700 text-xs italic font-medium">Unassigned</span>
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
