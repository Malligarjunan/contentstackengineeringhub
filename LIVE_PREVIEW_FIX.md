# Live Preview Fix - Showing Draft Content

## Problem

Live Preview was showing only **published content** instead of **draft/unpublished content** because the Contentstack SDK was not properly configured with Live Preview credentials.

## Root Cause

The Contentstack SDK initialization in `lib/contentstack.ts` was missing the `live_preview` configuration. It was only using the delivery token which fetches published content.

According to the [Contentstack Live Preview documentation for SSR](https://www.contentstack.com/docs/developers/set-up-live-preview/set-up-live-preview-for-your-website), the SDK must include:

```javascript
live_preview: {
  enable: true,
  preview_token: 'your-preview-token',
  host: 'api.contentstack.io'
}
```

## What Was Fixed

### 1. Updated SDK Initialization (`lib/contentstack.ts`)

**Before:**
```typescript
ContentstackStack = contentstack.stack({
  apiKey: process.env.CONTENTSTACK_API_KEY!,
  deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN!,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'production',
  region: Region.US,
});
```

**After:**
```typescript
const stackConfig: any = {
  apiKey: process.env.CONTENTSTACK_API_KEY!,
  deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN!,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'production',
  region: Region.US,
};

// Add Live Preview configuration if enabled
if (livePreviewEnabled && livePreviewToken) {
  stackConfig.live_preview = {
    enable: true,
    preview_token: livePreviewToken,
    host: livePreviewHost,
  };
  console.log('✅ Live Preview enabled for Contentstack SDK');
}

ContentstackStack = contentstack.stack(stackConfig);
```

### 2. Created Product Live Preview Components

**Created `components/ProductLivePreview.tsx`** - Global Live Preview setup (not used directly on pages)

**Created `app/products/[slug]/LivePreviewProduct.tsx`** - Page-specific Live Preview wrapper:
- Detects Live Preview mode from query parameters
- Listens for content changes via `ContentstackLivePreview.onLiveEdit()`
- Handles entry updates with `ContentstackLivePreview.onEntryChange()`
- Triggers page reload for SSR-compatible updates

### 3. Updated Product Page

**Modified `app/products/[slug]/page.tsx`**:
- Added `searchParams` to detect Live Preview mode
- Wrapped content with `LivePreviewProduct` component
- Reduced ISR revalidate from 30s to 2s for faster updates
- Added console logging for Live Preview detection

## Required Environment Variables

Make sure these variables are set in your `.env` or `.env.local`:

```bash
# Contentstack Core Configuration
CONTENTSTACK_API_KEY=your_api_key
CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=production

# Live Preview Configuration (REQUIRED for draft content)
CONTENTSTACK_LIVE_PREVIEW_ENABLED=true
CONTENTSTACK_LIVE_PREVIEW_TOKEN=your_preview_token
CONTENTSTACK_LIVE_PREVIEW_HOST=api.contentstack.io

# Optional (already correct)
CONTENTSTACK_MANAGEMENT_TOKEN=your_management_token
```

## How to Get Live Preview Token

1. Go to **Contentstack Dashboard**
2. Navigate to **Settings > Tokens**
3. Find or create a token with **Preview** scope
4. Copy the **Preview Token** (not the delivery token!)
5. Add it to your `.env` as `CONTENTSTACK_LIVE_PREVIEW_TOKEN`

**Important:** The Preview Token is different from the Delivery Token!
- **Delivery Token** → Fetches published content
- **Preview Token** → Fetches draft/unpublished content

## Verification Steps

### 1. Check Environment Variables

```bash
# In your terminal
echo $CONTENTSTACK_LIVE_PREVIEW_ENABLED
echo $CONTENTSTACK_LIVE_PREVIEW_TOKEN
```

Both should return values (not empty).

### 2. Check Console Logs

When you start your app, you should see:

```
✅ Live Preview enabled for Contentstack SDK
✅ Contentstack SDK initialized successfully
✅ Live Preview initialized successfully
```

### 3. Test Live Preview

1. **Edit a product entry** in Contentstack (don't publish yet)
2. **Open Live Preview** in Contentstack entry editor
3. You should see your **draft changes** in the preview
4. Console should show: `🔄 Live Preview detected content change`

### 4. Verify Draft Content is Fetched

In the browser console, when Live Preview is active, you should see:
```
✅ Live Preview enabled for Contentstack SDK
✅ Fetched product "your-slug" from Contentstack
```

The product data should reflect your **unpublished changes**.

## How Live Preview Works Now

### For SSR (Server-Side Rendering)

1. **Contentstack Entry Editor** opens Live Preview
2. **iframe** loads your Next.js application
3. **SDK** detects Live Preview mode via preview token
4. **Fetches draft content** instead of published content
5. **ContentstackLivePreview.onEntryChange()** listens for changes
6. When you edit content, **page reloads** with updated draft data

### Content Flow

```
Entry Editor (Draft Changes)
        ↓
Preview Token passed to iframe
        ↓
Next.js App detects Live Preview
        ↓
SDK configured with live_preview settings
        ↓
Fetches DRAFT content from Contentstack
        ↓
Renders draft content in preview
        ↓
onEntryChange() → Reload on updates
```

## Troubleshooting

### Still Showing Published Content?

**Check 1: Preview Token**
```bash
# Make sure this is set correctly
CONTENTSTACK_LIVE_PREVIEW_TOKEN=cs1234567890abcdef
```

**Check 2: Live Preview Enabled**
```bash
CONTENTSTACK_LIVE_PREVIEW_ENABLED=true  # Must be exactly 'true'
```

**Check 3: Restart Dev Server**
```bash
# Environment variables require restart
npm run dev
```

**Check 4: Clear Cache**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
npm run dev
```

**Check 5: Check Browser Console**
Look for error messages related to Live Preview initialization.

### Live Preview Not Updating in Real-Time?

This is expected for SSR! The page reloads when content changes.

**What happens:**
1. You edit content in Contentstack
2. `onEntryChange()` fires
3. Page reloads automatically
4. Fresh draft content is fetched from server
5. Updated content displays

This is the **correct behavior** for SSR-based Live Preview.

### Live Preview Button Not Showing?

**Check 1: Content Type Settings**
- Go to **Content Type** settings in Contentstack
- Ensure **Live Preview** is enabled for the content type

**Check 2: Stack Settings**
- Go to **Settings > Live Preview**
- Verify Live Preview is enabled for your stack
- Check the Preview URL is set correctly

**Check 3: URL Configuration**
Your preview URL in Contentstack should be:
```
http://localhost:3000/products/{entry.uid}  (for dev)
https://your-domain.com/products/{entry.uid}  (for production)
```

## For Production (Contentstack Launch)

When deploying to Contentstack Launch or any hosting:

1. **Add environment variables** in your hosting dashboard:
   ```
   CONTENTSTACK_LIVE_PREVIEW_ENABLED=true
   CONTENTSTACK_LIVE_PREVIEW_TOKEN=your_preview_token
   CONTENTSTACK_LIVE_PREVIEW_HOST=api.contentstack.io
   ```

2. **Update Preview URL** in Contentstack:
   ```
   https://your-domain.com/products/{entry.uid}
   ```

3. **Redeploy** your application

4. **Test** Live Preview from Contentstack dashboard

## Additional Resources

- [Contentstack Live Preview Setup Guide](https://www.contentstack.com/docs/developers/set-up-live-preview/set-up-live-preview-for-your-website)
- [Live Preview for SSR](https://www.contentstack.com/docs/developers/set-up-live-preview/set-up-live-preview-for-your-website#server-side-rendering-ssr-with-rest)
- [Live Preview Utils SDK](https://www.contentstack.com/docs/developers/set-up-live-preview/get-started-with-live-preview-utils-sdk)

## Summary

✅ **SDK now configured** with Live Preview credentials  
✅ **Preview token** enables draft content fetching  
✅ **Real-time updates** via onEntryChange()  
✅ **SSR-compatible** with page reloads  
✅ **Works with ISR** (2-second revalidation)  

Your Live Preview should now show **draft content** instead of only published content! 🎉

