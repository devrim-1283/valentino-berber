'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Sparkles, Plus, Minus, Disc, Github, Twitter, Scissors, Calendar, Users, Star, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Autoplay from "embla-carousel-autoplay";
import { TikTokIcon } from '@/components/ui/icons';
import { useSiteSettings } from '@/lib/hooks/use-settings';
import { useTestimonials } from '@/lib/hooks/use-testimonials';
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
                    <span className="text-lg font-bold">{isLoading ? <Skeleton className="h-6 w-24" /> : settings?.brandName}</span>
                </div>
                <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                    <Link
                        href="/"
                        className="text-primary font-semibold transition-colors hover:text-primary"
                        aria-current="page"
                    >
                        Anasayfa
                    </Link>
                    <Link href="/services" className="text-muted-foreground transition-colors hover:text-primary">
                        Hizmetler
                    </Link>
                     <Link href="/gallery" className="text-muted-foreground transition-colors hover:text-primary">Galeri</Link>
                    <Link href="/about" className="text-muted-foreground transition-colors hover:text-primary">
                        Hakkımızda
                    </Link>
                </nav>
                 <div className="flex items-center gap-4">
                    <Button size="sm" asChild>
                      <Link href="/register">Hemen Randevu Al</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
};

const Hero = () => {
    const { settings, isLoading } = useSiteSettings();
    
    const heroTitle = settings?.heroTitle || "";
    const titleParts = heroTitle.split(' ');
    const lastTwoWords = titleParts.slice(-2).join(' ');
    const restOfTitle = titleParts.slice(0, -2).join(' ');

    return (
      <section className="pt-24 md:pt-32">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="mt-4 text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-12 w-3/4 mx-auto"/>
                  <Skeleton className="h-12 w-1/2 mx-auto"/>
                </div>
              ) : (
                <>
                  {restOfTitle}{' '}
                  <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
                    {lastTwoWords}
                  </span>
                </>
              )}
            </h1>
            {isLoading ? (
                <Skeleton className="h-6 w-full max-w-2xl mx-auto mt-6" />
              ) : (
                <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                  {settings?.heroSubtitle}
                </p>
              )}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/register">Hemen Randevu Al</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                <Link href="/services">Hizmetleri İncele</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
};

