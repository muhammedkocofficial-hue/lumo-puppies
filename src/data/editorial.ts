import type { MediaAsset } from "@/types/content";
// Proposed editorial copy. No factual puppy, health, team or award claims.
export const editorial = {
  hero: {
    title: "Birlikte,",
    accent: "her gün.",
    text: "Yeni bir dost. Birlikte başlayacak bir hayat.",
    plate: "hayata\nbirlikte.",
    label: "LUMO’NUN DÜNYASI",
    caption: "Gerçek kareler yakında",
    scroll: "Hikâyeyi keşfedin",
  },
  intro: {
    title: "İlk bakıştan,",
    accent: "birlikte geçen yıllara.",
    side: "Bir dostla yaşam üzerine",
  },
  chapters: { standard: "01", puppies: "02", breeds: "03" },
  standard: {
    label: "ÖZENİN DÖRT HÂLİ",
    index: "01 — 04",
    visualNote: "Lumo’dan gerçek kareler yakında",
  },
  puppies: {
    label: "PORTRELER",
    emptyTitle: "Bir tanışmaya\nhazırlanıyoruz.",
    emptyAside: "Her birinin\nkendi hikâyesi.",
    emptyCaption: "Portreler yakında",
    link: "Portreyi keşfedin",
  },
  breeds: {
    label: "YAŞAM REHBERİ",
    title: "Her dostun",
    accent: "başka bir ritmi var.",
    photoNote: "Fotoğraf seçkisi hazırlanıyor",
  },
  care: { label: "AÇIKÇA KONUŞALIM", title: "Her soruya", accent: "yer var." },
  about: { label: "LUMO’NUN İÇİNDEN", signature: "Birlikte yaşamı düşünerek." },
  invitation: {
    title: "Bir merhaba.",
    accent: "Bir başlangıç.",
    note: "Lumo ile tanışın",
  },
  archive: { emptyFolio: "Arşiv", caption: "Hikâyeler, kayıtlarıyla." },
  navigation: { label: "LUMO’YU KEŞFEDİN", social: "BAĞLANTIDA KALALIM" },
  footer: { note: "Hayatın içinde, birlikte." },
};
// Illustrative atmosphere images; never health records or evidence.
export const standardMedia: MediaAsset[] = [
  { desktopSrc: "/media/examples/maltese.webp", alt: "Köpek portresi — sağlık kaydı olmayan temsili görsel", width: 800, height: 1000, isExample: true, aspectRatio: "4 / 5" },
  { desktopSrc: "/media/examples/interior.webp", alt: "Dinlenme alanı — temsili yapay zekâ görseli", width: 800, height: 1000, isExample: true, caption: "Günlük yaşamın küçük ayrıntıları", aspectRatio: "4 / 5" },
  { desktopSrc: "/media/examples/bichon.webp", alt: "Köpek portresi — temsili yapay zekâ görseli", width: 800, height: 1000, isExample: true, caption: "Her dostun ayrı bir karakteri", aspectRatio: "4 / 5" },
  { desktopSrc: "/media/examples/companions.webp", alt: "Birlikte duran iki yavru — temsili görsel", width: 1200, height: 800, isExample: true, aspectRatio: "4 / 5" },
];
