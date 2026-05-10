"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import {
  formatMotherhoodDateLongEs,
  motherhoodBirthSkySnapshot as sky,
} from "@/lib/site";

type Props = {
  startIso: string;
};

function MoonFirstQuarter() {
  const rawId = useId();
  const clipId = `moon-lit-${rawId.replace(/:/g, "")}`;

  return (
    <svg
      viewBox="0 0 100 100"
      className="mx-auto h-28 w-28 shrink-0 text-[var(--accent)] sm:h-32 sm:w-32"
      aria-hidden
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="50" y="0" width="50" height="100" />
        </clipPath>
      </defs>
      <circle cx="50" cy="50" r="46" className="fill-[var(--sand)]" />
      <circle
        cx="50"
        cy="50"
        r="46"
        className="fill-[var(--accent)]"
        fillOpacity={0.38}
        clipPath={`url(#${clipId})`}
      />
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        className="stroke-[var(--sand)]"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function MotherhoodDaySnapshot({ startIso }: Props) {
  const dateLong = formatMotherhoodDateLongEs(startIso);

  const unitClass =
    "flex min-w-[4.5rem] flex-col items-center rounded-2xl bg-[var(--card)] px-3 py-4 shadow-sm ring-1 ring-[var(--sand)] backdrop-blur-sm sm:px-4";

  const statItemClass =
    "flex flex-col items-center justify-center text-center";

  return (
    <section className="space-y-10">
      <div className="space-y-4 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--muted)]">
          El cielo ese día
        </p>
        <h3 className="font-serif text-2xl text-[var(--ink)] sm:text-3xl">
          {dateLong}
        </h3>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-[var(--muted)]">
          Una foto del mundo exterior mientras pasaba lo más grande adentro.
        </p>
      </div>

      <motion.div
        className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <MoonFirstQuarter />
        <p className="max-w-sm text-center font-serif text-lg leading-relaxed text-[var(--ink)] sm:text-left">
          La Luna iba en <span className="text-[var(--accent)]">{sky.moonPhaseLabel.toLowerCase()}</span>
          : mitad luz, mitad misterio… como si todavía guardara espacio para todo lo que venía después.
        </p>
      </motion.div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <motion.div
          className={unitClass}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
        >
          <span className="font-serif text-3xl tabular-nums text-[var(--ink)]">
            {sky.illuminationPct}
          </span>
          <span className="text-xs text-[var(--muted)]">% iluminada</span>
        </motion.div>
        <motion.div
          className={unitClass}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <span className="font-serif text-3xl tabular-nums text-[var(--ink)]">
            {String(sky.moonAgeDays).replace(".", ",")}
          </span>
          <span className="text-xs text-[var(--muted)]">días lunares</span>
        </motion.div>
        <motion.div
          className={unitClass}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <span className="font-serif text-lg leading-tight text-[var(--ink)] sm:text-xl">
            {sky.nextFullMoonLabel}
          </span>
          <span className="mt-1 text-xs text-[var(--muted)]">próxima luna llena</span>
        </motion.div>
      </div>

      <motion.div
        className="mx-auto max-w-4xl rounded-3xl bg-[var(--card)] px-5 py-8 shadow-sm ring-1 ring-[var(--sand)] backdrop-blur-sm sm:px-8"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
          El mismo día, dos hogares en el mapa
        </p>
        <ul className="grid gap-8 sm:grid-cols-2 sm:gap-10">
          <li className={statItemClass}>
            <p className="font-serif text-xl text-[var(--ink)]">{sky.caracas.label}</p>
            <p className="mt-3 font-serif text-2xl tabular-nums text-[var(--ink)]">
              {sky.caracas.sunrise}
              <span className="mx-1 text-[var(--muted)]">·</span>
              {sky.caracas.sunset}
            </p>
            <p className="mt-2 text-xs leading-snug text-[var(--muted)] sm:text-sm">
              amanecer y atardecer (hora local)
            </p>
            <p className="mt-3 text-sm text-[var(--muted)]">
              Día de{" "}
              <span className="font-medium text-[var(--ink)]">{sky.caracas.dayLength}</span>
            </p>
          </li>
          <li className={statItemClass}>
            <p className="font-serif text-xl text-[var(--ink)]">{sky.lima.label}</p>
            <p className="mt-3 font-serif text-2xl tabular-nums text-[var(--ink)]">
              {sky.lima.sunrise}
              <span className="mx-1 text-[var(--muted)]">·</span>
              {sky.lima.sunset}
            </p>
            <p className="mt-2 text-xs leading-snug text-[var(--muted)] sm:text-sm">
              amanecer y atardecer (hora local)
            </p>
            <p className="mt-3 text-sm text-[var(--muted)]">
              Día de{" "}
              <span className="font-medium text-[var(--ink)]">{sky.lima.dayLength}</span>
            </p>
          </li>
        </ul>
      </motion.div>

      <p className="text-center font-serif text-lg leading-relaxed text-[var(--ink)]">
        El cielo seguía su ritmo; tú estabas ocupada cambiando la vida para siempre.
      </p>
    </section>
  );
}
