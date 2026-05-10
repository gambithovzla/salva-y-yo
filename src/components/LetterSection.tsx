"use client";

import { motion } from "framer-motion";

const elevatedCard =
  "relative overflow-hidden rounded-[1.75rem] border border-white/75 bg-gradient-to-b from-white via-[var(--cream)]/95 to-[var(--sand)]/35 px-6 py-12 shadow-[0_28px_90px_-42px_rgba(65,42,28,0.38),0_12px_36px_-18px_rgba(65,42,28,0.2),inset_0_1px_0_0_rgba(255,255,255,0.92)] ring-2 ring-[var(--accent)]/30 backdrop-blur-sm sm:rounded-[2rem] sm:px-10 sm:py-14";

const titleBadge =
  "mb-6 inline-block rounded-2xl border-2 border-[var(--accent)]/45 bg-gradient-to-br from-[#fff9f4] to-[#ebe3d8] px-4 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#5c4d42] shadow-[0_4px_14px_-6px_rgba(90,60,45,0.25)] sm:mb-7 sm:px-5 sm:text-[0.68rem]";

type Letter = {
  title: string;
  greeting: string;
  paragraphs: readonly string[];
  signOff: string;
  signature: string;
};

export function LetterSection({ letter }: { letter: Letter }) {
  return (
    <motion.section
      className={`${elevatedCard} relative mx-auto max-w-2xl`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div
        className="pointer-events-none absolute -right-10 top-10 h-44 w-44 rounded-full bg-[var(--accent)]/[0.11] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent"
        aria-hidden
      />

      <div className="relative flex gap-6 sm:gap-8">
        <div
          className="w-px shrink-0 self-stretch bg-[linear-gradient(to_bottom,transparent,var(--accent)_22%,var(--sand)_78%,transparent)] opacity-75"
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <p className={titleBadge}>Carta del papá</p>
          <h2 className="font-serif text-3xl leading-tight text-[var(--ink)] sm:text-[2rem]">
            {letter.title}
          </h2>
          <p className="mb-8 mt-7 font-serif text-lg italic text-[var(--muted)] sm:text-xl">
            {letter.greeting}
          </p>
          <div className="space-y-6 font-serif text-lg leading-relaxed text-[var(--ink)]">
            {letter.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <footer className="mt-12 space-y-3 border-t border-[var(--accent)]/20 pt-10">
            <p className="text-sm text-[var(--muted)]">{letter.signOff}</p>
            <p className="bg-gradient-to-r from-[var(--accent)] to-[#a88462] bg-clip-text font-serif text-2xl text-transparent">
              {letter.signature}
            </p>
          </footer>
        </div>
      </div>
    </motion.section>
  );
}
