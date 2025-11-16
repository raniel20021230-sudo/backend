# 🚀 Quick Start Guide - Deploy to Netlify in 5 Minutes

## Step 1: Prepare Your Repository (2 min)

```bash
# In your project root directory
git add .
git commit -m "Configure for Netlify deployment"
git push origin main
```

## Step 2: Connect to Netlify (2 min)

1. Go to [netlify.com](https://netlify.com)
2. Click **"New site from Git"**
3. Select **GitHub** → Authorize
4. Choose your **bleu-tech** repository
5. **Build settings** should auto-detect:
   - **Base directory:** `.` (leave empty)
   - **Publish directory:** `frontend`
   - **Build command:** (leave empty)
6. Click **"Deploy site"**

✅ Your site is now live!

## Step 3: Find Your Netlify URL (30 sec)

After deployment completes, you'll see a URL like:
```
https://bleutech-app.netlify.app
```

Copy this URL - you'll need it for the backend.

## Step 4: Configure Backend URL (1 min)

1. In Netlify dashboard, go **Site settings** → **Build & deploy** → **Environment**
2. Click **Edit variables**
3. Add new variable:
   - **Key:** `API_URL`
   - **Value:** `https://your-backend-url.com`
     - Replace with your actual backend URL
     - Examples: `https://bleutech-api.herokuapp.com` or `https://railway-app-url.com`
4. Click **Save**
5. Go back to **Deployments** and click **Trigger deploy** → **Deploy site** to apply changes

✅ Your frontend is now connected to your backend!

## Step 5: Test Everything (1 min)

1. Visit your Netlify URL
2. Try:
   - ✅ Homepage loads products
   - ✅ Click "Login" - form appears
   - ✅ Try adding a product to cart
   - ✅ Check admin panel (if applicable)

**If anything breaks:** Check the [troubleshooting section](#troubleshooting)

---

## 🎉 You're Done!

Your frontend is now live on Netlify! Share your URL:
```
https://your-site.netlify.app
```

---

## Troubleshooting

### "Unable to load products" error
```
✓ Check API_URL is set in Netlify environment variables
✓ Verify backend is running and accessible
✓ Make sure backend has CORS enabled for your Netlify domain
→ See BACKEND_CORS_SETUP.md for backend configuration
```

### "Can't connect to server"
```
✓ Check API_URL doesn't have trailing slash
✓ Verify backend domain in API_URL is correct
✓ Open browser console (F12) and check Network tab
→ You should see requests going to your backend
```

### Site shows blank page
```
✓ Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
✓ Clear browser cache
✓ Open console (F12) and check for errors
→ Most issues show up as red errors in console
```

### Images not loading
```
✓ Verify backend serves images with correct paths
✓ Check backend has CORS enabled for images
→ See BACKEND_CORS_SETUP.md for backend configuration
```

---

## What Got Configured

✅ **netlify.toml** - Deployment configuration
✅ **frontend/config.js** - API URL configuration
✅ **All HTML files** - Updated to use config.js
✅ **.gitignore** - Protected sensitive files
✅ **Documentation** - Setup guides and troubleshooting

## Environment Files

All documentation is in your project root:

- **NETLIFY_DEPLOYMENT.md** - Detailed deployment guide
- **BACKEND_CORS_SETUP.md** - Backend CORS configuration
- **ENV_VARIABLES.md** - Environment variable documentation
- **DEPLOYMENT_CHECKLIST.md** - Pre/post deployment checklist
- **SETUP_SUMMARY.md** - Complete summary of changes

---

## Key Points to Remember

1. **Backend CORS:** Configure CORS to allow requests from your Netlify domain
   ```
   Allowed Origin: https://your-site.netlify.app
   ```

2. **API URL Format:** Should be like
   ```
   https://your-backend-domain.com
   (no trailing slash)
   ```

3. **Environment Variables:** Set in Netlify dashboard, not in code

4. **No Redeploy Needed:** Just set variables and manually trigger redeploy in Netlify

---

## Next Steps

- [ ] Deploy backend to hosting service (Heroku, Railway, Render, AWS, etc.)
- [ ] Set API_URL environment variable on Netlify
- [ ] Test all features
- [ ] Set up custom domain (optional)
- [ ] Enable analytics (optional)

---

## Support & Resources

- **Netlify Docs:** https://docs.netlify.com/
- **Troubleshooting:** See DEPLOYMENT_CHECKLIST.md
- **Backend Setup:** See BACKEND_CORS_SETUP.md

**Happy deploying! 🚀**
