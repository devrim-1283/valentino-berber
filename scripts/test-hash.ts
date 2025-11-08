import { comparePassword } from '../lib/auth';

const hash = '$2b$10$vWh2nqwTVwa9e1KohDIIwOgAmxcSA7wBGSRAhDo0Ttks4k8avBc.G';

async function testHash() {
  const testPasswords = ['admin123', 'VALENTINO2024', 'admin', 'password'];
  
  console.log('Testing hash against different passwords:\n');
  
  for (const password of testPasswords) {
    const isValid = await comparePassword(password, hash);
    console.log(`${password}: ${isValid ? '✅ MATCH' : '❌ NO MATCH'}`);
  }
}

testHash().catch(console.error);

