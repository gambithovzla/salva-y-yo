"use client";

import { motion } from "framer-motion";
import { Images, Mail, Ticket } from "lucide-react";
import { useState } from "react";
import type { Coupon, GalleryItem, SongForSalvador } from "@/lib/site";
import { LoveCoupons } from "@/components/LoveCoupons";
import { MotherhoodCounter } from "@/components/MotherhoodCounter";
import { PhotoGallery } from "@/components/PhotoGallery";
import { LetterSection } from "@/components/LetterSection";
import { SongSection } from "@/components/SongSection";

type Letter = {
  title: string;
  greeting: string;
  paragraphs: readonly string[];
  signOff: string;
  signature: string;
};

type TabId = "momentos" | "cupones" | "carta";

const tabs: { id: TabId; label: string; icon: typeof Images }[] = [
  { id: "momentos", label: "Momentos", icon: Images },
  { id: "cupones", label: "Cupones", icon: Ticket },
  { id: "carta", label: "Carta", icon: Mail },
];

type HomeTabsProps = {
  motherhoodStartIso: string;
  galleryItems: GalleryItem[];
  songForSalvador: SongForSalvador;
  coupons: Coupon[];
  letter: Letter;
};

export function HomeTabs({
  motherhoodStartIso,
  galleryItems,
  songForSalvador,
  coupons,
  letter,
}: HomeTabsProps) {
  const [tab, setTab] = useState<TabId>("momentos");

  return (
    <>
      <nav
        className="sticky top-0 z-30 mx-auto max-w-3xl px-4 pb-4 pt-2 sm:px-6"
        aria-label="Secciones del regalo"
      >
        <div
          role="tablist"
          className="flex gap-1 rounded-2xl bg-[var(--card)] p-1.5 shadow-sm ring-1 ring-[var(--sand)] backdrop-blur-md supports-[backdrop-filter]:bg-[var(--card)]/90"
        >
          {tabs.map(({ id, label, icon: Icon }) => {
            const selected = tab === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${id}`}
                id={`tab-${id}`}
                onClick={() => setTab(id)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-medium transition sm:px-4 sm:text-base ${
                  selected
                    ? "bg-[var(--accent)] text-[var(--accent-ink)] shadow-sm"
                    : "text-[var(--muted)] hover:bg-[var(--sand)]/60 hover:text-[var(--ink)]"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden />
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="mx-auto max-w-3xl space-y-24 px-6 pb-28">
        {tab === "momentos" ? (
          <motion.div
            key="momentos"
            role="tabpanel"
            id="panel-momentos"
            aria-labelledby="tab-momentos"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-24"
          >
            <section aria-labelledby="counter-heading" className="space-y-8">
              <h2
                id="counter-heading"
                className="text-center font-serif text-2xl text-[var(--ink)]"
              >
                Tu tiempo como mamá
              </h2>
              <MotherhoodCounter startIso={motherhoodStartIso} />
            </section>

            <section aria-labelledby="gallery-heading" className="space-y-8">
              <h2
                id="gallery-heading"
                className="text-center font-serif text-2xl text-[var(--ink)]"
              >
                Momentos guardados
              </h2>
              <PhotoGallery items={galleryItems} />
            </section>

            <SongSection song={songForSalvador} />
          </motion.div>
        ) : null}

        {tab === "cupones" ? (
          <motion.div
            key="cupones"
            role="tabpanel"
            id="panel-cupones"
            aria-labelledby="tab-cupones"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            <section aria-labelledby="coupons-heading" className="space-y-8">
              <h2
                id="coupons-heading"
                className="text-center font-serif text-2xl text-[var(--ink)]"
              >
                Cupones de amor
              </h2>
              <p className="text-center text-sm text-[var(--muted)]">
                Toca cada cupón para leerlo; cuando lo uses en la vida real,
                márcalo como canjeado.
              </p>
              <LoveCoupons items={coupons} />
            </section>
          </motion.div>
        ) : null}

        {tab === "carta" ? (
          <motion.div
            key="carta"
            role="tabpanel"
            id="panel-carta"
            aria-labelledby="tab-carta"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <LetterSection letter={letter} />
          </motion.div>
        ) : null}
      </div>
    </>
  );
}
