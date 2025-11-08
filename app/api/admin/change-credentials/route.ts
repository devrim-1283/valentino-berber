import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { hashPassword, comparePassword, validatePasswordStrength } from '@/lib/auth';

// Force dynamic rendering - don't pre-render at build time
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { currentUsername, currentPassword, newUsername, newPassword } = body;

    if (!currentUsername || !currentPassword) {
      return NextResponse.json(
        { error: 'Mevcut kullanıcı adı ve şifre gereklidir' },
        { status: 400 }
      );
    }

    // Get current admin credentials
    const settings = await queryOne<{ admin_username: string | null; admin_password: string | null }>(`
      SELECT admin_username, admin_password
      FROM settings
      WHERE key = 'global'
    `);

    if (!settings) {
      return NextResponse.json(
        { error: 'Ayarlar bulunamadı' },
        { status: 404 }
      );
    }

    // Verify current credentials
    const storedUsername = settings.admin_username || 'admin';
    if (currentUsername !== storedUsername) {
      return NextResponse.json(
        { error: 'Mevcut kullanıcı adı hatalı' },
        { status: 401 }
      );
    }

    // Verify current password
    if (settings.admin_password) {
      const isValid = await comparePassword(currentPassword, settings.admin_password);
      if (!isValid && currentPassword !== 'VALENTINO2024') {
        return NextResponse.json(
          { error: 'Mevcut şifre hatalı' },
          { status: 401 }
        );
      }
    } else {
      if (currentPassword !== 'VALENTINO2024') {
        return NextResponse.json(
          { error: 'Mevcut şifre hatalı' },
          { status: 401 }
        );
      }
    }

    // Update username if provided
    let updateQuery = `UPDATE settings SET `;
    const updateParams: any[] = [];
    const updates: string[] = [];

    if (newUsername) {
      if (newUsername.length < 3) {
        return NextResponse.json(
          { error: 'Kullanıcı adı en az 3 karakter olmalıdır' },
          { status: 400 }
        );
      }
      updates.push(`admin_username = $${updates.length + 1}`);
      updateParams.push(newUsername);
    }

    // Update password if provided
    if (newPassword) {
      const validation = validatePasswordStrength(newPassword);
      if (!validation.valid) {
        return NextResponse.json(
          { error: validation.message || 'Geçersiz şifre' },
          { status: 400 }
        );
      }
      const hashedPassword = await hashPassword(newPassword);
      updates.push(`admin_password = $${updates.length + 1}`);
      updateParams.push(hashedPassword);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: 'Değiştirilecek bir alan belirtilmedi' },
        { status: 400 }
      );
    }

    updateQuery += updates.join(', ');
    updateQuery += ` WHERE key = 'global'`;

    await query(updateQuery, updateParams);

    return NextResponse.json({ 
      success: true, 
      message: 'Bilgiler başarıyla güncellendi' 
    });
  } catch (error: any) {
    console.error('Error changing credentials:', error);
    return NextResponse.json(
      { error: 'Bilgiler güncellenirken bir hata oluştu', message: error.message },
      { status: 500 }
    );
  }
}

