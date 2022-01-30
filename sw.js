const CACHE_NAME = 'static cache'

const STATIC_ASSETS = [

    'index.html',
    'index.js',
    'images/chartreux.jpg',
    'images/persans.jpg',
    'images/siamois.jpg',
    'images/screenshots/1.png',
    'images/screenshots/2.png'

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
    console.log("[sw] activated");
})
self.addEventListener('fetch', event => {
    console.log("[sw] fetched");
})