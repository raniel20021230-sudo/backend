# BlueTech Backend - Render Deployment Guide

## What's been configured for Render

Your backend is now ready to deploy to Render with the following setup:

### Files Created/Modified:

1. **`render.yaml`** - Render infrastructure configuration (root)
2. **`backend/render.yaml`** - Backend service configuration
3. **`backend/.env.example`** - Environment variables template
4. **`backend/server.js`** - Updated with production-ready CORS

## Deployment Steps

### Option 1: Render Blueprint (Easiest - Recommended)

The `render.yaml` file at your project root defines your entire infrastructure.

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Configure for Render deployment"
   git push origin main
   ```

2. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

3. **Create from Blueprint**
   - Click "New +" → "Blueprint"
   - Select your GitHub repository
   - Authorize Render to access your repo
   - Review the configuration
   - Click "Create New Resources"

4. **Wait for Deployment**
   - Render will create and deploy your backend automatically
   - Takes about 5-10 minutes first time
   - You'll see a URL like: `https://bleutech-api.onrender.com`

### Option 2: Manual Web Service Setup

If you prefer to set up manually:

1. **Connect GitHub Repository**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select your repository

2. **Configure Service**
   - **Name:** `bleutech-api`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or Pro for better uptime)

3. **Set Environment Variables**
   - Click "Environment" tab
   - Add the following variables:
     - `MONGO_URI`: Your MongoDB connection string
     - `NODE_ENV`: `production`
     - `FRONTEND_URL`: Your Netlify frontend URL
     - `PORT`: `10000` (Render assigns this automatically)

4. **Deploy**
   - Click "Create Web Service"
   - Render deploys automatically

## Getting Your API URL

After deployment, you'll receive a URL like:
```
https://bleutech-api.onrender.com
```

Use this as your `API_URL` on Netlify!

## Environment Variables on Render

### Required Variables

1. **MONGO_URI**
   - Your MongoDB connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`
   - Get from MongoDB Atlas

2. **FRONTEND_URL**
   - Your Netlify frontend URL
   - Example: `https://bleutech-app.netlify.app`
   - Used for CORS configuration

3. **NODE_ENV**
   - Set to: `production`

### Optional Variables

- **PORT**: Usually auto-assigned by Render (typically 10000)

## Connecting to MongoDB Atlas

If you haven't already set up MongoDB:

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Sign up for free tier

2. **Create a Cluster**
   - Click "Create" in the "Deployments" section
   - Choose "Free" tier
   - Select your region (closest to your users)
   - Click "Create Cluster"

3. **Get Connection String**
   - Go to "Database" → "Connect"
   - Click "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Replace `<dbname>` with your database name (e.g., "bleutech")

4. **Set MONGO_URI on Render**
   - Paste the connection string as `MONGO_URI` environment variable

## File Upload Management

**Important:** Render's file system is ephemeral, meaning files don't persist between deployments.

### Current Issue
The `/uploads` folder used for image uploads will be lost after each deployment.

### Solutions:

#### Option 1: Use AWS S3 (Recommended for Production)
```javascript
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

// Upload to S3 instead of local filesystem
```

#### Option 2: Use Cloudinary (Easiest)
```bash
npm install cloudinary multer-storage-cloudinary
```

```javascript
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({...});
```

#### Option 3: PostgreSQL with Large Object Storage
Use Render's PostgreSQL add-on to store images as binary data.

#### For Now (Development)
Images will work until the service restarts, then be lost. This is acceptable during development but needs fixing for production.

## Monitoring & Logs

### View Logs
1. Go to your service dashboard on Render
2. Click "Logs" tab
3. See real-time server logs

### Monitor Performance
- CPU and Memory usage shown on dashboard
- Check response times

### Restart Service
- Click "Settings"
- Scroll down to "Restart Service"
- Click to restart (useful if something gets stuck)

## Testing After Deployment

1. **Test API directly**
   ```bash
   curl https://your-render-url.com/api/products
   ```

2. **Test on Netlify Frontend**
   - Set API_URL on Netlify to your Render URL
   - Try loading products
   - Check browser console for errors

3. **Test all endpoints**
   - Login
   - Signup
   - Create product (admin)
   - Update product (admin)
   - Delete product (admin)

## Common Issues

### Service won't start
- Check logs for errors
- Verify `npm start` works locally: `npm start`
- Check all environment variables are set

### MongoDB connection fails
- Verify MONGO_URI is correct
- Check MongoDB Atlas IP whitelist includes Render IPs
- Test connection string locally first

### CORS errors when calling from Netlify
- Verify FRONTEND_URL is set correctly on Render
- Make sure it includes the full URL: `https://your-site.netlify.app`
- Check for typos in the URL

### "Service not found" / 503 errors
- Service might still be deploying (wait a few minutes)
- Check "Builds" tab for deployment status
- Look at logs for errors

### File uploads not working
- This is expected on Render (files not persisted)
- Use Cloudinary or S3 for production
- For testing, uploads work until service restarts

## Performance Tips

1. **Database Indexing**
   - Add indexes to frequently queried fields
   - Improves query performance

2. **Caching**
   - Add Redis for session caching
   - Render has free Redis tier

3. **API Optimization**
   - Avoid N+1 queries
   - Use pagination for large results
   - Compress responses

4. **Image Optimization**
   - Use Cloudinary for automatic optimization
   - Serve optimized images to frontend

## Upgrading to Pro

The free tier on Render:
- Spins down after 15 minutes of inactivity
- Has limited resources
- Good for development/testing

Upgrade to Pro for:
- Always-on service
- More resources
- Better uptime SLA
- Custom domains

## Next Steps

1. **Set up MongoDB Atlas** (if not done)
2. **Deploy to Render** using Blueprint or Manual setup
3. **Get your API URL** from Render dashboard
4. **Set API_URL on Netlify** to your Render URL
5. **Set FRONTEND_URL on Render** to your Netlify URL
6. **Test everything** with frontend

## Troubleshooting Checklist

- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Service deployed (check Logs for "listening on port")
- [ ] MONGO_URI environment variable set
- [ ] FRONTEND_URL environment variable set
- [ ] API URL copied to Netlify
- [ ] Netlify API_URL set to Render URL
- [ ] Can access API directly: `curl https://your-render-url/api/products`
- [ ] Products load on Netlify frontend
- [ ] No CORS errors in browser console

## Render Resources

- **Documentation:** https://render.com/docs
- **Blueprint Reference:** https://render.com/docs/blueprint-spec
- **Environment Variables:** https://render.com/docs/environment-variables
- **Support:** https://support.render.com/

---

Your backend is now configured for Render! 🚀
