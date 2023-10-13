const express = require('express');
const router = express.Router();
const { listCategories, createCategory, readCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

router.get('/categories', listCategories);
router.post('/category', createCategory);
router.get('/category/:id', readCategory);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

module.exports = router;