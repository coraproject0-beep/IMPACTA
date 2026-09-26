import { spawn } from "child_process";
import fs from "fs";
import path from "path";

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const auditDir = "c:\\Dev\\ANTI\\IMPACTA\\docs\\audits\\v5.2-blackbox";
if (!fs.existsSync(auditDir)) {
  fs.mkdirSync(auditDir, { recursive: true });
}

async function runAudits() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const port = 9333;
  const tempDir = `C:\\Users\\sanna\\AppData\\Local\\Temp\\chrome_audit_${port}`;

  console.log("Starting Chrome for Black Box Audits...");
  const proc = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${tempDir}`,
    "--window-size=1440,900",
    "http://localhost:3000",
  ]);

  try {
    let target = null;
    for (let i = 0; i < 40; i++) {
      await wait(250);
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/list`);
        const list = await res.json();
        target = list.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
        if (target) break;
      } catch (e) {}
    }

    if (!target) throw new Error("Chrome target not found");

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((res, rej) => {
      ws.onopen = res;
      ws.onerror = rej;
    });

    let msgId = 1;
    function sendCommand(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        const handler = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.id === id) {
              ws.removeEventListener("message", handler);
              if (data.error) reject(data.error);
              else resolve(data.result);
            }
          } catch (err) {
            reject(err);
          }
        };
        ws.addEventListener("message", handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    // Wait for hydration & Three.js initialization
    console.log("Waiting for page hydration & Three.js canvas...");
    await wait(3500);

    // Scroll down to the black box section
    await sendCommand("Runtime.evaluate", {
      expression: `
        (function() {
          const el = document.getElementById('black-box');
          if (el) {
            el.scrollIntoView({ behavior: 'instant', block: 'start' });
          }
        })()
      `,
    });
    await wait(1500);

    async function setProgressAndCapture(progress, filename, width = 1440, height = 900) {
      await sendCommand("Emulation.setDeviceMetricsOverride", {
        width,
        height,
        deviceScaleFactor: 1,
        mobile: width < 600,
      });

      await sendCommand("Runtime.evaluate", {
        expression: `
          (function() {
            if (window.__setBlackBoxProgress) {
              window.__setBlackBoxProgress(${progress});
            }
          })()
        `,
      });

      // Allow one or two animation frames to render
      await wait(350);

      const shot = await sendCommand("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: false,
      });

      const filePath = path.join(auditDir, filename);
      fs.writeFileSync(filePath, Buffer.from(shot.data, "base64"));
      console.log(`Captured ${filename} at progress ${progress.toFixed(3)} (${width}x${height})`);
    }

    // --- 1. SECTION 53: 13 REQUIRED DESKTOP CAPTURES (1440x900) ---
    console.log("\n--- Capturing 13 Desktop Milestones (1440x900) ---");
    const desktopMilestones = [
      { p: 0.00, file: "01-sealed.png" },
      { p: 0.15, file: "02-first-opening.png" },
      { p: 0.27, file: "03-mid-unfold.png" },
      { p: 0.38, file: "04-evidence.png" },
      { p: 0.50, file: "05-road-vehicles.png" },
      { p: 0.55, file: "06-pre-impact.png" },
      { p: 0.60, file: "07-actual-physical-contact.png" },
      { p: 0.63, file: "08-maximum-impact.png" },
      { p: 0.70, file: "09-settled-reconstruction.png" },
      { p: 0.76, file: "10-structure-emerging.png" },
      { p: 0.83, file: "11-structured-human-review.png" },
      { p: 0.94, file: "12-reassembly.png" },
      { p: 1.00, file: "13-final-sealed.png" },
    ];

    for (const m of desktopMilestones) {
      await setProgressAndCapture(m.p, m.file, 1440, 900);
    }

    // --- 2. SECTION 54: REQUIRED WIDE CAPTURES (1920x1080) ---
    console.log("\n--- Capturing Wide Milestones (1920x1080) ---");
    const wideMilestones = [
      { p: 0.00, file: "wide-01-sealed.png" },
      { p: 0.27, file: "wide-03-mid-unfold.png" },
      { p: 0.50, file: "wide-05-incident-reconstruction.png" },
      { p: 0.60, file: "wide-07-actual-collision.png" },
      { p: 0.83, file: "wide-11-human-review.png" },
      { p: 1.00, file: "wide-13-reassembled.png" },
    ];

    for (const m of wideMilestones) {
      await setProgressAndCapture(m.p, m.file, 1920, 1080);
    }

    // --- 3. SECTION 55: REQUIRED MOBILE CAPTURES (390x844) ---
    console.log("\n--- Capturing Mobile Milestones (390x844) ---");
    const mobileMilestones = [
      { p: 0.00, file: "mobile-01-sealed.png" },
      { p: 0.50, file: "mobile-05-incident-reconstruction.png" },
      { p: 0.60, file: "mobile-07-physical-contact.png" },
      { p: 0.83, file: "mobile-11-human-review.png" },
      { p: 1.00, file: "mobile-13-reassembled.png" },
    ];

    for (const m of mobileMilestones) {
      await setProgressAndCapture(m.p, m.file, 390, 844);
    }

    // --- 4. REVERSIBILITY TEST (Sections 58-61) ---
    console.log("\n--- Testing Reverse Scroll Reversibility (1.0 -> 0.0) ---");
    // Scrub in reverse: 1.0 -> 0.83 -> 0.60 -> 0.27 -> 0.00
    for (const p of [1.0, 0.83, 0.60, 0.27, 0.0]) {
      await setProgressAndCapture(p, `reverse-test-p${Math.round(p * 100)}.png`, 1440, 900);
    }

    console.log("\n✅ All Black Box audits captured successfully!");
    ws.close();
  } finally {
    proc.kill();
  }
}

runAudits().catch((err) => {
  console.error("Audit error:", err);
  process.exit(1);
});
