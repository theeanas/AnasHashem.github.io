let cacheName = 'cache-v1';
let filesToCache = [
    './',
    './index.html',
    './restaurant.html',
    './css/styles.css',
    './data/restaurants.json',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js',
    './js/sw_register.js',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg'
];

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(cacheName)
          .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(filesToCache);
          })
      );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          return (response) ? response : fetch(event.request);
        }
      )
    );
});

self.addEventListener('activate', function(event) {
    let newCache = 'new-cache-v1';
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (newCache !== cacheName) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
});
