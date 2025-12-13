import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "cma",
    title: "Content Management API (CMA)",
    slug: "cma",
    shortDescription: "Manage and create content programmatically with our comprehensive Content Management API.",
    fullDescription: "The Content Management API enables developers to programmatically create, read, update, and delete content in Contentstack. It provides full control over content types, entries, assets, and more.",
    category: "CMS",
    color: "#6C5CE7",
    videoUrl: "https://www.youtube.com/watch?v=AHrK21gNhE4",
    academyUrl: "https://www.contentstack.com/academy/content-management-api",
    cicdDiagramUrl: "https://whimsical.com/cma-cicd-pipeline",
    cicdDiagramImage: "/diagrams/cma-cicd.png",
    observabilityDashboards: [
      {
        name: "CMA Performance Dashboard",
        url: "https://grafana.contentstack.com/d/cma-performance",
        description: "API response times, throughput, and error rates",
        type: "grafana"
      },
      {
        name: "CMA Resource Usage",
        url: "https://datadog.contentstack.com/dashboard/cma-resources",
        description: "CPU, memory, and database metrics",
        type: "datadog"
      }
    ],
    techStack: [
      {
        category: "Backend",
        technologies: ["Node.js", "TypeScript", "Express", "MongoDB", "Redis"]
      },
      {
        category: "Launch",
        technologies: ["AWS", "Kubernetes", "Docker", "CloudFront"]
      },
      {
        category: "Testing",
        technologies: ["Jest", "Mocha", "Postman", "Newman"]
      }
    ],
    architectureDiagrams: [
      {
        title: "CMA Request Flow",
        description: "End-to-end flow of API requests through authentication, validation, and data persistence",
        imageUrl: "/architecture/cma-flow.png"
      }
    ],
    repositories: [
      {
        repoName: "Content Management API",
        repoDescription: "Main backend repository for the Content Management API",
        repoUrl: "https://github.com/contentstack/cma"
      }
    ],
    localDevSetup: `
# Prerequisites
- Node.js 18+
- MongoDB 6.0+
- Redis 7.0+

# Setup Steps
1. Clone the repository
2. Install dependencies: npm install
3. Copy .env.example to .env
4. Configure database connections
5. Run migrations: npm run migrate
6. Start dev server: npm run dev
    `,
    cicdProcess: "GitHub Actions with automated testing, security scanning, and staged deployments to dev → staging → production environments.",
    gitBranchingStrategy: "Git Flow: main (production), develop (integration), feature/* (new features), hotfix/* (urgent fixes)",
    teamMembers: [
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
      },
      { 
        name: "Mike Johnson", 
        role: "QA Lead", 
        email: "mike.johnson@contentstack.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
      }
    ],
    teamPractices: [
      "Daily standups at 10 AM",
      "Code reviews required for all PRs",
      "Weekly tech sync meetings",
      "Pair programming for complex features"
    ],
    guidelines: [
      "Follow RESTful API design principles",
      "Maintain backward compatibility",
      "Write comprehensive unit tests (>80% coverage)",
      "Document all API endpoints in Swagger"
    ],
    testStrategies: [
      "Unit testing with Jest",
      "Integration testing with Supertest",
      "API contract testing",
      "Performance testing with k6",
      "Security testing with OWASP ZAP"
    ],
    testingTools: ["Jest", "Supertest", "Postman", "k6", "OWASP ZAP"],
    sprintProcess: "2-week sprints with sprint planning on Monday, retrospective on Friday, and daily standups",
    dependencies: [
      {
        team: "DevOps",
        description: "Infrastructure and deployment support",
        contacts: ["devops@contentstack.com"],
        slackChannel: "#devops-support"
      },
      {
        team: "Platform Team",
        description: "Core platform services and APIs",
        contacts: ["platform@contentstack.com"],
        slackChannel: "#platform-team"
      }
    ],
    helpfulLinks: [
      {
        title: "CMA API Reference",
        url: "https://www.contentstack.com/docs/developers/apis/content-management-api/",
        description: "Complete API documentation and reference"
      },
      {
        title: "Postman Collection",
        url: "https://www.postman.com/contentstack/workspace/contentstack-apis",
        description: "Ready-to-use Postman collection for testing"
      },
      {
        title: "GitHub Repository",
        url: "https://github.com/contentstack/contentstack-management-javascript",
        description: "JavaScript SDK for CMA"
      },
      {
        title: "Status Page",
        url: "https://status.contentstack.com",
        description: "Real-time API status and uptime monitoring"
      },
      {
        title: "Community Forum",
        url: "https://www.contentstack.com/community",
        description: "Ask questions and share knowledge"
      }
    ]
  },
  {
    id: "cda",
    title: "Content Delivery API (CDA)",
    slug: "cda",
    shortDescription: "High-performance API for delivering content to applications with global CDN distribution.",
    fullDescription: "Content Delivery API is optimized for fast content delivery at scale. Built on edge infrastructure, it ensures low-latency access to published content worldwide.",
    category: "CMS",
    color: "#00B894",
    videoUrl: "https://www.youtube.com/watch?v=3V-Sq7_uHXQ",
    academyUrl: "https://www.contentstack.com/academy/content-delivery-api",
    cicdDiagramUrl: "https://whimsical.com/cda-deployment-flow",
    cicdDiagramImage: "/diagrams/cda-cicd.png",
    observabilityDashboards: [
      {
        name: "CDA Global Performance",
        url: "https://grafana.contentstack.com/d/cda-global",
        description: "Edge performance and CDN cache hit rates",
        type: "grafana"
      },
      {
        name: "CDA Traffic Analytics",
        url: "https://datadog.contentstack.com/dashboard/cda-traffic",
        description: "Request volumes and geographic distribution",
        type: "datadog"
      }
    ],
    techStack: [
      {
        category: "Backend",
        technologies: ["Node.js", "GraphQL", "REST", "Redis", "Elasticsearch"]
      },
      {
        category: "Edge Computing",
        technologies: ["Cloudflare Workers", "Edge Functions", "CDN"]
      },
      {
        category: "Testing",
        technologies: ["Jest", "Artillery", "k6", "Cypress"]
      }
    ],
    architectureDiagrams: [
      {
        title: "CDA Edge Architecture",
        description: "Content delivery through global edge network with caching layers",
        imageUrl: "/architecture/cda-architecture.png"
      }
    ],
    repositories: [
      {
        repoName: "Content Delivery API",
        repoDescription: "Main repository for the Content Delivery API",
        repoUrl: "https://github.com/contentstack/cda"
      }
    ],
    localDevSetup: `
# Prerequisites
- Node.js 18+
- Redis 7.0+
- Elasticsearch 8.0+

# Setup Steps
1. Clone the repository
2. npm install
3. Configure .env with API keys
4. Start Redis and Elasticsearch
5. npm run dev
    `,
    cicdProcess: "Automated CI/CD with blue-green deployments, canary releases, and automated rollback capabilities.",
    gitBranchingStrategy: "Trunk-based development with feature flags for gradual rollouts",
    teamMembers: [
      { 
        name: "Sarah Williams", 
        role: "Engineering Manager", 
        email: "sarah.williams@contentstack.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
      },
      { 
        name: "David Chen", 
        role: "Staff Engineer", 
        email: "david.chen@contentstack.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
      }
    ],
    teamPractices: [
      "Performance monitoring and optimization",
      "On-call rotation for production support",
      "Weekly performance reviews",
      "API versioning strategy"
    ],
    guidelines: [
      "Optimize for read performance",
      "Cache-first strategy",
      "Monitor API rate limits",
      "Maintain SLA of 99.99% uptime"
    ],
    testStrategies: [
      "Load testing with k6",
      "Edge function testing",
      "Cache invalidation testing",
      "Global latency testing"
    ],
    testingTools: ["Jest", "k6", "Artillery", "Lighthouse"],
    sprintProcess: "2-week sprints with continuous deployment and feature flags",
    dependencies: [
      {
        team: "CDN Team",
        description: "CDN configuration and optimization",
        contacts: ["cdn-team@contentstack.com"],
        slackChannel: "#cdn-support"
      }
    ],
    helpfulLinks: [
      {
        title: "CDA API Documentation",
        url: "https://www.contentstack.com/docs/developers/apis/content-delivery-api/",
        description: "Complete CDA API documentation"
      },
      {
        title: "GraphQL Playground",
        url: "https://www.contentstack.com/docs/developers/apis/graphql-content-delivery-api/",
        description: "Interactive GraphQL API explorer"
      },
      {
        title: "CDN Configuration Guide",
        url: "https://www.contentstack.com/docs/developers/cdn",
        description: "Configure and optimize CDN settings"
      },
      {
        title: "Performance Best Practices",
        url: "https://www.contentstack.com/docs/developers/performance-optimization",
        description: "Tips for optimizing content delivery"
      },
      {
        title: "Rate Limiting Documentation",
        url: "https://www.contentstack.com/docs/developers/rate-limits",
        description: "API rate limits and throttling policies"
      }
    ]
  },
  {
    id: "search",
    title: "Search",
    slug: "search",
    shortDescription: "Powerful search capabilities with AI-powered relevance and filtering.",
    fullDescription: "Advanced search service providing full-text search, faceted filtering, and AI-enhanced relevance for content discovery.",
    category: "CMS",
    color: "#FF6348",
    videoUrl: "https://www.youtube.com/watch?v=S5FRjZFClVM",
    techStack: [
      {
        category: "Search Engine",
        technologies: ["Elasticsearch", "OpenSearch", "Apache Solr"]
      },
      {
        category: "Backend",
        technologies: ["Python", "FastAPI", "Node.js"]
      },
      {
        category: "AI/ML",
        technologies: ["TensorFlow", "Transformers", "Vector Search"]
      }
    ],
    architectureDiagrams: [
      {
        title: "Search Pipeline",
        description: "Content indexing and query processing pipeline",
        imageUrl: "/architecture/search-pipeline.png"
      }
    ],
    localDevSetup: `
# Prerequisites
- Python 3.10+
- Elasticsearch 8.0+
- Docker

# Setup
1. Clone repository
2. pip install -r requirements.txt
3. docker-compose up elasticsearch
4. python manage.py migrate
5. python manage.py runserver
    `,
    cicdProcess: "Jenkins pipeline with automated indexing validation and search quality metrics",
    gitBranchingStrategy: "Feature branch workflow with protected main branch",
    teamMembers: [
      { 
        name: "Alex Kumar", 
        role: "Search Engineer", 
        email: "alex.kumar@contentstack.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
      }
    ],
    teamPractices: [
      "Search relevance tuning sessions",
      "A/B testing for search results",
      "Query performance optimization"
    ],
    guidelines: [
      "Maintain search response time < 100ms",
      "Index updates within 5 seconds",
      "Support fuzzy matching and synonyms"
    ],
    testStrategies: [
      "Relevance testing",
      "Performance benchmarking",
      "Index consistency checks"
    ],
    testingTools: ["Pytest", "Elasticsearch testing tools", "Apache JMeter"],
    sprintProcess: "2-week sprints with focus on search quality metrics",
    dependencies: [
      {
        team: "Data Engineering",
        description: "Data pipeline and indexing",
        contacts: ["data-eng@contentstack.com"]
      }
    ]
  },
  {
    id: "agent-os",
    title: "Agent OS",
    slug: "agent-os",
    shortDescription: "Intelligent agent framework for automating workflows and content operations.",
    fullDescription: "Agent OS powers AI-driven automation across Contentstack, enabling intelligent agents to understand context, make decisions, and execute complex workflows.",
    category: "Automation",
    color: "#A29BFE",
    videoUrl: "https://www.youtube.com/watch?v=JVrr8dC-Vew",
    academyUrl: "https://www.contentstack.com/academy/agent-os-fundamentals",
    cicdDiagramUrl: "https://whimsical.com/agent-os-pipeline",
    cicdDiagramImage: "/diagrams/agent-os-cicd.png",
    observabilityDashboards: [
      {
        name: "Agent Execution Metrics",
        url: "https://grafana.contentstack.com/d/agent-os-execution",
        description: "Agent task completion rates and execution times",
        type: "grafana"
      },
      {
        name: "AI Model Performance",
        url: "https://datadog.contentstack.com/dashboard/agent-ai-metrics",
        description: "LLM token usage and response quality",
        type: "datadog"
      }
    ],
    techStack: [
      {
        category: "AI/ML",
        technologies: ["LangChain", "OpenAI", "Anthropic Claude", "Vector DB"]
      },
      {
        category: "Backend",
        technologies: ["Python", "FastAPI", "Node.js", "PostgreSQL"]
      },
      {
        category: "Orchestration",
        technologies: ["Temporal", "RabbitMQ", "Redis"]
      }
    ],
    architectureDiagrams: [
      {
        title: "Agent Architecture",
        description: "AI agent reasoning loop and tool integration",
        imageUrl: "/architecture/agent-os.png"
      }
    ],
    localDevSetup: `
# Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- OpenAI API Key

# Setup
1. Clone repository
2. pip install -r requirements.txt
3. Copy .env.example to .env and add API keys
4. npm install (for UI components)
5. python manage.py migrate
6. python manage.py runserver
    `,
    cicdProcess: "GitLab CI/CD with ML model versioning and automated quality checks",
    gitBranchingStrategy: "Main + develop branches with feature branches",
    teamMembers: [
      { 
        name: "Emily Rodriguez", 
        role: "AI/ML Lead", 
        email: "emily.rodriguez@contentstack.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
      },
      { 
        name: "Ryan Park", 
        role: "Backend Engineer", 
        email: "ryan.park@contentstack.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan"
      }
    ],
    teamPractices: [
      "Weekly AI research sharing",
      "Model performance monitoring",
      "Prompt engineering best practices"
    ],
    guidelines: [
      "Follow responsible AI principles",
      "Monitor token usage and costs",
      "Implement fallback mechanisms",
      "Log all agent decisions for auditability"
    ],
    testStrategies: [
      "Unit tests for agent logic",
      "Integration tests with LLM mocking",
      "End-to-end workflow testing",
      "Performance and cost monitoring"
    ],
    testingTools: ["Pytest", "LangSmith", "Custom evaluation frameworks"],
    sprintProcess: "3-week sprints with research spikes and experimentation time",
    dependencies: [
      {
        team: "Platform Team",
        description: "API access and authentication",
        contacts: ["platform@contentstack.com"]
      }
    ],
    helpfulLinks: [
      {
        title: "Agent OS Documentation",
        url: "https://www.contentstack.com/docs/developers/agent-os",
        description: "Complete Agent OS documentation and guides"
      },
      {
        title: "LangChain Documentation",
        url: "https://python.langchain.com/docs/get_started/introduction",
        description: "Official LangChain framework documentation"
      },
      {
        title: "OpenAI API Reference",
        url: "https://platform.openai.com/docs/api-reference",
        description: "OpenAI API documentation for LLM integration"
      },
      {
        title: "Agent Playground",
        url: "https://playground.contentstack.com/agents",
        description: "Test and experiment with agents in a sandbox"
      },
      {
        title: "Prompt Library",
        url: "https://github.com/contentstack/agent-os-prompts",
        description: "Collection of tested prompts and templates"
      },
      {
        title: "AI Best Practices",
        url: "https://www.contentstack.com/docs/developers/ai-best-practices",
        description: "Guidelines for responsible AI implementation"
      }
    ]
  },
  {
    id: "visual-preview",
    title: "Visual Preview",
    slug: "visual-preview",
    shortDescription: "Real-time content preview in the actual website context before publishing.",
    fullDescription: "Visual Preview enables content editors to see how their content will look in production before publishing, with live editing capabilities.",
    category: "Creative Experience",
    color: "#FD79A8",
    videoUrl: "https://www.youtube.com/watch?v=SDZ8tR01yXw",
    techStack: [
      {
        category: "Frontend",
        technologies: ["React", "Next.js", "TypeScript", "WebSockets"]
      },
      {
        category: "Backend",
        technologies: ["Node.js", "Socket.io", "Redis"]
      }
    ],
    architectureDiagrams: [
      {
        title: "Preview Architecture",
        description: "Real-time preview rendering and content synchronization",
        imageUrl: "/architecture/visual-preview.png"
      }
    ],
    localDevSetup: `
# Prerequisites
- Node.js 18+
- npm or yarn

# Setup
1. Clone repository
2. npm install
3. Configure .env with CMS credentials
4. npm run dev
    `,
    cicdProcess: "GitHub Actions with Vercel deployment for preview environments",
    gitBranchingStrategy: "Git Flow with release branches",
    teamMembers: [
      { name: "Sophia Lee", role: "Frontend Lead", email: "sophia.lee@contentstack.com" }
    ],
    teamPractices: [
      "Component-driven development",
      "Visual regression testing",
      "Performance budgets"
    ],
    guidelines: [
      "Support all major browsers",
      "Optimize for low-latency updates",
      "Handle offline scenarios gracefully"
    ],
    testStrategies: [
      "Unit testing with Jest/React Testing Library",
      "E2E testing with Playwright",
      "Visual regression with Percy"
    ],
    testingTools: ["Jest", "Playwright", "Percy", "Chromatic"],
    sprintProcess: "2-week sprints with demo sessions",
    dependencies: [
      {
        team: "CMA Team",
        description: "Content API integration",
        contacts: ["cma-team@contentstack.com"]
      }
    ]
  },
  {
    id: "studio",
    title: "Visual Studio",
    slug: "studio",
    shortDescription: "Visual page builder for creating digital experiences with drag-and-drop components.",
    fullDescription: "Visual Studio empowers business users to build and launch pages visually using reusable components, without coding.",
    category: "Creative Experience",
    color: "#0984E3",
    videoUrl: "https://www.youtube.com/watch?v=XvWpGZsZh7Y",
    techStack: [
      {
        category: "Frontend",
        technologies: ["React", "TypeScript", "DnD Kit", "Canvas API"]
      },
      {
        category: "State Management",
        technologies: ["Redux Toolkit", "React Query"]
      }
    ],
    architectureDiagrams: [
      {
        title: "Studio Component System",
        description: "Component registry and rendering engine",
        imageUrl: "/architecture/studio.png"
      }
    ],
    localDevSetup: `
# Prerequisites
- Node.js 18+
- Modern browser

# Setup
1. Clone repository
2. npm install
3. npm run dev
    `,
    cicdProcess: "Continuous deployment with feature flags",
    gitBranchingStrategy: "Trunk-based with feature toggles",
    teamMembers: [
      { name: "Lucas Martinez", role: "Senior Engineer", email: "lucas.martinez@contentstack.com" }
    ],
    teamPractices: [
      "Design system consistency",
      "Accessibility-first development",
      "User testing sessions"
    ],
    guidelines: [
      "WCAG 2.1 AA compliance",
      "Keyboard navigation support",
      "Mobile-responsive components"
    ],
    testStrategies: [
      "Component testing",
      "Accessibility testing",
      "Cross-browser testing"
    ],
    testingTools: ["Jest", "Storybook", "Axe DevTools"],
    sprintProcess: "2-week sprints with user feedback loops",
    dependencies: []
  },
  {
    id: "dam",
    title: "Digital Asset Management (DAM)",
    slug: "dam",
    shortDescription: "Centralized asset management with AI-powered tagging and transformation.",
    fullDescription: "Comprehensive digital asset management system for storing, organizing, and delivering media assets at scale with intelligent metadata and transformations.",
    category: "Asset Management",
    color: "#FDCB6E",
    videoUrl: "https://www.youtube.com/watch?v=Rf3p0Gp4kxc",
    techStack: [
      {
        category: "Storage",
        technologies: ["AWS S3", "CloudFront", "ImageKit"]
      },
      {
        category: "Backend",
        technologies: ["Node.js", "Python", "PostgreSQL"]
      },
      {
        category: "AI",
        technologies: ["Computer Vision", "Auto-tagging", "Smart Crop"]
      }
    ],
    architectureDiagrams: [
      {
        title: "Asset Pipeline",
        description: "Upload, processing, and delivery pipeline for digital assets",
        imageUrl: "/architecture/dam.png"
      }
    ],
    localDevSetup: `
# Prerequisites
- Node.js 18+
- PostgreSQL 14+
- AWS credentials

# Setup
1. Clone repository
2. npm install
3. Configure AWS S3 buckets
4. Run migrations
5. npm run dev
    `,
    cicdProcess: "AWS CodePipeline with S3 deployments",
    gitBranchingStrategy: "Feature branch workflow",
    teamMembers: [
      { name: "Olivia Brown", role: "Backend Engineer", email: "olivia.brown@contentstack.com" }
    ],
    teamPractices: [
      "Asset optimization strategies",
      "CDN configuration reviews",
      "Storage cost optimization"
    ],
    guidelines: [
      "Support all common media formats",
      "Implement progressive image loading",
      "Maintain asset versioning"
    ],
    testStrategies: [
      "Upload/download testing",
      "Transformation accuracy tests",
      "Performance benchmarking"
    ],
    testingTools: ["Jest", "Sharp", "Image comparison tools"],
    sprintProcess: "2-week sprints",
    dependencies: [
      {
        team: "DevOps",
        description: "S3 and CDN management",
        contacts: ["devops@contentstack.com"]
      }
    ]
  },
  {
    id: "automation",
    title: "Automation",
    slug: "automation",
    shortDescription: "Workflow automation for content operations and publishing processes.",
    fullDescription: "Build and orchestrate complex workflows to automate repetitive content tasks, approvals, and publishing schedules.",
    category: "Automation",
    color: "#74B9FF",
    videoUrl: "https://www.youtube.com/watch?v=rwKRRuz2dEY",
    techStack: [
      {
        category: "Workflow Engine",
        technologies: ["Temporal", "Node.js", "TypeScript"]
      },
      {
        category: "Backend",
        technologies: ["GraphQL", "PostgreSQL", "Redis"]
      }
    ],
    architectureDiagrams: [
      {
        title: "Workflow Engine",
        description: "Workflow execution and state management",
        imageUrl: "/architecture/automation.png"
      }
    ],
    localDevSetup: `
# Prerequisites
- Node.js 18+
- Temporal server
- PostgreSQL

# Setup
1. Clone repository
2. npm install
3. Start Temporal: temporal server start-dev
4. npm run dev
    `,
    cicdProcess: "GitHub Actions with workflow testing",
    gitBranchingStrategy: "Main + feature branches",
    teamMembers: [
      { name: "Ethan Taylor", role: "Automation Engineer", email: "ethan.taylor@contentstack.com" }
    ],
    teamPractices: [
      "Workflow design reviews",
      "Error handling strategies",
      "Monitoring and alerting"
    ],
    guidelines: [
      "Design for idempotency",
      "Implement retry logic",
      "Log all workflow steps"
    ],
    testStrategies: [
      "Workflow integration testing",
      "Failure scenario testing",
      "Performance testing under load"
    ],
    testingTools: ["Jest", "Temporal testing tools"],
    sprintProcess: "2-week sprints",
    dependencies: []
  },
  {
    id: "super-admin",
    title: "Super Admin",
    slug: "super-admin",
    shortDescription: "Platform-wide administration console for managing organizations and system settings.",
    fullDescription: "Super Admin provides centralized control for platform administrators to manage organizations, users, features, and system-wide configurations.",
    category: "Administration",
    color: "#E17055",
    videoUrl: "https://www.youtube.com/watch?v=1jJqbwKNYbA",
    techStack: [
      {
        category: "Frontend",
        technologies: ["React", "TypeScript", "Material-UI"]
      },
      {
        category: "Backend",
        technologies: ["Node.js", "PostgreSQL", "Redis"]
      }
    ],
    architectureDiagrams: [
      {
        title: "Admin Architecture",
        description: "Multi-tenant admin system with role-based access",
        imageUrl: "/architecture/super-admin.png"
      }
    ],
    localDevSetup: `
# Prerequisites
- Node.js 18+
- PostgreSQL 14+

# Setup
1. Clone repository
2. npm install
3. Configure database
4. npm run dev
    `,
    cicdProcess: "Secure deployment pipeline with manual approvals",
    gitBranchingStrategy: "Protected main branch with strict reviews",
    teamMembers: [
      { name: "Isabella Garcia", role: "Full Stack Engineer", email: "isabella.garcia@contentstack.com" }
    ],
    teamPractices: [
      "Security-first development",
      "Audit logging for all actions",
      "Regular security reviews"
    ],
    guidelines: [
      "Implement MFA for all admins",
      "Log all administrative actions",
      "Rate limit sensitive operations"
    ],
    testStrategies: [
      "Security testing",
      "Permission boundary testing",
      "Audit log verification"
    ],
    testingTools: ["Jest", "Security scanners", "Penetration testing tools"],
    sprintProcess: "2-week sprints with security reviews",
    dependencies: []
  },
  {
    id: "org-admin",
    title: "Organization Admin",
    slug: "org-admin",
    shortDescription: "Organization-level administration for managing teams, roles, and settings.",
    fullDescription: "Organization Admin enables organization owners to manage their workspace, team members, roles, permissions, and organization-specific settings.",
    category: "Administration",
    color: "#00CEC9",
    videoUrl: "https://www.youtube.com/watch?v=8QYb4ytAVjg",
    techStack: [
      {
        category: "Frontend",
        technologies: ["React", "TypeScript", "Chakra UI"]
      },
      {
        category: "Backend",
        technologies: ["Node.js", "MongoDB", "Redis"]
      }
    ],
    architectureDiagrams: [
      {
        title: "Org Management",
        description: "Organization hierarchy and permission model",
        imageUrl: "/architecture/org-admin.png"
      }
    ],
    localDevSetup: `
# Prerequisites
- Node.js 18+
- MongoDB 6.0+

# Setup
1. Clone repository
2. npm install
3. Configure MongoDB connection
4. npm run dev
    `,
    cicdProcess: "Standard CI/CD with automated testing",
    gitBranchingStrategy: "Feature branch workflow",
    teamMembers: [
      { name: "Noah Wilson", role: "Software Engineer", email: "noah.wilson@contentstack.com" }
    ],
    teamPractices: [
      "User-centric design",
      "Regular usability testing",
      "Documentation updates"
    ],
    guidelines: [
      "Clear permission hierarchies",
      "Intuitive user management",
      "Responsive design"
    ],
    testStrategies: [
      "E2E user flows",
      "Permission testing",
      "UI/UX testing"
    ],
    testingTools: ["Cypress", "Jest", "Storybook"],
    sprintProcess: "2-week sprints",
    dependencies: []
  },
  {
    id: "growth",
    title: "Growth",
    slug: "growth",
    shortDescription: "Analytics and growth tools for user engagement and product adoption.",
    fullDescription: "Growth team tools for tracking user behavior, analyzing product usage, and driving adoption through data-driven insights and experiments.",
    category: "Platform",
    color: "#FF7675",
    videoUrl: "https://www.youtube.com/watch?v=S5FRjZFClVM",
    techStack: [
      {
        category: "Analytics",
        technologies: ["Segment", "Amplitude", "Mixpanel"]
      },
      {
        category: "Backend",
        technologies: ["Python", "Node.js", "BigQuery"]
      },
      {
        category: "Frontend",
        technologies: ["React", "D3.js", "Chart.js"]
      }
    ],
    architectureDiagrams: [
      {
        title: "Analytics Pipeline",
        description: "Event collection, processing, and visualization",
        imageUrl: "/architecture/growth.png"
      }
    ],
    localDevSetup: `
# Prerequisites
- Node.js 18+
- Python 3.10+
- BigQuery access

# Setup
1. Clone repository
2. npm install & pip install -r requirements.txt
3. Configure analytics credentials
4. npm run dev
    `,
    cicdProcess: "Data pipeline testing and deployment",
    gitBranchingStrategy: "Data science workflow with experiment branches",
    teamMembers: [
      { name: "Ava Martinez", role: "Growth Engineer", email: "ava.martinez@contentstack.com" }
    ],
    teamPractices: [
      "A/B testing methodology",
      "Data quality monitoring",
      "Experiment reviews"
    ],
    guidelines: [
      "Privacy-first data collection",
      "GDPR compliance",
      "Data retention policies"
    ],
    testStrategies: [
      "Event tracking validation",
      "Data pipeline testing",
      "Dashboard accuracy verification"
    ],
    testingTools: ["Pytest", "Jest", "Data validation tools"],
    sprintProcess: "2-week sprints with experiment cycles",
    dependencies: [
      {
        team: "Data Engineering",
        description: "Data pipeline and warehousing",
        contacts: ["data-eng@contentstack.com"]
      }
    ]
  },
  {
    id: "data-engineering",
    title: "Data Engineering",
    slug: "data-engineering",
    shortDescription: "Data infrastructure and pipelines for analytics and insights.",
    fullDescription: "Build and maintain scalable data pipelines, warehouses, and infrastructure to power analytics, reporting, and AI/ML capabilities.",
    category: "Platform",
    color: "#6C5CE7",
    videoUrl: "https://www.youtube.com/watch?v=JVrr8dC-Vew",
    techStack: [
      {
        category: "Data Pipeline",
        technologies: ["Apache Airflow", "dbt", "Apache Kafka"]
      },
      {
        category: "Data Warehouse",
        technologies: ["Snowflake", "BigQuery", "Redshift"]
      },
      {
        category: "Languages",
        technologies: ["Python", "SQL", "Scala"]
      }
    ],
    architectureDiagrams: [
      {
        title: "Data Platform Architecture",
        description: "End-to-end data platform with ETL pipelines",
        imageUrl: "/architecture/data-engineering.png"
      }
    ],
    localDevSetup: `
# Prerequisites
- Python 3.10+
- Docker
- SQL client

# Setup
1. Clone repository
2. pip install -r requirements.txt
3. docker-compose up airflow
4. Configure data source connections
5. airflow dags test
    `,
    cicdProcess: "Data pipeline CI/CD with data quality checks",
    gitBranchingStrategy: "Main branch with SQL migrations",
    teamMembers: [
      { name: "Mason Anderson", role: "Data Engineer", email: "mason.anderson@contentstack.com" }
    ],
    teamPractices: [
      "Data quality monitoring",
      "Pipeline SLA tracking",
      "Cost optimization reviews"
    ],
    guidelines: [
      "Document all data models",
      "Version control SQL",
      "Monitor pipeline performance"
    ],
    testStrategies: [
      "Data quality testing",
      "Schema validation",
      "Pipeline integration testing"
    ],
    testingTools: ["Great Expectations", "dbt test", "Custom validators"],
    sprintProcess: "2-week sprints with data model reviews",
    dependencies: []
  },
  {
    id: "ui",
    title: "UI",
    slug: "ui",
    shortDescription: "Design system and UI components library used across all Contentstack products.",
    fullDescription: "Unified design system and component library ensuring consistent user experience across the entire Contentstack platform.",
    category: "UI/UX",
    color: "#A29BFE",
    videoUrl: "https://www.youtube.com/watch?v=GLqiXMx97mY",
    techStack: [
      {
        category: "Frontend",
        technologies: ["React", "TypeScript", "Styled Components", "Storybook"]
      },
      {
        category: "Design",
        technologies: ["Figma", "Design Tokens", "CSS-in-JS"]
      }
    ],
    architectureDiagrams: [
      {
        title: "Design System Architecture",
        description: "Component library structure and theming system",
        imageUrl: "/architecture/ui-platform.png"
      }
    ],
    localDevSetup: `
# Prerequisites
- Node.js 18+
- npm or yarn

# Setup
1. Clone repository
2. npm install
3. npm run storybook
    `,
    cicdProcess: "Component publishing to npm with visual regression testing",
    gitBranchingStrategy: "Semantic versioning with changesets",
    teamMembers: [
      { name: "Emma Thompson", role: "Design Engineer", email: "emma.thompson@contentstack.com" }
    ],
    teamPractices: [
      "Design-dev collaboration",
      "Component API reviews",
      "Accessibility audits"
    ],
    guidelines: [
      "Follow design system principles",
      "WCAG 2.1 AA accessibility",
      "Support theme customization"
    ],
    testStrategies: [
      "Component unit testing",
      "Visual regression testing",
      "Accessibility testing"
    ],
    testingTools: ["Jest", "Storybook", "Chromatic", "Axe"],
    sprintProcess: "2-week sprints with design sync",
    dependencies: []
  },
  {
    id: "sdk-cli",
    title: "SDK & CLI",
    slug: "sdk-cli",
    shortDescription: "Developer tools including SDKs for multiple languages and command-line interface.",
    fullDescription: "Comprehensive SDKs in multiple programming languages and a powerful CLI for developers to interact with Contentstack programmatically.",
    category: "Developer Tools",
    color: "#00B894",
    videoUrl: "https://www.youtube.com/watch?v=XvWpGZsZh7Y",
    techStack: [
      {
        category: "SDKs",
        technologies: ["JavaScript", "Python", "Java", "PHP", ".NET", "Go"]
      },
      {
        category: "CLI",
        technologies: ["Node.js", "TypeScript", "Commander.js"]
      }
    ],
    architectureDiagrams: [
      {
        title: "SDK Architecture",
        description: "Multi-language SDK design and API abstraction",
        imageUrl: "/architecture/sdk-cli.png"
      }
    ],
    localDevSetup: `
# Prerequisites
- Node.js 18+
- Language-specific runtimes

# Setup (CLI)
1. Clone repository
2. npm install
3. npm link
4. csdx --version

# Setup (SDK)
1. Navigate to SDK directory
2. Follow language-specific setup
3. Run tests
    `,
    cicdProcess: "Multi-language testing and npm/PyPI/Maven publishing",
    gitBranchingStrategy: "Monorepo with independent versioning",
    teamMembers: [
      { name: "Liam Johnson", role: "DevTools Engineer", email: "liam.johnson@contentstack.com" }
    ],
    teamPractices: [
      "SDK design patterns",
      "Comprehensive documentation",
      "Example repository maintenance"
    ],
    guidelines: [
      "Maintain API parity across SDKs",
      "Semantic versioning",
      "Backward compatibility"
    ],
    testStrategies: [
      "Unit testing per language",
      "Integration testing against APIs",
      "Documentation testing"
    ],
    testingTools: ["Jest", "Pytest", "JUnit", "PHPUnit"],
    sprintProcess: "3-week sprints with multi-language coordination",
    dependencies: [
      {
        team: "API Teams",
        description: "API changes coordination",
        contacts: ["api-team@contentstack.com"]
      }
    ]
  },
  {
    id: "marketplace",
    title: "Marketplace",
    slug: "marketplace",
    shortDescription: "App marketplace for extensions, integrations, and custom functionality.",
    fullDescription: "Platform for discovering, installing, and managing third-party apps and integrations that extend Contentstack capabilities.",
    category: "Marketplace",
    color: "#FD79A8",
    videoUrl: "https://www.youtube.com/watch?v=1fueUU49ogU",
    techStack: [
      {
        category: "Frontend",
        technologies: ["React", "Next.js", "TypeScript"]
      },
      {
        category: "Backend",
        technologies: ["Node.js", "MongoDB", "Stripe API"]
      },
      {
        category: "App Framework",
        technologies: ["UI Extensions SDK", "App Framework SDK"]
      }
    ],
    architectureDiagrams: [
      {
        title: "Marketplace Architecture",
        description: "App discovery, installation, and execution flow",
        imageUrl: "/architecture/marketplace.png"
      }
    ],
    localDevSetup: `
# Prerequisites
- Node.js 18+
- MongoDB 6.0+

# Setup
1. Clone repository
2. npm install
3. Configure MongoDB
4. npm run dev
    `,
    cicdProcess: "App review pipeline with security scanning",
    gitBranchingStrategy: "Feature branch workflow with app versioning",
    teamMembers: [
      { name: "Sophia Kim", role: "Platform Engineer", email: "sophia.kim@contentstack.com" }
    ],
    teamPractices: [
      "App review process",
      "Security audits",
      "Partner developer support"
    ],
    guidelines: [
      "Strict app review guidelines",
      "Security sandboxing",
      "Performance requirements"
    ],
    testStrategies: [
      "App installation testing",
      "Security testing",
      "Performance testing"
    ],
    testingTools: ["Jest", "Cypress", "Security scanners"],
    sprintProcess: "2-week sprints with app reviews",
    dependencies: []
  },
  {
    id: "launch",
    title: "Launch",
    slug: "launch",
    shortDescription: "Front-end hosting and deployment platform with edge optimization.",
    fullDescription: "Fully integrated front-end hosting solution with automated deployments, edge optimization, and seamless integration with Contentstack CMS.",
    category: "Launch",
    color: "#0984E3",
    videoUrl: "https://www.youtube.com/watch?v=pXvbgVxV38U",
    techStack: [
      {
        category: "Hosting",
        technologies: ["Vercel", "Cloudflare Pages", "AWS Amplify"]
      },
      {
        category: "Build System",
        technologies: ["Next.js", "Vite", "Webpack", "esbuild"]
      },
      {
        category: "Edge",
        technologies: ["Edge Functions", "Cloudflare Workers"]
      }
    ],
    architectureDiagrams: [
      {
        title: "Launch Architecture",
        description: "Build, deploy, and hosting pipeline with edge distribution",
        imageUrl: "/architecture/launch.png"
      }
    ],
    localDevSetup: `
# Prerequisites
- Node.js 18+
- Git

# Setup
1. Clone repository
2. npm install
3. Connect to Contentstack
4. npm run dev
    `,
    cicdProcess: "Automated builds and deployments with preview URLs",
    gitBranchingStrategy: "Git-based deployments with branch previews",
    teamMembers: [
      { name: "James Anderson", role: "DevOps Engineer", email: "james.anderson@contentstack.com" }
    ],
    teamPractices: [
      "Zero-downtime deployments",
      "Performance monitoring",
      "Cost optimization"
    ],
    guidelines: [
      "Optimize build times",
      "CDN cache strategies",
      "Environment management"
    ],
    testStrategies: [
      "Build testing",
      "Deployment verification",
      "Performance testing"
    ],
    testingTools: ["Lighthouse", "WebPageTest", "Custom monitoring"],
    sprintProcess: "2-week sprints with performance focus",
    dependencies: [
      {
        team: "DevOps",
        description: "Infrastructure management",
        contacts: ["devops@contentstack.com"]
      }
    ]
  },
  {
    id: "personalization",
    title: "Personalization",
    slug: "personalization",
    shortDescription: "Edge-optimized personalization engine for delivering contextual experiences.",
    fullDescription: "Real-time personalization engine that adapts content based on user behavior, preferences, and context using first-party data at the edge.",
    category: "Personalization",
    color: "#FDCB6E",
    videoUrl: "https://www.youtube.com/watch?v=1jJqbwKNYbA",
    techStack: [
      {
        category: "Edge Computing",
        technologies: ["Cloudflare Workers", "Edge Functions", "WebAssembly"]
      },
      {
        category: "Backend",
        technologies: ["Node.js", "Python", "Redis", "PostgreSQL"]
      },
      {
        category: "ML",
        technologies: ["Recommendation engines", "Segmentation", "A/B testing"]
      }
    ],
    architectureDiagrams: [
      {
        title: "Personalization Engine",
        description: "Real-time decisioning and content delivery at the edge",
        imageUrl: "/architecture/personalization.png"
      }
    ],
    localDevSetup: `
# Prerequisites
- Node.js 18+
- Wrangler CLI
- Redis

# Setup
1. Clone repository
2. npm install
3. Configure Cloudflare credentials
4. npm run dev
    `,
    cicdProcess: "Edge deployment with gradual rollouts",
    gitBranchingStrategy: "Feature flags with canary releases",
    teamMembers: [
      { name: "Mia Rodriguez", role: "Personalization Engineer", email: "mia.rodriguez@contentstack.com" }
    ],
    teamPractices: [
      "Experimentation culture",
      "Data-driven decisions",
      "Performance optimization"
    ],
    guidelines: [
      "Privacy-first personalization",
      "< 50ms latency",
      "Graceful degradation"
    ],
    testStrategies: [
      "A/B test validation",
      "Performance testing",
      "Edge function testing"
    ],
    testingTools: ["Jest", "Miniflare", "k6", "Analytics tools"],
    sprintProcess: "2-week sprints with experiment cycles",
    dependencies: [
      {
        team: "Data & Insights",
        description: "Customer data and analytics",
        contacts: ["data-insights@contentstack.com"]
      }
    ]
  },
  {
    id: "brand-kit",
    title: "Brand Kit",
    slug: "brand-kit",
    shortDescription: "Centralized brand asset management and style guide platform for consistent brand experiences.",
    fullDescription: "Brand Kit is a comprehensive digital brand management platform that centralizes brand assets, design tokens, guidelines, and resources. It ensures brand consistency across all digital touchpoints by providing teams with easy access to logos, colors, typography, components, and usage guidelines.",
    category: "AI",
    color: "#FF6B9D",
    videoUrl: "https://www.youtube.com/watch?v=AHrK21gNhE4",
    academyUrl: "https://www.contentstack.com/academy/brand-management",
    cicdDiagramUrl: "https://whimsical.com/brand-kit-cicd",
    observabilityDashboards: [
      {
        name: "Brand Kit Analytics",
        url: "https://grafana.contentstack.com/d/brand-kit-analytics",
        description: "Asset usage, download metrics, and engagement tracking",
        type: "grafana"
      },
      {
        name: "Brand Kit Performance",
        url: "https://datadog.contentstack.com/dashboard/brand-kit",
        description: "API response times and CDN performance",
        type: "datadog"
      }
    ],
    techStack: [
      {
        category: "Frontend",
        technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand"]
      },
      {
        category: "Backend",
        technologies: ["Node.js", "Express", "PostgreSQL", "Redis", "S3"]
      },
      {
        category: "Design System",
        technologies: ["Design Tokens", "Storybook", "Figma API", "Style Dictionary"]
      },
      {
        category: "Testing",
        technologies: ["Jest", "Playwright", "Chromatic", "Accessibility Testing"]
      }
    ],
    architectureDiagrams: [
      {
        title: "Brand Asset Distribution",
        description: "Global CDN architecture for brand asset delivery and management",
        imageUrl: "/architecture/brand-kit-cdn.png",
        whimsicalUrl: "https://whimsical.com/brand-kit-architecture"
      },
      {
        title: "Design Token Pipeline",
        description: "Automated token synchronization from Figma to production",
        imageUrl: "/architecture/brand-kit-tokens.png",
        whimsicalUrl: "https://whimsical.com/brand-kit-tokens"
      }
    ],
    repositories: [
      {
        repoName: "Brand Kit",
        repoDescription: "Repository for Brand Kit assets and components",
        repoUrl: "https://github.com/contentstack/brand-kit"
      }
    ],
    localDevSetup: `
# Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 7+
- AWS CLI (for S3 access)

# Setup Steps
1. Clone the repository: git clone https://github.com/contentstack/brand-kit
2. Install dependencies: npm install
3. Copy environment file: cp .env.example .env
4. Configure AWS credentials for S3
5. Setup database: npm run db:setup
6. Seed sample brand data: npm run db:seed
7. Start development server: npm run dev
8. Access at http://localhost:3000
    `,
    cicdProcess: "GitHub Actions pipeline with automated visual regression testing, design token validation, and multi-region deployments. Includes automatic Figma sync and asset optimization.",
    gitBranchingStrategy: "Trunk-based development with feature flags. Main branch deploys to production with automated rollback capabilities.",
    teamMembers: [
      { 
        name: "Sarah Chen", 
        role: "Product Lead", 
        email: "sarah.chen@contentstack.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
      },
      { 
        name: "David Park", 
        role: "Frontend Engineer", 
        email: "david.park@contentstack.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
      },
      { 
        name: "Emma Wilson", 
        role: "Design Systems Engineer", 
        email: "emma.wilson@contentstack.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
      },
      { 
        name: "Alex Turner", 
        role: "QA Engineer", 
        email: "alex.turner@contentstack.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
      }
    ],
    teamPractices: [
      "Daily standups at 9:30 AM",
      "Bi-weekly design system reviews",
      "Cross-functional collaboration with design team",
      "Accessibility-first development",
      "Regular brand audit sessions"
    ],
    guidelines: [
      "Follow WCAG 2.1 AA accessibility standards",
      "Maintain design token documentation",
      "Version all brand assets properly",
      "Ensure consistent naming conventions",
      "Optimize all assets for web delivery"
    ],
    testStrategies: [
      "Visual regression testing with Chromatic",
      "Accessibility testing with axe-core",
      "Cross-browser compatibility testing",
      "Performance testing for asset delivery",
      "User acceptance testing with design team"
    ],
    testingTools: ["Jest", "Playwright", "Chromatic", "Lighthouse", "axe DevTools"],
    sprintProcess: "2-week sprints with design sync in week 1 and release in week 2. Monthly brand governance reviews.",
    dependencies: [
      {
        team: "DAM Team",
        description: "Asset storage and retrieval integration",
        contacts: ["dam-team@contentstack.com"]
      },
      {
        team: "Design Team",
        description: "Brand guidelines and design tokens",
        contacts: ["design@contentstack.com"]
      },
      {
        team: "DevOps",
        description: "CDN configuration and asset pipeline",
        contacts: ["devops@contentstack.com"]
      }
    ]
  }
];

