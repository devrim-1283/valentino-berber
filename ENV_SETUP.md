# Environment Variables Kurulum Rehberi

Bu dosya, projenin çalışması için gerekli environment variable'ları açıklar.

## Hızlı Başlangıç

1. `.env.example` dosyasını `.env` olarak kopyalayın:
   ```bash
   cp .env.example .env
   ```

2. `.env` dosyasını açın ve değerleri doldurun.

3. Development için minimum gerekli değişkenler:
   ```env
   NODE_ENV=development
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/berber_db
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

## Gerekli Environment Variables

### Zorunlu Değişkenler

#### 1. Database Configuration
```env
# Option 1: DATABASE_URL (Önerilen)
DATABASE_URL=postgresql://username:password@host:port/database

# Option 2: Ayrı ayrı değişkenler
DB_HOST=localhost
DB_PORT=5432
DB_NAME=berber_db
DB_USER=postgres
DB_PASS=postgres
```

**Not**: `DATABASE_URL` varsa diğer `DB_*` değişkenleri yok sayılır.

#### 2. Next.js Configuration
```env
NODE_ENV=development  # veya production, test
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Production'da domain'iniz
```

### Opsiyonel Değişkenler (Debug & Logging)

#### Debug Mode
```env
# Debug modunu açmak için
DEBUG=true

# Belirli modülleri debug etmek için
DEBUG=db:*,api:*  # Sadece database ve API logları

# Tüm logları görmek için
DEBUG=*

# Log seviyesi
LOG_LEVEL=debug  # error, warn, info, debug, verbose
```

#### Database Debug
```env
# Database query loglarını görmek için
DB_DEBUG=true
```

#### API Debug
```env
# API request/response loglarını görmek için
API_DEBUG=true
```

### Güvenlik Değişkenleri

#### Session Secret
```env
# Production'da mutlaka değiştirin!
# Random string oluşturmak için: openssl rand -base64 32
SESSION_SECRET=your-secret-key-here-change-in-production
```

#### Admin Default Password
```env
# İlk kurulum için default şifre
# NOT: İlk girişten sonra admin panelden değiştirin!
ADMIN_DEFAULT_PASSWORD=VALENTINO2024
```

## Development Mode

Development için minimum `.env` dosyası:

```env
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/berber_db
NEXT_PUBLIC_APP_URL=http://localhost:3000
DEBUG=true
LOG_LEVEL=debug
DB_DEBUG=true
API_DEBUG=true
```

## Production Mode

Production için `.env` dosyası:

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@db-host:5432/berber_db
NEXT_PUBLIC_APP_URL=https://yourdomain.com
DEBUG=false
LOG_LEVEL=info
SESSION_SECRET=your-strong-random-secret-key
```

**Önemli**: Production'da:
- `DEBUG=false` yapın
- `LOG_LEVEL=info` veya `error` yapın
- `SESSION_SECRET` için güçlü bir random string kullanın
- `ADMIN_DEFAULT_PASSWORD`'ı değiştirin

## Coolify Deployment

Coolify'de deploy ederken:

1. **Environment Variables** bölümüne gidin
2. Şu değişkenleri ekleyin:
   ```env
   DATABASE_URL=postgresql://user:pass@postgres-service:5432/berber_db
   NODE_ENV=production
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   ```

**Not**: Coolify otomatik olarak:
- `DATABASE_URL`'i PostgreSQL service'den alır
- `NODE_ENV=production` yapar
- `PORT`'u otomatik atar

## Debug Mode Kullanımı

### Tüm Logları Görmek
```env
DEBUG=true
LOG_LEVEL=verbose
```

### Sadece Database Logları
```env
DEBUG=db:*
DB_DEBUG=true
```

### Sadece API Logları
```env
DEBUG=api:*
API_DEBUG=true
```

### Belirli Modülleri Debug Etmek
```env
DEBUG=db:query,api:request
```

## Log Seviyeleri

- `error`: Sadece hatalar
- `warn`: Uyarılar ve hatalar
- `info`: Bilgilendirme mesajları (default)
- `debug`: Debug bilgileri
- `verbose`: Tüm detaylar

## Troubleshooting

### Database Bağlantı Hatası
```env
# Connection string'i kontrol edin
DATABASE_URL=postgresql://user:password@host:port/database

# Veya ayrı değişkenleri kontrol edin
DB_HOST=localhost
DB_PORT=5432
DB_NAME=berber_db
DB_USER=postgres
DB_PASS=postgres
```

### Debug Logları Görünmüyor
```env
# Debug modunu açın
DEBUG=true
LOG_LEVEL=debug
```

### API Logları Görünmüyor
```env
# API debug'ı açın
API_DEBUG=true
DEBUG=api:*
```

## Güvenlik Notları

1. **Asla `.env` dosyasını Git'e commit etmeyin!**
2. Production'da güçlü şifreler kullanın
3. `SESSION_SECRET` için random string oluşturun
4. `ADMIN_DEFAULT_PASSWORD`'ı ilk girişten sonra değiştirin
5. Database şifrelerini güvenli tutun

## Örnek .env Dosyaları

### Development
Bkz: `.env.example` dosyası

### Production
```env
NODE_ENV=production
DATABASE_URL=postgresql://prod_user:strong_password@db.prod.com:5432/berber_db
NEXT_PUBLIC_APP_URL=https://berber.example.com
DEBUG=false
LOG_LEVEL=warn
SESSION_SECRET=$(openssl rand -base64 32)
```

### Test
```env
NODE_ENV=test
DATABASE_URL=postgresql://test_user:test_pass@localhost:5432/berber_test_db
NEXT_PUBLIC_APP_URL=http://localhost:3000
DEBUG=false
LOG_LEVEL=error
```

