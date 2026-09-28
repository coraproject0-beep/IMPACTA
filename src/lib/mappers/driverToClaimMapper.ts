import { Claim, EvidenceItem, CAIField, AuditEvent } from "@/types";
import { DriverDraft } from "@/types/driver";
import { SYNTHETIC_DRIVER_PROFILE } from "@/features/driver/data/driverProfileFixture";

export function mapDriverDraftToClaim(
  draft: DriverDraft,
  existingClaimsCount: number
): Claim {
  const claimSeq = String(existingClaimsCount + 1).padStart(3, "0");
  const claimId = draft.isDemoIncident
    ? "CLM-DEMO-001"
    : `CLM-APP-${claimSeq}`;
  const nowIso = new Date().toISOString();
  const incidentIso = new Date(
    `${draft.incidentDate}T${draft.incidentTime || "12:00"}:00Z`
  ).toISOString();

  // Map evidence items
  const evidence: EvidenceItem[] = draft.evidenceItems.map((e, idx) => ({
    id: `EVD-${claimSeq}-${idx + 1}`,
    title: e.categoryLabel,
    type: e.category === "DOCUMENT" ? "DOCUMENT" : "VEHICLE_DAMAGE_PHOTO",
    timestamp: e.timestamp || nowIso,
    provenance: e.isRealUpload ? "MANUAL" : "MANUAL",
    extractionStatus: draft.isDemoIncident ? "EXTRACTED" : "PARTIALLY_EXTRACTED",
    description: e.notes || `${e.categoryLabel} captured during mobile incident reporting`,
    thumbnailUrl: e.previewUrl,
    metadata: {
      sourceDevice: "IMPACTA Driver Mobile Web PWA",
      confidence: draft.isDemoIncident ? 94 : 70,
      extractedAttributes: (draft.isDemoIncident
        ? {
            category: String(e.category),
            verified: true,
            isDemoScenario: true,
          }
        : {
            category: String(e.category),
            realUpload: true,
            multimodalStatus: "Saved on device. AI pipeline not connected.",
          }) as Record<string, string | number | boolean>,
    },
  }));

  // Standardized CAI fields
  const caiFields: CAIField[] = [
    {
      id: "cai-1",
      code: "1",
      label: "Data e Ora Incidente",
      section: "CIRCUMSTANCES",
      value: `${draft.incidentDate} ${draft.incidentTime}`,
      provenance: "PROFILE",
      requiresConfirmation: false,
      isConfirmed: true,
      confidence: 100,
    },
    {
      id: "cai-2",
      code: "2",
      label: "Località (Comune / Indirizzo)",
      section: "CIRCUMSTANCES",
      value: `${draft.location.city}, ${draft.location.street}`,
      provenance: "MANUAL",
      requiresConfirmation: false,
      isConfirmed: true,
      confidence: 95,
    },
    {
      id: "cai-3",
      code: "3",
      label: "Feriti (Anche lievi)",
      section: "CIRCUMSTANCES",
      value: draft.anyInjured ? "Sì" : "No (0 feriti)",
      provenance: "MANUAL",
      requiresConfirmation: false,
      isConfirmed: true,
      confidence: 100,
    },
    {
      id: "cai-4",
      code: "6A",
      label: "Assicurato Veicolo A",
      section: "VEHICLE_A",
      value: SYNTHETIC_DRIVER_PROFILE.fullName,
      provenance: "PROFILE",
      requiresConfirmation: false,
      isConfirmed: true,
      confidence: 100,
    },
    {
      id: "cai-5",
      code: "7A",
      label: "Targa Veicolo A",
      section: "VEHICLE_A",
      value: SYNTHETIC_DRIVER_PROFILE.vehicle.plate,
      provenance: "PROFILE",
      requiresConfirmation: false,
      isConfirmed: true,
      confidence: 100,
    },
    {
      id: "cai-6",
      code: "8A",
      label: "Compagnia Assicuratrice A",
      section: "VEHICLE_A",
      value: SYNTHETIC_DRIVER_PROFILE.policy.insurerName,
      provenance: "PROFILE",
      requiresConfirmation: false,
      isConfirmed: true,
      confidence: 100,
    },
    {
      id: "cai-6b",
      code: "9A",
      label: "Conducente A",
      section: "VEHICLE_A",
      value: `${SYNTHETIC_DRIVER_PROFILE.fullName} (Pat. ${SYNTHETIC_DRIVER_PROFILE.licenseNumber})`,
      provenance: "PROFILE",
      requiresConfirmation: false,
      isConfirmed: true,
      confidence: 100,
    },
    {
      id: "cai-7",
      code: "10A",
      label: "Punto d'urto iniziale A",
      section: "DAMAGE",
      value: SYNTHETIC_DRIVER_PROFILE.vehicle.impactZone,
      provenance: draft.isDemoIncident ? "AI_OBSERVATION" : "MANUAL",
      requiresConfirmation: false,
      isConfirmed: true,
      confidence: 92,
    },
    {
      id: "cai-8",
      code: "12A",
      label: "Circostanza Veicolo A",
      section: "CIRCUMSTANCES",
      value:
        draft.caiManualOverrides["12A"] ||
        (draft.isDemoIncident
          ? "Circolava su una piazza a senso rotatorio"
          : "In marcia regolare"),
      provenance: draft.isDemoIncident ? "AI_INFERENCE" : "MANUAL",
      requiresConfirmation: !draft.caiConfirmedFields["12A"],
      isConfirmed: Boolean(draft.caiConfirmedFields["12A"]),
      confidence: 88,
    },
    // Vehicle B fields
    {
      id: "cai-9",
      code: "6B",
      label: "Assicurato Veicolo B",
      section: "VEHICLE_B",
      value: draft.counterparty.driverName || "[Non comunicato]",
      provenance: "MANUAL",
      requiresConfirmation: !draft.counterparty.driverName,
      isConfirmed: Boolean(draft.counterparty.driverName),
      confidence: draft.counterparty.driverName ? 90 : 0,
    },
    {
      id: "cai-10",
      code: "7B",
      label: "Targa Veicolo B",
      section: "VEHICLE_B",
      value: draft.counterparty.plate || "[Non comunicata]",
      provenance: "MANUAL",
      requiresConfirmation: !draft.counterparty.plate,
      isConfirmed: Boolean(draft.counterparty.plate),
      confidence: draft.counterparty.plate ? 95 : 0,
    },
    {
      id: "cai-11",
      code: "8B",
      label: "Compagnia Assicuratrice B",
      section: "VEHICLE_B",
      value: draft.counterparty.insurer || "[In attesa visura ANIA]",
      provenance: "MANUAL",
      requiresConfirmation: !draft.counterparty.insurer,
      isConfirmed: Boolean(draft.counterparty.insurer),
      confidence: draft.counterparty.insurer ? 90 : 0,
    },
    {
      id: "cai-12",
      code: "10B",
      label: "Punto d'urto iniziale B",
      section: "DAMAGE",
      value: draft.isDemoIncident
        ? "Parte anteriore sinistra"
        : "Zona anteriore / fiancata",
      provenance: draft.isDemoIncident ? "AI_OBSERVATION" : "MANUAL",
      requiresConfirmation: false,
      isConfirmed: true,
      confidence: 85,
    },
    {
      id: "cai-13",
      code: "12B",
      label: "Circostanza Veicolo B",
      section: "CIRCUMSTANCES",
      value:
        draft.caiManualOverrides["12B"] ||
        (draft.isDemoIncident
          ? "Si immetteva in una piazza a senso rotatorio"
          : "Proveniva da strada laterale"),
      provenance: draft.isDemoIncident ? "AI_INFERENCE" : "MANUAL",
      requiresConfirmation: !draft.caiConfirmedFields["12B"],
      isConfirmed: Boolean(draft.caiConfirmedFields["12B"]),
      confidence: 85,
    },
  ];

  const auditTrail: AuditEvent[] = [
    {
      id: `aud-${Date.now()}-1`,
      timestamp: nowIso,
      actor: "SYSTEM_INGEST",
      actorName: "IMPACTA Driver Intake",
      action: `Claim reported via Driver Mobile PWA (${draft.isDemoIncident ? "Demo Scenario" : "User Report"})`,
      objectAffected: `Claim ${claimId}`,
      details: `Collected ${draft.evidenceItems.length} photos and driver statement`,
    },
    {
      id: `aud-${Date.now()}-2`,
      timestamp: nowIso,
      actor: "SYSTEM_INGEST",
      actorName: "CAI Compiler",
      action: "CAI workspace initialized from mobile submission",
      objectAffected: "CAIWorkspace",
    },
    ...(draft.humanCorrections || []).map((c, idx) => ({
      id: `aud-corr-${idx + 1}`,
      timestamp: c.reviewedAt || nowIso,
      actor: "REVIEWER" as const,
      actorName: c.actor || "Driver (John Miller)",
      action: `Human field review [${c.fieldLabel || c.fieldKey}]: "${c.originalValue}" -> "${c.correctedValue}" (${c.reviewType})`,
      objectAffected: `Field:${c.fieldKey}`,
      details: `Provenance preserved. Original AI value: "${c.originalValue}". Corrected value: "${c.correctedValue}". Status: ${c.reviewType}`,
    })),
  ];

  return {
    id: claimId,
    incidentDate: incidentIso,
    createdAt: nowIso,
    status: draft.isDemoIncident ? "CAI_READY" : "NEW",
    severity: draft.anyInjured ? "HIGH" : "MEDIUM",
    assignee: null,
    policyholder: {
      fullName: SYNTHETIC_DRIVER_PROFILE.fullName,
      fiscalCode: SYNTHETIC_DRIVER_PROFILE.fiscalCode,
      phone: SYNTHETIC_DRIVER_PROFILE.phone,
    },
    incident: {
      timestamp: incidentIso,
      location: draft.location,
      weatherCondition: "CLEAR",
      roadCondition: "DRY",
      policeIntervention: draft.policePresent,
      summary: draft.statement,
    },
    driverA: {
      role: "DRIVER_A",
      fullName: SYNTHETIC_DRIVER_PROFILE.fullName,
      taxCode: SYNTHETIC_DRIVER_PROFILE.fiscalCode,
      drivingLicenseNumber: SYNTHETIC_DRIVER_PROFILE.licenseNumber,
      phone: SYNTHETIC_DRIVER_PROFILE.phone,
      email: SYNTHETIC_DRIVER_PROFILE.email,
      statement: draft.statement,
      injured: draft.anyInjured,
    },
    vehicleA: SYNTHETIC_DRIVER_PROFILE.vehicle,
    policyA: SYNTHETIC_DRIVER_PROFILE.policy,
    driverB: draft.counterparty.driverName
      ? {
          role: "DRIVER_B",
          fullName: draft.counterparty.driverName,
          taxCode: "GLLNDR79T02H501Y",
          drivingLicenseNumber: "RM5829104A",
          phone: draft.counterparty.phone || "+39 347 1829 044",
          statement: draft.isDemoIncident
            ? "Mi stavo immettendo nella rotatoria da Via Merulana."
            : "Dichiarazione controparte non raccolta sul posto.",
          injured: false,
        }
      : undefined,
    vehicleB: draft.counterparty.plate
      ? {
          role: "VEHICLE_B",
          plate: draft.counterparty.plate,
          make: draft.counterparty.makeModel.split(" ")[0] || "Counterparty",
          model: draft.counterparty.makeModel.split(" ").slice(1).join(" ") || "Vehicle",
          year: 2020,
          color: "Grigio Moda",
          damageDescription: "Front-left angle scuffs",
          impactZone: "Front-Left",
          drivable: true,
        }
      : undefined,
    policyB: draft.counterparty.insurer
      ? {
          insurerName: draft.counterparty.insurer,
          policyNumber: draft.counterparty.policyNumber || "TIR-4412-98102",
          coverageType: "RCA_BASE",
          validUntil: "2026-11-30",
          agencyCode: "AG-RM-12",
          policyholderMatch: true,
        }
      : undefined,
    evidence,
    telemetry: draft.isDemoIncident
      ? {
          hasTelemetry: true,
          deviceId: "OCTO-IT-892144",
          firmwareVersion: "v4.18.2-b",
          samplingRateHz: 10,
          impactTimestamp: incidentIso,
          deltaVKmh: 11.4,
          peakDecelerationG: 0.68,
          impactAngleDeg: 35,
          impactVectorDescription: "Right-front oblique contact (+35°)",
          points: [
            { timeSec: -3.0, speedKmh: 34, brakeActive: false, brakePressureBar: 0, longitudinalG: 0, lateralG: 0.2, headingDeg: 85 },
            { timeSec: -1.0, speedKmh: 30, brakeActive: true, brakePressureBar: 20, longitudinalG: -0.2, lateralG: 0.2, headingDeg: 110 },
            { timeSec: 0.0, speedKmh: 22, brakeActive: true, brakePressureBar: 60, longitudinalG: -0.68, lateralG: 0.44, headingDeg: 124 },
            { timeSec: 1.0, speedKmh: 2, brakeActive: true, brakePressureBar: 30, longitudinalG: -0.1, lateralG: 0, headingDeg: 122 },
          ],
        }
      : {
          hasTelemetry: false,
          points: [],
        },
    aiAnalysis: draft.aiAnalysisOutput
      ? {
          overallConfidence: draft.aiAnalysisOutput.isBackup ? 80 : 92,
          confidenceBand: (draft.aiAnalysisOutput.isBackup ? "MEDIUM" : "HIGH") as "MEDIUM" | "HIGH",
          lastAnalyzedAt: draft.aiAnalysisOutput.analyzedAt || nowIso,
          reviewReason: draft.aiAnalysisOutput.isBackup
            ? "DEMO FALLBACK / BACKUP ANALYSIS"
            : `LIVE GEMINI MULTIMODAL (${draft.aiAnalysisOutput.model || "gemini-3.8-flash"})`,
          observations: (draft.aiAnalysisOutput.observedFacts || []).map((obs, idx) => ({
            id: `OBS-LIVE-${idx + 1}`,
            target: obs.source === "driver_statement" ? "Reported Driver Statement" : "Physical Vehicle / Intersection",
            statement: obs.statement,
            supportingEvidenceIds: obs.evidenceRefs || [],
            epistemicStatus: "OBSERVED" as const,
            detectedAt: draft.aiAnalysisOutput?.analyzedAt || nowIso,
          })),
          inferences: (draft.aiAnalysisOutput.inferredDynamics || []).map((inf, idx) => ({
            id: `INF-LIVE-${idx + 1}`,
            title: "Collision Dynamics Inference",
            inference: inf.statement,
            confidence: inf.confidenceLabel === "high" ? 92 : inf.confidenceLabel === "medium" ? 75 : 55,
            supportingEvidenceIds: [],
            requiresConfirmation: true,
            isConfirmedByReviewer: Boolean(draft.reconstructionConfirmed || draft.humanCorrections?.length),
            epistemicStatus: "INFERRED" as const,
            alternativeHypothesis: inf.rationale,
          })),
          probableSequence: [
            {
              stepNumber: 1,
              timeOffset: "T - 2.0s",
              description: "Vehicles approaching intersection on perpendicular travel vectors",
              supportingEvidenceIds: ["01-overview.png"],
              confidence: 85,
            },
            {
              stepNumber: 2,
              timeOffset: "T = 0.0s",
              description: "Front-right contact between Vehicle A and Vehicle B in intersection",
              supportingEvidenceIds: ["02-vehicle-a-damage.png", "03-vehicle-b-damage.png"],
              confidence: 92,
            },
          ],
          uncertaintiesAndLimitations: [
            ...(draft.aiAnalysisOutput.missingInformation || []),
            "Epistemic notice: Direct visual observations strictly separated from dynamic inferences. Driver statements handled as reported statements, not objective facts. No legal liability assigned.",
          ],
        }
      : draft.isDemoIncident
      ? {
          overallConfidence: 93,
          confidenceBand: "HIGH",
          lastAnalyzedAt: nowIso,
          observations: [
            {
              id: "OBS-DEMO-1",
              target: "Vehicle A front-right quarter",
              statement: "Scuff marks and gray paint transfer consistent with Vehicle B front-left corner.",
              supportingEvidenceIds: ["02-vehicle-a-damage.png"],
              epistemicStatus: "OBSERVED",
              detectedAt: nowIso,
            },
            {
              id: "OBS-DEMO-2",
              target: "Roadway infrastructure",
              statement: "Intersection markings and pedestrian crossings observed.",
              supportingEvidenceIds: ["01-overview.png", "04-road-context.png"],
              epistemicStatus: "OBSERVED",
              detectedAt: nowIso,
            },
          ],
          inferences: [
            {
              id: "INF-DEMO-1",
              title: "Pre-Impact Deceleration Dynamic",
              inference: "Vehicles engaged in crossing paths at moderate speeds.",
              confidence: 90,
              supportingEvidenceIds: ["01-overview.png"],
              requiresConfirmation: false,
              isConfirmedByReviewer: true,
              epistemicStatus: "INFERRED",
            },
          ],
          probableSequence: [
            { stepNumber: 1, timeOffset: "T - 2.0s", description: "Vehicle A enters intersection straight ahead.", supportingEvidenceIds: [], confidence: 95 },
            { stepNumber: 2, timeOffset: "T = 0.0s", description: "Impact between right front corner of Vehicle A and left front of Vehicle B.", supportingEvidenceIds: ["02-vehicle-a-damage.png"], confidence: 94 },
          ],
          uncertaintiesAndLimitations: [
            "Demonstration analysis based on deterministic classroom scenario.",
          ],
        }
      : {
          overallConfidence: 70,
          confidenceBand: "MEDIUM",
          lastAnalyzedAt: nowIso,
          reviewReason: "Live multimodal AI disconnected. Manual adjuster appraisal required.",
          reviewCategory: "LOW_CONFIDENCE",
          observations: [],
          inferences: [],
          probableSequence: [],
          uncertaintiesAndLimitations: [
            "Photos stored locally on device. Live automated computer vision model was not invoked in this prototype.",
          ],
        },
    caiFields,
    caiDraftGenerated: true,
    caiDraftGeneratedAt: nowIso,
    auditTrail,
    reviewerNotes: draft.isDemoIncident
      ? "Report submitted through IMPACTA Driver (Canonical Demo). Ready for adjuster sign-off."
      : "Report submitted through IMPACTA Driver (Real upload flow). Review of uploaded files required.",
    tags: [
      "Driver App Ingest",
      draft.isDemoIncident ? "Demo Incident" : "Real User Intake",
      draft.anyInjured ? "Injury Flag" : "Property Damage Only",
    ],
  };
}
