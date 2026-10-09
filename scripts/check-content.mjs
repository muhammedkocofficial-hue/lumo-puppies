import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";
const root = process.cwd();
function load(name) {
  const code = ts.transpileModule(
    fs.readFileSync(path.join(root, "src/data", name + ".ts"), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
    },
  ).outputText;
  const sandbox = { exports: {}, process: { env: process.env } };
  vm.runInNewContext(code, sandbox);
  return sandbox.exports;
}
const { site } = load("site");
const { puppies } = load("puppies");
const { breeds } = load("breeds");
const { awards } = load("awards");
const { testimonials } = load("testimonials");
const { team } = load("team");
const { standardMedia } = load("editorial");
const { awardExamples, companionExample } = load("showcase");
const errors = [];
function asset(a, label) {
  if (!a) return;
  if (a.desktopSrc && !a.alt) errors.push(label + ": alt text required");
  for (const key of ["desktopSrc", "mobileSrc"])
    if (
      a[key] &&
      (!a[key].startsWith("/") ||
        !fs.existsSync(path.join(root, "public", a[key])))
    )
      errors.push(label + ": missing local " + key);
}
for (const b of breeds) asset(b.media, b.name);
for (const p of puppies) {
  for (const a of p.gallery) asset(a, p.name);
  if (p.published && (!(p.breedSlug || p.breedName) || !p.introduction || !p.gallery.length))
    errors.push(p.name + ": incomplete published profile");
  if (p.breedSlug && !breeds.some((b) => b.slug === p.breedSlug))
    errors.push(p.name + ": unknown breed");
  for (const d of p.documents.filter((d) => d.verified)) {
    if (!d.description || !d.title)
      errors.push(p.name + ": incomplete verified record");
    asset(d.media, d.title);
  }
}
for (const a of awards.filter((a) => a.verified)) {
  if (!a.organisation || !a.year || (!a.photo && !a.certificate))
    errors.push(a.title + ": award evidence incomplete");
  asset(a.photo, a.title);
  asset(a.trophy, a.title);
}
for (const t of testimonials.filter((t) => t.verified && t.consent)) {
  if (!t.quote || !t.displayName) errors.push("Incomplete family story");
  asset(t.photo, t.displayName);
}
for (const t of team.filter((t) => t.verified)) {
  if (!t.name || !t.role) errors.push("Incomplete team profile");
  asset(t.portrait, t.name);
}
asset(site.heroMedia, "Hero");
asset(site.aboutMedia, "About");
standardMedia.forEach((media, index) => asset(media, "Lumo Standard " + (index + 1)));
awardExamples.forEach((item) => asset(item.media, "Illustrative award: " + item.title));
asset(companionExample, "Illustrative companions");
if (site.url) {
  try {
    const u = new URL(site.url);
    if (u.protocol !== "https:" || u.pathname !== "/")
      errors.push("Production URL must be an HTTPS origin");
  } catch {
    errors.push("Invalid site URL");
  }
}
if (site.launchReady) {
  if (puppies.some(p => p.published && p.isExample)) errors.push("Replace or unpublish fictional puppy profiles before launch");
  if (!Object.values(site.contact).some(Boolean))
    errors.push("Verified contact channel missing");
  if (!site.logo || !fs.existsSync(path.join(root, "public", site.logo)))
    errors.push("Original logo missing");
  if (!site.heroMedia.desktopSrc || !site.heroMedia.mobileSrc)
    errors.push("Real mobile/desktop hero photographs missing");

  if (!breeds.some((b) => b.offeredByLumo))
    errors.push("Actual breed offering unconfirmed");
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  "Content structure valid. " +
    (site.launchReady
      ? "Machine-checkable launch essentials present. Verify factual approval separately."
      : "Launch intentionally disabled; real content TODOs remain."),
);
