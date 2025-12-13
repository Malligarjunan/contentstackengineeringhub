# Repositories Field Enhancement

## Overview

Enhanced the product content type to support multiple code repositories instead of a single repository URL. This allows products to link to multiple repos (main app, documentation, examples, tools, etc.) with proper names and descriptions.

## What Changed

### Before
```typescript
interface Product {
  repositoryUrl?: string;  // Single URL only
}
```

### After
```typescript
interface Repository {
  repoName: string;        // e.g., "Main Backend API"
  repoDescription?: string; // e.g., "Core API server"
  repoUrl: string;         // Full GitHub/GitLab URL
}

interface Product {
  repositories?: Repository[];  // Multiple repos with details!
}
```

## Benefits

✅ **Multiple Repositories** - Link to main repo, docs, examples, tools  
✅ **Named Repositories** - Clear names for each repo  
✅ **Descriptions** - Explain what each repo contains  
✅ **Better UX** - Clearer organization on product pages  
✅ **Flexible** - Add as many repos as needed  

## Changes Made

### 1. Content Type Update Script

**Created:** `scripts/update-product-contenttype-repositories.js`

This script:
- Removes the old `repository_url` field
- Adds a new `repositories` group field with:
  - `repo_name` (required) - Repository name
  - `repo_description` (optional) - What it contains
  - `repo_url` (required) - Full URL
- Allows multiple repositories per product

### 2. TypeScript Types

**Updated:** `types/product.ts`
- Added `Repository` interface
- Replaced `repositoryUrl?: string` with `repositories?: Repository[]`

### 3. Data Transformation

**Updated:** `lib/contentstack.ts`
- Added `transformRepositories()` function
- Maps Contentstack field names to TypeScript interfaces
- Handles both snake_case and camelCase field names

### 4. Product Details Page

**Updated:** `app/products/[slug]/page.tsx`
- Added new "Code Repositories" section
- Displays all repositories in a beautiful card layout
- Shows GitHub icon, repo name, description, and URL
- Hover effects and external link indicators
- Removed old single repository button

### 5. Local Data Files

**Updated:** `data/products.ts` and `data/entries.ts`
- Migrated from `repositoryUrl` to `repositories` array format
- Added proper names and descriptions

### 6. Package.json

**Added script:**
```bash
npm run update-product-repositories
```

### 7. Documentation

**Updated:** `scripts/README.md`
- Documented the new script
- Usage instructions
- Prerequisites

## How to Use

### Step 1: Update Content Type

Run the script to update your product content type:

```bash
npm run update-product-repositories
```

**Output:**
```
✅ Product content type updated successfully!

📋 Summary:
   Total fields: XX
   New field added: repositories (group, multiple)
     ├─ repo_name (text, required)
     ├─ repo_description (text, optional)
     └─ repo_url (text, required)
```

### Step 2: Update Product Entries

Go to Contentstack Dashboard and update your product entries:

1. Open a product entry
2. Find the new **Repositories** field
3. Click **Add Repositories**
4. Fill in:
   - **Repository Name:** e.g., "Main Backend API"
   - **Repository Description:** e.g., "Core API server with authentication"
   - **Repository URL:** e.g., "https://github.com/contentstack/cma"
5. Add more repositories as needed
6. Save and publish

### Step 3: View on Product Page

The repositories will appear in a new "Code Repositories" section with:
- GitHub icon
- Repository name
- Description
- Clickable link to the repo

## Example Configuration

### Single Repository
```json
{
  "repositories": [
    {
      "repo_name": "Content Management API",
      "repo_description": "Main backend repository for the CMA",
      "repo_url": "https://github.com/contentstack/cma"
    }
  ]
}
```

### Multiple Repositories
```json
{
  "repositories": [
    {
      "repo_name": "Main Application",
      "repo_description": "Core application codebase",
      "repo_url": "https://github.com/org/main-app"
    },
    {
      "repo_name": "Documentation",
      "repo_description": "Technical documentation and guides",
      "repo_url": "https://github.com/org/docs"
    },
    {
      "repo_name": "Example Projects",
      "repo_description": "Sample implementations and demos",
      "repo_url": "https://github.com/org/examples"
    }
  ]
}
```

## UI Preview

The repositories appear as beautiful cards:

```
┌─────────────────────────────────────────────────┐
│  🐙  Main Application                       →   │
│      Core application codebase                  │
│      https://github.com/org/main-app            │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  🐙  Documentation                          →   │
│      Technical documentation and guides         │
│      https://github.com/org/docs                │
└─────────────────────────────────────────────────┘
```

## Migration from Old Field

If you had data in the old `repository_url` field, you'll need to manually migrate it:

1. Note the URL from the old field
2. Delete or leave the old field (script removes it from content type)
3. Add the URL to the new repositories field with a proper name and description

## Files Modified

- ✅ `scripts/update-product-contenttype-repositories.js` (new)
- ✅ `types/product.ts` (updated)
- ✅ `lib/contentstack.ts` (added transformRepositories)
- ✅ `app/products/[slug]/page.tsx` (new repositories section)
- ✅ `data/products.ts` (migrated format)
- ✅ `data/entries.ts` (migrated format)
- ✅ `package.json` (added npm script)
- ✅ `scripts/README.md` (documented script)

## Build Status

✅ **Compiled successfully**  
✅ **No TypeScript errors**  
✅ **No linting errors**  
✅ **All pages rendering correctly**  

## Summary

✅ **Content type enhanced** with repositories group field  
✅ **Multiple repos supported** per product  
✅ **Rich metadata** with names and descriptions  
✅ **Beautiful UI** for displaying repositories  
✅ **Local data migrated** to new format  
✅ **Script created** for easy content type updates  
✅ **Fully documented** with examples  

Your products can now showcase multiple code repositories with proper organization! 🎉

