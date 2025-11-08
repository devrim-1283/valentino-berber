'use client';

import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

interface SiteSettings {
    brandName?: string;
    heroTitle?: string;
    heroSubtitle?: string;
    aboutStory?: string;
    testimonialsTitle?: string;
    signatureSectionTitle?: string;
    signatureSectionSubtitle?: string;
    statsSectionTitle?: string;
    ctaTitle?: string;
    ctaSubtitle?: string;
}

const defaultSettings: SiteSettings = {
    brandName: "Valentino",
    heroTitle: "Tarzınızı Yeniden Keşfedin",
    heroSubtitle: "Uzman dokunuşlarla sıradan bir saç kesiminden fazlasını deneyimleyin.",
    aboutStory: "Valentino, bir makas ve bir tarakla başlayan bir tutkunun hikayesidir...",
    testimonialsTitle: "Müşterilerimiz Ne Diyor?",
    signatureSectionTitle: "Sadece Bir Saç Kesimi Değil, Bir İmza",
    signatureSectionSubtitle: "Kişiye özel analizler, modern teknikler ve premium ürünlerle tarzınızı bir sonraki seviyeye taşıyoruz. Her detayın düşünüldüğü bir bakım deneyimi sizi bekliyor.",
    statsSectionTitle: "Yüzlerce mutlu müşteri, binlerce başarılı kesim ve sürekli büyüyen bir aile.",
    ctaTitle: "Stilinizi Yenilemeye Hazır Mısınız?",
    ctaSubtitle: "Koltuğumuza oturun ve değişimi hissedin. Valentino'nun uzman ekibiyle yeni bir görünüme kavuşun.",
}

export function useSiteSettings() {
  const firestore = useFirestore();

  const settingsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'settings', 'global');
  }, [firestore]);

  const { data: settingsFromDB, isLoading, error } = useDoc<SiteSettings>(settingsQuery);
  
  const settings = !isLoading && !settingsFromDB ? defaultSettings : settingsFromDB;

  return { settings, isLoading, error };
}
