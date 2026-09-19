export type ClaimStatus =
  | "NEW"
  | "IN_REVIEW"
  | "CAI_READY"
  | "REVIEWED"
  | "CLOSED";

export type SeverityLevel = "LOW" | "MEDIUM" | "HIGH";

export type ConfidenceBand = "HIGH" | "MEDIUM" | "LOW";

export type EpistemicStatus =
  | "OBSERVED"
  | "INFERRED"
  | "CONFIRMED"
  | "MISSING";

export type ProvenanceType =
  | "PROFILE"
  | "DOCUMENT"
  | "AI_OBSERVATION"
  | "AI_INFERENCE"
  | "MANUAL"
  | "TELEMETRY";

export type ReviewCategory =
  | "LOW_CONFIDENCE"
  | "CONFLICTING_EVIDENCE"
  | "MISSING_DATA"
  | "STATEMENT_MISMATCH";

export interface Reviewer {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarInitials: string;
}

export interface Driver {
  role: "DRIVER_A" | "DRIVER_B";
  fullName: string;
  taxCode: string; // Codice Fiscale
  drivingLicenseNumber: string;
  phone: string;
  email?: string;
  statement: string;
  injured: boolean;
}

export interface Vehicle {
  role: "VEHICLE_A" | "VEHICLE_B";
  plate: string;
  make: string;
  model: string;
  year: number;
  color: string;
  vin?: string;
  damageDescription: string;
  impactZone: string; // e.g. "Front-Left", "Rear-Center"
  drivable: boolean;
}

export interface InsurancePolicy {
  insurerName: string;
  policyNumber: string;
  coverageType: "RCA_BASE" | "KASKO_FULL" | "MINI_KASKO" | "THEFT_FIRE";
  validUntil: string;
  agencyCode: string;
  policyholderMatch: boolean;
}

export interface IncidentLocation {
  city: string;
  street: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  junctionType: "ROUNDABOUT" | "INTERSECTION" | "STRAIGHT_ROAD" | "PARKING" | "HIGHWAY";
}

export interface Incident {
  timestamp: string;
  location: IncidentLocation;
  weatherCondition: "CLEAR" | "RAIN" | "FOG" | "OVERCAST" | "NIGHT_RAIN";
  roadCondition: "DRY" | "WET" | "COBBLESTONE" | "ICY";
  policeIntervention: boolean;
  policeDepartment?: string;
  policeProtocolNumber?: string;
  summary: string;
}

export type EvidenceType =
  | "SCENE_PHOTO"
  | "VEHICLE_DAMAGE_PHOTO"
  | "DOCUMENT"
  | "TELEMETRY_RECORD"
  | "POLICE_REPORT";

export interface EvidenceItem {
  id: string;
  title: string;
  type: EvidenceType;
  timestamp: string;
  provenance: ProvenanceType;
  extractionStatus: "EXTRACTED" | "PARTIALLY_EXTRACTED" | "FAILED";
  thumbnailUrl?: string;
  description: string;
  metadata: {
    sourceDevice?: string;
    resolution?: string;
    gpsVerified?: boolean;
    confidence: number;
    extractedAttributes: Record<string, string | number | boolean>;
  };
}

export interface TelemetryPoint {
  timeSec: number; // relative to impact (e.g. -5 to +2 sec)
  speedKmh: number;
  brakeActive: boolean;
  brakePressureBar: number;
  longitudinalG: number;
  lateralG: number;
  headingDeg: number;
}

export interface TelemetrySnapshot {
  hasTelemetry: boolean;
  deviceId?: string;
  firmwareVersion?: string;
  samplingRateHz?: number;
  impactTimestamp?: string;
  deltaVKmh?: number; // Principal Delta-V
  peakDecelerationG?: number;
  impactAngleDeg?: number; // 0 = straight front, 90 = right, 180 = rear, 270 = left
  impactVectorDescription?: string;
  points: TelemetryPoint[];
}

export interface AIObservation {
  id: string;
  target: string; // e.g. "Vehicle B rear-right bumper"
  statement: string;
  supportingEvidenceIds: string[];
  epistemicStatus: "OBSERVED";
  detectedAt: string;
}

export interface AIInference {
  id: string;
  title: string;
  inference: string;
  confidence: number; // 0 - 100
  supportingEvidenceIds: string[];
  requiresConfirmation: boolean;
  isConfirmedByReviewer: boolean;
  epistemicStatus: "INFERRED";
  alternativeHypothesis?: string;
}

export interface SequenceStep {
  stepNumber: number;
  timeOffset: string;
  description: string;
  supportingEvidenceIds: string[];
  confidence: number;
}

export interface AIAnalysis {
  overallConfidence: number; // 0 - 100
  confidenceBand: ConfidenceBand;
  probableSequence: SequenceStep[];
  observations: AIObservation[];
  inferences: AIInference[];
  uncertaintiesAndLimitations: string[];
  reviewReason?: string;
  reviewCategory?: ReviewCategory;
  lastAnalyzedAt: string;
}

export interface CAIField {
  id: string;
  code: string; // CAI standard box index, e.g. "10", "11", "12", "14"
  label: string;
  section: "CIRCUMSTANCES" | "VEHICLE_A" | "VEHICLE_B" | "DAMAGE" | "ADMIN";
  value: string;
  provenance: ProvenanceType;
  requiresConfirmation: boolean;
  isConfirmed: boolean;
  confidence: number;
  originalExtractedValue?: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: "AI_ENGINE" | "REVIEWER" | "SYSTEM_INGEST" | "TELEMETRY_PIPELINE";
  actorName: string;
  action: string;
  objectAffected: string;
  details?: string;
}

export interface Claim {
  id: string;
  incidentDate: string;
  createdAt: string;
  status: ClaimStatus;
  severity: SeverityLevel;
  assignee: Reviewer | null;
  policyholder: {
    fullName: string;
    fiscalCode: string;
    phone: string;
  };
  incident: Incident;
  driverA: Driver;
  vehicleA: Vehicle;
  policyA: InsurancePolicy;
  driverB?: Driver;
  vehicleB?: Vehicle;
  policyB?: InsurancePolicy;
  evidence: EvidenceItem[];
  telemetry: TelemetrySnapshot;
  aiAnalysis: AIAnalysis;
  caiFields: CAIField[];
  caiDraftGenerated: boolean;
  caiDraftGeneratedAt?: string;
  auditTrail: AuditEvent[];
  reviewerNotes: string;
  tags: string[];
}
