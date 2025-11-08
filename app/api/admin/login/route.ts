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

    console.log('[LOGIN] Attempt:', { username, passwordLength: password?.length });

    if (!username || !password) {
      console.log('[LOGIN] Missing credentials');
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

    console.log('[LOGIN] Settings from DB:', { 
      hasSettings: !!settings,
      storedUsername: settings?.admin_username,
      hasPassword: !!settings?.admin_password,
      passwordPrefix: settings?.admin_password?.substring(0, 7)
    });

    // Default credentials for first-time setup
    const defaultUsername = 'admin';
    const defaultPassword = 'VALENTINO2024';

    // Check if settings exist
    if (!settings) {
      console.log('[LOGIN] No settings found, using defaults');
      // First time setup - use default credentials
      if (username === defaultUsername && password === defaultPassword) {
        return NextResponse.json({ success: true, authenticated: true });
      }
      return NextResponse.json(
        { error: 'Kullanıcı adı veya şifre hatalı' },
        { status: 401 }
      );
    }

    // Check username (trim both to avoid whitespace issues)
    const storedUsername = (settings.admin_username || defaultUsername).trim();
    const providedUsername = username.trim();
    console.log('[LOGIN] Username check:', { 
      provided: providedUsername, 
      stored: storedUsername, 
      match: providedUsername === storedUsername,
      providedLength: providedUsername.length,
      storedLength: storedUsername.length
    });
    
    if (providedUsername !== storedUsername) {
      console.log('[LOGIN] Username mismatch');
      return NextResponse.json(
        { error: 'Kullanıcı adı veya şifre hatalı' },
        { status: 401 }
      );
    }

    // Check password
    if (!settings.admin_password) {
      console.log('[LOGIN] No password in DB, using default');
      // No password set yet - use default
      if (password === defaultPassword) {
        return NextResponse.json({ success: true, authenticated: true });
      }
      return NextResponse.json(
        { error: 'Kullanıcı adı veya şifre hatalı' },
        { status: 401 }
      );
    }

    // Trim hash to remove any whitespace/newlines that might have been stored
    const cleanHash = settings.admin_password.trim();
    console.log('[LOGIN] Hash details:', {
      originalLength: settings.admin_password.length,
      cleanedLength: cleanHash.length,
      prefix: cleanHash.substring(0, 10),
      hasNewline: settings.admin_password.includes('\n'),
      hasCarriageReturn: settings.admin_password.includes('\r')
    });

    // Compare password with hash
    console.log('[LOGIN] Comparing password with hash...');
    const isValid = await comparePassword(password, cleanHash);
    console.log('[LOGIN] Password comparison result:', isValid);

    if (!isValid) {
      console.log('[LOGIN] Password hash comparison failed');
      // Also check against default password if hash comparison fails
      if (password === defaultPassword) {
        console.log('[LOGIN] Default password fallback match');
        return NextResponse.json({ success: true, authenticated: true });
      }
      return NextResponse.json(
        { error: 'Kullanıcı adı veya şifre hatalı' },
        { status: 401 }
      );
    }

    console.log('[LOGIN] Authentication successful');
    return NextResponse.json({ success: true, authenticated: true });
  } catch (error: any) {
    console.error('[LOGIN] Error during admin login:', error);
    console.error('[LOGIN] Error stack:', error.stack);
    return NextResponse.json(
      { error: 'Failed to authenticate', message: error.message },
      { status: 500 }
    );
  }
}

