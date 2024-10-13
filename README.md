Proje İsmi:
- AniList Webhook Notifier

Açıklama:
AniList Webhook Notifier, AniList API'sini kullanarak anime serilerinin yeni bölümlerinin ne zaman yayınlanacağını takip eden bir sistemdir. Bu proje, Discord Webhook ile entegre edilmiştir ve yeni anime bölümleri çıktığında otomatik olarak Discord kanalınıza bir mesaj gönderir. Mesajda anime adı, bölüm numarası, yayınlanma zamanı ve AniList sayfasına yönlendiren bir buton bulunmaktadır.

Özellikler:
- AniList API Entegrasyonu: Her 10 dakikada bir AniList API'ye istek göndererek yeni bölümleri kontrol eder.
- Discord Webhook Entegrasyonu: Yeni bir bölüm bulunduğunda, Discord Webhook aracılığıyla belirlenen kanala mesaj gönderir.
- Embed ve Butonlu Mesajlar: Mesajlar, kullanıcı dostu bir görünüm için gömülü (embed) şekilde gönderilir ve "Animeyi İzle" butonu eklenir.
- Zaman Bilgilendirme Formatı: Discord'un <t:time:R> formatını kullanarak bölümün ne zaman yayınlanacağını kullanıcıya sunar.
- Kullanım Alanları:
- Bu proje, anime hayranları toplulukları için idealdir. Özellikle sürekli olarak yeni bölümleri takip eden bir topluluk sunucunuz varsa, bu araç otomatik olarak bilgi verir ve izleyicilere en son çıkan bölümleri kaçırmamalarını sağlar.

Kurulum ve Kullanım:
1. Projeyi Klonlayın:
   git clone https://github.com/erslly/anilist-webhook-notifier.git
cd anilist-webhook-notifier

2. Bağımlılıkları Yükleyin: 
   npm install

3. Konfigürasyonu Yapın:
    app.js dosyasında Discord webhook URL'nizi ve AniList API'sine uygun ayarları yapın. Webhook URL'sini aşağıdaki satıra ekleyin:
   const discordWebhookURL = 'https://discord.com/api/webhooks/...';

4. Çalıştırma:
   node app.js

5. Otomatik Çalıştırma:
   Uygulama her 10 dakikada bir yeni bölümleri kontrol eder ve bulunduğunda Discord kanalına gönderir.
   
