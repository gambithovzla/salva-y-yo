/**
 * Genera favicon y variantes PWA desde un SVG de marca.
 * Salida: src/app/icon.png, src/app/apple-icon.png, public/icons/*.png
 *
 * Uso: node scripts/generate-favicon.mjs
 */
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

/** Corazón (path 24×24) centrado sobre fondo redondeado — colores de globals.css */
const svg512 = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#faf7f2"/>
      <stop offset="100%" stop-color="#ebe3d8"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#bg)"/>
  <path fill="#c9a882" transform="translate(112,128) scale(11.5)"
    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
</svg>`;

async function main() {
  mkdirSync(path.join(root, "public", "icons"), { recursive: true });

  const buf = Buffer.from(svg512);

  await sharp(buf).resize(512, 512).png().toFile(path.join(root, "src", "app", "icon.png"));

  await sharp(buf).resize(180, 180).png().toFile(path.join(root, "src", "app", "apple-icon.png"));

  await sharp(buf)
    .resize(192, 192)
    .png()
    .toFile(path.join(root, "public", "icons", "android-chrome-192x192.png"));

  await sharp(buf)
    .resize(512, 512)
    .png()
    .toFile(path.join(root, "public", "icons", "icon-512x512.png"));

  console.log(
    "Favicon generado: src/app/icon.png, src/app/apple-icon.png, public/icons/*.png",
  );
}

await main();
