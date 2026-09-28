import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

// 1. ZOD SCHEMA FOR REQUEST PAYLOAD
const AnalyzeRequestSchema = z.object({
  images: z.array(
    z.object({
      name: z.string(),
      mimeType: z.string(),
      base64: z.string().optional(),
      storagePath: z.string().optional(),
      url: z.string().optional(),
      isSample: z.boolean().optional(),
    })
  ).min(1, "At least one evidence image is required"),
  isSample: z.boolean().optional().default(false),
  driverStatement: z.string().default(""),
  scenarioMetadata: z
    .object({
      locationText: z.string().optional(),
      incidentDatetime: z.string().optional(),
      vehicleA: z
        .object({
          make: z.string().optional(),
          model: z.string().optional(),
          plate: z.string().optional(),
        })
        .optional(),
      vehicleB: z
        .object({
          make: z.string().optional(),
          model: z.string().optional(),
          plate: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
  telemetry: z
    .object({
      speedBeforeImpactKmh: z.number().optional(),
      brakingDetected: z.boolean().optional(),
      impactDetected: z.boolean().optional(),
      impactArea: z.string().optional(),
    })
    .optional(),
  forceFallback: z.boolean().optional(),
});

// 2. ZOD SCHEMA FOR STRUCTURED GEMINI RESPONSE
const AnalysisOutputSchema = z.object({
  observedFacts: z.array(
    z.object({
      statement: z.string(),
      source: z.enum(["image", "driver_statement", "telemetry"]),
      evidenceRefs: z.array(z.string()),
    })
  ),
  inferredDynamics: z.array(
    z.object({
      statement: z.string(),
      rationale: z.string(),
      confidenceLabel: z.enum(["low", "medium", "high"]),
    })
  ),
  visibleDamage: z.array(
    z.object({
      vehicle: z.enum(["A", "B", "unknown"]),
      area: z.string(),
      description: z.string(),
      evidenceRefs: z.array(z.string()),
    })
  ),
  missingInformation: z.array(z.string()),
  caiFields: z
    .object({
      circumstancesSummary: z.string().optional(),
      pointOfImpactA: z.string().optional(),
      pointOfImpactB: z.string().optional(),
      apparentDamageA: z.string().optional(),
      apparentDamageB: z.string().optional(),
    })
    .optional(),
  epistemicNotice: z.string().optional(),
});

type AnalysisOutput = z.infer<typeof AnalysisOutputSchema>;

// Helper to load deterministic backup
function getBackupAnalysis(reason?: string) {
  try {
    const backupPath = path.join(
      process.cwd(),
      "public",
      "demo",
      "scenario-01",
      "backup-analysis.json"
    );
    if (fs.existsSync(backupPath)) {
      const content = fs.readFileSync(backupPath, "utf8");
      const parsed = JSON.parse(content);
      return {
        ...parsed,
        mode: "DEMO_FALLBACK" as const,
        isBackup: true,
        notice: `BACKUP ANALYSIS (DEMO FALLBACK) — ${reason || "Deterministic scenario baseline loaded"}. Not a live Gemini response.`,
        analyzedAt: new Date().toISOString(),
      };
    }
  } catch (err) {
    console.error("Failed to read backup analysis file", err);
  }

  // Built-in hardcoded fallback if file read fails
  return {
    mode: "DEMO_FALLBACK" as const,
    isBackup: true,
    notice: `BACKUP ANALYSIS (DEMO FALLBACK) — ${reason || "Active demo backup"}. Not a live Gemini response.`,
    model: "gemini-3.8-flash (deterministic backup)",
    analyzedAt: new Date().toISOString(),
    observedFacts: [
      {
        statement: "Two vehicles at rest at intersection with front-corner impact geometry.",
        source: "image" as const,
        evidenceRefs: ["01-overview.png"],
      },
      {
        statement: "Vehicle A shows front-right wing and bumper deformation.",
        source: "image" as const,
        evidenceRefs: ["02-vehicle-a-damage.png"],
      },
      {
        statement: "Vehicle B shows front-left wing and wheel arch contact marks.",
        source: "image" as const,
        evidenceRefs: ["03-vehicle-b-damage.png"],
      },
    ],
    inferredDynamics: [
      {
        statement: "Physical positions and contact zones indicate an intersection crossing collision.",
        rationale: "Debris spread and panel deformation heights correspond to angled impact.",
        confidenceLabel: "medium" as const,
      },
    ],
    visibleDamage: [
      {
        vehicle: "A" as const,
        area: "Front-right corner",
        description: "Bumper fractured, wing crumpled, headlamp damaged.",
        evidenceRefs: ["02-vehicle-a-damage.png"],
      },
      {
        vehicle: "B" as const,
        area: "Front-left wing",
        description: "Wing crumpled, abrasions near driver door.",
        evidenceRefs: ["03-vehicle-b-damage.png"],
      },
    ],
    missingInformation: [
      "Traffic signal sequence timing",
      "Witness statements",
      "Pre-impact speed telemetry for counterparty",
    ],
    caiFields: {
      circumstancesSummary: "Intersection collision between Vehicle A and Vehicle B.",
      pointOfImpactA: "Front-right corner",
      pointOfImpactB: "Front-left wing",
      apparentDamageA: "Front-right bumper and wing",
      apparentDamageB: "Front-left wing and wheel arch",
    },
    epistemicNotice: "Epistemic separation guaranteed. No liability assigned.",
  };
}

export async function POST(req: NextRequest) {
  let bodyJson: unknown;
  try {
    bodyJson = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body provided to /api/analyze" },
      { status: 400 }
    );
  }

  const parseResult = AnalyzeRequestSchema.safeParse(bodyJson);
  if (!parseResult.success) {
    return NextResponse.json(
      {
        error: "Schema validation failed for analyze request",
        details: parseResult.error.format(),
      },
      { status: 422 }
    );
  }

  const {
    images,
    isSample,
    driverStatement,
    scenarioMetadata,
    telemetry,
    forceFallback,
  } = parseResult.data;

  // Safe server-side telemetry logging (Part E & X)
  const scenario01Files = images.filter(
    (i) => i.name.includes("01-overview") || i.url?.includes("scenario-01")
  );
  console.log(
    `[ANALYZE] Total images: ${images.length} | isSample: ${isSample} | Scenario 01 files sent to Gemini: ${isSample ? scenario01Files.length : 0}`
  );
  for (const img of images) {
    console.log(
      ` - Evidence: ${img.name} | mime: ${img.mimeType} | hasBase64: ${Boolean(img.base64)} | hasUrl: ${Boolean(img.url)}`
    );
  }

  if (forceFallback) {
    if (!isSample) {
      return NextResponse.json(
        { error: "Deterministic demo fallback is only available for canonical demo scenarios." },
        { status: 400 }
      );
    }
    const backup = getBackupAnalysis("Manual fallback requested");
    return NextResponse.json({ success: true, analysis: { ...backup, fallbackUsed: true } });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    if (isSample) {
      console.warn("GEMINI_API_KEY missing in environment. Returning deterministic demo backup.");
      const backup = getBackupAnalysis("GEMINI_API_KEY missing in environment");
      return NextResponse.json({ success: true, analysis: { ...backup, fallbackUsed: true } });
    }
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  const modelName = process.env.GEMINI_MODEL || "gemini-3.8-flash";

  // System instruction with STRICT EPISTEMIC SAFETY RULES
  const systemInstruction = `You are IMPACTA's multimodal evidence analysis assistant for automotive accident documentation.
Your role is to strictly analyze physical evidence and statements according to these non-negotiable rules:
1. Describe ONLY what is directly observable and supported by the visual and physical evidence.
2. If the supplied images show an intact vehicle with no visible collision damage, or only a single vehicle with no visible crash counterpart, state this clearly as an observed fact.
3. NEVER assume a collision occurred unless directly evident from damage, debris, or position in the provided images.
4. Explicitly distinguish direct visual observations from inferences.
5. Label uncertainty where evidence is ambiguous, partial, or occluded.
6. Identify missing critical information needed for a full reconstruction.
7. NEVER assign fault or blame to any driver or party.
8. NEVER determine legal liability or claim responsibility.
9. NEVER allege or claim insurance fraud.
10. NEVER approve or reject claims.
11. NEVER claim legal validity or adjudicate rights.
12. Treat all driver and party statements strictly as REPORTED STATEMENTS, not verified physical facts.

You must output a single valid JSON object strictly matching this schema:
{
  "observedFacts": [
    {
      "statement": string,
      "source": "image" | "driver_statement" | "telemetry",
      "evidenceRefs": string[]
    }
  ],
  "inferredDynamics": [
    {
      "statement": string,
      "rationale": string,
      "confidenceLabel": "low" | "medium" | "high"
    }
  ],
  "visibleDamage": [
    {
      "vehicle": "A" | "B" | "unknown",
      "area": string,
      "description": string,
      "evidenceRefs": string[]
    }
  ],
  "missingInformation": string[],
  "caiFields": {
    "circumstancesSummary": string,
    "pointOfImpactA": string,
    "pointOfImpactB": string,
    "apparentDamageA": string,
    "apparentDamageB": string
  },
  "epistemicNotice": string
}`;

  // 1. Resolve image bytes for all images (base64 -> remote fetch -> local disk)
  const resolvedImages: Array<{ name: string; mimeType: string; base64: string }> = [];

  for (const img of images) {
    let base64Data = img.base64;

    // A. Fetch remote signed URL if http/https
    if (!base64Data && img.url && (img.url.startsWith("http://") || img.url.startsWith("https://"))) {
      try {
        const remoteRes = await fetch(img.url);
        if (remoteRes.ok) {
          const ab = await remoteRes.arrayBuffer();
          base64Data = Buffer.from(ab).toString("base64");
        }
      } catch (err) {
        console.warn(`Could not fetch remote image from ${img.url}:`, err);
      }
    }

    // B. Read local disk file if path starts with /
    if (!base64Data && img.url && img.url.startsWith("/")) {
      try {
        const cleanPath = img.url.replace(/^\//, "");
        const localPath = path.join(process.cwd(), "public", cleanPath);
        if (fs.existsSync(localPath)) {
          base64Data = fs.readFileSync(localPath).toString("base64");
        }
      } catch (err) {
        console.warn(`Could not read local image from ${img.url}:`, err);
      }
    }

    if (!base64Data) {
      console.error(`Failed to resolve image bytes for evidence: ${img.name}`);
      return NextResponse.json(
        { error: `Could not resolve image bytes for ${img.name}. Please re-upload.` },
        { status: 400 }
      );
    }

    resolvedImages.push({
      name: img.name,
      mimeType: img.mimeType || "image/png",
      base64: base64Data,
    });
  }

  // Assemble contextual prompt
  let userPrompt = `Accident Context:
- Attached Evidence Files (${resolvedImages.length} image(s)):
${resolvedImages.map((img, idx) => `  * Image ${idx + 1}: ${img.name} (${img.mimeType})`).join("\n")}
`;

  if (scenarioMetadata?.locationText) {
    userPrompt += `- Location: ${scenarioMetadata.locationText}\n`;
  }
  if (scenarioMetadata?.incidentDatetime) {
    userPrompt += `- Date & Time: ${scenarioMetadata.incidentDatetime}\n`;
  }
  if (scenarioMetadata?.vehicleA?.make) {
    userPrompt += `- Vehicle A (Reported): ${scenarioMetadata.vehicleA.make} ${scenarioMetadata.vehicleA.model || ""} (Plate: ${scenarioMetadata.vehicleA.plate || "Unknown"})\n`;
  }
  if (scenarioMetadata?.vehicleB?.make) {
    userPrompt += `- Vehicle B (Reported Counterparty): ${scenarioMetadata.vehicleB.make} ${scenarioMetadata.vehicleB.model || ""} (Plate: ${scenarioMetadata.vehicleB.plate || "Unknown"})\n`;
  }
  if (driverStatement && driverStatement.trim().length > 0) {
    userPrompt += `- Reported Driver Statement: "${driverStatement.trim()}"\n`;
  } else {
    userPrompt += `- Reported Driver Statement: (None provided)\n`;
  }

  if (telemetry && isSample) {
    userPrompt += `\nVehicle A Telemetry:
- Speed before impact: ${telemetry.speedBeforeImpactKmh ?? "Unknown"} km/h
- Braking detected: ${telemetry.brakingDetected ? "Yes" : "No"}
- Impact detected: ${telemetry.impactDetected ? "Yes" : "No"}
- Sensor impact area: ${telemetry.impactArea ?? "Unknown"}\n`;
  } else if (telemetry && !isSample) {
    userPrompt += `\nVehicle Telemetry:
- Speed before impact: ${telemetry.speedBeforeImpactKmh ?? "Unknown"} km/h
- Braking detected: ${telemetry.brakingDetected ? "Yes" : "No"}
- Impact detected: ${telemetry.impactDetected ? "Yes" : "No"}
- Sensor impact area: ${telemetry.impactArea ?? "Unknown"}\n`;
  }

  userPrompt += `\nAnalyze the physical evidence and statement according to the epistemic safety guidelines and return the JSON response.`;

  // Prepare Gemini content parts
  const contentParts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [
    { text: `${systemInstruction}\n\n${userPrompt}` },
  ];

  for (const img of resolvedImages) {
    contentParts.push({
      inlineData: {
        mimeType: img.mimeType,
        data: img.base64,
      },
    });
  }

  const ai = new GoogleGenAI({ apiKey });

  // Exponential backoff retry loop for high-demand 503, rate-limit 429, timeouts
  const maxRetries = 5;
  let lastError: any = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: [
          {
            role: "user",
            parts: contentParts,
          },
        ],
        config: {
          responseMimeType: "application/json",
        },
      });

      if (!response.text) {
        throw new Error("Empty text returned by Gemini");
      }

      let parsed: unknown;
      try {
        parsed = JSON.parse(response.text);
      } catch (jsonErr: any) {
        throw new Error(`Malformed JSON response from Gemini: ${jsonErr.message}`);
      }

      // Runtime schema validation
      const validation = AnalysisOutputSchema.safeParse(parsed);
      if (!validation.success) {
        throw new Error(
          `Analysis schema validation failed: ${JSON.stringify(validation.error.format())}`
        );
      }

      // Live success!
      return NextResponse.json({
        success: true,
        analysis: {
          ...validation.data,
          mode: "LIVE_GEMINI" as const,
          model: modelName,
          analyzedAt: new Date().toISOString(),
          isBackup: false,
          fallbackUsed: false,
        },
      });
    } catch (err: any) {
      lastError = err;
      const errMsg = err?.message || String(err);
      console.warn(`Gemini analysis attempt ${attempt}/${maxRetries} failed:`, errMsg);

      const isRetryable =
        errMsg.includes("503") ||
        errMsg.includes("429") ||
        errMsg.includes("UNAVAILABLE") ||
        errMsg.includes("high demand") ||
        errMsg.includes("RESOURCE_EXHAUSTED") ||
        errMsg.includes("fetch failed") ||
        errMsg.includes("ETIMEDOUT");

      if (isRetryable && attempt < maxRetries) {
        const delayMatch = errMsg.match(/retry in ([0-9.]+)s/i);
        const waitMs = delayMatch
          ? (Math.ceil(parseFloat(delayMatch[1])) + 4) * 1000
          : 2000 * Math.pow(2, attempt);
        console.log(`Waiting ${waitMs}ms before retry attempt ${attempt + 1}...`);
        await new Promise((r) => setTimeout(r, waitMs));
        continue;
      }
      break;
    }
  }

  // If retries failed:
  if (isSample) {
    console.warn("Live Gemini analysis failed for canonical sample. Returning DEMO FALLBACK.");
    const backup = getBackupAnalysis(
      `Live Gemini API unavailable (${lastError?.message || "Transient timeout/demand error"})`
    );
    return NextResponse.json({
      success: true,
      analysis: {
        ...backup,
        fallbackUsed: true,
      },
      liveError: lastError?.message || "Live API unavailable",
    });
  }

  // For custom uploads, NEVER return Golden Demo backup!
  console.error("Live Gemini analysis failed for custom evidence:", lastError?.message);
  return NextResponse.json(
    {
      success: false,
      error: `Live Gemini analysis unavailable: ${lastError?.message || "Internal error"}`,
      fallbackUsed: false,
      liveError: lastError?.message,
    },
    { status: 503 }
  );
}
