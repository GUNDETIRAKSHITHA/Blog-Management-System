const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Create a new blog post
router.post('/add', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tags,
    isDraft: req.body.isDraft || false
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// Edit an existing blog post
router.put('/edit/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        body: req.body.body,
        tags: req.body.tags,
        isDraft: req.body.isDraft || false,
        updatedAt: Date.now()
      },
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete a blog post
router.delete('/delete/:id', async (req, res) => {
  try {
    const removedPost = await Post.findByIdAndDelete(req.params.id);
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// Save a post as a draft
router.post('/draft', async (req, res) => {
  const draft = new Post({
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tags,
    isDraft: true
  });

  try {
    const savedDraft = await draft.save();
    res.json(savedDraft);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;