# Contentstack Engineering Hub

A comprehensive engineering documentation website for Contentstack products, built with Next.js, TypeScript, and Tailwind CSS.

## Overview

This website serves as a central hub for developers and QA team members to access technical documentation, architecture diagrams, development practices, and team information across all Contentstack products.

## Features

- **Product Showcase**: Complete catalog of all Contentstack products
- **Detailed Product Pages**: Each product includes:
  - Technology stack
  - Architecture diagrams
  - Local development setup
  - CI/CD processes
  - Git branching strategies
  - Team practices and guidelines
  - QA and testing strategies
  - Sprint processes
  - Team member information
  - Dependency contacts

- **Responsive Design**: Fully responsive UI that works on all devices
- **Search & Filter**: Easily find products by name or category
- **CMS-Ready**: Built with a schema structure ready to integrate with Contentstack Headless CMS

## Products Included

- Content Management API (CMA)
- Content Delivery API (CDA)
- Search
- Agent OS
- Visual Preview
- Visual Studio
- Digital Asset Management (DAM)
- Automation
- Super Admin
- Organization Admin
- Growth
- Data Engineering
- UI Platform
- SDK & CLI
- Marketplace
- Launch
- Personalization

## Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd contentstack-engineering-hub
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
contentstack-engineering-hub/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with header/footer
│   ├── page.tsx                 # Home page
│   ├── products/                # Products pages
│   │   ├── page.tsx            # Products listing
│   │   └── [slug]/             # Dynamic product detail pages
│   │       └── page.tsx
│   └── globals.css              # Global styles
├── components/                   # Reusable React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── ArchitectureDiagram.tsx
├── data/                         # Data files (CMS-ready)
│   ├── products.ts              # All product data
│   └── homepage.ts              # Homepage content
├── types/                        # TypeScript type definitions
│   └── product.ts               # Product schema/interface
└── public/                       # Static assets
    └── architecture/            # Architecture diagram images (placeholder)
```

## Content Management

The website is designed to easily integrate with Contentstack Headless CMS:

### Product Content Type Schema

Each product follows a standardized schema defined in `types/product.ts`:

- **Basic Info**: Title, slug, description, category
- **Technical Details**: Tech stack, architecture diagrams
- **Development**: Repository URL, local setup, CI/CD, git strategy
- **Team**: Team members, practices, guidelines
- **QA**: Test strategies, testing tools
- **Process**: Sprint process, dependencies

### Migration to CMS

When ready to connect to Contentstack:

1. Create a `Product` content type in Contentstack matching the schema
2. Replace static imports from `data/products.ts` with API calls to Contentstack
3. Update the data fetching in pages to use Contentstack SDK
4. Implement preview functionality using Visual Preview

## Customization

### Adding a New Product

1. Add product data to `data/products.ts`
2. Follow the existing product schema
3. Add architecture diagram images to `public/architecture/`

### Styling

- Colors can be customized in `tailwind.config.ts`
- Global styles in `app/globals.css`
- Component-specific styles use Tailwind utility classes

### Brand Colors

- Primary Purple: `#6C5CE7`
- Teal: `#00CEC9`
- Blue: `#0984E3`
- Orange: `#E17055`

## Building for Production

```bash
npm run build
npm run start
```

## Deployment

This Next.js app can be deployed to:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## Future Enhancements

- [ ] Connect to Contentstack Headless CMS
- [ ] Add real architecture diagram images
- [ ] Implement search with Contentstack Search
- [ ] Add authentication for internal pages
- [ ] Integrate with Contentstack Visual Preview
- [ ] Add dark mode support
- [ ] Implement analytics tracking

## Contributing

This is an internal engineering hub. For contributions, please follow the standard PR process and coding guidelines.

## License

Copyright © 2025 Contentstack Inc. All rights reserved.

## Support

For questions or issues:
- Internal Slack: #engineering-hub
- Email: engineering@contentstack.com

---

Built with ❤️ by the Contentstack Engineering Team
