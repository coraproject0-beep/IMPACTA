import { spawn } from "child_process";
import fs from "fs";
import path from "path";

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const auditDir = "c:\\Dev\\ANTI\\IMPACTA\\docs\\audits\\v5.2-motion-pass";
if (!fs.existsSync(auditDir)) {
  fs.mkdirSync(auditDir, { recursive: true });
}

async function runAudits() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const port = 9556;
  const tempDir = `C:\\Users\\sanna\\AppData\\Local\\Temp\\chrome_motion_audit_${port}`;

  console.log("Starting Chrome for Motion Pass Audits...");
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

    console.log("Chrome connected. Running motion capture audit...");

    async function navigateAndCapture(urlPath, filename, width = 1440, height = 900, scrollSelectorOrY = 0) {
      await sendCommand("Emulation.setDeviceMetricsOverride", {
        width,
        height,
        deviceScaleFactor: 1,
        mobile: width < 600,
      });

      await sendCommand("Page.navigate", { url: `http://localhost:3000${urlPath}` });
      await wait(2500);

      if (typeof scrollSelectorOrY === "string") {
        await sendCommand("Runtime.evaluate", {
          expression: `
            (function() {
              const el = document.querySelector('${scrollSelectorOrY}');
              if (el) {
                el.scrollIntoView({ behavior: 'instant', block: 'start' });
              }
            })()
          `,
        });
        await wait(800);
      } else if (typeof scrollSelectorOrY === "number" && scrollSelectorOrY > 0) {
        await sendCommand("Runtime.evaluate", {
          expression: `window.scrollTo({ top: ${scrollSelectorOrY}, behavior: 'instant' })`,
        });
        await wait(800);
      }

      const shot = await sendCommand("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: false,
      });

      const filePath = path.join(auditDir, filename);
      fs.writeFileSync(filePath, Buffer.from(shot.data, "base64"));
      console.log(`Saved ${filename} (${width}x${height})`);
    }

    // 1. Desktop captures (1440x900)
    console.log("Capturing Desktop 1440x900 pages...");
    await navigateAndCapture("/", "01-homepage-hero.png", 1440, 900, 0);
    await navigateAndCapture("/", "02-homepage-statement.png", 1440, 900, "#fragments");
    // Scroll directly to the post-blackbox platform bento section on homepage
    await navigateAndCapture("/", "03-homepage-downstream.png", 1440, 900, "#platforms");
    await navigateAndCapture("/platform", "04-platform.png", 1440, 900, 0);
    await navigateAndCapture("/platform", "04b-platform-stages.png", 1440, 900, 750);
    await navigateAndCapture("/drivers", "05-drivers.png", 1440, 900, 0);
    await navigateAndCapture("/drivers", "05b-drivers-angles.png", 1440, 900, 1400);
    await navigateAndCapture("/insurers", "06-insurers.png", 1440, 900, 0);
    await navigateAndCapture("/insurers", "06b-insurers-workbench.png", 1440, 900, 650);
    await navigateAndCapture("/technology", "07-technology.png", 1440, 900, 0);
    await navigateAndCapture("/safety", "08-safety.png", 1440, 900, 0);

    // 2. Mobile captures (390x844)
    console.log("Capturing Mobile 390x844 pages...");
    await navigateAndCapture("/", "09-mobile-homepage-hero.png", 390, 844, 0);
    await navigateAndCapture("/platform", "10-mobile-platform.png", 390, 844, 0);
    await navigateAndCapture("/drivers", "11-mobile-drivers.png", 390, 844, 0);
    await navigateAndCapture("/insurers", "12-mobile-insurers.png", 390, 844, 0);

    console.log("All audit captures successfully saved to:", auditDir);

    ws.close();
  } catch (err) {
    console.error("Audit error:", err);
  } finally {
    proc.kill("SIGKILL");
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (e) {}
  }
}

runAudits();
