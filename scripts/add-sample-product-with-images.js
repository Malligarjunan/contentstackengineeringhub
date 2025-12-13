require('dotenv').config();
const contentstack = require('@contentstack/management');

const API_KEY = process.env.CONTENTSTACK_API_KEY;
const MANAGEMENT_TOKEN = process.env.CONTENTSTACK_MANAGEMENT_TOKEN;
const ENVIRONMENT = process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'production';

const client = contentstack.client();
const stack = client.stack({ api_key: API_KEY, management_token: MANAGEMENT_TOKEN });

// Sample product with image URLs
const sampleProduct = {
  title: "Content Management API (CMA)",
  slug: "cma",
  short_description: "Manage and create content programmatically with our comprehensive Content Management API.",
  full_description: "The Content Management API enables developers to programmatically create, read, update, and delete content in Contentstack. It provides full control over content types, entries, assets, and more.",
  category: "CMS",
  icon: "https://api.dicebear.com/7.x/shapes/svg?seed=CMA",
  color: "#6C5CE7",
  video_url: "https://www.youtube.com/watch?v=AHrK21gNhE4",
  academy_url: "https://www.contentstack.com/academy/content-management-api",
  cicd_diagram_url: "https://whimsical.com/cma-cicd-pipeline",
  cicd_diagram_image: "https://via.placeholder.com/1200x600/6C5CE7/FFFFFF?text=CMA+CI/CD+Pipeline",
  local_dev_setup: "# Prerequisites\n- Node.js 18+\n- MongoDB 6.0+\n- Redis 7.0+",
  cicd_process: "GitHub Actions with automated testing, security scanning, and staged deployments.",
  git_branching_strategy: "Git Flow: main (production), develop (integration), feature/* (new features)",
  sprint_process: "2-week sprints with sprint planning, daily standups, and retrospectives",
  tech_stack: [
    {
      category: "Backend",
      technologies: ["Node.js", "TypeScript", "Express", "MongoDB", "Redis"]
    },
    {
      category: "Testing",
      technologies: ["Jest", "Mocha", "Postman"]
    }
  ],
  architecture_diagrams: [
    {
      title: "CMA Request Flow",
      description: "End-to-end flow of API requests through authentication, validation, and data persistence",
      image_url: "https://via.placeholder.com/1200x800/6C5CE7/FFFFFF?text=CMA+Architecture",
      details: "Shows the complete request lifecycle",
      whimsical_url: "https://whimsical.com/cma-flow"
    }
  ],
  repositories: [
    {
      repo_name: "Content Management API",
      repo_description: "Main backend repository",
      repo_url: "https://github.com/contentstack/cma"
    }
  ],
  team_members: [
    {
      name: "John Doe",
      role: "Tech Lead",
      email: "john.doe@contentstack.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
    },
    {
      name: "Jane Smith",
      role: "Senior Engineer",
      email: "jane.smith@contentstack.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
    }
  ],
  team_practices: [
    "Daily standups at 10 AM",
    "Code reviews required for all PRs",
    "Weekly tech sync meetings"
  ],
  guidelines: [
    "Follow TypeScript best practices",
    "Write unit tests for all new features",
    "Document API changes"
  ],
  test_strategies: [
    "Unit testing with Jest",
    "Integration testing with Postman",
    "E2E testing with Cypress"
  ],
  testing_tools: ["Jest", "Mocha", "Postman", "Newman", "Cypress"],
  dependencies: [
    {
      team: "Platform Team",
      description: "Core platform services",
      contacts: ["platform@contentstack.com"],
      slack_channel: "#platform-support"
    }
  ],
  helpful_links: [
    {
      title: "API Documentation",
      url: "https://www.contentstack.com/docs/developers/apis/content-management-api",
      description: "Complete API reference"
    }
  ],
  observability_dashboards: [
    {
      name: "CMA Performance Dashboard",
      url: "https://grafana.contentstack.com/d/cma-performance",
      description: "API response times and throughput",
      type: "grafana"
    }
  ]
};

async function addSampleProduct() {
  console.log('🚀 Adding sample product with images...\n');

  try {
    // Check if entry already exists
    const existingEntries = await stack
      .contentType('product')
      .entry()
      .query({ query: { slug: sampleProduct.slug } })
      .find();

    if (existingEntries.items && existingEntries.items.length > 0) {
      console.log('♻️  Product already exists, updating...');
      const existingEntry = existingEntries.items[0];
      
      const entry = await stack
        .contentType('product')
        .entry(existingEntry.uid)
        .fetch();
      
      Object.assign(entry, sampleProduct);
      await entry.update();
      
      console.log(`✅ Updated: ${sampleProduct.title} (UID: ${existingEntry.uid})`);
    } else {
      console.log('➕ Creating new product entry...');
      
      const entry = await stack
        .contentType('product')
        .entry()
        .create({ entry: sampleProduct });
      
      console.log(`✅ Created: ${sampleProduct.title} (UID: ${entry.uid})`);
      
      // Publish the entry
      try {
        await stack
          .contentType('product')
          .entry(entry.uid)
          .publish({ 
            publishDetails: {
              environments: [ENVIRONMENT],
              locales: ['en-us']
            }
          });
        console.log(`📤 Published to ${ENVIRONMENT}`);
      } catch (publishError) {
        console.log(`⚠️  Created but not published: ${publishError.message}`);
      }
    }

    console.log('\n✅ Sample product added successfully!');
    console.log('\n💡 Next steps:');
    console.log('   1. Check the entry in Contentstack Dashboard');
    console.log('   2. Run image migration: npm run migrate-images');
    console.log('   3. You should see assets being uploaded!');
    console.log('\n📝 Note: This sample uses placeholder images from:');
    console.log('   - via.placeholder.com (for diagrams)');
    console.log('   - api.dicebear.com (for avatars)');
    console.log('   These will be downloaded and uploaded to Contentstack assets.');

  } catch (error) {
    console.error('❌ Error adding sample product:', error.message);
    if (error.response && error.response.data) {
      console.error('Error details:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

addSampleProduct();

