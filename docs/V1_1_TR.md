> Bu belge önceki taslak aşamanın tarihsel raporudur. Son düzenlemeler, son fotoğraf tercihi ve yetkili yayın sırası için [güncel kayıt](FINAL_REFINEMENT_TR.md) geçerlidir.

# v1.1.0 — Görsel iyileştirme (taslak)

Çalışma `v1.0.0` main sürümünden `feat/portfolio-visual-refinement` dalında hazırlandı. Bu aşama yalnız inceleme içindir: main’e merge, production deployment, tag veya GitHub Release yapılmaz. Mevcut v1.0.0 yayını korunur.

## Tasarım ve navigasyon

Proje kartları ve ana sayfa vitrinleri ortak 2:1 `object-fit: contain` alanı kullanır. Tam kompozisyon korunur; esnetme veya önemli içeriği kırpma yoktur. Tanıtım kompozisyonu, uygulama ekranı ve basit tipografik kimlik ayrı etiketlenir. Racker’ın orijinal kapağı ve gerçek uygulama simgesi korunur. Diğer projelerde yeni bir resmi logo üretilmez.

Yolculuk sekmesi ve ana sayfadaki ayrı yolculuk çağrısı kaldırıldı. Gelişim çizgisi Projeler’de, en yeni üstte korunur: RubikRL, SecureFace, Deepfake Detection, Bilekten, Racker, Lina, Kutlumi, DinoCore, HCJEditor, Calculator, IdleOyun. Ayrı IdleOyun/DinoCore karşılaştırması kaldırıldı; projeler, görselleri ve AI desteğiyle geliştirme atfı kendi içeriklerinde kalır. `/journey/`, `/en/journey/`, `/tr/journey/` ilgili Projeler adresine yönlenir; dil tercihi, query ve fragment korunur. JavaScript kapalıyken HTML refresh ve normal bağlantı yedeği vardır. Yönlendirmeler noindex ve sitemap dışıdır; 28 canonical sayfa için mevcut dil eşleşmeleri korunur.

Detay girişlerinde başlıklar küçültüldü; açıklama, durum ve teknolojiler tek yerde toplandı. Sağdaki gerçek Racker simgesi veya sade proje adı görsel denge sağlar. Tek kompakt Projeler dönüş bağlantısı kalır. Büyük tekil ekran yerine onaylı eski kapak da ortak galeriye alındı. Galeri masaüstünde üç, orta ekranda iki, mobilde bir sütun; eşit 4:3 kırpmasız alanlar, açıklama ve hafif hover kullanır. Lightbox tam kaynak görseli gösterir; Enter, Tab/Shift+Tab, Escape, yön tuşları, önceki/sonraki, kapat ve mobil dokunma desteklenir. Kapanışta odak ve sayfa kaydırma durumu geri gelir. JavaScript olmadan tam boy görsel bağlantısı çalışır.

## Kapak denetimi

On dosyanın gerçek adları ve ayrıntılı kararlar: [kapak incelemesi](COVERS_V1_1.md).

- IdleOyun, Calculator, HCJEditor, Kutlumi ve Lina için altı uygun yeni Türkçe kapak: 1440 × 720, metadata içermeyen WebP; yaklaşık 49–83 KB. Orijinal PNG’ler değiştirilmedi.
- İngilizce karşılıklar aynı onaylı ekranlardan, doğru İngilizce başlıklarla deterministik SVG/Sharp kompozisyonu olarak hazırlandı. Özgün Türkçe arayüz yeniden çizilmedi veya sahte İngilizce arayüze dönüştürülmedi; dili görselde belirtilir. AI ile yeniden üretim yapılmadı.
- Racker PNG’sinin decoded pikselleri mevcut kapakla aynıdır; yeni kopya yerine orijinal dosya kullanılır. İngilizce sayfada da kullanıcının koruma istediği orijinal Türkçe marka kompozisyonu kalır; çevresindeki içerik İngilizcedir.
- RubikRL yeni kapağındaki tamamlanmış AI çözücü iddiası nedeniyle alınmadı. Gerçek arayüz ve Geliştiriliyor durumu kaldı.
- SecureFace yeni kapağındaki gerçek zamanlı/güvenli koruma iddiaları araştırma aşamasını aştığı için alınmadı. Onaylı sahibin yüzünü içeren gerçek ekran, ekip anlatımı ve kayıtlı karşılaştırma korundu.
- DinoCore yeni kapağındaki AI ifadesi runtime özelliği olarak anlaşılabileceğinden alınmadı; mevcut gerçek oyun ekranı kullanılır. Kaynak içerikte AI desteğiyle geliştirme atfı kalır.
- Deepfake kapağı ve `deepfake/1.jpeg` üçüncü taraf yüz yayın izni doğrulanmadığından public repository veya build’e kopyalanmadı. Görselsiz tipografik proje kimliği kullanılır; fake analiz sonucu eklenmez.

## Doğrudan demolar ve korunan güvenlik

