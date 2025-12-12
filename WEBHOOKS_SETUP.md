# Setting Up Contentstack Webhooks for On-Demand Revalidation

This guide explains how to set up webhooks in Contentstack to automatically update your deployed site when content is published.

## 🎯 Problem

Your Next.js app uses **Incremental Static Regeneration (ISR)** with a 1-hour cache. This means:
- ✅ **Localhost**: Changes show immediately (no cache)
- ❌ **Production (Launch)**: Changes only show after 1 hour OR after redeployment

## ✅ Solution: On-Demand Revalidation

Use Contentstack webhooks to trigger instant cache invalidation when content is published.

---

## 📋 Setup Steps

### Step 1: Generate a Revalidation Secret

Generate a secure random token:

```bash
# On Mac/Linux
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Step 2: Add Environment Variables

Add to your `.env` and `.env.local`:

```bash
# Revalidation Secret (use the generated token)
REVALIDATION_SECRET=your_generated_secret_here
```

**For Contentstack Launch:**
Add this same environment variable in your Launch project settings.

### Step 3: Deploy Your App

Deploy your app with the new revalidation API route:

```bash
npm run build
```

Or push to your git repository if auto-deploying.

### Step 4: Configure Webhooks in Contentstack

1. **Go to Contentstack Dashboard**
   - Navigate to **Settings > Webhooks**

2. **Create Homepage Webhook**
   - Click **+ New Webhook**
   - **Name**: `Homepage Revalidation`
   - **URL**: `https://your-domain.com/api/revalidate`
     - For Launch: Use your Launch URL
     - Example: `https://your-project.contentstacklaunch.com/api/revalidate`
   - **Method**: POST
   - **Headers**:
     ```
     Authorization: Bearer your_generated_secret_here
     Content-Type: application/json
     ```
   - **When**: Select events to trigger:
     - ✅ Entry Published
     - ✅ Entry Unpublished
     - ✅ Entry Deleted
   - **Content Type**: Select `homepage`
   - **Advanced**: Leave default or customize as needed
   - Click **Save**

3. **Create Products Webhook**
   - Repeat the same steps but:
   - **Name**: `Products Revalidation`
   - **Content Type**: Select `product`
   - Same URL and headers as above

### Step 5: Test the Webhook

#### Test from Command Line:

```bash
# Test the API endpoint
curl -X POST https://your-domain.com/api/revalidate \
  -H "Authorization: Bearer your_secret" \
  -H "Content-Type: application/json" \
  -d '{
    "content_type_uid": "homepage",
    "event": "publish",
    "data": {
      "uid": "test123"
    }
  }'
```

#### Test from Contentstack:

1. Edit your homepage entry
2. Make a small change
3. **Publish** the entry
4. Check the Webhook logs in Contentstack:
   - Go to **Settings > Webhooks**
   - Click on your webhook
   - View **Execution Logs**
   - Should show status `200 OK`

#### Test from Browser:

1. Publish content in Contentstack
2. Wait 2-3 seconds
3. Refresh your deployed site
4. ✅ Changes should appear immediately!

---

## 🔍 How It Works

```mermaid
sequenceDiagram
    participant User
    participant Contentstack
    participant Webhook
    participant NextJS
    participant Cache

    User->>Contentstack: Publish Entry
    Contentstack->>Webhook: Trigger Webhook
    Webhook->>NextJS: POST /api/revalidate
    NextJS->>Cache: Invalidate Cache
    NextJS->>Webhook: 200 OK
    Webhook->>Contentstack: Log Success
```

1. **User publishes content** in Contentstack
2. **Contentstack triggers webhook** with entry details
3. **Webhook calls** your `/api/revalidate` endpoint
4. **Next.js invalidates** the cached page
5. **Next visitor** gets fresh content (regenerated)

---

## 📝 Webhook Payload Example

When you publish a homepage entry, Contentstack sends:

```json
{
  "event": "publish",
  "content_type_uid": "homepage",
  "data": {
    "uid": "blt123abc456",
    "title": "Engineering Hub Homepage",
    "locale": "en-us",
    "url": "/homepage"
  }
}
```

When you publish a product:

```json
{
  "event": "publish",
  "content_type_uid": "product",
  "data": {
    "uid": "blt789xyz012",
    "title": "CMA",
    "slug": "cma",
    "locale": "en-us"
  }
}
```

---

## 🔐 Security Best Practices

1. **Keep your secret safe**
   - Never commit it to git
   - Use environment variables
   - Rotate periodically

2. **Use HTTPS only**
   - Webhooks should only call HTTPS endpoints

3. **Verify webhook signatures** (optional enhancement)
   - Add webhook signature verification for extra security

---

## 🐛 Troubleshooting

### Webhook Returns 401 Unauthorized

- ❌ **Problem**: Authorization header doesn't match
- ✅ **Solution**: 
  - Check your `REVALIDATION_SECRET` in environment variables
  - Verify the `Authorization` header in webhook settings
  - Make sure you're using `Bearer your_secret`

### Webhook Returns 500 Error

- ❌ **Problem**: Server error during revalidation
- ✅ **Solution**:
  - Check server logs
  - Verify the API route is deployed
  - Test the endpoint manually

### Changes Still Not Showing

- ❌ **Problem**: Cache not clearing
- ✅ **Solution**:
  - Wait 2-3 seconds after publishing
  - Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
  - Check webhook execution logs
  - Verify webhook was triggered

### Testing Webhook Locally

You can use ngrok to test webhooks on localhost:

```bash
# Install ngrok
brew install ngrok  # or download from ngrok.com

# Start your Next.js app
npm run dev

# In another terminal, expose localhost
ngrok http 3000

# Use the ngrok URL in your webhook
# Example: https://abc123.ngrok.io/api/revalidate
```

---

## 📊 Monitoring

### View Webhook Logs in Contentstack

1. Go to **Settings > Webhooks**
2. Click on your webhook
3. View **Execution Logs**
4. Check status codes:
   - ✅ **200**: Success
   - ❌ **401**: Unauthorized
   - ❌ **500**: Server error

### View Revalidation Logs

Check your application logs (Launch logs or your hosting platform):

```
📬 Received revalidation request: { contentType: 'homepage', event: 'publish' }
🏠 Revalidating homepage
✅ Revalidated: /
```

---

## 🎉 Success!

Once configured, your workflow becomes:

1. Edit content in Contentstack
2. Click **Publish**
3. Wait 2-3 seconds ⏱️
4. Refresh your site
5. ✨ See changes immediately!

No more waiting 1 hour or redeploying! 🚀

---

## 📚 Additional Resources

- [Next.js On-Demand Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [Contentstack Webhooks Documentation](https://www.contentstack.com/docs/developers/set-up-webhooks)
- [Contentstack Launch Documentation](https://www.contentstack.com/docs/developers/launch)

