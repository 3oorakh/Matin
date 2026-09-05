// service-worker.js
// این فایل بازی رو دفعه‌ی اول (وقتی اینترنت هست) کش می‌کنه
// تا دفعه‌های بعد بدون اینترنت هم باز بشه

const CACHE_NAME = "shab-sarnevesht-saz-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "images/Home-dark.jpg",
  "images/accident.png",
  "images/ali-alley.png",
  "images/ali-outside-shop.png",
  "images/ali-stealing.png",
  "images/alley-background.png",
  "images/alley.png",
  "images/answera-call.png",
  "images/attack.png",
  "images/barron.png",
  "images/bully.png",
  "images/call-reject.png",
  "images/callreject.png",
  "images/cycle.jpg",
  "images/dad.png",
  "images/daddy.png",
  "images/matin-back.png",
  "images/matin-car.png",
  "images/matin-gang.png",
  "images/matin-injured.png",
  "images/matin-oof.png",
  "images/matin-phone.png",
  "images/matin-up.png",
  "images/motor.png",
  "images/motor2.png",
  "images/shop-interior.jpg",
  "images/super-market-outside.jpeg",
  "images/icon-192.png",
  "images/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => {
        return cachedResponse;
      });
    })
  );
});
