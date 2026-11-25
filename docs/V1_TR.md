# ilhanbuilds v1.0 — Tasarım, demolar ve yayın doğrulaması

25 Kasım 2026. Bu sürüm kişisel tanıtımı, onaylı on projeyi ve gerçekten çalışan tarayıcı deneyimlerini statik Astro mimarisinde bir araya getirir. Yeni bağımlılık, backend veya ücretli servis eklenmedi. Bu belge sürüm kapsamı ve yayın kapılarını açıklar; gerçekleşen merge/deployment/release kimlikleri yerel son teslimat raporunda kaydedilir.

## Tasarım ve kronoloji

- Ana başlık İlhan Kılıç; slogan kaldırıldı. Bilgisayar Mühendisliği öğrenciliği, yazılım geliştirme ve test mühendisliği ilgisi doğal tanıtımla yer alır.
- Orijinal portre değiştirilmeden küçük kare ve ofset mavi çerçeveyle ana sayfaya taşındı. Özgeçmiş ve Projelerim eylemleri; GitHub, LinkedIn ve geliştirici e-postası belirgindir.
- `/ilhanbuilds` wordmark, marka renkleri, favicon, OG kartı ve Hakkımda’daki iki amaçlı iletişim korunur. İkincil metin kontrastı artırıldı; görseller, kart kenarları ve focus/hover durumları tutarlı hale getirildi.
- Projeler sayfasında solda yıl çizgisi, sağda gerçek kapaklı kartlar bulunur. Kart yüzeyi detay bağlantısına gider; mağaza/demo eylemleri ayrı bağlantılardır, iç içe anchor yoktur. Durum ve ekip bilgisi yalnız doğrulanmış olduğunda gösterilir.
- Projeler ve Journey sırası: **RubikRL, SecureFace, Deepfake Detection, Racker, Lina, Kutlumi, DinoCore, HCJEditor, Calculator, IdleOyun**. Mevcut `timelineOrder` ters çevrildi; yeni başlangıç tarihi uydurulmadı. Deepfake, SecureFace’ten eskidir.
- Racker ana sayfanın ilk vitrinidir. SecureFace tekrar eden çalışmalar listesinden çıkarıldı; RubikRL gerçek arayüz görseliyle sunulur. Journey’nin özgün IdleOyun/DinoCore karşılaştırması zaman çizelgesinden sonra korunur.
- On detay sayfasının açıklamaları, teknik içerikleri, gerçek görselleri ve ilgili bağlantıları gözden geçirildi. Özgün uygulamalar yeniden tasarlanmadı; demo türüne ve gerçek görsele göre sunum değişir.

## Projeler ve deneyimler

| Proje              | Sunulan deneyim                          | Gerçek çalışma biçimi / sınır                                                                                                                                                                                 |
| ------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IdleOyun           | Tarayıcı uyarlaması                      | Özgün PyQt5 menüleri, kayıt/giriş, tıklama, market, rebirth/prestige kuralları. Yalnız sentetik, oturumluk hesaplar; orijinal hesap dosyası okunmadı. Native pencere kapatma, demo kapalı ekranına uyarlanır. |
| Calculator         | Tarayıcı uyarlaması                      | Özgün Windows Forms görünümü, düzenlenebilir ekran ve soldan sağa Int32 işlemleri. Kaynaktaki tek sayı `=` davranışı dahil korunur; çökme oluşturan girdiler hata mesajı verir.                               |
| HCJEditor          | Gerçek editör uyarlaması                 | Özgün HTML/CSS/JS alanları, canlı ön izleme, dosya yükleme, kısayollar ve birleştirilmiş HTML indirme. Kod yerelde ve iki aşamalı opaque sandbox içinde çalışır; bir servise gönderilmez.                     |
| DinoCore           | Var olan harici Unity oyunu              | Gerçek WebGL sahnesi ve coin tıklaması tarayıcıda doğrulandı. Büyük build dosyaları kopyalanmadı; yalnız ziyaretçi bağlantıyı açınca yüklenir. İlk denemede geçici 503, sonraki iki oturumda başarı görüldü.  |
| Kutlumi            | Onaylı gerçek ekranlar                   | Ek demo zorlanmadı. Kişisel kutlamalar, mesajlar, fotoğraflar ve private kaynaklar kullanılmadı.                                                                                                              |
| Lina               | Onaylı gerçek ekranlar                   | Yerel model/backend gerektiğinden canlı AI izlenimi veren sahte sohbet eklenmedi.                                                                                                                             |
| Racker             | Gerçek ekran gezgini                     | Android/Wear OS kompozisyonları arasında geçiş. Çalışan mobil uygulama taklidi yok; Google Play bağlantısı öncelikli.                                                                                         |
| Deepfake Detection | Ekip projesi açıklaması ve public kaynak | İzni ve gerçek kayıtlı model çıktısı birlikte doğrulanmış örnek yok. Analiz demosu, rastgele skor veya belirsiz yüz eklenmedi.                                                                                |
| SecureFace         | Sürüklenebilir kayıtlı karşılaştırma     | Onaylı kendi yüzünü içeren ekranın hizalanmış iki bölgesi CSS ile gösterilir. Canlı model, şifreleme veya geri yükleme çalıştırılmaz.                                                                         |
| RubikRL            | Bağımsız küp simülasyonu                 | 54 sticker, yasal yüz dönüşleri/tersleri, kamera, karıştırma ve sıfırlama. Private motor kopyalanmadı; model veya AI çözücü çalıştırılmaz.                                                                    |

