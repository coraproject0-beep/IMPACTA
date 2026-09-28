import { ClaimStatus } from "@/types";

/**
 * Standardized locale-aware date and time formatting utilities for IMPACTA.
 * Uses native Intl.DateTimeFormat and Intl.RelativeTimeFormat.
 * Fully reactive to runtime locale switching (IT / EN).
 */

export function parseDate(input: string | Date | undefined | null): Date | null {
  if (!input) return null;
  if (input instanceof Date) return isNaN(input.getTime()) ? null : input;
  const parsed = new Date(input);
  return isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Formats a date into a standard short date string.
 * IT: "25 set 2026"
 * EN: "25 Sep 2026"
 */
export function formatDate(
  input: string | Date | undefined | null,
  locale: "it" | "en" = "it",
  options?: Intl.DateTimeFormatOptions
): string {
  const d = parseDate(input);
  if (!d) return typeof input === "string" ? input : "";

  const intlLocale = locale === "it" ? "it-IT" : "en-US";
  const defaultOpts: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...options,
  };

  try {
    return new Intl.DateTimeFormat(intlLocale, defaultOpts).format(d);
  } catch {
    return d.toISOString().split("T")[0];
  }
}

/**
 * Formats a date into Month + Year format.
 * IT: "ottobre 2027"
 * EN: "October 2027"
 */
export function formatMonthYear(
  input: string | Date | undefined | null,
  locale: "it" | "en" = "it"
): string {
  const d = parseDate(input);
  if (!d) return typeof input === "string" ? input : "";

  const intlLocale = locale === "it" ? "it-IT" : "en-US";
  try {
    const formatted = new Intl.DateTimeFormat(intlLocale, {
      month: "long",
      year: "numeric",
    }).format(d);

    // In Italian, month names are lowercase by default ("ottobre 2027")
    // In English, capitalized ("October 2027")
    return formatted;
  } catch {
    return typeof input === "string" ? input : "";
  }
}

/**
 * Formats a date into localized date and time string without decorative centered dots.
 * IT: "25 set 2026, 08:42"
 * EN: "25 Sep 2026, 08:42"
 */
export function formatDateTime(
  input: string | Date | undefined | null,
  locale: "it" | "en" = "it",
  options?: Intl.DateTimeFormatOptions
): string {
  const d = parseDate(input);
  if (!d) return typeof input === "string" ? input : "";

  const intlLocale = locale === "it" ? "it-IT" : "en-US";
  const defaultOpts: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    ...options,
  };

  try {
    return new Intl.DateTimeFormat(intlLocale, defaultOpts).format(d);
  } catch {
    return typeof input === "string" ? input : "";
  }
}

/**
 * Formats time only (HH:mm)
 */
export function formatTime(
  input: string | Date | undefined | null,
  locale: "it" | "en" = "it"
): string {
  const d = parseDate(input);
  if (!d) return typeof input === "string" ? input : "";

  const intlLocale = locale === "it" ? "it-IT" : "en-US";
  try {
    return new Intl.DateTimeFormat(intlLocale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(d);
  } catch {
    return "";
  }
}

/**
 * Formats relative time relative to synthetic benchmark (2026-09-25T12:00:00Z) or provided baseDate.
 * IT: "8 min fa", "2 ore fa", "1 giorno fa"
 * EN: "8 min ago", "2 hours ago", "1 day ago"
 */
export function formatRelativeTime(
  input: string | Date | undefined | null,
  locale: "it" | "en" = "it",
  baseDate?: Date
): string {
  const d = parseDate(input);
  if (!d) return typeof input === "string" ? input : "";

  const anchor = baseDate || new Date();
  const diffMs = anchor.getTime() - d.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) {
    return locale === "it" ? "Adesso" : "Just now";
  }

  if (locale === "it") {
    if (diffMinutes < 60) return `${diffMinutes} min fa`;
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? "ora" : "ore"} fa`;
    return `${diffDays} ${diffDays === 1 ? "giorno" : "giorni"} fa`;
  } else {
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
    return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
  }
}

/**
 * Clean, human status label without pseudo-enterprise theater.
 */
export function getStatusLabel(status: ClaimStatus, locale: "it" | "en" = "it"): string {
  if (locale === "it") {
    switch (status) {
      case "NEW":
        return "Nuovo";
      case "IN_REVIEW":
        return "In revisione";
      case "CAI_READY":
        return "Modulo CAI pronto";
      case "REVIEWED":
        return "Esaminato";
      case "CLOSED":
        return "Chiuso";
      default:
        return status;
    }
  } else {
    switch (status) {
      case "NEW":
        return "New";
      case "IN_REVIEW":
        return "In review";
      case "CAI_READY":
        return "CAI ready";
      case "REVIEWED":
        return "Reviewed";
      case "CLOSED":
        return "Closed";
      default:
        return status;
    }
  }
}
