# Coolify Deployment Rehberi - Next.js + PostgreSQL

Bu rehber, Next.js ve PostgreSQL kullanılan berber randevu sistemini Coolify'de deploy etmek için gereken tüm adımları içerir.

## Gereksinimler

- Coolify kurulumu yapılmış bir sunucu
- PostgreSQL veritabanı (Coolify'de servis olarak eklenebilir)
- Git repository erişimi

## 1. Veritabanı Kurulumu

### PostgreSQL Servisi Oluşturma

1. Coolify'de yeni bir **Database** servisi oluşturun
2. **PostgreSQL** seçin
3. Veritabanı bilgilerini not edin:
   - Database Name: `berber_db`
   - Username: `postgres` (veya özel kullanıcı adı)
   - Password: (güvenli bir şifre belirleyin)
   - Host: (Coolify otomatik olarak sağlar)

### Migration Çalıştırma

Veritabanı oluşturulduktan sonra migration'ı çalıştırın:

```bash
# PostgreSQL container'ına bağlanın
docker exec -it <postgres_container_name> psql -U postgres -d berber_db

# Migration dosyasını çalıştırın
\i /path/to/migrations/001_initial_schema.sql
```

Veya Coolify'in Database servisi üzerinden SQL Editor kullanarak migration dosyasını çalıştırabilirsiniz.

## 2. Next.js Uygulaması Deployment

### Repository Bağlama

1. Coolify'de yeni bir **Application** oluşturun
2. Git repository'nizi bağlayın
3. Branch seçin (genellikle `main` veya `master`)

### Build Pack Seçimi

- **Nixpacks** seçin (otomatik Next.js algılama)
- Veya **Dockerfile** kullanın (önerilen)

### Environment Variables

Aşağıdaki environment variable'ları Coolify'deki Environment Variables bölümüne ekleyin:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@postgres-service:5432/berber_db

# Next.js Configuration
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Optional: Individual DB variables (if DATABASE_URL is not used)
DB_HOST=postgres-service
DB_PORT=5432
DB_NAME=berber_db
DB_USER=postgres
DB_PASS=your_password
```

**Önemli**: `DATABASE_URL` içindeki host, PostgreSQL servisinin Coolify'deki internal service adı olmalıdır (ör: `postgres-service`).

### Port Yapılandırması

- Port: `3000` (Next.js default port)
- Coolify otomatik olarak bu portu kullanır

### Build Komutları

Eğer Nixpacks kullanıyorsanız, `nixpacks.toml` dosyası otomatik olarak kullanılır.

Eğer Dockerfile kullanıyorsanız, Dockerfile otomatik olarak kullanılır.

### Deployment

1. Deploy butonuna tıklayın
2. Build loglarını takip edin
3. Hata varsa Troubleshooting bölümüne bakın

## 3. İlk Kurulum

### Admin Şifresi Ayarlama

İlk deployment'tan sonra, admin şifresini ayarlamanız gerekebilir:

1. PostgreSQL veritabanına bağlanın
2. `settings` tablosuna admin şifresini hash'leyerek ekleyin:

```sql
-- Bcrypt hash için bir script kullanın veya API endpoint'ini kullanın
-- Default şifre: VALENTINO2024
UPDATE settings 
SET admin_password = '$2b$10$...' -- Bcrypt hash
WHERE key = 'global';
```

Veya ilk girişte default şifre (`VALENTINO2024`) ile giriş yapıp admin panelden şifreyi değiştirebilirsiniz.

### Veri Ekleme

İlk kurulum için bazı veriler ekleyebilirsiniz:

```sql
-- Örnek berber ekleme
INSERT INTO barbers (name, specialty, image_url) 
VALUES ('Samet Valentino', 'Kurucu & Usta Berber', 'https://...');

-- Örnek hizmet ekleme
INSERT INTO services (name, description, price, duration) 
VALUES ('Profesyonel Saç Tasarımı', 'Kişiye özel kesim', 400, 60);
```

## 4. Troubleshooting

### "Database connection error" Hatası

**Neden**: PostgreSQL'e bağlantı kurulamıyor.

**Çözüm**:
1. Environment variable'ları kontrol edin (`DATABASE_URL` veya `DB_*` değişkenleri)
2. PostgreSQL servisinin çalıştığından emin olun
3. Network ayarlarını kontrol edin (Coolify'de servisler arası iletişim)
4. Veritabanı bilgilerinin doğru olduğundan emin olun

### "No available server" Hatası

**Neden**: Next.js uygulaması başlamıyor.

**Çözüm**:
1. Build loglarını kontrol edin
2. `package.json` dosyasında `build` ve `start` script'lerinin olduğundan emin olun
3. Port'un `3000` olduğundan emin olun
4. Environment variable'ları kontrol edin

### "404 Not Found" Hatası (API Routes)

**Neden**: API route'ları çalışmıyor.

**Çözüm**:
1. Next.js build'inin başarılı olduğundan emin olun
2. API route'larının doğru dizinde olduğundan emin olun (`app/api/`)
3. Database bağlantısını kontrol edin

### Migration Hatası

**Neden**: Migration çalıştırılamıyor.

**Çözüm**:
1. PostgreSQL servisinin çalıştığından emin olun
2. Migration dosyasının doğru olduğundan emin olun
3. Veritabanı yetkilerini kontrol edin
4. Manuel olarak SQL komutlarını çalıştırmayı deneyin

## 5. Production Checklist

Deployment öncesi kontrol listesi:

- [ ] PostgreSQL servisi oluşturuldu ve çalışıyor
- [ ] Migration çalıştırıldı
- [ ] Environment variable'lar eklendi
- [ ] `DATABASE_URL` doğru yapılandırıldı
- [ ] Admin şifresi ayarlandı
- [ ] Build başarılı
- [ ] Uygulama çalışıyor
- [ ] API endpoint'leri test edildi
- [ ] Randevu sistemi test edildi
- [ ] Admin panel çalışıyor

## 6. Güncelleme

Uygulamayı güncellemek için:

1. Git repository'de değişiklikleri commit edin
2. Coolify'de **Redeploy** butonuna tıklayın
3. Yeni migration varsa çalıştırın
4. Test edin

## 7. Backup

PostgreSQL veritabanını yedeklemek için:

```bash
# Coolify'de PostgreSQL servisine bağlanın
docker exec -it <postgres_container_name> pg_dump -U postgres berber_db > backup.sql
```

Yedekten geri yükleme:

```bash
# Yedekten geri yükleme
docker exec -i <postgres_container_name> psql -U postgres berber_db < backup.sql
```

## 8. Monitoring

- Coolify'de logları takip edin
- Database performansını izleyin
- Uygulama performansını izleyin
- Hata loglarını kontrol edin

## Destek

Sorun yaşarsanız:
1. Coolify loglarını kontrol edin
2. Database loglarını kontrol edin
3. Application loglarını kontrol edin
4. Environment variable'ları doğrulayın

