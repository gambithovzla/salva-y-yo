"use client";

import { motion } from "framer-motion";

type HeroSectionProps = {
  eyebrow: string;
  title: string;
  lead: string;
};

export function HeroSection({ eyebrow, title, lead }: HeroSectionProps) {
  return (
    <motion.header
      className="relative z-10 mx-auto max-w-3xl px-5 pb-10 pt-14 sm:px-8 sm:pb-14 sm:pt-20"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl bg-[var(--card)] px-6 py-11 shadow-[0_20px_60px_-40px_rgba(55,40,35,0.18)] ring-1 ring-[var(--sand)] backdrop-blur-sm sm:px-10 sm:py-14">
        <div
          className="pointer-events-none absolute -right-16 top-1/4 h-48 w-48 rounded-full bg-[var(--accent)]/[0.09] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-[var(--accent)]/[0.06] blur-2xl"
          aria-hidden
        />

        <div className="relative flex gap-6 sm:gap-8">
          <div
            className="w-px shrink-0 self-stretch bg-[linear-gradient(to_bottom,transparent,var(--sand)_12%,var(--sand)_88%,transparent)]"
            aria-hidden
          />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.38em] text-[var(--muted)] sm:text-xs">
              {eyebrow}
            </p>

            <div className="mt-5 flex items-center gap-3 sm:mt-6" aria-hidden>
              <span className="h-px w-8 bg-gradient-to-r from-[var(--accent)]/60 to-transparent sm:w-12" />
              <span className="font-serif text-lg text-[var(--accent)] opacity-90">
                ✦
              </span>
              <span className="h-px flex-1 max-w-[6rem] bg-gradient-to-l from-[var(--accent)]/50 to-transparent sm:max-w-[8rem]" />
            </div>

            <h1 className="mt-7 font-serif text-[2rem] leading-[1.15] tracking-tight text-[var(--ink)] sm:mt-8 sm:text-[2.65rem] sm:leading-[1.1]">
              {title}
            </h1>

            <p className="mt-8 max-w-xl whitespace-pre-line text-[1.0625rem] leading-[1.82] text-[var(--muted)] sm:mt-9 sm:text-lg sm:leading-[1.78]">
              {lead}
            </p>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
