// models/Product.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String
}, { timestamps: true });
module.exports = mongoose.model('Product', ProductSchema);
