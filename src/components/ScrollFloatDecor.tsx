"use client";

import { motion } from "framer-motion";

/**
 * Decoración muy suave: cada elemento flota con su propio ritmo (sin atarlo al scroll),
 * para que no parezca una capa “pegada” que solo se desplaza al hacer scroll.
 */
const SPECS = [
  { emoji: "🌸", left: "7%", top: "16%", dur: 9.5, delay: 0 },
  { emoji: "✨", left: "42%", top: "10%", dur: 7.8, delay: 2.1 },
  { emoji: "💖", left: "86%", top: "22%", dur: 11.2, delay: 0.8 },
  { emoji: "🌺", left: "12%", top: "56%", dur: 10.4, delay: 3 },
  { emoji: "💕", left: "78%", top: "48%", dur: 8.6, delay: 1.5 },
  { emoji: "🌼", left: "52%", top: "72%", dur: 12, delay: 4 },
] as const;

export function ScrollFloatDecor() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {SPECS.map((s, i) => (
        <motion.span
          key={i}
          className="absolute select-none text-xl opacity-[0.12] sm:text-2xl sm:opacity-[0.18]"
          style={{ left: s.left, top: s.top }}
          animate={{
            y: [0, -10, 6, -4, 0],
            x: [0, 5, -6, 3, 0],
            rotate: [0, 5, -4, 3, 0],
            scale: [1, 1.05, 0.98, 1.02, 1],
          }}
          transition={{
            duration: s.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        >
          {s.emoji}
        </motion.span>
      ))}
    </div>
  );
}
