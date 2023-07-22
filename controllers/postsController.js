const pool = require('../database/connection');

// Get all posts
const getAllPosts = (req, res) => {
  const query = 'SELECT * FROM posts';

  pool.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
};

// Create a new post
const createPost = (req, res) => {
  const { title, content, userId } = req.body;
  const query = 'INSERT INTO posts (title, content, userId) VALUES (?, ?, ?)';
  const params = [title, content, userId];

  pool.query(query, params, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Post created successfully' });
    }
  });
};

// Get a specific post by ID
const getPostById = (req, res) => {
  const postId = req.params.id;
  const query = 'SELECT * FROM posts WHERE id = ?';
  const params = [postId];

  pool.query(query, params, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json(results[0]);
    }
  });
};

// Update a specific post by ID
const updatePost = (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  const query = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
  const params = [title, content, postId];

  pool.query(query, params, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json({ message: 'Post updated successfully' });
    }
  });
};

// Delete a specific post by ID
const deletePost = (req, res) => {
  const postId = req.params.id;
  const query = 'DELETE FROM posts WHERE id = ?';
  const params = [postId];

  pool.query(query, params, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json({ message: 'Post deleted successfully' });
    }
  });
};

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
};
