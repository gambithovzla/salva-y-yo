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
  /** Ruta bajo /public, ej. /Salvador y Chely/foto.jpeg */
  src: string;
  caption: string;
};

export { galleryItems } from "./gallery-items";

/**
 * Canción en /public. Cambia la ruta o usa NEXT_PUBLIC_SONG_AUDIO_SRC.
 * En iOS/Safari conviene .mp3 o .m4a; la extensión .mpeg a veces no reproduce bien.
 */
export type SongForSalvador = {
  title: string;
  subtitle: string;
  /** Ruta bajo /public, ej. /audio/cancion.mp3 */
  audioSrc: string;
};

export const songForSalvador: SongForSalvador = {
  title: "Para Salvador",
  subtitle: "Una canción que le compuse",
  audioSrc:
    process.env.NEXT_PUBLIC_SONG_AUDIO_SRC ??
    "/Salvador y Chely/cancion de salvador.mpeg",
};

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

/** Sobres digitales: personaliza los textos aquí. */
export type OpenWhenLetter = {
  id: string;
  trigger: string;
  message: string;
};

export const openWhenLetters: OpenWhenLetter[] = [
  {
    id: "abrazo",
    trigger: "Ábrelo cuando necesites un abrazo",
    message:
      "Aquí va uno enorme, sin soltar pronto. No tienes que pedir permiso para necesitar calor humano.",
  },
  {
    id: "por-que-te-elegi",
    trigger: "Ábrelo cuando quieras saber por qué te elegí",
    message:
      "Por tu risa honesta, tu fuerza silenciosa y cómo haces hogar donde sea que estemos. Te elijo cada día.",
  },
  {
    id: "suficiente",
    trigger: "Ábrelo cuando sientas que no eres suficiente",
    message:
      "Lo eres más de lo que ves en los días cansados. Salvador y yo tenemos la suerte de tenerte; eso no es casualidad.",
  },
  {
    id: "dia-dificil",
    trigger: "Ábrelo cuando tengas un día difícil",
    message:
      "Respira. Ya sobreviviste al 100 % de tus malos días hasta hoy. Descansa cuando puedas; nosotros te cubrimos lo que podamos.",
  },
  {
    id: "reir",
    trigger: "Ábrelo cuando quieras reírte un rato",
    message:
      "Piensa en Salvador haciendo alguna travesura y en una de tus risas que me desarma. Vuelve pronto a esta carta.",
  },
  {
    id: "calma",
    trigger: "Ábrelo cuando extrañes la calma",
    message:
      "La calma volverá en oleadas pequeñas: un té, una ventana abierta, tres respiraciones tuyas. Yo guardo tu espacio.",
  },
  {
    id: "orgullo",
    trigger: "Ábrelo cuando quieras recordar lo orgulloso que estoy de ti",
    message:
      "Estoy orgulloso de cómo amas, de cómo aguantas lo que nadie ve y de la mamá increíble que eres.",
  },
  {
    id: "increible",
    trigger: "Ábrelo cuando necesites oír que eres increíble",
    message:
      "Lo eres. No por ser perfecta, sino por ser real, presente y nuestra.",
  },
  {
    id: "medianoche",
    trigger: "Ábrelo cuando sea medianoche y pienses en nosotros",
    message:
      "También estamos pensando en ti. Duerme si puedes; si no, aquí estamos en espíritu.",
  },
  {
    id: "gracias",
    trigger: "Ábrelo cuando quieras que te diga gracias otra vez",
    message:
      "Gracias por cada noche en vela, cada gesto de amor y por decir sí a esta familia una y mil veces.",
  },
];

/**
 * Coordenadas aproximadas — sustituye lat/lng por las reales en Google Maps.
 * Fotos: rutas bajo /public.
 */
export type OurPlace = {
  id: string;
  title: string;
  lat: number;
  lng: number;
  photoSrc: string;
  anecdote: string;
};

export const ourPlaces: OurPlace[] = [
  {
    id: "conocieron",
    title: "Donde nos conocimos",
    lat: 20.6736,
    lng: -103.344,
    photoSrc: "/Salvador y Chely/Chely y Salva esperando su cita en el ginecologo.jpeg",
    anecdote:
      "El punto de partida de nuestra historia; desde aquí todo cobró sentido.",
  },
  {
    id: "nacimiento",
    title: "Donde nació Salvador",
    lat: 20.6942,
    lng: -103.362,
    photoSrc: "/Salvador y Chely/Nacimiento Salva.jpeg",
    anecdote:
      "El día que el mundo se volvió más grande y más tierno a la vez.",
  },
  {
    id: "cafeteria",
    title: "Nuestra cafetería favorita",
    lat: 20.6712,
    lng: -103.368,
    photoSrc: "/Salvador y Chely/chey embarazada en ropa vinotinto.jpeg",
    anecdote:
      "Donde repetimos la misma orden y seguimos eligiendo el mismo rincón.",
  },
  {
    id: "escapada",
    title: "Última escapada juntos",
    lat: 20.7469,
    lng: -103.452,
    photoSrc:
      "/Salvador y Chely/salva en su asiento del carro saliendo de la clinica por primera vez.jpeg",
    anecdote:
      "Aire nuevo, risas guardadas y ganas de volver a casa siendo nosotros.",
  },
];
