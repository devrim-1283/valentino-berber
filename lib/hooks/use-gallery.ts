'use client';

import { useState, useEffect } from 'react';

export interface GalleryImage {
  id: string;
  imageUrl: string;
  description?: string;
  barberId?: string;
  createdAt: string;
  updatedAt: string;
}

interface UseGalleryResult {
  data: GalleryImage[] | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useGallery(): UseGalleryResult {
  const [data, setData] = useState<GalleryImage[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const refetch = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  useEffect(() => {
    let cancelled = false;

    async function fetchGallery() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/gallery');
        if (!response.ok) {
          throw new Error('Failed to fetch gallery');
        }

        const result = await response.json();
        if (!cancelled) {
          setData(result.data || []);
          setIsLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
          setIsLoading(false);
        }
      }
    }

    fetchGallery();

    return () => {
      cancelled = true;
    };
  }, [refetchTrigger]);

  return { data, isLoading, error, refetch };
}

export async function createGalleryItem(galleryData: {
  imageUrl: string;
  description?: string;
  barberId?: string;
}): Promise<GalleryImage> {
  const response = await fetch('/api/gallery', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(galleryData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create gallery item');
  }

  const result = await response.json();
  return result.data;
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const response = await fetch(`/api/gallery?id=${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete gallery item');
  }
}

