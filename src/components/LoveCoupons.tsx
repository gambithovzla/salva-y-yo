"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Ticket } from "lucide-react";
import type { Coupon } from "@/lib/site";

export function LoveCoupons({ items }: { items: Coupon[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [redeemed, setRedeemed] = useState<Record<string, boolean>>({});

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {items.map((c, i) => {
        const open = openId === c.id;
        const done = redeemed[c.id];

        return (
          <motion.article
            key={c.id}
            layout
            className="relative overflow-hidden rounded-2xl bg-[var(--card)] shadow-sm ring-1 ring-[var(--sand)] backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <button
              type="button"
              onClick={() => setOpenId(open ? null : c.id)}
              className="flex w-full flex-col items-start gap-2 px-6 py-5 text-left transition hover:bg-white/40"
            >
              <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-[var(--muted)]">
                <Ticket className="h-3.5 w-3.5" aria-hidden />
                Cupón
              </span>
              <span className="font-serif text-xl text-[var(--ink)]">
                {c.title}
              </span>
              <span className="text-xs text-[var(--muted)]">
                {open ? "Toca para cerrar" : "Toca para ver el detalle"}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-[var(--sand)]"
                >
                  <div className="space-y-4 px-6 pb-6 pt-2">
                    <p className="text-sm leading-relaxed text-[var(--muted)]">
                      {c.detail}
                    </p>
                    <button
                      type="button"
                      disabled={done}
                      onClick={(e) => {
                        e.stopPropagation();
                        setRedeemed((prev) => ({ ...prev, [c.id]: true }));
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-medium text-[var(--accent-ink)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Sparkles className="h-3.5 w-3.5" aria-hidden />
                      {done ? "Canjeado con amor" : "Marcar como canjeado"}
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </div>
  );
}
