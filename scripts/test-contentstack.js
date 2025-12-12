/**
 * Test script to verify Contentstack connection
 * Run with: node scripts/test-contentstack.js
 */

require('dotenv').config({ path: '.env.local' });
const Contentstack = require('contentstack');

// Check if environment variables are set
const config = {
  api_key: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'production',
  region: process.env.NEXT_PUBLIC_CONTENTSTACK_REGION || 'us',
};

console.log('\n🔍 Checking Contentstack Configuration...\n');
console.log('API Key:', config.api_key ? '✅ Set' : '❌ Not set');
console.log('Delivery Token:', config.delivery_token ? '✅ Set' : '❌ Not set');
console.log('Environment:', config.environment);
console.log('Region:', config.region);

if (!config.api_key || !config.delivery_token || 
    config.api_key === 'your_api_key_here' || 
    config.delivery_token === 'your_delivery_token_here') {
  console.log('\n❌ ERROR: Contentstack credentials not configured properly');
  console.log('\nPlease update your .env.local file with actual values:');
  console.log('1. Go to Contentstack Dashboard > Settings > Stack > API Keys');
  console.log('2. Copy your API Key and Delivery Token');
  console.log('3. Update .env.local with real values\n');
  process.exit(1);
}

console.log('\n🚀 Testing Contentstack Connection...\n');

// Initialize Stack
const Stack = Contentstack.Stack(config);

// Test fetching products
async function testConnection() {
  try {
    console.log('📡 Fetching products from Contentstack...\n');
    
    const Query = Stack.ContentType('product').Query();
    const result = await Query
      .only(['title', 'slug'])
      .toJSON()
      .find();

    if (result && result[0]) {
      console.log(`✅ SUCCESS! Found ${result[0].length} products:\n`);
      result[0].forEach((product, index) => {
        console.log(`${index + 1}. ${product.title} (slug: ${product.slug})`);
      });
      console.log('\n🎉 Contentstack integration is working correctly!\n');
      console.log('Your Next.js app will now fetch data from Contentstack.\n');
    } else {
      console.log('⚠️  No products found in your Contentstack stack.');
      console.log('Please ensure you have created product entries in Contentstack.\n');
    }
  } catch (error) {
    console.error('❌ ERROR connecting to Contentstack:\n');
    console.error(error.message);
    console.error('\nPossible issues:');
    console.error('1. Check your API Key and Delivery Token are correct');
    console.error('2. Verify the Environment name matches your stack');
    console.error('3. Ensure the Region is correct (us, eu, azure-na, etc.)');
    console.error('4. Check that content type "product" exists in your stack\n');
    process.exit(1);
  }
}

testConnection();

