# Netlify — canlı yönetimli sürüm

Bu proje artık statik export kullanmaz.

- Build command: npm run build
- Publish directory: .next
- Node: 22
- Git branch: main
- Eski NETLIFY_NEXT_PLUGIN_SKIP ayarı kaldırılmalı.
- NEXT_PUBLIC_SITE_URL, SUPABASE_URL ve SUPABASE_ANON_KEY değişkenleri build ve functions kapsamına eklenmeli.
- Supabase SQL ve yönetici ataması için ADMIN_KURULUM.md dosyasını uygulayın.

İlk bağlamada blog ve ödül başlangıç kayıtlarını panelden ekleyin. Veri tabanında yayımlanan gerçek yavru ve yuva hikâyeleri siteye yansır.

Yerel .env.local içindeki LUMO_ISOLATED_CACHE=1 yalnızca Windows geliştirme önbelleğidir; Netlify'a eklemeyin.

Bu sürümde GitHub'a push veya Netlify deploy otomatik yapılmamıştır.
