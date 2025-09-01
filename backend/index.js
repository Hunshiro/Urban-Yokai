require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const productsRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('RAPCOD Anime E-Commerce API is running');
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
