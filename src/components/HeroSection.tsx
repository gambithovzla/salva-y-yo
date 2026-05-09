"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type HeroSectionProps = {
  eyebrow: string;
  title: string;
  lead: string;
};

export function HeroSection({ eyebrow, title, lead }: HeroSectionProps) {
  return (
    <motion.header
      className="relative z-10 mx-auto max-w-3xl px-5 pb-10 pt-14 text-center sm:px-8 sm:pb-14 sm:pt-20"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-b from-white/95 via-[var(--cream)]/98 to-[var(--sand)]/25 px-8 py-11 shadow-[0_28px_90px_-48px_rgba(55,40,30,0.35)] ring-1 ring-[var(--sand)]/90 backdrop-blur-[12px] sm:rounded-[2.25rem] sm:px-12 sm:py-14">
        <div
          className="pointer-events-none absolute -left-24 top-1/3 h-56 w-56 -translate-y-1/2 rounded-full bg-[var(--accent)]/[0.12] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 bottom-0 h-44 w-44 rounded-full bg-[var(--accent)]/[0.1] blur-3xl"
          aria-hidden
        />

        <motion.p
          variants={fadeUp}
          className="relative text-[11px] font-medium uppercase tracking-[0.42em] text-[var(--muted)] sm:text-xs"
        >
          {eyebrow}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="relative mx-auto mt-5 flex items-center justify-center gap-3"
          aria-hidden
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--accent)]/70 sm:w-14" />
          <span className="font-serif text-[var(--accent)] opacity-90">✦</span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[var(--accent)]/70 sm:w-14" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="relative mt-7 font-serif text-[2.15rem] leading-[1.12] tracking-tight text-[var(--ink)] sm:text-5xl sm:leading-[1.08] md:text-[3.25rem]"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="relative mx-auto mt-9 max-w-[26rem] text-[1.0625rem] leading-[1.82] text-[var(--muted)] sm:mt-10 sm:max-w-lg sm:text-lg sm:leading-[1.78]"
        >
          {lead}
        </motion.p>
      </div>
    </motion.header>
  );
}
