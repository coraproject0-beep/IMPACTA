import { ClaimStatus, ConfidenceBand, ProvenanceType } from "@/types";

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDateTime(isoString: string): string {
  try {
    const d = new Date(isoString);
    return new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch {
    return isoString;
  }
}

export function formatDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    return new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
  } catch {
    return isoString;
  }
}

export function formatRelativeTime(isoString: string): string {
  try {
    const d = new Date(isoString).getTime();
    const now = new Date("2026-09-15T12:00:00Z").getTime(); // Anchor to synthetic timeframe
    const diffHours = Math.round((now - d) / (1000 * 60 * 60));
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.round(diffHours / 24);
    return `${diffDays}d ago`;
  } catch {
    return isoString;
  }
}

export function getStatusLabel(status: ClaimStatus): string {
  switch (status) {
    case "NEW":
      return "New Ingest";
    case "IN_REVIEW":
      return "In Review";
    case "CAI_READY":
      return "CAI Ready";
    case "REVIEWED":
      return "Reviewed";
    case "CLOSED":
      return "Closed";
    default:
      return status;
  }
}

export function getStatusBadgeClass(status: ClaimStatus): string {
  switch (status) {
    case "NEW":
      return "bg-slate-100 text-slate-700 border-slate-300";
    case "IN_REVIEW":
      return "bg-amber-50 text-amber-800 border-amber-300";
    case "CAI_READY":
      return "bg-blue-50 text-blue-800 border-blue-300";
    case "REVIEWED":
      return "bg-emerald-50 text-emerald-800 border-emerald-300";
    case "CLOSED":
      return "bg-slate-100 text-slate-500 border-slate-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

export function getConfidenceBadgeClass(confidence: number): string {
  if (confidence >= 85) {
    return "bg-emerald-50 text-emerald-800 border-emerald-300";
  }
  if (confidence >= 70) {
    return "bg-amber-50 text-amber-800 border-amber-300";
  }
  return "bg-rose-50 text-rose-800 border-rose-300";
}

export function getProvenanceBadge(provenance: ProvenanceType): { label: string; className: string } {
  switch (provenance) {
    case "PROFILE":
      return { label: "PROFILE", className: "bg-slate-100 text-slate-700 border-slate-300" };
    case "DOCUMENT":
      return { label: "DOCUMENT", className: "bg-purple-50 text-purple-700 border-purple-200" };
    case "AI_OBSERVATION":
      return { label: "AI OBSERVATION", className: "bg-teal-50 text-teal-800 border-teal-300" };
    case "AI_INFERENCE":
      return { label: "AI INFERENCE", className: "bg-sky-50 text-sky-800 border-sky-300" };
    case "TELEMETRY":
      return { label: "TELEMETRY", className: "bg-indigo-50 text-indigo-800 border-indigo-300" };
    case "MANUAL":
      return { label: "MANUAL REVIEW", className: "bg-amber-50 text-amber-800 border-amber-300" };
  }
}
