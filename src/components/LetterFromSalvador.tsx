"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { LetterFromSalvador as LetterFromSalvadorData } from "@/lib/site";
import { encodePublicPath } from "@/lib/public-url";

export function LetterFromSalvador({
  letter,
}: {
  letter: LetterFromSalvadorData;
}) {
  const photoSrc = encodePublicPath(letter.signaturePhotoSrc);

  return (
    <motion.section
      id="carta-desde-el-futuro"
      className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl bg-gradient-to-b from-[var(--cream)] via-white/90 to-[var(--sand)]/30 px-6 py-12 shadow-sm ring-1 ring-[var(--accent)]/20 backdrop-blur-sm sm:px-10 sm:py-14"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      <div
        className="pointer-events-none absolute -right-8 top-12 h-40 w-40 rounded-full bg-[var(--accent)]/[0.08] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-6 bottom-8 h-32 w-32 rounded-full bg-[var(--accent)]/[0.06] blur-2xl"
        aria-hidden
      />

      <header className="relative mb-10 text-center sm:mb-12">
        {letter.sectionEyebrow.trim() ? (
          <p className="mb-2 font-sans text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[var(--accent)]">
            {letter.sectionEyebrow}
          </p>
        ) : null}
        <h2 className="font-serif text-[1.65rem] leading-tight text-[var(--ink)] sm:text-3xl">
          {letter.sectionTitle}
        </h2>
      </header>

      <div className="relative mx-auto max-w-xl">
        <p className="mb-8 font-serif text-xl italic text-[var(--muted)] sm:text-2xl">
          {letter.greeting}
        </p>
        <div className="space-y-6 font-serif text-lg leading-[1.75] text-[var(--ink)] sm:text-[1.125rem]">
          {letter.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <footer className="mt-12 border-t border-[var(--accent)]/15 pt-10">
          <p className="text-center font-serif text-base italic leading-relaxed text-[var(--muted)] sm:text-lg">
            {letter.signOff}
          </p>

          <div className="mt-10 flex flex-col items-center gap-5 text-[var(--accent)]">
            <div className="relative h-[7.25rem] w-[7.25rem] shrink-0 overflow-hidden rounded-full bg-[var(--sand)] shadow-[0_12px_40px_-16px_rgba(90,60,50,0.35)] ring-4 ring-[var(--accent)]/30 ring-offset-4 ring-offset-[var(--cream)] sm:h-32 sm:w-32">
              <Image
                src={photoSrc}
                alt="Salvador, tres días"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 7.25rem, 8rem"
              />
            </div>
            <p className="font-serif text-3xl text-[var(--ink)] sm:text-4xl">
              {letter.signatureName}
            </p>
            <p className="max-w-md text-center font-serif text-sm italic leading-relaxed text-[var(--muted)] sm:text-base">
              {letter.scribeNote}
            </p>
          </div>
        </footer>
      </div>
    </motion.section>
  );
}
