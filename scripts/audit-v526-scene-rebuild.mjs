import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUTPUT_DIR = path.resolve("docs/audits/v5.2.6-scene-rebuild");
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  console.log("Starting Chrome for V5.2.6 Targeted Scene Rebuild QA...");
  const port = 9226;
  const chromeProc = spawn(CHROME_PATH, [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    "--window-size=1440,900"
  ]);

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

  if (!target) {
    console.error("Failed to connect to Chrome target.");
    chromeProc.kill();
    process.exit(1);
  }

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.onopen = res;
    ws.onerror = rej;
  });

  let msgId = 1;
  function send(method, params = {}) {
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

  await send("Page.enable");
  await send("DOM.enable");
  await send("Runtime.enable");

  async function captureScene(filename, clip = null) {
    const params = { format: "png" };
    if (clip) params.clip = clip;
    const res = await send("Page.captureScreenshot", params);
    fs.writeFileSync(path.join(OUTPUT_DIR, filename), Buffer.from(res.data, "base64"));
    console.log(`Saved screenshot: ${filename}`);
  }

  async function setViewport(width, height, isMobile = false) {
    await send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: isMobile
    });
    await send("Emulation.setVisibleSize", { width, height });
  }

  async function evaluate(expression) {
    const res = await send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result?.value;
  }

  console.log("\n=======================================================");
  console.log("DESKTOP AUDIT (1440x900)");
  console.log("=======================================================");
  await setViewport(1440, 900);

  // ------------------------------------------------------------------
  // 1. SCENE 1: DRIVERS — EVIDENCE ORBIT
  // ------------------------------------------------------------------
  console.log("\n--- AUDIT SCENE 1: Drivers Evidence Orbit ---");
  await send("Page.navigate", { url: "http://localhost:3000/drivers" });
  await wait(2000);

  // Scroll to Evidence Orbit section
  await evaluate(`
    const el = document.querySelectorAll('section')[2];
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  `);
  await wait(800);

  const driversAudit = await evaluate(`
    (() => {
      const pageText = document.body.innerText;
      const terms = ['EVIDENCE CONSTELLATION', 'HARDWARE CLOCK SYNC', 'PHYSICAL CLAIM', 'OPERATIONAL CONTINUUM'];
      const found = terms.filter(t => pageText.toLowerCase().includes(t.toLowerCase()));
      const hasOldEmptyFrame = !!document.querySelector('.border-\\[\\#D5D7D6\\]');
      const hasCarSvg = !!document.querySelector('svg circle[fill="#DC2626"]');
      return { foundBadTerms: found, hasOldEmptyFrame, hasCarSvg };
    })()
  `);
  console.log("Drivers Evidence Orbit Audit:", driversAudit);

  await captureScene("01-drivers-evidence.png");

  // Capture start, mid, end for Scene 1
  await evaluate(`window.scrollTo(0, 1100);`);
  await wait(400);
  await captureScene("01-drivers-evidence-start.png");
  await evaluate(`window.scrollTo(0, 1400);`);
  await wait(400);
  await captureScene("01-drivers-evidence-mid.png");
  await evaluate(`window.scrollTo(0, 1700);`);
  await wait(400);
  await captureScene("01-drivers-evidence-end.png");

  // ------------------------------------------------------------------
  // 2. SCENES 2, 3, 4, 5: INSURERS
  // ------------------------------------------------------------------
  console.log("\n--- AUDIT INSURERS SCENES 2, 3, 4, 5 ---");
  await send("Page.navigate", { url: "http://localhost:3000/insurers" });
  await wait(2000);

  // SCENE 3: Hero Collision Field
  await evaluate(`window.scrollTo(0, 0);`);
  await wait(800);
  const insurersHeroAudit = await evaluate(`
    (() => {
      const pageText = document.body.innerText;
      const terms = ['AUDI A3 SPORTBACK', 'VOLKSWAGEN GOLF', '3.4 G', 'PHYSICAL CLAIM', 'ADJUSTER ADJUDICATION'];
      const found = terms.filter(t => pageText.toLowerCase().includes(t.toLowerCase()));
      const hasTrajSvg = !!document.querySelector('.traj-a');
      const hasPulseCircle = !!document.querySelector('circle[stroke="#DC2626"]');
      return { foundBadTerms: found, hasTrajSvg, hasPulseCircle };
    })()
  `);
  console.log("Insurers Hero Collision Field Audit:", insurersHeroAudit);
  await captureScene("03-insurers-collision-field.png");

  // SCENE 2: Queue Extrusion
  await evaluate(`
    const q = document.getElementById('claims-queue');
    if (q) q.scrollIntoView({ behavior: 'instant', block: 'start' });
  `);
  await wait(800);
  await captureScene("02-insurers-queue.png");

  const queueScrollTop = await evaluate(`window.scrollY`);
  await evaluate(`window.scrollTo(0, ${queueScrollTop});`);
  await wait(400);
  await captureScene("02-insurers-queue-start.png");
  await evaluate(`window.scrollTo(0, ${queueScrollTop + 400});`);
  await wait(400);
  await captureScene("02-insurers-queue-mid.png");
  await evaluate(`window.scrollTo(0, ${queueScrollTop + 800});`);
  await wait(400);
  await captureScene("02-insurers-queue-end.png");

  // SCENE 4: Evidence Fan
  await evaluate(`
    const sec = Array.from(document.querySelectorAll('section')).find(s => s.innerText.includes('TRE PIANI PROBATORI') || s.innerText.includes('THREE EVIDENCE PLANES'));
    if (sec) sec.scrollIntoView({ behavior: 'instant', block: 'start' });
  `);
  await wait(800);
  const fanAudit = await evaluate(`
    (() => {
      const pageText = document.body.innerText;
      const terms = ['EVIDENTIARY DECOMPOSITION', 'VENTAGLIO DELLE PROVE'];
      const found = terms.filter(t => pageText.toLowerCase().includes(t.toLowerCase()));
      const hasBlackCards = !!document.querySelector('.bg-\\[\\#16171B\\]');
      return { foundBadTerms: found, hasBlackCards };
    })()
  `);
  console.log("Insurers Evidence Fan Audit:", fanAudit);
  await captureScene("04-insurers-evidence-fan.png");

  const fanScrollTop = await evaluate(`window.scrollY`);
  await evaluate(`window.scrollTo(0, ${fanScrollTop});`);
  await wait(400);
  await captureScene("04-insurers-evidence-fan-start.png");
  await evaluate(`window.scrollTo(0, ${fanScrollTop + 400});`);
  await wait(400);
  await captureScene("04-insurers-evidence-fan-mid.png");
  await evaluate(`window.scrollTo(0, ${fanScrollTop + 800});`);
  await wait(400);
  await captureScene("04-insurers-evidence-fan-end.png");

  // SCENE 5: Observed vs Inferred Depth Swap
  await evaluate(`
    const sec = Array.from(document.querySelectorAll('section')).find(s => s.innerText.includes('CIÒ CHE OSSERVIAMO') || s.innerText.includes('WHAT WE SEE'));
    if (sec) sec.scrollIntoView({ behavior: 'instant', block: 'start' });
  `);
  await wait(800);
  const depthAudit = await evaluate(`
    (() => {
      const pageText = document.body.innerText;
      const terms = ['SEPARAZIONE ONTOLOGICA', 'EVIDENTIARY RIGOR', 'CERTIFIED METROLOGICAL', 'DETERMINISTIC MEASUREMENT', 'SOVEREIGN HUMAN'];
      const found = terms.filter(t => pageText.toLowerCase().includes(t.toLowerCase()));
      const hasButton = !!Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('perito') || b.innerText.includes('adjuster'));
      return { foundBadTerms: found, hasButton };
    })()
  `);
  console.log("Insurers Observed vs Inferred Audit:", depthAudit);
  await captureScene("05-insurers-observed-inferred.png");

  const depthScrollTop = await evaluate(`window.scrollY`);
  await evaluate(`window.scrollTo(0, ${depthScrollTop});`);
  await wait(400);
  await captureScene("05-insurers-observed-inferred-start.png");
  await evaluate(`window.scrollTo(0, ${depthScrollTop + 300});`);
  await wait(400);
  await captureScene("05-insurers-observed-inferred-mid.png");
  await evaluate(`window.scrollTo(0, ${depthScrollTop + 600});`);
  await wait(400);
  await captureScene("05-insurers-observed-inferred-end.png");

  // ------------------------------------------------------------------
  // 3. SCENE 6: DRIVER APP REPORT SAFETY SCREEN
  // ------------------------------------------------------------------
  console.log("\n--- AUDIT SCENE 6: Driver App Safety Screen ---");
  await send("Page.navigate", { url: "http://localhost:3000/app/report" });
  await wait(2000);

  const safetyAudit = await evaluate(`
    (() => {
      const pageText = document.body.innerText;
      const hasHeading = pageText.includes('PRIMA LA SICUREZZA') || pageText.includes('SAFETY FIRST');
      const hasStep1 = pageText.includes('01') && (pageText.includes('catarifrangente') || pageText.includes('vest'));
      const hasRadar = !!document.querySelector('canvas');
      const hasRoadsideSvg = !!document.querySelector('.roadside-elem');
      return { hasHeading, hasStep1, hasRadar, hasRoadsideSvg };
    })()
  `);
  console.log("Driver App Safety Audit:", safetyAudit);
  await captureScene("06-driver-safety.png");

  // ------------------------------------------------------------------
  // 4. SCENE 7: HOME SHARED RECORD CLOSING TRANSITION
  // ------------------------------------------------------------------
  console.log("\n--- AUDIT SCENE 7: Home Shared Record ---");
  await send("Page.navigate", { url: "http://localhost:3000/" });
  await wait(2500);

  await evaluate(`
    const sec = Array.from(document.querySelectorAll('section')).find(s => s.innerText.includes('UN INCIDENTE') || s.innerText.includes('ONE INCIDENT'));
    if (sec) sec.scrollIntoView({ behavior: 'instant', block: 'start' });
  `);
  await wait(1000);

  const homeClosingAudit = await evaluate(`
    (() => {
      const pageText = document.body.innerText;
      const hasOneIncident = pageText.includes('UN INCIDENTE') || pageText.includes('ONE INCIDENT');
      const hasOneShared = pageText.includes('RECORD CONDIVISO') || pageText.includes('ONE SHARED RECORD');
      const hasPills = !!document.querySelector('.rounded-full.text-xs.font-semibold.tracking-wider.uppercase');
      const hasGrid = !!document.querySelector('.bg-\\[linear-gradient\\(to_right\\,\\#ffffff05_1px');
      return { hasOneIncident, hasOneShared, hasPills, hasGrid };
    })()
  `);
  console.log("Home Shared Record Audit:", homeClosingAudit);
  await captureScene("07-home-shared-record.png");

  const homeScrollTop = await evaluate(`window.scrollY`);
  await evaluate(`window.scrollTo(0, ${homeScrollTop});`);
  await wait(400);
  await captureScene("07-home-shared-record-start.png");
  await evaluate(`window.scrollTo(0, ${homeScrollTop + 400});`);
  await wait(400);
  await captureScene("07-home-shared-record-mid.png");
  await evaluate(`window.scrollTo(0, ${homeScrollTop + 800});`);
  await wait(400);
  await captureScene("07-home-shared-record-end.png");

  // ==================================================================
  // MOBILE AUDIT (390x844)
  // ==================================================================
  console.log("\n=======================================================");
  console.log("MOBILE AUDIT (390x844)");
  console.log("=======================================================");
  await setViewport(390, 844, true);

  // 1. Mobile Drivers
  await send("Page.navigate", { url: "http://localhost:3000/drivers" });
  await wait(2000);
  await evaluate(`
    const el = document.querySelectorAll('section')[2];
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  `);
  await wait(800);
  await captureScene("mobile-01-drivers-evidence.png");

  // 2. Mobile Insurers
  await send("Page.navigate", { url: "http://localhost:3000/insurers" });
  await wait(2000);
  await evaluate(`window.scrollTo(0, 0);`);
  await wait(600);
  await captureScene("mobile-03-insurers-collision-field.png");

  await evaluate(`
    const q = document.getElementById('claims-queue');
    if (q) q.scrollIntoView({ behavior: 'instant', block: 'start' });
  `);
  await wait(800);
  await captureScene("mobile-02-insurers-queue.png");

  await evaluate(`
    const sections = document.querySelectorAll('section');
    if (sections[2]) sections[2].scrollIntoView({ behavior: 'instant', block: 'center' });
  `);
  await wait(800);
  await captureScene("mobile-04-insurers-evidence-fan.png");

  await evaluate(`
    const sections = document.querySelectorAll('section');
    if (sections[3]) sections[3].scrollIntoView({ behavior: 'instant', block: 'center' });
  `);
  await wait(800);
  await captureScene("mobile-05-insurers-observed-inferred.png");

  // 3. Mobile Driver App Safety
  await send("Page.navigate", { url: "http://localhost:3000/app/report" });
  await wait(2000);
  await captureScene("mobile-06-driver-safety.png");

  // 4. Mobile Home Shared Record
  await send("Page.navigate", { url: "http://localhost:3000/" });
  await wait(2500);
  await evaluate(`
    const sec = Array.from(document.querySelectorAll('section')).find(s => s.innerText.includes('UN INCIDENTE') || s.innerText.includes('ONE INCIDENT'));
    if (sec) sec.scrollIntoView({ behavior: 'instant', block: 'start' });
  `);
  await wait(1000);
  await captureScene("mobile-07-home-shared-record.png");

  console.log("\n✅ ALL AUDITS AND MOTION CAPTURES COMPLETED SUCCESSFULLY!");
  chromeProc.kill();
  process.exit(0);
}

run().catch((err) => {
  console.error("Audit script failed:", err);
  process.exit(1);
});
