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
  heroTitle: "Gracias por convertirte en el corazón de nuestro hogar",
  heroLead: `Esta pequeña web nació para celebrarte:
las noches que entregaste sin pedir nada,
los recuerdos que ya empezamos a construir
y el amor inmenso con el que le diste un hogar a nuestra familia.

Aquí guardamos momentos, palabras y regalos que el tiempo no podrá borrar jamás.`,
  /** Pie de página — bloques para poder dar ritmo visual sin cambiar el mensaje. */
  footerEmphasis: "Hecho con amor",
  footerLead: "para los dos amores de mi vida:",
  footerClosing: "mi compañera incondicional y mi hijo.",
} as const;

/**
 * Página reservada `/para-abuela`: no enlazada desde la home; solo quien reciba el URL.
 */
export const abuelaExclusiveCopy = {
  metaTitle: "Para abuela",
  eyebrow: "Exclusivo",
  title: "Solo para ti, abuela",
  lead:
    "Esta página no aparece en el menú del regalo principal: es un espacio aparte para que veas, con calma, los momentos de Salvador contigo. Solo entra quien tú invites con el enlace.",
  galleryEyebrow: "Tu nieto y tú",
  galleryTitle: "Recuerdos juntos",
  gallerySubtitle:
    "Aquí el centro sois vosotros dos; el resto de la familia tiene su propia galería en otro sitio.",
  footerLine: "Con cariño",
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

/** Carta en primera persona de Salvador; foto circular opcional sobre la firma. */
export type LetterFromSalvador = {
  sectionTitle: string;
  /** Si está vacío, no se muestra línea superior. */
  sectionEyebrow: string;
  greeting: string;
  paragraphs: readonly string[];
  signOff: string;
  signatureName: string;
  scribeNote: string;
  /** Miniatura circular (p. ej. recién nacido “tres días”). */
  signaturePhotoSrc: string;
};

export const letterFromSalvador: LetterFromSalvador = {
  sectionTitle: "Carta desde el futuro",
  sectionEyebrow: "",
  greeting: "Mamá:",
  paragraphs: [
    "Todavía no sé escribir con mis propias manos. Apenas estoy aprendiendo a agarrar el mundo poquito a poquito. Por eso hoy papá me presta las suyas, para decirte algo que yo ya siento desde antes de entender las palabras: contigo todo se siente seguro.",
    "Tu voz es el sonido donde descanso. Tu pecho es el lugar donde el miedo desaparece. Y cuando me abrazas, aunque yo todavía no lo pueda explicar, mi corazón entiende que estoy exactamente donde debo estar.",
    "Tal vez ahora soy muy pequeño para recordarlo todo algún día. Pero quiero que esta carta quede aquí, para que nunca olvides cuánto amor ya vive en mí gracias a ti. Porque mientras tú me enseñas a conocer el mundo, yo estoy aprendiendo que el amor tiene tu cara, tu olor y tus brazos.",
    "Gracias por las noches en las que no dormiste para cuidarme. Gracias por cantarme aunque estuvieras cansada. Gracias por besarme la frente como si con eso pudieras protegerme de todo.",
    "Te amo, mamá. Y cuando sea grande, espero parecerme un poquito a la forma tan bonita en la que tú amas.",
  ],
  signOff:
    "Con todo mi amor de bebé —ese que todavía habla más con abrazos que con palabras—,",
  signatureName: "Salvador",
  scribeNote:
    "Dictado con los dedos de papá, porque los míos todavía están demasiado ocupados descubriendo el mundo.",
  signaturePhotoSrc:
    "/Salvador y Chely/Salvador con su foto mas hermosa de recien nacido, durmiendo, 3 dias de nacido.jpeg",
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
    message: `Aquí hay uno enorme esperándote, de esos que sostienen sin apuro y hacen sentir que todo va a estar bien.

No tienes que pedir permiso para necesitar cariño, descanso o un poco de calor humano. Incluso las personas más fuertes necesitan un lugar donde sentirse cuidadas.

Y cuando eso pase, recuerda esto: siempre tendrás nuestros brazos, nuestro amor y este hogar para volver a respirar tranquila.`,
  },
  {
    id: "por-que-te-elegi",
    trigger: "Ábrelo cuando quieras recordar por qué te elegí",
    message: `Te elegí por tu risa sincera, esa que vuelve liviano hasta el día más difícil.
Por tu manera de amar sin hacer ruido, pero dejando huellas en todo lo que tocas.
Por tu fuerza tranquila, la que sostiene incluso cuando nadie la ve.

Te elegí porque contigo cualquier lugar se siente hogar.
Porque aún en el cansancio sigues teniendo ternura.
Y porque desde que llegaste a mi vida, nunca más me sentí solo.

No fue una elección de un momento.
Es una decisión que mi corazón vuelve a tomar, todos los días.`,
  },
  {
    id: "suficiente",
    trigger: "Ábrelo cuando sientas que no eres suficiente",
    message: `En los días cansados es fácil olvidar todo lo que haces, todo lo que sostienes y todo el amor que entregas incluso cuando ya no te queda energía. Pero quiero que recuerdes algo: tú ya eres suficiente, incluso en tus días más difíciles.

No necesitas hacerlo perfecto para ser una mamá maravillosa.
No necesitas tener todas las respuestas para ser el lugar más seguro de nuestro mundo.

Salvador y yo tenemos la inmensa suerte de tenerte. Y eso no es casualidad.
Porque tu amor se nota en cada abrazo, en cada desvelo, en cada pequeño gesto que llena esta casa de calma.

A veces tú solo ves el cansancio.
Nosotros vemos a la mujer que sostiene una familia con el corazón.`,
  },
  {
    id: "dia-dificil",
    trigger: "Ábrelo cuando tengas un día difícil",
    message: `Respira un momento, amor. No tienes que cargar el mundo entero tú sola.

Ya sobreviviste al 100 % de los días que pensaste que te iban a romper. Y aun así, aquí sigues: amando, cuidando y sosteniendo esta familia incluso cuando estás cansada.

Está bien si hoy no puedes con todo.
Está bien si necesitas descansar, llorar un rato o simplemente quedarte en silencio.

Nosotros también queremos cuidarte.
Déjanos abrazarte, ayudarte y recordarte que no tienes que ser fuerte todo el tiempo.

Y si hoy el día pesa demasiado, recuerda esto: para Salvador y para mí, sigues siendo el lugar más bonito al que volver.`,
  },
  {
    id: "reir",
    trigger: "Ábrelo cuando quieras reírte un rato",
    message: `Imagínate a Salvador haciendo una de sus futuras travesuras: seguramente con cara de inocente mientras destruye algo importante. Y después imagínanos a nosotros tratando de mantener la seriedad… sin lograrlo.

Ahora piensa en tu risa. Sí, esa que empieza chiquita y termina contagiándolo todo. La misma que me desarma incluso en los días más pesados.

Hay algo muy bonito en cómo te ríes: por un momento, todo parece más simple y más vivo.

Así que vuelve pronto a esta carta cuando necesites un respiro.
Prometo seguir buscando maneras de hacerte sonreír, aunque sea diciendo tonterías o sobreviviendo juntos al caos hermoso de ser papás.`,
  },
  {
    id: "calma",
    trigger: "Ábrelo cuando extrañes la calma",
    message: `La calma no siempre vuelve de golpe. A veces regresa despacito: en un té caliente entre el ruido, en una ventana abierta dejando entrar aire nuevo, en tres respiraciones profundas mientras el mundo se queda quieto por un instante.

No te exijas encontrar paz todo el tiempo. También está bien atravesar días desordenados, cansados o llenos de ruido.

Y mientras vuelves a ti poquito a poquito, quiero que recuerdes esto: yo sigo guardando tu espacio.
El lugar donde puedes descansar, bajar la guardia y simplemente ser tú, sin tener que poder con todo.

La calma volverá.
Y cuando llegue, espero estar ahí abrazándote mientras entra otra vez a nuestra vida.`,
  },
  {
    id: "orgullo",
    trigger: "Ábrelo cuando quieras recordar lo orgulloso que estoy de ti",
    message: `Estoy orgulloso de ti de una forma que a veces no sé explicar con palabras.

Orgulloso de cómo amas incluso cuando estás agotada.
De cómo sigues adelante en silencio, sosteniendo cosas que muchas veces nadie nota.
De cada noche difícil que atravesaste por Salvador, de cada abrazo tuyo que convirtió el miedo en tranquilidad.

Te veo más de lo que crees.
Veo el esfuerzo detrás de tu sonrisa, la paciencia detrás del cansancio y el amor inmenso con el que cuidas nuestra familia todos los días.

Y sí, también estoy orgulloso de la mamá en la que te convertiste.
Porque Salvador no solo tiene una gran mamá: tiene una mujer valiente, tierna y extraordinaria a quien admirar toda la vida.`,
  },
  {
    id: "increible",
    trigger: "Ábrelo cuando necesites oír que eres increíble",
    message: `Lo eres. Y no porque tengas que hacerlo todo perfecto, ni porque nunca te canses, ni porque siempre tengas respuestas para todo.

Eres increíble porque amas de verdad.
Porque estás presente incluso en los días difíciles.
Porque haces sentir hogar a las personas que amas.

Hay algo profundamente hermoso en tu manera de cuidar, de abrazar, de quedarte. En cómo sigues dando amor aun cuando el cansancio pesa.

Salvador y yo no necesitamos una mujer perfecta.
Te necesitamos a ti: real, imperfecta, tierna, fuerte… nuestra.

Y créeme, eso vale muchísimo más que cualquier perfección del mundo.`,
  },
  {
    id: "medianoche",
    trigger: "Ábrelo cuando sea medianoche y pienses en nosotros",
    message: `Si alguna noche el reloj marca tarde y nosotros aparecemos en tu mente, no lo ignores. Hay amores que incluso en silencio siguen haciendo luz dentro del corazón.

Imagínanos ahí contigo: una risa bajita en medio de la oscuridad, Salvador dormido en paz y yo pensando en lo afortunados que somos de tenerte en nuestras vidas.

Tal vez el mundo esté callado a esa hora, pero nuestra historia sigue despierta.
Sigue viva en los recuerdos que construimos, en los abrazos que nos esperan y en todo lo que todavía nos falta vivir juntos.

Mira la luna un instante.
Quizá nosotros también la estamos mirando al mismo tiempo, pensando en ti con el mismo amor tranquilo que nunca se apaga.`,
  },
  {
    id: "gracias",
    trigger: "Ábrelo cuando quieras que te diga gracias otra vez",
    message: `Gracias.
Otra vez, y las veces que hagan falta.

Gracias por cada noche en vela en la que pusiste el amor por encima del cansancio.
Por cada abrazo que calmó a Salvador.
Por cada pequeño gesto que sostiene esta familia incluso cuando nadie lo nota.

Gracias por seguir eligiéndonos en los días fáciles y también en los difíciles.
Por decirle “sí” a esta vida juntos una y mil veces, incluso cuando daba miedo, incluso cuando todo era nuevo.

A veces quizás sientas que haces cosas pequeñas.
Pero desde este lado, lo que haces se ve enorme.
Porque construyes hogar en cada detalle.

Y quiero que nunca dudes de esto:
nuestra vida es más bonita porque tú estás en ella.`,
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
