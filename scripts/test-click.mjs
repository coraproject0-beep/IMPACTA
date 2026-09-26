import { spawn } from "child_process";

async function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function test() {
  const p = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    "--remote-debugging-port=9335",
    "http://localhost:3000/insurers",
  ]);

  try {
    let target = null;
    for (let i = 0; i < 30; i++) {
      await wait(200);
      try {
        const res = await fetch("http://127.0.0.1:9335/json/list");
        const list = await res.json();
        target = list.find((x) => x.type === "page" && x.webSocketDebuggerUrl);
        if (target) break;
      } catch (e) {}
    }

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((res, rej) => {
      ws.onopen = res;
      ws.onerror = rej;
    });

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const msgId = id++;
        const onMsg = (evt) => {
          const data = JSON.parse(evt.data);
          if (data.id === msgId) {
            ws.removeEventListener("message", onMsg);
            if (data.error) reject(data.error);
            else resolve(data.result);
          }
        };
        ws.addEventListener("message", onMsg);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await wait(2000);

    // Initial H1 in EN
    const h1Initial = await send("Runtime.evaluate", {
      expression: "document.querySelector('h1').innerText",
      returnByValue: true,
    });
    console.log("INITIAL H1:", h1Initial.result.value);

    // Click language switcher button
    const clickRes = await send("Runtime.evaluate", {
      expression: `(function() {
        const btns = Array.from(document.querySelectorAll('button'));
        const langBtn = btns.find(b => b.textContent && b.textContent.includes('EN') && b.textContent.includes('IT'));
        if (langBtn) {
          langBtn.click();
          return 'CLICKED: ' + langBtn.textContent;
        }
        return 'NOT_FOUND';
      })()`,
      returnByValue: true,
    });
    console.log("CLICK RES:", clickRes.result.value);

    await wait(1000);

    // H1 in IT
    const h1After = await send("Runtime.evaluate", {
      expression: "document.querySelector('h1').innerText",
      returnByValue: true,
    });
    console.log("H1 AFTER CLICK:", h1After.result.value);

    // Click again to toggle back to EN
    const clickRes2 = await send("Runtime.evaluate", {
      expression: `(function() {
        const btns = Array.from(document.querySelectorAll('button'));
        const langBtn = btns.find(b => b.textContent && b.textContent.includes('EN') && b.textContent.includes('IT'));
        if (langBtn) {
          langBtn.click();
          return 'CLICKED_2: ' + langBtn.textContent;
        }
        return 'NOT_FOUND';
      })()`,
      returnByValue: true,
    });
    console.log("CLICK RES 2:", clickRes2.result.value);

    await wait(1000);

    const h1Back = await send("Runtime.evaluate", {
      expression: "document.querySelector('h1').innerText",
      returnByValue: true,
    });
    console.log("H1 BACK IN EN:", h1Back.result.value);

    ws.close();
  } finally {
    p.kill();
  }
}

test().catch(console.error);
