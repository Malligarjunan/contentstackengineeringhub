# Contentstack Personalize Setup Guide

This guide explains how to use the Contentstack Personalize integration in this Next.js application.

## Overview

The Personalize SDK has been integrated following the [official Contentstack documentation](https://www.contentstack.com/docs/personalize/setup-nextjs-website-with-personalize-launch) for Next.js websites hosted on Launch.

## Architecture

1. **Edge Function (`/functions/[proxy].edge.js`)**: Runs on Launch Edge to fetch User Manifest and inject variant parameters into URLs
2. **React Context (`PersonalizeContext.tsx`)**: Provides Personalize SDK instance to all client components
3. **Helper Components & Hooks**: Utilities for tracking impressions, events, and setting attributes

## Environment Variables

Add these to your `.env.local` file:

```env
# Personalize Configuration
NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID=your_24_char_project_uid

# Optional: Custom Edge API URL (if not using AWS NA region)
NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_EDGE_API_URL=https://personalize-edge.contentstack.com
```

### Edge API URLs by Region

- **AWS NA**: `https://personalize-edge.contentstack.com` (default)
- **AWS EU**: `https://eu-personalize-edge.contentstack.com`
- **Azure NA**: `https://azure-na-personalize-edge.contentstack.com`
- **Azure EU**: `https://azure-eu-personalize-edge.contentstack.com`
- **GCP NA**: `https://gcp-na-personalize-edge.contentstack.com`
- **AWS AU**: `https://au-personalize-edge.contentstack.com`

## How to Get Your Personalize Project UID

1. Log in to your Contentstack account
2. Navigate to **Personalize** and select your project
3. Click the **Settings** icon in the left navigation panel
4. In the **General** tab, under **Project Details**, find the 24-character project UID
5. Click the **Copy** icon to copy it

## Usage Examples

### 1. Track Impression Events

Use the `PersonalizeImpression` component to track when an experience is shown to a user:

```tsx
import PersonalizeImpression from '@/components/PersonalizeImpression';

export default function MyPage() {
  return (
    <div>
      {/* Track that this experience variant was shown */}
      <PersonalizeImpression 
        experienceShortUid="abc123" 
        experienceName="Homepage Hero Variant"
      />
      
      {/* Your page content */}
      <h1>Welcome!</h1>
    </div>
  );
}
```

### 2. Trigger Conversion Events

Use the `usePersonalizeEvent` hook to trigger events when users take actions:

```tsx
'use client';

import { usePersonalizeEvent } from '@/hooks/usePersonalizeEvent';

export default function CallToAction() {
  const { triggerEvent } = usePersonalizeEvent();

  const handleClick = async () => {
    // Trigger a conversion event
    await triggerEvent('cta_clicked');
    
    // Your other logic...
    window.location.href = '/sign-up';
  };

  return (
    <button onClick={handleClick}>
      Get Started
    </button>
  );
}
```

### 3. Set User Attributes

Use the `setAttribute` method to track user properties:

```tsx
'use client';

import { usePersonalizeEvent } from '@/hooks/usePersonalizeEvent';

export default function UserProfileForm() {
  const { setAttribute } = usePersonalizeEvent();

  const handleSubmit = async (formData) => {
    // Set user attributes in Personalize
    await setAttribute({
      role: formData.role,
      team: formData.team,
      experience_level: formData.experienceLevel,
      interests: formData.interests
    });
    
    // Save to your backend...
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### 4. Fetch Personalized Content

The Edge Function automatically adds variant parameters to URLs. To fetch personalized content in your pages:

```tsx
import { getVariantParamFromSearchParams, applyVariantsToQuery } from '@/lib/personalize-helpers';

export default async function MyPage({ searchParams }: { searchParams: any }) {
  const variantParam = getVariantParamFromSearchParams(searchParams);
  
  // Your Contentstack query
  const entryQuery = stack
    .contentType('homepage')
    .entry('your_entry_uid');
  
  // Apply variants if available
  const entry = await applyVariantsToQuery(entryQuery, variantParam).fetch();
  
  // Use the entry data (will be personalized variant if available)
  return <div>{entry.title}</div>;
}
```

## Integration with Lytics

This setup works alongside the existing Lytics tracking. Both systems can track user behavior:

- **Lytics**: Broader visitor tracking and analytics
- **Personalize**: Experience variant selection and conversion tracking

## Testing

### 1. Check SDK Initialization

Open browser DevTools Console and look for:
```
✅ Personalize SDK initialized successfully
```

### 2. Verify Edge Function

The Edge Function should inject the `personalize_variants` query parameter into URLs. Check the Network tab for requests with this parameter.

### 3. Test Events

When triggering events, you should see console logs:
```
📊 Personalize: Event "eventName" triggered
```

## Troubleshooting

### SDK Not Initializing

- Verify `NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID` is set correctly
- Check browser console for error messages
- Ensure the project UID is exactly 24 characters

### Variants Not Being Applied

- Verify the Edge Function is running on Launch
- Check that `/functions/[proxy].edge.js` is being deployed
- Ensure the Edge API URL matches your Contentstack region

### Events Not Tracking

- Confirm SDK is initialized (check console logs)
- Verify events are configured in Personalize UI with correct event keys
- Check that components are client-side (`'use client'` directive)

## Additional Resources

- [Contentstack Personalize Documentation](https://www.contentstack.com/docs/personalize/setup-nextjs-website-with-personalize-launch)
- [Personalize Edge SDK API Reference](https://www.contentstack.com/docs/personalize/personalize-edge-sdk)
- [Launch Edge Functions Documentation](https://www.contentstack.com/docs/launch/edge-functions)

## Files Created

- `/functions/[proxy].edge.js` - Edge function for Launch
- `/components/context/PersonalizeContext.tsx` - React Context provider
- `/components/PersonalizeImpression.tsx` - Impression tracking component
- `/hooks/usePersonalizeEvent.ts` - Event and attribute hook
- `/lib/personalize-helpers.ts` - Server-side helpers

