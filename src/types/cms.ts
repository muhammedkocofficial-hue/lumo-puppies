export type ContentKind = "puppy" | "post" | "story" | "award";
export type ContentImage = { src: string; alt: string };
export type ContentPayload = {
  title: string; description: string; images: ContentImage[]; body: string;
  breed?: string; sex?: string; colour?: string; birthDate?: string;
  featured?: boolean;
  status?: "available" | "reserved" | "home"; traits?: string[];
  category?: string; event?: string; year?: string;
};
export type ContentEntry = { id: string; kind: ContentKind; slug: string; published: boolean; sort_index: number; updated_at: string; payload: ContentPayload };
