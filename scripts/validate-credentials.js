#!/usr/bin/env node

/**
 * Contentstack Credentials Validation Script
 * 
 * This script validates your Contentstack API Key, Delivery Token, and Preview Token
 * by making test API calls to ensure they are configured correctly.
 */

require('dotenv').config({ path: '.env.local' });
const sdk = require('@contentstack/delivery-sdk');
const contentstack = sdk.default || sdk;
const Region = sdk.Region;

// ANSI color codes for better output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const icons = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
  loading: '⏳',
};

// Helper functions
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function section(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'cyan');
  console.log('='.repeat(60) + '\n');
}

function success(message) {
  log(`${icons.success} ${message}`, 'green');
}

function error(message) {
  log(`${icons.error} ${message}`, 'red');
}

function warning(message) {
  log(`${icons.warning} ${message}`, 'yellow');
}

function info(message) {
  log(`${icons.info} ${message}`, 'blue');
}

// Validation functions
async function validateEnvironmentVariables() {
  section('Step 1: Checking Environment Variables');

  const required = {
    'CONTENTSTACK_API_KEY': process.env.CONTENTSTACK_API_KEY,
    'CONTENTSTACK_DELIVERY_TOKEN': process.env.CONTENTSTACK_DELIVERY_TOKEN,
    'NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT': process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT,
  };

  const optional = {
    'CONTENTSTACK_LIVE_PREVIEW_ENABLED': process.env.CONTENTSTACK_LIVE_PREVIEW_ENABLED,
    'CONTENTSTACK_LIVE_PREVIEW_TOKEN': process.env.CONTENTSTACK_LIVE_PREVIEW_TOKEN,
    'CONTENTSTACK_LIVE_PREVIEW_HOST': process.env.CONTENTSTACK_LIVE_PREVIEW_HOST,
  };

  let allValid = true;

  // Check required variables
  info('Required Variables:');
  for (const [key, value] of Object.entries(required)) {
    if (value && value.trim() !== '') {
      const masked = value.substring(0, 8) + '...' + value.substring(value.length - 4);
      success(`${key}: ${masked}`);
    } else {
      error(`${key}: MISSING`);
      allValid = false;
    }
  }

  // Check optional variables
  console.log('');
  info('Optional Variables (for Live Preview):');
  for (const [key, value] of Object.entries(optional)) {
    if (value && value.trim() !== '' && value !== 'YOUR_PREVIEW_TOKEN_HERE') {
      if (key === 'CONTENTSTACK_LIVE_PREVIEW_ENABLED') {
        if (value === 'true') {
          success(`${key}: ${value}`);
        } else {
          warning(`${key}: ${value} (Live Preview disabled)`);
        }
      } else if (key === 'CONTENTSTACK_LIVE_PREVIEW_TOKEN') {
        const masked = value.substring(0, 8) + '...' + value.substring(value.length - 4);
        success(`${key}: ${masked}`);
      } else {
        success(`${key}: ${value}`);
      }
    } else {
      warning(`${key}: NOT SET (optional)`);
    }
  }

  return allValid;
}

async function validateAPIKey() {
  section('Step 2: Validating API Key & Delivery Token');

  const apiKey = process.env.CONTENTSTACK_API_KEY;
  const deliveryToken = process.env.CONTENTSTACK_DELIVERY_TOKEN;
  const environment = process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'production';

  info(`Testing connection to Contentstack...`);
  info(`Environment: ${environment}`);

  try {
    // Initialize stack WITHOUT Live Preview
    const stack = contentstack.stack({
      apiKey: apiKey,
      deliveryToken: deliveryToken,
      environment: environment,
      region: Region.US,
    });

    info('Fetching content types...');

    // Try to fetch content types
    const contentTypes = await stack.contentType('product').entry().find();

    if (contentTypes && contentTypes.entries) {
      success(`API Key & Delivery Token are VALID`);
      success(`Successfully connected to Contentstack`);
      success(`Found ${contentTypes.entries.length} product entries`);
      
      // Show sample entry
      if (contentTypes.entries.length > 0) {
        const sample = contentTypes.entries[0];
        info(`Sample entry: "${sample.title}" (${sample.uid})`);
      }
      
      return true;
    } else {
      warning('Connected but no entries found');
      return true;
    }
  } catch (err) {
    error('API Key or Delivery Token is INVALID');
    error(`Error: ${err.message}`);
    
    if (err.message.includes('401')) {
      error('Authentication failed - Check your API Key and Delivery Token');
    } else if (err.message.includes('404')) {
      error('Content type not found - Your credentials might be for a different stack');
    } else if (err.message.includes('Network')) {
      error('Network error - Check your internet connection');
    }
    
    return false;
  }
}

