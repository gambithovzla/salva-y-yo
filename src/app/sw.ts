/// <reference lib="webworker" />
import type { SerwistGlobalConfig } from "serwist";
import { NetworkOnly, Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {}
}

declare const self: ServiceWorkerGlobalScope;

/**
 * Service worker neutralizado (pasa-todo a la red).
 *
 * Historia: el SW anterior cacheaba la galería y, al meterse entre el
 * navegador y nuestro proxy de imágenes (/api/gallery/img), servía versiones
 * viejas/rotas de las fotos subidas. El servidor entrega las fotos perfecto
 * (se comprueba abriendo la URL del proxy directamente), pero el SW las rompía.
 *
 * Este SW ya NO cachea nada: todo va directo a la red, igual que si no hubiera
 * service worker. Además, al activarse borra TODAS las cachés que el SW viejo
 * hubiera dejado, para soltar cualquier foto "fantasma" pegada. Renunciamos al
 * modo offline (este sitio se usa con conexión) a cambio de que siempre se vea
 * la versión real y correcta.
 */
const serwist = new Serwist({
  precacheEntries: [],
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [
    {
      matcher: () => true,
      handler: new NetworkOnly(),
    },
  ],
});

serwist.addEventListeners();

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    })(),
  );
});
