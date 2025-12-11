# Contentstack CMS Setup Guide

This guide will help you set up Contentstack CMS for the Engineering Hub application.

## Prerequisites

1. A Contentstack account (sign up at https://www.contentstack.com/)
2. A stack created in your Contentstack account

## Step 1: Get Your API Credentials

1. Log in to your Contentstack account
2. Navigate to **Settings** > **Stack** > **API Keys**
3. Create a new Delivery Token or use an existing one
4. Note down the following:
   - API Key
   - Delivery Token
   - Environment name (usually `production`)
   - Region (us, eu, azure-na, azure-eu, or gcp-na)

## Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and replace the placeholder values:
   ```env
   NEXT_PUBLIC_CONTENTSTACK_API_KEY=your_actual_api_key
   NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN=your_actual_delivery_token
   NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=production
   NEXT_PUBLIC_CONTENTSTACK_REGION=us
   ```

## Step 3: Create Content Types in Contentstack

### Content Type: `product`

Create a content type named `product` with the following fields:

#### Basic Information
- **title** (Single Line Textbox) - Required
- **slug** (Single Line Textbox) - Required, Unique
- **short_description** (Multi Line Textbox)
- **full_description** (Rich Text Editor)
- **category** (Single Line Textbox)
- **color** (Single Line Textbox) - Hex color code
- **icon** (Single Line Textbox) - Optional

#### Media & Learning
- **video_url** (Single Line Textbox) - YouTube URL
- **academy_url** (Single Line Textbox) - Contentstack Academy link

#### Technical Details
- **tech_stack** (Modular Blocks / Group)
  - category (Single Line Textbox)
  - technologies (Multiple Single Line Textbox)

- **architecture_diagrams** (Modular Blocks / Group)
  - title (Single Line Textbox)
  - description (Multi Line Textbox)
  - image_url (Single Line Textbox)
  - details (Multi Line Textbox)
  - whimsical_url (Single Line Textbox)

#### Development
- **repository_url** (Single Line Textbox)
- **local_dev_setup** (Multi Line Textbox)
- **cicd_process** (Multi Line Textbox)
- **cicd_diagram_url** (Single Line Textbox)
- **cicd_diagram_image** (Single Line Textbox)
- **git_branching_strategy** (Multi Line Textbox)

#### Observability
- **observability_dashboards** (Modular Blocks / Group)
  - name (Single Line Textbox)
  - url (Single Line Textbox)
  - description (Multi Line Textbox)
  - type (Single Select) - Options: grafana, datadog, newrelic, custom

#### Team Information
- **team_members** (Modular Blocks / Group)
  - name (Single Line Textbox)
  - role (Single Line Textbox)
  - email (Single Line Textbox)
  - avatar (Single Line Textbox) - Avatar URL

- **team_practices** (Multiple Single Line Textbox)
- **guidelines** (Multiple Single Line Textbox)

#### QA Information
- **test_strategies** (Multiple Single Line Textbox)
- **testing_tools** (Multiple Single Line Textbox)

#### Process
- **sprint_process** (Multi Line Textbox)

#### Dependencies
- **dependencies** (Modular Blocks / Group)
  - team (Single Line Textbox)
  - description (Multi Line Textbox)
  - contacts (Multiple Single Line Textbox)
  - slack_channel (Single Line Textbox)

#### Helpful Links
- **helpful_links** (Modular Blocks / Group)
  - title (Single Line Textbox)
  - url (Single Line Textbox)
  - description (Multi Line Textbox)

### Content Type: `homepage` (Optional)

Create a content type named `homepage` with the following fields:

- **hero_title** (Single Line Textbox)
- **hero_description** (Multi Line Textbox)
- **platform_video_url** (Single Line Textbox)
- **about_contentstack** (Rich Text Editor)
- **architecture_diagrams** (Modular Blocks / Group) - Same structure as product

## Step 4: Import Sample Data

You can use the existing data from `/data/products.ts` as a reference to create your entries in Contentstack. Create entries for each product with all the required fields.

## Step 5: Test the Integration

1. Ensure your `.env.local` file is properly configured
2. Restart your Next.js development server:
   ```bash
   npm run dev
   ```

3. Navigate to:
   - `/products` - View all products from Contentstack
   - `/products/[slug]` - View individual product details

## Fallback to Local Data

If you need to use local data instead of Contentstack (for development or testing), you can:

1. Keep the existing `/data/products.ts` file
2. Comment out the Contentstack imports in the page components
3. Use the local data import instead

## ISR (Incremental Static Regeneration)

The application is configured with ISR to revalidate pages every hour (3600 seconds). This means:

- Pages are statically generated at build time
- They are revalidated and regenerated in the background every hour
- Users always see fast, cached pages
- Content updates appear within an hour

To change the revalidation period, modify the `revalidate` export in the page components:

```typescript
export const revalidate = 3600; // seconds
```

## Troubleshooting

### Error: "Cannot find module 'contentstack'"
Run `npm install` to ensure all dependencies are installed.

### Error: API Key or Delivery Token invalid
Double-check your environment variables in `.env.local` match your Contentstack stack credentials.

### Error: No products found
Ensure you have published entries in your Contentstack stack and they are published to the environment specified in your `.env.local` file.

### Content not updating
- Check if entries are published in Contentstack
- Wait for the revalidation period (default 1 hour) or restart the dev server
- For production, trigger a new build or use on-demand revalidation

## Additional Resources

- [Contentstack Documentation](https://www.contentstack.com/docs/)
- [Contentstack JavaScript SDK](https://www.contentstack.com/docs/developers/sdks/content-delivery-sdk/javascript/)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Next.js ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data)

