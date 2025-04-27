const express = require('express');
const Post = require('../models/Post');
const auth = require('../authMiddleware');
const router = express.Router();

// Create Post
router.post('/', auth, async (req, res) => {
  const { imageUrl, caption } = req.body;
  const post = new Post({ user: req.user.userId, imageUrl, caption });
  await post.save();
  res.status(201).json(post);
});

// Get All Posts
router.get('/', async (req, res) => {
  const posts = await Post.find().populate('user', 'username').sort({ createdAt: -1 });
  res.json(posts);
});

// Like Post
router.post('/:id/like', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.user.userId)) {
    post.likes.push(req.user.userId);
    await post.save();
  }
  res.json(post);
});

// Comment on Post
router.post('/:id/comment', auth, async (req, res) => {
  const { text } = req.body;
  const post = await Post.findById(req.params.id);
  post.comments.push({ user: req.user.userId, text });
  await post.save();
  res.json(post);
});

module.exports = router;