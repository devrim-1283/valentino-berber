/**
 * Quick Password Hash Generator
 * Generates a Node.js bcrypt hash for a password
 * Usage: tsx scripts/hash-password.ts <password>
 * Example: tsx scripts/hash-password.ts admin123
 */

import { hashPassword } from '../lib/auth';

async function generateHash() {
  try {
    const password = process.argv[2] || 'admin123';
    
    console.log(`Generating hash for password: ${password}`);
    console.log('...\n');
    
    const hash = await hashPassword(password);
    
    console.log('✅ Generated hash (Node.js bcrypt format - $2b$):');
    console.log(hash);
    console.log('\n📋 SQL UPDATE command:');
    console.log(`UPDATE settings SET admin_password = '${hash}', admin_username = 'admin' WHERE key = 'global';`);
    console.log('\n✅ Format check:', hash.startsWith('$2b$') ? '✅ Correct ($2b$)' : '❌ Wrong format');
    
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

generateHash();



