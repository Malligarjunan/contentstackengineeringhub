# Complete Setup Guide - Data Sync & Image Migration

## Why You Need This

The image migration script (`migrate-images`) only uploads images that **already exist in your Contentstack entries**. If your entries are empty, there are no images to migrate!

## The Complete Workflow

```
Step 1: Sync Local Data → Populates Contentstack entries with data (including image URLs)
Step 2: Migrate Images   → Uploads images and converts URLs to asset references
Step 3: Test & Deploy    → Verify everything works
```

## Step-by-Step Instructions

### Step 1: Sync Local Data to Contentstack

This populates your Contentstack entries with all the data from your local files (`data/products.ts` and `data/homepage.ts`), including image URLs.

```bash
npm run sync-data
```

**What this does:**
- Creates/updates 18 product entries
- Creates/updates homepage entry
- Populates all fields including:
  - Product descriptions
  - Tech stacks
  - Team members (with avatar URLs)
  - Architecture diagrams (with image URLs)
  - CI/CD diagrams (with image URLs)
  - And everything else
- Publishes entries to your environment

**Expected output:**
```
🚀 Starting data sync from local files to Contentstack...

📦 Syncing products to Contentstack...

🔄 Processing: Content Management API (CMA)
   ➕ Creating new entry
   ✅ Created: Content Management API (CMA) (UID: blt...)
   📤 Published to production

[... continues for all 18 products ...]

🏠 Syncing homepage content to Contentstack...
✅ Created homepage entry (UID: blt...)
📤 Published to production

📊 Sync Summary
============================================================

📦 Products:
   ✅ Created: 18
   ♻️  Updated: 0
   ❌ Errors: 0

🏠 Homepage:
   ✅ Created: 1
   ♻️  Updated: 0
   ❌ Errors: 0

✅ All data synced successfully!

💡 Next steps:
   1. Verify entries in Contentstack Dashboard
   2. Run image migration: npm run migrate-images
   3. Test your application: npm run dev
```

### Step 2: Verify in Contentstack Dashboard

1. Go to your Contentstack Dashboard
2. Navigate to **Entries** > **Products**
3. You should see 18 product entries
4. Open one and verify:
   - All fields are populated
   - `cicd_diagram_image` has a value like `/diagrams/cma-cicd.png`
   - `architecture_diagrams` > `image_url` has values
   - `team_members` > `avatar` has URLs

### Step 3: Migrate Images to Assets

Now that your entries have image URLs, run the migration:

```bash
npm run migrate-images
```

**What this does:**
- Finds all image URLs in your entries
- Downloads external URLs (like avatar URLs from dicebear.com)
- Finds local files (like `/diagrams/...` in your `public/` folder)
- Uploads them to Contentstack Assets
- Replaces URL strings with asset UIDs
- Updates and saves all entries

**Expected output:**
```
🚀 Starting image migration to Contentstack assets...

📋 Updating product content type...
   🔄 Converting icon field from text to file...
   🔄 Converting cicd_diagram_image field from text to file...
✅ Product content type updated successfully!

📝 Fetching product entries...
Found 18 product entries

🔄 Processing: Content Management API (CMA)
   📸 Processing CI/CD diagram...
   📥 Downloading: /diagrams/cma-cicd.png
   📤 Uploading local file: CMA - CI/CD Diagram
   ✅ Uploaded: CMA - CI/CD Diagram (UID: blt...)
   📸 Processing architecture diagrams...
   📤 Uploading local file: CMA - Architecture Flow
   ✅ Uploaded: CMA - Architecture Flow (UID: blt...)
   📸 Processing team member avatars...
   📥 Downloading: https://api.dicebear.com/7.x/avataaars/svg?seed=John
   📤 Uploading to Contentstack: John Doe - Avatar
   ✅ Uploaded: John Doe - Avatar (UID: blt...)
   💾 Saving updated entry...
   ✅ Entry updated successfully!

[... continues for all products ...]

✅ Image migration completed successfully!

📊 Summary:
   Total assets uploaded: 42

💡 Next steps:
   1. Review the uploaded assets in Contentstack
   2. Test the application to ensure images are displayed correctly
```

### Step 4: Verify Assets in Contentstack

