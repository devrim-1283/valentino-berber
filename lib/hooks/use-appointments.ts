'use client';

import { useState, useEffect } from 'react';

export interface Appointment {
  id: string;
  barberId: string;
  serviceId: string;
  customerName: string;
  customerPhone: string;
  startTime: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  createdAt: string;
  updatedAt: string;
  barberName?: string;
}

interface UseAppointmentsResult {
  data: Appointment[] | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useAppointments(): UseAppointmentsResult {
  const [data, setData] = useState<Appointment[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const refetch = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  useEffect(() => {
    let cancelled = false;

    async function fetchAppointments() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/appointments');
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
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

    fetchAppointments();

    return () => {
      cancelled = true;
    };
  }, [refetchTrigger]);

  return { data, isLoading, error, refetch };
}

export async function createAppointment(appointmentData: {
  barberId: string;
  serviceId: string;
  customerName: string;
  customerPhone: string;
  startTime: string;
}): Promise<Appointment> {
  const response = await fetch('/api/appointments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(appointmentData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create appointment');
  }

  const result = await response.json();
  return result.data;
}

