const CACHE_NAME = 'site-static-v2';
const dynamicCache = 'site-dynamic-v1';

const STATIC_ASSETS = [
    'index.html',
    'exemple.html',
    'offline.html',
    'index.js',
    'images/chartreux.jpg',
    'images/persans.jpg',
    'images/siamois.jpg',
    'images/cage1.jpg',
    'images/cage2.jpg',
    'images/cage3.jpg',
    'images/sademoticion.png',
    'images/screenshots/1.png',
    'images/screenshots/2.png',
    'bootstrap-5.1.3-dist/css/bootstrap.min.css',
    'bootstrap-5.1.3-dist/js/bootstrap.bundle.min.js'
]

async function preCache() {

    const cache = await caches.open(CACHE_NAME)
    return cache.addAll(STATIC_ASSETS)
}

self.addEventListener('install', event => {
    console.log("[sw] installed");
    event.waitUntil(preCache());
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {

            return Promise.all(keys
                .filter(key => key !== CACHE_NAME && key !== dynamicCache)
                .map(key => caches.delete(key))
            )
        })
    );
});



async function fetchAssets(event) {

    try {
        const response = await fetch(event, request)
        return response

    } catch (err) {
        const cache = await caches.open(CACHE_NAME)
        return cache.match(event.request)
    }


}


self.addEventListener('fetch', event => {

    event.respondWith(
        caches.match(event.request).then(cachesRes => {
            return cachesRes || fetch(event.request).then(fetchRes => {
                return caches.open(dynamicCache).then(cache => {
                    cache.put(event.request.url, fetchRes.clone());
                    return fetchRes;
                })

            });
        }).catch(() => caches.match('offline.html'))
    );
});



self.addEventListener('notificationclose', function(e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;

    console.log('Closed notification: ' + primaryKey);
});

self.addEventListener('notificationclick', function(e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
    var action = e.action;

    if (action === 'close') {
        notification.close();
    } else {
        clients.openWindow('http://www.example.com');
        notification.close();
    }
});


//cette fonction va notifier l'utilisateur lorsqu'En ligne