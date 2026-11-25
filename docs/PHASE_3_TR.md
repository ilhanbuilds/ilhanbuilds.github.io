# Üçüncü aşama — Türkçe varsayılan dil, CV ve içerik

25 Kasım 2026. Çalışma dalı `feat/portfolio-foundation`; inceleme [taslak PR #1](https://github.com/ilhanbuilds/ilhanbuilds.github.io/pull/1) üzerinden sürüyor. Main’e merge veya production deployment yapılmadı.

## Dil yapısı ve eski adresler

- Türkçe kökte (`/`, `/work/`, `/journey/`, `/about/`), İngilizce `/en/` altında. Aynı 10 proje ve detay sayfaları iki dilde korunuyor.
- Dil seçici aynı sayfanın karşılığına gider ve tercihi localStorage’da saklar. İngilizce tercih edilmişse sonraki kök ana sayfa ziyareti `/en/` adresine geçer. Doğrudan açılan dil içeren veya Türkçe derin bağlantılar önceliklidir ve tercihi günceller.
- Eski 15 `/tr/…` adresi Türkçe kök karşılıklarına statik yönlendirme yapar. JavaScript ile sorgu parametreleri ve hash korunur; JavaScript kapalıysa HTML refresh ve bağlantı alternatifi bulunur.
- Önceden İngilizce olan kök adresler çalışmaya devam eder ve artık Türkçedir; İngilizce karşılıkları `/en/` altındadır.
- Canonical, dil alternatifleri, Open Graph ve Türkçe `x-default` güncellendi. Sitemap yalnızca 28 canonical içerik sayfasını içerir; eski adresleri ve hata sayfalarını içermez. Sitemap içinde dil eşleşmeleri de var.
- Build toplam 45 HTML üretir: 28 içerik, iki hata sayfası, 15 eski adres yönlendirmesi. GitHub Pages’in root `404.html` sayfası Türkçe, `/en/404/` İngilizcedir.

## Hazır CV’ler

İki PDF yeniden üretilmeden veya değiştirilmeden `public/documents/` altına birebir kopyalandı:

| Dil       | Dosya                             | Sonuç                                                    |
| --------- | --------------------------------- | -------------------------------------------------------- |
| Türkçe    | `Ilhan_Kilic_CV_Portfolyo.pdf`    | Tek sayfa; telefon numarası yok; beş bağlantı anotasyonu |
| İngilizce | `Ilhan_Kilic_CV_EN_Portfolyo.pdf` | Tek sayfa; telefon numarası yok; beş bağlantı anotasyonu |

Her ikisi pypdf ile incelendi, PNG’ye render edilip görsel olarak kontrol edildi. Kaynak, public kopya, build kopyası ve gerçek tarayıcıdan indirilen dosyalar aynı SHA-256 değerine sahip. Türkçe sayfalarda Türkçe, İngilizce sayfalarda İngilizce CV indirilir. Header’da ve About sayfasında indirme bağlantısı bulunur.

Onaylı SHA-256 değerleri:

```text
TR: 60d6a3bf3bc22cb599927dc81789ad7b9ed32dbbc85455751767d3d8b69192ce
EN: 870acbf5a2c0e6ba5c4625d6541ff8232944459445aa6e4beb98b1107c586b1e
```

PDF bağlantıları e-posta, LinkedIn, GitHub, diline uygun portfolyo ana sayfası ve Racker Google Play kaydıdır. GitHub ve Google Play canlı kontrolde HTTP 200 döndürdü. LinkedIn otomatik erişimi HTTP 999 ile engelledi; sağlanan adres anotasyonlarda doğru. E-posta bağlantısı doğru `mailto:` adresidir; e-posta gönderilmedi. Portfolyonun kök ve `/en/` adresleri yerelde doğrulandı; production henüz yayınlanmadığı için internet üzerindeki bu iki hedef şu anda 404 dönüyor. Bu nedenle bütün harici hedeflerin canlı açıldığı iddia edilmiyor.

## İçerik ve korunan kapsam

LinkedIn, e-posta ve GitHub verilen değerlerle merkezi profile eklendi. Tanıtım yazılım geliştirme ve yazılım testine olan ilgiyi anlatıyor; yeni uzmanlık unvanı eklenmedi. Racker açıklamasında sağlanan CV’deki fiziksel Android/Wear OS testleri belirtildi; bu oturumda portfolyo için fiziksel cihaz testi yapıldığı anlamına gelmiyor.

SecureFace ve Deepfake Detection ortak ekip çalışması olarak anlatılıyor. Kişisel katkı alanı, başlığı ve tipi kaldırıldı. Proje metinleri ve galeri açıklamalarındaki tekrarlı veya gereksiz savunmacı cümleler sadeleştirildi.

10 projenin sıralaması, timeline, 27 görsel asset ve gizlilik kararları korundu. Görsel dosyalarında değişiklik yok. Deepfake’in kaynağı belirsiz yüz görseli ve eski CV hâlâ dışarıda. Yeni CV’ler ve iletişim bilgileri bu aşamada açıkça onaylandı. Yeni dependency eklenmedi.

Kalıcı geliştirme kuralları için köke kısa `AGENTS.md` eklendi. README, varlık envanteri ve geliştirme dokümanı yeni dil/CV davranışına göre güncellendi. Önceki teslimat raporları tarihsel kayıt olarak korundu.

## Doğrulama

- Astro / strict TypeScript: 0 hata, 0 uyarı, 0 hint. Üretilmiş Playwright raporları typecheck kapsamından çıkarıldı; kaynak test dosyaları kontrol edilmeye devam ediyor.
- Lint, formatter, production build ve yedi içerik/gizlilik testi başarılı.
- Chromium ve iPhone emülasyonlu WebKit: 51 test başarılı; WebKit’te desteklenmeyen CLS API ölçümü atlandı. Boyut/oran kontrolleri iki motorda da çalışır.
- Dil kalıcılığı, doğrudan dil bağlantıları, bütün eski içerik adresleri, query/hash koruması ve JavaScript/storage engeli kontrol edildi.
- Her iki motorda gerçek TR/EN PDF indirmeleri yapıldı; dosya adı ve SHA-256 eşleşmesi doğrulandı. Mobil testler menüyü açarak gerçek indirme bağlantısını kullanır.
- 360, 390, 412, 768, 1024, 1440 ve 1920px taşma kontrolleri; EN/TR route, görsel, bağlantı, tema, klavye ve WCAG kontrolleri başarılı.

Yeni build üzerinde Lighthouse 13.6.0 yeniden çalıştırıldı; eski aşama puanları kullanılmadı:

| Görünüm         | Performans | Erişilebilirlik | Best practices | SEO |    LCP | CLS |
| --------------- | ---------: | --------------: | -------------: | --: | -----: | --: |
| Türkçe mobil    |        100 |             100 |            100 | 100 | 0,8 sn |   0 |
| Türkçe masaüstü |        100 |             100 |            100 | 100 | 0,2 sn |   0 |
| İngilizce mobil |        100 |             100 |            100 | 100 | 1,7 sn |   0 |

İngilizce mobil ölçümü de ayrı ham JSON raporuna kaydedildi. Ölçümler yerel emülasyon sonuçlarıdır; production performansı veya tam erişilebilirlik uygunluğu garantisi değildir. Manuel ekran okuyucu ve fiziksel telefon kabul testi yapılmadı.

## Görsel inceleme

Masaüstündeki `PortfolioReview` klasöründe 14 güncel tam sayfa Chromium görüntüsü, `index.html` ve `captures.json` var. Mevcut on görünüm artık Türkçe kök sayfalarını gösteriyor; ek İngilizce örnekler:

- `home-en-desktop.png`
- `home-en-mobile.png`
- `about-en-desktop.png`
- `racker-en-detail.png`

Türkçe ana sayfa açık/koyu masaüstü ve mobil, Journey masaüstü/mobil, Projects, Racker, SecureFace ve About görüntüleri aynı klasörde. Bu inceleme çıktıları public repository’ye eklenmedi. Lighthouse ham sonuçları da yerel inceleme klasöründe tutulur.

## Commit ve yayın

- `3fe3d14` — Türkçe varsayılan dil, eski adresler, SEO, yerelleştirilmiş CV ve iletişim bağlantıları.
- `8cfa4fc` — proje ve galeri metinleri, ortak ekip anlatımı.
- `1136e0f` — dil tercihi, eski adres, CV bütünlüğü ve indirme testleri.

Dokümantasyon ayrıca anlamlı bir commit’le gönderilir. Feature dalı ve taslak PR güncellenir; main tabanı `19f5147` olarak kalır. Force push, merge ve production deployment yapılmaz.
