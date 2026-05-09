import { MotherhoodCounter } from "@/components/MotherhoodCounter";
import { PhotoGallery } from "@/components/PhotoGallery";
import { LoveCoupons } from "@/components/LoveCoupons";
import { LetterSection } from "@/components/LetterSection";
import {
  coupons,
  galleryItems,
  getMotherhoodStartIso,
  letter,
  siteCopy,
} from "@/lib/site";

export default function Home() {
  const motherhoodStartIso = getMotherhoodStartIso();

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_#fff,_transparent_55%),radial-gradient(ellipse_at_bottom,_#ebe3d8_0%,_transparent_50%)] opacity-90"
        aria-hidden
      />

      <header className="mx-auto max-w-3xl px-6 pb-12 pt-16 text-center sm:pt-24">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-[var(--muted)]">
          {siteCopy.heroEyebrow}
        </p>
        <h1 className="font-serif text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
          {siteCopy.heroTitle}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
          {siteCopy.heroLead}
        </p>
      </header>

      <main className="mx-auto max-w-3xl space-y-24 px-6 pb-28">
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

        <LetterSection letter={letter} />
      </main>

      <footer className="border-t border-[var(--sand)] bg-[var(--card)] px-6 py-10 text-center text-xs text-[var(--muted)] backdrop-blur-sm">
        Hecho con amor para mamá · Salvador y familia
      </footer>
    </div>
  );
}
