const cacheStorageKey = 'pwa-webmaker-v0.6.0'

const cacheList = [
    '/fonts',
    'index.html',
    '/css',
    '/js',
    '/img',
    'css.worker.js',
    'editor.worker.js',
    'html.worker.js',
    'json.worker.js',
    'ts.worker.js'
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheStorageKey)
            .then(cache => cache.addAll(cacheList))
            .then(() => self.skipWaiting())
    )
})

self.addEventListener('fetch', function(e) {
    console.log(e.request)
    e.respondWith(
        caches.match(e.request).then(function(response) {
            console.log(e.request)
            if (response != null) {
                return response
            }
            return fetch(e.request.url)
        })
    )
})

self.addEventListener('activate', function(e) {
    e.waitUntil(
        Promise.all(
            caches.keys().then(cacheNames => {
                return cacheNames.map(name => {
                    if (name !== cacheStorageKey) {
                        return caches.delete(name)
                    }
                })
            })
        ).then(() => {
            return self.clients.claim()
        })
    )
})
