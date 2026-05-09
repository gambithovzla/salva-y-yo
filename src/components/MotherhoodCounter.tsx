"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * Latidos: ~72 lpm en reposo por adulto (típico; rango clínico ~60–100).
 * "Compartidos" = suma de ambos corazones en el tiempo transcurrido (sincronizado con el reloj).
 */
const BPM_REPOSO_ADULTO = 72;

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

  /** Estadísticas poéticas por días (ternura + respiraciones conscientes, órdenes creíbles). */
  const whimsical = useMemo(() => {
    const d = Math.max(0, days);
    const weeks = Math.floor(d / 7);
    return {
      hugs: Math.round(d * 5 + weeks * 3),
      /** ~4 “respiraciones profundas” reconocibles por día de maternidad + algo por semana. */
      calm: Math.round(d * 4 + weeks * 2),
    };
  }, [days]);

  /**
   * Latidos siguen el reloj; miradas y sonrisas escalan por días para no inflar miles por minuto.
   * Miradas ~7/día que “dicen todo”; sonrisas ~15/día compartidas en familia (órdenes realistas).
   */
  const rhythmStats = useMemo(() => {
    const d = Math.max(0, days);
    const minutos = elapsed / 60_000;
    const latidosCompartidos = Math.floor(
      minutos * BPM_REPOSO_ADULTO * 2,
    );
    const miradas = Math.max(
      0,
      Math.round(d * 7 + hours * 0.12),
    );
    const sonrisas = Math.max(
      0,
      Math.round(d * 15 + hours * 0.2),
    );
    return { latidosCompartidos, miradas, sonrisas };
  }, [days, hours, elapsed]);

  const unitClass =
    "flex min-w-[4.5rem] flex-col items-center rounded-2xl bg-[var(--card)] px-4 py-4 shadow-sm ring-1 ring-[var(--sand)] backdrop-blur-sm";

  const statItemClass =
    "flex flex-col items-center justify-center text-center";

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
        className="mx-auto max-w-4xl rounded-3xl bg-[var(--card)] px-5 py-8 shadow-sm ring-1 ring-[var(--sand)] backdrop-blur-sm sm:px-8"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
          Magia acumulada (aprox.)
        </p>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          <li className={statItemClass}>
            <p className="font-serif text-2xl tabular-nums text-[var(--ink)]">
              {whimsical.hugs.toLocaleString("es")}
            </p>
            <p className="mt-1 max-w-[11rem] text-xs leading-snug text-[var(--muted)] sm:text-sm">
              momentos de ternura
            </p>
          </li>
          <li className={statItemClass}>
            <p className="font-serif text-2xl tabular-nums text-[var(--ink)]">
              {rhythmStats.latidosCompartidos.toLocaleString("es")}
            </p>
            <p className="mt-1 max-w-[11rem] text-xs leading-snug text-[var(--muted)] sm:text-sm">
              latidos compartidos
            </p>
            <p className="mt-1 hidden text-[10px] leading-tight text-[var(--muted)]/80 lg:block">
              ~{BPM_REPOSO_ADULTO} lpm × 2
            </p>
          </li>
          <li className={statItemClass}>
            <p className="font-serif text-2xl tabular-nums text-[var(--ink)]">
              {rhythmStats.miradas.toLocaleString("es")}
            </p>
            <p className="mt-1 max-w-[11rem] text-xs leading-snug text-[var(--muted)] sm:text-sm">
              miradas que lo dicen todo
            </p>
          </li>
          <li className={statItemClass}>
            <p className="font-serif text-2xl tabular-nums text-[var(--ink)]">
              {rhythmStats.sonrisas.toLocaleString("es")}
            </p>
            <p className="mt-1 max-w-[11rem] text-xs leading-snug text-[var(--muted)] sm:text-sm">
              sonrisas que iluminan
            </p>
          </li>
          <li className={`${statItemClass} col-span-2 sm:col-span-1`}>
            <p className="font-serif text-2xl tabular-nums text-[var(--ink)]">
              {whimsical.calm.toLocaleString("es")}
            </p>
            <p className="mt-1 max-w-[11rem] text-xs leading-snug text-[var(--muted)] sm:text-sm">
              respiraciones profundas
            </p>
          </li>
        </ul>
      </motion.div>
    </section>
  );
}
