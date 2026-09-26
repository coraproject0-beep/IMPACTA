import { spawn } from "child_process";
import fs from "fs";
import path from "path";

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const auditDir = "c:\\Dev\\ANTI\\IMPACTA\\docs\\audits\\v5.2.2-final-correction";
if (!fs.existsSync(auditDir)) {
  fs.mkdirSync(auditDir, { recursive: true });
}

async function runAudits() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const port = 9561;
  const tempDir = `C:\\Users\\sanna\\AppData\\Local\\Temp\\chrome_audit_${port}`;

  console.log("Starting Chrome for V5.2.2 Final Visual Correction Audits...");
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

    await sendCommand("Page.enable");
    await sendCommand("DOM.enable");
    await sendCommand("Runtime.enable");

    async function setViewport(width, height, isMobile = false) {
      await sendCommand("Emulation.setDeviceMetricsOverride", {
        width,
        height,
        deviceScaleFactor: 2,
        mobile: isMobile,
      });
    }

    async function navigateTo(urlPath) {
      console.log(`Navigating to http://localhost:3000${urlPath}...`);
      await sendCommand("Page.navigate", { url: `http://localhost:3000${urlPath}` });
      await wait(2000);
    }

    async function scrollToY(y) {
      await sendCommand("Runtime.evaluate", {
        expression: `window.scrollTo({ top: ${y}, behavior: 'instant' });`,
      });
      await wait(600);
    }

    async function takeScreenshot(fileName) {
      const { data } = await sendCommand("Page.captureScreenshot", {
        format: "png",
      });
      const filePath = path.join(auditDir, fileName);
      fs.writeFileSync(filePath, Buffer.from(data, "base64"));
      console.log(`  ✓ Saved screenshot: ${fileName}`);
    }

    async function evaluateScript(expr) {
      const res = await sendCommand("Runtime.evaluate", {
        expression: expr,
        returnByValue: true,
      });
      return res.result ? res.result.value : null;
    }

    // Set initial desktop
    await setViewport(1440, 900, false);

    // Initial navigation: force EN first for baseline English screenshots
    await navigateTo("/");
    await evaluateScript(`window.__impactaSetLocale && window.__impactaSetLocale("en")`);
    await wait(800);

    // 1. HOME DESKTOP (ENGLISH)
    await scrollToY(0);
    await takeScreenshot("01-desktop-home-hero.png");

    // Scroll to rotating statement
    await scrollToY(900);
    await takeScreenshot("02-desktop-home-fragments.png");

    // Scroll to Black Box
    await sendCommand("Runtime.evaluate", {
      expression: `
        const el = document.getElementById("black-box");
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      `,
    });
    await wait(1200);

    const videoState = await evaluateScript(`
      (() => {
        const v = document.querySelector("#black-box video");
        return v ? { paused: v.paused, currentTime: v.currentTime, loop: v.loop, muted: v.muted, src: v.src } : null;
      })()
    `);
    console.log("  [Audit] Black Box Video State:", videoState);
    await takeScreenshot("03-desktop-home-blackbox-void.png");

    // Scroll to Driver 3D Scene with vehicle damage
    await sendCommand("Runtime.evaluate", {
      expression: `
        const el = document.getElementById("driver-chapter");
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      `,
    });
    await wait(1000);
    await takeScreenshot("04-desktop-home-driver-3d-scene.png");

    // Scroll to Claims Synthesis / Insurer Section
    await sendCommand("Runtime.evaluate", {
      expression: `
        const el = document.getElementById("insurer-chapter");
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      `,
    });
    await wait(1000);
    await takeScreenshot("05-desktop-home-insurer-workbench.png");

    // Scroll to Partner Marquee
    await sendCommand("Runtime.evaluate", {
      expression: `window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });`,
    });
    await wait(1000);
    await takeScreenshot("06-desktop-home-partner-marquee.png");

    // 2. OTHER PUBLIC PAGES (DESKTOP ENGLISH)
    // Platform
    await navigateTo("/platform");
    await scrollToY(0);
    await takeScreenshot("07-desktop-platform-hero.png");

    // Drivers
    await navigateTo("/drivers");
    await scrollToY(0);
    await takeScreenshot("08-desktop-drivers-hero.png");
    await sendCommand("Runtime.evaluate", {
      expression: `window.scrollTo({ top: 1100, behavior: 'instant' });`,
    });
    await wait(1000);
    await takeScreenshot("09-desktop-drivers-3d-scene.png");

    // Insurers
    await navigateTo("/insurers");
    await scrollToY(0);
    await takeScreenshot("10-desktop-insurers-hero.png");
    await sendCommand("Runtime.evaluate", {
      expression: `window.scrollTo({ top: 750, behavior: 'instant' });`,
    });
    await wait(1000);
    await takeScreenshot("11-desktop-insurers-workbench.png");

    // Technology
    await navigateTo("/technology");
    await scrollToY(0);
    await takeScreenshot("12-desktop-technology-hero.png");
    await sendCommand("Runtime.evaluate", {
      expression: `window.scrollTo({ top: 700, behavior: 'instant' });`,
    });
    await wait(1000);
    await takeScreenshot("13-desktop-technology-architecture.png");

    // Safety
    await navigateTo("/safety");
    await scrollToY(0);
    await takeScreenshot("14-desktop-safety-hero.png");
    await sendCommand("Runtime.evaluate", {
      expression: `window.scrollTo({ top: 600, behavior: 'instant' });`,
    });
    await wait(1000);
    await takeScreenshot("15-desktop-safety-pillars.png");

    // Terms
    await navigateTo("/terms");
    await scrollToY(0);
    await takeScreenshot("16-desktop-terms.png");

    // Privacy
    await navigateTo("/privacy");
    await scrollToY(0);
    await takeScreenshot("17-desktop-privacy.png");

    // 3. RUNTIME LANGUAGE SWITCHING TEST (EN -> IT -> EN)
    console.log("\n=======================================================");
    console.log("TESTING RUNTIME LANGUAGE SWITCHING (EN -> IT)");
    console.log("=======================================================");
    await navigateTo("/");
    await scrollToY(0);

    // Verify currently in EN
    const h1En = await evaluateScript(`document.querySelector("h1")?.innerText`);
    console.log("  [Before Click] Home H1 in EN:", JSON.stringify(h1En));

    // Click the language switcher button to toggle EN -> IT
    const clickToggle = await evaluateScript(`
      (() => {
        const b = document.querySelector("button[title*='Toggle language']");
        if (b) {
          b.click();
          return { clicked: true, text: b.textContent };
        }
        return { clicked: false };
      })()
    `);
    console.log("  [Toggle Button Clicked]:", clickToggle);
    await wait(1000);

    // Verify Home in Italian after toggle without page reload!
    const h1It = await evaluateScript(`document.querySelector("h1")?.innerText`);
    console.log("  [After Toggle] Home H1 in IT:", JSON.stringify(h1It));
    await takeScreenshot("18-desktop-home-italian-hero.png");

    // Scroll to Driver Chapter in IT
    await sendCommand("Runtime.evaluate", {
      expression: `
        const el = document.getElementById("driver-chapter");
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      `,
    });
    await wait(1000);
    const driverItHeading = await evaluateScript(`document.querySelector("#driver-chapter h2")?.innerText`);
    console.log("  [Italian Verification] Driver Chapter H2:", JSON.stringify(driverItHeading));
    await takeScreenshot("19-desktop-home-italian-driver-chapter.png");

    // Scroll to Insurer Chapter in IT
    await sendCommand("Runtime.evaluate", {
      expression: `
        const el = document.getElementById("insurer-chapter");
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      `,
    });
    await wait(1000);
    const insurerItHeading = await evaluateScript(`document.querySelector("#insurer-chapter h2")?.innerText`);
    console.log("  [Italian Verification] Insurer Chapter H2:", JSON.stringify(insurerItHeading));
    await takeScreenshot("20-desktop-home-italian-insurer-chapter.png");

    // Navigate to /drivers while IT preference is active
    await navigateTo("/drivers");
    await scrollToY(0);
    const driversItText = await evaluateScript(`document.querySelector("h1")?.innerText`);
    console.log("  [Italian Verification] Drivers Page H1:", JSON.stringify(driversItText));
    await takeScreenshot("21-desktop-drivers-italian.png");

    // Navigate to /insurers while IT is active
    await navigateTo("/insurers");
    await scrollToY(0);
    const insurersItText = await evaluateScript(`document.querySelector("h1")?.innerText`);
    console.log("  [Italian Verification] Insurers Page H1:", JSON.stringify(insurersItText));
    await takeScreenshot("22-desktop-insurers-italian.png");

    // Navigate to /technology while IT is active
    await navigateTo("/technology");
    await scrollToY(0);
    const techItText = await evaluateScript(`document.querySelector("h1")?.innerText`);
    console.log("  [Italian Verification] Technology Page H1:", JSON.stringify(techItText));
    await takeScreenshot("23-desktop-technology-italian.png");

    // Navigate to /safety while IT is active
    await navigateTo("/safety");
    await scrollToY(0);
    const safetyItText = await evaluateScript(`document.querySelector("h1")?.innerText`);
    console.log("  [Italian Verification] Safety Page H1:", JSON.stringify(safetyItText));
    await takeScreenshot("24-desktop-safety-italian.png");

    // Navigate to /terms while IT is active
    await navigateTo("/terms");
    await scrollToY(0);
    const termsItText = await evaluateScript(`document.querySelector("h1")?.innerText`);
    console.log("  [Italian Verification] Terms Page H1:", JSON.stringify(termsItText));
    await takeScreenshot("25-desktop-terms-italian.png");

    // 4. MOBILE VIEWPORT (390 x 844)
    console.log("\n=======================================================");
    console.log("SWITCHING TO MOBILE VIEWPORT (390x844)");
    console.log("=======================================================");
    await setViewport(390, 844, true);

    // Mobile Home Hero
    await navigateTo("/");
    await scrollToY(0);
    await takeScreenshot("26-mobile-home-hero.png");

    // Mobile Black Box
    await sendCommand("Runtime.evaluate", {
      expression: `
        const el = document.getElementById("black-box");
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      `,
    });
    await wait(1200);
    await takeScreenshot("27-mobile-home-blackbox.png");

    // Mobile Driver 3D Scene
    await sendCommand("Runtime.evaluate", {
      expression: `
        const el = document.getElementById("driver-chapter");
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      `,
    });
    await wait(1200);
    await takeScreenshot("28-mobile-home-driver-scene.png");

    // Mobile Drivers Page
    await navigateTo("/drivers");
    await scrollToY(0);
    await takeScreenshot("29-mobile-drivers-hero.png");

    console.log("\n=== V5.2.2 ALL AUDITS & SCREENSHOTS COMPLETED SUCCESSFULLY ===");
    ws.close();
  } catch (err) {
    console.error("Audit error:", err);
  } finally {
    proc.kill();
  }
}

runAudits();
