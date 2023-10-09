const express = require('express');
const router = express.Router();
const { Topic, Situation, Answer } = require('../models');

// CREATE
router.post('/', async (req, res) => {
    try {
        const topic = await Topic.create(req.body);
        res.json(topic);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// READ (all topics)
router.get('/', async (req, res) => {
    try {
        const topics = await Topic.findAll({
            include: [{
                model: Situation,
                as: 'situations',
                include: [{
                    model: Answer,
                    as: 'answers'
                }]
            }]
        });
        res.json(topics);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// READ (single topic)
router.get('/:id', async (req, res) => {
    try {
        const topic = await Topic.findByPk({
            where: { id: req.params.id },
            include: [{
                model: Situation,
                as: 'situations'
            }]
        });
        if (topic) {
            res.json(topic);
        } else {
            res.status(404).json({ message: 'Topic not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const topic = await Topic.findByPk(req.params.id);
        if (topic) {
            await topic.update(req.body);
            res.json(topic);
        } else {
            res.status(404).json({ message: 'Topic not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const topic = await Topic.findByPk({
            where: { id: req.params.id },
            include: [{
                model: Situation,
                as: 'situations'
            }]
        });
        if (topic) {
            await topic.destroy();
            res.json({ message: 'Topic deleted' });
        } else {
            res.status(404).json({ message: 'Topic not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
