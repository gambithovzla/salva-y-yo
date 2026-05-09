"use client";

import { motion } from "framer-motion";
import { Music2, Pause, Play, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { SongForSalvador } from "@/lib/site";

export function SongSection({ song }: { song: SongForSalvador }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const src = encodeURI(song.audioSrc);

  const [playing, setPlaying] = useState(false);
  const [volumePct, setVolumePct] = useState(85);
  const [needsGesture, setNeedsGesture] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = volumePct / 100;
  }, [volumePct]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onPause);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onPause);
    };
  }, []);

  /** Intento de autoplay al cargar (muchas PWA/navegadores lo bloquean hasta un gesto). */
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const run = async () => {
      try {
        await el.play();
        setNeedsGesture(false);
      } catch {
        setNeedsGesture(true);
      }
    };
    void run();
  }, []);

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play().then(() => setNeedsGesture(false));
    } else {
      el.pause();
    }
  };

  return (
    <section aria-labelledby="song-heading" className="space-y-6">
      <h2
        id="song-heading"
        className="text-center font-serif text-2xl text-[var(--ink)]"
      >
        Una canción para Salvador
      </h2>
      <motion.div
        className="mx-auto max-w-xl rounded-3xl bg-[var(--card)] px-6 py-8 shadow-sm ring-1 ring-[var(--sand)] backdrop-blur-sm"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <audio
          ref={audioRef}
          src={src}
          preload="auto"
          className="hidden"
          playsInline
        />

        <div className="mb-5 flex items-start gap-3">
          <Music2
            className="mt-1 h-8 w-8 shrink-0 text-[var(--accent)]"
            aria-hidden
          />
          <div>
            <p className="font-serif text-xl text-[var(--ink)]">{song.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
              {song.subtitle}
            </p>
          </div>
        </div>

        {needsGesture ? (
          <p className="mb-4 rounded-xl bg-[var(--sand)]/50 px-4 py-3 text-center text-sm text-[var(--muted)]">
            Pulsa <strong className="text-[var(--ink)]">Reproducir</strong> para
            escuchar: el navegador suele pedir un gesto antes de iniciar el audio.
          </p>
        ) : null}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={togglePlay}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-medium text-[var(--accent-ink)] shadow-sm transition hover:opacity-90"
            aria-pressed={playing}
            aria-label={playing ? "Pausar" : "Reproducir"}
          >
            {playing ? (
              <>
                <Pause className="h-5 w-5" aria-hidden />
                Pausar
              </>
            ) : (
              <>
                <Play className="h-5 w-5" aria-hidden />
                Reproducir
              </>
            )}
          </button>

          <div className="flex flex-1 flex-col gap-2 sm:min-w-[200px]">
            <label className="flex items-center gap-3 text-sm text-[var(--muted)]">
              <Volume2 className="h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden />
              <span className="sr-only">Volumen</span>
              <input
                type="range"
                min={0}
                max={100}
                value={volumePct}
                onChange={(e) => setVolumePct(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--sand)] accent-[var(--accent)]"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={volumePct}
                aria-label="Volumen"
              />
            </label>
            <p className="text-center text-xs text-[var(--muted)] tabular-nums sm:text-left">
              Volumen {volumePct}%
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
