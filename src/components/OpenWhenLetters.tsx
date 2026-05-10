"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useId, useState } from "react";
import type { OpenWhenLetter } from "@/lib/site";

export function OpenWhenLetters({ items }: { items: OpenWhenLetter[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const headingId = useId();

  return (
    <section
      className="space-y-8"
      aria-labelledby={headingId}
    >
      <div className="space-y-2 text-center">
        <p className="text-3xl" aria-hidden>
          💌
        </p>
        <h2
          id={headingId}
          className="font-serif text-2xl text-[var(--ink)] sm:text-3xl"
        >
          Cartas abiertas cuando…
        </h2>
        <p className="mx-auto max-w-lg text-sm text-[var(--muted)]">
          Toca un sobre para leer la carta. Puedes cerrarla y volver cuando quieras.
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => {
          const open = openId === item.id;
          return (
            <li key={item.id}>
              <motion.article
                layout
                className={`overflow-hidden rounded-2xl border border-[var(--sand)] bg-[var(--card)] shadow-sm transition ring-1 ring-transparent ${
                  open ? "ring-[var(--accent)]/40" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : item.id)}
                  className="flex w-full items-start gap-3 p-4 text-left transition hover:bg-[var(--sand)]/40 sm:p-5"
                  aria-expanded={open}
                  aria-controls={`letter-${item.id}`}
                  id={`trigger-${item.id}`}
                >
                  <span
                    className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/15 text-[var(--accent)]"
                    aria-hidden
                  >
                    <Mail className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium leading-snug text-[var(--ink)]">
                      {item.trigger}
                    </span>
                    <span className="mt-1 block text-xs text-[var(--muted)]">
                      {open ? "Toca para cerrar" : "Toca para abrir"}
                    </span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      id={`letter-${item.id}`}
                      role="region"
                      aria-labelledby={`trigger-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden border-t border-[var(--sand)]"
                    >
                      <div className="space-y-4 px-4 pb-5 pt-3 sm:px-5">
                        {item.message
                          .split(/\n\s*\n/)
                          .map((p) => p.trim())
                          .filter(Boolean)
                          .map((para, i) => (
                            <p
                              key={i}
                              className="whitespace-pre-line font-serif text-base leading-relaxed text-[var(--ink)] sm:text-lg"
                            >
                              {para}
                            </p>
                          ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
