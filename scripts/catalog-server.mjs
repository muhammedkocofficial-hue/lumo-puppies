import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { createHash, randomBytes, randomUUID } from "node:crypto";
import ts from "typescript";
import sharp from "sharp";

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const root = process.env.LUMO_ADMIN_ROOT || project;
const port = Number(process.env.LUMO_ADMIN_PORT || 4174);
const origin = `http://127.0.0.1:${port}`;
const token = randomBytes(32).toString("hex");
const catalogPath = path.join(root, "src/data/puppies.ts");
const publicRoot = path.join(root, "public");
function readModule(name) {
  const source = fs.readFileSync(path.join(root, "src/data", name + ".ts"), "utf8");
  const sandbox = { exports: {} };
  vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, sandbox, { timeout: 1000 });
  return sandbox.exports;
}
const revision = () => createHash("sha256").update(fs.readFileSync(catalogPath)).digest("hex");
function state() { return { puppies: readModule("puppies").puppies, breeds: readModule("breeds").breeds.map(b => ({ slug: b.slug, name: b.name })), revision: revision(), token }; }
function failure(message, status = 400) { throw Object.assign(new Error(message), { status }); }
function text(value, max = 200) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }
function mediaPath(value) {
  if (typeof value !== "string" || !/^\/media\/[a-zA-Z0-9/_-]+\.(webp|jpg|jpeg|png)$/i.test(value)) failure("Geçersiz fotoğraf yolu.");
  const target = path.join(publicRoot, value);
  if (!fs.existsSync(target)) failure("Fotoğraf dosyası bulunamadı.");
  return target;
}
function validate(input, previous = {}) {
  const name = text(input.name, 80), slug = text(input.slug, 90);
  if (!name) failure("Yavrunun adını yazın.");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) failure("Bağlantı adı küçük harf, rakam ve tire içermelidir.");
  const breedSlug = text(input.breedSlug, 80), breedName = text(input.breedName, 80);
  if (breedSlug && !readModule("breeds").breeds.some(b => b.slug === breedSlug)) failure("Irk kaydı bulunamadı.");
  const birthDate = text(input.birthDate, 10);
  if (birthDate && (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate) || !Number.isFinite(Date.parse(birthDate)) || new Date(birthDate).toISOString().slice(0, 10) !== birthDate || birthDate > new Date().toISOString().slice(0, 10))) failure("Geçerli bir doğum tarihi yazın.");
  if (!Array.isArray(input.gallery) || input.gallery.length > 12) failure("En fazla 12 fotoğraf eklenebilir.");
  const gallery = input.gallery.map(a => {
    mediaPath(a.desktopSrc);
    // Only existing source labels can carry through; uploading never fabricates evidence.
    const known = previous.gallery?.find(g => g.desktopSrc === a.desktopSrc);
    return { desktopSrc: a.desktopSrc, alt: text(a.alt, 200) || name + " portresi", width: known?.width || 1200, height: known?.height || 1500, aspectRatio: "4 / 5", ...(known?.isExample ? { isExample: true } : {}), focalPosition: "50% 50%" };
  });
  const introduction = text(input.introduction, 4000), published = input.published === true;
  if (published && (!(breedSlug || breedName) || !introduction || !gallery.length)) failure("Vitrine almak için ırk, tanıtım ve en az bir fotoğraf ekleyin.");
  return { ...previous, name, slug, published, breedSlug, breedName, birthDate, colour: text(input.colour, 80), sex: ["Dişi", "Erkek"].includes(input.sex) ? input.sex : "", status: ["available", "reserved", "home"].includes(input.status) ? input.status : "available", introduction, personality: (Array.isArray(input.personality) ? input.personality : []).map(s => text(s, 60)).filter(Boolean).slice(0, 8), gallery, development: previous.development || [], parents: previous.parents || [], documents: previous.documents || [], todo: previous.todo || [] };
}
function persist(puppies, expected) {
  if (expected !== revision()) failure("Kayıt başka bir pencerede değişti. Listeyi yenileyip yeniden deneyin.", 409);
  const backup = path.join(root, "work/catalog-backups"); fs.mkdirSync(backup, { recursive: true });
  fs.copyFileSync(catalogPath, path.join(backup, `${Date.now()}-${randomUUID()}.ts`));
  const source = 'import type { Puppy } from "@/types/content";\n// Managed by the local Lumo catalogue editor.\nexport const puppies: Puppy[] = ' + JSON.stringify(puppies, null, 2) + ';\nexport const publishedPuppies = puppies.filter((p) => p.published);\n';
  const temp = catalogPath + ".tmp";
  fs.writeFileSync(temp, source); fs.renameSync(temp, catalogPath);
}
async function body(req, max) {
  const parts = []; let size = 0;
  for await (const chunk of req) { size += chunk.length; if (size > max) failure("Dosya çok büyük (fotoğraf başına en fazla 10 MB).", 413); parts.push(chunk); }
  return Buffer.concat(parts);
}
function respond(res, data, status = 200) { res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" }); res.end(JSON.stringify(data)); }
const server = http.createServer(async (req, res) => {
  res.setHeader("Cache-Control", "no-store"); res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' blob:; style-src 'self'; script-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
  try {
    if (req.headers.host !== `127.0.0.1:${port}`) failure("Yalnızca yerel erişim.", 403);
    if (req.headers.origin && req.headers.origin !== origin) failure("Bu kaynaktan erişim kabul edilmedi.", 403);
    const url = new URL(req.url, origin);
    if (req.method === "GET" && url.pathname === "/api/catalog") return respond(res, state());
    if (req.method === "GET" && ["/", "/admin.js", "/admin.css"].includes(url.pathname)) {
      const name = url.pathname === "/" ? "index.html" : url.pathname.slice(1);
      res.setHeader("Content-Type", name.endsWith("html") ? "text/html; charset=utf-8" : name.endsWith("js") ? "text/javascript; charset=utf-8" : "text/css; charset=utf-8");
      return res.end(fs.readFileSync(path.join(project, "scripts/catalog-ui", name)));
    }
    if (req.method === "GET" && url.pathname.startsWith("/media/")) { const file = mediaPath(url.pathname); res.setHeader("Content-Type", "image/" + (path.extname(file) === ".webp" ? "webp" : path.extname(file) === ".png" ? "png" : "jpeg")); return fs.createReadStream(file).pipe(res); }
    if (req.method === "GET" && url.pathname === "/logo.webp") { res.setHeader("Content-Type", "image/webp"); return res.end(fs.readFileSync(path.join(project, "public/brand/lumo-official.webp"))); }
    if (req.method !== "POST") failure("Bulunamadı.", 404);
    if (req.headers["x-lumo-token"] !== token || req.headers.origin !== origin) failure("İşlem doğrulanamadı. Paneli yenileyin.", 403);
    if (url.pathname === "/api/upload") {
      const bytes = await body(req, 10 * 1024 * 1024);
      const instance = sharp(bytes, { limitInputPixels: 40000000 });
      const metadata = await instance.metadata();
      if (!["jpeg", "png", "webp"].includes(metadata.format)) failure("JPG, PNG veya WebP fotoğraf seçin.");
      const name = randomUUID() + ".webp", folder = path.join(publicRoot, "media/uploads"); fs.mkdirSync(folder, { recursive: true });
      const result = await instance.rotate().resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }).webp({ quality: 85 }).toFile(path.join(folder, name));
      return respond(res, { desktopSrc: "/media/uploads/" + name, alt: "", width: result.width, height: result.height });
    }
    if (req.headers["content-type"] !== "application/json") failure("JSON bekleniyor.");
    let data; try { data = JSON.parse((await body(req, 300000)).toString()); } catch { failure("Kayıt okunamadı."); }
    const puppies = readModule("puppies").puppies;
    const index = puppies.findIndex(p => p.slug === data.originalSlug);
    if (url.pathname === "/api/save") {
      if (data.originalSlug && index < 0) failure("Kayıt artık mevcut değil.", 409);
      const puppy = validate(data.puppy, index >= 0 ? puppies[index] : undefined);
      if (puppies.some((p, i) => p.slug === puppy.slug && i !== index)) failure("Bu bağlantı adı başka bir yavruda kullanılıyor.");
      if (index >= 0) puppies[index] = puppy; else puppies.push(puppy);
    } else if (url.pathname === "/api/delete") {
      if (index < 0) failure("Kayıt bulunamadı.", 404); puppies.splice(index, 1);
    } else if (url.pathname === "/api/move") {
      const next = index + (data.direction === "up" ? -1 : 1);
      if (index < 0 || next < 0 || next >= puppies.length) failure("Sıra değiştirilemiyor.");
      [puppies[index], puppies[next]] = [puppies[next], puppies[index]];
    } else failure("Bulunamadı.", 404);
    persist(puppies, data.revision); respond(res, state());
  } catch (error) { respond(res, { error: error.status ? error.message : "İşlem tamamlanamadı. Dosyayı ve bilgileri kontrol edin." }, error.status || 500); if (!error.status) console.error(error.message); }
});
server.listen(port, "127.0.0.1", () => console.log(`Lumo yerel vitrin yönetimi: ${origin}`));
