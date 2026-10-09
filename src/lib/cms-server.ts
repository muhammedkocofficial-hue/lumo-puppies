import "server-only";
import { starterPuppies } from "@/data/starter-puppies";
import { cookies } from "next/headers";
import type { ContentEntry, ContentKind } from "@/types/cms";
import { starterPosts } from "@/data/posts";
import { initialAwards } from "@/data/live-awards";
export const sessionCookie = "lumo_admin_session";
export function cmsConfigured() { return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY); }
export class CmsError extends Error { constructor(message: string, public status = 500) { super(message); } }
export function config() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, ""); const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) throw new CmsError("İçerik servisi henüz bağlanmadı.", 503);
  return { url, key };
}
export async function supabase(path: string, init: RequestInit = {}, token?: string) {
  const { url, key } = config();
  const response = await fetch(url + path, { ...init, cache: "no-store", signal: AbortSignal.timeout(15000), headers: { apikey: key, ...(token ? { Authorization: `Bearer ${token}` } : {}), ...init.headers } });
  return response;
}
export async function requireAdmin() {
  const token = (await cookies()).get(sessionCookie)?.value;
  if (!token) throw new CmsError("Oturum açmanız gerekiyor.", 401);
  const user = await supabase("/auth/v1/user", {}, token);
  if (!user.ok) throw new CmsError("Oturumunuz sona erdi. Yeniden giriş yapın.", 401);
  const { id } = await user.json();
  const allowed = await supabase(`/rest/v1/admin_users?user_id=eq.${encodeURIComponent(id)}&select=user_id`, {}, token);
  if (!allowed.ok || !(await allowed.json()).length) throw new CmsError("Bu hesap yönetici değil.", 403);
  return token;
}
export async function getContent(kind: ContentKind): Promise<ContentEntry[]> {
  if (!cmsConfigured()) return kind === "post" ? starterPosts : kind === "award" ? initialAwards : kind === "puppy" ? starterPuppies : [];
  const response = await supabase(`/rest/v1/content_items?kind=eq.${kind}&published=eq.true&select=*&order=sort_index.asc,created_at.desc`);
  if (!response.ok) throw new CmsError("İçerikler şu anda yüklenemiyor.");
  return response.json();
}
export async function getEntry(kind: ContentKind, slug: string) { return (await getContent(kind)).find(p => p.slug === slug); }
