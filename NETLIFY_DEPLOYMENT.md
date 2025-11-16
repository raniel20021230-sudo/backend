# BlueTech Frontend - Netlify Deployment Guide

## What's been configured for Netlify

Your frontend is now ready to deploy to Netlify with the following setup:

### Files Created/Modified:

1. **`netlify.toml`** - Netlify configuration file
   - Sets the publish directory to `frontend/`
   - Configures URL rewrites for client-side routing
   - Sets up proper cache headers

2. **`frontend/config.js`** - API URL configuration script
   - Dynamically sets the API endpoint based on environment
   - Supports environment variables for easy configuration

3. **HTML Files Updated** - All HTML files now include `config.js`
   - `index.html`
   - `login.html`
   - `signup.html`
   - `admin.html`
   - `dashboard.html`
   - `cart.html`
   - `product-detail.html`
   - `about.html`
   - `contact.html`

## Deployment Steps

### Option 1: Connect GitHub Repository (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/bleu-tech.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and authorize
   - Select your repository
   - Set build settings:
     - **Base directory:** `.` (root)
     - **Publish directory:** `frontend`
     - **Build command:** (leave empty or use `echo 'No build step'`)
   - Click "Deploy site"

### Option 2: Manual Deployment

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   netlify deploy --dir frontend
   ```

## Configuring the Backend API URL

Once your site is deployed, you need to set the backend API URL:

### On Netlify Dashboard:

1. Go to your site settings
2. Click "Build & deploy" → "Environment"
3. Add a new environment variable:
   - **Key:** `API_URL`
   - **Value:** Your backend API URL (e.g., `https://your-backend-url.com`)

### Examples:

- If backend is on the same domain: Keep empty (will use relative path `/api`)
- If backend is on a different domain: `https://api.example.com`
- Local development: Leave unset, uses `http://localhost:5000`

## How It Works

The `config.js` script runs before your application loads:

```javascript
window.API_URL = (window.API_URL || 'http://localhost:5000') + '/api';
```

This:
- Uses the environment variable `API_URL` if set
- Falls back to `http://localhost:5000` for local development
- The `/api` suffix is appended automatically

Your JavaScript files already use `window.API_URL`, so no code changes are needed!

## CORS Requirements

If your backend is on a different domain, ensure it has CORS enabled:

```javascript
// In your backend (Express example)
const cors = require('cors');
app.use(cors({
  origin: 'https://your-netlify-site.netlify.app',
  credentials: true
}));
```

## Troubleshooting

### "Failed to fetch products" error
- Check that `API_URL` environment variable is set correctly
- Verify backend CORS allows your Netlify domain
- Check browser console for network errors

### Site shows blank page
- Check that all `config.js` is loaded before other scripts
- Verify JavaScript files aren't blocked in network tab
- Check console for JavaScript errors

### Images not loading
- Ensure image paths use the correct URL in your backend
- Check that images are served with proper CORS headers if on different domain

## Next Steps

1. Deploy your backend to a hosting service (Heroku, Railway, Render, AWS, etc.)
2. Set the `API_URL` environment variable on Netlify
3. Test all features (login, product loading, shopping cart)
4. Set up custom domain if desired

## Additional Netlify Features

- **Custom Domain:** Site settings → Domain management
- **SSL/TLS:** Automatic with Netlify (free HTTPS)
- **Redirects:** Already configured in `netlify.toml` for SPA routing
- **Analytics:** Enable in site analytics settings
- **Forms:** Can integrate Netlify forms if needed

Your frontend is now production-ready! 🚀
