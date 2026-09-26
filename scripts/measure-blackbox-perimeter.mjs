import { spawn } from "child_process";
import fs from "fs";

async function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const port = 9226;

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
    await sendCommand("Runtime.enable");

    // Navigate to a blank page and create a video -> canvas measurement environment
    await sendCommand("Page.navigate", { url: "about:blank" });
    await wait(500);

    const evaluation = await sendCommand("Runtime.evaluate", {
      awaitPromise: true,
      returnByValue: true,
      expression: `
        (async () => {
          const video = document.createElement('video');
          video.src = 'http://localhost:3000/media/blackbox-motion-study.mp4';
          video.crossOrigin = 'anonymous';
          video.muted = true;
          video.playsInline = true;
          document.body.appendChild(video);

          await new Promise((resolve) => {
            video.onloadedmetadata = () => resolve();
            video.onerror = () => resolve();
            setTimeout(resolve, 3000);
          });

          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth || 1920;
          canvas.height = video.videoHeight || 1080;
          const ctx = canvas.getContext('2d');

          const timestamps = [
            { name: 'sealed', time: 0.5 },
            { name: 'opening', time: 2.2 },
            { name: 'collision', time: 4.8 },
            { name: 'reassembly', time: 7.2 }
          ];

          const results = [];

          for (const ts of timestamps) {
            video.currentTime = ts.time;
            await new Promise(r => {
              video.onseeked = r;
              setTimeout(r, 600);
            });

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            const sample = (x, y) => {
              const p = ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data;
              return { r: p[0], g: p[1], b: p[2] };
            };

            const w = canvas.width;
            const h = canvas.height;

            const edgeSamples = {
              stage: ts.name,
              time: ts.time,
              topLeft: sample(20, 20),
              topMid: sample(w / 2, 20),
              topRight: sample(w - 20, 20),
              midLeft: sample(20, h / 2),
              midRight: sample(w - 20, h / 2),
              bottomLeft: sample(20, h - 20),
              bottomMid: sample(w / 2, h - 20),
              bottomRight: sample(w - 20, h - 20)
            };
            results.push(edgeSamples);
          }

          return { width: canvas.width, height: canvas.height, results };
        })()
      `,
    });

    console.log("Perimeter pixel analysis:", JSON.stringify(evaluation.result?.value, null, 2));
    ws.close();
  } catch (err) {
    console.error("Analysis error:", err);
  } finally {
    chrome.kill();
  }
}

run();
