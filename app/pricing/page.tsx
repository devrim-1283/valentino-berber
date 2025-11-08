'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Check, ArrowRight, Disc, Github, Twitter, X, Sparkles, LogOut, Scissors } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { TikTokIcon } from '@/components/ui/icons';
import { useSiteSettings } from '@/lib/hooks/use-settings';

const serviceList = {
  essentials: [
    { name: 'İmza Saç Kesimi', price: '450₺' },
    { name: 'Klasik Sakal Tıraşı', price: '250₺' },
    { name: 'Saç Yıkama & Şekillendirme', price: '200₺' },
  ],
  styling: [
    { name: 'Sakal Tasarımı ve Bakımı', price: '250₺' },
    { name: 'Çocuk Saç Kesimi (12 Yaş Altı)', price: '300₺' },
    { name: 'Saç Şekillendirme (Özel Gün)', price: '350₺' },
  ],
  treatments: [
    { name: 'Canlandırıcı Saç Bakımı', price: '400₺' },
    { name: 'Arındırıcı Cilt Bakımı', price: '550₺' },
    { name: 'Damat Tıraşı Paketi', price: '1200₺' },
  ]
};

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
    
            <div>
                <h3 className="font-semibold mb-4">Hızlı Erişim</h3>
                <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Anasayfa</Link></li>
                <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">Hizmetler</Link></li>
                <li><Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors">Galeri</Link></li>
                <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">Hakkımızda</Link></li>
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


export default function PricingPage() {
    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <div
                className="absolute inset-0 h-full w-full bg-transparent -z-10"
                style={{backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)' , backgroundSize: '20px 20px'}}
            />
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="py-24 md:py-32 text-center"
                >
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
                            Premium Hizmet,{' '}
                            <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
                                Şeffaf Fiyatlar
                            </span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                           Kaliteden ödün vermeden, her bütçeye uygun, net ve adil fiyatlandırma politikamızla hizmetinizdeyiz. Sürpriz maliyetler olmadan stilinize yatırım yapın.
                        </p>
                    </div>
                </motion.section>

                {/* Service List Section */}
                <section id="service-list" className="py-16 md:py-24 scroll-mt-20">
                     <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {/* Essentials */}
                            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                                <Card className="h-full rounded-2xl shadow-lg bg-card/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold text-center">Temel Hizmetler</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-4">
                                            {serviceList.essentials.map(service => (
                                                <li key={service.name} className="flex justify-between items-center border-b pb-2">
                                                    <span className="text-foreground">{service.name}</span>
                                                    <span className="font-bold text-primary">{service.price}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>
                             {/* Styling */}
                            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                                <Card className="h-full rounded-2xl shadow-lg border-primary border-2 shadow-primary/20 bg-card/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold text-center">Stil ve Tasarım</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-4">
                                            {serviceList.styling.map(service => (
                                                <li key={service.name} className="flex justify-between items-center border-b pb-2">
                                                    <span className="text-foreground">{service.name}</span>
                                                    <span className="font-bold text-primary">{service.price}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                             </motion.div>
                             {/* Treatments */}
                            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                                <Card className="h-full rounded-2xl shadow-lg bg-card/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold text-center">Bakım ve Paketler</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-4">
                                            {serviceList.treatments.map(service => (
                                                <li key={service.name} className="flex justify-between items-center border-b pb-2">
                                                    <span className="text-foreground">{service.name}</span>
                                                    <span className="font-bold text-primary">{service.price}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                        <div className="text-center mt-16">
                            <p className="text-muted-foreground mb-4">Hazır mısınız? Yerinizi şimdi ayırtın.</p>
                             <Button asChild size="lg">
                               <Link href="/register">
                                 Hemen Randevu Al <ArrowRight className="ml-2 h-4 w-4" />
                               </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
