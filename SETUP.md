# Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
cd contentstack-engineering-hub
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Overview

This engineering hub is built with:
- **Next.js 15+** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first styling
- **Static Data** - Currently using local data files (CMS-ready)

## Pages

### Home Page (`/`)
- Hero section with Contentstack introduction
- About Contentstack
- Platform architecture diagrams
- Featured products
- Call-to-action sections

### Products Listing (`/products`)
- Grid view of all products
- Search functionality
- Category filtering
- Responsive cards with tech stack preview

### Product Detail Pages (`/products/[slug]`)
Each product page includes:
- Product overview and description
- Technology stack by category
- Architecture diagrams
- Local development setup instructions
- CI/CD process details
- Git branching strategy
- Team practices and guidelines
- QA and testing strategies
- Sprint process
- Team member directory
- Dependencies and contact information

## Data Structure

All data is currently stored in `/data` directory:

### `data/products.ts`
Contains array of all products with complete information:
- 17 products total (CMA, CDA, Search, Agent OS, etc.)
- Each follows the `Product` interface schema
- CMS-ready structure for easy migration

### `data/homepage.ts`
Contains homepage content:
- Hero section text
- About Contentstack content
- Platform architecture diagrams

### `types/product.ts`
TypeScript interfaces defining the content structure:
- `Product` - Main product schema
- `TeamMember` - Team member information
- `ContactInfo` - Dependency contacts
- `TechStack` - Technology categories
- `ArchitectureDiagram` - Architecture diagram metadata
- `HomePageContent` - Homepage content structure

## Components

### Layout Components
- `Header.tsx` - Navigation header with menu
- `Footer.tsx` - Footer with links and social icons
- Defined in `app/layout.tsx`

### Product Components
- `ProductCard.tsx` - Product card for listing pages
- `ArchitectureDiagram.tsx` - Architecture diagram display

## Styling

### Colors (Contentstack Brand)
- Primary Purple: `#6C5CE7`
- Purple Dark: `#5849d4`
- Teal: `#00CEC9`
- Blue: `#0984E3`
- Green: `#00B894`
- Orange: `#E17055`
- Yellow: `#FDCB6E`
- Pink: `#FD79A8`

### Fonts
- Inter (from Google Fonts)

### Custom Styles
- Defined in `app/globals.css`
- Custom scrollbar with brand colors
- Smooth scrolling for anchor links
- Animation utilities

## Adding/Editing Content

### Add a New Product

1. Open `data/products.ts`
2. Add new product object following the schema:

```typescript
{
  id: "unique-id",
  title: "Product Name",
  slug: "product-slug",
  shortDescription: "Brief description",
  fullDescription: "Detailed description",
  category: "Category Name",
  color: "#HexColor",
  techStack: [...],
  // ... other required fields
}
```

3. Add architecture diagrams to `/public/architecture/`
4. Product page will be auto-generated at `/products/[slug]`

### Edit Homepage Content

Edit `data/homepage.ts`:
- Update hero title/description
- Modify about section
- Add/edit architecture diagrams

### Update Team Information

In each product object, update the `teamMembers` array:

```typescript
teamMembers: [
  {
    name: "Full Name",
    role: "Job Title",
    email: "email@contentstack.com"
  }
]
```

## Migration to Contentstack CMS

### Step 1: Create Content Types

Create these content types in Contentstack:

1. **Product** content type with fields matching `types/product.ts`
2. **Team Member** (modular block)
3. **Tech Stack** (modular block)
4. **Architecture Diagram** (modular block)
5. **Homepage** (global field)

### Step 2: Install SDK

```bash
npm install @contentstack/delivery-sdk
```

### Step 3: Update Data Fetching

Replace static imports with Contentstack SDK calls:

```typescript
// Before
import { products } from "@/data/products";

// After
const products = await getAllProducts(); // Using Contentstack SDK
```

### Step 4: Environment Variables

Copy `.env.example` to `.env.local` and add your Contentstack credentials.

### Step 5: Implement Preview

Integrate Visual Preview for real-time content editing.

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint

# Type checking
npx tsc --noEmit
```

## Architecture Diagram Placeholders

Currently, architecture diagrams show placeholders. To add real diagrams:

1. Create/export diagrams as PNG or SVG
2. Place in `/public/architecture/` directory
3. Update the `imageUrl` in product data
4. Image component will automatically display them

Recommended diagram tool: Lucidchart, Draw.io, or Figma

## Responsive Design

The site is fully responsive:
- Mobile: Single column layout
- Tablet: 2 column grid
- Desktop: 3 column grid for products, 2/3 layout for detail pages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Static generation for all product pages
- Optimized images (when using Next.js Image component)
- Minimal JavaScript
- Fast page transitions

## Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill
```

### Build errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Type errors
```bash
# Check types
npx tsc --noEmit
```

## Need Help?

- Check the [README.md](README.md) for overview
- Review [Next.js documentation](https://nextjs.org/docs)
- Contentstack documentation: https://www.contentstack.com/docs

---

Happy coding! 🚀

