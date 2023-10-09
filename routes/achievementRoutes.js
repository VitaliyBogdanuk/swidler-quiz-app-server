const express = require('express');
const router = express.Router();
const { Achievement } = require('../models');

// CREATE
router.post('/', async (req, res) => {
    try {
        const achievement = await Achievement.create(req.body);
        res.json(achievement);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// READ (all achievements)
router.get('/', async (req, res) => {
    try {
        const achievements = await Achievement.findAll();
        res.json(achievements);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// READ (single achievement)
router.get('/:id', async (req, res) => {
    try {
        const achievement = await Achievement.findByPk(req.params.id);
        if (achievement) {
            res.json(achievement);
        } else {
            res.status(404).json({ message: 'Achievement not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const achievement = await Achievement.findByPk(req.params.id);
        if (achievement) {
            await achievement.update(req.body);
            res.json(achievement);
        } else {
            res.status(404).json({ message: 'Achievement not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const achievement = await Achievement.findByPk(req.params.id);
        if (achievement) {
            await achievement.destroy();
            res.json({ message: 'Achievement deleted' });
        } else {
            res.status(404).json({ message: 'Achievement not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
