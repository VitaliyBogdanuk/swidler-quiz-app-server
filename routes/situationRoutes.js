const express = require('express');
const router = express.Router();
const { Situation, Topic, Answer } = require('../models');

// CREATE
router.post('/', async (req, res) => {
    try {
        const situation = await Situation.create(req.body);
        res.json(situation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// READ (all situations)
router.get('/', async (req, res) => {
    try {
        const situations = await Situation.findAll({
            include: [
                {
                    model: Topic,
                    as: 'topic'
                },
                {
                    model: Answer,
                    as: 'answers'
                }
            ]
        });
        res.json(situations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// READ (single situation)
router.get('/:id', async (req, res) => {
    try {
        const situation = await Situation.findByPk(req.params.id, {
            include: [
                {
                    model: 'Topic',
                    as: 'topic'
                },
                {
                    model: 'Answer',
                    as: 'answers'
                }
            ]
        });
        if (situation) {
            res.json(situation);
        } else {
            res.status(404).json({ message: 'Situation not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const situation = await Situation.findByPk(req.params.id);
        if (situation) {
            await situation.update(req.body);
            res.json(situation);
        } else {
            res.status(404).json({ message: 'Situation not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const situation = await Situation.findByPk(req.params.id);
        if (situation) {
            await situation.destroy();
            res.json({ message: 'Situation deleted' });
        } else {
            res.status(404).json({ message: 'Situation not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
