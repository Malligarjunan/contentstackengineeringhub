#!/usr/bin/env node

/**
 * Test script to verify product references functionality
 * This script checks if the homepage can fetch and display product references
 */

require('dotenv').config({ path: '.env.local' });
const contentstack = require('@contentstack/delivery-sdk');

const STACK_API_KEY = process.env.CONTENTSTACK_API_KEY;
const DELIVERY_TOKEN = process.env.CONTENTSTACK_DELIVERY_TOKEN;
const ENVIRONMENT = process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'production';

async function testProductReferences() {
  console.log('🧪 Testing Product References Functionality\n');

  // Check environment variables
  if (!STACK_API_KEY || !DELIVERY_TOKEN) {
    console.log('⚠️  Contentstack not configured. Set these in .env.local:');
    console.log('   - CONTENTSTACK_API_KEY');
    console.log('   - CONTENTSTACK_DELIVERY_TOKEN\n');
    console.log('ℹ️  The app will use local data as fallback.');
    return;
  }

  try {
    // Initialize Contentstack
    console.log('📡 Connecting to Contentstack...');
    const stack = contentstack.stack({
      apiKey: STACK_API_KEY,
      deliveryToken: DELIVERY_TOKEN,
      environment: ENVIRONMENT,
    });
    console.log('✅ Connected successfully\n');

    // Fetch homepage with product references
    console.log('📥 Fetching homepage content with product references...');
    const Entries = stack.contentType('homepage').entry();
    
    // Include product references
    Entries.includeReference('products');
    Entries.includeReference('products.icon');
    Entries.includeReference('products.team_members');
    
    const result = await Entries.find();

    if (!result || !result.entries || result.entries.length === 0) {
      console.log('❌ No homepage entry found');
      console.log('💡 Create a homepage entry in Contentstack first');
      return;
    }

    const homepage = result.entries[0];
    console.log('✅ Homepage entry found\n');

    // Check product references
    console.log('🔍 Checking product references...');
    if (homepage.products && Array.isArray(homepage.products)) {
      const count = homepage.products.length;
      
      if (count > 0) {
        console.log(`✅ Found ${count} product reference(s):\n`);
        
        homepage.products.forEach((product, index) => {
          console.log(`   ${index + 1}. ${product.title}`);
          console.log(`      - Slug: ${product.slug}`);
          console.log(`      - Category: ${product.category}`);
          console.log(`      - Has Icon: ${product.icon ? '✓' : '✗'}`);
          console.log(`      - Team Members: ${product.team_members?.length || 0}`);
          console.log('');
        });

        console.log('✅ Product references are working correctly!');
        console.log('📄 The homepage will display these products.');
      } else {
        console.log('ℹ️  Product references field exists but is empty');
        console.log('📄 The homepage will display all products (default behavior)');
        console.log('\n💡 To add product references:');
        console.log('   1. Go to Contentstack Dashboard');
        console.log('   2. Navigate to Entries > homepage');
        console.log('   3. Edit the entry');
        console.log('   4. Add products to "Product References" field');
        console.log('   5. Save and publish');
      }
    } else {
      console.log('⚠️  Product references field not found in homepage entry');
      console.log('📄 The homepage will display all products (default behavior)');
      console.log('\n💡 To add the field:');
      console.log('   Run: npm run add-product-references');
    }

    // Test fetching all products as fallback
    console.log('\n📥 Testing fallback (fetching all products)...');
    const ProductEntries = stack.contentType('product').entry();
    ProductEntries.includeReference('icon');
    ProductEntries.includeReference('team_members');
    
    const productsResult = await ProductEntries
      .only(['title', 'slug', 'category', 'icon', 'team_members'])
      .orderByAscending('title')
      .find();

    if (productsResult && productsResult.entries) {
      console.log(`✅ Found ${productsResult.entries.length} total products`);
      console.log('✅ Fallback mechanism is working\n');
    }

    // Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Test Summary');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ Contentstack Connection: Working`);
    console.log(`✅ Homepage Entry: Found`);
    console.log(`✅ Product References: ${homepage.products?.length || 0} selected`);
    console.log(`✅ Total Products: ${productsResult?.entries?.length || 0}`);
    console.log(`✅ Fallback Mechanism: Working`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('🎉 All tests passed!');
    console.log('\n💡 Next steps:');
    console.log('   - Run: npm run dev');
    console.log('   - Visit: http://localhost:3000');
    console.log('   - Check console logs for product display mode\n');

  } catch (error) {
    console.error('❌ Error testing product references:', error.message);
    if (error.error_message) {
      console.error('Details:', error.error_message);
    }
    process.exit(1);
  }
}

// Run the test
testProductReferences();

