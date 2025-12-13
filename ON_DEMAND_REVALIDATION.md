# On-Demand Revalidation API

## Overview

This API enables on-demand revalidation of ALL ISR (Incremental Static Regeneration) product pages without waiting for the automatic revalidation period. Based on [Next.js ISR documentation](https://nextjs.org/docs/pages/guides/incremental-static-regeneration).

## API Endpoint

**URL:** `/api/revalidate`

**Method:** `GET`

**Parameters:** None required

**Authentication:** None required

## Usage

### Simple GET Request - Revalidate ALL Products

Simply call the API endpoint without any parameters:

```bash
GET /api/revalidate
```

**Example:**
```bash
curl http://localhost:3000/api/revalidate
```

**What happens:**
1. Fetches all product slugs from Contentstack
2. Revalidates each individual product page (`/products/[slug]`)
3. Revalidates the products listing page (`/products`)
4. Returns a summary of all revalidated pages

**Response:**
```json
{
  "revalidated": true,
  "count": 19,
  "productCount": 18,
  "paths": [
    "/products/agent-os",
    "/products/automation",
    "/products/brand-kit",
    "/products/cda",
    "/products/cma",
    "/products/dam",
    "/products/data-engineering",
    "/products/growth",
    "/products/launch",
    "/products/marketplace",
    "/products/org-admin",
    "/products/personalization",
    "/products/sdk-cli",
    "/products/search",
    "/products/studio",
    "/products/super-admin",
    "/products/ui",
    "/products/visual-preview",
    "/products"
  ],
  "message": "Successfully revalidated 18 product pages and the products listing page",
  "timestamp": "2025-01-10T12:00:00.000Z"
}
```

## Testing

Use the provided test script to test the endpoint:

```bash
# Test on localhost
./scripts/test-revalidate.sh

# Test on production
./scripts/test-revalidate.sh https://your-domain.com
```

Make the script executable first:
```bash
chmod +x scripts/test-revalidate.sh
```

Or test manually:
```bash
# Start your app
npm run dev

# In another terminal
curl http://localhost:3000/api/revalidate
```

## Contentstack Webhook Integration

You can configure Contentstack webhooks to automatically trigger revalidation of ALL product pages when any product content is published.

### Setup Steps

1. **Go to Contentstack Dashboard**
   - Navigate to **Settings > Webhooks**
   - Click **+ New Webhook**

2. **Configure Webhook**
   - **Name:** Revalidate All Product Pages
   - **URL:** `https://your-domain.com/api/revalidate`
   - **Method:** GET
   - **Content Type:** Select "product" content type
   - **Events:** Select "Publish" and "Unpublish"

3. **Save and Test**
   - Save the webhook
   - Publish any product entry to test
   - Check your application logs for revalidation messages
   - All product pages will be revalidated automatically

### Benefits of This Approach

✅ **Simple Configuration** - Single webhook URL, no variables needed  
✅ **Consistent Updates** - All product pages stay in sync  
✅ **No Missed Pages** - Guaranteed to revalidate every product  
✅ **Works for Any Product** - Doesn't depend on entry UID matching slug

## Error Handling

### Server Error
```json
{
  "revalidated": false,
  "error": "Error revalidating",
  "message": "Error details here",
  "timestamp": "2025-01-10T12:00:00.000Z"
}
```

## How It Works

1. **Initial Build**: Product pages are generated at build time with ISR enabled (2-second revalidation)
2. **Automatic Revalidation**: Pages automatically regenerate every 2 seconds when accessed
3. **On-Demand Revalidation**: This API triggers immediate regeneration without waiting
4. **Cache Update**: The new version is cached and served to subsequent requests

## Use Cases

### 1. Content Publishing (via Webhook)
Automatically revalidate all product pages when content is published in Contentstack:
- Configure webhook in Contentstack (see above)
- Any product publish/unpublish triggers revalidation of ALL products
- Ensures consistency across all product pages

### 2. Manual Revalidation
Manually trigger revalidation when needed:
```bash
curl https://your-domain.com/api/revalidate
```

### 3. CI/CD Integration
Add to your deployment pipeline to refresh all product pages:
```bash
# After deploying new code, refresh all product pages
curl https://your-domain.com/api/revalidate
```

### 4. Scheduled Updates
Create a cron job to periodically refresh product pages:
```bash
# Add to crontab - revalidate every hour
0 * * * * curl https://your-domain.com/api/revalidate
```

## Performance Impact

- ✅ **No blocking**: Revalidation happens in the background
- ✅ **Fast response**: API responds immediately, regeneration is async
- ✅ **Scalable**: Works with any number of pages
- ✅ **Safe**: Falls back to cached version if regeneration fails

## Monitoring

Check server logs for revalidation activity:

```bash
# Development
npm run dev

# Production
npm start

# Look for these log messages:
# 🔄 Revalidating product page: /products/cda
```

## Security Considerations

**Current Setup:** No authentication required

The API has no authentication to keep it simple. Since it only triggers cache revalidation (which happens automatically anyway), there's minimal security risk.

**Optional: Add Authentication for Production**

If you want to add authentication:

```typescript
// Add to route.ts at the start of GET function
const secret = request.nextUrl.searchParams.get('secret');
if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
  return NextResponse.json(
    { message: 'Invalid token' },
    { status: 401 }
  );
}
```

Then set environment variable:
```bash
REVALIDATE_SECRET_TOKEN=your-secret-token
```

And use:
```bash
curl https://your-domain.com/api/revalidate?secret=your-secret-token
```

Update Contentstack webhook URL:
```
https://your-domain.com/api/revalidate?secret=your-secret-token
```

## Troubleshooting

### Revalidation Not Working

1. **Check ISR is enabled** in your page:
   ```typescript
   export const revalidate = 2; // Must be set in /products/[slug]/page.tsx
   ```

2. **Verify Contentstack connection**:
   ```bash
   # Make sure you can fetch products
   npm run test-contentstack
   ```

3. **Check logs** for error messages:
   ```bash
   npm run dev
   # Look for "🔄 Starting revalidation..." and "✅ Successfully revalidated" messages
   ```

4. **Test locally first**:
   ```bash
   npm run build
   npm start
   curl http://localhost:3000/api/revalidate
   ```

5. **Verify all slugs are being fetched**:
   - The API fetches slugs from `getAllProductSlugs()`
   - Check that this function returns all your product slugs
   - Look for the log: "📋 Found X product slugs"

### Testing ISR Behavior

Enable debug logging:
```bash
# .env
NEXT_PRIVATE_DEBUG_CACHE=1
```

This logs cache hits/misses in the console.

## Related Documentation

- [Next.js ISR Documentation](https://nextjs.org/docs/pages/guides/incremental-static-regeneration)
- [Next.js Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data)
- [Contentstack Webhooks](https://www.contentstack.com/docs/developers/set-up-webhooks/)

## Summary

✅ **Simple API** - Just call `/api/revalidate` with no parameters  
✅ **No authentication required** (can be added if needed)  
✅ **No input needed** - Automatically fetches and revalidates all products  
✅ **GET method only** - Simple and straightforward  
✅ **Works with Contentstack webhooks** - Single URL configuration  
✅ **Revalidates everything** - All 18+ product pages + listing page  
✅ **Easy to test** - Provided test script included  
✅ **Background revalidation** - Zero downtime updates  
✅ **Comprehensive logging** - See what's being revalidated in console

