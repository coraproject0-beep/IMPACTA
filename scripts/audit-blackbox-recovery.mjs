import { spawn } from "child_process";
import fs from "fs";
import path from "path";

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const auditDir = "c:\\Dev\\ANTI\\IMPACTA\\docs\\audits\\v5.2-blackbox-recovery";
if (!fs.existsSync(auditDir)) {
  fs.mkdirSync(auditDir, { recursive: true });
}

async function runAudits() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const port = 9555;
  const tempDir = `C:\\Users\\sanna\\AppData\\Local\\Temp\\chrome_audit_${port}`;

  console.log("Starting Chrome for Black Box Recovery Audits...");
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

    console.log("Waiting for page hydration...");
    await wait(3000);

    // Scroll to #black-box section
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

      // Wait for video frame decode / seek
      await wait(450);

      const shot = await sendCommand("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: false,
      });

      const filePath = path.join(auditDir, filename);
      fs.writeFileSync(filePath, Buffer.from(shot.data, "base64"));
      console.log(`Captured ${filename} at progress ${progress.toFixed(3)} (${width}x${height})`);
    }

    // Capture Entry Darkness Transition (just before pin)
    await sendCommand("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await sendCommand("Runtime.evaluate", {
      expression: `
        (function() {
          const el = document.getElementById('black-box');
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: top - 500, behavior: 'instant' });
          }
        })()
      `,
    });
    await wait(600);
    const entryShot = await sendCommand("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });
    fs.writeFileSync(path.join(auditDir, "01-entry-darkness-transition.png"), Buffer.from(entryShot.data, "base64"));
    console.log("Captured 01-entry-darkness-transition.png");

    // Scroll back to black-box sticky top
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
    await wait(800);

    // Required desktop captures
    const milestones = [
      { p: 0.00, file: "02-sealed.png" },
      { p: 0.22, file: "03-opening.png" },
      { p: 0.50, file: "04-incident-cars.png" },
      { p: 0.58, file: "05-impact.png" },
      { p: 0.78, file: "06-structured-state.png" },
      { p: 0.98, file: "07-reassembly.png" },
    ];

    for (const m of milestones) {
      await setProgressAndCapture(m.p, m.file, 1440, 900);
    }

    // Capture Exit Transition (scrolling just past black-box)
    await sendCommand("Runtime.evaluate", {
      expression: `
        (function() {
          const el = document.getElementById('black-box');
          if (el) {
            const bottom = el.getBoundingClientRect().bottom + window.scrollY;
            window.scrollTo({ top: bottom - 200, behavior: 'instant' });
          }
        })()
      `,
    });
    await wait(600);
    const exitShot = await sendCommand("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });
    fs.writeFileSync(path.join(auditDir, "08-exit-transition.png"), Buffer.from(exitShot.data, "base64"));
    console.log("Captured 08-exit-transition.png");

    // Required Mobile capture (390x844 at incident state)
    console.log("\n--- Capturing Mobile Milestone (390x844) ---");
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
    await wait(600);
    await setProgressAndCapture(0.58, "mobile-incident-impact.png", 390, 844);

    console.log("\n✅ All Black Box Recovery audits captured successfully!");
    ws.close();
  } finally {
    proc.kill();
  }
}

runAudits().catch((err) => {
  console.error("Audit error:", err);
  process.exit(1);
});
