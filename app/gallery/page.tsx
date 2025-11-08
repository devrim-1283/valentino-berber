'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Disc, Github, Twitter, LogOut, Scissors, ArrowRight, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TikTokIcon } from '@/components/ui/icons';
import { useSiteSettings } from '@/lib/hooks/use-settings';
import { useGallery } from '@/lib/hooks/use-gallery';
import { Skeleton } from '@/components/ui/skeleton';

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
                    <Link href="/gallery" className="text-primary font-semibold transition-colors hover:text-primary" aria-current="page">Galeri</Link>
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
                    <a href={settings?.instagramUrl || '#'} className="text-muted-foreground hover:text-primary transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram h-5 w-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
                    <a href={settings?.tiktokUrl || '#'} className="text-muted-foreground hover:text-primary transition-colors"><TikTokIcon className="w-5 h-5 fill-current" /></a>
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

export default function GalleryPage() {
  const { settings, isLoading: isLoadingSettings } = useSiteSettings();
  const { data: galleryImages, isLoading: isLoadingGallery } = useGallery();
  
  const defaultImages = [
      { id: '1', imageUrl: 'https://i.pinimg.com/736x/12/36/ce/1236ce195fb761299f55aa93f46aca8e.jpg', description: 'Erkek saç modeli 1' },
      { id: '2', imageUrl: 'https://i.pinimg.com/736x/c9/1e/f2/c91ef2d792983454bcc18cf616ee1eb5.jpg', description: 'Erkek saç modeli 2' },
      { id: '3', imageUrl: 'https://i.pinimg.com/736x/e0/5a/b3/e05ab35445bfc75b8496ad96bceee052.jpg', description: 'Erkek saç modeli 3' },
      { id: '4', imageUrl: 'https://i.pinimg.com/736x/48/af/96/48af964846de24a5820acff982038d32.jpg', description: 'Erkek saç modeli 4' },
      { id: '5', imageUrl: 'https://i.pinimg.com/736x/ea/8b/6d/ea8b6d9e66a90fcf21bd271208d396b6.jpg', description: 'Erkek saç modeli 5' },
      { id: '6', imageUrl: 'https://i.pinimg.com/1200x/73/38/e8/7338e8ed7d7a5b1efcd5c2a0b2e5159c.jpg', description: 'Erkek saç modeli 6' },
  ];
  
  const images = galleryImages && galleryImages.length > 0 ? galleryImages : defaultImages;
  const isLoading = isLoadingSettings || isLoadingGallery;

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
            Stil{' '}
            <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
              Galerimiz
            </span>{' '}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Sanatımızı ve imza stillerimizi keşfedin. Bir sonraki görünümünüz için ilham alın ve {settings?.brandName} farkını görün.
          </p>
        </motion.section>

        {/* Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="break-inside-avoid mb-4">
                <Skeleton className="w-full h-64 rounded-2xl" />
              </div>
            ))
          ) : (
            images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="overflow-hidden rounded-2xl shadow-lg break-inside-avoid"
              >
                <Image
                  src={image.imageUrl || (image as any).src || 'https://via.placeholder.com/600'}
                  alt={image.description || (image as any).alt || 'Gallery image'}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                  data-ai-hint={image.description || 'gallery image'}
                />
              </motion.div>
            ))
          )}
        </div>

        <div className="text-center mt-16">
            <p className="text-lg text-muted-foreground mb-4">Gördüklerinizi beğendiniz mi? Stilinizi bizimle bulun.</p>
            <Button size="lg" asChild>
                <Link href="/register">
                    Randevu Alın <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>

      </main>
      <Footer />
    </div>
  );
}
