require('dotenv').config({ path: '.env' });
const contentstack = require('@contentstack/delivery-sdk').default;
const { Region } = require('@contentstack/delivery-sdk');

// Configuration
const config = {
  apiKey: process.env.CONTENTSTACK_API_KEY,
  deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'production',
  region: Region.US,
};

console.log('\n🔍 Testing Homepage Content Fetch...\n');

// Check configuration
console.log('Configuration:');
console.log('- API Key:', config.apiKey ? '✅ Set' : '❌ Not set');
console.log('- Delivery Token:', config.deliveryToken ? '✅ Set' : '❌ Not set');
console.log('- Environment:', config.environment);
console.log('- Region:', config.region);

if (!config.apiKey || !config.deliveryToken) {
  console.error('\n❌ ERROR: Missing credentials in .env file\n');
  process.exit(1);
}

// Test fetching homepage content
async function testHomepageFetch() {
  try {
    console.log('\n📡 Connecting to Contentstack...\n');
    
    const Stack = contentstack.stack(config);
    const Query = Stack.contentType('homepage').entry()
      .includeReference(['architecture_diagrams']);
    
    const result = await Query.find();

    if (result && result.entries && result.entries.length > 0) {
      const entry = result.entries[0];
      
      console.log('✅ SUCCESS! Homepage content fetched from Contentstack\n');
      console.log('═══════════════════════════════════════════════════════════');
      console.log('📄 Entry Details:');
      console.log('═══════════════════════════════════════════════════════════');
      console.log('Title:', entry.title);
      console.log('Hero Title:', entry.hero_title);
      console.log('Hero Description:', entry.hero_description?.substring(0, 80) + '...');
      console.log('Platform Video URL:', entry.platform_video_url || 'Not set');
      console.log('About Text Length:', entry.about_contentstack?.length || 0, 'characters');
      console.log('Architecture Diagrams:', entry.architecture_diagrams?.length || 0);
      
      if (entry.architecture_diagrams && entry.architecture_diagrams.length > 0) {
        console.log('\n📊 Architecture Diagrams:');
        entry.architecture_diagrams.forEach((diagram, index) => {
          console.log(`  ${index + 1}. ${diagram.title}`);
          console.log(`     - Description: ${diagram.description?.substring(0, 60)}...`);
          console.log(`     - Image URL: ${diagram.image_url || 'Not set'}`);
          console.log(`     - Whimsical URL: ${diagram.whimsical_url || 'Not set'}`);
        });
      }
      
      console.log('\n═══════════════════════════════════════════════════════════');
      console.log('🎉 Your homepage is ready to use!');
      console.log('═══════════════════════════════════════════════════════════');
      console.log('\n✨ Next Steps:');
      console.log('1. Run: npm run dev');
      console.log('2. Visit: http://localhost:3000');
      console.log('3. Your homepage will display this content automatically\n');
      
    } else {
      console.log('⚠️  No homepage entries found in Contentstack\n');
      console.log('💡 To create the homepage entry:');
      console.log('   npm run create-homepage-entry\n');
    }
    
  } catch (error) {
    console.error('❌ ERROR: Failed to fetch homepage content\n');
    
    if (error.error_code === 118) {
      console.log('💡 Content Type "homepage" not found');
      console.log('\nPlease run these commands in order:');
      console.log('   1. npm run create-homepage          # Create content type');
      console.log('   2. npm run create-homepage-entry    # Create entry\n');
    } else if (error.error_message) {
      console.error('Error:', error.error_message);
      console.error('Error Code:', error.error_code);
    } else {
      console.error('Error:', error.message || error);
    }
    
    process.exit(1);
  }
}

// Run the test
testHomepageFetch();

