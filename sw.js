const CACHE = "20260309-";


const BASE = "/test/";
sendMessageToClients(CACHE);


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
            sendMessageToClients('Привет из воркера');
            return caches.delete(key);
          }
        })
      );
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

function sendMessageToClients(text) {
  setTimeout(() => {
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({text: text});
      });
    });
  }, 2000);
}
