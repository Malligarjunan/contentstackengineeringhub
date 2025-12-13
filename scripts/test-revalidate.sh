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

# Test 1: Revalidate specific product by slug
echo -e "${YELLOW}Test 1: Revalidate specific product (CDA)${NC}"
curl -s "${BASE_URL}/api/revalidate?slug=cda" | jq '.'
echo -e "\n"

# Test 2: Revalidate another product
echo -e "${YELLOW}Test 2: Revalidate another product (Automation)${NC}"
curl -s "${BASE_URL}/api/revalidate?slug=automation" | jq '.'
echo -e "\n"

# Test 3: Revalidate by path
echo -e "${YELLOW}Test 3: Revalidate products listing page${NC}"
curl -s "${BASE_URL}/api/revalidate?path=/products" | jq '.'
echo -e "\n"

# Test 4: Revalidate homepage
echo -e "${YELLOW}Test 4: Revalidate homepage${NC}"
curl -s "${BASE_URL}/api/revalidate?path=/" | jq '.'
echo -e "\n"

# Test 5: Error case - missing parameters
echo -e "${YELLOW}Test 5: Error case - missing parameters${NC}"
curl -s "${BASE_URL}/api/revalidate" | jq '.'
echo -e "\n"

# Test 6: POST request with JSON body
echo -e "${YELLOW}Test 6: POST request with JSON body${NC}"
curl -s -X POST "${BASE_URL}/api/revalidate" \
  -H "Content-Type: application/json" \
  -d '{"slug": "launch"}' | jq '.'
echo -e "\n"

# Test 7: POST request with path
echo -e "${YELLOW}Test 7: POST request with path${NC}"
curl -s -X POST "${BASE_URL}/api/revalidate" \
  -H "Content-Type: application/json" \
  -d '{"path": "/products"}' | jq '.'
echo -e "\n"

echo -e "${GREEN}✅ All tests completed!${NC}"
echo -e "\n${BLUE}Usage examples:${NC}"
echo -e "  Revalidate specific product: curl ${BASE_URL}/api/revalidate?slug=cda"
echo -e "  Revalidate all products:     curl ${BASE_URL}/api/revalidate?path=/products"
echo -e "  Revalidate homepage:         curl ${BASE_URL}/api/revalidate?path=/"
echo -e "\n${BLUE}Webhook URL for Contentstack:${NC}"
echo -e "  ${BASE_URL}/api/revalidate?slug={{entry.uid}}"

