import { randomUUID } from "node:crypto";
import { createSerwistRoute } from "@serwist/turbopack";

const revision =
  process.env.VERCEL_GIT_COMMIT_SHA?.trim() ||
  process.env.npm_package_version ||
  randomUUID();

export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } =
  createSerwistRoute({
    additionalPrecacheEntries: [{ url: "/offline", revision }],
    swSrc: "src/app/sw.ts",
    useNativeEsbuild: true,
    /**
     * Muchas fotos en public/ disparan precache enorme y el build en Vercel puede fallar (OOM / tiempo).
     * Las imágenes siguen sirviéndose y cacheándose en runtime con defaultCache del SW.
     */
    globIgnores: [
      "**/node_modules/**/*",
      "**/public/Salvador y Chely/**/*",
    ],
    maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
  });
