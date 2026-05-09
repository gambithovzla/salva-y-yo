import type { Metadata } from "next";
import { PhotoGallery } from "@/components/PhotoGallery";
import { abuelaGalleryItems } from "@/lib/gallery-abuela-items";
import { abuelaExclusiveCopy } from "@/lib/site";

export const metadata: Metadata = {
  title: abuelaExclusiveCopy.metaTitle,
  description:
    "Galería privada de momentos del nieto con su abuela. No indexar en buscadores.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function ParaAbuelaPage() {
  const copy = abuelaExclusiveCopy;

  return (
    <div className="relative min-h-full overflow-x-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_#fff,_transparent_55%),radial-gradient(ellipse_at_bottom,_#ebe3d8_0%,_transparent_50%)] opacity-90"
        aria-hidden
      />

      <main className="mx-auto max-w-3xl px-6 py-14 pb-28 sm:py-20">
        <header className="mb-14 text-center sm:mb-16">
          <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.28em] text-[var(--accent)]">
            {copy.eyebrow}
          </p>
          <h1 className="mt-5 font-serif text-[1.85rem] leading-tight text-[var(--ink)] sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-[1.05rem]">
            {copy.lead}
          </p>
        </header>

        <section aria-labelledby="abuela-gallery-heading" className="space-y-8">
          <div className="text-center">
            <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
              {copy.galleryEyebrow}
            </p>
            <h2
              id="abuela-gallery-heading"
              className="mt-3 font-serif text-2xl text-[var(--ink)] sm:text-3xl"
            >
              {copy.galleryTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              {copy.gallerySubtitle}
            </p>
          </div>

          <PhotoGallery items={abuelaGalleryItems} />
        </section>

        <footer className="mt-16 border-t border-[var(--sand)] pt-10 text-center font-serif text-sm italic text-[var(--muted)]">
          {copy.footerLine}
        </footer>
      </main>
    </div>
  );
}
