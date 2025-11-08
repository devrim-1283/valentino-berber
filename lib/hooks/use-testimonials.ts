'use client';

import { useState, useEffect } from 'react';

export interface Testimonial {
  id: string;
  name: string;
  handle?: string;
  text: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

interface UseTestimonialsResult {
  data: Testimonial[] | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useTestimonials(): UseTestimonialsResult {
  const [data, setData] = useState<Testimonial[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const refetch = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  useEffect(() => {
    let cancelled = false;

    async function fetchTestimonials() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/testimonials');
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
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

    fetchTestimonials();

    return () => {
      cancelled = true;
    };
  }, [refetchTrigger]);

  return { data, isLoading, error, refetch };
}

export async function createTestimonial(testimonialData: {
  name: string;
  handle?: string;
  text: string;
  avatar?: string;
}): Promise<Testimonial> {
  const response = await fetch('/api/testimonials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(testimonialData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create testimonial');
  }

  const result = await response.json();
  return result.data;
}

export async function updateTestimonial(testimonialData: {
  id: string;
  name: string;
  handle?: string;
  text: string;
  avatar?: string;
}): Promise<Testimonial> {
  const response = await fetch('/api/testimonials', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(testimonialData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update testimonial');
  }

  const result = await response.json();
  return result.data;
}

export async function deleteTestimonial(id: string): Promise<void> {
  const response = await fetch(`/api/testimonials?id=${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete testimonial');
  }
}

