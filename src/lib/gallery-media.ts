/** Rutas de galería que deben mostrarse como vídeo (no como imagen). */
export function gallerySrcIsVideo(src: string): boolean {
  return /\.(mp4|webm|ogg|mov)$/i.test(src);
}
