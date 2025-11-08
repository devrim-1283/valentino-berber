'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, CreditCard, Disc, Github, HardDrive, Heart, Search, Send, Twitter, UserCircle, LogOut, Scissors, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TikTokIcon } from '@/components/ui/icons';
import { useSiteSettings } from '@/lib/hooks/use-settings';

const faqCategories = [
    {
        title: "Randevular",
        icon: UserCircle,
        faqs: [
            {
                q: "Online nasıl randevu alabilirim?",
                a: "Anasayfadaki veya menüdeki 'Hemen Randevu Al' butonuna tıklayarak randevu sistemimize erişebilir, size uygun gün, saat ve hizmeti seçerek randevunuzu saniyeler içinde oluşturabilirsiniz."
            },
            {
                q: "Randevumu nasıl iptal edebilir veya değiştirebilirim?",
                a: "Randevunuzu, planlanan saatten en az 2 saat öncesine kadar, size gönderilen onay e-postasındaki bağlantı üzerinden veya sitemize üye girişi yaparak 'Hesabım' panelinden kolayca yönetebilirsiniz."
            }
        ]
    },
    {
        title: "Hizmetler ve Fiyatlar",
        icon: CreditCard,
        faqs: [
            {
                q: "Hangi hizmetleri sunuyorsunuz?",
                a: "Saç kesimi, sakal tasarımı, cilt bakımı, damat tıraşı ve daha birçok premium hizmet sunuyoruz. Tüm hizmetlerimizi ve güncel fiyat listemizi 'Hizmetler' sayfamızda bulabilirsiniz."
            },
            {
                q: "Paket veya üyelik seçenekleriniz var mı?",
                a: "Özel günler için hazırladığımız 'Damat Paketi' gibi özel paketlerimiz bulunmaktadır. Düzenli müşterilerimiz için özel indirimler ve kampanyalar hakkında bilgi almak için salonumuzu ziyaret edebilirsiniz."
            }
        ]
    },
     {
        title: "Salon Hakkında",
        icon: HardDrive,
        faqs: [
            {
                q: "Çalışma saatleriniz nedir?",
                a: "Hafta içi ve Cumartesi günleri 09:00 - 21:00, Pazar günleri ise 11:00 - 19:00 saatleri arasında hizmet vermekteyiz."
            },
            {
                q: "Otopark imkanınız var mı?",
                a: "Evet, salonumuzun hemen önünde müşterilerimize özel ücretsiz otopark alanımız bulunmaktadır."
            }
        ]
    },
]

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


export default function SupportPage() {
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
              Size Nasıl{' '}
              <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
                Yardımcı
              </span>{' '}
              Olabiliriz?
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
              Aklınıza takılan bir soru mu var? Aradığınız cevabı burada bulabilir veya bizimle doğrudan iletişime geçebilirsiniz. Size yardımcı olmak için buradayız.
            </p>
             <div className="mt-8 flex justify-center">
                <div className="relative w-full max-w-xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Sıkça sorulan sorularda ara..." className="pl-12 h-12 rounded-full" />
                </div>
            </div>
          </div>
        </motion.section>

        {/* FAQs Section */}
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                     <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Sıkça Sorulan Sorular</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                    {faqCategories.map((category, i) =>(
                        <motion.div 
                            key={category.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="mb-8"
                        >
                            <h3 className="text-2xl font-bold flex items-center mb-6"><category.icon className="w-7 h-7 mr-3 text-primary" /> {category.title}</h3>
                            <Accordion type="single" collapsible className="w-full space-y-2">
                                {category.faqs.map((faq, j) => (
                                    <AccordionItem key={j} value={`item-${i}-${j}`} className="border-none">
                                        <Card className="bg-card/50 backdrop-blur-sm">
                                            <AccordionTrigger className="p-4 text-base font-medium text-left hover:no-underline">
                                                {faq.q}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <p className="text-muted-foreground px-4 pb-4">{faq.a}</p>
                                            </AccordionContent>
                                        </Card>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Bizimle İletişime Geçin</h2>
              <p className="mx-auto mt-4 text-lg text-muted-foreground">
                Aradığınızı bulamadınız mı? Bize bir mesaj gönderin veya doğrudan arayın.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                   initial={{ opacity: 0, x: -50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true, amount: 0.3 }}
                   transition={{ duration: 0.7 }}
              >
                  <Card className="p-4 sm:p-8 border-none shadow-2xl shadow-primary/10">
                      <CardHeader>
                           <h3 className="text-2xl font-bold text-center">Mesaj Gönderin</h3>
                      </CardHeader>
                      <CardContent>
                          <form className="space-y-6">
                              <div className="grid sm:grid-cols-2 gap-6">
                                  <div className="space-y-2">
                                      <Label htmlFor="name">Adınız</Label>
                                      <Input id="name" placeholder="Adınızı girin" />
                                  </div>
                                  <div className="space-y-2">
                                      <Label htmlFor="email">E-posta Adresiniz</Label>
                                      <Input id="email" type="email" placeholder="E-posta adresinizi girin" />
                                  </div>
                              </div>
                               <div className="space-y-2">
                                  <Label htmlFor="subject">Konu</Label>
                                  <Input id="subject" placeholder="Mesajınızın konusu" />
                              </div>
                              <div className="space-y-2">
                                  <Label htmlFor="message">Mesajınız</Label>
                                  <Textarea id="message" placeholder="Bize iletmek istediğiniz her şey..." rows={5} />
                              </div>
                              <div className="text-center">
                                  <Button size="lg" type="submit" className="w-full sm:w-auto">
                                      Mesajı Gönder <Send className="ml-2 h-4 w-4" />
                                  </Button>
                              </div>
                          </form>
                      </CardContent>
                  </Card>
              </motion.div>
               <motion.div
                   initial={{ opacity: 0, x: 50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true, amount: 0.3 }}
                   transition={{ duration: 0.7, delay: 0.2 }}
                   className="space-y-8"
              >
                  <Card className="p-6 flex items-start gap-4">
                      <Phone className="w-8 h-8 text-primary mt-1"/>
                      <div>
                          <h4 className="text-lg font-bold">Bizi Arayın</h4>
                          <p className="text-muted-foreground">Randevu ve acil sorularınız için.</p>
                          <a href="tel:+905551234567" className="font-semibold text-primary text-lg">+90 (555) 123 45 67</a>
                      </div>
                  </Card>
                   <Card className="p-6 flex items-start gap-4">
                      <MapPin className="w-8 h-8 text-primary mt-1"/>
                      <div>
                          <h4 className="text-lg font-bold">Salonumuzu Ziyaret Edin</h4>
                          <p className="text-muted-foreground">Stil ve sanatın buluştuğu adres.</p>
                          <p className="font-semibold text-foreground">Barbaros Mah. Atatürk Cad. No:123, 34746 Ataşehir/İstanbul</p>
                      </div>
                  </Card>
              </motion.div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