async function validatePreviewToken() {
  section('Step 3: Validating Live Preview Token');

  const livePreviewEnabled = process.env.CONTENTSTACK_LIVE_PREVIEW_ENABLED === 'true';
  
  if (!livePreviewEnabled) {
    warning('Live Preview is disabled (CONTENTSTACK_LIVE_PREVIEW_ENABLED=false)');
    info('To enable Live Preview, set CONTENTSTACK_LIVE_PREVIEW_ENABLED=true');
    return 'skipped';
  }

  const previewToken = process.env.CONTENTSTACK_LIVE_PREVIEW_TOKEN;
  
  if (!previewToken || previewToken === 'YOUR_PREVIEW_TOKEN_HERE') {
    error('Preview Token is not configured');
    error('Please update CONTENTSTACK_LIVE_PREVIEW_TOKEN in .env.local');
    info('\nHow to get your Preview Token:');
    info('1. Go to https://app.contentstack.com');
    info('2. Navigate to Settings → Tokens');
    info('3. Find or create a "Preview Token"');
    info('4. Copy the token and update .env.local');
    return false;
  }

  const apiKey = process.env.CONTENTSTACK_API_KEY;
  const deliveryToken = process.env.CONTENTSTACK_DELIVERY_TOKEN;
  const environment = process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'production';
  const previewHost = process.env.CONTENTSTACK_LIVE_PREVIEW_HOST || 'rest-preview.contentstack.com';

  info(`Testing Live Preview configuration...`);
  info(`Preview Host: ${previewHost}`);

  try {
    // Initialize stack WITH Live Preview
    const stack = contentstack.stack({
      apiKey: apiKey,
      deliveryToken: deliveryToken,
      environment: environment,
      region: Region.US,
      live_preview: {
        enable: true,
        preview_token: previewToken,
        host: previewHost,
      },
    });

    info('Fetching preview content...');

    // Try to fetch with Live Preview enabled
    const result = await stack.contentType('homepage').entry().find();

    if (result && result.entries && result.entries.length > 0) {
      success(`Preview Token is VALID`);
      success(`Live Preview is properly configured`);
      
      const entry = result.entries[0];
      success(`Successfully fetched preview content: "${entry.hero_title || 'Homepage'}"`);
      
      // Check for $ metadata (Live Preview tags)
      if (entry.$) {
        success(`Live Preview edit tags ($) are present`);
        info(`Available edit tags: ${Object.keys(entry.$).length} fields`);
      } else {
        warning(`Live Preview edit tags ($) not found - might need SDK configuration`);
      }
      
      return true;
    } else {
      warning('Connected but no preview content found');
      return true;
    }
  } catch (err) {
    error('Preview Token validation FAILED');
    error(`Error: ${err.message}`);
    
    if (err.message.includes('401') || err.message.includes('Unauthorized')) {
      error('Preview Token is invalid or expired');
      info('\nTo fix:');
      info('1. Go to Contentstack → Settings → Tokens');
      info('2. Generate a new Preview Token');
      info('3. Update CONTENTSTACK_LIVE_PREVIEW_TOKEN in .env.local');
    } else if (err.message.includes('403')) {
      error('Preview Token does not have required permissions');
    }
    
    return false;
  }
}

