/// <reference lib="webworker" />
import { defaultCache } from "@serwist/turbopack/worker";
import type { PrecacheEntry, RuntimeCaching, SerwistGlobalConfig } from "serwist";
import { NetworkOnly, Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

/**
 * La galería de fotos subidas (subir, listar, servir imágenes privadas,
 * diagnóstico) es contenido dinámico que SIEMPRE debe ir a la red. El service
 * worker no debe cachear ni interceptar nada bajo /api/gallery: hacerlo dejaba
 * fotos rotas "pegadas" en caché y hacía que /api/gallery/status devolviera un
 * 404 del app-shell en vez del JSON real. NetworkOnly va primero para ganarle
 * a las reglas de defaultCache.
 */
const runtimeCaching: RuntimeCaching[] = [
  {
    matcher: ({ url, sameOrigin }) =>
      sameOrigin && url.pathname.startsWith("/api/gallery"),
    handler: new NetworkOnly(),
  },
  ...defaultCache,
];

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching,
  fallbacks: {
    entries: [
      {
        url: "/offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

serwist.addEventListeners();

/**
 * Al activarse este service worker, borra las cachés de runtime que pudieran
 * tener respuestas viejas de la galería: una lista `/api/gallery` cacheada
 * (que mostraba "fotos fantasma" que ya no existen en el servidor) y las
 * imágenes que antes se cacheaban como estáticas. Así el usuario no tiene que
 * limpiar nada a mano: al actualizarse el SW, la galería parte de cero limpia.
 */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      for (const name of ["apis", "static-image-assets"]) {
        await caches.delete(name).catch(() => {});
      }
    })(),
  );
});
