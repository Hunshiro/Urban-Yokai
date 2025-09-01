const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// 📌 Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📌 Multer Config (temporary local storage, allow multiple files)
const upload = multer({ dest: "uploads/" });

// 📌 Create product with multiple image upload and tags
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { title, description, price, category, subcategory, stock, tags } = req.body;
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "rapcod-products",
        });
        imageUrls.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
    }
    // Parse tags (comma separated string to array)
    const tagArr = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [];
    // Save product in MongoDB
    const product = new Product({
      title,
      description,
      price,
      category,
      subcategory,
      images: imageUrls,
      stock,
      tags: tagArr,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📌 Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category').populate('subcategory');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
