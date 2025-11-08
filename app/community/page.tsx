'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Disc, Github, Twitter, Scissors, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSiteSettings } from '@/lib/hooks/use-settings';

const galleryImages = [
  { id: 1, src: 'https://picsum.photos/seed/gallery1/600/800', alt: 'Modern fade haircut', hint: 'modern fade haircut' },
  { id: 2, src: 'https://picsum.photos/seed/gallery2/600/800', alt: 'Classic pompadour style', hint: 'classic pompadour' },
  { id: 3, src: 'https://picsum.photos/seed/gallery3/600/800', alt: 'Textured crop haircut', hint: 'textured crop haircut' },
  { id: 4, src: 'https://picsum.photos/seed/gallery4/600/800', alt: 'Sharp beard design', hint: 'sharp beard design' },
  { id: 5, src: 'https://picsum.photos/seed/gallery5/600/800', alt: 'Long hair styling for men', hint: 'men long hair' },
  { id: 6, src: 'https://picsum.photos/seed/gallery6/600/800', alt: 'Creative hair color', hint: 'creative hair color' },
];

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
  const { settings, isLoading } = useSiteSettings();

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
                            <Link href="/register">
                                <Button variant="outline" size="sm">
                                    Giriş Yap
                                </Button>
                            </Link>
                            <a href="/register">
                                <Button size="sm">Hemen Randevu Al</Button>
                            </a>
                </div>
            </div>
        </header>
    );
};

const Footer = () => {
  const { settings } = useSiteSettings();
  
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
               <Scissors className="text-white h-6 w-6"/>
              <span className="text-xl font-bold">{settings?.brandName || 'Valentino'}</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Modern erkeğin stil durağı.
            </p>
             <div className="flex gap-4 mt-2">
              {settings?.instagramUrl && (
                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-white transition-colors">
                  <Disc className="w-5 h-5" />
                </a>
              )}
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
          <p>&copy; {new Date().getFullYear()} {settings?.brandName || 'Valentino'}. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <div
        className="absolute inset-0 h-full w-full bg-transparent -z-10"
        style={{backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)' , backgroundSize: '20px 20px'}}
      />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-24">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center my-12"
        >
          <h1 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
            Topluluk{' '}
            <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
              Galerimiz
            </span>{' '}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Sanatımızı ve imza stillerimizi keşfedin.
          </p>
        </motion.section>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-hidden rounded-2xl shadow-lg break-inside-avoid"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={800}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                data-ai-hint={image.hint}
              />
            </motion.div>
          ))}
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
