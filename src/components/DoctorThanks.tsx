"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { DoctorThanksBlock } from "@/lib/site";
import { encodePublicPath } from "@/lib/public-url";

function igUrl(handle: string) {
  return `https://www.instagram.com/${handle.replace(/^@/, "")}/`;
}

export function DoctorThanks({ data }: { data: DoctorThanksBlock }) {
  const headingId = "doctor-thanks-heading";

  return (
    <motion.section
      aria-labelledby={headingId}
      className="mx-auto max-w-2xl rounded-3xl bg-[var(--card)] px-6 py-10 shadow-sm ring-1 ring-[var(--sand)] backdrop-blur-sm sm:px-10 sm:py-12"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2
        id={headingId}
        className="mb-8 text-center font-serif text-2xl text-[var(--ink)] sm:text-3xl"
      >
        {data.title}
      </h2>

      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[220px] shrink-0 overflow-hidden rounded-2xl bg-[var(--sand)] ring-1 ring-[var(--sand)] sm:mx-0">
          <img
            src={encodePublicPath(data.photoSrc)}
            alt={`${data.name} con Salvador`}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1 space-y-5 text-center sm:text-left">
          <p className="font-serif text-xl text-[var(--ink)]">{data.name}</p>
          <p className="text-base leading-relaxed text-[var(--muted)]">
            {data.blurb}
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:items-start">
            <a
              href={igUrl(data.instagramDoctorHandle)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--sand)]/70 px-4 py-2.5 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--sand)] sm:justify-start"
            >
              <ExternalLink className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden />
              Instagram · @{data.instagramDoctorHandle.replace(/^@/, "")}
            </a>
            <a
              href={igUrl(data.instagramClinicHandle)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--sand)]/70 px-4 py-2.5 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--sand)] sm:justify-start"
            >
              <ExternalLink className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden />
              Clínica Fementidad · @{data.instagramClinicHandle.replace(/^@/, "")}
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
