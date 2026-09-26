import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const auditDir = "c:\\Dev\\ANTI\\IMPACTA\\docs\\audits\\v5.2.4-rebuild";

async function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const port = 9225;

  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
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
          } catch (e) {
            reject(e);
          }
        };
        ws.addEventListener("message", handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await sendCommand("Page.enable");
    await sendCommand("Runtime.enable");

    async function captureElement(filename, url, selector, isMobile = false) {
      console.log(`Capturing ${filename} (${selector})...`);
      if (isMobile) {
        await sendCommand("Emulation.setDeviceMetricsOverride", {
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
          mobile: true,
        });
      } else {
        await sendCommand("Emulation.setDeviceMetricsOverride", {
          width: 1440,
          height: 900,
          deviceScaleFactor: 1,
          mobile: false,
        });
      }

      await sendCommand("Page.navigate", { url });
      await wait(2000);

      await sendCommand("Runtime.evaluate", {
        expression: `
          const el = document.querySelector('${selector}');
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
        `,
      });
      await wait(1200);

      const screenshot = await sendCommand("Page.captureScreenshot", {
        format: "png",
      });
      fs.writeFileSync(
        path.join(auditDir, filename),
        Buffer.from(screenshot.data, "base64")
      );
    }

    // Capture Drivers 112 CTA (desktop & mobile)
    await captureElement("12-desktop-drivers-112-cta-centered.png", "http://localhost:3000/drivers", "#emergency-112-cta", false);
    await captureElement("24-mobile-112-radar-cta-centered.png", "http://localhost:3000/drivers", "#emergency-112-cta", true);

    // Capture Safety 112 CTA (desktop)
    await captureElement("18b-desktop-safety-112-cta.png", "http://localhost:3000/safety", "button", false);

    // Capture Partner Marquee on Home
    await captureElement("05b-desktop-home-partner-marquee-centered.png", "http://localhost:3000", "#partner-marquee", false);

    console.log("Radar & Marquee captures complete!");
    ws.close();
  } catch (err) {
    console.error("Capture error:", err);
  } finally {
    chrome.kill();
  }
}

run();
