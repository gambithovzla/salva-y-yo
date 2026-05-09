import { HeroSection } from "@/components/HeroSection";
import { HomeTabs } from "@/components/HomeTabs";
import { SalvadorLaugh } from "@/components/SalvadorLaugh";
import { ScrollFloatDecor } from "@/components/ScrollFloatDecor";
import { SongPlayerProvider } from "@/components/SongPlayerContext";
import {
  coupons,
  galleryItems,
  getMotherhoodStartIso,
  letter,
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
        <SalvadorLaugh clip={salvadorLaugh} />
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