SecureFace ve Deepfake ekip çalışmasıdır; bireysel görev dağılımı veya katkı bölümü oluşturulmadı. Adaptasyonlarda temel güvenlik ve çökme korumaları dışında yeni oyun/hesaplama özelliği eklenmedi. Ayrıntılar: [özgün uygulamalar](DEMO_LEGACY_SOURCES.md), [editör](DEMO_EDITOR_SOURCES.md), [küp](DEMO_CUBE_SOURCES.md), [Unity doğrulaması](DEMO_DINOCORE_SOURCES.md).

## İzolasyon, kaynaklar ve gizlilik

Özgün kaynaklar salt okunur incelendi; orijinal proje dosyaları değiştirilmedi. Public eski uygulamaların repo/sürüm/SHA bilgileri kaynak belgelerinde yer alır. Private küp projesinin ayrıntılı parmak izleri yalnız yerel inceleme klasöründedir. Public çıktıda private araştırma kodu, hesap listesi, token, model ağırlığı, gerçek mesaj veya yeni kişisel veri yoktur. Onaylı 27 kaynak görsel ve iki CV birebir korunur; her dil kendi CV’sini indirir. Dil tercihi, `/en/`, eski `/tr/`, canonical/hreflang ve 28 sayfalık sitemap korunur. Standalone demo HTML’leri noindex’tir.

Dört iframe demosu yalnız açma eyleminden sonra oluşturulur. Hiçbirinde `allow-same-origin` yoktur. Editör ön izlemesi ikinci bir `allow-scripts` sandbox’ıdır; üst sayfa DOM/storage, popup, üst sayfaya yönlendirme ve form gönderimi kapalıdır. CSP uzak ağ API’lerini, script/font ve görsel yüklemelerini sınırlar. Dosyalar yerel File/Blob API’leriyle okunur/indirilir.

Tarayıcı sandbox’ı evrensel bir ağ/CPU hapishanesi değildir: kullanıcı kodu kendi opaque çerçevesine başka bir adres yükleyebilir veya CPU tüketebilir. Uygulama böyle bir isteği başlatmaz ve kodu bir servise göndermez. Kapatma iframe’i kaldırır; kaydedilmemiş editör ve oturumluk oyun verisi kaybolur. İndirilen HTML, site dışında açıldığında çevrimiçi sandbox kurallarına tabi değildir. Bu sınırlar tam izolasyon iddiasıyla gizlenmez.

## Doğrulama ve performans

Yerel tam koşu: **93 başarılı Playwright testi, WebKit’in desteklemediği bir CLS API testi atlandı**. Kaynak oranı/yer kayması düzeltmeleri sonrasında ilgili testler tekrar çalıştırılır; CI tüm paketi yeniden çalıştırır. Yeni kontroller hesap makinesi işlemlerini, özgün oyun ekonomisini, editör dosyalarını/sandbox’ını, küp matematiğini, gerçek detail iframe entegrasyonunu, karşılaştırma/ekran gezginini ve tüm sayfaların iki dil × iki tema × iki ekran boyutunu kapsar. Fiziksel telefon kabulü ve manuel ekran okuyucu testi yapılmadı.

