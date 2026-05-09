"use client";

import { motion } from "framer-motion";
import { Heart, Pause } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { SalvadorLaughClip } from "@/lib/site";
import { encodePublicPath } from "@/lib/public-url";
import { useSongPlayer } from "@/components/SongPlayerContext";

function buildCandidates(clip: SalvadorLaughClip): string[] {
  const raw = [clip.audioSrc, ...(clip.audioFallbackSrcs ?? [])];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const r of raw) {
    if (!r || seen.has(r)) continue;
    seen.add(r);
    out.push(encodePublicPath(r));
  }
  return out;
}

export function SalvadorLaugh({ clip }: { clip: SalvadorLaughClip }) {
  const { pauseMusic } = useSongPlayer();
  const candidates = useMemo(() => buildCandidates(clip), [clip]);
  const [srcIndex, setSrcIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [broken, setBroken] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const src = candidates[srcIndex] ?? "";

  useEffect(() => {
    const el = audioRef.current;
    if (!el || !src) return;

    el.pause();
    el.src = src;
    el.load();

    const onEnded = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => {
      setSrcIndex((i) => {
        const next = i + 1;
        if (next < candidates.length) return next;
        setBroken(true);
        return i;
      });
    };

    el.addEventListener("ended", onEnded);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("error", onError);

    return () => {
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("error", onError);
    };
  }, [src, candidates.length]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el || broken) return;
    if (el.paused) {
      pauseMusic();
      void el.play().catch(() => {});
    } else {
      el.pause();
      el.currentTime = 0;
      setPlaying(false);
    }
  };

  return (
    <motion.section
      id="regalo-risa"
      className="relative z-10 mx-auto max-w-lg px-6 pb-8 pt-2 sm:pb-10"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[var(--accent)]/[0.14] via-[var(--cream)] to-[var(--sand)]/40 px-8 py-10 text-center shadow-[0_24px_70px_-40px_rgba(90,60,40,0.28)] ring-1 ring-[var(--accent)]/25">
        <div
          className="pointer-events-none absolute -left-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[var(--accent)]/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-12 bottom-0 h-32 w-32 rounded-full bg-[var(--accent)]/15 blur-2xl"
          aria-hidden
        />

        <p className="relative font-serif text-2xl leading-snug text-[var(--ink)] sm:text-[1.65rem]">
          {clip.title}
        </p>
        <p className="relative mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
          {clip.subtitle}
        </p>

        <div className="relative mt-10 flex justify-center">
          <motion.button
            type="button"
            onClick={toggle}
            disabled={broken}
            whileTap={{ scale: 0.94 }}
            className={`relative flex h-36 w-36 touch-manipulation items-center justify-center rounded-full shadow-[0_12px_40px_-12px_rgba(120,80,50,0.45)] ring-4 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] sm:h-40 sm:w-40 ${
              playing
                ? "bg-[var(--accent)] text-[var(--accent-ink)] ring-[var(--accent)]/50"
                : "bg-gradient-to-br from-[var(--accent)] to-[#b8956e] text-[var(--accent-ink)] ring-[var(--accent)]/35 hover:opacity-[0.97]"
            } ${broken ? "cursor-not-allowed opacity-50" : ""}`}
            aria-pressed={playing}
            aria-label={
              playing ? "Pausar la risa de Salvador" : "Escuchar la risa de Salvador"
            }
          >
            {!playing ? (
              <>
                <span className="absolute inset-0 animate-pulse rounded-full ring-2 ring-white/25" />
                <Heart
                  className="relative z-[1] h-16 w-16 fill-current opacity-95 sm:h-[4.25rem] sm:w-[4.25rem]"
                  strokeWidth={1.25}
                  aria-hidden
                />
              </>
            ) : (
              <Pause className="relative z-[1] h-14 w-14 sm:h-16 sm:w-16" aria-hidden />
            )}
          </motion.button>
        </div>

        <p className="relative mt-8 font-serif text-sm italic leading-relaxed text-[var(--muted)] sm:text-base">
          {clip.hint}
        </p>

        {broken ? (
          <p className="relative mt-4 text-xs text-[var(--muted)]">
            No se encontró el audio. Coloca el archivo en{" "}
            <span className="font-medium text-[var(--ink)]">
              public/Salvador y Chely/
            </span>{" "}
            con el nombre configurado en el código.
          </p>
        ) : null}

        <audio ref={audioRef} preload="auto" playsInline className="sr-only" />
      </div>
    </motion.section>
  );
}
