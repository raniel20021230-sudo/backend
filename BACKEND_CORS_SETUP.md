# Backend CORS Configuration for Netlify

Your frontend will be hosted on Netlify, so your backend needs to allow requests from your Netlify domain.

## Your Netlify Domain Format

After deploying to Netlify, your site will have a URL like:
- `https://bleutech-app.netlify.app` (default)
- `https://your-custom-domain.com` (if you set up a custom domain)

## Backend CORS Configuration

### If using Express.js (Recommended)

```javascript
const cors = require('cors');
const express = require('express');
const app = express();

// Method 1: Allow specific domain (RECOMMENDED for production)
const allowedOrigins = [
  'https://bleutech-app.netlify.app',     // Replace with your Netlify domain
  'http://localhost:3000',                 // For local development
  'http://localhost:5000'                  // Your local backend
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Method 2: Allow all origins (NOT recommended for production)
app.use(cors({
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### If using Node.js without Express

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Get the request origin
  const origin = req.headers.origin;
  
  // Allow from your Netlify domain
  const allowedOrigins = [
    'https://bleutech-app.netlify.app',
    'http://localhost:3000'
  ];
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Handle your routes...
});
```

### If using Python Flask

```python
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# Allow specific origins
CORS(app, 
     origins=[
         'https://bleutech-app.netlify.app',
         'http://localhost:3000',
         'http://localhost:5000'
     ],
     supports_credentials=True,
     allow_headers=['Content-Type', 'Authorization'])

# Or allow all (not recommended for production)
CORS(app, supports_credentials=True)
```

### If using Django

```python
# settings.py
INSTALLED_APPS = [
    # ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # ...
]

CORS_ALLOWED_ORIGINS = [
    'https://bleutech-app.netlify.app',
    'http://localhost:3000',
    'http://localhost:5000',
]

CORS_ALLOW_CREDENTIALS = True
```

## Steps to Configure

1. **Find your Netlify domain:**
   - After deploying, check Netlify dashboard
   - It will be something like `https://bleutech-app.netlify.app`

2. **Update backend CORS:**
   - Add your Netlify domain to the allowed origins list
   - Keep localhost origins for development
   - Deploy your backend

3. **Test:**
   - Open your Netlify site
   - Open browser console (F12)
   - Try loading products or logging in
   - Check for CORS errors in console

## Environment-Specific Configuration

### Development (localhost)
```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
];
```

### Staging
```javascript
const allowedOrigins = [
  'https://staging.bleutech.netlify.app',
  'http://localhost:3000',
];
```

### Production
```javascript
const allowedOrigins = [
  'https://bleutech-app.netlify.app',
  'https://www.bleutech.com', // if using custom domain
];
```

## Common CORS Errors

### Error: "No 'Access-Control-Allow-Origin' header"
- **Solution:** Backend CORS not enabled or wrong domain in allowlist

### Error: "The value of the 'Access-Control-Allow-Credentials' header"
- **Solution:** Make sure backend has `credentials: true` in CORS config

### Error: "Method not allowed"
- **Solution:** Backend doesn't allow the HTTP method (GET, POST, etc.)

### Error: "Request header not allowed"
- **Solution:** Add missing headers to `allowedHeaders` in backend CORS config

## Testing CORS Configuration

### Using curl
```bash
curl -H "Origin: https://bleutech-app.netlify.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS http://localhost:5000/api/products
```

### Using browser console
```javascript
// After deploying to Netlify, run this in console:
fetch('https://your-backend-url.com/api/products')
  .then(res => res.json())
  .then(data => console.log('Success:', data))
  .catch(err => console.error('Error:', err));
```

## Production Considerations

✅ **DO:**
- Specify exact allowed origins (whitelist approach)
- Use HTTPS in production
- Include `credentials: true` if using authentication
- Keep localhost in allowlist for dev/staging

❌ **DON'T:**
- Use `Access-Control-Allow-Origin: *` with credentials
- Trust user input for origin validation
- Expose sensitive headers unnecessarily
- Deploy without testing CORS first

## Reference

- Express CORS: https://expressjs.com/en/resources/middleware/cors.html
- Flask CORS: https://flask-cors.readthedocs.io/
- Django CORS: https://github.com/adamchainz/django-cors-headers
- MDN CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

---

**After setting up CORS, your Netlify frontend will be able to communicate with your backend!** 🔗