Typecheck strict, ESLint, Prettier, production build ve dokuz içerik/gizlilik/bütünlük testi yayın öncesi zorunludur. Kaynak/build CV SHA-256, whitelist görseller, demo dosyaları, metadata ve gizli veri kontrolleri korunur. İlk kart testi ekran dışındaki koordinata tıklıyordu; görünür gerçek yüzeye tıklayacak şekilde düzeltildi, beklentisi zayıflatılmadı.

Lighthouse 13.6.0 ölçümlerinde **GPU kapatılmadı**. Grid maskesi ve gereksiz isolation katmanları kaldırıldı, ağır demolar açılmadan yüklenmez. Başlangıç Phase 4 yeniden ölçümü bile 100 verdiği için eski 70–72 düşüşünü yalnız grid’e bağlamak doğru değildir. İlk v1 mobil ana sayfa tekrarları, masaüstü, Hakkımda ve İngilizce mobil 100 verdi. Projeler 97/CLS 0,080, editör 92/CLS 0,176 verdi; native görsel oranı yüklenmeden önce ayrılarak gerçek yer kayması nedeni düzeltildi. Son ölçümlerde CLS sıfıra/yaklaşık 0,002’ye indi. İlk ekrandaki detay kapakları ve ilk proje kartı eager yüklenir; aşağıdaki görseller lazy kalır. Bu son yükleme önceliği düzeltmesinden sonra kurulu Chrome’da editör de 100 performans/TBT 0/CLS 0 verdi.

Buna rağmen Windows test Chromium 159’da bazı ölçümler 70–71 performans ve 2–6 saniye `Other/Unattributable` bekleme verdi. Kurulu gerçek Chrome 158’de ana sayfa ve Projeler 100/TBT 0, editör bir ölçümde 74/TBT 1,5 sn verdi. Metin kontrol sayfası 100’dür. Script çalışması kısa kalırken GPU/renderer beklemesi görüldü; kesin sürücü kök nedeni kanıtlanmadı. Düşük ölçümler saklandı; GPU kapalı bir başarı puanı kullanılmadı. Production sonucu veya fiziksel mobil performansı bu yerel emülasyonlardan çıkarılmaz.

Bu belirsizliği sessizce geçmemek için Linux CI’da da beş temsilci sayfa varsayılan GPU ile ölçülür: ana sayfa, Projeler, editör detayı, Hakkımda ve İngilizce ana sayfa. Her biri için performans ≥90, erişilebilirlik/best practices/SEO 100 ve CLS <0,1 yayın kapısıdır. Başarısızlıkta eşik düşürülmez veya merge yapılmaz. Ham JSON’lar CI artifact ve yerel PortfolioReview raporlarında tutulur.

## Yayın ve son rapor

Kullanıcı bu görev için PR #1’in test/gizlilik kapıları geçildiğinde merge edilmesine ve GitHub Pages yayınına açık onay verdi. Genel AGENTS.md onay kuralı değiştirilmez. Feature dalı force push edilmez; başka repository’ye yazılmaz. CI başarılı olmadan merge, başarılı deployment/production doğrulaması olmadan v1.0.0 tag/release oluşturulmaz.

`PORTFOLIO_BASE_URL=https://ilhanbuilds.github.io` ile aynı Playwright paketi production’a yönlendirilir. `scripts/verify-published.mjs` 45 HTML adresini, yerel asset hedeflerini, demo/ikon/CV byte hash’lerini ve 1200 × 630 OG boyutunu doğrular. Yayın sonrası broken link/image, JS hatası, yanlış CV, eski yönlendirmeler ve çalışan demolar tekrar kontrol edilir. Kaynakların gerçek yayında doğrulanmış olması ayrıca kaydedilir.

PortfolioReview’de 120 tam sayfa kombinasyonu ve 48 açık demo/ön izleme görüntüsü hazırlanır. Bunlar, ölçümler ve ayrıntılı son Türkçe rapor public repository dışında tutulur. Gerçek commit/merge/deployment, canlı site ve release bağlantıları görev sonundaki teslimat raporunda bulunur. Tarihsel Phase 2–4 raporları önceki aşamaların kaydıdır.
