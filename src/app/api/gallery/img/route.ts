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
    // useCache:false: leemos del origen, no de la CDN. Justo tras subir una
    // foto la CDN puede no tenerla todavía y devolver 404.
    const result = await get(path, { access: "private", useCache: false });
    if (!result || !result.stream) {
      return new Response("Not found", { status: 404 });
    }

    // Bufferizamos la imagen en lugar de reenviar el stream tal cual: así la
    // respuesta lleva Content-Length y evitamos rarezas de re-streaming que
    // dejaban la foto sin cargar en algunos casos.
    const bytes = await new Response(result.stream).arrayBuffer();

    return new Response(bytes, {
      headers: {
        "Content-Type": result.blob.contentType ?? "image/jpeg",
        "Content-Length": String(bytes.byteLength),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    // Dejamos rastro en los logs del servidor para poder diagnosticar, pero
    // al navegador solo le devolvemos un 404 limpio.
    console.error("[gallery/img] No se pudo servir la foto:", path, error);
    return new Response("Not found", { status: 404 });
  }
}
