const STATIC_CACHE = "static";

const APP_SHELL = [
  "/",
  "index.html",
  "style.css",
  "script.js",
  "font/TextMeOne-Regular.ttf",
  "img/aubergine.webp",
  "img/onion.webp",
  "img/carrots.webp",
  "img/pumpkin.webp",
  "img/potato.webp",
  "img/tomato.webp",
  "img/corn.webp",
  "img/champignon.webp",
  "img/pregunta.webp",
  "img/time.webp",
  "img/heart.webp",
  "img/void-heart.webp",
  "img/decline.webp",
  "img/check.webp",
  "img/clock.webp"
];

self.addEventListener("install", (e) => {
  const cacheStatic = caches
    .open(STATIC_CACHE)
    .then(cache => cache.addAll(APP_SHELL));
  e.waitUntil(cacheStatic);
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches
      .match(e.request)
      .then((res) => res || fetch(e.request))
      .catch(console.log)
  )
})