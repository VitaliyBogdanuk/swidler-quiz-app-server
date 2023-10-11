const express = require('express');
const router = express.Router();
const { Category, Topic, Situation, Answer } = require('../models');

// CREATE
router.post('/', async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// READ (all categories)
router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: [{
                model: Topic,
                as: 'topics',
                include: [{
                    model: Situation,
                    as: 'situations',
                    include: [{
                        model: Answer,
                        as: 'answers'
                    }]
                }]
            }]
        });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// READ (single category)
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id, {
            include: [{
                model: Topic,
                as: 'topics'
            }]
        });
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            await category.update(req.body);
            res.json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id, {
            include: [{
                model: Topic,
                as: 'topics'
            }]
        });
        if (category) {
            await category.destroy();
            res.json({ message: 'Category deleted' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
