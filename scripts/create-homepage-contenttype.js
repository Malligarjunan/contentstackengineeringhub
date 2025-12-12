require('dotenv').config({ path: '.env' });
const axios = require('axios');

// Configuration
const config = {
  apiKey: process.env.CONTENTSTACK_API_KEY,
  managementToken: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
  region: 'us', // Change if you're using a different region
};

// Get the base URL based on region
const getBaseUrl = (region) => {
  const regionUrls = {
    us: 'https://api.contentstack.io/v3',
    eu: 'https://eu-api.contentstack.com/v3',
    'azure-na': 'https://azure-na-api.contentstack.com/v3',
    'azure-eu': 'https://azure-eu-api.contentstack.com/v3',
  };
  return regionUrls[region] || regionUrls.us;
};

const baseURL = getBaseUrl(config.region);

// Homepage content type schema
const homepageContentType = {
  content_type: {
    title: 'Homepage',
    uid: 'homepage',
    schema: [
      {
        display_name: 'Title',
        uid: 'title',
        data_type: 'text',
        field_metadata: {
          _default: true,
          version: 3,
        },
        mandatory: true,
        unique: false,
        multiple: false,
      },
      {
        display_name: 'URL',
        uid: 'url',
        data_type: 'text',
        field_metadata: {
          _default: true,
          version: 3,
        },
        mandatory: false,
        unique: false,
        multiple: false,
      },
      {
        display_name: 'Hero Title',
        uid: 'hero_title',
        data_type: 'text',
        field_metadata: {
          version: 3,
        },
        mandatory: true,
        unique: false,
        multiple: false,
      },
      {
        display_name: 'Hero Description',
        uid: 'hero_description',
        data_type: 'text',
        field_metadata: {
          description: 'Main tagline/description for the homepage hero section',
          default_value: '',
          version: 3,
          multiline: true,
        },
        mandatory: true,
        unique: false,
        multiple: false,
      },
      {
        display_name: 'Platform Video URL',
        uid: 'platform_video_url',
        data_type: 'text',
        field_metadata: {
          description: 'YouTube video URL showcasing the platform',
          default_value: '',
          version: 3,
        },
        mandatory: false,
        unique: false,
        multiple: false,
      },
      {
        display_name: 'About Contentstack',
        uid: 'about_contentstack',
        data_type: 'text',
        field_metadata: {
          description: 'Overview description of Contentstack',
          default_value: '',
          version: 3,
          multiline: true,
          markdown: false,
        },
        mandatory: true,
        unique: false,
        multiple: false,
      },
      {
        display_name: 'Architecture Diagrams',
        uid: 'architecture_diagrams',
        data_type: 'group',
        field_metadata: {
          description: 'Architecture diagrams for the platform',
          instruction: 'Add architecture diagrams with descriptions',
        },
        multiple: true,
        mandatory: false,
        schema: [
          {
            display_name: 'Title',
            uid: 'title',
            data_type: 'text',
            field_metadata: {
              _default: true,
              version: 3,
            },
            mandatory: true,
            unique: false,
            multiple: false,
          },
          {
            display_name: 'Description',
            uid: 'description',
            data_type: 'text',
            field_metadata: {
              description: 'Short description of the diagram',
              default_value: '',
              version: 3,
              multiline: true,
            },
            mandatory: false,
            unique: false,
            multiple: false,
          },
          {
            display_name: 'Image URL',
            uid: 'image_url',
            data_type: 'text',
            field_metadata: {
              description: 'URL or path to the diagram image',
              default_value: '',
              version: 3,
            },
            mandatory: false,
            unique: false,
            multiple: false,
          },
          {
            display_name: 'Details',
            uid: 'details',
            data_type: 'text',
            field_metadata: {
              description: 'Detailed explanation of the architecture',
              default_value: '',
              version: 3,
              multiline: true,
            },
            mandatory: false,
            unique: false,
            multiple: false,
          },
          {
            display_name: 'Whimsical URL',
            uid: 'whimsical_url',
            data_type: 'text',
            field_metadata: {
              description: 'Link to the Whimsical diagram',
              default_value: '',
              version: 3,
            },
            mandatory: false,
            unique: false,
            multiple: false,
          },
        ],
      },
    ],
    options: {
      title: 'title',
      publishable: true,
      is_page: true,
      singleton: true,
      sub_title: [],
      url_pattern: '/',
      url_prefix: '/',
    },
    description: 'Homepage content for the Engineering Hub',
  },
};

// Function to create content type
async function createHomepageContentType() {
  console.log('\n🔍 Checking Configuration...\n');
  
  if (!config.apiKey || !config.managementToken) {
    console.error('❌ ERROR: Missing required environment variables');
    console.log('\nPlease ensure the following are set in your .env file:');
    console.log('- CONTENTSTACK_API_KEY');
    console.log('- CONTENTSTACK_MANAGEMENT_TOKEN');
    console.log('\nTo get a management token:');
    console.log('1. Go to Contentstack Dashboard > Settings > Tokens');
    console.log('2. Create a new Management Token');
    console.log('3. Give it appropriate permissions (Content Type: Create, Update)');
    console.log('4. Add it to your .env file as CONTENTSTACK_MANAGEMENT_TOKEN\n');
    process.exit(1);
  }

  console.log('API Key:', config.apiKey ? '✅ Set' : '❌ Not set');
  console.log('Management Token:', config.managementToken ? '✅ Set' : '❌ Not set');
  console.log('Region:', config.region);
  console.log('Base URL:', baseURL);

  console.log('\n🚀 Creating Homepage Content Type...\n');

  try {
    const response = await axios.post(
      `${baseURL}/content_types`,
      homepageContentType,
      {
        headers: {
          'api_key': config.apiKey,
          'authorization': config.managementToken,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data && response.data.content_type) {
      console.log('✅ SUCCESS! Homepage content type created successfully!\n');
      console.log('Content Type Details:');
      console.log('- Title:', response.data.content_type.title);
      console.log('- UID:', response.data.content_type.uid);
      console.log('- Singleton:', response.data.content_type.options.singleton);
      console.log('\nFields created:');
      console.log('  1. Title (text, mandatory) - for content type display');
      console.log('  2. URL (text, optional) - page URL field');
      console.log('  3. Hero Title (text, mandatory)');
      console.log('  4. Hero Description (text, mandatory)');
      console.log('  5. Platform Video URL (text, optional)');
      console.log('  6. About Contentstack (text, mandatory)');
      console.log('  7. Architecture Diagrams (group, multiple)');
      console.log('     - Title');
      console.log('     - Description');
      console.log('     - Image URL');
      console.log('     - Details');
      console.log('     - Whimsical URL');
      console.log('\n📝 Next Steps:');
      console.log('1. Go to your Contentstack Dashboard');
      console.log('2. Navigate to Content Models > Homepage');
      console.log('3. Create an entry with your homepage content');
      console.log('4. Publish the entry\n');
    }
  } catch (error) {
    console.error('❌ ERROR: Failed to create homepage content type\n');
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Error:', JSON.stringify(error.response.data, null, 2));
      
      if (error.response.status === 401) {
        console.log('\n💡 Authorization failed. Please check:');
        console.log('- Your Management Token is valid and not expired');
        console.log('- The token has the correct permissions (Content Type: Create)');
      } else if (error.response.status === 422) {
        console.log('\n💡 Content type might already exist or validation failed');
      }
    } else {
      console.error('Error:', error.message);
    }
    
    process.exit(1);
  }
}

// Run the script
createHomepageContentType();

