const express = require('express');
const router = express.Router();
const situations = require('../data/situations.json');
const answers = require('../data/answers.json');
const users = require('../data/users.json');
const situationToAnswers = require('../data/situationToAnswers.json');
const achievements = require('../data/achievements.json');

/**
 * @swagger
 * /quiz/situations:
 *   get:
 *     summary: Retrieve all situations
 *     responses:
 *       200:
 *         description: List of all situations
 */
router.get('/situations', (req, res) => {
    res.json(situations);
});

/**
 * @swagger
 * /quiz/situations/{id}/answers:
 *   get:
 *     summary: Retrieve answers for a specific situation by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the situation to retrieve answers for
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns the answers for the specified situation
 *       404:
 *         description: Answers not found for this situation
 */
router.get('/situations/:id/answers', (req, res) => {
    const situationId = req.params.id;
    const mapping = situationToAnswers.find(m => m.situationId === situationId);
    if (mapping) {
        const relatedAnswers = answers.filter(a => mapping.answerIds.includes(a.id));
        res.json(relatedAnswers);
    } else {
        res.status(404).json({ message: 'Answers not found for this situation' });
    }
});

/**
 * @swagger
 * /quiz/achievements/{userId}:
 *   get:
 *     summary: Retrieve achievements for a specific user by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve achievements for
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns the achievements for the specified user
 *       404:
 *         description: User not found
 */
router.get('/achievements/:userId', (req, res) => {
    const userId = req.params.userId;
    const user = users.find(u => u.id === userId);
    if (user) {
        const unlockedAchievements = achievements.filter(a => user.score >= a.scoreRequired);
        res.json(unlockedAchievements);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Add more routes as needed

module.exports = router;
