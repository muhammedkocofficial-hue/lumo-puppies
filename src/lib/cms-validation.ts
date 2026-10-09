import type { ContentKind, ContentPayload } from "@/types/cms";
const kinds = ["puppy", "post", "story", "award"];
export function validateEntry(input: Record<string, unknown>) {
  const fail = (m: string): never => { throw new Error(m); };
  const clean = (v: unknown, max: number) => typeof v === "string" ? v.trim().slice(0, max) : "";
  if (!kinds.includes(String(input.kind))) fail("Geçersiz içerik türü.");
  const slug = clean(input.slug, 100);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail("Bağlantı adı küçük harf, rakam ve tire içermeli.");
  const raw = input.payload as Record<string, unknown>;
  if (!raw || typeof raw !== "object") fail("İçerik eksik.");
  const images = (Array.isArray(raw.images) ? raw.images : []).slice(0, 12).map((image) => {
    const src = clean(image?.src, 1000), alt = clean(image?.alt, 240);
    const project = process.env.SUPABASE_URL?.replace(/\/$/, "");
    const local = /^\/media\/[a-zA-Z0-9/_-]+\.(webp|png|jpg|jpeg)$/.test(src);
    const stored = project && src.startsWith(project + "/storage/v1/object/public/lumo-media/") && !src.includes("..");
    if (!local && !stored) fail("Görsel, bu sitenin medya arşivinden seçilmeli.");
    if (!alt) fail("Görsele kısa bir açıklama yazın.");
    return { src, alt };
  });
  const payload: ContentPayload = { featured: input.kind === "puppy" && raw.featured === true, title: clean(raw.title, 140), description: clean(raw.description, 400), body: clean(raw.body, 30000), images, breed: clean(raw.breed, 80), sex: clean(raw.sex, 20), colour: clean(raw.colour, 80), birthDate: clean(raw.birthDate, 10), status: ["available", "reserved", "home"].includes(String(raw.status)) ? raw.status as ContentPayload["status"] : "available", traits: (Array.isArray(raw.traits) ? raw.traits : []).map(t => clean(t, 40)).filter(Boolean).slice(0, 8), category: clean(raw.category, 80), event: clean(raw.event, 160), year: clean(raw.year, 4) };
  if (!payload.title) fail("Başlık / isim gerekli.");
  if (payload.birthDate && (!/^\d{4}-\d{2}-\d{2}$/.test(payload.birthDate) || Number.isNaN(Date.parse(payload.birthDate)) || payload.birthDate > new Date().toISOString().slice(0,10))) fail("Doğum tarihi geçerli bir geçmiş tarih olmalı.");
  if (input.kind === "puppy" && !["Toy Poodle", "Pomeranian", "Maltipoo", "Poodle melezi"].includes(payload.breed || "")) fail("Bir ırk seçin.");
  if (input.published === true && (!images.length || !payload.description || (input.kind === "post" && !payload.body))) fail("Yayımlamak için açıklama, görsel ve blog için yazı metni gerekli.");
  return { kind: input.kind as ContentKind, slug, payload, published: input.published === true, sort_index: Number.isInteger(input.sort_index) ? Math.max(0, Math.min(Number(input.sort_index),9999)) : 0 };
}
