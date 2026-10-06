import type { Award } from "@/types/content";
// TODO: add genuine awards with organisation, event, year and evidence. Set verified only after review.
export const awards: Award[] = [];
export const verifiedAwards = awards.filter((a) => a.verified);
