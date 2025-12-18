#!/usr/bin/env node

/**
 * Add products field to homepage content type
 * This allows editors to select specific products to display on the homepage
 */

require('dotenv').config({ path: '.env.local' });
const contentstack = require('@contentstack/management');

const STACK_API_KEY = process.env.CONTENTSTACK_API_KEY;
const MANAGEMENT_TOKEN = process.env.CONTENTSTACK_MANAGEMENT_TOKEN;
const BRANCH = process.env.CONTENTSTACK_BRANCH || 'main';

async function addProductReferencesField() {
  try {
    console.log('🚀 Starting to add products field to homepage content type...\n');

    // Initialize Contentstack Management SDK
    const client = contentstack.client({
      authtoken: MANAGEMENT_TOKEN
    });

    const stack = client.stack({ api_key: STACK_API_KEY });

    // Fetch the homepage content type
    console.log('📥 Fetching homepage content type...');
    const contentType = await stack.contentType('homepage').fetch();
    console.log('✅ Homepage content type fetched successfully\n');

    // Check if products field already exists
    const existingField = contentType.schema.find(field => field.uid === 'products');
    if (existingField) {
      console.log('ℹ️  products field already exists in homepage content type');
      console.log('Field details:', JSON.stringify(existingField, null, 2));
      return;
    }

    // Add the products field
    console.log('➕ Adding products field...');
    
    // Find the position after products_section_description
    const insertIndex = contentType.schema.findIndex(
      field => field.uid === 'products_section_description'
    );
    
    const newField = {
      data_type: 'reference',
      display_name: 'Product References',
      reference_to: ['product'],
      field_metadata: {
        ref_multiple: true,
        ref_multiple_content_types: false,
        description: 'Select specific products to display on the homepage. If empty, all products will be shown.'
      },
      uid: 'products',
      mandatory: false,
      multiple: true,
      unique: false
    };

    // Insert the field at the appropriate position
    if (insertIndex !== -1) {
      contentType.schema.splice(insertIndex + 1, 0, newField);
    } else {
      // If products_section_description not found, add at the end
      contentType.schema.push(newField);
    }

    // Update the content type
    await contentType.update();
    console.log('✅ products field added successfully!\n');

    console.log('📝 Field Details:');
    console.log('  - Field UID: products');
    console.log('  - Display Name: Product References');
    console.log('  - Type: Reference (Multiple)');
    console.log('  - References: product content type');
    console.log('  - Mandatory: No');
    console.log('  - Description: Select specific products to display on the homepage\n');

    console.log('✨ Next Steps:');
    console.log('  1. Go to your Contentstack dashboard');
    console.log('  2. Navigate to Content Models > homepage');
    console.log('  3. You should see the new "Product References" field');
    console.log('  4. Edit your homepage entry');
    console.log('  5. Select the products you want to display on the homepage');
    console.log('  6. Save and publish the entry\n');

    console.log('💡 Note: If you leave this field empty, all products will be displayed on the homepage (default behavior)');

  } catch (error) {
    console.error('❌ Error adding products field:', error);
    if (error.errorMessage) {
      console.error('Error message:', error.errorMessage);
    }
    if (error.errors) {
      console.error('Detailed errors:', JSON.stringify(error.errors, null, 2));
    }
    process.exit(1);
  }
}

// Run the script
addProductReferencesField();

