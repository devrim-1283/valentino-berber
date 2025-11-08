'use client';

import { useState } from 'react';
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
import { Search, Scissors, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSiteSettings } from '@/lib/hooks/use-settings';

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

export default function TemplatesPage() {
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
            Şablonlar
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Hizmet şablonlarını keşfedin.
          </p>
        </motion.section>

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
    </div>
  );
}
