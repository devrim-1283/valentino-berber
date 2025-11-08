'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Calendar as CalendarIcon,
  Users,
  BarChart,
  LogOut,
  Scissors,
  TrendingUp,
  UserCog,
  PlusCircle,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { format, subDays, isSameDay } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAppointments } from '@/lib/hooks/use-appointments';
import { useBarbers, createBarber } from '@/lib/hooks/use-barbers';
import { KeyRound } from 'lucide-react';

const menuItems = [
  { name: 'Genel Bakış', icon: LayoutDashboard, href: '#', section: 'dashboard' },
  { name: 'Randevular', icon: CalendarIcon, href: '#', section: 'appointments' },
  { name: 'Berberler', icon: UserCog, href: '#', section: 'barbers'},
  { name: 'Müşteriler', icon: Users, href: '#', section: 'customers' },
  { name: 'Raporlar', icon: BarChart, href: '#', section: 'reports' },
];

function AddBarberDialog({ onBarberAdded }: { onBarberAdded: () => void }) {
    const [name, setName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleAddBarber = async () => {
        if (!name) return;
        setIsLoading(true);
        try {
            await createBarber({ 
                name, 
                specialty,
                imageUrl: `https://i.pravatar.cc/300?u=${name}` // Placeholder image
            });
            toast({
                title: "Berber Eklendi!",
                description: `${name} adlı berber başarıyla eklendi.`
            });
            setName('');
            setSpecialty('');
            onBarberAdded();
        } catch (error: any) {
            toast({
                title: "Hata",
                description: error.message || "Berber eklenirken bir hata oluştu.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Yeni Berber Ekle
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Yeni Berber Ekle</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="barber-name">Berber Adı</Label>
                        <Input id="barber-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Örn: Ali Vural"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="barber-specialty">Uzmanlık Alanı</Label>
                        <Input id="barber-specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} placeholder="Örn: Modern Kesimler"/>
                    </div>
                     <Button onClick={handleAddBarber} className="w-full" disabled={isLoading}>
                        {isLoading ? 'Ekleniyor...' : 'Ekle'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function ChangePasswordDialog() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast({
                title: "Hata",
                description: "Tüm alanlar doldurulmalıdır.",
                variant: "destructive"
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            toast({
                title: "Hata",
                description: "Yeni şifreler eşleşmiyor.",
                variant: "destructive"
            });
            return;
        }

        if (newPassword.length < 6) {
            toast({
                title: "Hata",
                description: "Şifre en az 6 karakter olmalıdır.",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/admin/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Şifre değiştirilemedi');
            }

            toast({
                title: "Başarılı",
                description: "Şifre başarıyla değiştirildi."
            });

            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setOpen(false);
        } catch (error: any) {
            toast({
                title: "Hata",
                description: error.message || "Şifre değiştirilirken bir hata oluştu.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <KeyRound className="mr-2 h-4 w-4" />
                    Şifre Değiştir
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Şifre Değiştir</DialogTitle>
                    <DialogDescription>
                        Mevcut şifrenizi girip yeni şifrenizi belirleyin.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="current-password">Mevcut Şifre</Label>
                        <Input 
                            id="current-password" 
                            type="password" 
                            value={currentPassword} 
                            onChange={(e) => setCurrentPassword(e.target.value)} 
                            placeholder="Mevcut şifrenizi girin"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-password">Yeni Şifre</Label>
                        <Input 
                            id="new-password" 
                            type="password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            placeholder="Yeni şifrenizi girin"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Yeni Şifre (Tekrar)</Label>
                        <Input 
                            id="confirm-password" 
                            type="password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            placeholder="Yeni şifrenizi tekrar girin"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
                        İptal
                    </Button>
                    <Button onClick={handleChangePassword} disabled={isLoading}>
                        {isLoading ? 'Değiştiriliyor...' : 'Değiştir'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean | null>(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  useEffect(() => {
    const isAdmin = sessionStorage.getItem('isAdminAuthenticated');
    if (isAdmin === 'true') {
      setIsAdminAuthenticated(true);
    } else {
      setIsAdminAuthenticated(false);
      router.push('/admin');
    }
  }, [router]);

  const { data: appointments, isLoading: isLoadingAppointments, refetch: refetchAppointments } = useAppointments();
  const { data: barbers, isLoading: isLoadingBarbers, refetch: refetchBarbers } = useBarbers();

  const weeklyData = useMemo(() => {
    if (!appointments) return [];
    const data: { [key: string]: number } = {};
    for (let i = 6; i >= 0; i--) {
        const date = subDays(new Date(), i);
        const formattedDate = format(date, 'd MMM', { locale: tr });
        data[formattedDate] = 0;
    }

    appointments?.forEach(apt => {
        const aptDate = new Date(apt.startTime);
        if (aptDate) {
            const today = new Date();
            if (aptDate <= today && aptDate >= subDays(today, 6)) {
                  const formattedDate = format(aptDate, 'd MMM', { locale: tr });
                  if(data.hasOwnProperty(formattedDate)) {
                    data[formattedDate]++;
                  }
            }
        }
    });

    return Object.keys(data).map(date => ({ date, count: data[date] }));
  }, [appointments]);

  const servicePopularity = useMemo(() => {
      if (!appointments) return [];
      const counts = appointments.reduce((acc, apt) => {
          const serviceName = apt.serviceId || apt.service; // Backward compatibility
          if (serviceName) {
            acc[serviceName] = (acc[serviceName] || 0) + 1;
          }
          return acc;
      }, {} as {[key: string]: number});

      return Object.entries(counts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count);
  }, [appointments]);

    const barberPerformance = useMemo(() => {
      if (!appointments || !barbers) return [];
      const counts = appointments.reduce((acc, apt) => {
          const barberId = apt.barberId || apt.barber;
          if (barberId) {
            const barber = barbers.find(b => b.id === barberId);
            const barberName = barber?.name || barberId;
            acc[barberName] = (acc[barberName] || 0) + 1;
          }
          return acc;
      }, {} as {[key: string]: number});

      return Object.entries(counts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count);
  }, [appointments, barbers]);
  
  const appointmentDays = useMemo(() => {
    if (!appointments) return [];
    return appointments.map(apt => {
        return new Date(apt.startTime);
    }).filter((d): d is Date => d !== null && !isNaN(d.getTime()));
  }, [appointments]);

  const selectedDayAppointments = useMemo(() => {
      if (!date || !appointments) return [];
      return appointments.filter(apt => {
          const aptDate = new Date(apt.startTime);
          return aptDate && !isNaN(aptDate.getTime()) && isSameDay(aptDate, date);
      }).sort((a,b) => {
          const aTime = new Date(a.startTime).getTime();
          const bTime = new Date(b.startTime).getTime();
          return aTime - bTime;
      });
  }, [date, appointments]);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    router.push('/admin');
  };

  const renderContent = () => {
    switch(activeSection) {
        case 'dashboard':
            return (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Randevu Takvimi</h1>
                     <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                        <Card className="lg:col-span-2">
                           <CardContent className="p-2">
                               <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="p-0"
                                    classNames={{
                                        day_selected: "bg-primary text-primary-foreground hover:bg-primary/90",
                                        day_today: "bg-accent text-accent-foreground",
                                        root: "w-full border-none",
                                        table: "w-full",
                                        head_row: "w-full flex",
                                        row: "w-full flex mt-2",
                                        cell: "flex-1",
                                    }}
                                    modifiers={{ appointments: appointmentDays }}
                                    modifiersClassNames={{
                                        appointments: "bg-primary/20 text-primary rounded-md"
                                    }}
                                    locale={tr}
                                />
                           </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base sm:text-lg">{date ? format(date, "d MMMM yyyy", { locale: tr }) : 'Tarih Seçin'}</CardTitle>
                                <CardDescription>Seçili günün randevuları</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {isLoadingAppointments ? (
                                    <Skeleton className="h-40 w-full" />
                                ) : selectedDayAppointments.length > 0 ? (
                                    selectedDayAppointments.map((apt: any) => (
                                         <div key={apt.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                                            <div className="flex-shrink-0 bg-primary text-primary-foreground h-10 w-10 flex items-center justify-center rounded-full font-bold text-sm">
                                                {format(new Date(apt.startTime), 'HH:mm')}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm sm:text-base">{apt.customerName}</p>
                                                <p className="text-xs sm:text-sm text-muted-foreground">{apt.serviceId || apt.service}</p>
                                            </div>
                                         </div>
                                    ))
                                ) : (
                                    <div className="text-center text-muted-foreground py-10">
                                        <CalendarIcon className="mx-auto h-12 w-12 opacity-50" />
                                        <p className="mt-4">Bu tarihte planlanmış randevu yok.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                     </div>
                </motion.div>
            )
        case 'appointments':
            return (
                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Gelen Randevular</h1>
                    <Card>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Müşteri</TableHead>
                            <TableHead>Telefon</TableHead>
                            <TableHead>Hizmet</TableHead>
                            <TableHead>Berber</TableHead>
                            <TableHead>Tarih</TableHead>
                            <TableHead>Saat</TableHead>
                            <TableHead>Durum</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {isLoadingAppointments ? (
                            Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                                <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                            </TableRow>
                            ))
                        ) : appointments && appointments.length > 0 ? (
                            [...appointments].sort((a, b) => {
                                const timeA = new Date(a.startTime).getTime();
                                const timeB = new Date(b.startTime).getTime();
                                return timeB - timeA;
                            }).map((appointment: any) => (
                            <TableRow key={appointment.id}>
                                <TableCell className="font-medium">{appointment.customerName}</TableCell>
                                <TableCell>{appointment.customerPhone}</TableCell>
                                <TableCell>{appointment.serviceId || appointment.service}</TableCell>
                                <TableCell>{appointment.barberName || appointment.barberId || appointment.barber}</TableCell>
                                <TableCell>{new Date(appointment.startTime).toLocaleDateString('tr-TR')}</TableCell>
                                <TableCell>{new Date(appointment.startTime).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</TableCell>
                                <TableCell><Badge>{appointment.status || 'Bekleniyor'}</Badge></TableCell>
                            </TableRow>
                            ))
                        ) : (
                            <TableRow>
                            <TableCell colSpan={7} className="text-center h-24">
                                Henüz planlanmış bir randevu yok.
                            </TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                    </Card>
                </motion.div>
            )
        case 'barbers':
             return (
                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Berberler</h1>
                        <AddBarberDialog onBarberAdded={() => refetchBarbers()} />
                    </div>
                    <Card>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Berber Adı</TableHead>
                                    <TableHead>Uzmanlık</TableHead>
                                    <TableHead className="text-right">İşlemler</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                               {isLoadingBarbers ? (
                                    Array.from({length: 3}).map((_, i) => (
                                        <TableRow key={i}>
                                            <TableCell><Skeleton className="h-5 w-32"/></TableCell>
                                            <TableCell><Skeleton className="h-5 w-28"/></TableCell>
                                            <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto"/></TableCell>
                                        </TableRow>
                                    ))
                                ) : barbers && barbers.length > 0 ? (
                                    barbers.map((barber: any) => (
                                        <TableRow key={barber.id}>
                                            <TableCell>{barber.name}</TableCell>
                                            <TableCell>{barber.specialty}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm">Düzenle</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="h-24 text-center">
                                            Henüz hiç berber eklenmemiş.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Card>
                </motion.div>
            );
        case 'customers':
            const customers = appointments ? [...new Map(appointments.map(item => [item['customerPhone'], item])).values()] : [];
            return (
                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Müşteriler</h1>
                    <Card>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Müşteri Adı</TableHead>
                                    <TableHead>Telefon Numarası</TableHead>
                                    <TableHead>Toplam Randevu</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                               {isLoadingAppointments ? (
                                    Array.from({length: 3}).map((_, i) => (
                                        <TableRow key={i}>
                                            <TableCell><Skeleton className="h-5 w-32"/></TableCell>
                                            <TableCell><Skeleton className="h-5 w-28"/></TableCell>
                                            <TableCell><Skeleton className="h-5 w-20"/></TableCell>
                                        </TableRow>
                                    ))
                                ) : customers.length > 0 ? (
                                    customers.map((customer: any) => (
                                        <TableRow key={customer.id}>
                                            <TableCell>{customer.customerName}</TableCell>
                                            <TableCell>{customer.customerPhone}</TableCell>
                                            <TableCell>{appointments?.filter(a => a.customerPhone === customer.customerPhone).length}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="h-24 text-center">
                                            Henüz hiç müşteri yok.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Card>
                </motion.div>
            );
        case 'reports':
            return (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Raporlar</h1>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5"/>Haftalık Randevu Özeti</CardTitle>
                             <CardDescription>Son 7 günün randevu yoğunluğunu gösteren grafik.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                           {isLoadingAppointments ? <Skeleton className="h-full w-full"/> : (
                             <ResponsiveContainer width="100%" height="100%">
                                <RechartsBarChart data={weeklyData}>
                                    <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} allowDecimals={false} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--background))',
                                            border: '1px solid hsl(var(--border))',
                                            borderRadius: 'var(--radius)'
                                        }}
                                        labelStyle={{color: 'hsl(var(--foreground))'}}
                                    />
                                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </RechartsBarChart>
                            </ResponsiveContainer>
                           )}
                        </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                         <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Scissors className="h-5 w-5"/>Hizmet Popülerliği</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isLoadingAppointments ? <Skeleton className="h-40 w-full" /> : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Hizmet Adı</TableHead>
                                            <TableHead className="text-right">Randevu Sayısı</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {servicePopularity.map(service => (
                                            <TableRow key={service.name}>
                                                <TableCell>{service.name}</TableCell>
                                                <TableCell className="text-right font-bold">{service.count}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                )}
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5"/>Berber Performansı</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isLoadingAppointments ? <Skeleton className="h-40 w-full" /> : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Berber Adı</TableHead>
                                            <TableHead className="text-right">Randevu Sayısı</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {barberPerformance.map(barber => (
                                            <TableRow key={barber.name}>
                                                <TableCell>{barber.name}</TableCell>
                                                <TableCell className="text-right font-bold">{barber.count}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>
            );
        default:
            return <p>Bölüm bulunamadı.</p>
    }
  }

  if (isAdminAuthenticated === null) {
     return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40">
            <div className="text-center">
                <p className="text-lg">Yönetici doğrulanıyor...</p>
            </div>
        </div>
     )
  }
  
   if (isAdminAuthenticated === false) {
     return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40">
            <div className="text-center">
                <p className="text-lg">Erişim yetkiniz yok. Giriş sayfasına yönlendiriliyorsunuz...</p>
            </div>
        </div>
     )
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
             <Scissors className="text-primary h-6 w-6"/>
            <span className="">Admin Paneli</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveSection(item.section)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  activeSection === item.section ? 'bg-muted text-primary' : 'text-muted-foreground'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
         <div className="mt-auto p-4 border-t">
            <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4"/>
                Çıkış Yap
            </Button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-background px-6">
           <span className="font-semibold">Hoş Geldiniz, Yönetici</span>
           <ChangePasswordDialog />
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
            {renderContent()}
        </main>
      </div>
    </div>
  );
}
