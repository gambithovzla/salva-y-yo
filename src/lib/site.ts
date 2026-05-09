/**
 * Personaliza aquí: fecha/hora del nacimiento de Salvador (tu zona horaria local).
 * También puedes definir NEXT_PUBLIC_MOTHERHOOD_START en .env.local (tiene prioridad).
 * Ejemplo: 2024-03-15T14:32:00-05:00
 */
export const motherhoodStartFallbackIso = "2024-01-01T00:00:00.000Z";

export function getMotherhoodStartIso(): string {
  return (
    process.env.NEXT_PUBLIC_MOTHERHOOD_START ?? motherhoodStartFallbackIso
  );
}

export const siteCopy = {
  pageTitle: "Para mamá — Salvador",
  shortName: "Mamá & Salvador",
  heroEyebrow: "Tu primer Día de la Madre",
  heroTitle: "Gracias por ser nuestra casa",
  heroLead:
    "Esta es una pequeña web hecha con amor para celebrarte: el tiempo que llevas siendo mamá, los momentos que guardamos y los regalos que nunca caducan.",
} as const;

export type GalleryItem = {
  /** Ruta bajo /public, ej. /gallery/ejemplo.jpg */
  src: string;
  caption: string;
};

/** Añade archivos en public/gallery/ y actualiza esta lista. */
export const galleryItems: GalleryItem[] = [
  // { src: "/gallery/salvador-1.jpg", caption: "Tu primera sonrisa" },
];

export const letter = {
  title: "Una carta para ti",
  greeting: "Amor mío,",
  paragraphs: [
    "Hoy quiero detenernos un segundo en todo lo que ya has dado: las noches en vela, las risas de Salvador, la calma que inventas cuando el día se complica. Ser mamá no es un título, es una forma de amar con las manos y con el alma.",
    "Gracias por ser el refugio de nuestra familia. Salvador tiene la suerte enorme de tenerte, y yo también.",
    "Feliz primer Día de la Madre. Te queremos.",
  ],
  signOff: "Con todo mi cariño,",
  signature: "Salvador & yo",
} as const;

export type Coupon = {
  id: string;
  title: string;
  detail: string;
};

export const coupons: Coupon[] = [
  {
    id: "rest",
    title: "Vale por una siesta ininterrumpida",
    detail: "Tú eliges el día y la duración. Nosotros cubrimos el resto.",
  },
  {
    id: "meal",
    title: "Vale por la cena que tú quieras",
    detail: "Restaurante o casera: tú mandas el menú.",
  },
  {
    id: "solo",
    title: "Vale por tiempo solo para ti",
    detail: "Un baño largo, un café tranquilo, un paseo… sin prisas.",
  },
  {
    id: "massage",
    title: "Vale por masaje o autocuidado",
    detail: "Reservo el momento; tú solo tienes que llegar.",
  },
];
