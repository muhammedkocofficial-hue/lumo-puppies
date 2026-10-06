# Lumo yavru vitrini

Yönetim ekranı: http://127.0.0.1:4174/

Proje klasöründe `npm run admin` komutu ile açılır. Site önizlemesi için ayrı terminalde `npm run dev -- --webpack` çalıştırın. Panel yalnızca bu bilgisayardan erişilebilir; internete açık bir yönetim sistemi değildir.

## Yavru eklemek

1. **Yeni yavru** düğmesine basın.
2. Adını, ırkını, doğum tarihini, cinsiyetini, rengini ve tanıtımını girin. Irk listesinden seçim yapabilir veya başka bir ırk yazabilirsiniz.
3. Fotoğrafları yükleyin. En fazla 12 JPG, PNG veya WebP fotoğraf kabul edilir; dosya başına üst sınır 10 MB. Fotoğraflar otomatik olarak WebP biçiminde hazırlanır.
4. Fotoğrafların altındaki oklarla sıralamayı değiştirin. İlk fotoğraf vitrinin kapağıdır. Fotoğraf açıklaması erişilebilirlik için kullanılır.
5. **Vitrinde göster** seçeneğini açıp kaydedin. Eksik kayıtları bu seçenek kapalıyken taslak olarak saklayabilirsiniz.

Vitrine almak için ad, bağlantı adı, ırk, tanıtım ve en az bir fotoğraf gereklidir. Yavru durumu Tanışmaya açık, Rezerve veya Yuvasını buldu olarak seçilebilir. Sol listedeki oklar vitrin sırasını değiştirir.

## Düzenlemek ve kaldırmak

Sol listeden kayıt seçin. Vitrinden kaldırmak için **Vitrinde göster** seçeneğini kapatıp kaydedin; bilgiler taslakta korunur. **Kaydı sil** onayla çalışır. Fotoğraf dosyalarını silmez.

Kayıtlar `src/data/puppies.ts` dosyasında, yüklenen fotoğraflar `public/media/uploads/` altında tutulur. Kaydetmeden önceki sürüm `work/catalog-backups/` klasörüne yedeklenir. İki pencerede eşzamanlı düzenlemede eski kayıt diğer değişikliklerin üzerine yazılmaz; listeyi yenilemeniz istenir.

Kaydedilen kayıtlar yerel geliştirme önizlemesinde görünür. Site statik olarak yayınlandığı için canlı sitede değişikliklerin görünmesi, `npm run build` ve mevcut yayın sürecinin yeniden çalıştırılmasını gerektirir. Bu panel otomatik dağıtım yapmaz.

## Hero videosu

Video: `public/media/hero/hero-film.mp4`; kapak: `public/media/hero/hero-film-poster.webp`. Kendi videonuzla değiştirirken aynı yolları kullanabilirsiniz. Ses kapalı ve döngülü oynatılır; durdurma düğmesi vardır. Azaltılmış hareket tercihinde otomatik oynatılmaz; görünüm dışına çıkınca durur.

Mevcut 10 saniyelik, yaklaşık 460 KB video temsili stok görüntüdür. Kaynak: [Mixkit — Two puppies side by side](https://mixkit.co/free-stock-video/two-puppies-side-by-side-1210/), [Mixkit Stock Video Free License](https://mixkit.co/license/). Gerçek Lumo yavruları veya marka referansı olarak sunulmaz. Dosya sessiz ve optimize edilmiş bir kesittir.

## Kontrol sonucu

390, 430 ve 1440 px’de video oynatma/durdurma, azaltılmış hareket, video üzerindeki iki bağlantı, dört numarasız Standard görseli ve taşma kontrol edildi. Yönetim ekranında oluşturma, çoklu yükleme, kapak sırası, özel ırk, yayınlama, taslak, yenileme sonrası kalıcılık, sıralama, silme ve eşzamanlı kayıt koruması ayrı test verileriyle doğrulandı. Gerçek yavru listesine test kaydı eklenmedi.
