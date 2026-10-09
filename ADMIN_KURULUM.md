# Lumo — canlı içerik yönetimi

Panel adresi: `https://SITENIZ/admin/`. Yerel 4174 paneli yalnızca eski yerel katalog içindir; artık canlı siteyi değiştirmez.

## Supabase projesi

1. Supabase hesabınızda bir proje oluşturun. Proje şifresini ve yönetici şifresini sohbetlerde paylaşmayın.
2. SQL Editor'da `supabase/schema.sql` dosyasını bir kez çalıştırın.
3. Authentication > Providers > Email bölümünde açık kullanıcı kaydını kapatın. Bu site kayıt formu sunmaz.
4. Authentication > Users bölümünden kendi e-posta adresiniz için kullanıcı oluşturun. Benzersiz, uzun bir şifre belirleyin. Kullanıcının UUID değerini kopyalayın.
5. SQL Editor'da `insert into public.admin_users(user_id) values ('KULLANICI-UUID');` çalıştırın.
6. Connect penceresinden proje URL'sini ve publishable anahtarını alın; tüm anahtarlar Settings > API Keys bölümündedir. **service_role veya secret key kullanmayın.**

## Netlify değişikliği

Bu sürüm sunucu tarafında yetkilendirme ve dinamik içerik kullanır. Önceki `out` statik yayın ayarı artık uygun değildir.

- Build: `npm run build`
- Publish: `.next` (deponun netlify.toml dosyasında ayarlı)
- Eski `NETLIFY_NEXT_PLUGIN_SKIP` ortam değişkeni Netlify panelinde varsa kaldırın.
- Netlify Next.js adaptörünün otomatik etkinleşmesine izin verin.
- Aşağıdaki ortam değişkenlerini build ve functions kapsamına ekleyin:
  - `SUPABASE_URL`: `https://PROJE.supabase.co`
  - `SUPABASE_ANON_KEY`: proje anon/publishable anahtarı
  - `NEXT_PUBLIC_SITE_URL`: kullanıcıların ziyaret ettiği tam HTTPS ana adres; sonunda `/` olabilir. Alan adı bağlandığında burayı da güncelleyin.
- Deploy edin. Bu dosyanın hazırlanması herhangi bir deploy yapıldığı anlamına gelmez.

Yerelde aynı anahtarları `.env.local` dosyasına ekleyin. Yerel geliştirmede `NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3000` kullanın; üretim için HTTPS kullanın. İçerik kontrolü bu nedenle Netlify'da HTTPS bekler.

## İlk giriş

1. `/admin/` adresinden giriş yapın.
2. Blog sekmesinde **3 başlangıç yazısını ekle** düğmesini kullanın.
3. Ödüller sekmesinde **Ödül kaydını ekle** düğmesini kullanın.
4. Yavrular ve Yeni Yuvalarında bölümlerine gerçek fotoğraf ve kayıtları girin. Taslakları kaydedebilir, hazır olduğunda yayımlayabilirsiniz.
5. İlk fotoğraf kapak fotoğrafıdır. Görsel açıklaması arama motorları ve erişilebilirlik için gereklidir. Öne al / kaldır düğmeleri fotoğraf sırasını yönetir.

Bir kez veritabanı bağlandıktan sonra site içerikleri doğrudan veritabanından okunur. Boş veritabanı eski örnek kayıtları otomatik yayımlamaz. Yayımlama, taslağa alma ve silme için tekrar GitHub deploy'u gerekmez. Arayüz kodundaki değişiklikler için GitHub/Netlify deploy'u gerekir.

## Güvenlik modeli

- Supabase Auth şifreyi doğrular. Uygulama şifre saklamaz ve yönetici şifresi kodda bulunmaz.
- Yönetim yetkisi `admin_users` tablosunda elle verilir. Yeni auth hesabı tek başına yazma yetkisi kazanmaz.
- Her yönetim API isteğinde kullanıcı oturumu ve yönetici üyeliği sunucuda doğrulanır. Veritabanı ve depolama RLS kuralları ayrıca uygulanır.
- Oturum çerezi HttpOnly, SameSite=Strict ve üretimde Secure'dır. Token istemci JavaScript'ine verilmez; en fazla bir saat sonra yeniden giriş gerekir.
- Değişiklik istekleri Origin kontrolünden geçer. Giriş denemeleri Supabase Auth hız sınırlarına tabidir; sağlayıcı ayarlarını gevşetmeyin.
- Yalnızca JPG/PNG/WebP yüklenir; sunucuda yeniden kodlanır. SVG/HTML kabul edilmez. 5 MB ve 24 MP sınırları vardır. EXIF bilgileri çıktı görseline taşınmaz.
- Yayımlanmış içerik ve medya herkese açıktır. Özel belgeleri, izin alınmamış kişisel bilgileri veya müşteri iletişim bilgilerini yüklemeyin.
- Kayıt silindiğinde medya dosyası otomatik silinmez; başka içerikte kullanılan görselin kırılması önlenir. Gereksiz medya Supabase Storage panelinden kontrollü kaldırılabilir.
- Eşzamanlı düzenleme çakışmaları sürüm kontrolüyle reddedilir.

İlk canlı doğrulama: yetkisiz hesapla panel erişimi reddedilmeli; yöneticiyle taslak kaydı dışarıdan görünmemeli; yayımlanan kayıt sitede görünmeli; silinen kayıt kaybolmalıdır. Bu doğrulama gerçek Supabase projesinde kurulumdan sonra yapılmalıdır.

Kaynaklar: https://supabase.com/docs/guides/auth · https://supabase.com/docs/guides/database/secure-data · https://supabase.com/docs/guides/storage/security/access-control · https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
