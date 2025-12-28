# Live Preview Utils SDK v3 Configuration Fixes

## Overview

Based on the [official Contentstack Live Preview Utils SDK v3 documentation](https://www.contentstack.com/docs/developers/set-up-live-preview/get-started-with-live-preview-utils-sdk-v3#installation-and-setup), several critical configuration issues were identified and fixed.

## Issues Found and Fixed

### ✅ Issue 1: Incorrect `stackSdk` Usage in SSR Mode

**Problem**: The configuration included `stackSdk` object while using `ssr: true`.

**Documentation Reference**:
> The stackSdk object represents the Stack class obtained by executing the Contentstack.Stack() method. It is essential for **Client-Side Rendering (CSR)** to inject the Live Preview hash and content type UID into the Stack class.

**Why This Was Wrong**:
- `stackSdk` is ONLY for CSR mode (`ssr: false`)
- When `ssr: true`, the SDK requests a fresh HTML page on each content edit
- Including `stackSdk` in SSR mode causes confusion and potential errors

**Fix Applied**:
```typescript
// BEFORE (Incorrect)
ContentstackLivePreview.init({
  ssr: true,
  stackSdk: {
    environment: config.environment,
    deliveryToken: config.deliveryToken,
    // ... more config
  }
});

// AFTER (Correct)
ContentstackLivePreview.init({
  ssr: true,
  // stackSdk removed - not needed for SSR mode
});
```

**File Changed**: `lib/live-preview.ts`

---

### ✅ Issue 2: Hardcoded Port in `clientUrlParams`

**Problem**: Port was hardcoded to `443`, which doesn't work for local development on port `3000`.

**Documentation Reference**:
> The clientUrlParams object specifies the stack's URL details for your webpage content.

**Why This Was Wrong**:
- Local development uses `http://localhost:3000`
- Production uses `https://domain.com:443`
- Hardcoding `443` breaks local Live Preview

**Fix Applied**:
```typescript
// BEFORE (Incorrect)
clientUrlParams: {
  protocol: 'https',
  host: 'localhost',
  port: 443, // Wrong for local dev!
}

// AFTER (Correct)
clientUrlParams: {
  protocol: typeof window !== 'undefined' 
    ? window.location.protocol.replace(':', '') as 'http' | 'https' 
    : 'https',
  host: typeof window !== 'undefined' 
    ? window.location.hostname 
    : 'localhost',
  port: typeof window !== 'undefined' 
    ? (parseInt(window.location.port) || (window.location.protocol === 'https:' ? 443 : 80)) 
    : 3000,
}
```

**File Changed**: `lib/live-preview.ts`

---

### ✅ Issue 3: Incorrect Boolean Check

**Problem**: Used `config.enabled != true` instead of proper boolean check.

**Why This Was Wrong**:
- `!=` allows type coercion (loose equality)
- Could cause unexpected behavior with truthy/falsy values
- Not following TypeScript best practices

**Fix Applied**:
```typescript
// BEFORE (Incorrect)
if (config.enabled != true) {
  return;
}

// AFTER (Correct)
if (!config.enabled) {
  return;
}
```

**File Changed**: `lib/live-preview.ts`

---

### ✅ Issue 4: Edit Button Configuration

**Problem**: 
- `includeByQueryParameter` was set to `false`
- `editInVisualBuilderButton` property doesn't exist in v3.x
- Position was `"top-right"` instead of standard `"top"`

**Documentation Reference**:
> **includeByQueryParameter**: The includeByQueryParameter property overrides the cslp-buttons query parameter to enable/disable the "Edit" button.
> 
> **position**: The position property places the "Edit" button in predefined positions (e.g., top-right, bottom-center). Default: "top"

**Fix Applied**:
```typescript
// BEFORE (Incorrect)
editButton: {
  enable: true,
  includeByQueryParameter: false, // Wrong - prevents testing with ?cslp-buttons=true
  position: "top-right",
},
editInVisualBuilderButton: { // This property doesn't exist in v3!
  enable: false
}

// AFTER (Correct)
editButton: {
  enable: true,
  includeByQueryParameter: true, // Allows testing with query parameter
  position: "top", // Standard position
}
// editInVisualBuilderButton removed
```

**File Changed**: `lib/live-preview.ts`

---

### ✅ Issue 5: Environment Configuration

**Problem**: `stackDetails.environment` was hardcoded to `'production'`.

**Why This Was Wrong**:
- Should use the actual environment from config
- Prevents proper environment-specific Live Preview

**Fix Applied**:
```typescript
// BEFORE (Incorrect)
stackDetails: {
  apiKey: config.apiKey,
  environment: 'production', // Hardcoded!
}

// AFTER (Correct)
stackDetails: {
  apiKey: config.apiKey,
  environment: config.environment, // Dynamic from env vars
}
```

**File Changed**: `lib/live-preview.ts`

---

### ℹ️ Note: `addEditableTags()` Not Available in v3.x

**Documentation Check**: The `addEditableTags()` method is not documented in the v3.x SDK documentation.

**What We Found**:
- This method doesn't exist in `@contentstack/live-preview-utils@3.4.0`
- The `$` metadata object is automatically included by the Contentstack Delivery SDK when Live Preview is enabled
- No manual addition of edit tags is needed

**Current Implementation**:
- Edit tags are added via spread operator in JSX: `{...homepageContent.$?.hero_title}`
- The SDK automatically includes the `$` object in fetched entries
- This works correctly for both Live Preview and Visual Builder

---

## Final Configuration

### `lib/live-preview.ts` (Corrected)

```typescript
ContentstackLivePreview.init({
  enable: true,
  stackDetails: {
    apiKey: config.apiKey,
    environment: config.environment, // ✅ Dynamic
  },
  ssr: true, // ✅ SSR mode - page refreshes on content changes
  mode: 'builder', // ✅ Supports both Live Preview and Visual Builder
  editButton: {
    enable: true, // ✅ Show edit buttons
    includeByQueryParameter: true, // ✅ Allow ?cslp-buttons=true
    position: "top", // ✅ Standard position
  },
  // ✅ stackSdk removed - not needed for SSR
  clientUrlParams: {
    protocol: typeof window !== 'undefined' 
      ? window.location.protocol.replace(':', '') as 'http' | 'https' 
      : 'https',
    host: typeof window !== 'undefined' 
      ? window.location.hostname 
      : 'localhost',
    port: typeof window !== 'undefined' 
      ? (parseInt(window.location.port) || (window.location.protocol === 'https:' ? 443 : 80)) 
      : 3000, // ✅ Dynamic port
  }
});
```

---

## Testing Checklist

### Local Development Testing

- [ ] Start dev server: `npm run dev`
- [ ] Open http://localhost:3000
- [ ] Add query parameter: http://localhost:3000?cslp-buttons=true
- [ ] Verify edit buttons appear on hover
- [ ] Check browser console for: `✅ Live Preview initialized successfully`

### Live Preview Testing

- [ ] Open Contentstack Dashboard: https://app.contentstack.com
- [ ] Navigate to **Entries** → **homepage**
- [ ] Click **Live Preview** button
- [ ] Verify your app loads in iframe (no X-Frame-Options error)
- [ ] Hover over content to see edit buttons
- [ ] Click edit button - should jump to field in Contentstack
- [ ] Edit content in Contentstack
- [ ] Verify page refreshes with new content (SSR mode)

### Visual Builder Testing

- [ ] Open homepage entry in Contentstack
- [ ] Click **Visual Builder** button
- [ ] Verify your app loads in Visual Builder iframe
- [ ] Hover over content to see edit buttons
- [ ] Click **Start Editing** button
- [ ] Edit content inline
- [ ] Verify changes appear immediately

---

## Configuration Comparison

| Setting | Before (Incorrect) | After (Correct) | Reason |
|---------|-------------------|-----------------|--------|
| `stackSdk` | Included | ❌ Removed | Not needed for SSR mode |
| `clientUrlParams.port` | `443` (hardcoded) | Dynamic detection | Support local dev (port 3000) |
| `enabled` check | `!= true` | `!config.enabled` | Proper boolean check |
| `editButton.includeByQueryParameter` | `false` | `true` | Enable testing with query param |
| `editButton.position` | `"top-right"` | `"top"` | Standard position |
| `editInVisualBuilderButton` | Included | ❌ Removed | Doesn't exist in v3.x |
| `stackDetails.environment` | `'production'` | `config.environment` | Dynamic environment |

---

## Documentation References

1. **Live Preview Utils SDK v3 Documentation**:  
   https://www.contentstack.com/docs/developers/set-up-live-preview/get-started-with-live-preview-utils-sdk-v3#installation-and-setup

2. **Visual Builder Navigation**:  
   https://www.contentstack.com/docs/content-managers/visual-builder/navigating-your-website-in-visual-builder

3. **SSR vs CSR Configuration**:
   - **SSR Mode** (`ssr: true`): Page refreshes on content changes, no `stackSdk` needed
   - **CSR Mode** (`ssr: false`): Dynamic updates without refresh, requires `stackSdk`

---

## Summary

✅ **All Issues Fixed**:
1. Removed `stackSdk` from SSR configuration
2. Fixed dynamic port detection for local development
3. Corrected boolean check for `enabled` flag
4. Updated edit button configuration for proper testing
5. Made environment configuration dynamic
6. Removed non-existent `editInVisualBuilderButton` property

✅ **Configuration Now Follows**:
- Official Contentstack v3.x documentation
- SSR mode best practices
- TypeScript best practices
- Local development + production compatibility

✅ **Ready for Testing**:
- Live Preview in Contentstack Dashboard
- Visual Builder for inline editing
- Local development with edit buttons
- Production deployment

---

## Next Steps

1. **Restart Development Server**:
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

2. **Test Locally**:
   - Visit: http://localhost:3000?cslp-buttons=true
   - Verify edit buttons appear

3. **Test in Contentstack**:
   - Open Live Preview
   - Verify iframe loads
   - Test edit button functionality

4. **Update Environment Variables** (if needed):
   ```env
   CONTENTSTACK_LIVE_PREVIEW_ENABLED=true
   CONTENTSTACK_LIVE_PREVIEW_TOKEN=your_preview_token_here
   CONTENTSTACK_LIVE_PREVIEW_HOST=rest-preview.contentstack.com
   ```

---

**Status**: ✅ All configuration issues resolved and aligned with official documentation

