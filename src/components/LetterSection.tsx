"use client";

import { motion } from "framer-motion";

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
      className="relative mx-auto max-w-2xl rounded-3xl bg-[var(--card)] px-6 py-12 shadow-sm ring-1 ring-[var(--sand)] backdrop-blur-sm sm:px-10 sm:py-14"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex gap-6 sm:gap-8">
        <div
          className="w-px shrink-0 self-stretch bg-[linear-gradient(to_bottom,transparent,var(--sand)_12%,var(--sand)_88%,transparent)]"
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <h2 className="mb-8 font-serif text-3xl text-[var(--ink)]">
            {letter.title}
          </h2>
          <p className="mb-8 font-serif text-lg italic text-[var(--muted)]">
            {letter.greeting}
          </p>
          <div className="space-y-6 font-serif text-lg leading-relaxed text-[var(--ink)]">
            {letter.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <footer className="mt-12 space-y-2 border-t border-[var(--sand)] pt-8">
            <p className="text-sm text-[var(--muted)]">{letter.signOff}</p>
            <p className="font-serif text-2xl text-[var(--accent)]">
              {letter.signature}
            </p>
          </footer>
        </div>
      </div>
    </motion.section>
  );
}
