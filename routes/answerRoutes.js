const express = require('express');
const router = express.Router();
const { Answer } = require('../models');

/**
 * @swagger
 * /answers:
 *   post:
 *     summary: Create a new answer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns the created answer
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
    try {
        const answer = await Answer.create(req.body);
        res.json(answer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /answers:
 *   get:
 *     summary: Retrieve all answers
 *     responses:
 *       200:
 *         description: List of all answers
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
    try {
        const answers = await Answer.findAll();
        res.json(answers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /answers/{id}:
 *   get:
 *     summary: Retrieve a single answer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the answer to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns the answer with the specified ID
 *       404:
 *         description: Answer not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /answers/{id}:
 *   put:
 *     summary: Update an answer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the answer to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns the updated answer
 *       404:
 *         description: Answer not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /answers/{id}:
 *   delete:
 *     summary: Delete an answer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the answer to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Answer deleted successfully
 *       404:
 *         description: Answer not found
 *       500:
 *         description: Server error
 */
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
