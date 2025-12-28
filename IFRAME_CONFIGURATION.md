# X-Frame-Options & CSP Configuration for Live Preview

## What Was Configured

✅ Added security headers to `next.config.ts` to allow your application to be embedded in iframes from [Contentstack's Live Preview panel](https://app.contentstack.com/).

## Why This Is Needed

When you use **Live Preview** in Contentstack, the Contentstack UI loads your application inside an iframe. By default, Next.js sets security headers that **prevent** your site from being embedded in iframes to protect against clickjacking attacks.

To make Live Preview work, we need to explicitly allow embedding from trusted Contentstack domains.

## What Was Added

### Content Security Policy (CSP) Headers

The configuration allows your app to be embedded in iframes from:

| Domain | Region | Purpose |
|--------|--------|---------|
| `https://app.contentstack.com` | US | Main Contentstack dashboard |
| `https://eu-app.contentstack.com` | EU | European region |
| `https://azure-na-app.contentstack.com` | Azure NA | Azure North America |
| `https://azure-eu-app.contentstack.com` | Azure EU | Azure Europe |
| `https://gcp-na-app.contentstack.com` | GCP NA | Google Cloud North America |
| `https://gcp-eu-app.contentstack.com` | GCP EU | Google Cloud Europe |
| `http://localhost:*` | Local | For testing |

## Security Notes

✅ **Secure**: Only allows embedding from trusted Contentstack domains  
✅ **Modern**: Uses `Content-Security-Policy` (CSP) `frame-ancestors` directive  
✅ **Compliant**: Follows security best practices  
❌ **Not Vulnerable**: Does NOT allow embedding from any domain  

## Configuration Details

```typescript
// next.config.ts
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "frame-ancestors 'self' https://app.contentstack.com ..."
        }
      ]
    }
  ];
}
```

## How to Restart Development Server

### Step 1: Stop Current Server

In your terminal where `npm run dev` is running:
- Press `Ctrl + C`
- Wait for the server to stop completely

### Step 2: Start Server Again

```bash
npm run dev
```

### Step 3: Verify Configuration

After restart, you should see:
```
✓ Ready in X ms
```

The new security headers are now active!

## Testing Live Preview

### Step 1: Open Contentstack Dashboard

Go to: https://app.contentstack.com

### Step 2: Open Homepage Entry

1. Navigate to **Entries** → **homepage**
2. Click on your homepage entry

### Step 3: Click Live Preview

1. Click the **Live Preview** button (top right)
2. Your app should load in the preview panel (no errors!)

### Step 4: Test Edit Buttons

1. Hover over text on your homepage
2. **Edit** buttons should appear
3. Click an Edit button
4. You should jump to that field in Contentstack

## Troubleshooting

### "Refused to display in a frame" Error

**Before Fix:**
```
Refused to display 'http://localhost:3000/' in a frame because 
it set 'X-Frame-Options' to 'deny'.
```

**After Fix:**
✅ Your app loads successfully in the iframe

### Headers Not Working

**Problem**: Live Preview still not loading in iframe

**Solutions**:
1. **Restart dev server** - Config changes require restart
2. **Clear browser cache** - Old headers might be cached
3. **Check browser console** - Look for specific errors
4. **Try incognito mode** - Eliminates cache issues

### Wrong Region

**Problem**: Using a different Contentstack region

**Solution**: The config includes all regions by default! If you need to add a custom domain:

1. Edit `next.config.ts`
2. Add your domain to the `frame-ancestors` list:
   ```typescript
   value: [
     "frame-ancestors 'self'",
     "https://your-custom-domain.com",
     // ... existing domains
   ].join(' ')
   ```
3. Restart server

## How It Works

### Request Flow

```
┌─────────────────────────────────────────┐
│  User opens Live Preview in             │
│  app.contentstack.com                   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Contentstack loads your app in iframe: │
│  <iframe src="http://localhost:3000">   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Your Next.js app receives request      │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Next.js adds security headers:         │
│  Content-Security-Policy:               │
│    frame-ancestors 'self'               │
│    https://app.contentstack.com ...     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Browser checks: Is the parent frame    │
│  (app.contentstack.com) in the          │
│  allowed list?                          │
└──────────────┬──────────────────────────┘
               │
               ├─ YES ✅ → App loads in iframe
               │
               └─ NO ❌ → Blocked with error
```

### Security Validation

The browser performs these checks:

1. **Origin Check**: Is the parent frame from an allowed domain?
2. **Protocol Check**: HTTPS required for production
3. **Port Check**: Localhost can use any port for development

## Production Deployment

When deploying to production (Vercel, etc.):

### Step 1: Update `clientUrlParams` in Live Preview Config

Edit `lib/live-preview.ts` to use your production URL:

```typescript
clientUrlParams: {
  protocol: 'https',
  host: 'your-domain.vercel.app', // Replace with your domain
  port: 443,
}
```

### Step 2: Configure Live Preview in Contentstack

1. Go to **Settings** → **Live Preview**
2. Update preview URL to: `https://your-domain.vercel.app`
3. Save settings

### Step 3: Security Headers Work Automatically

The `next.config.ts` headers apply to both development and production!

## Additional Security (Optional)

### Add More Strict CSP Rules

You can add more CSP directives for enhanced security:

```typescript
{
  key: 'Content-Security-Policy',
  value: [
    "frame-ancestors 'self' https://app.contentstack.com",
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
  ].join('; '),
}
```

### Add Referrer Policy

```typescript
{
  key: 'Referrer-Policy',
  value: 'strict-origin-when-cross-origin',
}
```

## Summary

✅ **What**: Added CSP headers to allow iframe embedding  
✅ **Why**: Required for Contentstack Live Preview to work  
✅ **Security**: Only allows trusted Contentstack domains  
✅ **Next Step**: Restart dev server (`Ctrl+C` then `npm run dev`)  

## Quick Checklist

- [ ] Configuration added to `next.config.ts` ✅
- [ ] Restart development server
- [ ] Open Contentstack Live Preview
- [ ] Verify app loads in iframe
- [ ] Test edit buttons work

---

**Status**: Configuration complete, restart required  
**Impact**: Enables Live Preview iframe embedding  
**Security**: Secure - only allows trusted domains

