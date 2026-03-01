const CACHE = 'cache-' + "123";//new URL(location.href).searchParams.get('v');
self.addEventListener('install', e => e.waitUntil(
  caches.open(CACHE).then(c => c.addAll(['/', '/icon192.png']))
));
self.addEventListener('fetch', e => e.respondWith(
  caches.match(e.request).then(r => r || fetch(e.request))
));



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