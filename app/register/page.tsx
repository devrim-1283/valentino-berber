'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Mail, Phone, User, Calendar, Clock, Scissors, Check, UserCog, Building, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, getDay, setHours, setMinutes, startOfDay, isEqual, endOfDay } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { useSiteSettings } from '@/lib/hooks/use-settings';
import { useAppointments, createAppointment } from '@/lib/hooks/use-appointments';
import { useBarbers } from '@/lib/hooks/use-barbers';
import { TikTokIcon } from '@/components/ui/icons';
import { Skeleton } from '@/components/ui/skeleton';

const baseSteps = [
  { id: 1, name: 'Hizmet', fields: ['services'] },
  { id: 2, name: 'Berber', fields: ['barber'] },
  { id: 3, name: 'Tarih & Saat', fields: ['date', 'time'] },
  { id: 4, name: 'Onay', fields: ['customerName', 'customerPhone'] },
];

const services = [
    { name: 'Profesyonel Saç Tasarımı', description: 'Kişiye özel kesim ve stil ile tarzınızı yansıtın.', price: "400₺", duration: 60},
    { name: 'Uzman Sakal Şekillendirme', description: 'Keskin hatlar ve bakımlı sakal için detaylı tıraş.', price: "200₺", duration: 30},
    { name: 'Cilt Ağdası', description: 'Pürüzsüz ve uzun süreli rahatlık için titiz uygulama.', price: "100₺", duration: 20 },
    { name: 'Besleyici Saç Bakımı', description: 'Saçlarınıza nem ve güç katan özel maske uygulaması.', price: "100₺", duration: 20},
    { name: 'Rahatlatıcı Saç Yıkama', description: 'Ferahlatıcı şampuan eşliğinde.', price: "100₺", duration: 15},
    { name: 'Derinlemesine Buharlı Cilt Bakımı', description: 'Gözenekleri açan ve cildi yenileyen özel bakım.', price: "500₺", duration: 50},
];

// Barbers will be fetched from API


type FormData = {
  services: string[];
  barber: string;
  date: Date | undefined;
  time: string;
  customerName: string;
  customerPhone: string;
};

