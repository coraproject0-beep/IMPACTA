import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const auditDir = "c:\\Dev\\ANTI\\IMPACTA\\docs\\audits\\final-pre-backend-lock";
fs.mkdirSync(auditDir, { recursive: true });

async function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  console.log("Starting Chrome for Final Pre-Backend Visual Lock Audits...");
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const port = 9222;

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
      await wait(400);
      const res = await sendCommand("Page.captureScreenshot", { format: "png" });
      const filepath = path.join(auditDir, filename);
      fs.writeFileSync(filepath, Buffer.from(res.data, "base64"));
      console.log(`Saved screenshot: ${filename}`);
    }

    async function navigate(url) {
      await sendCommand("Page.navigate", { url });
      await wait(1800);
    }

    async function scrollTo(y) {
      await sendCommand("Runtime.evaluate", {
        expression: `window.scrollTo({ top: ${y}, behavior: 'instant' });`,
      });
      await wait(400);
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
    // 1. DESKTOP VIEWPORT (1440 x 900) - ENGLISH
    // ==========================================
    console.log("\n--- Capturing Desktop Audits (1440x900) ---");
    await setViewport(1440, 900, false);
    await navigate("http://localhost:3000/");

    // Explicitly set EN
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
    await wait(500);

    const bbY = await getElementScrollY("#black-box");

    // 01: Black Box entry corridor
    await scrollTo(Math.max(0, bbY - 600));
    await capture("01-desktop-home-blackbox-entry.png");

    // 02: Black Box kinetic typography with safe-zone
    await scrollTo(bbY + 300);
    await capture("02-desktop-home-blackbox-kinetic-safezone.png");

    // 03: Black Box collision window (unobstructed crash)
    await scrollTo(bbY + 900);
    await capture("03-desktop-home-blackbox-impact.png");

    // 04: Black Box closing exit statement (no technical eyebrows)
    await scrollTo(bbY + 1300);
    await capture("04-desktop-home-blackbox-closing.png");

    // 05: Home unified closing section (truthful structured record)
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
    await capture("05-desktop-home-closing-truthful.png");

    // 06: Logo Marquee (no DEMO NETWORK label)
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
    await capture("06-desktop-home-logo-marquee-clean.png");

    // 07: Insurers Hero (Multi-plane 3D dossier)
    await navigate("http://localhost:3000/insurers");
    await scrollTo(0);
    await capture("07-desktop-insurers-hero.png");

    // 08: Insurers Operational Continuum (Stage 1: Queue)
    await scrollTo(850);
    await sendCommand("Runtime.evaluate", {
      expression: `
        (() => {
          const buttons = Array.from(document.querySelectorAll("button"));
          const qBtn = buttons.find(b => b.textContent.includes("01") || b.textContent.includes("Queue"));
          if (qBtn) qBtn.click();
        })()
      `,
    });
    await wait(400);
    await capture("08-desktop-insurers-operational-continuum.png");

    // 09: Insurers Stage 3: Evidence Planes (Confirmed vs Inferred)
    await sendCommand("Runtime.evaluate", {
      expression: `
        (() => {
          const buttons = Array.from(document.querySelectorAll("button"));
          const pBtn = buttons.find(b => b.textContent.includes("03") || b.textContent.includes("Planes"));
          if (pBtn) pBtn.click();
        })()
      `,
    });
    await wait(400);
    await capture("09-desktop-insurers-planes-separated.png");

    // 10: Insurers Stage 4: Human Review Payoff
    await sendCommand("Runtime.evaluate", {
      expression: `
        (() => {
          const buttons = Array.from(document.querySelectorAll("button"));
          const rBtn = buttons.find(b => b.textContent.includes("04") || b.textContent.includes("Sign-off") || b.textContent.includes("Revisione"));
          if (rBtn) rBtn.click();
        })()
      `,
    });
    await wait(400);
    await capture("10-desktop-insurers-human-payoff.png");

    // 11: Active Policy micro-cleanup in Driver Insurance page
    await navigate("http://localhost:3000/app/insurance");
    await scrollTo(0);
    await capture("11-desktop-insurance-active-policy.png");

    // ==========================================
    // 2. ITALIAN RUNTIME TOGGLE AUDITS (1440 x 900)
    // ==========================================
    console.log("\n--- Capturing Italian Runtime Audits ---");
    await navigate("http://localhost:3000/");
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
    await wait(500);

    // 12: Italian kinetic typography
    const itBbY = await getElementScrollY("#black-box");
    await scrollTo(itBbY + 300);
    await capture("12-desktop-italian-blackbox-kinetic.png");

    // 13: Italian Home closing section
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
    await capture("13-desktop-italian-home-closing.png");

    // 14: Italian Insurers Hero
    await navigate("http://localhost:3000/insurers");
    await scrollTo(0);
    await capture("14-desktop-italian-insurers-hero.png");

    // 15: Italian Insurers Stage 4 Payoff
    await scrollTo(850);
    await sendCommand("Runtime.evaluate", {
      expression: `
        (() => {
          const buttons = Array.from(document.querySelectorAll("button"));
          const rBtn = buttons.find(b => b.textContent.includes("04") || b.textContent.includes("Firma"));
          if (rBtn) rBtn.click();
        })()
      `,
    });
    await wait(400);
    await capture("15-desktop-italian-insurers-payoff.png");

    // ==========================================
    // 3. MOBILE VIEWPORT (390 x 844)
    // ==========================================
    console.log("\n--- Capturing Mobile Audits (390x844) ---");
    await setViewport(390, 844, true);
    await navigate("http://localhost:3000/");

    // 16: Mobile Black Box safe typography & edge dissolve
    const mBbY = await getElementScrollY("#black-box");
    await scrollTo(mBbY + 250);
    await capture("16-mobile-blackbox-safezone.png");

    // 17: Mobile Insurers
    await navigate("http://localhost:3000/insurers");
    await scrollTo(0);
    await capture("17-mobile-insurers.png");

    // 18: Mobile Policy status
    await navigate("http://localhost:3000/app/insurance");
    await scrollTo(0);
    await capture("18-mobile-insurance-status.png");

    console.log("\n✅ All Final Pre-Backend Visual Lock audits completed successfully!");
  } finally {
    chrome.kill();
  }
}

run().catch((e) => {
  console.error("Audit error:", e);
  process.exit(1);
});
