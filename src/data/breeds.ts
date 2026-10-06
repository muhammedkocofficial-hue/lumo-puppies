import type { Breed } from "@/types/content";
// Educational examples, NOT a claim of Lumo availability. TODO: confirm the offered breed list.
export const breeds: Breed[] = [
  {
    slug: "toy-poodle",
    media: { desktopSrc: "/media/examples/poodle-portrait.webp", width: 800, height: 1000, aspectRatio: "4 / 5", isExample: true, alt: "Toy Poodle — yapay zekâ ile oluşturulmuş temsili ırk görseli" },
    name: "Toy Poodle",
    index: "01",
    published: true,
    offeredByLumo: false,
    short: "Meraklı bir zihin. Birlikte geçirilen zaman.",
    introduction:
      "Küçük boyutunun ardında öğrenmeye açık, hareketli bir karakter var. Toy Poodle ile yaşamı düşünürken zihinsel uğraşlara ve düzenli tüy bakımına da yer açın.",
    categories: [
      {
        title: "Karakter",
        text: "Genellikle canlı ve öğrenmeye açıktır. Oyun ve kısa eğitim çalışmaları günlük yaşamı zenginleştirebilir.",
      },
      {
        title: "Ev yaşamı",
        text: "Küçük boyutu tek başına kolay bakım anlamına gelmez. Evde ona ayrılan zaman ve günlük rutin önemlidir.",
      },
      {
        title: "Bakım",
        text: "Kıvırcık tüyleri düzenli tarama ve profesyonel bakım gerektirir. Bakımın kapsamını önceden planlayın.",
      },
      {
        title: "Enerji",
        text: "Yaşına uygun yürüyüş, oyun ve zihinsel uğraşlar düşünülmelidir. Yavruya uygun düzeni veterinerinizle belirleyin.",
      },
      {
        title: "Bilmeniz gerekenler",
        text: "Yetişkin boyutu ve kişiliği her köpekte aynı olmaz. Aile yaşamına uyumu, bireysel ihtiyaçları üzerinden değerlendirin.",
      },
    ],
    sources: [
      {
        title: "The Kennel Club — Poodle (Toy)",
        href: "https://www.thekennelclub.org.uk/search/breeds-a-to-z/breeds/utility/poodle-toy",
      },
    ],
    todo: ["Confirm Lumo availability", "Add actual breed portraits"],
  },
  {
    slug: "maltese",
    media: { desktopSrc: "/media/examples/maltese.webp", width: 800, height: 1000, aspectRatio: "4 / 5", isExample: true, alt: "Maltese — yapay zekâ ile oluşturulmuş temsili ırk görseli" },
    name: "Maltese",
    index: "02",
    published: true,
    offeredByLumo: false,
    short: "Yakın bir bağ. Günlük bakıma ayrılan zaman.",
    introduction:
      "Maltese ile yaşam, insanına yakın olmayı seven küçük bir dosta ve düzenli tüy bakımına yer açmak demek. Uzun beyaz tüyleri, günlük bakım planının önemli bir parçasıdır.",
    categories: [
      {
        title: "Karakter",
        text: "Genellikle insanlarla yakın ilişki kuran, oyuncu bir eşlikçidir. Bireysel karakterini tanımaya zaman ayırın.",
      },
      {
        title: "Ev yaşamı",
        text: "Evde sakin bir dinlenme alanı ve tutarlı bir günlük düzen oluşturmayı düşünün.",
      },
      {
        title: "Bakım",
        text: "Uzun tüyleri günlük tarama gerektirebilir. Tüy uzunluğu ve bakım planı birlikte değerlendirilmelidir.",
      },
      {
        title: "Enerji",
        text: "Oyun ve yürüyüşler günlük yaşamın parçasıdır. Süreyi yaşına ve bireysel ihtiyaçlarına göre belirleyin.",
      },
      {
        title: "Bilmeniz gerekenler",
        text: "Küçük bedeni nazik etkileşim gerektirir. Çocuklara köpeğin dinlenme alanına saygı göstermeyi öğretin.",
      },
    ],
    sources: [
      {
        title: "American Kennel Club — Maltese",
        href: "https://www.akc.org/expert-advice/dog-breeds/maltese-right-for-you/",
      },
    ],
    todo: ["Confirm Lumo availability", "Add actual breed portraits"],
  },
  {
    slug: "bichon-frise",
    media: { desktopSrc: "/media/examples/bichon.webp", width: 800, height: 1000, aspectRatio: "4 / 5", isExample: true, alt: "Bichon Frise — yapay zekâ ile oluşturulmuş temsili ırk görseli" },
    name: "Bichon Frisé",
    index: "03",
    published: true,
    offeredByLumo: false,
    short: "Canlı bir eşlikçi. Paylaşılan küçük oyunlar.",
    introduction:
      "Oyuncu ve sosyal eğilimleriyle tanınan Bichon Frisé, birlikte zaman geçirmeyi seven ailelerin araştırabileceği ırklardan biri. Tüy bakımına ayrılan zamanı da bu hayalin bir parçası olarak düşünün.",
    categories: [
      {
        title: "Karakter",
        text: "Genellikle sosyal ve neşelidir. Yeni ortamları ve insanları kendi hızında tanımasına izin verin.",
      },
      {
        title: "Ev yaşamı",
        text: "İnsanlarla etkileşime ve düzenli bir rutine ihtiyaç duyar. Yalnız kalma süresini planlarken bireysel ihtiyaçlarını gözetin.",
      },
      {
        title: "Bakım",
        text: "Yoğun tüy yapısı düzenli tarama ve profesyonel bakım ister. Günlük bakım için zaman ayırın.",
      },
      {
        title: "Enerji",
        text: "Oyun ve yaşına uygun yürüyüşlerle hareket ihtiyacına yer açın.",
      },
      {
        title: "Bilmeniz gerekenler",
        text: "Sosyal bir ırk olması her köpekle veya çocukla otomatik uyum anlamına gelmez. Tanıştırmaları kontrollü yapın.",
      },
    ],
    sources: [
      {
        title: "American Kennel Club — Bichon Frise",
        href: "https://www.akc.org/expert-advice/dog-breeds/bichon-frise/",
      },
    ],
    todo: ["Confirm Lumo availability", "Add actual breed portraits"],
  },
];
export const publishedBreeds = breeds.filter((b) => b.published);
