'use client';

import { useState, useEffect } from 'react';

export interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

interface UseServicesResult {
  data: Service[] | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useServices(): UseServicesResult {
  const [data, setData] = useState<Service[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const refetch = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  useEffect(() => {
    let cancelled = false;

    async function fetchServices() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
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

    fetchServices();

    return () => {
      cancelled = true;
    };
  }, [refetchTrigger]);

  return { data, isLoading, error, refetch };
}

export async function createService(serviceData: {
  name: string;
  description?: string;
  price: number;
  duration: number;
}): Promise<Service> {
  const response = await fetch('/api/services', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(serviceData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create service');
  }

  const result = await response.json();
  return result.data;
}

export async function updateService(serviceData: {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
}): Promise<Service> {
  const response = await fetch('/api/services', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(serviceData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update service');
  }

  const result = await response.json();
  return result.data;
}

export async function deleteService(id: string): Promise<void> {
  const response = await fetch(`/api/services?id=${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete service');
  }
}

