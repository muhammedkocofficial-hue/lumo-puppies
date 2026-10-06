const $ = (s) => document.querySelector(s);
const form = $("#editor");
let catalog, originalSlug = "", gallery = [], dirty = false, busy = false;
const field = (name) => form.elements.namedItem(name);
function message(text, error = false) { $("#message").textContent = text; $("#message").className = error ? "error" : "success"; }
function changed() { dirty = true; $("#save-indicator").textContent = "Kaydedilmemiş değişiklikler"; }
function allowed() { return !busy && (!dirty || confirm("Kaydedilmemiş değişiklikler var. Kaydetmeden devam edilsin mi?")); }
function lock(value) { busy = value; form.querySelectorAll("input,select,textarea").forEach(el => { el.disabled = value; }); $("#save").disabled = value; $("#delete").disabled = value; $("#new").disabled = value; $("#refresh").disabled = value; }
async function api(url, data, raw = false) {
  const response = await fetch(url, { method: "POST", headers: { "x-lumo-token": catalog.token, "Content-Type": raw ? "application/octet-stream" : "application/json" }, body: raw ? data : JSON.stringify(data) });
  const result = await response.json(); if (!response.ok) throw Error(result.error || "İşlem tamamlanamadı."); return result;
}
function element(tag, text, cls) { const node = document.createElement(tag); if (text) node.textContent = text; if (cls) node.className = cls; return node; }
function button(text, action, cls) { const node = element("button", text, cls); node.type = "button"; node.addEventListener("click", action); return node; }
function renderList() {
  $("#count").textContent = `${catalog.puppies.length} kayıt · ${catalog.puppies.filter(p => p.published).length} vitrinde`;
  $("#puppy-list").replaceChildren();
  catalog.puppies.forEach((puppy, index) => {
    const row = element("div", "", "record" + (puppy.slug === originalSlug ? " active" : ""));
    const select = button("", () => { if (allowed()) selectPuppy(puppy); }, "record-select");
    if (puppy.gallery[0]) { const img = element("img"); img.src = puppy.gallery[0].desktopSrc; img.alt = ""; select.append(img); }
    const title = element("span"); title.append(element("strong", puppy.name), element("small", puppy.published ? "Vitrinde" : "Taslak")); select.append(title); row.append(select);
    const order = element("div", "", "order");
    for (const [text, direction, disabled] of [["↑", "up", index === 0], ["↓", "down", index === catalog.puppies.length - 1]]) {
      const control = button(text, async () => {
        if (!allowed()) return; lock(true);
        try { catalog = await api("/api/move", { originalSlug: puppy.slug, direction, revision: catalog.revision }); selectPuppy(catalog.puppies.find(p => p.slug === originalSlug)); message("Vitrin sırası kaydedildi."); }
        catch (error) { message(error.message, true); } finally { lock(false); }
      }); control.disabled = disabled; control.setAttribute("aria-label", puppy.name + (direction === "up" ? " yukarı taşı" : " aşağı taşı")); order.append(control);
    }
    row.append(order); $("#puppy-list").append(row);
  });
}
function renderGallery() {
  $("#gallery").replaceChildren();
  gallery.forEach((photo, index) => {
    const card = element("div", "", "photo"), img = element("img"); img.src = photo.desktopSrc; img.alt = photo.alt || "Yavru fotoğrafı";
    const alt = element("input"); alt.value = photo.alt || ""; alt.placeholder = "Fotoğraf açıklaması"; alt.maxLength = 200; alt.setAttribute("aria-label", `Fotoğraf ${index + 1} açıklaması`); alt.oninput = () => { photo.alt = alt.value; changed(); };
    const controls = element("div", "", "photo-controls");
    const previous = button("←", () => { if (busy) return; [gallery[index - 1], gallery[index]] = [gallery[index], gallery[index - 1]]; changed(); renderGallery(); }); previous.disabled = index === 0; previous.setAttribute("aria-label", `Fotoğraf ${index + 1} öne al`);
    const next = button("→", () => { if (busy) return; [gallery[index + 1], gallery[index]] = [gallery[index], gallery[index + 1]]; changed(); renderGallery(); }); next.disabled = index === gallery.length - 1; next.setAttribute("aria-label", `Fotoğraf ${index + 1} arkaya al`);
    const remove = button("Kaldır", () => { if (busy) return; gallery.splice(index, 1); changed(); renderGallery(); }); remove.setAttribute("aria-label", `Fotoğraf ${index + 1} kaldır`);
    controls.append(previous, next, remove); card.append(img, element("p", index === 0 ? "VİTRİN KAPAĞI" : `FOTOĞRAF ${index + 1}`), alt, controls); $("#gallery").append(card);
  });
  if (!gallery.length) $("#gallery").append(element("p", "Henüz fotoğraf eklenmedi."));
}
function selectPuppy(puppy) {
  form.reset(); originalSlug = puppy?.slug || ""; gallery = structuredClone(puppy?.gallery || []); dirty = false;
  for (const name of ["name", "slug", "birthDate", "sex", "colour", "introduction"]) field(name).value = puppy?.[name] || "";
  field("breedName").value = puppy?.breedName || catalog.breeds.find(b => b.slug === puppy?.breedSlug)?.name || "";
  field("personality").value = (puppy?.personality || []).join(", "); field("published").checked = puppy?.published || false; field("status").value = puppy?.status || "available";
  $("#mode").textContent = puppy ? "KAYDI DÜZENLE" : "YENİ KAYIT"; $("#editor-title").textContent = puppy?.name || "Yeni bir dost ekleyin.";
  $("#save-indicator").textContent = puppy ? "Kaydedilmiş kayıt" : "Kaydedilmedi"; $("#delete").hidden = !puppy;
  $("#preview").hidden = !puppy?.published; $("#preview").href = "http://127.0.0.1:3000/yavrular/" + encodeURIComponent(originalSlug) + "/";
  message(""); renderList(); renderGallery();
}
async function load() {
  lock(true);
  try { const response = await fetch("/api/catalog"); if (!response.ok) throw Error("Yönetim servisine bağlanılamadı."); catalog = await response.json(); $("#breeds").replaceChildren(...catalog.breeds.map(b => { const option = element("option"); option.value = b.name; return option; })); selectPuppy(catalog.puppies.find(p => p.slug === originalSlug) || catalog.puppies[0]); }
  catch (error) { message(error.message, true); } finally { lock(false); }
}
form.addEventListener("input", changed);
field("name").addEventListener("input", () => {
  if (originalSlug || field("slug").dataset.manual) return;
  field("slug").value = field("name").value.toLocaleLowerCase("tr").replace(/ı/g, "i").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
});
field("slug").addEventListener("input", () => { field("slug").dataset.manual = "yes"; });
$("#new").onclick = () => { if (!allowed()) return; delete field("slug").dataset.manual; selectPuppy(); field("name").focus(); };
$("#refresh").onclick = () => { if (allowed()) void load(); };
$("#photos").onchange = async (event) => {
  const files = [...event.target.files]; if (!files.length) return;
  if (gallery.length + files.length > 12) { message("En fazla 12 fotoğraf eklenebilir.", true); event.target.value = ""; return; }
  lock(true); message("Fotoğraflar hazırlanıyor…");
  try { for (const file of files) { if (file.size > 10 * 1024 * 1024) throw Error("Her fotoğraf en fazla 10 MB olabilir."); const photo = await api("/api/upload", file, true); photo.alt = field("name").value ? field("name").value + " portresi" : ""; gallery.push(photo); changed(); renderGallery(); } message("Fotoğraflar eklendi. Kaydı tamamlamak için değişiklikleri kaydedin."); }
  catch (error) { message(error.message, true); } finally { event.target.value = ""; lock(false); }
};
form.onsubmit = async (event) => {
  event.preventDefault(); if (busy) return;
  const values = Object.fromEntries(new FormData(form));
  const puppy = { ...values, published: field("published").checked, personality: values.personality.split(",").map(s => s.trim()).filter(Boolean), gallery, breedSlug: catalog.breeds.find(b => b.name.toLocaleLowerCase("tr") === values.breedName.toLocaleLowerCase("tr"))?.slug || "" };
  lock(true); message("Kaydediliyor…");
  try { catalog = await api("/api/save", { puppy, originalSlug, revision: catalog.revision }); selectPuppy(catalog.puppies.find(p => p.slug === puppy.slug)); message(puppy.published ? "Kaydedildi. Yavru vitrinde gösteriliyor." : "Taslak kaydedildi. Vitrinde gösterilmiyor."); }
  catch (error) { message(error.message, true); } finally { lock(false); }
};
$("#delete").onclick = async () => {
  if (busy || !originalSlug || !confirm("Bu yavrunun kaydı silinsin mi? Yüklenen fotoğraf dosyaları korunur.")) return;
  lock(true); try { catalog = await api("/api/delete", { originalSlug, revision: catalog.revision }); selectPuppy(catalog.puppies[0]); message("Kayıt silindi."); } catch (error) { message(error.message, true); } finally { lock(false); }
};
window.addEventListener("beforeunload", event => { if (dirty) { event.preventDefault(); event.returnValue = ""; } });
void load();
