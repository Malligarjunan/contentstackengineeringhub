# Contentstack Setup Scripts

This folder contains scripts to help you set up and manage your Contentstack content types.

## Quick Start

To set up your homepage from scratch:

```bash
# 1. Create the homepage content type
npm run create-homepage

# 2. Create and publish the homepage entry
npm run create-homepage-entry

# 3. Start your app
npm run dev
```

## Scripts

### 1. migrate-images-to-assets.js

**⚠️ IMPORTANT**: This script modifies your content types and entries. Create a backup before running!

Migrates image URLs to Contentstack assets. This script:
- Converts text URL fields to file/asset fields in content types
- Uploads images from URLs to Contentstack assets
- Updates entries to reference the uploaded assets

**Affected Content Types:**
- Product: `icon`, `cicd_diagram_image`, `architecture_diagrams[].image_url`, `team_members[].avatar`
- Homepage: `architecture_diagrams[].image_url`

**Usage:**
```bash
cd scripts
node migrate-images-to-assets.js
```

**Prerequisites:**
- `CONTENTSTACK_API_KEY` environment variable
- `CONTENTSTACK_MANAGEMENT_TOKEN` environment variable
- Create a backup in Contentstack before running

**What it does:**
1. Updates content type schemas to use file fields instead of text fields
2. Downloads images from external URLs or finds local images in `public/` directory
3. Uploads images to Contentstack assets
4. Updates all entries to reference the uploaded asset UIDs
5. Provides detailed progress and error reporting

**Output Example:**
```
🚀 Starting image migration to Contentstack assets...

📋 Updating product content type...
   🔄 Converting icon field from text to file...
   ✅ Product content type updated successfully!

📝 Fetching product entries...
Found 18 product entries

🔄 Processing: Content Management API (CMA)
   📸 Processing icon...
   📥 Downloading: https://example.com/icon.png
   📤 Uploading to Contentstack: CMA - Icon
   ✅ Uploaded: CMA - Icon (UID: blt123abc)
   💾 Saving updated entry...
   ✅ Entry updated successfully!

✅ Image migration completed successfully!
📊 Summary: Total assets uploaded: 42
```

**After Migration:**
Your frontend code needs to be updated to handle asset objects:
```typescript
// Before: product.icon is a string URL
<img src={product.icon} />

// After: product.icon is an asset object
<img src={product.icon?.url} />
```

**Rollback:**
If you need to rollback, restore from your Contentstack backup.

**See also:** [ASSET_MIGRATION.md](../ASSET_MIGRATION.md) for detailed documentation.

---

### 2. create-homepage-contenttype.js

Creates the Homepage content type in your Contentstack stack.

**Usage:**
```bash
npm run create-homepage
```

### 3. create-homepage-entry.js

Creates and publishes the homepage entry with default content.

**Usage:**
```bash
npm run create-homepage-entry
```

### 4. update-homepage-contenttype.js

Updates the existing homepage content type with enhanced fields for all homepage sections.

This script adds 25 new fields including:
- Hero section badge text
- Features section (title, description, feature cards)
- Products section (badge, title, description)
- Architecture section (badge, title, subtitle, description, principles, main image)
- Video section (badge, title, description)
- Quick access resources section (title, description, resource cards)
- CTA section (badge, title, description)

**Usage:**
```bash
npm run update-homepage-contenttype
# OR
node scripts/update-homepage-contenttype.js
```

### 5. update-homepage-entry.js

Updates the existing homepage entry with content for all the enhanced fields.

**Usage:**
```bash
npm run update-homepage-entry
# OR
node scripts/update-homepage-entry.js
```

**Prerequisites:**
1. Set up your `.env` file with the following variables:
   ```
   CONTENTSTACK_API_KEY=your_api_key
   CONTENTSTACK_MANAGEMENT_TOKEN=your_management_token
   ```

2. **Get your Management Token:**
   - Go to Contentstack Dashboard
   - Navigate to **Settings > Tokens**
   - Click **+ New Token**
   - Give it a name (e.g., "Engineering Hub Setup")
   - Grant permissions:
     - Content Types: Read, Create, Update
     - Entries: Read, Create, Update (optional, for creating entries)
   - Save the token
   - Copy the token value and add it to your `.env` file

**What it creates:**

A singleton content type called "Homepage" with the following fields:

1. **Hero Title** (text, mandatory)
   - Main heading for the homepage

2. **Hero Description** (text, mandatory)
   - Tagline/description for the hero section

3. **Platform Video URL** (text, optional)
   - YouTube video URL showcasing the platform

4. **About Contentstack** (text, mandatory)
   - Overview description of Contentstack

5. **Architecture Diagrams** (group, multiple)
   - Title
   - Description
   - Image URL
   - Details
   - Whimsical URL

