import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

export const dynamic = "force-dynamic";

/**
 * POST /api/gallery/upload
 *
 * Genera el token para que el navegador suba la foto DIRECTAMENTE a Vercel
 * Blob (sin pasar por el servidor). Así evitamos el límite de ~4.5 MB de las
 * funciones serverless y admitimos fotos pesadas de móvil.
 *
 * El navegador manda la contraseña y el caption en `clientPayload`; aquí
 * validamos la contraseña antes de emitir el token.
 *
 * Nota: NO usamos `onUploadCompleted`. Ese webhook haría que Blob llamara de
 * vuelta a este dominio al terminar; si el dominio está detrás de un filtro
 * anti-bots (responde 403 a peticiones automáticas), la subida se quedaría
 * colgada esperando esa confirmación. En su lugar, el navegador registra la
 * foto con una llamada directa a POST /api/gallery tras subirla.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        let payload: { password?: unknown; caption?: unknown } = {};
        try {
          payload = clientPayload ? JSON.parse(clientPayload) : {};
        } catch {
          payload = {};
        }

        const expected = process.env.GALLERY_UPLOAD_PASSWORD;
        if (!expected || payload.password !== expected) {
          throw new Error("Contraseña incorrecta.");
        }

        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
          ],
          addRandomSuffix: true,
          maximumSizeInBytes: 25 * 1024 * 1024,
        };
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "No se pudo subir la foto." },
      { status: 400 },
    );
  }
}
