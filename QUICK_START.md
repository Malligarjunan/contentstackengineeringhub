# Quick Start Guide - Contentstack Integration

## Step 1: Configure Your Contentstack Credentials

### Get Your API Credentials from Contentstack

1. **Log in to Contentstack** (https://app.contentstack.com)
2. Navigate to your stack
3. Go to **Settings** → **Tokens** 
4. Find or create a **Delivery Token**
5. Note down:
   - **API Key** (from Settings → Stack)
   - **Delivery Token** 
   - **Environment** (usually `production`)
   - **Region** (check your URL - e.g., `app.contentstack.com` = `us`)

### Update Your .env.local File

Edit `.env.local` and replace the placeholder values:

```bash
# Open the file
nano .env.local  # or use your preferred editor
```

Replace with your actual values:
```env
CONTENTSTACK_API_KEY=blt1234567890abcdef
CONTENTSTACK_DELIVERY_TOKEN=cs1234567890abcdef
NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=production
NEXT_PUBLIC_CONTENTSTACK_REGION=us
```

**Important:** Keep these values secret! Never commit `.env.local` to git.

## Step 2: Test Your Connection

Run the test script to verify everything works:

```bash
node scripts/test-contentstack.js
```

**Expected Output:**
```
✅ SUCCESS! Found X products:
1. Content Management API (CMA) (slug: cma)
2. Content Delivery API (CDA) (slug: cda)
...
🎉 Contentstack integration is working correctly!
```

**If you see errors:**
- Double-check your API credentials
- Verify the environment name
- Ensure you have published product entries in Contentstack

## Step 3: Verify Content Type Setup

### Required Content Type: `product`

Your Contentstack stack must have a content type called `product` with these fields:

#### Essential Fields (Minimum Required)
- `title` (Single Line Textbox)
- `slug` (Single Line Textbox) - Unique
- `short_description` (Multi Line Textbox)
- `full_description` (Rich Text Editor)
- `category` (Single Line Textbox)
- `color` (Single Line Textbox)

#### Additional Fields (Optional but Recommended)
See `CONTENTSTACK_SETUP.md` for the complete field list.

### Import Sample Data

If you haven't created entries yet, you can:

1. **Option A: Use the sample data** from `/data/products.ts` as a reference
2. **Option B: Import the entries** from `/data/entries.ts` (if you've exported them)

## Step 4: Run Your Application

### Development Mode

```bash
npm run dev
```

Visit:
- Homepage: http://localhost:3000
- Products: http://localhost:3000/products
- Product Detail: http://localhost:3000/products/cma

### Check Data Source

Open your browser console, you should see:
- ✅ If Contentstack is working: No console messages
- ⚠️ If using fallback: "Contentstack not configured, using local data"

## Step 5: Verify Everything Works

### Checklist

- [ ] `.env.local` configured with real Contentstack credentials
- [ ] Test script runs successfully
- [ ] Content type `product` exists in Contentstack
- [ ] At least one product entry is published
- [ ] Dev server is running
- [ ] Products page loads and shows data
- [ ] Product detail pages load correctly
- [ ] No errors in browser console

## Troubleshooting

### "No products found"
**Solution:** 
- Ensure products are **published** in Contentstack (not just saved)
- Check you're using the correct environment name
- Verify content type is named exactly `product` (lowercase)

### "Authentication failed"
**Solution:**
- Verify API Key and Delivery Token are correct
- Check if tokens have expired
- Ensure you're using a Delivery Token (not Management Token)

### "Cannot connect to Contentstack"
**Solution:**
- Check your internet connection
- Verify the region setting matches your Contentstack URL
- Try accessing Contentstack dashboard in browser

### "Using local data" message in console
**Solution:**
- This is expected if credentials aren't configured
- Update `.env.local` with real values
- Restart dev server after updating

## Current Implementation Status

### ✅ What's Working

- Contentstack SDK installed
- Service layer created (`/lib/contentstack.ts`)
- Fallback to local data
- ISR with 1-hour revalidation
- Product listing page
- Product detail pages
- Helpful external links feature

### 📋 Data Flow

```
User Request
    ↓
Next.js Page (Server Component)
    ↓
Contentstack Service (/lib/contentstack.ts)
    ↓
Check: Is Contentstack configured?
    ├─ YES → Fetch from Contentstack API
    │         ├─ Success → Return CMS data
    │         └─ Error → Fallback to local data
    └─ NO → Use local data (/data/products.ts)
    ↓
Transform & Return to Page
    ↓
Render HTML
```

### 🔄 How Fallback Works

1. **First Check**: Environment variables present?
   - No → Use local data
   - Yes → Continue

2. **Second Check**: Can connect to Contentstack?
   - No → Use local data
   - Yes → Continue

3. **Third Check**: Found content?
   - No → Use local data  
   - Yes → Use CMS data

This ensures your app **always works**, even if Contentstack is down!

## Next Steps

### For Development
1. Configure `.env.local` (if using Contentstack)
2. Run test script
3. Start dev server
4. Begin development

### For Production
1. Set environment variables in your deployment platform (Vercel, etc.)
2. Build the application: `npm run build`
3. Deploy!

## Need Help?

- **Setup Issues:** See `CONTENTSTACK_SETUP.md`
- **Integration Details:** See `INTEGRATION_SUMMARY.md`
- **Project Info:** See `README.md`
- **Contentstack Docs:** https://www.contentstack.com/docs/

## Quick Commands Reference

```bash
# Test Contentstack connection
node scripts/test-contentstack.js

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for errors
npm run lint
```

---

**Ready to go!** 🚀

Your Engineering Hub is now set up to work with Contentstack. The application will automatically use Contentstack data when configured, or fall back to local data if not.

