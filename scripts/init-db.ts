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
    const defaultPassword = 'VALENTINO2024';
    const hashedPassword = await hashPassword(defaultPassword);

    // Update or insert settings with admin password
    await query(`
      INSERT INTO settings (key, brand_name, admin_password) 
      VALUES ('global', 'Valentino', $1)
      ON CONFLICT (key) DO UPDATE SET
        admin_password = EXCLUDED.admin_password
      WHERE settings.admin_password IS NULL
    `, [hashedPassword]);

    console.log('Database initialized successfully!');
    console.log('Default admin password: VALENTINO2024');
    console.log('Please change the password after first login.');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDatabase();

