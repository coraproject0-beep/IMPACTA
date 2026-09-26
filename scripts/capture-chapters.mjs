import { spawn } from "child_process";
import fs from "fs";
import path from "path";

async function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const auditDir = "c:\\Dev\\ANTI\\IMPACTA\\docs\\audits\\v5.2.2-final-correction";

async function run() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const port = 9565;
  const tempDir = `C:\\Users\\sanna\\AppData\\Local\\Temp\\chrome_cap_${port}`;
  const proc = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${tempDir}`,
    "--window-size=1440,900",
    "http://localhost:3000",
  ]);

  await wait(2000);
  const res = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const target = res.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 1;
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const curId = id++;
      const h = (e) => {
        const d = JSON.parse(e.data);
        if (d.id === curId) {
          ws.removeEventListener("message", h);
          resolve(d.result);
        }
      };
      ws.addEventListener("message", h);
      ws.send(JSON.stringify({ id: curId, method, params }));
    });

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    mobile: false,
  });

  await wait(2000);

  // Measure exact positions
  const pos = await send("Runtime.evaluate", {
    expression: `(() => {
      const d = document.getElementById("driver-chapter");
      const ins = document.getElementById("insurer-chapter");
      const bb = document.getElementById("black-box");
      const getTop = el => el ? el.getBoundingClientRect().top + window.scrollY : null;
      return {
        bb: getTop(bb),
        driver: getTop(d),
        insurer: getTop(ins),
        docHeight: document.body.scrollHeight
      };
    })()`,
    returnByValue: true,
  });
  console.log("SECTIONS POSITION:", pos.result.value);

  const { driver, insurer } = pos.result.value;

  // Scroll to Driver Chapter
  if (driver) {
    await send("Runtime.evaluate", {
      expression: `window.scrollTo({ top: ${driver - 80}, behavior: 'instant' });`,
    });
    await wait(1200);
    const { data: dData } = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(path.join(auditDir, "04-desktop-home-driver-3d-scene.png"), Buffer.from(dData, "base64"));
    console.log("Captured 04-desktop-home-driver-3d-scene.png at y =", driver);
  }

  // Scroll to Insurer Chapter
  if (insurer) {
    await send("Runtime.evaluate", {
      expression: `window.scrollTo({ top: ${insurer - 80}, behavior: 'instant' });`,
    });
    await wait(1200);
    const { data: insData } = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(path.join(auditDir, "05-desktop-home-insurer-workbench.png"), Buffer.from(insData, "base64"));
    console.log("Captured 05-desktop-home-insurer-workbench.png at y =", insurer);
  }

  // Also capture Driver page 3D scene with full card in view
  await send("Page.navigate", { url: "http://localhost:3000/drivers" });
  await wait(2000);
  const driverPagePos = await send("Runtime.evaluate", {
    expression: `(() => {
      const scene = document.querySelector("[perspective\\:1200px]") || document.querySelector("svg");
      return scene ? scene.getBoundingClientRect().top + window.scrollY : 1500;
    })()`,
    returnByValue: true,
  });
  console.log("DRIVER PAGE SCENE POS:", driverPagePos.result.value);
  await send("Runtime.evaluate", {
    expression: `window.scrollTo({ top: ${driverPagePos.result.value - 120}, behavior: 'instant' });`,
  });
  await wait(1200);
  const { data: dpData } = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(auditDir, "09-desktop-drivers-3d-scene.png"), Buffer.from(dpData, "base64"));
  console.log("Captured 09-desktop-drivers-3d-scene.png");

  ws.close();
  proc.kill();
  process.exit(0);
}

run();
