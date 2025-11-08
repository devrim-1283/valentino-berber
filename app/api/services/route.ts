import { NextRequest, NextResponse } from 'next/server';
import { query, queryMany } from '@/lib/db';

// Force dynamic rendering - don't pre-render at build time
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const services = await queryMany<any>(`
      SELECT 
        id,
        name,
        description,
        price,
        duration,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM services
      ORDER BY name ASC
    `);

    return NextResponse.json({ data: services, success: true });
  } catch (error: any) {
    // During build time, database might not be available
    // Return empty array instead of failing
    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json({ data: [], success: true });
    }
    
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services', message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, duration } = body;

    if (!name || price === undefined || duration === undefined) {
      return NextResponse.json(
        { error: 'Name, price, and duration are required' },
        { status: 400 }
      );
    }

    const result = await query<any>(`
      INSERT INTO services (name, description, price, duration)
      VALUES ($1, $2, $3, $4)
      RETURNING 
        id,
        name,
        description,
        price,
        duration,
        created_at as "createdAt",
        updated_at as "updatedAt"
    `, [name, description || null, price, duration]);

    return NextResponse.json({ data: result.rows[0], success: true }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service', message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, description, price, duration } = body;

    if (!id || !name || price === undefined || duration === undefined) {
      return NextResponse.json(
        { error: 'ID, name, price, and duration are required' },
        { status: 400 }
      );
    }

    const result = await query<any>(`
      UPDATE services
      SET name = $1, description = $2, price = $3, duration = $4
      WHERE id = $5
      RETURNING 
        id,
        name,
        description,
        price,
        duration,
        created_at as "createdAt",
        updated_at as "updatedAt"
    `, [name, description || null, price, duration, id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: result.rows[0], success: true });
  } catch (error: any) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { error: 'Failed to update service', message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const result = await query(`
      DELETE FROM services
      WHERE id = $1
      RETURNING id
    `, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { error: 'Failed to delete service', message: error.message },
      { status: 500 }
    );
  }
}

