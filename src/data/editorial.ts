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
{desktopSrc:"/media/editorial/care.webp",alt:"Düzenli bakım için hazırlanmış araçlar",aspectRatio:"4 / 3"},
{desktopSrc:"/media/editorial/home.webp",alt:"Yeni bir dost için hazırlanan yaşam alanı",aspectRatio:"4 / 3"},
{desktopSrc:"/media/examples/campaign-mobile.webp",alt:"Dinlenen küçük bir dost",aspectRatio:"4 / 3"},
{desktopSrc:"/media/editorial/story.webp",alt:"Bir yavruyla sakin bir tanışma",aspectRatio:"4 / 3"}
];
