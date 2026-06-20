import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { addUploadedPhoto, uploadedPhotoToGalleryItem } from "@/lib/gallery-store";

export const dynamic = "force-dynamic";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
// La foto llega ya reducida desde el navegador; este tope es solo de seguridad
// y se mantiene por debajo del límite de cuerpo de las funciones serverless.
const MAX_BYTES = 4 * 1024 * 1024;

function passwordIsValid(candidate: FormDataEntryValue | null): boolean {
  const expected = process.env.GALLERY_UPLOAD_PASSWORD;
  if (!expected) return false;
  return typeof candidate === "string" && candidate === expected;
}

function sanitizePathname(fileName: string, fallbackExt: string): string {
  const dot = fileName.lastIndexOf(".");
  const rawExt = dot > 0 ? fileName.slice(dot + 1).toLowerCase() : fallbackExt;
  const ext = /^[a-z0-9]{2,5}$/.test(rawExt) ? rawExt : fallbackExt;
  const base =
    (dot > 0 ? fileName.slice(0, dot) : fileName)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "foto";
  return `fotos-familia/${base}.${ext}`;
}

/**
 * POST /api/gallery/upload  (multipart/form-data: file, caption, password)
 *
 * Recibe la foto (ya reducida en el navegador) y la guarda en Vercel Blob
 * desde el servidor. Hacerlo aquí —en vez de subir el navegador directamente
 * a blob.vercel-storage.com— evita los cuelgues de subida directa en redes
 * móviles, porque todo pasa por el propio dominio del sitio.
 */
export async function POST(request: Request): Promise<NextResponse> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  if (!passwordIsValid(form.get("password"))) {
    return NextResponse.json(
      { error: "Contraseña incorrecta." },
      { status: 401 },
    );
  }

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "No se recibió la foto." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Formato no válido. Usa JPG, PNG, WEBP o GIF." },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "La foto es demasiado pesada." },
      { status: 413 },
    );
  }

  const captionRaw = form.get("caption");
  const caption =
    typeof captionRaw === "string" ? captionRaw.trim().slice(0, 280) : "";

  try {
    const fallbackExt = file.type === "image/png" ? "png" : "jpg";
    // El store es privado; guardamos privado y servimos las fotos a través de
    // /api/gallery/img (ver gallery-store + ese route handler).
    const blob = await put(sanitizePathname(file.name, fallbackExt), file, {
      access: "private",
      addRandomSuffix: true,
      contentType: file.type,
    });

    const photo = await addUploadedPhoto({
      url: blob.url,
      pathname: blob.pathname,
      caption,
    });

    return NextResponse.json({ item: uploadedPhotoToGalleryItem(photo) });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "No se pudo guardar la foto." },
      { status: 500 },
    );
  }
}
