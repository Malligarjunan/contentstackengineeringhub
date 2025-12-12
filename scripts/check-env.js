/**
 * Simple script to check environment variables
 * Run with: node scripts/check-env.js
 */

require('dotenv').config({ path: '.env' });

console.log('\n🔍 Checking Environment Variables...\n');

const requiredVars = {
  'CONTENTSTACK_API_KEY': process.env.CONTENTSTACK_API_KEY,
  'CONTENTSTACK_DELIVERY_TOKEN': process.env.CONTENTSTACK_DELIVERY_TOKEN,
  'NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT': process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT,
  'NEXT_PUBLIC_CONTENTSTACK_REGION': process.env.NEXT_PUBLIC_CONTENTSTACK_REGION,
};

let allSet = true;

for (const [name, value] of Object.entries(requiredVars)) {
  const isSet = value && value !== 'your_api_key_here' && value !== 'your_delivery_token_here';
  const status = isSet ? '✅' : '❌';
  console.log(`${status} ${name}: ${isSet ? 'Set' : 'NOT SET'}`);
  if (!isSet) allSet = false;
}

console.log('\n' + '='.repeat(50) + '\n');

if (allSet) {
  console.log('✅ All environment variables are configured!\n');
  console.log('You can now test the Contentstack connection:');
  console.log('  node scripts/test-contentstack.js\n');
} else {
  console.log('❌ Some environment variables are missing.\n');
  console.log('Please create a .env file in the project root with:');
  console.log('');
  console.log('CONTENTSTACK_API_KEY=your_actual_api_key');
  console.log('CONTENTSTACK_DELIVERY_TOKEN=your_actual_delivery_token');
  console.log('NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=production');
  console.log('NEXT_PUBLIC_CONTENTSTACK_REGION=us');
  console.log('');
  console.log('Get your credentials from:');
  console.log('Contentstack Dashboard → Settings → Stack/Tokens\n');
}

