const cacheName = "Bastet Games-ChessNations-0.9.8";
const contentToCache = [
    "Build/ChessNationsDeployment.loader.js",
    "Build/7232b7521269e237e7f19497a817de4f.js.gz",
    "Build/fc5591464b47c126fe9db70dd04fce34.data.gz",
    "Build/02e89b8608d6e76ef29c4e871d4acf5e.wasm.gz",
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
