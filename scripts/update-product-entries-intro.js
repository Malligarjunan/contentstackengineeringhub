#!/usr/bin/env node

/**
 * Update all product entries to populate the intro field
 * 
 * This script fetches all product entries and adds a default intro value
 * based on the product's full description.
 * 
 * Usage: node scripts/update-product-entries-intro.js
 */

require('dotenv').config({ path: '.env' });
const contentstack = require('@contentstack/management');

const MANAGEMENT_TOKEN = process.env.CONTENTSTACK_MANAGEMENT_TOKEN;
const API_KEY = process.env.CONTENTSTACK_API_KEY;
const CONTENT_TYPE_UID = 'product';

// Generate a default intro based on the product's description
function generateIntro(product) {
  const title = product.title || 'Product';
  const description = product.full_description || product.short_description || '';
  
  // Create a rich intro with HTML formatting
  return `<h3>Welcome to ${title}</h3><p>${description}</p><p>Explore the comprehensive documentation, architecture, and team information below to get started with this product.</p>`;
}

async function updateProductEntries() {
  if (!MANAGEMENT_TOKEN || !API_KEY) {
    console.error('❌ Error: Missing required environment variables');
    console.error('Please ensure CONTENTSTACK_MANAGEMENT_TOKEN and CONTENTSTACK_API_KEY are set in .env.local');
    process.exit(1);
  }

  console.log('🚀 Starting to update product entries with intro field...\n');

  try {
    // Initialize the Contentstack Management SDK
    const client = contentstack.client({ authtoken: MANAGEMENT_TOKEN });
    const stack = client.stack({ api_key: API_KEY });

    console.log('📡 Fetching all product entries...');
    
    // Fetch all entries
    const query = stack.contentType(CONTENT_TYPE_UID).entry().query();
    const result = await query.find();
    
    const entries = result.items || [];
    console.log(`✅ Found ${entries.length} product entries\n`);

    if (entries.length === 0) {
      console.log('⚠️  No entries found to update.');
      return;
    }

    let updatedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    // Update each entry
    for (const entryData of entries) {
      const title = entryData.title || 'Unknown';
      const uid = entryData.uid;

      try {
        // Check if intro/introduction already has content (support both field names)
        const existingIntro = entryData.introduction || entryData.intro;
        if (existingIntro && existingIntro.trim() !== '') {
          console.log(`⏭️  Skipping "${title}" - introduction already exists`);
          skippedCount++;
          continue;
        }

        console.log(`📝 Updating "${title}"...`);

        // Fetch the entry to get an editable object
        const entry = await stack.contentType(CONTENT_TYPE_UID).entry(uid).fetch();
        
        // Generate and set the introduction (support both field names)
        const introContent = generateIntro(entryData);
        if (entry.introduction !== undefined) {
          entry.introduction = introContent;
        } else {
          entry.intro = introContent;
        }
        
        // Update the entry
        await entry.update();
        
        console.log(`   ✅ Updated "${title}"`);
        updatedCount++;

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 300));

      } catch (error) {
        console.error(`   ❌ Error updating "${title}":`, error.message);
        errorCount++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 Update Summary:');
    console.log('='.repeat(60));
    console.log(`✅ Successfully updated: ${updatedCount} entries`);
    console.log(`⏭️  Skipped (already has intro): ${skippedCount} entries`);
    console.log(`❌ Errors: ${errorCount} entries`);
    console.log('='.repeat(60));

    if (updatedCount > 0) {
      console.log('\n✨ Entries updated successfully!');
      console.log('\n📌 Next steps:');
      console.log('   1. Review and customize the intro content in Contentstack UI');
      console.log('   2. Publish the updated entries');
      console.log('   3. The product detail pages will automatically display the intro');
    }

  } catch (error) {
    console.error('❌ Error updating product entries:', error.message);
    if (error.errors) {
      console.error('Error details:', JSON.stringify(error.errors, null, 2));
    }
    
    if (error.status === 401 || error.errorCode === 105) {
      console.error('\n🚫 Authentication Failed: Your management token is invalid or expired\n');
      console.log('📋 To fix this:');
      console.log('   1. Run: npm run check-token');
      console.log('   2. Follow the instructions to generate a new token');
      console.log('   3. Update CONTENTSTACK_MANAGEMENT_TOKEN in your .env file\n');
    }
    
    process.exit(1);
  }
}

// Run the function
updateProductEntries();

