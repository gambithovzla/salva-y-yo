"use client";

import type { OurPlace } from "@/lib/site";
import { OurPlacesMap } from "@/components/OurPlacesMap";

export function OurPlacesSection({ places }: { places: readonly OurPlace[] }) {
  const headingId = "lugares-heading";

  return (
    <section className="space-y-8" aria-labelledby={headingId}>
      <div className="space-y-2 text-center">
        <p className="text-3xl" aria-hidden>
          🗺️
        </p>
        <h2
          id={headingId}
          className="font-serif text-2xl text-[var(--ink)] sm:text-3xl"
        >
          Nuestros lugares
        </h2>
        <p className="mx-auto max-w-lg text-sm text-[var(--muted)]">
          Toca cada pin del mapa para ver la foto completa y la anécdota de ese lugar.
        </p>
      </div>

      <OurPlacesMap places={places} />
    </section>
  );
}
