import { NextRequest, NextResponse } from "next/server";
import { CmsError, config, requireAdmin, sessionCookie, supabase } from "@/lib/cms-server";
import { validateEntry } from "@/lib/cms-validation";
import sharp from "sharp";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
function result(data: unknown, status = 200) { return NextResponse.json(data, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } }); }
function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  const expected = process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL).origin : req.nextUrl.origin;
  if (!origin || origin !== expected) throw new CmsError("İstek kaynağı doğrulanamadı.", 403);
}
async function json(req: NextRequest) {
  if (!req.headers.get("content-type")?.startsWith("application/json")) throw new CmsError("Geçersiz istek.", 415);
  const raw = new TextDecoder().decode(await limitedBody(req,100000));
  try { return JSON.parse(raw); } catch { throw new CmsError("Geçersiz içerik.",400); }
}
async function limitedBody(req: NextRequest, max: number) {
  if (Number(req.headers.get("content-length")) > max) throw new CmsError("İçerik çok büyük.",413);
  const reader = req.body?.getReader(); if (!reader) throw new CmsError("İstek boş.",400);
  const chunks: Uint8Array[]=[]; let size=0;
  try { while(true) { const {done,value}=await reader.read(); if(done)break;size+=value.length;if(size>max){await reader.cancel();throw new CmsError("İçerik çok büyük.",413);}chunks.push(value); } } finally {reader.releaseLock();}
  return Buffer.concat(chunks);
}
function failure(error: unknown) { return result({ error: error instanceof CmsError ? error.message : "İşlem tamamlanamadı. Bağlantınızı kontrol edip yeniden deneyin." }, error instanceof CmsError ? error.status : 500); }
export async function GET(_req: NextRequest, ctx: { params: Promise<{ action: string }> }) {
  try {
    const token = await requireAdmin(); const { action } = await ctx.params;
    if (action !== "content") return result({ error: "Bulunamadı" },404);
    const res = await supabase("/rest/v1/content_items?select=*&order=sort_index.asc,created_at.desc",{},token);
    if (!res.ok) throw new CmsError("İçerikler alınamadı.");
    return result(await res.json());
  } catch (error) { return failure(error); }
}
export async function POST(req: NextRequest, ctx: { params: Promise<{ action: string }> }) {
  try {
    sameOrigin(req); const { action } = await ctx.params;
    if (action === "login") {
      const input = await json(req);
      if (typeof input.email !== "string" || typeof input.password !== "string" || input.email.length > 254 || input.password.length > 256) throw new CmsError("E-posta veya şifre geçersiz.",400);
      const res = await supabase("/auth/v1/token?grant_type=password",{ method: "POST", headers: { "Content-Type":"application/json" }, body: JSON.stringify({ email: input.email, password: input.password }) });
      if (!res.ok) throw new CmsError(res.status === 429 ? "Çok fazla deneme. Bir süre sonra tekrar deneyin." : "Giriş yapılamadı. Bilgilerinizi kontrol edin.",res.status === 429 ? 429 : 401);
      const session = await res.json();
      const member = await supabase(`/rest/v1/admin_users?user_id=eq.${encodeURIComponent(session.user.id)}&select=user_id`,{},session.access_token);
      if (!member.ok || !(await member.json()).length) throw new CmsError("Bu hesap için yönetim yetkisi bulunmuyor.",403);
      const response = result({ ok:true });
      response.cookies.set(sessionCookie, session.access_token, { httpOnly:true, secure:process.env.NODE_ENV === "production", sameSite:"strict", path:"/", maxAge:Math.min(session.expires_in || 3600,3600) });
      return response;
    }
    if (action === "logout") { const response = result({ok:true}); response.cookies.set(sessionCookie,"",{maxAge:0,path:"/",httpOnly:true,sameSite:"strict",secure:process.env.NODE_ENV === "production"}); return response; }
    const token = await requireAdmin();
    if (action === "upload") {
      if (Number(req.headers.get("content-length")) > 5*1024*1024) throw new CmsError("Görsel en fazla 5 MB olabilir.",413);
      const bytes = await limitedBody(req,5*1024*1024);
      if (bytes.length > 5*1024*1024) throw new CmsError("Görsel en fazla 5 MB olabilir.",413);
      let image: Buffer;
      try { const meta = await sharp(bytes,{limitInputPixels:24000000}).metadata(); if (!["jpeg","png","webp"].includes(meta.format || "")) throw Error(); image = await sharp(bytes,{limitInputPixels:24000000}).rotate().resize({width:1800,height:1800,fit:"inside",withoutEnlargement:true}).webp({quality:85}).toBuffer(); } catch { throw new CmsError("Geçerli bir JPG, PNG veya WebP görseli seçin.",400); }
      const name = `${crypto.randomUUID()}.webp`;
      const res = await supabase(`/storage/v1/object/lumo-media/${name}`,{method:"POST",headers:{"Content-Type":"image/webp","x-upsert":"false"},body:new Uint8Array(image)},token);
      if (!res.ok) throw new CmsError("Görsel yüklenemedi.");
      return result({src:`${config().url}/storage/v1/object/public/lumo-media/${name}`,alt:""});
    }
    const input = await json(req);
    if (action === "save") {
      let entry; try { entry = validateEntry(input); } catch (error) { throw new CmsError(error instanceof Error ? error.message : "Geçersiz içerik.",400); }
      const id = input.id;
      if (id && !/^[0-9a-f-]{36}$/.test(id)) throw new CmsError("Geçersiz kayıt.",400);
      if (id && typeof input.updated_at !== "string") throw new CmsError("Kayıt sürümü eksik.",400);
      const query = id ? `?id=eq.${id}&updated_at=eq.${encodeURIComponent(input.updated_at)}` : "";
      const res = await supabase("/rest/v1/content_items"+query,{method:id ? "PATCH":"POST",headers:{"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(entry)},token);
      if (res.status === 409) throw new CmsError("Bu bağlantı adı zaten kullanılıyor.",409);
      if (!res.ok) throw new CmsError("Kayıt kaydedilemedi.");
      const rows = await res.json(); if (!rows.length) throw new CmsError("Kayıt başka bir pencerede değişti. Listeyi yenileyin.",409);
      return result(rows[0]);
    }
    if (action === "delete") {
      if (!/^[0-9a-f-]{36}$/.test(input.id || "") || typeof input.updated_at !== "string") throw new CmsError("Geçersiz kayıt.",400);
      const res = await supabase(`/rest/v1/content_items?id=eq.${input.id}&updated_at=eq.${encodeURIComponent(input.updated_at)}`,{method:"DELETE",headers:{Prefer:"return=representation"}},token);
      if (!res.ok) throw new CmsError("Kayıt silinemedi."); if (!(await res.json()).length) throw new CmsError("Kayıt değişti. Listeyi yenileyin.",409);
      return result({ok:true});
    }
    return result({error:"Bulunamadı"},404);
  } catch(error) { return failure(error); }
}
