import { queryOne } from '../lib/db';
import { comparePassword } from '../lib/auth';

async function testLogin() {
  try {
    console.log('Fetching admin credentials from database...\n');
    
    const settings = await queryOne<{ admin_username: string | null; admin_password: string | null }>(`
      SELECT admin_username, admin_password
      FROM settings
      WHERE key = 'global'
    `);

    if (!settings) {
      console.error('❌ No settings found in database');
      return;
    }

    console.log('Database values:');
    console.log('  Username:', settings.admin_username);
    console.log('  Password hash length:', settings.admin_password?.length);
    console.log('  Password hash prefix:', settings.admin_password?.substring(0, 10));
    console.log('  Password hash (full):', settings.admin_password);
    console.log('  Has newline?', settings.admin_password?.includes('\n'));
    console.log('  Has carriage return?', settings.admin_password?.includes('\r'));
    console.log('  Has spaces?', settings.admin_password?.includes(' '));
    console.log('');

    // Test with admin123
    const testPassword = 'admin123';
    console.log(`Testing password: "${testPassword}"`);
    
    if (!settings.admin_password) {
      console.error('❌ No password hash in database');
      return;
    }

    // Trim any whitespace
    const cleanHash = settings.admin_password.trim();
    console.log('  Clean hash length:', cleanHash.length);
    console.log('  Clean hash prefix:', cleanHash.substring(0, 10));

    const isValid = await comparePassword(testPassword, cleanHash);
    console.log('');
    console.log('Result:', isValid ? '✅ MATCH' : '❌ NO MATCH');

    // Also test with trimmed hash
    if (!isValid) {
      console.log('\nTrying with original hash (no trim)...');
      const isValidOriginal = await comparePassword(testPassword, settings.admin_password);
      console.log('Result (original):', isValidOriginal ? '✅ MATCH' : '❌ NO MATCH');
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

testLogin().catch(console.error);

