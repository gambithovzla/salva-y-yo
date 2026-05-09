"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function MotherhoodCounter({ startIso }: { startIso: string }) {
  const startMs = useMemo(() => new Date(startIso).getTime(), [startIso]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const elapsed = Math.max(0, now - startMs);
  const days = Math.floor(elapsed / (24 * 60 * 60 * 1000));
  const hours = Math.floor(
    (elapsed % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000),
  );
  const minutes = Math.floor((elapsed % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((elapsed % (60 * 1000)) / 1000);

  /** Solo depende de días enteros de maternidad: cambia a lo sumo cada ~24 h, sin saltos cada segundo. */
  const whimsical = useMemo(() => {
    const d = Math.max(0, days);
    const weeks = Math.floor(d / 7);
    return {
      hugs: Math.round(d * 5 + weeks * 3),
      songs: Math.max(0, Math.floor(d / 4) + Math.floor(weeks / 2)),
      calm: Math.round(d * 8 + weeks * 5),
    };
  }, [days]);

  const unitClass =
    "flex min-w-[4.5rem] flex-col items-center rounded-2xl bg-[var(--card)] px-4 py-4 shadow-sm ring-1 ring-[var(--sand)] backdrop-blur-sm";

  return (
    <section className="space-y-10">
      <div className="space-y-3 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--muted)]">
          Llevas siendo mamá exactamente
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <motion.div
            className={unitClass}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
          >
            <span className="font-serif text-3xl tabular-nums text-[var(--ink)]">
              {days}
            </span>
            <span className="text-xs text-[var(--muted)]">días</span>
          </motion.div>
          <motion.div
            className={unitClass}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="font-serif text-3xl tabular-nums text-[var(--ink)]">
              {pad(hours)}
            </span>
            <span className="text-xs text-[var(--muted)]">horas</span>
          </motion.div>
          <motion.div
            className={unitClass}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <span className="font-serif text-3xl tabular-nums text-[var(--ink)]">
              {pad(minutes)}
            </span>
            <span className="text-xs text-[var(--muted)]">minutos</span>
          </motion.div>
          <motion.div
            className={unitClass}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="font-serif text-3xl tabular-nums text-[var(--accent)]">
              {pad(seconds)}
            </span>
            <span className="text-xs text-[var(--muted)]">segundos</span>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="mx-auto max-w-xl rounded-3xl bg-[var(--card)] px-6 py-8 shadow-sm ring-1 ring-[var(--sand)] backdrop-blur-sm"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="mb-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
          Magia acumulada (aprox.)
        </p>
        <ul className="grid gap-4 text-sm text-[var(--ink)] sm:grid-cols-3">
          <li className="text-center">
            <p className="font-serif text-2xl tabular-nums">
              {whimsical.hugs.toLocaleString("es")}
            </p>
            <p className="text-[var(--muted)]">momentos de ternura</p>
          </li>
          <li className="text-center">
            <p className="font-serif text-2xl tabular-nums">
              {whimsical.songs.toLocaleString("es")}
            </p>
            <p className="text-[var(--muted)]">canciones merecidas</p>
          </li>
          <li className="text-center">
            <p className="font-serif text-2xl tabular-nums">
              {whimsical.calm.toLocaleString("es")}
            </p>
            <p className="text-[var(--muted)]">respiraciones profundas</p>
          </li>
        </ul>
      </motion.div>
    </section>
  );
}
