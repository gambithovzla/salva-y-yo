"use client";

import { upload } from "@vercel/blob/client";
import { ImagePlus, Loader2, Lock, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/lib/site";
import { PhotoGallery } from "./PhotoGallery";

const PASSWORD_STORAGE_KEY = "salva-gallery-pwd";
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 25 * 1024 * 1024;

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

  const items = [...uploaded, ...staticItems];

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

function sanitizePathname(fileName: string): string {
  const dot = fileName.lastIndexOf(".");
  const rawExt = dot > 0 ? fileName.slice(dot + 1).toLowerCase() : "jpg";
  const ext = /^[a-z0-9]{2,5}$/.test(rawExt) ? rawExt : "jpg";
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
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [status, setStatus] = useState<"idle" | "uploading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && status !== "uploading") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, status]);

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

    setStatus("uploading");
    try {
      const blob = await upload(sanitizePathname(file.name), file, {
        access: "public",
        handleUploadUrl: "/api/gallery/upload",
        clientPayload: JSON.stringify({ password, caption }),
      });

      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: blob.url,
          pathname: blob.pathname,
          caption,
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error ?? "No se pudo guardar la foto.");
      }

      try {
        window.localStorage.setItem(PASSWORD_STORAGE_KEY, password);
      } catch {
        /* ignore */
      }

      onUploaded(data.item as GalleryItem);
      setStatus("done");
      setTimeout(onClose, 700);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "No se pudo subir la foto.";
      let friendly = message || "No se pudo subir la foto.";
      if (/contrase/i.test(message)) {
        friendly = "Contraseña incorrecta.";
      } else if (/client token|token/i.test(message)) {
        // La librería de Blob muestra este texto genérico tanto si la
        // contraseña es incorrecta como si falta la configuración del store.
        friendly =
          "No se pudo conectar con el almacenamiento. Revisa que la contraseña sea correcta y que el sitio tenga configurado Vercel Blob (BLOB_READ_WRITE_TOKEN).";
      }
      setError(friendly);
      setStatus("idle");
    }
  }

  const busy = status === "uploading";

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
        onClick={() => !busy && onClose()}
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
            onClick={() => !busy && onClose()}
            className="rounded-full p-1.5 text-[var(--muted)] transition hover:bg-[var(--sand)]/60 hover:text-[var(--ink)]"
            aria-label="Cerrar"
            disabled={busy}
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
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full rounded-xl border border-[var(--sand)] bg-[var(--cream)] px-3 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
              placeholder="Tu contraseña secreta"
            />
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
                Subiendo…
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
