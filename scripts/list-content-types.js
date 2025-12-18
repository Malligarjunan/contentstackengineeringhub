#!/usr/bin/env node

/**
 * Script to list all content types from Contentstack
 * 
 * Usage:
 *   node scripts/list-content-types.js
 * 
 * Or with npm:
 *   npm run list-content-types
 * 
 * Requirements:
 *   - CONTENTSTACK_API_KEY in .env.local
 *   - CONTENTSTACK_MANAGEMENT_TOKEN in .env.local (or CONTENTSTACK_AUTHTOKEN)
 */

require('dotenv').config({ path: '.env.local' });

async function listContentTypes() {
  const apiKey = process.env.CONTENTSTACK_API_KEY;
  const managementToken = process.env.CONTENTSTACK_MANAGEMENT_TOKEN || process.env.CONTENTSTACK_AUTHTOKEN;
  const region = process.env.CONTENTSTACK_REGION || 'us'; // Default to US region

  if (!apiKey) {
    console.error('❌ Error: CONTENTSTACK_API_KEY not found in .env.local');
    console.log('\n💡 Add to your .env.local file:');
    console.log('   CONTENTSTACK_API_KEY=your_api_key_here');
    process.exit(1);
  }

  if (!managementToken) {
    console.error('❌ Error: CONTENTSTACK_MANAGEMENT_TOKEN not found in .env.local');
    console.log('\n💡 Add to your .env.local file:');
    console.log('   CONTENTSTACK_MANAGEMENT_TOKEN=your_management_token_here');
    console.log('\n📚 How to get a management token:');
    console.log('   1. Go to Settings → Tokens in Contentstack');
    console.log('   2. Create a new Management Token');
    console.log('   3. Give it "Content Types" read permission');
    process.exit(1);
  }

  // Determine API endpoint based on region
  const apiEndpoints = {
    us: 'https://api.contentstack.io/v3',
    eu: 'https://eu-api.contentstack.com/v3',
    'azure-na': 'https://azure-na-api.contentstack.com/v3',
    'azure-eu': 'https://azure-eu-api.contentstack.com/v3',
  };

  const apiEndpoint = apiEndpoints[region] || apiEndpoints.us;

  console.log('🔍 Fetching content types from Contentstack...\n');

  try {
    const response = await fetch(`${apiEndpoint}/content_types`, {
      method: 'GET',
      headers: {
        'api_key': apiKey,
        'authorization': managementToken,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', response.status, response.statusText);
      console.error('Response:', errorText);
      
      if (response.status === 401) {
        console.log('\n💡 Troubleshooting:');
        console.log('   - Check if your CONTENTSTACK_MANAGEMENT_TOKEN is valid');
        console.log('   - Ensure the token has "Content Types" read permission');
        console.log('   - Try regenerating the token in Contentstack dashboard');
      }
      
      process.exit(1);
    }

    const data = await response.json();
    
    if (!data.content_types || data.content_types.length === 0) {
      console.log('⚠️  No content types found in the stack');
      return;
    }

    console.log(`✅ Found ${data.content_types.length} content type(s):\n`);
    console.log('=' .repeat(80));

    data.content_types.forEach((ct, index) => {
      console.log(`\n${index + 1}. ${ct.title}`);
      console.log(`   UID: ${ct.uid}`);
      console.log(`   Description: ${ct.description || 'No description'}`);
      console.log(`   Fields: ${ct.schema?.length || 0}`);
      console.log(`   Created: ${new Date(ct.created_at).toLocaleDateString()}`);
      console.log(`   Updated: ${new Date(ct.updated_at).toLocaleDateString()}`);
      
      if (ct.schema && ct.schema.length > 0) {
        console.log(`   \n   📋 Top Fields:`);
        ct.schema.slice(0, 5).forEach(field => {
          console.log(`      • ${field.display_name} (${field.uid}) - ${field.data_type}`);
        });
        if (ct.schema.length > 5) {
          console.log(`      ... and ${ct.schema.length - 5} more`);
        }
      }
    });

    console.log('\n' + '='.repeat(80));
    console.log(`\n📊 Summary:`);
    console.log(`   Total Content Types: ${data.content_types.length}`);
    console.log(`   API Key: ${apiKey.substring(0, 10)}...`);
    console.log(`   Region: ${region}`);

  } catch (error) {
    console.error('❌ Error fetching content types:', error.message);
    
    if (error.message.includes('fetch is not defined')) {
      console.log('\n💡 Your Node.js version may be too old.');
      console.log('   This script requires Node.js 18+ with built-in fetch.');
      console.log('   Current version:', process.version);
      console.log('\n   Upgrade Node.js or install node-fetch:');
      console.log('   npm install node-fetch');
    }
    
    process.exit(1);
  }
}

// Run the script
listContentTypes().catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});

