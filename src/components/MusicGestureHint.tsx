"use client";

import { Music2, X } from "lucide-react";
import { useState } from "react";
import { useSongPlayer } from "@/components/SongPlayerContext";

/** Si el navegador bloquea el autoplay, invita a un toque para iniciar la música (visible en cualquier pestaña). */
export function MusicGestureHint() {
  const { needsGesture, playing, togglePlay } = useSongPlayer();
  const [dismissed, setDismissed] = useState(false);

  if (!needsGesture || playing || dismissed) return null;

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-40 w-[min(100%-2rem,22rem)] -translate-x-1/2 px-2">
      <div className="flex items-start gap-3 rounded-2xl border border-[var(--sand)] bg-[var(--card)]/95 px-4 py-3.5 shadow-lg backdrop-blur-md ring-1 ring-[var(--accent)]/15">
        <Music2
          className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]"
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs leading-snug text-[var(--muted)]">
            Tu navegador pide un gesto para reproducir sonido. Pulsa para empezar
            la canción.
          </p>
          <button
            type="button"
            onClick={() => void togglePlay()}
            className="mt-2 w-full rounded-full bg-[var(--accent)] px-4 py-2.5 text-xs font-medium text-[var(--accent-ink)] shadow-sm transition hover:opacity-90"
          >
            Activar música
          </button>
        </div>
        <button
          type="button"
          className="shrink-0 rounded-full p-1 text-[var(--muted)] transition hover:bg-[var(--sand)]/80 hover:text-[var(--ink)]"
          aria-label="Cerrar aviso"
          onClick={() => setDismissed(true)}
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
