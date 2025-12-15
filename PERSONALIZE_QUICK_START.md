# Personalize Quick Start Guide

## ✅ What's Been Set Up

The Contentstack Personalize SDK has been fully integrated into your Next.js application following the [official documentation](https://www.contentstack.com/docs/personalize/setup-nextjs-website-with-personalize-launch).

### Files Created:

1. **`/functions/[proxy].edge.js`** - Launch Edge Function for variant injection
2. **`/components/context/PersonalizeContext.tsx`** - React Context Provider
3. **`/components/PersonalizeImpression.tsx`** - Component for tracking impressions
4. **`/components/PersonalizedCTA.tsx`** - Example personalized CTA component
5. **`/hooks/usePersonalizeEvent.ts`** - Hook for events and attributes
6. **`/lib/personalize-helpers.ts`** - Server-side helper functions

### Files Modified:

- **`/app/layout.tsx`** - Wrapped with `PersonalizeProvider`

## 🚀 Next Steps

### 1. Add Environment Variables

Add to your `.env.local`:

```env
NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID=your_24_char_project_uid
```

**To get your Project UID:**
1. Go to Contentstack → Personalize
2. Select your project
3. Click Settings (gear icon)
4. Copy the 24-character UID from Project Details

### 2. Deploy to Launch

The Edge Function (`/functions/[proxy].edge.js`) will run automatically on Launch once deployed.

```bash
npm run build
# Deploy to Launch following your deployment process
```

### 3. Create Experiences in Personalize

1. Log into Contentstack Personalize
2. Create a new Experience
3. Define variants for your content
4. Set up targeting rules
5. Publish the experience
6. Note the **Experience Short UID** for tracking impressions

### 4. Add Tracking to Your Pages

#### Track Impressions (when experience is shown):

```tsx
import PersonalizeImpression from '@/components/PersonalizeImpression';

export default function HomePage() {
  return (
    <>
      <PersonalizeImpression 
        experienceShortUid="abc123" 
        experienceName="Homepage Hero"
      />
      {/* Your content */}
    </>
  );
}
```

#### Track Conversion Events (user actions):

```tsx
'use client';
import { usePersonalizeEvent } from '@/hooks/usePersonalizeEvent';

export default function ProductCard() {
  const { triggerEvent } = usePersonalizeEvent();

  return (
    <button onClick={() => triggerEvent('product_clicked')}>
      Learn More
    </button>
  );
}
```

#### Set User Attributes:

```tsx
'use client';
import { usePersonalizeEvent } from '@/hooks/usePersonalizeEvent';

export default function ProfileForm() {
  const { setAttribute } = usePersonalizeEvent();

  const handleSubmit = async (data) => {
    await setAttribute({
      role: data.role,
      team: data.team,
      interests: data.interests
    });
  };

  return <form onSubmit={handleSubmit}>{/* fields */}</form>;
}
```

### 5. Use Example Components

We've created a `PersonalizedCTA` component as an example:

```tsx
import PersonalizedCTA from '@/components/PersonalizedCTA';

export default function HomePage() {
  return (
    <section className="py-16 bg-slate-900">
      <PersonalizedCTA 
        title="Start Building Today"
        description="Join thousands of developers"
        primaryButtonText="Get Started"
        primaryButtonUrl="/sign-up"
        eventKey="homepage_cta"
      />
    </section>
  );
}
```

## 🧪 Testing

### Test Locally

1. Add your Project UID to `.env.local`
2. Run `npm run dev`
3. Open browser DevTools Console
4. Look for: `✅ Personalize SDK initialized successfully`

### Test Events

Click buttons with event tracking and check console for:
```
📊 Personalize: Event "eventName" triggered
```

### Test Edge Function (on Launch)

After deploying to Launch:
1. Open DevTools Network tab
2. Navigate to any page
3. Check for `personalize_variants` query parameter in requests

## 📊 Integration Points

### Where to Add Personalize Tracking:

1. **Product Pages** - Track `product_view`, `add_to_cart` events
2. **Documentation** - Track `doc_view`, `doc_helpful` events  
3. **CTA Sections** - Track `cta_clicked`, `signup_started` events
4. **Forms** - Set attributes like `role`, `team`, `interests`
5. **Navigation** - Track `navigation_clicked` events

### Example: Add to Product Detail Page

```tsx
// In /app/products/[slug]/page.tsx
import PersonalizeImpression from '@/components/PersonalizeImpression';

export default function ProductPage({ product }) {
  return (
    <>
      <PersonalizeImpression 
        experienceShortUid="prod_001" 
        experienceName="Product Page Hero"
      />
      {/* Rest of your product page */}
    </>
  );
}
```

## 📖 Full Documentation

See `PERSONALIZE_SETUP.md` for complete documentation including:
- Detailed architecture explanation
- Region-specific Edge API URLs
- Advanced usage patterns
- Troubleshooting guide
- API references

## 🎯 Common Event Keys to Configure

Set these up in Personalize UI:

- `page_view` - Page visits
- `cta_clicked` - CTA interactions
- `product_view` - Product page views
- `doc_view` - Documentation views
- `search_performed` - Search usage
- `signup_started` - Registration begins
- `signup_completed` - Registration completes
- `download_clicked` - Resource downloads

## 🆘 Need Help?

- [Contentstack Personalize Docs](https://www.contentstack.com/docs/personalize/setup-nextjs-website-with-personalize-launch)
- [Personalize Edge SDK API Reference](https://www.contentstack.com/docs/personalize/personalize-edge-sdk)
- [Community Forum](https://www.contentstack.com/community)

---

**Status:** ✅ Setup Complete - Ready for configuration and deployment!

