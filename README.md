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


## Yeni arayüz ve prototip geliştirmeleri

İlk geliştirme paketi:
- Kontrol merkezi ve ana gezinme.
- Koyu/açık tema tercihi.
- Tarayıcıda üretilen basit ses efektleri.
- Destekleyen tarayıcılarda sesli komut ve metin okuma.
- Sentetik ağ üzerinde Dijkstra/A* algoritma denemesi.
- Veri kaynakları ve sınırlamalar ekranı.
- PWA manifesti ve uygulama kabuğu için Service Worker önbelleği.

### Henüz tamamlanmayan / doğrulanmayan işler
- Service Worker yalnızca aynı kaynaktaki uygulama dosyalarını önbelleğe alır. Harita karoları, Overpass, Nominatim ve rota servisi çevrimdışı çalışmaz.
- PWA yükleme deneyimi tarayıcı/cihaz desteğine bağlıdır; simge dosyaları ve gerçek cihaz testi ayrıca gereklidir.
- Çoklu dil için arayüz altyapısı hazırlanmıştır; bütün metinlerin çevirisi tamamlanmamıştır.
- Sesli komut ve sesli okuma Web Speech API desteğine ve mikrofon iznine bağlıdır.
- Alternatif rota, çoklu hedef rotası ve gerçek harita üzerinde algoritma kıyaslaması henüz tamamlanmamıştır.
- Nüfus yoğunluğu, mahalle risk analizi, resmî uyarı, doğrulanmış toplanma alanları ve hasar/yol bildirimi için doğrulanmış kaynak ve/veya sunucu tarafı doğrulama altyapısı gerekir.
- Kullanıcı hesabı, gönüllü yönetimi, yönetici onayı ve fotoğraflı bildirim için güvenli backend, kimlik doğrulama, depolama ve moderasyon gerekir.
- PDF/Excel raporları henüz yoktur; bu sürüm temel CSV dışa aktarma sunar.
- 3D harita, alan ölçümü, çok kriterli optimizasyon ve yardım dağıtım planlayıcısı henüz eklenmemiştir.

**Test durumu:** Kaynak kodu GitHub'a kaydedildi. Gerçek tarayıcı, mobil cihaz, erişilebilirlik, servis kesintisi ve algoritma performans testleri henüz yapılmadı. Sentetik algoritma testi yalnızca örnek ağda çalışır; gerçek afet rotası veya risk değerlendirmesi değildir.


## Araştırma laboratuvarı (yeni prototip)

- Senaryo stres testi: maliyet katsayısının toplam örnek maliyete etkisini gösterir.
- Basit kaynak dağıtım hesaplayıcısı: örnek taleplere oransal dağıtım yapar.
- Araştırma kontrol listesi: resmî kaynak, güncellik, kapsam, veri eksikleri ve test adımlarını takip eder.
- Veri kaynağı sicili: kaynak adı, kontrol tarihi ve doğrulama durumunu yerel olarak kaydeder.
- Karar günlüğü: proje kararlarını gerekçeleriyle saklar.
- Deney defteri: stres testi sonuçlarını saklar; JSON ve CSV dışa aktarımı sunar.

Bu modül `research-lab.js` dosyasında bulunur ve tarayıcı `localStorage` alanını kullanır. Veriler cihazlar arasında eşitlenmez; tarayıcı verileri temizlenirse kaybolabilir.

### Yeni fikir havuzu
- Mahalle bazlı belirsizlik ve veri kapsama haritası.
- Erişilebilirlik göstergeleri (rampa/kaldırım verisi mevcutsa).
- Yardım dağıtımında adalet ölçütleri ve talep karşılama oranı.
- Algoritma açıklanabilirlik kartı: seçilen yolun hangi maliyetlerle oluştuğunu gösterme.
- Veri güncelliği alarmı ve kaynak değişim geçmişi.
- Afet senaryosu için nüfus/kapasite duyarlılık analizi; yalnızca güvenilir ve izinli veri bulunduğunda.

**Sınırlar:** Bu hesaplayıcılar örnek/sentetik girdilerle çalışan araştırma araçlarıdır. Resmî afet verisi, gerçek zamanlı ekip yönetimi, güvenli rota kararı veya tahliye talimatı üretmez.

## Arayüz iyileştirmeleri

- Daha belirgin başlık ve kart hiyerarşisi, mobil uyumlu istatistik kartları.
- Klavye ile erişilebilir odak göstergeleri ve azaltılmış hareket tercihi.
- Araştırma laboratuvarı için bölüm gezinmesi ve komut arama penceresi (Ctrl/⌘ + K).
- Yazdırılabilir rapor görünümü.
- Service Worker önbellek sürümü güncellendi.

`ui-polish.js` görsel düzen ve gezinme iyileştirmelerini sağlar. Bu arayüz geliştirmeleri gerçek kullanıcı testi veya erişilebilirlik sertifikasyonu yerine geçmez.


## İleri matematik ve optimizasyon merkezi

`advanced-lab.js` ile beş geliştirme prototipi eklendi:

1. **Algoritma performans laboratuvarı:** Dijkstra ve A* yöntemlerini aynı sentetik graf üzerinde tekrar sayısına göre ölçer; süre, ziyaret edilen düğüm ve yol maliyetini gösterir.
2. **Darboğaz ve graf merkeziyet analizi:** Düğüm derecesi, örnek en kısa yolların ara düğüm kullanımı ve bağlantı kaldırma testiyle köprü bağlantıları inceler. Ara düğüm kullanımı basit bir gösterge olup tam betweenness merkeziyeti değildir.
3. **Çok amaçlı rota optimizasyonu:** Mesafe, süre ve sentetik erişilebilirlik maliyetini kullanıcı ağırlıklarıyla normalize ederek üç örnek rotayı karşılaştırır.
4. **Adil yardım dağıtımı:** Max-min adalet yaklaşımıyla örnek taleplerin karşılanma oranlarını eşitlemeye çalışır.
5. **Veri güvenilirliği ve belirsizlik:** Kaynak kontrolü, güncellik, kapsam ve eksik kayıt girdilerinden şeffaf bir veri hazırlık göstergesi hesaplar.

**Önemli sınırlamalar:** Algoritma ağı, rota alternatifleri ve dağıtım talepleri sentetiktir. A* sezgiseli örnek graf için gösterim amaçlıdır; büyük ağlarda performans veya optimallik iddiası değildir. Erişilebilirlik maliyeti gerçek kaldırım/rampa verisi değildir. Veri göstergesinin ağırlıkları bilimsel olarak kalibre edilmemiştir. Bu araçlar gerçek afet kararı, güvenli rota veya tahliye talimatı üretmez. Gerçek Melikgazi yol ağına geçiş için veri kaynağı, lisans/atıf, ağ temizliği, koordinat eşleştirmesi ve uzman doğrulaması gerekir.
