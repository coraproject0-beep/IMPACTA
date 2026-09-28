import { Claim } from "@/types";

export function mapRowToClaim(row: any): Claim {
  const vehicleAModel = row.vehicle_a?.model || "Polo";
  const vehicleBModel = row.vehicle_b?.model || "Golf VII";

  const rawStatus = (row.status || "").toLowerCase();
  let status: Claim["status"] = "CAI_READY";
  if (rawStatus === "draft") status = "NEW";
  else if (rawStatus === "under_review" || rawStatus === "evidence_uploaded") status = "IN_REVIEW";
  else if (rawStatus === "reviewed") status = "REVIEWED";
  else if (rawStatus === "closed") status = "CLOSED";
  else if (rawStatus === "submitted" || rawStatus === "analyzed" || rawStatus === "cai_ready") status = "CAI_READY";

  return {
    id: row.id,
    incidentDate: row.incident_datetime || row.created_at || new Date().toISOString(),
    createdAt: row.created_at || new Date().toISOString(),
    status,
    severity: "MEDIUM",
    assignee: null,
    policyholder: {
      fullName: row.driver_name || "John Miller",
      fiscalCode: row.vehicle_a?.fiscalCode || "MLLJHN84M15H501Z",
      phone: row.vehicle_a?.phone || "+39 06 8492 1102",
    },
    incident: {
      timestamp: row.incident_datetime || new Date().toISOString(),
      location: {
        city: row.location_text ? row.location_text.split(",")[0].trim() : "Milan",
        street: row.location_text || "Milan metropolitan area, Italy",
        postalCode: "20100",
        latitude: 45.4642,
        longitude: 9.19,
        junctionType: "INTERSECTION",
      },
      weatherCondition: "CLEAR",
      roadCondition: "DRY",
      policeIntervention: false,
      summary: row.driver_statement || "Traffic accident at intersection",
    },
    driverA: {
      role: "DRIVER_A",
      fullName: row.driver_name || "John Miller",
      taxCode: "MLLJHN84M15H501Z",
      drivingLicenseNumber: "RM9482014L",
      phone: "+39 06 8492 1102",
      email: "john.miller@impacta-demo.eu",
      statement: row.driver_statement || "",
      injured: false,
    },
    vehicleA: {
      role: "VEHICLE_A",
      plate: row.vehicle_a?.plate || "AB 123 CD",
      make: row.vehicle_a?.make || "Volkswagen",
      model: vehicleAModel,
      year: row.vehicle_a?.year || 2023,
      color: row.vehicle_a?.color || "Deep Black Pearl",
      damageDescription: row.vehicle_a?.damageDescription || "Front-right bumper and headlight deformation",
      impactZone: row.vehicle_a?.impactZone || row.vehicle_a?.damageArea || "Front-Right",
      drivable: true,
    },
    policyA: {
      insurerName: row.policy_a?.insurerName || "Aura Mutua Assicurazioni",
      policyNumber: row.policy_a?.policyNumber || "AUR-8921-00412",
      coverageType: "KASKO_FULL",
      validUntil: "2027-03-31",
      agencyCode: "AG-RM-04",
      policyholderMatch: true,
    },
    driverB: {
      role: "DRIVER_B",
      fullName: row.counterparty_name || "Claire Anderson",
      taxCode: "ND",
      drivingLicenseNumber: "ND",
      phone: "+39 347 9876543",
      statement: "Counterparty reported travelling across intersection",
      injured: false,
    },
    vehicleB: {
      role: "VEHICLE_B",
      plate: row.vehicle_b?.plate || "EF 456 GH",
      make: row.vehicle_b?.make || "Volkswagen",
      model: vehicleBModel,
      year: row.vehicle_b?.year || 2020,
      color: row.vehicle_b?.color || "Silver Metallic",
      damageDescription: row.vehicle_b?.damageDescription || "Front-left impact",
      impactZone: row.vehicle_b?.impactZone || row.vehicle_b?.damageArea || "Front-Left",
      drivable: true,
    },
    policyB: {
      insurerName: row.policy_b?.insurerName || "Allianz Italia",
      policyNumber: row.policy_b?.policyNumber || "ALZ-9912-38410",
      coverageType: "RCA_BASE",
      validUntil: "2026-11-30",
      agencyCode: "AG-MI-02",
      policyholderMatch: true,
    },
    evidence: (row.evidence || []).map((e: any, idx: number) => ({
      id: e.id || `EVD-${row.id}-${idx + 1}`,
      title: e.category_label || e.title || "Accident Evidence",
      type: "VEHICLE_DAMAGE_PHOTO",
      timestamp: e.created_at || row.created_at || new Date().toISOString(),
      provenance: "MANUAL",
      extractionStatus: "EXTRACTED",
      thumbnailUrl: e.signedUrl || e.file_path || e.thumbnailUrl,
      description: e.file_name || e.description || "Evidence photograph",
      metadata: {
        confidence: 90,
        extractedAttributes: {
          category: e.category,
          ...(e.metadata || {}),
        },
      },
    })),
    telemetry: {
      hasTelemetry: true,
      samplingRateHz: 50,
      deltaVKmh: 14.5,
      impactAngleDeg: 45,
      impactVectorDescription: "Oblique front-lateral angle",
      points: [],
    },
    aiAnalysis: {
      overallConfidence: 85,
      confidenceBand: "HIGH",
      probableSequence: [
        {
          stepNumber: 1,
          timeOffset: "-2.0s",
          description: "Vehicles approaching intersection on perpendicular vectors",
          supportingEvidenceIds: ["01-overview.png"],
          confidence: 80,
        },
        {
          stepNumber: 2,
          timeOffset: "0.0s",
          description: "Front-right contact between Vehicle A and Vehicle B",
          supportingEvidenceIds: ["02-vehicle-a-damage.png", "03-vehicle-b-damage.png"],
          confidence: 90,
        },
      ],
      observations: (row.ai_analysis?.observedFacts || []).map((obs: any, idx: number) => ({
        id: `obs-${idx + 1}`,
        target: obs.source === "driver_statement" ? "Reported Driver Statement" : "Intersection / Vehicle",
        statement: obs.statement,
        supportingEvidenceIds: obs.evidenceRefs || [],
        epistemicStatus: "OBSERVED",
        detectedAt: row.ai_analysis?.analyzedAt || row.created_at,
      })),
      inferences: (row.ai_analysis?.inferredDynamics || []).map((inf: any, idx: number) => ({
        id: `inf-${idx + 1}`,
        title: "Dynamic Reconstruction Hypothesis",
        inference: inf.statement,
        confidence: inf.confidenceLabel === "high" ? 90 : inf.confidenceLabel === "medium" ? 75 : 55,
        supportingEvidenceIds: [],
        requiresConfirmation: true,
        isConfirmedByReviewer: Boolean(row.reviewed_data?.confirmedByDriver),
        epistemicStatus: "INFERRED",
        alternativeHypothesis: inf.rationale,
      })),
      uncertaintiesAndLimitations: row.ai_analysis?.missingInformation || [],
      reviewReason: "AI-ASSISTED REVIEW",
      lastAnalyzedAt: row.ai_analysis?.analyzedAt || new Date().toISOString(),
    },
    caiFields: row.cai_fields || [],
    caiDraftGenerated: Boolean(row.submitted_at),
    caiDraftGeneratedAt: row.submitted_at,
    auditTrail: row.audit_trail || [],
    reviewerNotes: row.reviewer_notes || row.driver_statement || "",
    tags: [
      row.status?.toUpperCase() || "SUBMITTED",
      row.is_demo ? "CANONICAL_DEMO" : "LIVE_APP",
      "AI_REVIEW",
    ],
  };
}
