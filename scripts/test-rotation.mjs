import { spawn } from "child_process";

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function testRotation() {
  const width = 1440;
  const height = 900;
  const url = "http://localhost:3000";

  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const port = 9222 + Math.floor(Math.random() * 500);
  const tempDir = `C:\\Users\\sanna\\AppData\\Local\\Temp\\chrome_rot_${port}`;

  const proc = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${tempDir}`,
    `--window-size=${width},${height}`,
    url,
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

    await wait(2000);

    // Helper to get currently visible word from DOM
    async function getVisibleWord() {
      const evalRes = await sendCommand("Runtime.evaluate", {
        expression: `
          (function() {
            const spans = Array.from(document.querySelectorAll('#fragments [aria-hidden="true"] span'));
            // Find span that is visible with opacity > 0.5
            const visible = spans.find(s => {
              const style = window.getComputedStyle(s);
              return style.visibility !== 'hidden' && parseFloat(style.opacity) > 0.4;
            });
            return visible ? visible.textContent.trim() : null;
          })()
        `,
      });
      return evalRes.result ? evalRes.result.value : null;
    }

    // --- TEST 1: ENGLISH (at least 12 transitions) ---
    console.log("=== STARTING EN ROTATION OBSERVATION ===");
    await sendCommand("Runtime.evaluate", {
      expression: "window.__impactaSetLocale && window.__impactaSetLocale('en');",
    });
    await wait(1000);

    const enSequence = [];
    let lastWord = null;
    const startTime = Date.now();

    // Sample every 400ms until we collect 14 transitions or 40s
    while (enSequence.length < 14 && Date.now() - startTime < 42000) {
      const w = await getVisibleWord();
      if (w && w !== lastWord) {
        enSequence.push(w);
        console.log(`[EN ${enSequence.length}] Recorded: "${w}"`);
        lastWord = w;
      }
      await wait(400);
    }

    console.log("\nFULL EN OBSERVED SEQUENCE (" + enSequence.length + " words):");
    console.log(enSequence.join(" -> "));

    // --- TEST 2: ITALIAN (at least 12 transitions) ---
    console.log("\n=== SWITCHING TO IT RUNTIME (WITHOUT RELOAD) ===");
    await sendCommand("Runtime.evaluate", {
      expression: "window.__impactaSetLocale && window.__impactaSetLocale('it');",
    });
    await wait(1500);

    const itSequence = [];
    lastWord = null;
    const itStartTime = Date.now();

    while (itSequence.length < 14 && Date.now() - itStartTime < 42000) {
      const w = await getVisibleWord();
      if (w && w !== lastWord) {
        itSequence.push(w);
        console.log(`[IT ${itSequence.length}] Recorded: "${w}"`);
        lastWord = w;
      }
      await wait(400);
    }

    console.log("\nFULL IT OBSERVED SEQUENCE (" + itSequence.length + " words):");
    console.log(itSequence.join(" -> "));

    // Verification check
    function checkDuplicates(seq, label) {
      let dupes = [];
      for (let i = 1; i < seq.length; i++) {
        if (seq[i] === seq[i - 1]) {
          dupes.push(`Index ${i}: duplicate "${seq[i]}"`);
        }
      }
      if (dupes.length === 0) {
        console.log(`✅ ${label}: ZERO ADJACENT DUPLICATES across ${seq.length} transitions!`);
      } else {
        console.error(`❌ ${label} DUPLICATES FOUND:`, dupes);
      }
    }

    checkDuplicates(enSequence, "EN");
    checkDuplicates(itSequence, "IT");

    ws.close();
  } finally {
    proc.kill();
  }
}

testRotation().catch(console.error);
