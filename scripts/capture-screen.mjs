import { spawn } from "child_process";
import fs from "fs";

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function capture() {
  const width = parseInt(process.argv[2] || "1440", 10);
  const height = parseInt(process.argv[3] || "900", 10);
  const outputPath = process.argv[4] || "screenshot.png";
  const url = process.argv[5] || "http://localhost:3000";
  const action = process.argv[6] || "";

  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const port = 9222 + Math.floor(Math.random() * 500);
  const tempDir = `C:\\Users\\sanna\\AppData\\Local\\Temp\\chrome_${port}`;

  const proc = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${tempDir}`,
    `--window-size=${width},${height}`,
    url,
  ]);

  try {
    // Wait for chrome debugging port
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
      throw new Error("Failed to connect to Chrome debugging target");
    }

    // Connect WebSocket
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

    // Set viewport emulation
    await sendCommand("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 600,
    });

    // Wait for hydration
    await wait(2000);

    // Handle optional actions
    if (action === "goto-photo-step") {
      const locRes = await sendCommand("Runtime.evaluate", {
        expression: "window.location.href",
      });
      console.log("CURRENT URL:", JSON.stringify(locRes));

      const evalRes = await sendCommand("Runtime.evaluate", {
        expression: `
          (function() {
            if (window.__impactaGoToStep) {
              window.__impactaGoToStep('EVIDENCE');
              return 'CALLED_STEP';
            }
            return 'FN_NOT_FOUND';
          })()
        `,
      });
      console.log("EVAL RES:", JSON.stringify(evalRes));
      await wait(1500);
    } else if (action === "open-112") {
      await sendCommand("Runtime.evaluate", {
        expression: `
          (function() {
            // Find and click the 112 emergency accordion trigger or button
            const buttons = Array.from(document.querySelectorAll('button'));
            const alertBtn = buttons.find(b => b.textContent && (b.textContent.includes('112') || b.textContent.includes('soccorsi')));
            if (alertBtn) alertBtn.click();
            setTimeout(() => {
              const startDemoBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('112'));
              if (startDemoBtn) startDemoBtn.click();
            }, 300);
          })()
        `,
      });
      await wait(1500);
    } else if (action === "toggle-console-lang") {
      await sendCommand("Runtime.evaluate", {
        expression: `
          (function() {
            const buttons = Array.from(document.querySelectorAll('button'));
            const itBtn = buttons.find(b => b.textContent && b.textContent.trim() === 'IT');
            if (itBtn) itBtn.click();
          })()
        `,
      });
      await wait(1000);
    } else {
      await wait(2000);
    }

    // Capture screenshot
    const result = await sendCommand("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });

    const buffer = Buffer.from(result.data, "base64");
    fs.writeFileSync(outputPath, buffer);
    console.log(`Saved screenshot to ${outputPath} (${buffer.length} bytes)`);

    ws.close();
  } finally {
    proc.kill();
  }
}

capture().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});
