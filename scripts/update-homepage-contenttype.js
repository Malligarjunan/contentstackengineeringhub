#!/usr/bin/env node

/**
 * Script to update the homepage content type with enhanced fields
 * This adds all the missing fields for homepage sections currently hardcoded
 */

require('dotenv').config();
const contentstack = require('@contentstack/management');

const client = contentstack.client();

// Configuration
const STACK_API_KEY = process.env.CONTENTSTACK_API_KEY;
const MANAGEMENT_TOKEN = process.env.CONTENTSTACK_MANAGEMENT_TOKEN;
const CONTENT_TYPE_UID = 'homepage';

async function updateHomepageContentType() {
  try {
    console.log('🔄 Updating homepage content type...\n');

    // Initialize the stack
    const stack = client.stack({ 
      api_key: STACK_API_KEY,
      management_token: MANAGEMENT_TOKEN
    });

    // Get the existing content type
    const contentType = stack.contentType(CONTENT_TYPE_UID);
    const existingContentType = await contentType.fetch();
    
    console.log('✅ Found existing homepage content type\n');

    // Get existing schema
    const schema = existingContentType.schema || [];

    // Define new fields to add
    const newFields = [
      // Hero Section Badge
      {
        data_type: 'text',
        display_name: 'Hero Badge Text',
        uid: 'hero_badge_text',
        field_metadata: {
          _default: true,
          description: 'Small badge text above hero title (e.g., "Internal Engineering Resource")',
        },
        mandatory: false,
        unique: false,
        multiple: false
      },

      // Features Section (Everything You Need to Know)
      {
        data_type: 'text',
        display_name: 'Features Section Title',
        uid: 'features_section_title',
        field_metadata: {
          _default: true,
          description: 'Main title for the features section',
        },
        mandatory: false,
        unique: false,
        multiple: false
      },
      {
        data_type: 'text',
        display_name: 'Features Section Description',
        uid: 'features_section_description',
        field_metadata: {
          _default: true,
          description: 'Description text for the features section',
        },
        mandatory: false,
        unique: false,
        multiple: false
      },
      {
        data_type: 'group',
        display_name: 'Feature Cards',
        uid: 'feature_cards',
        field_metadata: {
          description: 'List of feature cards to display',
        },
        schema: [
          {
            data_type: 'text',
            display_name: 'Title',
            uid: 'title',
            field_metadata: { _default: true },
            mandatory: true,
            unique: false,
            multiple: false
          },
          {
            data_type: 'text',
            display_name: 'Description',
            uid: 'description',
            field_metadata: { _default: true },
            mandatory: true,
            unique: false,
            multiple: false
          },
          {
            data_type: 'text',
            display_name: 'Icon Name',
            uid: 'icon_name',
            field_metadata: { 
              _default: true,
              description: 'Icon identifier (team, documentation, code, qa, practices, dependencies)'
            },
            mandatory: false,
            unique: false,
            multiple: false
          },
          {
            data_type: 'text',
            display_name: 'Color',
            uid: 'color',
            field_metadata: { 
              _default: true,
              description: 'Color theme (purple, blue, green, pink, orange, cyan)'
            },
            mandatory: false,
            unique: false,
            multiple: false
          }
        ],
        multiple: true,
        mandatory: false,
        unique: false
      },

      // Products Section
      {
        data_type: 'text',
        display_name: 'Products Section Badge',
        uid: 'products_section_badge',
        field_metadata: {
          _default: true,
          description: 'Small badge text above products section title',
        },
        mandatory: false,
        unique: false,
        multiple: false
      },
      {
        data_type: 'text',
        display_name: 'Products Section Title',
        uid: 'products_section_title',
        field_metadata: {
          _default: true,
          description: 'Main title for the products section',
        },
        mandatory: false,
        unique: false,
        multiple: false
      },
      {
        data_type: 'text',
        display_name: 'Products Section Description',
        uid: 'products_section_description',
        field_metadata: {
          _default: true,
          description: 'Description text for the products section',
        },
        mandatory: false,
        unique: false,
        multiple: false
      },

      // Architecture Section
      {
        data_type: 'text',
        display_name: 'Architecture Section Badge',
        uid: 'architecture_section_badge',
        field_metadata: {
          _default: true,
          description: 'Small badge text above architecture section',
        },
        mandatory: false,
        unique: false,
        multiple: false
      },
      {
        data_type: 'text',
        display_name: 'Architecture Section Title',
        uid: 'architecture_section_title',
        field_metadata: {
          _default: true,
          description: 'Main title for architecture section (supports line breaks)',
        },
        mandatory: false,
        unique: false,
        multiple: false
      },
      {
        data_type: 'text',
        display_name: 'Architecture Section Subtitle',
        uid: 'architecture_section_subtitle',
        field_metadata: {
          _default: true,
          description: 'Highlighted subtitle (shown in purple)',
        },
        mandatory: false,
        unique: false,
        multiple: false
      },
      {
        data_type: 'text',
        display_name: 'Architecture Section Description',
        uid: 'architecture_section_description',
        field_metadata: {
          _default: true,
          description: 'Description text for architecture section',
        },
        mandatory: false,
        unique: false,
        multiple: false
      },
      {
        data_type: 'text',
        display_name: 'Architecture Principles Title',
        uid: 'architecture_principles_title',
        field_metadata: {
          _default: true,
          description: 'Title for the architecture principles list',
        },
        mandatory: false,
        unique: false,
        multiple: false
      },
      {
        data_type: 'group',
        display_name: 'Architecture Principles',
        uid: 'architecture_principles',
        field_metadata: {
          description: 'List of core architecture principles',
        },
        schema: [
          {
            data_type: 'text',
            display_name: 'Title',
            uid: 'title',
            field_metadata: { _default: true },
            mandatory: true,
            unique: false,
            multiple: false
          },
          {
            data_type: 'text',
            display_name: 'Description',
            uid: 'description',
            field_metadata: { _default: true },
            mandatory: true,
            unique: false,
            multiple: false
          }
        ],
        multiple: true,
        mandatory: false,
        unique: false
      },
      {
        data_type: 'text',
        display_name: 'Main Architecture Image URL',
        uid: 'main_architecture_image_url',
        field_metadata: {
          _default: true,
          description: 'URL for the main architecture diagram image',
        },
        mandatory: false,
        unique: false,
        multiple: false
      },
      {
        data_type: 'text',
        display_name: 'Architecture Image Title',
        uid: 'architecture_image_title',
        field_metadata: {
          _default: true,
          description: 'Title for the main architecture image',
        },
        mandatory: false,
        unique: false,
        multiple: false
      },
      {
        data_type: 'text',
        display_name: 'Architecture Image Description',
        uid: 'architecture_image_description',
        field_metadata: {
          _default: true,
          description: 'Description for the main architecture image',
        },
        mandatory: false,
        unique: false,
        multiple: false
      },

      // Video Section
      {
        data_type: 'text',
        display_name: 'Video Section Badge',
        uid: 'video_section_badge',
        field_metadata: {
          _default: true,
          description: 'Small badge text above video section',
        },
        mandatory: false,
        unique: false,
        multiple: false
      },
      {
        data_type: 'text',
        display_name: 'Video Section Title',
        uid: 'video_section_title',
        field_metadata: {
          _default: true,
          description: 'Main title for video section',
        },
        mandatory: false,
        unique: false,
        multiple: false
      },
      {
        data_type: 'text',
        display_name: 'Video Section Description',
        uid: 'video_section_description',
        field_metadata: {
          _default: true,
          description: 'Description text for video section',
        },
        mandatory: false,
        unique: false,
        multiple: false
      },

      // Quick Access Resources
      {
        data_type: 'text',
        display_name: 'Resources Section Title',
        uid: 'resources_section_title',
        field_metadata: {
          _default: true,
          description: 'Main title for quick access resources section',
        },
        mandatory: false,
        unique: false,
        multiple: false
      },
      {
        data_type: 'text',
        display_name: 'Resources Section Description',
        uid: 'resources_section_description',
        field_metadata: {
          _default: true,
          description: 'Description text for resources section',
        },
        mandatory: false,
        unique: false,
        multiple: false
      },
      {
        data_type: 'group',
        display_name: 'Quick Access Resources',
        uid: 'quick_access_resources',
        field_metadata: {
          description: 'List of quick access resource cards',
        },
        schema: [
          {
            data_type: 'text',
            display_name: 'Title',
            uid: 'title',
            field_metadata: { _default: true },
            mandatory: true,
            unique: false,
            multiple: false
          },
          {
            data_type: 'text',
            display_name: 'Description',
            uid: 'description',
            field_metadata: { _default: true },
            mandatory: true,
            unique: false,
            multiple: false
          },
          {
            data_type: 'text',
            display_name: 'Link URL',
            uid: 'link_url',
            field_metadata: { _default: true },
            mandatory: true,
            unique: false,
            multiple: false
          },
          {
            data_type: 'text',
            display_name: 'Icon Name',
            uid: 'icon_name',
            field_metadata: { 
              _default: true,
              description: 'Icon identifier (api_docs, architecture, best_practices, team_contacts)'
            },
            mandatory: false,
            unique: false,
            multiple: false
          },
          {
            data_type: 'text',
            display_name: 'Color',
            uid: 'color',
            field_metadata: { 
              _default: true,
              description: 'Color theme (purple, blue, green, orange)'
            },
            mandatory: false,
            unique: false,
            multiple: false
          }
        ],
        multiple: true,
        mandatory: false,
        unique: false
      },

      // CTA Section
      {
        data_type: 'text',
        display_name: 'CTA Section Badge',
        uid: 'cta_section_badge',
        field_metadata: {
          _default: true,
          description: 'Small badge text above CTA section',
        },
        mandatory: false,
        unique: false,
        multiple: false
      },
      {
        data_type: 'text',
        display_name: 'CTA Section Title',
        uid: 'cta_section_title',
        field_metadata: {
          _default: true,
          description: 'Main title for CTA section',
        },
        mandatory: false,
        unique: false,
        multiple: false
      },
      {
        data_type: 'text',
        display_name: 'CTA Section Description',
        uid: 'cta_section_description',
        field_metadata: {
          _default: true,
          description: 'Description text for CTA section',
        },
        mandatory: false,
        unique: false,
        multiple: false
      }
    ];

    // Check which fields already exist and filter out duplicates
    const existingFieldUids = schema.map(field => field.uid);
    const fieldsToAdd = newFields.filter(field => !existingFieldUids.includes(field.uid));

    if (fieldsToAdd.length === 0) {
      console.log('✅ All fields already exist in the content type!');
      return;
    }

    console.log(`📝 Adding ${fieldsToAdd.length} new fields:\n`);
    fieldsToAdd.forEach(field => {
      console.log(`   - ${field.display_name} (${field.uid})`);
    });
    console.log('');

    // Add new fields to the schema
    const updatedSchema = [...schema, ...fieldsToAdd];

    // Update the content type
    existingContentType.schema = updatedSchema;
    const result = await existingContentType.update();

    console.log('✅ Homepage content type updated successfully!\n');
    console.log('📋 Summary:');
    console.log(`   Total fields: ${result.schema.length}`);
    console.log(`   New fields added: ${fieldsToAdd.length}\n`);
    
    console.log('🎯 Next steps:');
    console.log('   1. Run update-homepage-entry.js to populate these fields');
    console.log('   2. Update app/page.tsx to use the new Contentstack fields\n');

  } catch (error) {
    console.error('❌ Error updating content type:', error.message);
    if (error.errors) {
      console.error('Error details:', JSON.stringify(error.errors, null, 2));
    }
    process.exit(1);
  }
}

// Run the script
updateHomepageContentType();

