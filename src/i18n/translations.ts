export type Locale = "en" | "it";

export interface Translations {
  nav: {
    platform: string;
    drivers: string;
    insurers: string;
    technology: string;
    safety: string;
    contact: string;
    signIn: string;
    reportAccident: string;
    insurerAccess: string;
    backToImpacta: string;
    driverHome: string;
    reports: string;
    vehicle: string;
    insurance: string;
    profile: string;
    logout: string;
  };
  hero: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    subtitle: string;
    reportCta: string;
    insurerCta: string;
    telemetryProof: string;
    reportAccident: string;
    seeHowItWorks: string;
  };
  postHero: {
    fragmentsLead: string;
    fragmentsList: string;
    fragmentsConclusion: string;
  };
  blackBoxNarrative: {
    kicker: string;
    phase0Title: string;
    phase0Subtitle: string;
    phase1Title: string;
    phase1Subtitle: string;
    phase2Title: string;
    phase2Subtitle: string;
    phase3Title: string;
    phase3Subtitle: string;
    phase4Title: string;
    phase4Subtitle: string;
    phase5Title: string;
    phase5Subtitle: string;
    phase6Title: string;
    phase6Subtitle: string;
    fallbackTitle: string;
    fallbackDesc: string;
  };
  blackBoxSection: {
    kicker: string;
    title: string;
    subtitle: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    kineticLine1: string;
    kineticLine2: string;
    exitStatement: string;
  };
  evidenceStory: {
    sectionKicker: string;
    sectionTitle: string;
    sectionSubtitle: string;
    stage1Title: string;
    stage1Desc: string;
    stage2Title: string;
    stage2Desc: string;
    stage3Title: string;
    stage3Desc: string;
    stage4Title: string;
    stage4Desc: string;
    interactiveNotice: string;
  };
  publicSections: {
    driverExperienceKicker: string;
    driverExperienceTitle: string;
    driverExperienceDesc: string;
    driverExperiencePoint1Title: string;
    driverExperiencePoint1Desc: string;
    driverExperiencePoint2Title: string;
    driverExperiencePoint2Desc: string;
    driverExperiencePoint3Title: string;
    driverExperiencePoint3Desc: string;
    insurerOpsKicker: string;
    insurerOpsTitle: string;
    insurerOpsDesc: string;
    insurerOpsPoint1Title: string;
    insurerOpsPoint1Desc: string;
    insurerOpsPoint2Title: string;
    insurerOpsPoint2Desc: string;
    insurerOpsPoint3Title: string;
    insurerOpsPoint3Desc: string;
    safetyKicker: string;
    safetyTitle: string;
    safetyDesc: string;
    finalCtaTitle: string;
    finalCtaDesc: string;
    finalCtaReportButton: string;
    finalCtaInsurerButton: string;
  };
  homeClosing: {
    tag: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    stageDriver: string;
    stageDriverDesc: string;
    stageUnified: string;
    stageUnifiedDesc: string;
    stageInsurer: string;
    stageInsurerDesc: string;
    actionDriver: string;
    actionInsurer: string;
  };
  driverHome: {
    greeting: string;
    subtitle: string;
    reportAccidentCta: string;
    reportAccidentDesc: string;
    resumeDraftCta: string;
    discardDraftCta: string;
    draftFoundNotice: string;
    yourVehicle: string;
    insuranceCoverage: string;
    recentReports: string;
    viewAllReports: string;
    activePolicy: string;
    insurancePolicy: string;
    noReportsYet: string;
    insurance: string;
    policyActive: string;
    recentReport: string;
    readyForReview: string;
  };
  vehicle: {
    title: string;
    subtitle: string;
    primarySpecs: string;
    plate: string;
    year: string;
    status: string;
    statusActive: string;
    technicalDetails: string;
    vin: string;
    chassis: string;
    engine: string;
    transmission: string;
    fuel: string;
    inspection: string;
    inspectionValid: string;
  };
  insurance: {
    title: string;
    subtitle: string;
    insurer: string;
    policyNumber: string;
    validity: string;
    validUntil: string;
    status: string;
    statusActive: string;
    coverageTitle: string;
    coverageRCA: string;
    coverageRCADesc: string;
    coverageKasko: string;
    coverageKaskoDesc: string;
    coverageAssistance: string;
    coverageAssistanceDesc: string;
    assistanceHotline: string;
    assistanceHotlineDesc: string;
    callAssistance: string;
    contractDetails: string;
    coverageType: string;
    coverageTypeVal: string;
    paymentSchedule: string;
    annualSettled: string;
    coverageLimits: string;
    mandatoryRCA: string;
    rcaCeiling: string;
    included: string;
    assistance247: string;
    legalProtection: string;
    legalProtectionDesc: string;
    legalLimit: string;
    immediateAssistance: string;
    accidentNowQuestion: string;
    accidentNowGuidance: string;
    emergencyDemoCta: string;
    generaliHotlineLabel: string;
    associatedVehicle: string;
    vehicleDetails: string;
    guidanceTitle: string;
    guidanceSubtitle: string;
    stageBeforeTab: string;
    stageBeforeTitle: string;
    stageBeforeDesc: string;
    stageBeforeAction: string;
    stageAtSceneTab: string;
    stageAtSceneTitle: string;
    stageAtSceneDesc: string;
    stageAtSceneAction: string;
    stageAfterTab: string;
    stageAfterTitle: string;
    stageAfterDesc: string;
    stageAfterAction: string;
  };
  wizard: {
    phase1Title: string;
    phase1Question: string;
    phase1SafetyYes: string;
    phase1EmergencyHelp: string;
    phase1EmergencyDesc: string;
    phase1Call112: string;
    phase1ChecklistToggle: string;
    phase1ChecklistTitle: string;
    phase1ChecklistVest: string;
    phase1ChecklistHazards: string;
    phase1ChecklistTriangle: string;
    phase1ProceedButton: string;
    phase2Title: string;
    phase2WhereWhen: string;
    phase2City: string;
    phase2Street: string;
    phase2JunctionType: string;
    phase2DemoRoundabout: string;
    phase2DateTime: string;
    phase2Date: string;
    phase2Time: string;
    phase2VehiclesInvolved: string;
    phase2Injuries: string;
    phase2InjuriesNo: string;
    phase2InjuriesYes: string;
    phase2PolicePresent: string;
    phase2Next: string;
    phase3Title: string;
    phase3PhotoGuide: string;
    phase3SceneOverview: string;
    phase3SceneOverviewDesc: string;
    phase3YourVehicle: string;
    phase3YourVehicleDesc: string;
    phase3OtherVehicle: string;
    phase3OtherVehicleDesc: string;
    phase3Documents: string;
    phase3DocumentsDesc: string;
    phase3TakeOrUpload: string;
    phase3CounterpartyDetails: string;
    phase3CounterpartyName: string;
    phase3CounterpartyPlate: string;
    phase3CounterpartyPhone: string;
    phase3CounterpartyInsurer: string;
    phase3StatementTitle: string;
    phase3StatementPlaceholder: string;
    phase3Next: string;
    phase3StepTitle: string;
    phase3StepDesc: string;
    phase3PhotoAdded: string;
    phase3TakeAnother: string;
    phase3ChooseLibrary: string;
    phase3FlowIndicator: string;
    phase3CannotTakeSafely: string;
    phase4Title: string;
    phase4ReconstructionTitle: string;
    phase4ReconstructionNeutral: string;
    phase4ReconstructionMatches: string;
    phase4ReconstructionEdit: string;
    phase4CircumstancesTitle: string;
    phase4Circumstance7: string;
    phase4Circumstance6: string;
    phase4DeclarationTitle: string;
    phase4DeclarationText: string;
    phase4SubmitReport: string;
    phase5Title: string;
    phase5Subheader: string;
    phase5Reference: string;
    phase5FiledTimestamp: string;
    phase5InsuredVehicle: string;
    phase5PolicyNumber: string;
    phase5Counterparty: string;
    phase5EvidencePreserved: string;
    phase5PersistenceTitle: string;
    phase5PersistenceDesc: string;
    phase5ViewInReports: string;
    phase5ReturnHome: string;
  };
  auth: {
    driverLoginTitle: string;
    driverLoginSubtitle: string;
    demoDriverButton: string;
    orSignInWithEmail: string;
    emailLabel: string;
    passwordLabel: string;
    signInButton: string;
    forgotPasswordText: string;
    forgotPasswordNotice: string;
    insurerLoginTitle: string;
    insurerLoginSubtitle: string;
    insurerDemoButton: string;
    insurerOrg: string;
    insurerRole: string;
    demoSessionNotice: string;
    insurerLoginDesc: string;
    loginAsElena: string;
  };
  login: {
    driverTitle: string;
    driverSubtitle: string;
    driverDemoAction: string;
    emailLabel: string;
    passwordLabel: string;
    forgotPassword: string;
    submitDriver: string;
  };
  footer: {
    tagline: string;
    productHeading: string;
    companyHeading: string;
    legalHeading: string;
    languageHeading: string;
    academicNotice: string;
    allRightsReserved: string;
    governanceHeading: string;
    contact: string;
    privacy: string;
    terms: string;
    surfacesHeading: string;
    driverAreaLink: string;
    claimsOperationsLink: string;
  };
  consoleOverview: {
    kicker: string;
    title: string;
    subtitle: string;
    needsReview: string;
    missingDriverConfirmation: string;
    evidenceConflicts: string;
    newToday: string;
    priorityQueue: string;
    recentClaims: string;
    viewAll: string;
    reviewNextClaim: string;
    nextClaimKicker: string;
    openClaim: string;
    incident: string;
    location: string;
    vehicles: string;
    evidence: string;
    attention: string;
    updated: string;
    notes: string;
  };
  consoleClaimDetail: {
    backToClaims: string;
    driverConfirmationRequired: string;
    driverConfirmationDesc: string;
    tabSummary: string;
    tabEvidence: string;
    tabReconstruction: string;
    tabReport: string;
    tabHistory: string;
    incidentSummary: string;
    involvedVehicles: string;
    vehicleA: string;
    vehicleB: string;
    evidenceSection: string;
    evidenceCaption: string;
    structuredFacts: string;
    reconstructionSummary: string;
    reconstructionDesc: string;
    observed: string;
    driverConfirmed: string;
    missing: string;
    reviewStatus: string;
    reviewClaimCta: string;
    requestInfoCta: string;
    exportReportCta: string;
    structuredReportTitle: string;
    structuredReportDesc: string;
    openReportCta: string;
    latestActivity: string;
    viewFullHistory: string;
  };
  insurersPage: {
    heroTag: string;
    heroTitleLine1: string;
    heroTitleLine2: string;
    heroSubtitle: string;
    heroCta: string;
    workbenchTag: string;
    workbenchTitle: string;
    workbenchSubtitle: string;
    statement1Category: string;
    statement1Title: string;
    statement1Desc: string;
    statement2Category: string;
    statement2Title: string;
    statement2Desc: string;
    statement3Category: string;
    statement3Title: string;
    statement3Desc: string;
    workbenchCta: string;
    previewOrg: string;
    previewStatus: string;
    previewTime: string;
    previewVehicleA: string;
    previewVehicleB: string;
    previewEvidenceLabel: string;
    previewEvidenceVal: string;
    previewTelemetryLabel: string;
    previewTelemetryVal: string;
    previewReviewLabel: string;
    previewReviewVal: string;
    authorityTag: string;
    authorityTitle: string;
    authorityBody: string;
    finalReviewStatement: string;
    finalReviewSub: string;
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      platform: "Platform",
      drivers: "Drivers",
      insurers: "Insurers",
      technology: "Technology",
      safety: "Safety",
      contact: "Contact",
      signIn: "Sign in",
      reportAccident: "Report an accident",
      insurerAccess: "Insurer access →",
      backToImpacta: "Back to IMPACTA",
      driverHome: "Home",
      reports: "Reports",
      vehicle: "Vehicle",
      insurance: "Insurance",
      profile: "Profile",
      logout: "Log out",
    },
    hero: {
      kicker: "The European Mobility Intake Standard",
      titleLine1: "FROM IMPACT",
      titleLine2: "TO CLARITY.",
      titleLine3: "",
      subtitle: "Turn accident evidence into structured information ready for human review.",
      reportCta: "Report an accident",
      insurerCta: "Claims operations portal →",
      telemetryProof: "Example Telemetry Support • CAI Box 12 Standard • Zero Liability Automation",
      reportAccident: "Report an accident",
      seeHowItWorks: "See how IMPACTA works",
    },
    postHero: {
      fragmentsLead: "An accident creates fragments.",
      fragmentsList: "Photos. Statements. Vehicle information. Context.",
      fragmentsConclusion: "IMPACTA brings them together.",
    },
    blackBoxNarrative: {
      kicker: "CANONICAL BLACK BOX",
      phase0Title: "Evidence begins fragmented.",
      phase0Subtitle: "Dispersed physical facts captured at the scene.",
      phase1Title: "Controlled mechanical opening.",
      phase1Subtitle: "Unfolding internal chambers and precision frame geometry.",
      phase2Title: "Photos. Statements. Damage. Context.",
      phase2Subtitle: "Calibrated physical evidence planes emerging from the core.",
      phase3Title: "A coherent incident model.",
      phase3Subtitle: "Overhead kinematic reconstruction with direct physical contact.",
      phase4Title: "From fragments to structured information.",
      phase4Subtitle: "Incident data calibrated and ordered into parallel evidentiary layers.",
      phase5Title: "Ready for human review.",
      phase5Subtitle: "Human judgment remains in control.",
      phase6Title: "Structured evidence preserved.",
      phase6Subtitle: "Compact, tamper-evident record ready for claims assessment.",
      fallbackTitle: "The Black Box Signature Experience",
      fallbackDesc: "From fragmented roadside evidence to structured claim information ready for human review.",
    },
    blackBoxSection: {
      kicker: "THE ACCIDENT BLACK BOX",
      title: "An objective chronological synthesis of evidence, telemetry, and statements.",
      subtitle: "Transparent data provenance engineered for qualified human review.",
      feature1Title: "Sensor & Photo Alignment",
      feature1Desc: "Precise timestamp and metadata verification on every captured photo and coordinate.",
      feature2Title: "Chronological Telemetry",
      feature2Desc: "Vehicle telemetry and accelerometer readings correlated directly with impact timing.",
      feature3Title: "Standard CAI Mapping",
      feature3Desc: "Direct translation into European CAI Box 12 circumstances for human validation.",
      kineticLine1: "EVERY FRAGMENT.",
      kineticLine2: "ONE REVIEWABLE RECORD.",
      exitStatement: "READY FOR HUMAN REVIEW.",
    },
    evidenceStory: {
      sectionKicker: "The Evidence Transformation",
      sectionTitle: "From roadside confusion to verified claim in four clear steps.",
      sectionSubtitle:
        "Watch how raw roadside photography and vehicle telemetry transform into a structured dossier ready for human adjuster sign-off.",
      stage1Title: "1. Roadside Evidence Capture",
      stage1Desc: "Driver captures 4 essential angles with native sensor timestamps and localized GPS coordinates.",
      stage2Title: "2. Contact & Vehicle Context",
      stage2Desc: "Synchronized vehicle sensors correlate impact timing against visible vehicle deformations.",
      stage3Title: "3. Spatial Scene Orientation",
      stage3Desc: "Roadway geometry aligns vehicles without subjective speculation or false precision.",
      stage4Title: "4. Claim Ready for Human Review",
      stage4Desc: "Normalized into standard European CAI Box 12 circumstances, structured for human claims adjuster review.",
      interactiveNotice: "Scroll or tap steps to inspect each transformation phase",
    },
    publicSections: {
      driverExperienceKicker: "Designed for High-Stress Moments",
      driverExperienceTitle: "Calm, structured guidance when drivers need it most.",
      driverExperienceDesc:
        "Accidents cause acute stress. IMPACTA replaces panic with clear step-by-step guidance, starting with human physical safety before capturing essential facts.",
      driverExperiencePoint1Title: "Immediate Safety First",
      driverExperiencePoint1Desc: "Direct 112 emergency dialing and hazard visibility checks before any documentation begins.",
      driverExperiencePoint2Title: "Guided 4-Angle Photography",
      driverExperiencePoint2Desc: "Clear framing guidance ensures complete scene, vehicle, plate, and document preservation.",
      driverExperiencePoint3Title: "Local Browser Buffering",
      driverExperiencePoint3Desc: "Client-side storage preserves inputs during capture, preventing accidental data loss.",
      insurerOpsKicker: "Claims Operations Desk",
      insurerOpsTitle: "Structured evidence ready for adjuster review.",
      insurerOpsDesc:
        "Empower claims adjusters with structured facts, photo verification, and standard CAI circumstances instead of conflicting handwritten statements.",
      insurerOpsPoint1Title: "Visible Vehicle Damage",
      insurerOpsPoint1Desc: "Correlate reported contact zones with visual damage documentation and physical evidence.",
      insurerOpsPoint2Title: "Fact & Statement Separation",
      insurerOpsPoint2Desc: "Clear distinction between verified physical evidence and subjective driver narratives.",
      insurerOpsPoint3Title: "Standard CAI Alignment",
      insurerOpsPoint3Desc: "Structures incident facts directly into European Agreed Statement circumstances for human review.",
      safetyKicker: "Safety & Ethics",
      safetyTitle: "Strict separation between physical facts and liability decisions.",
      safetyDesc:
        "IMPACTA never decides legal fault or liability. We provide transparent, verifiable physical reconstructions to human adjusters and legal authorities.",
      finalCtaTitle: "Transform roadside collisions into verifiable facts.",
      finalCtaDesc:
        "Experience the future of European collision intake today through our interactive driver reporting experience or insurer claims workbench.",
      finalCtaReportButton: "Report an accident as Driver",
      finalCtaInsurerButton: "Enter Claims Console",
    },
    homeClosing: {
      tag: "Shared Architecture",
      titleLine1: "ONE INCIDENT.",
      titleLine2: "ONE SHARED RECORD.",
      subtitle:
        "Roadside driver capture and insurer claims review operate on the same structured evidentiary foundation. Zero manual re-entry. Zero conflicting paper versions.",
      stageDriver: "Driver Intake",
      stageDriverDesc: "Guided four-angle photography and localized context recorded calmly at the scene.",
      stageUnified: "Structured Record",
      stageUnifiedDesc: "Incident timestamps, location context, and photos organized into a structured timeline.",
      stageInsurer: "Adjuster Review",
      stageInsurerDesc: "Objective facts and standard European CAI circumstances ready for human adjuster review.",
      actionDriver: "Driver workflow",
      actionInsurer: "Claims desk",
    },
    driverHome: {
      greeting: "Good morning, Luca.",
      subtitle: "If something happens, we'll help you document it clearly.",
      reportAccidentCta: "Report an accident",
      reportAccidentDesc: "Capture what happened and build your report.",
      resumeDraftCta: "Resume Accident Report",
      discardDraftCta: "Discard saved draft",
      draftFoundNotice: "You have an unfinished accident report saved on this device.",
      yourVehicle: "Your vehicle",
      insuranceCoverage: "Active Insurance Policy",
      recentReports: "Recent Incident Reports",
      viewAllReports: "View all filed reports →",
      activePolicy: "Policy Active • 24/7 Roadside Assistance Included",
      insurancePolicy: "Active Insurance Policy",
      noReportsYet: "No incident reports filed yet. Safe travels.",
      insurance: "Insurance",
      policyActive: "Policy active",
      recentReport: "Recent report",
      readyForReview: "Ready for review",
    },
    vehicle: {
      title: "Vehicle Details",
      subtitle: "Insured vehicle registered under your active IMPACTA policy profile.",
      primarySpecs: "Primary Specifications",
      plate: "License Plate",
      year: "Registration Year",
      status: "Insurance Status",
      statusActive: "Active & Insured",
      technicalDetails: "Technical Specifications & Identification",
      vin: "Chassis Number (VIN)",
      chassis: "Body Type",
      engine: "Powertrain",
      transmission: "Transmission",
      fuel: "Fuel Type",
      inspection: "Mandatory Inspection (Revisione)",
      inspectionValid: "Valid until October 2027",
    },
    insurance: {
      title: "Insurance Policy",
      subtitle: "Comprehensive motor insurance and emergency roadside assistance details.",
      insurer: "Underwriting Insurer",
      policyNumber: "Policy Dossier Number",
      validity: "Coverage Period",
      validUntil: "Valid through 14 January 2027",
      status: "Coverage Status",
      statusActive: "Active Policy",
      coverageTitle: "Coverage Overview",
      coverageRCA: "Compulsory Third-Party Liability (RCA)",
      coverageRCADesc: "Full legal ceiling coverage across European Union territories.",
      coverageKasko: "Collision & Comprehensive (Kasko)",
      coverageKaskoDesc: "Direct collision damage protection with standard €250 deductible.",
      coverageAssistance: "24/7 European Roadside Assistance",
      coverageAssistanceDesc: "Immediate breakdown towing, alternative mobility, and medical coordination.",
      assistanceHotline: "24/7 Dedicated Assistance Hotline",
      assistanceHotlineDesc: "Toll-free emergency dispatch from anywhere in Italy and the European Union.",
      callAssistance: "Call Roadside Assistance",
      contractDetails: "Contract Details",
      coverageType: "Coverage Formula",
      coverageTypeVal: "Full Kasko + Standard RCA",
      paymentSchedule: "Payment Schedule",
      annualSettled: "Annual, fully settled",
      coverageLimits: "Included Guarantees & Ceilings",
      mandatoryRCA: "Compulsory RCA Liability",
      rcaCeiling: "€ 6,450,000",
      included: "Included",
      assistance247: "24/7 Included",
      legalProtection: "Legal & Forensic Defense",
      legalProtectionDesc: "Legal expenses and certified technical appraisal assistance.",
      legalLimit: "€ 25,000",
      immediateAssistance: "Roadside & Emergency Support",
      accidentNowQuestion: "Involved in a collision right now?",
      accidentNowGuidance: "Prioritize physical safety first. Move behind barriers before attempting any intake.",
      emergencyDemoCta: "Emergency Call Simulation (112)",
      generaliHotlineLabel: "Carrier Operations Center",
      associatedVehicle: "Insured Vehicle",
      vehicleDetails: "Audi A3 • AB 123 CD • Sportback",
      guidanceTitle: "Roadside Incident Protocol",
      guidanceSubtitle: "Step-by-step guidance designed to protect your physical safety and legal rights.",
      stageBeforeTab: "Before Driving",
      stageBeforeTitle: "Digital Readiness & Verification",
      stageBeforeDesc: "Your digital insurance certificate, policy dossier, and certified emergency contacts are permanently synced and available offline on this device.",
      stageBeforeAction: "Verify Onboard Documents",
      stageAtSceneTab: "At the Scene",
      stageAtSceneTitle: "Physical Refuge & Calibrated Intake",
      stageAtSceneDesc: "Put on your high-visibility vest, move behind the roadway guardrail, and verify everyone is uninjured before taking 4 orthogonal photos of the collision.",
      stageAtSceneAction: "Launch Roadside Emergency Protocol",
      stageAfterTab: "After the Report",
      stageAfterTitle: "Direct Carrier Dossier Handover",
      stageAfterDesc: "The compiled CAI report, verified timestamps, and encrypted photo evidence are delivered directly to your claims adjuster without postal paperwork delays.",
      stageAfterAction: "Open Driver Claims Workspace",
    },
    wizard: {
      phase1Title: "Safety Check",
      phase1Question: "Are you and everyone around you safe?",
      phase1SafetyYes: "Yes, we are safe — Proceed to report",
      phase1EmergencyHelp: "Need immediate medical or police assistance?",
      phase1EmergencyDesc: "Dial the European Emergency Number immediately. Operators speak Italian and English.",
      phase1Call112: "Dial 112 Emergency",
      phase1ChecklistToggle: "Show physical roadside safety checklist",
      phase1ChecklistTitle: "Physical Roadside Safety Checklist",
      phase1ChecklistVest: "Put on high-visibility reflective vest before exiting",
      phase1ChecklistHazards: "Turn on hazard warning flashers",
      phase1ChecklistTriangle: "Place warning triangle at least 50m behind vehicle",
      phase1ProceedButton: "Confirm Safety & Continue",
      phase2Title: "Accident Details",
      phase2WhereWhen: "Where and when did the incident occur?",
      phase2City: "City",
      phase2Street: "Street or Junction",
      phase2JunctionType: "Road Type",
      phase2DemoRoundabout: "Use Florence Piazza San Giovanni Roundabout (Demo)",
      phase2DateTime: "Incident Date & Time",
      phase2Date: "Date",
      phase2Time: "Time",
      phase2VehiclesInvolved: "Vehicles Involved",
      phase2Injuries: "Injuries or Medical Attention",
      phase2InjuriesNo: "No injuries (property damage only)",
      phase2InjuriesYes: "Injuries reported",
      phase2PolicePresent: "Authorities Present at Scene",
      phase2Next: "Continue to Evidence Capture →",
      phase3Title: "Capture Evidence & Statement",
      phase3PhotoGuide: "4-Angle Photo Guide",
      phase3SceneOverview: "1. The Whole Scene",
      phase3SceneOverviewDesc: "Stand 5–10m back showing both vehicles, road markings, and road context.",
      phase3YourVehicle: "2. Your Vehicle Damage",
      phase3YourVehicleDesc: "Close-up showing point of contact and panel damage on your Golf VIII.",
      phase3OtherVehicle: "3. Other Vehicle & Plate",
      phase3OtherVehicleDesc: "Clear view of counterparty vehicle, impact area, and registration plate.",
      phase3Documents: "4. Documents & Scene Details",
      phase3DocumentsDesc: "Counterparty insurance certificate (Green Card), driver license, or road debris.",
      phase3TakeOrUpload: "Take Photo or Upload",
      phase3CounterpartyDetails: "Counterparty Driver Information",
      phase3CounterpartyName: "Driver Full Name",
      phase3CounterpartyPlate: "Vehicle License Plate",
      phase3CounterpartyPhone: "Contact Telephone",
      phase3CounterpartyInsurer: "Insurance Company",
      phase3StatementTitle: "Your Personal Statement",
      phase3StatementPlaceholder: "Describe what occurred in your own words (e.g. traveling through roundabout, other vehicle entered from side road)...",
      phase3Next: "Continue to Review & Confirm →",
      phase3StepTitle: "Document the scene.",
      phase3StepDesc: "Take a few clear photos before anything is moved, if it is safe to do so.",
      phase3PhotoAdded: "photo added",
      phase3TakeAnother: "Take another photo",
      phase3ChooseLibrary: "Choose from library",
      phase3FlowIndicator: "Whole scene → Vehicles → Damage → Road",
      phase3CannotTakeSafely: "I can't take photos safely",
      phase4Title: "Review & Confirmation",
      phase4ReconstructionTitle: "Factual Kinematic Reconstruction",
      phase4ReconstructionNeutral:
        "Based on recorded vehicle geometry and telemetry, the other vehicle entered the roundabout from your right before contact occurred.",
      phase4ReconstructionMatches: "Yes, this accurately describes the physical contact",
      phase4ReconstructionEdit: "Edit Incident Details",
      phase4CircumstancesTitle: "CAI Box 12 European Circumstances",
      phase4Circumstance7: "Circumstance 7: Entering a roundabout / circulating inside roundabout",
      phase4Circumstance6: "Circumstance 6: Coming from a right-hand access road",
      phase4DeclarationTitle: "Driver Truthfulness Declaration",
      phase4DeclarationText:
        "I declare that the information, statements, and photographic evidence provided in this report are true and accurate to the best of my knowledge.",
      phase4SubmitReport: "Submit Accident Dossier",
      phase5Title: "Your accident report is saved",
      phase5Subheader: "Report Received",
      phase5Reference: "Report Reference",
      phase5FiledTimestamp: "Filed Timestamp",
      phase5InsuredVehicle: "Insured Vehicle",
      phase5PolicyNumber: "Policy Number",
      phase5Counterparty: "Counterparty",
      phase5EvidencePreserved: "Evidence Preserved",
      phase5PersistenceTitle: "Local Storage Persistence",
      phase5PersistenceDesc:
        "Stored locally in this browser for the prototype. No external servers or real insurers were notified. You can inspect or export this submission at any time.",
      phase5ViewInReports: "View Report in Reports",
      phase5ReturnHome: "Return to Driver Home",
    },
    auth: {
      driverLoginTitle: "Welcome back",
      driverLoginSubtitle: "Sign in to access your vehicle profile, insurance policies, and collision dossiers.",
      demoDriverButton: "Continue as Matteo Bianchi (Demo Account)",
      orSignInWithEmail: "Or sign in with policy credentials",
      emailLabel: "Email address",
      passwordLabel: "Password",
      signInButton: "Sign in to Driver Area",
      forgotPasswordText: "Forgot policy password?",
      forgotPasswordNotice: "This is a prototype demonstration. You can click 'Continue as Matteo Bianchi' above for instant access.",
      insurerLoginTitle: "Claims Operations Portal",
      insurerLoginSubtitle: "Access verified collision dossiers, 10–20Hz deceleration telemetry, and CAI Box 12 circumstances.",
      insurerDemoButton: "Continue to Claims Console",
      insurerOrg: "Aura Mutua Assicurazioni",
      insurerRole: "Claims Operations & Adjuster Workbench",
      demoSessionNotice: "Academic Prototype Demo Environment • No external authentication backend required",
      insurerLoginDesc: "Access verified collision dossiers, 10–20Hz deceleration telemetry, and CAI Box 12 circumstances.",
      loginAsElena: "Sign in as Elena Rostagno",
    },
    login: {
      driverTitle: "Welcome back",
      driverSubtitle: "Sign in to access your vehicle profile, insurance policies, and collision dossiers.",
      driverDemoAction: "Continue as Matteo Bianchi (Demo)",
      emailLabel: "Email address",
      passwordLabel: "Password",
      forgotPassword: "Forgot password?",
      submitDriver: "Sign in to Driver Area",
    },
    footer: {
      tagline: "The European standard for objective collision intake and verifiable telemetry preservation.",
      productHeading: "Product",
      companyHeading: "Company",
      legalHeading: "Legal & Ethics",
      languageHeading: "Language",
      academicNotice: "Academic Demonstration Prototype • IMPACTA Labs Milano • Local Browser Persistence Only",
      allRightsReserved: "IMPACTA Mobility Platform. All rights reserved.",
      governanceHeading: "Governance & Safety",
      contact: "Contact",
      privacy: "Privacy Notice",
      terms: "Terms of Service",
      surfacesHeading: "Access Portals",
      driverAreaLink: "Driver Personal Area",
      claimsOperationsLink: "Claims Operations Console",
    },
    consoleOverview: {
      kicker: "CLAIMS OPERATIONS",
      title: "12 claims need review.",
      subtitle: "Review the next claim and keep the queue moving.",
      needsReview: "Needs review",
      missingDriverConfirmation: "Missing driver confirmation",
      evidenceConflicts: "Evidence conflicts",
      newToday: "New today",
      priorityQueue: "Priority queue",
      recentClaims: "Recent claims",
      viewAll: "View all",
      reviewNextClaim: "Review next claim",
      nextClaimKicker: "NEXT CLAIM",
      openClaim: "Open",
      incident: "Incident",
      location: "Location",
      vehicles: "Vehicles",
      evidence: "Evidence",
      attention: "Attention",
      updated: "Updated",
      notes: "Driver report received. Waiting for driver confirmation and additional photos of the rear damage.",
    },
    consoleClaimDetail: {
      backToClaims: "Back to claims",
      driverConfirmationRequired: "Driver confirmation required.",
      driverConfirmationDesc: "The incident report is complete enough for review, but the driver has not yet confirmed the final statement.",
      tabSummary: "Summary",
      tabEvidence: "Evidence",
      tabReconstruction: "Reconstruction",
      tabReport: "Report",
      tabHistory: "History",
      incidentSummary: "Incident summary",
      involvedVehicles: "Involved vehicles",
      vehicleA: "Vehicle A",
      vehicleB: "Vehicle B",
      evidenceSection: "Evidence",
      evidenceCaption: "photos | Driver statement | Vehicle information | Location data",
      structuredFacts: "Structured facts",
      reconstructionSummary: "Reconstruction summary",
      reconstructionDesc: "Available evidence is consistent with a low-speed rear collision involving two vehicles. Reconstruction support only. No liability determination. For human review.",
      observed: "Observed",
      driverConfirmed: "Driver confirmed",
      missing: "Missing",
      reviewStatus: "Review status",
      reviewClaimCta: "Review claim",
      requestInfoCta: "Request information",
      exportReportCta: "Export structured report",
      structuredReportTitle: "Structured report",
      structuredReportDesc: "CAI-compatible data extracted from the incident report.",
      openReportCta: "Open report",
      latestActivity: "Latest activity",
      viewFullHistory: "View full history",
    },
    insurersPage: {
      heroTag: "Claims operations & triage",
      heroTitleLine1: "Structured evidence.",
      heroTitleLine2: "Faster, equitable claims review.",
      heroSubtitle: "Replace disputed handwritten CAI forms with georeferenced photography, road context, and clear factual documentation.",
      heroCta: "Launch Claims Console",
      workbenchTag: "Claims desk",
      workbenchTitle: "Review the claim, not the paperwork.",
      workbenchSubtitle: "A unified workspace connecting vehicle context, verified photographs, and driver statements in one open interface. Zero automated liability decrees.",
      statement1Category: "Structured intake",
      statement1Title: "Structured from the moment it arrives",
      statement1Desc: "The moment roadside intake completes, the claim appears in the operational queue with verified evidence and timestamps, eliminating intake backlogs.",
      statement2Category: "CAI-aligned data",
      statement2Title: "CAI-ready facts without manual retyping",
      statement2Desc: "Observed physical facts map deterministically to European standard circumstances without speculation or transcription errors.",
      statement3Category: "Human review",
      statement3Title: "Human judgment retains full authority",
      statement3Desc: "Physical evidence clarifies what happened, while legal liability and economic settlement remain exclusively with licensed adjusters.",
      workbenchCta: "Explore live Console workspace",
      previewOrg: "Aura Mutua Assicurazioni / Claims Portal",
      previewStatus: "Awaiting driver confirmation",
      previewTime: "8 min ago",
      previewVehicleA: "Vehicle A (Insured)",
      previewVehicleB: "Vehicle B (Counterparty)",
      previewEvidenceLabel: "Evidence",
      previewEvidenceVal: "6 photos",
      previewTelemetryLabel: "Telemetry",
      previewTelemetryVal: "10 Hz synchronous",
      previewReviewLabel: "Review status",
      previewReviewVal: "Ready for adjuster",
      authorityTag: "Adjuster authority",
      authorityTitle: "Evidence for human decision, never automated verdicts",
      authorityBody: "European insurance practice requires that liability determinations be made by licensed adjusters. Final claim review remains with a human adjuster, supported by clear objective evidence.",
      finalReviewStatement: "HUMAN REVIEW REMAINS IN CONTROL.",
      finalReviewSub: "Final claim review remains with a human adjuster.",
    },
  },
  it: {
    nav: {
      platform: "Piattaforma",
      drivers: "Conducenti",
      insurers: "Assicuratori",
      technology: "Tecnologia",
      safety: "Sicurezza",
      contact: "Contatti",
      signIn: "Accedi",
      reportAccident: "Segnala un sinistro",
      insurerAccess: "Accesso assicuratore →",
      backToImpacta: "Torna a IMPACTA",
      driverHome: "Home",
      reports: "Sinistri",
      vehicle: "Veicolo",
      insurance: "Polizza",
      profile: "Profilo",
      logout: "Disconnetti",
    },
    hero: {
      kicker: "Lo Standard Europeo di Rilevamento Sinistri",
      titleLine1: "DALL'IMPATTO",
      titleLine2: "ALLA CHIAREZZA.",
      titleLine3: "",
      subtitle: "Trasforma le prove dell'incidente in informazioni strutturate per la revisione umana.",
      reportCta: "Segnala un incidente",
      insurerCta: "Portale liquidatori sinistri →",
      telemetryProof: "Supporto Telemetria di Esempio • Standard CAI Casella 12 • Nessuna Automazione di Responsabilità",
      reportAccident: "Segnala un incidente",
      seeHowItWorks: "Scopri come funziona IMPACTA",
    },
    postHero: {
      fragmentsLead: "Un incidente crea frammenti.",
      fragmentsList: "Foto. Dichiarazioni. Dati del veicolo. Contesto.",
      fragmentsConclusion: "IMPACTA li unisce.",
    },
    blackBoxNarrative: {
      kicker: "SCATOLA NERA CANONICA",
      phase0Title: "Le prove dell'incidente iniziano frammentate.",
      phase0Subtitle: "Fatti fisici dispersi acquisiti sul luogo dell'urto.",
      phase1Title: "Apertura meccanica controllata.",
      phase1Subtitle: "Dispiegamento delle camere interne e della geometria dei telai.",
      phase2Title: "Fotografie. Dichiarazioni. Danni. Contesto.",
      phase2Subtitle: "Piani probatori fisici calibrati che emergono dal nucleo.",
      phase3Title: "Un modello coerente dell'incidente.",
      phase3Subtitle: "Ricostruzione cinematica con contatto fisico diretto.",
      phase4Title: "Dai frammenti alle informazioni strutturate.",
      phase4Subtitle: "Dati dell'incidente calibrati e ordinati in livelli probatori paralleli.",
      phase5Title: "Pronto per la revisione umana.",
      phase5Subtitle: "Il giudizio umano mantiene il controllo.",
      phase6Title: "Elementi probatori strutturati e conservati.",
      phase6Subtitle: "Archivio compatto e verificabile pronto per la perizia.",
      fallbackTitle: "L'Esperienza Scatola Nera",
      fallbackDesc: "Dalle prove frammentate a bordo strada alle informazioni strutturate per la perizia umana.",
    },
    blackBoxSection: {
      kicker: "LA SCATOLA NERA DEL SINISTRO",
      title: "Una sintesi cronologica oggettiva di evidenze, telemetria e dichiarazioni.",
      subtitle: "Provenienza trasparente dei dati strutturata per la revisione del perito.",
      feature1Title: "Integrità Foto e Sensori",
      feature1Desc: "Verifica di timestamp e metadati per ogni fotografia e coordinata acquisita.",
      feature2Title: "Telemetria Cronologica",
      feature2Desc: "Dati di bordo e accelerometri correlati direttamente all'istante del contatto fisico.",
      feature3Title: "Mappatura CAI Standard",
      feature3Desc: "Traduzione diretta nelle circostanze del Modulo CAI Casella 12 per la verifica umana.",
      kineticLine1: "OGNI FRAMMENTO.",
      kineticLine2: "UN UNICO RECORD DA VERIFICARE.",
      exitStatement: "PRONTO PER LA REVISIONE UMANA.",
    },
    evidenceStory: {
      sectionKicker: "La Trasformazione delle Prove",
      sectionTitle: "Dal caos dell'incidente alla perizia verificata in quattro passaggi.",
      sectionSubtitle:
        "Guarda come fotografie scattate a bordo strada e telemetria di bordo si trasformano in un dossier oggettivo pronto per la convalida del perito assicurativo.",
      stage1Title: "1. Acquisizione Prove sul Posto",
      stage1Desc: "Il conducente acquisisce 4 prospetti essenziali con coordinate GPS e timestamp nativi.",
      stage2Title: "2. Contesto e Danni Visibili",
      stage2Desc: "I sensori del veicolo correlano l'istante dell'impatto con le deformazioni visibili della carrozzeria.",
      stage3Title: "3. Orientamento della Scena",
      stage3Desc: "La geometria stradale posiziona entrambi i veicoli senza speculazioni soggettive o attribuzioni indebite.",
      stage4Title: "4. Sinistro Pronto per la Perizia Umana",
      stage4Desc: "Strutturato nelle circostanze standard del Modulo CAI Casella 12 per la revisione del perito assicurativo.",
      interactiveNotice: "Scorri o tocca i passaggi per ispezionare ciascuna fase della trasformazione",
    },
    publicSections: {
      driverExperienceKicker: "Progettato per Momenti di Forte Stress",
      driverExperienceTitle: "Guida calma e chiara quando i conducenti ne hanno più bisogno.",
      driverExperienceDesc:
        "Un incidente provoca ansia immediata. IMPACTA sostituisce il panico con passaggi chiari e guidati, partendo dalla sicurezza fisica prima di raccogliere i dati.",
      driverExperiencePoint1Title: "Prima di tutto la Sicurezza",
      driverExperiencePoint1Desc: "Chiamata immediata al 112 e verifica visibilità e triangolo prima di ogni operazione.",
      driverExperiencePoint2Title: "Guida Fotografica a 4 Angoli",
      driverExperiencePoint2Desc: "Inquadrature guidate per preservare panoramica, veicolo, targa controparte e documenti.",
      driverExperiencePoint3Title: "Salvataggio Locale nel Browser",
      driverExperiencePoint3Desc: "La memorizzazione locale preserva i dati inseriti durante il rilievo, prevenendo perdite accidentali.",
      insurerOpsKicker: "Area Liquidazione e Perizia",
      insurerOpsTitle: "Prove strutturate per la perizia umana.",
      insurerOpsDesc:
        "Fornisci ai liquidatori dati oggettivi, fotografie verificate e circostanze CAI standard invece di moduli cartacei illeggibili e contrastanti.",
      insurerOpsPoint1Title: "Danni Visibili al Veicolo",
      insurerOpsPoint1Desc: "Correla le zone d'urto dichiarate con la documentazione fotografica e gli elementi riscontrati.",
      insurerOpsPoint2Title: "Separazione tra Fatti e Dichiarazioni",
      insurerOpsPoint2Desc: "Netta distinzione tra dati fisici verificati e dichiarazioni soggettive dei conducenti.",
      insurerOpsPoint3Title: "Allineamento Circostanze CAI",
      insurerOpsPoint3Desc: "Struttura i fatti dell'incidente nelle circostanze standard del Modulo di Constatazione Amichevole per la revisione umana.",
      safetyKicker: "Sicurezza ed Etica",
      safetyTitle: "Rigida separazione tra fatti fisici e attribuzione di colpa.",
      safetyDesc:
        "IMPACTA non decide mai la responsabilità giuridica. Forniamo ricostruzioni fisiche trasparenti e verificabili a periti umani e autorità legali.",
      finalCtaTitle: "Trasforma gli incidenti stradali in evidenze verificabili.",
      finalCtaDesc:
        "Sperimenta oggi il futuro della gestione sinistri europea tramite l'app conducente o il portale liquidatori.",
      finalCtaReportButton: "Segnala un sinistro come Conducente",
      finalCtaInsurerButton: "Accedi alla Console Liquidatori",
    },
    homeClosing: {
      tag: "Architettura Condivisa",
      titleLine1: "UN INCIDENTE.",
      titleLine2: "UN UNICO RECORD CONDIVISO.",
      subtitle:
        "Il rilievo del conducente e la perizia assicurativa poggiano sulla medesima base probatoria strutturata. Nessuna ricompilazione manuale. Nessuna versione contrastante.",
      stageDriver: "Rilievo Conducente",
      stageDriverDesc: "Quattro inquadrature guidate e contesto geolocalizzato raccolti con calma sul posto.",
      stageUnified: "Record Strutturato",
      stageUnifiedDesc: "Marcature temporali, contesto di posizione e fotografie organizzati in una sequenza strutturata.",
      stageInsurer: "Revisione del Perito",
      stageInsurerDesc: "Fatti oggettivi e circostanze CAI standard europee pronti per la revisione del perito.",
      actionDriver: "Flusso conducente",
      actionInsurer: "Area liquidazione",
    },
    driverHome: {
      greeting: "Buongiorno, Luca.",
      subtitle: "Se succede qualcosa, ti aiutiamo a documentarlo chiaramente.",
      reportAccidentCta: "Segnala un incidente",
      reportAccidentDesc: "Registra l'accaduto e crea il tuo rapporto.",
      resumeDraftCta: "Riprendi segnalazione sinistro",
      discardDraftCta: "Elimina bozza salvata",
      draftFoundNotice: "È presente una segnalazione di incidente non completata su questo dispositivo.",
      yourVehicle: "Il tuo veicolo",
      insuranceCoverage: "Polizza Assicurativa Attiva",
      recentReports: "Sinistri Recenti Registrati",
      viewAllReports: "Visualizza tutti i sinistri registrati →",
      activePolicy: "Polizza Attiva • Soccorso Stradale 24/7 Incluso",
      insurancePolicy: "Polizza Assicurativa Attiva",
      noReportsYet: "Nessun sinistro registrato finora. Buon viaggio.",
      insurance: "Assicurazione",
      policyActive: "Polizza attiva",
      recentReport: "Rapporto recente",
      readyForReview: "Pronto per la revisione",
    },
    vehicle: {
      title: "Dettagli Veicolo",
      subtitle: "Veicolo assicurato registrato nel tuo profilo polizza IMPACTA attivo.",
      primarySpecs: "Specifiche Principali",
      plate: "Targa di Circolazione",
      year: "Anno Immatricolazione",
      status: "Stato Assicurativo",
      statusActive: "Attivo e Assicurato",
      technicalDetails: "Specifiche Tecniche e Identificazione",
      vin: "Numero di Telaio (VIN)",
      chassis: "Carrozzeria",
      engine: "Motorizzazione",
      transmission: "Cambio",
      fuel: "Alimentazione",
      inspection: "Revisione Obbligatoria",
      inspectionValid: "Regolare fino a Ottobre 2027",
    },
    insurance: {
      title: "Polizza Assicurativa",
      subtitle: "Dettagli della copertura RCA e assistenza stradale di emergenza.",
      insurer: "Compagnia Assicurativa",
      policyNumber: "Numero Dossier Polizza",
      validity: "Periodo di Copertura",
      validUntil: "Valida fino al 14 Gennaio 2027",
      status: "Stato della Copertura",
      statusActive: "Polizza Attiva",
      coverageTitle: "Riepilogo Garanzie",
      coverageRCA: "Responsabilità Civile Auto (RCA)",
      coverageRCADesc: "Massimale di legge con copertura valida in tutto il territorio UE.",
      coverageKasko: "Collisione e Kasko",
      coverageKaskoDesc: "Protezione danni diretti con franchigia fissa standard pari a 250 €.",
      coverageAssistance: "Soccorso Stradale Europeo 24/7",
      coverageAssistanceDesc: "Traino d'emergenza immediato, auto sostitutiva e coordinamento sanitario.",
      assistanceHotline: "Centrale Operativa Emergenze 24/7",
      assistanceHotlineDesc: "Numero verde gratuito dall'Italia e paesi dell'Unione Europea.",
      callAssistance: "Chiama Soccorso Stradale",
      contractDetails: "Dettagli del Contratto",
      coverageType: "Tipologia Formula",
      coverageTypeVal: "Kasko Completa + RCA Standard",
      paymentSchedule: "Frazionamento",
      annualSettled: "Annuale con quietanza regolare",
      coverageLimits: "Garanzie e Massimali Inclusi",
      mandatoryRCA: "RCA Obbligatoria (Responsabilità Civile Auto)",
      rcaCeiling: "€ 6.450.000",
      included: "Inclusa",
      assistance247: "Incluso 24/7",
      legalProtection: "Tutela Legale e Peritale",
      legalProtectionDesc: "Spese legali e assistenza peritale specializzata stragiudiziale.",
      legalLimit: "€ 25.000",
      immediateAssistance: "Assistenza Immediata",
      accidentNowQuestion: "Hai avuto un incidente adesso?",
      accidentNowGuidance: "Verifica prima che tutti siano al sicuro. Mettiti al riparo dietro le barriere stradali prima di scattare foto.",
      emergencyDemoCta: "Simulazione Emergenza (112)",
      generaliHotlineLabel: "Centrale Operativa Generali",
      associatedVehicle: "Veicolo Assicurato",
      vehicleDetails: "Audi A3 • AB 123 CD • Sportback",
      guidanceTitle: "Protocollo di Gestione Sinistro",
      guidanceSubtitle: "Una sequenza guidata per proteggere la tua incolumità fisica e le tue ragioni assicurative.",
      stageBeforeTab: "Prima di partire",
      stageBeforeTitle: "Verifica e Dotazione di Bordo",
      stageBeforeDesc: "Il certificato assicurativo digitale, i massimali e i numeri di emergenza sono sincronizzati e sempre accessibili offline su questo dispositivo.",
      stageBeforeAction: "Verifica Dotazione di Bordo",
      stageAtSceneTab: "Sul luogo del sinistro",
      stageAtSceneTitle: "Protezione Attiva e Rilievo Guidato",
      stageAtSceneDesc: "Indossa il giubbotto catarifrangente, posizionati dietro il guardrail e verifica l'assenza di feriti prima di scattare i 4 rilievi fotografici ortogonali.",
      stageAtSceneAction: "Avvia Protocollo di Emergenza",
      stageAfterTab: "Dopo la segnalazione",
      stageAfterTitle: "Consegna Diretta al Liquidatore",
      stageAfterDesc: "Il modulo CAI generato, i rilievi fotografici e i dati telemetrici vengono trasmessi all'ufficio sinistri della compagnia, senza code né attese postali.",
      stageAfterAction: "Visualizza i tuoi Sinistri",
    },
    wizard: {
      phase1Title: "Verifica Sicurezza",
      phase1Question: "Tu e le persone vicine siete al sicuro?",
      phase1SafetyYes: "Sì, siamo al sicuro — Continua con la segnalazione",
      phase1EmergencyHelp: "Hai bisogno di soccorso medico o forze dell'ordine?",
      phase1EmergencyDesc: "Chiama immediatamente il Numero Unico Europeo 112. Gli operatori parlano italiano e inglese.",
      phase1Call112: "Chiama Emergenza 112",
      phase1ChecklistToggle: "Mostra lista di controllo sicurezza stradale",
      phase1ChecklistTitle: "Lista di Controllo Sicurezza Stradale",
      phase1ChecklistVest: "Indossa il giubbotto catarifrangente prima di scendere",
      phase1ChecklistHazards: "Accendi le 4 frecce di emergenza",
      phase1ChecklistTriangle: "Posiziona il triangolo ad almeno 50 metri dal veicolo",
      phase1ProceedButton: "Conferma Sicurezza e Continua",
      phase2Title: "Dettagli Incidente",
      phase2WhereWhen: "Dove e quando è avvenuto il sinistro?",
      phase2City: "Comune",
      phase2Street: "Via, Piazza o Incrocio",
      phase2JunctionType: "Tipologia Stradale",
      phase2DemoRoundabout: "Usa Rotatoria Piazza San Giovanni, Firenze (Demo)",
      phase2DateTime: "Data e Ora del Sinistro",
      phase2Date: "Data",
      phase2Time: "Ora",
      phase2VehiclesInvolved: "Veicoli Coinvolti",
      phase2Injuries: "Presenza di Feriti o Cure Mediche",
      phase2InjuriesNo: "Nessun ferito (solo danni a cose)",
      phase2InjuriesYes: "Feriti segnalati",
      phase2PolicePresent: "Autorità Intervenute sul Posto",
      phase2Next: "Continua con l'Acquisizione Prove →",
      phase3Title: "Acquisizione Prove e Dichiarazione",
      phase3PhotoGuide: "Guida Fotografica a 4 Angolazioni",
      phase3SceneOverview: "1. La Scena Generale",
      phase3SceneOverviewDesc: "Allontanati di 5–10 metri per mostrare entrambi i veicoli e la segnaletica stradale.",
      phase3YourVehicle: "2. Danni al Tuo Veicolo",
      phase3YourVehicleDesc: "Inquadratura ravvicinata del punto di contatto e dei danni alla Golf VIII.",
      phase3OtherVehicle: "3. Altro Veicolo e Targa",
      phase3OtherVehicleDesc: "Inquadratura nitida dell'altro veicolo, punto di impatto e targa.",
      phase3Documents: "4. Documenti e Dettagli",
      phase3DocumentsDesc: "Certificato di assicurazione (Carta Verde), patente controparte o detriti stradali.",
      phase3TakeOrUpload: "Scatta Foto o Carica",
      phase3CounterpartyDetails: "Dati Conducente Controparte",
      phase3CounterpartyName: "Nome e Cognome Conducente",
      phase3CounterpartyPlate: "Targa del Veicolo",
      phase3CounterpartyPhone: "Numero di Telefono",
      phase3CounterpartyInsurer: "Compagnia Assicurativa",
      phase3StatementTitle: "La Tua Dichiarazione",
      phase3StatementPlaceholder: "Descrivi con parole tue cosa è accaduto (es. percorrevo la rotatoria, l'altro veicolo è entrato da destra)...",
      phase3Next: "Continua a Riepilogo e Conferma →",
      phase3StepTitle: "Documenta la scena.",
      phase3StepDesc: "Scatta alcune foto chiare prima che qualsiasi cosa venga spostata, se è sicuro farlo.",
      phase3PhotoAdded: "foto aggiunta",
      phase3TakeAnother: "Scatta un'altra foto",
      phase3ChooseLibrary: "Scegli dalla galleria",
      phase3FlowIndicator: "Scena completa → Veicoli → Danni → Strada",
      phase3CannotTakeSafely: "Non posso scattare foto in sicurezza",
      phase4Title: "Riepilogo e Conferma",
      phase4ReconstructionTitle: "Ricostruzione Cinematica Oggettiva",
      phase4ReconstructionNeutral:
        "Sulla base della geometria dei veicoli e della telemetria, l'altro veicolo è entrato nella rotatoria dalla tua destra prima del contatto.",
      phase4ReconstructionMatches: "Sì, descrive accuratamente il contatto fisico avvenuto",
      phase4ReconstructionEdit: "Modifica Dettagli Incidente",
      phase4CircumstancesTitle: "Circostanze Modulo CAI Casella 12",
      phase4Circumstance7: "Circostanza 7: Circolava su una rotatoria",
      phase4Circumstance6: "Circostanza 6: Proveniva da una strada d'accesso laterale a destra",
      phase4DeclarationTitle: "Dichiarazione di Veridicità",
      phase4DeclarationText:
        "Dichiaro che le informazioni, le dichiarazioni e le prove fotografiche fornite in questa segnalazione sono vere e accurate al meglio delle mie conoscenze.",
      phase4SubmitReport: "Invia Dossier Sinistro",
      phase5Title: "La tua segnalazione è stata salvata",
      phase5Subheader: "Segnalazione Ricevuta",
      phase5Reference: "Codice Segnalazione",
      phase5FiledTimestamp: "Orario di Deposito",
      phase5InsuredVehicle: "Veicolo Assicurato",
      phase5PolicyNumber: "Numero Polizza",
      phase5Counterparty: "Controparte",
      phase5EvidencePreserved: "Prove Fotografiche Preservate",
      phase5PersistenceTitle: "Salvataggio Locale su Dispositivo",
      phase5PersistenceDesc:
        "Salvato localmente in questo browser per la demo del prototipo. Nessun server esterno o compagnia reale è stata notificata. Puoi consultare o esportare il fascicolo in qualsiasi momento.",
      phase5ViewInReports: "Visualizza nei Sinistri",
      phase5ReturnHome: "Torna alla Home Conducente",
    },
    auth: {
      driverLoginTitle: "Bentornato",
      driverLoginSubtitle: "Accedi per visualizzare il tuo veicolo, la polizza assicurativa e i sinistri registrati.",
      demoDriverButton: "Continua come Matteo Bianchi (Account Demo)",
      orSignInWithEmail: "Oppure accedi con le credenziali di polizza",
      emailLabel: "Indirizzo Email",
      passwordLabel: "Password",
      signInButton: "Accedi all'Area Conducente",
      forgotPasswordText: "Password dimenticata?",
      forgotPasswordNotice: "Questo è un prototipo dimostrativo. Puoi cliccare su 'Continua come Matteo Bianchi' sopra per accedere istantaneamente.",
      insurerLoginTitle: "Portale Operativo Sinistri",
      insurerLoginSubtitle: "Accedi ai dossier collisione verificati, telemetria a 10–20Hz e circostanze CAI Casella 12.",
      insurerDemoButton: "Accedi alla Console Liquidatori",
      insurerOrg: "Aura Mutua Assicurazioni",
      insurerRole: "Ufficio Gestione Sinistri e Liquidazione",
      demoSessionNotice: "Ambiente Dimostrativo Prototipale • Nessun server di autenticazione esterno richiesto",
      insurerLoginDesc: "Accedi ai dossier collisione verificati, telemetria a 10–20Hz e circostanze CAI Casella 12.",
      loginAsElena: "Accedi come Elena Rostagno",
    },
    login: {
      driverTitle: "Bentornato",
      driverSubtitle: "Accedi per visualizzare il tuo veicolo, la polizza assicurativa e i sinistri registrati.",
      driverDemoAction: "Continua come Matteo Bianchi (Demo)",
      emailLabel: "Indirizzo Email",
      passwordLabel: "Password",
      forgotPassword: "Password dimenticata?",
      submitDriver: "Accedi all'Area Conducente",
    },
    footer: {
      tagline: "Lo standard europeo per l'acquisizione oggettiva dei sinistri e la conservazione telemetrica verificabile.",
      productHeading: "Prodotto",
      companyHeading: "Azienda",
      legalHeading: "Normativa ed Etica",
      languageHeading: "Lingua",
      academicNotice: "Prototipo Dimostrativo Accademico • IMPACTA Labs Milano • Solo Salvataggio Locale su Browser",
      allRightsReserved: "IMPACTA Mobility Platform. Tutti i diritti riservati.",
      governanceHeading: "Normativa e Sicurezza",
      contact: "Contatti",
      privacy: "Informativa Privacy",
      terms: "Termini di Servizio",
      surfacesHeading: "Portali di Accesso",
      driverAreaLink: "Area Personale Conducente",
      claimsOperationsLink: "Console Operativa Sinistri",
    },
    consoleOverview: {
      kicker: "OPERAZIONI SINISTRI",
      title: "12 sinistri richiedono revisione.",
      subtitle: "Esamina il prossimo sinistro e mantieni attiva la coda.",
      needsReview: "Richiedono revisione",
      missingDriverConfirmation: "In attesa conferma conducente",
      evidenceConflicts: "Conflitti evidenze",
      newToday: "Nuovi oggi",
      priorityQueue: "Coda prioritaria",
      recentClaims: "Sinistri recenti",
      viewAll: "Vedi tutti",
      reviewNextClaim: "Esamina prossimo sinistro",
      nextClaimKicker: "PROSSIMO SINISTRO",
      openClaim: "Apri",
      incident: "Incidente",
      location: "Luogo",
      vehicles: "Veicoli",
      evidence: "Prove",
      attention: "Attenzione",
      updated: "Aggiornato",
      notes: "Rapporto conducente ricevuto. In attesa di conferma del conducente e foto aggiuntive del danno posteriore.",
    },
    consoleClaimDetail: {
      backToClaims: "Torna ai sinistri",
      driverConfirmationRequired: "Richiesta conferma conducente.",
      driverConfirmationDesc: "Il rapporto d'incidente è sufficientemente completo per la revisione, ma il conducente non ha ancora confermato la dichiarazione finale.",
      tabSummary: "Riepilogo",
      tabEvidence: "Prove",
      tabReconstruction: "Ricostruzione",
      tabReport: "Modulo CAI",
      tabHistory: "Cronologia",
      incidentSummary: "Riepilogo incidente",
      involvedVehicles: "Veicoli coinvolti",
      vehicleA: "Veicolo A",
      vehicleB: "Veicolo B",
      evidenceSection: "Prove acquisite",
      evidenceCaption: "foto • Dichiarazione conducente • Dati veicolo • Posizione GPS",
      structuredFacts: "Fatti strutturati",
      reconstructionSummary: "Sintesi ricostruzione",
      reconstructionDesc: "Le prove disponibili sono coerenti con un tamponamento a bassa velocità che ha coinvolto due veicoli. Supporto alla ricostruzione: nessuna determinazione automatica della responsabilità. Riservato alla perizia umana.",
      observed: "Rilevato",
      driverConfirmed: "Confermato da conducente",
      missing: "Mancante",
      reviewStatus: "Stato revisione",
      reviewClaimCta: "Esamina sinistro",
      requestInfoCta: "Richiedi informazioni",
      exportReportCta: "Esporta rapporto strutturato",
      structuredReportTitle: "Rapporto strutturato",
      structuredReportDesc: "Dati conformi al modulo CAI estratti dal rapporto d'incidente.",
      openReportCta: "Apri rapporto",
      latestActivity: "Attività recente",
      viewFullHistory: "Visualizza cronologia completa",
    },
    insurersPage: {
      heroTag: "Operazioni sinistri e liquidazione",
      heroTitleLine1: "Dati oggettivi.",
      heroTitleLine2: "Liquidazione rapida ed equa.",
      heroSubtitle: "Sostituisce i moduli CAI illeggibili e le dichiarazioni contraddittorie con fotografie georeferenziate, contesto stradale e fascicoli strutturati secondo gli standard europei.",
      heroCta: "Accedi alla Console Sinistri",
      workbenchTag: "Area liquidazione e perizia",
      workbenchTitle: "Esamina il sinistro, non i documenti cartacei.",
      workbenchSubtitle: "Una visione unificata che integra dati del veicolo, fotografie certificate e dichiarazioni in un'interfaccia aperta. Nessuna scatola nera che decide la colpa.",
      statement1Category: "Acquisizione strutturata",
      statement1Title: "Strutturato dal momento dell'invio",
      statement1Desc: "Non appena il conducente completa l'invio sul posto, il sinistro appare nella coda operativa con prove e metadati verificati, senza ritardi di acquisizione.",
      statement2Category: "Dati conformi CAI",
      statement2Title: "Dati conformi CAI senza riscrittura manuale",
      statement2Desc: "I fatti fisici osservati vengono ricondotti univocamente alle circostanze del Modulo Blu europeo senza congetture o errori di trascrizione.",
      statement3Category: "Controllo peritale",
      statement3Title: "Il giudizio umano mantiene il pieno controllo",
      statement3Desc: "Elementi fisici e rilievi chiariscono i fatti accaduti, mentre la responsabilità giuridica e la liquidazione rimangono saldamente al perito.",
      workbenchCta: "Esplora lo spazio di lavoro Console",
      previewOrg: "Aura Mutua Assicurazioni / Portale Sinistri",
      previewStatus: "In attesa conducente",
      previewTime: "8 min fa",
      previewVehicleA: "Veicolo A (Assicurato)",
      previewVehicleB: "Veicolo B (Controparte)",
      previewEvidenceLabel: "Prove raccolte",
      previewEvidenceVal: "6 fotografie",
      previewTelemetryLabel: "Telemetria CAN",
      previewTelemetryVal: "10 Hz sincrono",
      previewReviewLabel: "Stato perizia",
      previewReviewVal: "Pronto per perito",
      authorityTag: "Responsabilità peritale",
      authorityTitle: "Evidenze per la decisione umana, mai sentenze automatiche",
      authorityBody: "L'ordinamento europeo richiede che la determinazione della responsabilità sia sempre assunta da periti e liquidatori. La revisione finale del sinistro resta affidata a un perito umano, supportato da evidenze chiare e oggettive.",
      finalReviewStatement: "LA REVISIONE UMANA RESTA CENTRALE.",
      finalReviewSub: "La revisione finale del sinistro resta affidata a un perito umano.",
    },
  },
};