const Header = () => {
    const { settings, isLoading } = useSiteSettings();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-sm border-b border-border/50">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2">
                    <Scissors className="text-primary h-6 w-6"/>
                    <span className="text-lg font-bold">{isLoading ? <Skeleton className="h-6 w-24" /> : settings?.brandName}</span>
                </Link>
                <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                    <Link href="/" className="text-muted-foreground transition-colors hover:text-primary">
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


export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({
    services: [],
    barber: '',
    date: new Date(),
    time: '',
    customerName: '',
    customerPhone: '',
  });

  const { settings } = useSiteSettings();
  const { toast } = useToast();
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Fetch all appointments and filter by date/barber client-side
  const { data: allAppointments, isLoading: isLoadingAppointments } = useAppointments();
  const { data: barbers, isLoading: isLoadingBarbers } = useBarbers();

  const bookedSlots = useMemo(() => {
    if (!allAppointments || !formData.date || !formData.barber) {
      return new Set<string>();
    }
    
    const slots = new Set<string>();
    const selectedDate = startOfDay(formData.date);
    const selectedDateEnd = endOfDay(formData.date);

    allAppointments.forEach(apt => {
      if (apt.barberId === formData.barber) {
        const aptDate = new Date(apt.startTime);
        if (aptDate >= selectedDate && aptDate <= selectedDateEnd) {
          const formattedTime = format(aptDate, 'HH:mm');
          slots.add(`${apt.barberId}-${formattedTime}`);
        }
      }
    });
    
    return slots;
  }, [allAppointments, formData.date, formData.barber]);

  
  const generatedTimeSlots = useMemo(() => {
    const slots = [];
    for (let i = 9; i <= 20; i++) {
        slots.push(`${i.toString().padStart(2, '0')}:00`);
        if (i < 20) { // Don't add 20:30 if loop ends at 20
          slots.push(`${i.toString().padStart(2, '0')}:30`);
        }
    }
    return slots;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (name: string, value: string | Date | undefined) => {
    if (name === 'date') {
      setFormData(prev => ({...prev, [name]: value, time: ''})); // Reset time when date changes
      setDatePickerOpen(false); // Close popover on select
    } else {
      setFormData(prev => ({...prev, [name]: value}));
    }
  }

  const handleServiceToggle = (serviceName: string) => {
    setFormData(prev => {
        const currentServices = prev.services || [];
        const newServices = currentServices.includes(serviceName)
            ? currentServices.filter(s => s !== serviceName)
            : [...currentServices, serviceName];
        return { ...prev, services: newServices };
    });
  };

  const validatePhoneNumber = (phone: string | undefined): boolean => {
    if (!phone) return false;
    const phoneRegex = /^(\+90|0)?\s*(\d{3})\s*(\d{3})\s*(\d{2})\s*(\d{2})$/;
    return phone.replace(/\D/g, '').length >= 10 && phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const isStepValid = useMemo(() => {
    const stepInfo = baseSteps.find(s => s.id === currentStep);
    if (!stepInfo) return true;

    switch (stepInfo.id) {
        case 1: // Hizmet
            return formData.services ? formData.services.length > 0 : false;
        case 2: // Berber
            return !!formData.barber && formData.barber !== '';
        case 3: // Tarih & Saat
            return !!formData.date && !!formData.time;
        case 4: // Onay
            return !!formData.customerName && validatePhoneNumber(formData.customerPhone);
        default:
            return true;
    }
  }, [currentStep, formData]);

  const nextStep = () => {
     if (currentStep < baseSteps.length && isStepValid) {
        setCurrentStep(step => step + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
        setCurrentStep(step => step - 1);
    }
  };

  const handleSubmit = async () => {
    if (!isStepValid || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const appointmentDateTime = formData.date 
        ? setMinutes(setHours(formData.date, parseInt(formData.time?.split(':')[0] || '0')), parseInt(formData.time?.split(':')[1] || '0'))
        : new Date();

      await createAppointment({
        serviceId: formData.services?.join(', ') || '',
        barberId: formData.barber,
        startTime: appointmentDateTime.toISOString(),
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
      });

      toast({
        title: 'Randevu Başarıyla Oluşturuldu',
        description: 'Randevunuz başarıyla kaydedildi.',
      });

      setCurrentStep(baseSteps.length + 1); // Go to success step
    } catch (error: any) {
      console.error('Error creating appointment:', error);
      
      // Handle appointment conflict (409)
      if (error.message?.includes('Bu saatte') || error.message?.includes('Conflict')) {
        setSubmitError('Bu saatte bu berber için zaten bir randevu var. Lütfen başka bir saat seçin.');
        toast({
          title: 'Randevu Çakışması',
          description: 'Bu saatte bu berber için zaten bir randevu var. Lütfen başka bir saat seçin.',
          variant: 'destructive',
        });
        // Go back to time selection step
        setCurrentStep(3);
      } else {
        setSubmitError(error.message || 'Randevu oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
        toast({
          title: 'Hata',
          description: error.message || 'Randevu oluşturulurken bir hata oluştu.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }
  
  const progressValue = (currentStep / baseSteps.length) * 100;

  const slideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };
  
  const renderContent = () => {    
    if (currentStep > baseSteps.length) {
        // Success Step
        return (
            <AnimatePresence mode="wait">
                 <motion.div
                    key="success"
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="w-full"
                >
                    <div className="max-w-lg mx-auto text-center">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                            className="flex flex-col items-center"
                        >
                            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
                                <Check className="w-12 h-12 text-green-600" />
                            </div>
                            <h2 className="text-3xl font-bold mb-2">Randevunuz Alındı!</h2>
                            <p className="text-muted-foreground mb-6 max-w-md">
                                Teşekkürler, {formData.customerName}! <br/>
                                <strong>{formData.date ? format(formData.date, "dd MMMM", { locale: tr }) : ''}</strong> günü, saat <strong>{formData.time}</strong> için randevunuz başarıyla oluşturuldu.
                            </p>
                            <Button asChild>
                                <Link href="/">Anasayfaya Dön</Link>
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    }
    
    const stepInfo = baseSteps.find(s => s.id === currentStep);
    if (!stepInfo) return null;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={currentStep}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="w-full"
            >
            {/* Step 1: Service */}
            {currentStep === 1 && (
                <div className="max-w-2xl mx-auto">
                   <div className="flex flex-col items-center text-center mb-8">
                       <Scissors className="w-16 h-16 text-primary opacity-20 mb-4" />
                       <h3 className="text-2xl font-bold">Hizmet Seçimi</h3>
                       <p className="text-muted-foreground mt-2">Almak istediğiniz hizmetleri seçin. (Birden fazla seçilebilir)</p>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                       {services.map(service => (
                           <Card 
                                key={service.name} 
                                onClick={() => handleServiceToggle(service.name)} 
                                className={cn(
                                    "text-center p-4 cursor-pointer hover:border-primary transition-all duration-200", 
                                    formData.services?.includes(service.name) && "border-primary border-2 shadow-lg shadow-primary/20"
                                )}
                            >
                               <h4 className="font-bold">{service.name}</h4>
                               <p className="text-sm text-muted-foreground">{service.duration} dk.</p>
                               <p className="text-lg font-semibold text-primary mt-2">{service.price}</p>
                           </Card>
                       ))}
                   </div>
               </div>
            )}

            {/* Step 2: Berber */}
            {currentStep === 2 && (
               <div className="max-w-4xl mx-auto">
                   <div className="flex flex-col items-center text-center mb-8">
                       <User className="w-16 h-16 text-primary opacity-20 mb-4" />
                       <h3 className="text-2xl font-bold">Berber Seçimi</h3>
                       <p className="text-muted-foreground mt-2">Hizmeti kimden almak istersiniz?</p>
                   </div>
                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {isLoadingBarbers ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <Card key={i} className="p-0">
                                <Skeleton className="w-full h-28" />
                                <div className="p-2 text-center">
                                    <Skeleton className="h-4 w-24 mx-auto mb-2" />
                                    <Skeleton className="h-3 w-16 mx-auto" />
                                </div>
                            </Card>
                        ))
                    ) : barbers && barbers.length > 0 ? (
                        barbers.map(barber => (
                            <Card key={barber.id} onClick={() => handleSelectChange('barber', barber.id)} className={cn("text-center p-0 cursor-pointer hover:border-primary transition-colors flex flex-col items-center justify-start gap-2 overflow-hidden", formData.barber === barber.id && "border-primary border-2 shadow-lg")}>
                                <Image src={barber.imageUrl || 'https://via.placeholder.com/150'} alt={barber.name} width={150} height={150} className="w-full h-28 object-cover"/>
                                <div className="p-2 text-center">
                                <h4 className="font-bold text-sm">{barber.name}</h4>
                                <p className="text-xs text-muted-foreground">{barber.specialty}</p>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-muted-foreground">Şu anda müsait berber bulunmamaktadır.</p>
                    )}
                   </div>
               </div>
            )}
            
            {/* Step 3: Date and Time */}
            {currentStep === 3 && (
                <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-8 items-start">
                   <div className="flex flex-col items-center text-center md:text-left md:items-start mb-8 md:mb-0">
                       <Calendar className="w-16 h-16 text-primary opacity-20 mb-4" />
                       <h3 className="text-2xl font-bold">Tarih ve Saat</h3>
                       <p className="text-muted-foreground mt-2">Randevunuz için uygun bir gün ve saat belirleyin.</p>
                   </div>
                    <Card className="bg-card/50">
                       <CardHeader>
                           <CardTitle>Randevu Zamanı</CardTitle>
                       </CardHeader>
                       <CardContent className="space-y-6">
                           <div className="space-y-2">
                               <Label>Tarih Seçin</Label>
                               <Popover open={isDatePickerOpen} onOpenChange={setDatePickerOpen}>
                                    <PopoverTrigger asChild>
                                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !formData.date && "text-muted-foreground")}>
                                            <Calendar className="mr-2 h-4 w-4" />
                                            {formData.date ? format(formData.date, "PPP", { locale: tr }) : <span>Bir tarih seçin</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <CalendarComponent locale={tr} mode="single" selected={formData.date} onSelect={(date) => handleSelectChange('date', date)} initialFocus disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}/>
                                    </PopoverContent>
                                </Popover>
                           </div>
                           <div className="space-y-2">
                               <Label>Saat Seçin (Müsait Olanlar)</Label>
                               <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                 {isLoadingAppointments ? (
                                    Array.from({ length: 12 }).map((_, i) => (
                                      <Skeleton key={i} className="h-10 w-full" />
                                    ))
                                 ) : (
                                    generatedTimeSlots.map(time => {
                                      const isBooked = bookedSlots.has(`${formData.barber}-${time}`);
                                      return (
                                        <Button key={time} variant={formData.time === time ? 'default' : 'outline'} onClick={() => handleSelectChange('time', time)} disabled={isBooked || !formData.barber}>{time}</Button>
                                      )
                                    })
                                 )}
                               </div>
                               {submitError && (
                                 <p className="text-sm text-destructive mt-2">{submitError}</p>
                               )}
                           </div>
                       </CardContent>
                   </Card>
                </div>
            )}
            
            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="max-w-lg mx-auto">
                <div className="flex flex-col items-center text-center mb-8">
                       <Check className="w-16 h-16 text-primary opacity-20 mb-4" />
                       <h3 className="text-2xl font-bold">Bilgileri Onayla</h3>
                       <p className="text-muted-foreground mt-2">Lütfen randevu bilgilerinizi kontrol edin ve onaylayın.</p>
                </div>
                <Card className="bg-card/50 mb-6">
                  <CardHeader>
                    <CardTitle>Randevu Özeti</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <div className="space-y-3">
                         <div className="flex justify-between items-start">
                            <span className="text-muted-foreground flex items-center gap-2 pt-1"><Scissors className="w-4 h-4"/> Hizmetler:</span> 
                            <span className="font-medium text-right">{formData.services?.join(', ')}</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-muted-foreground flex items-center gap-2"><User className="w-4 h-4"/> Berber:</span> 
                            <span className="font-medium text-right">{barbers?.find(b => b.id === formData.barber)?.name || formData.barber}</span>
                          </div>
                         <div className="flex justify-between items-center">
                           <span className="text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4"/> Tarih:</span>
                           <span className="font-medium text-right">{formData.date ? format(formData.date, "PPP", { locale: tr }) : 'N/A'}</span>
                         </div>
                          <div className="flex justify-between items-center">
                           <span className="text-muted-foreground flex items-center gap-2"><Clock className="w-4 h-4"/> Saat:</span>
                           <span className="font-medium text-right">{formData.time}</span>
                         </div>
                    </div>
                     <div className="border-t pt-6 space-y-4">
                       <div className="space-y-2">
                           <Label htmlFor="customerName">Adınız Soyadınız</Label>
                           <div className="relative">
                               <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                               <Input id="customerName" type="text" placeholder="John Doe" value={formData.customerName} onChange={handleChange} className="pl-10"/>
                           </div>
                       </div>
                       <div className="space-y-2">
                           <Label htmlFor="customerPhone">Telefon Numaranız</Label>
                           <div className="relative">
                               <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                               <Input id="customerPhone" type="tel" placeholder="0555 123 4567" value={formData.customerPhone} onChange={handleChange} className="pl-10"/>
                           </div>
                       </div>
                    </div>
                  </CardContent>
                </Card>
                
                 <Button onClick={handleSubmit} size="lg" className="w-full" disabled={!isStepValid || isSubmitting}>
                    {isSubmitting ? 'Kaydediliyor...' : 'Randevuyu Tamamla ve Onayla'}
                  </Button>
              </div>
            )}
            </motion.div>
        </AnimatePresence>
    );
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
       <div
        className="absolute inset-0 h-full w-full bg-transparent -z-10"
        style={{backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)' , backgroundSize: '20px 20px'}}
      />
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center container mx-auto px-4 py-24">
        <div className="w-full max-w-4xl">
           {currentStep <= baseSteps.length && (
            <div className="mb-12">
                <h1 className="text-4xl font-extrabold tracking-tighter text-center text-foreground sm:text-5xl">
                Randevunuzu Oluşturun
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
                Sadece birkaç adımda yerinizi ayırtın ve {settings?.brandName} deneyimine hazır olun.
                </p>
            </div>
           )}

          <Card className="border-none shadow-2xl shadow-primary/10">
            <CardContent className="p-4 sm:p-8 flex flex-col min-h-[650px]">
              {currentStep <= baseSteps.length && (
                <div className="mb-8">
                    <Progress value={progressValue} className="h-2" />
                    <div className={cn("mt-4 grid gap-4 text-center", `grid-cols-${baseSteps.length}`)}>
                    {baseSteps.map(step => (
                        <div key={step.id} className={cn("flex flex-col items-center gap-2", currentStep >= step.id ? 'text-primary' : 'text-muted-foreground')}>
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all", currentStep > step.id ? 'bg-primary border-primary text-primary-foreground' : currentStep === step.id ? 'border-primary' : 'bg-muted')}>
                            {currentStep > step.id ? <Check className="h-5 w-5"/> : step.id}
                        </div>
                        <p className="text-xs font-semibold hidden sm:block">{step.name}</p>
                        </div>
                    ))}
                    </div>
                </div>
              )}
              
              <div className="relative flex-grow flex items-center">
                 {renderContent()}
              </div>

              {currentStep <= baseSteps.length && (
                <div className={cn("mt-8 pt-5 flex", currentStep > 1 ? "justify-between" : "justify-end")}>
                    {currentStep > 1 && (
                       <Button variant="outline" onClick={prevStep}>
                         <ArrowLeft className="mr-2 h-4 w-4" /> Geri
                       </Button>
                    )}
                    {currentStep < baseSteps.length && (
                        <Button onClick={nextStep} disabled={!isStepValid}>
                            İleri <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
