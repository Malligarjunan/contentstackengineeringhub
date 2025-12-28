# Live Preview Setup for Homepage - Complete Guide

## ✅ Implementation Complete

The homepage now has proper Live Preview support with **Visual Builder edit tags** as per [Contentstack documentation](https://www.contentstack.com/docs/developers/set-up-live-preview/set-up-live-edit-tags-for-entries-with-rest).

## What Was Implemented

### 1. Edit Tags for Visual Builder ✅

Added `data-cslp` attributes to all editable fields on the homepage:

**Hero Section:**
- `hero_badge_text` - Badge at top of hero
- `hero_title` - Main homepage title
- `hero_description` - Hero description text

**Products Section:**
- `products_section_title` - Section title
- `products_section_description` - Section description
- `products` - Product reference array (with add/delete/reorder support)
- Individual product items - Each product card is editable

**Tech Stack Section:**
- `tech_stack_section_title` - Section title
- `tech_stack_section_description` - Section description

**Architecture Section:**
- `architecture_section_badge` - Badge text
- `architecture_section_title` - Section title
- `architecture_section_subtitle` - Subtitle text
- `architecture_section_description` - Description text

### 2. Live Preview Metadata ✅

Updated `getHomepageContent()` to return Live Preview fields:
- `$` - Edit tags object (contains all field paths)
- `_metadata` - Entry metadata
- `uid` - Entry UID
- `locale` - Entry locale

### 3. Visual Builder Support for Multiple Fields ✅

Added support for **add, delete, and reorder** operations on the products array:

```tsx
<div 
  {...(homepageContent.$?.products || {})}
  data-add-direction="horizontal"
>
  {products.map((product, i) => (
    <Link {...(homepageContent.$?.[`products__${i}`] || {})}>
      {/* Product card */}
    </Link>
  ))}
</div>
```

### 4. Live Preview CSS ✅

**Note**: Live Preview Utils SDK v4.x includes CSS automatically - no manual import needed!

## Live Preview Configuration

### Current Configuration (from `lib/live-preview.ts`)

```typescript
ContentstackLivePreview.init({
  enable: true,
  stackDetails: {
    apiKey: config.apiKey,
    environment: config.environment,
    branch: 'main'
  },
  ssr: true, // ✅ Server-Side Rendering mode
  mode: 'builder', // ✅ Visual Builder mode
  editButton: {
    enable: true,
    includeByQueryParameter: true,
    position: "bottom",
  },
  stackSdk: {
    environment: config.environment,
    live_preview: {
      enable: true,
      preview_token: config.previewToken,
      host: config.host,
    },
  },
  clientUrlParams: {
    protocol: 'https',
    host: window.location.hostname,
    port: parseInt(window.location.port) || 443,
  }
});
```

## To Enable Live Preview

### Step 1: Set Environment Variables

Add to your `.env.local`:

```env
# Live Preview Configuration
CONTENTSTACK_LIVE_PREVIEW_ENABLED=true
CONTENTSTACK_LIVE_PREVIEW_TOKEN=your_preview_token_here
CONTENTSTACK_LIVE_PREVIEW_HOST=rest-preview.contentstack.com

# Or for different regions:
# EU: eu-rest-preview.contentstack.com
# Azure NA: azure-na-rest-preview.contentstack.com
# Azure EU: azure-eu-rest-preview.contentstack.com
```

### Step 2: Get Your Preview Token

1. Go to Contentstack Dashboard
2. Navigate to **Settings** > **Tokens**
3. Create a new **Preview Token** (or use existing)
4. Copy the token value
5. Add it to `.env.local` as `CONTENTSTACK_LIVE_PREVIEW_TOKEN`

### Step 3: Configure Live Preview in Contentstack

1. Go to **Settings** > **Live Preview**
2. Add your preview URL: `http://localhost:3000` (for local dev)
3. Enable Live Preview for the homepage content type
4. Save settings

### Step 4: Test Live Preview

1. Start your dev server: `npm run dev`
2. Go to Contentstack Dashboard
3. Open your homepage entry
4. Click **Live Preview** button
5. You should see your homepage with **Edit** buttons on hover
6. Click any Edit button to jump to that field

## How It Works

### Edit Tags Format

Each editable field has a `data-cslp` attribute with this format:

```
{content_type_uid}.{entry_uid}.{locale}.{field_uid}
```

Example:
```
homepage.blt123abc.en-us.hero_title
```

### Visual Builder Features

**Single Fields:**
- Hover over any text to see **Edit** button
- Click to jump directly to that field in Contentstack

**Multiple Fields (Arrays):**
- **Add** button to add new items
- **Delete** button on each item
- **Drag** to reorder items
- Works with the `products` reference array

### The `$` Object

The SDK automatically adds a `$` object to entries with edit tags:

```typescript
{
  hero_title: "Contentstack Engineering Hub",
  $: {
    hero_title: {
      "data-cslp": "homepage.blt123.en-us.hero_title"
    }
  }
}
```

We spread this in JSX:

```tsx
<h1 {...(homepageContent.$?.hero_title || {})}>
  {homepageContent.hero_title}
</h1>
```

## Troubleshooting

### Edit Buttons Not Appearing

**Problem**: Edit buttons don't show on hover

**Solutions**:
1. Check if Live Preview is enabled in `.env.local`
2. Verify preview token is correct
3. Make sure you're accessing via Live Preview panel in Contentstack
4. Check browser console for errors
5. Ensure CSS is loaded (check Network tab)

### Can't Click Edit Buttons

**Problem**: Edit buttons appear but don't work

**Solutions**:
1. Verify `stackDetails.apiKey` matches your stack
2. Check `clientUrlParams` are correct
3. Ensure you're logged into Contentstack
4. Check browser console for errors

### Products Not Editable

**Problem**: Can't add/delete/reorder products

**Solutions**:
1. Verify `data-add-direction` is set on container
2. Check that `products__${i}` tags are on each item
3. Ensure products field is a reference field in Contentstack
4. Check that the parent div has the `products` edit tag

### Wrong Field Opens

**Problem**: Clicking Edit opens wrong field

**Solutions**:
1. Check that field paths are correct in `$` object
2. Verify entry UID and locale are correct
3. Make sure content type UID is 'homepage'

## Benefits

✅ **Visual Editing** - Click and edit content directly in preview  
✅ **No Code Changes** - Update content without developer involvement  
✅ **Instant Preview** - See changes in real-time  
✅ **Field Navigation** - Jump directly to any field  
✅ **Array Management** - Add/delete/reorder array items visually  
✅ **Better UX** - Content editors love it!  

## Documentation References

- [Set Up Live Edit Tags for Entries with REST](https://www.contentstack.com/docs/developers/set-up-live-preview/set-up-live-edit-tags-for-entries-with-rest)
- [Live Preview Implementation for Next.js SSR App Router](https://www.contentstack.com/docs/developers/set-up-live-preview/live-preview-implementation-for-nextjs-ssr-app-router)
- [Live Preview Utils SDK Documentation](https://www.contentstack.com/docs/developers/set-up-live-preview/get-started-with-live-preview-utils-sdk)

## Files Modified

1. ✅ `lib/contentstack.ts` - Added $ and metadata fields to response
2. ✅ `types/product.ts` - Added Live Preview fields to HomePageContent interface
3. ✅ `app/page.tsx` - Added edit tags to all editable fields
4. ✅ `app/globals.css` - Added Live Preview CSS import
5. ✅ `components/HomepageLivePreview.tsx` - Created (for future enhancements)

## Next Steps

1. **Enable Live Preview** - Add environment variables
2. **Test It** - Open homepage in Live Preview panel
3. **Train Editors** - Show content team how to use it
4. **Add More Tags** - Add edit tags to other sections as needed
5. **Monitor Usage** - Check if editors find it helpful

---

**Status**: ✅ Implementation Complete  
**Version**: 1.0.0  
**Date**: December 18, 2025  
**Ready for**: Live Preview Enabling

