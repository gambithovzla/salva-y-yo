"use client";

import { Eye, EyeOff, ImagePlus, Loader2, Lock, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/lib/site";
import { PhotoGallery } from "./PhotoGallery";

const PASSWORD_STORAGE_KEY = "salva-gallery-pwd";
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 25 * 1024 * 1024;
/** Lado máximo (px) al que reducimos la foto antes de subir. */
const MAX_DIMENSION = 1920;
/** Calidad JPEG de la foto reducida. */
const JPEG_QUALITY = 0.82;

/**
 * Reduce la foto en el navegador antes de subirla: una foto de móvil pesa
 * varios MB y por red móvil tarda o se cuelga; reducida a ~1920px y JPEG queda
 * en unos cientos de KB y sube en uno o dos segundos. Si algo falla (o es un
 * GIF animado), se sube el archivo original tal cual.
 */
async function compressImage(file: File): Promise<File> {
  if (file.type === "image/gif") return file;
  if (typeof createImageBitmap !== "function") return file;

  try {
    const bitmap = await createImageBitmap(file, {
      imageOrientation: "from-image",
    });
    const scale = Math.min(
      1,
      MAX_DIMENSION / Math.max(bitmap.width, bitmap.height),
    );
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      return file;
    }
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/jpeg", JPEG_QUALITY),
    );
    // Si por lo que sea no mejora, nos quedamos con el original.
    if (!blob || blob.size >= file.size) return file;

    const baseName = file.name.replace(/\.[^.]+$/, "") || "foto";
    return new File([blob], `${baseName}.jpg`, { type: "image/jpeg" });
  } catch {
    return file;
  }
}

/**
 * Galería de "Momentos" con subida estilo Instagram.
 *
 * Las fotos de siempre llegan por `staticItems` (server). Las que sube mamá
 * se guardan en Vercel Blob y se cargan desde /api/gallery; aparecen primero.
 */
export function MomentosGallery({
  staticItems,
}: {
  staticItems: GalleryItem[];
}) {
  const [uploaded, setUploaded] = useState<GalleryItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/gallery")
      .then((res) => (res.ok ? res.json() : { items: [] }))
      .then((data) => {
        if (active && Array.isArray(data.items)) setUploaded(data.items);
      })
      .catch(() => {
        /* sin conexión o Blob no configurado: solo mostramos las de siempre */
      });
    return () => {
      active = false;
    };
  }, []);

  // Orden cronológico: primero las fotos de siempre y, al final, las subidas
  // por la familia con la más reciente la última. La API las entrega con la
  // más nueva primero (igual que el estado al añadir una), por eso las
  // invertimos aquí para mostrarlas de la más antigua a la más nueva.
  const items = [...staticItems, ...[...uploaded].reverse()];

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-[var(--accent-ink)] shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cream)]"
        >
          <ImagePlus className="h-4 w-4" aria-hidden />
          Añadir una foto
        </button>
      </div>

      <PhotoGallery items={items} />

      {open ? (
        <UploadModal
          onClose={() => setOpen(false)}
          onUploaded={(item) => setUploaded((prev) => [item, ...prev])}
        />
      ) : null}
    </div>
  );
}

type UploadResult = { ok: boolean; status: number; data: { item?: GalleryItem; error?: string } };

/**
 * POST con FormData usando XHR para poder mostrar progreso de subida real
 * (fetch no expone el progreso de subida) y poder cancelar con AbortSignal.
 */
function postFormWithProgress(
  url: string,
  form: FormData,
  options: { signal: AbortSignal; onProgress: (percentage: number) => void },
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.responseType = "json";

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) options.onProgress((e.loaded / e.total) * 100);
    };
    xhr.onload = () => {
      const data = (xhr.response ?? {}) as UploadResult["data"];
      resolve({
        ok: xhr.status >= 200 && xhr.status < 300,
        status: xhr.status,
        data,
      });
    };
    xhr.onerror = () => reject(new Error("Error de red al subir la foto."));
    xhr.onabort = () =>
      reject(new DOMException("Subida cancelada", "AbortError"));

    options.signal.addEventListener("abort", () => xhr.abort(), { once: true });
    xhr.send(form);
  });
}

type UploadModalProps = {
  onClose: () => void;
  onUploaded: (item: GalleryItem) => void;
};

