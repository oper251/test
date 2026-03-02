const CACHE = "20260313";
const BASE = "/test/";
console.log(CACHE);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll([BASE + "index.html", BASE + "manifest.json", BASE + "icon192.png"]);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE) {
            console.log("Удалили CACHE");
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      // Задержка, чтобы страница успела подписаться
      setTimeout(() => {
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({text: 'Привет из воркера'});
          });
        });
      }, 3000);
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