1. Go to **Assets** in Contentstack Dashboard
2. You should see all uploaded images:
   - CI/CD diagrams
   - Architecture diagrams
   - Team member avatars
3. Check a few entries:
   - Open a product entry
   - The `cicd_diagram_image` field should now show an asset picker
   - Click it to see the uploaded image

### Step 5: Test Your Application

```bash
npm run dev
```

Visit:
- **Homepage**: `http://localhost:3000/`
  - Architecture diagrams should display
  
- **Products**: `http://localhost:3000/products`
  - Product icons should display (if you had them)
  
- **Product Details**: `http://localhost:3000/products/cma`
  - CI/CD diagram should display
  - Team member avatars should display

## Troubleshooting

### Issue: "No assets uploaded" (0 assets)

**Problem**: Your Contentstack entries don't have image URLs.

**Solution**: Run Step 1 first (`npm run sync-data`), then run Step 2 (`npm run migrate-images`).

### Issue: "Local file not found"

**Problem**: The script looks for images in `public/diagrams/` but they don't exist.

**Solution Options:**
1. **Create the images**: Add the actual diagram files to `public/diagrams/`
2. **Remove local paths**: Edit `data/products.ts` and remove paths like `/diagrams/...`
3. **Use external URLs**: Replace local paths with external URLs

### Issue: "Failed to download image"

**Problem**: External URL is unavailable or requires authentication.

**Solution**: The migration will continue and skip that image. Check the URL manually.

### Issue: Entries exist but script wants to create them

**Problem**: You ran Step 1 before, and now it's trying to create duplicates.

**Solution**: The script checks by `slug` and will update existing entries instead of creating duplicates.

## Image Requirements

### For CI/CD Diagrams
- Path format: `/diagrams/product-name-cicd.png`
- Location: `public/diagrams/`
- Recommended size: 1200x600px or larger
- Format: PNG, JPG, or SVG

### For Architecture Diagrams
- Path format: `/architecture/product-name-flow.png`
- Location: `public/architecture/`
- Recommended size: 1200x800px or larger
- Format: PNG, JPG, or SVG

### For Team Avatars
- Currently using external URLs: `https://api.dicebear.com/...`
- These will be downloaded and uploaded to Contentstack
- Recommended size: 200x200px or larger

### For Product Icons
- Add to `data/products.ts`: `icon: "/icons/product-name.png"`
- Location: `public/icons/`
- Recommended size: 128x128px or larger
- Format: PNG or SVG

## Complete Example Workflow

```bash
# 1. Ensure content types exist (you've already done this)
npm run create-homepage
npm run update-product-repositories

# 2. Sync local data to Contentstack
npm run sync-data

# 3. Verify in Contentstack Dashboard
# - Check that entries exist
# - Verify image URL fields are populated

# 4. Migrate images to assets
npm run migrate-images

# 5. Verify in Contentstack Dashboard
# - Check Assets section
# - Verify entries now reference assets

# 6. Test locally
npm run dev

# 7. Deploy (if everything works)
git add -A
git commit -m "feat: Complete Contentstack setup with images"
git push
```

## Scripts Reference

```bash
# Data Management
npm run sync-data              # Sync local data to Contentstack

# Image Migration
npm run migrate-images         # Upload images and convert to assets

# Content Type Setup
npm run create-homepage        # Create homepage content type
npm run update-product-repositories # Update product content type

# Entry Management
npm run create-homepage-entry  # Create homepage entry
npm run update-homepage-entry  # Update homepage entry

# Testing
npm run test-homepage          # Test homepage fetch
npm run dev                    # Start dev server
npm run build                  # Build for production
```

## Related Documentation

- [IMAGE_MIGRATION_SUMMARY.md](./IMAGE_MIGRATION_SUMMARY.md) - Migration overview
- [ASSET_MIGRATION.md](./ASSET_MIGRATION.md) - Complete migration guide
- [IMAGE_URL_UPDATES.md](./IMAGE_URL_UPDATES.md) - Frontend updates
- [scripts/README.md](./scripts/README.md) - All scripts documentation

---

**Quick Start (if starting fresh):**

```bash
npm run sync-data && npm run migrate-images && npm run dev
```

This will sync your data, migrate images, and start the dev server all at once! 🚀

