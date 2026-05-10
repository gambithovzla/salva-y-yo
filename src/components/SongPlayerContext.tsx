"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { SongForSalvador } from "@/lib/site";
import { encodePublicPath } from "@/lib/public-url";

export type SongPlayerContextValue = {
  song: SongForSalvador;
  playing: boolean;
  volumePct: number;
  loadError: string | null;
  togglePlay: () => void;
  setVolumePct: (n: number) => void;
  /** Pausa la canción principal (p. ej. antes de reproducir otro clip). */
  pauseMusic: () => void;
};

const SongPlayerContext = createContext<SongPlayerContextValue | null>(null);

function buildAudioCandidates(song: SongForSalvador): string[] {
  const env =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_SONG_AUDIO_SRC
      : undefined;
  const raw = [
    ...(env ? [env] : []),
    song.audioSrc,
    ...(song.audioFallbackSrcs ?? []),
  ];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const r of raw) {
    if (!r || seen.has(r)) continue;
    seen.add(r);
    out.push(encodePublicPath(r));
  }
  return out;
}

export function SongPlayerProvider({
  song,
  children,
}: {
  song: SongForSalvador;
  children: ReactNode;
}) {
  const candidates = useMemo(() => buildAudioCandidates(song), [song]);
  const [srcIndex, setSrcIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volumePct, setVolumePctState] = useState(85);
  const [loadError, setLoadError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const src = candidates[srcIndex] ?? "";

  useEffect(() => {
    const el = audioRef.current;
    if (!el || !src) return;
    el.volume = volumePct / 100;
  }, [volumePct, src]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el || !src) return;

    el.pause();
    el.src = src;
    el.load();
    setLoadError(null);

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onLoaded = () => setLoadError(null);
    const onError = () => {
      setSrcIndex((i) => {
        if (i + 1 < candidates.length) {
          setLoadError(null);
          return i + 1;
        }
        setLoadError(
          "No se pudo cargar el audio. Coloca el archivo en public/Salvador y Chely/ (recomendado: cancion de salvador.mp3).",
        );
        return i;
      });
    };

    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("loadeddata", onLoaded);
    el.addEventListener("error", onError);

    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("loadeddata", onLoaded);
      el.removeEventListener("error", onError);
    };
  }, [src, candidates.length]);

  /**
   * Autoplay en bucle sin avisos: intentos al cargar, al volver a la pestaña/PWA y en cada gesto
   * (sin mostrar UI si el navegador bloquea hasta que haya interacción).
   */
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !src) return;

    let lastTry = 0;
    const tryPlay = () => {
      if (!el.paused) return;
      const now = Date.now();
      if (now - lastTry < 250) return;
      lastTry = now;
      void el.play().catch(() => {
        /* silencioso: políticas de autoplay */
      });
    };

    void el.play().catch(() => {});
    const retryTimer = window.setTimeout(() => tryPlay(), 450);

    const onCanPlay = () => tryPlay();
    el.addEventListener("canplay", onCanPlay, { once: true });
    el.addEventListener("loadeddata", onCanPlay, { once: true });

    const onGesture = () => tryPlay();
    document.addEventListener("pointerdown", onGesture, true);
    document.addEventListener("touchstart", onGesture, {
      capture: true,
      passive: true,
    });
    document.addEventListener("keydown", onGesture, true);

    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", tryPlay);
    window.addEventListener("focus", tryPlay);

    return () => {
      window.clearTimeout(retryTimer);
      el.removeEventListener("canplay", onCanPlay);
      el.removeEventListener("loadeddata", onCanPlay);
      document.removeEventListener("pointerdown", onGesture, true);
      document.removeEventListener("touchstart", onGesture, true);
      document.removeEventListener("keydown", onGesture, true);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", tryPlay);
      window.removeEventListener("focus", tryPlay);
    };
  }, [src]);

  const setVolumePct = useCallback((n: number) => {
    setVolumePctState(Math.max(0, Math.min(100, n)));
  }, []);

  const togglePlay = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    setLoadError(null);
    if (el.paused) {
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, []);

  const pauseMusic = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const value = useMemo(
    (): SongPlayerContextValue => ({
      song,
      playing,
      volumePct,
      loadError,
      togglePlay,
      setVolumePct,
      pauseMusic,
    }),
    [
      song,
      playing,
      volumePct,
      loadError,
      togglePlay,
      setVolumePct,
      pauseMusic,
    ],
  );

  return (
    <SongPlayerContext.Provider value={value}>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        playsInline
        className="absolute h-px w-px overflow-hidden opacity-0"
        aria-hidden
      />
      {children}
    </SongPlayerContext.Provider>
  );
}

export function useSongPlayer(): SongPlayerContextValue {
  const ctx = useContext(SongPlayerContext);
  if (!ctx) {
    throw new Error("useSongPlayer debe usarse dentro de SongPlayerProvider");
  }
  return ctx;
}
