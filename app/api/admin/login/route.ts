import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { comparePassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    // Get admin password from settings
    const settings = await queryOne<{ admin_password: string | null }>(`
      SELECT admin_password
      FROM settings
      WHERE key = 'global'
    `);

    // Default password for first-time setup
    const defaultPassword = 'VALENTINO2024';

    if (!settings || !settings.admin_password) {
      // If no password is set, use default password VALENTINO2024
      // This allows initial login before password is changed
      if (password === defaultPassword) {
        return NextResponse.json({ success: true, authenticated: true });
      }
      return NextResponse.json(
        { error: 'Hatalı şifre. Lütfen tekrar deneyin.' },
        { status: 401 }
      );
    }

    // Compare password with hash
    const isValid = await comparePassword(password, settings.admin_password);

    if (!isValid) {
      // Also check against default password if hash comparison fails
      // This handles edge cases
      if (password === defaultPassword) {
        return NextResponse.json({ success: true, authenticated: true });
      }
      return NextResponse.json(
        { error: 'Hatalı şifre. Lütfen tekrar deneyin.' },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, authenticated: true });
  } catch (error: any) {
    console.error('Error during admin login:', error);
    return NextResponse.json(
      { error: 'Failed to authenticate', message: error.message },
      { status: 500 }
    );
  }
}

