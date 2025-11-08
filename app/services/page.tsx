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
import { Search, Disc, Github, Twitter, LogOut, Scissors, ArrowRight, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TikTokIcon } from '@/components/ui/icons';
import { useSiteSettings } from '@/lib/hooks/use-settings';

const services = [
  {
    name: 'Profesyonel Saç Tasarımı',
    description: 'Kişiye özel kesim ve stil ile tarzınızı yansıtın.',
    category: 'Kesim',
    image: 'https://i.pinimg.com/originals/db/b6/98/dbb698944d9acfdd6b9511f1a61d8df2.jpg',
    hint: 'professional men haircut',
    tags: ['Tasarım', 'Stil', 'Kesim'],
    price: "400₺",
  },
  {
    name: 'Uzman Sakal Şekillendirme',
    description: 'Keskin hatlar ve bakımlı sakal için detaylı tıraş.',
    category: 'Sakal',
    image: 'https://cizgisactasarim.com/wp-content/uploads/2021/01/01g-54.jpg',
    hint: 'beard trimming',
    tags: ['Sakal', 'Tasarım', 'Tıraş'],
    price: "200₺",
  },
  {
    name: 'Cilt Ağdası',
    description: 'Pürüzsüz ve uzun süreli rahatlık için titiz uygulama.',
    category: 'Bakım',
    image: 'https://st4.depositphotos.com/6334638/40483/i/450/depositphotos_404831472-stock-photo-man-barbershop-woman-barber-clipping.jpg',
    hint: 'skin waxing men',
    tags: ['Ağda', 'Cilt', 'Bakım'],
    price: "100₺",
  },
  {
    name: 'Besleyici Saç Bakımı',
    description: 'Saçlarınıza nem ve güç katan özel maske uygulaması.',
    category: 'Bakım',
    image: 'https://whairconcept.com.tr/uploads/2022/02/erkek-sac-bakim-maskesi.jpg',
    hint: 'men hair treatment',
    tags: ['Saç', 'Bakım', 'Maske'],
    price: "100₺",
  },
  {
    name: 'Rahatlatıcı Saç Yıkama',
    description: 'Ferahlatıcı şampuan eşliğinde.',
    category: 'Bakım',
    image: 'https://avicennaint.com/wp-content/uploads/2022/03/sac-ekimi-sonrasi-sac-yikama-m.webp',
    hint: 'hair washing men',
    tags: ['Yıkama', 'Rahatlama'],
    price: "100₺",
  },
  {
    name: 'Derinlemesine Buharlı Cilt Bakımı',
    description: 'Gözenekleri açan ve cildi yenileyen özel bakım.',
    category: 'Bakım',
    image: 'https://salonkuafor.com.tr/wp-content/uploads/2022/06/erkek-cilt-bakimi.jpg',
    hint: 'men steam facial',
    tags: ['Cilt', 'Buhar', 'Bakım'],
    price: "500₺",
  },
];

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
                    <Link href="/services" className="text-primary font-semibold transition-colors hover:text-primary" aria-current="page">Hizmetler</Link>
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
                    <a href={settings?.instagramUrl || '#'} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram h-5 w-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
                    <a href={settings?.tiktokUrl || '#'} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><TikTokIcon className="w-5 h-5 fill-current" /></a>
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
                        <span>{settings?.contactAddress || 'Barbaros Mah. Atatürk Cad. No:123, 34746 Ataşehir/İstanbul'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary"/>
                        <a href={`tel:${settings?.contactPhone || '+905551234567'}`} className="hover:text-primary">{settings?.contactPhone || '+90 (555) 123 45 67'}</a>
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

export default function ServicesPage() {
  const { settings } = useSiteSettings();
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
          <div className="flex items-center gap-4 w-full md:w-auto">
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
            <Button className="w-full md:w-auto">Filtrele</Button>
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
