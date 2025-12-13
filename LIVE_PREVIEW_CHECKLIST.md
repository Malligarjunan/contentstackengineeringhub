# Live Preview Setup Checklist

## ✅ Quick Checklist

Use this checklist to verify your Live Preview is properly configured to show **draft content**.

### 1. Environment Variables

```bash
# Check these are set in .env or .env.local
□ CONTENTSTACK_API_KEY=your_api_key
□ CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token  
□ CONTENTSTACK_LIVE_PREVIEW_ENABLED=true
□ CONTENTSTACK_LIVE_PREVIEW_TOKEN=your_preview_token  # ← CRITICAL!
□ CONTENTSTACK_LIVE_PREVIEW_HOST=api.contentstack.io
```

**Get Preview Token:**
- Contentstack Dashboard → Settings → Tokens
- Find/create token with **Preview** scope
- Copy the **Preview Token** (different from Delivery Token!)

### 2. Restart Development Server

```bash
# After adding environment variables
npm run dev
```

### 3. Check Console Logs

You should see:
```
✅ Live Preview enabled for Contentstack SDK
✅ Contentstack SDK initialized successfully  
✅ Live Preview initialized successfully
```

### 4. Test in Contentstack

1. **Edit** a product entry (make changes, DON'T publish)
2. Click **Live Preview** button in entry editor
3. Your **draft changes** should appear in the preview
4. Edit content → Preview updates automatically

### 5. Verify Draft Content

**If you still see only published content:**

```bash
# 1. Verify environment variable
echo $CONTENTSTACK_LIVE_PREVIEW_TOKEN
# Should output your token

# 2. Verify enabled flag
echo $CONTENTSTACK_LIVE_PREVIEW_ENABLED
# Should output: true

# 3. Clear cache and rebuild
rm -rf .next
npm run build
npm run dev
```

## Common Issues

| Issue | Solution |
|-------|----------|
| Only published content shows | Missing `CONTENTSTACK_LIVE_PREVIEW_TOKEN` |
| Live Preview not updating | Normal for SSR - page reloads automatically |
| "Live Preview not enabled" log | Set `CONTENTSTACK_LIVE_PREVIEW_ENABLED=true` |
| Build errors | Run `npm install @contentstack/live-preview-utils` |

## For Production

Add to hosting environment variables:
```
CONTENTSTACK_LIVE_PREVIEW_ENABLED=true
CONTENTSTACK_LIVE_PREVIEW_TOKEN=your_preview_token
```

Set Preview URL in Contentstack:
```
https://your-domain.com/products/{entry.uid}
```

## Files Modified

- ✅ `lib/contentstack.ts` - Added live_preview config to SDK
- ✅ `components/ProductLivePreview.tsx` - Created (for future use)
- ✅ `LIVE_PREVIEW_FIX.md` - Complete troubleshooting guide

## Expected Behavior

✅ **Draft content** visible in Live Preview  
✅ **Real-time updates** when editing (page reloads)  
✅ **Published content** on public site  
✅ **ISR** still works (2-second revalidation)  

## Need Help?

See `LIVE_PREVIEW_FIX.md` for detailed troubleshooting and explanation of what was fixed.

