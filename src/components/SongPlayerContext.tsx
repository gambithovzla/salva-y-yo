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

export type SongPlayerContextValue = {
  song: SongForSalvador;
  playing: boolean;
  volumePct: number;
  needsGesture: boolean;
  loadError: string | null;
  togglePlay: () => void;
  setVolumePct: (n: number) => void;
};

const SongPlayerContext = createContext<SongPlayerContextValue | null>(null);

export function SongPlayerProvider({
  song,
  children,
}: {
  song: SongForSalvador;
  children: ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [volumePct, setVolumePctState] = useState(85);
  const [needsGesture, setNeedsGesture] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const audioSrc = useMemo(() => encodeURI(song.audioSrc), [song.audioSrc]);

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
    const onError = () => {
      setLoadError(
        "No se pudo cargar el audio. Comprueba la ruta en /public (idealmente .mp3).",
      );
    };
    const onLoaded = () => setLoadError(null);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onPause);
    el.addEventListener("error", onError);
    el.addEventListener("loadeddata", onLoaded);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onPause);
      el.removeEventListener("error", onError);
      el.removeEventListener("loadeddata", onLoaded);
    };
  }, []);

  /**
   * Autoplay: intento al montar, de nuevo cuando el audio puede reproducirse,
   * y una vez al primer gesto en la página (política iOS/Safari y similares).
   */
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

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
  }, []);

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

  const value = useMemo(
    (): SongPlayerContextValue => ({
      song,
      playing,
      volumePct,
      needsGesture,
      loadError,
      togglePlay,
      setVolumePct,
    }),
    [
      song,
      playing,
      volumePct,
      needsGesture,
      loadError,
      togglePlay,
      setVolumePct,
    ],
  );

  return (
    <SongPlayerContext.Provider value={value}>
      <audio
        ref={audioRef}
        src={audioSrc}
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
