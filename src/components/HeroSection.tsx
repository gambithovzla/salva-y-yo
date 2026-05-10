"use client";

import { motion } from "framer-motion";

/** Tarjeta editorial con relieve y borde cálido — alineada con las cartas */
const elevatedCard =
  "relative overflow-hidden rounded-[1.75rem] border border-white/75 bg-gradient-to-b from-white via-[var(--cream)]/95 to-[var(--sand)]/35 px-6 py-11 shadow-[0_28px_90px_-42px_rgba(65,42,28,0.38),0_12px_36px_-18px_rgba(65,42,28,0.2),inset_0_1px_0_0_rgba(255,255,255,0.92)] ring-2 ring-[var(--accent)]/30 backdrop-blur-sm sm:rounded-[2rem] sm:px-10 sm:py-14";

const eyebrowPill =
  "inline-block rounded-2xl border-2 border-[var(--accent)]/50 bg-gradient-to-br from-[#fff9f4] via-[#faf0e8] to-[#ebe3d8] px-4 py-2.5 text-center text-[0.68rem] font-bold uppercase leading-tight tracking-[0.2em] text-[#3a3028] shadow-[0_6px_20px_-8px_rgba(110,75,50,0.35),inset_0_1px_0_rgba(255,255,255,0.9)] sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.26em]";

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
      <div className={`${elevatedCard} mx-auto max-w-2xl`}>
        <div
          className="pointer-events-none absolute -right-14 top-1/4 h-52 w-52 rounded-full bg-[var(--accent)]/[0.14] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-[#d4a574]/[0.12] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/45 to-transparent"
          aria-hidden
        />

        <div className="relative flex gap-6 sm:gap-8">
          <div
            className="w-px shrink-0 self-stretch bg-[linear-gradient(to_bottom,transparent,var(--accent)_22%,var(--sand)_78%,transparent)] opacity-80"
            aria-hidden
          />
          <div className="min-w-0 flex-1">
            <p className={eyebrowPill}>{eyebrow}</p>

            <div className="mt-6 flex items-center gap-3 sm:mt-7" aria-hidden>
              <span className="h-px w-10 bg-gradient-to-r from-[var(--accent)] to-transparent opacity-80 sm:w-14" />
              <span className="font-serif text-xl text-[var(--accent)] drop-shadow-sm sm:text-2xl">
                ✦
              </span>
              <span className="h-px flex-1 max-w-[7rem] bg-gradient-to-l from-[var(--accent)]/70 to-transparent opacity-80 sm:max-w-[9rem]" />
            </div>

            <h1 className="mt-8 bg-gradient-to-br from-[var(--ink)] via-[#3d3530] to-[#5c4a42] bg-clip-text font-serif text-[2rem] leading-[1.15] tracking-tight text-transparent sm:mt-9 sm:text-[2.65rem] sm:leading-[1.1]">
              {title}
            </h1>

            <p className="mt-8 max-w-xl whitespace-pre-line text-[1.0625rem] leading-[1.82] text-[var(--muted)] sm:mt-10 sm:text-lg sm:leading-[1.78]">
              {lead}
            </p>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
