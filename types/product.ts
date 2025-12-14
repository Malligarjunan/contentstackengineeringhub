// Product content type schema - designed to match Contentstack CMS structure
export interface TeamMember {
  name: string;
  role: string;
  email: string;
  avatar?: string;
}

export interface ContactInfo {
  team: string;
  description: string;
  contacts: string[];
  slackChannel?: string;
}

export interface TechStack {
  category: string;
  technologies: string[];
}

export interface ArchitectureDiagram {
  title: string;
  description: string;
  imageUrl: string;
  details?: string;
  whimsicalUrl?: string;
}

export interface ObservabilityDashboard {
  name: string;
  url: string;
  description: string;
  type: 'grafana' | 'datadog' | 'newrelic' | 'custom';
}

export interface ExternalLink {
  title: string;
  url: string;
  description?: string;
}

export interface Repository {
  repoName: string;
  repoDescription?: string;
  repoUrl: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  intro?: string; // Rich text introduction for product detail page
  category: string;
  icon?: string;
  color: string; // For theming each product card
  
  // Media & Learning
  videoUrl?: string; // YouTube or video URL
  academyUrl?: string; // Contentstack Academy link
  
  // Technical Details
  techStack: TechStack[];
  architectureDiagrams: ArchitectureDiagram[];
  
  // Development
  repositories?: Repository[];
  localDevSetup: string;
  cicdProcess: string;
  cicdDiagramUrl?: string; // Whimsical or diagram tool link
  cicdDiagramImage?: string; // CI/CD diagram image
  gitBranchingStrategy: string;
  
  // Observability
  observabilityDashboards?: ObservabilityDashboard[];
  
  // Team Information
  teamMembers: TeamMember[];
  teamPractices: string[];
  guidelines: string[];
  
  // QA Information
  testStrategies: string[];
  testingTools: string[];
  
  // Process
  sprintProcess: string;
  
  // Dependencies
  dependencies: ContactInfo[];
  
  // Helpful External Links
  helpfulLinks?: ExternalLink[];
}

export interface ReleaseProcess {
  diagram?: string; // URL to the release process diagram image
  code?: string; // Mermaid diagram code
  description?: string; // HTML/RTE content describing the release process
}

export interface HomePageContent {
  // Hero Section
  hero_badge_text?: string;
  hero_title: string;
  hero_description: string;
  
  // Feature Cards
  feature_cards?: any[];
  features_section_title?: string;
  features_section_description?: string;
  
  // Products Section
  products_section_badge?: string;
  products_section_title?: string;
  products_section_description?: string;
  
  // Platform Overview & About
  platform_video_url?: string;
  about_contentstack: string;
  
  // Architecture Section
  architecture_section_badge?: string;
  architecture_section_title?: string;
  architecture_section_subtitle?: string;
  architecture_section_description?: string;
  architecture_principles?: any[];
  architecture_principles_title?: string;
  main_architecture_image_url?: string;
  architecture_image_title?: string;
  architecture_image_description?: string;
  architecture_diagrams: ArchitectureDiagram[];
  
  // Quick Access Resources
  quick_access_resources?: any[];
  resources_section_title?: string;
  resources_section_description?: string;
  
  // CTA Section
  cta_section_badge?: string;
  cta_section_title?: string;
  cta_section_description?: string;
  
  // Release Process
  release_process?: ReleaseProcess; // Group field containing diagram, code, and description
}

