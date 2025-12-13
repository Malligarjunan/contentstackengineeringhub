#!/usr/bin/env node

/**
 * Add 'intro' Rich Text Editor field to the Product content type
 * 
 * This script adds a new RTE field called 'intro' to the product content type.
 * The field will be placed near the top of the schema for better content organization.
 * 
 * Usage: node scripts/add-intro-field-to-product.js
 */

require('dotenv').config({ path: '.env' });
const contentstack = require('@contentstack/management');

const MANAGEMENT_TOKEN = process.env.CONTENTSTACK_MANAGEMENT_TOKEN;
const API_KEY = process.env.CONTENTSTACK_API_KEY;
const CONTENT_TYPE_UID = 'product';

async function addIntroField() {
  if (!MANAGEMENT_TOKEN || !API_KEY) {
    console.error('❌ Error: Missing required environment variables');
    console.error('Please ensure CONTENTSTACK_MANAGEMENT_TOKEN and CONTENTSTACK_API_KEY are set in .env.local');
    process.exit(1);
  }

  console.log('🚀 Starting to add intro field to product content type...\n');

  try {
    // Initialize the Contentstack Management SDK
    const client = contentstack.client({ authtoken: MANAGEMENT_TOKEN });
    const stack = client.stack({ api_key: API_KEY });

    console.log('📡 Fetching current product content type schema...');
    
    // Fetch the content type
    const contentType = await stack.contentType(CONTENT_TYPE_UID).fetch();
    const schema = contentType.schema;

    console.log(`✅ Current schema has ${schema.length} fields\n`);

    // Check if intro or introduction field already exists
    const introFieldExists = schema.find(field => field.uid === 'intro' || field.uid === 'introduction');
    if (introFieldExists) {
      console.log(`⚠️  Introduction field already exists (UID: ${introFieldExists.uid}). Skipping...`);
      return;
    }

    // Find the position to insert the intro field (after full_description)
    const fullDescriptionIndex = schema.findIndex(field => field.uid === 'full_description');
    const insertIndex = fullDescriptionIndex !== -1 ? fullDescriptionIndex + 1 : 4;

    // Define the new intro field (Rich Text Editor)
    // Using 'introduction' as UID to match potential Contentstack field naming
    const introField = {
      data_type: 'text',
      display_name: 'Introduction',
      uid: 'introduction',  // Changed from 'intro' to 'introduction'
      field_metadata: {
        description: 'Rich text introduction for the product detail page',
        default_value: '',
        multiline: false,
        rich_text_type: 'advanced',
        options: []
      },
      format: '',
      error_messages: {
        format: ''
      },
      mandatory: false,
      multiple: false,
      non_localizable: false,
      unique: false
    };

    console.log('📝 Adding introduction field to schema...');

    // Insert the field at the desired position
    schema.splice(insertIndex, 0, introField);

    // Update the content type with the new schema
    contentType.schema = schema;
    const updatedContentType = await contentType.update();

    console.log('✅ Successfully added introduction field to product content type!');
    console.log(`   Field position: ${insertIndex + 1} of ${schema.length}`);
    console.log(`   Field UID: introduction`);
    console.log(`   Field Type: Rich Text Editor (Advanced)`);
    console.log('\n✨ Content type updated successfully!');
    console.log('\n📌 Next steps:');
    console.log('   1. Run: node scripts/update-product-entries-intro.js');
    console.log('   2. Update entries in Contentstack UI with introduction content');
    console.log('\n💡 Note: The code supports both "intro" and "introduction" field UIDs for compatibility.');

  } catch (error) {
    console.error('❌ Error updating product content type:', error.message);
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
addIntroField();

