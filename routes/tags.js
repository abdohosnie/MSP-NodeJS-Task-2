const express = require('express');
const router = express.Router();
const {
  getAllTags,
  createTag,
  getTagById,
  updateTag,
  deleteTag,
} = require('../controllers/tagsController');

router.get('/', getAllTags);
router.post('/', createTag);
router.get('/:id', getTagById);
router.put('/:id', updateTag);
router.delete('/:id', deleteTag);

module.exports = router;
