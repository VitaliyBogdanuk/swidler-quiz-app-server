const express = require('express');
const router = express.Router();
const situations = require('../data/situations.json');
const answers = require('../data/answers.json');
const situationToAnswers = require('../data/situationToAnswers.json');
const achievements = require('../data/achievements.json');

router.get('/situations', (req, res) => {
    res.json(situations);
});

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
