export function assetUrl(path: string | undefined | null): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  
  if (path.startsWith(cleanBase)) {
    return path;
  }
  
  const cleanBaseNoLeading = cleanBase.replace(/^\//, '');
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  if (cleanPath.startsWith(cleanBaseNoLeading)) {
    return `/${cleanPath}`;
  }
  
  return `${cleanBase}${cleanPath}`;
}
