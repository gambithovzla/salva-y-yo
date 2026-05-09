/**
 * Genera src/lib/gallery-items.ts con orden y pies de foto.
 * Carpeta en public: Salvador y Chely
 */
import fs from "node:fs";
import path from "node:path";

const BASE = "/Salvador y Chely";

/** Orden narrativo + leyenda (no repetir el nombre de archivo literal si es muy largo) */
const ORDERED = [
  ["Chely embarazada.jpeg", "Esperando con el corazón lleno"],
  ["chely embarazada exhibiendo su panza.jpeg", "Tu panza, nuestro mundo"],
  ["chely embarazada luciendo su panza rodeada de plantas.jpeg", "Vida nueva entre plantas"],
  ["chely embarazada con braga amarilla.jpeg", "Brillo de embarazo"],
  ["chely embarazada exhbiendo barriga pintada con una bomba como broma.jpeg", "Humor de mamá"],
  ["chey embarazada en ropa vinotinto.jpeg", "Color vinotinto y promesa"],
  ["foto de la barriga embarazada de chely con osito de peluche al lado.jpeg", "Osito esperando a Salvador"],
  ["foto de chely agarrando la mano de u esposo justo cuando esta dando a luz.jpeg", "El momento en que todo cambia"],
  ["Nacimiento Salva.jpeg", "El día que llegaste"],
  ["salvador en la incubadora con minutos de nacido.jpeg", "Primeros minutos de vida"],
  ["mano de recien nacido de salvador.jpeg", "Manito diminuta"],
  ["salvador recien nacido.jpeg", "Recién nacido, todo por descubrir"],
  ["salvador recien nacido 2.jpeg", "Tan pequeño, tan grande"],
  ["salvador recien nacido 3.jpeg", "Primer suspiros"],
  ["salvador recien nacido 4.jpeg", "Mirada nueva"],
  ["Salvador con su foto mas hermosa de recien nacido, durmiendo, 3 dias de nacido.jpeg", "Tres días de sueño celestial"],
  ["Chely dandole teta a salvador en la clinica mientras la doctora le explica como hacerlo.jpeg", "Primeras lecciones de mamá"],
  ["la primera vez de chely alimentando con teta a salvador.jpeg", "La primera vez que te alimentó"],
  ["chely en la cama de la clinica y salvador en su camita de clinica uno al lado del otro.jpeg", "Lado a lado en la clínica"],
  ["Chely cargando a salva con su bata de clinica en el ultimo dia en cla clinica antes del alta.jpeg", "Último día en la clínica"],
  ["salva en su asiento del carro saliendo de la clinica por primera vez.jpeg", "Primera salida: rumbo a casa"],
  ["salvador bebe tomando teta.jpeg", "Calma y leche"],
  ["salvador amamantandose.jpeg", "Todo lo que necesitas"],
  ["salvador bebe en el pecho de chely dormidito.jpeg", "Dormido en el mejor lugar"],
  ["salvador bebe con la mano como pensativo viendo la teta de chely.jpeg", "Pequeño filósofo"],
  ["chely y salva tomando tete.jpeg", "Tete con calma"],
  ["Salva chely y maximo en la cama salva tomando teta.jpeg", "Familia en la cama"],
  ["close up de manos de salvador agarrando el dedo de chely muy tierna.jpeg", "Tu dedo, su refugio"],
  ["close up de salva bebe durmiendo.jpeg", "Sueño profundo"],
  ["close up de salva con chupon.jpeg", "Chupón y paz"],
  ["salva bebe durmiendo.jpeg", "Ángel dormido"],
  ["salva bebecito de 1 mes con ropa y sueter .jpeg", "Un mes de estilo"],
  ["salva de semana close up viendo la camara.jpeg", "Ya mirando a la cámara"],
  ["salva de semanas tomanto teta.jpeg", "Semanas de ternura"],
  ["foto de salva de menos de 1 mes, levantando la cabeza por primera vez.jpeg", "Primera vez que levantó la cabeza"],
  ["foto artistica de salvador celbrando su primer mes, hecha por chely.jpeg", "Un mes: foto artística"],
  ["foto profesional de salvador celebrando sus 2 meses, tomada por chely.jpeg", "Dos meses: retrato de mamá"],
  ["Chely y Salva esperando su cita en el ginecologo.jpeg", "Salvador con dos meses: nervios y magia"],
  ["salvador de 2 meses serio viendo la camara.jpeg", "Seriedad de modelo"],
  ["Salvador de 2 meses vestido elegante, dormido.jpeg", "Elegancia dormida"],
  ["Salvador de 1 mes con chely cargandolo en su primera invitacion a un cumpleaños.jpeg", "Primera fiesta de cumpleaños"],
  ["Salvador de menos de 1 mes escuchando a Luis miguel.jpeg", "Fan de Luis Miguel desde la cuna"],
  ["salvador flaquito y de semanas con la ropa del real madrid.jpeg", "Del Madrid desde pequeño"],
  ["Salvador en su coche de bebe viendo a la camara.jpeg", "En su trono con ruedas"],
  ["foto de chely acostada en el sofa con salva durmiendo en su pecho, ella esta agotada pero cumpliendo con su rol de madre.jpeg", "Agotada y feliz: mamá"],
  ["salva encima de chely durmiendo en la cama.jpeg", "Durmieron así"],
  ["chely cargando a salvador para qu duerma.jpeg", "En brazos hasta dormir"],
  ["Chely y salva bebe acostado en el pecho de chely chely con cara de agotada.jpeg", "Agotamiento hermoso"],
  ["chely y salva durmiendo chupand dedo.jpeg", "Dedo y sueño"],
  ["salva y chely acostados salva con la pierna encima de chely, solo se ven las piernas de ambos.jpeg", "Piernas entrelazadas"],
  ["foto comica de chely cargando a salvador que se hizo popo y se ve la popo.jpeg", "Momento cómico real"],
  ["Chely y salva foto comica.jpeg", "Risas garantizadas"],
  ["Salva equipado para la guerra (de juguetes).jpeg", "Listo para la batalla de juguetes"],
  ["salva riendo con capucha como el chavo del 8.jpeg", "Risas estilo Chavo"],
  ["Salva riendo con gorra.jpeg", "Con gorra y sonrisa"],
  ["Salva riendo con sombrero.jpeg", "Sombrero y carcajada"],
  ["Salva riendo coqueto.jpeg", "Coqueto y feliz"],
  ["Chely y salva close up mejilla con mejilla riendo a la camara.jpeg", "Mejilla con mejilla"],
  ["Chely y salva sonriendo.jpeg", "Sonrisas juntas"],
  ["chely besando a salva en la mejilla.jpeg", "Beso en la mejilla"],
  ["chely besando a salvador en el malecon, salva con los ojos cerrados.jpeg", "Beso en el malecón"],
  ["Chely cargando a salva en el malecon con el mar de fondo.jpeg", "Mar de fondo, amor de frente"],
  ["chely y salva closeup con el sol iluminandolos.jpeg", "Sol en la piel"],
  ["Ojos de chely y salva.jpeg", "Los mismos ojos"],
  ["chely y salva abrazados .jpeg", "Abrazo que lo dice todo"],
  ["chely y salva en el ascensor 2.jpeg", "Ascensor, segunda toma"],
  ["Chely y salva foto en el ascensor riendo.jpeg", "Risas en el ascensor"],
  ["chely y salva en el carro.jpeg", "Viaje en carro"],
  ["salva con su abuela y chely en retaurante tanta, su primera salida a restaurant.jpeg", "Primera vez en restaurante"],
  ["Chely y salva en un cumpleaños.jpeg", "Cumpleaños en familia"],
  ["Hermosa foto de chely y salva en un cumpleaños.jpeg", "Otro cumple, otra joya"],
  ["chely y salva en navidad vestidos con la misma pijama.jpeg", "Navidad en pijama a juego"],
  ["Salva y chely en el parque en un picnic.jpeg", "Picnic en el parque"],
  ["Chely y salvador foto epica en sombras.jpeg", "Sombras de película"],
  ["Salvador volando en los brazos de chely.jpeg", "Volando en tus brazos"],
  ["salvador volando en los brazos de chely 2.jpeg", "Vuelo número dos"],
  ["Laika (nuestra perra) con salvador en la cama protegiendolo durmiendo.jpeg", "Laika guardián"],
  ["laika protegiendo a salvador mientras duermen ambos (laika es nuestra perra).jpeg", "Laika de guardia"],
  ["maximo (nuestro perro) chely y salvador acostados en el sofa, salva durmiendo en el pecho de chely.jpeg", "Máximo y la siesta familiar"],
  ["selfie chely y salvador 2.jpeg", "Selfie familiar"],
  ["selfie de chely con salvador con capucha.jpeg", "Selfie con capucha"],
  ["selfie salva y chely bistezando ambos.jpeg", "Ambos bostezando"],
  ["Chely y Slava tomando biberon sonriendo.jpeg", "Biberón y sonrisa"],
];

