'use client';

import { useState, useEffect } from 'react';

export interface Barber {
  id: string;
  name: string;
  specialty?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface UseBarbersResult {
  data: Barber[] | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useBarbers(): UseBarbersResult {
  const [data, setData] = useState<Barber[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const refetch = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  useEffect(() => {
    let cancelled = false;

    async function fetchBarbers() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/barbers');
        if (!response.ok) {
          throw new Error('Failed to fetch barbers');
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

    fetchBarbers();

    return () => {
      cancelled = true;
    };
  }, [refetchTrigger]);

  return { data, isLoading, error, refetch };
}

export async function createBarber(barberData: {
  name: string;
  specialty?: string;
  imageUrl?: string;
}): Promise<Barber> {
  const response = await fetch('/api/barbers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(barberData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create barber');
  }

  const result = await response.json();
  return result.data;
}

export async function updateBarber(barberData: {
  id: string;
  name: string;
  specialty?: string;
  imageUrl?: string;
}): Promise<Barber> {
  const response = await fetch('/api/barbers', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(barberData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update barber');
  }

  const result = await response.json();
  return result.data;
}

export async function deleteBarber(id: string): Promise<void> {
  const response = await fetch(`/api/barbers?id=${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete barber');
  }
}

