# Asset Migration Guide

This guide explains how to migrate image URLs to Contentstack assets.

## Overview

The migration script (`scripts/migrate-images-to-assets.js`) automates the process of:
1. Converting text URL fields to file/asset fields in content types
2. Uploading images to Contentstack assets
3. Updating entries to reference the uploaded assets

## What Gets Migrated

### Product Content Type
- **icon**: Product icon/logo
- **cicd_diagram_image**: CI/CD pipeline diagram
- **architecture_diagrams[].image_url**: Architecture diagram images
- **team_members[].avatar**: Team member avatar images

### Homepage Content Type
- **architecture_diagrams[].image_url**: Architecture diagram images

## Prerequisites

Ensure you have the following environment variables set:
```bash
CONTENTSTACK_API_KEY=your_api_key
CONTENTSTACK_MANAGEMENT_TOKEN=your_management_token
```

## Running the Migration

### Step 1: Backup Your Content

**IMPORTANT**: Before running the migration, create a backup:
1. Go to Contentstack Dashboard
2. Navigate to Settings > Backup and Restore
3. Create a manual backup

### Step 2: Run the Migration Script

```bash
cd scripts
node migrate-images-to-assets.js
```

The script will:
- Show progress for each step
- Display which images are being uploaded
- Report any errors encountered
- Provide a summary at the end

### Step 3: Verify the Migration

1. **Check Contentstack Assets**:
   - Go to Assets in your Contentstack dashboard
   - Verify all images have been uploaded correctly

2. **Check Entries**:
   - Open a few product entries
   - Verify that image fields now reference assets instead of URLs

3. **Test Locally**:
   ```bash
   npm run dev
   ```
   - Navigate to product pages
   - Verify images are displayed correctly

## What the Script Does

### Content Type Updates

The script modifies content type schemas to change text fields to file fields:

**Before**:
```json
{
  "data_type": "text",
  "display_name": "Icon",
  "uid": "icon"
}
```

**After**:
```json
{
  "data_type": "file",
  "display_name": "Icon",
  "uid": "icon"
}
```

### Image Upload Process

For each image URL found in entries:
1. **Local Files** (starting with `/`):
   - Looks for the file in the `public` directory
   - Uploads directly to Contentstack

2. **External URLs** (HTTP/HTTPS):
   - Downloads the image to a temporary directory
   - Uploads to Contentstack
   - Cleans up temporary files

3. **Duplicate Detection**:
   - Caches uploaded assets to avoid re-uploading the same image
   - Reuses existing asset UIDs for duplicate URLs

### Entry Updates

For each entry with image URLs:
- Uploads the image to assets (if not already uploaded)
- Replaces the URL string with the asset UID
- Saves the updated entry

## Frontend Code Updates

After migration, update your code to handle asset references:

### Before Migration (URL strings):
```typescript
<img src={product.icon} alt="Product icon" />
```

### After Migration (Asset objects):
```typescript
<img src={product.icon?.url} alt="Product icon" />
```

### TypeScript Type Updates

Update your interfaces to reflect asset fields:

```typescript
// Before
export interface Product {
  icon?: string;  // URL string
  // ...
}

// After
export interface Product {
  icon?: {
    uid: string;
    url: string;
    filename: string;
    content_type: string;
    title: string;
  };
  // ...
}
```

## Contentstack Data Transformation

Update `lib/contentstack.ts` to handle asset fields:

```typescript
function transformProduct(entry: any): Product {
  return {
    // ...
    icon: entry.icon?.url || entry.icon,  // Handle both asset object and string
    cicdDiagramImage: entry.cicd_diagram_image?.url || entry.cicd_diagram_image,
    architectureDiagrams: (entry.architecture_diagrams || []).map((diagram: any) => ({
      title: diagram.title,
      description: diagram.description,
      imageUrl: diagram.image_url?.url || diagram.image_url,  // Handle both formats
      details: diagram.details,
      whimsicalUrl: diagram.whimsical_url,
    })),
    teamMembers: (entry.team_members || []).map((member: any) => ({
      name: member.name,
      role: member.role,
      email: member.email,
      avatar: member.avatar?.url || member.avatar,  // Handle both formats
    })),
    // ...
  };
}
```

## Rollback

If you need to rollback:

1. **Restore from Backup**:
   - Go to Settings > Backup and Restore
   - Select your backup
   - Click "Restore"

2. **Manual Rollback**:
   - Revert content type schemas to use text fields
   - Update entries manually or via script

## Troubleshooting

### Issue: "Failed to download image"
**Solution**: The external URL might be unavailable or require authentication. Check the URL manually.

### Issue: "Local file not found"
**Solution**: Ensure the image file exists in the `public` directory at the specified path.

### Issue: "Asset upload failed"
**Solution**: Check your management token permissions and that you haven't exceeded asset quotas.

### Issue: "Content type update failed"
**Solution**: You might have entries that conflict with the schema change. Review the error details.

## Best Practices

1. **Run During Low Traffic**: Migrate during off-peak hours
2. **Test on Staging First**: If you have a staging environment, test there first
3. **Monitor Progress**: Watch the script output for any errors
4. **Validate Results**: Thoroughly test your application after migration
5. **Keep Backups**: Maintain backups for at least 30 days after migration

## Script Output Example

```
🚀 Starting image migration to Contentstack assets...

📋 Updating product content type...
   🔄 Converting icon field from text to file...
   🔄 Converting cicd_diagram_image field from text to file...
   🔄 Updating architecture_diagrams group field...
✅ Product content type updated successfully!

📝 Fetching product entries...
Found 18 product entries

🔄 Processing: Content Management API (CMA)
   📸 Processing icon...
   📥 Downloading: https://example.com/icon.png
   📤 Uploading to Contentstack: CMA - Icon
   ✅ Uploaded: CMA - Icon (UID: blt123abc456def)
   💾 Saving updated entry...
   ✅ Entry updated successfully!

✅ Image migration completed successfully!

📊 Summary:
   Total assets uploaded: 42

💡 Next steps:
   1. Review the uploaded assets in Contentstack
   2. Update your frontend code to use asset URLs
   3. Test the application
```

## Support

If you encounter issues:
1. Check the script output for specific error messages
2. Verify your environment variables are correct
3. Ensure you have proper permissions in Contentstack
4. Review the Contentstack Management API documentation

## Related Documentation

- [Contentstack Assets](https://www.contentstack.com/docs/developers/assets)
- [Management API - Assets](https://www.contentstack.com/docs/developers/apis/content-management-api/#assets)
- [File Fields](https://www.contentstack.com/docs/developers/content-types/file-fields)

