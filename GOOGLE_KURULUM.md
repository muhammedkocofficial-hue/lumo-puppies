# Google Search Console

1. https://search.google.com/search-console adresinde Google hesabınızla oturum açın.
2. URL öneki mülkü olarak https://lumopupies.com/ ekleyin.
3. HTML etiketi doğrulamasını seçin. Meta etiketinin content değeri Netlify'da GOOGLE_SITE_VERIFICATION ortam değişkenine girilebilir (Builds ve Functions). Alternatif: verilen HTML doğrulama dosyasını public klasörüne aynen koyun.
4. Deploy tamamlandıktan sonra doğrulayın.
5. Site Haritaları bölümünde https://lumopupies.com/sitemap.xml gönderin.
6. URL Denetimi'nde ana sayfa için canlı testi çalıştırın; başarılıysa dizine ekleme isteyin.

Örnek yavru sayfaları noindex taşır ve sitemap'e eklenmez. Gerçek kayda dönüştürürken isimdeki Örnek ve bağlantı adındaki ornek- kısmını kaldırın.
Favicon /brand/lumo-icon.png adresinde sabit kalır. Google'ın yeniden taraması birkaç gün veya hafta sürebilir; görünüm/sıralama garantisi yoktur.
Canlı blog şu an boşsa admin Blog sekmesindeki 3 başlangıç yazısını ekle düğmesi kullanılmalıdır.

Kaynak: https://developers.google.com/search/docs/appearance/favicon-in-search
Kaynak: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
