const pool = require('../database/connection');

// Get all tags
const getAllTags = (req, res) => {
  const query = 'SELECT * FROM tags';

  pool.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
};

// Create a new tag
const createTag = (req, res) => {
  const { name } = req.body;
  const query = 'INSERT INTO tags (name) VALUES (?)';
  const params = [name];

  pool.query(query, params, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Tag created successfully' });
    }
  });
};

// Get a specific tag by ID
const getTagById = (req, res) => {
  const tagId = req.params.id;
  const query = 'SELECT * FROM tags WHERE id = ?';
  const params = [tagId];

  pool.query(query, params, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Tag not found' });
    } else {
      res.json(results[0]);
    }
  });
};

// Update a specific tag by ID
const updateTag = (req, res) => {
  const tagId = req.params.id;
  const { name } = req.body;
  const query = 'UPDATE tags SET name = ? WHERE id = ?';
  const params = [name, tagId];

  pool.query(query, params, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Tag not found' });
    } else {
      res.json({ message: 'Tag updated successfully' });
    }
  });
};

// Delete a specific tag by ID
const deleteTag = (req, res) => {
  const tagId = req.params.id;
  const query = 'DELETE FROM tags WHERE id = ?';
  const params = [tagId];

  pool.query(query, params, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Tag not found' });
    } else {
      res.json({ message: 'Tag deleted successfully' });
    }
  });
};

module.exports = {
  getAllTags,
  createTag,
  getTagById,
  updateTag,
  deleteTag,
};
