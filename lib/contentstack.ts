import Contentstack, { Region } from 'contentstack';
import { Product } from '@/types/product';
import { products as localProducts } from '@/data/products';
import { homepageContent as localHomepageContent } from '@/data/homepage';

// Lazy initialization of Contentstack Stack
let Stack: any = null;

function getStack() {
  // Return existing instance if already initialized
  if (Stack) return Stack;

  // Check if Contentstack is configured
  const isConfigured = 
    process.env.CONTENTSTACK_API_KEY &&
    process.env.CONTENTSTACK_DELIVERY_TOKEN;

  if (!isConfigured) {
    console.log('⚠️  Contentstack credentials not configured. Using local data.');
    return null;
  }

  // Initialize Contentstack SDK
  try {
    Stack = Contentstack.Stack({
      api_key: process.env.CONTENTSTACK_API_KEY!,
      delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN!,
      environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'production',
      region: Region.US,
    });
    console.log('✅ Contentstack SDK initialized successfully');
    return Stack;
  } catch (error) {
    console.error('❌ Error initializing Contentstack:', error);
    return null;
  }
}

/**
 * Fetch all products from Contentstack
 * Falls back to local data if Contentstack is not configured
 */
export async function getAllProducts(): Promise<Product[]> {
  const stack = getStack();
  
  // Fallback to local data if Contentstack is not configured
  if (!stack) {
    return localProducts;
  }

  try {
    const Query = stack.ContentType('product').Query();
    const result = await Query
      .includeReference([
        'team_members',
        'architecture_diagrams',
        'tech_stack',
        'dependencies',
        'observability_dashboards',
        'helpful_links'
      ])
      .toJSON()
      .find();

    if (result && result[0]) {
      console.log(`✅ Fetched ${result[0].length} products from Contentstack`);
      return result[0].map(transformProduct);
    }

    console.log('⚠️  No products found in Contentstack, using local data');
    return localProducts;
  } catch (error) {
    console.error('❌ Error fetching products from Contentstack:', error);
    console.log('Falling back to local data');
    return localProducts;
  }
}

/**
 * Fetch a single product by slug
 * Falls back to local data if Contentstack is not configured
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const stack = getStack();
  
  // Fallback to local data if Contentstack is not configured
  if (!stack) {
    return localProducts.find(p => p.slug === slug) || null;
  }

  try {
    const Query = stack.ContentType('product').Query();
    const result = await Query
      .where('slug', slug)
      .includeReference([
        'team_members',
        'architecture_diagrams',
        'tech_stack',
        'dependencies',
        'observability_dashboards',
        'helpful_links'
      ])
      .toJSON()
      .find();

    if (result && result[0] && result[0].length > 0) {
      console.log(`✅ Fetched product "${slug}" from Contentstack`);
      return transformProduct(result[0][0]);
    }

    console.log(`⚠️  Product "${slug}" not found in Contentstack, using local data`);
    return localProducts.find(p => p.slug === slug) || null;
  } catch (error) {
    console.error(`❌ Error fetching product with slug "${slug}":`, error);
    console.log('Falling back to local data');
    return localProducts.find(p => p.slug === slug) || null;
  }
}

/**
 * Get all product slugs for static page generation
 * Falls back to local data if Contentstack is not configured
 */
export async function getAllProductSlugs(): Promise<string[]> {
  const stack = getStack();
  
  // Fallback to local data if Contentstack is not configured
  if (!stack) {
    return localProducts.map(p => p.slug);
  }

  try {
    const Query = stack.ContentType('product').Query();
    const result = await Query
      .only(['slug'])
      .toJSON()
      .find();

    if (result && result[0]) {
      console.log(`✅ Fetched ${result[0].length} product slugs from Contentstack`);
      return result[0].map((entry: any) => entry.slug);
    }

    console.log('⚠️  No product slugs found in Contentstack, using local data');
    return localProducts.map(p => p.slug);
  } catch (error) {
    console.error('❌ Error fetching product slugs:', error);
    console.log('Falling back to local data');
    return localProducts.map(p => p.slug);
  }
}

/**
 * Transform Contentstack entry to Product type
 * Maps Contentstack field names to our Product interface
 */
