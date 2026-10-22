 # AfetYol AI — Melikgazi Afet Destek Haritası

Bu depo, Melikgazi/Kayseri için geliştirilmekte olan öğrenci araştırma projesinin ilk web prototipini içerir.

## İlk sürümde neler var?

- Mobil uyumlu harita (Leaflet + OpenStreetMap).
- Kullanıcı izniyle cihaz konumu; izin yoksa haritadan başlangıç seçme.
- Adres/yer arama.
- OpenStreetMap üzerinde kayıtlı hastane, itfaiye, eczane, barınma ve toplanma alanı etiketlerini arama.
- Haritada bulunan noktalardan hedef seçme.
- Yürüyüş/araç rotası isteme ve mesafe/süre tahminini gösterme.
- Harita verisi, kaynak ve güvenlik sınırlarını görünür biçimde belirtme.

## GitHub Pages ile yayımlama

1. Depoda Settings → Pages bölümünü aç.
2. Build and deployment altında Deploy from a branch seç.
3. Branch olarak main, klasör olarak /(root) seç ve Save de.
4. Birkaç dakika sonra Settings → Pages bölümünde gösterilen bağlantıyı aç.

## Veri kaynakları

- Harita: OpenStreetMap katkıda bulunanlar.
- Harita noktaları: Overpass API üzerinden OpenStreetMap verisi.
- Yer arama: Nominatim.
- Rota: OpenStreetMap topluluğunun sunduğu herkese açık rota servisleri.

Bu servisler herkese açık altyapılardır; kullanım limitleri, kesinti ve veri eksikliği olabilir. Uygulama, servislerin sürekli çalışacağını garanti etmez. Proje büyüdüğünde kullanım şartlarına uygun, kararlı bir servis veya kendi altyapımız seçilmelidir.

## Önemli güvenlik sınırları

- Bu uygulama resmî afet/acil durum sistemi değildir.
- OSM'de “toplanma alanı” etiketi olan her kayıt resmî olarak doğrulanmış olmayabilir. Aramada sonuç çıkmaması da bölgede resmî alan olmadığı anlamına gelmez.
- Rota mesafesi yol ağı üzerinden hesaplanmaya çalışılır; süre yalnızca tahmindir.
- Bu sürümde canlı yol kapanması, bina hasarı, yangın, sel, deprem şiddeti veya doğrulanmış güvenlik puanı verisi yoktur. Bu nedenle “en güvenli rota” iddiası yoktur.
- Gerçek acil durumda 112, AFAD ve yetkili kurumların güncel talimatlarını izleyin.
- Konum özelliği tarayıcı iznine bağlıdır. Konum bilgisi bu kodda bir sunucuya kaydedilmez; harita/arama/rota sağlayıcılarına istek atılırken ilgili koordinatlar üçüncü taraf servise gönderilebilir.

## Sonraki geliştirme aşamaları

1. Resmî toplanma alanlarını AFAD/belediye kaynaklarıyla doğrulamak ve veri tarihini göstermek.
2. Yol kapanması ve tehlike bildirimi için doğrulama akışı eklemek.
3. Graf modeli oluşturmak: kavşaklar düğüm, yollar kenar; Dijkstra ile en kısa yol, daha sonra doğrulanmış risk ağırlıklarıyla alternatifler.
4. Algoritmayı test etmek için sentetik senaryolar ve ölçülebilir değerlendirme metrikleri oluşturmak.
5. İsteğe bağlı erişilebilir rota bilgileri (kaldırım/rampa bilgisi varsa), çoklu dil ve yazdırılabilir yardım raporu eklemek.

## Yerel çalıştırma

index.html dosyasını tarayıcıda açabilirsin. Konum özelliği ve bazı tarayıcı API'leri için HTTPS veya yerel sunucu gerekebilir. GitHub Pages HTTPS üzerinden sunar.
