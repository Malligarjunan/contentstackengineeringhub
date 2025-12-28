# Loading Flow Diagram

## User Navigation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER CLICKS LINK                         │
│                      (e.g., "Products" link)                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    TOP LOADING BAR APPEARS                       │
│  ═══════════════════════════════════════════════════════════    │
│                    (Indigo progress bar)                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   FULL PAGE LOADER SHOWS                         │
│                                                                   │
│                          ⟳ Loading...                            │
│                    Loading Content...                            │
│                  Fetching from Contentstack                      │
│                         • • •                                    │
│                                                                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              SERVER FETCHES DATA FROM CONTENTSTACK               │
│                                                                   │
│  1. API Call to Contentstack                                     │
│  2. Fetch products/homepage content                              │
│  3. Transform data                                               │
│  4. Render page HTML                                             │
│                                                                   │
│                    Duration: 1-3 seconds                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                  LOADING BAR COMPLETES                           │
│  ════════════════════════════════════════════════════════════   │
│                        (Fades out)                               │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PAGE CONTENT APPEARS                          │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                           │   │
│  │              PRODUCTS PAGE CONTENT                        │   │
│  │                                                           │   │
│  │  [Product 1]  [Product 2]  [Product 3]                   │   │
│  │  [Product 4]  [Product 5]  [Product 6]                   │   │
│  │                                                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

## Timeline

```
Time    Event
────────────────────────────────────────────────────────────────
0ms     User clicks link
        
10ms    ├─ Top loading bar appears (indigo)
        └─ Next.js starts navigation

50ms    ├─ Full page loader shows
        │  ⟳ Spinner animation
        │  "Loading Content..." text
        └─ Animated dots

100ms   ├─ Server receives request
        └─ Starts fetching from Contentstack

500ms   ├─ Contentstack API responds
        └─ Data transformation begins

1000ms  ├─ Page rendering on server
        └─ Loading bar at ~70%

1500ms  ├─ HTML ready
        └─ Loading bar at ~90%

2000ms  ├─ Page sent to browser
        └─ Loading bar completes

2100ms  ├─ Loading indicators fade out
        └─ Page content appears

2200ms  ✅ User sees full page
        └─ Navigation complete
```

## Component Hierarchy

```
app/layout.tsx
│
├─ <NextTopLoader />           ← Top loading bar (always visible)
│   └─ Indigo progress bar
│
└─ <main>
    │
    ├─ app/page.tsx            ← Homepage
    │   └─ loading.tsx         ← Shows while page.tsx loads
    │       └─ <PageLoader />
    │
    ├─ app/products/page.tsx   ← Products page
    │   └─ loading.tsx         ← Shows while page.tsx loads
    │       └─ <PageLoader />
    │
    └─ app/products/[slug]/page.tsx  ← Product detail
        └─ loading.tsx               ← Shows while page.tsx loads
            └─ <PageLoader />
```

## Loading States

```
┌──────────────────────────────────────────────────────────┐
│                    LOADING STATES                         │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  State 1: IDLE                                            │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Normal page content visible                     │    │
│  │  No loaders showing                              │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
│  State 2: NAVIGATING (Client-side)                       │
│  ┌─────────────────────────────────────────────────┐    │
│  │  ═══════════════════════════════════            │    │
│  │  Top bar animating (0% → 100%)                  │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
│  State 3: LOADING (Server-side)                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │                                                   │    │
│  │                ⟳ Loading...                      │    │
│  │          Loading Content...                      │    │
│  │      Fetching from Contentstack                  │    │
│  │               • • •                              │    │
│  │                                                   │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
│  State 4: LOADED                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  [Product 1]  [Product 2]  [Product 3]          │    │
│  │  [Product 4]  [Product 5]  [Product 6]          │    │
│  │  Actual page content visible                     │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

## API Call Flow

```
Browser                    Next.js Server              Contentstack API
   │                             │                            │
   │  1. Click "Products"        │                            │
   ├─────────────────────────────>                            │
   │                             │                            │
   │  2. Show loaders            │                            │
   │  ⟳ Loading...               │                            │
   │                             │                            │
   │                             │  3. Fetch products         │
   │                             ├───────────────────────────>│
   │                             │                            │
   │                             │  4. Query database         │
   │                             │     (500-1000ms)           │
   │                             │                            │
   │                             │  5. Return JSON            │
   │                             │<───────────────────────────┤
   │                             │                            │
   │                             │  6. Transform data         │
   │                             │     (100-200ms)            │
   │                             │                            │
   │                             │  7. Render HTML            │
   │                             │     (200-300ms)            │
   │                             │                            │
   │  8. Send HTML               │                            │
   │<─────────────────────────────                            │
   │                             │                            │
   │  9. Hide loaders            │                            │
   │  ✅ Show content            │                            │
   │                             │                            │
```

## Performance Metrics

```
┌────────────────────────────────────────────────────────────┐
│                    TIMING BREAKDOWN                         │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Network Latency:           200-500ms  ████░░░░░░░        │
│  API Processing:            500-1000ms ████████░░░        │
│  Data Transformation:       100-200ms  ██░░░░░░░░░        │
│  HTML Rendering:            200-300ms  ███░░░░░░░░        │
│  ─────────────────────────────────────────────────────    │
│  Total Load Time:           1-3 seconds ████████████       │
│                                                             │
│  User Perception:                                           │
│  - With loaders:            Feels fast ✅                  │
│  - Without loaders:         Feels slow ❌                  │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

## Visual Comparison

### Before (No Loaders) ❌

```
┌─────────────────────────────────────┐
│  User clicks link                   │
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│                                     │
│                                     │
│         BLANK WHITE SCREEN          │
│                                     │
│         (2-3 seconds)               │
│                                     │
│         User thinks:                │
│         "Is it broken?"             │
│                                     │
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  Page suddenly appears              │
└─────────────────────────────────────┘
```

### After (With Loaders) ✅

```
┌─────────────────────────────────────┐
│  User clicks link                   │
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  ═══════════════════════════        │
│  Loading bar appears instantly      │
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│                                     │
│          ⟳ Loading...               │
│      Loading Content...             │
│   Fetching from Contentstack        │
│            • • •                    │
│                                     │
│      User thinks:                   │
│      "It's working!"                │
│                                     │
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  Page appears smoothly              │
│  ✅ Great experience                │
└─────────────────────────────────────┘
```

## Code Flow

```typescript
// 1. User clicks link
<Link href="/products">Products</Link>

// 2. NextTopLoader activates (app/layout.tsx)
<NextTopLoader color="#6366f1" />
// Shows indigo progress bar

// 3. Next.js shows loading.tsx (app/products/loading.tsx)
export default function Loading() {
  return <PageLoader />;  // Shows spinner
}

// 4. Server fetches data (app/products/page.tsx)
export default async function ProductsPage() {
  const products = await getAllProductsDetailed();
  // ↑ This takes 1-3 seconds
  return <ProductsClient products={products} />;
}

// 5. Loading indicators hide
// 6. Page content renders
```

---

**This flow ensures users always see visual feedback during loading!** ✅

