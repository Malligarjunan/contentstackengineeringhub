#!/usr/bin/env node

/**
 * Script to update the homepage entry with enhanced content
 * This populates all the new fields added to the homepage content type
 */

require('dotenv').config();
const contentstack = require('@contentstack/management');

const client = contentstack.client();

// Configuration
const STACK_API_KEY = process.env.CONTENTSTACK_API_KEY;
const MANAGEMENT_TOKEN = process.env.CONTENTSTACK_MANAGEMENT_TOKEN;
const CONTENT_TYPE_UID = 'homepage';
const ENVIRONMENT = process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'production';

async function updateHomepageEntry() {
  try {
    console.log('🔄 Updating homepage entry...\n');

    // Initialize the stack
    const stack = client.stack({ 
      api_key: STACK_API_KEY,
      management_token: MANAGEMENT_TOKEN
    });

    // Get all entries for homepage content type
    const Query = stack.contentType(CONTENT_TYPE_UID).entry().query();
    const result = await Query.find();

    if (!result.items || result.items.length === 0) {
      console.error('❌ No homepage entry found. Please create one first.');
      process.exit(1);
    }

    // Get the first (and should be only) homepage entry
    const homepageEntry = stack.contentType(CONTENT_TYPE_UID).entry(result.items[0].uid);
    const entry = await homepageEntry.fetch();

    console.log(`✅ Found homepage entry: ${entry.uid}\n`);

    // Prepare the updated entry data
    const updatedData = {
      // Hero Section
      hero_badge_text: 'Internal Engineering Resource',

      // Features Section
      features_section_title: 'Everything You Need to Know',
      features_section_description: 'Comprehensive information about every Contentstack product, team, and process — all in one place',
      feature_cards: [
        {
          title: 'Team Information',
          description: 'Team members, roles, contacts, and organizational structure for every product team',
          icon_name: 'team',
          color: 'purple'
        },
        {
          title: 'Engineering Processes',
          description: 'CI/CD pipelines, sprint processes, git workflows, and deployment procedures',
          icon_name: 'documentation',
          color: 'blue'
        },
        {
          title: 'Technical Documentation',
          description: 'Architecture diagrams, tech stack details, API references, and local dev setup',
          icon_name: 'code',
          color: 'green'
        },
        {
          title: 'QA & Testing Strategies',
          description: 'Test strategies, automation frameworks, quality guidelines, and testing tools',
          icon_name: 'qa',
          color: 'pink'
        },
        {
          title: 'Best Practices & Guidelines',
          description: 'Team practices, coding standards, documentation guidelines, and conventions',
          icon_name: 'practices',
          color: 'orange'
        },
        {
          title: 'Team Dependencies',
          description: 'Cross-team dependencies, contact points for DevOps, Platform, and other teams',
          icon_name: 'dependencies',
          color: 'cyan'
        }
      ],

      // Products Section
      products_section_badge: 'Product Catalog',
      products_section_title: 'Browse Products by Category',
      products_section_description: 'Access detailed information about each product including teams, tech stack, processes, and guidelines',

      // Architecture Section
      architecture_section_badge: 'Platform Architecture',
      architecture_section_title: 'Built for Scale.',
      architecture_section_subtitle: 'Designed for Speed.',
      architecture_section_description: 'Explore our microservices architecture, cloud-native infrastructure, and the technical decisions that power millions of digital experiences worldwide.',
      architecture_principles_title: 'Core Architecture Principles',
      architecture_principles: [
        {
          title: 'Microservices Architecture',
          description: 'Independent, scalable services for each product'
        },
        {
          title: 'Global CDN Distribution',
          description: 'Content delivered from edge locations worldwide'
        },
        {
          title: 'Real-time Data Pipeline',
          description: 'Instant data processing and analytics'
        },
        {
          title: 'Edge Computing Layer',
          description: 'Processing at the edge for minimal latency'
        }
      ],
      main_architecture_image_url: 'https://images.contentstack.io/v3/assets/blt23180bf2502c7444/bltb686bd66a92b4622/6387093e12a129103e952064/Contentstack-powered_Website_-_Layered_Architecture.jpg',
      architecture_image_title: 'Contentstack Layered Architecture',
      architecture_image_description: 'Multi-tier architecture delivering content at scale globally',

      // Video Section
      video_section_badge: 'Platform Overview',
      video_section_title: 'Understanding Contentstack',
      video_section_description: 'New to the team? Watch this video to understand the Contentstack platform and architecture',

      // Quick Access Resources
      resources_section_title: 'Quick Access Resources',
      resources_section_description: 'Frequently accessed documentation, tools, and resources for daily work',
      quick_access_resources: [
        {
          title: 'API Docs',
          description: 'Complete API reference',
          link_url: 'https://www.contentstack.com/docs',
          icon_name: 'api_docs',
          color: 'purple'
        },
        {
          title: 'Architecture',
          description: 'System diagrams',
          link_url: '#architecture',
          icon_name: 'architecture',
          color: 'blue'
        },
        {
          title: 'Best Practices',
          description: 'Team guidelines',
          link_url: '/products',
          icon_name: 'best_practices',
          color: 'green'
        },
        {
          title: 'Team Contacts',
          description: 'Who to reach out',
          link_url: '/products',
          icon_name: 'team_contacts',
          color: 'orange'
        }
      ],

      // CTA Section
      cta_section_badge: 'For Contentstack Team Members',
      cta_section_title: 'Have Questions or Suggestions?',
      cta_section_description: 'This knowledge hub is maintained by the engineering team. If you notice outdated information or want to contribute, reach out to your team lead or submit a pull request.'
    };

    // Merge with existing data (preserve existing fields)
    Object.keys(updatedData).forEach(key => {
      entry[key] = updatedData[key];
    });

    // Update the entry
    const result2 = await entry.update();
    console.log('✅ Homepage entry updated successfully!\n');

    // Publish the entry
    console.log('📢 Publishing entry...');
    await entry.publish({
      publishDetails: {
        environments: [ENVIRONMENT],
        locales: ['en-us']
      }
    });
    
    console.log(`✅ Entry published to ${ENVIRONMENT} environment!\n`);

    console.log('📋 Summary:');
    console.log(`   Entry UID: ${result2.uid}`);
    console.log(`   Title: ${result2.title}`);
    console.log('   Updated sections:');
    console.log('   ✓ Hero badge text');
    console.log('   ✓ Features section (6 cards)');
    console.log('   ✓ Products section');
    console.log('   ✓ Architecture section (4 principles)');
    console.log('   ✓ Video section');
    console.log('   ✓ Quick access resources (4 resources)');
    console.log('   ✓ CTA section\n');

    console.log('🎯 Next step:');
    console.log('   Update app/page.tsx to use these new Contentstack fields\n');

  } catch (error) {
    console.error('❌ Error updating homepage entry:', error.message);
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
updateHomepageEntry();

