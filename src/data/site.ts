import type { MediaAsset, Proof } from "@/types/content";
// DEMO COPY: proposed editorial positioning. Owner must approve before launch.
// TODO: verified contact channels, legal identity, actual operating practices, photography, domain.
export const site = {
  name: "Lumo Puppies",
  title: "Lumo Puppies — Birlikte başlayan bir hayat",
  description:
    "Birlikte yaşayacağınız hayatı düşünerek başlayın. Irkları tanıyın, bakım ihtiyaçlarını keşfedin ve Lumo Puppies’i yakından tanıyın.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "",
  launchReady: false,
  logo: "/brand/lumo-official.webp" as string, // Original supplied by the owner; proportions preserved.
  contact: { whatsapp: "", phone: "", instagram: "", messenger: "", email: "" },
  legal: { companyName: "", address: "", registration: "" },
  heroMedia: {
    desktopSrc: "/media/examples/campaign-wide.webp",
    mobileSrc: "/media/examples/campaign-mobile.webp",
    width: 1536, height: 672, isExample: true,
    alt: "Keten koltukta dinlenen Toy Poodle — yapay zekâ ile oluşturulmuş temsili kampanya görseli",
    caption: "Lumo’dan gerçek karelerle buluşmak üzere.",
    mobileAspectRatio: "1 / 1",
    aspectRatio: "16 / 7",
    mobileFocalPosition: "50% 50%",
    focalPosition: "50% 50%",
  } as MediaAsset,
  aboutMedia: {
    desktopSrc: "/media/examples/interior.webp",
    width: 800, height: 1000, isExample: true,
    alt: "Yeni bir dost için hazırlanmış sakin bir ev köşesi — yapay zekâ ile oluşturulmuş temsili görsel",
    caption: "Lumo’nun dünyasından kareler yakında.",
  } as MediaAsset,
  hero: {
    eyebrow: "LUMO PUPPIES",
    title: "Birlikte başlayan",
    titleAccent: "bir hayat.",
    caption: "01 — LUMO’NUN DÜNYASI",
    text: "Küçük bir dost. Değişen bir günlük hayat. Her şey, birbirinizi tanımakla başlar.",
    primary: "Yavrularımızı keşfedin",
    secondary: "Lumo’yu tanıyın",
    mediaLabel: "BİRLİKTE, HER GÜN",
    mediaTitle: "Hayatta yer açtığınız, kalbinizde yer bulur.",
    mediaNote: "Fotoğraf seçkisi hazırlanıyor",
  },
  intro: {
    eyebrow: "LUMO’YA HOŞ GELDİNİZ",
    title: "Sadece ilk bakışı değil, sonraki yılları da düşünmek.",
    text: "Bir yavruyla hayatı paylaşmak, onun ihtiyaçlarına da yer açmak demek. Bu yüzden başlangıç noktamız görünüşten önce günlük yaşam: ayırabileceğiniz zaman, evinizin ritmi ve birlikte kuracağınız bağ.",
    link: "Hikâyemizi keşfedin",
  },
  standard: {
    eyebrow: "LUMO STANDARDI",
    title: "Özen, ayrıntılarda başlar.",
    text: "Birlikte yaşamı düşünürken dört temel konu. Her yavru için sorulması, konuşulması ve anlaşılması gerekenler.",
    link: "Standardı inceleyin",
    note: "Bu ilkeler yaklaşımımızı anlatır. Yavruya ait bakım ve sağlık bilgileri, yalnızca doğrulanmış kayıtlarla paylaşılır.",
  },
  principles: [
    {
      title: "Sağlık",
      subtitle: "Bilgi, kaynağıyla birlikte.",
      text: "Bir sağlık bilgisini değerlendirirken belgenin tarihini, düzenleyen kişiyi ve hangi yavruya ait olduğunu birlikte inceleyin.",
    },
    {
      title: "Bakım",
      subtitle: "Günlük yaşamın küçük ayrıntıları.",
      text: "Beslenme, dinlenme, tüy bakımı ve oyun. Eve hazırlık, bir yavrunun günlük ihtiyaçlarını anlamakla başlar.",
    },
    {
      title: "Karakter",
      subtitle: "Her yavruyu kendi hâliyle tanımak.",
      text: "Irk özellikleri bir başlangıçtır. Yavrunun gözlemlenen davranışları ve sizin yaşam düzeniniz ayrıca değerlendirilmelidir.",
    },
    {
      title: "İletişim",
      subtitle: "Sorulara yer açmak.",
      text: "Karar vermeden önce aklınızdakileri konuşun. Bakım düzeni, mevcut belgeler ve sonraki adımların açık olması önemlidir.",
    },
  ],
  breeds: {
    eyebrow: "IRKLARI TANIYIN",
    title: "Sizin hayatınızda\nnasıl bir yeri olacak?",
    text: "Her ırkın farklı bir ritmi var. Görünüşün ötesine bakın; karakterini, bakımını ve günlük ihtiyaçlarını tanıyın.",
    link: "Tüm ırk rehberleri",
    note: "Bu sayfalar genel ırk rehberidir. Lumo’daki güncel ırk ve yavru bilgileri ayrıca paylaşılır.",
  },
  puppies: {
    eyebrow: "YAVRULARIMIZ",
    title: "Her tanışma,\nbaşka bir hikâye.",
    text: "Bir ismin, bir bakışın ve küçük alışkanlıkların ardındaki dostu tanıyın.",
    emptyTitle: "Tanışmak için biraz zaman.",
    emptyText:
      "Yavrularımızın güncel portreleri ve bilgileri hazırlanıyor. Yeni bir dosta yer açarken ırk rehberlerimizi keşfedebilirsiniz.",
    emptyAction: "Irkları tanıyın",
    detailPending: "Taco’yu tanımak için biraz zaman.",
    detailText:
      "Taco’nun fotoğrafları ve doğrulanmış bilgileri henüz paylaşılmadı.",
    link: "Yavrularımızı tanıyın",
  },
  care: {
    eyebrow: "BAKIM & ŞEFFAFLIK",
    title: "Sorularınızın\nyeri var.",
    text: "Sağlık kayıtları, günlük bakım, aile bilgileri… Bir yavruyu tanımak, onun yaşamını anlamaktan geçer. Neyi sormanız gerektiğini bilerek başlayın.",
    link: "Merak edilenler",
  },
  archive: {
    eyebrow: "LUMO ARŞİVİ",
    title: "Başarılarımız",
    emptyTitle: "Bir arşiv, gerçek hikâyelerle oluşur.",
    emptyText: "Paylaşılacak doğrulanmış bir başarı kaydı henüz bulunmuyor.",
    link: "Arşivi keşfedin",
  },
  families: { eyebrow: "LUMO AİLESİ", title: "Hayatın içinden, birlikte." },
  about: {
    eyebrow: "HAKKIMIZDA",
    title: "Aynı evde,\nyeni bir hayat.",
    text: "Lumo Puppies’in odağında, insanlarla köpeklerin birlikte kurduğu günlük hayat var. Bir ırkı tanımak, bir yavruyu anlamak ve bu sorumluluğa hazırlanmak için sakin bir başlangıç.",
    peopleTitle: "Lumo’nun arkasındaki insanlar",
    peopleEmpty:
      "Ekibimiz ve yaşam alanlarımızla ilgili gerçek hikâyelerimizi yakında paylaşacağız.",
    homeLink: "Lumo’yu yakından tanıyın",
  },
  process: {
    eyebrow: "İLK ADIMDAN İTİBAREN",
    title: "Acele etmeden,\nbirlikte düşünerek.",
    text: "Yeni bir dosta hazırlanırken size yol gösterecek dört adım.",
    steps: [
      {
        title: "Tanışma",
        text: "Günlük hayatınızı, beklentilerinizi ve ayırabileceğiniz zamanı düşünün.",
      },
      {
        title: "Birlikte değerlendirme",
        text: "Irkın ihtiyaçlarını ve yavruya ait doğrulanmış bilgileri inceleyin.",
      },
      {
        title: "Eve hazırlık",
        text: "Dinlenme alanından bakım düzenine, ilk günlerin ihtiyaçlarını planlayın.",
      },
      {
        title: "Yeni bir günlük hayat",
        text: "Alışma sürecine zaman tanıyın; bakım sorularını ilgili uzmanlarla değerlendirin.",
      },
    ],
  },
  faq: {
    eyebrow: "MERAK EDİLENLER",
    title: "İyi bir başlangıç,\nher soruya yer açar.",
  },
  cta: {
    eyebrow: "BİR MERHABA İLE",
    title: "Birbirimizi\ntanıyarak başlayalım.",
    text: "Aklınızdaki sorular, günlük hayatınız, yeni dostunuzdan beklentileriniz. Konuşacak çok şey var.",
    action: "Lumo ile iletişim",
  },
  contactPage: {
    eyebrow: "İLETİŞİM",
    title: "Sizi dinlemekle\nbaşlayalım.",
    text: "Yeni bir dost için düşünürken sorularınızı ve yaşam düzeninizi paylaşın.",
    pendingTitle: "İletişim bilgilerimiz hazırlanıyor.",
    pendingText:
      "Doğrulanmış iletişim kanallarımız burada paylaşılacak. Bu sırada ırk rehberlerini ve sık sorulan soruları inceleyebilirsiniz.",
    channelsTitle: "Size uygun kanaldan",
    emailTitle: "E-posta ile yazın",
    name: "Adınız",
    email: "E-posta adresiniz",
    message: "Mesajınız",
    submit: "E-posta uygulamasında aç",
    formNote:
      "Bu form mesajınızı cihazınızdaki e-posta uygulamasında açar. Göndermeden önce inceleyebilirsiniz.",
    formSuccess:
      "E-posta taslağı açıldı. Mesajınızı e-posta uygulamanızdan gönderebilirsiniz.",
    formFallback:
      "E-posta uygulamanız açılmadıysa doğrudan bu adrese yazabilirsiniz:",
  },
  footer: {
    line: "Birlikte başlayan bir hayat.",
    copyright: "Lumo Puppies",
    top: "Başa dön",
    note: "Bir dost edinmek, uzun süreli bir sorumluluktur.",
  },
  ui: {
    menu: "Menü",
    close: "Kapat",
    home: "Ana sayfa",
    skip: "İçeriğe geç",
    backBreeds: "Tüm ırklar",
    backPuppies: "Yavrularımıza dön",
    contact: "İletişim",
    details: "Yakından tanıyın",
    read: "Rehberi okuyun",
    sources: "Kaynaklar",
    important: "Birlikte değerlendirin",
    breedDisclaimer:
      "Irk özellikleri genel eğilimleri anlatır. Her köpeğin karakteri ve ihtiyaçları farklıdır. Çocuklarla etkileşim yetişkin gözetiminde olmalıdır.",
    relevantPuppies: "Bu ırktan yavrularımız",
    records: "Doğrulanmış kayıtlar",
    parents: "Ailesi",
    development: "Gelişim notları",
    guideLabel: "IRK REHBERİ",
    guideCover: "LUMO / IRK REHBERİ",
    archiveLabel: "LUMO / ARŞİV",
    gallery: "Fotoğraf galerisi",
    video: "Video",
    colour: "Renk",
    sex: "Cinsiyet",
    born: "Doğum tarihi",
    previous: "Önceki fotoğraf",
    next: "Sonraki fotoğraf",
    photo: "Fotoğraf",
    noPhoto: "Gerçek fotoğraflar yakında",
    generalGuide: "IRK REHBERİ",
    availability: "Güncel bilgi için",
    notFoundTitle: "Bu sayfada\nbuluşamadık.",
    notFoundText:
      "Bağlantı değişmiş olabilir. Lumo’yu keşfetmeye ana sayfadan devam edebilirsiniz.",
    notFoundAction: "Ana sayfaya dön",
  },
};
export const navigation = [
  { href: "/irklar/", label: "Irklarımız" },
  { href: "/yavrular/", label: "Yavrularımız" },
  { href: "/lumo-standardi/", label: "Lumo Standardı" },
  { href: "/basarilar/", label: "Başarılarımız" },
  { href: "/hakkimizda/", label: "Hakkımızda" },
  { href: "/iletisim/", label: "İletişim" },
];
export const verifiedCare: Proof[] = []; // TODO: owner-approved care routines and verifiable records only.
export const contentTodos = [
  "Approve all proposed brand copy and process steps",
  "Provide real photography and consent",
  "Confirm breeds actually offered",
  "Complete Taco and other puppy profiles",
  "Verify all health and parent records",
  "Provide real awards and family stories",
  "Provide team names, roles and portraits",
  "Provide real contact channels and legal identity",
  "Set canonical production domain and launchReady",
];
