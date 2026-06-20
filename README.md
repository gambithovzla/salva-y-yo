# Salva y yo — PWA para mamá

Web progresiva hecha con Next.js: contador de tiempo como mamá, galería, cupones de amor y una carta personalizada (estilo minimalista cálido).

## Personalizar

1. **Fecha de nacimiento de Salvador**  
   - Copia `.env.example` a `.env.local` y define `NEXT_PUBLIC_MOTHERHOOD_START` en ISO 8601 (con zona horaria), **o**  
   - Edita `motherhoodStartFallbackIso` en [`src/lib/site.ts`](src/lib/site.ts).

2. **Textos, cupones y carta**  
   En [`src/lib/site.ts`](src/lib/site.ts): `siteCopy`, `letter`, `coupons`, `galleryItems`.

3. **Fotos**  
   Coloca imágenes en `public/gallery/` y añade entradas en `galleryItems`.

4. **Iconos de la PWA**  
   Sustituye los PNG en `public/icons/` o ejecuta `npm run generate-icons` (colores base en `scripts/generate-icons.mjs`).

5. **Dominio / enlaces**  
   En producción, define `NEXT_PUBLIC_SITE_URL` con la URL pública (Open Graph y metadatos).

## Subir fotos desde la web (estilo Instagram)

En la pestaña **Momentos** hay un botón “Añadir una foto”: permite subir fotos
a la galería desde el móvil, sin tocar código. Las fotos se guardan en
**Vercel Blob** y aparecen al instante para todos (las nuevas, primero).

Para activarlo en Vercel:

1. En el proyecto de Vercel: **Storage → Create Database → Blob**. Al
   conectarlo, Vercel añade la variable `BLOB_READ_WRITE_TOKEN` automáticamente.
2. Define `GALLERY_UPLOAD_PASSWORD` con una contraseña secreta (la que usará
   quien suba fotos). Si no se define, las subidas quedan bloqueadas.
3. Vuelve a desplegar.

En local: copia `.env.example` a `.env.local`, ejecuta `vercel env pull` para
traer `BLOB_READ_WRITE_TOKEN` y define `GALLERY_UPLOAD_PASSWORD`.

> Las fotos se suben **directamente** del navegador a Blob (sin pasar por el
> servidor), así que admite fotos pesadas de móvil sin el límite de ~4.5 MB de
> las funciones serverless.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Despliegue

### Vercel

1. Conecta el repositorio en [Vercel](https://vercel.com).  
2. Framework: Next.js (detección automática).  
3. Variables de entorno: `NEXT_PUBLIC_MOTHERHOOD_START`, `NEXT_PUBLIC_SITE_URL`.  
4. `npm run build` es el comando de build por defecto.

### Railway

Puede ejecutar la misma app Node: **Build** `npm run build`, **Start** `npm run start`, puerto que asigne Railway (`PORT`). Añade las mismas variables `NEXT_PUBLIC_*`.

La PWA registra el service worker vía Serwist (`/serwist/sw.js`). En la primera visita, el navegador puede instalar la app o añadirla a la pantalla de inicio.
