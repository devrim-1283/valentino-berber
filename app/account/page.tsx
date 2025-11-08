'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LayoutDashboard,
  Calendar,
  Settings,
  LifeBuoy,
  Scissors,
  User,
  PlusCircle,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import Link from 'next/link';
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
  const [activeSection, setActiveSection] = useState('Genel Bakış');
  const { settings } = useSiteSettings();
  const { data: appointments, isLoading: isLoadingAppointments } = useAppointments();
  const upcomingAppointments = appointments?.filter(apt => new Date(apt.startTime) > new Date()) || [];
  
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
                    <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
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
              <CardContent className="pt-6">
                  {isLoadingAppointments ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-20 w-full" />
                    ))}
                  </div>
                  ) : appointments && appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment: any) => (
                      <div key={appointment.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{appointment.barberName || appointment.barberId}</p>
                            <p className="text-sm text-muted-foreground">{appointment.serviceId}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(appointment.startTime).toLocaleString('tr-TR')}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">Yönet</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Henüz bir randevunuz yok.</p>
                    <Button asChild className="mt-4">
                      <Link href="/register">Yeni Randevu Oluştur</Link>
                    </Button>
                  </div>
                  )}
              </CardContent>
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
                <p className="text-sm text-muted-foreground">
                  Profil yönetimi yakında eklenecek.
                </p>
                    </CardContent>
                </Card>
             </motion.div>
         );
      case 'Ayarlar':
         return (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Ayarlar</h2>
                <Card>
                    <CardHeader><CardTitle>Bildirim Ayarları</CardTitle></CardHeader>
              <CardContent>
                <p>Yakında buradan randevu hatırlatmaları ve kampanya bildirimlerinizi yönetebileceksiniz.</p>
              </CardContent>
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
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-background px-6 sm:justify-end">
          <div className="flex items-center gap-4">
            <Link href="/register">
              <Button variant="outline">Randevu Al</Button>
            </Link>
          </div>
        </header>
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
