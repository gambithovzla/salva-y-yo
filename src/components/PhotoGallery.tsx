"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ImageIcon } from "lucide-react";
import type { GalleryItem } from "@/lib/site";

export function PhotoGallery({ items }: { items: GalleryItem[] }) {
  if (items.length === 0) {
    return (
      <motion.div
        className="rounded-3xl border border-dashed border-[var(--sand)] bg-[var(--card)] px-8 py-16 text-center backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <ImageIcon
          className="mx-auto mb-4 h-10 w-10 text-[var(--muted)]"
          strokeWidth={1.25}
          aria-hidden
        />
        <p className="font-serif text-xl text-[var(--ink)]">
          Tu galería está lista
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[var(--muted)]">
          Guarda las fotos en{" "}
          <code className="rounded bg-[var(--sand)] px-1.5 py-0.5 text-xs">
            public/gallery/
          </code>{" "}
          y añade las rutas en{" "}
          <code className="rounded bg-[var(--sand)] px-1.5 py-0.5 text-xs">
            src/lib/site.ts
          </code>{" "}
          en el array <code className="text-xs">galleryItems</code>.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {items.map((item, i) => (
        <motion.figure
          key={item.src}
          className="group overflow-hidden rounded-3xl bg-[var(--card)] shadow-sm ring-1 ring-[var(--sand)] backdrop-blur-sm"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: i * 0.08 }}
        >
          <div className="relative aspect-[4/3] w-full bg-[var(--sand)]">
            <Image
              src={item.src}
              alt={item.caption}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, 50vw"
              priority={i < 2}
            />
          </div>
          <figcaption className="flex items-center gap-2 px-5 py-4 text-sm text-[var(--ink)]">
            <Heart
              className="h-4 w-4 shrink-0 text-[var(--accent)]"
              aria-hidden
            />
            {item.caption}
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
