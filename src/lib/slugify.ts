// src/lib/slugify.ts
export function slugify(s?: string) {
  if (!s) return "unknown";
  return s
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove punctuation
    .replace(/\s+/g, "-") // spaces -> hyphen
    .replace(/--+/g, "-"); // collapse multiple hyphens
}
