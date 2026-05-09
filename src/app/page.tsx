import { HomeTabs } from "@/components/HomeTabs";
import { ScrollFloatDecor } from "@/components/ScrollFloatDecor";
import { SongPlayerProvider } from "@/components/SongPlayerContext";
import {
  coupons,
  galleryItems,
  getMotherhoodStartIso,
  letter,
  siteCopy,
  songForSalvador,
} from "@/lib/site";

export default function Home() {
  const motherhoodStartIso = getMotherhoodStartIso();

  return (
    <div className="relative overflow-x-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_#fff,_transparent_55%),radial-gradient(ellipse_at_bottom,_#ebe3d8_0%,_transparent_50%)] opacity-90"
        aria-hidden
      />

      <ScrollFloatDecor />

      <header className="relative z-10 mx-auto max-w-3xl px-6 pb-8 pt-16 text-center sm:pt-24">
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

      <SongPlayerProvider song={songForSalvador}>
        <div className="relative z-10">
          <HomeTabs
            motherhoodStartIso={motherhoodStartIso}
            galleryItems={galleryItems}
            coupons={coupons}
            letter={letter}
          />
        </div>
      </SongPlayerProvider>

      <footer className="relative z-10 border-t border-[var(--sand)] bg-[var(--card)] px-6 py-10 text-center text-xs text-[var(--muted)] backdrop-blur-sm">
        Hecho con amor para los dos amores de mi vida: mi compañera incondicional y
        mi hijo.
      </footer>
    </div>
  );
}
