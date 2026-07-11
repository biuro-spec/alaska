// Service Worker panelu Alaska — offline shell
const CACHE = 'alaska-panel-v1';
const SHELL = ['/panel/', '/panel/index.html', '/panel/icon-192.png', '/panel/icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // Tylko zasoby panelu (ta sama domena, ścieżka /panel/) — reszta (API Google) bez pośrednictwa
  if (e.request.method === 'GET' && url.origin === location.origin && url.pathname.startsWith('/panel/')) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(e.request).then((r) => r || caches.match('/panel/index.html')))
    );
  }
});
