import { HeroSection } from "@/components/HeroSection";
import { HomeTabs } from "@/components/HomeTabs";
import { MusicGestureHint } from "@/components/MusicGestureHint";
import { SalvadorLaugh } from "@/components/SalvadorLaugh";
import { ScrollFloatDecor } from "@/components/ScrollFloatDecor";
import { SongPlayerProvider } from "@/components/SongPlayerContext";
import {
  coupons,
  galleryItems,
  getMotherhoodStartIso,
  letter,
  letterFromSalvador,
  salvadorLaugh,
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

      <HeroSection
        eyebrow={siteCopy.heroEyebrow}
        title={siteCopy.heroTitle}
        lead={siteCopy.heroLead}
      />

      <SongPlayerProvider song={songForSalvador}>
        <MusicGestureHint />
        <div className="relative z-10">
          <HomeTabs
            motherhoodStartIso={motherhoodStartIso}
            galleryItems={galleryItems}
            coupons={coupons}
            letter={letter}
            letterFromSalvador={letterFromSalvador}
          />
        </div>
        <SalvadorLaugh clip={salvadorLaugh} />
      </SongPlayerProvider>

      <footer className="relative z-10 overflow-hidden border-t border-[var(--accent)]/15 bg-gradient-to-b from-[var(--card)] via-[var(--cream)] to-[var(--sand)]/65 px-6 py-12 text-center backdrop-blur-sm">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-1/2 top-8 h-24 w-24 -translate-x-1/2 rounded-full bg-[var(--accent)]/[0.07] blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-lg">
          <p className="font-serif text-lg italic leading-relaxed text-[var(--muted)] sm:text-xl">
            <span className="bg-gradient-to-r from-[var(--accent)] to-[#a88462] bg-clip-text font-semibold not-italic tracking-[0.03em] text-transparent">
              {siteCopy.footerEmphasis}
            </span>
          </p>
          <p className="mt-3 font-sans text-sm font-normal leading-relaxed tracking-[0.06em] text-[var(--muted)] sm:text-[0.95rem]">
            {siteCopy.footerLead}
          </p>
          <p className="mt-4 font-serif text-base italic text-[var(--ink)]/85 sm:text-lg">
            {siteCopy.footerClosing}
          </p>
          <div
            className="mx-auto mt-6 flex justify-center gap-2 text-[var(--accent)]/50"
            aria-hidden
          >
            <span className="h-1 w-1 rounded-full bg-current" />
            <span className="h-1 w-1 rounded-full bg-current opacity-70" />
            <span className="h-1 w-1 rounded-full bg-current opacity-45" />
          </div>
        </div>
      </footer>
    </div>
  );
}
