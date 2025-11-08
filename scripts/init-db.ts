/**
 * Database Initialization Script
 * This script initializes the database with default admin password
 * Run this after migration: npm run init-db
 */

import { query } from '../lib/db';
import { hashPassword } from '../lib/auth';

async function initDatabase() {
  try {
    console.log('Initializing database...');

    // Hash default admin password
    const defaultUsername = 'admin';
    const defaultPassword = 'VALENTINO2024';
    const hashedPassword = await hashPassword(defaultPassword);

    // Update or insert settings with admin credentials
    await query(`
      INSERT INTO settings (key, brand_name, admin_username, admin_password) 
      VALUES ('global', 'Valentino', $1, $2)
      ON CONFLICT (key) DO UPDATE SET
        admin_username = COALESCE(EXCLUDED.admin_username, settings.admin_username, $1),
        admin_password = COALESCE(EXCLUDED.admin_password, settings.admin_password, $2)
      WHERE settings.admin_password IS NULL OR settings.admin_username IS NULL
    `, [defaultUsername, hashedPassword]);

    console.log('Database initialized successfully!');
    console.log('Default admin username: admin');
    console.log('Default admin password: VALENTINO2024');
    console.log('Please change the credentials after first login.');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDatabase();

