import { NextResponse } from "next/server";
import {
  addUploadedPhoto,
  readUploadedPhotos,
  uploadedPhotoToGalleryItem,
} from "@/lib/gallery-store";

// Estas respuestas dependen de datos que cambian con cada subida:
// nunca deben cachearse.
export const dynamic = "force-dynamic";

/** Solo aceptamos URLs públicas de nuestro propio store de Vercel Blob. */
function isVercelBlobUrl(url: string): boolean {
  try {
    const { protocol, hostname } = new URL(url);
    return (
      protocol === "https:" &&
      hostname.endsWith(".public.blob.vercel-storage.com")
    );
  } catch {
    return false;
  }
}

function passwordIsValid(candidate: unknown): boolean {
  const expected = process.env.GALLERY_UPLOAD_PASSWORD;
  // Si no hay contraseña configurada, bloqueamos las subidas por seguridad.
  if (!expected) return false;
  return typeof candidate === "string" && candidate === expected;
}

/** GET /api/gallery — lista las fotos subidas (la más nueva primero). */
export async function GET() {
  try {
    const photos = await readUploadedPhotos();
    return NextResponse.json(
      { items: photos.map(uploadedPhotoToGalleryItem) },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    // Si Blob no está configurado todavía, no rompemos la galería.
    return NextResponse.json({ items: [] }, { headers: { "Cache-Control": "no-store" } });
  }
}

/**
 * POST /api/gallery — registra en el manifiesto una foto ya subida a Blob.
 * Body JSON: { url, pathname, caption, password }
 */
export async function POST(request: Request) {
  let body: {
    url?: unknown;
    pathname?: unknown;
    caption?: unknown;
    password?: unknown;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  if (!passwordIsValid(body.password)) {
    return NextResponse.json(
      { error: "Contraseña incorrecta." },
      { status: 401 },
    );
  }

  if (typeof body.url !== "string" || !isVercelBlobUrl(body.url)) {
    return NextResponse.json(
      { error: "La imagen no es válida." },
      { status: 400 },
    );
  }

  const caption =
    typeof body.caption === "string" ? body.caption.trim() : "";
  if (caption.length > 280) {
    return NextResponse.json(
      { error: "El texto es demasiado largo." },
      { status: 400 },
    );
  }

  const pathname =
    typeof body.pathname === "string" && body.pathname.length > 0
      ? body.pathname
      : new URL(body.url).pathname.replace(/^\//, "");

  const photo = await addUploadedPhoto({ url: body.url, pathname, caption });
  return NextResponse.json({ item: uploadedPhotoToGalleryItem(photo) });
}