function transformProduct(entry: any): Product {
  return {
    id: entry.uid || entry._id,
    title: entry.title,
    slug: entry.slug,
    shortDescription: entry.short_description || entry.shortDescription || '',
    fullDescription: entry.full_description || entry.fullDescription || '',
    category: entry.category,
    icon: entry.icon,
    color: entry.color || '#6C5CE7',

    // Media & Learning
    videoUrl: entry.video_url || entry.videoUrl,
    academyUrl: entry.academy_url || entry.academyUrl,

    // Technical Details
    techStack: transformTechStack(entry.tech_stack || entry.techStack || []),
    architectureDiagrams: transformArchitectureDiagrams(
      entry.architecture_diagrams || entry.architectureDiagrams || []
    ),

    // Development
    repositoryUrl: entry.repository_url || entry.repositoryUrl,
    localDevSetup: entry.local_dev_setup || entry.localDevSetup || '',
    cicdProcess: entry.cicd_process || entry.cicdProcess || '',
    cicdDiagramUrl: entry.cicd_diagram_url || entry.cicdDiagramUrl,
    cicdDiagramImage: entry.cicd_diagram_image || entry.cicdDiagramImage,
    gitBranchingStrategy: entry.git_branching_strategy || entry.gitBranchingStrategy || '',

    // Observability
    observabilityDashboards: transformObservabilityDashboards(
      entry.observability_dashboards || entry.observabilityDashboards || []
    ),

    // Team Information
    teamMembers: transformTeamMembers(entry.team_members || entry.teamMembers || []),
    teamPractices: entry.team_practices || entry.teamPractices || [],
    guidelines: entry.guidelines || [],

    // QA Information
    testStrategies: entry.test_strategies || entry.testStrategies || [],
    testingTools: entry.testing_tools || entry.testingTools || [],

    // Process
    sprintProcess: entry.sprint_process || entry.sprintProcess || '',

    // Dependencies
    dependencies: transformDependencies(entry.dependencies || []),

    // Helpful Links
    helpfulLinks: transformHelpfulLinks(entry.helpful_links || entry.helpfulLinks || []),
  };
}

function transformTechStack(techStack: any[]): any[] {
  return techStack.map((item: any) => ({
    category: item.category,
    technologies: item.technologies || [],
  }));
}

function transformArchitectureDiagrams(diagrams: any[]): any[] {
  return diagrams.map((diagram: any) => ({
    title: diagram.title,
    description: diagram.description,
    imageUrl: diagram.image_url || diagram.imageUrl || diagram.image?.url || '',
    details: diagram.details,
    whimsicalUrl: diagram.whimsical_url || diagram.whimsicalUrl,
  }));
}

function transformObservabilityDashboards(dashboards: any[]): any[] {
  return dashboards.map((dashboard: any) => ({
    name: dashboard.name,
    url: dashboard.url,
    description: dashboard.description,
    type: dashboard.type || 'custom',
  }));
}

function transformTeamMembers(members: any[]): any[] {
  return members.map((member: any) => ({
    name: member.name,
    role: member.role,
    email: member.email,
    avatar: member.avatar || member.avatar_url || member.avatarUrl,
  }));
}

function transformDependencies(dependencies: any[]): any[] {
  return dependencies.map((dep: any) => ({
    team: dep.team,
    description: dep.description,
    contacts: dep.contacts || [],
    slackChannel: dep.slack_channel || dep.slackChannel,
  }));
}

function transformHelpfulLinks(links: any[]): any[] {
  return links.map((link: any) => ({
    title: link.title,
    url: link.url,
    description: link.description,
  }));
}

/**
 * Fetch homepage content from Contentstack
 * Falls back to local data if Contentstack is not configured
 */
export async function getHomepageContent(): Promise<any> {
  const stack = getStack();
  
  // Fallback to local data if Contentstack is not configured
  if (!stack) {
    return localHomepageContent;
  }

  try {
    const Query = stack.ContentType('homepage').Query();
    const result = await Query
      .includeReference(['architecture_diagrams'])
      .toJSON()
      .find();

    if (result && result[0] && result[0].length > 0) {
      const entry = result[0][0];
      console.log('✅ Fetched homepage content from Contentstack');
      return {
        heroTitle: entry.hero_title || entry.heroTitle,
        heroDescription: entry.hero_description || entry.heroDescription,
        platformVideoUrl: entry.platform_video_url || entry.platformVideoUrl,
        aboutContentstack: entry.about_contentstack || entry.aboutContentstack,
        architectureDiagrams: transformArchitectureDiagrams(
          entry.architecture_diagrams || entry.architectureDiagrams || []
        ),
      };
    }

    console.log('⚠️  No homepage content found in Contentstack, using local data');
    return localHomepageContent;
  } catch (error) {
    console.error('❌ Error fetching homepage content:', error);
    console.log('Falling back to local data');
    return localHomepageContent;
  }
}

// Export getStack function for advanced usage if needed
export { getStack };

