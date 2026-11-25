# Geliştirme kuralları

- Önce mevcut mimariyi, Git durumunu ve ilgili dokümantasyonu incele. Kullanıcı değişikliklerini koru; küçük ve geri alınabilir değişiklikler yap.
- Astro’nun statik, minimum JavaScript yaklaşımını ve mevcut tasarımı koru. Gereksiz dependency veya refactor ekleme; TypeScript strict kalsın.
- Proje içerikleri merkezi veri kaynağından gelsin. Onaylı 10 proje, sıralama, ekip atıfları ve görsel gizlilik kararları açık talimat olmadan değişmesin. Gizli kod, kişisel veri ve onaysız görsel yayınlama.
- Varsayılan dil Türkçe (`/`), İngilizce `/en/` altındadır. Eski `/tr/` bağlantılarını koru; dil eşleşmeleri, metadata ve sitemap birlikte güncellensin.
- Hazır CV dosyalarını yeniden üretme veya değiştirme. Yalnızca onaylı PDF’leri birebir kopyala; her dil kendi dosyasına bağlansın.
- Erişilebilirlik, klavye kullanımı, reduced motion, mobil taşma ve görsel oranlarını kontrol et. Placeholder, kullanılmayan kod veya boş public bölüm bırakma.
- Bitirmeden typecheck, lint, format kontrolü, build, içerik ve Playwright testlerini çalıştır. UI değişikliklerinde gerçek tarayıcı görüntülerini ve Lighthouse’u doğrula; yapılamayanları açıkça raporla. Testleri zayıflatma.
- Mevcut çalışma dalı `feat/portfolio-foundation`; anlamlı Conventional Commits kullan. Commit/push yalnızca açık kullanıcı yetkisiyle yapılır. Main’e merge, force push ve production deployment için ayrıca açık izin gerekir.
- Sonucu kısa Türkçe raporla: önemli dosyalar, kontroller, commit/push/PR durumu ve gerçek eksikler. Yerel inceleme çıktıları public repository dışında kalsın.
