'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Disc, Github, Twitter, LogOut, Scissors, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useUser } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';

const services = [
  {
    name: 'İmza Saç Kesimi',
    description: 'Kişiye özel analiz, saç tipinize ve yüz şeklinize en uygun modern kesim teknikleri, yıkama ve profesyonel şekillendirme.',
    category: 'Kesim',
    image: 'https://picsum.photos/seed/haircut/600/400',
    hint: 'modern men haircut',
    tags: ['Kesim', 'Stil', 'Modern'],
    price: "450₺",
  },
  {
    name: 'Sıcak Havlu Sakal Tıraşı',
    description: 'Geleneksel tıraş deneyimi. Sıcak havlu kompresleri, ustura ile pürüzsüz tıraş ve nemlendirici losyon ile rahatlama.',
    category: 'Sakal',
    image: 'https://picsum.photos/seed/shave/600/400',
    hint: 'hot towel shave',
    tags: ['Tıraş', 'Klasik', 'Bakım'],
    price: "300₺",
  },
  {
    name: 'Sakal Tasarımı ve Bakımı',
    description: 'Sakallarınıza profesyonel bir form kazandırın. Şekillendirme, kısaltma, özel sakal yağları ile bakım ve şekillendirme.',
    category: 'Sakal',
    image: 'https://picsum.photos/seed/beard-trim/600/400',
    hint: 'beard trimming design',
    tags: ['Sakal', 'Tasarım', 'Bakım'],
    price: "250₺",
  },
  {
    name: 'Saç ve Cilt Bakım Paketi',
    description: 'Canlandırıcı saç bakımı maskesi, arındırıcı yüz maskesi ve profesyonel saç yıkama ile tam bir yenilenme deneyimi.',
    category: 'Bakım',
    image: 'https://picsum.photos/seed/care/600/400',
    hint: 'men facial treatment',
    tags: ['Bakım', 'Cilt', 'Yenilenme'],
    price: "550₺",
  },
  {
    name: 'Damat Tıraşı Paketi',
    description: 'Hayatınızın en özel gününe hazırlık. İmza saç kesimi, sıcak havlu sakal tıraşı ve özel cilt bakımı içeren komple paket.',
    category: 'Paketler',
    image: 'https://picsum.photos/seed/groom/600/400',
    hint: 'groom wedding preparation',
    tags: ['Düğün', 'Özel', 'Damat'],
    price: "1200₺",
  },
  {
    name: 'Stil Değişikliği Danışmanlığı',
    description: 'İmajınızı yenilemek mi istiyorsunuz? Samet Valentino ile birebir danışmanlık, yüz analizi ve size en uygun yeni stilin belirlenmesi.',
    category: 'Danışmanlık',
    image: 'https://picsum.photos/seed/consulting/600/400',
    hint: 'style consultation',
    tags: ['İmaj', 'Danışmanlık', 'Stil'],
    price: "Bize Ulaşın",
  },
];

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const { user, isUserLoading } = useUser();
    const auth = getAuth();

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

    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-sm border-b border-border/50' : 'bg-transparent'}`}>
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <Scissors className="text-primary h-6 w-6"/>
                    <span className="text-lg font-bold">Samet Valentino</span>
                </div>
                <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                    <Link href="/" className="text-muted-foreground transition-colors hover:text-primary">Anasayfa</Link>
                    <Link href="/services" className="text-primary font-semibold transition-colors hover:text-primary" aria-current="page">Hizmetler</Link>
                     <Link href="/gallery" className="text-muted-foreground transition-colors hover:text-primary">Galeri</Link>
                    <Link href="/about" className="text-muted-foreground transition-colors hover:text-primary">Hakkımızda</Link>
                </nav>
                 <div className="flex items-center gap-4">
                    {isUserLoading ? (
                        <div className="h-9 w-24 animate-pulse rounded-full bg-muted"></div>
                    ) : user ? (
                        <>
                            <Link href="/account">
                                <Button variant="outline" size="sm">Hesabım</Button>
                            </Link>
                            <Button size="sm" variant="ghost" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" /> Çıkış Yap</Button>
                        </>
                    ) : (
                        <>
                            <Link href="/register">
                                <Button variant="outline" size="sm">
                                    Giriş Yap
                                </Button>
                            </Link>
                            <a href="/register">
                                <Button size="sm">Hemen Randevu Al</Button>
                            </a>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

const Footer = () => (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
               <Scissors className="text-white h-6 w-6"/>
              <span className="text-xl font-bold">Samet Valentino</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Modern erkeğin stil durağı.
            </p>
             <div className="flex gap-4 mt-2">
              <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors"><Disc className="w-5 h-5" /></a>
              <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
  
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Hızlı Erişim</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/" className="text-primary-foreground/80 hover:text-white transition-colors">Anasayfa</Link></li>
                  <li><Link href="/services" className="text-primary-foreground/80 hover:text-white transition-colors">Hizmetler</Link></li>
                  <li><Link href="/gallery" className="text-primary-foreground/80 hover:text-white transition-colors">Galeri</Link></li>
                  <li><Link href="/about" className="text-primary-foreground/80 hover:text-white transition-colors">Hakkımızda</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Salon</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/about#team" className="text-primary-foreground/80 hover:text-white transition-colors">Ekibimiz</Link></li>
                  <li><Link href="/contact" className="text-primary-foreground/80 hover:text-white transition-colors">İletişim</Link></li>
                  <li><Link href="/faq" className="text-primary-foreground/80 hover:text-white transition-colors">S.S.S.</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Yasal</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/terms" className="text-primary-foreground/80 hover:text-white transition-colors">Kullanım Koşulları</Link></li>
                  <li><Link href="/privacy" className="text-primary-foreground/80 hover:text-white transition-colors">Gizlilik Politikası</Link></li>
                </ul>
              </div>
          </div>
  
          <div className="space-y-4">
            <h3 className="font-semibold">Bültenimize Abone Olun</h3>
            <p className="text-sm text-primary-foreground/80">Yeni stiller, özel kampanyalar ve haberler için abone olun.</p>
            <div className="flex gap-2">
              <Input type="email" placeholder="E-posta adresiniz" className="bg-primary/50 border-border/50 text-white placeholder:text-primary-foreground/60" />
              <Button variant="secondary" size="default">Abone Ol</Button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Samet Valentino. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <div
        className="absolute inset-0 h-full w-full bg-transparent -z-10"
        style={{backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)' , backgroundSize: '20px 20px'}}
      />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-24">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center my-12"
        >
          <h1 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
            İmza{' '}
            <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
              Hizmetlerimiz
            </span>{' '}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Stilinizi ve beklentilerinizi anlayan, size özel çözümler sunan premium hizmetlerimizi keşfedin. Her dokunuşta kalite ve sanatı hissedin.
          </p>
        </motion.section>

        {/* Filter and Search Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12"
        >
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Hizmet ara..." className="pl-10" />
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                <SelectItem value="kesim">Kesim</SelectItem>
                <SelectItem value="sakal">Sakal</SelectItem>
                <SelectItem value="bakim">Bakım</SelectItem>
                <SelectItem value="paketler">Paketler</SelectItem>
              </SelectContent>
            </Select>
            <Button>Filtrele</Button>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
            >
              <Card className="group relative overflow-hidden rounded-2xl border-none shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col">
                <CardContent className="p-0 flex-grow flex flex-col">
                  <div className="relative">
                    <Image
                      src={service.image}
                      alt={service.name}
                      width={600}
                      height={400}
                      className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={service.hint}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                    <Badge variant="secondary" className="absolute top-4 right-4 text-lg font-bold">
                        {service.price}
                    </Badge>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold text-foreground tracking-tight">{service.name}</h3>
                      <p className="text-sm text-muted-foreground mt-2 flex-grow">{service.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {service.tags.map(tag => (
                          <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                  </div>
                   <div className="p-6 pt-0">
                     <Button asChild variant="default" className="w-full">
                      <Link href="/register">
                        Randevu Al <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
