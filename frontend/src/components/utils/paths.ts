export function normalizePath(url: string) {
  if (!url) return "/";
  return url.replace(/\/+$/, "");
}