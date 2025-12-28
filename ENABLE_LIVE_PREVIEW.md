# Enable Live Preview - Quick Setup Guide

## Current Issue

**Error**: "Preview token missing"

**Reason**: Your `.env.local` file doesn't have the Live Preview configuration yet.

## Solution: Add Live Preview Environment Variables

### Step 1: Get Your Preview Token from Contentstack

1. Go to [Contentstack Dashboard](https://app.contentstack.com)
2. Navigate to **Settings** → **Tokens**
3. Look for **Preview Token** (NOT Delivery Token - they're different!)
   - **Delivery Token**: For published content (you already have this)
   - **Preview Token**: For draft/unpublished content in Live Preview
4. If you don't see a Preview Token, create one:
   - Click **+ New Token**
   - Select **Preview Token**
   - Name it: "Live Preview Token"
   - Give it necessary permissions
   - **Save** and copy the token value

### Step 2: Update Your `.env.local` File

Open `/Users/malligarjunan.sidduraj/work/contentstack/engineeringhub/contentstack-engineering-hub/.env.local` and **add these lines at the end**:

```env
# Live Preview Configuration
# Get the Preview Token from: Settings > Tokens > Preview Token
CONTENTSTACK_LIVE_PREVIEW_ENABLED=true
CONTENTSTACK_LIVE_PREVIEW_TOKEN=your_actual_preview_token_here
CONTENTSTACK_LIVE_PREVIEW_HOST=rest-preview.contentstack.com
```

**Replace** `your_actual_preview_token_here` with the actual token you copied from Contentstack.

### Step 3: Check Your Region

If your stack is NOT in the US region, update the `CONTENTSTACK_LIVE_PREVIEW_HOST` value:

| Region | Host Value |
|--------|------------|
| US (Default) | `rest-preview.contentstack.com` |
| EU | `eu-rest-preview.contentstack.com` |
| Azure NA | `azure-na-rest-preview.contentstack.com` |
| Azure EU | `azure-eu-rest-preview.contentstack.com` |
| GCP NA | `gcp-na-rest-preview.contentstack.com` |

### Step 4: Restart Development Server

After updating `.env.local`:

```bash
# Stop the current server (Ctrl+C in the terminal)
# Then restart it
npm run dev
```

You should see in the terminal:
```
✅ Live Preview initialized successfully
```

### Step 5: Test Live Preview

1. Go to Contentstack Dashboard
2. Open your **homepage** entry
3. Click **Live Preview** button (top right)
4. You should see your homepage with **Edit** buttons on hover
5. Click any Edit button - it should jump to that field

## Your Complete `.env.local` Should Look Like This:

```env
# Contentstack Configuration
CONTENTSTACK_API_KEY=bltf8cdf3fabab37ee8
CONTENTSTACK_DELIVERY_TOKEN=cs608d9cd372d3ed6d67a26475
NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=production
NEXT_PUBLIC_CONTENTSTACK_REGION=us

# Live Preview Configuration
CONTENTSTACK_LIVE_PREVIEW_ENABLED=true
CONTENTSTACK_LIVE_PREVIEW_TOKEN=cs1234567890abcdef  # ← Replace with your actual token
CONTENTSTACK_LIVE_PREVIEW_HOST=rest-preview.contentstack.com
```

## Difference Between Tokens

| Token Type | Purpose | Where to Use |
|------------|---------|--------------|
| **Delivery Token** | Fetch published content | `CONTENTSTACK_DELIVERY_TOKEN` |
| **Preview Token** | Fetch draft/unpublished content | `CONTENTSTACK_LIVE_PREVIEW_TOKEN` |
| **Management Token** | Modify content types & entries | Used in scripts only |

## Troubleshooting

### "Preview token missing" Error

**Cause**: `CONTENTSTACK_LIVE_PREVIEW_TOKEN` is not set or is incorrect

**Fix**:
1. Check `.env.local` has the token
2. Make sure token value doesn't have quotes around it
3. Verify you copied the complete token (no spaces)
4. Restart dev server after adding

### "Invalid token" Error

**Cause**: Using Delivery Token instead of Preview Token

**Fix**:
1. Go to Contentstack → Settings → Tokens
2. Make sure you're copying the **Preview Token**, not Delivery Token
3. They look similar but serve different purposes

### Edit Buttons Don't Appear

**Cause**: Token is set but CSS might not be loaded

**Fix**:
1. Check browser console for errors
2. Verify `@contentstack/live-preview-utils/dist/main.css` is imported
3. Clear browser cache and reload

### Edit Buttons Appear But Don't Work

**Cause**: Token or API key mismatch

**Fix**:
1. Verify `CONTENTSTACK_API_KEY` matches your stack
2. Verify `CONTENTSTACK_LIVE_PREVIEW_TOKEN` is correct
3. Check browser console for specific error messages

## Testing Checklist

- [ ] Preview token added to `.env.local`
- [ ] Dev server restarted
- [ ] Console shows "✅ Live Preview initialized successfully"
- [ ] Opened homepage entry in Contentstack
- [ ] Clicked "Live Preview" button
- [ ] Homepage loads in preview panel
- [ ] Edit buttons appear on hover
- [ ] Clicking Edit button jumps to field

## Quick Copy-Paste Template

Add this to your `.env.local` (replace YOUR_TOKEN):

```env

# Live Preview Configuration
CONTENTSTACK_LIVE_PREVIEW_ENABLED=true
CONTENTSTACK_LIVE_PREVIEW_TOKEN=YOUR_PREVIEW_TOKEN_HERE
CONTENTSTACK_LIVE_PREVIEW_HOST=rest-preview.contentstack.com
```

---

## Need Help Getting the Token?

### Visual Guide:

1. **Contentstack Dashboard** → **Settings** (gear icon)
2. **Tokens** tab
3. Look for section labeled **"Preview Token"**
4. If not there, click **"+ New Token"** → **"Preview Token"**
5. Copy the token value (starts with `cs...`)
6. Paste into `.env.local`

### Screenshot Reference:

The Preview Token section looks like:
```
┌─────────────────────────────────────────┐
│ Preview Token                            │
│ ─────────────────────────────────────── │
│ Token Name: Live Preview                 │
│ Token: cs1234567890abcdef [Copy]        │ ← Copy this
│ Created: Dec 18, 2025                    │
└─────────────────────────────────────────┘
```

---

**Next Steps After Adding Token:**

1. ✅ Add token to `.env.local`
2. ✅ Restart dev server
3. ✅ Test Live Preview in Contentstack
4. ✅ Enjoy visual editing!

**Status**: Waiting for preview token configuration  
**Estimated Time**: 2 minutes  
**Difficulty**: Easy


