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

// Homepage entry data based on data/homepage.ts
const homepageEntry = {
  entry: {
    title: 'Engineering Hub Homepage',
    url: '/homepage',
    hero_title: 'Contentstack Engineering Hub',
    hero_description: 'Your central resource for all technical documentation, architecture, and development practices across Contentstack products.',
    platform_video_url: 'https://www.youtube.com/watch?v=AHrK21gNhE4',
    about_contentstack: `Contentstack is the world's best digital experience platform, combining the power of a headless CMS with real-time customer analytics to deliver adaptive, personalized content across all channels.

Our platform empowers developers and IT teams to build scalable, modern applications with an API-first, cloud-based architecture. With Contentstack Edge, you get flexibility, speed, and the ability to create highly personalized digital experiences that adapt to your users in real-time.

From content management to intelligent agents, from powerful analytics to effortless front-end hosting, Contentstack provides everything you need to reimagine what's possible in digital experience delivery.`,
    architecture_diagrams: [
      {
        title: 'Contentstack Platform Architecture',
        description: 'High-level overview of the Contentstack platform components and their interactions',
        image_url: '/architecture/platform-overview.png',
        details: 'The platform consists of multiple services working together: CMS Core, Delivery Infrastructure, Edge Network, Personalization Engine, and Analytics Platform.',
        whimsical_url: 'https://whimsical.com/contentstack-platform-architecture'
      },
      {
        title: 'Microservices Architecture',
        description: 'Our distributed microservices architecture enabling scalability and resilience',
        image_url: '/architecture/microservices.png',
        details: 'Each product operates as an independent microservice with its own database, allowing for independent scaling and deployment.',
        whimsical_url: 'https://whimsical.com/contentstack-microservices'
      },
      {
        title: 'Data Flow Architecture',
        description: 'How data flows through the Contentstack ecosystem',
        image_url: '/architecture/data-flow.png',
        details: 'Content flows from CMA → Storage → CDA → Edge CDN → End Users, with real-time analytics feeding back into the personalization engine.',
        whimsical_url: 'https://whimsical.com/contentstack-data-flow'
      },
      {
        title: 'Security Architecture',
        description: 'Multi-layered security approach protecting the platform and customer data',
        image_url: '/architecture/security.png',
        details: 'Includes API authentication, role-based access control, data encryption at rest and in transit, and SOC 2 compliance.',
        whimsical_url: 'https://whimsical.com/contentstack-security-architecture'
      }
    ],
  },
};

// Function to create homepage entry
async function createHomepageEntry() {
  console.log('\n🔍 Checking Configuration...\n');
  
  if (!config.apiKey || !config.managementToken) {
    console.error('❌ ERROR: Missing required environment variables');
    console.log('\nPlease ensure the following are set in your .env file:');
    console.log('- CONTENTSTACK_API_KEY');
    console.log('- CONTENTSTACK_MANAGEMENT_TOKEN');
    console.log('\nTo get a management token:');
    console.log('1. Go to Contentstack Dashboard > Settings > Tokens');
    console.log('2. Create a new Management Token');
    console.log('3. Give it appropriate permissions (Entries: Create, Update, Publish)');
    console.log('4. Add it to your .env file as CONTENTSTACK_MANAGEMENT_TOKEN\n');
    process.exit(1);
  }

  console.log('API Key:', config.apiKey ? '✅ Set' : '❌ Not set');
  console.log('Management Token:', config.managementToken ? '✅ Set' : '❌ Not set');
  console.log('Region:', config.region);
  console.log('Base URL:', baseURL);

  console.log('\n🚀 Creating Homepage Entry...\n');

  try {
    // Create the entry
    const createResponse = await axios.post(
      `${baseURL}/content_types/homepage/entries`,
      homepageEntry,
      {
        headers: {
          'api_key': config.apiKey,
          'authorization': config.managementToken,
          'Content-Type': 'application/json',
        },
      }
    );

    if (createResponse.data && createResponse.data.entry) {
      const entryUid = createResponse.data.entry.uid;
      console.log('✅ SUCCESS! Homepage entry created!\n');
      console.log('Entry Details:');
      console.log('- UID:', entryUid);
      console.log('- Title:', createResponse.data.entry.title);
      console.log('- Status: Draft (unpublished)');
      
      console.log('\n📤 Publishing entry...\n');
      
      // Publish the entry
      try {
        const publishResponse = await axios.post(
          `${baseURL}/content_types/homepage/entries/${entryUid}/publish`,
          {
            entry: {
              environments: [process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'production'],
              locales: ['en-us'],
            },
          },
          {
            headers: {
              'api_key': config.apiKey,
              'authorization': config.managementToken,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('✅ Entry published successfully!\n');
        console.log('Published to:');
        console.log('- Environment:', process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'production');
        console.log('- Locale: en-us');
        
        console.log('\n📋 Entry Content:');
        console.log('- Hero Title:', homepageEntry.entry.hero_title);
        console.log('- Architecture Diagrams:', homepageEntry.entry.architecture_diagrams.length);
        
        console.log('\n✨ Next Steps:');
        console.log('1. Your homepage content is now live in Contentstack');
        console.log('2. Run your Next.js app: npm run dev');
        console.log('3. The homepage will automatically fetch this content');
        console.log('4. You can edit the entry in Contentstack Dashboard > Entries > Homepage\n');
      } catch (publishError) {
        console.log('⚠️  Entry created but publishing failed');
        console.error('Publish error:', publishError.response?.data || publishError.message);
        console.log('\n💡 You can manually publish the entry:');
        console.log('1. Go to Contentstack Dashboard');
        console.log('2. Navigate to Entries > Homepage');
        console.log('3. Click on the entry and publish it\n');
      }
    }
  } catch (error) {
    console.error('❌ ERROR: Failed to create homepage entry\n');
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Error:', JSON.stringify(error.response.data, null, 2));
      
      if (error.response.status === 401) {
        console.log('\n💡 Authorization failed. Please check:');
        console.log('- Your Management Token is valid and not expired');
        console.log('- The token has the correct permissions (Entries: Create, Update, Publish)');
      } else if (error.response.status === 404) {
        console.log('\n💡 Content type "homepage" not found.');
        console.log('Please run the create-homepage-contenttype script first:');
        console.log('  npm run create-homepage');
      } else if (error.response.status === 422) {
        console.log('\n💡 Validation failed. Common issues:');
        console.log('- Required fields might be missing');
        console.log('- Field names might not match the content type schema');
        console.log('- Entry might already exist (homepage is a singleton)');
        console.log('\nIf entry already exists, you can:');
        console.log('1. Delete it from Contentstack Dashboard');
        console.log('2. Or manually update it through the dashboard');
      }
    } else {
      console.error('Error:', error.message);
    }
    
    process.exit(1);
  }
}

// Run the script
createHomepageEntry();

