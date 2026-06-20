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

  // Comprueba que el token realmente puede hablar con el store de Blob.
  let blobReachable = false;
  let blobError: string | null = null;
  if (hasBlobToken) {
    try {
      await list({ limit: 1 });
      blobReachable = true;
    } catch (error) {
      blobError = error instanceof Error ? error.message : "Error desconocido";
    }
  }

  const ready = hasBlobToken && hasPassword && blobReachable;

  return NextResponse.json(
    {
      ready,
      checks: {
        BLOB_READ_WRITE_TOKEN: hasBlobToken,
        GALLERY_UPLOAD_PASSWORD: hasPassword,
        blobReachable,
        blobError,
      },
      hint: ready
        ? "Todo listo: la subida de fotos debería funcionar."
        : "Falta configuración. Revisa los valores en checks que estén en false.",
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
