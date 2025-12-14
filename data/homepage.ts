import { HomePageContent } from "@/types/product";

export const homepageContent: HomePageContent = {
  heroTitle: "Contentstack Engineering Hub",
  heroDescription: "Your central resource for all technical documentation, architecture, and development practices across Contentstack products.",
  platformVideoUrl: "https://www.youtube.com/watch?v=AHrK21gNhE4",
  aboutContentstack: `
Contentstack is the world's best digital experience platform, combining the power of a headless CMS 
with real-time customer analytics to deliver adaptive, personalized content across all channels.

Our platform empowers developers and IT teams to build scalable, modern applications with an API-first, 
cloud-based architecture. With Contentstack Edge, you get flexibility, speed, and the ability to create 
highly personalized digital experiences that adapt to your users in real-time.

From content management to intelligent agents, from powerful analytics to effortless front-end hosting, 
Contentstack provides everything you need to reimagine what's possible in digital experience delivery.
  `,
  architectureDiagrams: [
    {
      title: "Contentstack Platform Architecture",
      description: "High-level overview of the Contentstack platform components and their interactions",
      imageUrl: "/architecture/platform-overview.png",
      details: "The platform consists of multiple services working together: CMS Core, Delivery Infrastructure, Edge Network, Personalization Engine, and Analytics Platform.",
      whimsicalUrl: "https://whimsical.com/contentstack-platform-architecture"
    },
    {
      title: "Microservices Architecture",
      description: "Our distributed microservices architecture enabling scalability and resilience",
      imageUrl: "/architecture/microservices.png",
      details: "Each product operates as an independent microservice with its own database, allowing for independent scaling and deployment.",
      whimsicalUrl: "https://whimsical.com/contentstack-microservices"
    },
    {
      title: "Data Flow Architecture",
      description: "How data flows through the Contentstack ecosystem",
      imageUrl: "/architecture/data-flow.png",
      details: "Content flows from CMA → Storage → CDA → Edge CDN → End Users, with real-time analytics feeding back into the personalization engine.",
      whimsicalUrl: "https://whimsical.com/contentstack-data-flow"
    },
    {
      title: "Security Architecture",
      description: "Multi-layered security approach protecting the platform and customer data",
      imageUrl: "/architecture/security.png",
      details: "Includes API authentication, role-based access control, data encryption at rest and in transit, and SOC 2 compliance.",
      whimsicalUrl: "https://whimsical.com/contentstack-security-architecture"
    }
  ],
  releaseProcess: {
    diagram: "/diagrams/release-process.png",
    code: `graph LR
    A[Development] --> B{Code Review}
    B -->|Approved| C[Merge to Main]
    B -->|Changes Required| A
    C --> D[CI Pipeline]
    D --> E{Tests Pass?}
    E -->|Yes| F[Build Artifacts]
    E -->|No| A
    F --> G[Deploy to Staging]
    G --> H[QA Testing]
    H --> I{QA Approved?}
    I -->|Yes| J[Deploy to Production]
    I -->|No| A
    J --> K[Monitor & Verify]
    K --> L{Issues?}
    L -->|Yes| M[Rollback]
    L -->|No| N[Release Complete]
    M --> A`,
    description: `<h3>Our Release Process</h3>
<p>At Contentstack, we follow a <strong>rigorous release process</strong> designed to ensure quality, reliability, and smooth deployments across all our products. Our process emphasizes automation, testing, and continuous improvement.</p>

<h4>Key Stages</h4>
<ul>
<li><strong>Development & Code Review:</strong> All code changes go through peer review using GitHub Pull Requests. We require at least two approvals from team members before merging.</li>
<li><strong>Automated CI/CD Pipeline:</strong> Upon merge to main, our CI pipeline automatically runs comprehensive test suites including unit tests, integration tests, and security scans.</li>
<li><strong>Staging Deployment:</strong> Successful builds are automatically deployed to our staging environment that mirrors production.</li>
<li><strong>QA & Validation:</strong> Our QA team performs thorough testing including functional, regression, and performance tests.</li>
<li><strong>Production Deployment:</strong> After QA approval, releases are deployed to production using blue-green deployment strategy to ensure zero downtime.</li>
<li><strong>Monitoring & Verification:</strong> Post-deployment, we actively monitor key metrics, logs, and alerts. Our on-call team is ready to respond to any issues.</li>
</ul>

<h4>Best Practices</h4>
<p>We follow these best practices to maintain high quality releases:</p>
<ul>
<li>Feature flags for gradual rollouts</li>
<li>Automated rollback mechanisms</li>
<li>Comprehensive logging and monitoring</li>
<li>Regular release retrospectives</li>
<li>Documentation updates with every release</li>
</ul>

<p>This process ensures that every release meets our high standards for quality, security, and performance.</p>`
  }
};

