const CACHE_NAME = 'cari-takip-v4';
const urlsToCache = [
  './',
  './index.html',
  './script.js',
  './style.css',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Service Worker kurulum
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache).catch(error => {
        console.log('Cache başarısız:', error);
      });
    })
  );
  self.skipWaiting();
});

// Service Worker aktivasyon
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eski cache siliniyor:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
  // Aktif clientlara bildir
  self.clients.matchAll().then(clients => {
    clients.forEach(client => client.postMessage({type: 'CACHE_UPDATED'}));
  });
});

// Cache stratejisi: Cache ÖNCE, sonra network
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    // Önce cache'den bak
    caches.match(event.request)
      .then(response => {
        // Cache'de varsa hemen dön
        if (response) {
          console.log('📦 Cache\'ten yükleniyor:', event.request.url);
          return response;
        }

        // Cache'de yoksa network'ten al
        return fetch(event.request)
          .then(response => {
            // Network başarılıysa cache'e kaydet
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
              console.log('💾 Cache\'e kaydedildi:', event.request.url);
            });
            return response;
          })
          .catch(error => {
            // Network hatasında cache'den geri dön
            return caches.match(event.request)
              .then(cachedResponse => {
                if (cachedResponse) {
                  return cachedResponse;
                }
                throw error;
              });
          });
      })
      .catch(error => {
        console.error('❌ Fetch hatasında fallback:', error);
        return new Response('Çevrimdışı - Sayfa yüklenemedi', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain; charset=utf-8'
          })
        });
      })
  );
});
