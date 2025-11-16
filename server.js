// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// CORS configuration for Netlify frontend
const corsOptions = {
  origin: process.env.FRONTEND_URL ? [
    process.env.FRONTEND_URL,
    'http://localhost:3000',
    'http://localhost:5000'
  ] : '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());
// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Ensure uploads folder exists
if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
  fs.mkdirSync(path.join(__dirname, 'uploads'));
}

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'uploads')),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random()*1e9);
    cb(null, unique + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Models
const User = require('./models/user');
const Product = require('./models/product');

// Mongoose configuration
mongoose.set('strictQuery', false);

// Connect DB
const MONGO = process.env.MONGO_URI || 'mongodb+srv://raniel:raniel1432@raniel.skzmuxw.mongodb.net/MarineBlue';
console.log('Connecting to MongoDB with URI:', MONGO.substring(0, 50) + '...');
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {
  console.log('✅ MongoDB connected successfully');
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  console.error('Connection URI:', MONGO);
  process.exit(1); // Exit if DB connection fails
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Auth endpoints
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already in use' });
    const user = new User({ name, email, password, role: role || 'user' });
    await user.save();
    res.json({ message: 'Created', user: { id: user._id, name: user.name, email: user.email, role: user.role }});
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const u = await User.findOne({ email });
    if (!u || u.password !== password) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ message: 'OK', user: { id: u._id, name: u.name, email: u.email, role: u.role }});
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Products
app.get('/api/products', async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const p = new Product({ name, description, price: Number(price || 0), imageUrl });
    await p.save();
    res.json(p);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.put('/api/products/:id', upload.single('image'), async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, price } = req.body;
    const update = { name, description, price: Number(price || 0) };
    if (req.file) update.imageUrl = `/uploads/${req.file.filename}`;
    const p = await Product.findByIdAndUpdate(id, update, { new: true });
    res.json(p);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Users (admin can list/add/edit/delete)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/users/role/user', async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post('/api/users', async (req, res) => {
  const { name, email, password, role } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email exists' });
  const u = new User({ name, email, password, role: role || 'user' });
  await u.save();
  res.json({ id: u._id, name: u.name, email: u.email, role: u.role });
});
app.put('/api/users/:id', async (req, res) => {
  const id = req.params.id;
  const { name, email, password, role } = req.body;
  const updated = await User.findByIdAndUpdate(id, { name, email, password, role }, { new: true });
  res.json({ id: updated._id, name: updated.name, email: updated.email, role: updated.role });
});
app.delete('/api/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// Orders (simple in-memory save or could be modelled)
app.post('/api/orders', async (req, res) => {
  // req.body: { name, email, address, description, items: [{productId,qty}] }
  // For starter purpose we'll just echo back
  res.json({ message: 'Order received', order: req.body });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Backend API is running', timestamp: new Date().toISOString() });
});

// Root endpoint - API info
app.get('/', (req, res) => {
  res.json({ 
    message: 'BlueTech Backend API',
    version: '1.0',
    endpoints: {
      auth: ['/api/auth/signup', '/api/auth/login'],
      products: ['/api/products', '/api/products/:id'],
      users: ['/api/users', '/api/users/:id'],
      orders: ['/api/orders'],
      health: '/health'
    }
  });
});

// Catch-all for frontend (if available)
app.get('*', (req, res) => {
  const frontendPath = path.join(__dirname, '../frontend', 'index.html');
  if (fs.existsSync(frontendPath)) {
    res.sendFile(frontendPath);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('Server running on', PORT));
