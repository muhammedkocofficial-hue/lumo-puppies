import type { MediaAsset } from "@/types/content";
// Design examples authorised by the owner. Never part of verified awards or puppy inventory.
export const awardExamples: { title: string; subtitle: string; media: MediaAsset }[] = [
  {
    title: "Best in Show",
    subtitle: "2025 · Örnek yarışma derecesi",
    media: { desktopSrc: "/media/examples/award-cup.webp", alt: "Altın kupa — yapay zekâ ile oluşturulmuş temsili ödül görseli", width: 800, height: 1000, isExample: true, aspectRatio: "4 / 5" },
  },
  {
    title: "Best of Breed",
    subtitle: "2024 · Örnek ırk kategorisi",
    media: { desktopSrc: "/media/examples/award-ribbon.webp", alt: "Şampanya tonlarında rozet ve madalya — temsili yapay zekâ görseli", width: 800, height: 1000, isExample: true, aspectRatio: "4 / 5" },
  },
];
export const companionExample: MediaAsset = {
  desktopSrc: "/media/examples/companions.webp", mobileSrc: "/media/examples/companions-mobile.webp",
  alt: "Yan yana oturan iki yavru — gerçek Lumo yavruları olmayan temsili yapay zekâ görseli",
  width: 1200, height: 800, aspectRatio: "3 / 2", mobileAspectRatio: "1 / 1", isExample: true,
};
