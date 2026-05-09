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
  /** Pie de página — bloques para poder dar ritmo visual sin cambiar el mensaje. */
  footerEmphasis: "Hecho con amor",
  footerLead: "para los dos amores de mi vida:",
  footerClosing: "mi compañera incondicional y mi hijo.",
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
  /** Ruta principal bajo /public (p. ej. .mp3). */
  audioSrc: string;
  /** Si el navegador no carga la primera, se prueba en orden (.mpeg legado, otro nombre). */
  audioFallbackSrcs?: readonly string[];
};

export const songForSalvador: SongForSalvador = {
  title: "Para Salvador",
  subtitle: "Una canción que le compuse",
  /** Primero el archivo que ya suele estar desplegado; luego .mp3 recomendado para Safari/iOS. */
  audioSrc: "/Salvador y Chely/cancion de salvador.mpeg",
  audioFallbackSrcs: [
    "/Salvador y Chely/cancion de salvador.mp3",
    "/Salvador y Chely/cancion-de-salvador.mp3",
    "/Salvador y Chely/cancion de salvador.m4a",
  ],
};

/** Clip corto de la risa de Salvador — lo más entrañable de la página. */
export type SalvadorLaughClip = {
  /** Texto del sobre antes de abrirlo. */
  envelopeTitle: string;
  envelopeSubtitle: string;
  title: string;
  subtitle: string;
  hint: string;
  audioSrc: string;
  audioFallbackSrcs?: readonly string[];
};

export const salvadorLaugh: SalvadorLaughClip = {
  envelopeTitle: "El mejor sobre de todos",
  envelopeSubtitle: "Para cuando sientas que te faltan fuerzas.",
  title: "La mejor risa del mundo",
  subtitle: "Es la risa de Salvador.",
  hint: "Toca el corazón y escucha lo más bonito que tenemos.",
  audioSrc: "/Salvador y Chely/la-mejor-risa-del-mundo.ogg",
  audioFallbackSrcs: [
    "/Salvador y Chely/la-mejor-risa-del-mundo.mp3",
    "/Salvador y Chely/la-mejor-risa-del-mundo.m4a",
    "/Salvador y Chely/la-mejor-risa-del-mundo.wav",
  ],
};

export const letter = {
  title: "Una carta para ti",
  greeting: "Amor mío,",
  paragraphs: [
    "Hoy quiero detener el tiempo un momento para mirar todo lo que ya has entregado desde que Salvador llegó a nuestras vidas: las noches sin dormir, las veces que te olvidaste de ti para cuidar de él, la ternura con la que conviertes el cansancio en amor y el caos en calma.",
    "Ser mamá no es solo traer una vida al mundo. Es sostenerla cada día con el corazón abierto, incluso cuando nadie ve el esfuerzo. Y tú lo haces de una manera que me deja admirándote en silencio.",
    "Gracias por ser el refugio de nuestra familia. Gracias por cada abrazo que tranquiliza, por cada sonrisa que salva el día y por todo el amor que haces vivir dentro de esta casa. Salvador tiene la suerte inmensa de tenerte como mamá… y yo tengo la suerte de caminar la vida contigo.",
    "Este es tu primer Día de la Madre, pero ya dejaste una huella eterna en nuestras vidas.",
    "Te amamos con todo el corazón.",
  ],
  signOff: "Con todo mi cariño,",
  signature: "el padre de Salvador",
} as const;

/** Carta en primera persona de Salvador; firma simbólica (huella SVG) en el componente. */
export type LetterFromSalvador = {
  sectionTitle: string;
  sectionEyebrow: string;
  greeting: string;
  paragraphs: readonly string[];
  signOff: string;
  signatureName: string;
  scribeNote: string;
};

