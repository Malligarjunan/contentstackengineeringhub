# Live Preview Setup Guide

This guide will help you set up **Contentstack Live Preview** for real-time content updates in your Engineering Hub application.

## What is Live Preview?

Live Preview allows content managers to see **real-time updates** to their content before publishing. It provides a seamless content editing experience by enabling draft previews across your website.

Reference: [Contentstack Live Preview Documentation](https://www.contentstack.com/docs/developers/set-up-live-preview/set-up-live-preview-for-your-website)

## Architecture

Your app uses:
- **Next.js** with Server-Side Rendering (SSR)
- **REST APIs** to fetch content from Contentstack
- **Live Preview Utils SDK v3.0** for real-time updates

## Prerequisites

1. ✅ Contentstack account with a stack
2. ✅ Content types configured (product, homepage, etc.)
3. ✅ API Key and Delivery Token
4. ⬜ Live Preview enabled in your Contentstack stack

## Step 1: Enable Live Preview in Contentstack

### 1.1 Navigate to Settings

1. Log in to your Contentstack account
2. Go to your stack
3. Navigate to **Settings** → **Live Preview**

### 1.2 Configure Live Preview

1. Click **Enable** to activate Live Preview
2. Set up your preview URL:
   ```
   Development: http://localhost:3000
   Production: https://your-domain.com
   ```

3. Add URL patterns for different content types:
   ```
   Homepage: /
   Products: /products/{entry.slug}
   ```

4. Save the configuration

## Step 2: Get Your Live Preview Credentials

### 2.1 Get Preview Token

1. In Contentstack Dashboard
2. Go to **Settings** → **Tokens**
3. Find or create a **Preview Token**
4. Copy the token (starts with `cs...`)

### 2.2 Update Environment Variables

Add these to your `.env` or `.env.local` file:

```env
# Existing variables
CONTENTSTACK_API_KEY=blt_your_api_key
CONTENTSTACK_DELIVERY_TOKEN=cs_your_delivery_token
NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=production
NEXT_PUBLIC_CONTENTSTACK_REGION=us

# Live Preview variables (ADD THESE)
CONTENTSTACK_LIVE_PREVIEW_ENABLED=true
NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW_TOKEN=cs_your_preview_token
NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW_HOST=api.contentstack.io
```

**Important:**
- Set `LIVE_PREVIEW_ENABLED=true` to activate
- Set `LIVE_PREVIEW_ENABLED=false` to disable (useful for production)

## Step 3: Configure Content Types for Live Preview

### 3.1 Enable Live Preview for Product Content Type

1. Go to **Content Models** → **product**
2. Click **Settings** (gear icon)
3. Go to **Live Preview** tab
4. Enable **Live Preview**
5. Set **Preview URL**: `/products/{entry.slug}`
6. Save

### 3.2 Repeat for Other Content Types

For **homepage** content type:
- Preview URL: `/`

For any other content types:
- Set appropriate URL patterns

## Step 4: Test Live Preview

### 4.1 Start Development Server

```bash
npm run dev
```

You should see in the console:
```
✅ Live Preview initialized successfully
```

### 4.2 Test in Contentstack

1. Open any **product entry** in Contentstack
2. Click the **Live Preview** button (👁️ icon)
3. A preview panel will open on the right
4. Make changes to content fields
5. See real-time updates in the preview!

### 4.3 Edit Mode

When Live Preview is active:
- Hover over content to see **Edit** buttons
- Click to edit directly in Contentstack
- Changes appear instantly

## Step 5: Deploy with Live Preview

### For Production

**Option A: Enable Live Preview in Production**
```env
CONTENTSTACK_LIVE_PREVIEW_ENABLED=true
NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW_TOKEN=your_preview_token
```

**Option B: Disable Live Preview in Production** (Recommended)
```env
CONTENTSTACK_LIVE_PREVIEW_ENABLED=false
```

### For Staging

Enable Live Preview for content team testing:
```env
CONTENTSTACK_LIVE_PREVIEW_ENABLED=true
```

## How It Works

### Client-Side Updates

1. Content manager opens Live Preview in Contentstack
2. Makes changes to content fields
3. Live Preview SDK detects changes
4. Automatically updates the preview in real-time
5. No page reload needed!

### Technical Flow

```
Contentstack Entry Editor
    ↓
Live Preview SDK (initialized in app)
    ↓
WebSocket connection
    ↓
Real-time content updates
    ↓
Preview updates instantly
```

## Features Enabled

✅ **Real-time Updates** - See content changes instantly  
✅ **Edit Buttons** - Click to edit content directly  
✅ **No Page Reload** - Smooth preview experience  
✅ **Multi-field Updates** - Update multiple fields at once  
✅ **SSR Compatible** - Works with server-side rendering  

## Troubleshooting

### Live Preview Not Working

**Check Console for Errors:**
```bash
# Open browser console (F12)
# Look for Live Preview initialization messages
```

**Common Issues:**

1. **"Live Preview is disabled"**
   - Set `CONTENTSTACK_LIVE_PREVIEW_ENABLED=true`
   - Restart dev server

2. **"Preview Token invalid"**
   - Verify `NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW_TOKEN` is correct
   - Token should start with `cs...`

3. **"Connection failed"**
   - Check `NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW_HOST`
   - Should be `api.contentstack.io` or your region's host

4. **No Edit Buttons Appearing**
   - Ensure Live Preview is enabled in Contentstack
   - Check that content type has Live Preview enabled

### Preview Not Opening in Contentstack

1. **Verify Preview URL**
   - Should match your app URL pattern
   - Development: `http://localhost:3000/products/{entry.slug}`
   - Production: `https://your-domain.com/products/{entry.slug}`

2. **Check CORS**
   - Ensure your app allows Contentstack iframe embedding
   - Next.js handles this automatically

3. **Clear Browser Cache**
   - Hard reload: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `CONTENTSTACK_LIVE_PREVIEW_ENABLED` | Enable/disable Live Preview | Yes | `true` or `false` |
| `NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW_TOKEN` | Preview token from Contentstack | Yes | `cs123abc...` |
| `NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW_HOST` | Contentstack API host | No | `api.contentstack.io` |

## Files Added

1. ✅ `lib/live-preview.ts` - Live Preview initialization
2. ✅ `components/LivePreviewProvider.tsx` - React provider component
3. ✅ `app/layout.tsx` - Updated to include Live Preview provider

## Best Practices

### Development
- ✅ Enable Live Preview for real-time content editing
- ✅ Test with actual content from Contentstack
- ✅ Use Preview Token (not Delivery Token)

### Staging
- ✅ Enable Live Preview for QA and content team testing
- ✅ Use same configuration as production

### Production
- ⚠️ Consider disabling Live Preview for performance
- ✅ Or keep enabled if content team needs it
- ✅ Use Preview Token with limited permissions

## Performance Impact

**Minimal Impact:**
- Live Preview only initializes when enabled
- No performance hit when disabled
- WebSocket connection only active during preview
- No additional API calls for regular visitors

## Security

**Safe for Production:**
- Preview Token is client-side safe
- Read-only access to draft content
- No write permissions
- Separate from Management Token

## Next Steps

1. ✅ Add environment variables to `.env` file
2. ✅ Enable Live Preview in Contentstack dashboard
3. ✅ Configure content types for Live Preview
4. ✅ Test with a product entry
5. ✅ Deploy to staging/production

## Additional Resources

- [Live Preview Documentation](https://www.contentstack.com/docs/developers/set-up-live-preview/set-up-live-preview-for-your-website)
- [Live Preview Utils SDK](https://www.contentstack.com/docs/developers/set-up-live-preview/get-started-with-live-preview-utils-sdk-v3.0)
- [Next.js SSR with Live Preview](https://www.contentstack.com/docs/developers/set-up-live-preview/set-up-live-preview-for-your-website#server-side-rendering-ssr-with-rest)

## Support

For issues or questions:
- Check browser console for error messages
- Run: `node scripts/check-env.js` to verify configuration
- Review Contentstack Live Preview settings
- Contact Contentstack support if needed

---

**Live Preview is now enabled!** 🎉

Content managers can now see real-time updates while editing in Contentstack.

