#!/bin/bash

# Test Revalidation API Endpoint
# This script tests the on-demand revalidation endpoint

echo "🧪 Testing Revalidation API Endpoint"
echo "====================================="
echo ""

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check if REVALIDATION_SECRET is set
if [ -z "$REVALIDATION_SECRET" ]; then
    echo "❌ ERROR: REVALIDATION_SECRET not set in .env file"
    echo ""
    echo "Generate a secret:"
    echo "  openssl rand -base64 32"
    echo ""
    echo "Add to .env file:"
    echo "  REVALIDATION_SECRET=your_secret_here"
    exit 1
fi

# Get the base URL (default to localhost)
BASE_URL="${1:-http://localhost:3000}"

echo "📡 Testing endpoint: $BASE_URL/api/revalidate"
echo "🔑 Using secret: ${REVALIDATION_SECRET:0:10}..."
echo ""

# Test GET request (health check)
echo "1️⃣  Testing GET request (health check)..."
GET_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" \
  -X GET \
  -H "Authorization: Bearer $REVALIDATION_SECRET" \
  "$BASE_URL/api/revalidate")

GET_HTTP_CODE=$(echo "$GET_RESPONSE" | grep "HTTP_CODE" | cut -d: -f2)
GET_BODY=$(echo "$GET_RESPONSE" | sed '/HTTP_CODE/d')

if [ "$GET_HTTP_CODE" = "200" ]; then
    echo "✅ GET request successful (200 OK)"
    echo "   Response: $GET_BODY"
else
    echo "❌ GET request failed (HTTP $GET_HTTP_CODE)"
    echo "   Response: $GET_BODY"
fi
echo ""

# Test POST request - Homepage revalidation
echo "2️⃣  Testing POST request (homepage revalidation)..."
POST_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" \
  -X POST \
  -H "Authorization: Bearer $REVALIDATION_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "content_type_uid": "homepage",
    "event": "publish",
    "data": {
      "uid": "test_homepage_uid",
      "title": "Test Homepage"
    }
  }' \
  "$BASE_URL/api/revalidate")

POST_HTTP_CODE=$(echo "$POST_RESPONSE" | grep "HTTP_CODE" | cut -d: -f2)
POST_BODY=$(echo "$POST_RESPONSE" | sed '/HTTP_CODE/d')

if [ "$POST_HTTP_CODE" = "200" ]; then
    echo "✅ POST request successful (200 OK)"
    echo "   Response: $POST_BODY"
else
    echo "❌ POST request failed (HTTP $POST_HTTP_CODE)"
    echo "   Response: $POST_BODY"
fi
echo ""

# Test POST request - Product revalidation
echo "3️⃣  Testing POST request (product revalidation)..."
PRODUCT_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" \
  -X POST \
  -H "Authorization: Bearer $REVALIDATION_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "content_type_uid": "product",
    "event": "publish",
    "data": {
      "uid": "test_product_uid",
      "title": "Test Product",
      "slug": "cma"
    }
  }' \
  "$BASE_URL/api/revalidate")

PRODUCT_HTTP_CODE=$(echo "$PRODUCT_RESPONSE" | grep "HTTP_CODE" | cut -d: -f2)
PRODUCT_BODY=$(echo "$PRODUCT_RESPONSE" | sed '/HTTP_CODE/d')

if [ "$PRODUCT_HTTP_CODE" = "200" ]; then
    echo "✅ POST request successful (200 OK)"
    echo "   Response: $PRODUCT_BODY"
else
    echo "❌ POST request failed (HTTP $PRODUCT_HTTP_CODE)"
    echo "   Response: $PRODUCT_BODY"
fi
echo ""

# Test unauthorized request
echo "4️⃣  Testing unauthorized request (should fail)..."
UNAUTH_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" \
  -X POST \
  -H "Authorization: Bearer wrong_secret" \
  -H "Content-Type: application/json" \
  -d '{"content_type_uid": "homepage"}' \
  "$BASE_URL/api/revalidate")

UNAUTH_HTTP_CODE=$(echo "$UNAUTH_RESPONSE" | grep "HTTP_CODE" | cut -d: -f2)

if [ "$UNAUTH_HTTP_CODE" = "401" ]; then
    echo "✅ Unauthorized request correctly rejected (401)"
else
    echo "⚠️  Expected 401 but got HTTP $UNAUTH_HTTP_CODE"
fi
echo ""

echo "====================================="
echo "✨ Testing complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Set up webhooks in Contentstack (see WEBHOOKS_SETUP.md)"
echo "   2. Use this URL in webhook settings:"
echo "      $BASE_URL/api/revalidate"
echo "   3. Add this header in webhook:"
echo "      Authorization: Bearer $REVALIDATION_SECRET"
echo ""