export const letterFromSalvador: LetterFromSalvador = {
  sectionTitle: "Carta desde el futuro",
  sectionEyebrow: "Escrita como Salvador",
  greeting: "Mamá:",
  paragraphs: [
    "Todavía no sé escribir solito: las letras todavía no me caben en la mano. Pero papá me presta sus dedos para decirte algo que yo ya llevo adentro desde antes de tener palabras: tu olor es mi lugar favorito del mundo.",
    "Cuando me acunas y la casa baja el volumen, yo solo sé que estoy bien. Tu voz me dibuja el sueño; tu pecho es mi mapa; tus manos son el idioma en el que entiendo, sin prisa, que estoy en casa.",
    "Gracias por cada noche en vela que casi nadie ve, por el amor que me das, y por enseñarme qué es querer sin pedirme nada a cambio.",
    "Te amo. Un día, cuando mis manos sepan escribir solas, volveré a esta carta y te prometo recordarte lo mismo que hoy siento: que tú eres mi primer hogar.",
  ],
  signOff: "Con todo mi amor de bebé —el que todavía dice más con el abrazo que con las frases—,",
  signatureName: "Salvador",
  scribeNote:
    "Dictado con los dedos de papá: los míos todavía están ocupados agarrando todo lo que encuentro.",
};

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
  {
    id: "breakfast",
    title: "Vale por desayuno en la cama o brunch sin reloj",
    detail: "El día que digas: yo preparo, sirvo y recojo. Tú solo eliges qué te apetece.",
  },
  {
    id: "movie-night",
    title: "Vale por noche de películas a tu ritmo",
    detail: "Tú eliges la lista; yo encargo el ambiente (y las pausas cuando Salvador lo necesite).",
  },
  {
    id: "chores",
    title: "Vale por ‘yo me encargo hoy’",
    detail:
      "Un día en el que yo me llevo las tareas que más te pesan: cocina, orden, lo que haga falta.",
  },
  {
    id: "micro-escape",
    title: "Vale por escapada corta o medio día solo para ti",
    detail:
      "Salón, café, caminar sin prisa… lo organizamos con tiempo y yo cubro lo que pueda en casa.",
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
      "Si el reloj marca tarde y nos tienes en la cabeza: es porque nuestra historia sigue encendida. Imagina una risa suave en la oscuridad y la misma luna mirándonos a todos. También estamos pensando en ti, con un cariño que no se apaga.",
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
    photoSrc: "/Salvador y Chely/nuestro lugar favorito.jpeg",
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
  /** Variantes de nombre/extension si la primera no carga en el servidor (mayúsculas / .jpg). */
  photoFallbackSrcs?: readonly string[];
  instagramDoctorHandle: string;
  instagramClinicHandle: string;
};

export const doctorThanks: DoctorThanksBlock = {
  title: "Un agradecimiento especial",
  name: "Dra. Yanara Mohtar",
  blurb: `Nos acompañó durante todo el embarazo con una serenidad que nos dio confianza incluso en los momentos de miedo. Pero el día más importante, cuando cada segundo importaba, su rapidez, experiencia y profesionalismo hicieron posible que nuestro hijo llegara al mundo sano y salvo.

Nunca olvidaremos eso.

Gracias por cuidar no solo una vida, sino también el corazón de una familia que estaba naciendo junto a ella. Gracias por formar parte para siempre de nuestra historia.`,
  photoSrc: "/Salvador y Chely/Salva con la doctora.jpeg",
  photoFallbackSrcs: [
    "/Salvador y Chely/salva con la doctora.jpeg",
    "/Salvador y Chely/Salva con la doctora.jpg",
    "/Salvador y Chely/salva con la doctora.jpg",
  ],
  instagramDoctorHandle: "dra.yanaramohtar",
  instagramClinicHandle: "fementidadcentro",
};

/** Pestaña dedicada (contenido editable). */
export type TwoMothersContent = {
  title: string;
  chely: {
    photoSrc: string;
    label: string;
    quote: string;
    imageAlt: string;
  };
  suegra: {
    photoSrc: string;
    label: string;
    quote: string;
    imageAlt: string;
  };
  closing: string;
};

export const twoMothersContent: TwoMothersContent = {
  title: "Dos madres, un mismo amor",
  chely: {
    photoSrc:
      "/Salvador y Chely/Hermosa foto de chely y salva en un cumpleaños.jpeg",
    label: "Chely",
    quote: "La mamá que eligió serlo cada día con Salvador.",
    imageAlt: "Chely con Salvador",
  },
  suegra: {
    photoSrc:
      "/Salvador y Chely/salva con su abuela y chely en retaurante tanta, su primera salida a restaurant.jpeg",
    label: "Abuela de Salva",
    quote: "La mamá que cruzó fronteras para que su hija no estuviera sola.",
    imageAlt: "Abuela de Salva con Chely y Salvador",
  },
  closing:
    "Salvador tiene la suerte de crecer entre dos mujeres valientes. Una que lo trajo al mundo, y otra que dejó su mundo para cuidarlo.",
};
