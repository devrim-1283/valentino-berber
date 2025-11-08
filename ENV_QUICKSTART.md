# Environment Variables Hızlı Başlangıç

## Minimum Gerekli Değişkenler (Development)

`.env` dosyası oluşturun ve şu değişkenleri ekleyin:

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/berber_db

# Next.js
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Debug Mode Açmak İçin

```env
# Tüm debug loglarını aç
DEBUG=true
LOG_LEVEL=debug
DB_DEBUG=true
API_DEBUG=true
```

## Tam Örnek .env Dosyası

```env
# ============================================
# Zorunlu Değişkenler
# ============================================
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/berber_db
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ============================================
# Debug Mode (Development için)
# ============================================
DEBUG=true
LOG_LEVEL=debug
DB_DEBUG=true
API_DEBUG=true

# ============================================
# Güvenlik (Production'da değiştirin!)
# ============================================
SESSION_SECRET=your-secret-key-change-in-production
ADMIN_DEFAULT_PASSWORD=VALENTINO2024
```

## Production İçin

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:5432/berber_db
NEXT_PUBLIC_APP_URL=https://yourdomain.com
DEBUG=false
LOG_LEVEL=warn
SESSION_SECRET=strong-random-secret-key
```

Detaylı bilgi için `ENV_SETUP.md` dosyasına bakın.

