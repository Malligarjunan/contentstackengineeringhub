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

const optionalVars = {
  'CONTENTSTACK_LIVE_PREVIEW_ENABLED': process.env.CONTENTSTACK_LIVE_PREVIEW_ENABLED,
  'NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW_TOKEN': process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW_TOKEN,
  'NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW_HOST': process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW_HOST,
};

let allSet = true;

for (const [name, value] of Object.entries(requiredVars)) {
  const isSet = value && value !== 'your_api_key_here' && value !== 'your_delivery_token_here';
  const status = isSet ? '✅' : '❌';
  console.log(`${status} ${name}: ${isSet ? 'Set' : 'NOT SET'}`);
  if (!isSet) allSet = false;
}

console.log('\n' + '='.repeat(50) + '\n');

// Check optional Live Preview variables
console.log('📺 Live Preview Configuration (Optional):\n');
for (const [name, value] of Object.entries(optionalVars)) {
  const isSet = value && value !== 'your_api_key_here' && value !== 'your_live_preview_token_here';
  const status = isSet ? '✅' : '⚪';
  console.log(`${status} ${name}: ${isSet ? 'Set' : 'Not set'}`);
}

console.log('\n' + '='.repeat(50) + '\n');

if (allSet) {
  console.log('✅ All required environment variables are configured!\n');
  console.log('You can now test the Contentstack connection:');
  console.log('  node scripts/test-contentstack.js\n');
  
  const livePreviewEnabled = optionalVars['CONTENTSTACK_LIVE_PREVIEW_ENABLED'] === 'true';
  if (livePreviewEnabled) {
    console.log('📺 Live Preview is ENABLED');
    console.log('See LIVE_PREVIEW_SETUP.md for configuration guide\n');
  } else {
    console.log('ℹ️  Live Preview is DISABLED');
    console.log('To enable: Set CONTENTSTACK_LIVE_PREVIEW_ENABLED=true');
    console.log('See LIVE_PREVIEW_SETUP.md for setup guide\n');
  }
} else {
  console.log('❌ Some required environment variables are missing.\n');
  console.log('Please create a .env file in the project root with:');
  console.log('');
  console.log('CONTENTSTACK_API_KEY=your_actual_api_key');
  console.log('CONTENTSTACK_DELIVERY_TOKEN=your_actual_delivery_token');
  console.log('NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=production');
  console.log('NEXT_PUBLIC_CONTENTSTACK_REGION=us');
  console.log('');
  console.log('Optional - Live Preview:');
  console.log('CONTENTSTACK_LIVE_PREVIEW_ENABLED=true');
  console.log('NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW_TOKEN=your_live_preview_token');
  console.log('');
  console.log('Get your credentials from:');
  console.log('Contentstack Dashboard → Settings → Stack/Tokens\n');
}