Dört iframe demo aç/kapat düğmesi olmadan kompakt, boyutu önceden ayrılmış alanlarda sunulur. Viewport’a 240px yaklaşınca bir kez yüklenir; klavye odağını ele geçirmez. Calculator, IdleOyun ve HCJEditor’un özgün kaynakları/arayüzleri değişmedi. Büyük mobil editör yerine iç kaydırması olan kompakt çerçeve kullanılır; işlevler korunur.

Tüm dış iframe’lerde opaque origin, `allow-scripts` ve `no-referrer` sürer. Yalnız HCJEditor’un dış frame’inde `allow-downloads` vardır. `allow-same-origin` eklenmedi; editörün iç preview sandbox’ı ve CSP’si değiştirilmedi. Üst sayfa DOM/storage erişimi ile ağ API/asset kısıtları test edilir. Kullanıcı kodunun kendi frame’ini yönlendirmesi veya CPU tüketmesi tamamen engellendiği iddia edilmez. Sayfadan ayrılınca/yenileyince kaydedilmemiş editör ve sentetik oyun oturumu kaybolur.

RubikRL bağımsız küp simülasyonudur; AI çözücü değildir. SecureFace kayıtlı karşılaştırma, Racker gerçek ekran kompozisyon gezginidir. DinoCore harici Unity bağlantısıdır. Lina/Kutlumi için sahte canlı AI/hesap deneyimi eklenmedi. Deepfake analiz demosu yoktur.

İki CV, 27 onaylı özgün görsel, iletişim adresleri, marka varlıkları, 11 proje, ekip atıfları, TR kök ve `/en/` yapısı korunur. Yeni dependency, backend, token, model ağırlığı veya gizli kaynak eklenmedi.

## Bilekten

Kullanıcının ek talimatıyla on birinci proje eklendi. Racker’dan sonra geliştirildiği için en yeni üstte sıralamada hemen Racker’ın üstünde yer alır. Yayınlanmamış, geliştirmeye ara verilmiş ve ileride devam edilecek proje olarak anlatılır. Kotlin/Jetpack Compose ve Android/Wear OS bilgisi salt okunur yerel kaynak incelemesiyle doğrulandı. Public metin yalnız kullanıcının paylaşılmasını istediği genel proje amacını kapsar; private repo bağlantısı, protokol ayrıntıları veya kod kopyalanmaz. Bu görevde native uygulama derlenmedi, cihaza kurulmadı veya fiziksel cihaz kabul testi yapılmadı.

Beş yeni onaylı görsel ayrı Bilekten galerisinde yer alır. Telefon görüntüsü tanıtım olarak, saat görüntüleri arayüz olarak açıklanır. Yeni Türkçe kapak ve gerçek saat ekranından deterministik İngilizce kompozisyon eklendi. Cihaz kontrolleri Android izinlerine ve hedef cihaz desteğine bağlıdır; kamera ekranı bir istek arayüzüdür, kaydedilmiş fotoğraf kanıtı değildir.

## İlk taslak doğrulaması (önceki PR sürümü)

Yerel strict Astro/TypeScript, ESLint, Prettier, production build ve 10 içerik/gizlilik/bütünlük testi başarılı. 11 projelik tam Playwright koşusu: **111 başarılı, 1 desteklenmeyen WebKit Layout Instability API kontrolü atlandı**. Chromium CLS ölçümü ve iki tarayıcıdaki görsel geometrisi kontrolleri çalışır. Son kullanılmayan görsel/aç-kapat CSS kuralları temizlendikten sonra ilgili demo, kapak, galeri ve CLS kontrolleri **17 başarılı, aynı 1 API atlama** ile tekrar geçti. Mevcut hesap makinesi, oyun ekonomisi, editör dosya/sandbox/CSP ve küp testleri korunur. Yeni kontroller; doğrudan demo yükleme ve odak, iki dilde kapaklar, 2:1 contain alanı, modal odak döngüsü/Escape/dokunma, no-JS tam boy bağlantı, Journey dil/query/hash yönlendirmeleri ve Bilekten’in konum/durum/gizlilik sınırlarını doğrular.

Son build’de **48 HTML adresi ve 216 asset** yerel preview üzerinde HTTP 200 doğrulandı. CV/demo/ikon dosyaları kaynak hash’leriyle eşleşti; OG 1200 × 630 kontrol edildi. Bu yeni dal için production’a yönelen doğrulama veya deployment yapılmadı; canlı v1.0.0 ile yerel aday birbirine karıştırılmaz.

Lighthouse 13.6.0, kurulu Chrome ve varsayılan GPU ile son 11 projelik build üzerinde ölçüldü. GPU kapatılmadı ve eşikler düşürülmedi.

| Sayfa / profil            | Performans | Erişilebilirlik | Best practices | SEO |
| ------------------------- | ---------: | --------------: | -------------: | --: |
| Ana sayfa / mobil         |        100 |             100 |            100 | 100 |
| Projeler / mobil          |         99 |             100 |            100 | 100 |
| HCJEditor / mobil         |        100 |             100 |            100 | 100 |
| Hakkımda / mobil          |        100 |             100 |            100 | 100 |
| English ana sayfa / mobil |        100 |             100 |            100 | 100 |
| Ana sayfa / masaüstü      |        100 |             100 |            100 | 100 |
| Projeler / masaüstü       |        100 |             100 |            100 | 100 |
| HCJEditor / masaüstü      |        100 |             100 |            100 | 100 |

