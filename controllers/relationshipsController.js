const pool = require('../database/connection');

// Get tags associated with a specific post
const getTagsByPostId = (req, res) => {
  const postId = req.params.id;
  const query =
    'SELECT t.* FROM tags AS t INNER JOIN post_tags AS pt ON t.id = pt.tagId WHERE pt.postId = ?';

  pool.query(query, [postId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
};

// Get posts associated with a specific tag
const getPostsByTagId = (req, res) => {
  const tagId = req.params.id;
  const query =
    'SELECT p.* FROM posts AS p INNER JOIN post_tags AS pt ON p.id = pt.postId WHERE pt.tagId = ?';

  pool.query(query, [tagId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
};

// Get posts associated with a specific user
const getPostsByUserId = (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM posts WHERE userId = ?';

  pool.query(query, [userId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
};

module.exports = {
  getTagsByPostId,
  getPostsByTagId,
  getPostsByUserId,
};
