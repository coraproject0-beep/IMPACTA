import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const auditDir = "c:\\Dev\\ANTI\\IMPACTA\\docs\\audits\\v5.2.5-qa";
fs.mkdirSync(auditDir, { recursive: true });

async function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  console.log("Starting Chrome for V5.2.5 QA & Visual Verification...");
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

    async function evaluate(expression) {
      const res = await sendCommand("Runtime.evaluate", {
        expression,
        returnByValue: true,
      });
      return res?.result?.value;
    }

    async function capture(filename, url, scrollSelectorOrY = 0, isMobile = false) {
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
      await wait(2200);

      if (typeof scrollSelectorOrY === "string") {
        await evaluate(`
          (() => {
            const el = document.querySelector('${scrollSelectorOrY}');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
          })()
        `);
        await wait(1200);
      } else if (typeof scrollSelectorOrY === "number" && scrollSelectorOrY > 0) {
        await evaluate(`window.scrollTo({ top: ${scrollSelectorOrY}, behavior: 'instant' });`);
        await wait(1200);
      }

      const screenshot = await sendCommand("Page.captureScreenshot", {
        format: "png",
      });
      fs.writeFileSync(
        path.join(auditDir, filename),
        Buffer.from(screenshot.data, "base64")
      );
    }

    // 1. Home Page - Black Box Section measurements & captures
    console.log("\n--- AUDIT 1: Home Page Black Box Scale & Dissolve ---");
    await capture("desktop-01-home-blackbox-start.png", "http://localhost:3000/", "#black-box");

    // Measure Black Box video wrapper dimensions on desktop
    const bbMetrics = await evaluate(`
      (() => {
        const sec = document.querySelector('#black-box');
        const vid = sec ? sec.querySelector('video') : null;
        const wrapper = vid ? vid.parentElement : null;
        if (!sec || !vid || !wrapper) return null;
        const r = wrapper.getBoundingClientRect();
        const vr = vid.getBoundingClientRect();
        return {
          wrapperWidth: r.width,
          wrapperHeight: r.height,
          vw: window.innerWidth,
          vh: window.innerHeight,
          ratioW: (r.width / window.innerWidth).toFixed(2),
          ratioH: (r.height / window.innerHeight).toFixed(2),
          maskImage: window.getComputedStyle(wrapper).maskImage || window.getComputedStyle(wrapper).webkitMaskImage,
          videoSrc: vid.currentSrc,
          videoPaused: vid.paused
        };
      })()
    `);
    console.log("Desktop Black Box Metrics:", bbMetrics);

    // Scroll into collision stage
    const bbTop = await evaluate(`
      (() => {
        const sec = document.querySelector('#black-box');
        return sec ? sec.getBoundingClientRect().top + window.scrollY : 0;
      })()
    `);
    console.log("Black Box absolute top:", bbTop);

    // Scroll inside the pinned stage to collision window (~40% of scrollTrigger pin)
    await evaluate(`window.scrollTo({ top: ${bbTop + 650}, behavior: 'instant' });`);
    await wait(1000);
    let ss = await sendCommand("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(path.join(auditDir, "desktop-02-home-blackbox-collision.png"), Buffer.from(ss.data, "base64"));

    // Scroll to exit statement (~85% of scrollTrigger pin)
    await evaluate(`window.scrollTo({ top: ${bbTop + 1400}, behavior: 'instant' });`);
    await wait(1000);
    ss = await sendCommand("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(path.join(auditDir, "desktop-03-home-blackbox-exit.png"), Buffer.from(ss.data, "base64"));

    // Mobile Black Box capture & metrics
    await capture("mobile-01-home-blackbox-start.png", "http://localhost:3000/", "#black-box", true);
    const mobileBBMetrics = await evaluate(`
      (() => {
        const sec = document.querySelector('#black-box');
        const vid = sec ? sec.querySelector('video') : null;
        const wrapper = vid ? vid.parentElement : null;
        if (!sec || !vid || !wrapper) return null;
        const r = wrapper.getBoundingClientRect();
        return {
          wrapperWidth: r.width,
          wrapperHeight: r.height,
          vw: window.innerWidth,
          vh: window.innerHeight,
          ratioW: (r.width / window.innerWidth).toFixed(2),
          ratioH: (r.height / window.innerHeight).toFixed(2),
        };
      })()
    `);
    console.log("Mobile Black Box Metrics:", mobileBBMetrics);

    // Mobile collision
    const mobileBBTop = await evaluate(`
      (() => {
        const sec = document.querySelector('#black-box');
        return sec ? sec.getBoundingClientRect().top + window.scrollY : 0;
      })()
    `);
    await evaluate(`window.scrollTo({ top: ${mobileBBTop + 600}, behavior: 'instant' });`);
    await wait(1000);
    ss = await sendCommand("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(path.join(auditDir, "mobile-02-home-blackbox-collision.png"), Buffer.from(ss.data, "base64"));

    // 2. Insurers Page - Open Spatial 3D Planes & Card Purge Check
    console.log("\n--- AUDIT 2: Insurers Page Open Spatial 3D Composition ---");
    await capture("desktop-04-insurers-hero-open-planes.png", "http://localhost:3000/insurers", 0);

    const insurersHeroAudit = await evaluate(`
      (() => {
        const darkDossier = document.querySelector('.bg-\\\\[\\\\#0E0F12\\\\].border.border-white\\\\/15');
        const physicalClaimText = document.body.innerText.includes('PHYSICAL CLAIM OBJECT');
        const humanDecided100Text = document.body.innerText.includes('100% Decisione Umana') || document.body.innerText.includes('100% Human Decided');
        const hardTelemetry100Text = document.body.innerText.includes('100% HARD TELEMETRY');
        const any100Text = document.body.innerText.match(/100%/g);

        return {
          darkDossierCardFound: !!darkDossier,
          physicalClaimObjectLabelFound: physicalClaimText,
          humanDecided100Found: humanDecided100Text,
          hardTelemetry100Found: hardTelemetry100Text,
          any100OccurrencesOnPage: any100Text ? any100Text.length : 0,
        };
      })()
    `);
    console.log("Insurers Page Slop / Card / 100% Audit Result:", insurersHeroAudit);

    // Capture Insurers evidence fan
    await capture("desktop-05-insurers-evidence-fan.png", "http://localhost:3000/insurers", 1500);

    // Capture Insurers observed vs inferred by scrolling directly to the section text
    await sendCommand("Runtime.evaluate", {
      expression: `
        (() => {
          const sections = Array.from(document.querySelectorAll('section'));
          const sec = sections.find(s => s.innerText.includes('Osservato vs. Inferito') || s.innerText.includes('Observed vs. Inferred'));
          if (sec) {
            // ScrollTrigger pin spacer adds +=180% viewport height before section 4
            const pinOffset = window.innerHeight * 1.8;
            const top = sec.getBoundingClientRect().top + window.scrollY + pinOffset;
            window.scrollTo({ top: top - 60, behavior: 'instant' });
          }
        })()
      `,
    });
    await wait(1400);
    let ssObs = await sendCommand("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(path.join(auditDir, "desktop-10-observed-vs-inferred.png"), Buffer.from(ssObs.data, "base64"));

    // Capture Insurers final payoff by scrolling directly to the payoff text
    await sendCommand("Runtime.evaluate", {
      expression: `
        (() => {
          const h2 = Array.from(document.querySelectorAll('h2')).find(el => el.innerText.includes('EVIDENZE PER LA') || el.innerText.includes('EVIDENCE FOR'));
          if (h2) h2.scrollIntoView({ behavior: 'instant', block: 'center' });
        })()
      `,
    });
    await wait(1200);
    let ssPay = await sendCommand("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(path.join(auditDir, "desktop-11-calm-payoff.png"), Buffer.from(ssPay.data, "base64"));

    // Mobile Insurers hero
    await capture("mobile-03-insurers-hero.png", "http://localhost:3000/insurers", 0, true);

    // 3. Platform Page Audit
    console.log("\n--- AUDIT 3: Platform Page Deliberation & 100% Purge ---");
    await capture("desktop-08-platform-deliberation.png", "http://localhost:3000/platform", 2800);
    const platformAudit = await evaluate(`
      (() => {
        const any100Text = document.body.innerText.match(/100%/g);
        return {
          any100OccurrencesOnPlatform: any100Text ? any100Text.length : 0,
        };
      })()
    `);
    console.log("Platform Page 100% Audit Result:", platformAudit);

    // 4. Drivers Page Audit
    console.log("\n--- AUDIT 4: Drivers Page Constellation & 112 Radar ---");
    await capture("desktop-09-drivers-constellation.png", "http://localhost:3000/drivers", 1200);

    console.log("\n✅ ALL AUDITS COMPLETED SUCCESSFULLY! Output saved to docs/audits/v5.2.5-qa/");

    ws.close();
  } catch (err) {
    console.error("Audit error:", err);
  } finally {
    chrome.kill();
  }
}

run();
