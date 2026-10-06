# Lumo — görsel ve hareket iyileştirmesi

Mevcut tasarım korunarak dört temsili görsel üretildi: Toy Poodle kampanyası, Maltese portresi, Bichon Frise portresi ve sakin bir ev köşesi. Yerleşik image_gen kullanıldı; promptların tamamı image-prompts.json dosyasında.

Projedeki konum: C:/Users/Pc/Desktop/lumo-puppies/public/media/examples/

Dosyalar: campaign-wide.webp, campaign-mobile.webp, poodle-portrait.webp, maltese.webp, bichon.webp, interior.webp. Toplam yaklaşık 520 KB; mobil açılış görseli 78 KB, masaüstü açılış görseli 120 KB. Diğer görseller tembel yüklenir. Orijinal PNG dosyaları değiştirilmedi.

Açılışa 4,2 saniyede tamamlanan hafif yakınlaşma, destekleyen tarayıcılarda kaydırmaya bağlı küçük bir derinlik hareketi ve iki kez çalışan aşağı ok hareketi eklendi. Sonsuz otomatik animasyon veya yeni animasyon kütüphanesi yok. Azaltılmış hareket tercihi tüm efektleri kapatır.

390, 430 ve 1440 px ekranlarda açılış, portreler ve ev görseli incelendi. Mobil/masaüstü kaynak seçimi, taşma, görsel yükleme, menü ve azaltılmış hareket kontrol edildi; hata bulunmadı. Etkilenen ırk detayları ve hakkımızda sayfası da kontrol edildi. Build, ESLint ve 10 mevcut kanıt/yayın doğrulama testi başarılı.

Görseller kullanıcının örnek görsel izni üzerine eklenmiştir. Gerçek Lumo yavruları, mekânları veya referansları değildir. Her görsel Temsili görsel · AI etiketi taşır. Gerçek kayıtlar ve yayın kapısı korunmuştur; yayına hazırlık kontrolü temsili görsellerin gerçek ve onaylı fotoğraflarla değiştirilmesini ister.

Önizleme: http://127.0.0.1:3000/
