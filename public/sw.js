const CACHE_NAME = "fiveseven-v2";
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(["/", "/manifest.json", "/soup-iga.jpg"])));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("fiveseven-") && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request).catch(async () =>
    (await caches.match(event.request)) || (event.request.mode === "navigate" ? await caches.match("/") : null) || new Response("Offline", { status: 503 })
  ));
});
