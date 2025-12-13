#!/usr/bin/env node

/**
 * Script to update product content type with repositories group field
 * 
 * This replaces the single repositoryURL field with a group field containing:
 * - repo_name: Repository name
 * - repo_description: Repository description
 * - repo_url: Repository URL
 */

require('dotenv').config();
const contentstack = require('@contentstack/management');

const client = contentstack.client();

// Configuration
const STACK_API_KEY = process.env.CONTENTSTACK_API_KEY;
const MANAGEMENT_TOKEN = process.env.CONTENTSTACK_MANAGEMENT_TOKEN;
const CONTENT_TYPE_UID = 'product';

async function updateProductContentType() {
  try {
    console.log('🔄 Updating product content type with repositories group field...\n');

    // Initialize the stack
    const stack = client.stack({ 
      api_key: STACK_API_KEY,
      management_token: MANAGEMENT_TOKEN
    });

    // Get the existing content type
    const contentType = stack.contentType(CONTENT_TYPE_UID);
    const existingContentType = await contentType.fetch();
    
    console.log('✅ Found existing product content type\n');

    // Get existing schema
    let schema = existingContentType.schema || [];

    // Find and remove the old repository_url field if it exists
    const oldFieldIndex = schema.findIndex(field => 
      field.uid === 'repository_url' || field.uid === 'repositoryUrl'
    );

    if (oldFieldIndex !== -1) {
      console.log('📝 Removing old repository_url field...');
      schema.splice(oldFieldIndex, 1);
    }

    // Check if repositories field already exists
    const repositoriesFieldExists = schema.some(field => field.uid === 'repositories');

    if (repositoriesFieldExists) {
      console.log('✅ Repositories field already exists!');
      return;
    }

    // Define the new repositories group field
    const repositoriesField = {
      data_type: 'group',
      display_name: 'Repositories',
      uid: 'repositories',
      field_metadata: {
        description: 'List of code repositories for this product',
        instruction: 'Add all related code repositories (main repo, documentation, examples, etc.)',
      },
      schema: [
        {
          data_type: 'text',
          display_name: 'Repository Name',
          uid: 'repo_name',
          field_metadata: {
            _default: true,
            description: 'Name of the repository (e.g., "Main Backend", "Frontend App", "Documentation")',
          },
          mandatory: true,
          unique: false,
          multiple: false
        },
        {
          data_type: 'text',
          display_name: 'Repository Description',
          uid: 'repo_description',
          field_metadata: {
            _default: true,
            description: 'Brief description of what this repository contains',
          },
          mandatory: false,
          unique: false,
          multiple: false
        },
        {
          data_type: 'text',
          display_name: 'Repository URL',
          uid: 'repo_url',
          field_metadata: {
            _default: true,
            description: 'Full URL to the repository (GitHub, GitLab, etc.)',
          },
          mandatory: true,
          unique: false,
          multiple: false
        }
      ],
      multiple: true, // Allow multiple repositories
      mandatory: false,
      unique: false
    };

    console.log('📝 Adding new repositories group field...\n');

    // Add the new field to the schema
    // Find a good position - after local_dev_setup if it exists
    const localDevIndex = schema.findIndex(field => 
      field.uid === 'local_dev_setup' || field.uid === 'localDevSetup'
    );

    if (localDevIndex !== -1) {
      // Insert after local_dev_setup
      schema.splice(localDevIndex + 1, 0, repositoriesField);
    } else {
      // Otherwise, add to the end
      schema.push(repositoriesField);
    }

    // Update the content type
    existingContentType.schema = schema;
    const result = await existingContentType.update();

    console.log('✅ Product content type updated successfully!\n');
    console.log('📋 Summary:');
    console.log(`   Total fields: ${result.schema.length}`);
    console.log('   New field added: repositories (group, multiple)');
    console.log('     ├─ repo_name (text, required)');
    console.log('     ├─ repo_description (text, optional)');
    console.log('     └─ repo_url (text, required)\n');
    
    console.log('🎯 Next steps:');
    console.log('   1. Update product entries to add repository information');
    console.log('   2. Update the product details page to display repositories');
    console.log('   3. Update TypeScript types to include repositories field\n');

    console.log('💡 Migration note:');
    console.log('   The old repository_url field has been removed.');
    console.log('   You may need to manually migrate data from entries.\n');

  } catch (error) {
    console.error('❌ Error updating content type:', error.message);
    if (error.errors) {
      console.error('Error details:', JSON.stringify(error.errors, null, 2));
    }
    if (error.error_message) {
      console.error('Error message:', error.error_message);
    }
    process.exit(1);
  }
}

// Run the script
updateProductContentType();

