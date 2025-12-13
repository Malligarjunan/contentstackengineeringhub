#!/bin/bash

# Test script for on-demand revalidation API
# Based on Next.js ISR documentation: https://nextjs.org/docs/pages/guides/incremental-static-regeneration

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Base URL (change this to your deployment URL)
BASE_URL="${1:-http://localhost:3000}"

echo -e "${BLUE}🧪 Testing On-Demand Revalidation API${NC}"
echo -e "${BLUE}=====================================${NC}\n"
echo -e "Base URL: ${BASE_URL}\n"

# Test: Revalidate ALL product pages (no parameters)
echo -e "${YELLOW}Test: Revalidate ALL product pages${NC}"
echo -e "${BLUE}Calling: GET ${BASE_URL}/api/revalidate${NC}\n"
curl -s "${BASE_URL}/api/revalidate" | jq '.'
echo -e "\n"

echo -e "${GREEN}✅ Test completed!${NC}"
echo -e "\n${BLUE}Usage:${NC}"
echo -e "  Revalidate ALL products: curl ${BASE_URL}/api/revalidate"
echo -e "\n${BLUE}What happens:${NC}"
echo -e "  1. Fetches all product slugs from Contentstack"
echo -e "  2. Revalidates each product page (/products/[slug])"
echo -e "  3. Revalidates the products listing page (/products)"
echo -e "\n${BLUE}Webhook URL for Contentstack:${NC}"
echo -e "  ${BASE_URL}/api/revalidate"
echo -e "\n${BLUE}Configure in Contentstack:${NC}"
echo -e "  Settings > Webhooks > + New Webhook"
echo -e "  URL: ${BASE_URL}/api/revalidate"
echo -e "  Method: GET"
echo -e "  Events: Publish, Unpublish"

