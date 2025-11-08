'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Disc, Github, Twitter, Users, Zap, ShieldCheck, Lightbulb, LogOut, Scissors, Award, Hand, History, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TikTokIcon } from '@/components/ui/icons';
import { useSiteSettings } from '@/lib/hooks/use-settings';
import { Skeleton } from '@/components/ui/skeleton';


const teamMembers = [
  {
    name: 'Samet Valentino',
    role: 'Kurucu & Usta Berber',
    avatar: 'https://i.pinimg.com/1200x/23/b6/4a/23b64a200380640386ffe94f66924639.jpg',
    bio: '15 yıllık tecrübesiyle, sanatı ve zanaati her saç kesiminde birleştiriyor. Tarzınıza imzasını atmak için burada.',
  },
  {
    name: 'Ali Vural',
    role: 'Berber',
    avatar: 'https://i.pinimg.com/736x/61/84/f8/6184f814c0e45527e449f9a5ba8ad6d4.jpg',
    bio: 'Modern kesimler ve trendler konusunda uzman. Genç ve dinamik tarzıyla enerjinizi yükseltir.',
  },
  {
    name: 'Can Ersoy',
    role: 'Berber & Sakal Uzmanı',
    avatar: 'https://i.pinimg.com/1200x/6b/85/7f/6b857f717acab8c97f57a325e6fd6a4d.jpg',
    bio: 'Klasik tıraş ve modern sakal tasarımlarının ustası. Detaycı ve titiz çalışmasıyla tanınır.',
  },
  {
    name: 'Deniz Kaya',
    role: 'Stilist & Renk Uzmanı',
    avatar: 'https://i.pinimg.com/1200x/c9/1f/2b/c91f2b6af59025606937e60655897ed2.jpg',
    bio: 'Saç renklendirme ve stil danışmanlığı konusunda salonumuzun yaratıcı gücü.',
  },
];

const values = [
    {
      icon: Award,
      title: 'Ustalık',
      description: 'Her birimiz, sürekli eğitim ve tutkuyla zanaatımızı en üst seviyede tutuyoruz. Kalite bizim için bir standarttır.'
    },
    {
      icon: Hand,
      title: 'Kişisel İlgi',
      description: 'Sizi dinliyor, anlıyor ve tarzınızı en iyi yansıtacak, size özel bir deneyim sunuyoruz.'
    },
    {
      icon: History,
      title: 'Gelenek ve Yenilik',
      description: 'Klasik berberlik geleneklerini, en modern teknikler ve trendlerle harmanlayarak eşsiz bir hizmet sunuyoruz.'
    },
    {
      icon: Zap,
      title: 'Atmosfer',
      description: 'Salonumuz, sadece bakım yaptırdığınız değil, aynı zamanda rahatladığınız ve keyif aldığınız bir mekan olarak tasarlandı.'
    }
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
                    <Link href="/services" className="text-muted-foreground transition-colors hover:text-primary">Hizmetler</Link>
                    <Link href="/gallery" className="text-muted-foreground transition-colors hover:text-primary">Galeri</Link>
                    <Link href="/about" className="text-primary font-semibold transition-colors hover:text-primary">Hakkımızda</Link>
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

export default function AboutPage() {
  const { settings, isLoading } = useSiteSettings();
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
          className="py-40 md:py-48 text-center"
        >
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl">
              Sanatın ve Zanaatın{' '}
              <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
                Buluştuğu
              </span>{' '}
              Yer
            </h1>
            {isLoading ? (
               <Skeleton className="h-6 w-3/4 mx-auto mt-6" />
             ) : (
               <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                 {`${settings?.brandName} olarak, klasik berberlik geleneklerini modern bir vizyonla birleştiriyoruz. Bizim için her saç kesimi bir sanat eseri, her müşteri ise bir dosttur.`}
               </p>
             )}
          </div>
        </motion.section>
        
        {/* Story Section */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
             <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
             >
                <Image 
                    src="https://i.pinimg.com/1200x/24/86/14/248614bdfc4c4ac126ddfb4417346ac0.jpg" 
                    alt="Samet Valentino Salon" 
                    width={600} 
                    height={700}
                    className="rounded-2xl shadow-2xl object-cover w-full h-[700px]"
                    data-ai-hint="luxury barbershop interior"
                />
             </motion.div>
             <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="space-y-6"
            >
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Hikayemiz</h2>
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-5 w-full"/>
                    <Skeleton className="h-5 w-full"/>
                    <Skeleton className="h-5 w-4/5"/>
                  </div>
                ) : settings?.aboutStory ? (
                  <div className="space-y-4 text-muted-foreground">
                    {settings.aboutStory.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-base leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-base leading-relaxed">
                      Valentino, bir makas ve bir tarakla başlayan bir tutkunun hikayesidir. 15 yılı aşkın tecrübemizle, klasik berberlik geleneklerini modern bir vizyonla birleştirerek, her müşterimize özel bir deneyim sunuyoruz.
                    </p>
                    <p className="text-base leading-relaxed">
                      Her saç kesimi bir sanat eseri, her müşteri ise bizim için değerli bir dosttur. Sadece bir hizmet değil, aynı zamanda bir deneyim sunuyoruz.
                    </p>
                  </div>
                )}

                <Button asChild>
                    <Link href="/services">Hizmetlerimizi Görün</Link>
                </Button>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                     <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Değerlerimiz</h2>
                     <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">Bizi biz yapan ve her dokunuşumuza yön veren ilkeler.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="text-center h-full bg-card/50 backdrop-blur-sm border rounded-2xl shadow-lg hover:shadow-cyan/10 transition-shadow duration-300">
                                <CardContent className="p-8">
                                    <div className="inline-block p-4 bg-gradient-to-br from-cyan/10 to-purple/10 rounded-xl mb-4">
                                        <value.icon className="w-8 h-8 bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                    <p className="text-muted-foreground">{value.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>


        {/* Team Section */}
        <section id="team" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">Ekibimizle Tanışın</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Tarzınızın arkasındaki yetenekli eller.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                 <motion.div
                    key={member.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <Card className="group overflow-hidden text-center border-none shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                        <CardContent className="p-0">
                            <div className="relative">
                                <Image
                                    src={member.avatar}
                                    alt={member.name}
                                    width={300}
                                    height={300}
                                    className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            </div>
                            <div className="p-6 bg-card -mt-10 relative z-10">
                                <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                                <p className="text-primary font-semibold">{member.role}</p>
                                <p className="text-muted-foreground text-sm mt-2">{member.bio}</p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
