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

    const lang = process.argv[6];
    if (lang) {
      await sendCommand("Runtime.evaluate", {
        expression: `
          (function() {
            const btn = document.querySelector('button[title*="Toggle language"]');
            if (btn) btn.click();
          })()
        `,
      });
      await wait(1000);
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
