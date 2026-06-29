/** Rutas de galería que deben mostrarse como vídeo (no como imagen). */
export function gallerySrcIsVideo(src: string): boolean {
  return /\.(mp4|webm|ogg|mov)$/i.test(src);
}

/**
 * URL lista para usar en <Image>/<video>.
 * - Rutas locales bajo /public (con espacios): se codifican.
 * - URLs absolutas (p. ej. fotos subidas a Vercel Blob): ya vienen
 *   codificadas, así que se devuelven tal cual para no romperlas.
 */
export function gallerySrcUrl(src: string): string {
  return /^https?:\/\//i.test(src) ? src : encodeURI(src);
}

/**
 * Indica si la foto es una subida de la familia, que servimos desde nuestro
 * proxy dinámico /api/gallery/img (reenvía un blob privado). El optimizador
 * de imágenes de Next no procesa bien esa respuesta en streaming —la foto
 * sale rota—, así que estas se muestran con `unoptimized`.
 */
export function gallerySrcIsUploaded(src: string): boolean {
  return src.startsWith("/api/gallery/img");
}
