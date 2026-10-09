import type { Breed } from "@/types/content";
export const breeds: Breed[] = [
  {
    "slug": "pomeranian",
    "name": "Pomeranian",
    "index": "01",
    "media": {
      "desktopSrc": "/media/editorial/pomeranian.webp",
      "alt": "Pomeranian",
      "aspectRatio": "4 / 5"
    },
    "published": true,
    "offeredByLumo": true,
    "short": "Küçük bir beden, canlı bir dünya.",
    "introduction": "Kabarık çift katlı tüyleri ve dikkatli ifadesiyle tanınan Pomeranian’ı, bireysel karakteri ve günlük ihtiyaçlarıyla birlikte tanıyın.",
    "categories": [
      {
        "title": "Karakter",
        "text": "Canlı ve çevresine ilgili bir eşlikçi olarak tanınır. Her yavrunun yaklaşımı ve alışkanlıkları farklıdır."
      },
      {
        "title": "Günlük yaşam",
        "text": "Oyun, dinlenme ve birlikte geçirilen zamanı dengeli bir düzende düşünün. Küçük boyutu bakım ve ilgi ihtiyacını ortadan kaldırmaz."
      },
      {
        "title": "Tüy bakımı",
        "text": "Çift katlı tüy yapısı için uygun tarama ve bakım planını profesyonel destekle belirleyin."
      }
    ],
    "sources": [
      {
        "title": "American Kennel Club · Pomeranian",
        "href": "https://www.akc.org/dog-breeds/pomeranian/"
      }
    ],
    "todo": []
  },
  {
    "slug": "toy-poodle",
    "name": "Toy Poodle",
    "index": "02",
    "media": {
      "desktopSrc": "/media/examples/poodle-portrait.webp",
      "alt": "Toy Poodle",
      "aspectRatio": "4 / 5"
    },
    "published": true,
    "offeredByLumo": true,
    "short": "Meraklı bir zihin, yakın bir bağ.",
    "introduction": "Toy Poodle ile yaşam; öğrenmeye, oyuna ve düzenli tüy bakımına zaman ayırmak demek.",
    "categories": [
      {
        "title": "Karakter",
        "text": "Genellikle canlı ve öğrenmeye açıktır. Kısa oyunlar ve bireysel ihtiyaçlarına uygun uğraşlar günlük yaşamı zenginleştirebilir."
      },
      {
        "title": "Birlikte yaşam",
        "text": "Evinizin ritmi, yalnız kalınan süre ve birlikte geçireceğiniz zaman tanışma öncesinde düşünülmelidir."
      },
      {
        "title": "Bakım",
        "text": "Kıvırcık tüyleri düzenli bakım ister. Evde bakım ile profesyonel desteği birlikte planlayın."
      }
    ],
    "sources": [
      {
        "title": "American Kennel Club · Toy Poodle",
        "href": "https://www.akc.org/dog-breeds/poodle-toy/"
      }
    ],
    "todo": []
  },
  {
    "slug": "poodle-turevleri",
    "name": "Poodle Türevleri",
    "index": "03",
    "media": {
      "desktopSrc": "/media/examples/companions-mobile.webp",
      "alt": "Poodle Türevleri",
      "aspectRatio": "4 / 5"
    },
    "published": true,
    "offeredByLumo": true,
    "short": "Her dostun kendine özgü bir hikâyesi.",
    "introduction": "Maltipoo ve diğer Poodle melezlerini isimlerinden önce bireysel ihtiyaçlarıyla değerlendirin. Melezlerde tüy, boyut ve karakter değişkenlik gösterebilir.",
    "categories": [
      {
        "title": "Bireysel farklılıklar",
        "text": "Aile geçmişi hakkında bilgi isteyin. Tek bir isimden hareketle kesin boyut veya karakter beklentisi oluşturmayın."
      },
      {
        "title": "Tüy yapısı",
        "text": "Bakım ihtiyacı yavrunun kendi tüy yapısına göre değerlendirilir. Tüy dökmeme veya alerji garantisi olarak yorumlanmamalıdır."
      },
      {
        "title": "Tanışma",
        "text": "Günlük alışkanlıklarını ve bakım ihtiyaçlarını konuşun; kendi yaşam düzeninizle birlikte değerlendirin."
      }
    ],
    "sources": [],
    "todo": []
  }
];
export const publishedBreeds = breeds.filter(b=>b.published);
