import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { hashPassword, comparePassword, validatePasswordStrength } from '@/lib/auth';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    // Validate new password strength
    const validation = validatePasswordStrength(newPassword);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.message || 'Invalid password' },
        { status: 400 }
      );
    }

    // Get current admin password
    const settings = await queryOne<{ admin_password: string | null }>(`
      SELECT admin_password
      FROM settings
      WHERE key = 'global'
    `);

    // Verify current password
    if (settings?.admin_password) {
      const isValid = await comparePassword(currentPassword, settings.admin_password);
      if (!isValid) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 401 }
        );
      }
    } else {
      // If no password is set, check against default
      if (currentPassword !== 'VALENTINO2024') {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 401 }
        );
      }
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password in database
    await query(`
      UPDATE settings
      SET admin_password = $1
      WHERE key = 'global'
    `, [hashedPassword]);

    return NextResponse.json({ success: true, message: 'Password updated successfully' });
  } catch (error: any) {
    console.error('Error changing password:', error);
    return NextResponse.json(
      { error: 'Failed to change password', message: error.message },
      { status: 500 }
    );
  }
}

