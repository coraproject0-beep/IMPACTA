// IMPACTA Driver Lightweight Service Worker
const CACHE_NAME = "impacta-driver-v1";
const STATIC_ASSETS = ["/app", "/globals.css", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // Soft fail if any asset cannot be pre-cached during build/dev
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Only intercept GET navigation requests to support offline shell
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.origin === self.location.origin && url.pathname.startsWith("/app")) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match("/app") || caches.match(event.request);
      })
    );
  }
});
