"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { GalleryItem } from "@/lib/site";

type GalleryLightboxProps = {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
};

export function GalleryLightbox({
  items,
  index,
  onClose,
  onChangeIndex,
}: GalleryLightboxProps) {
  const [mounted, setMounted] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const item = items[index];
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const goPrev = useCallback(() => {
    if (hasPrev) onChangeIndex(index - 1);
  }, [hasPrev, index, onChangeIndex]);

  const goNext = useCallback(() => {
    if (hasNext) onChangeIndex(index + 1);
  }, [hasNext, index, onChangeIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goPrev, goNext]);

  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  if (!mounted || !item) return null;

  const src = encodeURI(item.src);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100]"
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        className="absolute inset-0 bg-[rgba(20,18,16,0.88)] backdrop-blur-[2px]"
        aria-label="Cerrar galería"
        onClick={onClose}
      />

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-3 pt-14 sm:p-6 sm:pt-16">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-lightbox-caption"
          className="pointer-events-auto flex w-full max-w-6xl flex-col items-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative flex w-full items-center justify-center gap-1 sm:gap-2">
            <button
              type="button"
              ref={closeBtnRef}
              className="absolute -top-11 right-0 z-10 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20 sm:-top-12"
              aria-label="Cerrar"
              onClick={onClose}
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            <button
              type="button"
              disabled={!hasPrev}
              className="hidden shrink-0 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 disabled:pointer-events-none disabled:opacity-30 sm:flex"
              aria-label="Foto anterior"
              onClick={goPrev}
            >
              <ChevronLeft className="h-7 w-7" aria-hidden />
            </button>

            <div className="relative h-[min(78vh,calc(100dvh-10rem))] w-full min-w-0 max-w-5xl">
              <Image
                key={src}
                src={src}
                alt={item.caption}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            <button
              type="button"
              disabled={!hasNext}
              className="hidden shrink-0 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 disabled:pointer-events-none disabled:opacity-30 sm:flex"
              aria-label="Foto siguiente"
              onClick={goNext}
            >
              <ChevronRight className="h-7 w-7" aria-hidden />
            </button>
          </div>

          <div className="flex w-full max-w-2xl flex-col items-center gap-2 px-2 text-center">
            <p
              id="gallery-lightbox-caption"
              className="flex items-start justify-center gap-2 text-sm leading-relaxed text-white sm:text-base"
            >
              <Heart
                className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]"
                aria-hidden
              />
              <span>{item.caption}</span>
            </p>
            <p className="text-xs text-white/55">
              {index + 1} / {items.length}
            </p>
          </div>

          <div className="flex gap-3 sm:hidden">
            <button
              type="button"
              disabled={!hasPrev}
              className="rounded-full bg-white/15 px-4 py-2 text-sm text-white disabled:opacity-30"
              onClick={goPrev}
            >
              Anterior
            </button>
            <button
              type="button"
              disabled={!hasNext}
              className="rounded-full bg-white/15 px-4 py-2 text-sm text-white disabled:opacity-30"
              onClick={goNext}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </motion.div>,
    document.body,
  );
}
