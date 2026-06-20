import { get } from "@vercel/blob";

export const dynamic = "force-dynamic";

/**
 * GET /api/gallery/img?path=fotos-familia/...
 *
 * Sirve una foto guardada en el store privado de Vercel Blob. El navegador no
 * puede leer los blobs privados directamente, así que el servidor los lee con
 * su token y los reenvía. Las rutas llevan sufijo aleatorio único, por eso se
 * cachean de forma agresiva (immutable).
 */
export async function GET(request: Request): Promise<Response> {
  const path = new URL(request.url).searchParams.get("path");

  // Solo servimos fotos subidas por la galería, nunca rutas arbitrarias.
  if (!path || !path.startsWith("fotos-familia/")) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const result = await get(path, { access: "private" });
    if (!result || !result.stream) {
      return new Response("Not found", { status: 404 });
    }

    return new Response(result.stream, {
      headers: {
        "Content-Type": result.blob.contentType ?? "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
