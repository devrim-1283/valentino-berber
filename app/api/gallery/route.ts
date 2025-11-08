import { NextRequest, NextResponse } from 'next/server';
import { query, queryMany } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const gallery = await queryMany<any>(`
      SELECT 
        id,
        image_url as "imageUrl",
        description,
        barber_id as "barberId",
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM gallery
      ORDER BY created_at DESC
    `);

    return NextResponse.json({ data: gallery, success: true });
  } catch (error: any) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery', message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl, description, barberId } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    const result = await query<any>(`
      INSERT INTO gallery (image_url, description, barber_id)
      VALUES ($1, $2, $3)
      RETURNING 
        id,
        image_url as "imageUrl",
        description,
        barber_id as "barberId",
        created_at as "createdAt",
        updated_at as "updatedAt"
    `, [imageUrl, description || null, barberId || null]);

    return NextResponse.json({ data: result.rows[0], success: true }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json(
      { error: 'Failed to create gallery item', message: error.message },
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
      DELETE FROM gallery
      WHERE id = $1
      RETURNING id
    `, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Gallery item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting gallery item:', error);
    return NextResponse.json(
      { error: 'Failed to delete gallery item', message: error.message },
      { status: 500 }
    );
  }
}

