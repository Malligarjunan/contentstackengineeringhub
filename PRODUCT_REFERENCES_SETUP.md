# Product References Setup Guide

This guide explains how to display specific products on the homepage using the new product references feature.

## Overview

The homepage now supports displaying a curated list of products instead of showing all products. This is done through a new `products` field in the homepage content type.

## How It Works

1. **With Product References**: If you add products to the `products` field in your homepage entry, only those selected products will be displayed on the homepage.

2. **Without Product References**: If the field is empty, all products will be displayed (default behavior).

## Setup Instructions

### Step 1: Add the Field to Homepage Content Type

Run the following script to add the `products` field to your homepage content type:

```bash
node scripts/add-product-references-to-homepage.js
```

This script will:
- Connect to your Contentstack stack
- Add a new reference field called `products` to the homepage content type
- Configure it to reference multiple products

### Step 2: Configure Products in Contentstack

1. Log in to your Contentstack dashboard
2. Navigate to **Content Models** > **homepage**
3. You should see the new "Product References" field
4. Go to **Entries** > **homepage**
5. Edit your homepage entry
6. In the "Product References" section:
   - Click "Add Reference"
   - Select the products you want to display on the homepage
   - You can reorder them by dragging
7. Save and publish the entry

### Step 3: Verify the Changes

1. Visit your homepage
2. You should see only the products you selected
3. Check the console logs for confirmation:
   ```
   📄 Homepage displaying X products (from references)
   ```

## Field Details

- **Field UID**: `products`
- **Display Name**: Product References
- **Type**: Reference (Multiple)
- **References**: product content type
- **Mandatory**: No
- **Description**: Select specific products to display on the homepage. If empty, all products will be shown.

## Benefits

1. **Curated Content**: Display only the most important or relevant products
2. **Custom Ordering**: Control the order in which products appear
3. **Flexibility**: Easy to update without code changes
4. **Fallback**: Automatically shows all products if none are selected

## Code Changes

The implementation includes:

1. **Type Definition** (`types/product.ts`):
   - Added `products?: Product[]` to `HomePageContent` interface

2. **Contentstack Service** (`lib/contentstack.ts`):
   - Added reference inclusion for `products` field
   - Transforms referenced products to full Product objects
   - Logs when product references are found

3. **Homepage Component** (`app/page.tsx`):
   - Uses referenced products if available
   - Falls back to all products if no references
   - Logs which mode is being used

## Troubleshooting

### Products Not Showing

1. Check if the homepage entry is published
2. Verify that the selected products are also published
3. Check the browser console for logs
4. Ensure the product references field was added successfully

### Field Not Appearing

1. Run the setup script again
2. Check your Contentstack credentials in `.env.local`
3. Verify you have management token permissions

### All Products Still Showing

1. Make sure you've added products to the `products` field
2. Publish the homepage entry after adding references
3. Clear your browser cache
4. Check the console logs to see which mode is active

## Example Usage

### Scenario 1: Featured Products Only
Select 3-4 key products to feature on the homepage for new visitors.

### Scenario 2: Category Showcase
Select one product from each category to give an overview.

### Scenario 3: Seasonal/Campaign Focus
Temporarily feature specific products for a campaign or release.

### Scenario 4: Show All (Default)
Leave the field empty to display all products.

## Support

If you encounter any issues:
1. Check the console logs for detailed error messages
2. Verify your Contentstack configuration
3. Ensure all required environment variables are set
4. Contact your team lead for assistance

