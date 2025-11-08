'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  Calendar,
  Settings,
  LifeBuoy,
  LogOut,
  PlusCircle,
  ExternalLink,
  Scissors,
  User,
} from 'lucide-react';
import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSiteSettings } from '@/lib/hooks/use-settings';
import { useAppointments } from '@/lib/hooks/use-appointments';

const menuItems = [
  { name: 'Genel Bakış', icon: LayoutDashboard },
  { name: 'Randevularım', icon: Calendar },
  { name: 'Profilim', icon: User },
  { name: 'Ayarlar', icon: Settings },
  { name: 'Destek', icon: LifeBuoy },
];

export default function AccountPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const auth = getAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('Genel Bakış');
  const { settings } = useSiteSettings();

  const appointmentsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    // This path should query appointments where customer UID matches
    return collection(firestore, 'appointments');
  }, [user, firestore]);

  const { data: appointments, isLoading: isLoadingAppointments } = useCollection(appointmentsQuery);
  const upcomingAppointments = appointments?.filter(apt => new Date(apt.startTime) > new Date());


  useEffect(() => {
    if (activeSection === 'Destek') {
      router.push('/support');
    }
  }, [activeSection, router]);

  const handleLogout = () => {
    signOut(auth);
    router.push('/');
  };
  
  const renderContent = () => {
    switch (activeSection) {
      case 'Genel Bakış':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Genel Bakış</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Yaklaşan Randevular</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {isLoadingAppointments ? (
                    <Skeleton className="h-8 w-1/4" />
                  ) : (
                    <div className="text-2xl font-bold">{upcomingAppointments?.length || 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">Toplam planlanmış randevu</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Geçmiş Randevular</CardTitle>
                  <Scissors className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {isLoadingAppointments ? (
                     <Skeleton className="h-8 w-1/2" />
                  ) : (
                    <div className="text-2xl font-bold">{appointments?.length || 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">Toplam tamamlanan hizmet</p>
                </CardContent>
              </Card>
            </div>
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Hızlı Eylemler</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-4">
                     <Button asChild>
                        <Link href="/register">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Yeni Randevu Oluştur
                        </Link>
                     </Button>
                     <Button variant="outline" asChild>
                        <Link href="/services">
                          Hizmetleri İncele
                        </Link>
                     </Button>
                </CardContent>
            </Card>
          </motion.div>
        );
      case 'Randevularım':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-between items-center mb-6">
                 <h2 className="text-3xl font-bold tracking-tight">Randevularım</h2>
                 <Button asChild>
                    <Link href="/register">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Yeni Randevu
                    </Link>
                 </Button>
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Berber</TableHead>
                    <TableHead>Hizmet</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingAppointments ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                      </TableRow>
                    ))
                  ) : appointments && appointments.length > 0 ? (
                    appointments.map((appointment:any) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.barberId}</TableCell>
                        <TableCell>{appointment.serviceId}</TableCell>
                        <TableCell>{new Date(appointment.startTime).toLocaleString('tr-TR')}</TableCell>
                        <TableCell><Badge variant={appointment.status === 'Scheduled' ? 'default' : 'secondary'}>{appointment.status}</Badge></TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Yönet</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center h-24">
                        Henüz bir randevunuz yok.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </motion.div>
        );
      case 'Profilim':
         return (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Profilim</h2>
                <Card>
                    <CardHeader>
                      <CardTitle>Kişisel Bilgiler</CardTitle>
                      <CardDescription>Bilgilerinizi buradan güncelleyebilirsiniz.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={user?.photoURL || ''} />
                          <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <Button variant="outline">Resmi Değiştir</Button>
                      </div>
                      <div>
                        <strong>E-posta:</strong> {user?.email}
                      </div>
                       <div>
                        <strong>Ad Soyad:</strong> {user?.displayName || 'Belirtilmemiş'}
                      </div>
                      <Button>Bilgileri Güncelle</Button>
                    </CardContent>
                </Card>
             </motion.div>
         );
      case 'Destek':
        return null;
      case 'Ayarlar':
         return (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Ayarlar</h2>
                <Card>
                    <CardHeader><CardTitle>Bildirim Ayarları</CardTitle></CardHeader>
                    <CardContent><p>Yakında buradan randevu hatırlatmaları ve kampanya bildirimlerinizi yönetebileceksiniz.</p></CardContent>
                </Card>
             </motion.div>
         );
      default:
        return <div>Bölüm bulunamadı.</div>;
    }
  };


  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
             <Scissors className="text-primary h-6 w-6"/>
            <span className="">{settings?.brandName}</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveSection(item.name)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  activeSection === item.name ? 'bg-muted text-primary' : 'text-muted-foreground'
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

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-background px-6 sm:justify-end">
           {/* Mobile Menu Trigger can be added here */}
          <div className="flex items-center gap-4">
             {isUserLoading ? (
                 <Skeleton className="h-8 w-8 rounded-full" />
             ) : (
                <Avatar>
                    <AvatarImage src={user?.photoURL || ''} alt="@user" />
                    <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
             )}
          </div>
        </header>
        <main className="flex-1 p-6">
            {isUserLoading ? (
                <div className="space-y-6">
                    <Skeleton className="h-8 w-48" />
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Skeleton className="h-28 w-full" />
                        <Skeleton className="h-28 w-full" />
                    </div>
                </div>
            ): (
                 renderContent()
            )}
        </main>
      </div>
    </div>
  );
}
