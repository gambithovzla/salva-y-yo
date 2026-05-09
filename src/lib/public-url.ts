/**
 * Codifica cada segmento del path (espacios, comas, etc.) para URLs de /public.
 * encodeURI no codifica la coma y puede romper imágenes con coma en el nombre.
 */
export function encodePublicPath(path: string): string {
  if (!path.startsWith("/")) {
    return path
      .split("/")
      .filter(Boolean)
      .map((s) => encodeURIComponent(s))
      .join("/");
  }
  const tail = path
    .slice(1)
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return tail ? `/${tail}` : "/";
}