function readSavedPassword(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(PASSWORD_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function UploadModal({ onClose, onUploaded }: UploadModalProps) {
  const [password, setPassword] = useState(readSavedPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [status, setStatus] = useState<
    "idle" | "compressing" | "uploading" | "saving" | "done"
  >("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const controllerRef = useRef<AbortController | null>(null);

  /** Guarda la contraseña según se escribe, para no tener que repetirla. */
  function changePassword(value: string) {
    setPassword(value);
    try {
      window.localStorage.setItem(PASSWORD_STORAGE_KEY, value);
    } catch {
      /* localStorage no disponible */
    }
  }

  /** Cierra el modal; si hay una subida en curso, la cancela. */
  function handleClose() {
    controllerRef.current?.abort();
    onClose();
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        controllerRef.current?.abort();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  // Libera el object URL de la vista previa al desmontar.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function pickFile(selected: File | null) {
    setError(null);
    // Reemplaza la vista previa anterior, liberando su object URL.
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });

    if (!selected) {
      setFile(null);
      return;
    }
    if (!ALLOWED_TYPES.includes(selected.type)) {
      setError("Formato no válido. Usa una foto JPG, PNG, WEBP o GIF.");
      setFile(null);
      return;
    }
    if (selected.size > MAX_BYTES) {
      setError("La foto es muy pesada (máximo 25 MB).");
      setFile(null);
      return;
    }
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!password.trim()) {
      setError("Escribe la contraseña.");
      return;
    }
    if (!file) {
      setError("Elige una foto.");
      return;
    }

    setStatus("compressing");
    setProgress(0);

    // Red de seguridad: si la subida se cuelga (red lenta o intermitente),
    // la abortamos a los 3 minutos en lugar de quedarnos en "Subiendo…".
    const controller = new AbortController();
    controllerRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 180_000);

    try {
      // Reduce la foto antes de subir (mucho más rápido y fiable en móvil).
      const toUpload = await compressImage(file);

      const form = new FormData();
      form.append("file", toUpload);
      form.append("caption", caption);
      form.append("password", password);

      setStatus("uploading");
      const res = await postFormWithProgress("/api/gallery/upload", form, {
        signal: controller.signal,
        onProgress: (p) => {
          setProgress(Math.round(p));
          // Cuando termina de subir el archivo, esperamos al servidor.
          if (p >= 100) setStatus("saving");
        },
      });
      if (!res.ok) {
        throw new Error(res.data?.error ?? "No se pudo subir la foto.");
      }
      if (!res.data.item) {
        throw new Error("Respuesta inesperada del servidor.");
      }

      onUploaded(res.data.item);
      setStatus("done");
      setTimeout(onClose, 700);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "No se pudo subir la foto.";
      let friendly = message || "No se pudo subir la foto.";
      if (controller.signal.aborted) {
        friendly =
          "La subida tardó demasiado y se canceló. Revisa tu conexión e inténtalo de nuevo.";
      } else if (/contrase/i.test(message)) {
        friendly = "Contraseña incorrecta.";
      } else if (/client token|token/i.test(message)) {
        // La librería de Blob muestra este texto genérico tanto si la
        // contraseña es incorrecta como si falta la configuración del store.
        friendly =
          "No se pudo conectar con el almacenamiento. Revisa que la contraseña sea correcta y que el sitio tenga configurado Vercel Blob (BLOB_READ_WRITE_TOKEN).";
      }
      setError(friendly);
      setStatus("idle");
    } finally {
      clearTimeout(timeout);
      controllerRef.current = null;
    }
  }

  const busy =
    status === "compressing" || status === "uploading" || status === "saving";

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[rgba(20,18,16,0.7)] backdrop-blur-[2px]"
        aria-label="Cerrar"
        onClick={handleClose}
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-[var(--card)] shadow-xl ring-1 ring-[var(--sand)]"
      >
        <div className="flex items-center justify-between border-b border-[var(--sand)] px-5 py-4">
          <h3
            id="upload-modal-title"
            className="font-serif text-lg text-[var(--ink)]"
          >
            Añadir una foto
          </h3>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-1.5 text-[var(--muted)] transition hover:bg-[var(--sand)]/60 hover:text-[var(--ink)]"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="space-y-5 px-5 py-5">
          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[var(--ink)]">
              <Lock className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden />
              Contraseña
            </span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => changePassword(e.target.value)}
                autoComplete="current-password"
                className="w-full rounded-xl border border-[var(--sand)] bg-[var(--cream)] px-3 py-2.5 pr-11 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                placeholder="Tu contraseña secreta"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-[var(--muted)] transition hover:text-[var(--ink)]"
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden />
                )}
              </button>
            </div>
          </label>

          <div>
            <span className="mb-1.5 block text-sm font-medium text-[var(--ink)]">
              Foto
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[var(--sand)] bg-[var(--cream)] px-4 py-6 text-center transition hover:border-[var(--accent)]"
            >
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt="Vista previa"
                  className="max-h-48 w-auto rounded-xl object-contain"
                />
              ) : (
                <>
                  <ImagePlus
                    className="h-8 w-8 text-[var(--accent)]"
                    aria-hidden
                  />
                  <span className="text-sm text-[var(--muted)]">
                    Toca para elegir una foto
                  </span>
                </>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
            />
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[var(--ink)]">
              Un texto para la foto{" "}
              <span className="font-normal text-[var(--muted)]">
                (opcional)
              </span>
            </span>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={2}
              maxLength={280}
              className="w-full resize-none rounded-xl border border-[var(--sand)] bg-[var(--cream)] px-3 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
              placeholder="Ej. Nuestro paseo del domingo"
            />
          </label>

          {error ? (
            <p
              className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700"
              role="alert"
            >
              {error}
            </p>
          ) : null}
        </div>

        <div className="border-t border-[var(--sand)] px-5 py-4">
          <button
            type="submit"
            disabled={busy || status === "done"}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-[var(--accent-ink)] shadow-sm transition hover:opacity-90 disabled:opacity-60"
          >
            {busy ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                {status === "compressing"
                  ? "Preparando foto…"
                  : status === "saving"
                    ? "Guardando…"
                    : progress > 0 && progress < 100
                      ? `Subiendo… ${progress}%`
                      : "Subiendo…"}
              </>
            ) : status === "done" ? (
              "¡Foto añadida!"
            ) : (
              "Subir a la galería"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
