import { spawn } from "child_process";
import fs from "fs";
import path from "path";

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const auditDir = "c:\\Dev\\ANTI\\IMPACTA\\docs\\audits\\v5.2.3-art-direction";
if (!fs.existsSync(auditDir)) {
  fs.mkdirSync(auditDir, { recursive: true });
}

async function runAudits() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const port = 9568;
  const tempDir = `C:\\Users\\sanna\\AppData\\Local\\Temp\\chrome_audit_${port}`;

  console.log("Starting Chrome for V5.2.3 Final Art-Direction Audits...");
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
          } catch (e) {
            reject(e);
          }
        };
        ws.addEventListener("message", handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await sendCommand("Page.enable");
    await sendCommand("DOM.enable");
    await sendCommand("Runtime.enable");

    async function setViewport(w, h, isMobile = false) {
      await sendCommand("Emulation.setDeviceMetricsOverride", {
        width: w,
        height: h,
        deviceScaleFactor: 1,
        mobile: isMobile,
      });
    }

    async function capture(filename) {
      await wait(350);
      const res = await sendCommand("Page.captureScreenshot", { format: "png" });
      const filepath = path.join(auditDir, filename);
      fs.writeFileSync(filepath, Buffer.from(res.data, "base64"));
      console.log(`Saved screenshot: ${filename}`);
    }

    async function navigate(url) {
      await sendCommand("Page.navigate", { url });
      await wait(1400);
    }

    async function scrollTo(y) {
      await sendCommand("Runtime.evaluate", {
        expression: `window.scrollTo({ top: ${y}, behavior: 'instant' });`,
      });
      await wait(350);
    }

    async function getElementScrollY(selector) {
      const res = await sendCommand("Runtime.evaluate", {
        expression: `
          (() => {
            const el = document.querySelector("${selector}");
            if (!el) return null;
            const rect = el.getBoundingClientRect();
            return window.scrollY + rect.top;
          })()
        `,
        returnByValue: true,
      });
      return res.result.value;
    }

    // ==========================================
    // 1. DESKTOP VIEWPORT (1440 x 900)
    // ==========================================
    console.log("\n--- Capturing Desktop Audits (1440x900) ---");
    await setViewport(1440, 900, false);
    await navigate("http://localhost:3000/");

    // Explicitly select EN for consistent English captures first
    await sendCommand("Runtime.evaluate", {
      expression: `
        (() => {
          localStorage.setItem("impacta_language_preference", "en");
          const btn = Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("EN") && b.textContent.includes("IT"));
          if (btn) {
            const boldSpan = btn.querySelector("span.font-bold");
            if (!boldSpan || boldSpan.textContent.trim() !== "EN") {
              btn.click();
            }
          }
        })()
      `,
    });
    await wait(400);

    // Check Black Box autoplay status in DOM
    const videoStatus = await sendCommand("Runtime.evaluate", {
      expression: `
        (() => {
          const video = document.querySelector("#black-box video");
          return {
            exists: !!video,
            src: video ? video.getAttribute("src") : null,
            paused: video ? video.paused : null,
            loop: video ? video.loop : null,
            currentTime: video ? video.currentTime : null
          };
        })()
      `,
      returnByValue: true,
    });
    console.log("Black Box video status:", videoStatus.result.value);

    // 01: Home Black Box entry (Progressive dark corridor)
    const bbY = await getElementScrollY("#black-box");
    await scrollTo(Math.max(0, bbY - 600));
    await capture("01-desktop-home-blackbox-entry.png");

    // 02: Black Box kinetic typography (Top of black box sequence)
    await scrollTo(bbY + 300);
    await capture("02-desktop-home-blackbox-kinetic-type.png");

    // 03: Black Box impact moment (Midpoint of pin, text recedes)
    await scrollTo(bbY + 900);
    await capture("03-desktop-home-blackbox-impact.png");

    // 04: Black Box closing exit statement (Within pin, ready for human review centered)
    await scrollTo(bbY + 1300);
    await capture("04-desktop-home-blackbox-closing.png");

    // 05: Home unified ending (One Incident. One Shared Record.)
    const endingY = await getElementScrollY("section:has(#black-box) ~ section");
    // Find HomeClosingTransition
    const closingY = await sendCommand("Runtime.evaluate", {
      expression: `
        (() => {
          const headings = Array.from(document.querySelectorAll("h2"));
          const h = headings.find(el => el.textContent.includes("ONE INCIDENT") || el.textContent.includes("UN INCIDENTE"));
          if (!h) return null;
          return window.scrollY + h.getBoundingClientRect().top - 120;
        })()
      `,
      returnByValue: true,
    });
    if (closingY.result.value) {
      await scrollTo(closingY.result.value);
    }
    await capture("05-desktop-home-unified-ending.png");

    // 06: Logo Marquee (Discreet DEMO NETWORK label, 8 bespoke vector logos)
    const marqueeY = await sendCommand("Runtime.evaluate", {
      expression: `
        (() => {
          const el = document.querySelector(".animate-marquee");
          if (!el) return null;
          return window.scrollY + el.getBoundingClientRect().top - 200;
        })()
      `,
      returnByValue: true,
    });
    if (marqueeY.result.value) {
      await scrollTo(marqueeY.result.value);
    }
    await capture("06-desktop-home-logo-marquee.png");

    // 07: Insurers Hero (Integrated spatial claim plane in DOM 3D)
    await navigate("http://localhost:3000/insurers");
    await scrollTo(0);
    await capture("07-desktop-insurers-hero.png");

    // 08: Insurers Operational Flow (4-stage flow with separated 3D evidence planes)
    await scrollTo(850);
    await capture("08-desktop-insurers-operational-flow.png");

    // 09: 112 Demo Screen (Modal with EmergencyRadar and calm urgency)
    await navigate("http://localhost:3000/app/insurance");
    await wait(600);
    // Click trigger-112-demo button
    await sendCommand("Runtime.evaluate", {
      expression: `
        (() => {
          const btn = document.querySelector('[data-testid="trigger-112-demo"]');
          if (btn) btn.click();
        })()
      `,
    });
    await wait(800);
    await capture("09-desktop-112-demo-screen.png");

    // Close 112 modal
    await sendCommand("Runtime.evaluate", {
      expression: `
        (() => {
          const btn = document.querySelector('button[aria-label*="Close"], button[aria-label*="Chiudi"]');
          if (btn) btn.click();
        })()
      `,
    });
    await wait(400);

    // 10: Insurance Status Area (Editorial Active Policy treatment, no green dot, no pill)
    await scrollTo(0);
    await capture("10-desktop-insurance-status-area.png");

    // ==========================================
    // 2. ITALIAN RUNTIME TOGGLE AUDITS (1440 x 900)
    // ==========================================
    console.log("\n--- Capturing Italian Runtime Audits ---");
    await navigate("http://localhost:3000/");
    // Toggle language to Italian via header button and localStorage
    await sendCommand("Runtime.evaluate", {
      expression: `
        (() => {
          localStorage.setItem("impacta_language_preference", "it");
          const btn = Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("EN") && b.textContent.includes("IT"));
          if (btn) {
            const boldSpan = btn.querySelector("span.font-bold");
            if (!boldSpan || boldSpan.textContent.trim() !== "IT") {
              btn.click();
            }
          }
        })()
      `,
    });
    await wait(600);

    // 11: Italian kinetic typography
    const itBbY = await getElementScrollY("#black-box");
    await scrollTo(itBbY + 300);
    await capture("11-desktop-home-italian-kinetic-type.png");

    // 12: Italian Home closing section
    const itClosingY = await sendCommand("Runtime.evaluate", {
      expression: `
        (() => {
          const headings = Array.from(document.querySelectorAll("h2"));
          const h = headings.find(el => el.textContent.includes("UN INCIDENTE") || el.textContent.includes("ONE INCIDENT"));
          if (!h) return null;
          return window.scrollY + h.getBoundingClientRect().top - 120;
        })()
      `,
      returnByValue: true,
    });
    if (itClosingY.result.value) {
      await scrollTo(itClosingY.result.value);
    }
    await capture("12-desktop-home-italian-closing.png");

    // 13: Italian Insurers Page
    await navigate("http://localhost:3000/insurers");
    await scrollTo(0);
    await capture("13-desktop-insurers-italian.png");

    // ==========================================
    // 3. MOBILE VIEWPORT (390 x 844)
    // ==========================================
    console.log("\n--- Capturing Mobile Audits (390x844) ---");
    await setViewport(390, 844, true);
    await navigate("http://localhost:3000/");

    // 14: Mobile Black Box
    const mBbY = await getElementScrollY("#black-box");
    await scrollTo(mBbY + 200);
    await capture("14-mobile-blackbox.png");

    // 15: Mobile 112 Demo Screen
    await navigate("http://localhost:3000/app/insurance");
    await wait(600);
    await sendCommand("Runtime.evaluate", {
      expression: `
        (() => {
          const btn = document.querySelector('[data-testid="trigger-112-demo"]');
          if (btn) btn.click();
        })()
      `,
    });
    await wait(800);
    await capture("15-mobile-112.png");

    // Close 112 modal
    await sendCommand("Runtime.evaluate", {
      expression: `
        (() => {
          const btn = document.querySelector('button[aria-label*="Close"], button[aria-label*="Chiudi"]');
          if (btn) btn.click();
        })()
      `,
    });
    await wait(400);

    // 18: Mobile Insurance Status Area
    await scrollTo(0);
    await capture("18-mobile-insurance-status.png");

    // 16: Mobile Marquee
    await navigate("http://localhost:3000/");
    const mMqY = await sendCommand("Runtime.evaluate", {
      expression: `
        (() => {
          const el = document.querySelector(".animate-marquee");
          if (!el) return null;
          return window.scrollY + el.getBoundingClientRect().top - 200;
        })()
      `,
      returnByValue: true,
    });
    if (mMqY.result.value) {
      await scrollTo(mMqY.result.value);
    }
    await capture("16-mobile-marquee.png");

    // 17: Mobile Insurers
    await navigate("http://localhost:3000/insurers");
    await scrollTo(0);
    await capture("17-mobile-insurers.png");

    console.log("\n✅ All V5.2.3 visual audits completed successfully!");
  } finally {
    proc.kill();
  }
}

runAudits().catch((err) => {
  console.error("Audit error:", err);
  process.exit(1);
});
