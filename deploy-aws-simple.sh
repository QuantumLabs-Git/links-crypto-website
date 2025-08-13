#!/bin/bash

# Simple AWS S3 Deployment Script for $LINKS Website
# Run this after configuring AWS CLI with: aws configure

echo "🚀 Deploying $LINKS website to AWS S3..."
echo ""

# Configuration
BUCKET_NAME="links-crypto-website"
REGION="us-east-1"

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &>/dev/null; then
    echo "❌ AWS CLI is not configured. Please run:"
    echo "   aws configure"
    echo ""
    echo "You'll need:"
    echo "- AWS Access Key ID"
    echo "- AWS Secret Access Key"
    echo "- Default region: us-east-1"
    echo "- Default output: json (or just press Enter)"
    exit 1
fi

echo "✅ AWS CLI is configured"
echo ""

# Create bucket
echo "📦 Creating S3 bucket: $BUCKET_NAME..."
aws s3 mb s3://$BUCKET_NAME --region $REGION 2>/dev/null || echo "Bucket already exists or using existing"

# Upload all website files
echo "📤 Uploading website files..."
aws s3 sync . s3://$BUCKET_NAME/ \
    --exclude ".git/*" \
    --exclude ".gitignore" \
    --exclude "*.sh" \
    --exclude "README.md" \
    --exclude ".DS_Store" \
    --exclude "icons.html" \
    --exclude "General Principles.rtfd/*" \
    --delete

# Set bucket policy for public access
echo "🔓 Setting bucket policy for public access..."
aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy '{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::'$BUCKET_NAME'/*"
        }
    ]
}'

# Enable static website hosting
echo "🌐 Enabling static website hosting..."
aws s3 website s3://$BUCKET_NAME/ --index-document index.html --error-document index.html

# Get the website URL
echo ""
echo "✅ Deployment complete!"
echo "🌐 Your website is live at:"
echo "   http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
echo ""
echo "Alternative URL:"
echo "   https://$BUCKET_NAME.s3.amazonaws.com/index.html"