Bu sekiz örnekte TBT 0, CLS 0,00078–0,00188. 99 sonucu 100’e yuvarlanmadı. Önceki beş mobil örnek ve yerel preview kapalıyken skor üretmeyen bir masaüstü hata raporu da saklandı; son ölçümler erişilebilir preview’de tekrarlandı. CI mevcut beş mobil sayfayı varsayılan GPU ile ayrıca ölçer ve performans≥90, diğer kategoriler 100, CLS<0,1 eşiklerini korur.

Fiziksel telefon/saat, manuel ekran okuyucu ve native Bilekten işlevleri bu portfolyo görevinde test edilmedi. Galeriler/etkileşimler tarayıcı emülasyonlarıyla doğrulandı. Harici Unity’nin erişimi değişebilir; editör sandbox’ı evrensel CPU/ağ engeli değildir. İzin doğrulaması eksik Deepfake yüzü ve yanlış/karışık özellik iddiaları taşıyan üç yeni kapak bilinçli olarak dışarıda tutulur. İnceleme ekran görüntüleri, ham ölçümler ve gerçekleşen commit/PR/CI bilgilerini içeren son rapor public repository dışında PortfolioReview klasöründe tutulur.

Yerel inceleme çıktısı: **120 tam sayfa +48 doğrudan demo/ön izleme +8 Bilekten lightbox görüntüsü**. Her grup Türkçe/İngilizce, açık/koyu ve masaüstü/mobil kombinasyonlarını içerir. Galeri ve demo görüntülerinde gerçek iframe içeriği tarayıcıda boyanmış olarak doğrulandı; kaynak fotoğraflar değiştirilmedi.

## Son görsel ayarlar — 26 Kasım 2026

Bu bölüm önceki kapak dışlama kararlarının ve tek sütunlu kart sunumunun güncel durumunu belirtir. Projeler içeriği 1200px ile sınırlandı; sol yıl çizgisi korunarak 768px ve üzerinde aynı yıl içinde iki sütun, altında tek sütun kullanılır. Kartların başlık/boşluk/aksiyon ölçüleri eşitlendi ve kısa kart açıklamaları detay metninden ayrıldı. Sıra ve 11 proje korunur. Ana sayfadaki Racker vitrini bu sınırlamadan etkilenmez. Hafif hover/focus korunur; reduced motion’da kart hareketi kapalıdır.

Kullanıcının isteğiyle kapakların altındaki genel “Tanıtım kompozisyonu” yazısı kaldırıldı; galerilerin kısa açıklamaları ve kapak alt metinleri korunur. Yeni düzeltilmiş DinoCore/SecureFace/RubikRL kapakları sırasıyla erken prototip/ekip araştırması/deneysel RL projesi olarak doğrulandı ve WebP’ye dönüştürüldü. İngilizce karşılıklar özgün onaylı ekranlardan hazırlandı.

Deepfake’in yeni temsili görseli kullanılabilir. Ancak kaynak kapakta kalan örnek skor, süre, model ve sonuç paneli tamamen çıkarıldı; yalnız temsili resim parçası ve doğru TR/EN açıklamalarla skorsuz kompozisyon oluşturuldu. Orijinal üçüncü taraf yüzü ve 1.jpeg dışarıda; gerçek ekran galerisi veya canlı analiz demosu eklenmedi. Güncel toplam 20 kapak dosyası, önceki 32 kaynak görsel ve iki değişmeyen CV vardır. Önceki altı TR/EN kapak çifti ve orijinal Racker kapağı değiştirilmedi. Tam dosya eşleştirmesi ve kararlar `COVERS_V1_1.md` içindedir.

### Son düzenleme doğrulaması

Typecheck 0 hata/uyarı/hint; lint, format, build ve 10 içerik/gizlilik testi başarılı. Tam Chromium/WebKit paketi 115 başarılı, 1 desteklenmeyen WebKit CLS API kontrolü atlandı. Son boşluk daraltmasından sonra iki dil/tema, 768–1920px iki sütun, 360px tek sütun, 1200px içerik ve 600px altı kart yüksekliği, reduced motion, Racker vitrin genişliği ve kapak/gizlilik kontrolleri 10/10 geçti. Ana işlev, CV, sandbox/CSP ve galeri testleri korunur.

Son aday yerel preview’de 48 HTML ve 248 asset ile doğrulandı; CV/demo/ikon hash’leri eşleşir. Varsayılan GPU ile Lighthouse 13.6.0/Chrome 158: mobil Home 100, Work 99, Editor 100, About 100, English 100; masaüstü Home/Work/Editor 100. Erişilebilirlik/best practices/SEO tümünde 100; TBT 0, CLS 0,00078–0,00190. 99 dahil tüm ham raporlar saklanır. Önceki ölçümler silinmez. Fiziksel cihaz ve manuel ekran okuyucu kabulü yapılmadı; v1.1.0 yayınlanmaz, PR #2 taslak kalır.
