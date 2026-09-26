import { spawn } from "child_process";
import fs from "fs";

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runAudit() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const port = 9222 + Math.floor(Math.random() * 500);
  const tempDir = `C:\\Users\\sanna\\AppData\\Local\\Temp\\chrome_ins_${port}`;

  const proc = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${tempDir}`,
    `--window-size=1440,900`,
    "http://localhost:3000/insurers",
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

    async function setViewport(width, height) {
      await sendCommand("Emulation.setDeviceMetricsOverride", {
        width,
        height,
        deviceScaleFactor: 1,
        mobile: width < 600,
      });
      await wait(500);
    }

    async function capture(outputPath) {
      const res = await sendCommand("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: false,
      });
      const buf = Buffer.from(res.data, "base64");
      fs.writeFileSync(outputPath, buf);
      console.log(`Saved screenshot: ${outputPath} (${buf.length} bytes)`);
    }

    async function setLocale(loc) {
      const res = await sendCommand("Runtime.evaluate", {
        expression: `(function() {
          if (window.__impactaSetLocale) {
            window.__impactaSetLocale('${loc}');
            return 'OK';
          }
          return 'NO_FN';
        })()`,
      });
      await wait(800);
      return res;
    }

    async function getSampleText() {
      const res = await sendCommand("Runtime.evaluate", {
        expression: `(function() {
          return {
            h1: document.querySelector('h1') ? document.querySelector('h1').innerText : null,
            h2: document.querySelector('h2') ? document.querySelector('h2').innerText : null,
            statement1: document.querySelector('h3') ? document.querySelector('h3').innerText : null,
          };
        })()`,
        returnByValue: true,
      });
      return res.result ? res.result.value : null;
    }

    async function scrollToWorkbench() {
      await sendCommand("Runtime.evaluate", {
        expression: `(function() {
          const sec = document.querySelectorAll('section')[1];
          if (sec) sec.scrollIntoView({ behavior: 'instant', block: 'start' });
        })()`,
      });
      await wait(600);
    }

    await wait(2000);

    // 1. INSURERS EN (1440x900)
    console.log("Setting EN on /insurers...");
    await setLocale("en");
    await setViewport(1440, 900);
    await scrollToWorkbench();
    const textEN = await getSampleText();
    console.log("EN sample:", textEN);
    await capture("public/audit-v5.1.5-insurers-en-1440.png");

    // 2. INSURERS IT (1440x900) - Runtime switch without reload
    console.log("Switching EN -> IT runtime without reload...");
    await setLocale("it");
    await scrollToWorkbench();
    const textIT = await getSampleText();
    console.log("IT sample:", textIT);
    await capture("public/audit-v5.1.5-insurers-it-1440.png");

    // 3. SWITCH BACK IT -> EN - Runtime switch
    console.log("Switching IT -> EN runtime without reload...");
    await setLocale("en");
    const textEN2 = await getSampleText();
    console.log("EN sample 2:", textEN2);

    // 4. INSURERS EN Mobile (390x844)
    await setViewport(390, 844);
    await scrollToWorkbench();
    await wait(500);
    await capture("public/audit-v5.1.5-insurers-en-mobile.png");

    // Navigate to homepage for RotatingStatement captures
    console.log("Navigating to homepage for rotating statement screenshots...");
    await setViewport(1440, 900);
    await sendCommand("Page.navigate", { url: "http://localhost:3000" });
    await wait(2000);

    // Scroll to fragments section
    await sendCommand("Runtime.evaluate", {
      expression: `(function() {
        const el = document.getElementById('fragments');
        if (el) el.scrollIntoView({ behavior: 'instant' });
      })()`,
    });
    await wait(800);

    // 5. ROTATING STATEMENT EN (1440x900)
    await setLocale("en");
    await wait(1000);
    await capture("public/audit-v5.1.5-rotating-statement-en.png");

    // 6. ROTATING STATEMENT IT (1440x900)
    await setLocale("it");
    await wait(1000);
    await capture("public/audit-v5.1.5-rotating-statement-it.png");

    // 7. ROTATING STATEMENT MOBILE (390x844)
    await setViewport(390, 844);
    await wait(500);
    await sendCommand("Runtime.evaluate", {
      expression: `(function() {
        const el = document.getElementById('fragments');
        if (el) el.scrollIntoView({ behavior: 'instant' });
      })()`,
    });
    await wait(800);
    await capture("public/audit-v5.1.5-rotating-statement-mobile.png");

    console.log("All Part D audit screenshots captured successfully!");
    ws.close();
  } finally {
    proc.kill();
  }
}

runAudit().catch(console.error);
