"use client";

import { useEffect, useRef } from "react";
import type { OurPlace } from "@/lib/site";
import { encodePublicPath } from "@/lib/public-url";
import "leaflet/dist/leaflet.css";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function OurPlacesMap({
  places,
}: {
  places: readonly OurPlace[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || places.length === 0) return;

    let cancelled = false;

    void import("leaflet").then((Leaflet) => {
      const L = Leaflet.default;
      if (cancelled || !containerRef.current) return;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const map = L.map(el, { scrollWheelZoom: true });
      if (cancelled) {
        map.remove();
        return;
      }
      mapRef.current = map;

      const latLngs = places.map((p) => L.latLng(p.lat, p.lng));
      const bounds = L.latLngBounds(latLngs);

      if (latLngs.length === 1) {
        map.setView(latLngs[0], 14);
      } else {
        map.fitBounds(bounds, { padding: [48, 48], maxZoom: 15 });
      }

      map.whenReady(() => {
        map.invalidateSize();
      });
      requestAnimationFrame(() => {
        map.invalidateSize();
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      places.forEach((p) => {
        const imgUrl = encodePublicPath(p.photoSrc);
        const marker = L.marker([p.lat, p.lng]).addTo(map);
        marker.bindPopup(
          `<div style="min-width:220px;max-width:min(92vw,320px)">
            <strong style="display:block;margin-bottom:6px;font-size:15px;line-height:1.3">${escapeHtml(p.title)}</strong>
            <img src="${imgUrl}" alt="" style="display:block;width:100%;height:auto;max-height:min(48vh,280px);object-fit:contain;object-position:center;background:#f5f0e8;border-radius:10px;margin:8px 0" loading="lazy" decoding="async" />
            <p style="margin:0;font-size:13px;line-height:1.45;color:#333">${escapeHtml(p.anecdote)}</p>
          </div>`,
          { maxWidth: 340, className: "our-place-popup" },
        );
      });
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [places]);

  return (
    <div
      ref={containerRef}
      className="z-0 h-[min(420px,58vh)] w-full overflow-hidden rounded-2xl bg-[var(--sand)]/40 ring-1 ring-[var(--sand)] [&_.leaflet-control-attribution]:text-[10px]"
      role="presentation"
    />
  );
}
