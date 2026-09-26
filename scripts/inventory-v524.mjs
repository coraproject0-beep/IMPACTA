import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const auditDir = "c:\\Dev\\ANTI\\IMPACTA\\docs\\audits\\v5.2.4-inventory";
fs.mkdirSync(auditDir, { recursive: true });

async function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  console.log("Starting Chrome for Visual Inventory & Video Sampling...");
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const port = 9223;

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

    await sendCommand("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2,
      mobile: false,
    });

    // 1. Video Pixel Sampling
    console.log("Sampling blackbox-motion-study.mp4 perimeter pixels...");
    await sendCommand("Page.navigate", { url: "http://localhost:3000" });
    await wait(2000);

    const samplingResult = await sendCommand("Runtime.evaluate", {
      expression: `
        (async () => {
          const video = document.createElement('video');
          video.src = '/media/blackbox-motion-study.mp4';
          video.crossOrigin = 'anonymous';
          video.muted = true;
          await new Promise((r) => { video.onloadeddata = r; });
          
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth || 1920;
          canvas.height = video.videoHeight || 1080;
          const ctx = canvas.getContext('2d');
          
          const timestamps = [0.8, 2.5, 4.5, 7.5]; // sealed, opening, collision, reassembly
          const samples = [];
          
          for (const t of timestamps) {
            video.currentTime = t;
            await new Promise((r) => { video.onseeked = r; });
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // sample points on perimeter: 5% inset from borders
            const w = canvas.width;
            const h = canvas.height;
            const points = [
              { name: 'top-left (5%)', x: Math.round(w * 0.05), y: Math.round(h * 0.05) },
              { name: 'top-mid (5%)', x: Math.round(w * 0.50), y: Math.round(h * 0.05) },
              { name: 'top-right (5%)', x: Math.round(w * 0.95), y: Math.round(h * 0.05) },
              { name: 'mid-left (5%)', x: Math.round(w * 0.05), y: Math.round(h * 0.50) },
              { name: 'mid-right (5%)', x: Math.round(w * 0.95), y: Math.round(h * 0.50) },
              { name: 'bot-left (5%)', x: Math.round(w * 0.05), y: Math.round(h * 0.95) },
              { name: 'bot-mid (5%)', x: Math.round(w * 0.50), y: Math.round(h * 0.95) },
              { name: 'bot-right (5%)', x: Math.round(w * 0.95), y: Math.round(h * 0.95) },
            ];
            
            const frameSample = { time: t, pixels: [] };
            for (const pt of points) {
              const pixel = ctx.getImageData(pt.x, pt.y, 1, 1).data;
              frameSample.pixels.push({
                pt: pt.name,
                r: pixel[0],
                g: pixel[1],
                b: pixel[2],
                hex: '#' + [pixel[0], pixel[1], pixel[2]].map(x => x.toString(16).padStart(2, '0')).join('')
              });
            }
            samples.push(frameSample);
          }
          return samples;
        })()
      `,
      awaitPromise: true,
      returnByValue: true,
    });

    console.log("Sampling Result:", JSON.stringify(samplingResult.result?.value, null, 2));
    fs.writeFileSync(
      path.join(auditDir, "video-pixel-samples.json"),
      JSON.stringify(samplingResult.result?.value, null, 2)
    );

    // 2. Inventory Screenshots of Routes
    const routes = [
      { name: "01-platform-top.png", url: "http://localhost:3000/platform", scrollY: 0 },
      { name: "02-platform-cards.png", url: "http://localhost:3000/platform", scrollY: 600 },
      { name: "03-platform-cards-2.png", url: "http://localhost:3000/platform", scrollY: 1300 },
      { name: "04-drivers-top.png", url: "http://localhost:3000/drivers", scrollY: 0 },
      { name: "05-drivers-damage-steps.png", url: "http://localhost:3000/drivers", scrollY: 1200 },
      { name: "06-insurers-hero.png", url: "http://localhost:3000/insurers", scrollY: 0 },
      { name: "07-insurers-dossier.png", url: "http://localhost:3000/insurers", scrollY: 300 },
      { name: "08-insurers-continuum.png", url: "http://localhost:3000/insurers", scrollY: 900 },
      { name: "09-safety-top.png", url: "http://localhost:3000/safety", scrollY: 0 },
      { name: "10-safety-cards.png", url: "http://localhost:3000/safety", scrollY: 600 },
      { name: "11-technology-cards.png", url: "http://localhost:3000/technology", scrollY: 700 },
      { name: "12-home-blackbox-current.png", url: "http://localhost:3000", scrollY: 1800 },
      { name: "13-home-partners-current.png", url: "http://localhost:3000", scrollY: 3600 },
    ];

    for (const r of routes) {
      console.log(`Capturing ${r.name}...`);
      await sendCommand("Page.navigate", { url: r.url });
      await wait(1500);
      if (r.scrollY > 0) {
        await sendCommand("Runtime.evaluate", {
          expression: `window.scrollTo(0, ${r.scrollY});`,
        });
        await wait(800);
      }
      const screenshot = await sendCommand("Page.captureScreenshot", {
        format: "png",
      });
      fs.writeFileSync(
        path.join(auditDir, r.name),
        Buffer.from(screenshot.data, "base64")
      );
    }

    console.log("Inventory completed successfully!");
    ws.close();
  } catch (err) {
    console.error("Audit error:", err);
  } finally {
    chrome.kill();
  }
}

run();