const Testimonials = () => {
  const plugin = useRef(
    Autoplay({ delay: 2500, stopOnInteraction: true })
  );

  const { settings, isLoading: isLoadingSettings } = useSiteSettings();
  const { data: testimonialsFromDB, isLoading: isLoadingTestimonials } = useTestimonials();
  
  const defaultTestimonials = [
        {
            id: "testimonial-1",
            name: "Ahmet Yılmaz",
            handle: "Mühendis",
            text: "Yıllardır aradığım berberi sonunda buldum. Samet Bey ve ekibi işinin ehli. Hem çok profesyoneller hem de çok samimiler. Her geldiğimde kendimi yenilenmiş hissediyorum.",
            avatar: "https://picsum.photos/seed/ahmet/40/40"
        },
        {
            id: "testimonial-2",
            name: "Can Öztürk",
            handle: "Grafik Tasarımcı",
            text: "Bir tasarımcı olarak detaylara çok önem veririm ve buradaki işçilik gerçekten inanılmaz. Saç kesimim her zaman tam istediğim gibi, modern ve kusursuz oluyor. Kesinlikle tavsiye ederim.",
            avatar: "https://picsum.photos/seed/can/40/40"
        },
        {
            id: "testimonial-3",
            name: "Murat Demir",
            handle: "Avukat",
            text: "Yoğun iş temposundan sonra buraya gelmek adeta bir terapi gibi. Atmosfer çok rahatlatıcı, hizmet ise birinci sınıf. Özellikle sıcak havluyla sakal tıraşı favorim.",
            avatar: "https://picsum.photos/seed/murat/40/40"
        }
    ];

  const testimonials = testimonialsFromDB && testimonialsFromDB.length > 0 ? testimonialsFromDB : defaultTestimonials;
  const isLoading = isLoadingSettings || isLoadingTestimonials;


  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {isLoading ? <Skeleton className="h-10 w-1/2 mx-auto" /> : settings?.testimonialsTitle}
        </h2>
        
        {isLoading ? (
             <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {Array.from({length: 3}).map((_, i) => (
                    <div className="p-1" key={i}>
                        <Card className="h-full overflow-hidden rounded-xl border bg-card/50 backdrop-blur-sm">
                            <CardContent className="p-6">
                                <Skeleton className="h-5 w-24 mb-4" />
                                <Skeleton className="h-4 w-full mb-2"/>
                                <Skeleton className="h-4 w-full mb-4"/>
                                <Skeleton className="h-4 w-3/4 mb-4"/>
                                <div className="flex items-center gap-3">
                                    <Skeleton className="w-10 h-10 rounded-full"/>
                                    <div className="w-full">
                                        <Skeleton className="h-5 w-24 mb-2"/>
                                        <Skeleton className="h-4 w-16"/>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                 ))}
            </div>
        ) : (
            <Carousel
                opts={{
                    align: 'start',
                    loop: true,
                }}
                plugins={[plugin.current]}
                className="w-full"
                >
                <CarouselContent>
                    {testimonials?.map((testimonial: any, index) => (
                    <CarouselItem
                        key={index}
                        className="md:basis-1/2 lg:basis-1/3"
                    >
                        <div className="p-1">
                        <Card className="h-full overflow-hidden rounded-xl border bg-card/50 backdrop-blur-sm">
                            <CardContent className="relative flex h-full flex-col justify-between p-6">
                            <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                            </div>
                            <p className="text-base text-muted-foreground mb-4">
                                "{testimonial.text}"
                            </p>
                            <div className="flex items-center gap-3">
                                <Image
                                src={testimonial.avatar}
                                alt={testimonial.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                                />
                                <div>
                                <p className="font-semibold text-foreground">
                                    {testimonial.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {testimonial.handle}
                                </p>
                                </div>
                            </div>
                            </CardContent>
                        </Card>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        )}

      </div>
    </section>
  );
};

const NewToolsSuite = () => {
  const { settings, isLoading } = useSiteSettings();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
      className="relative flex flex-col items-center justify-center py-16 md:py-24 px-4"
    >
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
          }}
          className="flex flex-col items-start md:col-span-1"
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            {isLoading ? <Skeleton className="h-24 w-full" /> : (
                <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-purple to-cyan bg-clip-text text-transparent">
                        {settings?.signatureSectionTitle}
                    </span>
                </span>
            )}
          </h1>
          {isLoading ? <Skeleton className="h-16 w-full" /> : (
            <p className="mt-4 text-lg text-muted-foreground">
                {settings?.signatureSectionSubtitle}
            </p>
          )}

          <Button
            size="lg"
            className="mt-8 group"
            asChild
          >
            <Link href="/about">
              Hikayemizi Keşfet{' '}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
        
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.4 } },
          }}
          className="grid grid-cols-2 gap-4 md:col-span-1"
        >
            <div className="relative w-full overflow-hidden rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-purple/20 hover:-translate-y-1">
              <Image
                src="https://media.istockphoto.com/id/506514230/tr/foto%C4%9Fraf/beard-grooming.jpg?s=612x612&w=0&k=20&c=zEM20LoGmKVYL9GfMocmFkYear1MM2TEgTtQs2K_VTQ="
                alt="Sakal bakımı"
                width={300}
                height={300}
                className="h-full w-full object-cover"
                data-ai-hint="beard grooming"
              />
            </div>
            <div className="relative w-full overflow-hidden rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-cyan/20 hover-translate-y-1 mt-4">
              <Image
                src="https://media.istockphoto.com/id/640274128/tr/foto%C4%9Fraf/barber-using-scissors-and-comb.jpg?s=612x612&w=0&k=20&c=9FxpcImIb5vGDIif3dnLjwkcJPWFUuXQGHE05fZwg7I="
                alt="Saç kesimi detayı"
                width={300}
                height={300}
                className="h-full w-full object-cover"
                data-ai-hint="barber cutting hair"
              />
            </div>
            <div className="relative w-full overflow-hidden rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-purple/20 hover-translate-y-1">
              <Image
                src="https://media.istockphoto.com/id/1773270658/tr/foto%C4%9Fraf/professional-hairdresser-working-with-bearded-client-in-barbershop-closeup-black-and-white.jpg?s=612x612&w=0&k=20&c=BPWtXZ3mPGxj-N4Z63b-gotK2_EoL6FdedUwMiP_5a4="
                alt="Kuaförde müşteri"
                width={300}
                height={300}
                className="h-full w-full object-cover"
                data-ai-hint="client in barbershop"
              />
            </div>
            <div className="relative w-full overflow-hidden rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-cyan/20 hover-translate-y-1 mt-4">
              <Image
                src="https://ottospa.com.tr/wp-content/uploads/2021/08/erkek-kuaforu.jpg"
                alt="Çalışan berber"
                width={300}
                height={300}
                className="h-full w-full object-cover"
                data-ai-hint="barber at work"
              />
            </div>
        </motion.div>
      </div>
    </motion.div>
  );
};


