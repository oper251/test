const CACHE = "temp-cache";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    }).then(() => {
      self.clients.claim();
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});



//const CACHE = "20260309--";
//const BASE = "/test/";
//
//self.addEventListener("install", (event) => {
//  event.waitUntil(
//    caches.open(CACHE).then((cache) => {
//      return cache.addAll([BASE + "index.html", BASE + "manifest.json", BASE + "icon192.png"]);
//    })
//  );
//});
//
//self.addEventListener("activate", (event) => {
//  event.waitUntil(
//    caches.keys().then((keys) => {
//      return Promise.all(
//        keys.map((key) => {
//          if (key !== CACHE) {
//            console.log("Удалили CACHE: " + key);
//            return caches.delete(key);
//          }
//        })
//      );
//    }).then(() => {
//      // Отправляем сообщение ТОЛЬКО после полной активации и удаления старых кэшей
//      sendMessageToClients('Активирована новая версия: ' + CACHE);
//    })
//  );
//});
//
//self.addEventListener("fetch", (event) => {
//  event.respondWith(
//    caches.match(event.request).then((response) => {
//       sendMessageToClients('++: ' + CACHE);
//      return response || fetch(event.request);
//    })
//  );
//});
//
//function sendMessageToClients(text) {
//  setTimeout(() => {
//    self.clients.matchAll().then(clients => {
//      clients.forEach(client => {
//        client.postMessage({text: text});
//      });
//    });
//  }, 1500);
//}