/**
 * Update Admin Password Script
 * This script updates the admin password in the database
 * Usage: npm run update-admin-password
 * Or: tsx scripts/update-admin-password.ts
 */

import { query } from '../lib/db';
import { hashPassword } from '../lib/auth';

async function updateAdminPassword() {
  try {
    const username = process.argv[2] || 'admin';
    const password = process.argv[3] || 'admin123';
    
    console.log('Updating admin password...');
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    
    // Hash the password using Node.js bcrypt
    const hashedPassword = await hashPassword(password);
    
    console.log('\nGenerated hash (Node.js bcrypt format):');
    console.log(hashedPassword);
    console.log('\nHash format:', hashedPassword.startsWith('$2b$') ? '✅ $2b$ (Node.js)' : '❌ Wrong format');
    
    // Update admin password in database
    await query(`
      UPDATE settings
      SET admin_username = $1, admin_password = $2
      WHERE key = 'global'
    `, [username, hashedPassword]);
    
    console.log('\n✅ Admin password updated successfully in database!');
    console.log('\nYou can now login with:');
    console.log(`  Username: ${username}`);
    console.log(`  Password: ${password}`);
    
    // Verify the update
    const result = await query(`
      SELECT admin_username, LEFT(admin_password, 10) as hash_prefix
      FROM settings
      WHERE key = 'global'
    `);
    
    if (result.rows.length > 0) {
      console.log('\n📊 Verification:');
      console.log(`  Stored username: ${result.rows[0].admin_username}`);
      console.log(`  Hash prefix: ${result.rows[0].hash_prefix}...`);
    }
    
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error updating admin password:', error);
    process.exit(1);
  }
}

updateAdminPassword();



