# Visual Builder Setup Checklist

## Overview

Visual Builder allows you to easily create and edit pages, manage taxonomy and localization, and integrate apps like AI Assistant and Image Preset for an enhanced digital experience.

**Status**: 🎉 **ALL REQUIREMENTS MET!**

---

## Setup Verification

### ✅ 1. Configure the Environment

**Requirement**: Set up environment variables for Contentstack connection

**Status**: ✅ **CONFIGURED**

**Configuration**:
```env
NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=production
CONTENTSTACK_API_KEY=bltf8cdf...7ee8
CONTENTSTACK_DELIVERY_TOKEN=cs608d9c...6475
```

**Verification**:
- ✅ Environment variable is set
- ✅ Using `NEXT_PUBLIC_` prefix for client-side access
- ✅ Environment is `production`

**How to verify**:
```bash
npm run validate-credentials
# Should show: ✅ NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT: production
```

---

### ✅ 2. Validate the Default Environment

**Requirement**: Ensure the default environment is correctly configured

**Status**: ✅ **VALID**

**Current Environment**: `production`

**Configuration Location**: `.env.local`
```env
NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=production
```

**Used In**:
- `lib/contentstack.ts`: For fetching content
- `lib/live-preview.ts`: For Live Preview configuration

**Verification Result**:
```bash
npm run validate-credentials
# Output:
# ✅ Environment Variables: VALID
# ✅ API Key & Delivery Token: VALID
# ✅ Found 18 product entries
```

✅ **Environment is working correctly!**

---

### ✅ 3. Validate the Base URL

**Requirement**: Configure the base URL for your application

**Status**: ✅ **CONFIGURED**

**Current Base URL**: 
- **Local Development**: `http://localhost:3000`
- **Production**: Will be your deployed URL (e.g., `https://your-app.vercel.app`)

**Configuration in `lib/live-preview.ts`**:
```typescript
clientUrlParams: {
  protocol: typeof window !== 'undefined' 
    ? window.location.protocol.replace(':', '') as 'http' | 'https' 
    : 'https',
  host: typeof window !== 'undefined' 
    ? window.location.hostname 
    : 'localhost',
  port: typeof window !== 'undefined' 
    ? (parseInt(window.location.port) || 
       (window.location.protocol === 'https:' ? 443 : 80)) 
    : 3000,
}
```

**How It Works**:
- ✅ **Automatic Detection**: Base URL is detected from `window.location`
- ✅ **Local Dev**: Uses `http://localhost:3000`
- ✅ **Production**: Uses actual deployment URL
- ✅ **Dynamic Port**: Automatically detects the correct port

**Test Current Base URL**:
```bash
# Start dev server
npm run dev

# Visit in browser and check console
# You should see: ✅ Live Preview initialized successfully
```

---

### ✅ 4. Install the Latest Live Preview SDK

**Requirement**: Install `@contentstack/live-preview-utils` SDK

**Status**: ✅ **INSTALLED**

**Current Version**: `3.4.0`

**Installation Verified**:
```bash
npm list @contentstack/live-preview-utils
# Output:
# contentstack-engineering-hub@0.1.0
# └── @contentstack/live-preview-utils@3.4.0
```

**Package.json**:
```json
{
  "dependencies": {
    "@contentstack/live-preview-utils": "^3.4.0"
  }
}
```

**SDK Features**:
- ✅ Live Preview mode support
- ✅ Visual Builder mode support
- ✅ Edit button functionality
- ✅ Real-time content updates
- ✅ SSR (Server-Side Rendering) support

