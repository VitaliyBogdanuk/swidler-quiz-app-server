const express = require('express');
const router = express.Router();
const { Answer } = require('../models');

// CREATE
router.post('/', async (req, res) => {
  try {
    const answer = await Answer.create(req.body);
    res.json(answer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ (all answers)
router.get('/', async (req, res) => {
  try {
    const answers = await Answer.findAll();
    res.json(answers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ (single answer)
router.get('/:id', async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id);
    if (answer) {
      res.json(answer);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id);
    if (answer) {
      await answer.update(req.body);
      res.json(answer);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id);
    if (answer) {
      await answer.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
