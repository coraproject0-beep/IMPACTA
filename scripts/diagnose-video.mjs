import { spawn } from "child_process";

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function diagnose() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const port = 9335;
  const proc = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${port}`,
    "--user-data-dir=C:\\Users\\sanna\\AppData\\Local\\Temp\\chrome_chain_diag",
    "http://localhost:3000",
  ]);

  try {
    let target = null;
    for (let i = 0; i < 30; i++) {
      await wait(250);
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/list`);
        const list = await res.json();
        target = list.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
        if (target) break;
      } catch (e) {}
    }

    if (!target) throw new Error("No Chrome target");

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((r) => (ws.onopen = r));

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        const handler = (e) => {
          const d = JSON.parse(e.data);
          if (d.id === id) {
            ws.removeEventListener("message", handler);
            if (d.error) reject(d.error);
            else resolve(d.result);
          }
        };
        ws.addEventListener("message", handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    // Set viewport explicitly to 1440x900
    await send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await wait(2000);

    const evalRes = await send("Runtime.evaluate", {
      expression: `(() => {
        let el = document.querySelector("video");
        const chain = [];
        while (el) {
          const cs = window.getComputedStyle(el);
          chain.push({
            tag: el.tagName,
            className: el.className,
            width: cs.width,
            height: cs.height,
            position: cs.position,
            overflow: cs.overflow,
            display: cs.display
          });
          el = el.parentElement;
        }
        return JSON.stringify(chain, null, 2);
      })()`,
    });

    console.log("PARENT CHAIN:\n", evalRes.result.value);
    ws.close();
  } finally {
    proc.kill();
  }
}

diagnose().catch(console.error);
