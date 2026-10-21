const CACHE_NAME = 'ks-portfolio-v7';
const urlsToCache = [
    '/',
    '/index.html',
    '/about.html',
    '/projects.html',
    '/services.html',
    '/contact.html',
    '/privacy.html',
    '/style.css',
    '/mobile-premium.css?v=2',
    '/script.js',
    '/language.js?v=4'
];

// Installation
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache ouvert');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activation
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request).then(
                    response => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    }
                );
            })
    );
});