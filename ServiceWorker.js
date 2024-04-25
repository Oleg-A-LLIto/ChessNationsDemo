const cacheName = "Bastet Games-ChessNations-0.9.8";
const contentToCache = [
    "Build/ChessNationsDeployment.loader.js",
    "Build/e371bdabaf75e0ab8efae0c99e1161c1.js.unityweb",
    "Build/dd8f5623a1f904810098d61ed7f966d5.data.unityweb",
    "Build/5c109c8b1683d07273f0568b8414e385.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
