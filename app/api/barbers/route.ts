import { NextRequest, NextResponse } from 'next/server';
import { query, queryMany, queryOne } from '@/lib/db';

// Force dynamic rendering - don't pre-render at build time
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const barbers = await queryMany<any>(`
      SELECT 
        id,
        name,
        specialty,
        image_url as "imageUrl",
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM barbers
      ORDER BY name ASC
    `);

    return NextResponse.json({ data: barbers, success: true });
  } catch (error: any) {
    // During build time, database might not be available
    // Return empty array instead of failing
    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json({ data: [], success: true });
    }
    
    console.error('Error fetching barbers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch barbers', message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, specialty, imageUrl } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const result = await query<any>(`
      INSERT INTO barbers (name, specialty, image_url)
      VALUES ($1, $2, $3)
      RETURNING 
        id,
        name,
        specialty,
        image_url as "imageUrl",
        created_at as "createdAt",
        updated_at as "updatedAt"
    `, [name, specialty || null, imageUrl || null]);

    return NextResponse.json({ data: result.rows[0], success: true }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating barber:', error);
    return NextResponse.json(
      { error: 'Failed to create barber', message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, specialty, imageUrl } = body;

    if (!id || !name) {
      return NextResponse.json(
        { error: 'ID and name are required' },
        { status: 400 }
      );
    }

    const result = await query<any>(`
      UPDATE barbers
      SET name = $1, specialty = $2, image_url = $3
      WHERE id = $4
      RETURNING 
        id,
        name,
        specialty,
        image_url as "imageUrl",
        created_at as "createdAt",
        updated_at as "updatedAt"
    `, [name, specialty || null, imageUrl || null, id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Barber not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: result.rows[0], success: true });
  } catch (error: any) {
    console.error('Error updating barber:', error);
    return NextResponse.json(
      { error: 'Failed to update barber', message: error.message },
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
      DELETE FROM barbers
      WHERE id = $1
      RETURNING id
    `, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Barber not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting barber:', error);
    return NextResponse.json(
      { error: 'Failed to delete barber', message: error.message },
      { status: 500 }
    );
  }
}

