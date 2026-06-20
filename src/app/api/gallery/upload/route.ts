import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { addUploadedPhoto } from "@/lib/gallery-store";

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

        const caption =
          typeof payload.caption === "string" ? payload.caption.trim() : "";

        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
          ],
          addRandomSuffix: true,
          maximumSizeInBytes: 25 * 1024 * 1024,
          // Disponible en onUploadCompleted (solo se ejecuta en producción).
          tokenPayload: JSON.stringify({ caption }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // En producción Vercel llama aquí cuando la subida termina. Lo usamos
        // como red de seguridad: registra la foto aunque el cliente fallara al
        // llamar a /api/gallery. (No se ejecuta en localhost.)
        let caption = "";
        try {
          const parsed = tokenPayload ? JSON.parse(tokenPayload) : {};
          if (typeof parsed.caption === "string") caption = parsed.caption;
        } catch {
          caption = "";
        }
        await addUploadedPhoto({
          url: blob.url,
          pathname: blob.pathname,
          caption,
        });
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
