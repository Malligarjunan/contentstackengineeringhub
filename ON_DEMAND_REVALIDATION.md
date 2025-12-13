# On-Demand Revalidation API

## Overview

This API enables on-demand revalidation of ISR (Incremental Static Regeneration) pages without waiting for the automatic revalidation period. Based on [Next.js ISR documentation](https://nextjs.org/docs/pages/guides/incremental-static-regeneration).

## API Endpoint

**URL:** `/api/revalidate`

**Methods:** `GET`, `POST`

**Authentication:** None required

## Usage

### GET Request - Revalidate by Slug

Revalidate a specific product page:

```bash
GET /api/revalidate?slug=product-slug
```

**Examples:**
```bash
# Revalidate CDA product page
curl http://localhost:3000/api/revalidate?slug=cda

# Revalidate Automation product page
curl http://localhost:3000/api/revalidate?slug=automation
```

**Response:**
```json
{
  "revalidated": true,
  "path": "/products/cda",
  "message": "Successfully revalidated /products/cda",
  "timestamp": "2025-01-10T12:00:00.000Z"
}
```

### GET Request - Revalidate by Path

Revalidate any page by its path:

```bash
GET /api/revalidate?path=/path/to/page
```

**Examples:**
```bash
# Revalidate products listing page
curl http://localhost:3000/api/revalidate?path=/products

# Revalidate homepage
curl http://localhost:3000/api/revalidate?path=/
```

**Response:**
```json
{
  "revalidated": true,
  "path": "/products",
  "message": "Successfully revalidated /products",
  "timestamp": "2025-01-10T12:00:00.000Z"
}
```

### POST Request - With JSON Body

Send a POST request with JSON body:

```bash
POST /api/revalidate
Content-Type: application/json

{
  "slug": "product-slug"
}
```

**Examples:**
```bash
# Revalidate by slug
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"slug": "launch"}'

# Revalidate by path
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"path": "/products"}'
```

## Testing

Use the provided test script to test all endpoints:

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

## Contentstack Webhook Integration

You can configure Contentstack webhooks to automatically trigger revalidation when content is published.

### Setup Steps

1. **Go to Contentstack Dashboard**
   - Navigate to **Settings > Webhooks**
   - Click **+ New Webhook**

2. **Configure Webhook**
   - **Name:** Product Page Revalidation
   - **URL:** `https://your-domain.com/api/revalidate?slug={{entry.uid}}`
   - **Method:** GET
   - **Content Type:** Select "product" content type
   - **Events:** Select "Publish" and "Unpublish"

3. **Save and Test**
   - Save the webhook
   - Publish a product entry to test
   - Check your application logs for revalidation messages

### Webhook URL Examples

For product entries (using entry UID as slug):
```
https://your-domain.com/api/revalidate?slug={{entry.uid}}
```

For all products page:
```
https://your-domain.com/api/revalidate?path=/products
```

For homepage:
```
https://your-domain.com/api/revalidate?path=/
```

## Error Handling

### Missing Parameters
```json
{
  "revalidated": false,
  "error": "Missing required parameter",
  "message": "Please provide either 'slug' or 'path' query parameter",
  "examples": [
    "/api/revalidate?slug=cda",
    "/api/revalidate?path=/products"
  ]
}
```

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

### 1. Content Publishing
Trigger revalidation immediately when content is published in Contentstack:
```bash
curl https://your-domain.com/api/revalidate?slug=cda
```

### 2. Bulk Revalidation
Revalidate multiple pages after a batch content update:
```bash
#!/bin/bash
for slug in cda automation launch dam; do
  curl https://your-domain.com/api/revalidate?slug=$slug
done
```

### 3. Manual Cache Clearing
Clear cache for a specific page manually:
```bash
curl https://your-domain.com/api/revalidate?path=/products/cda
```

### 4. CI/CD Integration
Add to your deployment pipeline:
```bash
# After deploying new code
curl https://your-domain.com/api/revalidate?path=/products
curl https://your-domain.com/api/revalidate?path=/
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

**For Production:** Consider adding authentication:

```typescript
// Add to route.ts
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
curl https://your-domain.com/api/revalidate?slug=cda&secret=your-secret-token
```

## Troubleshooting

### Revalidation Not Working

1. **Check ISR is enabled** in your page:
   ```typescript
   export const revalidate = 2; // Must be set
   ```

2. **Verify the path** is correct:
   ```bash
   # Use the actual path, not rewritten
   /products/cda ✅
   /product-cda  ❌
   ```

3. **Check logs** for error messages:
   ```bash
   npm run dev
   # Look for "Error revalidating" messages
   ```

4. **Test locally first**:
   ```bash
   npm run build
   npm start
   curl http://localhost:3000/api/revalidate?slug=cda
   ```

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

✅ **No authentication required** (can be added if needed)  
✅ **No input payload required** (optional for flexibility)  
✅ **Supports GET and POST methods**  
✅ **Works with Contentstack webhooks**  
✅ **Easy to test with provided script**  
✅ **Background revalidation for zero downtime**

