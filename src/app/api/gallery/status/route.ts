import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export const dynamic = "force-dynamic";

/**
 * GET /api/gallery/status
 *
 * Diagnóstico de configuración (no expone secretos, solo booleanos).
 * Útil para verificar desde el navegador si la subida de fotos puede funcionar.
 */
export async function GET() {
  const hasBlobToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  const hasPassword = Boolean(process.env.GALLERY_UPLOAD_PASSWORD);

  // Nombres (NO valores) de variables relacionadas con Blob. Sirve para
  // detectar si el token se llamó distinto (p. ej. con prefijo del store).
  const blobEnvVarNames = Object.keys(process.env)
    .filter((k) => /BLOB/i.test(k))
    .sort();

  // Cualquier token de lectura/escritura de Blob, tenga el nombre que tenga.
  const tokenVarName =
    (process.env.BLOB_READ_WRITE_TOKEN && "BLOB_READ_WRITE_TOKEN") ||
    blobEnvVarNames.find((k) => /READ_WRITE_TOKEN$/i.test(k)) ||
    null;
  const detectedToken = tokenVarName ? process.env[tokenVarName] : undefined;

  // Comprueba que el token realmente puede hablar con el store de Blob.
  let blobReachable = false;
  let blobError: string | null = null;
  if (detectedToken) {
    try {
      await list({ limit: 1, token: detectedToken });
      blobReachable = true;
    } catch (error) {
      blobError = error instanceof Error ? error.message : "Error desconocido";
    }
  }

  const ready = hasPassword && blobReachable;

  return NextResponse.json(
    {
      ready,
      checks: {
        BLOB_READ_WRITE_TOKEN: hasBlobToken,
        GALLERY_UPLOAD_PASSWORD: hasPassword,
        blobReachable,
        blobError,
      },
      diagnostics: {
        vercelEnv: process.env.VERCEL_ENV ?? null,
        tokenVarName,
        blobEnvVarNames,
      },
      hint: ready
        ? "Todo listo: la subida de fotos debería funcionar."
        : "Falta configuración. Revisa checks y diagnostics.",
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
