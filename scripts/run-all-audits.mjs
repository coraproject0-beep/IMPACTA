import { execSync } from "child_process";

const audits = [
  // 1. HOME HERO EN (1366x768, 1440x900, 1920x1080, 390x844)
  { width: 1366, height: 768, out: "public/audit-v5.1.4-home-en-1366.png", url: "http://localhost:3000", action: "en" },
  { width: 1440, height: 900, out: "public/audit-v5.1.4-home-en-1440.png", url: "http://localhost:3000", action: "en" },
  { width: 1920, height: 1080, out: "public/audit-v5.1.4-home-en-1920.png", url: "http://localhost:3000", action: "en" },
  { width: 390, height: 844, out: "public/audit-v5.1.4-home-en-mobile.png", url: "http://localhost:3000", action: "en" },

  // 2. HOME HERO IT (1440x900, 390x844)
  { width: 1440, height: 900, out: "public/audit-v5.1.4-home-it-1440.png", url: "http://localhost:3000", action: "it" },
  { width: 390, height: 844, out: "public/audit-v5.1.4-home-it-mobile.png", url: "http://localhost:3000", action: "it" },

  // 3. ROTATING STATEMENT (1440x900, 390x844)
  { width: 1440, height: 900, out: "public/audit-v5.1.4-rotating-statement-1440.png", url: "http://localhost:3000", action: "en" },
  { width: 390, height: 844, out: "public/audit-v5.1.4-rotating-statement-mobile.png", url: "http://localhost:3000", action: "en" },

  // 4. HOME AFTER REMOVING CURRENT REVEAL
  { width: 1440, height: 900, out: "public/audit-v5.1.4-home-scroll-1440.png", url: "http://localhost:3000", action: "scroll-to-fragments" },

  // 5. INSURANCE EN & IT (1440x900, 390x844)
  { width: 1440, height: 900, out: "public/audit-v5.1.4-insurance-en-1440.png", url: "http://localhost:3000/app/insurance", action: "en" },
  { width: 1440, height: 900, out: "public/audit-v5.1.4-insurance-it-1440.png", url: "http://localhost:3000/app/insurance", action: "it" },
  { width: 390, height: 844, out: "public/audit-v5.1.4-insurance-en-mobile.png", url: "http://localhost:3000/app/insurance", action: "en" },
  { width: 390, height: 844, out: "public/audit-v5.1.4-insurance-it-mobile.png", url: "http://localhost:3000/app/insurance", action: "it" },

  // 6. PLATFORM (1440x900)
  { width: 1440, height: 900, out: "public/audit-v5.1.4-platform-1440.png", url: "http://localhost:3000/platform", action: "en" },

  // 7. DRIVERS PUBLIC (1440x900)
  { width: 1440, height: 900, out: "public/audit-v5.1.4-drivers-1440.png", url: "http://localhost:3000/drivers", action: "en" },

  // 8. INSURERS PUBLIC (1440x900)
  { width: 1440, height: 900, out: "public/audit-v5.1.4-insurers-1440.png", url: "http://localhost:3000/insurers", action: "en" },

  // 9. DRIVER HOME (1440x900, 390x844)
  { width: 1440, height: 900, out: "public/audit-v5.1.4-driver-home-1440.png", url: "http://localhost:3000/app", action: "en" },
  { width: 390, height: 844, out: "public/audit-v5.1.4-driver-home-mobile.png", url: "http://localhost:3000/app", action: "en" },

  // 10. CONSOLE OVERVIEW (1440x900)
  { width: 1440, height: 900, out: "public/audit-v5.1.4-console-overview-1440.png", url: "http://localhost:3000/console/overview", action: "en" },

  // 11. CLAIM DETAIL (1440x900)
  { width: 1440, height: 900, out: "public/audit-v5.1.4-console-claim-detail-1440.png", url: "http://localhost:3000/console/claims/CLM-2024-001", action: "en" },

  // 12. 112 DEMO (1440x700, 390x844)
  { width: 1440, height: 700, out: "public/audit-v5.1.4-112-demo-1440.png", url: "http://localhost:3000/app/insurance", action: "open-112" },
  { width: 390, height: 844, out: "public/audit-v5.1.4-112-demo-mobile.png", url: "http://localhost:3000/app/insurance", action: "open-112" },
];

console.log(`Starting ${audits.length} audit captures...`);
for (let i = 0; i < audits.length; i++) {
  const a = audits[i];
  console.log(`[${i + 1}/${audits.length}] Capturing ${a.out}...`);
  try {
    const cmd = `node scripts/capture-screen.mjs ${a.width} ${a.height} ${a.out} ${a.url} ${a.action}`;
    execSync(cmd, { stdio: "inherit" });
  } catch (err) {
    console.error(`Failed to capture ${a.out}:`, err.message);
  }
}
console.log("All audit captures finished!");