const dir = path.join(process.cwd(), "public", "Salvador y Chely");
const onDisk = new Set(
  fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f)),
);

const lines = [
  `/**`,
  ` * Galería generada desde public/Salvador y Chely`,
  ` * Ejecutar: node scripts/generate-gallery-items.mjs`,
  ` */`,
  ``,
  `import type { GalleryItem } from "./site";`,
  ``,
  `export const galleryItems: GalleryItem[] = [`,
];

const missing = [];
const unused = [...onDisk];

for (const [file, caption] of ORDERED) {
  if (!onDisk.has(file)) {
    missing.push(file);
    continue;
  }
  unused.splice(unused.indexOf(file), 1);
  const src = `${BASE}/${file.split("/").join("/")}`;
  const escSrc = JSON.stringify(src);
  const escCap = JSON.stringify(caption);
  lines.push(`  { src: ${escSrc}, caption: ${escCap} },`);
}

lines.push(`];`);
lines.push(``);

const out = path.join(process.cwd(), "src", "lib", "gallery-items.ts");
fs.writeFileSync(out, lines.join("\n"), "utf8");

console.log(`Wrote ${out} (${ORDERED.length - missing.length} items)`);
if (missing.length) console.warn("Missing files:", missing);
if (unused.length) console.warn("Not in ORDERED (add to script):", unused);
