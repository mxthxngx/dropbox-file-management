export function normalizePath(path: string | undefined | null): string {
  if (!path) {
    return "/";
  }
  
  return path.startsWith('/') ? path : `/${path}`;
};