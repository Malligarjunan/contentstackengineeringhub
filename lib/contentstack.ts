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
    // Include all references - call includeReference multiple times
    const Entries = stack.contentType('product').entry();
    
    // Include top-level references
    Entries.includeReference('icon');
    Entries.includeReference('cicd_diagram_image');
    Entries.includeReference('team_members');
    Entries.includeReference('architecture_diagrams');
    Entries.includeReference('tech_stack');
    Entries.includeReference('dependencies');
    Entries.includeReference('observability_dashboards');
    Entries.includeReference('helpful_links');
    
    // Include embedded items for RTE fields (like intro)
    Entries.includeEmbeddedItems();
    
    const result = await Entries
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
    // Include all references - call includeReference multiple times for nested fields
    const Entries = stack.contentType('product').entry();
    
    // Include top-level references
    Entries.includeReference('icon');
    Entries.includeReference('cicd_diagram_image');
    Entries.includeReference('team_members');
    Entries.includeReference('architecture_diagrams');
    Entries.includeReference('tech_stack');
    Entries.includeReference('dependencies');
    Entries.includeReference('observability_dashboards');
    Entries.includeReference('helpful_links');
    
    // Include embedded items for RTE fields (like intro)
    Entries.includeEmbeddedItems();
    
    const Query = Entries.query({ slug: slug });
    const result = await Query.find();

    if (result && result.entries && result.entries.length > 0) {
      console.log(`✅ Fetched product "${slug}" from Contentstack`);
      const product = transformProduct(result.entries[0]);
      console.log(`📝 Intro field present: ${!!product.intro}, Length: ${product.intro?.length || 0}`);
      return product;
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
 * Convert JSON RTE format to HTML
 * Handles Contentstack's JSON RTE structure and converts it to HTML
 */
function convertJsonRteToHtml(jsonRte: any): string {
  if (!jsonRte) return '';
  
  // Handle array of nodes
  if (Array.isArray(jsonRte)) {
    return jsonRte.map(node => convertNodeToHtml(node)).join('');
  }
  
  // Handle object with children
  if (jsonRte.children && Array.isArray(jsonRte.children)) {
    return jsonRte.children.map((node: any) => convertNodeToHtml(node)).join('');
  }
  
  // Handle single node
  return convertNodeToHtml(jsonRte);
}

/**
 * Convert a single JSON RTE node to HTML
 */
function convertNodeToHtml(node: any): string {
  if (!node) return '';
  
  // Handle text nodes
  if (node.text !== undefined) {
    let text = node.text;
    
    // Apply text formatting
    if (node.bold) text = `<strong>${text}</strong>`;
    if (node.italic) text = `<em>${text}</em>`;
    if (node.underline) text = `<u>${text}</u>`;
    if (node.strikethrough) text = `<s>${text}</s>`;
    if (node.code) text = `<code>${text}</code>`;
    if (node.superscript) text = `<sup>${text}</sup>`;
    if (node.subscript) text = `<sub>${text}</sub>`;
    
    return text;
  }
  
  // Handle element nodes with children
  const children = node.children ? node.children.map((child: any) => convertNodeToHtml(child)).join('') : '';
  
  switch (node.type) {
    case 'p':
    case 'paragraph':
      return `<p>${children}</p>`;
    case 'h1':
      return `<h1>${children}</h1>`;
    case 'h2':
      return `<h2>${children}</h2>`;
    case 'h3':
      return `<h3>${children}</h3>`;
    case 'h4':
      return `<h4>${children}</h4>`;
    case 'h5':
      return `<h5>${children}</h5>`;
    case 'h6':
      return `<h6>${children}</h6>`;
    case 'ul':
    case 'unordered-list':
      return `<ul>${children}</ul>`;
    case 'ol':
    case 'ordered-list':
      return `<ol>${children}</ol>`;
    case 'li':
    case 'list-item':
      return `<li>${children}</li>`;
    case 'a':
    case 'link':
      const href = node.attrs?.url || node.attrs?.href || '#';
      const target = node.attrs?.target || '_self';
      return `<a href="${href}" target="${target}">${children}</a>`;
    case 'img':
    case 'image':
      const src = node.attrs?.url || node.attrs?.src || '';
      const alt = node.attrs?.alt || '';
      return `<img src="${src}" alt="${alt}" />`;
    case 'blockquote':
      return `<blockquote>${children}</blockquote>`;
    case 'code-block':
      return `<pre><code>${children}</code></pre>`;
    case 'hr':
    case 'horizontal-rule':
      return '<hr />';
    case 'br':
    case 'break':
      return '<br />';
    case 'table':
      return `<table>${children}</table>`;
    case 'table-row':
    case 'tr':
      return `<tr>${children}</tr>`;
    case 'table-cell':
    case 'td':
      return `<td>${children}</td>`;
    case 'table-header':
    case 'th':
      return `<th>${children}</th>`;
    default:
      // For unknown types, just return children or empty string
      return children || '';
  }
}

/**
 * Transform Contentstack entry to Product type
 * Maps Contentstack field names to our Product interface
 */
function transformProduct(entry: any): Product {
  // Handle intro/introduction field - it's an RTE field that might be stored as HTML string
  // or as a rich text JSON object
  // Support both 'intro' and 'introduction' field UIDs for compatibility
  let introContent = '';
  const introField = entry.introduction || entry.intro; // Check 'introduction' first, then 'intro'
  const fieldName = entry.introduction ? 'introduction' : 'intro';
  
  if (introField) {
    console.log(`🔍 ${fieldName} field type for "${entry.title}":`, typeof introField);
    
    if (typeof introField === 'string') {
      // Direct HTML string
      introContent = introField;
      console.log(`✅ Product "${entry.title}" ${fieldName} field is HTML string (${introContent.length} chars)`);
    } else if (typeof introField === 'object') {
      // Check different object formats
      if (introField.html) {
        // Object with html property
        introContent = introField.html;
        console.log(`✅ Product "${entry.title}" ${fieldName} field has .html property (${introContent.length} chars)`);
      } else if (introField.children || Array.isArray(introField)) {
        // JSON RTE format - attempt basic conversion
        console.log(`⚠️  ${fieldName} field is in JSON RTE format, attempting basic conversion`);
        try {
          // Basic JSON RTE to HTML conversion
          introContent = convertJsonRteToHtml(introField);
          if (introContent) {
            console.log(`✅ Converted JSON RTE to HTML (${introContent.length} chars)`);
          }
        } catch (error) {
          console.error('❌ Error converting JSON RTE:', error);
          introContent = '';
        }
      } else {
        // Unknown object format - log it
        console.log(`⚠️  ${fieldName} field object format:`, Object.keys(introField));
        // Try to stringify and use as-is if it looks like HTML
        const stringified = JSON.stringify(introField);
        if (stringified.includes('<') && stringified.includes('>')) {
          introContent = stringified;
        }
      }
    }
  }
  
  // Final log
  if (introContent && introContent.length > 0) {
    console.log(`✅ Product "${entry.title}" ${fieldName} field ready: ${introContent.substring(0, 100)}...`);
  } else {
    console.log(`⚠️  Product "${entry.title}" has no intro/introduction field or conversion failed`);
  }
  
  return {
    id: entry.uid || entry._id,
    title: entry.title,
    slug: entry.slug,
    shortDescription: entry.short_description || entry.shortDescription || '',
    fullDescription: entry.full_description || entry.fullDescription || '',
    intro: introContent,
    category: entry.category,
    // Handle both asset object (after migration) and string URL (before migration)
    icon: entry.icon?.url || entry.icon,
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
    // Handle both asset object (after migration) and string URL (before migration)
    cicdDiagramImage: entry.cicd_diagram_image?.url || entry.cicd_diagram_image,
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
    // Handle both asset object (after migration) and string URL (before migration)
    imageUrl: diagram.image_url?.url || diagram.image_url || diagram.imageUrl || diagram.image?.url || '',
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
    // Handle both asset object (after migration) and string URL (before migration)
    avatar: member.avatar?.url || member.avatar || member.avatar_url || member.avatarUrl,
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
    // Include references
    const Entries = stack.contentType('homepage').entry();
    Entries.includeReference('architecture_diagrams');
    
    const result = await Entries.find();

    if (result && result.entries && result.entries.length > 0) {
      const entry = result.entries[0];
      console.log('✅ Fetched homepage content from Contentstack');
      
      // Transform release process group field
      let releaseProcess = null;
      if (entry.release_process) {
        releaseProcess = {
          diagram: entry.release_process.diagram?.url || entry.release_process.diagram,
          code: entry.release_process.code,
          description: entry.release_process.description
        };
      }
      
      return {
        heroTitle: entry.hero_title || entry.heroTitle,
        heroDescription: entry.hero_description || entry.heroDescription,
        platformVideoUrl: entry.platform_video_url || entry.platformVideoUrl,
        aboutContentstack: entry.about_contentstack || entry.aboutContentstack,
        architectureDiagrams: transformArchitectureDiagrams(
          entry.architecture_diagrams || entry.architectureDiagrams || []
        ),
        releaseProcess: releaseProcess,
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