async function validateLivePreviewSetup() {
  section('Step 4: Checking Live Preview Client Configuration');

  const config = {
    'Live Preview Enabled': process.env.CONTENTSTACK_LIVE_PREVIEW_ENABLED === 'true',
    'API Key': !!process.env.CONTENTSTACK_API_KEY,
    'Delivery Token': !!process.env.CONTENTSTACK_DELIVERY_TOKEN,
    'Preview Token': !!process.env.CONTENTSTACK_LIVE_PREVIEW_TOKEN && 
                     process.env.CONTENTSTACK_LIVE_PREVIEW_TOKEN !== 'YOUR_PREVIEW_TOKEN_HERE',
    'Environment': process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'production',
    'Preview Host': process.env.CONTENTSTACK_LIVE_PREVIEW_HOST || 'rest-preview.contentstack.com',
  };

  info('Live Preview Configuration:');
  for (const [key, value] of Object.entries(config)) {
    if (typeof value === 'boolean') {
      if (value) {
        success(`${key}: Configured`);
      } else {
        error(`${key}: Not Configured`);
      }
    } else {
      info(`${key}: ${value}`);
    }
  }

  // Check if all required for Live Preview
  const allConfigured = config['Live Preview Enabled'] && 
                       config['API Key'] && 
                       config['Delivery Token'] && 
                       config['Preview Token'];

  console.log('');
  if (allConfigured) {
    success('All Live Preview requirements are configured!');
    return true;
  } else {
    warning('Some Live Preview requirements are missing');
    return false;
  }
}

// Main execution
async function main() {
  console.log('\n');
  log('╔═══════════════════════════════════════════════════════════╗', 'cyan');
  log('║     Contentstack Credentials Validation Tool             ║', 'cyan');
  log('╚═══════════════════════════════════════════════════════════╝', 'cyan');

  const results = {
    envVars: false,
    apiKey: false,
    previewToken: null,
    livePreviewSetup: false,
  };

  try {
    // Step 1: Check environment variables
    results.envVars = await validateEnvironmentVariables();
    
    if (!results.envVars) {
      error('\n❌ Missing required environment variables. Cannot proceed with validation.');
      process.exit(1);
    }

    // Step 2: Validate API Key and Delivery Token
    results.apiKey = await validateAPIKey();

    // Step 3: Validate Preview Token (if enabled)
    results.previewToken = await validatePreviewToken();

    // Step 4: Check overall Live Preview setup
    results.livePreviewSetup = await validateLivePreviewSetup();

    // Final Summary
    section('Validation Summary');

    const summary = [
      { name: 'Environment Variables', status: results.envVars },
      { name: 'API Key & Delivery Token', status: results.apiKey },
      { name: 'Preview Token', status: results.previewToken },
      { name: 'Live Preview Setup', status: results.livePreviewSetup },
    ];

    summary.forEach(item => {
      if (item.status === true) {
        success(`${item.name}: VALID`);
      } else if (item.status === 'skipped') {
        warning(`${item.name}: SKIPPED`);
      } else if (item.status === false) {
        error(`${item.name}: INVALID`);
      }
    });

    console.log('\n');

    // Overall status
    const allValid = results.envVars && results.apiKey;
    const livePreviewReady = allValid && results.previewToken === true && results.livePreviewSetup;

    if (livePreviewReady) {
      log('═'.repeat(60), 'green');
      success('🎉 ALL VALIDATIONS PASSED!');
      success('Your Contentstack credentials are valid and Live Preview is ready!');
      log('═'.repeat(60), 'green');
      console.log('');
      info('Next steps:');
      info('1. Restart your dev server: npm run dev');
      info('2. Open Contentstack Live Preview');
      info('3. Your app should load with edit buttons!');
    } else if (allValid) {
      log('═'.repeat(60), 'yellow');
      success('✅ Basic credentials are VALID');
      warning('⚠️  Live Preview is not fully configured');
      log('═'.repeat(60), 'yellow');
      console.log('');
      info('Your API Key and Delivery Token work!');
      if (results.previewToken === 'skipped') {
        info('Live Preview is disabled - enable it to use real-time preview features');
      } else if (results.previewToken === false) {
        info('Configure Preview Token to enable Live Preview');
      }
    } else {
      log('═'.repeat(60), 'red');
      error('❌ VALIDATION FAILED');
      error('Some credentials are invalid. Please check the errors above.');
      log('═'.repeat(60), 'red');
      process.exit(1);
    }

  } catch (err) {
    console.error('');
    error('Unexpected error during validation:');
    console.error(err);
    process.exit(1);
  }

  console.log('');
}

// Run the validation
main().catch(console.error);

