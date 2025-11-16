# MongoDB Setup Guide for Render

## Why MongoDB?

Your backend uses MongoDB for storing:
- User accounts (login/signup)
- Product catalog
- Product images
- Order information

MongoDB is free with MongoDB Atlas cloud service.

## Step 1: Create MongoDB Atlas Account

1. Go to **[mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)**
2. Click **"Sign Up"**
3. Choose **"Sign up with Google"** or email
4. Complete the registration
5. Accept terms and create account

## Step 2: Create Your First Cluster

1. After signing in, click **"Create"** (or "Build a Database")
2. Choose **"Free"** tier (M0 - perfect for development)
3. Select your **region**:
   - Choose closest to your users
   - For Philippines: Asia-Pacific (Southeast Asia/Singapore)
4. Name your cluster: `bleutech` (or any name)
5. Click **"Create Cluster"**
6. **Wait 3-5 minutes** for cluster to be created

## Step 3: Set Up Authentication

After cluster is created:

1. Click on **"Security"** in left menu
2. Go to **"Database Access"** tab
3. Click **"Add a Database User"**
4. Enter:
   - **Username:** `bleutech` (or your choice)
   - **Password:** Generate a strong password or create your own
   - **Password:** Copy it somewhere safe (you'll need it)
5. Click **"Add User"**

**Important:** Save your username and password!

## Step 4: Allow Network Access

1. Still in **"Security"** menu
2. Go to **"Network Access"** tab
3. Click **"Add IP Address"**
4. Choose one option:

   **Option A: Allow from Render (Recommended)**
   - Click **"Add Current IP Address"** (if testing locally)
   - Or manually add Render IPs (check Render docs)
   
   **Option B: Allow All (Simple, Less Secure)**
   - Enter IP: `0.0.0.0/0`
   - Confirms all IPs allowed
   - Click **"Confirm"**

5. Click **"Add"** or **"Confirm"**

## Step 5: Get Your Connection String

1. Go to **"Database"** section (left menu)
2. Click **"Connect"** button next to your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** as driver
5. Copy the connection string:
   ```
   mongodb+srv://bleutech:PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Update Your Connection String

The copied string has placeholders. Replace:

**Original:**
```
mongodb+srv://bleutech:PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority
```

**Replace `PASSWORD` with your actual password:**
```
mongodb+srv://bleutech:mySecurePassword123@cluster.mongodb.net/?retryWrites=true&w=majority
```

**Optional: Add database name at the end:**
```
mongodb+srv://bleutech:mySecurePassword123@cluster.mongodb.net/bleutech?retryWrites=true&w=majority
```

## Step 7: Set Up on Render

1. Go to **[render.com](https://render.com)** and sign in
2. Find your deployed `bleutech-api` service
3. Click on it to open dashboard
4. Go to **"Environment"** tab
5. Click **"Edit variables"**
6. Add new variable:
   - **Key:** `MONGO_URI`
   - **Value:** Paste your connection string
   - Click **"Save"**
7. Go back to **"Deployments"**
8. Click **"Redeploy latest commit"**

## Step 8: Test the Connection

Wait for redeploy to finish, then check logs:

1. Click **"Logs"** tab
2. Look for message: **`MongoDB connected`**
   - ✅ If you see this, it worked!
   - ❌ If you see error, check the error message

**Common errors:**
- `authentication failed` → Wrong password in connection string
- `connect ECONNREFUSED` → Wrong cluster URL
- `access denied` → IP not whitelisted

## Testing Your API

After MongoDB is connected:

### Test 1: Check API is running
```bash
curl https://your-render-url.com/api/products
```

Should return: `[]` (empty array)

### Test 2: Create a user (signup)
Use Postman or curl:
```bash
curl -X POST https://your-render-url.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

Should return: User ID and details

### Test 3: Test via Frontend
1. Go to your Netlify site
2. Try to sign up
3. Try to login
4. Check if it works!

## MongoDB Atlas Dashboard

After setup, explore:

1. **Collections** tab - See all your data
   - `users` - User accounts
   - `products` - Product catalog
2. **Metrics** - Database performance
3. **Backups** - Automatic daily backups (free tier)

## Important Security Tips

✅ **DO:**
- Use strong passwords
- Change password periodically
- Restrict IP access in production
- Use `.env` file for secrets (never in code)
- Backup data regularly

❌ **DON'T:**
- Commit `.env` file to GitHub
- Use same password everywhere
- Share connection string publicly
- Allow all IPs permanently (`0.0.0.0/0`) in production

## Database Management

### View Your Data
1. In MongoDB Atlas, click your cluster
2. Click **"Browse Collections"**
3. Select a collection (users, products, etc.)
4. See all your data in real-time

### Backup and Restore
- MongoDB Atlas auto-backs up daily (free tier)
- Go to "Backup" in left menu
- View and restore if needed

### Optimize Performance
- Add indexes to frequently searched fields
- Monitor metrics in "Metrics" tab
- Upgrade plan if needed

## Troubleshooting

### "MongoDB connection refused"
1. Check MONGO_URI on Render is correct
2. Verify IP is whitelisted on MongoDB Atlas
3. Try adding `0.0.0.0/0` temporarily to test

### "Authentication failed"
1. Verify password is correct in connection string
2. Reset password if needed:
   - MongoDB Atlas → Security → Database Access
   - Click "Edit" on user
   - Change password

### "getaddrinfo ENOTFOUND"
1. Check cluster name in connection string
2. Verify cluster actually exists
3. Try in MongoDB Atlas Atlas Data Explorer first

### Can't see data in MongoDB Atlas
1. Make sure data is actually being saved
2. Check `/api/products` returns something
3. Refresh the "Browse Collections" page
4. Check database name is correct

## Production Considerations

### Scaling Up
When you have users:

1. **Upgrade cluster tier**
   - Go to MongoDB Atlas
   - Cluster settings → Tier
   - Upgrade from M0 (free) to M2 or higher

2. **Enable auto-scaling**
   - Cluster settings → Edit Configuration
   - Enable auto-scaling for storage

3. **Set up monitoring alerts**
   - Alerts → Create Alert
   - Monitor CPU, memory, network

### Backup Strategy
- Free tier: Daily automatic backups (35 days retention)
- Paid tier: Configurable backup schedule
- Always good to export important data periodically

### Data Privacy
- GDPR compliance: MongoDB Atlas SOC 2 certified
- Encryption: Data encrypted in transit and at rest (paid tier)
- Audit logs: Available in paid tier

## Next Steps

1. ✅ Create MongoDB Atlas account
2. ✅ Create cluster
3. ✅ Create user
4. ✅ Allow network access
5. → Get connection string
6. → Set MONGO_URI on Render
7. → Redeploy Render service
8. → Test API works
9. → Test signup/login on Netlify

## MongoDB Resources

- **MongoDB Atlas Setup:** https://docs.atlas.mongodb.com/
- **Connection String:** https://docs.mongodb.com/manual/reference/connection-string/
- **Pricing:** https://www.mongodb.com/cloud/atlas/pricing
- **Documentation:** https://docs.mongodb.com/

---

After setting up MongoDB, your entire stack is complete:
- **Frontend:** Netlify
- **Backend:** Render
- **Database:** MongoDB Atlas

🎉 You're ready to go live!
