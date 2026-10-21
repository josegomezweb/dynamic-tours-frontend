export function assetUrl(path: string | undefined): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  // Prevent double prefixing if path already starts with cleanBase
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanBase !== '/' && (normalizedPath.startsWith(cleanBase) || normalizedPath.startsWith(cleanBase.replace(/\/$/, '')))) {
    return normalizedPath;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}
