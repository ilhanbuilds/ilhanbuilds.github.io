# Dördüncü aşama — ilhanbuilds marka kimliği ve görsel düzen

25 Kasım 2026. Çalışma dalı `feat/portfolio-foundation`; [PR #1](https://github.com/ilhanbuilds/ilhanbuilds.github.io/pull/1) taslak olarak korunur. Main’e merge veya production deployment yapılmaz.

## Marka ve tasarım kararları

Sağlanan üç referans dosyası beklenen `branding` dizini yerine `PortfolioAssets/personal/branding` altında bulundu: `logo-dark.png`, `logo-light.png`, `brand-guide.png`. Dosyalar değiştirilmedi ve public alana kopyalanmadı.

- `/ilhanbuilds` wordmark CSS ile oluşturuldu. Mevcut yerel Manrope’un 800 ağırlığı ve sıkı harf aralığı, referansın kalın tipografisini ve oranlarını izler; referanstaki fontun birebir vektör izi olduğu iddia edilmez. Yeni font veya bağımlılık eklenmedi.
- `/` ve `builds` mavi; `ilhan` yazısı temaya göre koyu/açıktır. Düz marka renkleri açık temada `#007AFF`, koyuda `#159DFF`; küçük bağlantılarda kontrast için ayrı, erişilebilir mavi kullanılır.
- IB monogramı, ek imza, neon veya parlama kullanılmadı. Rehberin kolajı, temsili portresi ve gradient dolguları yayınlanmadı.
- Mavi `/` işaretinden temiz SVG favicon ve 32/180/192/512px PNG tarayıcı simgeleri oluşturuldu. Apple touch icon ve web manifest bağlandı.
- 1200 × 630 PNG Open Graph görseli yerel fontla tarayıcıda üretildi. Wordmark, İlhan Kılıç adı, yazılım geliştirme/test ilgisi ve site adresi kullanıldı. OG/Twitter metadata, görsel boyutları ve alt metinleri eklendi.
- Sayfa başlıkları, sosyal site adı, footer ve eski adres yönlendirmelerinin başlıkları ilhanbuilds kimliğini kullanır. Kişisel tanıtım ve Person yapılandırılmış verisinde İlhan Kılıç adı korunur.
- İnce grid yalnızca ana sayfa tanıtımında ölçülü kullanılır. Diğer sayfalarda sade okuma yüzeyi, mevcut çizgiler ve proje görselleri korunur. Masaüstü sayfa girişlerinin boyutu ve boşluğu dengelendi.

`src/styles/global.css`, `src/layouts/Base.astro`, header/footer ve `scripts/generate-brand-assets.mjs` temel marka dosyalarıdır. Üretim betiği mevcut Playwright Chromium ve yerel Manrope’u kullanır; hiçbir portreyi işlemez.

## Hakkımda ve iletişim

Orijinal `portrait.webp` dosyasına dokunulmadı. Fotoğraf yalnızca CSS ile 1:1 gösterilir: `object-fit: cover`, `object-position: 50% 45%`. Yüzü ve doğal kompozisyonu koruyan kadraj, 12px ofset ince mavi çerçeveyle sunulur. Masaüstünde fotoğraf ve metin iki sütun, mobilde tek sütundur. Eğitim, ilgi alanları, bağlantılar ve CV daha düzenli bir okuma akışındadır.

- Ana sayfa ve footer: geliştirici iletişimi `ilhanbuilds@gmail.com` önceliklidir.
- Hakkımda: geliştirici/proje iletişimi ile profesyonel/kariyer iletişimi `kilicilhan.75@gmail.com` ayrı ve açık başlıklarla gösterilir.
- GitHub ve LinkedIn bağlantıları korunur. E-posta gönderilmedi.

Türkçe kök, İngilizce `/en/`, dil tercihi, eski `/tr/` bağlantıları, sitemap ve canonical eşleşmeleri korunur. İki CV’nin public/build ve gerçek tarayıcı indirmeleri onaylı SHA-256 değerleriyle aynıdır. Onaylı 10 proje, sıralama, ekip anlatımları, 27 kaynak görsel ve gizlilik kararları değiştirilmedi. Racker ana vitrin, Journey’nin gelişim hikâyesi ve tarihsel görselleri yerindedir.

## Kontroller

- Astro / strict TypeScript: 0 hata, 0 uyarı, 0 hint.
- ESLint, Prettier, statik build ve sekiz içerik/gizlilik/bütünlük testi başarılı.
- Chromium ve mobil emülasyonlu WebKit: 55 test başarılı; WebKit’in desteklemediği Layout Instability API testi gerekçesiyle atlandı. Görsel boyut ve oran kontrolleri iki motorda da çalışır.
- Yeni marka testleri: wordmark, tema renkleri, tüm sayfalarda marka başlığı/OG metadata, favicon ve manifest erişimi, PNG boyutları, OG 1200 × 630, iki amaçlı iletişim, kare kadraj ve ofset çerçeve.
- Mevcut proje görselleri için tam çerçeve/oran testi korundu. İstenen kare portre ayrı testle doğrulanır; yalnızca bu fotoğraf genel doğal oran testinden ayrıldı.
- 360, 390, 412, 768, 1024, 1440 ve 1920px taşma kontrolü; tema, klavye, mobil menü, WCAG, dil ve gerçek CV indirmeleri başarılı. Tüm sayfalara eklenen metadata beklentileri ayrıca her iki motorda yeniden çalıştırıldı.

Yeni build üzerinde Lighthouse 13.6.0 çalıştırıldı:

| Sayfa / koşul                                | Performans | Erişilebilirlik | Best practices | SEO |    LCP |   CLS |
| -------------------------------------------- | ---------: | --------------: | -------------: | --: | -----: | ----: |
| TR ana sayfa masaüstü, varsayılan GPU        |        100 |             100 |            100 | 100 | 0,2 sn |     0 |
| TR ana sayfa mobil, varsayılan GPU           |         72 |             100 |            100 | 100 | 0,8 sn | 0,002 |
| Hakkımda mobil, varsayılan GPU               |         70 |             100 |            100 | 100 | 1,7 sn |     0 |
| TR ana sayfa mobil, GPU kapalı karşılaştırma |        100 |             100 |            100 | 100 | 0,8 sn | 0,002 |
| Hakkımda mobil, GPU kapalı karşılaştırma     |        100 |             100 |            100 | 100 | 1,5 sn | 0,001 |
| EN ana sayfa mobil, GPU kapalı karşılaştırma |        100 |             100 |            100 | 100 | 1,8 sn |     0 |

İlk mobil koşul tekrarda 70 performans verdi. İz kaydında renderer ve compositor beklemesi, GPU iş parçacığındaki uzun görevle aynı zamana denk gelir; site script değerlendirmesi yaklaşık 17ms, bekleme `Other/Unattributable` olarak raporlanır. `--disable-gpu` ile aynı içerikte TBT 0ms oldu. Bu karşılaştırma yerel Chromium grafik yolunun ölçümü etkilediğini gösterir; tüm varsayılan ölçümlerin 100 olduğu söylenmez. Her iki koşulun ham raporları ve inceleme izi saklandı. Grafik sürücüsündeki kesin kök neden doğrulanmadı.

Bunlar yerel tarayıcı/emülasyon ölçümleridir. Fiziksel telefon, manuel ekran okuyucu kabulü ve production ortamı bu aşamada test edilmedi. Mevcut harici bağlantılar ve CV içerikleri değiştirilmedi; önceki aşamanın LinkedIn otomatik erişim sınırlaması ve yayına alınmamış site hedefleri bu aşamada yeniden canlı doğrulanmadı.

## Görsel inceleme ve teslimat

Masaüstündeki `PortfolioReview` klasöründe 38 güncel tam sayfa PNG, `index.html` ve `captures.json` bulunur. Ana sayfa, Hakkımda ve Journey için açık/koyu tema × masaüstü/mobil kombinasyonlarının tamamı hazırdır. Her iki dilde 28 canonical içerik sayfasının masaüstü açık görünümü de kapsanır. Görüntüler ve OG kartı görsel olarak incelendi.

Ham Lighthouse raporları ile GPU karşılaştırma izi aynı yerel klasöre kaydedilir. İnceleme dosyaları, kişisel marka referansları ve çalışma araçları public repository’ye eklenmez. Tasarım ve geliştirme dokümanları güncellendi. Feature dalına anlamlı commit’ler gönderilir ve taslak PR açıklaması son kapsamı yansıtacak şekilde değiştirilir; main ve production korunur.

Teslimat commit’leri:

- `8562248` — ilhanbuilds marka kimliği, iletişim ayrımı, Hakkımda düzeni ve regresyon testleri.
- `docs: expand visual review and record brand validation` — 38 görünümün yakalanması, varlık/tasarım/geliştirme dokümanları ve bu rapor.
