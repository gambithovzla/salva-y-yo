/**
 * Genera PNG con QR escaneable + marco tipo regalo (Día de la Madre).
 * Salida: public/qr-regalo-dia-de-la-madre.png
 *
 * Uso: node scripts/generate-mothers-day-qr.mjs
 */
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outPath = path.join(root, "public", "qr-regalo-dia-de-la-madre.png");

const TARGET_URL = "https://lamejormadredelmundo.gambitholabs.com/";

const W = 1080;
const H = 1320;

const frameSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff8fb"/>
      <stop offset="50%" stop-color="#fceef3"/>
      <stop offset="100%" stop-color="#f3e3e8"/>
    </linearGradient>
    <filter id="cardShadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#6b4c55" flood-opacity="0.18"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="140" cy="220" r="90" fill="#f5d0d6" opacity="0.4"/>
  <circle cx="940" cy="340" r="110" fill="#e8c9cf" opacity="0.35"/>
  <circle cx="900" cy="1180" r="85" fill="#efd9dc" opacity="0.38"/>
  <path d="M 380 228 Q 540 268 700 228" stroke="#d4a59a" stroke-width="3.5" fill="none" opacity="0.55" stroke-linecap="round"/>
  <text x="540" y="115" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="46" fill="#5a3d44" font-weight="600">Para mamá</text>
  <text x="540" y="175" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="#8f6672">Feliz Día de la Madre</text>
  <text x="540" y="228" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="#c9a882">✦ Un regalo digital ✦</text>
  <rect x="210" y="260" width="660" height="680" rx="32" fill="#ffffff" filter="url(#cardShadow)"/>
  <text x="540" y="1010" text-anchor="middle" font-family="Georgia, serif" font-size="24" fill="#6e5158">Escanea con la cámara — tu regalo te espera</text>
  <text x="540" y="1065" text-anchor="middle" font-family="system-ui, sans-serif" font-size="17" fill="#9a7882">lamejormadredelmundo.gambitholabs.com</text>
  <text x="540" y="1275" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="#b8959e" font-style="italic">Con cariño, Salvador y papá</text>
</svg>`;

mkdirSync(path.join(root, "public"), { recursive: true });

const qrBuffer = await QRCode.toBuffer(TARGET_URL, {
  type: "png",
  width: 520,
  margin: 2,
  errorCorrectionLevel: "M",
  color: { dark: "#3a2c26", light: "#ffffff" },
});

const bgBuffer = await sharp(Buffer.from(frameSvg)).png().toBuffer();

const qrSize = 520;
const cardX = 210;
const cardY = 260;
const cardW = 660;
const cardH = 680;
const qrLeft = Math.round(cardX + (cardW - qrSize) / 2);
const qrTop = Math.round(cardY + (cardH - qrSize) / 2);

await sharp(bgBuffer)
  .composite([{ input: qrBuffer, left: qrLeft, top: qrTop }])
  .png({ compressionLevel: 9 })
  .toFile(outPath);

console.log("Generado:", outPath);
console.log("URL codificada:", TARGET_URL);
