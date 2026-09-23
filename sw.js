const CACHE_NAME = 'g9-pwa-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil( caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)) );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// هذا لضمان وصول الإشعار المنبثق بنجاح من الخلفية
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'تبدأ إحدى محاضراتك خلال 15 دقيقة',
    icon: './icon.png',
    vibrate: [200, 100, 200, 100, 200],
  };
  event.waitUntil(
    self.registration.showNotification('تنبيه المحاضرات ⏰', options)
  );
});