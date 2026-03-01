const CACHE = "my-pwa-cache-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll(["/test/", "/test/index.html", "/test/manifest.json", "/test/icon192.png"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

//self.addEventListener('install', () => self.skipWaiting());
//self.addEventListener('activate', (event) => {
//    event.waitUntil(clients.claim());
//});
//self.addEventListener('fetch', (event) => {
//    // Не кэшируем HTML
//    if (event.request.mode === 'navigate') {
//        event.respondWith(fetch(event.request));
//        return;
//    }
//    // Остальное — как есть
//    event.respondWith(fetch(event.request));
//});
