import contentstack, { Region } from '@contentstack/delivery-sdk';
import { Product } from '@/types/product';
import { products as localProducts } from '@/data/products';
import { homepageContent as localHomepageContent } from '@/data/homepage';

// Lazy initialization of Contentstack Stack
let ContentstackStack: any = null;

function getStack() {
  // Return existing instance if already initialized
  if (ContentstackStack) return ContentstackStack;

  // Check if Contentstack is configured
  const isConfigured = 
    process.env.CONTENTSTACK_API_KEY &&
    process.env.CONTENTSTACK_DELIVERY_TOKEN;

  if (!isConfigured) {
    console.log('⚠️  Contentstack credentials not configured. Using local data.');
    return null;
  }

  // Check if Live Preview is enabled
  const livePreviewEnabled = process.env.CONTENTSTACK_LIVE_PREVIEW_ENABLED === 'true';
  const livePreviewToken = process.env.CONTENTSTACK_LIVE_PREVIEW_TOKEN || '';
  const livePreviewHost = process.env.CONTENTSTACK_LIVE_PREVIEW_HOST || 'api.contentstack.io';

  // Initialize Contentstack SDK
  try {
    const stackConfig: any = {
      apiKey: process.env.CONTENTSTACK_API_KEY!,
      deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN!,
      environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'production',
      region: Region.US,
    };

    // Add Live Preview configuration if enabled
    if (livePreviewEnabled && livePreviewToken) {
      stackConfig.live_preview = {
        enable: true,
        preview_token: livePreviewToken,
        host: livePreviewHost,
      };
      console.log('✅ Live Preview enabled for Contentstack SDK');
    }

    ContentstackStack = contentstack.stack(stackConfig);
    console.log('✅ Contentstack SDK initialized successfully');
    return ContentstackStack;
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
    const Query = stack.contentType('product').entry()
      .includeReference([
        'team_members',
        'architecture_diagrams',
        'tech_stack',
        'dependencies',
        'observability_dashboards',
        'helpful_links'
      ]);
    const result = await Query
      .orderByAscending('title')
      .includeCount()
      .find();

    if (result && result.entries) {
      console.log(`✅ Fetched ${result.entries.length} products from Contentstack (sorted by title)`);
      return result.entries.map(transformProduct);
    }

    console.log('⚠️  No products found in Contentstack, using local data');
    return [...localProducts].sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error('❌ Error fetching products from Contentstack:', error);
    console.log('Falling back to local data');
    return [...localProducts].sort((a, b) => a.title.localeCompare(b.title));
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
    const Query = stack.contentType('product').entry()
      .includeReference([
        'team_members',
        'architecture_diagrams',
        'tech_stack',
        'dependencies',
        'observability_dashboards',
        'helpful_links'
      ])
      .query({ slug: slug });
    const result = await Query.find();

    if (result && result.entries && result.entries.length > 0) {
      console.log(`✅ Fetched product "${slug}" from Contentstack`);
      return transformProduct(result.entries[0]);
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
    const Query = stack.contentType('product').entry()
      .only(['slug', 'title']);
    const result = await Query
      .orderByAscending('title')
      .find();

    if (result && result.entries) {
      console.log(`✅ Fetched ${result.entries.length} product slugs from Contentstack (sorted by title)`);
      return result.entries.map((entry: any) => entry.slug);
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
    repositories: transformRepositories(entry.repositories || []),
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

function transformRepositories(repositories: any[]): any[] {
  if (!Array.isArray(repositories)) return [];
  return repositories.map((repo: any) => ({
    repoName: repo.repo_name || repo.repoName || '',
    repoDescription: repo.repo_description || repo.repoDescription || '',
    repoUrl: repo.repo_url || repo.repoUrl || '',
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
    const Query = stack.contentType('homepage').entry()
      .includeReference(['architecture_diagrams']);
    const result = await Query.find();

    if (result && result.entries && result.entries.length > 0) {
      const entry = result.entries[0];
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

