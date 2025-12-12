# 🚀 Deploy to Contentstack Launch - Quick Guide

## Where to Add Environment Variables in Launch

### Step-by-Step Instructions

#### 1. Access Launch Dashboard
```
Contentstack Dashboard → Launch → Your Project → Settings → Environment Variables
```

#### 2. Add These 4 Variables

| Variable Name | Value | Notes |
|---------------|-------|-------|
| `CONTENTSTACK_API_KEY` | `blt123abc456def...` | From Settings → Stack |
| `CONTENTSTACK_DELIVERY_TOKEN` | `cs789xyz012ghi...` | From Settings → Tokens |
| `NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT` | `production` | Your environment name |
| `NEXT_PUBLIC_CONTENTSTACK_REGION` | `us` | Based on your URL |

**Important:** 
- ✅ Use exact variable names (with `NEXT_PUBLIC_` prefix)
- ✅ No quotes around values
- ✅ Copy-paste to avoid typos

#### 3. Location in Launch UI

```
Contentstack Dashboard
  └─ Launch (sidebar)
      └─ Projects
          └─ [Your Project]
              └─ Settings ⚙️
                  └─ Build Settings
                      └─ Environment Variables
                          └─ [Add Variable Button]
```

---

## Quick Deploy Steps

### Option A: Via Launch Dashboard (Recommended)

1. **Connect Repository**
   ```
   Launch → New Project → Import from Git → Select GitHub
   → Choose: Malligarjunan/contentstackengineeringhub
   ```

2. **Configure Build**
   - Framework: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Node Version: `18`

3. **Add Environment Variables**
   - Click "Add Variable" for each of the 4 variables above
   - Copy values from Contentstack Settings

4. **Deploy**
   - Click "Deploy" button
   - Wait for build to complete (2-3 minutes)
   - Visit your Launch URL

### Option B: Via Launch CLI

```bash
# Install Launch CLI
npm install -g @contentstack/launch-cli

# Login
launch login

# Initialize project
launch init

# Add environment variables
launch env:set CONTENTSTACK_API_KEY="blt123..."
launch env:set CONTENTSTACK_DELIVERY_TOKEN="cs789..."
launch env:set NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT="production"
launch env:set NEXT_PUBLIC_CONTENTSTACK_REGION="us"

# Deploy
launch deploy
```

---

## Get Your Contentstack Credentials

### API Key
```
Contentstack Dashboard
  → Settings (⚙️ top right)
  → Stack Settings
  → Stack Details
  → API Key: blt123abc...
```

### Delivery Token
```
Contentstack Dashboard
  → Settings (⚙️ top right)
  → Tokens
  → Delivery Tokens tab
  → Create/Select a token
  → Token: cs789xyz...
```

### Environment Name
```
Contentstack Dashboard
  → Settings (⚙️ top right)
  → Environments
  → Name (usually: production, development, staging)
```

### Region
Look at your Contentstack URL:
- `app.contentstack.com` → **us**
- `eu-app.contentstack.com` → **eu**
- `azure-na-app.contentstack.com` → **azure-na**
- `azure-eu-app.contentstack.com` → **azure-eu**

---

## Verify Deployment

### 1. Check Build Logs
```
Launch Dashboard → Your Project → Deployments → Latest Build → Logs
```

Look for:
- ✅ `Build completed successfully`
- ✅ No environment variable errors
- ✅ Next.js build output

### 2. Test Your Site
```
Visit: https://your-app.launchstack.io
```

Check:
- ✅ Homepage loads
- ✅ `/products` shows products from Contentstack
- ✅ Product detail pages work
- ✅ No console errors

### 3. Verify Data Source

Open browser console (F12) and check:
- ❌ Should NOT see: "using local data"
- ✅ Should see: Data loading from Contentstack

---

## Troubleshooting

### Build Fails

**Error:** `ENOENT: no such file or directory`
```bash
# Fix: Ensure all files are committed
git status
git add .
git commit -m "Add missing files"
git push origin contentstack
```

**Error:** `Module not found`
```bash
# Fix: Verify package.json
npm install
git add package*.json
git commit -m "Update dependencies"
git push
```

### Environment Variables Not Working

**Problem:** Site shows "using local data"

**Fix:**
1. ✅ Check spelling of variable names (must be exact)
2. ✅ Verify values have no quotes
3. ✅ Ensure `NEXT_PUBLIC_` prefix is present
4. ✅ Redeploy after adding variables

**How to Redeploy:**
```
Launch Dashboard → Your Project → Deployments → Redeploy
```

### Site Loads but No Data

**Check:**
1. ✅ Products are **published** in Contentstack (not just saved)
2. ✅ Environment name matches (production vs development)
3. ✅ Delivery token has access to the environment
4. ✅ API key is correct

---

## Alternative: Deploy to Vercel (Easier)

If Launch is complex, try Vercel:

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel

# 3. Add environment variables when prompted
# Or add them in Vercel dashboard later

# 4. Deploy to production
vercel --prod
```

**Or via Dashboard:**
1. Go to vercel.com
2. Import GitHub repo
3. Add 4 environment variables
4. Click Deploy

**Done in 2 minutes!** ✨

---

## Files Added for Deployment

- ✅ `launch.json` - Launch configuration
- ✅ `DEPLOYMENT_GUIDE.md` - Complete deployment guide
- ✅ `DEPLOY_TO_LAUNCH.md` - This quick reference

---

## Post-Deployment Checklist

After deployment succeeds:

- [ ] Site is live at Launch URL
- [ ] Homepage loads (test: `/`)
- [ ] Products page loads (test: `/products`)
- [ ] Product detail loads (test: `/products/cma`)
- [ ] Data comes from Contentstack (check console)
- [ ] Images load correctly
- [ ] Links work
- [ ] Mobile view works
- [ ] Set up custom domain (optional)
- [ ] Configure auto-deploy on git push

---

## Environment Variables Summary

**Copy-paste ready format for Launch:**

```
CONTENTSTACK_API_KEY
[paste your API key here - starts with blt]

CONTENTSTACK_DELIVERY_TOKEN
[paste your delivery token here - starts with cs]

NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT
production

NEXT_PUBLIC_CONTENTSTACK_REGION
us
```

---

## Need Help?

- **Launch Issues**: Contact Contentstack Support
- **Build Errors**: Check `DEPLOYMENT_GUIDE.md`
- **Env Variables**: See `.env.example` for format
- **Local Testing**: Run `node scripts/test-contentstack.js`

---

## Quick Commands

```bash
# Test locally first
npm run build
npm start

# Test Contentstack connection
node scripts/test-contentstack.js

# Commit deployment files
git add launch.json DEPLOYMENT_GUIDE.md DEPLOY_TO_LAUNCH.md
git commit -m "Add deployment configuration"
git push origin contentstack

# Deploy via CLI (if available)
launch deploy
```

---

**You're ready to deploy!** 🚀

The app will work with Launch once you add the 4 environment variables in the Launch dashboard settings.

