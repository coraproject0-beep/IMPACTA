import { spawn } from "child_process";

async function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function test() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const port = 9560;
  const tempDir = `C:\\Users\\sanna\\AppData\\Local\\Temp\\chrome_test_${port}`;
  const proc = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${tempDir}`,
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
  await wait(2500);

  const initial = await send("Runtime.evaluate", {
    expression: `({ 
      h1: document.querySelector("h1")?.innerText, 
      storage: localStorage.getItem("impacta_language_preference"), 
      hasSetLocale: typeof window.__impactaSetLocale,
      buttonFound: !!document.querySelector("button[title*='Toggle language']")
    })`,
    returnByValue: true,
  });
  console.log("INITIAL:", initial.result.value);

  // Click switcher
  const click = await send("Runtime.evaluate", {
    expression: `(() => { 
      const b = document.querySelector("button[title*='Toggle language']"); 
      if (b) { 
        b.click(); 
        return "clicked"; 
      } 
      return "not found"; 
    })()`,
    returnByValue: true,
  });
  console.log("CLICK:", click.result.value);
  await wait(1000);

  const afterClick = await send("Runtime.evaluate", {
    expression: `({ 
      h1: document.querySelector("h1")?.innerText, 
      storage: localStorage.getItem("impacta_language_preference") 
    })`,
    returnByValue: true,
  });
  console.log("AFTER CLICK:", afterClick.result.value);

  // Directly call __impactaSetLocale('it')
  const direct = await send("Runtime.evaluate", {
    expression: `(() => { 
      if (window.__impactaSetLocale) { 
        window.__impactaSetLocale("it"); 
        return "called"; 
      } 
      return "not available"; 
    })()`,
    returnByValue: true,
  });
  console.log("DIRECT CALL:", direct.result.value);
  await wait(1000);

  const afterDirect = await send("Runtime.evaluate", {
    expression: `({ 
      h1: document.querySelector("h1")?.innerText, 
      storage: localStorage.getItem("impacta_language_preference") 
    })`,
    returnByValue: true,
  });
  console.log("AFTER DIRECT:", afterDirect.result.value);

  ws.close();
  proc.kill();
  process.exit(0);
}

test();
