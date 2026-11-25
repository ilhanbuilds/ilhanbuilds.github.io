# İlk sürüm teslimat notları — 25 Kasım 2026

İlk portfolyo sürümü geliştirildi ve `feat/portfolio-foundation` dalına gönderildi. Ana sayfa, projeler, 10 proje detayı, gelişim çizelgesi ve hakkımda sayfalarının İngilizce/Türkçe karşılıkları hazır. İki hata sayfasıyla birlikte 30 statik HTML sayfası üretiliyor; 28 içerik sayfası sitemap’e dahil ediliyor.

## Mimari ve tasarım

- `src/data/projects.ts`: yalnızca paylaşılması onaylanan 10 projenin merkezi içerik kaynağı.
- `src/types/content.ts`: isteğe bağlı katkı, süreç, teknik detaylar ve gerçek görseller için strict içerik sözleşmesi.
- `src/i18n/index.ts`: arayüz çevirileri ve aynı sayfanın dil eşleşmesi.
- `src/components/`: ortak sayfalar, proje sunumları, navigasyon ve zaman çizelgesi.
- `src/styles/global.css`: açık/koyu tema token’ları, tipografi ve responsive düzen.
- `.github/workflows/pages.yml`: doğrulama, tarayıcı testleri ve yalnızca main için deployment.

Racker daha büyük vitrin alanına sahip. SecureFace ekip araştırması olarak sunuluyor. Erken dönem projeleri küçük satırlarla, yeni çalışmalar daha geniş açıklamalarla gösteriliyor. Gerçek ekran görüntüleri sağlanana kadar tipografik proje sunumları kullanılıyor. Manrope yerelden sunuluyor; OFL lisansı `public/fonts/Manrope-OFL.txt` içinde korunuyor.

## Sürümler

| Araç         | Kullanılan sürüm                        |
| ------------ | --------------------------------------- |
| Node.js      | Checkout içinde 24.22.3; CI için 24 LTS |
| npm          | 10.9.2                                  |
| Astro        | 7.4.13                                  |
| TypeScript   | 5.9.3, strict                           |
| Tailwind CSS | 4.3.5                                   |
| Astro check  | 0.9.12                                  |
| ESLint       | 10.15.0                                 |
| Prettier     | 3.10.1                                  |
| Playwright   | 1.65.1                                  |

Bilgisayarın sistem Node sürümü 22.16.0 olduğu için güncel Astro’ya uygun Node yalnızca ignored `.tools/` içine kuruldu. Sistem kurulumu değiştirilmedi. Kurulumda npm denetimi 0 güvenlik açığı bildirdi.

## Gerçekleştirilen doğrulamalar

- npm kurulum, Astro/TypeScript check, lint, formatter ve production build başarılı.
- Chromium ve iPhone 13 WebKit emülasyonunda 32 tarayıcı testi başarılı.
- Üretilmiş içerik üzerinde 4 test başarılı: proje izin listesi, sitemap, gizlilik ve bağlantı kontrolleri.
- Tüm EN/TR içerik route’ları, dil eşleşmeleri ve dahili bağlantılar kontrol edildi.
- Tema geçişi, sistem tercihi, kalıcılık, storage engelliyken kullanım ve mobil menü kontrol edildi.
- 360, 390, 412, 768, 1024, 1440 ve 1920px genişliklerde yatay taşma görülmedi.
- Açık/koyu temalarda axe WCAG otomatik kontrollerinde ihlal bulunmadı.
- Onaylı public repository bağlantılarının mevcut ve public olduğu GitHub üzerinden doğrulandı.
- Ana sayfanın yerel Lighthouse 13.6.0 mobil ve masaüstü ölçümlerinde performans, erişilebilirlik, best practices ve SEO kategorileri 100 çıktı. Mobil LCP 0,8 saniye / CLS 0; masaüstü LCP 0,2 saniye / CLS 0,012. Bunlar tek makinede yerel ölçümler; yayın ortamı garantisi değil.

Test ekran görüntüleri `test-results/portfolio-custom-error-pages-and-screenshot-evidence-chromium/` ve karşılık gelen `-webkit/` klasöründe bulunur. HTML test raporu `playwright-report/` altındadır; bu çıktılar Git dışında tutulur. GitHub Actions aynı raporları artifact olarak saklar.

Fiziksel Samsung/iPhone testi ve manuel ekran okuyucu incelemesi yapılmadı. Windows WebKit’te varsayılan Tab davranışı bağlantıları atladığı için skip-link etkinleştirme testi odak verilerek çalışır; ilk Tab sırası Chromium’da doğrulanır.

## Git ve yayın

Feature dalındaki ilk altı commit:

- `19f5147` — Astro ve araç altyapısı.
- `56cec3b` — onaylı iki dilli proje envanteri.
- `339c712` — portfolyo sayfaları ve gelişim çizelgesi.
- `9c5c4c2` — GitHub Pages iş akışı ve font lisansı.
- `0885ec7` — tarayıcı ve içerik testleri.
- `f7ebab6` — dokümantasyon ve varlık listesi.

Sonraki doğrulama ve teslimat notları ayrı commit ile eklenir. Force push veya main merge yapılmadı.

Remote başlangıçta tamamen boştu. İlk feature push’undan sonra GitHub bu dalı otomatik olarak varsayılan dal seçti. `main` henüz bulunmuyor. PR için gereken başlangıç main push’u otomatik onay denetimince reddedildi; bu nedenle PR açılmadı. Main başlangıcı için ayrı açık izin gerekiyor. Önerilen taban, uygulama sayfalarını içermeyen `19f5147` altyapı commit’idir; ardından feature → main PR açılabilir. Portfolyo uygulamasının main’e merge edilmesi ayrı incelemeye tabidir.

GitHub Pages yayını yapılmadı. Pages API sorgusu 404 döndürdü; yayın henüz yapılandırılmamış görünüyor. Repository Settings → Pages bölümünde GitHub Actions seçilmeli. Feature dalı yayın yapamaz; deployment yalnızca uygun main güncellemesinden sonra çalışır.

## Yerel geliştirme ve sonraki adımlar

Normal Node 24 kurulumu olan ortamda `npm ci` ve `npm run dev`; üretim ön izlemesi için `npm run build` ve `npm run preview` kullanılır. Mevcut Windows checkout’undaki yerel Node ile çalışan PowerShell komutu [DEVELOPMENT.md](DEVELOPMENT.md) içinde.

Gerekli görsel ve bilgi listesi [ASSETS.md](ASSETS.md) içinde. Öncelik Racker’ın gerçek ekran görüntüleri, SecureFace için ekipçe onaylı görseller, varsa LinkedIn/e-posta/CV ve ekip projelerindeki doğrulanmış kişisel katkılar. Kesin başlangıç tarihleri, mağaza durumu ve belirtilmemiş katkılar uydurulmadı.

Sonraki adım görsel geri bildirimle düzeni değerlendirmek, onaylı gerçek görselleri eklemek ve main tabanı/PR engelini izinle çözmek. İçerik ve görsel alanları bu güncellemeler için hazır.
