#!/usr/bin/env node

/**
 * Check Management Token Validity
 * 
 * This script verifies that your Contentstack Management Token is valid.
 * 
 * Usage: node scripts/check-management-token.js
 */

require('dotenv').config({ path: '.env' });
const contentstack = require('@contentstack/management');

const MANAGEMENT_TOKEN = process.env.CONTENTSTACK_MANAGEMENT_TOKEN;
const API_KEY = process.env.CONTENTSTACK_API_KEY;

async function checkToken() {
  console.log('\n🔍 Checking Contentstack Management Token...\n');
  
  // Check if environment variables are set
  if (!MANAGEMENT_TOKEN) {
    console.error('❌ CONTENTSTACK_MANAGEMENT_TOKEN is not set in .env file');
    console.log('\n📝 Please add it to your .env file:');
    console.log('   CONTENTSTACK_MANAGEMENT_TOKEN=your_management_token_here\n');
    process.exit(1);
  }
  
  if (!API_KEY) {
    console.error('❌ CONTENTSTACK_API_KEY is not set in .env file');
    console.log('\n📝 Please add it to your .env file:');
    console.log('   CONTENTSTACK_API_KEY=your_api_key_here\n');
    process.exit(1);
  }
  
  console.log('✅ Environment variables found');
  console.log(`   API Key: ${API_KEY.substring(0, 10)}...${API_KEY.substring(API_KEY.length - 4)}`);
  console.log(`   Management Token: ${MANAGEMENT_TOKEN.substring(0, 10)}...${MANAGEMENT_TOKEN.substring(MANAGEMENT_TOKEN.length - 4)}`);
  console.log();
  
  try {
    // Initialize the SDK
    console.log('🔌 Connecting to Contentstack...');
    const client = contentstack.client({ authtoken: MANAGEMENT_TOKEN });
    const stack = client.stack({ api_key: API_KEY });
    
    // Try to fetch the stack details
    console.log('📡 Fetching stack details...');
    const stackData = await stack.fetch();
    
    console.log('\n✅ Management Token is VALID!\n');
    console.log('📊 Stack Information:');
    console.log(`   Name: ${stackData.name}`);
    console.log(`   API Key: ${stackData.api_key}`);
    console.log(`   Organization UID: ${stackData.org_uid}`);
    console.log(`   Created: ${new Date(stackData.created_at).toLocaleDateString()}`);
    console.log(`   Updated: ${new Date(stackData.updated_at).toLocaleDateString()}`);
    
    // Try to list content types to verify permissions
    console.log('\n🔐 Checking permissions...');
    const contentTypes = await stack.contentType().query().find();
    console.log(`✅ Can read content types (found ${contentTypes.items.length} content types)`);
    
    console.log('\n✨ Everything looks good! You can now run the other scripts.\n');
    
  } catch (error) {
    console.error('\n❌ Management Token verification FAILED!\n');
    
    if (error.status === 401 || error.status === 422 || error.errorCode === 105 || error.errorCode === 109) {
      console.error('🚫 Authentication Error: Token is invalid, expired, or doesn\'t have the right permissions\n');
      console.log('📋 To fix this, generate a NEW Management Token:\n');
      console.log('   Step 1: Go to Contentstack Dashboard');
      console.log('           https://app.contentstack.com/\n');
      console.log('   Step 2: Navigate to Settings > Tokens');
      console.log('           (or Settings > Stack Settings > Tokens)\n');
      console.log('   Step 3: Click "+ Management Token"\n');
      console.log('   Step 4: Configure the token:');
      console.log('           • Name: "Engineering Hub Setup"');
      console.log('           • Description: "Token for managing content types and entries"\n');
      console.log('   Step 5: Select these SCOPE permissions:');
      console.log('           ✓ Content Types: Read, Write');
      console.log('           ✓ Entries: Read, Write');
      console.log('           ✓ Assets: Read, Write (optional, for image migration)');
      console.log('           ✓ Environments: Read (optional)\n');
      console.log('   Step 6: Click "Save" and COPY the token immediately');
      console.log('           (You won\'t be able to see it again!)\n');
      console.log('   Step 7: Update your .env file:');
      console.log('           CONTENTSTACK_MANAGEMENT_TOKEN=your_new_token_here\n');
      console.log('   Step 8: Run this script again:');
      console.log('           npm run check-token\n');
      
    } else if (error.status === 404) {
      console.error('🚫 Stack Not Found: The API key might be incorrect\n');
      console.log('📋 To fix this:');
      console.log('   1. Verify your CONTENTSTACK_API_KEY in .env file');
      console.log('   2. Make sure it matches your stack in Contentstack Dashboard');
      console.log('   3. You can find your API key in:');
      console.log('      Settings > Stack Settings > General\n');
      
    } else {
      console.error('Error Details:', error.message);
      if (error.errors) {
        console.error('Additional Info:', JSON.stringify(error.errors, null, 2));
      }
    }
    
    console.log('\n💡 Need help? Check these files:');
    console.log('   - CONTENTSTACK_SETUP.md');
    console.log('   - scripts/README.md\n');
    
    process.exit(1);
  }
}

// Run the check
checkToken();

