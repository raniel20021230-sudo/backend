# Render Deployment - Quick Reference

## 60-Second Setup

### Step 1: Push Code
```bash
git add .
git commit -m "Configure for Render deployment"
git push origin main
```

### Step 2: Deploy on Render
1. Go to [render.com](https://render.com)
2. Sign in with GitHub
3. Click "New +" → "Blueprint"
4. Select your repository
5. Click "Create New Resources"

### Step 3: Get Your API URL
After ~5-10 minutes, you'll see:
```
https://bleutech-api.onrender.com
```

### Step 4: Configure Netlify
Set environment variable on Netlify:
- **Key:** `API_URL`
- **Value:** `https://bleutech-api.onrender.com`

### Step 5: Test
Visit your Netlify site and verify products load!

---

## Environment Variables Needed

Set these on Render dashboard (Settings → Environment):

| Key | Value | Example |
|-----|-------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/bleutech` |
| `FRONTEND_URL` | Your Netlify URL | `https://bleutech-app.netlify.app` |
| `NODE_ENV` | Always production | `production` |

---

## Getting MongoDB Connection String

1. Go to [MongoDB Atlas](https://mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Add as `MONGO_URI` on Render

---

## Common Issues

### "Service won't start"
→ Check Logs tab for errors
→ Verify MONGO_URI is set
→ Ensure all dependencies in package.json

### "Failed to fetch products" on Netlify
→ Set FRONTEND_URL on Render to your Netlify URL
→ Verify API_URL on Netlify matches Render URL
→ Check both URLs use HTTPS

### "MongoDB connection error"
→ Verify MONGO_URI is correct
→ Add Render IPs to MongoDB Atlas IP whitelist:
  - Go to MongoDB Atlas
  - Network Access
  - Add IP Address: `0.0.0.0/0` (allows all)

### "Can't upload images"
→ This is expected (Render deletes files after restart)
→ For production, use Cloudinary or S3
→ For testing, just keep redeploying

---

## File Structure for Render

```
your-project/
├── backend/                 # Your Node.js API
│   ├── models/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── uploads/            # NOTE: Don't persist here in production
├── frontend/                # Netlify frontend
│   ├── index.html
│   ├── js/
│   └── css/
├── render.yaml             # Render infrastructure config
└── .gitignore
```

---

## Testing Your API

### Direct Test (no frontend)
```bash
curl https://your-render-url.com/api/products
```

Should return JSON list of products.

### Test via Netlify Frontend
1. Set API_URL on Netlify
2. Wait for redeploy
3. Visit your Netlify site
4. Check if products load

---

## Monitoring

Watch your service on Render:
- **Logs:** Real-time console output
- **Metrics:** CPU, Memory, Network
- **Events:** Deployments, restarts, errors

---

## Redeploying

Changes to `main` branch auto-redeploy.

Manual redeploy:
1. Go to Render dashboard
2. Click your service
3. Click "Settings"
4. Click "Redeploy latest" or push to GitHub

---

## Free vs Pro Tier

| Feature | Free | Pro |
|---------|------|-----|
| Cost | $0 | $7/month |
| Sleep | 15 min inactivity | Always on |
| Resources | Limited | More |
| Uptime SLA | None | 99.5% |

→ Free is good for testing, Pro for production

---

## Next Steps

1. ✅ Code configured for Render
2. → Push to GitHub
3. → Deploy on Render (Blueprint)
4. → Get your API URL
5. → Set API_URL on Netlify
6. → Test products load
7. → Done! 🎉

---

For detailed guide, see: **RENDER_DEPLOYMENT.md**
