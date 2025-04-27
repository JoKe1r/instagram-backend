const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
dotenv.config();
const app=express();
app.use(express.json());
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error(err));
  app.use(('/api/authRoutes',authRoutes));
  app.use('/api/posts',postRoutes);
  app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
  });