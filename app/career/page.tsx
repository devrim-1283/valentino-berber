'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, Briefcase, Code, Disc, Gift, Github, Globe, Group, Heart, Twitter, LogOut, Scissors, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TikTokIcon } from '@/components/ui/icons';
import { useSiteSettings } from '@/lib/hooks/use-settings';


const openPositions = [
  {
    title: 'Usta Berber',
    department: 'Salon Ekibi',
    location: 'İstanbul, Merkez',
    description: 'Samet Valentino ailesine katılacak, en az 5 yıl deneyimli, modern ve klasik kesim tekniklerine hakim, müşteri ilişkileri güçlü bir usta berber arıyoruz.',
    requirements: [
        'Erkek saçı ve sakalı konusunda kapsamlı bilgi ve beceri',
        'Modern saç trendlerini ve klasik teknikleri uygulama yeteneği',
        'Hijyen standartlarına ve müşteri memnuniyetine yüksek derecede önem verme',
        'Güçlü iletişim becerileri ve pozitif bir tutum'
    ]
  },
  {
    title: 'Genç Yetenek (Stajyer/Kalfa)',
    department: 'Salon Ekibi',
    location: 'İstanbul, Merkez',
    description: 'Berberlik mesleğine tutkuyla bağlı, öğrenmeye açık ve kendini geliştirmek isteyen genç yetenekler arıyoruz. Usta berberlerimizin yanında yetişerek kariyerinize başlayın.',
     requirements: [
        'Berberlik okulundan mezun veya ilgili alanda eğitim almış',
        'Temel kesim ve tıraş tekniklerine hakim',
        'Öğrenmeye ve geri bildirime açık',
        'Takım çalışmasına yatkın ve enerjik'
    ]
  },
];

const benefits = [
    { icon: Group, title: 'Harika Bir Ekip', description: 'Alanında uzman, dinamik ve birbirine destek olan bir aile ortamında çalışın.'},
    { icon: Heart, title: 'Sürekli Gelişim', description: 'Sektördeki en yeni trendler ve teknikler üzerine düzenli eğitimler ve atölyeler sunuyoruz.'},
    { icon: Gift, title: 'Dolgun Ücret & Yan Haklar', description: 'Performansa dayalı primler, özel sağlık sigortası ve daha fazlası.'},
    { icon: Globe, title: 'Prestijli Konum', description: 'Şehrin kalbinde, seçkin bir müşteri portföyüne hizmet veren bir salonda çalışın.'}
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


export default function CareerPage() {
    const { settings } = useSiteSettings();
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
              Kariyerine{' '}
              <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
                Bizimle
              </span>{' '}
              Yön Ver
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
              Sanatını konuşturacağın, yeteneğini sergileyeceğin ve bir ailenin parçası olacağın bir kariyer fırsatı. {settings?.brandName} ekibine katıl, fark yarat.
            </p>
          </div>
        </motion.section>

        {/* Benefits Section */}
         <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                     <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Neden {settings?.brandName}?</h2>
                     <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">Biz sadece bir salon değil, bir aileyiz. Çalışanlarımıza değer veriyor, gelişimlerini destekliyoruz.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="text-center h-full bg-card/50 backdrop-blur-sm border rounded-2xl shadow-lg hover:shadow-cyan/10 transition-shadow duration-300">
                                <CardContent className="p-8">
                                    <div className="inline-block p-4 bg-gradient-to-br from-cyan/10 to-purple/10 rounded-xl mb-4">
                                        <benefit.icon className="w-8 h-8 bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                    <p className="text-muted-foreground">{benefit.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* Open Positions Section */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Açık Pozisyonlar</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Ailemize katılacak yeni yetenekler arıyoruz. Belki de aradığımız kişi sensin?
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
                <Accordion type="single" collapsible className="w-full space-y-4">
                {openPositions.map((position, index) => (
                     <motion.div
                        key={position.title}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <AccordionItem value={`item-${index}`} className="border-none">
                             <Card className="bg-card/50 backdrop-blur-sm overflow-hidden">
                                <AccordionTrigger className="p-6 text-left hover:no-underline">
                                    <div className='flex-1'>
                                        <h3 className="text-lg font-semibold text-foreground">{position.title}</h3>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                            <span><Briefcase className="inline h-4 w-4 mr-1" /> {position.department}</span>
                                            <span><Globe className="inline h-4 w-4 mr-1" /> {position.location}</span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" className="ml-4">Detayları Gör</Button>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="px-6 pb-6 space-y-4">
                                        <p className="text-muted-foreground">{position.description}</p>
                                        <h4 className="font-semibold">Aranan Nitelikler:</h4>
                                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                            {position.requirements.map(req => <li key={req}>{req}</li>)}
                                        </ul>
                                        <Button>
                                            Bu Pozisyona Başvur <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </Card>
                        </AccordionItem>
                    </motion.div>
                ))}
                </Accordion>
            </div>
             <div className="text-center mt-12">
                 <p className="text-muted-foreground">Aradığın pozisyonu bulamadın mı?</p>
                 <Button variant="link" className="text-lg">Bize genel bir başvuru gönder</Button>
             </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
