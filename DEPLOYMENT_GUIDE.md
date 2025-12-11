# Deployment Guide - Contentstack Engineering Hub

## Deploying to Contentstack Launch

### Prerequisites
1. Contentstack account with Launch enabled
2. GitHub repository connected
3. Environment variables ready

### Step 1: Prepare Your App for Launch

#### 1.1 Verify Build Configuration

Your `package.json` should have these scripts (already configured):
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

#### 1.2 Create Launch Configuration File

Create a file named `launch.json` in the root directory:

```json
{
  "name": "contentstack-engineering-hub",
  "framework": "nextjs",
  "build_command": "npm run build",
  "output_directory": ".next",
  "install_command": "npm install",
  "dev_command": "npm run dev"
}
```

### Step 2: Configure Environment Variables in Launch

#### Where to Add Environment Variables:

1. **Go to Contentstack Launch Dashboard**
   - Log in to Contentstack
   - Navigate to **Launch** in the sidebar
   - Select your project or create a new one

2. **Add Environment Variables**
   - Go to: **Settings** → **Environment Variables**
   - Or: **Project Settings** → **Build Settings** → **Environment Variables**

3. **Add These Variables:**

```env
# Contentstack Configuration
NEXT_PUBLIC_CONTENTSTACK_API_KEY=blt_your_api_key
NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN=cs_your_delivery_token
NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=production
NEXT_PUBLIC_CONTENTSTACK_REGION=us
```

**Important Notes:**
- Use `NEXT_PUBLIC_` prefix for client-side accessible variables
- Don't use quotes around the values in Launch UI
- Each variable should be on a separate line/field

#### Example in Launch UI:

| Variable Name | Value |
|---------------|-------|
| `NEXT_PUBLIC_CONTENTSTACK_API_KEY` | `blt123abc456def` |
| `NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN` | `cs789xyz012ghi` |
| `NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT` | `production` |
| `NEXT_PUBLIC_CONTENTSTACK_REGION` | `us` |

### Step 3: Deploy to Launch

#### Option A: Automatic Deployment (Recommended)

1. **Connect GitHub Repository**
   - In Launch dashboard, click **New Project**
   - Select **Import from GitHub**
   - Choose your repository: `Malligarjunan/contentstackengineeringhub`
   - Select branch: `main` or `contentstack`

2. **Configure Build Settings**
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Add Environment Variables**
   - As described in Step 2 above

4. **Deploy**
   - Click **Deploy**
   - Launch will automatically build and deploy your app

#### Option B: Manual Deployment

```bash
# Install Launch CLI (if available)
npm install -g @contentstack/launch-cli

# Login to Launch
launch login

# Deploy
launch deploy
```

### Step 4: Verify Deployment

1. **Check Build Logs**
   - Look for: "Build completed successfully"
   - Verify no environment variable errors

2. **Test Your Site**
   - Visit the Launch URL (e.g., `your-app.launchstack.io`)
   - Check: http://your-app.launchstack.io/products
   - Verify products load from Contentstack

3. **Check Browser Console**
   - Should see NO "using local data" messages
   - Products should load from CMS

### Step 5: Set Up Auto-Deploy (Optional)

Configure automatic deployments on git push:

1. **In Launch Dashboard:**
   - Settings → Git Integration
   - Enable: "Auto-deploy on push"
   - Select branch: `main`

2. **Webhook Configuration:**
   - Launch will create a webhook in your GitHub repo
   - Every push to `main` triggers a new deployment

---

## Alternative: Deploying to Vercel (Recommended)

Vercel has excellent Next.js support and is very easy to set up.

### Step 1: Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### Step 2: Deploy via Vercel Dashboard

1. **Go to Vercel.com**
   - Sign in with GitHub
   - Click **New Project**

2. **Import Repository**
   - Select: `Malligarjunan/contentstackengineeringhub`
   - Click **Import**

3. **Configure Project**
   - Framework Preset: Next.js (auto-detected)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)

4. **Add Environment Variables**
   
   Click **Environment Variables** and add:
   
   ```
   NEXT_PUBLIC_CONTENTSTACK_API_KEY = blt_your_api_key
   NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN = cs_your_delivery_token
   NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT = production
   NEXT_PUBLIC_CONTENTSTACK_REGION = us
   ```

5. **Deploy**
   - Click **Deploy**
   - Wait for build to complete
   - Your app will be live at: `your-app.vercel.app`

### Step 3: Deploy via CLI

```bash
# Login to Vercel
vercel login

# Deploy
cd contentstack-engineering-hub
vercel

# Add environment variables during prompts
# Or add them later in Vercel dashboard

# Deploy to production
vercel --prod
```

### Step 4: Configure Production Settings

In Vercel Dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add all variables for **Production** environment
3. Redeploy if needed

---

## Alternative: Deploying to Netlify

### Step 1: Via Netlify Dashboard

1. **Go to Netlify.com**
   - Sign in with GitHub
   - Click **New site from Git**

2. **Connect Repository**
   - Choose GitHub
   - Select: `Malligarjunan/contentstackengineeringhub`

3. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Click **Show advanced** → **New variable**

4. **Add Environment Variables**
   ```
   NEXT_PUBLIC_CONTENTSTACK_API_KEY
   NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN
   NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT
   NEXT_PUBLIC_CONTENTSTACK_REGION
   ```

5. **Deploy**
   - Click **Deploy site**

---

## Environment Variables Reference

### Required Variables

