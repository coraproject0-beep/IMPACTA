import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const auditDir = "c:\\Dev\\ANTI\\IMPACTA\\docs\\audits\\v5.2.4-rebuild";
fs.mkdirSync(auditDir, { recursive: true });

async function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  console.log("Starting Chrome for V5.2.4 QA & Browser Audit...");
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const port = 9224;

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

    async function capture(filename, url, scrollY = 0, isMobile = false) {
      console.log(`Capturing ${filename} (${isMobile ? "390x844" : "1440x900"})...`);
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
          deviceScaleFactor: 2,
          mobile: false,
        });
      }

      await sendCommand("Page.navigate", { url });
      await wait(1800);

      if (scrollY > 0) {
        await sendCommand("Runtime.evaluate", {
          expression: `window.scrollTo({ top: ${scrollY}, behavior: 'instant' });`,
        });
        await wait(1000);
      }

      const screenshot = await sendCommand("Page.captureScreenshot", {
        format: "png",
      });
      fs.writeFileSync(
        path.join(auditDir, filename),
        Buffer.from(screenshot.data, "base64")
      );
    }

    // 1. Desktop 1440x900 Audits
    // Home Black Box Sections
    await capture("01-desktop-home-blackbox-top-rail.png", "http://localhost:3000", 1750, false);
    await capture("02-desktop-home-blackbox-full-video.png", "http://localhost:3000", 2200, false);
    await capture("03-desktop-home-blackbox-bottom-rail.png", "http://localhost:3000", 1850, false);
    await capture("04-desktop-home-blackbox-closing.png", "http://localhost:3000", 2800, false);
    await capture("05-desktop-home-partner-heading-marquee.png", "http://localhost:3000", 4100, false);

    // Platform Corridor & Horizontal Gallery
    await capture("06-desktop-platform-evidence-corridor.png", "http://localhost:3000/platform", 800, false);
    await capture("07-desktop-platform-curtain-transition.png", "http://localhost:3000/platform", 1600, false);
    await capture("08-desktop-platform-cai-box12-horizontal.png", "http://localhost:3000/platform", 2300, false);
    await capture("09-desktop-platform-human-adjudication.png", "http://localhost:3000/platform", 3100, false);

    // Drivers Constellation & 112 CTA
    await capture("10-desktop-drivers-constellation.png", "http://localhost:3000/drivers", 1200, false);
    await capture("11-desktop-drivers-sticky-journey.png", "http://localhost:3000/drivers", 2000, false);
    await capture("12-desktop-drivers-112-cta-radar.png", "http://localhost:3000/drivers", 2900, false);

    // Insurers Spatial Claim Object & Evidence Fan
    await capture("13-desktop-insurers-graphite-object.png", "http://localhost:3000/insurers", 200, false);
    await capture("14-desktop-insurers-claims-continuum.png", "http://localhost:3000/insurers", 1000, false);
    await capture("15-desktop-insurers-evidence-fan.png", "http://localhost:3000/insurers", 1900, false);
    await capture("16-desktop-insurers-observed-vs-inferred.png", "http://localhost:3000/insurers", 2700, false);
    await capture("17-desktop-insurers-human-payoff.png", "http://localhost:3000/insurers", 3600, false);

    // Safety & Technology Open Architecture
    await capture("18-desktop-safety-open-architecture.png", "http://localhost:3000/safety", 650, false);
    await capture("19-desktop-technology-open-planes.png", "http://localhost:3000/technology", 700, false);

    // 2. Mobile 390x844 Audits
    await capture("20-mobile-blackbox-rails.png", "http://localhost:3000", 1600, true);
    await capture("21-mobile-platform-corridor.png", "http://localhost:3000/platform", 800, true);
    await capture("22-mobile-drivers-constellation.png", "http://localhost:3000/drivers", 1100, true);
    await capture("23-mobile-insurers-claim-object.png", "http://localhost:3000/insurers", 300, true);
    await capture("24-mobile-112-radar-cta.png", "http://localhost:3000/drivers", 2500, true);

    console.log("V5.2.4 QA Audit captures completed successfully!");
    ws.close();
  } catch (err) {
    console.error("Audit error:", err);
  } finally {
    chrome.kill();
  }
}

run();
