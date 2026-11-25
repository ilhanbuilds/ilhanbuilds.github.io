# İkinci aşama — Gerçek görseller ve tasarım iyileştirmesi

25 Kasım 2026. Çalışma `feat/portfolio-foundation` dalında tamamlandı. [Taslak PR #1](https://github.com/ilhanbuilds/ilhanbuilds.github.io/pull/1), `main` tabanına yöneliktir; merge ve production deployment yapılmadı.

## Görsel envanteri ve güvenlik

Sağlanan klasörde **28 görsel ve bir CV PDF’i** bulundu. **26 görsel** kullanıldı; doğrulanan [Racker Google Play kaydından](https://play.google.com/store/apps/details?id=com.ilhanki.titanlog) alınan resmi logo ile repository’de **27 görsel asset** var. Kaynakların ayrıntılı dosya eşleştirmesi [ASSETS.md](ASSETS.md) içinde.

| Proje / kullanım   | Kullanılan görsel sayısı | Yerleşim                                                         |
| ------------------ | -----------------------: | ---------------------------------------------------------------- |
| IdleOyun           |                        5 | Orijinal oyun kapağı, tarihsel karşılaştırma, timeline ve galeri |
| Calculator         |                        1 | Detay sayfası ve küçük timeline ön izlemesi                      |
| HCJEditor          |                        1 | Detay sayfası ve küçük timeline ön izlemesi                      |
| DinoCore           |                        1 | Orijinal oyun kapağı, karşılaştırma ve timeline                  |
| Kutlumi            |                        4 | Ana sayfa, oluşturma, tema ve zarf arayüzleri                    |
| Lina               |                        4 | Koyu/açık sohbet, ayarlar ve karşılama                           |
| Racker             |           4 + resmi logo | Ana vitrin, detay sayfası, Android ve Wear OS kompozisyonları    |
| Deepfake Detection |                        0 | Mevcut metin sunumu korundu                                      |
| SecureFace         |                        2 | Anonimleştirme kapağı ve video yükleme ekranı                    |
| RubikRL            |                        3 | Simülatör, düzenli ve karıştırılmış küp durumları                |
| Kişisel portre     |                        1 | About sayfası                                                    |

Racker ve Kutlumi’deki ad, kilo, antrenman, yaş ve mesajların yayınlanabilir demo verisi olduğu açıkça onaylandı. SecureFace görselindeki yüzün kullanıcıya ait olduğu belirtildi. Diğer ekranlarda API anahtarı, parola, e-posta veya hassas kayıt görülmedi. RubikRL’de düzenli küp görünümü çözüm başarısı olarak tanıtılmıyor.

Kopyalar metadata’sız WebP olarak üretildi; ekran görüntülerinin ilk kopyaları lossless, Astro’nun responsive varyantları optimize edilmiş WebP. Kaynak ve build çıktısında EXIF/XMP/ICC chunk kontrolü geçiyor. Orijinal klasördeki **29 dosyanın tamamının SHA-256 değeri başlangıçla aynı**; hiçbir orijinal dosya değiştirilmedi veya silinmedi.

Eklenmeyenler:

- `deepfake/1.jpeg`: tanınabilir yüzün kaynağı ve paylaşım izni kesin değil. “Muhtemelen sahte” açıklaması kesin izin olarak kabul edilmedi. İzinli bir örnek bekleniyor.
- `personal/profile.jpeg`: alternatif portre; tekrar oluşturmamak için `profile2.jpeg` seçildi.
- `personal/ilhan_kilic_CV.pdf`: SecureFace içermiyor ve telefon bilgisi var. Eski CV otomatik yayınlanmadı, içeriği değiştirilmedi. İletişim bilgileri buradan siteye otomatik taşınmadı.

## Tasarım ve mimari

- Racker ana vitrinde tam genişlikte öne çıkarıldı; mevcut tanıtım kompozisyonları değiştirilmeden kullanıldı. Yeni cihaz maketi veya dekoratif görsel üretilmedi.
- Resmi Play Store simgesi ve doğrulanmış mağaza bağlantısı EN/TR ana sayfa, Projects ve Racker detayında yer alıyor. İndirme veya kullanıcı sayısı eklenmedi.
- SecureFace, görsel ve açıklamanın yan yana olduğu daha küçük sunumla Racker’ı takip ediyor; ekip ve geliştirme durumu korunuyor.
- Journey’de IdleOyun ile DinoCore arasında gerçek ekranlı karşılaştırma var. Python oyunu modernleştirilmedi; Unity projesinin AI-assisted development niteliği açık.
- Calculator ve HCJEditor küçük kayıtlar olarak kaldı. Deepfake Detection, SecureFace’ten önce; SecureFace ve RubikRL geliştirme aşamasında.
- Galeriler, portre ve mobil ekranlar tam oranlarıyla gösteriliyor. Kesme/esnetme yok; galeri görselleri temizlenmiş tam boy dosyaya bağlanıyor.
- Görsel verileri `src/data/project-images.ts` üzerinden `src/data/projects.ts` içerik kaynağına bağlanıyor. Ortak `Screenshot.astro` responsive varyantları, boyutları, alt metinlerini ve lazy loading’i yönetiyor.
- About’a sağlanan kişisel portre eklendi. Mevcut renkler, tipografi ve navigasyon korundu. Lighthouse’un bulduğu wordmark/dil seçici erişilebilir ad eşleşmesi düzeltildi.
- Yeni bağımlılık eklenmedi.

## Doğrulamalar

| Kontrol                               | Sonuç                                                                                                        |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Astro / strict TypeScript             | 0 hata, 0 uyarı, 0 hint                                                                                      |
| Lint ve formatter                     | Başarılı                                                                                                     |
| Production build                      | 30 statik sayfa, 28 indexable içerik sayfası                                                                 |
| İçerik / gizlilik / metadata testleri | 5/5 başarılı                                                                                                 |
| Chromium + WebKit                     | 39 test başarılı; desteklenmeyen bir WebKit CLS ölçümü atlandı                                               |
| Responsive                            | 360, 390, 412, 768, 1024, 1440, 1920px: yatay taşma yok                                                      |
| Görseller                             | Lazy görsellerin yüklenmesi, alt metinleri, intrinsic boyutları, oranları ve tam boy bağlantıları doğrulandı |
| EN/TR ve etkileşim                    | Route/dil eşleşmeleri, tema kalıcılığı, storage engeli, menü ve klavye kontrolleri başarılı                  |
| Erişilebilirlik                       | Açık/koyu temalarda genişletilmiş axe WCAG kontrolleri başarılı                                              |
| Orijinal dosyalar                     | 29/29 SHA-256 eşleşmesi                                                                                      |

WebKit aynı Layout Instability API’sini sunmadığından CLS bütçesi Chromium’da ölçülüyor; WebKit’te boyut ve oran kontrolleri ayrıca geçiyor. Testlerin geri kalanı her iki motorda çalışıyor. Gerçek fiziksel telefon ve manuel ekran okuyucu testi yapılmadı.

Görseller eklendikten ve son erişilebilirlik düzeltmesinden sonra Lighthouse **13.6.0** yeniden çalıştırıldı. Önceki aşamanın sonuçları kullanılmadı:

| Yerel ana sayfa ölçümü | Performans | Erişilebilirlik | Best practices | SEO |    LCP | CLS |
| ---------------------- | ---------: | --------------: | -------------: | --: | -----: | --: |
| Mobil                  |        100 |             100 |            100 | 100 | 1,4 sn |   0 |
| Masaüstü               |        100 |             100 |            100 | 100 | 0,2 sn |   0 |

Bunlar yerel makinedeki emülasyon ölçümleri; production performansı veya tam WCAG uygunluğu garantisi değildir. Ham JSON raporları inceleme klasörüne kaydedildi.

## Ekran görüntüleri

Masaüstündeki `PortfolioReview` klasöründe `index.html` yerel inceleme sayfası, `captures.json` ve şu **10 gerçek Chromium tam sayfa görüntüsü** bulunuyor:

| Dosya                    | Görünüm                 |
| ------------------------ | ----------------------- |
| `home-desktop-light.png` | Ana sayfa, 1440px, açık |
| `home-desktop-dark.png`  | Ana sayfa, 1440px, koyu |
| `home-mobile-light.png`  | Ana sayfa, 390px, açık  |
| `home-mobile-dark.png`   | Ana sayfa, 390px, koyu  |
| `journey-desktop.png`    | Journey, 1440px         |
| `journey-mobile.png`     | Journey, 390px          |
| `projects-desktop.png`   | Projects                |
| `racker-detail.png`      | Racker detayı           |
| `secureface-detail.png`  | SecureFace detayı       |
| `about-desktop.png`      | About                   |

`lighthouse-mobile.json` ve `lighthouse-desktop.json` da aynı klasörde. Bu ekran görüntüleri ve raporlar public repository’ye eklenmedi. Tekrar üretmek için production preview açıkken `node scripts/capture-review.mjs <hedef-klasör>` çalıştırılabilir.

## Git ve yayın durumu

Onaylanan başlangıç commit’i `19f51477c365628d3d48d9337122ce10ac8009b1` doğrulandı; yalnızca bu commit üzerinden remote `main` oluşturuldu ve varsayılan dal yapıldı. Main’de uygulama sayfaları veya deployment workflow’u yok. Mevcut feature dalı korundu.

İkinci aşama kod commit’leri:

- `0aeee50` — onaylı gerçek görseller, merkezi medya ve doğrulanmış Racker mağaza kaydı.
- `4e6279e` — Racker vitrini, Journey karşılaştırması, doğal görsel oranları ve erişilebilir adlar.
- `deb3428` — görsel/gizlilik/CLS testleri ve yerel ekran görüntüsü aracı.

Varlık envanteri ve bu teslimat raporu ayrıca dokümantasyon commit’iyle gönderilir. Çalışma yönü [taslak PR #1](https://github.com/ilhanbuilds/ilhanbuilds.github.io/pull/1): `feat/portfolio-foundation → main`. Feature commit’leri push edildi; force push, merge ve production deployment yapılmadı. Pages, GitHub Actions modunda. Kod henüz yayınlanmış portfolyo olarak sunulmuyor.

## Beklenen bilgiler

İzinli Deepfake görseli; güncellenmiş ve public paylaşımı açıkça onaylı CV; yayınlanması istenen LinkedIn/e-posta bilgileri ve ekip projelerindeki doğrulanmış kişisel katkılar. Mevcut sürüm bunlar olmadan çalışıyor; boş başlık veya kırık asset bağlantısı yayınlanmıyor.
