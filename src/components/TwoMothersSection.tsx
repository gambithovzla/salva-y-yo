"use client";

import { motion } from "framer-motion";
import type { TwoMothersContent } from "@/lib/site";
import { encodePublicPath } from "@/lib/public-url";

export function TwoMothersSection({ content }: { content: TwoMothersContent }) {
  const headingId = "dos-madres-heading";

  return (
    <section className="space-y-10" aria-labelledby={headingId}>
      <div className="space-y-3 text-center">
        <p className="text-3xl" aria-hidden>
          💞
        </p>
        <h2
          id={headingId}
          className="font-serif text-2xl text-[var(--ink)] sm:text-3xl"
        >
          {content.title}
        </h2>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 sm:gap-6">
        <motion.article
          className="flex flex-col overflow-hidden rounded-3xl bg-[var(--card)] shadow-sm ring-1 ring-[var(--sand)]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--sand)]">
            <img
              src={encodePublicPath(content.chely.photoSrc)}
              alt={content.chely.imageAlt}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-2 px-5 py-6 text-center sm:px-6">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
              {content.chely.label}
            </p>
            <p className="font-serif text-lg leading-snug text-[var(--ink)]">
              {content.chely.quote}
            </p>
          </div>
        </motion.article>

        <motion.article
          className="flex flex-col overflow-hidden rounded-3xl bg-[var(--card)] shadow-sm ring-1 ring-[var(--sand)]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--sand)]">
            <img
              src={encodePublicPath(content.suegra.photoSrc)}
              alt={content.suegra.imageAlt}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-2 px-5 py-6 text-center sm:px-6">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
              {content.suegra.label}
            </p>
            <p className="font-serif text-lg leading-snug text-[var(--ink)]">
              {content.suegra.quote}
            </p>
          </div>
        </motion.article>
      </div>

      <motion.p
        className="mx-auto max-w-2xl text-center font-serif text-lg leading-relaxed text-[var(--ink)] sm:text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {content.closing}
      </motion.p>
    </section>
  );
}
