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

export interface HomePageContent {
  heroTitle: string;
  heroDescription: string;
  platformVideoUrl?: string;
  aboutContentstack: string;
  architectureDiagrams: ArchitectureDiagram[];
}

