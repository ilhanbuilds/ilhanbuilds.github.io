# v1.1.0 son düzenlemeler

Mevcut 11 proje, kronoloji, iki sütunlu kartlar, Racker vitrini, Türkçe kök ve İngilizce adresler korunur. Son kullanıcı talebi, kabul kriterleri ve son commit CI başarılı olduktan sonra PR #2 merge, Pages deployment ve v1.1.0 release işlemlerine açık yetki verir. Önceki aşama raporlarındaki yayın yasağı o aşamaya ait tarihsel kayıttır.

- İngilizce kapaklar özgün Türkçe tasarımlardan yerelleştirildi. Gerçek arayüz metinleri değiştirilmedi. Katmanlı kaynak/font bulunmadığından yakın Segoe fontu ve eski metin bölgesinde yerel arka plan onarımı kullanıldı. Türkçe orijinaller aynı; yöntem ve sınırları `COVER_LOCALIZATION_FINAL.md` açıklar.
- Hakkımda sayfası kompakt iki sütun, kare özgün profil fotoğrafı, eğitim/ilgi alanları ve ikonlu iletişim/CV bağlantıları kullanır. Kullanıcının son kararıyla eski restoran portresi korundu; yüz düzenlenmedi, mevcut kare CSS kadrajı değişmedi. Metinler hazır CV’deki geliştirme ve test yönelimiyle tutarlıdır. LinkedIn bağlantısı korunur; mevcut profil içeriği otomatik erişimde alınamadığından bağımsız içerik eşitliği iddia edilmez.
- Detaylarda oklu geri dönüş, aynı dilde listeye isteğe bağlı oturumluk kaydırma dönüşü ve mevcut sıradan üretilen üç düğümlü komşu navigasyonu vardır. İlk/son projeler sarılmaz.
- Galeriler korunur; lightbox chevronları görsel dışındaki yan alanlardadır. Klavye, dokunma, Escape ve odak dönüşü sürer. RubikRL galerisinde yalnız düzenli/karışık küp kalır; geniş kaynak dosyası silinmez.
- SecureFace kayıtlı karşılaştırmasının dikey tutamacı fare/dokunma ile sürüklenir; slider semantiği ve klavye kontrolü korunur. Kayıtlı kadraj değişmez.
- Bilekten ses seviyesi ve Racker kilo senkronizasyonu yalnız geçici tarayıcı durumuyla çalışan sembolik örneklerdir. Gerçek sistem sesi, sağlık kaydı, bağlantı, izin, kalıcı depolama veya yeni ürün özelliği oluşturmaz. Racker’ın gerçek ekranları ve mağaza bağlantısı korunur.
- Dört iframe deneyimi viewport yakınında yüklenir. Küp yüksekliği yalnız kendi frame kaynağından doğrulanan içerik ölçümüne göre ayarlanır. Demolar ortalı, uygun genişlikte ve ince mavi çerçevelidir; içerik gizleyerek scrollbar bastırılmaz.
- HCJEditor canlı HTML/CSS/JS ön izlemesi sürer; dosya simgeleri yerelleştirilmiş demo uyarısı verir. Dosya API’leri, modal ve indirme izni kaldırılmıştır. Tüm dış sandbox’lar yalnız `allow-scripts` içerir; aynı kaynak izni yoktur. Özgün repository değiştirilmez.
- Deepfake gerçek arayüzünün izin belirsiz üçüncü taraf görüntüsü opak kapatılmıştır. Kayıtlı skor/süre değiştirilmez; sonuç bu kayda aittir, model başarımı değildir. Canlı analiz eklenmez. Calculator’da yalnız imleç/halo bölgesi temizlenir. Eski kaynaklar korunur; `FINAL_MEDIA.md` yöntemleri kaydeder.

## Doğrulama ve yayın sırası

Strict Astro/TypeScript, ESLint, Prettier, production build, onaylı medya/CV hash ve gizlilik testleri; Chromium ve WebKit regresyonları çalıştırılır. Yeni testler ses sınırları, kilo biçimi/eşzamanlılık, liste konumu, komşu sınırları, doğrudan sürükleme, chevronlar ve 360/390/412/768/1024/1440/1920px demo boyutlarını kapsar. Lighthouse performans eşiği 95’e yükseltilmiştir; diğer kategoriler 100 ve CLS < 0.1 koşulları sürer.

Fiziksel cihaz kabulü yapılmaz; mobil kontroller tarayıcı emülasyonudur. Tam sayfa ekran görüntüleri ve ayrıntılı ölçümler public kaynak dışında `PortfolioReview/v1.1.0` altında tutulur. Başarılı yerel kontrollerden sonra feature push ve tam son SHA CI doğrulanır; ardından main merge/Pages deployment, production TR/EN tüm sayfa/galeri/demo/CV/asset smoke testleri ve en son v1.1.0 release yapılır. Sonuçlar yerel teslimat raporuna kaydedilir.
