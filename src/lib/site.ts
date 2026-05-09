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
      "Si el reloj marca tarde y nos tienes en la cabeza: es porque nuestra historia sigue encendida. Imagina una risa suave en la oscuridad y la misma luna mirándonos a todos. También estamos pensando en ti, con cariño que no apaga el reloj.",
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
    title: "Donde nos conocimos — Playa Los Ángeles, La Guaira (Venezuela)",
    lat: 10.6032,
    lng: -66.9325,
    photoSrc: "/Salvador y Chely/donde nos conocimos.jpeg",
    anecdote:
      "La Guaira y esa playa donde empezó todo lo nuestro.",
  },
  {
    id: "nacimiento",
    title: "Donde nació Salvador — Clínica San Felipe, Jesús María (Lima, Perú)",
    lat: -12.0724,
    lng: -77.0325,
    photoSrc:
      "/Salvador y Chely/Salvador con su foto mas hermosa de recien nacido, durmiendo, 3 dias de nacido.jpeg",
    anecdote:
      "Tres días de sueño celestial: tu primer hogar hospitalario y el enclave donde conocimos a Salvador.",
  },
  {
    id: "lugar-favorito",
    title: "Nuestro lugar favorito — Isla Margarita (Venezuela)",
    lat: 10.9658,
    lng: -63.8535,
    photoSrc: "/Salvador y Chely/nuestro lugar favorito, venezuela.jpeg",
    anecdote:
      "Arena, sal y calma: el sitio al que volvemos en la mente cuando queremos felicidad sencilla.",
  },
];

/** Homenaje a quien las acompañó en el embarazo (editar textos o foto en /public). */
export type DoctorThanksBlock = {
  title: string;
  name: string;
  blurb: string;
  photoSrc: string;
  instagramDoctorHandle: string;
  instagramClinicHandle: string;
};

export const doctorThanks: DoctorThanksBlock = {
  title: "Un agradecimiento especial",
  name: "Dra. Yanara Mohtar",
  blurb:
    "Nos acompañó en el embarazo con una calma que lo cambió todo. Lo indispensable: gracias a su rápida acción y a su profesionalismo, mi hijo nació sano y salvo. Gracias por formar parte de esta historia.",
  photoSrc: "/Salvador y Chely/salva con la doctora.jpeg",
  instagramDoctorHandle: "dra.yanaramohtar",
  instagramClinicHandle: "fementidadcentro",
};
