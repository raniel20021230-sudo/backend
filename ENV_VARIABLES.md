# Netlify Environment Variables

This file documents the environment variables needed for Netlify deployment.

## Setting Environment Variables on Netlify

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Build & deploy** → **Environment**
3. Click **Edit variables** and add:

## Required Variables

### API_URL
- **Description:** Your backend API base URL
- **Example values:**
  - `https://bleutech-api.herokuapp.com` (if backend on Heroku)
  - `https://bleutech-api.railway.app` (if backend on Railway)
  - `https://your-backend-domain.com` (if backend on custom domain)
  - Leave empty if backend serves from same domain as `/api`

## Optional Variables

### NODE_ENV
- **Value:** `production`
- **Description:** Sets Node environment (if needed for plugins)

## How to Set Variables

### Via Netlify Dashboard (Easiest)
```
Site settings → Build & deploy → Environment
Add the variables and save
```

### Via netlify.toml (Recommended for teams)
Edit the file at the root of your repo:
```toml
[context.production]
environment = { API_URL = "https://your-api-url.com" }

[context.deploy-preview]
environment = { API_URL = "https://your-api-url.com" }

[context.branch-deploy]
environment = { API_URL = "https://your-api-url.com" }
```

## Testing Variables

After setting variables:
1. Trigger a redeploy
2. Check browser console: `console.log(window.API_URL)`
3. Try loading products to verify API connection works

## Troubleshooting

### Variable not being used
- Ensure you redeployed after changing variables
- Check spelling and format
- Verify in browser console that `window.API_URL` has correct value

### API requests failing
- Verify backend CORS allows your Netlify domain
- Check backend is running and accessible
- Verify API_URL doesn't have trailing slash

## Security Notes

- Never commit sensitive URLs or API keys in code
- Use Netlify's environment variables for secrets
- If using API keys, add them as separate secure variables
