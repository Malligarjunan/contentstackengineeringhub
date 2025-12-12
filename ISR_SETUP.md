# ISR (Incremental Static Regeneration) Configuration

## ⚡ Quick Solution: 5-Second Cache

I've updated all pages to revalidate every **5 seconds** instead of 1 hour. This is the simplest solution for seeing content updates quickly.

## 📊 Current Configuration

| Page | Revalidate Time | What It Means |
|------|-----------------|---------------|
| Homepage (`/`) | **5 seconds** | After 5s, next visitor triggers rebuild |
| Products Listing (`/products`) | **5 seconds** | Product list updates every 5s |
| Product Details (`/products/[slug]`) | **5 seconds** | Individual product pages update every 5s |

## 🔄 How ISR Works

### With 5-Second Revalidation:

```
1. User A visits page → Gets cached version (or generates new if no cache)
2. 5 seconds pass
3. User B visits page → Gets cached version (still fast!)
4. Next.js rebuilds page in background
5. User C visits page → Gets fresh content!
```

**Timeline:**
```
Publish Content → Wait 5s → Someone visits → Fresh content for next visitor
⏱️  ~5-10 seconds total
```

### Comparison:

| Revalidate Time | Update Delay | Use Case |
|-----------------|--------------|----------|
| **5 seconds** ⚡ | ~5-10s | Development, frequent updates |
| **60 seconds** 🏃 | ~1 min | Active content, good balance |
| **3600 seconds** (1 hour) 🐢 | ~1 hour | Stable content, best performance |

## ✅ Pros of 5-Second ISR

1. ✨ **Near-instant updates** (~5-10 seconds)
2. 🚀 **No webhook setup required**
3. 💪 **Simple to understand**
4. 🎯 **No additional infrastructure**
5. 📦 **Works everywhere** (localhost, Launch, Vercel, etc.)

## ⚠️ Cons of 5-Second ISR

1. 🔄 **More frequent rebuilds** (uses more CPU)
2. 📊 **Slight increase in API calls** to Contentstack
3. 🏗️ **Not truly instant** (still 5-10s delay)

## 🎯 When to Use What

### Use 5-Second ISR When:
- ✅ Content changes frequently
- ✅ You want simple setup
- ✅ You don't need instant updates
- ✅ Traffic is moderate

### Use Webhooks (from QUICK_START.md) When:
- ✅ You need **instant** updates (2-3 seconds)
- ✅ Content changes are predictable (publish events)
- ✅ You want to control exactly when pages rebuild
- ✅ You want to minimize unnecessary rebuilds

### Use 1-Hour ISR When:
- ✅ Content is stable (changes rarely)
- ✅ Performance is critical
- ✅ High traffic site
- ✅ Want to minimize API calls

## 🔧 How to Change ISR Time

If you want a different revalidation time, edit these files:

### 1. Homepage (`app/page.tsx`)
```typescript
// Change this number (in seconds)
export const revalidate = 5;
```

### 2. Products Listing (`app/products/page.tsx`)
```typescript
export const revalidate = 5;
```

### 3. Product Details (`app/products/[slug]/page.tsx`)
```typescript
export const revalidate = 5;
```

### Common Values:
```typescript
export const revalidate = 5;      // 5 seconds (current)
export const revalidate = 30;     // 30 seconds
export const revalidate = 60;     // 1 minute
export const revalidate = 300;    // 5 minutes
export const revalidate = 3600;   // 1 hour (was default)
export const revalidate = false;  // Never revalidate (only on deploy)
```

## 🚀 Testing ISR

### Test on Localhost:
```bash
# Build production version
npm run build

# Start production server
npm start

# Visit http://localhost:3000
# Change content in Contentstack
# Wait 5 seconds
# Refresh the page
# Visit again - you'll see new content!
```

### Test on Launch:

1. **Deploy** your app with the new ISR settings
2. **Visit** your site
3. **Publish** content in Contentstack
4. **Wait 5 seconds**
5. **Refresh** your browser (someone needs to trigger the rebuild)
6. **Refresh again** - you'll see the new content!

## 📊 Monitoring

To see when pages are being rebuilt, check your deployment logs:

```
✅ Contentstack SDK initialized successfully
✅ Fetched homepage content from Contentstack
```

You'll see these logs every time a page rebuilds (every 5 seconds after the first visitor).

## 🎯 Current Setup Summary

**Your app now uses:**
- ✅ **5-second ISR** on all pages
- ✅ Content updates in **5-10 seconds**
- ✅ No webhooks required (but available in QUICK_START.md if you want instant updates)
- ✅ Works on Contentstack Launch automatically

## 🔀 Best of Both Worlds

You can use **both ISR and webhooks** together:
- ISR = Automatic updates every 5 seconds (safety net)
- Webhooks = Instant updates when you publish (faster)

This gives you:
- Instant updates when you publish (via webhook)
- Automatic updates every 5 seconds (even if webhook fails)
- Best reliability!

## 📚 Learn More

- [Next.js ISR Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [On-Demand Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration#on-demand-revalidation)

---

**Current Status:** ✅ All pages set to 5-second revalidation

