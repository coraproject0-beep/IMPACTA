import { spawn } from "child_process";
import fs from "fs";
import path from "path";

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const auditDir = "c:\\Dev\\ANTI\\IMPACTA\\docs\\audits\\v5.2.1-premium-recovery";
if (!fs.existsSync(auditDir)) {
  fs.mkdirSync(auditDir, { recursive: true });
}

async function runAudits() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const port = 9556;
  const tempDir = `C:\\Users\\sanna\\AppData\\Local\\Temp\\chrome_audit_${port}`;

  console.log("Starting Chrome for V5.2.1 Emergency Visual Recovery Audits...");
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

    console.log("Waiting for homepage hydration...");
    await wait(3000);

    async function setViewport(width, height) {
      await sendCommand("Emulation.setDeviceMetricsOverride", {
        width,
        height,
        deviceScaleFactor: 1,
        mobile: width < 600,
      });
      await wait(300);
    }

    async function capture(filename) {
      const shot = await sendCommand("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: false,
      });
      const filePath = path.join(auditDir, filename);
      fs.writeFileSync(filePath, Buffer.from(shot.data, "base64"));
      console.log(`Captured ${filename}`);
    }

    async function navigateTo(url) {
      await sendCommand("Page.navigate", { url });
      await wait(2000);
    }

    // 1. Desktop: 1440x900
    await setViewport(1440, 900);

    // 01-desktop-hero
    await sendCommand("Runtime.evaluate", { expression: "window.scrollTo(0, 0);" });
    await wait(800);
    await capture("01-desktop-hero.png");

    // 02-desktop-entry-darkness (just above black-box)
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
    await capture("02-desktop-entry-darkness.png");

    // Scroll to black-box sticky pin
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

    // Black Box milestones
    const bbMilestones = [
      { p: 0.00, file: "03-desktop-blackbox-sealed.png" },
      { p: 0.22, file: "04-desktop-blackbox-opening.png" },
      { p: 0.50, file: "05-desktop-blackbox-incident.png" },
      { p: 0.58, file: "06-desktop-blackbox-collision.png" },
      { p: 0.78, file: "07-desktop-blackbox-structured.png" },
      { p: 0.98, file: "08-desktop-blackbox-reassembled.png" },
    ];

    for (const m of bbMilestones) {
      await sendCommand("Runtime.evaluate", {
        expression: `if (window.__setBlackBoxProgress) window.__setBlackBoxProgress(${m.p});`,
      });
      await wait(450);
      await capture(m.file);
    }

    // 09-desktop-exit-transition
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
    await capture("09-desktop-exit-transition.png");

    // 10-desktop-driver-chapter
    await sendCommand("Runtime.evaluate", {
      expression: `
        (function() {
          const el = document.getElementById('driver-chapter');
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
        })()
      `,
    });
    await wait(800);
    await capture("10-desktop-driver-chapter.png");

    // 11-desktop-insurer-chapter
    await sendCommand("Runtime.evaluate", {
      expression: `
        (function() {
          const el = document.getElementById('insurer-chapter');
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
        })()
      `,
    });
    await wait(800);
    await capture("11-desktop-insurer-chapter.png");

    // 12-desktop-partner-marquee
    await sendCommand("Runtime.evaluate", {
      expression: `
        (function() {
          const marquees = document.querySelectorAll('section');
          const lastSection = marquees[marquees.length - 1];
          if (lastSection) lastSection.scrollIntoView({ behavior: 'instant', block: 'center' });
        })()
      `,
    });
    await wait(800);
    await capture("12-desktop-partner-marquee.png");

    // Other public pages desktop
    await navigateTo("http://localhost:3000/platform");
    await capture("13-desktop-platform.png");

    await navigateTo("http://localhost:3000/drivers");
    await capture("14-desktop-drivers.png");

    await navigateTo("http://localhost:3000/insurers");
    await capture("15-desktop-insurers.png");

    await navigateTo("http://localhost:3000/technology");
    await capture("16-desktop-technology.png");

    await navigateTo("http://localhost:3000/safety");
    await capture("17-desktop-safety.png");

    // Mobile Captures (390x844)
    console.log("\n--- Capturing Mobile Frames (390x844) ---");
    await setViewport(390, 844);

    await navigateTo("http://localhost:3000");
    await wait(1000);
    await capture("18-mobile-hero.png");

    // Mobile Black Box
    await sendCommand("Runtime.evaluate", {
      expression: `
        (function() {
          const el = document.getElementById('black-box');
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        })()
      `,
    });
    await wait(600);
    await sendCommand("Runtime.evaluate", {
      expression: `if (window.__setBlackBoxProgress) window.__setBlackBoxProgress(0.58);`,
    });
    await wait(500);
    await capture("19-mobile-blackbox-incident.png");

    // Mobile Driver Chapter
    await sendCommand("Runtime.evaluate", {
      expression: `
        (function() {
          const el = document.getElementById('driver-chapter');
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        })()
      `,
    });
    await wait(700);
    await capture("20-mobile-driver-chapter.png");

    // Mobile Insurer Chapter
    await sendCommand("Runtime.evaluate", {
      expression: `
        (function() {
          const el = document.getElementById('insurer-chapter');
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        })()
      `,
    });
    await wait(700);
    await capture("21-mobile-insurer-chapter.png");

    // Mobile Partner Marquee
    await sendCommand("Runtime.evaluate", {
      expression: `
        (function() {
          const marquees = document.querySelectorAll('section');
          const lastSection = marquees[marquees.length - 1];
          if (lastSection) lastSection.scrollIntoView({ behavior: 'instant', block: 'center' });
        })()
      `,
    });
    await wait(700);
    await capture("22-mobile-partner-marquee.png");

    await navigateTo("http://localhost:3000/drivers");
    await capture("23-mobile-drivers.png");

    await navigateTo("http://localhost:3000/insurers");
    await capture("24-mobile-insurers.png");

    console.log("\n✅ All V5.2.1 QA Audits successfully captured!");
    ws.close();
  } finally {
    proc.kill();
  }
}

runAudits().catch((err) => {
  console.error("Audit error:", err);
  process.exit(1);
});
