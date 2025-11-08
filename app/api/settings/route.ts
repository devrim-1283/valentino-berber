import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const settings = await queryOne<any>(`
      SELECT 
        id,
        key,
        brand_name as "brandName",
        hero_title as "heroTitle",
        hero_subtitle as "heroSubtitle",
        about_story as "aboutStory",
        testimonials_title as "testimonialsTitle",
        signature_section_title as "signatureSectionTitle",
        signature_section_subtitle as "signatureSectionSubtitle",
        stats_section_title as "statsSectionTitle",
        cta_title as "ctaTitle",
        cta_subtitle as "ctaSubtitle",
        instagram_url as "instagramUrl",
        tiktok_url as "tiktokUrl",
        contact_address as "contactAddress",
        contact_phone as "contactPhone",
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM settings
      WHERE key = 'global'
    `);

    if (!settings) {
      // Return default settings if not found
      return NextResponse.json({
        data: {
          key: 'global',
          brandName: 'Valentino',
        },
        success: true,
      });
    }

    // Don't return admin credentials
    const { admin_password, admin_username, ...settingsWithoutCredentials } = settings;

    return NextResponse.json({ data: settingsWithoutCredentials, success: true });
  } catch (error: any) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings', message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      brandName,
      heroTitle,
      heroSubtitle,
      aboutStory,
      testimonialsTitle,
      signatureSectionTitle,
      signatureSectionSubtitle,
      statsSectionTitle,
      ctaTitle,
      ctaSubtitle,
      instagramUrl,
      tiktokUrl,
      contactAddress,
      contactPhone,
    } = body;

    const result = await query<any>(`
      INSERT INTO settings (
        key, brand_name, hero_title, hero_subtitle, about_story,
        testimonials_title, signature_section_title, signature_section_subtitle,
        stats_section_title, cta_title, cta_subtitle,
        instagram_url, tiktok_url, contact_address, contact_phone
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      ON CONFLICT (key) DO UPDATE SET
        brand_name = EXCLUDED.brand_name,
        hero_title = EXCLUDED.hero_title,
        hero_subtitle = EXCLUDED.hero_subtitle,
        about_story = EXCLUDED.about_story,
        testimonials_title = EXCLUDED.testimonials_title,
        signature_section_title = EXCLUDED.signature_section_title,
        signature_section_subtitle = EXCLUDED.signature_section_subtitle,
        stats_section_title = EXCLUDED.stats_section_title,
        cta_title = EXCLUDED.cta_title,
        cta_subtitle = EXCLUDED.cta_subtitle,
        instagram_url = EXCLUDED.instagram_url,
        tiktok_url = EXCLUDED.tiktok_url,
        contact_address = EXCLUDED.contact_address,
        contact_phone = EXCLUDED.contact_phone
      RETURNING 
        id,
        key,
        brand_name as "brandName",
        hero_title as "heroTitle",
        hero_subtitle as "heroSubtitle",
        about_story as "aboutStory",
        testimonials_title as "testimonialsTitle",
        signature_section_title as "signatureSectionTitle",
        signature_section_subtitle as "signatureSectionSubtitle",
        stats_section_title as "statsSectionTitle",
        cta_title as "ctaTitle",
        cta_subtitle as "ctaSubtitle",
        instagram_url as "instagramUrl",
        tiktok_url as "tiktokUrl",
        contact_address as "contactAddress",
        contact_phone as "contactPhone",
        created_at as "createdAt",
        updated_at as "updatedAt"
    `, [
      'global',
      brandName || null,
      heroTitle || null,
      heroSubtitle || null,
      aboutStory || null,
      testimonialsTitle || null,
      signatureSectionTitle || null,
      signatureSectionSubtitle || null,
      statsSectionTitle || null,
      ctaTitle || null,
      ctaSubtitle || null,
      instagramUrl || null,
      tiktokUrl || null,
      contactAddress || null,
      contactPhone || null,
    ]);

    const { admin_password, admin_username, ...settingsWithoutCredentials } = result.rows[0];

    return NextResponse.json({ data: settingsWithoutCredentials, success: true });
  } catch (error: any) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings', message: error.message },
      { status: 500 }
    );
  }
}

