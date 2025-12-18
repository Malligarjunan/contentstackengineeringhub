# Contentstack Engineering Hub

A comprehensive internal knowledge hub for developers and QA members at Contentstack. This Next.js application provides detailed information about all Contentstack products, including architecture, tech stack, team information, and development practices.

## Features

- 🏠 **Homepage** - Introduction to Contentstack with platform architecture diagrams
  - **Curated Products** - Display specific products via product references (NEW!)
  - Automatic fallback to all products if no references selected
- 📦 **Products Listing** - Browse all Contentstack products with search and category filtering
- 🔍 **Product Details** - Comprehensive information for each product:
  - About the product
  - Tech stack and architecture diagrams
  - Local development setup
  - CI/CD process and diagrams
  - Team members and contact information
  - Testing strategies and QA information
  - Sprint process and team practices
  - Git branching strategies
  - Helpful external links
  - Observability dashboards
- 🎨 **Modern UI** - Beautiful, responsive design with smooth animations
- ⚡ **Performance** - Static generation with ISR (Incremental Static Regeneration)
- 🔗 **CMS Integration** - Content managed via Contentstack Headless CMS

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **CMS**: Contentstack
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- A Contentstack account (optional - falls back to local data)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd contentstack-engineering-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Contentstack (Optional)**
   
   The application works with or without Contentstack. If you don't configure it, it will use local data from `/data/products.ts`.
   
   To use Contentstack CMS:
   
   a. Copy the environment file:
   ```bash
   cp .env.example .env.local
   ```
   
   b. Edit `.env.local` and add your Contentstack credentials:
   ```env
   CONTENTSTACK_API_KEY=your_api_key
   CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
   NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=production
   NEXT_PUBLIC_CONTENTSTACK_REGION=us
   ```
   
   c. See [CONTENTSTACK_SETUP.md](./CONTENTSTACK_SETUP.md) for detailed setup instructions

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
contentstack-engineering-hub/
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Homepage
│   ├── products/
│   │   ├── page.tsx            # Products listing (server component)
│   │   ├── ProductsClient.tsx  # Products client component (filtering)
│   │   └── [slug]/
│   │       └── page.tsx        # Product detail page
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/                  # Reusable components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── ArchitectureDiagram.tsx
├── lib/                        # Utilities and services
│   ├── contentstack.ts        # Contentstack SDK integration
│   └── youtube.ts             # YouTube URL helpers
├── types/                      # TypeScript type definitions
│   └── product.ts             # Product interface
├── data/                       # Local data (fallback)
│   ├── products.ts            # Product data
│   └── homepage.ts            # Homepage content
├── public/                     # Static assets
│   ├── contentstack-logo.webp
│   └── diagrams/              # Architecture diagrams
└── README.md
```

## Data Management

### Using Local Data (Default)

By default, the application uses local data files:
- `/data/products.ts` - Product information
- `/data/homepage.ts` - Homepage content

This is useful for:
- Development without Contentstack setup
- Demo purposes
- Offline development

### Using Contentstack CMS

When Contentstack is configured via environment variables, the application automatically:
1. Fetches data from Contentstack
2. Falls back to local data if:
   - Contentstack is not configured
   - API requests fail
   - No content is found

See [CONTENTSTACK_SETUP.md](./CONTENTSTACK_SETUP.md) for detailed CMS setup instructions.

## Key Features Explained

### Homepage Product References (NEW!)

Display curated products on the homepage instead of showing all products:

**Quick Setup:**
```bash
# 1. Add the field to homepage content type
npm run add-product-references

# 2. Select products in Contentstack dashboard
# 3. Save and publish
```

**How it works:**
- Select specific products to display on homepage
- Automatic fallback to all products if none selected
- Easy to update without code changes
- Single query with nested references for optimal performance

**Documentation:**
- 📖 [Quick Start Guide](./QUICK_START_products.md)
- 📋 [Detailed Setup](./products_SETUP.md)
- 🏗️ [Implementation Details](./HOMEPAGE_products.md)
- 📊 [Flow Diagrams](./docs/product-references-flow.md)

### Incremental Static Regeneration (ISR)

Pages are statically generated with automatic revalidation:
- **Build time**: Static pages generated for all products
- **Runtime**: Pages revalidate every hour (configurable)
- **Benefits**: Fast page loads + fresh content

```typescript
export const revalidate = 3600; // Revalidate every hour
```

### Search and Filtering

The products page includes:
- **Real-time search** - Search by product name or description
- **Category filtering** - Filter by product category
- **Results count** - Live count of filtered results

### Product Detail Pages

Each product page includes comprehensive information:
- **Video content** - Embedded YouTube videos or external links
- **Architecture diagrams** - With Whimsical links for interactive viewing
- **Tech stack** - Organized by category (Backend, Frontend, etc.)
- **Team information** - With profile pictures and contact details
- **CI/CD diagrams** - Visual pipeline representations
- **Observability dashboards** - Quick links to monitoring tools
- **Helpful external links** - Curated resources and documentation

### Helpful External Links

Products can include helpful external resources:
```typescript
{
  title: "API Documentation",
  url: "https://...",
  description: "Complete API reference"
}
```

These appear as beautiful, clickable cards on product detail pages.

## Customization

### Adding New Products

1. **Using Local Data**: Edit `/data/products.ts` and add a new product object
2. **Using Contentstack**: Create a new entry in your Contentstack stack

### Modifying Styles

- Global styles: `app/globals.css`
- Component-specific: Tailwind classes in component files
- Theme colors: Defined in `tailwind.config.js` (if created) or inline

### Adding New Fields

1. Update the `Product` interface in `/types/product.ts`
2. Update the Contentstack content type (if using CMS)
3. Update the transformation function in `/lib/contentstack.ts`
4. Update the UI in relevant components

## Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import project in Vercel
3. Add environment variables in Vercel project settings
4. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Docker containers
- Traditional Node.js hosting

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `CONTENTSTACK_API_KEY` | Contentstack API Key | No | - |
| `CONTENTSTACK_DELIVERY_TOKEN` | Contentstack Delivery Token | No | - |
| `NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT` | Contentstack Environment | No | `production` |
| `NEXT_PUBLIC_CONTENTSTACK_REGION` | Contentstack Region | No | `us` |

## Troubleshooting

### Development Server Won't Start
- Check Node.js version (18+)
- Delete `node_modules` and `.next`, then run `npm install`

### Images Not Loading
- Restart dev server after adding new images to `/public`
- Check image paths are correct

### Contentstack Data Not Appearing
- Verify environment variables in `.env.local`
- Check that content is published in Contentstack
- Review browser console for API errors
- Application will automatically fall back to local data

### Build Errors
- Run `npm run lint` to check for TypeScript errors
- Ensure all required fields are present in data

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

Internal use only - Contentstack Engineering Team

## Support

For questions or issues:
- Internal Slack: #engineering-hub
- Email: engineering@contentstack.com

## Additional Documentation

- [Contentstack Setup Guide](./CONTENTSTACK_SETUP.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Contentstack Documentation](https://www.contentstack.com/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