**After running the script:**

1. Go to your Contentstack Dashboard
2. Navigate to **Content Models** to see the new Homepage content type
3. Go to **Entries** > **Homepage**
4. Create a new entry with your homepage content
5. Publish the entry

The app will automatically fetch this content from Contentstack when it loads.

---

### 6. create-homepage-entry.js (Detailed)

Creates and publishes a homepage entry with default content based on `data/homepage.ts`.

**Usage:**
```bash
npm run create-homepage-entry
```

**Prerequisites:**
1. The homepage content type must already exist (run `npm run create-homepage` first)
2. Your `.env` file must have:
   ```
   CONTENTSTACK_API_KEY=your_api_key
   CONTENTSTACK_MANAGEMENT_TOKEN=your_management_token
   NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=production
   ```

**What it does:**

1. Creates a new homepage entry with:
   - Hero title and description
   - Platform video URL
   - About Contentstack text
   - 4 architecture diagrams with details
   
2. Automatically publishes the entry to your environment

**After running the script:**

✅ Your homepage content is live!
- Run `npm run dev` to see it in action
- Edit the entry in Contentstack Dashboard if needed
- The app will fetch this content automatically

**Note:** Since homepage is a singleton, you can only have one entry. If you run this script again after an entry exists, it will fail. You can either:
- Delete the existing entry from the dashboard and run again
- Manually edit the existing entry

---

### 3. test-homepage-fetch.js

Tests fetching homepage content from Contentstack.

**Usage:**
```bash
npm run test-homepage
```

This script:
- Verifies your Contentstack connection
- Fetches the homepage entry
- Displays all the content (hero, about, diagrams)
- Shows if content is ready to use

**Use this to verify:**
- Homepage content type exists
- Homepage entry exists and is published
- Content is being fetched correctly

---

### 4. test-contentstack.js

Tests your Contentstack connection and product data.

**Usage:**
```bash
node scripts/test-contentstack.js
```

This script verifies that:
- Your API key and delivery token are configured correctly
- You can connect to Contentstack
- You can fetch product entries

## Troubleshooting

### "Authorization failed" error
- Make sure your Management Token is valid and not expired
- Verify the token has the correct permissions
- Check that you're using the token value (not the token name)

### "Content type already exists" error
- The homepage content type has already been created
- You can either delete it from the Contentstack dashboard and run again
- Or manually update it through the dashboard

### "Missing environment variables" error
- Ensure your `.env` file is in the root of the project
- Check that the variable names are correct:
  - `CONTENTSTACK_API_KEY`
  - `CONTENTSTACK_MANAGEMENT_TOKEN`
- Restart your terminal or IDE after adding new environment variables

### 5. update-product-contenttype-repositories.js

Updates the product content type to replace the single `repository_url` field with a `repositories` group field.

**What it does:**
- Removes the old `repository_url` field
- Adds a new `repositories` group field (multiple) with:
  - `repo_name` (text, required) - Name of the repository
  - `repo_description` (text, optional) - Brief description
  - `repo_url` (text, required) - Full URL to the repository

This allows each product to have multiple code repositories (main repo, docs, examples, etc.) with proper descriptions.

**Usage:**
```bash
npm run update-product-repositories
# OR
node scripts/update-product-contenttype-repositories.js
```

**Prerequisites:**
- `CONTENTSTACK_API_KEY` in .env
- `CONTENTSTACK_MANAGEMENT_TOKEN` in .env

**After running:**
- Update product entries to add repository information
- Product details page will display all repositories
- Each repository shows name, description, and link

---

### 6. test-revalidate.sh

Tests the on-demand revalidation API for ISR pages.

**Usage:**
```bash
# Test on localhost
./scripts/test-revalidate.sh

# Test on production
./scripts/test-revalidate.sh https://your-domain.com
```

This script tests:
- ✅ Revalidating specific product pages by slug
- ✅ Revalidating pages by path
- ✅ GET and POST request methods
- ✅ Error handling for missing parameters

**Prerequisites:**
- Application must be running (`npm run dev` or `npm start`)
- ISR must be enabled for product pages
- `jq` command-line tool for JSON formatting (optional but recommended)

**Install jq (optional):**
```bash
# macOS
brew install jq

# Ubuntu/Debian
sudo apt-get install jq
```

**Example output:**
```json
{
  "revalidated": true,
  "path": "/products/cda",
  "message": "Successfully revalidated /products/cda",
  "timestamp": "2025-01-10T12:00:00.000Z"
}
```

See `ON_DEMAND_REVALIDATION.md` for complete API documentation.

---

## Region Configuration

By default, scripts use the `us` region. If you're using a different region, update the `region` variable in the script:

```javascript
const config = {
  region: 'eu', // or 'azure-na', 'azure-eu'
  // ...
};
```

