import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { comparePassword } from '@/lib/auth';

// Force dynamic rendering - don't pre-render at build time
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Kullanıcı adı ve şifre gereklidir' },
        { status: 400 }
      );
    }

    // Get admin credentials from settings
    const settings = await queryOne<{ admin_username: string | null; admin_password: string | null }>(`
      SELECT admin_username, admin_password
      FROM settings
      WHERE key = 'global'
    `);

    // Default credentials for first-time setup
    const defaultUsername = 'admin';
    const defaultPassword = 'VALENTINO2024';

    // Check if settings exist
    if (!settings) {
      // First time setup - use default credentials
      if (username === defaultUsername && password === defaultPassword) {
        return NextResponse.json({ success: true, authenticated: true });
      }
      return NextResponse.json(
        { error: 'Kullanıcı adı veya şifre hatalı' },
        { status: 401 }
      );
    }

    // Check username
    const storedUsername = settings.admin_username || defaultUsername;
    if (username !== storedUsername) {
      return NextResponse.json(
        { error: 'Kullanıcı adı veya şifre hatalı' },
        { status: 401 }
      );
    }

    // Check password
    if (!settings.admin_password) {
      // No password set yet - use default
      if (password === defaultPassword) {
        return NextResponse.json({ success: true, authenticated: true });
      }
      return NextResponse.json(
        { error: 'Kullanıcı adı veya şifre hatalı' },
        { status: 401 }
      );
    }

    // Compare password with hash
    const isValid = await comparePassword(password, settings.admin_password);

    if (!isValid) {
      // Also check against default password if hash comparison fails
      if (password === defaultPassword) {
        return NextResponse.json({ success: true, authenticated: true });
      }
      return NextResponse.json(
        { error: 'Kullanıcı adı veya şifre hatalı' },
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

