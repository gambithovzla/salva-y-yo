import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-serif text-2xl text-[var(--ink)]">Sin conexión</p>
      <p className="max-w-md text-[var(--muted)]">
        Cuando vuelva internet, podrás abrir de nuevo este regalo.
      </p>
      <Link
        href="/"
        className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--accent-ink)] transition hover:opacity-90"
      >
        Reintentar
      </Link>
    </div>
  );
}
