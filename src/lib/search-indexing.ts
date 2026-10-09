import type { ContentEntry } from "@/types/cms";
export function isExamplePuppy(entry: ContentEntry) {
  return entry.kind === "puppy" && (entry.slug.startsWith("ornek-") || /^örnek\s/i.test(entry.payload.title));
}