| Variable | Description | Example | Where to Get |
|----------|-------------|---------|--------------|
| `NEXT_PUBLIC_CONTENTSTACK_API_KEY` | Stack API Key | `blt123abc...` | Contentstack → Settings → Stack |
| `NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN` | Delivery Token | `cs789xyz...` | Contentstack → Settings → Tokens |
| `NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT` | Environment | `production` | Contentstack → Settings → Environments |
| `NEXT_PUBLIC_CONTENTSTACK_REGION` | Region | `us` | Based on your Contentstack URL |

### Region Values

| Contentstack URL | Region Value |
|------------------|--------------|
| `app.contentstack.com` | `us` |
| `eu-app.contentstack.com` | `eu` |
| `azure-na-app.contentstack.com` | `azure-na` |
| `azure-eu-app.contentstack.com` | `azure-eu` |
| `gcp-na-app.contentstack.com` | `gcp-na` |

### Why `NEXT_PUBLIC_` Prefix?

Next.js requires `NEXT_PUBLIC_` prefix for variables that need to be:
- Accessible in the browser
- Used in client-side code
- Embedded in the static bundle

**Without this prefix**, the variables won't be available in your app!

---

## Build Configuration

### Next.js Configuration

Your `next.config.ts` (if you need custom config):

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static exports if needed
  output: 'standalone', // For Docker/self-hosting
  
  // Or use default for Vercel/Launch
  // (no output setting needed)
  
  // Image optimization
  images: {
    domains: [
      'api.dicebear.com', // For avatar images
      'contentstack.com',
    ],
  },
  
  // Environment variables validation (optional)
  env: {
    NEXT_PUBLIC_CONTENTSTACK_API_KEY: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
    NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN,
  },
};

export default nextConfig;
```

---

## Troubleshooting Deployment Issues

### Issue: Build Fails with "Module not found"

**Solution:**
```bash
# Ensure all dependencies are in package.json
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

### Issue: Environment Variables Not Working

**Checklist:**
- ✅ Variables have `NEXT_PUBLIC_` prefix
- ✅ Variables are set in deployment platform (not just `.env.local`)
- ✅ No quotes around values in platform UI
- ✅ Redeployed after adding variables

**Fix:**
1. Go to deployment platform dashboard
2. Verify all 4 environment variables are set
3. Trigger a new deployment

### Issue: "Using local data" in Production

**This means:**
- Environment variables aren't configured properly
- OR Contentstack API is unreachable

**Solution:**
1. Check environment variables in deployment platform
2. Verify values are correct (no typos)
3. Test Contentstack connection locally first
4. Redeploy after fixing

### Issue: Pages Show 404 or Don't Load

**Solution:**
1. Check build logs for errors
2. Ensure `npm run build` works locally
3. Verify all required environment variables are set
4. Check ISR revalidation settings

### Issue: Build Succeeds but Site Shows Errors

**Check:**
1. Browser console for errors
2. Network tab for failed API calls
3. Contentstack credentials are correct
4. Content is published in Contentstack

---

## Post-Deployment Checklist

- [ ] Site is accessible at deployment URL
- [ ] Homepage loads correctly
- [ ] Products page shows all products
- [ ] Product detail pages load
- [ ] Data is coming from Contentstack (check console)
- [ ] Images load correctly
- [ ] External links work
- [ ] No errors in browser console
- [ ] Mobile responsive works
- [ ] ISR revalidation is working (check after 1 hour)

---

## Continuous Deployment

### Automatic Deploys on Git Push

**Vercel:**
- Automatically enabled
- Every push to `main` = production deploy
- Every push to other branches = preview deploy

**Netlify:**
- Automatically enabled
- Configure in: Settings → Build & deploy

**Contentstack Launch:**
- Enable in: Settings → Git Integration

### Manual Deployments

**Trigger manually when needed:**

**Vercel:**
```bash
vercel --prod
```

**Netlify:**
```bash
netlify deploy --prod
```

**Launch:**
- Click "Redeploy" in dashboard

---

## Performance Optimization

### Enable ISR (Already Configured)

Your pages use ISR with 1-hour revalidation:
```typescript
export const revalidate = 3600; // 1 hour
```

**Benefits:**
- Static pages cached at CDN edge
- Automatic background revalidation
- Always fast, always fresh

### CDN Distribution

All platforms provide global CDN:
- **Vercel**: Automatic global CDN
- **Netlify**: Automatic global CDN  
- **Launch**: Contentstack's global CDN

---

## Security Best Practices

### 1. Never Commit Secrets

Ensure `.env.local` is in `.gitignore` (already configured):
```gitignore
.env.local
.env*.local
```

### 2. Use Delivery Tokens (Not Management Tokens)

For public sites, use:
- ✅ Delivery Token (read-only)
- ❌ Management Token (read-write)

### 3. Environment-Specific Tokens

Consider separate tokens for:
- Development environment
- Staging environment
- Production environment

### 4. Rotate Tokens Regularly

1. Create new delivery token in Contentstack
2. Update in deployment platform
3. Redeploy
4. Delete old token

---

## Summary: Quick Deploy to Launch

1. **Push code to GitHub** ✅ (Already done!)

2. **Go to Contentstack Launch Dashboard**

3. **Add Environment Variables:**
   ```
   NEXT_PUBLIC_CONTENTSTACK_API_KEY = [your-api-key]
   NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN = [your-token]
   NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT = production
   NEXT_PUBLIC_CONTENTSTACK_REGION = us
   ```

4. **Configure Build:**
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. **Deploy!**

Your app will be live at your Launch URL! 🚀

---

## Need Help?

- **Launch Docs**: https://www.contentstack.com/docs/developers/launch/
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **This Project**: See `README.md` and other guides

---

**Recommended Platform**: Vercel or Contentstack Launch  
**Easiest Setup**: Vercel (one-click deploy)  
**Best for Contentstack**: Launch (integrated platform)

