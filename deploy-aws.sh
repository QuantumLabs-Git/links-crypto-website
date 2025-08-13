#!/bin/bash

# AWS S3 Deployment Script for $LINKS Website
# Make sure to run: chmod +x deploy-aws.sh

echo "🚀 Deploying $LINKS website to AWS S3..."

# Configuration
BUCKET_NAME="links-crypto-website"
REGION="us-east-1"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first:"
    echo "   brew install awscli"
    echo "   Then run: aws configure"
    exit 1
fi

# Check if bucket exists, if not create it
if aws s3api head-bucket --bucket "$BUCKET_NAME" 2>/dev/null; then
    echo "✅ Bucket $BUCKET_NAME exists"
else
    echo "📦 Creating bucket $BUCKET_NAME..."
    aws s3api create-bucket --bucket "$BUCKET_NAME" --region "$REGION"
fi

# Enable static website hosting
echo "🌐 Configuring static website hosting..."
aws s3 website "s3://$BUCKET_NAME/" \
    --index-document index.html \
    --error-document index.html

# Set bucket policy for public access
echo "🔓 Setting bucket policy for public access..."
cat > /tmp/bucket-policy.json <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
EOF

aws s3api put-bucket-policy --bucket "$BUCKET_NAME" --policy file:///tmp/bucket-policy.json

# Upload files
echo "📤 Uploading website files..."
aws s3 sync . "s3://$BUCKET_NAME/" \
    --exclude ".git/*" \
    --exclude ".gitignore" \
    --exclude "*.sh" \
    --exclude "README.md" \
    --exclude ".DS_Store" \
    --exclude "icons.html" \
    --exclude "General Principles.rtfd/*" \
    --delete

# Set content types
echo "📝 Setting content types..."
aws s3 cp "s3://$BUCKET_NAME/" "s3://$BUCKET_NAME/" \
    --exclude "*" \
    --include "*.html" \
    --recursive \
    --metadata-directive REPLACE \
    --content-type "text/html"

aws s3 cp "s3://$BUCKET_NAME/" "s3://$BUCKET_NAME/" \
    --exclude "*" \
    --include "*.css" \
    --recursive \
    --metadata-directive REPLACE \
    --content-type "text/css"

aws s3 cp "s3://$BUCKET_NAME/" "s3://$BUCKET_NAME/" \
    --exclude "*" \
    --include "*.js" \
    --recursive \
    --metadata-directive REPLACE \
    --content-type "application/javascript"

# Clean up
rm /tmp/bucket-policy.json

# Display URL
echo ""
echo "✅ Deployment complete!"
echo "🌐 Your website is live at:"
echo "   http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
echo ""
echo "📝 Note: It may take a few minutes for the website to be fully accessible."