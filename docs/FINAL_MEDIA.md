# Son görsel düzenlemeler

## Profil fotoğrafı

`src/assets/images/personal/profile.webp`, kullanıcının seçtiği `profile.jpeg`
fotoğrafından oluşturuldu. Tam kadraj ve 1536 × 2048 oranı korundu; yüz düzenlemesi,
üretken görsel işlemi, esnetme veya kaynak dosyada değişiklik yapılmadı. Kare
görünüm sayfa üzerinde CSS ile uygulanır. Önceki portre dosyası korundu.

## Deepfake kayıtlı arayüzü

`src/assets/images/deepfake/interface-anonymized.webp`, gerçek uygulama ekranının
anonimleştirilmiş kopyasıdır. Üçüncü taraf görüntüsünün yayın izni doğrulanamadığı
için videonun fotoğraf alanı opak bir blokla geri döndürülemez biçimde kapatıldı.
Kaynak görsel repository'ye eklenmedi. Maske dışında kalan pikseller kayıpsız WebP
çözümlemesinde kaynak ekranla birebir aynıdır.

Görüntüdeki %87,2 skoru ve 13,9 saniye, kaynak kayıtta görülen alanlardır. Yeni
ölçüm, doğruluk oranı veya portfolyoda çalışan canlı analiz olarak sunulmaz. Galeri
açıklaması bunun anonimleştirilmiş, kayıtlı bir arayüz olduğunu belirtmelidir.
Mevcut temsili proje kapağı bundan ayrıdır ve korunur.

## Calculator

`src/assets/images/calculator/calculation-clean.webp` için mevcut ve eski ekran
görüntüsü klasörleri incelendi; aynı işlem ekranının temiz sürümü bulunamadı.
Yalnızca fare imleci ve mavi vurgusu, aynı satırdaki boş ekran alanından alınan
piksellerle temizlendi. `128+256` metni, metin imleci, pencere, düğmeler ve düzen
korundu. İki sınırlı düzenleme alanı dışındaki pikseller kaynakla birebir aynıdır.
Eski WebP ve orijinal PNG değiştirilmedi.

## Doğrulama

- Üç kaynak dosyanın işlem öncesi/sonrası SHA-256 değerleri eşittir.
- Deepfake ve Calculator çıktıları kayıpsız WebP'dir; maske dışındaki değişen
  piksel sayısı sıfırdır.
- Dosyalarda EXIF veya XMP metadata korunmaz.
- Üç çıktı görsel olarak incelendi: profil doğal kadrajını korur, üçüncü taraf yüz
  görünmez, Calculator üzerinde fare işaretçisi veya mavi vurgu kalmaz.
- Ayrıntılı kaynak yolları, hash değerleri ve maske koordinatları yalnızca yerel,
  Git tarafından dışlanan provenance kaydında tutulur.

## Son portre kararı

Kullanıcının son talimatı doğrultusunda yeni profil türevi kullanılmadı. Mevcut `personal/portrait.webp` ve özgün 50% 45% kare CSS kadrajı korunur. Yeni profile.webp dosyası yayın kapsamından çıkarıldı.
