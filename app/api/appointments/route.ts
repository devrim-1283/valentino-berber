import { NextRequest, NextResponse } from 'next/server';
import { query, queryMany, transaction } from '@/lib/db';
import { apiLog } from '@/lib/config';

// Force dynamic rendering - don't pre-render at build time
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  try {
    const { searchParams } = new URL(request.url);
    const barberId = searchParams.get('barberId');
    const date = searchParams.get('date');
    
    apiLog('GET', `/api/appointments?barberId=${barberId || ''}&date=${date || ''}`);

    let sqlQuery = `
      SELECT 
        a.id,
        a.barber_id as "barberId",
        a.service_id as "serviceId",
        a.customer_name as "customerName",
        a.customer_phone as "customerPhone",
        a.start_time as "startTime",
        a.status,
        a.created_at as "createdAt",
        a.updated_at as "updatedAt",
        b.name as "barberName"
      FROM appointments a
      LEFT JOIN barbers b ON a.barber_id = b.id
    `;

    const params: any[] = [];
    const conditions: string[] = [];

    if (barberId) {
      conditions.push(`a.barber_id = $${params.length + 1}`);
      params.push(barberId);
    }

    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      
      conditions.push(`a.start_time >= $${params.length + 1}`);
      params.push(startDate.toISOString());
      conditions.push(`a.start_time <= $${params.length + 2}`);
      params.push(endDate.toISOString());
    }

    if (conditions.length > 0) {
      sqlQuery += ` WHERE ${conditions.join(' AND ')}`;
    }

    sqlQuery += ` ORDER BY a.start_time DESC`;

    const appointments = await queryMany<any>(sqlQuery, params);
    const duration = Date.now() - startTime;

    apiLog('GET', '/api/appointments', 200, duration);
    return NextResponse.json({ data: appointments, success: true });
  } catch (error: any) {
    const duration = Date.now() - startTime;
    // During build time, database might not be available
    // Return empty array instead of failing
    if (error.code === 'ECONNREFUSED') {
      apiLog('GET', '/api/appointments', 200, duration);
      return NextResponse.json({ data: [], success: true });
    }
    
    apiLog('GET', '/api/appointments', 500, duration);
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments', message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const requestStartTime = Date.now();
  try {
    const body = await request.json();
    const { barberId, serviceId, customerName, customerPhone, startTime } = body;
    
    apiLog('POST', '/api/appointments');

    // Validate required fields
    if (!barberId || !serviceId || !customerName || !customerPhone || !startTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Convert startTime to Date object
    const startTimeDate = new Date(startTime);

    // Use transaction to prevent double booking
    const appointment = await transaction(async (client) => {
      // Check if there's already an appointment for this barber at this time
      const existingAppointment = await client.query(
        `
        SELECT id FROM appointments 
        WHERE barber_id = $1 AND start_time = $2
        FOR UPDATE
        `,
        [barberId, startTimeDate]
      );

      if (existingAppointment.rows.length > 0) {
        throw new Error('APPOINTMENT_CONFLICT');
      }

      // Insert the new appointment
      const result = await client.query(
        `
        INSERT INTO appointments (barber_id, service_id, customer_name, customer_phone, start_time, status)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING 
          id,
          barber_id as "barberId",
          service_id as "serviceId",
          customer_name as "customerName",
          customer_phone as "customerPhone",
          start_time as "startTime",
          status,
          created_at as "createdAt",
          updated_at as "updatedAt"
        `,
        [barberId, serviceId, customerName, customerPhone, startTimeDate, 'Scheduled']
      );

      return result.rows[0];
    });

    const duration = Date.now() - requestStartTime;
    apiLog('POST', '/api/appointments', 201, duration);
    return NextResponse.json({ data: appointment, success: true }, { status: 201 });
  } catch (error: any) {
    const duration = Date.now() - requestStartTime;
    console.error('Error creating appointment:', error);

    // Handle appointment conflict
    if (error.message === 'APPOINTMENT_CONFLICT') {
      apiLog('POST', '/api/appointments', 409, duration);
      return NextResponse.json(
        { error: 'Bu saatte bu berber için zaten bir randevu var. Lütfen başka bir saat seçin.' },
        { status: 409 }
      );
    }

    apiLog('POST', '/api/appointments', 500, duration);
    return NextResponse.json(
      { error: 'Failed to create appointment', message: error.message },
      { status: 500 }
    );
  }
}

