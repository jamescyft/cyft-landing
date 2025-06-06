#!/bin/bash

# Cyft Landing Page - Quick Deploy Script
# Just run: ./deploy-quick.sh "Your commit message"

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🚀 Deploying Cyft Landing Page...${NC}"
echo ""

# Get commit message or use default
COMMIT_MSG="${1:-Update: $(date +'%Y-%m-%d %H:%M')}"

# Add all changes
echo "📦 Staging changes..."
git add .

# Commit
echo "💾 Committing: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

# Push to GitHub (triggers Vercel deployment)
echo "🚀 Pushing to GitHub (this triggers Vercel deployment)..."
git push

echo ""
echo -e "${GREEN}✅ Deployment initiated!${NC}"
echo ""
echo "🔗 Your site will be updated at:"
echo "   https://cyft-website.vercel.app"
echo ""
echo "📊 Check deployment status at:"
echo "   https://vercel.com/jamescyft/cyft-website"
echo ""
echo -e "${GREEN}Done! Your changes will be live in ~2 minutes.${NC}" 