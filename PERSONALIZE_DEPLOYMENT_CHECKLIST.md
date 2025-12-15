# Personalize Deployment Checklist

Use this checklist when deploying your Personalize-enabled application to Launch.

## Pre-Deployment

- [ ] **Get Personalize Project UID**
  - Navigate to Personalize in Contentstack
  - Go to Settings → General → Project Details
  - Copy the 24-character Project UID

- [ ] **Add Environment Variables to Launch**
  - In Launch project settings, add:
    - `NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID`
    - `NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_EDGE_API_URL` (if not AWS NA)

- [ ] **Verify Edge Function File Exists**
  - Confirm `/functions/[proxy].edge.js` is in your repository
  - This file will be automatically deployed with your Launch project

- [ ] **Test Locally**
  ```bash
  npm run dev
  # Check browser console for: ✅ Personalize SDK initialized successfully
  ```

## Deployment

- [ ] **Build and Deploy**
  ```bash
  npm run build
  # Deploy to Launch
  ```

- [ ] **Verify Edge Function is Running**
  - After deployment, open your site
  - Open DevTools → Network tab
  - Navigate to any page
  - Check for `personalize_variants` query parameter in request URLs

- [ ] **Check SDK Initialization**
  - Open DevTools → Console
  - Look for: `✅ Personalize SDK initialized successfully`

## Post-Deployment

- [ ] **Create Experiences in Personalize**
  - Log into Contentstack Personalize
  - Create your first Experience
  - Define variants
  - Set targeting rules
  - Publish the experience

- [ ] **Add Tracking Code**
  - Add `PersonalizeImpression` components to pages
  - Implement event tracking with `usePersonalizeEvent`
  - Set user attributes where appropriate

- [ ] **Test Impression Tracking**
  - Visit a page with impression tracking
  - Check console for: `📊 Personalize: Impression tracked`
  - Verify in Personalize dashboard

- [ ] **Test Event Tracking**
  - Trigger an event (e.g., click a button)
  - Check console for: `📊 Personalize: Event "eventName" triggered`
  - Verify in Personalize dashboard

- [ ] **Test Attribute Setting**
  - Submit a form or action that sets attributes
  - Check console for: `📊 Personalize: Attributes set`
  - Verify in Personalize dashboard

## Verification Steps

### 1. Edge Function Check
```javascript
// In browser console after page load:
console.log(window.location.search);
// Should include ?personalize_variants=... (if experiences are active)
```

### 2. SDK Status Check
```javascript
// In browser console:
window.jstag
// Should be defined if Lytics is working
```

### 3. Personalize SDK Check
```javascript
// The SDK is initialized in React Context
// Check console logs for initialization message
```

## Troubleshooting

### Edge Function Not Working

- [ ] Verify `/functions/[proxy].edge.js` is deployed
- [ ] Check Launch project settings for environment variables
- [ ] Ensure Project UID is exactly 24 characters
- [ ] Check Edge API URL matches your Contentstack region

### SDK Not Initializing

- [ ] Verify `NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID` is set
- [ ] Check browser console for error messages
- [ ] Ensure the variable starts with `NEXT_PUBLIC_` (required for client-side access)

### Events Not Tracking

- [ ] Confirm SDK is initialized (check console)
- [ ] Verify event keys match those configured in Personalize UI
- [ ] Ensure components using events have `'use client'` directive
- [ ] Check that `PersonalizeProvider` wraps your app in layout.tsx

### Variants Not Showing

- [ ] Verify Experience is published in Personalize
- [ ] Check targeting rules match your test conditions
- [ ] Ensure content variants are created in Contentstack
- [ ] Verify variant aliases are correct

## Region-Specific Configuration

If you're not using AWS NA region, set the correct Edge API URL:

- **AWS EU**: `https://eu-personalize-edge.contentstack.com`
- **Azure NA**: `https://azure-na-personalize-edge.contentstack.com`
- **Azure EU**: `https://azure-eu-personalize-edge.contentstack.com`
- **GCP NA**: `https://gcp-na-personalize-edge.contentstack.com`
- **AWS AU**: `https://au-personalize-edge.contentstack.com`

## Success Criteria

✅ Edge Function runs and injects variant parameters  
✅ SDK initializes without errors  
✅ Impressions are tracked and visible in Personalize dashboard  
✅ Events are triggered and recorded  
✅ User attributes are set correctly  
✅ Personalized content variants are displayed based on experiences  

## Support Resources

- [Personalize Setup Guide](./PERSONALIZE_SETUP.md)
- [Quick Start Guide](./PERSONALIZE_QUICK_START.md)
- [Contentstack Documentation](https://www.contentstack.com/docs/personalize/setup-nextjs-website-with-personalize-launch)

---

**Last Updated:** December 2025

