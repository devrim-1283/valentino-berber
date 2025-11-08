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

export default function TermsOfServicePage() {
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
                  Kullanım{' '}
                  <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
                    Koşulları
                  </span>
                </h1>
                <p className="mt-4 text-muted-foreground">Son Güncelleme: {lastUpdated.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:underline"
              >
                <p>
                  Lütfen {settings?.brandName} web sitesini ("Site", "Hizmet") kullanmadan önce bu kullanım koşullarını ("Koşullar") dikkatlice okuyun.
                </p>
                <p>
                  Hizmete erişiminiz ve hizmeti kullanımınız, bu Koşulları kabul etmenize ve bunlara uymanıza bağlıdır. Bu Koşullar, Hizmete erişen veya hizmeti kullanan tüm ziyaretçiler, kullanıcılar ve diğerleri için geçerlidir.
                </p>

                <h2>1. Randevular</h2>
                <p>
                  Sitemiz üzerinden bir randevu oluşturduğunuzda, bize her zaman doğru, eksiksiz ve güncel bilgiler vermelisiniz. Bunu yapmamanız, Koşulların ihlali anlamına gelir ve randevunuzun iptal edilmesine neden olabilir.
                </p>
                <p>
                  Randevu saatinden en az 2 saat öncesine kadar randevunuzu iptal etme veya değiştirme hakkına sahipsiniz. Geç iptallerde veya randevuya gelinmemesi durumunda, salon politikamız gereği bir sonraki randevunuzda ön ödeme talep etme hakkımızı saklı tutarız.
                </p>

                <h2>2. Fikri Mülkiyet</h2>
                <p>
                  Hizmet ve orijinal içeriği (Metinler, görseller, logolar), özellikleri ve işlevselliği, {settings?.brandName}'nun münhasır mülkiyetindedir ve öyle kalacaktır.
                </p>
                
                <h2>3. Sorumluluğun Sınırlandırılması</h2>
                <p>
                  {settings?.brandName}, yöneticileri veya çalışanları, hiçbir durumda (i) hizmete erişiminizden veya hizmeti kullanmanızdan; (ii) hizmetlerimiz sırasında veya sonrasında oluşabilecek herhangi bir kişisel durumdan; (iii) sitemizdeki herhangi bir bilginin doğruluğundan kaynaklanan dolaylı veya doğrudan zararlardan sorumlu tutulamaz. Verdiğimiz hizmetler profesyonel danışmanlık niteliğinde değildir.
                </p>

                <h2>4. Değişiklikler</h2>
                <p>
                  Tamamen kendi takdirimize bağlı olarak, bu Koşulları herhangi bir zamanda değiştirme veya değiştirme hakkımızı saklı tutarız. Bir revizyonun önemli olması durumunda, yeni koşulların yürürlüğe girmesinden en az 30 gün önce bildirimde bulunmaya çalışacağız.
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
