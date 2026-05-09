"use client";

import { motion } from "framer-motion";
import type { LetterFromSalvador as LetterFromSalvadorData } from "@/lib/site";

/** Huella estilizada en SVG (firma simbólica), color heredado del texto. */
function SignatureFingerprint({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 72 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable="false"
    >
      <ellipse
        cx="36"
        cy="38"
        rx="26"
        ry="30"
        stroke="currentColor"
        strokeWidth="1.15"
        opacity="0.22"
      />
      <g
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
        opacity="0.85"
      >
        <path d="M36 12c4 6 2 14-1 20" />
        <path d="M22 22c2 8 8 12 14 10" opacity="0.75" />
        <path d="M50 24c-2 9-10 14-16 12" opacity="0.75" />
        <path d="M18 38c4 10 14 14 22 10" opacity="0.7" />
        <path d="M54 40c-3 11-15 16-24 12" opacity="0.7" />
        <path d="M24 52c6 8 16 8 22 2" opacity="0.65" />
        <path d="M48 54c-4 8-12 10-18 6" opacity="0.65" />
        <path d="M30 64c5 5 12 4 16-2" opacity="0.55" />
        <path d="M34 72c3 3 8 2 10-2" opacity="0.45" />
      </g>
      <path
        d="M36 78v10"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

export function LetterFromSalvador({
  letter,
}: {
  letter: LetterFromSalvadorData;
}) {
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
        <p className="mb-2 font-sans text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[var(--accent)]">
          {letter.sectionEyebrow}
        </p>
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

          <div className="mt-10 flex flex-col items-center gap-4 text-[var(--accent)]">
            <SignatureFingerprint className="h-[5.5rem] w-[4.5rem] shrink-0 sm:h-24 sm:w-20" />
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
