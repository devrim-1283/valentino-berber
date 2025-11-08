'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Disc, Github, Twitter, LogOut, Scissors, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { useSiteSettings } from '@/lib/hooks/use-settings';
import { TikTokIcon } from '@/components/ui/icons';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const { settings, isLoading } = useSiteSettings();

    useEffect(() => {
        const handleScroll = () => {
        const isScrolled = window.scrollY > 10;
        if (isScrolled !== scrolled) {
            setScrolled(isScrolled);
        }
        };

        document.addEventListener('scroll', handleScroll);
        return () => {
        document.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);


    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-sm border-b border-border/50' : 'bg-transparent'}`}>
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <Scissors className="text-primary h-6 w-6"/>
                    <span className="text-lg font-bold">{isLoading ? '...' : settings?.brandName}</span>
                </div>
                <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                    <Link href="/" className="text-muted-foreground transition-colors hover:text-primary">Anasayfa</Link>
                    <Link href="/services" className="text-muted-foreground transition-colors hover:text-primary">Hizmetler</Link>
                    <Link href="/gallery" className="text-muted-foreground transition-colors hover:text-primary">Galeri</Link>
                    <Link href="/about" className="text-muted-foreground transition-colors hover:text-primary">Hakkımızda</Link>
                </nav>
                 <div className="flex items-center gap-4">
                    <a href="/register">
                        <Button size="sm">Hemen Randevu Al</Button>
                    </a>
                </div>
            </div>
        </header>
    );
};

const Footer = () => {
    const { settings, isLoading } = useSiteSettings();
    return (
        <footer className="bg-secondary/20">
        <div className="container mx-auto py-12 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                <Scissors className="text-primary h-6 w-6"/>
                <span className="text-xl font-bold">{isLoading ? '...' : settings?.brandName}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                    Modern erkeğin stil durağı. Sanat ve zanaati birleştiren eşsiz bir deneyim.
                </p>
                 <div className="flex gap-4 mt-2">
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram h-5 w-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><TikTokIcon className="w-5 h-5 fill-current" /></a>
                </div>
            </div>
    
            <div className="flex flex-col items-center">
                <h3 className="font-semibold mb-4">Hızlı Erişim</h3>
                <ul className="space-y-2 text-sm text-center">
                <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Anasayfa</Link></li>
                <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">Hizmetler</Link></li>
                <li><Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors">Galeri</Link></li>
                <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">Hakkımızda</Link></li>
                </ul>
            </div>
             <div>
                <h3 className="font-semibold mb-4">İletişim</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-primary mt-1"/>
                        <span>Barbaros Mah. Atatürk Cad. No:123, 34746 Ataşehir/İstanbul</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary"/>
                        <a href="tel:+905551234567" className="hover:text-primary">+90 (555) 123 45 67</a>
                    </li>
                </ul>
            </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} {isLoading ? '...' : settings?.brandName}. Tüm hakları saklıdır.</p>
            </div>
        </div>
        </footer>
    );
};

export default function PrivacyPolicyPage() {
    const [lastUpdated] = useState(new Date());
    const { settings } = useSiteSettings();
    
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <div
        className="absolute inset-0 h-full w-full bg-transparent -z-10"
        style={{backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)' , backgroundSize: '20px 20px'}}
      />
      <Header />
      <main className="flex-1">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="py-24 md:py-32"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
                  Gizlilik{' '}
                  <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
                    Politikası
                  </span>
                </h1>
                 <p className="mt-4 text-muted-foreground">Son Güncelleme: {lastUpdated.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:underline"
              >
                <p>
                    {settings?.brandName} ("biz", "bizim" veya "bize") olarak, gizliliğinize değer veriyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda (örneğin randevu aldığınızda) kişisel bilgilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklamaktadır.
                </p>

                <h2>1. Topladığımız Bilgiler</h2>
                <p>Sizden aşağıdaki gibi çeşitli yollarla bilgi toplayabiliriz:</p>
                <ul>
                  <li>
                    <strong>Randevu Bilgileri:</strong> Online randevu sistemimiz aracılığıyla bir hesap oluşturduğunuzda veya randevu aldığınızda adınız, e-posta adresiniz ve telefon numaranız gibi doğrudan bize sağladığınız bilgiler.
                  </li>
                  <li>
                    <strong>İletişim Bilgileri:</strong> Bizimle iletişim formları veya e-posta yoluyla iletişime geçtiğinizde paylaştığınız bilgiler.
                  </li>
                   <li>
                    <strong>Teknik Veriler:</strong> IP adresiniz, tarayıcı türünüz, erişim zamanlarınız gibi sunucularımızın otomatik olarak topladığı anonim bilgiler.
                  </li>
                </ul>

                <h2>2. Bilgilerinizin Kullanımı</h2>
                <p>
                  Sizden toplanan bilgileri size daha iyi bir hizmet sunmak için kullanırız. Özellikle, hakkınızda topladığımız bilgileri şu amaçlarla kullanabiliriz:
                </p>
                <ul>
                  <li>Randevularınızı oluşturmak, yönetmek ve size hatırlatmalar göndermek.</li>
                  <li>Hesabınızı oluşturmak ve yönetmek.</li>
                  <li>Size hizmetlerimiz ve özel kampanyalarımız hakkında bilgi vermek (eğer izin verdiyseniz).</li>
                  <li>Hizmet kalitemizi artırmak ve kullanıcı deneyimini analiz etmek.</li>
                </ul>

                <h2>3. Bilgilerinizin Paylaşımı</h2>
                <p>
                  Kişisel bilgilerinizi sizin izniniz olmadan asla üçüncü taraflarla satmayız, ticaretini yapmayız veya kiralamayız. Bilgileriniz, yalnızca randevu ve iletişim süreçlerini yönetmek amacıyla güvenli bir şekilde sistemlerimizde saklanır.
                </p>
                
                <h2>4. Veri Güvenliği</h2>
                <p>
                    Kişisel bilgilerinizi korumak için endüstri standardı idari, teknik ve fiziksel güvenlik önlemleri kullanıyoruz. Tüm verileriniz, PostgreSQL veritabanı üzerinde güvenli bir şekilde saklanmaktadır.
                </p>

                <h2>5. Politika Değişiklikleri</h2>
                <p>
                    Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Güncellenmiş bir sürüm yayınlandığında bu sayfadaki "Son Güncelleme" tarihini güncelleyeceğiz.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
