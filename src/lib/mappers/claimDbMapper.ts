import { Claim } from "@/types";

export function mapRowToClaim(row: any): Claim {
  const isDemo = Boolean(
    row.is_demo ||
    row.tags?.includes("CANONICAL_DEMO") ||
    (typeof row.id === "string" && row.id.includes("CLM-2026-0925-01"))
  );

  const vehicleAModel = row.vehicle_a?.model ?? (isDemo ? "Polo" : "");
  const vehicleBModel = row.vehicle_b?.model ?? (isDemo ? "Golf VII" : "Vehicle");

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
      fullName: row.driver_name || (isDemo ? "John Miller" : "Driver"),
      fiscalCode: row.vehicle_a?.fiscalCode || (isDemo ? "MLLJHN84M15H501Z" : "—"),
      phone: row.vehicle_a?.phone || (isDemo ? "+39 06 8492 1102" : "—"),
    },
    incident: {
      timestamp: row.incident_datetime || new Date().toISOString(),
      location: row.reviewed_data?.location || {
        city: (() => {
          if (!row.location_text) return isDemo ? "Milano" : "—";
          const parts = row.location_text.split(",");
          return parts[0].trim();
        })(),
        street: (() => {
          if (!row.location_text) return isDemo ? "Via Lorenteggio" : "Posizione non specificata";
          const parts = row.location_text.split(",");
          if (parts.length > 1) {
            return parts.slice(1).join(",").trim();
          }
          return parts[0].trim();
        })(),
        postalCode: isDemo ? "20100" : "—",
        latitude: isDemo ? 45.4642 : 0,
        longitude: isDemo ? 9.19 : 0,
        junctionType: "INTERSECTION",
      },
      weatherCondition: "CLEAR",
      roadCondition: "DRY",
      policeIntervention: false,
      summary: row.driver_statement || (isDemo ? "Traffic accident at intersection" : "Rapporto incidente"),
    },
    driverA: {
      role: "DRIVER_A",
      fullName: row.driver_name || (isDemo ? "John Miller" : "Driver"),
      taxCode: row.driver_a?.taxCode || (isDemo ? "MLLJHN84M15H501Z" : "—"),
      drivingLicenseNumber: row.driver_a?.drivingLicenseNumber || (isDemo ? "RM9482014L" : "—"),
      phone: row.driver_a?.phone || (isDemo ? "+39 06 8492 1102" : "—"),
      email: row.driver_a?.email || (isDemo ? "john.miller@impacta-demo.eu" : "—"),
      statement: row.driver_statement || "",
      injured: false,
    },
    vehicleA: {
      role: "VEHICLE_A",
      plate: row.vehicle_a?.plate || (isDemo ? "AB 123 CD" : "—"),
      make: row.vehicle_a?.make || (isDemo ? "Volkswagen" : "Vehicle details not provided"),
      model: vehicleAModel,
      year: row.vehicle_a?.year || (isDemo ? 2023 : new Date().getFullYear()),
      color: row.vehicle_a?.color || (isDemo ? "Deep Black Pearl" : "—"),
      damageDescription: row.vehicle_a?.damageDescription || (isDemo ? "Front-right bumper and headlight deformation" : "Damage under inspection"),
      impactZone: row.vehicle_a?.impactZone || row.vehicle_a?.damageArea || (isDemo ? "Front-Right" : "Under inspection"),
      drivable: row.vehicle_a?.drivable ?? true,
    },
    policyA: {
      insurerName: row.policy_a?.insurerName || (isDemo ? "Aura Mutua Assicurazioni" : "Insurance Policy on file"),
      policyNumber: row.policy_a?.policyNumber || (isDemo ? "AUR-8921-00412" : "POL-PENDING"),
      coverageType: row.policy_a?.coverageType || "RCA_BASE",
      validUntil: row.policy_a?.validUntil || (isDemo ? "2027-03-31" : "—"),
      agencyCode: row.policy_a?.agencyCode || (isDemo ? "AG-RM-04" : "—"),
      policyholderMatch: true,
    },
    driverB: (row.counterparty_name && row.counterparty_name.trim().length > 0) || isDemo
      ? {
          role: "DRIVER_B",
          fullName: row.counterparty_name || (isDemo ? "Claire Anderson" : "Counterparty Driver"),
          taxCode: isDemo ? "ND" : "—",
          drivingLicenseNumber: isDemo ? "ND" : "—",
          phone: isDemo ? "+39 347 9876543" : "—",
          statement: isDemo ? "Counterparty reported travelling across intersection" : "",
          injured: false,
        }
      : undefined,
    vehicleB:
      (row.vehicle_b &&
        typeof row.vehicle_b === "object" &&
        Object.keys(row.vehicle_b).length > 0 &&
        Boolean(row.vehicle_b.plate || (row.vehicle_b.make && row.vehicle_b.make !== "Counterparty"))) ||
      isDemo
        ? {
            role: "VEHICLE_B",
            plate: row.vehicle_b?.plate || (isDemo ? "EF 456 GH" : "—"),
            make: row.vehicle_b?.make || (isDemo ? "Volkswagen" : "Counterparty"),
            model: vehicleBModel,
            year: row.vehicle_b?.year || (isDemo ? 2020 : new Date().getFullYear()),
            color: row.vehicle_b?.color || (isDemo ? "Silver Metallic" : "—"),
            damageDescription: row.vehicle_b?.damageDescription || (isDemo ? "Front-left impact" : "Damage under inspection"),
            impactZone: row.vehicle_b?.impactZone || row.vehicle_b?.damageArea || (isDemo ? "Front-Left" : "Under inspection"),
            drivable: row.vehicle_b?.drivable ?? true,
          }
        : undefined,
    policyB:
      (row.policy_b &&
        typeof row.policy_b === "object" &&
        Object.keys(row.policy_b).length > 0 &&
        Boolean(row.policy_b.insurerName)) ||
      isDemo
        ? {
            insurerName: row.policy_b?.insurerName || (isDemo ? "Allianz Italia" : "—"),
            policyNumber: row.policy_b?.policyNumber || (isDemo ? "ALZ-9912-38410" : "—"),
            coverageType: "RCA_BASE",
            validUntil: row.policy_b?.validUntil || (isDemo ? "2026-11-30" : "—"),
            agencyCode: row.policy_b?.agencyCode || (isDemo ? "AG-MI-02" : "—"),
            policyholderMatch: true,
          }
        : undefined,
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
    telemetry: isDemo
      ? {
          hasTelemetry: true,
          samplingRateHz: 50,
          deltaVKmh: 14.5,
          impactAngleDeg: 45,
          impactVectorDescription: "Oblique front-lateral angle",
          points: [],
        }
      : {
          hasTelemetry: false,
          points: [],
        },
    aiAnalysis: {
      overallConfidence: 85,
      confidenceBand: "HIGH",
      probableSequence: isDemo
        ? [
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
          ]
        : (row.ai_analysis?.inferredDynamics || []).map((inf: any, idx: number) => ({
            stepNumber: idx + 1,
            timeOffset: `Step ${idx + 1}`,
            description: inf.statement,
            supportingEvidenceIds: [],
            confidence: inf.confidenceLabel === "high" ? 90 : inf.confidenceLabel === "medium" ? 75 : 60,
          })),
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
    caiFields: (() => {
      const rawCai = row.cai_fields || [];
      const humanCorrections = row.reviewed_data?.humanCorrections || [];
      return rawCai.map((f: any) => {
        if (f.code === "10A" || f.code === "10") {
          const corr = humanCorrections.find((c: any) => c.fieldKey === "vehicle_a_damage");
          if (corr) {
            return {
              ...f,
              value: corr.correctedValue,
              originalExtractedValue: corr.originalValue,
              provenance: corr.reviewType === "driver_correction" ? "MANUAL" : f.provenance,
            };
          }
        }
        return f;
      });
    })(),
    caiDraftGenerated: Boolean(row.submitted_at),
    caiDraftGeneratedAt: row.submitted_at,
    auditTrail: (() => {
      const trail = [...(row.audit_trail || [])];
      const humanCorrections = row.reviewed_data?.humanCorrections || [];
      for (let idx = 0; idx < humanCorrections.length; idx++) {
        const c = humanCorrections[idx];
        const exists = trail.some(
          (a) => a.action?.includes(c.fieldKey) || a.details?.includes(c.correctedValue)
        );
        if (!exists) {
          trail.push({
            id: `aud-corr-db-${idx + 1}`,
            timestamp: c.reviewedAt || row.created_at || new Date().toISOString(),
            actor: "REVIEWER",
            actorName: c.actor || (isDemo ? "Driver (John Miller)" : "Driver"),
            action: `Human field review [${c.fieldLabel || c.fieldKey}]: "${c.originalValue}" -> "${c.correctedValue}" (${c.reviewType})`,
            objectAffected: `Field:${c.fieldKey}`,
            details: `Provenance preserved. Original AI value: "${c.originalValue}". Corrected value: "${c.correctedValue}". Status: ${c.reviewType}`,
          });
        }
      }
      return trail;
    })(),
    reviewerNotes: row.reviewer_notes || row.reviewed_data?.additionalNotes || "",
    tags: [
      row.status?.toUpperCase() || "SUBMITTED",
      row.is_demo ? "CANONICAL_DEMO" : "LIVE_APP",
      "AI_REVIEW",
    ],
  };
}
