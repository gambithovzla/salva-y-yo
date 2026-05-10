"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { LetterFromSalvador as LetterFromSalvadorData } from "@/lib/site";
import { encodePublicPath } from "@/lib/public-url";

const elevatedCard =
  "relative overflow-hidden rounded-[1.75rem] border border-white/75 bg-gradient-to-b from-[var(--cream)] via-white/95 to-[var(--sand)]/40 px-6 py-12 shadow-[0_28px_90px_-42px_rgba(65,42,28,0.36),0_12px_36px_-18px_rgba(65,42,28,0.18),inset_0_1px_0_0_rgba(255,255,255,0.88)] ring-2 ring-[var(--accent)]/35 backdrop-blur-sm sm:rounded-[2rem] sm:px-10 sm:py-14";

const titleBadge =
  "mb-3 inline-block rounded-2xl border-2 border-[var(--accent)]/45 bg-gradient-to-br from-[#fff9f4] to-[#efe8df] px-4 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#5c4d42] shadow-[0_4px_14px_-6px_rgba(90,60,45,0.25)] sm:px-5 sm:text-[0.68rem]";

export function LetterFromSalvador({
  letter,
}: {
  letter: LetterFromSalvadorData;
}) {
  const photoSrc = encodePublicPath(letter.signaturePhotoSrc);

  return (
    <motion.section
      id="carta-desde-el-futuro"
      className={`${elevatedCard} relative mx-auto max-w-2xl`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      <div
        className="pointer-events-none absolute -right-10 top-12 h-44 w-44 rounded-full bg-[var(--accent)]/[0.12] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-[#e8c4b8]/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/45 to-transparent"
        aria-hidden
      />

      <header className="relative mb-10 text-center sm:mb-12">
        <p className={`${titleBadge} mx-auto`}>Carta de Salvador</p>
        {letter.sectionEyebrow.trim() ? (
          <p className="mb-2 mt-3 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
            {letter.sectionEyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 bg-gradient-to-br from-[var(--ink)] to-[#4a3f38] bg-clip-text font-serif text-[1.75rem] leading-tight text-transparent sm:text-3xl">
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

        <footer className="mt-12 border-t border-[var(--accent)]/25 pt-10">
          <p className="text-center font-serif text-base italic leading-relaxed text-[var(--muted)] sm:text-lg">
            {letter.signOff}
          </p>

          <div className="mt-10 flex flex-col items-center gap-5 text-[var(--accent)]">
            <div className="relative h-[7.25rem] w-[7.25rem] shrink-0 overflow-hidden rounded-full bg-[var(--sand)] shadow-[0_14px_44px_-18px_rgba(70,48,38,0.45)] ring-4 ring-[var(--accent)]/35 ring-offset-4 ring-offset-[var(--cream)] sm:h-32 sm:w-32">
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
