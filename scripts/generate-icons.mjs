import { mkdirSync } from "node:fs";
import sharp from "sharp";

const bg = { r: 250, g: 246, b: 240, alpha: 1 };
mkdirSync("public/icons", { recursive: true });

for (const size of [192, 512]) {
  const buf = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: bg,
    },
  })
    .png()
    .toBuffer();

  const name =
    size === 192 ? "android-chrome-192x192.png" : "icon-512x512.png";
  await sharp(buf).toFile(`public/icons/${name}`);
}

console.log("Icons written to public/icons/");
