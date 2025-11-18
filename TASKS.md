# Proje Yeniden Yapılandırma Planı

Bu dosya, projenin kod kalitesini, okunabilirliğini ve sürdürülebilirliğini artırmak amacıyla yapılacak olan yeniden yapılandırma (refactoring) çalışmalarını planlamak ve takip etmek için oluşturulmuştur.

## Ana Hedefler

- **Kod Temizliği:** Gereksiz, tekrar eden ve kullanılmayan kodları temizlemek.
- **Okunabilirlik:** Kodun daha anlaşılır ve takip edilebilir olmasını sağlamak.
- **Tutarlılık:** Proje genelinde tutarlı bir kod stili, isimlendirme ve dosya yapısı oluşturmak.
- **Performans:** Yapılan iyileştirmelerle birlikte uygulama performansını gözden geçirmek.
- **Sürdürülebilirlik:** Gelecekteki geliştirmeleri daha kolay ve hatasız yapabilmek için sağlam bir temel oluşturmak.

---

## Yapılacaklar Listesi

Aşağıdaki adımlar, projeyi adım adım daha iyi bir yapıya kavuşturmak için izleyeceğimiz yol haritasını göstermektedir. Her adımı tamamladığımızda işaretleyeceğiz.

### Adım 1: Dosya ve Klasör Yapısı

- [ ] **Bileşen Organizasyonu:** `components` klasöründeki bileşenleri atomik tasarım prensiplerine göre (atom, molekül, organizma vb.) veya özellik bazlı (feature-based) olarak yeniden gruplandırmayı değerlendirmek.
- [ ] **`app` Dizin Yapısı:** Next.js App Router yapısını daha verimli kullanmak için `(views)` gibi gruplamaları ve sayfa organizasyonunu gözden geçirmek.
- [ ] **Yardımcı Fonksiyonlar ve Hook'lar:** `lib`, `hooks`, `contexts` ve `services` klasörlerinin sorumluluk alanlarını netleştirmek ve gerekirse dosyaları doğru yerlere taşımak.

### Adım 3: Bileşenlerin Yeniden Yapılandırılması (Refactoring)

- [ ] **Büyük Bileşenleri Parçalama:** Çok fazla sorumluluğu olan veya çok uzun olan bileşenleri daha küçük ve yeniden kullanılabilir parçalara ayırmak (Single Responsibility Principle).
- [ ] **Prop Drilling'i Önleme:** Gereksiz yere bir bileşenden diğerine props aktarımını (prop drilling) tespit edip, bunu `Context API` veya diğer state management çözümleriyle iyileştirmek.
- [ ] **Koşullu Render'ları Temizleme:** Karmaşık `JSX` içindeki koşullu render mantıklarını daha okunabilir hale getirmek.
- [ ] **Shared (Paylaşılan) Bileşenleri Belirleme:** Projenin farklı yerlerinde kullanılan ortak UI elemanlarını `components/shared` altında toplamak ve standartlaştırmak.

### Adım 4: Tekrar Eden Kodları (DRY) Ortadan Kaldırma

- [ ] **Özelleştirilmiş Hook'lar (Custom Hooks) Oluşturma:** Bileşenler içinde tekrar eden mantıkları (örneğin, API istekleri, form yönetimi) soyutlayarak `hooks` klasörüne taşımak.
- [ ] **Yardımcı Fonksiyonlar (Utility Functions) Oluşturma:** Proje genelinde tekrar eden saf fonksiyonları (örneğin, tarih formatlama, veri işleme) `lib/utils.js` gibi merkezi bir yerde toplamak.

### Adım 5: State Yönetimini İyileştirme

- [ ] **Context API Kullanımını Gözden Geçirme:** Mevcut `context`'lerin gerçekten gerekli olup olmadığını ve doğru şekilde kullanılıp kullanılmadığını kontrol etmek.
- [ ] **Global State İhtiyacını Değerlendirme:** Proje büyüdükçe daha gelişmiş bir state management kütüphanesine (Zustand, Redux Toolkit vb.) ihtiyaç olup olmadığını analiz etmek.

### Adım 6: Asenkron İşlemler ve API Servisleri

- [ ] **API İsteklerini Merkezileştirme:** `fetch` veya `axios` çağrılarını `services/api.service.js` gibi tek bir yerden yöneterek daha tutarlı hale getirmek.
- [ ] **Veri Çekme (Data Fetching) Kütüphanesi:** Sunucu durumunu (server state) yönetmek için `React Query (TanStack Query)` veya `SWR` gibi kütüphaneleri entegre etmeyi değerlendirmek. Bu, caching, revalidation ve error handling gibi konuları basitleştirir.

### Adım 7: Kod Temizliği ve Belgelendirme

- [ ] **Kullanılmayan Kodları Kaldırma:** Projede hiç kullanılmayan bileşenleri, fonksiyonları, değişkenleri, yorum satırlarını ve `console.log` ifadelerini temizlemek.
- [ ] **Yorum Satırları Ekleme:** Karmaşık veya anlaşılması zor olan kod bloklarına açıklayıcı yorumlar eklemek.
- [ ] **JSDoc ile Belgelendirme:** Önemli fonksiyonlar ve bileşen `props`'ları için JSDoc standartlarında belgelendirme yapmak.

---
