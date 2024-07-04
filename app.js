const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postsRoute = require('./routes/posts');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog_api', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// Routes
app.use('/posts', postsRoute);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});