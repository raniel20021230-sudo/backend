## 🚀 DEPLOYMENT QUICK REFERENCE CARD

### THREE COMPONENTS TO DEPLOY

```
┌─────────────────┐      ┌─────────────────┐      ┌──────────────┐
│  NETLIFY        │      │   RENDER        │      │  MONGODB     │
│  (Frontend)     │◄────►│   (Backend)     │◄────►│  (Database)  │
└─────────────────┘      └─────────────────┘      └──────────────┘
  Your HTML/CSS/JS         Your Node.js API       Your Data Store
  5 min setup              15 min setup            20 min setup
```

---

## ENVIRONMENT VARIABLES AT A GLANCE

### NETLIFY DASHBOARD
```
API_URL = https://bleutech-api.onrender.com
```
(Replace with your Render URL)

### RENDER DASHBOARD
```
MONGO_URI = mongodb+srv://user:pass@cluster.mongodb.net/dbname
FRONTEND_URL = https://bleutech-app.netlify.app
NODE_ENV = production
```

---

## QUICK CHECKLIST

- [ ] Push code to GitHub
- [ ] Deploy frontend on Netlify (already done) 
- [ ] Set up MongoDB Atlas (20 min)
- [ ] Deploy backend on Render (15 min)
- [ ] Set MONGO_URI on Render
- [ ] Set FRONTEND_URL on Render
- [ ] Set API_URL on Netlify
- [ ] Test products load ✓
- [ ] Test login/signup ✓
- [ ] Done! 🎉

---

## QUICK LINKS

| Task | Link | Time |
|------|------|------|
| MongoDB Setup | [MONGODB_SETUP.md](MONGODB_SETUP.md) | 20 min |
| Render Deploy | [RENDER_QUICK_SETUP.md](RENDER_QUICK_SETUP.md) | 15 min |
| Full Integration | [FULL_DEPLOYMENT_GUIDE.md](FULL_DEPLOYMENT_GUIDE.md) | 30 min |
| Troubleshooting | [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) | As needed |

---

## TESTING YOUR API

```bash
# Test backend is running
curl https://your-render-url.onrender.com/api/products

# Should return [] or list of products
```

---

## IF SOMETHING BREAKS

1. Check Render logs for errors
2. Verify environment variables set
3. Test MongoDB connection
4. Check CORS configuration
5. See DEPLOYMENT_CHECKLIST.md

---

## URLS YOU'LL GET

**Frontend:** https://bleutech-app.netlify.app

**Backend:** https://bleutech-api.onrender.com

**Database:** (in MongoDB Atlas)

---

## REMEMBER

✅ Environment variables are your friend
❌ Never commit .env file to GitHub
✅ Keep passwords safe
✅ Test before going live
✅ Monitor logs regularly

---

**Start here:** [RENDER_QUICK_SETUP.md](RENDER_QUICK_SETUP.md)
