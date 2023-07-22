const express = require('express');
const router = express.Router();
const {
  getTagsByPostId,
  getPostsByTagId,
  getPostsByUserId,
} = require('../controllers/relationshipsController');

router.get('/posts/:id/tags', getTagsByPostId);
router.get('/tags/:id/posts', getPostsByTagId);
router.get('/user/:id/posts', getPostsByUserId);

module.exports = router;
