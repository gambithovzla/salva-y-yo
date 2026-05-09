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
  needsGesture: boolean;
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
  const [needsGesture, setNeedsGesture] = useState(false);
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
    el.addEventListener("ended", onPause);
    el.addEventListener("loadeddata", onLoaded);
    el.addEventListener("error", onError);

    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onPause);
      el.removeEventListener("loadeddata", onLoaded);
      el.removeEventListener("error", onError);
    };
  }, [src, candidates.length]);

  /**
   * Autoplay: intento al montar / al cambiar fuente, canplay, y primer gesto.
   */
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !src) return;

    const tryPlay = async () => {
      try {
        await el.play();
        setNeedsGesture(false);
      } catch {
        setNeedsGesture(true);
      }
    };

    void tryPlay();

    const onCanPlay = () => {
      void tryPlay();
    };
    el.addEventListener("canplay", onCanPlay, { once: true });

    const onFirstGesture = () => {
      void tryPlay();
      document.removeEventListener("pointerdown", onFirstGesture, true);
    };
    document.addEventListener("pointerdown", onFirstGesture, true);

    return () => {
      el.removeEventListener("canplay", onCanPlay);
      document.removeEventListener("pointerdown", onFirstGesture, true);
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
      void el
        .play()
        .then(() => setNeedsGesture(false))
        .catch(() => setNeedsGesture(true));
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
      needsGesture,
      loadError,
      togglePlay,
      setVolumePct,
      pauseMusic,
    }),
    [
      song,
      playing,
      volumePct,
      needsGesture,
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