const StatsSection = () => {
    const { settings, isLoading } = useSiteSettings();
    return(
        <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
                <Scissors className="w-8 h-8" style={{stroke: 'url(#logo-gradient)'}} />
            <span className="text-2xl font-bold tracking-wide uppercase">{isLoading ? <Skeleton className="h-8 w-32" /> : settings?.brandName}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold max-w-4xl mx-auto leading-tight">
                {isLoading ? <Skeleton className="h-20 w-full" /> : (
                    <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
                        {settings?.statsSectionTitle}
                    </span>
                )}
            </h2>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button size="lg" className="group w-full sm:w-auto" asChild>
                    <Link href="/register">
                    Randevu Oluştur
                    <ArrowRight className="inline w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
                <Button variant="outline-gradient" size="lg" className="group w-full sm:w-auto" asChild>
                    <Link href="/gallery">
                    Galeriyi Keşfet
                    <ArrowRight className="inline w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 text-primary group-hover:text-cyan" />
                    </Link>
                </Button>
            </div>
        </div>
        </section>
    )
};

const ReadyToCreateSection = () => {
    const { settings, isLoading } = useSiteSettings();
    return (
        <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4">
            <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden bg-primary">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">
                    {isLoading ? <Skeleton className="h-12 w-3/4 bg-white/20"/> : settings?.ctaTitle}
                </h2>
                <p className="text-lg text-white/80 mt-4">
                    {isLoading ? <Skeleton className="h-10 w-full bg-white/20"/> : settings?.ctaSubtitle}
                </p>
                </div>
                <div className="relative flex items-center justify-center mt-8 md:mt-0">
                <div className="bg-background/10 backdrop-blur-sm p-8 rounded-2xl text-center shadow-2xl w-full">
                    <p className="text-lg font-semibold mb-4 text-white">
                    Online randevu ile yerinizi hemen ayırtın.
                    </p>
                    <Button size="lg" variant="secondary" className="w-full shadow-lg" asChild>
                    <Link href="/register">Randevunuzu Planlayın</Link>
                    </Button>
                    <p className="text-sm mt-4 text-white">
                    Sıra beklemeden premium hizmetin keyfini çıkarın.
                    </p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
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
                <span className="text-xl font-bold">{isLoading ? <Skeleton className="h-7 w-28" /> : settings?.brandName}</span>
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


export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background overflow-x-hidden">
      <div
        className="absolute inset-0 h-full w-full bg-transparent -z-10"
        style={{backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)' , backgroundSize: '20px 20px'}}
      />
      <svg className="absolute inset-0 -z-10 h-full w-full">
          <defs>
              <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: 'hsl(var(--cyan))'}} />
                <stop offset="100%" style={{stopColor: 'hsl(var(--purple))'}} />
              </linearGradient>
          </defs>
      </svg>
      <Header />
      <main className="flex-1">
        <Hero />
        <Testimonials />
        <NewToolsSuite />
        <StatsSection />
        <ReadyToCreateSection />
      </main>
      <Footer />
    </div>
  );
}
