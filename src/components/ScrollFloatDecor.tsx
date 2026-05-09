"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/** Capa decorativa fija: corazones y flores que se mueven suavemente al hacer scroll. */
export function ScrollFloatDecor() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
  });

  const y1 = useTransform(smoothProgress, [0, 1], ["0%", "-18%"]);
  const y2 = useTransform(smoothProgress, [0, 1], ["0%", "-28%"]);
  const y3 = useTransform(smoothProgress, [0, 1], ["0%", "-12%"]);
  const rotate1 = useTransform(smoothProgress, [0, 1], [0, -12]);
  const rotate2 = useTransform(smoothProgress, [0, 1], [0, 8]);

  const items = [
    { emoji: "💖", style: { left: "6%", top: "14%" }, y: y1, r: rotate1, s: "text-2xl sm:text-3xl" },
    { emoji: "🌸", style: { left: "82%", top: "22%" }, y: y2, r: rotate2, s: "text-xl sm:text-2xl" },
    { emoji: "💗", style: { left: "12%", top: "48%" }, y: y3, r: rotate1, s: "text-xl sm:text-2xl" },
    { emoji: "🌺", style: { right: "8%", top: "42%" }, y: y1, r: rotate2, s: "text-2xl sm:text-3xl" },
    { emoji: "✨", style: { left: "44%", top: "8%" }, y: y2, r: rotate1, s: "text-lg sm:text-xl" },
    { emoji: "💕", style: { right: "18%", top: "62%" }, y: y3, r: rotate2, s: "text-xl" },
    { emoji: "🌼", style: { left: "24%", top: "72%" }, y: y1, r: rotate2, s: "text-lg sm:text-xl" },
    { emoji: "💝", style: { right: "28%", top: "78%" }, y: y2, r: rotate1, s: "text-xl sm:text-2xl" },
  ] as const;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          className={`absolute select-none opacity-[0.22] sm:opacity-[0.28] ${item.s}`}
          style={{
            ...item.style,
            y: item.y,
            rotate: item.r,
          }}
        >
          {item.emoji}
        </motion.span>
      ))}
    </div>
  );
}
