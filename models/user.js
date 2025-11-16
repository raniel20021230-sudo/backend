// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // plaintext for demo; hash in production
  role: { type: String, enum: ['user','admin'], default: 'user' }
}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);
