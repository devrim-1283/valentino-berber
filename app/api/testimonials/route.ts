import { NextRequest, NextResponse } from 'next/server';
import { query, queryMany } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const testimonials = await queryMany<any>(`
      SELECT 
        id,
        name,
        handle,
        text,
        avatar,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM testimonials
      ORDER BY created_at DESC
    `);

    return NextResponse.json({ data: testimonials, success: true });
  } catch (error: any) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials', message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, handle, text, avatar } = body;

    if (!name || !text) {
      return NextResponse.json(
        { error: 'Name and text are required' },
        { status: 400 }
      );
    }

    const result = await query<any>(`
      INSERT INTO testimonials (name, handle, text, avatar)
      VALUES ($1, $2, $3, $4)
      RETURNING 
        id,
        name,
        handle,
        text,
        avatar,
        created_at as "createdAt",
        updated_at as "updatedAt"
    `, [name, handle || null, text, avatar || null]);

    return NextResponse.json({ data: result.rows[0], success: true }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to create testimonial', message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, handle, text, avatar } = body;

    if (!id || !name || !text) {
      return NextResponse.json(
        { error: 'ID, name, and text are required' },
        { status: 400 }
      );
    }

    const result = await query<any>(`
      UPDATE testimonials
      SET name = $1, handle = $2, text = $3, avatar = $4
      WHERE id = $5
      RETURNING 
        id,
        name,
        handle,
        text,
        avatar,
        created_at as "createdAt",
        updated_at as "updatedAt"
    `, [name, handle || null, text, avatar || null, id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: result.rows[0], success: true });
  } catch (error: any) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to update testimonial', message: error.message },
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
      DELETE FROM testimonials
      WHERE id = $1
      RETURNING id
    `, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to delete testimonial', message: error.message },
      { status: 500 }
    );
  }
}

