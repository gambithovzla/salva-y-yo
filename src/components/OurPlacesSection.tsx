"use client";

import type { OurPlace } from "@/lib/site";
import { OurPlacesMap } from "@/components/OurPlacesMap";

export function OurPlacesSection({ places }: { places: OurPlace[] }) {
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
          Toca los pins del mapa para ver foto y anécdota. Las mismas historias están abajo
          por si prefieres leerlas en lista.
        </p>
      </div>

      <OurPlacesMap places={places} />

      <ul className="grid gap-6 sm:grid-cols-2">
        {places.map((p) => (
          <li
            key={p.id}
            className="overflow-hidden rounded-2xl bg-[var(--card)] shadow-sm ring-1 ring-[var(--sand)]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--sand)]">
              <img
                src={encodeURI(p.photoSrc)}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-2 px-4 py-4">
              <h3 className="font-serif text-xl text-[var(--ink)]">{p.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--muted)]">
                {p.anecdote}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <p className="text-center text-xs text-[var(--muted)]">
        Coordenadas editables en{" "}
        <code className="rounded bg-[var(--sand)] px-1 py-0.5 text-[var(--ink)]">
          src/lib/site.ts
        </code>{" "}
        (latitud y longitud desde Google Maps).
      </p>
    </section>
  );
}
