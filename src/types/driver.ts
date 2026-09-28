import {
  Claim,
  Driver,
  Vehicle,
  InsurancePolicy,
  IncidentLocation,
  EvidenceType,
  ProvenanceType,
} from "./index";

export type ReportingStep =
  | "SAFETY"
  | "INCIDENT_BASICS"
  | "EVIDENCE"
  | "COUNTERPARTY"
  | "STATEMENT"
  | "ANALYSIS"
  | "RECONSTRUCTION"
  | "CAI_REVIEW"
  | "SUBMITTED";

export interface EvidenceDraftItem {
  id: string;
  category:
    | "SCENE_OVERVIEW"
    | "VEHICLE_A"
    | "VEHICLE_B"
    | "DAMAGE_A"
    | "DAMAGE_B"
    | "ROAD_SIGNS"
    | "DOCUMENT";
  categoryLabel: string;
  file?: File;
  previewUrl: string; // Blob URL, Base64, or deterministic SVG path
  timestamp: string;
  isRealUpload: boolean;
  notes?: string;
}

export interface DriverDraft {
  isDemoIncident: boolean;
  step: ReportingStep;
  safetyConfirmed: boolean;
  incidentDate: string; // YYYY-MM-DD
  incidentTime: string; // HH:mm
  location: IncidentLocation;
  vehiclesCount: number;
  anyInjured: boolean;
  policePresent: boolean;
  evidenceItems: EvidenceDraftItem[];
  counterparty: {
    driverName: string;
    phone: string;
    plate: string;
    makeModel: string;
    insurer: string;
    policyNumber: string;
    hasInfo: boolean;
  };
  statement: string;
  additionalNotes?: string;
  reconstructionConfirmed: boolean;
  caiConfirmedFields: Record<string, boolean>; // CAI field code -> confirmed
  caiManualOverrides: Record<string, string>; // CAI field code -> override value
  submittedClaimId?: string;
  submittedAt?: string;
  aiAnalysisOutput?: {
    mode: "LIVE_GEMINI" | "DEMO_FALLBACK";
    model: string;
    analyzedAt: string;
    isBackup: boolean;
    notice?: string;
    observedFacts: Array<{
      statement: string;
      source: "image" | "driver_statement" | "telemetry";
      evidenceRefs: string[];
    }>;
    inferredDynamics: Array<{
      statement: string;
      rationale: string;
      confidenceLabel: "low" | "medium" | "high";
    }>;
    visibleDamage: Array<{
      vehicle: "A" | "B" | "unknown";
      area: string;
      description: string;
      evidenceRefs: string[];
    }>;
    missingInformation: string[];
    caiFields?: {
      circumstancesSummary?: string;
      pointOfImpactA?: string;
      pointOfImpactB?: string;
      apparentDamageA?: string;
      apparentDamageB?: string;
    };
    epistemicNotice?: string;
  };
  humanCorrections?: Array<{
    fieldKey: string;
    fieldLabel: string;
    originalValue: string;
    correctedValue: string;
    reviewType: "driver_confirmation" | "driver_correction";
    actor: string;
    reviewedAt: string;
  }>;
}

export interface DriverProfile {
  fullName: string;
  fiscalCode: string;
  licenseNumber: string;
  phone: string;
  email: string;
  vehicle: Vehicle;
  policy: InsurancePolicy;
}
