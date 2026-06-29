import "server-only";

import { get, put } from "@vercel/blob";
import type { GalleryItem } from "./site";

/**
 * Almacén de fotos subidas desde la web (estilo Instagram).
 *
 * Las imágenes viven en Vercel Blob. Como Blob no guarda metadatos
 * consultables (el caption, la fecha…), mantenemos un pequeño "manifiesto"
 * JSON en el propio Blob con la lista de fotos subidas.
 *
 * Requiere la variable de entorno BLOB_READ_WRITE_TOKEN, que Vercel añade
 * automáticamente al crear un store de Blob en el proyecto.
 */

/** Ruta fija del manifiesto dentro del store de Blob. */
const MANIFEST_PATHNAME = "gallery-data/uploads.json";

export type UploadedPhoto = {
  /** Identificador único (la propia URL del blob sirve como clave). */
  id: string;
  /** URL pública de la imagen en Vercel Blob. */
  url: string;
  /** Ruta del blob (para poder borrarlo en el futuro si hiciera falta). */
  pathname: string;
  caption: string;
  /** ISO 8601 del momento de subida. */
  createdAt: string;
};

/** Lee el manifiesto. Devuelve [] si todavía no existe ninguna subida. */
export async function readUploadedPhotos(): Promise<UploadedPhoto[]> {
  // El store es privado, así que el manifiesto no se puede leer por su URL
  // pública: lo pedimos con el token del servidor. useCache:false porque
  // cambia con cada subida y no queremos una versión cacheada por el CDN.
  const result = await get(MANIFEST_PATHNAME, {
    access: "private",
    useCache: false,
  });
  if (!result || !result.stream) return [];

  try {
    const data = (await new Response(result.stream).json()) as unknown;
    if (!Array.isArray(data)) return [];
    return data as UploadedPhoto[];
  } catch {
    return [];
  }
}

/** Sobrescribe el manifiesto completo. */
async function writeUploadedPhotos(photos: UploadedPhoto[]): Promise<void> {
  // El store está configurado como privado, así que el manifiesto también
  // debe guardarse con access:"private" (intentar "public" da el error
  // "Cannot use public access on a private store").
  await put(MANIFEST_PATHNAME, JSON.stringify(photos), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

/**
 * Registra una foto recién subida en el manifiesto (la más nueva primero).
 * Idempotente: si la URL ya estaba registrada, no la duplica.
 */
export async function addUploadedPhoto(
  photo: Omit<UploadedPhoto, "id" | "createdAt"> &
    Partial<Pick<UploadedPhoto, "createdAt">>,
): Promise<UploadedPhoto> {
  const existing = await readUploadedPhotos();

  const already = existing.find((p) => p.url === photo.url);
  if (already) return already;

  const entry: UploadedPhoto = {
    id: photo.url,
    url: photo.url,
    pathname: photo.pathname,
    caption: photo.caption.trim(),
    createdAt: photo.createdAt ?? new Date().toISOString(),
  };

  await writeUploadedPhotos([entry, ...existing]);
  return entry;
}

/**
 * Convierte una foto subida al formato que consume la galería.
 *
 * El store de Blob es privado, así que la imagen no se sirve por su URL directa
 * sino a través de nuestro proxy /api/gallery/img (que la lee con el token del
 * servidor). `pathname` lleva sufijo aleatorio único, por eso se puede cachear.
 */
export function uploadedPhotoToGalleryItem(photo: UploadedPhoto): GalleryItem {
  return {
    src: `/api/gallery/img?path=${encodeURIComponent(photo.pathname)}`,
    caption: photo.caption,
  };
}
