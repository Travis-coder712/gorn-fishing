// Gorn Fishing — offline service worker (network-first so updates reach installed phones)
const CACHE = 'gorn-v16';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon.svg', './assets/copco-logo.svg', './assets/copco-logo-retro-tight.svg', './assets/copco-logo-retro.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // live forecast APIs go straight to the network
  e.respondWith(
    // no-cache = revalidate with the server every time (URL, not the Request: navigate-mode Requests can't take init options), so GitHub Pages' 10-minute HTTP cache can't serve a stale app
    fetch(e.request.url, { cache: 'no-cache' }).then(res => {
      if (res.redirected && e.request.mode === 'navigate') return Response.redirect(res.url, 302);
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(e.request).then(hit => hit || caches.match('./index.html')))
  );
});
