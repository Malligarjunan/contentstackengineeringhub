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
  ]
};