**Documentation**: [Live Preview Utils SDK v3](https://www.contentstack.com/docs/developers/set-up-live-preview/get-started-with-live-preview-utils-sdk-v3)

---

### ✅ 5. Verify Mode for Live Preview

**Requirement**: Configure mode to support Visual Builder

**Status**: ✅ **CONFIGURED AS 'builder'**

**Configuration in `lib/live-preview.ts`**:
```typescript
ContentstackLivePreview.init({
  enable: true,
  ssr: true, // Server-Side Rendering mode
  mode: 'builder', // ✅ Supports both Live Preview and Visual Builder
  editButton: {
    enable: true,
    includeByQueryParameter: true,
    position: "top",
  },
  // ... other config
});
```

**Mode Options**:
| Mode | Supports Live Preview? | Supports Visual Builder? | Edit Button Behavior |
|------|------------------------|--------------------------|---------------------|
| `preview` | ✅ Yes | ❌ No | Opens Live Preview panel |
| `builder` | ✅ Yes | ✅ **Yes** | Opens Visual Builder |

**Why 'builder' is Better**:
- ✅ Works in both Live Preview AND Visual Builder
- ✅ Enables inline editing in Visual Builder
- ✅ Allows content manipulation (add, delete, reorder)
- ✅ Backward compatible with Live Preview mode

**Verification**:
```bash
# Check console when app loads in browser
# Should see: ✅ Live Preview initialized successfully
# Mode: builder
```

---

### ✅ 6. Validate the Preview Token / API Key

**Requirement**: Verify all credentials are valid

**Status**: ✅ **ALL VALID**

**Validation Results**:
```bash
npm run validate-credentials

# Output:
# ✅ Environment Variables: VALID
# ✅ API Key & Delivery Token: VALID  
# ✅ Preview Token: VALID
# ✅ Live Preview Setup: VALID
```

**Credentials Verified**:
- ✅ **API Key**: `bltf8cdf...7ee8` - VALID
- ✅ **Delivery Token**: `cs608d9c...6475` - VALID
- ✅ **Preview Token**: `cs516552...ea88` - VALID
- ✅ **Environment**: `production` - VALID

**What Was Tested**:
1. Connection to Contentstack API
2. Fetching content (found 18 products)
3. Preview API access
4. Live Preview configuration

**Detailed Results**: See `CREDENTIALS_VALIDATION_RESULTS.md`

---

## Additional Configuration Verified

### ✅ 7. CSP Headers for iframe Embedding

**Requirement**: Allow Contentstack to embed your app in iframe

**Status**: ✅ **CONFIGURED**

**Configuration in `next.config.ts`**:
```typescript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "frame-ancestors 'self' https://app.contentstack.com https://eu-app.contentstack.com ..."
        }
      ]
    }
  ];
}
```

**Allows Embedding From**:
- ✅ `https://app.contentstack.com` (US region)
- ✅ `https://eu-app.contentstack.com` (EU region)
- ✅ `https://azure-na-app.contentstack.com` (Azure NA)
- ✅ `https://azure-eu-app.contentstack.com` (Azure EU)
- ✅ `https://gcp-na-app.contentstack.com` (GCP NA)
- ✅ `https://gcp-eu-app.contentstack.com` (GCP EU)
- ✅ `http://localhost:3000` (Local development)

**Documentation**: See `IFRAME_CONFIGURATION.md`

---

### ✅ 8. Edit Tags Implementation

**Requirement**: Add data-cslp attributes for editable fields

**Status**: ✅ **IMPLEMENTED**

**Edit Tags Found**: 12 fields in `app/page.tsx`

**Examples**:
```typescript
// Hero section
<h1 {...(homepageContent.$?.hero_title || {})}>
  {homepageContent.hero_title}
</h1>

// Description
<p {...(homepageContent.$?.hero_description || {})}>
  {homepageContent.hero_description}
</p>

// Products section
<div {...(homepageContent.$?.products || {})}>
  {/* Products grid */}
</div>
```

**What This Enables**:
- ✅ Hover to see edit buttons
- ✅ Click to jump to field
- ✅ Visual Builder inline editing
- ✅ Field highlighting in Contentstack

**Documentation**: See `EDIT_TAGS_EXPLAINED.md`

---

### ✅ 9. Live Preview Provider

**Requirement**: Initialize SDK on client-side

**Status**: ✅ **CONFIGURED**

**Implementation in `app/layout.tsx`**:
```typescript
import LivePreviewProvider from '@/components/LivePreviewProvider';
import { getLivePreviewConfig } from '@/lib/live-preview';

export default function RootLayout({ children }) {
  const livePreviewConfig = getLivePreviewConfig();
  
  return (
    <html>
      <body>
        <LivePreviewProvider config={livePreviewConfig}>
          {children}
        </LivePreviewProvider>
      </body>
    </html>
  );
}
```

**What It Does**:
- ✅ Initializes Live Preview SDK on page load
- ✅ Enables real-time content updates
- ✅ Activates edit buttons
- ✅ Connects to Contentstack

---

## Complete Setup Summary

| Requirement | Status | Details |
|-------------|--------|---------|
| 1. Configure Environment | ✅ **DONE** | production environment set |
| 2. Validate Default Environment | ✅ **VALID** | Tested and working |
| 3. Validate Base URL | ✅ **CONFIGURED** | Dynamic detection working |
| 4. Install Latest SDK | ✅ **DONE** | v3.4.0 installed |
| 5. Verify Mode | ✅ **DONE** | 'builder' mode configured |
| 6. Validate Tokens | ✅ **VALID** | All credentials verified |
| 7. CSP Headers | ✅ **DONE** | iframe embedding allowed |
| 8. Edit Tags | ✅ **DONE** | 12 fields tagged |
| 9. Live Preview Provider | ✅ **DONE** | SDK initialized |

**Overall Status**: 🎉 **100% COMPLETE!**

---

## How to Test Visual Builder

### Step 1: Start Development Server

```bash
npm run dev
```

Server should start on: `http://localhost:3000`

### Step 2: Open Contentstack Dashboard

1. Go to: https://app.contentstack.com
2. Navigate to your stack
3. Go to **Entries** → **homepage**

### Step 3: Open Visual Builder

1. Click the **"Visual Builder"** button (top right)
2. Your app should load in the Visual Builder iframe
3. You should see your homepage content

### Step 4: Test Edit Functionality

#### Edit Buttons (Hover Mode)
1. Hover over any text (e.g., hero title)
2. Purple **"Edit"** button should appear
3. Click the Edit button
4. Should jump to that field in Contentstack sidebar

#### Start Editing (Inline Mode)
1. Click **"Start Editing"** button in Visual Builder
2. Now you can click directly on content to edit
3. Changes appear in real-time
4. Save changes in Contentstack

### Step 5: Test Visual Builder Features

#### ✅ Add Content
- Click on a field with multiple items (e.g., products)
- Click **"+ Add"** button
- Add new item inline

#### ✅ Delete Content
- Hover over an item
- Click **"Delete"** button (trash icon)
- Item removed from preview

#### ✅ Reorder Content
- Drag and drop items
- New order reflected immediately
- Save to persist changes

#### ✅ Edit Text
- Click on text fields
- Type new content
- See changes in real-time

---

## Troubleshooting

### Issue: Visual Builder Doesn't Load

**Symptoms**: Blank screen or error in Visual Builder

**Solutions**:
1. ✅ Check dev server is running: `npm run dev`
2. ✅ Verify CSP headers: See `next.config.ts`
3. ✅ Check browser console for errors
4. ✅ Ensure Preview Token is valid: `npm run validate-credentials`

### Issue: Edit Buttons Don't Appear

**Symptoms**: No edit buttons when hovering

**Solutions**:
1. ✅ Check mode is 'builder': `lib/live-preview.ts`
2. ✅ Verify edit tags exist: `app/page.tsx`
3. ✅ Check browser console: Should see "Live Preview initialized"
4. ✅ Try with query parameter: `?cslp-buttons=true`

### Issue: Can't Click to Edit

**Symptoms**: Edit buttons appear but don't work

**Solutions**:
1. ✅ Ensure you're IN Visual Builder (not just Live Preview)
2. ✅ Click **"Start Editing"** button first
3. ✅ Check Preview Token is valid
4. ✅ Verify edit tags syntax is correct

### Issue: Changes Don't Save

**Symptoms**: Edits appear but don't persist

**Solutions**:
1. ✅ Click **"Save"** button in Contentstack
2. ✅ Check you have edit permissions
3. ✅ Verify entry is not locked by another user
4. ✅ Check for validation errors in Contentstack

---

## Production Deployment

### Update Base URL for Production

When deploying to production (e.g., Vercel):

1. **No code changes needed!** Base URL is detected automatically
2. Deploy your app
3. Get your production URL (e.g., `https://your-app.vercel.app`)
4. Configure in Contentstack:
   - Go to **Settings** → **Live Preview**
   - Update Preview URL to your production URL
   - Save settings

### Verify Production Setup

```bash
# After deployment
# Visit your production URL
https://your-app.vercel.app

# Check browser console
# Should see: ✅ Live Preview initialized successfully
```

---

## Documentation Reference

| Document | Purpose |
|----------|---------|
| `VISUAL_BUILDER_SETUP_CHECKLIST.md` | This checklist |
| `CREDENTIALS_VALIDATION_RESULTS.md` | Token validation details |
| `LIVE_PREVIEW_V3_FIXES.md` | SDK configuration fixes |
| `EDIT_TAGS_EXPLAINED.md` | How edit tags work |
| `IFRAME_CONFIGURATION.md` | CSP headers setup |
| `ENABLE_LIVE_PREVIEW.md` | Environment setup guide |

---

## Quick Reference Commands

```bash
# Validate credentials
npm run validate-credentials

# Start development server
npm run dev

# Check SDK version
npm list @contentstack/live-preview-utils

# View environment variables
cat .env.local | grep CONTENTSTACK
```

---

## Support & Resources

### Official Documentation
- [Visual Builder Guide](https://www.contentstack.com/docs/content-managers/visual-builder/navigating-your-website-in-visual-builder)
- [Live Preview Utils SDK v3](https://www.contentstack.com/docs/developers/set-up-live-preview/get-started-with-live-preview-utils-sdk-v3)
- [Set Up Live Edit Tags](https://www.contentstack.com/docs/developers/set-up-live-preview/set-up-live-edit-tags-for-entries-with-rest)

### Your Documentation
- Complete setup guides in `/docs` folder
- Validation scripts in `/scripts` folder
- Configuration examples in code comments

---

## Summary

✅ **All Visual Builder requirements are met!**

Your application is fully configured and ready for Visual Builder:

- ✅ Environment configured
- ✅ Base URL detection working
- ✅ Latest SDK installed (v3.4.0)
- ✅ Mode set to 'builder'
- ✅ All credentials valid
- ✅ CSP headers configured
- ✅ Edit tags implemented
- ✅ Live Preview provider active

**Status**: 🎉 **READY TO USE VISUAL BUILDER!**

**Next Step**: Open Contentstack → Entries → homepage → **Visual Builder** button

---

**Last Verified**: December 28, 2025  
**Setup Completion**: 100%  
**Action Required**: None - Start using Visual Builder!


