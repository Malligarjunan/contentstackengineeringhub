# 🚀 Quick Start: Solving the Content Update Delay Issue

## 🎯 The Problem You Were Facing

**Symptom:** When you publish content in Contentstack:
- ✅ **Localhost** shows changes immediately
- ❌ **Contentstack Launch** shows old data until redeployment

**Root Cause:** Your app uses ISR (Incremental Static Regeneration) with 1-hour cache (`revalidate = 3600`). Changes only appear after:
1. The cache expires (1 hour)
2. Manual redeployment

## ✅ The Solution: On-Demand Revalidation

I've implemented **webhooks** that automatically clear the cache when you publish content. Now changes appear in **2-3 seconds**!

---

## 📋 Setup Instructions

### Step 1: Add Environment Variable

Add this to your `.env` file:

```bash
# Generate a secure secret with:
# openssl rand -base64 32

REVALIDATION_SECRET=6o6ZI4EDm1mgcPrm7ulC5ECrwwI3pnFglaqb9l9ecl8=
```

**Important:** Also add this same variable to your **Contentstack Launch** project environment variables!

### Step 2: Deploy Your App

Deploy your updated app (the one with the new `/api/revalidate` endpoint):

```bash
# Build and deploy
npm run build
```

Or push to git if using auto-deployment.

### Step 3: Set Up Webhooks in Contentstack

#### For Homepage Content:

1. Go to **Contentstack Dashboard > Settings > Webhooks**
2. Click **+ New Webhook**
3. Configure:
   - **Name**: `Homepage Revalidation`
   - **URL**: `https://your-launch-url.contentstacklaunch.com/api/revalidate`
   - **Method**: POST
   - **Headers**:
     ```
     Authorization: Bearer 6o6ZI4EDm1mgcPrm7ulC5ECrwwI3pnFglaqb9l9ecl8=
     Content-Type: application/json
     ```
   - **When**: Check these events:
     - ✅ Entry Published
     - ✅ Entry Unpublished
     - ✅ Entry Deleted
   - **Content Type**: Select `homepage`
4. Click **Save**

#### For Product Content:

Repeat the same steps but:
- **Name**: `Products Revalidation`
- **Content Type**: Select `product`
- Same URL and headers

### Step 4: Test It!

1. **Edit** your homepage entry in Contentstack
2. Make a small change
3. Click **Publish**
4. Wait **2-3 seconds** ⏱️
5. **Refresh** your Launch site
6. ✨ **See the changes immediately!**

---

## 🧪 Testing

### Test Locally (Before Setting Up Webhooks):

```bash
# Start your dev server
npm run dev

# In another terminal, test the endpoint
./scripts/test-revalidation.sh
```

### Test Production:

```bash
# Test your deployed site
./scripts/test-revalidation.sh https://your-launch-url.com
```

### Expected Output:

```
✅ GET request successful (200 OK)
✅ POST request successful (200 OK)
✅ Unauthorized request correctly rejected (401)
```

---

## 📁 New Files Created

| File | Purpose |
|------|---------|
| `app/api/revalidate/route.ts` | API endpoint that clears cache |
| `WEBHOOKS_SETUP.md` | Complete webhook setup guide |
| `scripts/test-revalidation.sh` | Test script for the endpoint |
| `QUICK_START.md` | This file! |

---

## 🔍 How It Works

```
You Publish → Contentstack → Webhook → Next.js API → Cache Cleared → Fresh Content
```

1. You publish content in Contentstack
2. Contentstack sends webhook to `/api/revalidate`
3. API verifies the secret token
4. Next.js clears the cache for affected pages
5. Next visitor gets fresh content!

---

## 📊 What Gets Revalidated

| Content Type | Pages Revalidated |
|--------------|-------------------|
| **Homepage** | `/` (homepage) |
| **Product** | `/products` (listing)<br>`/products/[slug]` (detail)<br>`/` (homepage stats) |

---

## 🐛 Troubleshooting

### Changes Still Not Showing?

1. **Wait 2-3 seconds** after publishing
2. **Hard refresh** browser (Cmd+Shift+R / Ctrl+Shift+R)
3. **Check webhook logs** in Contentstack:
   - Go to Settings > Webhooks
   - Click on your webhook
   - View Execution Logs
   - Should show status `200 OK`

### Webhook Returns 401?

- Check that `REVALIDATION_SECRET` matches in:
  - Your `.env` file
  - Launch environment variables
  - Webhook Authorization header

### Webhook Returns 500?

- Check application logs in Launch
- Verify the API route is deployed
- Test the endpoint manually

---

## 🎉 Before vs After

### Before (ISR Only):
```
Publish → Wait 1 hour OR Redeploy → Changes visible
⏱️  1 hour wait or manual intervention
```

### After (ISR + Webhooks):
```
Publish → 2-3 seconds → Changes visible
⚡ Instant updates!
```

---

## 📚 Additional Documentation

- 📖 **Full webhook guide**: See `WEBHOOKS_SETUP.md`
- 🧪 **Testing scripts**: See `scripts/README.md`
- 🔧 **Environment setup**: See `.env.example`

---

## 🎯 Summary

**What you need to do:**

1. ✅ Add `REVALIDATION_SECRET` to `.env` and Launch
2. ✅ Deploy your app
3. ✅ Set up 2 webhooks in Contentstack (homepage & products)
4. ✅ Test by publishing content

**What you get:**

- ✨ Instant content updates (2-3 seconds)
- 🚀 No more waiting for cache expiry
- 💪 No more manual redeployments
- 🎉 Production works like localhost!

---

Need help? Check `WEBHOOKS_SETUP.md` for detailed troubleshooting! 🚀
