# Quick Start: Homepage Product References

Display specific products on your homepage instead of showing all products.

## 🚀 Quick Setup (3 Steps)

### Step 1: Add the Field (1 minute)

```bash
npm run add-product-references
```

**Expected Output:**
```
✅ products field added successfully!
```

### Step 2: Select Products in Contentstack (2 minutes)

1. Go to [Contentstack Dashboard](https://app.contentstack.com)
2. Navigate to **Entries** > **homepage**
3. Find the "Product References" section
4. Click **"Add Reference"**
5. Select the products you want to display
6. **Save** and **Publish**

### Step 3: Verify (30 seconds)

Visit your homepage and check the console:

```
✅ Found X product references in homepage entry
📄 Homepage displaying X products (from references)
```

## ✅ Done!

Your homepage now shows only the selected products.

## 🔄 To Show All Products Again

Simply remove all products from the "Product References" field in Contentstack and publish.

## 📖 Need More Help?

- **Detailed Guide**: See `products_SETUP.md`
- **Implementation Details**: See `HOMEPAGE_products.md`
- **Script Documentation**: See `scripts/README.md`

## 🐛 Troubleshooting

### Products not showing?
- Check if homepage entry is published
- Verify selected products are published
- Clear browser cache

### Field not appearing?
- Run the script again
- Check your `.env.local` has `CONTENTSTACK_MANAGEMENT_TOKEN`
- Refresh Contentstack dashboard

### Still showing all products?
- Make sure you saved and published the entry
- Check console logs to see which mode is active
- Verify products were actually added to the field

## 💡 Pro Tips

1. **Order Matters**: Drag to reorder products in Contentstack
2. **Mix Categories**: Select products from different categories for variety
3. **Update Anytime**: Change product selection without code changes
4. **Analytics**: Monitor which products get the most clicks

---

**Quick Links:**
- [Setup Script](scripts/add-product-references-to-homepage.js)
- [Detailed Setup Guide](products_SETUP.md)
- [Implementation Summary](HOMEPAGE_products.md)

