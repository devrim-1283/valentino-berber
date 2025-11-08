'use client';

import { useState, useEffect } from 'react';

export interface SiteSettings {
  id?: string;
  key?: string;
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
  instagramUrl?: string;
  tiktokUrl?: string;
  contactAddress?: string;
  contactPhone?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UseSettingsResult {
  settings: SiteSettings | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const defaultSettings: SiteSettings = {
  brandName: 'Valentino',
  heroTitle: 'Tarzınızı Yeniden Keşfedin',
  heroSubtitle: 'Uzman dokunuşlarla sıradan bir saç kesiminden fazlasını deneyimleyin.',
  aboutStory: 'Valentino, bir makas ve bir tarakla başlayan bir tutkunun hikayesidir...',
  testimonialsTitle: 'Müşterilerimiz Ne Diyor?',
  signatureSectionTitle: 'Sadece Bir Saç Kesimi Değil, Bir İmza',
  signatureSectionSubtitle: 'Kişiye özel analizler, modern teknikler ve premium ürünlerle tarzınızı bir sonraki seviyeye taşıyoruz.',
  statsSectionTitle: 'Yüzlerce mutlu müşteri, binlerce başarılı kesim ve sürekli büyüyen bir aile.',
  ctaTitle: 'Stilinizi Yenilemeye Hazır Mısınız?',
  ctaSubtitle: 'Koltuğumuza oturun ve değişimi hissedin. Valentino\'nun uzman ekibiyle yeni bir görünüme kavuşun.',
};

export function useSiteSettings(): UseSettingsResult {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const refetch = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  useEffect(() => {
    let cancelled = false;

    async function fetchSettings() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/settings');
        if (!response.ok) {
          throw new Error('Failed to fetch settings');
        }

        const result = await response.json();
        if (!cancelled) {
          // Merge with defaults if settings exist
          const mergedSettings = result.data 
            ? { ...defaultSettings, ...result.data }
            : defaultSettings;
          setSettings(mergedSettings);
          setIsLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
          // Use defaults on error
          setSettings(defaultSettings);
          setIsLoading(false);
        }
      }
    }

    fetchSettings();

    return () => {
      cancelled = true;
    };
  }, [refetchTrigger]);

  return { settings, isLoading, error, refetch };
}

export async function updateSettings(settingsData: Partial<SiteSettings>): Promise<SiteSettings> {
  const response = await fetch('/api/settings', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settingsData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update settings');
  }

  const result = await response.json();
  return result.data;
}

